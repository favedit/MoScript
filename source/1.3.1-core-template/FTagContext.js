//==========================================================
// <T>标签环境类。</T>
//
// @class
// @author maocy
// @version 150114
//==========================================================
function FTagContext(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._trimLeft       = false;
   o._trimRight      = false;
   o._attributes     = null;
   o._source         = null;
   //..........................................................
   // @method
   o.construct       = FTagContext_construct;
   o.attributes      = FTagContext_attributes;
   o.get             = FTagContext_get;
   o.set             = FTagContext_set;
   o.setBoolean      = FTagContext_setBoolean;
   o.source          = FTagContext_source;
   o.write           = FTagContext_write;
   o.resetAttributes = FTagContext_resetAttributes;
   o.resetSource     = FTagContext_resetSource;
   o.dispose         = FTagContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FTagContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._attributes = new TAttributes();
   o._source = new TString();
}

//==========================================================
// <T>获得属性集合。</T>
//
// @method
// @return TAttribues 属性集合
//==========================================================
function FTagContext_attributes(){
   return this._attributes;
}

//==========================================================
// <T>取得属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:String 默认值
// @return String 内容
//==========================================================
function FTagContext_get(n, v){
   return this._attributes.get(n, v);
}

//==========================================================
// <T>设置属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:String 内容
//==========================================================
function FTagContext_set(n, v){
   this._attributes.set(n, v);
}

//==========================================================
// <T>设置布尔属性值。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:String 内容
//==========================================================
function FTagContext_setBoolean(n, v){
   this._attributes.set(n, RBoolean.toString(v));
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return TString 代码
//==========================================================
function FTagContext_source(){
   return this._source.toString();
}

//==========================================================
// <T>输出文本。</T>
//
// @method
// @param String 文本
//==========================================================
function FTagContext_write(p){
   if(!RString.isEmpty(p)){
      this._source.append(p);
   }
}

//==========================================================
// <T>重置属性集合。</T>
//
// @method
//==========================================================
function FTagContext_resetAttributes(p){
   this._attributes.clear();
}

//==========================================================
// <T>重置代码内容。</T>
//
// @method
//==========================================================
function FTagContext_resetSource(p){
   this._source.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FTagContext_dispose(){
   var o = this;
   o._attributes.dispose();
   o._attributes = null;
   o._source.dispose();
   o._source = null;
   o.__base.FObject.dispose.call(o);
}
