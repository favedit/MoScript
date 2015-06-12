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
      if(!value.isEmpty()){
         xconfig.set(o._linker, value.toString());
      }
   }
   MO.APtyBorder_toString = function APtyBorder_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
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
      var value = xconfig.get(o._linker);
      instance[o._name].parse(value);
   }
   MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
      var o = this;
      var value = instance[o._name];
      if(!value.isEmpty()){
         xconfig.set(o._linker, value.toString());
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
      o.setBounds   = MGuiSize_setBounds;
      o.dispose     = MGuiSize_dispose;
      return o;
   }
   MO.MGuiSize_construct = function MGuiSize_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SSize2();
   }
   MO.MGuiSize_left = function MGuiSize_left(){
      return this._location.x;
   }
   MO.MGuiSize_setLeft = function MGuiSize_setLeft(value){
      this._location.x = value;
   }
   MO.MGuiSize_top = function MGuiSize_top(){
      return this._location.y;
   }
   MO.MGuiSize_setTop = function MGuiSize_setTop(value){
      this._location.y = value;
   }
   MO.MGuiSize_setLocation = function MGuiSize_setLocation(x, y){
      this._location.set(x, y);
   }
   MO.MGuiSize_width = function MGuiSize_width(){
      return this._size.width;
   }
   MO.MGuiSize_setWidth = function MGuiSize_setWidth(value){
      this._size.width = value;
   }
   MO.MGuiSize_height = function MGuiSize_height(){
      return this._size.width;
   }
   MO.MGuiSize_setHeight = function MGuiSize_setHeight(value){
      this._size.width = value;
   }
   MO.MGuiSize_setSize = function MGuiSize_setSize(width, height){
      this._size.set(width, height);
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
   }
}
MO.SGuiPaintEvent = function SGuiPaintEvent(){
   var o = this;
   o.graphic   = null;
   o.rectangle = new MO.SRectangle();
   o.dispose   = MO.SGuiPaintEvent_dispose;
   return o;
}
MO.SGuiPaintEvent_dispose = function SGuiPaintEvent_dispose(){
   var o = this;
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
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      o._components   = null;
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      o.isParent      = FGuiComponent_isParent;
      o.topComponent  = FGuiComponent_topComponent;
      o.hasComponent  = FGuiComponent_hasComponent;
      o.findComponent = FGuiComponent_findComponent;
      o.components    = FGuiComponent_components;
      o.push          = FGuiComponent_push;
      o.remove        = FGuiComponent_remove;
      o.clear         = FGuiComponent_clear;
      o.dispose       = FGuiComponent_dispose;
      return o;
   }
   MO.FGuiComponent_isParent = function FGuiComponent_isParent(component){
      while(component){
         if(component == this){
            return true;
         }
         component = component._parent;
      }
   }
   MO.FGuiComponent_topComponent = function FGuiComponent_topComponent(clazz){
      var component = this;
      if(component){
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
   MO.FGuiComponent_clear = function FGuiComponent_clear(p){
      var o = this;
      var components = o._components;
      if(components){
         components.clear();
      }
   }
   MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
      var o = this;
      o._name = null;
      o._label = null;
      o._tag = null;
      o._components = RObject.dispose(o._components, true);
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
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject, MGuiSize, MGuiMargin, MGuiPadding, MGuiBorder);
      o._styleBackcolor       = MO.RClass.register(o, [new MO.APtyString('_styleBackcolor'), new MO.AGetSet('_styleBackcolor')]);
      o._styleForecolor       = MO.RClass.register(o, [new MO.APtyString('_styleForecolor'), new MO.AGetSet('_styleForecolor')]);
      o._renderable      = MO.RClass.register(o, new AGetter('_renderable'));
      o._clientRectangle = null;
      o.onUpdate         = FGuiControl_onUpdate;
      o.onPaintBegin     = FGuiControl_onPaintBegin;
      o.onPaintEnd       = FGuiControl_onPaintEnd;
      o.onPaint          = FGuiControl_onPaint;
      o.construct        = FGuiControl_construct;
      o.paint            = FGuiControl_paint;
      o.update           = FGuiControl_update;
      o.build            = FGuiControl_build;
      o.process          = FGuiControl_process;
      o.dispose          = FGuiControl_dispose;
      return o;
   }
   MO.FGuiControl_onUpdate = function FGuiControl_onUpdate(event){
      var o = this;
      var location = o._location;
      var size = o._size;
      var rectangle = event.rectangle;
      o._clientRectangle.set(rectangle.left + location.x, rectangle.top + location.y, size.width, size.height);
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
      var rectangle = o._clientRectangle;
      if(o._styleBackcolor){
         graphic.fillRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._styleBackcolor, 1);
      }
      graphic.drawBorder(o._clientRectangle, o._borderInner);
      graphic.setFont('microsoft yahei,Arial,sans-serif');
      graphic.drawText('这是一个测试', 10, 40, '#FF0000');
   }
   MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(event){
      var o = this;
   }
   MO.FGuiControl_onPaint = function FGuiControl_onPaint(event){
      var o = this;
      o.onPaintBegin(event);
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FGuiControl)){
               component.onPaint(event);
            }
         }
      }
      o.onPaintEnd(event);
   }
   MO.FGuiControl_construct = function FGuiControl_construct(){
      var o = this;
      o.__base.FGuiComponent.construct.call(o);
      o.__base.MGuiSize.construct.call(o);
      o.__base.MGuiMargin.construct.call(o);
      o.__base.MGuiPadding.construct.call(o);
      o.__base.MGuiBorder.construct.call(o);
      o._clientRectangle = new SRectangle();
      o._backColor = '#CCCCCC';
      o._borderInner.left.color = '#FFFFFF';
   }
   MO.FGuiControl_update = function FGuiControl_update(){
      var o = this;
      var size = o._size;
      var event = new SGuiPaintEvent();
      event.rectangle.set(0, 0, size.width, size.height)
      o.onUpdate(event);
      event.dispose();
   }
   MO.FGuiControl_paint = function FGuiControl_paint(graphic){
      var o = this;
      var location = o._location;
      var size = o._size;
      var event = new SGuiPaintEvent();
      event.graphic = graphic;
      event.rectangle.assign(o._clientRectangle);
      o.onPaint(event);
      event.dispose();
   }
   MO.FGuiControl_build = function FGuiControl_build(){
      var o = this;
      var location = o._location;
      var size = o._size;
      var renderable = o._renderable;
      if(!renderable){
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlData);
      }
      renderable.setSize(size.width, size.height);
      o.update();
      var graphic = renderable.beginDraw();
      graphic._handle.imageSmoothingEnabled = false;
      o.paint(graphic);
      renderable.endDraw();
   }
   MO.FGuiControl_process = function FGuiControl_process(region){
      var o = this;
   }
   MO.FGuiControl_dispose = function FGuiControl_dispose(){
      var o = this;
      o._clientRectangle = RObject.dispose(o._clientRectangle);
      o.__base.MGuiBorder.dispose.call(o);
      o.__base.MGuiPadding.dispose.call(o);
      o.__base.MGuiMargin.dispose.call(o);
      o.__base.MGuiSize.dispose.call(o);
      o.__base.FGuiComponent.dispose.call(o);
   }
}
with(MO){
   MO.FGuiControlData = function FGuiControlData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._graphic    = null;
      o.construct   = FGuiControlData_construct;
      o.setup       = FGuiControlData_setup;
      o.setLocation = FGuiControlData_setLocation;
      o.setSize     = FGuiControlData_setSize;
      o.beginDraw   = FGuiControlData_beginDraw;
      o.endDraw     = FGuiControlData_endDraw;
      o.dispose     = FGuiControlData_dispose;
      return o;
   }
   MO.FGuiControlData_construct = function FGuiControlData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FGuiControlData_setup = function FGuiControlData_setup(){
      var o = this;
      o.__base.FE3dFaceData.setup.call(o);
      o._material.info().effectCode = 'flat';
   }
   MO.FGuiControlData_setLocation = function FGuiControlData_setLocation(x, y){
      var o = this;
      o._matrix.setTranslate(x, y, 0);
   }
   MO.FGuiControlData_setSize = function FGuiControlData_setSize(width, height){
      var o = this;
      o._size.set(width, height);
   }
   MO.FGuiControlData_beginDraw = function FGuiControlData_beginDraw(){
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
   MO.FGuiControlData_endDraw = function FGuiControlData_endDraw(){
      var o = this;
      var graphic = o._graphic;
      MO.Assert.debugNotNull(graphic);
      o._texture.upload(o._canvas);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      canvasConsole.free(graphic);
      o._graphic = null;
      o._ready = true;
   }
   MO.FGuiControlData_dispose = function FGuiControlData_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.RGuiControl = function RGuiControl(){
      var o = this;
      o.PREFIX    = 'FGui';
      return o;
   }
   MO.RGuiControl.prototype.newInstance = function RGuiControl_newInstance(p){
      var o = this;
      var r = null;
      if(p){
         var n = null
         var tn = null;
         if(p.constructor == String){
            if(!RString.startsWith(p, o.PREFIX)){
               n = o.PREFIX + p;
            }
         }else if(p.constructor == TXmlNode){
            n = p.get('type');
            if(RString.isEmpty(n)){
               n = p.name();
               if(!RString.startsWith(n, o.PREFIX)){
                  n = o.PREFIX + n;
               }
            }else{
               tn = n;
            }
         }else{
            throw new TError(o, 'Unknown parameter. (name={p})', p);
         }
         r = RClass.create(n);
         if(tn){
            r.__typed = true;
         }
      }
      if(r == null){
         throw new TError(o, 'Create instance failure. (name={p})', p);
      }
      return r;
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
   MO.RGuiControl = new RGuiControl();
}
with(MO){
   MO.FGuiFrameConsole = function FGuiFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._frames          = null;
      o.construct        = FGuiFrameConsole_construct;
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
   MO.FGuiFrameConsole_create = function FGuiFrameConsole_create(control, name){
      var o = this;
      var describeConsole = RConsole.find(FGuiFrameDescribeConsole);
      var xframe = describeConsole.load(name);
      var frame = RGuiControl.build(null, xframe, null, null);
      return frame;
   }
   MO.FGuiFrameConsole_find = function FGuiFrameConsole_find(name){
      return this._frames.get(name);
   }
   MO.FGuiFrameConsole_get = function FGuiFrameConsole_get(name){
      var o = this;
      var frames = o._frames;
      var frame = frames.get(name);
      if(!frame){
         frame = o.create(null, name);
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
with(MO){
   MO.FGuiFrameDescribeConsole = function FGuiFrameDescribeConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Global;
      o._serviceCode = 'cloud.describe.frame';
      o._defines     = RClass.register(o, new AGetter('_defines'));
      o.construct    = FGuiFrameDescribeConsole_construct;
      o.load         = FGuiFrameDescribeConsole_load;
      o.dispose      = FGuiFrameDescribeConsole_dispose;
      return o;
   }
   MO.FGuiFrameDescribeConsole_construct = function FGuiFrameDescribeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._defines = new TDictionary();
   }
   MO.FGuiFrameDescribeConsole_load = function FGuiFrameDescribeConsole_load(name){
      var o = this;
      var defines = o._defines;
      var xconfig = defines.get(name);
      if(xconfig){
         return xconfig;
      }
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'query');
      var xframe = xroot.create('Frame');
      xframe.set('name', name);
      var url = MO.Browser.hostPath('/' + o._serviceCode + '.ws');
      var xresult = RConsole.find(FXmlConsole).send(url, xdocument);
      var xframes = xresult.nodes();
      var count = xframes.count();
      for(var i = 0; i < count; i++){
         var xframe = xframes.at(i);
         var frameName = xframe.get('name');
         defines.set(frameName, xframe);
      }
      var xframe = defines.get(name);
      if(!xframe){
         throw new TError(o, 'Unknown frame. (name={1})', name);
      }
      return xframe;
   }
   MO.FGuiFrameDescribeConsole_dispose = function FGuiFrameDescribeConsole_dispose(){
      var o = this;
      o._defines = RObject.dispose(o._defines, true);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
with(MO){
   MO.FGuiPanel = function FGuiPanel(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
with(MO){
   MO.FGuiPicture = function FGuiPicture(o){
      o = RClass.inherits(this, o, FGuiControl);
      o._source = RClass.register(o, [new APtyString('_source'), new AGetSet('_source')]);
      return o;
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
      o = RClass.inherits(this, o, FGuiContainer);
      return o;
   }
}
with(MO){
   MO.FGuiWindow = function FGuiWindow(o){
      o = RClass.inherits(this, o, FGuiContainer);
      return o;
   }
}
