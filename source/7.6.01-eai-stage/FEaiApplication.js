with(MO){
   //==========================================================
   // <T>应用。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
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
      o.construct       = FEaiApplication_construct;
      // @method
      o.setup           = FEaiApplication_setup;
      o.selectChapter   = FEaiApplication_selectChapter;
      // @method
      o.dispose         = FEaiApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
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
   MO.FEaiApplication_setup = function FEaiApplication_setup(){
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
   MO.FEaiApplication_selectChapter = function FEaiApplication_selectChapter(code){
      var o = this;
      o.__base.FApplication.selectChapter.call(o, code);
      // 设置激活内容
      //MO.Eai.Canvas.selectChapter(o._activeChapter);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      // 父处理
      o.__base.FApplication.dispose.call(o);
   }
}
