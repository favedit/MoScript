with(MO){
   MO.APtyBoolean = function APtyBoolean(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      o._value    = v ? v : false;
      o.build    = APtyBoolean_build;
      o.load     = APtyBoolean_load;
      o.save     = APtyBoolean_save;
      o.toString = APtyBoolean_toString;
      return o;
   }
   MO.APtyBoolean_build = function APtyBoolean_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }
   MO.APtyBoolean_load = function APtyBoolean_load(v, x){
      var o = this;
      v[o._name] = RBoolean.parse(x.get(o._linker));
   }
   MO.APtyBoolean_save = function APtyBoolean_save(v, x){
      var o = this;
      var d = v[o._name];
      if(d){
         x.set(o._linker, RBoolean.toString(d));
      }
   }
   MO.APtyBoolean_toString = function APtyBoolean_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
with(MO){
   MO.APtyBorder = function APtyBorder(name, linker){
      var o = this;
      AProperty.call(o, name, linker);
      o.load     = APtyBorder_load;
      o.save     = APtyBorder_save;
      o.toString = APtyBorder_toString;
      return o;
   }
   MO.APtyBorder_load = function APtyBorder_load(instance, xconfig){
      var o = this;
      var value = xconfig.get(o._linker);
      instance[o._name].parse(value);
   }
   MO.APtyBorder_save = function APtyBorder_save(instance, xconfig){
      var o = this;
      var value = instance[o._name];
   }
   MO.APtyBorder_toString = function APtyBorder_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
   }
}
with(MO){
   MO.APtyInteger = function APtyInteger(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      o._value   = RInteger.nvl(v);
      o.build    = APtyInteger_build;
      o.load     = APtyInteger_load;
      o.save     = APtyInteger_save;
      o.toString = APtyInteger_toString;
      return o;
   }
   MO.APtyInteger_build = function APtyInteger_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }
   MO.APtyInteger_load = function APtyInteger_load(v, x){
      var o = this;
      v[o._name] = RInteger.parse(x.get(o._linker));
   }
   MO.APtyInteger_save = function APtyInteger_save(v, x){
      var o = this;
      x.set(o._linker, RInteger.toString(v[o._name]));
   }
   MO.APtyInteger_toString = function APtyInteger_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
with(MO){
   MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
      var o = this;
      AProperty.call(o, name, linker);
      o._left    = RInteger.nvl(left);
      o._top     = RInteger.nvl(top);
      o._right   = RInteger.nvl(right);
      o._bottom  = RInteger.nvl(bottom);
      o.load     = APtyPadding_load;
      o.save     = APtyPadding_save;
      o.toString = APtyPadding_toString;
      return o;
   }
   MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
      var o = this;
      var name = o._name;
      var value = xconfig.get(o._linker);
      var padding = instance[name];
      if(!padding){
         padding = instance[name] = new SPadding();
      }
      padding.parse(value);
   }
   MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
      var o = this;
      var name = o._name;
      var padding = instance[name];
      if(padding){
         if(!padding.isEmpty()){
            var value = padding.toString()
            xconfig.set(o._linker, value);
         }
      }
   }
   MO.APtyPadding_toString = function APtyPadding_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
   }
}
with(MO){
   MO.APtyPoint2 = function APtyPoint2(name, linker, x, y){
      var o = this;
      AProperty.call(o, name, linker);
      o._x       = RInteger.nvl(x);
      o._y       = RInteger.nvl(y);
      o.load     = APtyPoint2_load;
      o.save     = APtyPoint2_save;
      o.toString = APtyPoint2_toString;
      return o;
   }
   MO.APtyPoint2_load = function APtyPoint2_load(instance, xconfig){
      var o = this;
      var value = xconfig.get(o._linker);
      instance[o._name].parse(value);
   }
   MO.APtyPoint2_save = function APtyPoint2_save(instance, xconfig){
      var o = this;
      var value = instance[o._name];
      if(!value.isEmpty()){
         xconfig.set(o._linker, value.toString());
      }
   }
   MO.APtyPoint2_toString = function APtyPoint2_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
   }
}
with(MO){
   MO.APtySize2 = function APtySize2(name, linker, width, height){
      var o = this;
      AProperty.call(o, name, linker);
      o._width   = RInteger.nvl(width);
      o._height  = RInteger.nvl(height);
      o.load     = APtySize2_load;
      o.save     = APtySize2_save;
      o.toString = APtySize2_toString;
      return o;
   }
   MO.APtySize2_load = function APtySize2_load(instance, xconfig){
      var o = this;
      var value = xconfig.get(o._linker);
      instance[o._name].parse(value);
   }
   MO.APtySize2_save = function APtySize2_save(instance, xconfig){
      var o = this;
      var value = instance[o._name];
      if(!value.isEmpty()){
         xconfig.set(o._linker, value.toString());
      }
   }
   MO.APtySize2_toString = function APtySize2_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
   }
}
with(MO){
   MO.APtyString = function APtyString(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      o._value    = v ? v : null;
      o.build    = APtyString_build;
      o.toString = APtyString_toString;
      return o;
   }
   MO.APtyString_build = function APtyString_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }
   MO.APtyString_toString = function APtyString_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
