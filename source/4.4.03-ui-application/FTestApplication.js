//==========================================================
// <T>界面应用对象。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FTestApplication = function FTestApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @method
   o.setup = MO.FTestApplication_setup;
   return o;
}

//==========================================================
// <T>注册一个舞台。</T>
//
// @method
// @param chapter:FChapter 舞台
//==========================================================
MO.FTestApplication_setup = function FTestApplication_setup(hPanel){
   var o = this;
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   // 创建浏览器信息
   var xbrowser = xroot.create('Browser')
   MO.Window.Browser.saveConfig(xbrowser);
   // 创建桌面节点
   var xdesktop = xbrowser.create('Desktop')
   var xcontext2d = xdesktop.create('Context2d');
   var xcontext3d = xdesktop.create('Context3d');
   // 创建桌面信息
   var hCanvas = MO.Window.Builder.create(hPanel, 'CANVAS');
   var context3d = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas);
   if(context3d){
      var parameter = context3d.parameter('VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
      if(parameter){
         identityCode += '|' + parameter;
      }
      context3d.saveConfig(xcontext3d);
   }
   // 设置鉴定码
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot)
}
