//==========================================================
// <T>应用。</T>
//
// @class
// @author maocy
// @history 150606
//==========================================================
MO.FEaiChartApplication = function FEaiChartApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   //..........................................................
   // @attribute
   o._chapterCode    = MO.EEaiChapter.Chart;
   o._backgroundUrl  = MO.Class.register(o, new MO.AGetSet('_backgroundUrl'), '{eai.resource}/background2.jpg');
   // @attribute
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   // @attribute
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   //..........................................................
   // @method
   o.onLoadGround    = MO.FEaiChartApplication_onLoadGround;
   o.onLoadResource  = MO.FEaiChartApplication_onLoadResource;
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartApplication_construct;
   // @method
   o.createChapter   = MO.FEaiChartApplication_createChapter;
   o.setup           = MO.FEaiChartApplication_setup;
   // @method
   o.dispose         = MO.FEaiChartApplication_dispose;
   return o;
}

//==========================================================
// <T>加载资源处理。</T>
//
// @method
//==========================================================
MO.FEaiChartApplication_onLoadGround = function FEaiChartApplication_onLoadGround(event){
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
MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(event){
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
MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
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
MO.FEaiChartApplication_createChapter = function FEaiChartApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      // 创建图表章节
      case MO.EEaiChapter.Chart:
         chapter = o._chapterChart = MO.Class.create(MO.FEaiChartChapter);
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
MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
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
MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
   var o = this;
   // 释放属性
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   // 父处理
   o.__base.FEaiApplication.dispose.call(o);
}
