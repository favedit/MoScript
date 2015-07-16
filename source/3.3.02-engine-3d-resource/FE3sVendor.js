//==========================================================
// <T>资源提供商。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
MO.FE3sVendor = function FE3sVendor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._contentUrl   = MO.Class.register(o, new MO.AGetSet('_contentUrl'));
   o._parameters   = null;
   //..........................................................
   // @method
   o.construct     = MO.FE3sVendor_construct;
   // @method
   o.get           = MO.FE3sVendor_get;
   o.set           = MO.FE3sVendor_set;
   o.makeSource    = MO.Method.virtual(o, 'makeSource');
   o.makeUrl       = MO.FE3sVendor_makeUrl;
   o.reset         = MO.FE3sVendor_reset;
   // @method
   o.dispose       = MO.FE3sVendor_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sVendor_construct = function FE3sVendor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._parameters = new MO.TAttributes();
}

//==========================================================
// <T>获得参数。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
MO.FE3sVendor_get = function FE3sVendor_get(n){
   return this._parameters.get(n);
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:String 内容
//==========================================================
MO.FE3sVendor_set = function FE3sVendor_set(n, v){
   this._parameters.set(n, v);
}

//==========================================================
// <T>生成网络地址。</T>
// <P>调试模式，追加时间，总是获得新内容。</P>
//
// @method
// @return 时间内容
//==========================================================
MO.FE3sVendor_makeUrl = function FE3sVendor_makeUrl(){
   var o = this;
   var r = o.makeSource();
   if(MO.Runtime.isDebug()){
      if(r.indexOf('?') == -1){
         r += '?';
      }else{
         r += '&';
      }
      r += 'date=' + MO.Lang.Date.format();
   }
   return r;
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FE3sVendor_reset = function FE3sVendor_reset(){
   this._parameters.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
   var o = this;
   o._parameters = MO.Lang.Object.dispose(o._parameters);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
