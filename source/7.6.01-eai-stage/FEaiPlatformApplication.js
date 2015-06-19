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
      o.construct       = FEaiPlatformApplication_construct;
      // @method
      o.setup           = FEaiPlatformApplication_setup;
      o.selectChapter   = FEaiPlatformApplication_selectChapter;
      // @method
      o.dispose         = FEaiPlatformApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiPlatformApplication_construct = function FEaiPlatformApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
      // 创建线程
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.process);
      RConsole.find(FThreadConsole).start(thread);
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
      chapter.setup();
      o.registerChapter(chapter);
      // 创建登录舞台
      var chapter = o._chapterLogin = MO.RClass.create(MO.FEaiLoginChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
      // 创建场景舞台
      var chapter = o._chapterScene = MO.RClass.create(MO.FEaiSceneChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
      // 创建表格舞台
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
   }

   //==========================================================
   // <T>选择舞台。</T>
   //
   // @method
   // @param code:String 代码
   // @return FChapter 舞台
   //==========================================================
   MO.FEaiPlatformApplication_selectChapter = function FEaiPlatformApplication_selectChapter(code){
      var o = this;
      o.__base.FEaiApplication.selectChapter.call(o, code);
      // 设置激活内容
      //MO.Eai.Canvas.selectChapter(o._activeChapter);
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
