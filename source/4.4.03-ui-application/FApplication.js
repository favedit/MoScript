//==========================================================
// <T>应用对象。</T>
//
// @class
// @author maocy
// @history 150606
//==========================================================
MO.FApplication = function FApplication(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher);
   //..........................................................
   // @attribute
   o._activeChapter       = MO.Class.register(o, new MO.AGetter('_activeChapter'));
   o._chapters            = MO.Class.register(o, new MO.AGetter('_chapters'));
   // @attribute
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   //..........................................................
   // @event
   o.onProcess            = MO.FApplication_onProcess;
   //..........................................................
   // @method
   o.construct            = MO.FApplication_construct;
   // @method
   o.registerChapter      = MO.FApplication_registerChapter;
   o.unregisterChapter    = MO.FApplication_unregisterChapter;
   o.selectChapter        = MO.FApplication_selectChapter;
   o.selectChapterByCode  = MO.FApplication_selectChapterByCode;
   // @method
   o.processResize        = MO.FApplication_processResize;
   o.processEvent         = MO.FApplication_processEvent;
   o.process              = MO.FApplication_process;
   // @method
   o.dispose              = MO.FApplication_dispose;
   return o;
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FApplication_onProcess = function FApplication_onProcess(event){
   var o = this;
   // 章节处理
   var chapter = o._activeChapter;
   if(chapter){
      chapter.process();
   }
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
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
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
   chapter.setApplication(o);
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
// <T>大小变更事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FApplication_processResize = function FApplication_processResize(){
   var o = this;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FApplication_processEvent = function FApplication_processEvent(event){
   var o = this;
   // 处理事件
   o.dispatcherEvent(event);
   // 激活章节处理事件
   var chapter = o._activeChapter;
   if(chapter){
      chapter.processEvent(event);
   }
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
   o.onProcess();
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
   o._chapters = MO.Lang.Object.dispose(o._chapters, true);
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
   // 父处理
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
