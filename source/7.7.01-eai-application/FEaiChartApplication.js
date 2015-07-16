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
   o._sceneCode      = MO.Class.register(o, new MO.AGetSet('_sceneCode'), MO.EEaiScene.ChartHistory);
   o._chapterLoading = MO.Class.register(o, new MO.AGetter('_chapterLoading'));
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   // @attribute
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   // @attribute
   o._thread         = null;
   o._interval       = 10;
   //..........................................................
   // @method
   o.onLoadCountry   = MO.FEaiChartApplication_onLoadCountry;
   o.onLoadResource  = MO.FEaiChartApplication_onLoadResource;
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartApplication_construct;
   // @method
   o.createCanvas    = MO.FEaiChartApplication_createCanvas;
   o.setup           = MO.FEaiChartApplication_setup;
   // @method
   o.dispose         = MO.FEaiChartApplication_dispose;
   return o;
}

//==========================================================
// <T>加载国家处理。</T>
//
// @method
//==========================================================
MO.FEaiChartApplication_onLoadCountry = function FEaiChartApplication_onLoadCountry(event){
   var o = this;
   // 选择舞台和章节
   var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
   chapter.selectSceneByCode(o._sceneCode);
   // 修正画面大小
   o.processResize();
}

//==========================================================
// <T>加载资源处理。</T>
//
// @method
//==========================================================
MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
   var o = this;
   var canvas = o._desktop.canvas3d();
   //..........................................................
   // 加载国家数据
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.linkGraphicContext(canvas);
   entityConsole.setup();
   entityConsole.addLoadCountryListener(o, o.onLoadCountry);
   entityConsole.loadCountryData();
   //..........................................................
   // 修正画面大小
   o.processResize();
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
// <T>创建画板。</T>
//
// @method
// @return FEaiCanvas 画板
//==========================================================
MO.FEaiChartApplication_createCanvas = function FEaiChartApplication_createCanvas(){
   return RClass.create(FEaiChartCanvas);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
   var o = this;
   o.__base.FEaiApplication.setup.call(o, hPanel);
   o._hPanel = hPanel;
   //..........................................................
   // 创建桌面
   var desktop = o._desktop = MO.RClass.create(MO.FEaiChartDesktop);
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
   // 创建图表舞台
   var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   //..........................................................
   // 加载资源
   var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load('{eai.resource}/resource.dat');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
   var o = this;
   o._chapterLoading = MO.Lang.Object.dispose(o._chapterLoading);
   o._chapterChart = MO.Lang.Object.dispose(o._chapterChart);
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   // 父处理
   o.__base.FEaiApplication.dispose.call(o);
}
