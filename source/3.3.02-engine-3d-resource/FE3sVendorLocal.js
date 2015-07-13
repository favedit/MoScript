//==========================================================
// <T>本地资源提供商。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
MO.FE3sVendorLocal = function FE3sVendorLocal(o){
   o = MO.Class.inherits(this, o, MO.FE3sVendor);
   //..........................................................
   // @method
   o.makeSource = MO.FE3sVendorLocal_makeSource;
   return o;
}

//==========================================================
// <T>生成来源内容。</T>
//
// @method
// @return String 来源内容
//==========================================================
MO.FE3sVendorLocal_makeSource = function FE3sVendorLocal_makeSource(){
   var o = this;
   // 生成地址
   var u = o._contentUrl;
   // 设置参数
   var s = o._parameters;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      u = MO.Lang.String.replace(u, '{' + n + '}', v);
   }
   return u;
}
