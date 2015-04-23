//==========================================================
// <T>网络资源提供商。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
function FE3sVendorNet(o){
   o = RClass.inherits(this, o, FE3sVendor);
   //..........................................................
   // @method
   o.makeSource = FE3sVendorNet_makeSource;
   return o;
}

//==========================================================
// <T>生成来源内容。</T>
//
// @method
// @return String 来源内容
//==========================================================
function FE3sVendorNet_makeSource(){
   var o = this;
   // 生成地址
   var u = o._contentUrl;
   if(u.indexOf('?') == -1){
      u += '?';
   }
   // 设置参数
   var s = o._parameters;
   var c = s.count();
   var f = false;
   for(var i = 0; i < c; i++){
      var n = s.name(i);
      var v = s.value(i);
      if(!RString.isEmpty(v)){
         if(f){
            u += '&';
         }else{
            f = true;
         }
         u += n + '=' + v;
      }
   }
   return u
}
