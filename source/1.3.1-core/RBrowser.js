//==========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
MO.RBrowser = new function RBrowser(){
   var o = this;
   //..........................................................
   // @attribute
   o._deviceCd      = MO.EDevice.Unknown;
   o._softwareCd    = MO.ESoftware.Unknown;
   o._typeCd        = MO.EBrowser.Unknown;
   o._hostPath      = '';
   o._contentPath   = '';
   //..........................................................
   // @event
   o.onLog          = RBrowser_onLog;
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
   return o;

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
         o._typeCd = MO.EDevice.Mobile;
         o._softwareCd = MO.ESoftware.Android;
      }
      // 判断浏览器类型
      if(s.indexOf("chrome") != -1){
         o._typeCd = MO.EBrowser.Chrome;
      }else if(s.indexOf("firefox") != -1){
         o._typeCd = MO.EBrowser.FireFox;
      }else if(s.indexOf("msie") != -1){
         o._typeCd = MO.EBrowser.Explorer;
      }else if(s.indexOf("windows") != -1){
         o._typeCd = MO.EBrowser.Explorer;
      }else if(s.indexOf("safari") != -1){
         o._typeCd = MO.EBrowser.Safari;
      }else{
         alert('Unknown browser.\n' + s);
         return;
      }
      // 注册输出接口
      if(o._typeCd == MO.EBrowser.Chrome){
         MO.RLogger.outputListeners().register(o, o.onLog);
      }
      // 输出日志
      MO.RLogger.info(o, 'Parse browser agent. (type_cd={1})', MO.REnum.decode(MO.EBrowser, o._typeCd));
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
}
