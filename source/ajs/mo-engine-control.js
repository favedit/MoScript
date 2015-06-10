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
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject);
      o._renderable  = RClass.register(o, new AGetter('_renderable'));
      o.onPaintBegin = FGuiControl_onPaintBegin;
      o.onPaintEnd   = FGuiControl_onPaintEnd;
      o.paint        = FGuiControl_paint;
      o.build        = FGuiControl_build;
      o.process      = FGuiControl_process;
      return o;
   }
   MO.FGuiControl_onPaintBegin = function FGuiControl_onPaintBegin(graphic){
      var o = this;
      graphic.fillRectangle(0, 0, 400, 200, '#00FF00', 1);
      graphic.drawText('Hello', 10, 10, '#FF0000');
   }
   MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(graphic){
      var o = this;
   }
   MO.FGuiControl_paint = function FGuiControl_paint(graphic){
      var o = this;
      o.onPaintBegin(graphic);
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FGuiControl)){
               component.paint(graphic);
            }
         }
      }
      o.onPaintEnd(graphic);
   }
   MO.FGuiControl_build = function FGuiControl_build(){
      var o = this;
      var renderable = o._renderable;
      if(!renderable){
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlData);
      }
      renderable.setLocation(100, 50);
      renderable.setSize(400, 200);
      var graphic = renderable.beginDraw();
      o.paint(graphic);
      renderable.endDraw();
   }
   MO.FGuiControl_process = function FGuiControl_process(region){
      var o = this;
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
