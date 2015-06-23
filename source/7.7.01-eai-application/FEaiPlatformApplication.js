with(MO){
   //==========================================================
   // <T>应用。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FEaiPlatformApplication = function FEaiPlatformApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      //..........................................................
      // @attribute
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterLogin   = RClass.register(o, new AGetter('_chapterLogin'));
      o._chapterScene   = RClass.register(o, new AGetter('_chapterScene'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      // @attribute
      o._thread         = null;
      o._interval       = 10;
      //..........................................................
      // @method
      o.onLoadResource  = FEaiPlatformApplication_onLoadResource;
      //..........................................................
      // @method
      o.construct       = FEaiPlatformApplication_construct;
      // @method
      o.createCanvas    = FEaiPlatformApplication_createCanvas;
      o.setup           = FEaiPlatformApplication_setup;
      // @method
      o.dispose         = FEaiPlatformApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiPlatformApplication_onLoadResource = function FEaiPlatformApplication_onLoadResource(){
      var o = this;
      // 选择舞台和章节
      var chapter = o.selectChapterByCode(MO.EEaiChapter.Scene);
      var scene = chapter.selectSceneByCode(MO.EEaiScene.Country);
      // 修正大小
      // o.processResize();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiPlatformApplication_construct = function FEaiPlatformApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
   }

   //==========================================================
   // <T>创建画板。</T>
   //
   // @method
   // @return FEaiCanvas 画板
   //==========================================================
   MO.FEaiPlatformApplication_createCanvas = function FEaiPlatformApplication_createCanvas(){
      return RClass.create(FEaiPlatformCanvas);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiPlatformApplication_setup = function FEaiPlatformApplication_setup(){
      var o = this;
      // 创建加载中舞台
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      // 创建登录舞台
      var chapter = o._chapterLogin = MO.RClass.create(MO.FEaiLoginChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      // 创建场景舞台
      var chapter = o._chapterScene = MO.RClass.create(MO.FEaiSceneChapter);
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
   MO.FEaiPlatformApplication_dispose = function FEaiPlatformApplication_dispose(){
      var o = this;
      // 父处理
      o.__base.FEaiApplication.dispose.call(o);
   }
}
