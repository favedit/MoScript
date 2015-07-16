MO.MGuiBorder = function MGuiBorder(o){
   o = MO.RClass.inherits(this, o);
   o._borderInner = MO.RClass.register(o, [new MO.APtyBorder('_borderInner'), new MO.AGetter('_borderInner')]);
   o._borderOuter = MO.RClass.register(o, [new MO.APtyBorder('_borderOuter'), new MO.AGetter('_borderOuter')]);
   o.construct   = MO.MGuiBorder_construct;
   o.dispose     = MO.MGuiBorder_dispose;
   return o;
}
MO.MGuiBorder_construct = function MGuiBorder_construct(){
   var o = this;
   o._borderInner = new MO.SBorder();
   o._borderOuter = new MO.SBorder();
}
MO.MGuiBorder_dispose = function MGuiBorder_dispose(){
   var o = this;
   o._borderInner = MO.RObject.dispose(o._borderInner);
   o._borderOuter = MO.RObject.dispose(o._borderOuter);
}
with(MO){
   MO.MGuiContainer = function MGuiContainer(o){
      o = RClass.inherits(this, o);
      o.createChild = MGuiContainer_createChild;
      o.appendChild = RMethod.empty;
      o.removeChild = RMethod.empty;
      return o;
   }
   MO.MGuiContainer_createChild = function MGuiContainer_createChild(xconfig){
      var o = this;
      var child = RGuiControl.newInstance(xconfig);
      child._parent = o;
      return child;
   }
}
MO.MGuiDispatcher = function MGuiDispatcher(o){
   o = MO.Class.inherits(this, o);
   o.onOperationDown   = MO.MGuiDispatcher_onOperationDown;
   o.onOperationMove   = MO.MGuiDispatcher_onOperationMove;
   o.onOperationUp     = MO.MGuiDispatcher_onOperationUp;
   o.onOperationResize = MO.MGuiDispatcher_onOperationResize;
   o.dispatcherEvent   = MO.MGuiDispatcher_dispatcherEvent;
   return o;
}
MO.MGuiDispatcher_onOperationDown = function MGuiDispatcher_onOperationDown(event){
   var o = this;
}
MO.MGuiDispatcher_onOperationMove = function MGuiDispatcher_onOperationMove(event){
   var o = this;
}
MO.MGuiDispatcher_onOperationUp = function MGuiDispatcher_onOperationUp(event){
   var o = this;
}
MO.MGuiDispatcher_onOperationResize = function MGuiDispatcher_onOperationResize(event){
   var o = this;
}
MO.MGuiDispatcher_dispatcherEvent = function MGuiDispatcher_dispatcherEvent(event){
   var o = this;
   switch(event.code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
   }
}
with(MO){
   MO.MGuiLocation = function MGuiLocation(o){
      o = RClass.inherits(this, o);
      o._left   = RClass.register(o, [new APtyInteger('_left'), new AGetSet('_left')]);
      o._right  = RClass.register(o, [new APtyInteger('_right'), new AGetSet('_right')]);
      o._top    = RClass.register(o, [new APtyInteger('_top'), new AGetSet('_top')]);
      o._bottom = RClass.register(o, [new APtyInteger('_bottom'), new AGetSet('_bottom')]);
      return o;
   }
}
with(MO){
   MO.MGuiSize = function MGuiSize(o){
      o = RClass.inherits(this, o);
      o._location   = RClass.register(o, [new APtyPoint2('_location'), new AGetter('_location')]);
      o._right      = RClass.register(o, [new APtyInteger('_right'), new AGetSet('_right')], 0);
      o._bottom     = RClass.register(o, [new APtyInteger('_bottom'), new AGetSet('_bottom')], 0);
      o._size       = RClass.register(o, [new APtySize2('_size'), new AGetter('_size')]);
      o._scale      = RClass.register(o, [new APtySize2('_scale'), new AGetter('_scale')]);
      o.construct   = MGuiSize_construct;
      o.left        = MGuiSize_left;
      o.setLeft     = MGuiSize_setLeft;
      o.top         = MGuiSize_top;
      o.setTop      = MGuiSize_setTop;
      o.setLocation = MGuiSize_setLocation;
      o.width       = MGuiSize_width;
      o.setWidth    = MGuiSize_setWidth;
      o.height      = MGuiSize_height;
      o.setHeight   = MGuiSize_setHeight;
      o.setSize     = MGuiSize_setSize;
      o.setScale    = MGuiSize_setScale;
      o.setBounds   = MGuiSize_setBounds;
      o.dispose     = MGuiSize_dispose;
      return o;
   }
   MO.MGuiSize_construct = function MGuiSize_construct(){
      var o = this;
      o._location = new SPoint2(0, 0);
      o._size = new SSize2(128, 128);
      o._scale = new SSize2(1, 1);
   }
   MO.MGuiSize_left = function MGuiSize_left(){
      return this._location.x;
   }
   MO.MGuiSize_setLeft = function MGuiSize_setLeft(value){
      this.setLocation(value, this._location.y);
   }
   MO.MGuiSize_top = function MGuiSize_top(){
      return this._location.y;
   }
   MO.MGuiSize_setTop = function MGuiSize_setTop(value){
      this.setLocation(this._location.x, value);
   }
   MO.MGuiSize_setLocation = function MGuiSize_setLocation(x, y){
      this._location.set(x, y);
   }
   MO.MGuiSize_width = function MGuiSize_width(){
      return this._size.width;
   }
   MO.MGuiSize_setWidth = function MGuiSize_setWidth(value){
      this.setSize(value, this._size.height);
   }
   MO.MGuiSize_height = function MGuiSize_height(){
      return this._size.height;
   }
   MO.MGuiSize_setHeight = function MGuiSize_setHeight(value){
      this.setSize(this._size.width, value);
   }
   MO.MGuiSize_setSize = function MGuiSize_setSize(width, height){
      this._size.set(width, height);
   }
   MO.MGuiSize_setScale = function MGuiSize_setScale(width, height){
      this._scale.set(width, height);
   }
   MO.MGuiSize_setBounds = function MGuiSize_setBounds(left, top, width, height){
      var o = this;
      o.setLocation(left, top);
      o.setSize(width, height);
   }
   MO.MGuiSize_dispose = function MGuiSize_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._scale = RObject.dispose(o._scale);
   }
}
MO.SGuiImage = function SGuiImage(){
   var o = this;
   o.ready       = false;
   o.bitmap      = null;
   o.resource    = null;
   o.onImageLoad = MO.SGuiImage_onImageLoad;
   o.testReady   = MO.SGuiImage_testReady;
   o.load        = MO.SGuiImage_load;
   o.dispose     = MO.SGuiImage_dispose;
   return o;
}
MO.SGuiImage_onImageLoad = function SGuiImage_onImageLoad(event){
   this.ready = true;
}
MO.SGuiImage_testReady = function SGuiImage_testReady(){
   return this.ready;
}
MO.SGuiImage_load = function SGuiImage_load(){
   var o = this;
   o.ready = false;
   var url = null;
   if(MO.Lang.String.startsWith(o.resource, 'url:')){
      var uri = o.resource.substring(4);
      url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   }else{
      throw new MO.TError('Invalid url.');
   }
   var bitmap = o.bitmap = MO.Class.create(MO.FImage);
   bitmap.addLoadListener(o, o.onImageLoad);
   bitmap.loadUrl(url);
}
MO.SGuiImage_dispose = function SGuiImage_dispose(){
   var o = this;
   o.bitmap = MO.RObject.dispose(o.bitmap);
   return o;
}
MO.SGuiPaintEvent = function SGuiPaintEvent(){
   var o = this;
   o.graphic         = null;
   o.parentRectangle = new MO.SRectangle();
   o.rectangle       = new MO.SRectangle();
   o.free            = MO.SGuiPaintEvent_free;
   o.dispose         = MO.SGuiPaintEvent_dispose;
   return o;
}
MO.SGuiPaintEvent_free = function SGuiPaintEvent_free(){
   var o = this;
   o.graphic = null;
   return o;
}
MO.SGuiPaintEvent_dispose = function SGuiPaintEvent_dispose(){
   var o = this;
   o.parentRectangle = MO.RObject.dispose(o.parentRectangle);
   o.rectangle = MO.RObject.dispose(o.rectangle);
   return o;
}
MO.SGuiUpdateEvent = function SGuiUpdateEvent(){
   var o = this;
   o.flag      = false;
   o.rectangle = new MO.SRectangle();
   o.isBefore  = MO.SGuiUpdateEvent_isBefore;
   o.isAfter   = MO.SGuiUpdateEvent_isAfter;
   o.dispose   = MO.SGuiUpdateEvent_dispose;
   return o;
}
MO.SGuiUpdateEvent_isBefore = function SGuiUpdateEvent_isBefore(){
   return this.flag;
}
MO.SGuiUpdateEvent_isAfter = function SGuiUpdateEvent_isAfter(){
   return !this.flag;
}
MO.SGuiUpdateEvent_dispose = function SGuiUpdateEvent_dispose(){
   var o = this;
   o.rectangle = MO.RObject.dispose(o.rectangle);
   return o;
}
MO.FGuiAction = function FGuiAction(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineAction);
   o._controls          = MO.Class.register(o, [new MO.AGetter('_controls')]);
   o._listenersProcess  = MO.Class.register(o, new MO.AListener('_listenersProcess', MO.EEvent.Process));
   o._listenersComplete = MO.Class.register(o, new MO.AListener('_listenersComplete', MO.EEvent.Complete));
   o.construct          = MO.FGuiAction_construct;
   o.push               = MO.FGuiAction_push;
   o.startControl       = MO.FGuiAction_startControl;
   o.start              = MO.FGuiAction_start;
   o.processControl     = MO.FGuiAction_processControl;
   o.process            = MO.FGuiAction_process;
   o.dispose            = MO.FGuiAction_dispose;
   return o;
}
MO.FGuiAction_construct = function FGuiAction_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineAction.construct.call(o);
   o._controls = new MO.TObjects();
}
MO.FGuiAction_push = function FGuiAction_push(control){
   this._controls.push(control);
}
MO.FGuiAction_startControl = function FGuiAction_startControl(context, control){
   var o = this;
}
MO.FGuiAction_start = function FGuiAction_start(context){
   var o = this;
   o.__base.MTimelineAction.start.call(o);
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      o.startControl(context, control);
   }
}
MO.FGuiAction_processControl = function FGuiAction_processControl(context, control){
   var o = this;
}
MO.FGuiAction_process = function FGuiAction_process(context){
   var o = this;
   o.__base.MTimelineAction.process.call(o);
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      o.processControl(context, control);
   }
}
MO.FGuiAction_dispose = function FGuiAction_dispose(){
   var o = this;
   o._controls = MO.Lang.Object.dispose(o._controls);
   o.__base.MTimelineAction.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiActionAlpha = function FGuiActionAlpha(o){
   o = MO.Class.inherits(this, o, MO.FGuiAction);
   o._alphaBegin    = MO.Class.register(o, [new MO.AGetSet('_alphaBegin')], 0);
   o._alphaEnd      = MO.Class.register(o, [new MO.AGetSet('_alphaEnd')], 1);
   o._alphaInterval = MO.Class.register(o, [new MO.AGetSet('_alphaInterval')], 0.1);
   o._alphaCurrent  = 0;
   o._eventProcess  = null;
   o._eventFinish   = null;
   o.construct      = MO.FGuiActionAlpha_construct;
   o.doComplete     = MO.FGuiActionAlpha_doComplete;
   o.startControl   = MO.FGuiActionAlpha_startControl;
   o.processControl = MO.FGuiActionAlpha_processControl;
   o.dispose        = MO.FGuiActionAlpha_dispose;
   return o;
}
MO.FGuiActionAlpha_construct = function FGuiActionAlpha_construct(){
   var o = this;
   o.__base.FGuiAction.construct.call(o);
   o._eventProcess = new MO.SEvent();
   o._eventFinish = new MO.SEvent();
}
MO.FGuiActionAlpha_doComplete = function FGuiActionAlpha_doComplete(){
   var o = this;
   var event = o._eventProcess;
   o.processCompleteListener(event);
   o._alphaCurrent = o._alphaEnd;
   o._statusStop = true;
}
MO.FGuiActionAlpha_startControl = function FGuiActionAlpha_startControl(context, control){
   var o = this;
   o.__base.FGuiAction.startControl.call(o);
   o._alphaCurrent = o._alphaBegin;
}
MO.FGuiActionAlpha_processControl = function FGuiActionAlpha_processControl(context, control){
   var o = this;
   o.__base.FGuiAction.processControl.call(o);
   o._alphaCurrent += o._alphaInterval;
   if(o._alphaInterval > 0){
      if(o._alphaCurrent >= o._alphaEnd){
         o.doComplete();
      }
   }else if(o._alphaInterval < 0){
      if(o._alphaCurrent <= o._alphaEnd){
         o.doComplete();
      }
   }else{
      o.doComplete();
   }
   if(!o._statusStop){
      var event = o._eventProcess;
      event.alpha = o._alphaCurrent;
      o.processProcessListener(event);
   }
   control.doActionAlpha(o._alphaCurrent);
}
MO.FGuiActionAlpha_dispose = function FGuiActionAlpha_dispose(){
   var o = this;
   o._eventProcess = MO.Lang.Object.dispose(o._eventProcess);
   o._eventFinish = MO.Lang.Object.dispose(o._eventFinish);
   o.__base.FGuiAction.dispose.call(o);
}
MO.FGuiComponent = function FGuiComponent(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MUiComponent, MO.MProperty);
   o.dispose = MO.FGuiComponent_dispose;
   return o;
}
MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
   var o = this;
   o.__base.MUiComponent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
