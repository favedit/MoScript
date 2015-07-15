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
MO.MGuiMargin = function MGuiMargin(o){
   o = MO.RClass.inherits(this, o);
   o._margin   = MO.RClass.register(o, [new MO.APtyPadding('_margin'), new MO.AGetter('_margin')]);
   o.construct = MO.MGuiMargin_construct;
   o.setMargin = MO.MGuiMargin_setMargin;
   o.dispose   = MO.MGuiMargin_dispose;
   return o;
}
MO.MGuiMargin_construct = function MGuiMargin_construct(){
   var o = this;
   o._margin = new MO.SPadding();
}
MO.MGuiMargin_setMargin = function MGuiMargin_setMargin(left, top, right, bottom){
   this._margin.set(left, top, right, bottom);
}
MO.MGuiMargin_dispose = function MGuiMargin_dispose(){
   var o = this;
   o._margin = MO.RObject.dispose(o._margin);
}
MO.MGuiPadding = function MGuiPadding(o){
   o = MO.RClass.inherits(this, o);
   o._padding   = MO.RClass.register(o, [new MO.APtyPadding('_padding'), new MO.AGetter('_padding')]);
   o.construct  = MO.MGuiPadding_construct;
   o.setPadding = MO.MGuiPadding_setPadding;
   o.dispose    = MO.MGuiPadding_dispose;
   return o;
}
MO.MGuiPadding_construct = function MGuiPadding_construct(){
   var o = this;
   o._padding = new MO.SPadding();
}
MO.MGuiPadding_setPadding = function MGuiPadding_setPadding(left, top, right, bottom){
   this._padding.set(left, top, right, bottom);
}
MO.MGuiPadding_dispose = function MGuiPadding_dispose(){
   var o = this;
   o._padding = MO.RObject.dispose(o._padding);
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
with(MO){
   MO.SGuiDispatchEvent = function SGuiDispatchEvent(owner, invokeName, clazz){
      var o = this;
      o.owner    = owner;
      o.invoke   = invokeName;
      o.clazz    = RClass.name(clazz);
      o.invokeCd = EEventInvoke.Unknown;
      o.isBefore = SGuiDispatchEvent_isBefore;
      o.isAfter  = SGuiDispatchEvent_isAfter;
      o.dispose  = SGuiDispatchEvent_dispose;
      o.dump     = SGuiDispatchEvent_dump;
      return o;
   }
   MO.SGuiDispatchEvent_isBefore = function SGuiDispatchEvent_isBefore(){
      return this.invokeCd == EEventInvoke.Before;
   }
   MO.SGuiDispatchEvent_isAfter = function SGuiDispatchEvent_isAfter(){
      return this.invokeCd == EEventInvoke.After;
   }
   MO.SGuiDispatchEvent_dispose = function SGuiDispatchEvent_dispose(){
      var o = this;
      o.owner = null;
      o.invoke = null;
      o.clazz = null;
      o.invokeCd = null;
   }
   MO.SGuiDispatchEvent_dump = function SGuiDispatchEvent_dump(){
      var o = this;
      return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
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
with(MO){
   MO.FGuiComponent = function FGuiComponent(o){
      o = RClass.inherits(this, o, FComponent, MProperty);
      o._guid         = RClass.register(o, [new APtyString('_guid'), new AGetSet('_guid')]);
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      o._components   = null;
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      o.oeInitialize  = FGuiComponent_oeInitialize;
      o.oeRelease     = FGuiComponent_oeRelease;
      o.topComponent  = FGuiComponent_topComponent;
      o.hasComponent  = FGuiComponent_hasComponent;
      o.findComponent = FGuiComponent_findComponent;
      o.components    = FGuiComponent_components;
      o.push          = FGuiComponent_push;
      o.remove        = FGuiComponent_remove;
      o.clear         = FGuiComponent_clear;
      o.process       = FGuiComponent_process;
      o.psInitialize  = FGuiComponent_psInitialize;
      o.psRelease     = FGuiComponent_psRelease;
      o.toString      = FGuiComponent_toString;
      o.dispose       = FGuiComponent_dispose;
      return o;
   }
   MO.FGuiComponent_oeInitialize = function FGuiComponent_oeInitialize(e){
      return EEventStatus.Continue;
   }
   MO.FGuiComponent_oeRelease = function FGuiComponent_oeRelease(e){
      return EEventStatus.Continue;
   }
   MO.FGuiComponent_topComponent = function FGuiComponent_topComponent(clazz){
      var component = this;
      if(clazz){
         while(RClass.isClass(component._parent, clazz)){
            component = component._parent;
         }
      }else{
         while(component._parent){
            component = component._parent;
         }
      }
      return component;
   }
   MO.FGuiComponent_hasComponent = function FGuiComponent_hasComponent(){
      var components = this._components;
      return components ? !components.isEmpty() : false;
   }
   MO.FGuiComponent_findComponent = function FGuiComponent_findComponent(name){
      var components = this._components;
      return components ? components.get(name) : null;
   }
   MO.FGuiComponent_components = function FGuiComponent_components(){
      var o = this;
      var components = o._components;
      if(components == null){
         components = new TDictionary();
         o._components = components;
      }
      return components;
   }
   MO.FGuiComponent_push = function FGuiComponent_push(component){
      var o = this;
      if(RClass.isClass(component, FGuiComponent)){
         var components = o.components();
         component._parent = o;
         if(component._name == null){
            component._name = component.count();
         }
         components.set(component._name, component);
      }
   }
   MO.FGuiComponent_remove = function FGuiComponent_remove(component){
      var o = this;
      if(!RClass.isClass(component, FGuiComponent)){
         throw new TError(o, 'Parameter is not componet. (component={1})', component);
      }
      var components = o._components;
      if(!components.contains(component.name())){
         throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      components.removeValue(component);
   }
   MO.FGuiComponent_clear = function FGuiComponent_clear(){
      var o = this;
      var components = o._components;
      if(components){
         components.clear();
      }
   }
   MO.FGuiComponent_process = function FGuiComponent_process(event){
      var o = this;
      var valid = o.__base[event.clazz];
      if(valid){
         event.invokeCd = EEventInvoke.Before;
         var callback = o[event.invoke];
         if(callback){
            var result = callback.call(o, event);
            if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
               return result;
            }
         }
      }
      if(RClass.isClass(o, MGuiContainer)){
         var components = o._components;
         if(components){
            var count = components.count();
            if(count){
               for(var i = 0; i < count; i++){
                  var component = components.at(i);
                  var result = component.process(event);
                  if(result == EEventStatus.Cancel){
                     return result;
                  }
               }
            }
         }
      }
      if(valid){
         event.invokeCd = EEventInvoke.After;
         var callback = o[event.invoke];
         if(callback){
            var result = callback.call(o, event);
            if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
               return result;
            }
         }
      }
      return EEventStatus.Continue;
   }
   MO.FGuiComponent_psInitialize = function FGuiComponent_psInitialize(){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeInitialize', FGuiComponent);
      o.process(event);
      event.dispose();
   }
   MO.FGuiComponent_psRelease = function FGuiComponent_psRelease(){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeRelease', FGuiComponent);
      o.process(event);
      event.dispose();
   }
   MO.FGuiComponent_toString = function FGuiComponent_toString(){
      var o = this;
      return RClass.dump(o) + ':label=' + o._label;
   }
   MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
      var o = this;
      o._components = RObject.dispose(o._components, true);
      o._tag = null;
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FGuiContainer = function FGuiContainer(o){
      o = RClass.inherits(this, o, FGuiControl, MGuiContainer);
      return o;
   }
}
MO.FGuiControl = function FGuiControl(o){
   o = MO.Class.inherits(this, o, MO.FGuiComponent, MO.MGraphicObject, MO.MRenderableLinker, MO.MListener, MO.MGuiSize, MO.MGuiMargin, MO.MGuiPadding, MO.MGuiBorder);
   o._optionScale            = MO.Class.register(o, [new MO.AGetter('_optionScale')], true);
   o._visible                = MO.Class.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
   o._anchorCd               = MO.Class.register(o, [new MO.APtyString('_anchorCd'), new MO.AGetSet('_anchorCd')], MO.EUiAnchor.None);
   o._dockCd                 = MO.Class.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], MO.EUiDock.LeftTop);
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
   o.psEnable                = MO.FGuiControl_psEnable;
   o.psVisible               = MO.FGuiControl_psVisible;
   o.psResize                = MO.FGuiControl_psResize;
   o.psPaint                 = MO.FGuiControl_psPaint;
   o.psRefresh               = MO.FGuiControl_psRefresh;
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
   o.__base.MGuiMargin.construct.call(o);
   o.__base.MGuiPadding.construct.call(o);
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
MO.FGuiControl_psEnable = function FGuiControl_psEnable(enable){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeEnable', MO.FGuiControl)
   event.enable = enable;
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psVisible = function FGuiControl_psVisible(visible){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeVisible', MO.FGuiControl);
   event.visible = visible;
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psResize = function FGuiControl_psResize(){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeResize', MO.FGuiControl);
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psPaint = function FGuiControl_psPaint(event){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeParint', MO.FGuiControl);
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psRefresh = function FGuiControl_psRefresh(){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeRefresh', MO.FGuiControl);
   o.process(event);
   event.dispose();
}
MO.FGuiControl_psUpdate = function FGuiControl_psUpdate(){
   var o = this;
   var event = new MO.SGuiDispatchEvent(o, 'oeUpdate', MO.FGuiControl);
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
   o.__base.MGuiPadding.dispose.call(o);
   o.__base.MGuiMargin.dispose.call(o);
   o.__base.MGuiSize.dispose.call(o);
   o.__base.MRenderableLinker.dispose.call(o);
   o.__base.MGraphicObject.dispose.call(o);
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
