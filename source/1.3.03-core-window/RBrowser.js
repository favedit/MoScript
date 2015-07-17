//==========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
MO.RBrowser = function RBrowser(){
   var o = this;
   //..........................................................
   // @attribute
   o._agent         = null;
   o._capability    = null;
   // @attribute
   o._deviceCd      = MO.EDevice.Unknown;
   o._softwareCd    = MO.ESoftware.Unknown;
   o._typeCd        = MO.EBrowser.Unknown;
   o._orientationCd = MO.EOrientation.Horizontal;
   o._supportHtml5  = false;
   o._hostPath      = '';
   o._contentPath   = '';
   return o;
}

//===========================================================
// <T>日志输出处理。</T>
//
// @method
//===========================================================
MO.RBrowser.prototype.onLog = function RBrowser_onLog(s, p){
   console.log(p);
}

//===========================================================
// <T>构造处理。</T>
//
// @method
//===========================================================
MO.RBrowser.prototype.construct = function RBrowser_construct(){
   var o = this;
   o.code = window.navigator.userAgent.toString();
   var agent = o.code.toLowerCase();
   var capability = o._capability = new MO.SBrowserCapability();
   // 判断设备类型
   if(agent.indexOf("android") != -1){
      o._typeCd = MO.EDevice.Mobile;
      o._softwareCd = MO.ESoftware.Android;
   }
   // 判断浏览器类型
   if(agent.indexOf("chrome") != -1){
      o._typeCd = MO.EBrowser.Chrome;
   }else if(agent.indexOf("firefox") != -1){
      o._typeCd = MO.EBrowser.FireFox;
   }else if((agent.indexOf("msie") != -1) || (agent.indexOf("windows") != -1)){
      o._typeCd = MO.EBrowser.Explorer;
   }else if((agent.indexOf("safari") != -1) || (agent.indexOf("applewebkit") != -1)){
      o._typeCd = MO.EBrowser.Safari;
      capability.canvasAutoScale = true;
   }else{
      alert('Unknown browser.\n' + agent);
      return;
   }
   // 注册输出接口
   if(o._typeCd == MO.EBrowser.Chrome){
      MO.Logger.lsnsOutput.register(o, o.onLog);
   }
   // 输出日志
   MO.Logger.info(o, 'Parse browser agent. (type_cd={1})', MO.REnum.decode(MO.EBrowser, o._typeCd));
   // 是否支持HTML5
   if(window.applicationCache){
      o._supportHtml5 = true;
   }
   // 是否移动或PC模式
   var bIsIpad = agent.match(/ipad/i) == "ipad";
   var bIsIphoneOs = agent.match(/iphone os/i) == "iphone os";
   var bIsMidp = agent.match(/midp/i) == "midp";
   var bIsUc7 = agent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
   var bIsUc = agent.match(/ucweb/i) == "ucweb";
   var bIsAndroid = agent.match(/android/i) == "android";
   var bIsCE = agent.match(/windows ce/i) == "windows ce";
   var bIsWM = agent.match(/windows mobile/i) == "windows mobile";
   if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
      MO.Runtime.setPlatformCd(MO.EPlatform.Mobile);
   }
   // 设置浏览器能力
   var pixelRatio = window.devicePixelRatio;
   if(pixelRatio){
      if(MO.Runtime.isPlatformMobile()){
         // 强制不要超过3倍
         capability.pixelRatio = Math.min(pixelRatio, 3);
         //capability.pixelRatio = pixelRatio;
      }
   }
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
      MO.Logger.warn(o, 'Browser blob not support.');
   }
   // 计算方向
   o.refreshOrientation();
}

//==========================================================
// <T>获得浏览器环境信息。</T>
//
// @method
// @return 浏览器环境信息
//==========================================================
MO.RBrowser.prototype.capability = function RBrowser_capability(){
   return this._capability;
}

//==========================================================
// <T>测试是否支持HTML5规范。</T>
//
// @method
// @return 是否支持
//==========================================================
MO.RBrowser.prototype.supportHtml5 = function RBrowser_supportHtml5(){
   return this._supportHtml5;
}

//===========================================================
// <T>获得主机路径。</T>
//
// @method
// @param uri:String 路径
// @return String 主机路径
//===========================================================
MO.RBrowser.prototype.hostPath = function RBrowser_hostPath(uri){
   var o = this;
   if(uri){
      return o._hostPath + uri;
   }
   return o._hostPath;
}

//===========================================================
// <T>设置主机路径。</T>
//
// @method
// @param host:String 主机路径
//===========================================================
MO.RBrowser.prototype.setHostPath = function RBrowser_setHostPath(host){
   this._hostPath = host;
}

//===========================================================
// <T>获得内容路径。</T>
//
// @method
// @param uri:String 路径
// @return String 内容路径
//===========================================================
MO.RBrowser.prototype.contentPath = function RBrowser_contentPath(uri){
   var o = this;
   if(uri){
      return o._contentPath + uri;
   }
   return o._contentPath;
}

//===========================================================
// <T>设置内容路径。</T>
//
// @method
// @param path:String 路径
//===========================================================
MO.RBrowser.prototype.setContentPath = function RBrowser_setContentPath(path){
   this._contentPath = path;
}

//===========================================================
// <T>获得浏览器类型。</T>
//
// @method
// @return 浏览器类型
//===========================================================
MO.RBrowser.prototype.typeCd = function RBrowser_typeCd(){
   return this._typeCd;
}

