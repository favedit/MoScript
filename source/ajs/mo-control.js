var EAlign = new function EAlign(){
   var o = this;
   o.Left        = 'left';
   o.Center      = 'center';
   o.Right       = 'right';
   o.Top         = 'up';
   o.Middle      = 'middle';
   o.Bottom      = 'down';
   o.BottomLeft  = 'bl';
   o.BottomRight = 'br';
   return o;
}
var EBorder = new function EBorder(){
   var o = this;
   o.None          = 0;
   o.Square        = 1;
   o.Round         = 2;
   o.RoundIcon     = 3;
   o.RoundDrop     = 4;
   o.RoundTitle    = 5;
   o.RoundIconDrop = 6;
   return o;
}
var EBorderStyle = new function EBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
var EDataAction = new function EDataAction(){
   var o = this;
   o.Fetch     = 'fetch';
   o.Search    = 'search';
   o.Lov       = 'lov';
   o.Zoom      = 'zoom';
   o.Prepare   = 'prepare';
   o.Insert    = 'insert';
   o.Update    = 'update';
   o.Delete    = 'delete';
   o.First     = 'first';
   o.Prior     = 'prior';
   o.Next      = 'next';
   o.Last      = 'last';
   o.Action    = 'action';
   o.FetchLov  = 'fetchLov';
   o.EndFetch  = 'endfetch';
   o.EndUpdate = 'endupdate';
   o.DsChanged = 'dschanged';
   o.Scalar    = 'scalar';
   o.Complete  = 'complete';
   o.Process   = 'process';
   return o;
}
var EDataService = new function EDataService(){
   var o = this;
   o.Dataset    = 'database.dataset';
   o.List       = 'design.list';
   o.WebForm    = 'design.webform';
   o.Translate  = 'design.translate';
   o.WebDataset = 'logic.dataset';
   return o;
}
var EDisplayMode = new function EDisplayMode(){
   var o = this;
   o.Display = 'P';
   o.Search = 'S';
   o.Design = 'G';
   o.Insert  = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   o.Zoom = 'Z';
   return o;
}
var EEditConfig = new function(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
function EEditStatusFace(o){
   if(!o){o=this;}
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
var EEditStatus = new EEditStatusFace();
var EEventInvoke = new function EEventInvoke(){
   var o = this;
   o.Unknown = 0;
   o.Before  = 1;
   o.After   = 2;
   return o;
}
var EEventStatus = new function EEventStatus(){
   var o = this;
   o.Unknown  = 0;
   o.Continue = 1;
   o.Stop     = 2;
   o.Cancel   = 3;
   o.Failure  = 4;
   return o;
}
var EEventType = new function EEventType(){
   var o = this;
   o.Unknown    = 0;
   o.Construct  = 1;
   o.Initialize = 2;
   o.Build      = 3;
   o.Refresh    = 4;
   o.Resize     = 5;
   o.Visible    = 6;
   o.Show       = 7;
   o.Hidden     = 8;
   o.Enable     = 9;
   o.Disable    = 10;
   o.Release    = 11;
   o.Design     = 12;
   o.Action     = 13;
   o.Valid      = 14;
   o.Mode       = 15;
   return o;
}
var ELabelMode = new function ELabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
var ELabelPosition = new function ELabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
var EPanel = new function EPanel(){
   var o = this;
   o.Container = 0;
   o.Parent    = 1;
   o.Size      = 8;
   o.Border    = 2;
   o.Edit      = 3;
   o.Focus     = 4;
   o.Design    = 5;
   o.Scroll    = 6;
   o.Shadow    = 7;
   o.Move      = 9;
   o.Disable   = 10;
   o.Drop      = 11;
   return o;
}
function EPositionFace(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   o.Before     = 1;
   o.After      = 2;
   o.LineBefore = 3;
   o.LineAfter  = 4;
   return o;
}
EPosition = new EPositionFace();
function FComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   o._parent       = null;
   o._components   = null;
   o._name         = RClass.register(o, new APtyString('_name'));
   o._label        = RClass.register(o, new APtyString('_label'));
   o.oeInitialize  = FComponent_oeInitialize;
   o.oeRelease     = FComponent_oeRelease;
   o.isParent      = FComponent_isParent;
   o.topComponent  = FComponent_topComponent;
   o.hasComponent  = FComponent_hasComponent;
   o.components    = FComponent_components;
   o.push          = FComponent_push;
   o.process       = FComponent_process;
   o.psInitialize  = FComponent_psInitialize;
   o.psRelease     = FComponent_psRelease;
   o.toString      = FComponent_toString;
   o.dispose       = FComponent_dispose;
   o.innerDumpInfo = FComponent_innerDumpInfo;
   o.innerDump     = FComponent_innerDump;
   return o;
}
function FComponent_oeInitialize(e){
   return EEventStatus.Continue;
}
function FComponent_oeRelease(e){
   return EEventStatus.Continue;
}
function FComponent_isParent(p){
   while(p){
      if(p == this){
         return true;
      }
      p = p._parent;
   }
}
function FComponent_topComponent(c){
   var p = this;
   if(c){
      while(RClass.isClass(p._parent, c)){
         p = p._parent;
      }
   }else{
      while(p._parent){
         p = p._parent;
      }
   }
   return p;
}
function FComponent_hasComponent(){
   var ps = this._components;
   return ps ? !ps.isEmpty() : false;
}
function FComponent_components(){
   var o = this;
   var r = o._components;
   if(r == null){
      r = new TDictionary();
      o._components = r;
   }
   return r;
}
function FComponent_push(p){
   var o = this;
   if(RClass.isClass(p, FComponent)){
      var ps = o.components();
      p.parent = o;
      if(p._name == null){
         p._name = ps.count();
      }
      ps.set(p._name, p);
   }
}
function FComponent_process(e){
   var o = this;
   var v = o.__base[e.clazz];
   if(v){
      e.invokeCd = EEventInvoke.Before;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   if(RClass.isClass(o, MContainer)){
      var ps = o._components;
      if(ps){
         var pc = ps.count();
         if(pc){
            for(var i = 0; i < pc; i++){
               var p = ps.value(i);
               if(p){
                  var r = p.process(e);
                  if(r == EEventStatus.Cancel){
                     return r;
                  }
               }
            }
         }
      }
   }
   if(v){
      e.invokeCd = EEventInvoke.After;
      var m = o[e.invoke];
      if(!m){
         return RLogger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), e.invoke);
      }
      var r = m.call(o, e);
      if((r == EEventStatus.Stop) || (r == EEventStatus.Cancel)){
         return r;
      }
   }
   return EEventStatus.Continue;
}
function FComponent_psInitialize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeInitialize', FComponent);
   o.process(e);
   e.dispose();
}
function FComponent_psRelease(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRelease', FComponent);
   o.process(e);
   e.dispose();
}
function FComponent_toString(){
   var o = this;
   return RClass.dump(o) + ':label=' + o._label;
}
function FComponent_dispose(){
   var o = this;
   o._parent = null;
   o._components = null;
   o.__base.FObject.dispose.call(o);
}
function FComponent_innerDumpInfo(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append(',name=', o._name);
   s.append(',label=', o._label);
}
function FComponent_innerDump(s, l){
   var o = this;
   o.innerdumpInfo(s);
   var ps = o.components;
   if(ps){
      s.appendLine();
      var c = ps.count;
      for(var n = 0; n < c; n++){
         var p = ps.value(n);
         if(p){
            p.innerDump(s, l + 1);
         }
      }
   }
   return s;
}
function FContainer(o){
   o = RClass.inherits(this, o, FControl, MContainer);
   o.oeDesign            = RMethod.empty;
   o.panel               = FContainer_panel;
   o.focusControl        = FContainer_focusControl;
   o.storeConfig         = FContainer_storeConfig;
   o.psBuildChildren     = FContainer_psBuildChildren;
   o.setChildrenProperty = FContainer_setChildrenProperty;
   return o;
}
function FContainer_panel(t){
   var o = this;
   if(EPanel.Container == t){
      return o.hPanel;
   }
   return o.base.FControl.panel.call(o, t);
}
function FContainer_focusControl(){
   return null;
   var o = this;
   var cs = o.controls;
   if(cs){
      var cc = cs.count;
      for(var n=0; n<cc; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, MFocus) && c.testFocus()){
        	if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                return c.focus();
            }
         }
      }
      RConsole.find(FFocusConsole).focus(o);
   }
}
function FContainer_storeConfig(x){
   var o = this;
   x.name = RClass.name(o);
   o.saveConfig(x);
   var ps = o.components;
   if(ps){
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
function FContainer_psBuildChildren(){
   var o = this;
   var e = REvent.alloc(o, EEvent.Build);
   o.ps(e, null, true);
   REvent.free(e);
}
function FContainer_setChildrenProperty(p, vs){
   var o = this;
   for(var n in vs){
      o.component(n)[p] = vs[n];
   }
}
function FControl(o){
   o = RClass.inherits(this, o, FComponent, MStyle, MSize, MPadding);
   o._disable          = RClass.register(o, new APtyBoolean('_disable', null, false));
   o._nowrap           = RClass.register(o, new APtyBoolean('_nowrap', null, false));
   o._hint             = RClass.register(o, new APtyString('_hint'));
   o._styleContainer   = RClass.register(o, new AStyle('_styleContainer', 'Container'));
   o._statusVisible    = true;
   o._statusEnable     = true;
   o._statusBuild      = false;
   o._controls         = null;
   o._hParent          = null;
   o._hContainer       = null;
   o.onBuildContainer  = FControl_onBuildContainer;
   o.oeBuild           = FControl_oeBuild;
   o.oeMode            = FControl_oeMode;
   o.oeEnable          = FControl_oeEnable;
   o.oeVisible         = FControl_oeVisible;
   o.oeResize          = FControl_oeResize;
   o.oeRefresh         = FControl_oeRefresh;
   o.construct         = FControl_construct;
   o.topControl        = FControl_topControl;
   o.hasControl        = FControl_hasControl;
   o.controls          = FControl_controls;
   o.panel             = FControl_panel;
   o.isVisible         = FControl_isVisible;
   o.setVisible        = FControl_setVisible;
   o.show              = FControl_show;
   o.hide              = FControl_hide;
   o.isEnable          = FControl_isEnable;
   o.setEnable         = FControl_setEnable;
   o.enable            = FControl_enable;
   o.disable           = FControl_disable;
   o.psBuild           = FControl_psBuild;
   o.psMode            = FControl_psMode;
   o.psDesign          = FControl_psDesign;
   o.psEnable          = FControl_psEnable;
   o.psVisible         = FControl_psVisible;
   o.psResize          = FControl_psResize;
   o.psRefresh         = FControl_psRefresh;
   o.push              = FControl_push;
   o.attachEvent       = FControl_attachEvent;
   o.linkEvent         = FControl_linkEvent;
   o.callEvent         = FControl_callEvent;
   o.dispose           = FControl_dispose;
   return o;
}
function FControl_onEnter(e){
   var o = this;
   RConsole.find(FFocusConsole).enter(o);
   if(o.hint){
      window.status = o.hint;
   }
}
function FControl_onLeave(e){
   var o = this;
   RConsole.find(FFocusConsole).leave(o);
   if(o.hint){
      window.status = '';
   }
}
function FControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createDiv(e.hDocument, o.style('Container'));
}
function FControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.onBuildContainer(e);
      var h = o._hContainer;
      RHtml.linkSet(h, 'control', o);
      o.setSize(o.width, o.height);
      o.setPadding(o._padding.left, o._padding.top, o._padding.right, o._padding.bottom, true);
      o._statusBuild = true;
   }
   return EEventStatus.Continue;
}
function FControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return EEventStatus.Continue;
}
function FControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return EEventStatus.Continue;
}
function FControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return EEventStatus.Continue;
}
function FControl_oeResize(e){
   return EEventStatus.Continue;
}
function FControl_oeRefresh(e){
   return EEventStatus.Continue;
}
function FControl_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o.__base.MSize.construct.call(o);
   o.__base.MPadding.construct.call(o);
}
function FControl_topControl(c){
   var r = this;
   if(c){
      while(r._parent){
         if(RClass.isClass(r._parent, c)){
            return r._parent;
         }
         r = r._parent;
      }
      if(!RClass.isClass(r, c)){
         return null;
      }
   }else{
      while(r._parent){
         if(!RClass.isClass(r._parent, FControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
function FControl_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}
function FControl_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
      o._controls = r;
   }
   return r;
}
function FControl_panel(p){
   var o = this;
   switch(p){
      case EPanel.Parent:
         return o._hParent;
      case EPanel.Container:
      case EPanel.Size:
         return o._hContainer;
   }
   return null;
}
function FControl_isVisible(){
   return _statusVisible;
}
function FControl_setVisible(v){
   var o = this;
   o._visible = v;
   var h = o.panel(EPanel.Container);
   if(h){
      RHtml.displaySet(h, v);
   }
}
function FControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
function FControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
function FControl_isEnable(){
   return this._statusEnable;
}
function FControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
function FControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
function FControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
function FControl_psBuild(p){
   var o = this;
   var h = null;
   var d = null;
   if(p.createElement){
      d = p;
      h = p.body;
   }else if(p.ownerDocument.createElement){
      d = p.ownerDocument;
      h = p;
   }else{
      throw new TError("Build parent is invalid. (parent={1})", p);
   }
   var e = new TEventProcess(null, o, 'oeBuild', FControl);
   e.hDocument = d;
   o.process(e);
   e.hDocument = null;
   e.dispose();
}
function FControl_psMode(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeMode', FControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
function FControl_psDesign(m, f){
   var o = this;
   RConsole.find(FDesignConsole).setFlag(m, f, o);
   var e = new TEventProcess(null, o, 'oeDesign', MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
function FControl_psEnable(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeEnable', FControl)
   e.enable = v;
   o.process(e);
   e.dispose();
}
function FControl_psVisible(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeVisible', FControl);
   e.visible = v;
   o.process(e);
   e.dispose();
}
function FControl_psResize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeResize', FControl);
   o.process(e);
   e.dispose();
}
function FControl_psRefresh(t){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRefresh', FControl);
   o.process(e);
   e.dispose();
}
function FControl_setPanel(h){
   var o = this;
   o.hParent = h;
   if(h && o.hPanel){
      h.appendChild(o.hPanel);
   }
}
function FControl_push(p){
   var o = this;
   o.__base.FComponent.push.call(o, p);
   if(RClass.isClass(p, FControl)){
      var cs = o.controls();
      if(!p.name){
         p.name = cs.count;
      }
      cs.set(p.name, p);
   }
}
function FControl_attachEvent(n, h, m){
   return RControl.attachEvent(this, n, h, m);
}
function FControl_linkEvent(t, n, h, m){
   return RControl.linkEvent(this, t, n, h, m);
}
function FControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
function FControl_dispose(){
   var o = this;
   o.__base.FComponent.dispose.call(o)
   RMemory.freeHtml(o._hContainer);
   o._hParent = null;
   o._hContainer = null;
}
function MContainer(o){
   o = RClass.inherits(this, o);
   o.appendChild = RMethod.empty;
   return o;
}
function MDataValue(o){
   o = RClass.inherits(this, o);
   o.loadValue = RMethod.virtual(o, 'loadValue');
   o.saveValue = RMethod.virtual(o, 'saveValue');
   return o;
}
function MDesign(o){
   o = RClass.inherits(this, o);
   o.inDesign      = false;
   o.storage       = null;
   o.oeDesign      = MDesign_oeDesign;
   o.onDesignEnter = RClass.register(o, new HMouseEnter('onDesignEnter'), MDesign_onDesignEnter);
   o.onDesignLeave = RClass.register(o, new HMouseEnter('onDesignLeave'), MDesign_onDesignLeave);
   o.onDesignBegin = RClass.register(o, new HMouseEnter('onDesignBegin'), MDesign_onDesignBegin);
   o.onDesignEnd   = RClass.register(o, new HMouseEnter('onDesignEnd'), MDesign_onDesignEnd);
   return o;
}
function MDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            var o = this;
            var h = o.hPanel;
            if(e.flag){
               o.isDesign = true;
               RHtml.link(h, 'className', h.className);
               RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = RHtml.findLink(h, 'className');
               var omd = RHtml.findLink(h, 'onmousedown');
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case EDesign.Border:
            var o = this;
            var h = o.hPanel;
            if(e.flag){
               RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = RHtml.findLink(h, 'styleBorder');
            }
            break;
      }
   }
}
function MDesign_onDesignEnter(){
   var o = this;
   o.hPanel.className = o.style('Design');
}
function MDesign_onDesignLeave(){
}
function MDesign_onDesignBegin(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   g.designStyle = o.hPanel.className;
   g.designLayer = o.hPanel.zIndex;
   o.hPanel.className = o.style('DesignDrag');
   o.inDesign = true;
}
function MDesign_onDesignEnd(){
   var o = this;
   var g = o.storage = RObject.nvlObj(o.storage);
   o.hPanel.className = g.designStyle;
   o.hPanel.zIndex = g.designLayer;
   o.inDesign = false;
}
function MDisplay(o){
   o = RClass.inherits(this, o);
   o._dispDisplay = RClass.register(o, new APtySet(null, '_dispDisplay', 'disp_mode', EDisplayMode.Display, false));
   o._dispSearch  = RClass.register(o, new APtySet(null, '_dispSearch', 'disp_mode', EDisplayMode.Search, false));
   o._dispInsert  = RClass.register(o, new APtySet(null, '_dispInsert', 'disp_mode', EDisplayMode.Insert, false));
   o._dispUpdate  = RClass.register(o, new APtySet(null, '_dispUpdate', 'disp_mode', EDisplayMode.Update, false));
   o._dispDelete  = RClass.register(o, new APtySet(null, '_dispDelete', 'disp_mode', EDisplayMode.Delete, false));
   o._dispZoom    = RClass.register(o, new APtySet(null, '_dispZoom', 'disp_mode', EDisplayMode.Zoom, false));
   o._dispAlign   = RClass.register(o, new APtyString(null, '_dispAlign', null, EAlign.Left));
   o._visible    = true;
   o.oeMode      = MDisplay_oeMode;
   o.canVisible  = MDisplay_canVisible;
   return o;
}
function MDisplay_oeMode(e){
   var o = this;
   if(e.isBefore()){
      var v = true;
      if(!o.base.MDisplayAble){
         v = o.canVisible(e.mode);
      }
      o.setVisible(v);
   }
}
function MDisplay_canVisible(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Display:
         return o.dispList;
      case EMode.Search:
         return o.dispSearch;
      case EMode.Insert:
         return o.dispInsert;
      case EMode.Update:
         return o.dispUpdate;
      case EMode.Delete:
         return o.dispDelete;
      case EMode.Zoom:
         return o.dispZoom;
   }
}
function MDropable(o){
   o = RClass.inherits(this, o);
   o._styleDrop         = RClass.register(o, new AStyle('Drop'));
   o._styleIconDrop     = RClass.register(o, new AStyleIcon('Drop'));
   o._hDropPanel        = null;
   o._hDrop             = null;
   o.onDropEnter       = RClass.register(o, new HMouseEnter('onDropEnter'));
   o.onDropLeave       = RClass.register(o, new HMouseLeave('onDropLeave'));
   o.onDropClick       = RClass.register(o, new HMouseDown('onDropClick'), MDropable_onDropClick);
   o.onDropDoubleClick = RClass.register(o, new HDoubleClick('onDropDoubleClick'), MDropable_onDropDoubleClick);
   o.onBuildDrop       = MDropable_onBuildDrop;
   o.canDrop           = MDropable_canDrop;
   o.drop              = RMethod.virtual(o, 'drop');
   return o;
}
function MDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
function MDropable_onBuildDrop(){
   var o = this;
   var h = o.hDrop = RBuilder.newIcon(null, o.styleIcon('Drop'));
   h.style.width =16;
   h.style.borderLeft = '1 solid #CCCCCC';
   h.className = o.style('Drop');
   h.style.cursor = 'hand';
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
}
function MDropable_canDrop(){
   var o = this;
   if(RClass.isClass(o, MDesign)){
      return !RConsole.find(FDesignConsole).canDesignMove;
   }
   return true;
}
function MEditable(o){
   o = RClass.inherits(this, o);
   o._editInsert = RClass.register(o, new APtySet(null, '_editInsert', 'edit_mode', EDisplayMode.Insert, false));
   o._editUpdate = RClass.register(o, new APtySet(null, '_editUpdate', 'edit_mode', EDisplayMode.Update, false));
   o._editDelete = RClass.register(o, new APtySet(null, '_editDelete', 'edit_mode', EDisplayMode.Delete, false));
   o._editZoom   = RClass.register(o, new APtySet(null, '_editZoom', 'edit_mode', EDisplayMode.Zoom, false));
   o._absEdit   = true;
   o._editable  = false;
   o.canEdit    = MEditable_canEdit;
   return o;
}
function MEditable_canEdit(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.editInsert;
      case EMode.Update:
         return o.editUpdate;
      case EMode.Delete:
         return o.editDelete;
      case EMode.Zoom:
         return o.editZoom;
   }
}
function MEditDescriptor(o){
   o = RClass.inherits(this, o, MEditable);
   o._dataName          = RClass.register(o, new APtyString(null, '_dataName'));
   o._dataCode          = RClass.register(o, new APtyString(null, '_dataCode'));
   o._dataDefault       = RClass.register(o, new APtyString(null, '_dataDefault'));
   o._labelIcon         = RClass.register(o, new APtyString(null, '_labelIcon'));
   o._labelIconDisable  = RClass.register(o, new APtyString(null, '_labelIconDisable'));
   o._labelColor        = RClass.register(o, new APtyString(null, '_labelColor'));
   o._labelAlign        = RClass.register(o, new APtyString(null, '_labelAlign', null, EAlign.Left));
   o._labelValign       = RClass.register(o, new APtyString(null, '_labelValign', null, EAlign.Middle));
   o._editSearch        = RClass.register(o, new APtySet(null, '_editSearch', 'editAccess', EEditConfig.Search, false));
   o._editCopy          = RClass.register(o, new APtySet(null, '_editCopy', 'editAccess', EEditConfig.Copy, false));
   o._editAlign         = RClass.register(o, new APtyString(null, '_editAlign', null, EAlign.Left));
   o._editValign        = RClass.register(o, new APtyString(null, '_editValign', null, EAlign.Middle));
   o._editFormat        = RClass.register(o, new APtyString(null, '_editFormat'));
   o._editUnit          = RClass.register(o, new APtyString(null, '_editUnit'));
   o._editTip           = RClass.register(o, new APtyString(null, '_editTip'));
   o._validInsert       = RClass.register(o, new APtySet(null, '_validInsert', 'validAccess', EDisplayMode.Insert, false));
   o._validUpdate       = RClass.register(o, new APtySet(null, '_validUpdate', 'validAccess', EDisplayMode.Update, false));
   o._validDelete       = RClass.register(o, new APtySet(null, '_validDelete', 'validAccess', EDisplayMode.Delete, false));
   o._validRequire      = RClass.register(o, new APtyBoolean(null, '_validRequire', null, false));
   o.__tip             = null;
   o._validable        = false;
   o.oeSaveCode        = MEditDescriptor_oeSaveCode;
   o.canValid          = MEditDescriptor_canValid;
   o.__changedEvent    = new TEvent();
   o.formatValue       = MEditDescriptor_formatValue;
   o.formatText        = MEditDescriptor_formatText;
   o.setInfo           = RMethod.empty;
   o.validText         = MEditDescriptor_validText;
   return o;
}
function MEditDescriptor_onDataEnter(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      s._hover = true;
      s.refreshStyle();
   }
   if(o.editTip){
      o.__tip = window.status;
   }
}
function MEditDescriptor_onDataLeave(s, e){
   var o = this;
   if(s.__progress){
      return;
   }
   if(s._editable){
      o._hover = false;
      o.refreshStyle();
   }
   if(o.editTip){
      window.status = o.__tip;
   }
}
function MEditDescriptor_onDataKeyDown(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      s._invalidText = o.validText(s.text());
      s.refreshStyle();
   }
}
function MEditDescriptor_onDataChange(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      if(s.isTextChanged()){
         var t = s.text();
         var vt = s._invalidText = o.validText(t);
         if(vt){
            s.refreshStyle();
         }else{
         }
         o.callEvent('onDataChange', o, o.__changedEvent);
      }
   }
}
function MEditDescriptor_onDataEditEnd(s, e){
   var o = this;
   var vt = s._invalidText = o.validText(s.text());
   if(vt){
      RLogger.debug(this, 'Edit valid failed ({0})', vt);
   }else{
      s.commitValue();
   }
   if(s.isTextChanged()){
	   o.callEvent('onDataChange', o, o.__changedEvent);
   }
   s.refreshStyle();
}
function MEditDescriptor_oeSaveCode(e){
   var o = this;
   if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
      e.values.set(o.dataName, o.dataCode);
   }
   return EEventStatus.Stop;
}
function MEditDescriptor_canValid(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case EMode.Insert:
         return o.validInsert;
      case EMode.Update:
         return o.validUpdate;
      case EMode.Delete:
         return o.validDelete;
   }
}
function MEditDescriptor_formatValue(v){
   return RString.nvl(v);
}
function MEditDescriptor_formatText(t){
   return RString.nvl(t);
}
function MEditDescriptor_validText(t){
   var o = this;
}
function MEditReference(o){
   o = RClass.inherits(this, o);
   o._lovService    = RClass.register(o, new APtyString('_lovService', null, EDataService.WebForm));
   o._lovRefer      = RClass.register(o, new APtyString('_lovRefer'));
   o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
   o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
   o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
   o.__listView     = null;
   o.onListSelected = RMethod.empty;
   o.canListView    = MEditReference_canListView;
   o.setLabelStyle  = MEditReference_setLabelStyle;
   o.doListView     = MEditReference_doListView;
   return o;
}
function MEditReference_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}
function MEditReference_canListView(){
   return !RString.isEmpty(this.lovRefer) && this._editable;
}
function MEditReference_setLabelStyle(){
   var o = this;
   if(!RString.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}
function MEditReference_doListView(cvs){
   var o = this;
   var v = o.__listView;
   if(!v){
      v = o.__listView = top.RControl.create(top.FListWindow);
   }
   v.linkConsole = RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
function MEditValidator(o){
   o = RClass.inherits(this, o);
   o._validable = false;
   o._valid     = true;
   o._validText = null;
   o.oeValid    = RMethod.empty;
   return o;
}
function MEditValue(o){
   o = RClass.inherits(this, o, MDataValue);
   o._dataValue     = RClass.register(o, new APtyString(null, '_dataValue'));
   o.__recordValue = null;
   o.__recordText  = null;
   o._info         = null;
   o._hover        = false;
   o._editable     = true;
   o._editing      = false;
   o._disbaled     = false;
   o._invalid      = false;
   o._invalidText  = null;
   o.oeClearValue  = MEditValue_oeClearValue;
   o.oeResetValue  = MEditValue_oeResetValue;
   o.oeLoadValue   = MEditValue_oeLoadValue;
   o.oeSaveValue   = MEditValue_oeSaveValue;
   o.oeRecordValue = MEditValue_oeRecordValue;
   o.oeValidValue  = RMethod.empty;
   o.descriptor    = MEditValue_descriptor;
   o.isTextChanged = MEditValue_isTextChanged;
   o.isDataChanged = MEditValue_isDataChanged;
   o.clearValue    = MEditValue_clearValue;
   o.resetValue    = MEditValue_resetValue;
   o.loadValue     = MEditValue_loadValue;
   o.saveValue     = MEditValue_saveValue;
   o.recordValue   = MEditValue_recordValue;
   o.commitValue   = MEditValue_commitValue;
   o.validValue    = RMethod.empty;
   o.get           = MEditValue_get;
   o.reget         = MEditValue_reget;
   o.set           = MEditValue_set;
   o.setInfoPack   = MEditValue_setInfoPack;
   o.setInfo       = MEditValue_setInfo;
   o.setEditable   = MEditValue_setEditable;
   o.doFocus       = MEditValue_doFocus;
   o.doBlur        = MEditValue_doBlur;
   return o;
}
function MEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.resetValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}
function MEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   var vs = e.values;
   var dn = d.dataName;
   if(!RString.isEmpty(dn)){
      if(vs.contains(dn)){
         var v = vs.nvl(dn);
         if(RControl.isInfo(v)){
            o.setInfoPack(v);
         }else{
        	 if(RControl.isGroup(v)){
        		 o.setGroupPack(v);
        	 }else{
                 o.loadValue(vs);
        	 }
         }
         o.recordValue();
         o.dataValue = o.reget();
      }
   }
   return EEventStatus.Stop;
}
function MEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}
function MEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}
function MEditValue_descriptor(){
   return this;
}
function MEditValue_isTextChanged(){
   return RString.nvl(this.text()) != this.__recordText;
}
function MEditValue_isDataChanged(){
   return RString.nvl(this.reget()) != this.__recordValue;
}
function MEditValue_clearValue(){
   var o = this;
   o.set(RString.EMPTY);
   o.dataValue = RString.EMPTY;
}
function MEditValue_resetValue(){
   var o = this;
   var v = RString.nvl(o.descriptor().dataDefault);
   o.set(v);
   o.dataValue = v;
}
function MEditValue_loadValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      o.set(c.get(d.name));
   }else if(EStore.DataNvl == t){
      if(c.contains(d.dataName)){
         o.set(c.get(d.dataName));
      }
   }else if(EStore.Reset == t){
      o.set(RString.EMPTY);
   }else{
      o.set(c.get(d.dataName));
   }
}
function MEditValue_saveValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      c.set(d.name, o.reget());
   }else{
      c.set(d.dataName, o.reget());
   }
}
function MEditValue_recordValue(){
   var o = this;
   o.__recordText = RString.nvl(o.text());
   o.__recordValue = RString.nvl(o.reget());
}
function MEditValue_commitValue(){
   this.__commitValue = RString.nvl(this.reget());
}
function MEditValue_get(){
   return this.dataValue;
}
function MEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}
function MEditValue_set(v){
   var o = this;
   o.dataValue = RString.nvl(v);
   o.setText(o.descriptor().formatText(v));
}
function MEditValue_setInfoPack(v){
   var o = this;
   var f = o._info;
   if(!f){
      f = o._info = new TControlInfo();
   }
   f.unpack(v);
   var d = o.descriptor();
   d.setInfo(f);
   if(d != o){
      o.setInfo(f);
   }
}
function MEditValue_setInfo(f){
   this.set(f.value);
}
function MEditValue_setEditable(v){
   var o = this;
   o._editable = v;
   o.refreshStyle();
}
function MEditValue_doFocus(){
   var o = this;
   if(o._editable){
      o._editing = true;
      o.descriptor().onDataEditBegin(o);
   }
}
function MEditValue_doBlur(){
   var o = this;
   if(o._editable && o._editing){
      o.descriptor().onDataEditEnd(o);
      o._editing = false;
   }
}
function MEditZoom(o){
   o = RClass.inherits(this, o);
   o._zoomRefer = RClass.register(o, new APtyString('_zoomRefer'));
   o._zoomField = RClass.register(o, new APtyString('_zoomField'));
   o.testZoom   = MEditZoom_testZoom;
   o.doZoom     = MEditZoom_doZoom;
   return o;
}
function MEditZoom_testZoom(){
   return !RString.isEmpty(this.zoomRefer);
}
function MEditZoom_doZoom(v){
   RFormSpace.doZoom(this, v);
}
function MFocus(o){
   o = RClass.inherits(this, o);
   o.onFocus   = RClass.register(o, new HFocus('onFocus'), MFocus_onFocus);
   o.onBlur    = RClass.register(o, new HBlur('onBlur'));
   o.testFocus = RMethod.emptyTrue;
   o.testBlur  = RMethod.emptyTrue;
   o.doFocus   = RMethod.empty;
   o.doBlur    = RMethod.empty;
   o.focus     = MFocus_focus;
   o.blur      = MFocus_blur;
   return o;
}
function MFocus_onFocus(e){
   RConsole.find(FFocusConsole).focus(this, e);
}
function MFocus_focus(){
   RConsole.find(FFocusConsole).focus(this);
}
function MFocus_blur(){
   RConsole.find(FFocusConsole).blur(this);
}
function MPadding(o){
   o = RClass.inherits(this, o);
   o._padding     = RClass.register(o, new APtyPadding('_padding'));
   o.construct    = MPadding_construct;
   o.padding      = MPadding_padding;
   o.setPadding   = MPadding_setPadding;
   o.refreshStyle = MPadding_refreshStyle;
   return o;
}
function MPadding_construct(){
   var o = this;
   o._padding = new SPadding();
}
function MPadding_padding(){
   return this._padding;
}
function MPadding_setPadding(l, t, r, b){
   return this._padding.set(l, t, r, b);
}
function MPadding_refreshStyle(){
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   if(p.left){
      h.style.paddingLeft = p.left;
   }
   if(p.top){
      h.style.paddingTop = p.top;
   }
   if(p.right){
      h.style.paddingRight = p.right;
   }
   if(p.bottom){
      h.style.paddingBottom = p.bottom;
   }
}
function MProgress(o){
   o = RClass.inherits(this, o);
   o.oeProgress = RMethod.virtual(o, 'oeProgress');
   return o;
}
function MPropertyEdit(o){
   o = RClass.inherits(this, o, MEditValidator, MEditReference, MEditZoom);
   o._editCase       = RClass.register(o, new APtyString('_editCase'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   o.oeValid         = MPropertyEdit_oeValid;
   return o;
}
function MPropertyEdit_oeValid(e){
   var o = this;
   var r = EEventStatus.Stop;
   if(o._visible && o._validable){
      var t = o.text();
      if(o.validRequire && !RValidator.validRequire(o, t)){
         e.controls.push(o);
         return r;
      }
      if(o.editLength && !RValidator.validTextLength(o, t, o.editLength)){
         e.controls.push(o);
         return r;
      }
   }
   return r;
}
function MSize(o){
   o = RClass.inherits(this, o);
   o._location = RClass.register(o, new APtyPoint2('_location'));
   o._size     = RClass.register(o, new APtySize2('_size'));
   o.onSize    = null;
   o.construct = MSize_construct;
   o.calcRect  = MSize_calcRect;
   o.resize    = MSize_resize;
   o.setSize   = MSize_setSize;
   o.setBounds = MSize_setBounds;
   o.resetSize = MSize_resetSize;
   o.innerDump = MSize_innerDump;
   return o;
}
function MSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}
function MSize_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(null != width){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSize_setSize(w, h){
   var h = this.panel(EPanel.Size);
   if(w){
      h.style.width = w;
   }
   if(h){
      h.style.height = h;
   }
}
function MSize_setBounds(l, t, r, b, force){
   var o = this;
   var h = o.panel(EPanel.Size);
   if(!h){
      return;
   }
   var s = h.style;
   var c = false;
   if(l && l >= 0){
      if(force || o.left != l){
         o.left = l;
         s.pixelLeft = l;
         c = true;
      }
   }
   if(t && t >= 0){
      if(force || o.top != t){
         o.top = t;
         s.pixelTop = t;
         c = true;
      }
   }
   if(r && r >= 0){
      var width = r-o.left+1;
      if(force || o.width != width){
         o.width = width;
         s.pixelWidth = o.width;
         c = true;
      }
   }
   if(b && b >= 0){
      var height = b-o.top+1;
      if(force || o.height != height){
         o.height = height;
         s.pixelHeight = o.height;
         c = true;
      }
   }
   if(c && o.onSize){
      o.onSize();
   }
}
function MSize_resetSize(){
   var o = this;
   o.setBounds(o.left, o.top, o.left+o.width-1, o.top+o.height-1, true)
}
function MSize_calcRect(){
   this.rect = RRect.nvl(this.rect);
   RHtml.toRect(this.rect, this.hPanel);
   return this.rect;
}
function MSize_innerDump(s, l){
   var o = this;
   s.append('Size [', RBoolean.toString(o.isSizeable), ':');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
function MSizeable(o){
   o = RClass.inherits(this, o);
   o.isSizeable  = true;
   o.onSize      = null;
   o.inSizeRange = RMethod.virtual(o, 'inSizeRange');
   o.cursor      = MSizeable_cursor;
   o.setCursor   = MSizeable_setCursor;
   o.resize      = MSizeable_resize;
   o.setBounds   = MSizeable_setBounds;
   o.startDrag   = MSizeable_startDrag;
   o.stopDrag    = MSizeable_stopDrag;
   return o;
}
function MSizeable_cursor(){
   var o = this;
   var src = RWindow.source();
   if(!o.inSizeRange(src)){
      return ECursor.Default;
   }
   var hObj = this.panel(EPanel.Border);
   var r = RHtml.rect(hObj);
   var pos = RWindow.offsetPos();
   var p = new TPoint(pos.x-r.left, pos.y-r.top);
   while(src){
      p.x += src.offsetLeft + src.clientLeft;
      p.y += src.offsetTop + src.clientTop;
      if(src == hObj){
         break;
      }
      src = src.offsetParent;
   }
   var border = EMoveSize.Border;
   var range = EMoveSize.Range;
   x = p.x;
   y = p.y;
   var right = r.width();
   var bottom = r.height();
   if(x>=0 && x<=range && y>=0 && y<=range){
      return ECursor.NorthWest;
   }else if(x>=0 && x<=range && y>=bottom-range && y<=bottom){
      return ECursor.SouthWest;
   }else if(x>=right-range && x<=right && y>=bottom-range && y<=bottom){
      return ECursor.SouthEast;
   }else if(x>=right-range && x<=right && y>=0 && y<=range){
      return ECursor.NorthEast;
   }else if(x>=0 && x<border && y>range && y<bottom-range){
      return ECursor.West;
   }else if(x>range && x<right-range && y>=bottom-border && y<=bottom){
      return ECursor.South;
   }else if(x>=right-border && x<=right && y>range && y<bottom-range){
      return ECursor.East;
   }else if(x>range && x<right-range && y>=0 && y<border){
      return ECursor.North;
   }
   return ECursor.Default;
}
function MSizeable_setCursor(cursor){
   if(!cursor){
      cursor = this.cursor();
   }
   var h = this.panel(EPanel.Size);
   if(h){
      h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
   }
}
function MSizeable_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(width != null){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSizeable_setBounds(left, top, right, bottom, force){
   var sizeable = false;
   var st = this.htmlPanel(EPanel.Border).style;
   if(left != null){
      if(right == null || (right != null && right-left > EMoveSize.MinWidth)){
         left = Math.max(left, 0);
      }else{
         left = this.left;
      }
      if(force || this.left != left){
         this.left = left;
         st.pixelLeft = left;
         sizeable = true;
      }
   }
   if(top != null){
      if(bottom == null || (bottom != null && bottom-top > EMoveSize.MinHeight)){
         top = Math.max(top, 0);
      }else{
         top = this.top;
      }
      if(force || this.top != top){
         this.top = top;
         st.pixelTop = top;
         sizeable = true;
      }
   }
   if(right != null){
      var width = Math.max(right-this.left+1, EMoveSize.MinWidth);
      if(force || this.width != width){
         this.width = width;
         st.pixelWidth = this.width;
         sizeable = true;
      }
   }
   if(bottom != null){
      var height = Math.max(bottom-this.top+1, EMoveSize.MinHeight);
      if(force || this.height != height){
         this.height = height;
         st.pixelHeight = this.height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
function MSizeable_startDrag(){
}
function MSizeable_stopDrag(){
}
function MStyle(o){
   o = RClass.inherits(this, o);
   o.style         = MStyle_style;
   o.styleIcon     = MStyle_styleIcon;
   o.styleIconPath = MStyle_styleIconPath;
   return o;
}
function MStyle_style(n, c){
   var r = RClass.find(c ? c : this, true);
   return r.style(n);
}
function MStyle_styleIcon(n, c){
   return 'ctl.' + RClass.name(c ? c : this, true) + '_' + n;
}
function MStyle_styleIconPath(n, c){
   return RResource.iconPath('ctl.' + RClass.name(c ? c : this, true) + '_' + n);
}
var RControl = new function RControl(){
   var o = this;
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
   o.innerbuild         = RControl_innerbuild;
   o.build              = RControl_build;
   o.innerCreate        = RControl_innerCreate;
   o.create             = RControl_create;
   o.linkEvent          = RControl_linkEvent;
   o.attachEvent        = RControl_attachEvent;
   o.find               = RControl_find;
   o.fromNode           = RControl_fromNode;
   o.fromXml            = RControl_fromXml;
   o.toNode             = RControl_toNode;
   o.toXml              = RControl_toXml;
   o.store              = RControl_store;
   o.htmlControl        = RControl_htmlControl;
   o.psDesign           = RControl_psDesign;
   o.psMode             = RControl_psMode;
   o.isInfo             = RControl_isInfo;
   o.isGroup            = RControl_isGroup;
   o.newInstance        = RControl_newInstance;
   o.newInstanceByName  = RControl_newInstance;
   return o;
}
function RControl_innerbuild(ctl, cfg){
   if(ctl){
      var rs = ctl.loadConfig(cfg);
      ctl.construct();
      if(cfg.nodes){
         var child = true;
         if(rs && EStatus.Stop == rs){
            child = false;
         }
         if(child){
            var nodes = cfg.nodes;
            for(var n=0; n<nodes.count; n++){
               var node = nodes.get(n);
               var obj = ctl.createChild(node);
               if(obj){
                  this.innerbuild(obj, node);
                  ctl.push(obj);
               }
            }
         }
      }
   }
}
function RControl_build(ctl, cfg){
   this.innerbuild(ctl, cfg);
   ctl.initialize();
   ctl.build();
}
function RControl_innerCreate(p, x, m){
   p._emode = m;
   if(RClass.isClass(p, MConfig)){
      if(EStatus.Stop == p.loadConfig(x)){
         return;
      }
   }
   var ns = x.nodes;
   if(ns){
      for(var i=0; i<ns.count; i++){
         var n = ns.get(i);
         var c = p.createChild(n);
         if(c){
            c.parent = p;
            this.innerCreate(c, n, m);
            p.push(c);
         }
      }
   }
}
function RControl_create(x, hPanel, m){
   var o = null;
   if(RClass.isClass(x, TNode)){
      if(x){
         if(x.name == 'CellEdit'){
            RControl.newInstance(FCellEdit);
         }else{
             o = RClass.createByName('F' + x.name);
             this.innerCreate(o, x, m);
         }
         o._emode = m;
         this.instances.push(o);
      }
   }else{
      o = RClass.create(x);
      o._emode = m;
   }
   if(o){
      if(x.name != 'CellEdit'){
         o.psInitialize();
         o.psBuild();
         o.setPanel(hPanel);
      }
   }
   return o;
}
function RControl_linkEvent(tc, sc, n, h, m){
   var o = this;
   var p = tc[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = tc;
      e.sender = sc;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      REvent.find(h).push(e.type, e);
      h[e.handle] = REvent.ohEvent;
      RHtml.linkSet(h, '_plink', tc);
      return e;
   }
}
function RControl_attachEvent(c, n, h, m){
   var o = this;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      REvent.find(h).push(e.type, e);
      h[e.handle] = REvent.ohEvent;
      RHtml.linkSet(h, '_plink', c);
      return e;
   }
}
function RControl_find(c){
   var o = this;
   var r = null;
   if(c){
      if(c.constructor == Function){
         c = RMethod.name(c);
      }else if(c.constructor != String){
         RMsg.fatal(o, null, 'Param invlid (class={0})', c);
      }
      var cs = o.controls;
      var r = cs.get(c);
      if(!r){
         r = new TControl(c);
         cs.set(c, r);
      }
   }
   return r;
}
function RControl_fromNode(x, h){
   if(x){
      return this.create(x, h);
   }
}
function RControl_fromXml(xml, hPanel, mode){
   var c = null;
   var x = RXml.makeNode(xml);
   if(x){
      c = this.create(x, hPanel, mode);
   }
   return c;
}
function RControl_toNode(){
}
function RControl_toXml(){
}
function RControl_store(o, type){
   var x = new TNode();
   x.name = RClass.name(o).substr(1);
   if(RClass.isClass(o, FContainer)){
      o.storeConfig(x);
   }else{
      o.saveConfig(x);
   }
   return x;
}
function RControl_htmlControl(e, c){
   if(c){
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o && RClass.isClass(o, c)){
            return o;
         }
         e = e.parentElement;
      }
   }else{
      while(e){
         var o = RHtml.linkGet(e, 'control');
         if(o){
            return o;
         }
         e = e.parentElement;
      }
   }
   return null;
}
function RControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
function RControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}
function RControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}
function RControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
function RControl_newInstance(f){
   var o = this;
   if(o.controls){
     var n = RMethod.name(f);
      var c = o.controls.get(n);
      if(!c){
         var c = new TControl(n);
         o.controls.set(n, c);
      }
   }
   return c.newInstance(n);
}
function RControl_newInstanceByName(n){
   return;
}
var REvent = new function(){
   var o = this;
   o.current   = 0;
   o.events    = new Array();
   o.objects   = new Array();
   o.ohEvent   = REvent_ohEvent;
   o.onProcess = REvent_onProcess;
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   o.find      = REvent_find;
   o.process   = REvent_process;
   o.release   = REvent_release;
   RMemory.register('REvent', o);
   return o;
}
function REvent_ohEvent(e){
   if(!e){
      e = window.event;
   }
   REvent.process(this, e);
}
function REvent_onProcess(){
   var e = this;
   RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
   RConsole.find(FFormConsole).processEvent(e);
}
function REvent_nvl(event, sender, code){
   if(!event){
      event = new TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
function REvent_alloc(s, c){
   var e = null;
   var es = this.events;
   for(var n=0; n<es.length; n++){
      if(!es[n].inUsing){
         e = es[n];
         break;
      }
   }
   if(!e){
      e = es[es.length] = new TEvent();
   }
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
function REvent_free(e){
   e.inUsing = false;
}
function REvent_find(h){
   var u = RRuntime.uid(h);
   var os = this.objects;
   var e = os[u];
   if(!e){
      e = os[u] = new THtmlEvent();
      e.link = h;
   }
   return e;
}
function REvent_process(hs, he){
   if(!(hs && he)){
      return;
   }
   var o = this;
   var un = hs._psource ? RRRuntimeHtml.uid(hs._psource) : RRuntime.uid(hs);
   var eo = o.objects[un];
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var l = es.length;
         for(var n=0; n<l; n++){
            var e = es[n];
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = he.srcElement ? he.srcElement : he.target;
            e.hSource = hs;
            if(e.attach){
               e.attach(he)
            }
            var er = e.sender ? e.sender : e.source;
            if(er && er._events){
               var ec = er._events.get(e.name);
               if(ec){
                  e.result = false;
                  ec.invoke(e.source, er, e);
                  if(e.result){
                     return;
                  }
               }
            }
            if(e.ohProcess){
               RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               try{
                  if(e.sender){
                     e.ohProcess.call(e.source, e.sender, e, he);
                  }else{
                     e.ohProcess.call(e.source, e, he);
                  }
               }catch(ex){
                  RMessage.fatal(o, ex, 'Execute {1} failure. (source={2}, html={3}, process={4})', e.type, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
            }else if(e.onProcess){
               RConsole.find(FEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
function REvent_release(){
   var o = this;
   RMemory.free(o.events);
   RMemory.free(o.objects);
   o.events = null;
   o.objects = null;
}
function TEvent(owner, code, proc){
   var o = this;
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   o.onProcess = proc;
   o.isBefore  = TEvent_isBefore;
   o.isAfter   = TEvent_isAfter;
   o.process   = TEvent_process;
   o.dump      = TEvent_dump;
   return o;
}
function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}
function TEvent_isAfter(){
   return (EEventType.After == this.type);
}
function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={0})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}
function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
function TEventProcess(o, po, pm, pc){
   if(!o){o = this;}
   o.owner    = po;
   o.invoke   = pm;
   o.clazz    = RClass.name(pc);
   o.invokeCd = EEventInvoke.Unknown;
   o.isBefore = TEventProcess_isBefore;
   o.isAfter  = TEventProcess_isAfter;
   o.dispose  = TEventProcess_dispose;
   o.dump     = TEventProcess_dump;
   return o;
}
function TEventProcess_isBefore(){
   return this.invokeCd == EEventInvoke.Before;
}
function TEventProcess_isAfter(){
   return this.invokeCd == EEventInvoke.After;
}
function TEventProcess_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
function TEventProcess_dump(){
   var o = this;
   return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
}
function THtmlEvent(){
   var o = this;
   o.link    = null;
   o.events  = new Object();
   o.load    = THtmlEvent_load;
   o.push    = THtmlEvent_push;
   o.dispose = THtmlEvent_dispose;
   o.dump    = THtmlEvent_dump;
   return o;
}
function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function THtmlEvent_push(pn, pe){
   var o = this;
   var ess = o.events;
   var es = ess[pn];
   if(!es){
      es = new Array();
      es.handle = pe.handle;
      ess[pn] = es;
   }
   var f = pe.name;
   var c = es.length;
   for(var i = 0; i < c; i++){
      var e = es[i];
      if(e.name == f){
         RMessage.fatal(this, 'push', 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', pn, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
      }
   }
   es[es.length] = pe;
}
function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.link[e.handle] = null;
      }
   }
   if(o.link.link){
      o.link.removeAttribute('link');
   }
}
function THtmlEvent_dump(){
   var o = this;
   var ess = o.events;
   var r = new TString();
   for(var en in ess){
      var es = ess[en];
      var ec = es.length;
      r.append('event=' + en + ' (count=' + ec + ')\n');
      for(var n = 0; n < ec; n++){
         var e = es[n];
         r.append('   ' + n + ' source=' + RClass.dump(e.source) + ', event=' + RClass.dump(e) + '\n');
      }
   }
   return r.toString();
}
function FEdit(o){
   o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   o._styleEdit       = RClass.register(o, new AStyle('_styleEdit', 'Edit'));
   o.onBuildEditorValue   = FEdit_onBuildEditorValue;
   return o;
}
function FEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FEdit_onBuildEditorValue(e){
   var o = this;
   var he = o._hValue = RBuilder.appendEdit(o._hValuePanel, o.style('Edit'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FEdit_set(v){
   var o = this;
   o.__base.FEditControl.set.call(o, v);
   o.finded = v;
   if(o.hChangeIcon){
      o.hChangeIcon.style.display = 'none';
   }
}
function FEdit_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FEdit_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FEditConsole).focus(o, FEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FEdit_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}
function FEdit_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FEdit_link(){
   var o = this;
}
function FEditControl(o){
   o = RClass.inherits(this, o, FControl);
   o._labelModeCd          = RClass.register(o, new APtyString('_labelModeCd', null, ELabelMode.All));
   o._labelPositionCd      = RClass.register(o, new APtyString('_labelPositionCd', null, ELabelPosition.Left));
   o._labelSize            = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd         = RClass.register(o, new APtyString('_labelAlignCd', null, EAlign.Left));
   o._editSize             = RClass.register(o, new APtySize2('_editSize'));
   o._styleLabelContainer  = RClass.register(o, new AStyle('_styleLabelContainer', 'LabelContainer'));
   o._styleEditorContainer = RClass.register(o, new AStyle('_styleEditorContainer', 'EditorContainer'));
   o._hLabelPanel        = null;
   o,_hLabelContainer    = null;
   o,_hIconPanel         = null;
   o,_hIcon              = null;
   o,_hTextPanel         = null;
   o,_hText              = null;
   o._hEditorPanel         = null;
   o._hEditorContainer     = null;
   o.onBuildLabelIcon  = FEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FEditControl_onBuildLabelText;
   o.onBuildLabel      = FEditControl_onBuildLabel;
   o.onBuildEditorValue = FEditControl_onBuildEditorValue;
   o.onBuildEditorDrop  = FEditControl_onBuildEditorDrop;
   o.onBuildEditor      = FEditControl_onBuildEditor;
   o.onBuildContainer   = FEditControl_onBuildContainer;
   o.oeBuild           = FEditControl_oeBuild;
   o.construct         = FEditControl_construct;
   o.panel             = FEditControl_panel;
   o.label             = FEditControl_label;
   o.setLabel          = FEditControl_setLabel;
   o.dispose           = FEditControl_dispose;
   return o;
}
function FEditControl_onChangeEnter(e){
   var o = this;
   var t = null;
   if(RString.isEmpty(o.dataValue)){
      t = RContext.get('FEditControl:change.empty');
   }else{
      t = RContext.get('FEditControl:change.restore', o.dataValue);
   }
   o.hChangeIcon.title = t;
}
function FEditControl_onChangeClick(e){
   this.set(this.dataValue);
}
function FEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.drop();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}
function FEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FEditControl_onBuildChange(hc){
   var o = this;
   hc.vAlign = 'top';
   hc.width = 5;
   var hi = o.hChangeIcon = RBuilder.appendIcon(hc, 'ctl.chgflag');
   hi._pname = 'hChangeIcon';
   hi.style.display = 'none';
   hi.style.cursor = 'hand';
   o.attachEvent('onChangeEnter', hi, o.onChangeEnter);
   o.attachEvent('onChangeClick', hi, o.onChangeClick);
}
function FEditControl_onBuildLabelIcon(e){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}
function FEditControl_onBuildLabelText(e){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel);
}
function FEditControl_onBuildLabel(e){
   var o = this;
   var h = o._hLabelContainer = RBuilder.createTable(e.hDocument, o.style('LabelContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = 20;
   o.onBuildLabelIcon(e);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(e);
   var ls = o._labelSize;
   if(ls.width){
      h.style.width = ls.width;
   }
   if(ls.height){
      h.style.height = ls.height;
   }
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FEditControl_onBuildEditorValue(e){
}
function FEditControl_onBuildEditorDrop(e){
}
function FEditControl_onBuildEditor(e){
   var o = this;
   var h = o._hEditorContainer = RBuilder.createTable(e.hDocument, o.style('EditorContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hvp = o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditorValue(e);
   if(RClass.isClass(o, MDropable)){
      var hdp = o._hDropPanel = RBuilder.appendTableCell(hr);
      o.onBuildEditorDrop(e);
   }
}
function FEditControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTable(e.hDocument, o.style('Container'));
}
function FEditControl_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hContainer;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == ELabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == ELabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == ELabelPosition.Top){
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(e);
      hlp.appendChild(o._hLabelContainer);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEditor(e);
      hep.appendChild(o._hEditorContainer);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeDesign(e){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            if(hlf){
               hlf.cellPadding = 1;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}
function FEditControl_oeMode(e){
   var o = this;
   o.__base.FControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeProgress(e){
   var o = this;
   if(o._progress && e.enable){
      return EEventStatus.Stop;
   }
   o._progress = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FEditControl_construct(){
   var o = this;
   o.__base.FControl.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FEditControl_setText(t){
   this.hEdit.value = t;
}
function FEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FControl.panel.call(o, t);
}
function FEditControl_label(p){
   return this._label;
}
function FEditControl_setLabel(p){
   var o = this;
   o._hText.innerHTML = RString.nvl(p);
   o._label = p;
}
function FEditControl_setEditable(v){
   var o = this;
   o.__base.MEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   var hl = o.hLabel;
   if(hl){
      if(o.validRequire){
         o.hLabel.style.color = v ? EColor.Require : EColor.Text;
      }
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}
function FEditControl_setVisible(v){
   var o = this;
   o.__base.FControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FEditControl_refreshStyle(){
   var o = this;
   if(!o._visible){
      return;
   }
   var tc = EColor.TextReadonly;
   var bc = EColor.Readonly;
   var cr = 'normal';
   if(o._editable){
      tc = EColor.TextEdit;
      bc = EColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EColor.TextInvalid;
         bc = EColor.Invalid;
      }
   }
   o._textColor = tc;
   o._backColor = bc;
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   if(hd){
	   if(he){
	      he.style.cursor = cr;
	   }
	   hd.style.cursor = cr;
	}
   if(o.editBorder){
      var bs = EBorderStyle.Readonly;
      if(o._editable){
         bs = EBorderStyle.Edit;
      }
      if(o._hover){
         bs = EBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FEditControl_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o._labelSize = null;
   o._editSize = null;
   o.hForm = null;
   o.hFormRow = null;
   o.hLabelForm = null;
   o.hChangeIcon = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hControlForm = null;
   o.hControlRow = null;
   o.hControl = null;
   o.hEdit = null;
   o.hHintPanel = null;
   o.hHintIcon = null;
}
function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue);
   o.stEdit       = RClass.register(o, new TStyle('Edit'));
   o.table        = null;
   o.column       = null;
   o.row          = null;
   o.hPanel       = null;
   o.hForm        = null;
   o.hFormLine    = null;
   o.hIconPanel   = null;
   o.hIcon        = null;
   o.hEditPanel   = null;
   o.hEdit        = null;
   o.hDropPanel   = null;
   o.hDrop        = null;
   o.buildIcon    = FCell_buildIcon;
   o.buildEdit    = FCell_buildEdit;
   o.buildDrop    = RMethod.empty;
   o.buildForm    = FCell_buildForm;
   o.build        = FCell_build;
   o.doFocus      = FCell_doFocus;
   o.doBlur       = FCell_doBlur;
   o.descriptor   = FCell_descriptor;
   o.text         = FCell_text;
   o.setText      = FCell_setText;
   o.focus        = FCell_focus;
   o.setVisible   = FCell_setVisible;
   o.setEditStyle = RMethod.empty;
   o.refreshStyle = FCell_refreshStyle;
   o.dispose      = FCell_dispose;
   o.dump         = FCell_dump;
   return o;
}
function FCell_buildIcon(){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}
function FCell_buildEdit(){
   var o = this;
   var c = o.column;
   var he = o.hEdit = RBuilder.append(o.hEditPanel, 'INPUT', o.style('Edit'));
   he.style.width = '100%';
   c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
   c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
   c.linkEvent(o, 'onCellClick', he, c.onCellClick);
   c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   if(o.table.isLov){
      o.hEdit.style.cursor = 'hand';
   }
   if(!RString.isEmpty(c.editAlign)){
      he.style.textAlign = c.editAlign;
   }
}
function FCell_buildForm(){
   var o = this;
   var c = o.column;
   if(c.hasIconArea || c.hasDropArea){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.buildIcon();
      }
      o.hEditPanel = hr.insertCell();
      o.buildEdit();
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.buildDrop();
      }
   }else{
      var hep = o.hEditPanel = o.hPanel;
      hep.align = c.editAlign;
      o.buildEdit();
   }
}
function FCell_build(){
   var o = this;
   var c = o.column;
   var h = o.hPanel = RBuilder.create(null, 'TD', o.style('Panel'));
   h.style.borderRight = '1px solid #F0F0F0';
   h.style.borderBottom = '1px dotted #CCCCCC';
   RHtml.link(h, 'control', o);
   c.linkEvent(o, 'onCellMouseEnter', h, c.onCellMouseEnter);
   c.linkEvent(o, 'onCellMouseLeave', h, c.onCellMouseLeave);
   if(c.editColor){
      h.style.color = c.editColor;
   }
   if(c.editBgcolor){
      h.style.backgroundColor = c.editBgcolor;
   }
   if(EEditFormat.Html != c.editFormat){
      o.buildForm();
   }
}
function FCell_doFocus(){
   var o = this;
   o.table.__focusCell = o;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}
function FCell_doBlur(){
   var o = this;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
function FCell_descriptor(){
   return this.column;
}
function FCell_text(){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      return o.hPanel.innerHTML;
   }else if(c._absEdit && o.hEdit){
      return o.hEdit.value;
   }else if(o.hEditPanel){
      return o.hEditPanel.innerText;
   }
   return '';
}
function FCell_setText(t){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      o.hPanel.innerHTML = t;
   }else if(c._absEdit && o.hEdit){
      o.hEdit.value = t;
   }else if(o.hEditPanel){
      o.hEditPanel.innerText = t;
   }
}
function FCell_focus(s){
   var o = this;
   var h = o.hEdit;
   if(h){
      o.column.table.selectRow(o.row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}
function FCell_setVisible(v){
   this.hPanel.style.display = v ? 'block' : 'none';
}
function FCell_refreshStyle(){
   var o = this;
   var t = o.table;
   var r = o.row;
   var s = r.isSelect;
   var he = o.hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hEditPanel = null;
   o.hEdit = null;
   o.hDropPanel = null;
   o.hDrop = null;
}
function FCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
function FColumn(o) {
   o = RClass.inherits(this, o, FControl, MEditDescriptor, MDisplay);
   o.dispList          = RClass.register(o, new TPtyBoolSet('dispList', 'dispConfig', EDisplayConfig.List));
   o.dispFixed         = RClass.register(o, new TPtyBoolSet('dispFixed', 'dispConfig', EDisplayConfig.Fixed));
   o.dispAuto          = RClass.register(o, new TPtyBoolSet('dispAuto', 'dispConfig', EDisplayConfig.Auto));
   o.dispSize          = RClass.register(o, new TPtyBoolSet('dispSize', 'dispConfig', EDisplayConfig.Size));
   o.dispDrag          = RClass.register(o, new TPtyBoolSet('dispDrag', 'dispConfig', EDisplayConfig.Drag));
   o.dataType          = RClass.register(o, new TPtyStr('dataType'));
   o.editColor         = RClass.register(o, new TPtyStr('editColor'));
   o.editBgcolor       = RClass.register(o, new TPtyStr('editBgcolor'));
   o.orderAble         = RClass.register(o, new TPtyBool('orderAble'));
   o.editAlign         = EAlign.Left;
   o.viewIcons         = RClass.register(o, new TPtyStr('viewIcons'));
   o.stHead            = RClass.register(o, new TStyle('Head'));
   o.stHeadLabel       = RClass.register(o, new TStyle('HeadLabel'));
   o.stSearchPanel     = RClass.register(o, new TStyle('SearchPanel'));
   o.stSearchEdit      = RClass.register(o, new TStyle('SearchEdit'));
   o.stIconSortUp      = RClass.register(o, new TStyleIcon('SortUp'));
   o.stIconSortDown    = RClass.register(o, new TStyleIcon('SortDown'));
   o.__cellClass       = FCell;
   o.hasIconArea       = false;
   o.hasDropArea       = false;
   o.table             = null;
   o.index             = null;
   o.iconMap           = null;
   o.sortType          = true;
   o.isDisplay         = true;
   o.searchHint        = "搜索...";
   o.hForm             = null;
   o.hFormLine         = null;
   o.hIconPanel        = null;
   o.hIcon             = null;
   o.hHeadPanel        = null;
   o.hLabel            = null;
   o.hSortPanel        = null;
   o.hSortUp           = null;
   o.hSortDown         = null;
   o.hSearchPanel      = null;
   o.hSearchForm       = null;
   o.hSearchFormLine   = null;
   o.hSearchIconPanel  = null;
   o.hSearchIcon       = null;
   o.hSearchEditPanel  = null;
   o.hSearchEdit       = null;
   o.hSearchDropPanel  = null;
   o.hSearchDrop       = null;
   o.hFixPanel         = null;
   o.onSearchEnter     = RClass.register(o, new HMouseEnter('onSearchEnter'));
   o.onSearchClick     = RClass.register(o, new HClick('onSearchClick'));
   o.onSearchLeave     = RClass.register(o, new HMouseLeave('onSearchLeave'));
   o.onSearchKeyDown   = RClass.register(o, new HKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter  = RClass.register(o, new HMouseEnter('onCellMouseEnter'), FColumn_onCellMouseEnter);
   o.onCellMouseLeave  = RClass.register(o, new HMouseLeave('onCellMouseLeave'), FColumn_onCellMouseLeave);
   o.onCellMouseDown   = RClass.register(o, new HMouseDown('onCellMouseDown'), FColumn_onCellMouseDown);
   o.onCellClick       = RClass.register(o, new HClick('onCellClick'), FColumn_onCellClick);
   o.onCellDoubleClick = RClass.register(o, new HDoubleClick('onCellDoubleClick'), FColumn_onCellDoubleClick);
   o.onCellKeyDown     = RClass.register(o, new HKeyDown('onCellKeyDown'), FColumn_onCellKeyDown);
   o.onDataKeyDown     = FColumn_onDataKeyDown;
   o.onDataChanged     = FColumn_onDataChanged;
   o.onEditBegin       = FColumn_onEditBegin;
   o.onEditEnd         = FColumn_onEditEnd;
   o.onEditChanged     = FColumn_onEditChanged;
   o.onHeadMouseDown   = RClass.register(o, new HMouseDown('onHeadMouseDown'), FColumn_onHeadMouseDown);
   o.onBuildLabel      = FColumn_onBuildLabel;
   o.onBuildSearchIcon = RMethod.empty;
   o.onBuildSearchEdit = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop = RMethod.empty;
   o.onBuildSearchForm = FColumn_onBuildSearchForm;
   o.onBuildSearch     = FColumn_onBuildSearch;
   o.onBuildTotal      = FColumn_onBuildTotal;
   o.onBuildPanel      = FColumn_onBuildPanel;
   o.oeBuild           = FColumn_oeBuild;
   o.oeMode            = FColumn_oeMode;
   o.oeRefresh         = FColumn_oeRefresh;
   o.createCell        = FColumn_createCell;
   o.createMoveable    = FColumn_createMoveable;
   o.searchValue       = FColumn_searchValue;
   o.setStyleStatus    = FColumn_setStyleStatus;
   o.cell              = FColumn_cell;
   o.equalsValue       = FColumn_equalsValue;
   o.setWidth          = FColumn_setWidth;
   o.setVisible        = FColumn_setVisible;
   o.moveCellFocus     = FColumn_moveCellFocus;
   o.getEditRange      = FColumn_getEditRange;
   o.dispose           = FColumn_dispose;
   o.dump              = FColumn_dump;
   return o;
}
function FColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}
function FColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}
function FColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
function FColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
function FColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
function FColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
function FColumn_oeBuild(e) {
   var o = this;
   var t = o.table;
   o._absEdit = o.editInsert || o.editUpdate || o.editDelete;
   if(!o._absEdit){
	   if(!RString.isEmpty(o.lovRefer)){
		   o.hasDropArea = true;
	   }else{
         o.hasDropArea = false;
	   }
   }
   if (!RString.isEmpty(o.viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o.viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.backgroundImage = 'url(' + RResource.iconPath('ctl.FColumn_Head') + ')';
   hp.style.padding = 4;
   var hf = o.hForm = RBuilder.appendTable(hp);
   if (!o.orderAble) {
     hf.style.cursor = 'hand';
     o.attachEvent('onHeadMouseDown', hf);
   }
   var hr = o.hFormLine = o.hForm.insertRow();
   o.onBuildLabel();
   o.onBuildSearch();
   o.onBuildTotal();
   var h = o.hFixPanel = RBuilder.create(null, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(!o.width){
      o.width = 60;
   }
   o.hPanel.style.pixelWidth = o.width;
   o.hFixPanel.style.pixelWidth = o.width;
   return EEventStatus.Stop;
}
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o.dispList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o.dispList);
   }
}
function FColumn_onBuildLabel(){
   var o = this;
   var hr = o.hFormLine;
   if (o.icon) {
      var hip = o.hIconPanel = hr.insertCell();
      o.hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   if (o.label) {
      var hl = o.hLabel = hr.insertCell();
      hl.noWrap = true;
      hl.style.fontSize = '12';
      hl.style.fontWeight = 'bolder';
      hl.style.color = o.editUpdate ? EColor.TextEdit : EColor.TextReadonly;
      if(o.editUpdate && o.validRequire){
         hl.style.color = EColor.Require;
      }
      hl.align = o.labelAlign;
      hl.innerText = o.label;
   }
   var hsp = o.hSortPanel = hr.insertCell();
   var hsu = o.hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o.hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
}
function FColumn_onBuildSearchEdit(){
   var o = this;
   var hc = o.hSearchEditPanel = o.hSearchFormLine.insertCell();
   var he = o.hSearchEdit = RBuilder.append(hc, 'INPUT', o.style('SearchEdit'));
   o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
   o.attachEvent('onSearchClick', he);
   he.style.backgroundColor = "#FFFFFF";
   hc.style.backgroundColor = "#FFFFFF";
   if(!RString.isEmpty(o.editAlign)){
      he.style.textAlign = o.editAlign;
   }
}
function FColumn_onBuildSearchForm(){
   var o = this;
   var hf = o.hSearchForm = RBuilder.appendTable(o.hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o.hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
	   o.hSearchPanel.style.backgroundColor='#EEEFF1';
	   o.hSearchPanel.style.borderLeft='1 solid #808080';
	   o.hSearchPanel.style.borderTop='1 solid #808080';
	   o.hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
	   return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FColumn_onBuildSearch(){
   var o = this;
   var h = o.hSearchPanel = RBuilder.create(null, 'TD', o.style('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.link(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm();
}
function FColumn_onBuildTotal(){
   var o = this;
   var h = o.hTotalPanel = RBuilder.create(null, 'TD');
   RHtml.link(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FColumn_onBuildPanel() {
   this.hPanel = RBuilder.create(null, 'TD');
}
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
function FColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
function FColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
function FColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}
function FColumn_onEditChanged(cell) {
   cell.row.refresh();
}
function FColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FColumnButton)){
	   var l = o.hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c.hSortUp.style.display = 'none';
	            c.hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o.hSortUp.style.display = 'none';
	            o.hSortDown.style.display = 'block';
	         } else {
	            o.hSortUp.style.display = 'block';
	            o.hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         tbl.dsSearch();
	      }
   }
   }
}
function FColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumn_createCell() {
   var o = this;
   var c = RClass.create(o.__cellClass);
   c.name = o.name;
   c.table = o.table;
   c.column = o;
   c.build();
   c.setVisible(o.dispList);
   return c;
}
function FColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.style('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FColumn_searchValue() {
   var o = this;
   if(o.hSearchEdit){
      return o.hSearchEdit.value;
   }
}
function FColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}
function FColumn_cell(r){
   return r.cell(this.index);
}
function FColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function FColumn_setWidth(w){
   var o = this;
   o.hPanel.style.pixelWidth = w;
   o.hFixPanel.style.pixelWidth = w;
}
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o.hPanel.style.display = s;
   o.hSearchPanel.style.display = s;
   o.hTotalPanel.style.display = s;
   o.hFixPanel.style.display = s;
}
function FColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft.dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(RClass.isClass(ft, FColumn) && ft.dispList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
function FColumn_getEditRange(){
   var o = this;
   var hc = o.hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FColumn_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hSearchPanel);
   RMemory.freeHtml(o.hFixPanel);
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hHeadPanel = null;
   o.hLabel = null;
   o.hSortPanel = null;
   o.hSortUp = null;
   o.hSortDown = null;
   o.hSearchPanel = null;
   o.hSearchForm = null;
   o.hSearchFormLine = null;
   o.hSearchIconPanel = null;
   o.hSearchIcon = null;
   o.hSearchEditPanel = null;
   o.hSearchEdit = null;
   o.hSearchDropPanel = null;
   o.hSearchDrop = null;
   o.hFixPanel = null;
}
function FColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   o.onResizeAfter = FTable_onResizeAfter;
   o.onBuildData   = FTable_onBuildData;
   o.oeResize      = FTable_oeResize;
   o.oeRefresh     = FTable_oeRefresh;
   o.pushColumn    = FTable_pushColumn;
   return o;
}
function FTable_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FTable_onBuildData(){
   var o = this;
   var hbp = o.hBorderPanel;
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead =  RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   o.hFixTotal = RBuilder.append(hffb, 'TR');
   o.hFixTotal.style.display = 'none';
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   o.hTotal = hhf.insertRow();
   o.hTotal.style.display = 'none';
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   o.panelNavigator = true;
}
function FTable_oeResize(e){
   var o = this;
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hfp = o.hFixPanel;
   var hhp = o.hHeadPanel;
   var hcp = o.hColumnPanel;
   var hdp = o.hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      o.rows.get(n).refreshSize();
   }
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function FTable_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hcf = o.hTitleForm;
      var hfp = o.hFixPanel;
      var hhp = o.hHeadPanel;
      var hcp = o.hColumnPanel;
      var hdp = o.hDataPanel;
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.pixelTop = hcfh;
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = hfpw;
      hhp.style.pixelWidth = ow - hfpw;
      hhp.style.pixelHeight = hfph;
      o.hHead.style.pixelHeight = o.hFixHead.offsetHeight;
      o.hSearch.style.pixelHeight = o.hFixSearch.offsetHeight;
      hcp.style.pixelTop = hcfh + hfph;
      hcp.style.pixelHeight = oh - hcfh - hfph;
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      hdp.style.pixelWidth = ow;
      hdp.style.pixelHeight = oh - hcfh;
      var ca = null;
      var aw = ow;
      var cs = o.columns;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={0},name2={1})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c.hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}
function FTable_pushColumn(c){
   var o = this;
   if(c.dispFixed){
      o.hFixHead.appendChild(c.hPanel);
      o.hFixSearch.appendChild(c.hSearchPanel);
      o.hFixTotal.appendChild(c.hTotalPanel);
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      o.hHead.appendChild(c.hPanel);
      o.hSearch.appendChild(c.hSearchPanel);
      o.hTotal.appendChild(c.hTotalPanel);
      o.hRowLine.appendChild(c.hFixPanel);
   }
   o.push(c);
}
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   o.icon         = RClass.register(o, new TPtyStr('icon'));
   o.dataName     = RClass.register(o, new TPtyStr('dataName'));
   o.display      = RClass.register(o, new TPtyBool('display', EBool.False));
   o.config       = RClass.register(o, new TPtyCfg('config'));
   o.oeBuild      = FTreeColumn_oeBuild;
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   h.innerText = RString.nvl(o.label);
   h.noWrap = true;
   if(!o.display){
      h.style.display = 'block';
   }
   if(o.width){
      h.width = o.width;
   }
   return EEventStatus.Stop;
}
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FTreeLevel(o){
   o = RClass.inherits(this, o, FControl);
   o.id           = RClass.register(o, new TPtyStr('id'));
   o.color        = RClass.register(o, new TPtyStr('color'));
   o.bgColor      = RClass.register(o, new TPtyStr('bgColor'));
   return o;
}
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   o.type             = RClass.register(o, new TPtyStr('type'));
   o.uuid             = RClass.register(o, new TPtyStr('uuid'));
   o.isValid          = RClass.register(o, new TPtyBool('isValid'), true);
   o.icon             = RClass.register(o, new TPtyStr('icon'));
   o.tag              = RClass.register(o, new TPtyStr('tag'));
   o.note             = RClass.register(o, new TPtyStr('note'));
   o.child            = RClass.register(o, new TPtyBool('child'));
   o.checked          = RClass.register(o, new TPtyBool('checked'), false);
   o.extended         = RClass.register(o, new TPtyBool('extended'), false);
   o.stHover          = RClass.register(o, new TStyle('Hover'));
   o.stSelect         = RClass.register(o, new TStyle('Select'));
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeHover      = RClass.register(o, new TStyle('NodeHover'));
   o.stNodeSelect     = RClass.register(o, new TStyle('NodeSelect'));
   o.stImage          = RClass.register(o, new TStyle('Image'));
   o.stIcon           = RClass.register(o, new TStyle('Icon'));
   o.stIconDisable    = RClass.register(o, new TStyle('IconDisable'));
   o.stCell           = RClass.register(o, new TStyle('Cell'));
   o.__linked         = false;
   o.__display        = true;
   o.__delete         = false;
   o._hover           = false;
   o._extended        = false;
   o._selected        = false;
   o.tree             = null;
   o.parentNode       = null;
   o.loaded           = false;
   o.level            = 0;
   o.attributes       = null;
   o.nodes            = null;
   o.hNodePanel       = null;
   o.hImage           = null;
   o.hIcon            = null;
   o.hLabel           = null;
   o.onNodeEnter      = RClass.register(o, new HMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave      = RClass.register(o, new HMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick      = RClass.register(o, new HClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel     = RBuilder.onBuildTrPanel;
   o.oeBuild          = FTreeNode_oeBuild;
   o.construct        = FTreeNode_construct;
   o.hasChild         = FTreeNode_hasChild;
   o.topNode          = FTreeNode_topNode;
   o.topNodeByType    = FTreeNode_topNodeByType;
   o.get              = FTreeNode_get;
   o.set              = FTreeNode_set;
   o.check            = FTreeNode_check;
   o.setCheck         = FTreeNode_setCheck;
   o.createChild      = FTreeNode_createChild;
   o.loadConfig       = FTreeNode_loadConfig;
   o.saveConfig       = FTreeNode_saveConfig;
   o.loadNode         = FTreeNode_loadNode;
   o.show             = FTreeNode_show;
   o.hide             = FTreeNode_hide;
   o.extend           = FTreeNode_extend;
   o.select           = FTreeNode_select;
   o.setLevel         = FTreeNode_setLevel;
   o.push             = FTreeNode_push;
   o.refreshStyle     = FTreeNode_refreshStyle;
   o.reload           = FTreeNode_reload;
   o.reloadParent     = FTreeNode_reloadParent;
   o.loadQuery        = FTreeNode_loadQuery;
   o.remove           = FTreeNode_remove;
   o.removeChildren   = FTreeNode_removeChildren;
   o.click            = FTreeNode_click;
   o.isFolder         = FTreeNode_isFolder;
   o.dispose          = FTreeNode_dispose;
   o.innerDump        = FTreeNode_innerDump;
   o.extendAll        = FTreeNode_extendAll;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}
function FTreeNode_onNodeEnter(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      if(!o.isFolder()){
         o._hover = true;
         o.refreshStyle();
      }
      t.lsnsEnter.process(t, o);
   }
}
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o.tree;
   if(!t.focusNode || (t.focusNode && (t.focusNode != o))){
      o._hover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o.tree;
   var esn = e.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   var isParent = false;
   var find = t.focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o.child))){
      t.selectNode(o, true);
   }
   if(!o.loaded && o.child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      if(o.child){
        if(o.isFolder()){
           o.extend(!o._extended);
        }else{
            if(isImg){
               o.extend(!o._extended);
            }else{
               o.extend(true);
            }
        }
      }
      if((isImg && isParent) || (isImg && !o.child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o.tree;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o.hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o.hNodePanel = RBuilder.appendCell(hp, o.style('NodePanel'));
      hnp.noWrap = true;
      var ni = o.child ? t.iconPlus : t.iconNode;
      var hi = o.hImage = RBuilder.appendIcon(hnp, ni, o.style('Image'), 16, 16);
      hi._linkType = 'image';
      var ni = RString.nvl(o.icon, o.type ? o.type.icon : null);
      if(ni){
         var hi = o.hIcon = RBuilder.appendIcon(hnp, ni, o.isValid ? o.style('Icon') : o.style('IconDisable'), 16, 16);
      }else{
        var hi = o.hIcon = RBuilder.appendIcon(hnp, t.iconEmpty, o.isValid ? o.style('Icon') : o.style('IconDisable'), 1, 1);
      }
      hi._linkType = 'icon';
      if(t.dispChecked){
         var hc = o.hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o.checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      var text = '&nbsp;' + o.label;
      if(o.tag){
         text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
      }
      if(o.note){
         text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
      }
      var hl = o.hLabel = RBuilder.appendText(hnp, text);
      hl.style.font = 'icon';
      var cs = t.columns;
      if(cs){
         for(var n=1; n<cs.count; n++){
            var c = cs.value(n);
            var hc = RBuilder.appendCell(hp, o.style('Cell'));
            hc.align='center';
            hc.noWrap = true;
            hc.innerText = RString.nvl(o.get(c.dataName));
            hc.style.display = c.display ? 'block' : 'none';
         }
      }
   }
   return r;
}
function FTreeNode_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.attributes = new TAttributes();
}
function FTreeNode_hasChild(){
   var o = this;
   if(o.child){
      return o.nodes && o.nodes.count > 0;
   }
}
function FTreeNode_topNode(){
   var f = this;
   while(f.parentNode){
      f = f.parentNode;
   }
   return f;
}
function FTreeNode_topNodeByType(t){
   var f = this;
   while(f){
      if(f.type.type == t){
         return f;
      }
      f = f.parentNode;
   }
}
function FTreeNode_get(n){
   return this.attributes.get(n);
}
function FTreeNode_set(n, v){
   this.attributes.set(n, v);
}
function FTreeNode_check(){
   return this.hCheck.checked;
}
function FTreeNode_setCheck(v){
   this.hCheck.checked = v;
   this.checked = v;
}
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r.tree = this.tree;
   }
   return r;
}
function FTreeNode_loadConfig(x){
   var o = this;
   o.base.FContainer.loadConfig.call(o, x);
   o.type = RObject.nvl(this.tree.types.get(x.get('type')), this.tree.type);
   o.attributes.append(x.attrs);
   var attrs = x.get('attributes')
   if(attrs){
      o.attributes.unpack(attrs);
   }
}
function FTreeNode_saveConfig(x){
   var o = this;
   o.base.FContainer.saveConfig.call(o, x);
   var t = o.type;
   x.set('type', t.name);
   x.set('type_type', t.type);
   x.set('attributes', o.attributes.pack());
}
function FTreeNode_loadNode(x){
   var o = this;
   var t = o.tree;
   o.type = null;
   o.uuid = null;
   o.isValid = true;
   o.icon = null;
   o.tag = null;
   o.note = null;
   o.child = false;
   o.checked = false;
   o.extended = true;
   o.loadConfig(x);
   o.__linked = false;
   o.__display = true;
   o.__delete = false;
   o._hover = false;
   o._extended = false;
   o._selected = false;
   o.loaded = false;
   o.level = 0;
   var ni = o.child ? t.iconPlus : t.iconNode;
   o.hImage.src = RResource.iconPath(ni);
   var ni = RString.nvl(o.icon, o.type ? o.type.icon : null);
   o.hIcon.className = o.isValid ? o.style('Icon') : o.style('IconDisable');
   if(ni){
     o.hIcon.style.width = 16;
     o.hIcon.style.height = 16;
      o.hIcon.src = RResource.iconPath(ni);
   }else{
      o.hIcon.style.width = 1;
      o.hIcon.style.height = 1
   }
   if(!RString.isEmpty(o.attributes.get('checked'))){
     o.checked = RBoolean.isTrue(o.attributes.get('checked'));
     if(o.hCheck){
         o.hCheck.checked = o.checked;
     }
   }
   var text = '&nbsp;' + o.label;
   if(o.tag){
      text += '&nbsp;<FONT color=blue>(' + o.tag + ')</FONT>';
   }
   if(o.note){
      text += '&nbsp;<FONT color=green>[ ' + o.note + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
}
function FTreeNode_show(){
   var o = this;
   var t = o.tree;
   o.hPanel.style.display = 'block';
   var ns = o.nodes;
   if(ns && ns.count){
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         if(!n.__linked){
            t.appendNode(n, o);
         }
         if(n.__display){
            n.hPanel.style.display = 'block';
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FTreeNode_hide(){
   var o = this;
   var t = o.tree;
   if(o.hPanel){
      o.hPanel.style.display = 'none';
   }
   if(o.components){
      var count = o.components.count;
      for(var n=0; n<count; n++){
         var child = o.components.value(n);
         if(child){
            child.hide();
         }
      }
   }
}
function FTreeNode_extend(flag){
   var o = this;
   var t = o.tree;
   if(!o.loaded && o.child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o.hImage && !o.hasChild()){
         o.hImage.src = RResource.iconPath(t.iconNode);
         return false;
      }
      o._extended = flag;
      if(o.child && o.hImage){
         o.hImage.src = RResource.iconPath(flag ? t.iconMinus : t.iconPlus);
      }
      if(flag){
         o.show();
      }else if(o.nodes){
         for(var n=o.nodes.count-1; n>=0; n--){
            o.nodes.get(n).hide();
         }
      }
   }
   t.resetTreeHeight()
}
function FTreeNode_select(v){
   var o = this;
   o._selected = v;
   if(v){
      o._hover = false;
   }
   o.refreshStyle();
}
function FTreeNode_setLevel(l){
   var o = this;
   var t = o.tree;
   o.level = l;
   o.hImage.style.marginLeft = t.indent * l;
}
function FTreeNode_push(c){
   var o = this;
   var t = o.tree;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o.child = true;
      o.loaded = true;
      var ns = o.nodes;
      if(!ns){
         ns = o.nodes = new TList();
      }
      c.tree = t;
      c.parentNode = o;
      ns.push(c);
      t.allNodes.pushUnique(c);
   }
}
function FTreeNode_refreshStyle(){
   var o = this;
   var cs = o.hPanel.cells;
   if(o._selected){
      for(var n=0; n<cs.length; n++){
         cs[n].className = o.style('NodeSelect');
      }
   }else{
      if(o._hover){
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodeHover');
         }
      }else{
         for(var n=0; n<cs.length; n++){
            cs[n].className = o.style('NodePanel');
         }
      }
   }
}
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o.tree.reload();
   }else{
      o.tree.reloadNode(o);
   }
}
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o.tree.reloadNode(o.parentNode);
   }else{
      o.tree.reload();
   }
}
function FTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o.label);
   var sn = RString.nvl(x.get('note'), o.note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o.hLabel.innerHTML = text;
   if(x.contains('visible')){
      o.__display = RBool.isTrue(x.get('visible'));
      o.setVisible(o.__display);
   }
}
function FTreeNode_remove(){
   var o = this;
   if(o.__linked){
      if(o.nodes){
         o.removeChildren();
      }
      o.tree.freeNode(o);
   }
}
function FTreeNode_removeChildren(){
   var ns = this.nodes;
   if(ns){
      for(var i=ns.count-1; i>=0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.release();
   }
}
function FTreeNode_click(){
   var o = this;
   var t = o.tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FTreeNode_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hImage = null;
   o.hIcon = null;
   o.hCheck = null;
   o.hLabel = null;
}
function FTreeNode_innerDump(s){
   var o = this;
   s.append(RClass.typeOf(o));
   s.append('[level=',  o.level);
   if(o.type){
      s.append(' type=',  o.type.name);
   }
   s.append(', icon=',  o.icon);
   s.append(', caption=', o.label);
   s.append(', child=', o.child);
   s.append(']');
}
function FTreeNode_extendAll(){
   var o = this;
   o.extend(true);
   var cs = o.components;
   if(cs){
      var c = cs.count;
      for(var n=0; n<c; n++){
         cs.values[n].extendAll();
      }
   }
}
function FTreeNode_findByName(n){
   var o = this;
   if(o.name == n){
      return o;
   }
   var cs = o.components;
   if(cs){
      var cc = cs.count;
      for(var i=0; i<cc; i++){
         var c = cs.value(i);
         if(c){
            if(c.name == n){
               return c;
            }
            if(c.components){
               var f = c.findByName(n);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_findByUuid(u){
   var o = this;
   if(o.uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c.uuid == u){
               return c;
            }
            if(c.components){
               var f = c.findByUuid(u);
               if(f){
                  return f;
               }
            }
         }
      }
   }
   return null;
}
function FTreeNode_pushChanged(trd){
   var o = this;
    var d = new TNode();
    d.attrs = o.attributes;
    if(d.attrs){
         d.attrs.set('checked', RBoolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(RClass.isClass(c, FTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FTreeNode_checkChanged(){
   var o = this;
   if(o.checked != o.check()){
      return true;
   }
   return false;
}
function FTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o.label){
       path = o.label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!RString.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
function FTreeNode_isFolder(){
   if(this.type){
       return (this.type.typeName == 'collections') ? true : false;
   }
}
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   o.type       = RClass.register(o, new TPtyStr('type'));
   o.typeName   = RClass.register(o, new TPtyStr('typeName'));
   o.icon       = RClass.register(o, new TPtyStr('icon'));
   o.service    = RClass.register(o, new TPtyStr('service'));
   o.action     = RClass.register(o, new TPtyStr('action'));
   o.config     = RClass.register(o, new TPtyCfg('config'));
   o.get        = FTreeNodeType_get;
   o.set        = FTreeNodeType_set;
   o.innerDump  = FTreeNodeType_innerDump;
   return o;
}
function FTreeNodeType_get(n){
   var o = this;
   return o.config ? o.config.get(n) : null;
}
function FTreeNodeType_set(n, v){
   var o = this;
   if(o.config){
      o.config.set(n, v)
   }
}
function FTreeNodeType_innerDump(dump){
   var o = this;
   dump.append(RClass.typeOf(o));
   dump.append('[icon=',  o.icon);
   dump.append(', service=', o.service);
   dump.append(', action=', o.action);
   dump.append(']');
}
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   o.dispChecked      = RClass.register(o, new TPtyBool('dispChecked'), false);
   o.service          = RClass.register(o, new TPtyStr('service'));
   o.queryService     = RClass.register(o, new TPtyStr('queryService'));
   o.indent           = RClass.register(o, new TPtyInt('indent', 16));
   o.stNodePanel      = RClass.register(o, new TStyle('NodePanel'));
   o.stNodeForm       = RClass.register(o, new TStyle('NodeForm'));
   o.iconNode         = 'ctl.tv-node';
   o.iconPlus         = 'ctl.tv-plus';
   o.iconMinus        = 'ctl.tv-minus';
   o.__loading        = false;
   o.__loadingNode    = null;
   o.focusNode        = null;
   o.type             = null;
   o.allNodes         = null;
   o.dispNodeCount    = null;
   o.nodes            = null;
   o.freeNodes        = null;
   o.attributes       = null;
   o.types            = null;
   o.columns          = null;
   o.levels           = null;
   o.hNodePanel       = null;
   o.hNodeForm        = null;
   o.hHeadLine        = null;
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsLoad         = new TListeners();
   o.lsnsLoaded       = new TListeners();
   o.lsnsClick        = new TListeners();
   o.onNodeCheckClick = RClass.register(o, new HClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.onLoaded         = FTreeView_onLoaded;
   o.onQueryLoaded    = FTreeView_onQueryLoaded;
   o.onBuildPanel     = RBuilder.onBuildTablePanel;
   o.oeBuild          = FTreeView_oeBuild;
   o.construct        = FTreeView_construct;
   o.connect          = FTreeView_connect;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.selectNode       = FTreeView_selectNode;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.loadNode         = FTreeView_loadNode;
   o.freeNode         = FTreeView_freeNode;
   o.push             = FTreeView_push;
   o.reload           = FTreeView_reload;
   o.reloadNode       = FTreeView_reloadNode;
   o.doQuery          = FTreeView_doQuery;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   o.getTreeHeight    = FTreeView_getTreeHeight;
   o.resetTreeHeight  = FTreeView_resetTreeHeight;
   o.filterNode       = FTreeView_filterNode;
   o.removeNode       = FTreeView_removeNode;
   o.clearNodes       = FTreeView_clearNodes;
   o.haveNodes        = FTreeView_haveNodes;
   o.release          = FTreeView_release;
   o.getChangedChecks = FTreeView_getChangedChecks;
   o.fetchExtendsAll  = FTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FTreeView_tempAppendNodes;
   o.removeNodes      = FTreeView_removeNodes;
   o.tempAppendChild  = FTreeView_tempAppendChild;
   return o;
}
function FTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FTreeNode)){
               nd.setCheck(f);
            }
         }
      }
      var p = s.parentNode;
      while(p){
	      if(f){
	         p.setCheck(f);
	         p = p.parentNode;
	      }else{
	         var pcs = p.controls;
	         var pcc = pcs.count;
	         for(var n=0; n<pcc; n++){
	        	var pnd = pcs.value(n);
	            if(pnd && RClass.isClass(pnd, FTreeNode)){
	               if(pnd.check()){
	            	   return;
	               }
	            }
	         }
	         p.setCheck(false);
	         p = p.parentNode;
	      }
	   }
   }
}
function FTreeView_onLoaded(e){
   var o = this;
   var xd = e.document;
   if(xd){
      var ne = e.node;
      o.__loadingNode.hide();
      o.__loading = false;
      var xr = xd.root();
      var xns = xr.nodes;
      if(xns){
         var xnc = xns.count;
         for(var i=0; i<xnc; i++){
            var xn = xns.get(i);
            if(xn.isName('TreeNode')){
               var n = o.createNode();
               n.loadNode(xn);
               if(ne){
                  ne.push(n);
               }else{
                  o.push(n);
               }
               o.appendNode(n, ne);
            }
         }
      }
      o.lsnsLoaded.process(o, e.node);
      if(o.extendsAll){
          o.extendAll();
      }
   }
}
function FTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn.nodes){
         var nc = tvn.nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn.nodes.get(n);
            if(nd.isName('TreeNode')){
               var nm = nd.get('name');
               var fd = o.findByName(nm);
               if(fd){
                  fd.loadQuery(nd);
               }
            }
         }
      }
   }
}
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hc = o.hPanel.insertRow().insertCell();
      var hnp = o.hNodePanel = RBuilder.appendDiv(hc, o.style('NodePanel'));
      var hnf = o.hNodeForm = RBuilder.appendTable(hnp, o.style('NodeForm'));
      o.hHeadLine = hnf.insertRow();
      o.hNodeRows = hnf.children[0];
      var ln = o.__loadingNode = RClass.create(FTreeNode);
      ln.tree = o;
      ln.label = RContext.get('FTreeView:loading');
      ln.icon = 'ctl.tv-load';
      ln.psBuild();
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o.nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i=0; i<nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
   }
   return r;
}
function FTreeView_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.nodes = new TList();
   o.allNodes = new TList();
   o.freeNodes = new TList();
   o.attributes = new TAttributes();
   o.types = new TMap();
   o.columns = new TMap();
   o.levels = new TMap();
   o.type = RClass.create(FTreeNodeType);
}
function FTreeView_connect(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this.service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o.attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvConsole).build(xr);
   if(!attrs.isEmpty()){
      if(RClass.isClass(attrs, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(attrs, TAttributes)){
         xr.create('Tree').attrs = attrs;
         xr.create('Attributes').attrs = attrs;
      }else{
         xr.create('Tree').value = attrs;
         xr.create('Attributes').value = attrs;
      }
   }
   var ln = o.__loadingNode;
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, 0);
   ln.setLevel(0);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = xd;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_findByName(n){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.name == n){
            return fn;
         }
      }
   }
}
function FTreeView_findByUuid(u){
   var o = this;
   var ns = o.allNodes;
   var nc = ns.count;
   if(nc){
      for(var i=0; i<nc; i++){
         var fn = ns.get(i);
         if(fn.uuid == u){
            return fn;
         }
      }
   }
}
function FTreeView_selectNode(n, s){
   var o = this;
   var fn = o.focusNode;
   if(s){
      if(n){
         if(fn){
            if(fn == n){
               return;
            }
            if(n.isFolder()){
               fn.select(true);
            }else{
               fn.select(false);
            }
         }
         if(!n.isFolder()){
            n.select(true);
            o.focusNode = n;
         }
      }
   }else{
      if(n){
         n.select(false);
      }
      if(fn){
         fn.select(false);
      }
   }
}
function FTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(fn.extended);
            if(fn.extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
function FTreeView_extendAll(n){
   var o = this;
   var ns = n ? n.nodes : o.nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i=0; i<nc; i++){
            var fn = ns.get(i);
            fn.extend(true);
            o.extendAll(fn);
         }
      }
   }
}
function FTreeView_createChild(x){
   var o = this;
   var r = null;
   if(x.isName('Column') || x.isName('TreeColumn')){
      r = RClass.create(FTreeColumn);
   }else if(x.isName('Level') || x.isName('TreeLevel')){
      r = RClass.create(FTreeLevel);
   }else if(x.isName('Type') || x.isName('TreeNodeType')){
      r = RClass.create(FTreeNodeType);
   }else if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
   }else{
      RMessage.fatal(o, null, 'Unknown child type (config={0})', x.xml());
   }
   r.tree = o;
   return r;
}
function FTreeView_createNode(){
   var o = this;
   var n = o.freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n.tree = o;
      n.psBuild();
   }
   n.hPanel.style.display = 'block';
   o.allNodes.pushUnique(n);
   return n;
}
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n.__linked){
      if(p){
         var nr = p.hPanel.rowIndex;
         var ns = p.nodes;
         for(var i=ns.count-1; i>=0; i--){
            var pn = ns.get(i)
            if(pn.__linked){
               nr = pn.hPanel.rowIndex;
               break;
            }
         }
         if(n.hPanel.parentElement){
            if(n.hPanel.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr);
         }else{
            o.hNodeRows.appendChild(n.hPanel);
            RHtml.tableMoveRow(o.hNodeForm, n.hPanel.rowIndex, nr+1);
         }
         n.setLevel(p.level + 1);
      }else{
         o.hNodeRows.appendChild(n.hPanel);
         n.setLevel(0);
      }
      n.__linked = true;
   }
}
function FTreeView_loadNode(node, refresh){
   var o = this;
   o.__loading = true;
   var type = null;
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.service){
         break;
      }
      fn = fn.parentNode;
   }
   var svc = RService.parse(RString.nvl(type.service, o.service));
   if(!svc){
      return alert('Unknown service');
   }
   var fn = node;
   while(fn){
      type = fn.type;
      if(type && type.action){
         break;
      }
      fn = fn.parentNode;
   }
   var act = RString.nvl(type.action, svc.action);
   if(!act){
      return alert('Unknown action');
   }
   o.lsnsLoad.process(o, node);
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type.name);
   root.set('action', act);
   root.create('Tree', o.attributes);
   root.create('Attributes', o.attributes);
   var fn = node;
   var xnode = root;
   while(fn){
      var xnode = xnode.create('Node');
      fn.saveConfig(xnode);
      fn = fn.parentNode;
   }
   node._extended = true;
   if(node.child && node.hImage){
      node.hImage.src = RResource.iconPath(o.iconMinus);
   }
   var ln = o.__loadingNode;
   var nr = node.hPanel.rowIndex;
   if(ln.hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o.hNodeForm, ln.hPanel.rowIndex, nr);
   ln.setLevel(node.level + 1);
   ln.show();
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.node = node;
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_freeNode(n){
   var o = this;
   if(n.__linked){
      n.__linked = false;
      n.hPanel.style.display = 'none';
      o.allNodes.extract(n);
      o.freeNodes.push(n);
   }
}
function FTreeView_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   c.tree = o;
   if(RClass.isClass(c, FTreeColumn)){
      o.columns.set(c.name, c);
   }else if(RClass.isClass(c, FTreeLevel)){
      o.levels.set(c.id.toString(), c);
   }else if(RClass.isClass(c, FTreeNodeType)){
      o.types.set(c.typeName, c);
   }else if(RClass.isClass(c, FTreeNode)){
      o.nodes.push(c);
      o.allNodes.pushUnique(c);
   }
}
function FTreeView_reload(){
   var o = this;
   o.clear();
   o.connect();
}
function FTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o.focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o.queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o.attributes;
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FTreeView_clear(){
   var o = this;
   var ns = o.nodes;
   for(var i=ns.count-1; i>=0; i--){
      ns.get(i).remove();
   }
   ns.release();
   o.allNodes.release();
}
function FTreeView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hNodePanel = null;
   o.hNodeForm = null;
   o.hHeadLine = null;
}
function FTreeView_getTreeHeight(){
   var o = this;
   var ns = o.allNodes;
   var c = 0;
   for(var n = 0; n<ns.count; n++){
      var cn = ns.get(n);
      if(cn.hPanel.style.display == 'block'||cn.hPanel.style.display == ''){
         c++;
      }
   }
   return c * 29;
}
function FTreeView_resetTreeHeight(){
   var o = this;
   if(o.parentObj){
	   var h = o.getTreeHeight();
	   o.parentObj.style.height = h;
   }
}
function FTreeView_filterNode(sCaption, sAttr){
   var oNode = null;
   var nCount = this.allNodes.length;
   var sNodeCaption = null;
   var sNodeAttr = null;
   if(!sCaption){
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            oNode.show(true);
         }
      }
   }else{
      sCaption = sCaption.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(sAttr){
         sAttr = sAttr.toLowerCase();
         arAttr = sAttr.split("|");
         nAttrCount = arAttr.length;
      }
      for(var n=0; n<nCount; n++){
         oNode = this.allNodes[n];
         if(!oNode.isDelete){
            sNodeCaption = oNode.label.toLowerCase();
            if(arAttr){
               sNodeAttr = oNode.linkAttr.toLowerCase();
               for(var s=0; s<nAttrCount; s++){
                  if(sNodeAttr.indexOf(arAttr[s]) != -1){
                     oNode.show((sNodeCaption.indexOf(sCaption) != -1));
                     break;
                  }
               }
            }else{
               oNode.show((sNodeCaption.indexOf(sCaption) != -1));
            }
         }
      }
   }
   return true;
}
function FTreeView_removeNode(oNode){
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this.allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this.allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      this.allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent.nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent.nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent.nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent.nodes.length == 0){
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}
function FTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this.allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this.allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this.allNodes = nodes;
   return true;
}
function FTreeView_release(){
   var nodes = this.allNodes;
   for(var n=0; n<nodes.length; n++){
      var node = nodes[n];
      node.release();
   }
   this.allNodes = null;
   this.allNodesUuid = null;
   this.allNodesProperty = null;
   this.allNodesPropertyExtend = null;
   this.nodes = null;
   return true;
}
function FTreeView_fetchExtendsAll(s){
   var o = this;
   if(s && RClass.isClass(s, FTreeNode)){
      fmMain.target = 'frmMain';
      fmMain.form_search.value = '';
      fmMain.form_order.value = '';
      fmMain.form_values.value = '';
      var type = node.type.typeName;
      if('table' == type || 'form' == type){
         fmMain.form_name.value = node.get('form');
         fmMain.action = top.RContext.context('/ent/apl/logic/form/InnerForm.wa?do=update');
         fmMain.submit();
      }else if('frameTree' == type){
         fmMain.action = top.RContext.context(node.get('redirect'));
         fmMain.submit();
      }
   }else{
   }
}
function FTreeView_getChangedChecks(){
   var o = this;
   var treeView = new TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
function FTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config.nodes){
      var count = config.nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n=0; n<count; n++){
            var nc = config.nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
               tn.parent = parent;
               tn.tree = this;
               tn.loadConfig(nc);
               if(nc.nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc.nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this.allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
function FTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FTreeView_tempAppendChild(child){
   var o = this;
   var hc = o.hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child.hPanel);
   }
}
