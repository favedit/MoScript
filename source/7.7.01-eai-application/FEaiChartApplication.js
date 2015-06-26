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
      var scene = chapter.selectSceneByCode(o._sceneCode);
      // 创建场景画板
      //var stage = scene.activeStage();
      //var layer = stage.faceLayer();
      //var timeline = MO.RClass.create(MO.FGuiTimeline);
      //timeline.linkGraphicContext(MO.Eai.Canvas);
      //timeline.build();
      //layer.pushRenderable(timeline.renderable());
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
      // 创建画板
      var canvas = MO.Eai.Canvas = o._canvas = o.createCanvas();
      canvas.build(hPanel);
      canvas.setPanel(hPanel);
      o.linkGraphicContext(canvas);
      //..........................................................
      // 创建加载中舞台
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      // 创建表格舞台
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      //..........................................................
      // 加载资源
      var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
      resourceConsole.addLoadListener(o, o.onLoadResource);
      resourceConsole.load();
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
