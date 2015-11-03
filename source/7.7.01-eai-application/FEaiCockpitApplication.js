//==========================================================
// <T>应用。</T>
//
// @class
// @author maocy
// @history 150606
//==========================================================
MO.FEaiCockpitApplication = function FEaiCockpitApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   //..........................................................
   // @attribute
   o._chapterCode    = MO.EEaiChapter.Cockpit;
   o._backgroundUrl  = MO.Class.register(o, new MO.AGetSet('_backgroundUrl'), '{eai.resource}/cockpit/background.jpg');
   // @attribute
   o._chapterCockpit = MO.Class.register(o, new MO.AGetter('_chapterCockpit'));
   // @attribute
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   //..........................................................
   // @method
   o.onLoadGround    = MO.FEaiCockpitApplication_onLoadGround;
   o.onLoadResource  = MO.FEaiCockpitApplication_onLoadResource;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitApplication_construct;
   // @method
   o.createChapter   = MO.FEaiCockpitApplication_createChapter;
   o.setup           = MO.FEaiCockpitApplication_setup;
   // @method
   o.dispose         = MO.FEaiCockpitApplication_dispose;
   return o;
}

//==========================================================
// <T>加载资源处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitApplication_onLoadGround = function FEaiCockpitApplication_onLoadGround(event){
   var o = this;
   // 选择舞台和章节
   var chapter = o.selectChapterByCode(o._chapterCode);
   chapter.selectSceneByCode(o._sceneCode);
   // 修正画面大小
   o.processResize();
}

//==========================================================
// <T>加载资源处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitApplication_onLoadResource = function FEaiCockpitApplication_onLoadResource(event){
   var o = this;
   var canvas = o._desktop.canvas3d();
   if(o._backgroundUrl){
      // 加载背景
      var bitmap = o._groundBitmap = canvas.graphicContext().createObject(MO.FE3dBitmap);
      bitmap._optionSelect = false;
      bitmap.loadUrl(o._backgroundUrl);
      bitmap.material().info().effectCode = 'fill';
      bitmap._renderable.addImageLoadListener(o, o.onLoadGround);
   }else{
      o.onLoadGround(event);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitApplication_construct = function FEaiCockpitApplication_construct(){
   var o = this;
   o.__base.FEaiApplication.construct.call(o);
}

//==========================================================
// <T>根据代码创建章节。</T>
//
// @method
// @param code:String 代码
// @return FChapter 章节
//==========================================================
MO.FEaiCockpitApplication_createChapter = function FEaiCockpitApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      // 创建管理驾驶舱
      case MO.EEaiChapter.Cockpit:
         chapter = o._chapterCockpit = MO.Class.create(MO.FEaiCockpitChapter);
         break;
   }
   chapter.linkGraphicContext(o);
   return chapter;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FEaiCockpitApplication_setup = function FEaiCockpitApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FEaiApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   //..........................................................
   // 创建桌面
   var desktop = o._desktop = MO.Class.create(MO.FCanvasDesktop);
   desktop.build(hPanel);
   var canvas = MO.Eai.Canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   //..........................................................
   // 创建动态信息
   var control = o._dynamicInfo = MO.Class.create(MO.FEaiDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   //..........................................................
   // 加载资源
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load('{eai.resource}/resource.dat');
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitApplication_dispose = function FEaiCockpitApplication_dispose(){
   var o = this;
   // 释放属性
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   // 父处理
   o.__base.FEaiApplication.dispose.call(o);
}
