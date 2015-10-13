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
MO.MGuiLocation = function MGuiLocation(o){
   o = MO.Class.inherits(this, o);
   o._left   = MO.Class.register(o, [new MO.APtyInteger('_left'), new MO.AGetSet('_left')]);
   o._right  = MO.Class.register(o, [new MO.APtyInteger('_right'), new MO.AGetSet('_right')]);
   o._top    = MO.Class.register(o, [new MO.APtyInteger('_top'), new MO.AGetSet('_top')]);
   o._bottom = MO.Class.register(o, [new MO.APtyInteger('_bottom'), new MO.AGetSet('_bottom')]);
   return o;
}
MO.MGuiSize = function MGuiSize(o){
   o = MO.Class.inherits(this, o);
   o._location   = MO.Class.register(o, [new MO.APtyPoint2('_location'), new MO.AGetter('_location')]);
   o._right      = MO.Class.register(o, [new MO.APtyInteger('_right'), new MO.AGetSet('_right')], 0);
   o._bottom     = MO.Class.register(o, [new MO.APtyInteger('_bottom'), new MO.AGetSet('_bottom')], 0);
   o._size       = MO.Class.register(o, [new MO.APtySize2('_size'), new MO.AGetter('_size')]);
   o._scale      = MO.Class.register(o, [new MO.APtySize2('_scale'), new MO.AGetter('_scale')]);
   o.construct   = MO.MGuiSize_construct;
   o.left        = MO.MGuiSize_left;
   o.setLeft     = MO.MGuiSize_setLeft;
   o.top         = MO.MGuiSize_top;
   o.setTop      = MO.MGuiSize_setTop;
   o.setLocation = MO.MGuiSize_setLocation;
   o.width       = MO.MGuiSize_width;
   o.setWidth    = MO.MGuiSize_setWidth;
   o.height      = MO.MGuiSize_height;
   o.setHeight   = MO.MGuiSize_setHeight;
   o.setSize     = MO.MGuiSize_setSize;
   o.setScale    = MO.MGuiSize_setScale;
   o.setBounds   = MO.MGuiSize_setBounds;
   o.dispose     = MO.MGuiSize_dispose;
   return o;
}
MO.MGuiSize_construct = function MGuiSize_construct(){
   var o = this;
   o._location = new MO.SPoint2(0, 0);
   o._size = new MO.SSize2(128, 128);
   o._scale = new MO.SSize2(1, 1);
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
   o._location = MO.Lang.Object.dispose(o._location);
   o._size = MO.Lang.Object.dispose(o._size);
   o._scale = MO.Lang.Object.dispose(o._scale);
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
   o.bitmap = MO.Lang.Object.dispose(o.bitmap);
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
   o.parentRectangle = MO.Lang.Object.dispose(o.parentRectangle);
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
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
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
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
MO.FGuiContainer = function FGuiContainer(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiContainer);
   o.createChild = MO.FGuiContainer_createChild;
   return o;
}
MO.FGuiContainer_createChild = function FGuiContainer_createChild(xconfig){
   var o = this;
   var child = MO.RGuiControl.newInstance(xconfig);
   child._parent = o;
   return child;
}
MO.FGuiControl = function FGuiControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiComponent, MO.MUiControl, MO.MGraphicObject, MO.MRenderableLinker, MO.MListener, MO.MUiMargin, MO.MUiPadding, MO.MUiBorder, MO.MGuiSize);
   o._optionScale            = MO.Class.register(o, [new MO.AGetter('_optionScale')], true);
   o._alpha                  = MO.Class.register(o, [new MO.APtyString('_alpha'), new MO.AGetSet('_alpha')], 1);
   o._displayOrder           = MO.Class.register(o, [new MO.APtyString('_displayOrder'), new MO.AGetSet('_displayOrder')], 0);
   o._foreColor              = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')], '#FFFFFF');
   o._foreFont               = MO.Class.register(o, [new MO.APtyFont('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor              = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backFont               = MO.Class.register(o, [new MO.APtyFont('_backFont'), new MO.AGetSet('_backFont')]);
   o._backResource           = MO.Class.register(o, [new MO.APtyString('_backResource'), new MO.AGetSet('_backResource')]);
   o._backGrid               = MO.Class.register(o, [new MO.APtyPadding('_backGrid'), new MO.AGetter('_backGrid')]);
   o._backHoverColor         = MO.Class.register(o, [new MO.APtyString('_backHoverColor'), new MO.AGetSet('_backHoverColor')]);
   o._backHoverResource      = MO.Class.register(o, [new MO.APtyString('_backHoverResource'), new MO.AGetSet('_backHoverResource')]);
   o._backHoverGrid          = MO.Class.register(o, [new MO.APtyPadding('_backHoverGrid'), new MO.AGetter('_backHoverGrid')]);
   o._manager                = MO.Class.register(o, new MO.AGetSet('_manager'));
   o._statusReady            = false;
   o._statusDirty            = true;
   o._statusHover            = false;
   o._backImage              = null;
   o._backHoverResource      = null;
   o._clientRectangle        = MO.Class.register(o, new MO.AGetter('_clientRectangle'));
   o._parentRectangle        = MO.Class.register(o, new MO.AGetter('_parentRectangle'));
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
   o.__base.MUiBorder.construct.call(o);
   o._parentRectangle = new MO.SRectangle();
   o._clientRectangle = new MO.SRectangle();
   o._eventRectangle = new MO.SRectangle();
   o._foreFont = new MO.SUiFont();
   o._backFont = new MO.SUiFont();
}
MO.FGuiControl_isReady = function FGuiControl_isReady(){
   return this._statusReady;
}
MO.FGuiControl_isDirty = function FGuiControl_isDirty(){
   return this._statusDirty;
}
MO.FGuiControl_setVisible = function FGuiControl_setVisible(flag){
   var o = this;
   o._visible = flag;
   var manager = o._manager;
   if(manager){
      manager.dirty();
   }
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
   var dockCd = o._dockCd;
   var anchorCd = o._anchorCd;
   var graphic = event.graphic;
   var parentRectangle = event.parentRectangle;
   var rectangle = event.rectangle;
   var sizeRate = event.sizeRate;
   var calculateRate = event.calculateRate;
   var calculateWidth = calculateRate.width;
   var calculateHeight = calculateRate.height;
   o._parentRectangle.assign(parentRectangle);
   o._eventRectangle.assign(rectangle);
   var parentRight = parentRectangle.right();
   var parentBottom = parentRectangle.bottom();
   var left = 0;
   var top = 0;
   var right = 0;
   var bottom = 0;
   var width = 0;
   var height = 0;
   if(anchorCd & MO.EUiAnchor.Left){
      left = rectangle.left + location.x * calculateWidth;
   }else{
      left = rectangle.left + location.x;
   }
   if(anchorCd & MO.EUiAnchor.Top){
      top = rectangle.top + location.y * calculateHeight;
   }else{
      top = rectangle.top + location.y;
   }
   if(anchorCd & MO.EUiAnchor.Right){
      right = parentRight - o._right * calculateWidth;
   }else{
      right = parentRight - o._right;
   }
   if(anchorCd & MO.EUiAnchor.Bottom){
      bottom = parentBottom - o._bottom * calculateHeight;
   }else{
      bottom = parentBottom - o._bottom;
   }
   if((anchorCd & MO.EUiAnchor.Left) && (anchorCd & MO.EUiAnchor.Right)){
      width = size.width * calculateWidth;
   }else{
      width = size.width;
   }
   if((anchorCd & MO.EUiAnchor.Top) && (anchorCd & MO.EUiAnchor.Bottom)){
      height = size.height * calculateHeight;
   }else{
      height = size.height;
   }
   if((dockCd == MO.EUiDock.RightTop) || (dockCd == MO.EUiDock.Right) || (dockCd == MO.EUiDock.RightBottom)){
      right = parentRight - o._right * calculateWidth;
      left = right - width;
   }
   if((dockCd == MO.EUiDock.LeftBottom) || (dockCd == MO.EUiDock.Bottom) || (dockCd == MO.EUiDock.RightBottom)){
      bottom = parentBottom - o._bottom * calculateHeight;
      top = bottom - height;
   }
   if((anchorCd & MO.EUiAnchor.Left) && (anchorCd & MO.EUiAnchor.Right)){
      width = right - left;
   }else if(o._anchorCd & MO.EUiAnchor.Left){
      left = parentRight - width - o._right;
      width = right - left;
   }else if(o._anchorCd & MO.EUiAnchor.Right){
      width = parentRight - left - o._right;
   }
   if((anchorCd & MO.EUiAnchor.Top) && (o._anchorCd & MO.EUiAnchor.Bottom)){
      height = bottom - top;
   }else if(o._anchorCd & MO.EUiAnchor.Top){
      top = parentBottom - height - o._bottom;
      height = bottom - top;
   }else if(o._anchorCd & MO.EUiAnchor.Bottom){
      height = parentBottom - top - o._bottom;
   }
   rectangle.set(left, top, Math.max(width, 0), Math.max(height, 0));
   parentRectangle.assign(rectangle);
   o._clientRectangle.assign(rectangle);
   graphic.store();
   graphic.setScale(o._scale.width, o._scale.height);
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
   parentRectangle.assign(o._parentRectangle);
   o._statusDirty = false;
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
   o._backImage = MO.Lang.Object.dispose(o._backImage);
   o._backHoverImage = MO.Lang.Object.dispose(o._backHoverImage);
   o._clientRectangle = MO.Lang.Object.dispose(o._clientRectangle);
   o.__base.MGuiSize.dispose.call(o);
   o.__base.MUiBorder.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MRenderableLinker.dispose.call(o);
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.MUiControl.dispose.call(o);
   o.__base.FGuiComponent.dispose.call(o);
}
MO.FGuiControlRenderable = function FGuiControlRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._optionFull = MO.Class.register(o, new MO.AGetSet('_optionFull'));
   o._control    = MO.Class.register(o, new MO.AGetSet('_control'));
   o._graphic    = null;
   o.construct   = MO.FGuiControlRenderable_construct;
   o.setup       = MO.FGuiControlRenderable_setup;
   o.setLocation = MO.FGuiControlRenderable_setLocation;
   o.setSize     = MO.FGuiControlRenderable_setSize;
   o.beginDraw   = MO.FGuiControlRenderable_beginDraw;
   o.endDraw     = MO.FGuiControlRenderable_endDraw;
   o.dispose     = MO.FGuiControlRenderable_dispose;
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
   var adjustWidth = MO.Lang.Integer.pow2(size.width);
   var adjustHeight = MO.Lang.Integer.pow2(size.height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   o._matrix.setScale(adjustWidth, adjustHeight, 1);
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
   var graphic = o._graphic = canvas.context();
   return graphic;
}
MO.FGuiControlRenderable_endDraw = function FGuiControlRenderable_endDraw(){
   var o = this;
   var graphic = o._graphic;
   MO.Assert.debugNotNull(graphic);
   o._texture.upload(o._canvas);
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   canvasConsole.free(o._canvas);
   o._canvas = null;
   o._graphic = null;
   o._ready = true;
}
MO.FGuiControlRenderable_dispose = function FGuiControlRenderable_dispose(){
   var o = this;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.FGuiFrame = function FGuiFrame(o){
   o = MO.Class.inherits(this, o, MO.FGuiContainer);
   return o;
}
MO.FGuiSpriteMultimage = function FGuiSpriteMultimage(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._sequenceImages = null;
   o._frameTime      = MO.Class.register(o, new MO.AGetSet('_frameTime'));
   o._ready          = MO.Class.register(o, new MO.AGetSet('_ready'), false);
   o._imageCount     = 0;
   o._imageToLoad    = 0;
   o._lastTick       = 0;
   o._currentFrame   = 0;
   o.setup           = MO.FGuiSpriteMultimage_setup;
   o.onPaintBegin    = MO.FGuiSpriteMultimage_onPaintBegin;
   o.onImageLoad     = MO.FGuiSpriteMultimage_onImageLoad;
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
      e.process = MO.Dui.Event.onProcess;
      MO.Dui.Event.find(h).push(a.linker(), e);
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
   if(MO.Class.isClass(control, MO.MUiContainer) && xconfig.hasNode()){
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
