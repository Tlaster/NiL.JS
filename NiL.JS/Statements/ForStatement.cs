﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using NiL.JS.BaseLibrary;
using NiL.JS.Core;
using NiL.JS.Expressions;

namespace NiL.JS.Statements
{
#if !PORTABLE
    [Serializable]
#endif
    public sealed class ForStatement : CodeNode
    {
        private CodeNode init;
        private CodeNode condition;
        private CodeNode post;
        private CodeNode body;
        private string[] labels;

        public CodeNode Initializator { get { return init; } }
        public CodeNode Condition { get { return condition; } }
        public CodeNode Post { get { return post; } }
        public CodeNode Body { get { return body; } }
        public ICollection<string> Labels { get { return new ReadOnlyCollection<string>(labels); } }

        private ForStatement()
        {

        }

        internal static CodeNode Parse(ParsingState state, ref int index)
        {
            int i = index;
            while (char.IsWhiteSpace(state.Code[i]))
                i++;
            if (!Parser.Validate(state.Code, "for(", ref i) && (!Parser.Validate(state.Code, "for (", ref i)))
                return null;
            while (char.IsWhiteSpace(state.Code[i]))
                i++;
            CodeNode init = null;
            int labelsCount = state.LabelCount;
            state.LabelCount = 0;
            init = VariableDefineStatement.Parse(state, ref i);
            if (init == null)
                init = Parser.Parse(state, ref i, CodeFragmentType.Expression);
            if ((init is ExpressionTree)
                && (init as ExpressionTree).Type == OperationType.None
                && (init as ExpressionTree).second == null)
                init = (init as ExpressionTree).first;
            if (state.Code[i] != ';')
                ExceptionsHelper.Throw((new SyntaxError("Expected \";\" at + " + CodeCoordinates.FromTextPosition(state.Code, i, 0))));
            do
                i++;
            while (char.IsWhiteSpace(state.Code[i]));
            var condition = state.Code[i] == ';' ? null as CodeNode : ExpressionTree.Parse(state, ref i);
            if (state.Code[i] != ';')
                ExceptionsHelper.Throw((new SyntaxError("Expected \";\" at + " + CodeCoordinates.FromTextPosition(state.Code, i, 0))));
            do
                i++;
            while (char.IsWhiteSpace(state.Code[i]));
            var post = state.Code[i] == ')' ? null as CodeNode : ExpressionTree.Parse(state, ref i);
            while (char.IsWhiteSpace(state.Code[i]))
                i++;
            if (state.Code[i] != ')')
                ExceptionsHelper.Throw((new SyntaxError("Expected \";\" at + " + CodeCoordinates.FromTextPosition(state.Code, i, 0))));
            do
                i++;
            while (char.IsWhiteSpace(state.Code[i]));
            state.AllowBreak.Push(true);
            state.AllowContinue.Push(true);
            var body = Parser.Parse(state, ref i, 0);
            if (body is FunctionNotation)
            {
                if (state.strict)
                    ExceptionsHelper.Throw((new NiL.JS.BaseLibrary.SyntaxError("In strict mode code, functions can only be declared at top level or immediately within another function.")));
                if (state.message != null)
                    state.message(MessageLevel.CriticalWarning, CodeCoordinates.FromTextPosition(state.Code, body.Position, body.Length), "Do not declare function in nested blocks.");
                body = new CodeBlock(new[] { body }, state.strict); // для того, чтобы не дублировать код по декларации функции, 
                // она оборачивается в блок, который сделает самовыпил на втором этапе, но перед этим корректно объявит функцию.
            }
            state.AllowBreak.Pop();
            state.AllowContinue.Pop();
            int startPos = index;
            index = i;
            return new ForStatement()
                {
                    body = body,
                    condition = condition,
                    init = init,
                    post = post,
                    labels = state.Labels.GetRange(state.Labels.Count - labelsCount, labelsCount).ToArray(),
                    Position = startPos,
                    Length = index - startPos
                };
        }

        public override JSValue Evaluate(Context context)
        {
            if (init != null)
            {
#if DEV
                if (context.debugging)
                    context.raiseDebugger(init);
#endif
                init.Evaluate(context);
            }
#if DEV
            if (context.debugging)
                context.raiseDebugger(condition);
#endif
            if (!(bool)condition.Evaluate(context))
                return null;
            bool be = body != null;
            bool pne = post == null;
            do
            {
                if (be)
                {
#if DEV
                    if (context.debugging && !(body is CodeBlock))
                        context.raiseDebugger(body);
#endif
                    var temp = body.Evaluate(context);
                    if (temp != null)
                        context.lastResult = temp;
                    if (context.abort != AbortType.None)
                    {
                        var me = context.abortInfo == null || System.Array.IndexOf(labels, context.abortInfo.oValue as string) != -1;
                        var _break = (context.abort > AbortType.Continue) || !me;
                        if (context.abort < AbortType.Return && me)
                        {
                            context.abort = AbortType.None;
                            context.abortInfo = null;
                        }
                        if (_break)
                            return null;
                    }
                }
#if DEV
                if (context.debugging)
                {
                    if (!pne)
                    {
                        context.raiseDebugger(post);
                        post.Evaluate(context);
                    }
                    context.raiseDebugger(condition);
                }
                else if (!pne)
                    post.Evaluate(context);
#else
                if (pne)
                    continue;
                post.Evaluate(context);
#endif
            } while ((bool)condition.Evaluate(context));
            return null;
        }

