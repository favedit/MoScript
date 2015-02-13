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
   o._deviceCd      = EDevice.Unknown;
   o._softwareCd    = ESoftware.Unknown;
   o._typeCd        = EBrowser.Unknown;
   o._hostPath      = '';
   o._contentPath   = '';
   //..........................................................
   // @method
   o.construct      = RBrowser_construct;
   // @method
   o.hostPath       = RBrowser_hostPath;
   o.setHostPath    = RBrowser_setHostPath;
   o.contentPath    = RBrowser_contentPath;
   o.setContentPath = RBrowser_setContentPath;
   // @method
   o.isBrowser      = RBrowser_isBrowser;
   o.log            = RBrowser_log;
   return o;
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
   }else if(s.indexOf("msie") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("windows") != -1){
      o._typeCd = EBrowser.Explorer;
   }else if(s.indexOf("safari") != -1){
      o._typeCd = EBrowser.Safari;
   }else{
      alert('Unknown browser.\n' + s);
      return;
   }
   // 注册输出接口
   if(o._typeCd == EBrowser.Chrome){
      RLogger.lsnsOutput.register(o, o.log);
   }
   // 输出日志
   RLogger.info(o, 'Parse browser agent. (type_cd={1})', REnum.decode(EBrowser, o._typeCd));
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
// <T>构造处理。</T>
//===========================================================
function RBrowser_log(p){
   console.log(p);
}
