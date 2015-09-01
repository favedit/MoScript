//==========================================================
// <T>数据内容。</T>
//
// @tool
// @author maocy
// @version 150901
//==========================================================
MO.FDataValue = function FDataValue(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._typeCd           = MO.Class.register(o, new MO.AGetter('_typeCd'), MO.EDataType.Unknown);
   // @attribute
   o._origin           = MO.Class.register(o, new MO.AGetSet('_origin'));
   o._value            = MO.Class.register(o, new MO.AGetSet('_value'));
   // @attribute
   o._listenersChanged = null;
   //..........................................................
   // @method
   o.isSet             = MO.FDataValue_isSet;
   // @method
   o.listenersChanged  = MO.FDataValue_listenersChanged;
   // @method
   o.get               = MO.FDataValue_get;
   o.set               = MO.FDataValue_set;
   // @method
   o.clear             = MO.FDataValue_clear;
   // @method
   o.dispose           = MO.FDataValue_dispose;
   return o;
}

//==========================================================
// <T>判断是否设置过。</T>
//
// @method
// @return Boolean 是否设置过
//==========================================================
MO.FDataValue_isSet = function FDataValue_isSet(){
   return this._typeCd != MO.EDataType.Unknown;
}

//==========================================================
// <T>获得改变监听器集合。</T>
//
// @method
// @return 监听器集合
//==========================================================
MO.FDataValue_listenersChanged = function FDataValue_listenersChanged(){
   var o = this;
   var listeners = o._listenersChanged;
   if(!listeners){
      listeners = o._listenersChanged = new MO.TListeners();
   }
   return listeners;
}

//==========================================================
// <T>获得数据内容。</T>
//
// @method
// @return Object 数据内容
//==========================================================
MO.FDataValue_get = function FDataValue_get(){
   var o = this;
   if(o._typeCd != MO.EDataType.Unknown){
      return o._value;
   }
   return null;
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param value:Object 数据内容
// @param typeCd:EDataType 数据类型
//==========================================================
MO.FDataValue_set = function FDataValue_set(value, typeCd){
   var o = this;
   o._typeCd = MO.Runtime.nvl(typeCd, MO.EDataType.String);
   o._origin = value;
   o._value = value;
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FDataValue_clear = function FDataValue_clear(){
   var o = this;
   o._typeCd = MO.EDataType.Unknown;
   o._origin = null;
   o._value = null;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDataValue_dispose = function FDataValue_dispose(){
   var o = this;
   o.clear();
   o._listenersChanged = MO.Lang.Object.dispose(o._listenersChanged);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
