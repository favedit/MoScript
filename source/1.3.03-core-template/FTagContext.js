//==========================================================
// <T>标签环境类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
MO.FTagContext = function FTagContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MInstance);
   //..........................................................
   // @attribute
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._source         = null;
   //..........................................................
   // @method
   o.construct       = MO.FTagContext_construct;
   o.instanceAlloc   = MO.FTagContext_instanceAlloc;
   o.get             = MO.FTagContext_get;
   o.set             = MO.FTagContext_set;
   o.setBoolean      = MO.FTagContext_setBoolean;
   o.source          = MO.FTagContext_source;
   o.write           = MO.FTagContext_write;
   o.resetSource     = MO.FTagContext_resetSource;
   o.dispose         = MO.FTagContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTagContext_construct = function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._source = new MO.TString();
}

//==========================================================
// <T>收集处理。</T>
//
// @method
//==========================================================
MO.FTagContext_instanceAlloc = function FTagContext_instanceAlloc(){
   this._attributes.clear();
}

//==========================================================
// <T>取得属性值。</T>
//
// @method
// @param name:String 名称
// @param value:String 默认值
// @return String 内容
//==========================================================
MO.FTagContext_get = function FTagContext_get(name, value){
   return this._attributes.get(name, value);
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param name:String 名称
// @param value:String 内容
//==========================================================
MO.FTagContext_set = function FTagContext_set(name, value){
   this._attributes.set(name, value);
}

//==========================================================
// <T>设置布尔属性值。</T>
//
// @method
// @param name:String 名称
// @param value:String 内容
//==========================================================
MO.FTagContext_setBoolean = function FTagContext_setBoolean(name, value){
   this._attributes.set(name, MO.RBoolean.toString(value));
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return TString 代码
//==========================================================
MO.FTagContext_source = function FTagContext_source(){
   return this._source.toString();
}

//==========================================================
// <T>输出文本。</T>
//
// @method
// @param String 文本
//==========================================================
MO.FTagContext_write = function FTagContext_write(p){
   if(!MO.Lang.String.isEmpty(p)){
      this._source.append(p);
   }
}

//==========================================================
// <T>重置代码内容。</T>
//
// @method
//==========================================================
MO.FTagContext_resetSource = function FTagContext_resetSource(p){
   this._source.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTagContext_dispose = function FTagContext_dispose(){
   var o = this;
   o._attributes = RObject.dispose(o._attributes);
   o._source = RObject.dispose(o._source);
   o.__base.FObject.dispose.call(o);
}
