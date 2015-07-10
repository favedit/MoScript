with(MO){
   //==========================================================
   // <T>应用。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FEaiChartApplication = function FEaiChartApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      //..........................................................
      // @attribute
      o._sceneCode      = RClass.register(o, new AGetSet('_sceneCode'), MO.EEaiScene.ChartHistory);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      // @attribute
      o._thread         = null;
      o._interval       = 10;
      //..........................................................
      // @method
      o.onLoadResource  = FEaiChartApplication_onLoadResource;
      //..........................................................
      // @method
      o.construct       = FEaiChartApplication_construct;
      // @method
      o.createCanvas    = FEaiChartApplication_createCanvas;
      o.setup           = FEaiChartApplication_setup;
      // @method
      o.dispose         = FEaiChartApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
      var o = this;
      // 选择舞台和章节
      var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
      chapter.selectSceneByCode(o._sceneCode);
      //..........................................................
      // 修正画面大小
      o.processResize();
      // 重置大小
      //o.onOperationResize(null);
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
      o.linkGraphicContext(canvas);
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
      o._chapterLoading = RObject.dispose(o._chapterLoading);
      o._chapterChart = RObject.dispose(o._chapterChart);
      // 父处理
      o.__base.FEaiApplication.dispose.call(o);
   }
}
