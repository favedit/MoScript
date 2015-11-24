//==========================================================
// <T>画板应用。</T>
//
// @class
// @author maocy
// @history 150930
//==========================================================
MO.FCanvasApplication = function FCanvasApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @attribute
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   // @attribute
   o._dynamicInfo  = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   //..........................................................
   // @method
   o.construct     = MO.FCanvasApplication_construct;
   // @method
   o.createChapter = MO.FCanvasApplication_createChapter;
   o.setup         = MO.FCanvasApplication_setup;
   // @method
   o.processResize = MO.FCanvasApplication_processResize;
   o.processEvent  = MO.FCanvasApplication_processEvent;
   o.process       = MO.FCanvasApplication_process;
   // @method
   o.dispose       = MO.FCanvasApplication_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FCanvasApplication_construct = function FCanvasApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
}

//==========================================================
// <T>根据代码创建章节。</T>
//
// @method
// @param code:String 代码
// @return FChapter 章节
//==========================================================
MO.FCanvasApplication_createChapter = function FCanvasApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      // 创建图表章节
      case MO.ECanvasChapter.Simple:
         chapter = MO.Class.create(MO.FCanvasSimpleChapter);
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
MO.FCanvasApplication_setup = function FCanvasApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   //..........................................................
   // 创建桌面
   var desktop = o._desktop = MO.Class.create(MO.FCanvasDesktop);
   desktop.build(hPanel);
   // 检查状态
   var canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   //..........................................................
   // 创建动态信息
   var control = o._dynamicInfo = MO.Class.create(MO.FCanvasDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   return true;
}

//==========================================================
// <T>大小变更事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FCanvasApplication_processResize = function FCanvasApplication_processResize(event){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   // 处理事件
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FCanvasApplication_processEvent = function FCanvasApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   // 处理事件
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FCanvasApplication_process = function FCanvasApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   // 桌面处理
   o._desktop.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FCanvasApplication_dispose = function FCanvasApplication_dispose(){
   var o = this;
   // 父处理
   o.__base.FApplication.dispose.call(o);
}
