//==========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
var RBrowser = new function RBrowser(){
   var o = this;
   //..........................................................
   // @attribute
   o._capability    = null;
   // @attribute
   o._deviceCd      = EDevice.Unknown;
   o._softwareCd    = ESoftware.Unknown;
   o._typeCd        = EBrowser.Unknown;
   o._supportHtml5  = false;
   o._hostPath      = '';
   o._contentPath   = '';
   //..........................................................
   // @event
   o.onLog          = RBrowser_onLog;
   //..........................................................
   // @method
   o.construct      = RBrowser_construct;
   // @method
   o.capability     = RBrowser_capability;
   o.supportHtml5   = RBrowser_supportHtml5;
   o.hostPath       = RBrowser_hostPath;
   o.setHostPath    = RBrowser_setHostPath;
   o.contentPath    = RBrowser_contentPath;
   o.setContentPath = RBrowser_setContentPath;
   // @method
   o.isBrowser      = RBrowser_isBrowser;
   // @method
   o.encode         = RBrowser_encode;
   o.decode         = RBrowser_decode;
   o.urlEncode      = RBrowser_urlEncode;
   o.urlDecode      = RBrowser_urlDecode;
   return o;
}

//===========================================================
// <T>日志输出处理。</T>
//===========================================================
function RBrowser_onLog(s, p){
   console.log(p);
}

//===========================================================
// <T>构造处理。</T>
//
// @method
//===========================================================
function RBrowser_construct(){
   var o = this;
   var s = window.navigator.userAgent.toLowerCase();
   // 判断设备类型
   if(s.indexOf("android") != -1){
      o._typeCd = EDevice.Mobile;
      o._softwareCd = ESoftware.Android;
   }
   // 判断浏览器类型
   if(s.indexOf("chrome") != -1){
      o._typeCd = EBrowser.Chrome;
   }else if(s.indexOf("firefox") != -1){
      o._typeCd = EBrowser.FireFox;
   }else if((s.indexOf("msie") != -1) || (s.indexOf("windows") != -1)){
      o._typeCd = EBrowser.Explorer;
   }else if((s.indexOf("safari") != -1) || (s.indexOf("applewebkit") != -1)){
      o._typeCd = EBrowser.Safari;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   // 注册输出接口
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.onLog);
   }
   // 输出日志
   RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
   // 是否支持HTML5
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   // 设置浏览器能力
   var capability = o._capability = new SBrowserCapability();
   if(window.Worker){
      capability.optionProcess = true;
   }
   if(window.localStorage){
      capability.optionStorage = true;
   }
   try{
      new Blob(["Test"], {'type':'text/plain'});
      capability.blobCreate = true;
   }catch(e){
      RLogger.warn(o, 'Browser blob not support.');
   }
}

//==========================================================
// <T>获得浏览器环境信息。</T>
//
// @method
// @return 浏览器环境信息
//==========================================================
function RBrowser_capability(){
   return this._capability;
}

//==========================================================
// <T>测试是否支持HTML5规范。</T>
//
// @method
// @return 是否支持
//==========================================================
function RBrowser_supportHtml5(){
   return this._supportHtml5;
}

//===========================================================
// <T>获得主机路径。</T>
//
// @param p:uri:String 路径
// @return String 主机路径
//===========================================================
function RBrowser_hostPath(p){
   var o = this;
   if(p){
      return o._hostPath + p;
   }
   return o._hostPath;
}

//===========================================================
// <T>设置主机路径。</T>
//
// @param p:host:String 主机路径
//===========================================================
function RBrowser_setHostPath(p){
   this._hostPath = p;
}

//===========================================================
// <T>获得内容路径。</T>
//
// @param p:uri:String 路径
// @return String 内容路径
//===========================================================
function RBrowser_contentPath(p){
   var o = this;
   if(p){
      return o._contentPath + p;
   }
   return o._contentPath;
}

//===========================================================
// <T>设置内容路径。</T>
//
// @param p:path:String 路径
//===========================================================
function RBrowser_setContentPath(p){
   this._contentPath = p;
}

//===========================================================
// <T>判断是否指定浏览器。</T>
//
// @param p:value:EBrowser 浏览器类型
// @return 是否指定浏览器
//===========================================================
function RBrowser_isBrowser(p){
   return this._typeCd == p;
}

//===========================================================
// <T>参数编码。</T>
//
// @param value:String 参数
// @return 编码字符串
//===========================================================
function RBrowser_encode(value){
   return escape(value);
}

//===========================================================
// <T>参数解码。</T>
//
// @param value:String 参数
// @return 解码字符串
//===========================================================
function RBrowser_decode(value){
   return unescape(value);
}

//===========================================================
// <T>URL参数编码。</T>
//
// @param url:String 网络地址
// @param flag:Boolean 是否全部
// @return 编码字符串
//===========================================================
function RBrowser_urlEncode(url, flag){
   if(flag){
      return encodeURIComponent(url);
   }
   return encodeURI(url);
}

//===========================================================
// <T>URL参数解码。</T>
//
// @param url:String 网络地址
// @param flag:Boolean 是否全部
// @return 解码字符串
//===========================================================
function RBrowser_urlDecode(url, flag){
   if(flag){
      return decodeURIComponent(url);
   }
   return decodeURI(url);
}
