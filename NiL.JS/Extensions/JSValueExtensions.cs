﻿using System;
using System.Reflection;
using NiL.JS.BaseLibrary;
using NiL.JS.Core;
using System.Reflection.Emit;
using System.Linq.Expressions;
using System.Linq;

#if NET40 || NETCORE
using NiL.JS.Backward;
#endif

namespace NiL.JS.Extensions
{
    public static class JSValueExtensions
    {
        public static bool Is(this JSValue self, JSValueType type)
        {
            return self != null && self._valueType == type;
        }

        public static bool Is<T>(this JSValue self)
        {
            if (self == null)
                return false;
#if PORTABLE || NETCORE
            switch (typeof(T).GetTypeCode())
#else
            switch (Type.GetTypeCode(typeof(T)))
#endif
            {
                case TypeCode.Boolean:
                    {
                        return self.Is(JSValueType.Boolean);
                    }
                case TypeCode.Byte:
                    {
                        return self.Is(JSValueType.Integer) && (self._iValue & ~byte.MaxValue) == 0;
                    }
                case TypeCode.Char:
                    {
                        return (self != null
                            && self._valueType == JSValueType.Object
                            && self._oValue is char);
                    }
                case TypeCode.Decimal:
                    {
                        return false;
                    }
                case TypeCode.Double:
                    {
                        return self.Is(JSValueType.Double);
                    }
                case TypeCode.Int16:
                    {
                        return self.Is(JSValueType.Integer) && (self._iValue & ~ushort.MaxValue) == 0;
                    }
                case TypeCode.Int32:
                    {
                        return self.Is(JSValueType.Integer);
                    }
                case TypeCode.Int64:
                    {
                        return self.Is(JSValueType.Integer) || (self.Is(JSValueType.Double) && self._dValue == (long)self._dValue);
                    }
                case TypeCode.Object:
                    {
                        return self.Value is T;
                    }
                case TypeCode.SByte:
                    {
                        return self.Is(JSValueType.Integer) && (self._iValue & ~byte.MaxValue) == 0;
                    }
                case TypeCode.Single:
                    {
                        return self.Is(JSValueType.Double) && (float)self._dValue == self._dValue;
                    }
                case TypeCode.String:
                    {
                        return self.Is(JSValueType.String);
                    }
                case TypeCode.UInt16:
                    {
                        return self.Is(JSValueType.Integer) && (self._iValue & ~ushort.MaxValue) == 0;
                    }
                case TypeCode.UInt32:
                    {
                        return self.Is(JSValueType.Integer);
                    }
                case TypeCode.UInt64:
                    {
                        return (self.Is(JSValueType.Integer) && self._iValue >= 0) || (self.Is(JSValueType.Double) && self._dValue == (ulong)self._dValue);
                    }
                default:
                    {
                        return false;
                    }
            }
        }

        public static T As<T>(this JSValue self)
        {
#if PORTABLE || NETCORE
            switch (typeof(T).GetTypeCode())
#else
            switch (Type.GetTypeCode(typeof(T)))
#endif
            {
                case TypeCode.Boolean:
                    return (T)(object)(bool)self; // оптимизатор разруливает такой каскад преобразований
                case TypeCode.Byte:
                    {
                        return (T)(object)(byte)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.Char:
                    {
                        if (self._valueType == JSValueType.Object
                            && self._oValue is char)
                            return (T)self._oValue;
                        break;
                    }
                case TypeCode.Decimal:
                    {
                        return (T)(object)(decimal)Tools.JSObjectToDouble(self);
                    }
                case TypeCode.Double:
                    {
                        return (T)(object)Tools.JSObjectToDouble(self);
                    }
                case TypeCode.Int16:
                    {
                        return (T)(object)(Int16)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.Int32:
                    {
                        return (T)(object)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.Int64:
                    {
                        return (T)(object)Tools.JSObjectToInt64(self);
                    }
                case TypeCode.Object:
                    {
                        if (self.Value is Function && typeof(Delegate).IsAssignableFrom(typeof(T)))
                            return ((Function)self.Value).MakeDelegate<T>();

                        if (typeof(T).IsAssignableFrom(self.GetType()))
                            return (T)(object)self;

                        try
                        {
                            return (T)(Tools.convertJStoObj(self, typeof(T), true) ?? self.Value);
                        }
                        catch (InvalidCastException)
                        {
                            return default(T);
                        }
                    }
                case TypeCode.SByte:
                    {
                        return (T)(object)(sbyte)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.Single:
                    {
                        return (T)(object)(float)Tools.JSObjectToDouble(self);
                    }
                case TypeCode.String:
                    {
                        return (T)(object)self.ToString();
                    }
                case TypeCode.UInt16:
                    {
                        return (T)(object)(ushort)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.UInt32:
                    {
                        return (T)(object)(uint)Tools.JSObjectToInt32(self);
                    }
                case TypeCode.UInt64:
                    {
                        return (T)(object)(ulong)Tools.JSObjectToInt64(self);
                    }
            }

            throw new InvalidCastException();
        }

        public static bool IsNaN(this JSValue self)
        {
            return self != null && self._valueType == JSValueType.Double && double.IsNaN(self._dValue);
        }

        public static bool IsUndefined(this JSValue self)
        {
            return self != null && self._valueType <= JSValueType.Undefined;
        }

        public static bool IsNumber(this JSValue self)
        {
            return self._valueType == JSValueType.Integer || self._valueType == JSValueType.Double;
        }

        public static object ConvertToType(this JSValue value, Type targetType)
        {
            return Tools.convertJStoObj(value, targetType, true);
        }

        public static void Assign(this JSValue target, object value)
        {
            target.Assign(JSValue.Marshal(value));
        }
    }
}