        protected override CodeNode[] getChildsImpl()
        {
            var res = new List<CodeNode>()
            {
                init, 
                condition,
                post,
                body
            };
            res.RemoveAll(x => x == null);
            return res.ToArray();
        }

        internal protected override bool Build(ref CodeNode _this, int depth, Dictionary<string, VariableDescriptor> variables, BuildState state, CompilerMessageCallback message, FunctionStatistics statistic, Options opts)
        {
            Parser.Build(ref init, 1, variables, state, message, statistic, opts);
            if ((opts & Options.SuppressUselessStatementsElimination) == 0
                && init is VariableDefineStatement
                && !(init as VariableDefineStatement).isConst
                && (init as VariableDefineStatement).initializators.Length == 1)
                init = (init as VariableDefineStatement).initializators[0];
            Parser.Build(ref condition, 2, variables, state | BuildState.InLoop | BuildState.InExpression, message, statistic, opts);
            if (post != null)
            {
                Parser.Build(ref post, 1, variables, state | BuildState.Conditional | BuildState.InLoop | BuildState.InExpression, message, statistic, opts);
                if (post == null && message != null)
                    message(MessageLevel.Warning, new CodeCoordinates(0, Position, Length), "Last expression of for-loop was removed. Maybe, it's a mistake.");
            }
            Parser.Build(ref body, System.Math.Max(1, depth), variables, state | BuildState.Conditional | BuildState.InLoop, message, statistic, opts);
            if (condition == null)
                condition = new ConstantNotation(NiL.JS.BaseLibrary.Boolean.True);
            else if ((condition is Expressions.Expression)
                && (condition as Expressions.Expression).IsContextIndependent
                && !(bool)condition.Evaluate(null))
            {
                _this = init;
                return false;
            }
            else if (body == null || body is EmptyExpression) // initial solution. Will extended
            {
                VariableReference variable = null;
                ConstantNotation limit = null;
                if (condition is NiL.JS.Expressions.LessOperator)
                {
                    variable = (condition as NiL.JS.Expressions.LessOperator).FirstOperand as VariableReference;
                    limit = (condition as NiL.JS.Expressions.LessOperator).SecondOperand as ConstantNotation;
                }
                else if (condition is NiL.JS.Expressions.MoreOperator)
                {
                    variable = (condition as NiL.JS.Expressions.MoreOperator).SecondOperand as VariableReference;
                    limit = (condition as NiL.JS.Expressions.MoreOperator).FirstOperand as ConstantNotation;
                }
                else if (condition is NiL.JS.Expressions.NotEqualOperator)
                {
                    variable = (condition as NiL.JS.Expressions.LessOperator).SecondOperand as VariableReference;
                    limit = (condition as NiL.JS.Expressions.LessOperator).FirstOperand as ConstantNotation;
                    if (variable == null && limit == null)
                    {
                        variable = (condition as NiL.JS.Expressions.LessOperator).FirstOperand as VariableReference;
                        limit = (condition as NiL.JS.Expressions.LessOperator).SecondOperand as ConstantNotation;
                    }
                }
                if (variable != null
                    && limit != null
                    && post is NiL.JS.Expressions.IncrementOperator
                    && ((post as NiL.JS.Expressions.IncrementOperator).FirstOperand as VariableReference).descriptor == variable.descriptor)
                {
                    if (variable.defineDepth >= 0 && variable.descriptor.defineDepth >= 0)
                    {
                        if (init is NiL.JS.Expressions.AssignmentOperator
                            && (init as NiL.JS.Expressions.AssignmentOperator).FirstOperand is GetVariableExpression
                            && ((init as NiL.JS.Expressions.AssignmentOperator).FirstOperand as GetVariableExpression).descriptor == variable.descriptor)
                        {
                            var value = (init as NiL.JS.Expressions.AssignmentOperator).SecondOperand;
                            if (value is ConstantNotation)
                            {
                                var vvalue = value.Evaluate(null);
                                var lvalue = limit.Evaluate(null);
                                if ((vvalue.valueType == JSValueType.Int
                                    || vvalue.valueType == JSValueType.Bool
                                    || vvalue.valueType == JSValueType.Double)
                                    && (lvalue.valueType == JSValueType.Int
                                    || lvalue.valueType == JSValueType.Bool
                                    || lvalue.valueType == JSValueType.Double))
                                {
                                    if (!(bool)NiL.JS.Expressions.LessOperator.Check(vvalue, lvalue))
                                    {
                                        _this = init;
                                        return false;
                                    }
                                    _this = new CodeBlock(new[] { new NiL.JS.Expressions.AssignmentOperator(variable, limit), init }, false);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        internal protected override void Optimize(ref CodeNode _this, FunctionNotation owner, CompilerMessageCallback message, Options opts, FunctionStatistics statistic)
        {
            if (init != null)
                init.Optimize(ref init, owner, message, opts, statistic);
            if (condition != null)
                condition.Optimize(ref condition, owner, message, opts, statistic);
            if (post != null)
                post.Optimize(ref post, owner, message, opts, statistic);
            if (body != null)
                body.Optimize(ref body, owner, message, opts, statistic);
        }

        public override T Visit<T>(Visitor<T> visitor)
        {
            return visitor.Visit(this);
        }

        public override string ToString()
        {
            var istring = (init as object ?? "").ToString();
            return "for (" + istring + "; " + condition + "; " + post + ")" + (body is CodeBlock ? "" : Environment.NewLine + "  ") + body;
        }
    }
}