MO.EGuiDock = new function EGuiDock(){
   var o = this;
   o.None        = 'None';
   o.LeftTop     = 'LeftTop';
   o.Left        = 'Left';
   o.LeftBottom  = 'LeftBottom';
   o.Top         = 'Top';
   o.RightTop    = 'RightTop';
   o.Right       = 'Right';
   o.RightBottom = 'RightBottom';
   o.Bottom      = 'Bottom';
   o.Center      = 'Center';
   o.Fill        = 'Fill';
   return o;
}
MO.EGuiTimeUnit = new function EGuiTimeUnit() {
   var o = this;
   o.Second = 'second';
   o.Minute = 'minute';
   o.Hour   = 'hour';
   o.Day    = 'day';
   o.Week   = 'week';
   o.Month  = 'month';
   o.Year   = 'year';
   return o;
}
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
      url = o.resource.substring(4);
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
   o.clientRectangle = new MO.SRectangle();
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
   o.clientRectangle = MO.RObject.dispose(o.clientRectangle);
   o.rectangle = MO.RObject.dispose(o.rectangle);
   return o;
}
MO.SGuiUpdateEvent = function SGuiUpdateEvent(){
   var o = this;
   o.rectangle = new MO.SRectangle();
   o.dispose   = MO.SGuiUpdateEvent_dispose;
   return o;
}
MO.SGuiUpdateEvent_dispose = function SGuiUpdateEvent_dispose(){
   var o = this;
   o.rectangle = MO.RObject.dispose(o.rectangle);
   return o;
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
with(MO){
   MO.FGuiControl = function FGuiControl(o){
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject, MRenderableLinker, MListener, MGuiSize, MGuiMargin, MGuiPadding, MGuiBorder);
      o._visible                = MO.RClass.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
      o._dockCd                 = MO.RClass.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], EGuiDock.LeftTop);
      o._foreColor              = MO.RClass.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')], '#FFFFFF');
      o._foreFont               = MO.RClass.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
      o._backColor              = MO.RClass.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
      o._backResource           = MO.RClass.register(o, [new MO.APtyString('_backResource'), new MO.AGetSet('_backResource')]);
      o._backGrid               = MO.RClass.register(o, [new MO.APtyPadding('_backGrid'), new MO.AGetter('_backGrid')]);
      o._backHoverColor         = MO.RClass.register(o, [new MO.APtyString('_backHoverColor'), new MO.AGetSet('_backHoverColor')]);
      o._backHoverResource      = MO.RClass.register(o, [new MO.APtyString('_backHoverResource'), new MO.AGetSet('_backHoverResource')]);
      o._backHoverGrid          = MO.RClass.register(o, [new MO.APtyPadding('_backHoverGrid'), new MO.AGetter('_backHoverGrid')]);
      o._operationDownListeners = MO.RClass.register(o, new AListener('_operationDownListeners', EEvent.OperationDown));
      o._operationMoveListeners = MO.RClass.register(o, new AListener('_operationMoveListeners', EEvent.OperationMove));
      o._operationUpListeners   = MO.RClass.register(o, new AListener('_operationUpListeners', EEvent.OperationUp));
      o._statusDirty            = true;
      o._statusHover            = false;
      o._statusPaint            = false;
      o._backImage              = null;
      o._backHoverResource      = null;
      o._eventRectangle         = null;
      o.onUpdate                = FGuiControl_onUpdate;
      o.onPaintBegin            = FGuiControl_onPaintBegin;
      o.onPaintEnd              = FGuiControl_onPaintEnd;
      o.onOperationDown         = FGuiControl_onOperationDown;
      o.onOperationMove         = FGuiControl_onOperationMove;
      o.onOperationUp           = FGuiControl_onOperationUp;
      o.onEvent                 = FGuiControl_onEvent;
      o.oeInitialize            = FGuiControl_oeInitialize;
      o.oeResize                = FGuiControl_oeResize;
      o.oeUpdate                = FGuiControl_oeUpdate;
      o.construct               = FGuiControl_construct;
      o.setVisible              = FGuiControl_setVisible;
      o.setSize                 = FGuiControl_setSize;
      o.testReady               = FGuiControl_testReady;
      o.testDirty               = FGuiControl_testDirty;
      o.testInRange             = FGuiControl_testInRange;
      o.paint                   = FGuiControl_paint;
      o.repaint                 = FGuiControl_repaint;
      o.update                  = FGuiControl_update;
      o.build                   = FGuiControl_build;
      o.processEvent            = FGuiControl_processEvent;
      o.dirty                   = FGuiControl_dirty;
      o.psEnable                = FGuiControl_psEnable;
      o.psVisible               = FGuiControl_psVisible;
      o.psResize                = FGuiControl_psResize;
      o.psPaint                 = FGuiControl_psPaint;
      o.psRefresh               = FGuiControl_psRefresh;
      o.psUpdate                = FGuiControl_psUpdate;
      o.dispose                 = FGuiControl_dispose;
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
            if(RClass.isClass(component, FGuiControl)){
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
         case EEvent.MouseDown:
            o.onOperationDown(event);
            break;
         case EEvent.MouseMove:
            o.onOperationMove(event);
            break;
         case EEvent.MouseUp:
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
            var image = o._backImage = new SGuiImage();
            image.resource = o._backResource;
            image.load();
         }
         if(o._backHoverResource){
            var image = o._backHoverImage = new SGuiImage();
            image.resource = o._backHoverResource;
            image.load();
         }
      }
      return resultCd;
   }
   MO.FGuiControl_oeResize = function FGuiControl_oeResize(event){
      var o = this;
      if(event.flag){
      }
      console.log(this);
      return EEventStatus.Continue;
   }
   MO.FGuiControl_oeUpdate = function FGuiControl_oeUpdate(event){
      var o = this;
      if(!o._statusPaint){
         if(o.testReady()){
            o.repaint();
         }
      }
      return EEventStatus.Continue;
   }
   MO.FGuiControl_construct = function FGuiControl_construct(){
      var o = this;
      o.__base.FGuiComponent.construct.call(o);
      o.__base.MGuiSize.construct.call(o);
      o.__base.MGuiMargin.construct.call(o);
      o.__base.MGuiPadding.construct.call(o);
      o.__base.MGuiBorder.construct.call(o);
      o._clientRectangle = new SRectangle();
      o._eventRectangle = new SRectangle();
   }
   MO.FGuiControl_setVisible = function FGuiControl_setVisible(flag){
      var o = this;
      o._visible = flag;
      var renderable = o._renderable;
      if(renderable){
         renderable.setVisible(flag);
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
      return this._statusDirty;
   }
   MO.FGuiControl_testInRange = function FGuiControl_testInRange(x, y){
      var o = this;
      var range = o._clientRectangle.testRange(x, y);
      return range;
   }
   MO.FGuiControl_paint = function FGuiControl_paint(event){
      var o = this;
      var location = o._location;
      var size = o._size;
      var clientRectangle = o._clientRectangle;
      var graphic = event.graphic;
      var parentRectangle = event.parentRectangle;
      var rectangle = event.rectangle;
      o._eventRectangle.assign(rectangle);
      var left = null;
      var top = null;
      var width = size.width;
      var height = size.height;
      var width2 = (parentRectangle.width - width) * 0.5;
      var height2 = (parentRectangle.height - height) * 0.5;
      switch(o._dockCd){
         case MO.EGuiDock.LeftTop:
            left = rectangle.left + location.x;
            top = rectangle.top + location.y;
            break;
         case MO.EGuiDock.Bottom:
            top = rectangle.top + height2;
            break;
         default:
            throw new TError(o, 'Invalid dockcd.');
      }
      clientRectangle.set(rectangle.left + location.x, rectangle.top + location.y, width, height);
      rectangle.assign(clientRectangle);
      event.clientRectangle.assign(clientRectangle);
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
      rectangle.assign(o._eventRectangle);
      o._statusDirty = false;
      o._statusPaint = true;
   }
   MO.FGuiControl_repaint = function FGuiControl_repaint(){
      var o = this;
      return;
      var renderable = o._renderable;
      if(!renderable){
         throw new TError('Invalid renderable.');
      }
      var graphic = renderable.beginDraw();
      var event = MO.Memory.alloc(SGuiPaintEvent)
      event.graphic = graphic;
      event.rectangle.assign(o._clientRectangle);
      o.paint(event);
      MO.Memory.free(event);
      renderable.endDraw();
      o._statusPaint = true;
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
      return;
      var location = o._location;
      var size = o._size;
      var renderable = o._renderable;
      if(!renderable){
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlRenderable);
         renderable.setControl(o);
      }
      renderable.setLocation(location.x, location.y);
      renderable.setSize(size.width, size.height);
      o.update();
      if(o.testReady()){
         o.repaint();
      }
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
      var event = new SGuiDispatchEvent(o, 'oeEnable', FGuiControl)
      event.enable = enable;
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_psVisible = function FGuiControl_psVisible(visible){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeVisible', FGuiControl);
      event.visible = visible;
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_psResize = function FGuiControl_psResize(){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeResize', FGuiControl);
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_psPaint = function FGuiControl_psPaint(event){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeParint', FGuiControl);
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_psRefresh = function FGuiControl_psRefresh(){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeRefresh', FGuiControl);
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_psUpdate = function FGuiControl_psUpdate(){
      var o = this;
      var event = new SGuiDispatchEvent(o, 'oeUpdate', FGuiControl);
      o.process(event);
      event.dispose();
   }
   MO.FGuiControl_dispose = function FGuiControl_dispose(){
      var o = this;
      o._backImage = RObject.dispose(o._backImage);
      o._backHoverImage = RObject.dispose(o._backHoverImage);
      o._clientRectangle = RObject.dispose(o._clientRectangle);
      o.__base.MGuiBorder.dispose.call(o);
      o.__base.MGuiPadding.dispose.call(o);
      o.__base.MGuiMargin.dispose.call(o);
      o.__base.MGuiSize.dispose.call(o);
      o.__base.MRenderableLinker.dispose.call(o);
      o.__base.MGraphicObject.dispose.call(o);
      o.__base.FGuiComponent.dispose.call(o);
   }
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
with(MO){
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
            if(!RString.startsWith(type, o.PREFIX)){
               name = o.PREFIX + type;
            }
         }else if(type.constructor == TXmlNode){
            name = type.get('type');
            if(RString.isEmpty(name)){
               name = type.name();
               if(!RString.startsWith(name, o.PREFIX)){
                  name = o.PREFIX + name;
               }
            }else{
               tn = name;
            }
         }else{
            throw new TError(o, 'Unknown parameter. (type={1})', type);
         }
         result = RClass.create(name);
         if(tn){
            result.__typed = true;
         }
      }
      if(result == null){
         throw new TError(o, 'Create instance failure. (type={1})', type);
      }
      return result;
   }
   MO.RGuiControl.prototype.attachEvent = function RGuiControl_attachEvent(control, name, h, m, u){
      var o = this;
      var e = null;
      var p = control[name];
      if(!RMethod.isEmpty(p) || m){
         var cz = RClass.find(control.constructor);
         var a = cz.annotation(EAnnotation.Event, n);
         e = a.create();
         e.annotation = a;
         e.source = control;
         e.hSource = h;
         e.ohProcess = m;
         e.onProcess = p;
         e.process = RUiEvent.onProcess;
         RUiEvent.find(h).push(a.linker(), e);
         RHtml.linkSet(h, '_plink', c);
         a.bind(h, u);
      }
      return e;
   }
   MO.RGuiControl.prototype.innerbuild = function RGuiControl_innerbuild(parentControl, control, xconfig, attributes){
      var o = this;
      if((control == null) || (xconfig == null)){
         return;
      }
      if(RClass.isClass(control, MProperty)){
         control.propertyLoad(xconfig);
      }
      var linker = xconfig.get('linker');
      if(linker && parentControl){
         parentControl[linker] = control;
      }
      if(RClass.isClass(control, FGuiControl)){
      }
      if(control.__typed){
         parentControl = control;
      }
      if(RClass.isClass(control, MGuiContainer) && xconfig.hasNode()){
         var nodes = xconfig.nodes();
         var nodeCount = nodes.count();
         for(var i = 0; i < nodeCount; i++){
            var xnode = nodes.at(i);
            var child = control.createChild(xnode);
            if(!child){
               throw new TError('Invalid create child.');
            }
            o.innerbuild(parentControl, child, xnode, attributes);
            control.push(child);
         }
      }
      if(RClass.isClass(control, FGuiControl)){
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
            var className = RClass.name(component);
            if(RString.startsWith(className, 'FGui')){
               className = className.substring(4);
            }
            var xchild = xconfig.create(className);
            o.saveConfig(component, xchild);
         }
      }
      return xconfig;
   }
   MO.RGuiControl = new RGuiControl();
}