//===========================================================
// <T>判断是否指定浏览器。</T>
//
// @param browserCd:EBrowser 浏览器类型
// @return 是否指定浏览器
//===========================================================
MO.RBrowser.prototype.isBrowser = function RBrowser_isBrowser(browserCd){
   return this._typeCd == browserCd;
}

//===========================================================
// <T>返回屏幕方向。</T>
//
// @method
// @return 屏幕方向
//===========================================================
MO.RBrowser.prototype.orientationCd = function RBrowser_orientationCd(){
   return this._orientationCd;
}

//===========================================================
// <T>设置屏幕方向。</T>
//
// @method
// @param orientationCd:EOrientation 屏幕方向
//===========================================================
MO.RBrowser.prototype.setOrientationCd = function RBrowser_setOrientationCd(orientationCd){
   this._orientationCd = orientationCd;
}

//===========================================================
// <T>判断是否横屏。</T>
//
// @method
// @return 是否横屏
//===========================================================
MO.RBrowser.prototype.isOrientationHorizontal = function RBrowser_isOrientationHorizontal(){
   return this._orientationCd == MO.EOrientation.Horizontal;
}

//===========================================================
// <T>判断是否垂直。</T>
//
// @method
// @return 是否垂直
//===========================================================
MO.RBrowser.prototype.isOrientationVertical = function RBrowser_isOrientationVertical(){
   return this._orientationCd == MO.EOrientation.Vertical;
}

//===========================================================
// <T>判断是否垂直。</T>
//
// @method
// @return 是否垂直
//===========================================================
MO.RBrowser.prototype.refreshOrientation = function RBrowser_refreshOrientation(){
   var o = this;
   var orientation = window.orientation;
   if(orientation != null){
      if((window.orientation == 180) || (window.orientation == 0)){
         o._orientationCd = MO.EOrientation.Vertical;
      }else if((window.orientation == 90) || (window.orientation == -90)){
         o._orientationCd = MO.EOrientation.Horizontal;
      }else{
         throw new TError(o, 'Unknown orientation mode.');
      }
   }
   return o._orientationCd;
}

//===========================================================
// <T>参数编码。</T>
//
// @method
// @param value:String 参数
// @return 编码字符串
//===========================================================
MO.RBrowser.prototype.encode = function RBrowser_encode(value){
   return escape(value);
}

//===========================================================
// <T>参数解码。</T>
//
// @method
// @param value:String 参数
// @return 解码字符串
//===========================================================
MO.RBrowser.prototype.decode = function RBrowser_decode(value){
   return unescape(value);
}

//===========================================================
// <T>URL参数编码。</T>
//
// @method
// @param url:String 网络地址
// @param flag:Boolean 是否全部
// @return 编码字符串
//===========================================================
MO.RBrowser.prototype.urlEncode = function RBrowser_urlEncode(url, flag){
   if(flag){
      return encodeURIComponent(url);
   }
   return encodeURI(url);
}

//===========================================================
// <T>URL参数解码。</T>
//
// @method
// @param url:String 网络地址
// @param flag:Boolean 是否全部
// @return 解码字符串
//===========================================================
MO.RBrowser.prototype.urlDecode = function RBrowser_urlDecode(url, flag){
   if(flag){
      return decodeURIComponent(url);
   }
   return decodeURI(url);
}

//==========================================================
// <T>设置窗口是否全屏。</T>
//
// @method
// @param hWindow:HtmlWindow 页面窗口
// @param flag:Boolean 标志
//==========================================================
MO.RBrowser.prototype.fullscreen = function RBrowser_fullscreen(hWindow, flag){
   if(flag){
      // 进入全屏模式
      if (hWindow.requestFullscreen){
         hWindow.requestFullscreen();
      }else if(hWindow.mozRequestFullScreen){
         hWindow.mozRequestFullScreen();
      }else if(hWindow.webkitRequestFullScreen){
         hWindow.webkitRequestFullScreen();
      }else if(hWindow.msRequestFullscreen){
         hWindow.msRequestFullscreen();
      }
   }else{
      // 退出全屏模式
      if (hWindow.exitFullscreen){
         hWindow.exitFullscreen();
      }else if(hWindow.mozCancelFullScreen){
         hWindow.mozCancelFullScreen();
      }else if(hWindow.webkitCancelFullScreen){
         hWindow.webkitCancelFullScreen();
      }else if(hWindow.msExitFullscreen){
         hWindow.msExitFullscreen();
      }
   }
}

//===========================================================
// <T>下载数据块。</T>
//
// @method
// @param fileName:String 文件名称
// @param blob:Blob 数据块
//===========================================================
MO.RBrowser.prototype.downloadBlob = function RBrowser_downloadBlob(fileName, blob){
   var link = document.createElement('A');
   var event = document.createEvent("MouseEvents");
   event.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
   link.download = fileName;
   link.href = URL.createObjectURL(blob);
   link.dispatchEvent(event);
}

//===========================================================
// <T>下载数据块。</T>
//
// @method
// @param fileName:String 文件名称
// @param text:String 文本内容
//===========================================================
MO.RBrowser.prototype.downloadText = function RBrowser_downloadText(fileName, text){
   var blob = MO.RBlob.fromText(text);
   this.downloadBlob(fileName, blob);
}
//..........................................................
// 实例化内容
MO.RBrowser = new MO.RBrowser();
MO.Window.Browser = MO.RBrowser;