with(MO){
   MO.FGuiContainer = function FGuiContainer(o){
      o = RClass.inherits(this, o, FGuiControl, MGuiContainer);
      return o;
   }
}
MO.FGuiControl = function FGuiControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiComponent, MO.MUiControl, MO.MGraphicObject, MO.MRenderableLinker, MO.MListener, MO.MGuiSize, MO.MUiMargin, MO.MUiPadding, MO.MGuiBorder);
   o._optionScale            = MO.Class.register(o, [new MO.AGetter('_optionScale')], true);
   o._alpha                  = MO.Class.register(o, [new MO.APtyString('_alpha'), new MO.AGetSet('_alpha')], 1);
   o._displayOrder           = MO.Class.register(o, [new MO.APtyString('_displayOrder'), new MO.AGetSet('_displayOrder')], 0);
   o._foreColor              = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')], '#FFFFFF');
   o._foreFont               = MO.Class.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor              = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backResource           = MO.Class.register(o, [new MO.APtyString('_backResource'), new MO.AGetSet('_backResource')]);
   o._backGrid               = MO.Class.register(o, [new MO.APtyPadding('_backGrid'), new MO.AGetter('_backGrid')]);
   o._backHoverColor         = MO.Class.register(o, [new MO.APtyString('_backHoverColor'), new MO.AGetSet('_backHoverColor')]);
   o._backHoverResource      = MO.Class.register(o, [new MO.APtyString('_backHoverResource'), new MO.AGetSet('_backHoverResource')]);
   o._backHoverGrid          = MO.Class.register(o, [new MO.APtyPadding('_backHoverGrid'), new MO.AGetter('_backHoverGrid')]);
   o._statusReady            = false;
   o._statusDirty            = true;
   o._statusDirtyAll         = false;
   o._statusHover            = false;
   o._backImage              = null;
   o._backHoverResource      = null;
   o._clientRectangle        = MO.Class.register(o, new MO.AGetter('_clientRectangle'));
   o._clientScale            = null;
   o._eventRectangle         = null;
   o._operationDownListeners = MO.Class.register(o, new MO.AListener('_operationDownListeners', MO.EEvent.OperationDown));
   o._operationMoveListeners = MO.Class.register(o, new MO.AListener('_operationMoveListeners', MO.EEvent.OperationMove));
   o._operationUpListeners   = MO.Class.register(o, new MO.AListener('_operationUpListeners', MO.EEvent.OperationUp));
   o.onUpdate                = MO.FGuiControl_onUpdate;
   o.onPaintBegin            = MO.FGuiControl_onPaintBegin;
   o.onPaintEnd              = MO.FGuiControl_onPaintEnd;
   o.onOperationDown         = MO.FGuiControl_onOperationDown;
   o.onOperationMove         = MO.FGuiControl_onOperationMove;
   o.onOperationUp           = MO.FGuiControl_onOperationUp;
   o.onEvent                 = MO.FGuiControl_onEvent;
   o.oeInitialize            = MO.FGuiControl_oeInitialize;
   o.oeResize                = MO.FGuiControl_oeResize;
   o.oeUpdate                = MO.FGuiControl_oeUpdate;
   o.construct               = MO.FGuiControl_construct;
   o.isReady                 = MO.FGuiControl_isReady;
   o.isDirty                 = MO.FGuiControl_isDirty;
   o.isDirtyAll              = MO.FGuiControl_isDirtyAll;
   o.setVisible              = MO.FGuiControl_setVisible;
   o.setSize                 = MO.FGuiControl_setSize;
   o.testReady               = MO.FGuiControl_testReady;
   o.testDirty               = MO.FGuiControl_testDirty;
   o.testInRange             = MO.FGuiControl_testInRange;
   o.paint                   = MO.FGuiControl_paint;
   o.update                  = MO.FGuiControl_update;
   o.build                   = MO.FGuiControl_build;
   o.processReady            = MO.FGuiControl_processReady;
   o.processEvent            = MO.FGuiControl_processEvent;
   o.dirty                   = MO.FGuiControl_dirty;
   o.dirtyAll                = MO.FGuiControl_dirtyAll;
   o.psPaint                 = MO.FGuiControl_psPaint;
   o.psUpdate                = MO.FGuiControl_psUpdate;
   o.dispose                 = MO.FGuiControl_dispose;
   return o;
}
MO.FGuiControl_onUpdate = function FGuiControl_onUpdate(event){
   var o = this;
   var location = o._location;
   var size = o._size;
   var rectangle = event.rectangle;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            component.onUpdate(event);
         }
      }
   }
}
MO.FGuiControl_onPaintBegin = function FGuiControl_onPaintBegin(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   if(o._backColor){
      graphic.fillRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._styleBackcolor, 1);
   }
   var image = null;
   var imageGrid = null;
   if(o._statusHover){
      image = o._backHoverImage;
      imageGrid = o._backHoverGrid;
   }else{
      image = o._backImage;
      imageGrid = o._backGrid;
   }
   if(image){
      if(imageGrid && !imageGrid.isEmpty()){
         graphic.drawGridImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height, imageGrid);
      }else{
         graphic.drawImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
      }
   }
   if(o._borderOuter.valid){
      graphic.drawBorder(rectangle, o._borderOuter);
   }
   if(o._borderInner.valid){
      graphic.drawBorder(rectangle, o._borderInner);
   }
}
MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(event){
   var o = this;
}
MO.FGuiControl_onOperationDown = function FGuiControl_onOperationDown(event){
   var o = this;
   if(event.flag){
      o.processOperationDownListener(event);
   }
}
MO.FGuiControl_onOperationMove = function FGuiControl_onOperationMove(event){
   var o = this;
   if(event.flag){
      o.processOperationMoveListener(event);
   }
}
MO.FGuiControl_onOperationUp = function FGuiControl_onOperationUp(event){
   var o = this;
   if(event.flag){
      o.processOperationUpListener(event);
   }
}
MO.FGuiControl_onEvent = function FGuiControl_onEvent(event, flag){
   var o = this;
   event.flag = flag;
   var code = event.code;
   switch(code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      default:
         throw new TError('Unknown event type.');
   }
}
MO.FGuiControl_oeInitialize = function FGuiControl_oeInitialize(event){
   var o = this;
   var resultCd = o.__base.FGuiComponent.oeInitialize.call(o, event)
   if(event.isBefore()){
      if(o._backResource){
         var image = o._backImage = new MO.SGuiImage();
         image.resource = o._backResource;
         image.load();
      }
      if(o._backHoverResource){
         var image = o._backHoverImage = new MO.SGuiImage();
         image.resource = o._backHoverResource;
         image.load();
      }
   }
   return resultCd;
}
MO.FGuiControl_oeResize = function FGuiControl_oeResize(event){
   var o = this;
   return MO.EEventStatus.Continue;
}
MO.FGuiControl_oeUpdate = function FGuiControl_oeUpdate(event){
   return MO.EEventStatus.Continue;
}
MO.FGuiControl_construct = function FGuiControl_construct(){
   var o = this;
   o.__base.FGuiComponent.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MGuiBorder.construct.call(o);
   o._clientRectangle = new MO.SRectangle();
   o._clientScale = new MO.SSize2();
   o._eventRectangle = new MO.SRectangle();
}
MO.FGuiControl_isReady = function FGuiControl_isReady(){
   return this._statusReady;
}
MO.FGuiControl_isDirty = function FGuiControl_isDirty(){
   return this._statusDirty;
}
MO.FGuiControl_isDirtyAll = function FGuiControl_isDirtyAll(){
   return this._statusDirtyAll;
}
MO.FGuiControl_setVisible = function FGuiControl_setVisible(flag){
   var o = this;
   o._visible = flag;
   var renderable = o._renderable;
   if(renderable){
      renderable.setVisible(flag);
   }
   o.dirtyAll();
}
MO.FGuiControl_setSize = function FGuiControl_setSize(width, height){
   var o = this;
   o.__base.MGuiSize.setSize.call(o, width, height);
   var renderable = o._renderable;
   if(renderable){
      renderable.setSize(width, height);
   }
}
MO.FGuiControl_testReady = function FGuiControl_testReady(){
   var o = this;
   var image = o._backImage;
   if(image){
      if(!image.testReady()){
         return false;
      }
   }
   var image = o._backHoverImage;
   if(image){
      if(!image.testReady()){
         return false;
      }
   }
   return true;
}
MO.FGuiControl_testDirty = function FGuiControl_testDirty(){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            var dirty = component.testDirty();
            if(dirty){
               o._statusDirty = true;
               break;
            }
         }
      }
   }
   return o._statusDirty;
}
MO.FGuiControl_testInRange = function FGuiControl_testInRange(x, y){
   var o = this;
}
MO.FGuiControl_paint = function FGuiControl_paint(event){
   var o = this;
   var location = o._location;
   var size = o._size;
   var graphic = event.graphic;
   var parentRectangle = event.parentRectangle;
   var calculateRate = event.calculateRate;
   var rectangle = event.rectangle;
   o._eventRectangle.assign(rectangle);
   var dockCd = o._dockCd;
   var anchorCd = o._anchorCd;
   var left = rectangle.left + location.x;
   var top = rectangle.top + location.y;
   var width = size.width;
   var height = size.height;
   var parentRight = parentRectangle.right();
   var parentBottom = parentRectangle.bottom();
   var right = parentRight - o._right;
   var bottom = parentBottom - o._bottom;
   var width2 = (parentRectangle.width - width) * 0.5;
   var height2 = (parentRectangle.height - height) * 0.5;
   if(event.optionContainer){
      left *= calculateRate.width;
      top *= calculateRate.height;
      right *= calculateRate.width;
      bottom *= calculateRate.height;
   }
   if((dockCd == MO.EUiDock.LeftBottom) || (dockCd == MO.EUiDock.Bottom) || (dockCd == MO.EUiDock.RightBottom)){
      top = bottom - height;
   }
   if((dockCd == MO.EUiDock.RightTop) || (dockCd == MO.EUiDock.Right) || (dockCd == MO.EUiDock.RightBottom)){
      left = right - width;
   }
   if((anchorCd & MO.EUiAnchor.Left) && (anchorCd & MO.EUiAnchor.Right)){
      width = right - left;
   }else if(o._anchorCd & MO.EUiAnchor.Left){
      left = (parentRight - width - o._right) * calculateRate.width;
      width = right - left;
   }
   if((anchorCd & MO.EUiAnchor.Top) && (o._anchorCd & MO.EUiAnchor.Bottom)){
      height = bottom - top;
   }else if(o._anchorCd & MO.EUiAnchor.Top){
      top = (parentBottom - height - o._bottom) * calculateRate.height;
      height = bottom - top;
   }
   event.optionContainer = false;
   graphic.store();
   rectangle.set(left, top, Math.max(width, 0), Math.max(height, 0));
   var sacle = graphic.scale();
   o._clientRectangle.assign(rectangle);
   o._clientScale.assign(sacle);
   o.onPaintBegin(event);
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FGuiControl)){
            component.paint(event);
         }
      }
   }
   o.onPaintEnd(event);
   graphic.restore();
   rectangle.assign(o._eventRectangle);
   o._statusDirty = false;
   o._statusDirtyAll = false;
}
MO.FGuiControl_update = function FGuiControl_update(){
   var o = this;
   var size = o._size;
   var event = MO.Memory.alloc(SGuiUpdateEvent)
   event.rectangle.set(0, 0, size.width, size.height)
   o.onUpdate(event);
   MO.Memory.free(event);
}
MO.FGuiControl_dirty = function FGuiControl_dirty(){
   this._statusDirty = true;
}
MO.FGuiControl_dirtyAll = function FGuiControl_dirtyAll(){
   var o = this;
   o._statusDirty = true;
   o._statusDirtyAll = true;
}
MO.FGuiControl_build = function FGuiControl_build(){
   var o = this;
}
MO.FGuiControl_processReady = function FGuiControl_processReady(){
   var o = this;
   if(!o._statusReady){
      o._statusReady = o.testReady();
   }
   return o._statusReady;
}
MO.FGuiControl_processEvent = function FGuiControl_processEvent(event){
   var o = this;
   var range = o.testInRange(event.locationX, event.locationY)
   if(range){
      o.onEvent(event, true);
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            var result = component.processEvent(event);
            if(result){
               break;
            }
         }
      }
      o.onEvent(event, false);
      return true;
   }
   return false;
}
MO.FGuiControl_psPaint = function FGuiControl_psPaint(event){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeParint', MO.FGuiControl);
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psUpdate = function FGuiControl_psUpdate(){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeUpdate', MO.FGuiControl);
   o.process(event);
   event.dispose();
}
MO.FGuiControl_dispose = function FGuiControl_dispose(){
   var o = this;
   o._backImage = MO.RObject.dispose(o._backImage);
   o._backHoverImage = MO.RObject.dispose(o._backHoverImage);
   o._clientRectangle = MO.RObject.dispose(o._clientRectangle);
   o._clientScale = MO.RObject.dispose(o._clientScale);
   o.__base.MGuiBorder.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MGuiSize.dispose.call(o);
   o.__base.MRenderableLinker.dispose.call(o);
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.MUiControl.dispose.call(o);
   o.__base.FGuiComponent.dispose.call(o);
}
with(MO){
   MO.FGuiControlRenderable = function FGuiControlRenderable(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._optionFull = RClass.register(o, new AGetSet('_optionFull'));
      o._control    = RClass.register(o, new AGetSet('_control'));
      o._graphic    = null;
      o.construct   = FGuiControlRenderable_construct;
      o.setup       = FGuiControlRenderable_setup;
      o.setLocation = FGuiControlRenderable_setLocation;
      o.setSize     = FGuiControlRenderable_setSize;
      o.beginDraw   = FGuiControlRenderable_beginDraw;
      o.endDraw     = FGuiControlRenderable_endDraw;
      o.dispose     = FGuiControlRenderable_dispose;
      return o;
   }
   MO.FGuiControlRenderable_construct = function FGuiControlRenderable_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FGuiControlRenderable_setup = function FGuiControlRenderable_setup(){
      var o = this;
      o.__base.FE3dFaceData.setup.call(o);
      var materialInfo = o._material.info();
      materialInfo.effectCode = 'gui';
      materialInfo.optionAlpha = true;
      materialInfo.optionDepth = false;
      materialInfo.optionDouble = true;
   }
   MO.FGuiControlRenderable_setLocation = function FGuiControlRenderable_setLocation(x, y){
      var o = this;
      o._matrix.setTranslate(x, y, 0);
   }
   MO.FGuiControlRenderable_setSize = function FGuiControlRenderable_setSize(width, height){
      var o = this;
      o._size.set(width, height);
   }
   MO.FGuiControlRenderable_beginDraw = function FGuiControlRenderable_beginDraw(){
      var o = this;
      var size = o._size;
      var adjustWidth = RInteger.pow2(size.width);
      var adjustHeight = RInteger.pow2(size.height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      o._matrix.setScale(adjustWidth, adjustHeight, 1);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var graphic = o._graphic = canvas.context();
      return graphic;
   }
   MO.FGuiControlRenderable_endDraw = function FGuiControlRenderable_endDraw(){
      var o = this;
      var graphic = o._graphic;
      MO.Assert.debugNotNull(graphic);
      o._texture.upload(o._canvas);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      canvasConsole.free(o._canvas);
      o._canvas = null;
      o._graphic = null;
      o._ready = true;
   }
   MO.FGuiControlRenderable_dispose = function FGuiControlRenderable_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FGuiFrame = function FGuiFrame(o){
      o = RClass.inherits(this, o, FGuiContainer);
      return o;
   }
}
with (MO) {
   MO.FGuiSpriteMultimage = function FGuiSpriteMultimage(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._sequenceImages = null;
      o._frameTime = RClass.register(o, new AGetSet('_frameTime'));
      o._ready = RClass.register(o, new AGetSet('_ready'), false);
      o._imageCount = 0;
      o._imageToLoad = 0;
      o._lastTick = 0;
      o._currentFrame = 0;
      o.setup = FGuiSpriteMultimage_setup;
      o.onPaintBegin = FGuiSpriteMultimage_onPaintBegin;
      o.onImageLoad = FGuiSpriteMultimage_onImageLoad;
      return o;
   }
   MO.FGuiSpriteMultimage_setup = function FGuiSpriteMultimage_setup(sequenceImageUrl, imageCount, ext) {
      var o = this;
      o._imageCount = imageCount;
      o._imageToLoad = imageCount;
      var images = o._sequenceImages = new Array(imageCount);
      for (var i = 0; i < imageCount; i++) {
         images[i] = MO.Class.create(MO.FImage);
         images[i].addLoadListener(o, o.onImageLoad);
         images[i].loadUrl(sequenceImageUrl + i + ext);
      }
   }
   MO.FGuiSpriteMultimage_onImageLoad = function FGuiSpriteMultimage_onImageLoad() {
      var o = this;
      if (--o._imageToLoad == 0) {
         o._ready = true;
         o._lastTick = MO.Timer.current();
         o.dirty();
      }
   }
   MO.FGuiSpriteMultimage_onPaintBegin = function FGuiSpriteMultimage_onPaintBegin(event) {
      var o = this;
      if (!o._ready) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var passedTick = MO.Timer.current() - o._lastTick;
      if (passedTick > o._frameTime) {
         if (++o._currentFrame > o._imageCount - 1) {
            o._currentFrame = 0;
         }
         o._lastTick = MO.Timer.current();
      }
      graphic._handle.drawImage(o._sequenceImages[o._currentFrame].image(), rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   }
}
MO.RGuiColor = function RGuiColor(){
   var o = this;
   return o;
}
MO.RGuiColor.prototype.makeRgbString = function RGuiColor_makeRgbString(color, alpha){
   var red = color.substring(2, 4);
   var green = color.substring(4, 6);
   var blue = color.substring(6, 8);
   var result = 'rgba(' + MO.Lang.Hex.parse(red) + ',' + MO.Lang.Hex.parse(green) + ',' + MO.Lang.Hex.parse(blue) + ',' + alpha + ')';
   return result;
}
MO.GuiColor = new MO.RGuiColor();
MO.RGuiControl = function RGuiControl(){
   var o = this;
   o.PREFIX    = 'FGui';
   return o;
}
MO.RGuiControl.prototype.newInstance = function RGuiControl_newInstance(type){
   var o = this;
   var result = null;
   if(type){
      var name = null
      var tn = null;
      if(type.constructor == String){
         if(!MO.Lang.String.startsWith(type, o.PREFIX)){
            name = o.PREFIX + type;
         }
      }else if(type.constructor == MO.TXmlNode){
         name = type.get('type');
         if(MO.Lang.String.isEmpty(name)){
            name = type.name();
            if(!MO.Lang.String.startsWith(name, o.PREFIX)){
               name = o.PREFIX + name;
            }
         }else{
            tn = name;
         }
      }else{
         throw new MO.TError(o, 'Unknown parameter. (type={1})', type);
      }
      result = MO.Class.create(name);
      if(tn){
         result.__typed = true;
      }
   }
   if(result == null){
      throw new MO.TError(o, 'Create instance failure. (type={1})', type);
   }
   return result;
}
MO.RGuiControl.prototype.attachEvent = function RGuiControl_attachEvent(control, name, h, m, u){
   var o = this;
   var e = null;
   var p = control[name];
   if(!MO.Method.isEmpty(p) || m){
      var cz = MO.Class.find(control.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      e = a.create();
      e.annotation = a;
      e.source = control;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = MO.RUiEvent.onProcess;
      MO.RUiEvent.find(h).push(a.linker(), e);
      MO.RHtml.linkSet(h, '_plink', c);
      a.bind(h, u);
   }
   return e;
}
MO.RGuiControl.prototype.innerbuild = function RGuiControl_innerbuild(parentControl, control, xconfig, attributes){
   var o = this;
   if((control == null) || (xconfig == null)){
      return;
   }
   if(MO.Class.isClass(control, MO.MProperty)){
      control.propertyLoad(xconfig);
   }
   var linker = xconfig.get('linker');
   if(linker && parentControl){
      parentControl[linker] = control;
   }
   if(MO.Class.isClass(control, MO.FGuiControl)){
   }
   if(control.__typed){
      parentControl = control;
   }
   if(MO.Class.isClass(control, MO.MGuiContainer) && xconfig.hasNode()){
      var nodes = xconfig.nodes();
      var nodeCount = nodes.count();
      for(var i = 0; i < nodeCount; i++){
         var xnode = nodes.at(i);
         var child = control.createChild(xnode);
         if(!child){
            throw new MO.TError('Invalid create child.');
         }
         o.innerbuild(parentControl, child, xnode, attributes);
         control.push(child);
      }
   }
   if(MO.Class.isClass(control, MO.FGuiControl)){
   }
}
MO.RGuiControl.prototype.build = function RGuiControl_build(control, xconfig, attributes){
   var o = this;
   if(!control){
      control = o.newInstance(xconfig);
   }
   o.innerbuild(control, control, xconfig, attributes);
   return control;
}
MO.RGuiControl.prototype.saveConfig = function RGuiControl_saveConfig(control, xconfig){
   var o = this;
   control.propertySave(xconfig);
   if(control.hasComponent()){
      var components = control.components();
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         var className = MO.Class.name(component);
         if(MO.Lang.String.startsWith(className, 'FGui')){
            className = className.substring(4);
         }
         var xchild = xconfig.create(className);
         o.saveConfig(component, xchild);
      }
   }
   return xconfig;
}
MO.RGuiControl = new MO.RGuiControl();
MO.FGuiCanvasManager = function FGuiCanvasManager(o){
   o = MO.Class.inherits(this, o, MO.FGuiManager);
   o._desktop          = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   o._readyControls    = null;
   o._dirtyControls    = null;
   o._paintEvent       = null;
   o.onSortControl     = MO.FGuiCanvasManager_onSortControl;
   o.construct         = MO.FGuiCanvasManager_construct;
   o.filterByRectangle = MO.FGuiCanvasManager_filterByRectangle;
   o.doActionAlpha     = MO.FGuiCanvasManager_doActionAlpha;
   o.processResize     = MO.FGuiCanvasManager_processResize;
   o.processControl    = MO.FGuiCanvasManager_processControl;
   o.process           = MO.FGuiCanvasManager_process;
   o.dispose           = MO.FGuiCanvasManager_dispose;
   return o;
}
MO.FGuiCanvasManager_onSortControl = function FGuiCanvasManager_onSortControl(source, target){
   var o = this;
   var sourceOrder = source.displayOrder();
   var targetOrder = target.displayOrder();
   return sourceOrder - targetOrder;
}
MO.FGuiCanvasManager_construct = function FGuiCanvasManager_construct(){
   var o = this;
   o.__base.FGuiManager.construct.call(o);
   o._readyControls = new MO.TObjects();
   o._dirtyControls = new MO.TObjects();
   o._paintEvent = new MO.SGuiPaintEvent();
}
MO.FGuiCanvasManager_filterByRectangle = function FGuiCanvasManager_filterByRectangle(dirtyControls, rectangle){
   var o = this;
   var controls = o._readyControls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      var clientRectangle = control.clientRectangle();
      if(rectangle.testRectangle(clientRectangle)){
         if(!control._flagDirty){
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, clientRectangle);
         }
         control.dirty();
         dirtyControls.pushUnique(control);
      }
   }
}
MO.FGuiCanvasManager_doActionAlpha = function FGuiCanvasManager_doActionAlpha(alpha){
   var o = this;
   var context = o._canvas.graphicContext();
   context.setAlpha(alpha);
   o.dirty();
}
MO.FGuiCanvasManager_processResize = function FGuiCanvasManager_processResize(control){
}
MO.FGuiCanvasManager_processControl = function FGuiCanvasManager_processControl(control){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var graphic = o._canvas.graphicContext();
   var desktop = o._desktop;
   var calculateSize = desktop.calculateSize();
   var calculateRate = desktop.calculateRate()
   var event = o._paintEvent;
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, calculateSize.width, calculateSize.height);
   event.calculateRate = calculateRate;
   event.rectangle.reset();
   control.paint(event);
}
MO.FGuiCanvasManager_process = function FGuiCanvasManager_process(){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var readyControls = o._readyControls;
   readyControls.clear();
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.processReady()){
         if(control.visible()){
            if(control.isDirtyAll()){
               o._statusDirty = true;
            }
            control._flagDirty = false;
            readyControls.push(control)
         }
      }
   }
   var graphic = o._canvas.graphicContext();
   if(o._statusDirty){
      graphic.clear();
      readyControls.sort(o.onSortControl);
      var readyCount = readyControls.count();
      for(var i = 0; i < readyCount; i++){
         var control = readyControls.at(i);
         o.processControl(control);
      }
      o._statusDirty = false;
   }else{
      var dirtyControls = o._dirtyControls;
      dirtyControls.clear();
      var readCount = readyControls.count();
      for(var i = 0; i < readCount; i++){
         var control = readyControls.at(i);
         if(control.testDirty()){
            var controlRectangle = control.clientRectangle();
            dirtyControls.push(control);
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, controlRectangle)
         }
      }
      dirtyControls.sort(o.onSortControl);
      var dirtyCount = dirtyControls.count();
      for(var i = 0; i < dirtyCount; i++){
         var control = dirtyControls.at(i);
         var clientRectangle = control.clientRectangle();
         if(!clientRectangle.isEmpty()){
            graphic.clearRectangle(clientRectangle);
         }
      }
      for(var i = 0; i < dirtyCount; i++){
         var control = dirtyControls.at(i);
         o.processControl(control);
      }
   }
}
MO.FGuiCanvasManager_dispose = function FGuiCanvasManager_dispose(){
   var o = this;
   o._readyControls = MO.Lang.Object.dispose(o._readyControls);
   o._dirtyControls = MO.Lang.Object.dispose(o._dirtyControls);
   o._paintEvent = MO.Lang.Object.dispose(o._paintEvent);
   o.__base.FGuiManager.dispose.call(o);
}
MO.FGuiChangeTransform = function FGuiChangeTransform(o){
   o = MO.Class.inherits(this, o, MO.FGuiTransform);
   o._changeCd      = MO.Class.register(o, new MO.AGetSet('_changeCd'));
   o._interval      = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._scale         = MO.Class.register(o, new MO.AGetSet('_scale'));
   o._sourceControl = MO.Class.register(o, new MO.AGetSet('_sourceControl'));
   o._targetControl = MO.Class.register(o, new MO.AGetSet('_targetControl'));
   o._sourceRectangle = null;
   o._targetRectangle = null;
   o._current         = 0;
   o._middleCount     = 100;
   o._endCount        = 200;
   o.construct      = MO.FGuiChangeTransform_construct;
   o.start          = MO.FGuiChangeTransform_start;
   o.process        = MO.FGuiChangeTransform_process;
   o.dispose        = MO.FGuiChangeTransform_dispose;
   return o;
}
MO.FGuiChangeTransform_construct = function FGuiChangeTransform_construct(){
   var o = this;
   o.__base.FGuiTransform.construct.call(o);
   o._sourceRectangle = new MO.SRectangle();
   o._targetRectangle = new MO.SRectangle();
}
MO.FGuiChangeTransform_start = function FGuiChangeTransform_start(){
   var o = this;
   o.__base.FGuiTransform.start.call(o);
   o._current = 0;
   var control = o._sourceControl;
   o._sourceRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
   var control = o._targetControl;
   o._targetRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
}
MO.FGuiChangeTransform_process = function FGuiChangeTransform_process(){
   var o = this;
   var sourceControl = o._sourceControl;
   var targetControl = o._targetControl;
   if(o._current < o._middleCount){
      var index = o._middleCount - o._current;
      var rate = index / o._middleCount;
      sourceControl.size().set(o._sourceRectangle.width * rate, o._sourceRectangle.height * rate);
   }else if(o._current == o._middleCount){
      sourceControl.setVisible(false);
      targetControl.setVisible(true);
   }else if(o._current > o._middleCount){
      var index = o._endCount - o._current;
      var rate = index / o._middleCount;
      targetControl.size().set(o._sourceRectangle.width * rate, o._sourceRectangle.height * rate);
   }else if(o._current == o._endCount){
      sourceControl.setLocation(o._targetRectangle.left, o._targetRectangle.top);
      sourceControl.setSize(o._targetRectangle.width, o._targetRectangle.height);
      targetControl.setLocation(o._sourceRectangle.left, o._sourceRectangle.top);
      targetControl.setSize(o._sourceRectangle.width, o._sourceRectangle.height);
      o._finish = true;
   }
   o._current++;
}
MO.FGuiChangeTransform_dispose = function FGuiChangeTransform_dispose(){
   var o = this;
   o.__base.FGuiTransform.dispose.call(o);
}
with(MO){
   MO.FGuiFrameConsole = function FGuiFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._frames          = null;
      o.construct        = FGuiFrameConsole_construct;
      o.createFrame      = FGuiFrameConsole_createFrame;
      o.create           = FGuiFrameConsole_create;
      o.find             = FGuiFrameConsole_find;
      o.get              = FGuiFrameConsole_get;
      o.alloc            = FGuiFrameConsole_alloc;
      o.free             = FGuiFrameConsole_free;
      o.dispose          = FGuiFrameConsole_dispose;
      return o;
   }
   MO.FGuiFrameConsole_construct = function FGuiFrameConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._frames = new TDictionary();
   }
   MO.FGuiFrameConsole_createFrame = function FGuiFrameConsole_createFrame(context, control, name){
      var o = this;
      var describeConsole = RConsole.find(FGuiFrameDescribeConsole);
      var xframe = describeConsole.load(name);
      var frame = RGuiControl.build(null, xframe, null, null);
      frame.linkGraphicContext(context);
      frame.psInitialize();
      frame.build();
      return frame;
   }
   MO.FGuiFrameConsole_create = function FGuiFrameConsole_create(context, name){
      var o = this;
      var frame = o.createFrame(context, null, name);
      return frame;
   }
   MO.FGuiFrameConsole_find = function FGuiFrameConsole_find(name){
      return this._frames.get(name);
   }
   MO.FGuiFrameConsole_get = function FGuiFrameConsole_get(context, name){
      var o = this;
      var frames = o._frames;
      var frame = frames.get(name);
      if(!frame){
         frame = o.createFrame(context, null, name);
         frames.set(name, frame);
      }
      return frame;
   }
   MO.FGuiFrameConsole_alloc = function FGuiFrameConsole_alloc(f){
   }
   MO.FGuiFrameConsole_free = function FGuiFrameConsole_free(f){
      f.setVisible(false);
      this._freeFrames.push(f);
   }
   MO.FGuiFrameConsole_dispose = function FGuiFrameConsole_dispose(){
      var o = this;
      o._frames = RObject.dispose(o._frames, true);
      o.__base.FConsole.construct.call(o);
   }
}
MO.FGuiFrameDescribeConsole = function FGuiFrameDescribeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Global;
   o._serviceCode = 'cloud.describe.frame';
   o._defines     = MO.Class.register(o, new MO.AGetter('_defines'));
   o.construct    = MO.FGuiFrameDescribeConsole_construct;
   o.load         = MO.FGuiFrameDescribeConsole_load;
   o.dispose      = MO.FGuiFrameDescribeConsole_dispose;
   return o;
}
MO.FGuiFrameDescribeConsole_construct = function FGuiFrameDescribeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._defines = new MO.TDictionary();
}
MO.FGuiFrameDescribeConsole_load = function FGuiFrameDescribeConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = MO.Window.Browser.hostPath('/' + o._serviceCode + '.ws');
   var xresult = MO.Console.find(MO.FXmlConsole).send(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1})', name);
   }
   return xframe;
}
MO.FGuiFrameDescribeConsole_dispose = function FGuiFrameDescribeConsole_dispose(){
   var o = this;
   o._defines = MO.Lang.Object.dispose(o._defines, true);
   o.__base.FConsole.dispose.call(o);
}
MO.FGuiGeneralColorEffect = function FGuiGeneralColorEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.gui';
   o.drawRenderable = MO.FGuiGeneralColorEffect_drawRenderable;
   return o;
}
MO.FGuiGeneralColorEffect_drawRenderable = function FGuiGeneralColorEffect_drawRenderable(region, renderable){
   var o = this;
   if(!MO.Class.isClass(renderable, MO.FGuiControlRenderable)){
      throw new MO.TError('Invalid renderable.');
   }
   var control = renderable.control();
   var adjustSize = renderable.adjustSize();
   var controlLocation = control.location();
   var controlSize = control.size();
   var dockCd = control.dockCd();
   var context = o._graphicContext;
   var logicSize = context.logicSize();
   var contextSize = context.size();
   var contextRatio = context.ratio();
   var contextSizeRatio = context.sizeRatio();
   var radioWidth = contextSize.width * contextRatio;
   var radioHeight = contextSize.height * contextRatio;
   var sizeWidth = contextSize.width * contextSizeRatio.width;
   var sizeHeight = contextSize.height * contextSizeRatio.height;
   var material = renderable.material();
   o.bindMaterial(material);
   var x = y = width = height = 0;
   if(renderable._optionFull){
      x = controlLocation.x / sizeWidth * 2 - 1;
      y = 1 - controlLocation.y / sizeHeight * 2;
      width = adjustSize.width / sizeWidth * 2;
      height = adjustSize.height / sizeHeight * 2;
   }else{
      var contextRatioX = (contextSizeRatio.width > contextSizeRatio.height) ? 1 : contextSizeRatio.height / contextSizeRatio.width;
      if((dockCd == MO.EGuiDock.LeftTop) || (dockCd == MO.EGuiDock.Left) || (dockCd == MO.EGuiDock.LeftBottom) || (dockCd == MO.EGuiDock.Fill)){
         x = controlLocation.x / sizeWidth * 2 - 1;
      }else if((dockCd == MO.EGuiDock.RightTop) || (dockCd == MO.EGuiDock.Right) || (dockCd == MO.EGuiDock.RightBottom)){
         x = (logicSize.width - controlLocation.x - controlSize.width / contextRatioX) / sizeWidth * 2 - 1;
      }else{
         throw new MO.TError(o, 'Invalid dock.');
      }
      var y = 0;
      var contextRatioY = (contextSizeRatio.width > contextSizeRatio.height) ? 1 : contextSizeRatio.height / contextSizeRatio.width;
      if((dockCd == MO.EGuiDock.LeftTop) || (dockCd == MO.EGuiDock.Top) || (dockCd == MO.EGuiDock.RightTop) || (dockCd == MO.EGuiDock.Fill)){
         y = 1 - controlLocation.y / sizeHeight * 2;
      }else if((dockCd == MO.EGuiDock.LeftBottom) || (dockCd == MO.EGuiDock.Bottom) || (dockCd == MO.EGuiDock.RightBottom)){
         y = 1 - (logicSize.height - controlLocation.y - controlSize.height / contextRatioY) / sizeHeight * 2;
      }else{
         throw new MO.TError(o, 'Invalid dock.');
      }
      if((dockCd == MO.EGuiDock.Fill)){
         var right = logicSize.width - controlLocation.x - controlSize.width;
         var x1 = controlLocation.x / sizeWidth * 2 - 1;
         var x2 = (logicSize.width - controlLocation.x - controlSize.width / contextRatioX) / sizeWidth * 2 - 1;
         width = x2 - x1;
         height = adjustSize.height / radioHeight * 2;
      }else{
         width = adjustSize.width / radioWidth * 2;
         height = adjustSize.height / radioHeight * 2;
      }
   }
   o._program.setParameter4('vc_position', x, y, width, height);
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
MO.FGuiManager = function FGuiManager(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MEventDispatcher);
   o._controls         = MO.Class.register(o, new MO.AGetter('_controls'));
   o._mainTimeline     = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   o._transforms       = MO.Class.register(o, new MO.AGetter('_transforms'));
   o._statusDirty      = false;
   o._visibleControls  = null;
   o.construct         = MO.FGuiManager_construct;
   o.register          = MO.FGuiManager_register;
   o.unregister        = MO.FGuiManager_unregister;
   o.transformStart    = MO.FGuiManager_transformStart;
   o.setup             = MO.FGuiManager_setup;
   o.isDirty           = MO.FGuiManager_isDirty;
   o.setVisible        = MO.FGuiManager_setVisible;
   o.show              = MO.FGuiManager_show;
   o.hide              = MO.FGuiManager_hide;
   o.processResize     = MO.FGuiManager_processResize;
   o.processEvent      = MO.FGuiManager_processEvent;
   o.processTransforms = MO.FGuiManager_processTransforms;
   o.process           = MO.FGuiManager_process;
   o.dirty             = MO.FGuiManager_dirty;
   o.dispose           = MO.FGuiManager_dispose;
   return o;
}
MO.FGuiManager_construct = function FGuiManager_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._controls = new MO.TObjects();
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._transforms = new MO.TLooper();
   o._visibleControls = new MO.TObjects();
}
MO.FGuiManager_register = function FGuiManager_register(control){
   var o = this;
   o._controls.push(control);
   o._statusDirty = true;
}
MO.FGuiManager_unregister = function FGuiManager_unregister(control){
   var o = this;
   o._controls.remove(control);
   o._statusDirty = true;
}
MO.FGuiManager_transformStart = function FGuiManager_transformStart(transform){
   var o = this;
   transform.start();
   o._transforms.pushUnique(transform);
}
MO.FGuiManager_setup = function FGuiManager_setup(){
   var o = this;
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.gui', MO.FGuiGeneralColorEffect);
}
MO.FGuiManager_isDirty = function FGuiManager_isDirty(){
   return this._statusDirty;
}
MO.FGuiManager_setVisible = function FGuiManager_setVisible(value){
   var o = this;
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.setVisible(value);
   }
}
MO.FGuiManager_show = function FGuiManager_show(){
   this.setVisible(true);
}
MO.FGuiManager_hide = function FGuiManager_hide(){
   this.setVisible(false);
}
MO.FGuiManager_processResize = function FGuiManager_processResize(event){
   var o = this;
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.psResize();
   }
}
MO.FGuiManager_processEvent = function FGuiManager_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
   return;
   if((event.code == MO.EEvent.MouseDown) || (event.code == MO.EEvent.MouseMove) || (event.code == MO.EEvent.MouseUp)){
      var context = o._graphicContext;
      var ratio = context.ratio();
      var locationX = event.clientX * ratio;
      var locationY = event.clientY * ratio;
      var visibleControls = o._visibleControls;
      visibleControls.clear();
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(control.visible()){
            visibleControls.push(control);
         }
      }
      var count = visibleControls.count();
      for(var i = 0; i < count; i++){
         var control = visibleControls.at(i);
         var location = control.location();
         event.locationX = locationX - location.x;
         event.locationY = locationY - location.y;
         control.processEvent(event);
      }
   }
}
MO.FGuiManager_processTransforms = function FGuiManager_processTransforms(){
   var o = this;
   var transforms = o._transforms;
   transforms.record();
   while(transforms.next()){
      var transform = transforms.current();
      transform.process();
      if(transform.isFinish()){
         transforms.removeCurrent();
      }
   }
}
MO.FGuiManager_process = function FGuiManager_process(){
   var o = this;
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.psUpdate();
   }
   o._mainTimeline.process();
   o.processTransforms();
}
MO.FGuiManager_dirty = function FGuiManager_dirty(){
   this._statusDirty = true;
}
MO.FGuiManager_dispose = function FGuiManager_dispose(){
   var o = this;
   o._controls = MO.RObject.dispose(o._controls);
   o._mainTimeline = MO.RObject.dispose(o._mainTimeline);
   o._transforms = MO.RObject.dispose(o._transforms);
   o._visibleControls = MO.RObject.dispose(o._visibleControls);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiTransform = function FGuiTransform(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._finish   = false;
   o.construct = MO.FGuiTransform_construct;
   o.isFinish  = MO.FGuiTransform_isFinish;
   o.start     = MO.FGuiTransform_start;
   o.process   = MO.FGuiTransform_process;
   o.dispose   = MO.FGuiTransform_dispose;
   return o;
}
MO.FGuiTransform_construct = function FGuiTransform_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FGuiTransform_isFinish = function FGuiTransform_isFinish(){
   return this._finish;
}
MO.FGuiTransform_start = function FGuiTransform_start(){
   var o = this;
   o._finish = false;
}
MO.FGuiTransform_process = function FGuiTransform_process(){
   var o = this;
}
MO.FGuiTransform_dispose = function FGuiTransform_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      o.onPaintBegin = FGuiButton_onPaintBegin;
      return o;
   }
   MO.FGuiButton_onPaintBegin = function FGuiButton_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      if(o._label){
         if(o._foreFont){
            graphic.setFont(o._foreFont);
         }
         var width = graphic.textWidth(o._label);
         var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
         var y = rectangle.top + rectangle.height * 0.5 + 3;
         graphic.drawText(o._label, x, y, o._foreColor);
      }
   }
}
with(MO){
   MO.FGuiLabel = function FGuiLabel(o){
      o = RClass.inherits(this, o, FGuiControl);
      o.onPaintLabel = FGuiLabel_onPaintLabel;
      o.onPaintBegin = FGuiLabel_onPaintBegin;
      o.setLabel     = FGuiLabel_setLabel;
      return o;
   }
   MO.FGuiLabel_onPaintLabel = function FGuiLabel_onPaintLabel(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      if(o._foreFont){
         graphic.setFont(o._foreFont);
      }
      var width = graphic.textWidth(o._label);
      var x = rectangle.left + rectangle.width * 0.5 - width * 0.5;
      var y = rectangle.top + rectangle.height * 0.5 + 3;
      graphic.drawText(o._label, x, y, o._foreColor);
   }
   MO.FGuiLabel_onPaintBegin = function FGuiLabel_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      if(o._label){
         o.onPaintLabel(event);
      }
   }
   MO.FGuiLabel_setLabel = function FGuiLabel_setLabel(label){
      var o = this;
      if(o._label != label){
         o.dirty();
      }
      o.__base.FGuiControl.setLabel.call(o, label);
   }
}
with(MO){
   MO.FGuiPanel = function FGuiPanel(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
MO.FGuiPicture = function FGuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   return o;
}
MO.FGuiTimeline = function FGuiTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._timeUnit             = MO.Class.register(o, new MO.AGetSet('_timeUnit'));
   o._startTime            = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime              = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._degreeTime           = MO.Class.register(o, new MO.AGetSet('_degreeTime'));
   o._progress             = MO.Class.register(o, new MO.AGetSet('_progress'));
   o._unitms               = MO.Class.register(o, new MO.AGetSet('_unitms'), 1000 * 60 * 60 * 24);
   o._degreeLineHeight     = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 15);
   o._degreeLineWidth      = MO.Class.register(o, new MO.AGetSet('_degreeLineWidth'), 3);
   o._mainLineWidth        = MO.Class.register(o, new MO.AGetSet('_mainLineWidth'), 5);
   o._triangleWidth        = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight       = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap          = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth        = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 40);
   o._timeFontColor        = '#FFFFFF';
   o._cursorFontColor      = '#FFFFFF';
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onPaintBegin          = MO.FGuiTimeline_onPaintBegin;
   o.onOperationDown       = MO.FGuiTimeline_onOperationDown;
   return o;
}
MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 50;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#25E8FF', o._mainLineWidth);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var degreeTime = o.degreeTime();
   var degreeText;
   var startText;
   switch (o.timeUnit()) {
      case MO.EUiTimeUnit.Second:
         startText = startTime.format('MI:SS.MISS');
         degreeText = degreeTime.format('MI:SS.MISS');
         break;
      case MO.EUiTimeUnit.Minute:
         startText = startTime.format('HH24:MI:SS');
         degreeText = degreeTime.format('HH24:MI:SS');
         break;
      case MO.EUiTimeUnit.Hour:
         startText = startTime.format('HH24:MI');
         degreeText = degreeTime.format('HH24:MI');
         break;
      case MO.EUiTimeUnit.Day:
         startText = startTime.format('MM-DD:HH24');
         degreeText = degreeTime.format('MM-DD:HH24');
         break;
      case MO.EUiTimeUnit.Week:
         startText = startTime.format('MM-DD');
         degreeText = degreeTime.format('MM-DD');
         break;
      case MO.EUiTimeUnit.Month:
         startText = startTime.format('YYYY-MM-DD');
         degreeText = degreeTime.format('YYYY-MM-DD');
         break;
      case MO.EUiTimeUnit.Year:
         startText = startTime.format('YYYY-MM');
         degreeText = degreeTime.format('YYYY-MM');
         break;
      default:
         return;
   }
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var degreeSpan = degreeTime.date.getTime() - startTime.date.getTime() + o.unitms() * o.progress();
   var degreeX = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
   graphic.drawTriangle(degreeX, middle + 2, degreeX - o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), degreeX + o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), 1, '#FFFFFF', '#FFFFFF');
   graphic.setFont('bold 22px Microsoft YaHei');
   var degreeTextWidth = graphic.textWidth(degreeText);
   graphic.drawText(degreeText, degreeX - degreeTextWidth / 2, middle + 50, o._cursorFontColor);
   var text;
   var bakTime = startTime.date.getTime();
   graphic.drawLine(dataLeft, middle - o.degreeLineHeight(), dataLeft, middle, '#FFFFFF', o._degreeLineWidth);
   var startTextWidth = graphic.textWidth(startText);
   graphic.drawText(startText, dataLeft - startTextWidth / 2, middle + 50, o._cursorFontColor);
   switch (o.timeUnit()) {
      case MO.EUiTimeUnit.Second:
         startTime.addMseconds(1000);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Minute:
         startTime.addMseconds(1000 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Hour:
         startTime.addMseconds(1000 * 60 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EUiTimeUnit.Day:
         startTime.addDay(1);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EUiTimeUnit.Week:
         startTime.addDay(7);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EUiTimeUnit.Month:
         startTime.addMonth(1);
         startTime.parseAuto(startTime.format('YYYYMM'));
         break;
      case MO.EUiTimeUnit.Year:
         startTime.addYear(1);
         startTime.parseAuto(startTime.format('YYYY'));
         break;
      default:
         return;
   }
   var alternate = true;
   var textBottom = 0;
   while (!startTime.isAfter(degreeTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', o._degreeLineWidth);
      switch (o.timeUnit()) {
         case MO.EUiTimeUnit.Second:
            text = startTime.format('MI:SS');
            startTime.addMseconds(1000);
            break;
         case MO.EUiTimeUnit.Minute:
            text = startTime.format('HH24:MI');
            startTime.addMseconds(1000 * 60);
            break;
         case MO.EUiTimeUnit.Hour:
            text = startTime.format('HH24:00');
            startTime.addMseconds(1000 * 60 * 60);
            break;
         case MO.EUiTimeUnit.Day:
            text = startTime.format('MM-DD');
            startTime.addDay(1);
            break;
         case MO.EUiTimeUnit.Week:
            text = startTime.format('MM-DD');
            startTime.addDay(7);
            break;
         case MO.EUiTimeUnit.Month:
            text = startTime.format('YYYY-MM');
            startTime.addMonth(1);
            break;
         case MO.EUiTimeUnit.Year:
            text = startTime.format('YYYY');
            startTime.addYear(1);
            break;
         default:
            return;
      }
      graphic.setFont('bold 22px Microsoft YaHei');
      var textWidth = graphic.textWidth(text);
      textBottom = alternate ? middle + 26 : middle + 52;
      graphic.drawText(text, x - textWidth / 2, textBottom, o._timeFontColor);
   }
   var span = endTime.date.getTime() - bakTime;
   var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, o._cursorFontColor, o._degreeLineWidth);
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FGuiTimeline_onOperationDown = function FGuiTimeline_onOperationDown(event) {
   if (!event.flag) {
      return;
   }
   var o = this;
   o.__base.FGuiControl.onOperationDown.call(o, event);
   var rectangle = event.rectangle;
   var bottom = rectangle.top + rectangle.height;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var x = event.locationX;
   if (event.locationY > bottom - 30) {
      if (x > dataLeft && x < dataRight) {
         var rate = (x - dataLeft) / (dataRight - dataLeft);
         var msDate = o.startTime().date.getTime() + (o.endTime().date.getTime() - o.startTime().date.getTime()) * rate;
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         var selectedDate = MO.Memory.alloc(TDate);
         selectedDate.date.setTime(msDate);
         selectedDate.refresh();
         dsEvent.date = selectedDate.parseAuto(selectedDate.format('YYYYMMDD'));
         o.processDataChangedListener(dsEvent);
         MO.Memory.free(dsEvent);
      }
   }
}
with(MO){
   MO.FGuiGridControl = function FGuiGridControl(o){
      o = RClass.inherits(this, o, FProcessServer);
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      o.name  = FGuiGridControl_name;
      return o;
   }
   MO.FGuiGridControl_name = function FGuiGridControl_name(){
      return this._name;
   }
}
with(MO){
   MO.FGuiBar = function FGuiBar(o){
      o = RClass.inherits(this, o, FGuiFrame);
      return o;
   }
}
with(MO) {
    MO.FGuiChartTotal = function FGuiChartTotal(o) {
        o = RClass.inherits(this, o, FGuiControl);
        o._numImages = null;
        o._wanBGImage = null;
        o._yiBGImage = null;
        o._total = RClass.register(o, new AGetSet('_total'));
        o._fullWidth = 0;
        o._fullHeight = 0;
        o.setup = FGuiChartTotal_setup;
        o.onPaintBegin = FGuiChartTotal_onPaintBegin;
        o.dispose = FGuiChartTotal_dispose;
        return o;
    }
    MO.FGuiChartTotal_setup = function FGuiChartTotal_setup() {
        var o = this;
        var imageConsole = MO.Console.find(MO.FImageConsole);
        o._wanBGImage = imageConsole.load('{eai.resource}/number/wan.png');
        o._yiBGImage = imageConsole.load('{eai.resource}/number/yi.png');
        o._numImages = new Array(10);
        for (var i = 0; i < 10; i++) {
            o._numImages[i] = imageConsole.load('{eai.resource}/number/' + i + '.png');
        }
    }
    MO.FGuiChartTotal_onPaintBegin = function FGuiChartTotal_onPaintBegin(event) {
        var o = this;
        o.__base.FGuiControl.onPaintBegin.call(o, event);
        var invesText = o._total+"";
        if (!invesText) {
			  return;
        }
        var graphic = event.graphic;
        var rectangle = o._clientRectangle;
        var hCenter = rectangle.left + rectangle.width / 2;
        var numImgSize = o._numImages[0]._size;
        var unitImgSize = o._yiBGImage._size;
        if (invesText.length > 8) {
            invesText = invesText.substring(0, invesText.length - 8);
            var unitImage = o._yiBGImage;
        }
        var numWidth = invesText.length * numImgSize.width + unitImgSize.width;
        var numLeft = 100;
        for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
        }
        graphic.drawImage(o._yiBGImage,  numLeft + invesText.length * numImgSize.width, rectangle.top +(320/2), unitImgSize.width * 2, unitImgSize.height * 2);
    }
    MO.FGuiChartTotal_dispose = function FGuiChartTotal_dispose() {
        var o = this;
        o.__base.FGuiControl.dispose.call(o);
    }
}
with(MO){
   MO.FGuiWindow = function FGuiWindow(o){
      o = RClass.inherits(this, o, FGuiFrame);
      return o;
   }
}
MO.FGuiDesignAnchor = function FGuiDesignAnchor(o) {
    o = MO.Class.inherits(this, o, MO.FGuiControl);
    o.construct = MO.FGuiDesignAnchor_construct;
    o.onPaintBegin = FGuiDesignAnchor_onPaintBegin;
    o.dispose = MO.FGuiDesignAnchor_dispose;
    return o;
}
MO.FGuiDesignAnchor_construct = function FGuiDesignAnchor_construct() {
    var o = this;
    o.__base.FGuiControl.construct.call(o);
}
MO.FGuiDesignAnchor_onPaintBegin = function FGuiDesignAnchor_onPaintBegin(event){
    var o = this;
    o.__base.FGuiControl.onPaintBegin.call(o,event);
    var graphic = event.graphic;
    var rectangle = event.rectangle;
}
MO.FGuiDesignAnchor_dispose = function FGuiDesignAnchor_dispose() {
    var o = this;
    o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiDesignRule = function FGuiDesignRule(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o.construct = MO.FGuiDesignRule_construct;
   o.dispose   = MO.FGuiDesignRule_dispose;
   return o;
}
MO.FGuiDesignRule_construct = function FGuiDesignRule_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}
MO.FGuiDesignRule_dispose = function FGuiDesignRule_dispose(){
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiEngineInfo = function FGuiEngineInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   o.onPaintBegin = MO.FGuiEngineInfo_onPaintBegin;
   o.oeUpdate     = MO.FGuiEngineInfo_oeUpdate;
   o.construct    = MO.FGuiEngineInfo_construct;
   return o;
}
MO.FGuiEngineInfo_onPaintBegin = function FGuiEngineInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   graphic.drawText('Frame         : ' + MO.Timer.rate(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Span    : ' + stageStatistics._frame.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Process : ' + stageStatistics._frameProcess.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Frame Draw    : ' + stageStatistics._frameDraw.toString() + ' | ' + stageStatistics._frameDrawSort.toString(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw          : ' + statistics.frameDrawCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Const    : ' + statistics.frameConstCount() + ' Length=' + statistics.frameConstLength(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Buffer   : ' + statistics.frameBufferCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Texture  : ' + statistics.frameTextureCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Draw Triangle : ' + statistics.frameTriangleCount(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Program : ' + statistics.programTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Layout  : ' + statistics.layoutTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText('Total Buffer  : Vertex=' + statistics.vertexBufferTotal() + ' Index=' + statistics.indexBufferTotal(), locationX, locationY, '#FFFFFF');
   locationY += line;
}
MO.FGuiEngineInfo_oeUpdate = function FGuiEngineInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FGuiEngineInfo_construct = function FGuiEngineInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(512, 256);
   o._ticker = new MO.TTicker(1000);
}
