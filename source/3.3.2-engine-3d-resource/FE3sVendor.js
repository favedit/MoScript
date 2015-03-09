//==========================================================
// <T>资源提供商。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
function FE3sVendor(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._optionFlag   = true;
   o._contentUrl   = null;
   //..........................................................
   // @method
   o.optionFlag    = FE3sVendor_optionFlag;
   o.setOptionFlag = FE3sVendor_setOptionFlag;
   o.contentUrl    = FE3sVendor_contentUrl;
   o.setContentUrl = FE3sVendor_setContentUrl;
   // @method
   o.makeUrl       = FE3sVendor_makeUrl;
   return o;
}

//==========================================================
// <T>获得配置标志。</T>
//
// @method
// @return Boolean 配置标志
//==========================================================
function FE3sVendor_optionFlag(p){
   return this._optionFlag;
}

//==========================================================
// <T>设置配置标志。</T>
//
// @method
// @param p:flag:Boolean 配置标志
//==========================================================
function FE3sVendor_setOptionFlag(p){
   this._optionFlag = p;
}

//==========================================================
// <T>获得内容地址。</T>
//
// @method
// @return String 内容地址
//==========================================================
function FE3sVendor_contentUrl(p){
   return this._contentUrl;
}

//==========================================================
// <T>设置内容地址。</T>
//
// @method
// @param p:contentUrl:String 内容地址
//==========================================================
function FE3sVendor_setContentUrl(p){
   this._contentUrl = p;
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sVendor_makeUrl(){
   var o = this;
   // 生成地址
   var u = o._contentUrl;
   var as = arguments;
   var ac = as.length;
   for(var i = 0; i < ac; i++){
      u = u.replace('{' + (i + 1) + '}', as[i]);
   }
   // 调试模式，追加时间，总是获得新内容
   if(RRuntime.isDebug()){
      u += '&date=' + RDate.format();
   }
   return u;
}
