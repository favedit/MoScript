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
   var url = o._contentUrl;
   if(url.indexOf('?') == -1){
      url += '?';
   }else{
      url += '&';
   }
   // 设置参数
   var parameters = o._parameters;
   var count = parameters.count();
   var first = false;
   for(var i = 0; i < count; i++){
      var name = parameters.name(i);
      var value = parameters.value(i);
      if(!RString.isEmpty(value)){
         if(first){
            url += '&';
         }else{
            first = true;
         }
         url += name + '=' + value;
      }
   }
   return url;
}
