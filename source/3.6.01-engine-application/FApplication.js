with(MO){
   //==========================================================
   // <T>应用对象。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FApplication = function FApplication(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerEnterFrame, MListenerLeaveFrame);
      //..........................................................
      // @attribute
      o._activeChapter      = RClass.register(o, new AGetter('_activeChapter'));
      o._chapters           = RClass.register(o, new AGetter('_chapters'));
      // @attribute
      o._eventEnterFrame    = null;
      o._eventLeaveFrame    = null;
      //..........................................................
      // @method
      o.construct           = FApplication_construct;
      // @method
      o.registerChapter     = FApplication_registerChapter;
      o.unregisterChapter   = FApplication_unregisterChapter;
      o.selectChapter       = FApplication_selectChapter;
      o.selectChapterByCode = FApplication_selectChapterByCode;
      // @method
      o.process             = FApplication_process;
      // @method
      o.dispose             = FApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FApplication_construct = function FApplication_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置变量
      o._chapters = new TDictionary();
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
   }

   //==========================================================
   // <T>注册一个舞台。</T>
   //
   // @method
   // @param chapter:FChapter 舞台
   //==========================================================
   MO.FApplication_registerChapter = function FApplication_registerChapter(chapter){
      var o = this;
      var code = chapter.code();
      o._chapters.set(code, chapter);
   }

   //==========================================================
   // <T>注销一个舞台。</T>
   //
   // @method
   // @param chapter:FChapter 舞台
   //==========================================================
   MO.FApplication_unregisterChapter = function FApplication_unregisterChapter(chapter){
      var o = this;
      var code = chapter.code();
      o._chapters.set(code, null);
   }

   //==========================================================
   // <T>选择舞台。</T>
   //
   // @method
   // @param chapter:FChapter 舞台
   //==========================================================
   MO.FApplication_selectChapter = function FApplication_selectChapter(chapter){
      var o = this;
      if(o._activeChapter != chapter){
         // 注销舞台
         var activeChapter = o._activeChapter;
         if(activeChapter){
            activeChapter.deactive();
            o._activeChapter = null;
         }
         // 激活舞台
         if(chapter){
            chapter.active();
            o._activeChapter = chapter;
         }
      }
   }

   //==========================================================
   // <T>根据代码选择舞台。</T>
   //
   // @method
   // @param code:String 代码
   // @return FChapter 舞台
   //==========================================================
   MO.FApplication_selectChapterByCode = function FApplication_selectChapterByCode(code){
      var o = this;
      var chapter = o._chapters.get(code);
      o.selectChapter(chapter);
      return chapter;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FApplication_process = function FApplication_process(){
      var o = this;
      // 前处理
      o.processEnterFrameListener(o._eventEnterFrame);
      // 场景处理
      if(o._activeChapter){
         o._activeChapter.process();
      }
      // 后处理
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FApplication_dispose = function FApplication_dispose(){
      var o = this;
      o._activeChapter = null;
      o._chapters = RObject.dispose(o._chapters, true);
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      // 父处理
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
