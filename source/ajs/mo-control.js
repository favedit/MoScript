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
var EDirection = new function EDirection(){
   var o = this;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
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
var ERowStatus = new function ERowStatusFace(){
   var o = this;
   o.Normal = 'N';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete  = 'D';
   return o;
}
function FComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   o._parent       = null;
   o._components   = null;
   o._name         = RClass.register(o, new APtyString('_name'));
   o._label        = RClass.register(o, new APtyString('_label'));
   o.oeInitialize  = FComponent_oeInitialize;
   o.oeRelease     = FComponent_oeRelease;
   o.name          = FComponent_name;
   o.setName       = FComponent_setName;
   o.label         = FComponent_label;
   o.setLabel      = FComponent_setLabel;
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
function FComponent_name(){
   return this._name;
}
function FComponent_setName(p){
   this._name = p;
}
function FComponent_label(){
   return this._label;
}
function FComponent_setLabel(p){
   this._label = p;
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
      p._parent = o;
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
   o._name = null;
   o._label = null;
   var cs = o._components
   if(cs){
      cs.dispose();
      o._components = null;
   }
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
   return o.__base.FControl.panel.call(o, t);
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
   o._disable       = RClass.register(o, new APtyBoolean('_disable', null, false));
   o._nowrap        = RClass.register(o, new APtyBoolean('_nowrap', null, false));
   o._hint          = RClass.register(o, new APtyString('_hint'));
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   o._controls      = null;
   o._hParent       = null;
   o._hPanel        = null;
   o.onEnter        = RClass.register(o, new AEventMouseEnter('onEnter'), FControl_onEnter);
   o.onLeave        = RClass.register(o, new AEventMouseLeave('onLeave'), FControl_onLeave);
   o.onMouseOver    = RClass.register(o, new AEventMouseOver('onMouseOver'));
   o.onMouseOut     = RClass.register(o, new AEventMouseOut('onMouseOut'));
   o.onMouseDown    = RClass.register(o, new AEventMouseDown('onMouseDown'));
   o.onMouseUp      = RClass.register(o, new AEventMouseUp('onMouseUp'));
   o.onClick        = RClass.register(o, new AEventClick('onClick'));
   o.onDoubleClick  = RClass.register(o, new AEventDoubleClick('onDoubleClick'));
   o.onResize       = RClass.register(o, new AEventResize('onResize'));
   o.onBuildPanel   = FControl_onBuildPanel;
   o.oeBuild        = FControl_oeBuild;
   o.oeMode         = FControl_oeMode;
   o.oeEnable       = FControl_oeEnable;
   o.oeVisible      = FControl_oeVisible;
   o.oeResize       = FControl_oeResize;
   o.oeRefresh      = FControl_oeRefresh;
   o.construct      = FControl_construct;
   o.topControl     = FControl_topControl;
   o.hasControl     = FControl_hasControl;
   o.controls       = FControl_controls;
   o.panel          = FControl_panel;
   o.isVisible      = FControl_isVisible;
   o.setVisible     = FControl_setVisible;
   o.show           = FControl_show;
   o.hide           = FControl_hide;
   o.isEnable       = FControl_isEnable;
   o.setEnable      = FControl_setEnable;
   o.enable         = FControl_enable;
   o.disable        = FControl_disable;
   o.attachEvent    = FControl_attachEvent;
   o.linkEvent      = FControl_linkEvent;
   o.callEvent      = FControl_callEvent;
   o.push           = FControl_push;
   o.psBuild        = FControl_psBuild;
   o.psMode         = FControl_psMode;
   o.psDesign       = FControl_psDesign;
   o.psEnable       = FControl_psEnable;
   o.psVisible      = FControl_psVisible;
   o.psResize       = FControl_psResize;
   o.psRefresh      = FControl_psRefresh;
   o.setPanel       = FControl_setPanel;
   o.build          = FControl_build;
   o.dispose        = FControl_dispose;
   return o;
}
function FControl_onEnter(e){
   var o = this;
}
function FControl_onLeave(e){
   var o = this;
}
function FControl_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Panel'));
}
function FControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.onBuildPanel(e);
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
      o.attachEvent('onEnter', h);
      o.attachEvent('onLeave', h);
      o.attachEvent('onMouseOver', h);
      o.attachEvent('onMouseOut', h);
      o.attachEvent('onMouseDown', h);
      o.attachEvent('onMouseUp', h);
      o.attachEvent('onClick', h);
      o.attachEvent('onDoubleClick', h);
      o.attachEvent('onResize', h);
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
   o.__base.MStyle.construct.call(o);
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
         return o._hPanel;
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
function FControl_attachEvent(n, h, m, u){
   return RControl.attachEvent(this, n, h, m, u);
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
   o._hParent = h;
   h.appendChild(o._hPanel);
}
function FControl_build(h){
   var o = this;
   if(!o._statusBuild){
      o.psBuild(h);
   }
   o.setPanel(h);
}
function FControl_dispose(){
   var o = this;
   o._disable = null;
   o._nowrap = null;
   o._hint = null;
   o._styleContainer = null;
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   o._hParent = null;
   var v = o._hPanel;
   if(v){
      RMemory.freel(v);
      o._hPanel = null;
   }
   o.__base.MPadding.dispose.call(o);
   o.__base.MSize.dispose.call(o);
   o.__base.MStyle.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
function MContainer(o){
   o = RClass.inherits(this, o);
   o.createChild = RMethod.empty;
   o.appendChild = RMethod.empty;
   return o;
}
function MDataset(o){
   o = RClass.inherits(this, o, MEditable);
   o.dsName               = RClass.register(o, new APtyString('dsName', 'dataset'));
   o.dsService            = RClass.register(o, new APtyString('dsService', 'service'));
   o.dsPageSize           = RClass.register(o, new APtyInteger('dsPageSize', 'page_size'), 20);
   o.dispToolbar          = RClass.register(o, new APtyBoolean('dispToolbar'), false);
   o.insertAction         = RClass.register(o, new APtyString('insertAction', 'insert'));
   o.updateAction         = RClass.register(o, new APtyString('updateAction', 'update'));
   o.deleteAction         = RClass.register(o, new APtyString('deleteAction', 'delete'));
   o.dsPageIndex          = 0;
   o.dsViewer             = null;
   o.dsValues             = null;
   o.dsGlobalSearchs      = null;
   o.dsSearchs            = null;
   o.dsGlobalOrders       = null;
   o.dsOrders             = null;
   o.__initializeEvent    = null;
   o.__showEvent          = null;
   o.__loadedEvent        = null;
   o.__progress           = false;
   o.__progressProcess    = null;
   o.__validProcess       = null;
   o.lsnsUpdateBegin      = null;
   o.lsnsUpdateEnd        = null;
   o.onDsFetch           = MDataset_onDsFetch;
   o.onDsPrepareCheck    = RMethod.emptyTrue;
   o.onDsPrepare         = MDataset_onDsPrepare;
   o.onDsUpdateCheck     = RMethod.emptyTrue;
   o.onDsUpdate          = MDataset_onDsUpdate;
   o.onDsDeleteCheck     = RMethod.emptyTrue;
   o.onDsDelete          = MDataset_onDsDelete;
   o.onDsCopy            = MDataset_onDsCopy;
   o.onDsDoUpdate        = MDataset_onDsDoUpdate;
   o.onDsProcess         = MDataset_onDsProcess;
   o.onLoadDatasetBegin  = RMethod.empty;
   o.onLoadDataset       = RMethod.virtual(o, 'onLoadDataset');
   o.onLoadDatasetEnd    = RMethod.virtual(o, 'onLoadDatasetEnd');
   o.getDataCodes        = RMethod.virtual(o, 'getDataCodes');
   o.getCurrentRow       = RMethod.virtual(o, 'getCurrentRow');
   o.getSelectedRows     = RMethod.virtual(o, 'getSelectedRows');
   o.getChangedRows      = RMethod.virtual(o, 'getChangedRows');
   o.getRows             = RMethod.virtual(o, 'getRows');
   o.toDeepAttributes    = MDataset_toDeepAttributes;
   o.construct           = MDataset_construct;
   o.loadDataset         = MDataset_loadDataset;
   o.loadDatasets        = MDataset_loadDatasets;
   o.doPrepare           = RMethod.virtual(o, 'doPrepare');
   o.doDelete            = RMethod.virtual(o, 'doDelete');
   o.dsInitialize        = MDataset_dsInitialize;
   o.dsShow              = MDataset_dsShow;
   o.dsLoaded            = MDataset_dsLoaded;
   o.dsFetch             = MDataset_dsFetch;
   o.dsSearch            = MDataset_dsSearch;
   o.dsCopy              = MDataset_dsCopy;
   o.dsPrepare           = MDataset_dsPrepare;
   o.dsUpdate            = MDataset_dsUpdate;
   o.dsDelete            = MDataset_dsDelete;
   o.dsMode              = MDataset_dsMode;
   o.dsDoUpdate          = MDataset_dsDoUpdate;
   o.dsProcess           = MDataset_dsProcess;
   o.dsProcessCustom     = MDataset_dsProcessCustom;
   o.dsProcessChanged    = MDataset_dsProcessChanged;
   o.dsProcessSelected   = MDataset_dsProcessSelected;
   o.dsProcessAll        = MDataset_dsProcessAll;
   o.psProgress          = MDataset_psProgress;
   o.psValid             = MDataset_psValid;
   o.dsCurrent           = MDataset_dsCurrent;
   o.dsStore             = null;
   o.dsSearchBox         = null;
   o.dsSearchWindow      = null;
   o.onStoreChanged      = RMethod.empty;
   o.onDsFetchBegin      = RMethod.empty;
   o.onDsFetchEnd        = RMethod.empty;
   o.onDsUpdateBegin     = RMethod.empty;
   o.onDsUpdateEnd       = RMethod.empty;
   o.hasAction           = RMethod.virtual(o, 'hasAction');
   o.dsIsChanged         = MDataset_dsIsChanged;
   o.dsCount             = MDataset_dsCount;
   o.dsMove              = MDataset_dsMove;
   o.dsMovePage          = MDataset_dsMovePage;
   o.dsGet               = MDataset_dsGet;
   o.dsSet               = MDataset_dsSet;
   o.dsRefresh           = MDataset_dsRefresh;
   o.doSearch            = MDataset_doSearch;
   return o;
}
function MDataset_onDsFetch(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
function MDataset_onDsPrepare(g){
   var o = this;
   g.resultDatasets.set('/', null);
   o.loadDatasets(g.resultDatasets);
   o.doPrepare(g.resultRow);
   if(g.invokeSuccess()){
	   return;
   }
   o.onLoadDatasetEnd();
   o.focus();
}
function MDataset_onDsUpdate(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
function MDataset_onDsCopy(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.onLoadDatasetEnd();
   o.focus();
}
function MDataset_onDsDelete(g){
   var o = this;
   o.loadDatasets(g.resultDatasets);
   o.doDelete(g.resultRow);
   o.onLoadDatasetEnd();
   o.focus();
}
function MDataset_onDsProcess(g){
   var o = this;
   var cb = g.resultCallback;
   if(cb){
      cb.invoke(o, g);
   }
}
function MDataset_toDeepAttributes(a, m){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var ts = new TList();
   var p = o;
   while(p){
      if(RClass.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
   }
   for(var n=ts.count; n>=0; n--){
      var p = ts.get(n);
      if(RClass.isClass(p, FForm)){
         p.toAttributes(a, m);
      }else if(RClass.isClass(m, FTable)){
         var r = p.getCurrentRow();
         if(r){
            r.toAttributes(a, m);
         }
      }
   }
   return a;
}
function MDataset_onDsDoUpdate(g){
   var o = this;
   if(!g.invokeSuccess()){
      o.psRefresh();
   }
   if(!g.processFinish){
      o.focus();
      o.lsnsUpdateEnd.process(g);
   }
   o.onLoadDatasetEnd();
}
function MDataset_construct(){
   var o = this;
}
function MDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o.dsViewer);
   return o.onLoadDataset(d);
}
function MDataset_loadDatasets(ds){
   var o = this;
   var c = ds.count;
   for(var n=0; n<c; n++){
      var d = ds.value(n);
      if(d){
         var dc = o.findByPath(d.name)
         if(!dc){
            dc = o.findByPath(d.name);
            return RMessage.fatal(o, null, 'Load dataset failed. (control={0})', d.name);
         }
         dc.loadDataset(d);
      }
   }
}
function MDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}
function MDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}
function MDataset_dsLoaded(){
   this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
}
function MDataset_dsFetch(r, f){
   var o = this;
   o.psProgress(true);
   var tc = o.topControl();
   var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, o.dsPageIndex);
   g.reset = r;
   g.force = f;
   g.mode = o._emode;
   g.searchs.append(o.dsGlobalSearchs);
   g.searchs.append(o.dsSearchs);
   g.orders.append(o.dsGlobalOrders);
   g.orders.append(o.dsOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o.dsValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
}
function MDataset_dsSearch(s){
   var o = this;
   o.psProgress(true);
   var tc = o.topControl();
   var pth = o.fullPath();
   if(s){
      pth = s.fullPath();
   }
   var g = new TDatasetFetchArg(tc.name, tc.formId, o.dsPageSize, 0, true, false, pth);
   g.mode = tc._emode;
   g.searchs.append(o.dsGlobalSearchs);
   g.searchs.append(o.dsSearchs);
   g.orders.append(o.dsGlobalOrders);
   g.orders.append(o.dsOrders);
   o.toDeepAttributes(g.values);
   g.values.append(o.dsValues);
   g.callback = new TInvoke(o, o.onDsFetch);
   RConsole.find(FDatasetConsole).fetch(g);
}
function MDataset_dsCopy(r){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.form = o;
   g.mode = EMode.Insert;
   o.dsSearchs.clear();
   o.dsSearchs.push(new TSearchItem('OUID', r.get("OUID")));
   g.searchs = o.dsSearchs;
   g.callback = new TInvoke(o, o.onDsCopy);
   if(o.onDsUpdateCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
function MDataset_dsPrepare(cb){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Insert);
   var g = new TDatasetPrepareArg(o.name, o.formId);
   g.form = o;
   g.values.append(o.dsValues);
   g.callbackSuccess = cb;
   if(o.onDsPrepareCheck(g)){
      g.callback = new TInvoke(o, o.onDsPrepare);
      RConsole.find(FDatasetConsole).prepare(g);
   }
}
function MDataset_dsUpdate(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
function MDataset_dsDelete(u, v){
   var o = this;
   o.psProgress(true);
   o.psMode(EMode.Delete);
   var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0, true);
   g.callback = new TInvoke(o, o.onDsDelete);
   g.form = o;
   g.mode = EMode.Delete;
   if(u){
      g.searchs.push(new TSearchItem('OUID', u));
   }
   if(v){
       g.searchs.push(new TSearchItem('OVER', v));
   }
   g.values = o.dsValues;
   if(o.onDsDeleteCheck(g)){
      RConsole.find(FDatasetConsole).fetch(g);
   }
   return;
}
function MDataset_dsMode(m){
   var o = this;
   switch(m){
      case EMode.Insert:
         o.dsPrepare();
         break;
      case EMode.Update:
         o.dsUpdate();
         break;
      case EMode.Delete:
         o.dsDelete();
         break;
   }
}
function MDataset_dsDoUpdate(cb, ck){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var t = o.topControl();
   var g = new TDatasetUpdateArg(t.name, o.formId, o.dsName);
   g.form = o;
   g.path = o.fullPath();
   g.mode = o._emode;
   g.codes = o.getDataCodes();
   g.callback = new TInvoke(o, o.onDsDoUpdate);
   g.callbackSuccess = cb;
   if(EMode.Insert == o._emode || EMode.Delete == o._emode){
      g.dataset.rows.append(o.getCurrentRows());
   }else{
      g.dataset.rows.append(o.getChangedRows());
      if(!ck){
         if(!g.hasData()){
            return RMessage.warn(o, RContext.get('MDataset:nochange'));
         }
      }
   }
   o.psProgress(true);
   RConsole.find(FDatasetConsole).update(g);
}
function MDataset_dsProcess(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.push(o.getCurrentRow());
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MDataset_dsProcessCustom(pm, da, cb, cc){
	var o = this;
	if(!cc){
	if(!o.psValid()){
	   return;
	}
	}
	var g = new TDatasetServiceArg(o.topControl().name, da);
	g.form = o;
	g.controlName = o.name;
	g.attributes = pm;
	g.codes = o.getDataCodes();
	g.push(o.getCurrentRow());
	g.resultCallback = cb;
	if(!cc){
	   if(!g.hasData()){
	      return RMessage.warn(o, RContext.get('MDataset:nodata'));
	   }
	}
	o.psProgress(true);
	g.callback = new TInvoke(o, o.onDsProcess);
	RConsole.find(FFormConsole).process(g);
}
function MDataset_dsProcessSelected(da, cb){
	var o = this;
	if(!o.psValid()){
	   return;
	}
	   var g = new TDatasetServiceArg(o.topControl().name, da);
	   g.form = o;
	   g.controlName = o.name;
	   o.toDeepAttributes(g.attributes);
	   g.codes = o.getDataCodes();
	   g.rows = o.getSelectedRows();
	   if(g.rows.count > 0){
		  g.resultCallback = cb;
		  o.psProgress(true);
		  g.callback = new TInvoke(o, o.onDsProcess);
		  RConsole.find(FFormConsole).process(g);
		  o.clearSelectRows();
	   }else{
	      return RMessage.warn(o, RContext.get('MDataset:norows'));
	   }
}
function MDataset_dsProcessChanged(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getChangedRows();
   g.resultCallback = cb;
   if(!g.hasData()){
      return RMessage.warn(o, RContext.get('MDataset:nochange'));
   }
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MDataset_dsProcessAll(da, cb){
   var o = this;
   if(!o.psValid()){
      return;
   }
   var g = new TDatasetServiceArg(o.topControl().name, da);
   g.form = o;
   g.controlName = o.name;
   o.toDeepAttributes(g.attributes);
   g.codes = o.getDataCodes();
   g.rows = o.getRows();
   g.resultCallback = cb;
   o.psProgress(true);
   g.callback = new TInvoke(o, o.onDsProcess);
   RConsole.find(FFormConsole).process(g);
}
function MDataset_psProgress(v){
   var o = this;
   if(o.__progress == v){
      return;
   }
   o.__progress = v;
   var e = o.__progressProcess;
   e.enable = v;
   o.process(e);
}
function MDataset_psValid(){
   var o = this;
   var e = o.__validProcess;
   var cs = e.controls;
   cs.clear();
   o.process(e);
   if(!cs.isEmpty()){
      var cw = RConsole.find(FCheckWindowConsole).find();
      cw.set(cs);
      cw.show();
      return false;
   }
   return true;
}
function MDataset_dsCurrent(){
   var o = this;
   var ds = o.dsStore;
}
function MDataset_dsIsChanged(){
   var ds = this.dsStore;
   return ds ? ds.isChanged() : false;
}
function MDataset_dsCount(){
   return this.dsStore ? this.dsStore.count : 0;
}
function MDataset_dsMove(p){
   var o = this;
   var ds = o.dsStore;
   if(null == p && !ds){
      return;
   }
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         ds.moveFirst();
      }else if(EDataAction.Prior == p){
         ds.movePrior();
      }else if(EDataAction.Next == p){
         ds.moveNext();
      }else if(EDataAction.Last == p){
         ds.moveLast();
      }else{
         RMessage.fatal(o, null, 'Unknown position (postion={0})', p);
      }
   }else{
      ds.move(p);
   }
   if(RClass.isClass(o, MValue)){
      o.loadValue(ds.current());
   }
}
function MDataset_dsMovePage(p){
   var o = this;
   var ds = o.dsStore;
   if(!RInt.isInt(p)){
      if(EDataAction.First == p){
         p = 0;
      }else if(EDataAction.Prior == p){
         p = ds.pageIndex;
         if(p > 0){
            p--;
         }
      }else if(EDataAction.Next == p){
         p = ds.pageIndex;
         if(p < ds.pageCount - 1){
            p++;
         }
      }else if(EDataAction.Last == p){
         p = ds.pageCount - 1;
      }else{
         RMessage.fatal(o, null, 'Unknown page (page={0})', p);
      }
   }
   if(p != ds.pageIndex){
      o.psProgress(true);
      var t = o.topControl(MDataset);
      var g = new TDatasetFetchArg(t.name, t.formId, o.dsPageSize, p, true);
      g.path =  o.fullPath();
      g.mode = t._emode;
      g.searchs.append(o.dsGlobalSearchs);
      g.searchs.append(o.dsSearchs);
      g.orders.append(o.dsGlobalOrders);
      g.orders.append(o.dsOrders);
      g.values = o.toDeepAttributes();
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsFetch);
      RConsole.find(FDatasetConsole).fetch(g);
   }
}
function MDataset_dsGet(n){
   return this.dsStore ? this.dsStore.get(n) : '';
}
function MDataset_dsSet(n, v){
   if(this.dsStore){
      this.dsStore.set(n, v);
   }
}
function MDataset_dsRefresh(){
   if(this.dsService){
      this.dsMove(this.dsPage, true);
   }
}
function MDataset_doSearch(){
   var o = this;
   var sw = o.dsSearchWindow;
   if(!sw){
      sw = o.dsSearchWindow = top.RControl.create(top.FSearchWindow);
      sw.linkDsControl(o);
   }
   sw.show();
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
function MDragable(o){
   o = RClass.inherits(this, o);
   o.onDragStart = RMethod.virtual(o, 'onDragStart');
   o.onDragMove  = RMethod.virtual(o, 'onDragMove');
   o.onDragStop  = RMethod.virtual(o, 'onDragStop');
   return o;
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
   o.onFocus   = RClass.register(o, new AEventFocus('onFocus'), MFocus_onFocus);
   o.onBlur    = RClass.register(o, new AEventBlur('onBlur'));
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
   o.dispose      = MPadding_dispose;
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
function MPadding_dispose(){
   var o = this;
   var v = o._padding;
   if(v){
      v.dispose();
      o._padding = null;
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
   o.setWidth  = MSize_setWidth;
   o.setHeight = MSize_setHeight;
   o.setSize   = MSize_setSize;
   o.setBounds = MSize_setBounds;
   o.resetSize = MSize_resetSize;
   o.dispose   = MSize_dispose;
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
function MSize_setWidth(p){
   this.setSize(p, null);
}
function MSize_setHeight(p){
   this.setSize(null, p);
}
function MSize_setSize(w, h){
   var o = this;
   var t = this.panel(EPanel.Size);
   if(w != null){
      o._size.width = w;
      if(t){
         t.style.width = w;
      }
   }
   if(h != null){
      o._size.height = h;
      if(t){
         t.style.height = h;
      }
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
function MSize_dispose(){
   var o = this;
   var v = o._location;
   if(v){
      v.dispose();
      o._location = null;
   }
   var v = o._size;
   if(v){
      v.dispose();
      o._size = null;
   }
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
   o.construct     = RMethod.empty;
   o.styleName     = MStyle_styleName;
   o.styleIcon     = MStyle_styleIcon;
   o.styleIconPath = MStyle_styleIconPath;
   o.dispose       = RMethod.empty;
   return o;
}
function MStyle_styleName(n, c){
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
   o.attachEvent        = RControl_attachEvent;
   o.innerbuild         = RControl_innerbuild;
   o.build              = RControl_build;
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
   o.innerCreate        = RControl_innerCreate;
   o.create             = RControl_create;
   o.linkEvent          = RControl_linkEvent;
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
function RControl_attachEvent(c, n, h, m, u){
   var o = this;
   var e = null;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      var al = a.linker();
      var ah = a.handle();
      e = a.create();
      e.annotation = a;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      var es = REvent.find(h);
      es.push(al, e);
      if(u){
         h.addEventListener(a._linker, REvent.ohEvent, true);
      }else{
         h[ah] = REvent.ohEvent;
      }
      RHtml.linkSet(h, '_plink', c);
   }
   return e;
}
function RControl_innerbuild(pc, px){
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px);
   }
   if(RClass.isClass(pc, MContainer) && px.hasNode()){
      var xs = px.nodes();
      var xc = xs.count();
      for(var i = 0; i < xc; i++){
         var x = xs.get(i);
         var c = pc.createChild(x);
         if(c){
            this.innerbuild(c, x);
            pc.push(c);
         }
      }
   }
}
function RControl_build(pc, px){
   this.innerbuild(pc, px);
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
   o._objects  = new Array();
   o.ohEvent   = REvent_ohEvent;
   o.onProcess = REvent_onProcess;
   o.find      = REvent_find;
   o.process   = REvent_process;
   o.current   = 0;
   o.events    = new Array();
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   o.release   = REvent_release;
   RMemory.register('REvent', o);
   return o;
}
function REvent_ohEvent(e){
   REvent.process(this, e ? e : window.event);
}
function REvent_onProcess(e){
   var e = this;
   var ea = e.annotation;
   RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
}
function REvent_find(p){
   var u = RHtml.uid(p);
   var es = this._objects;
   var e = es[u];
   if(e == null){
      e = es[u] = new THtmlEvent();
      e.linker = p;
   }
   return e;
}
function REvent_process(hs, he){
   var o = this;
   if(!hs || !he){
      return;
   }
   var eo = o.find(hs);
   if(eo){
      var es = eo.events[he.type];
      if(es){
         var ec = es.length;
         for(var i = 0; i < ec; i++){
            var e = es[i];
            var ea = e.annotation;
            e.source = RHtml.linkGet(hs, '_plink');
            e.hSender = RHtml.eventSource(he);
            e.sender = e.hSender._plinker;
            e.hSource = hs;
            ea.attach(e, he);
            if(e.ohProcess){
               RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               e.ohProcess.call(e.source, e);
            }else if(e.onProcess){
               RConsole.find(FEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
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
function REvent_release(){
   var o = this;
   RMemory.free(o.events);
   RMemory.free(o._objects);
   o.events = null;
   o._objects = null;
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
   o.linker  = null;
   o.events  = new Object();
   o.push    = THtmlEvent_push;
   o.dispose = THtmlEvent_dispose;
   o.dump    = THtmlEvent_dump;
   return o;
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
   var c = es.length;
   if(c > 0){
      var fn = pe.annotation.name();
      for(var i = 0; i < c; i++){
         var e = es[i];
         var en = e.annotation.name();
         if(en == fn){
            throw new TError(o, 'Duplicate event for same control. (name={1}, source={2}, event={3})\n{4}\n{5}', en, RClass.dump(pe.source), RClass.dump(pe), RString.repeat('-', 60), o.dump());
         }
      }
   }
   es[es.length] = pe;
}
function THtmlEvent_dispose(){
   var o = this;
   for(var n in o.events){
      var e = o.events[n];
      if(e.length){
         o.linker[e.handle] = null;
      }
   }
   if(o.linker.linker){
      o.linker.removeAttribute('link');
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
   return r.flush();
}
function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
function FButton(o){
   o = RClass.inherits(this, o, FControl, MDisplay, MDesign);
   o.labelPosition      = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
   o.icon               = RClass.register(o, new TPtyStr('icon'));
   o.type               = RClass.register(o, new TPtyStr('type'));
   o.action             = RClass.register(o, new TPtyStr('action'));
   o.dataAction         = RClass.register(o, new TPtyStr('dataAction'));
   o.service            = RClass.register(o, new TPtyStr('service'));
   o.target             = RClass.register(o, new TPtyStr('target'));
   o.page               = RClass.register(o, new TPtyStr('page'));
   o.method             = RClass.register(o, new TPtyStr('method'));
   o.iconDisable        = RClass.register(o, new TPtyStr('iconDisable'));
   o.attributes         = RClass.register(o, new TPtyStr('attributes'));
   o.editUrl            = RClass.register(o, new TPtyStr('editUrl'));
   o.editForm           = RClass.register(o, new TPtyStr('editForm'));
   o.stIcon             = RClass.register(o, new TStyle('Icon'));
   o.stLabel            = RClass.register(o, new TStyle('Label'));
   o.stForm             = RClass.register(o, new TStyle('Form'));
   o.stIconPanel        = RClass.register(o, new TStyleIcon('Panel'));
   o.__process          = false;
   o.lsnsClick          = new TListeners();
   o.hForm              = null;
   o.hLeftButton        = null;
   o.hMiddleButton      = null;
   o.hRightButton       = null;
   o.hLabelPanel        = null;
   o.hLabel             = null;
   o.onButtonEnter      = RClass.register(o, new HMouseEnter('onButtonEnter'), FButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new HMouseLeave('onButtonLeave'), FButton_onButtonLeave);
   o.onButtonDown       = RClass.register(o, new HMouseDown('onButtonDown'), FButton_onButtonDown);
   o.onButtonUp         = RClass.register(o, new HMouseUp('onButtonUp'), FButton_onButtonUp);
   o.onButtonClickDelay = FButton_onButtonClickDelay;
   o.onClick            = FButton_onClick;
   o.onButtonClick      = RClass.register(o, new HClick('onButtonClick'), FButton_onButtonClick);
   o.oeBuild            = FButton_oeBuild;
   o.oeMode             = FButton_oeMode;
   o.setLabel           = FButton_setLabel;
   o.setLabelColor      = FButton_setLabelColor;
   o.setLabelStyle      = FButton_setLabelStyle;
   o.doClick            = FButton_doClick;
   o.dispose            = FButton_dispose;
   return o;
}
function FButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('HoverLeft');
	  o.hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o.hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('PressLeft');
	  o.hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o.hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FButton_onClick(e){
   this.doClick();
}
function FButton_onButtonClick(e){
   this.doClick();
}
function FButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.paddingTop = o.padTop ? o.padTop : 10;
   hp.style.pixelHeight = 26;
   var hf = o.hForm = RBuilder.appendTable(hp);
   var hr = hf.insertRow();
   hr.height = 22;
   var hl = o.hLeftButton = hr.insertCell();
   hl.width = 3;
   hl.background = o.styleIconPath('ButtonLeft');
   var hm = o.hMiddleButton = hr.insertCell();
   hm.background = o.styleIconPath('Button');
   var hrb = o.hRightButton = hr.insertCell();
   hrb.width = 3;
   hrb.background = o.styleIconPath('ButtonRight');
   hf.style.cursor = 'hand';
   hf.style.border = 0;
   o.attachEvent('onButtonEnter', hf, o.onButtonEnter);
   o.attachEvent('onButtonLeave', hf, o.onButtonLeave);
   o.attachEvent('onButtonDown', hf, o.onButtonDown);
   o.attachEvent('onButtonUp', hf, o.onButtonUp);
   o.attachEvent('onButtonClick', hf);
   var hTb = RBuilder.appendTable(hm);
   var hr  = hTb.insertRow();
   var hc = hr.insertCell();
   hc.width = 10;
   if(o.icon){
      var hc = hr.insertCell();
      hc.width = 16;
      o.hIcon = RBuilder.appendIcon(hc, o.icon);
      hcc = hr.insertCell();
      hcc.width = 4;
   }
   if(o.label){
      var hc = hr.insertCell();
      hc.align = 'center';
      hc.noWrap = true;
      o.hLabel = RBuilder.appendText(hc, o.label);
      o.hLabel.style.font = 'icon';
   }
   var hc = o.hFormEnd = hr.insertCell();
   hc.width = 10;
   o.__process = false;
   var ca = o.clickActive = new TActive(o, o.onButtonClickDelay);
   ca.interval = 500;
   ca.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(ca);
   return EEventStatus.Stop;
}
function FButton_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FButton_setLabel(v){
   var o = this;
   o.label = v;
   o.hLabel.innerText = v;
   o.hLabel.noWrap = true;
}
function FButton_setLabelColor(c){
   var o = this;
   o.hLabel.style.color = '#FF0000';
}
function FButton_setLabelStyle(c, w, s){
   var o = this;
   o.hLabel.style.color = '#FF0000';
   o.hLabel.style.fontWeight = 'bold';
   o.hLabel.style.fontSize = '12';
}
function FButton_doClick(){
   var o = this;
   if(o.__process){
      return;
   }
   o.__process = true;
   o.clickActive.status = EActive.Active;
   o.lsnsClick.process(this);
   if(o.action){
      eval(o.action);
   }
   if(o.page){
      var form = RHtml.form(o.hButton);
      var p = RPage.parse(o.page);
      if(o.method){
         p.action = o.method;
      }
      p.split(o.attributes);
      var f = o.topControl(MDataset);
      if(f){
         var as = new TAttributes();
         f.saveValue(as);
         if(form && form.form_pack){
            form.form_pack.value = as.pack();
         }
      }
      p.post(form, RString.nvl(o.target, '_self'));
   }
   if(o.editUrl){
      var w = RConsole.find(FButtonConsole).find();
      w.linkUrl(o.editUrl);
      w.show();
   }
   if(o.editForm){
      var w = RConsole.find(FButtonFormConsole).find();
      w.linkForm(o);
      w.show();
   }
}
function FButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hFormEnd = null;
   o.hLabel = null;
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
   var he = o._hValue = RBuilder.appendEdit(o._hValuePanel, o.styleName('Edit'));
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
   var h = o._hLabelContainer = RBuilder.createTable(e.hDocument, o.styleName('LabelContainer'));
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
   var h = o._hEditorContainer = RBuilder.createTable(e.hDocument, o.styleName('EditorContainer'));
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
   o._hContainer = RBuilder.createTable(e.hDocument, o.styleName('Container'));
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
function FForm(o){
   o = RClass.inherits(this, o, FLayout, MFocus, MDataset);
   o.__status           = ERowStatus.Update;
   o.__clearEvent       = null;
   o.__resetEvent       = null;
   o.__loadEvent        = null;
   o.__saveEvent        = null;
   o.__recordEvent      = null;
   o.__codeEvent        = null;
   o.__dataComponents   = null;
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   o.onMouseDown        = FForm_onMouseDown;
   o.onLoadDataset      = FForm_onLoadDataset;
   o.onLoadDatasetEnd   = FForm_onLoadDatasetEnd;
   o.construct          = FForm_construct;
   o.isDataChanged      = FForm_isDataChanged;
   o.getFormLink        = FForm_getFormLink;
   o.allDataComponents  = FForm_allDataComponents;
   o.get                = FForm_get;
   o.reget              = FForm_reget;
   o.set                = FForm_set;
   o.getDataCodes       = FForm_getDataCodes;
   o.getCurrentRow      = FForm_getCurrentRow;
   o.getSelectedRows    = FForm_getSelectedRows;
   o.getCurrentRows     = FForm_getCurrentRows;
   o.getChangedRows     = FForm_getChangedRows;
   o.getRows            = FForm_getRows;
   o.clearValue         = FForm_clearValue;
   o.resetValue         = FForm_resetValue;
   o.loadValue          = FForm_loadValue;
   o.saveValue          = FForm_saveValue;
   o.recordValue        = FForm_recordValue;
   o.toAttributes       = FForm_toAttributes;
   o.focus              = FForm_focus;
   o.dsUpdate           = FForm_dsUpdate;
   o.doPrepare          = FForm_doPrepare;
   o.doUpdate           = FForm_doUpdate;
   o.doDelete           = FForm_doDelete;
   o.dispose            = FForm_dispose;
   o._nameComponents    = null;
   o.allNameComponents  = FForm_allNameComponents;
   o.isLoading          = false;
   o.onLoaded           = FForm_onLoaded;
   o.onDsFetchEnd       = FForm_onDsFetchEnd;
   o.onDsUpdateBegin    = FForm_onDsUpdateBegin;
   o.onDsUpdateEnd      = FForm_onDsUpdateEnd;
   o.onLoadValue        = RMethod.empty;
   o.onSaveValue        = RMethod.empty;
   o.connect            = FForm_connect;
   o.loadDocument       = FForm_loadDocument;
   o.testStatus         = FForm_testStatus;
   o.hasAction          = FForm_hasAction;
   o.setEditable        = FForm_setEditable;
   return o;
}
function FForm_onMouseDown(e, he){
   var o = this;
   var fc = RConsole.find(FFocusConsole);
   fc.focusClass(MDataset, o);
   fc.focusHtml(he);
   if(!RConsole.find(FDesignConsole).isDesign()){
      he.cancelBubble = true;
   }
}
function FForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
function FForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
function FForm_construct(){
   var o = this;
   o.__base.FLayout.construct.call(o);
   o.__base.MDataset.construct.call(o);
   o.lsnsLoaded = new TListeners();
   o.lsnsClick = new TListeners();
   o.__clearEvent = new TEventProcess(o, 'oeClearValue', MEditValue);
   o.__resetEvent = new TEventProcess(o, 'oeResetValue', MEditValue);
   o.__loadEvent = new TEventProcess(o, 'oeLoadValue', MEditValue);
   o.__saveEvent = new TEventProcess(o, 'oeSaveValue', MEditValue);
   o.__recordEvent = new TEventProcess(o, 'oeRecordValue', MEditValue);
   o.__codeEvent = new TEventProcess(o, 'oeSaveCode', MEditDescriptor);
   o.__dataComponents = new TMap();
}
function FForm_isDataChanged(){
   var o = this;
   var ps = o.allDataComponents();
   if(!ps.isEmpty()){
      var pc = ps.count;
      for(var n=0; n<pc; n++){
         var p = ps.value(n);
         if(p.isDataChanged()){
            return true;
         }
      }
   }
}
function FForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FForm_allDataComponents(p, m){
   var o = this;
   if(!p){
      p = o;
   }
   if(!m){
      m = o.__dataComponents;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
function FForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
function FForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
function FForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
function FForm_getDataCodes(){
   var o = this;
   var e = o.__codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
function FForm_getCurrentRow(){
   return this.saveValue();
}
function FForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
function FForm_getChangedRows(){
   var o = this;
   var ls = new TList();
   if(o.isDataChanged()){
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
   }
   return ls;
}
function FForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FForm_clearValue(){
   this.process(this.__clearEvent);
}
function FForm_resetValue(){
   this.process(this.__resetEvent);
}
function FForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o.__loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
function FForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = o.__saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o.__status);
   return r;
}
function FForm_recordValue(){
   this.process(this.__recordEvent);
}
function FForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
function FForm_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FForm_dsUpdate(u, v){
   var o = this;
   if(u){
      o.psProgress(true);
      o.psMode(EMode.Update);
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0);
      g.form = o;
      g.reset = true;
      o.dsSearchs.clear();
      if(u){
         o.dsSearchs.push(new TSearchItem('OUID', u));
      }
      if(v){
         o.dsSearchs.push(new TSearchItem('OVER', v));
      }
      g.searchs = o.dsSearchs;
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsUpdate);
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }
   return o.__base.MDataset.dsUpdate.call(o, u, v)
}
function FForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}
function FForm_doPrepare(v){
   var o = this;
   o.__status = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_doUpdate(v){
   var o = this;
   o.__status = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_doDelete(v){
   var o = this;
   o.__status = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_dispose(){
   var o = this;
   o.__base.FLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FForm_allNameComponents(f, p, m){
   var o = this;
   var vs = o._nameComponents;
   if(!f && vs){
      return vs;
   }
   if(!vs){
      vs = o._nameComponents = new TMap();
   }
   if(f){
      vs.clear();
   }
   if(!p){
      p = this;
   }
   if(!m){
      m = vs;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
function FForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
function FForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
function FForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FForm_connect(service, type, action, attrs){
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('name', this.name);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   var event = new TEvent(this, EXmlEvent.Send);
   event.url = service;
   event.document = doc;
   event.form = this;
   event.onLoad = this.onLoaded;
   RConsole.find(FXmlConsole).process(event);
}
function FForm_loadDocument(doc){
   if(doc){
      var root = doc.root();
      if(root.isName('Table')){
         var o = this;
         o.loadConfig(root);
         o.buildColumns(root);
         o.buildRows(root);
      }
   }
}
function FForm_testStatus(t){
   var o = this;
   var r = o.__base.MDataset.testStatus.call(o, t);
   if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Search== t){
      return true;
   }else if(EDataAction.First == t){
      return false;
   }else if(EDataAction.Prior == t){
      return false;
   }else if(EDataAction.Next == t){
      return false;
   }else if(EDataAction.Last == t){
      return false;
   }else if(EDataAction.Action == t){
      return true;
   }
   return r;
}
function FForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
function FLayout(o){
   o = RClass.inherits(this, o, FContainer);
   o.hContainer     = null;
   o.hPanelTable    = null;
   o.hPanelLine     = null;
   o.__lastSplit    = null;
   o.oeDesign       = FLayout_oeDesign;
   o.oeRefresh      = FLayout_oeRefresh;
   o.oeResize       = FLayout_oeResize;
   o.onDesignBegin  = FLayout_onDesignBegin;
   o.onDesignEnd    = FLayout_onDesignEnd;
   o.onBuildPanel   = FLayout_onBuildPanel;
   o.doResize       = FLayout_doResize;
   o.insertPosition = FLayout_insertPosition;
   o.appendLine     = FLayout_appendLine;
   o.appendChild    = FLayout_appendChild;
   o.moveChild      = FLayout_moveChild;
   o.moveChild      = FLayout_moveChild;
   o.panelExtend    = FLayout_panelExtend;
   o.dispose        = FLayout_dispose;
   return o;
}
function FLayout_onDesignBegin(){
   var o = this;
   o.base.MDesign.onDesignBegin.call(o);
}
function FLayout_onDesignEnd(){
   var o = this;
   o.base.MDesign.onDesignEnd.call(o);
}
function FLayout_doResize(){
   var o = this;
   var cs = o.components;
   if(cs){
      var ha = false;
      var c = cs.count;
      for(var n=0; n<c; n++){
         var p = o.components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FPageControl)){
            ha = true;
            break;
         }
      }
      o.setSize('100%', ha ? '100%' : 1);
   }
}
function FLayout_oeDesign(event){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(event.isAfter()){
      switch(event.mode){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o.hPanel.border = 1;
               o.hPanel.style.border = '1 solid red';
            }else{
               o.hPanel.border = 0;
               o.hPanel.style.border = null;
            }
            break;
      }
   }
}
function FLayout_oeRefresh(e){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
function FLayout_oeResize(e){
   var o = this;
   o.base.FContainer.oeResize.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
function FLayout_onBuildPanel(){
   var o = this;
   var h = o.hPanel = o.hPanelForm = RBuilder.newTable();
   h.width = '100%';
   if(EMode.Design == o._emode){
      o.hContainer = h.insertRow().insertCell();
   }
}
function FLayout_appendLine(){
   var o = this;
   var h = null;
   if(EMode.Design == o._emode){
      h = o.hPanelTable = RBuilder.appendTable(o.hContainer);
      h.style.paddingBottom = 6;
      o.hPanelLine = h.insertRow();
   }else{
      o.hPanelTable = null;
      o.hPanelLine = null;
   }
   return h;
}
function FLayout_appendChild(ctl){
   var o = this;
   if(EMode.Design == o._emode){
      if(!o.hPanelLine){
         o.appendLine();
      }
      if(RClass.isClass(ctl, MHorizontal)){
         if(o.hPanelTable.rows[0].cells.length == 0){
            o.hContainer.insertBefore(ctl.hPanel, o.hPanelTable);
         }else{
            o.hContainer.appendChild(ctl.hPanel);
            o.appendLine();
         }
         return;
      }
      var hCell = o.hPanelLine.insertCell();
      if(!RClass.isClass(ctl, FLayout)){
         ctl.hPanelLine = o.hPanelTable;
      }
      hCell.appendChild(ctl.hPanel);
      ctl.hLayoutCell = hCell;
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.appendLine();
      }
   }else{
      ctl.hPanel.style.paddingTop = 2;
      ctl.hPanel.style.paddingBottom = 2;
      if(RSet.contains(ctl._esize, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FSplit)){
            o.__lastSplit = ctl;
         }
         var hr = o.hPanelForm.insertRow();
         var hc = hr.insertCell();
         hc.vAlign = 'top';
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutRow = hr;
         o.hPanelLast = hc;
         if(!RSet.contains(ctl._esize, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o.hPanelLine = null;
      }else{
         if(!o.hPanelLine){
            var hr = o.hPanelForm.insertRow();
            hr.height = 1;
            if(o.__lastSplit){
               o.__lastSplit.pushLine(hr);
            }
            var hc = hr.insertCell();
            hc.vAlign = 'top';
            var ht = o.hPanelTable = RBuilder.appendTable(hc);
            o.hPanelLine = ht.insertRow();
         }
         var hc = o.hPanelLine.insertCell()
         ctl.hLayoutRow = o.hPanelLine;
         o.hPanelLast = hc;
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutCell = hc;
         if(!ctl.nowrap){
            o.hPanelLine = null;
         }
      }
   }
}
function FLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o.components;
   var cs = o.controls;
   ms.removeValue(cf);
   cs.removeValue(cf);
   if(ct){
      var index = ms.indexOfValue(ct);
      ms.insert(index+idx, cf.name, cf);
      var index = cs.indexOfValue(ct);
      cs.insert(index+idx, cf.name, cf);
   }else{
      ms.set(cf.name, cf);
      cs.set(cf.name, cf);
   }
}
function FLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o.hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf.hPanel, 'TD');
   var hCfTab = RHtml.parent(cf.hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct.hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = hRow.insertCell(hTd.cellIndex);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf.hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf.hPanel, 'TD');
               var hCell = hRow.insertCell(hTd.cellIndex+1);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf.hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o.hContainer.insertBefore(cf.hPanel, ct.hPanel);
            }else{
               var hNewTab = o.appendLine();
               o.hContainer.insertBefore(hNewTab, ct.hPanel);
               var hCell = o.hPanelLine.insertCell();
               hCell.appendChild(cf.hPanel);
               cf.hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o.hContainer.children.length;
            for(var n=0; n<count; n++){
               if(o.hContainer.children[n] == hTable){
                  if(cfh){
                     o.hContainer.insertBefore(cf.hPanel, hTable);
                  }else{
                     var hNewTab = o.appendLine();
                     o.hContainer.insertBefore(hNewTab, hTable);
                     var hCell = o.hPanelLine.insertCell();
                     hCell.appendChild(cf.hPanel);
                     cf.hPanelLine = hNewTab;
                     moved = true;
                  }
                  o.insertPosition(cf, ct, 0, copy);
                  cf.nowrap = false;
                  break;
               }
            }
         }
         break;
      case EPosition.LineAfter:
         if(cfh){
            o.hContainer.appendChild(cf.hPanel);
         }else{
            var hNewTab = o.appendLine();
            var hCell = o.hPanelLine.insertCell();
            hCell.appendChild(cf.hPanel);
            hCell.appendChild(cf.hPanel);
            moved = true;
         }
         o.insertPosition(cf, null, 0, copy);
         ct.nowrap = false;
         cf.nowrap = false;
         break;
   }
   if(moved){
      hCfTd.removeNode(true);
      if(hCfTab.rows[0].cells.length == 0){
         hCfTab.removeNode(true);
      }
   }
}
function FLayout_panelExtend(v){
   var o = this;
   if(o.hLastLine){
      o.hPanelLast.height = v ? '1' : '100%';
   }
}
function FLayout_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hPanelCurrent = null;
   o.hPanelTable = null;
   o.hPanel = null;
   o.hContainer = null;
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
function FCellEdit(o){
   o = RClass.inherits(this, o, FCellEditControl, MFocus);
   o.buildDrop = FCellEdit_buildDrop;
   o.buildEdit = FCellEdit_buildEdit;
   o.setInfo   = FCellEdit_setInfo;
   o.text      = FCellEdit_text;
   o.setText   = FCellEdit_setText;
   return o;
}
function FCellEdit_buildDrop(){
   var o = this;
   var c = o.column;
   if(!RString.isEmpty(c.lovRefer)){
      var hdp = o.hDropPanel;
      hdp.align = 'right';
      hdp.style.paddingRight = 2;
      var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FCellEdit_Lov', null, 16, 16);
      hli.style.borderLeft='1 solid #CCCCCC';
      hli.style.cursor = 'hand';
      c.linkEvent(o, 'onListClick', hli);
   }
}
function FCellEdit_buildEdit(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      var hep = o.hEditPanel;
      c.linkEvent(o, 'onCellDoubleClick', hep, c.onCellDoubleClick);
      var he = o.hEdit = RBuilder.append(hep, 'SPAN');
      he.style.color = 'blue';
      he.style.textDecoration = 'underline';
      he.style.cursor = 'hand';
      he.style.paddingBottom = 1;
      c.linkEvent(o, 'onZoomClick', he, c.onZoomClick);
      c.linkEvent(o, 'onZoomHover', he, c.onZoomHover);
      c.linkEvent(o, 'onZoomLeave', he, c.onZoomLeave);
      if(!RString.isEmpty(c.editAlign)){
         he.style.textAlign = c.editAlign;
      }
   }else{
      if(c._absEdit){
         o.base.FCellEditControl.buildEdit.call(o);
      }else{
         var he = o.hEditPanel;
         c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
         c.linkEvent(o, 'onCellClick', he, c.onCellClick);
         c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
      }
   }
}
function FCellEdit_setInfo(f){
   var o = this;
   o.base.FCellEditControl.setInfo.call(o, f);
   var d = o.column;
   var m = d.iconMap;
   var hi = o.hIcon;
   if(m && m.get(f.icon)){
      hi.style.display = 'block';
      hi.title = f.iconHint;
      hi.src = RResource.iconPath(m.get(f.icon));
   }else{
      if(hi){
         hi.style.display = 'none';
      }
   }
}
function FCellEdit_text(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      return o.hEdit.innerText;
   }
   if(c._absEdit){
      return o.hEdit.value;
   }
   return o.hEditPanel.innerText;
}
function FCellEdit_setText(t){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      o.hEdit.innerText = t;
   }else{
      if(c._absEdit){
         o.hEdit.value = t;
      }else{
         o.hEditPanel.innerText = t;
      }
   }
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
function FColumnEdit(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescEdit);
   o.__cellClass    = FCellEdit;
   o.hasDropArea    = true;
   o.onCellMouseEnter = FColumnEdit_onCellMouseEnter;
   o.onCellMouseLeave = FColumnEdit_onCellMouseLeave;
   o.onListClick      = FColumnEdit_onListClick;
   o.onZoomClick      = RClass.register(o, new HClick('onZoomClick'), FColumnEdit_onZoomClick);
   o.onZoomHover      = RClass.register(o, new HMouseEnter('onZoomHover'), FColumnEdit_onZoomHover);
   o.onZoomLeave      = RClass.register(o, new HMouseLeave('onZoomLeave'), FColumnEdit_onZoomLeave);
   return o;
}
function FColumnEdit_onCellMouseEnter(s, e){
   if(s.hLovImage){
   }
}
function FColumnEdit_onCellMouseLeave(s, e){
   if(s.hLovImage){
   }
}
function FColumnEdit_onListClick(s, e){
   var o = this;
   o.table.__focusCell = s;
   var cvs = s.row.saveRow().toAttributes();
   o.doListView(cvs);
}
function FColumnEdit_onZoomHover(s, e){
   s.hEdit.style.color='black';
}
function FColumnEdit_onZoomLeave(s, e){
   s.hEdit.style.color='blue';
}
function FColumnEdit_onZoomClick(s, e){
   var o = this;
   o.table.clickRow(s.row);
   var r = s.row.saveRow();
   var v = r.get(o.zoomField)
   if(!RString.isEmpty(v)){
      o.doZoom(v);
   }
}
function FGrid(o) {
   o = RClass.inherits(this, o, FGridControl);
   o.onResizeAfter = FGrid_onResizeAfter;
   o.onBuildData   = FGrid_onBuildData;
   o.oeResize      = FGrid_oeResize;
   o.oeRefresh     = FGrid_oeRefresh;
   o.pushColumn    = FGrid_pushColumn;
   return o;
}
function FGrid_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FGrid_onBuildData(){
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#29BAD5';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead = RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#29BAD5';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
}
function FGrid_oeResize(e){
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
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function FGrid_oeRefresh(e){
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
         ca.setWidth(Math.max(aw - 2, ca.width ? ca.width : 120));
      }
   }
}
function FGrid_pushColumn(c){
   var o = this;
   if(c.dispFixed){
      o.hFixHead.appendChild(c.hPanel);
      o.hFixSearch.appendChild(c.hSearchPanel);
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      o.hHead.appendChild(c.hPanel);
      o.hSearch.appendChild(c.hSearchPanel);
      o.hRowLine.appendChild(c.hFixPanel);
   }
   o.push(c);
}
function FGridControl(o) {
   o = RClass.inherits(this, o, FContainer, MValue, MDataset, MDisplay, MFocus, MForm, MProgress, MHorizontal, MLsnLoaded, MLsnSelect, MLsnClick, MLsnKey);
   o._formName              = RClass.register(o, new APtyString('formName'));
   o._formCustom            = RClass.register(o, new APtyBoolean('formCustom'), false);
   o._formParameter         = RClass.register(o, new APtyString('formParameter'));
   o._formLinked            = RClass.register(o, new APtyBoolean('formLinked'), false);
   o._dispRowbar            = RClass.register(o, new APtyBoolean('dispRowbar'), false);
   o._dispSelected          = RClass.register(o, new APtyBoolean('dispSelected'), false);
   o._dispCount             = RClass.register(o, new APtyInteger('dispCount'), 20);
   o._rowHeight             = RClass.register(o, new APtyInteger('rowHeight'), 0);
   o._panelTitle            = RClass.register(o, new APtySet('panelTitle', 'panelAccess', EGridDisplay.Title, false));
   o._panelHead             = RClass.register(o, new APtySet('panelHead', 'panelAccess', EGridDisplay.Head, false));
   o._panelSearch           = RClass.register(o, new APtySet('panelSearch', 'panelAccess', EGridDisplay.Search, false));
   o._panelTotal            = RClass.register(o, new APtySet('panelTotal', 'panelAccess', EGridDisplay.Total, false));
   o._panelNavigator        = RClass.register(o, new APtySet('panelNavigator', 'panelAccess', EGridDisplay.Navigator, false));
   o._styleBorderPanel      = RClass.register(o, new AStyle('BorderPanel'));
   o._styleHeadPanel        = RClass.register(o, new AStyle('HeadPanel'));
   o._styleHeadForm         = RClass.register(o, new AStyle('HeadForm'));
   o._styleHeadLine         = RClass.register(o, new AStyle('HeadLine'));
   o._styleSearchLine       = RClass.register(o, new AStyle('SearchLine'));
   o._styleDataPanel        = RClass.register(o, new AStyle('DataPanel'));
   o._styleDataForm         = RClass.register(o, new AStyle('DataForm'));
   o._styleHintForm         = RClass.register(o, new AStyle('HintForm'));
   o._styleHint             = RClass.register(o, new AStyle('Hint'));
   o._styleButton           = RClass.register(o, new AStyle('Button'));
   o._styleButtonIcon       = RClass.register(o, new AStyleIcon('Button'));
   o.__rowClass             = FRow;
   o.__dataset              = null;
   o.__focusCell            = null;
   o.__focusRow             = null;
   o.__hoverRow             = null;
   o.__clickRowEvent        = null;
   o.__doubleClickRowEvent  = null;
   o.__loadActive           = null;
   o._statusColumn          = null;
   o._loadFinish            = false;
   o.__isSearching          = false;
   o._esize                 = ESize.Both;
   o._minHeight             = 70;
   o.border                 = null;
   o._columns                = null;
   o.buttons                = null;
   o.rows                   = null;
   o.hPanel                 = null;
   o.hCaption               = null;
   o.hBorderPanel           = null;
   o.hFixPanel              = null;
   o.hFixForm               = null;
   o.hFixHead               = null;
   o.hFixSearchLine         = null;
   o.hHeadPanel             = null;
   o.hHeadForm              = null;
   o.hHead                  = null;
   o.hSearch                = null;
   o.hColumnPanel           = null;
   o.hColumnForm            = null;
   o.hDataPanel             = null;
   o.hDataForm              = null;
   o.hFixRowLine            = null;
   o.hFixRows               = null;
   o.hRows                  = null;
   o.hRowLine               = null;
   o.hDelayPanel            = null;
   o.hDelayText             = null;
   o.hNavigator             = null;
   o.hFottor                = null;
   o.hButtons               = null;
   o.lsnsRowClick           = null;
   o.lsnsRowDblClick        = null;
   o.onMouseDown            = FGridControl_onMouseDown;
   o.onHeadMouseDown        = RClass.register(o, new HMouseDown('onHeadMouseDown'), FGridControl_onHeadMouseDown);
   o.onHeadMouseMove        = RClass.register(o, new HMouseMove('onHeadMouseMove'), FGridControl_onHeadMouseMove);
   o.onHeadMouseUp          = RClass.register(o, new HMouseUp('onHeadMouseUp'), FGridControl_onHeadMouseUp);
   o.onDataScroll           = RClass.register(o, new HScroll('onDataScroll'), FGridControl_onDataScroll);
   o.onCellKeyDown          = RClass.register(o, new HKeyDown('onCellKeyDown'), FGridControl_onCellKeyDown);
   o.onRowMouseEnter        = RClass.register(o, new HMouseEnter('onRowMouseEnter'), FGridControl_onRowMouseEnter);
   o.onRowMouseLeave        = RClass.register(o, new HMouseLeave('onRowMouseLeave'), FGridControl_onRowMouseLeave);
   o.onRowClick             = RClass.register(o, new HClick('onRowClick'), FGridControl_onRowClick);
   o.onColumnSearchKeyDown  = RClass.register(o, new HKeyDown('onColumnSearchKeyDown'), FGridControl_onColumnSearchKeyDown);
   o.onButtonMouseDown      = RClass.register(o, new HMouseDown('onButtonMouseDown'), FGridControl_onButtonMouseDown);
   o.onPageCountDown        = RClass.register(o, new HKeyDown('onPageCountDown'), FGridControl_onPageCountDown);
   o.onInsertButtonClick    = FGridControl_onInsertButtonClick;
   o.onExtendButtonClick    = FGridControl_onExtendButtonClick;
   o.onDsPrepare            = RMethod.empty;
   o.onResizeAfter          = RMethod.virtual(o, 'onResizeAfter');
   o.onLoadDatasetDelay     = FGridControl_onLoadDatasetDelay;
   o.onLoadDataset          = FGridControl_onLoadDataset;
   o.clearSelectAll         = FGridControl_clearSelectAll;
   o.onLoadDatasetEnd       = RMethod.empty;
   o.onBuildTitle           = FGridControl_onBuildTitle;
   o.onBuildData            = RMethod.virtual(o, 'onBuildData');
   o.onBuildHint            = FGridControl_onBuildHint;
   o.onBuildPanel           = RBuilder.onBuildTablePanel;
   o.oeBuild                = FGridControl_oeBuild;
   o.oeMode                 = FGridControl_oeMode;
   o.oeProgress             = FGridControl_oeProgress;
   o.construct              = FGridControl_construct;
   o.buildNavigatorButton   = FGridControl_buildNavigatorButton;
   o.isFormLinked           = FGridControl_isFormLinked;
   o.isDataSelected         = FGridControl_isDataSelected;
   o.isDataChanged          = FGridControl_isDataChanged;
   o.hasAction              = FGridControl_hasAction;
   o.loadValue              = RMethod.empty;
   o.saveValue              = RMethod.empty;
   o.getFormLink            = FGridControl_getFormLink;
   o.getHeadMode            = FGridControl_getHeadMode;
   o.getRowBar              = FGridControl_getRowBar;
   o.calculateDataSize      = FGridControl_calculateDataSize;
   o.createRow              = FGridControl_createRow;
   o.insertRow              = FGridControl_insertRow;
   o.syncRow                = FGridControl_syncRow;
   o.getDataCodes           = RMethod.empty;
   o.getCurrentRow          = FGridControl_getCurrentRow;
   o.getSelectedRow         = FGridControl_getSelectedRow;
   o.getSelectedRows        = FGridControl_getSelectedRows;
   o.getCurrentRows         = FGridControl_getChangedRows;
   o.getChangedRows         = FGridControl_getChangedRows;
   o.getRows                = FGridControl_getRows;
   o.refreshHint            = FGridControl_refreshHint;
   o.refreshSelected        = FGridControl_refreshSelected;
   o.hoverRow               = FGridControl_hoverRow;
   o.selectRow              = FGridControl_selectRow;
   o.clearSelectRow         = FGridControl_clearSelectRow;
   o.clearSelectRows        = FGridControl_clearSelectRows;
   o.clickCell              = FGridControl_clickCell;
   o.clickRow               = FGridControl_clickRow;
   o.doubleClickRow         = FGridControl_doubleClickRow;
   o.setDataStatus          = FGridControl_setDataStatus;
   o.dsInsert               = FGridControl_dsInsert;
   o.dsUpdate               = FGridControl_dsUpdate;
   o.dsDelete               = FGridControl_dsDelete;
   o.doPrepare              = RMethod.empty;
   o.doDelete               = RMethod.empty;
   o.doSearch               = FGridControl_doSearch;
   o.push                   = FGridControl_push;
   o.pushColumn             = RMethod.virtual(o, 'pushColumn');
   o.pushButton             = FGridControl_pushButton;
   o.focus                  = FGridControl_focus;
   o.pack                   = FGridControl_pack;
   o.setVisible             = FGridControl_setVisible;
   o.setButtonVisible       = FGridControl_setButtonVisible;
   o.hideRows               = FGridControl_hideRows;
   o.hasVisibleRow          = FGridControl_hasVisibleRow
   o.refreshStyle           = FGridControl_refreshStyle;
   o.dispose                = FGridControl_dispose;
   o.dump                   = FGridControl_dump;
   o.onColumnTreeClick      = RClass.register(o, new HClick('onColumnTreeClick'), FGridControl_onColumnTreeClick);
   o.onColumnTreeService    = FGridControl_onColumnTreeService;
   o.hoverMode              = EColumnMode.None;
   o.__searchKeyDownEvent   = new TEvent();
   o.createChild            = FGridControl_createChild;
   o.buildRow               = FGridControl_buildRow;
   o.buildRows              = FGridControl_buildRows;
   o.appendRow              = FGridControl_appendRow;
   o.deleteRow              = FGridControl_deleteRow;
   o.clearRows              = FGridControl_clearRows;
   o.getRowType             = FGridControl_getRowType;
   o.setStyleStatus         = FGridControl_setStyleStatus;
   return o;
}
function FGridControl_pushButton(b){
   var o = this;
   var hc  = o.hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b.hPanel);
   o.push(b);
}
function FGridControl_onMouseDown(e, he){
   var o = this;
   var fc = RConsole.find(FFocusConsole);
   fc.focusClass(MDataset, o);
   fc.focusHtml(he);
   if(!RConsole.find(FDesignConsole).isDesign()){
      he.cancelBubble = true;
   }
}
function FGridControl_onHeadMouseDown(e){
   var o = this;
   var m = o.getHeadMode(e);
   if(EColumnMode.Size == m){
      o.hoverMode = EColumnMode.Size;
      e.srcElement.status = EColumnMode.Size;
      o.hoverX = e.srcElement.offsetLeft + e.x;
      o.hoverDataCell = null;
      if(o.hDataForm.rows.length){
         o.hoverDataCell = o.hDataForm.rows[0].cells[o.hoverHead.index];
      }
      o.hHeadForm.setCapture();
   }
}
function FGridControl_onHeadMouseMove(e){
   var o = this;
   if(EColumnMode.Size == o.hoverMode){
      var bl = o.hoverCellLength;
      var mx = e.srcElement.offsetLeft + e.x;
      var w =  mx - o.hoverX + bl;
      if(w > 0){
         o.hoverHead.hPanel.style.pixelWidth = w;
         o.hoverHead.hFixPanel.style.pixelWidth = w;
      }
   }else if(EColumnMode.None == o.hoverMode){
      var m = o.getHeadMode(e);
      var c = 'default';
      if(EColumnMode.Size == m){
         c = 'e-resize';
      }else if(EColumnMode.Drag == m){
         c = 'hand';
      }
      o.hHeadForm.style.cursor = c;
   }
}
function FGridControl_onHeadMouseUp(e){
   var o = this;
   if(EColumnMode.Size == o.hoverMode){
      o.hHeadForm.releaseCapture();
   }
   o.hoverMode = EColumnMode.None;
}
function FGridControl_onDataScroll(){
   var o = this;
   o.hHeadPanel.scrollLeft = o.hDataPanel.scrollLeft;
   o.hColumnPanel.scrollTop = o.hDataPanel.scrollTop;
}
function FGridControl_onCellKeyDown(c, e, he){
   var o = this;
   var k = e.keyCode;
   var l = c.column;
   var r = c.row;
   if(EKey.Up == k) {
      l.moveCellFocus(r, EPosition.Top);
      RKey.eventClear(he);
   }else if(EKey.Down == k) {
      l.moveCellFocus(r, EPosition.Bottom);
      RKey.eventClear(he);
   }else if(EKey.Tab == k && e.shiftKey){
      l.moveCellFocus(r, EPosition.Before);
      RKey.eventClear(he);
   }else if(EKey.Tab == k){
      l.moveCellFocus(r, EPosition.After);
      RKey.eventClear(he);
   }
}
function FGridControl_onRowMouseEnter(s, e){
   this.hoverRow(s, true);
}
function FGridControl_onRowMouseLeave(s, e){
   this.hoverRow(s, false);
}
function FGridControl_onRowClick(s, e){
   var o = this;
   o.selectRow(s, !e.ctrlKey, true);
   o.lsnsRowClick.process(s);
   var e = o._eventRowClick;
   if(!e){
      e = o._eventRowClick = new TEvent();
      e.source = o;
   }
   e.caller = s;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
}
function FGridControl_onColumnSearchKeyDown(s, e){
   var o = this;
   if(EKey.Enter == e.keyCode){
      if(!o._isSearching || !o.table._isSearching){
         o._isSearching = true;
         if(o.table){
        	 o.table.doSearch();
             o.table.dpScrollLeft = o.table.hDataPanel.scrollLeft;
             o.table.callEvent('onSearchKeyDown', o, o.__searchKeyDownEvent);
         }else{
            o.doSearch();
            o.dpScrollLeft = o.hDataPanel.scrollLeft;
            o.callEvent('onSearchKeyDown', o, o.__searchKeyDownEvent);
         }
      }
   }
}
function FGridControl_onButtonMouseDown(e){
   var o = this;
   var ds = o.dsViewer;
   if(!ds || 0 == ds.dataset.pageCount){
      return;
   }
   var h = e.hSource;
   if(o.hInsertButton == h){
      o.onInsertButtonClick();
   }else if(o.hExtendButton == h){
      o.onExtendButtonClick();
   }else if (o.hNavFirst == h && ds.pageIndex != 0){
      o.dsMovePage(EDataAction.First);
   } else if (o.hNavPrior == h && ds.pageIndex != 0){
      o.dsMovePage(EDataAction.Prior);
   } else if (o.hNavNext == h && ds.pageIndex != ds.pageCount - 1){
      o.dsMovePage(EDataAction.Next);
   } else if (o.hNavLast == h && ds.pageIndex != ds.pageCount - 1){
      o.dsMovePage(EDataAction.Last);
   }
}
function FGridControl_onPageCountDown(e){
   var o = this;
   var ds = o.dsViewer;
   if(RString.isEmpty(o.hPage.value) || !ds || 0 == ds.dataset.pageCount){
      return;
   }
   var n = RInt.parse(o.hPage.value);
   if(EKey.Enter == e.keyCode && n != ds.pageIndex + 1){
      if(n < 1){
         n = 1;
      }
      if(n > ds.pageCount){
         n = ds.pageCount;
      }
      o.dsMovePage(n - 1);
   }
}
function FGridControl_onInsertButtonClick(){
   RFormSpace.doPrepare(this);
}
function FGridControl_onExtendButtonClick(){
   var o = this;
   if(400 == o.dsPageSize){
      o.dsPageSize = o.dsPageSizeStore;
      o.hExtendText.innerText = ' 展开';
   }else{
      o.dsPageSizeStore = o.dsPageSize;
      o.dsPageSize = 400;
      o.hExtendText.innerText = ' 收缩';
   }
   o.dsSearch();
}
function FGridControl_onLoadDatasetDelay(a){
   var o = this;
   o.psProgress(true);
   var v = o.dsViewer;
   var c = o._dispCount;
   var h = o._rowHeight;
   var idx = a.index;
   var m = idx + a.acceleration;
   if( m > v.count - 1){
      m = v.count - 1;
   }
   if(o.hHeadPanel){
      o.hHeadPanel.scrollLeft = 0;
   }
   if(o.hColumnPanel){
      o.hColumnPanel.scrollTop = 0;
   }
   o.syncRow(m);
   for(var n = idx; n <= m; n++){
      var r = o.syncRow(n);
      if(h>0) {
     	 r.hFixPanel.height = h;
      }
      if(v.next()){
         r.loadRow(v.current());
         r.recordValue();
         r.setVisible(true);
         r.refreshStyle();
      }else{
         r.setVisible(false);
      }
   }
   if(m == v.count-1){
      m = v.count-1;
      a.status = EActive.Sleep;
      o.hDelayPanel.style.display = 'none';
      var rs = o.rows;
      for(var n=m+1; n<rs.count; n++){
         rs.get(n).setVisible(false);
      }
      o.topControl().topResize();
      o._isSearching = false;
      RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, o, o);
   }
   if((m+1) != v.count){
      o.hDelayPanel.filters[0].opacity = 100 - (100/v.count)// (m+1);
   }
   a.acceleration++;
   a.index += a.acceleration;
   o._loadFinish = true;
   o._isSearching = false;
   o.dsLoaded();
   o.psProgress(false);
}
function FGridControl_onLoadDataset(ds, da){
   var o = this;
   o.__dataset = ds;
   if(o.hColumnPanel){
      o.hColumnPanel.scrollTop = 0;
      o.hColumnPanel.scrollLeft = 0;
   }
   if(o.hDataPanel){
	  o.hDataPanel.scrollTop = 0;
	  o.hDataPanel.scrollLeft = 0;
   }
   var v = o.dsViewer;
   if(v.isEmpty()){
      o.hideRows();
      o.topControl().topResize();
      o._isSearching = false;
      o._loadFinish = true;
      o.dsLoaded();
      o.psProgress(false);
      return;
   }
   ds.saveViewer(v);
   var a = o.__loadActive;
   a.interval = 0;
   a.index = 0;
   a.acceleration = 100;
   a.dataAction = da;
   a.status = EActive.Active;
   v.reset();
   o.psProgress(true);
   o.psRefresh();
   if(o.hHint){
      o.refreshHint();
   }
   o.refreshSelected();
   if(o.hPage){
      o.hPage.value = ds.pageIndex + 1;
   }
}
function FGridControl_onBuildTitle(e){
   var o = this;
   var hcf = o.hTitleForm = RBuilder.appendTable(o.hBorderPanel);
   hcf.width = '100%';
   hcf.height = '20';
   hcf.style.borderBottom = '1 solid #999999';
   var hcr = o.hCaptionLine = hcf.insertRow();
   var hcc = hcr.insertCell();
   hcc.style.backgroundImage = 'url(' + RResource.iconPath('ctl.FGridControl_Head') + ')';
   hcc.height = '20';
   hcc.align = 'center';
   hcc.innerText = o.label;
   hcc.style.fontWeight = 'bold';
   hcc.style.color = '#176877';
   hcc.style.display = o._panelTitle ? 'block' : 'none';
   hbc = hcf.insertRow();
   hdc = hbc.insertCell();
   hdc.style.backgroundColor='#CAE9FE';
   hdc.style.borderTop='1 solid #95C6FE';
   hbf = o.hButtonForm = RBuilder.appendTable(hdc);
   hb = o.hButtons = hbf.insertRow();
   hdc.style.display = o._panelTitle ? 'block' : 'none';
}
function FGridControl_onBuildHint(e) {
   var o = this;
   var hr = o.hHintForm.insertRow();
   if(o.editInsert && o._formName){
      var hc = hr.insertCell();
      hc.width = 60;
      o.hInsertButton = o.buildNavigatorButton(hc, 'ctl.FGridControl_insert', '&nbsp;新建', null, 'hInsert');
   }
   var hc = hr.insertCell();
   hc.width = 10;
   var hc = hr.insertCell();
   hc.noWrap = true;
   o.hHint = RBuilder.appendText(hc, '', o.style('Hint'))
   var hc = hr.insertCell();
   hc.noWrap = true;
   hc.align = 'right';
   o.hNavFirst = o.buildNavigatorButton(hc, 'ctl.FGridControl_first', '&nbsp;'+RContext.get('FGridControl:First'));
   o.hNavPrior = o.buildNavigatorButton(hc, 'ctl.FGridControl_prior', '&nbsp;'+RContext.get('FGridControl:Prior'));
   o.hNavPrior.style.paddingRight = '20';
   o.hPage = RBuilder.appendEdit(hc)
   o.hPage.style.width = 40;
   o.attachEvent('onPageCountDown', o.hPage);
   o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Next')+'&nbsp;', 'ctl.FGridControl_next');
   o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Last')+'&nbsp;', 'ctl.FGridControl_last');
}
function FGridControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      if(!o.height || o.height < 160){
         o.height = '100%';
      }
   }
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hpl = o.hPanel.insertRow();
      var b = o.border = new TBorder(EBorder.Round);
      b.build(hpl.insertCell());
      var hbf = b.hForm;
      hbf.width = '100%';
      hbf.height = '100%';
      var hc = hpl.insertCell();
      hc.width = 1;
      var hd = o.hFixHeight = RBuilder.appendDiv(hc);
      hd.style.width = 1;
      hd.style.height = o._minHeight;
      var hbp = o.hBorderPanel = b.hPanel;
      hbp.className = o.style('BorderPanel');
      hbp.vAlign = 'top';
      hbp.style.position = 'relative';
      hbp.style.overflow = 'hidden';
      o.onBuildTitle(e);
      o.onBuildData(e);
      if(o._panelNavigator){
         var hnp = o.hNavigator = o.hPanel.insertRow().insertCell();
         hnp.height = 1;
         o.hHintForm = RBuilder.appendTable(hnp, o.style('HintForm'));
         o.onBuildHint(e);
      }
   }else if (e.isAfter()) {
	  o.border.setBorderColor('#9EC4EB');
      var cs = o._columns;
      var cc = cs.count;
      for(var n=0; n<cc; n++){
         o.pushColumn(cs.value(n));
      }
      for(var n=0; n<cc; n++){
         var c = o._columns.value(n);
         c.index = n;
      }
      var cnt = o.rows.count;
      for(var n=0; n<cnt; n++){
         o.buildRow(o.rows.get(n));
      }
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
    	  o.pushButton(bs.value(n));
      }
      o.dsPageSize = o._dispCount;
   }
   return r;
}
function FGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.base.FContainer.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   return EEventStatus.Stop;
}
function FGridControl_oeProgress(e){
   var o = this;
   if('none' == o.hPanel.currentStyle.display){
      return;
   }
   var hdp = o.hDelayPanel;
   if(!hdp){
      hdp = o.hDelayPanel = RBuilder.appendDiv(o.hBorderPanel);
      var st = hdp.style;
      st.position = 'absolute';
      st.zIndex = RLayer.next();
      st.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
      st.backgroundColor = '#FFFFFF';
      st.top = 0;
      st.width = '100%';
      st.height = '100%';
      st.display = 'none';
      var hdf = o.hDelayForm = RBuilder.appendTable(hdp);
      hdf.style.width = '100%';
      hdf.style.height = '100%';
      var hc = hdf.insertRow().insertCell();
      hc.align = 'center';
      hc.vAlign = 'middle';
      RBuilder.appendIcon(hc, 'ctl.FGridControl_Loading')
      var t = o.hDelayText = RBuilder.append(hc, 'SPAN');
      t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FGridControl:Loading') + "</B></FONT>";
   }
   if(e.enable){
      RHtml.setRect(hdp, o.calculateDataSize());
      hdp.filters[0].opacity = 100;
      hdp.style.display = 'block';
   }else{
	   if(o._loadFinish){
         hdp.style.display = 'none';
	   }
   }
   o.refreshHint();
   return EEventStatus.Stop;
}
function FGridControl_construct() {
   var o = this;
   o.base.FContainer.construct.call(o);
   o.base.MDataset.construct.call(o);
   o._columns = new TMap();
   o.buttons = new TMap();
   o.rows = new TList();
   if(o._dispCount < 0){
      o.dsPageSize = 400;
   }
   o.lsnsRowClick = new TListeners();
   o.lsnsRowDblClick = new TListeners();
   o.__clickRowEvent = new TEvent();
   o.__doubleClickRowEvent = new TEvent();
   var col = o._statusColumn = RControl.create(FColumnStatus);
   col.table = this;
   col.name = '_s';
   o._columns.set(col.name, col);
   var cols = o._selectColumn = RControl.create(FColumnSelected);
   cols.table = this;
   cols.name = '_select';
   o._columns.set(cols.name, cols);
   var a = o.__loadActive = new TActive(o, o.onLoadDatasetDelay);
   a.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(a);
   o.eventResizeAfter = new TEvent(o, 'ResizeAfter', o.onResizeAfter);
}
function FGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name) {
   var o = this;
   var h = RBuilder.append(hParent, 'SPAN', o.style('Button'));
   h.style.cursor = 'hand';
   h.style.paddingLeft = '10';
   o.attachEvent('onButtonMouseDown', h);
   if (iconBf) {
      RBuilder.appendIcon(h, iconBf);
   }
   if(text){
      if(name){
         o[name + 'Text'] = RBuilder.appendText(h, text);
      }else{
         RBuilder.appendText(h, text);
      }
   }
   if(iconAf){
      RBuilder.appendIcon(h, iconAf);
   }
   return h;
}
function FGridControl_isFormLinked(){
   return this._formLinked || this._formName;
}
function FGridControl_isDataSelected(){
   var rs = this.rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isSelect){
         return true;
      }
   }
}
function FGridControl_isDataChanged(){
   var rs = this.rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isDataChanged()){
         return true;
      }
   }
}
function FGridControl_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return o.isDataSelected();
      }
   }
}
function FGridControl_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return this._formName;
   }else if(EFormLink.Table == t){
      return this.name;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FGridControl_getHeadMode(e){
   var o = this;
   var p = RHtml.point(o.hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o._columns;
   for(var n = 0; n<cs.count; n++){
      var c = cs.value(n);
      if(c.dispSize){
         var l = c.hPanel.offsetLeft + c.hPanel.offsetWidth - p.x;
         o.hoverCellLength = c.hPanel.offsetWidth;
         if(l - 6 <= x && x<=l){
            o.hoverHead = c;
            return EColumnMode.Size;
         }
      }
   }
   return EColumnMode.None;
}
function FGridControl_getRowBar(){
   var o = this;
   var rb = o._rowBar;
   if(!rb){
      rb = o._rowBar = RClass.create(FRowBar);
      rb.table = o;
      rb.psBuild(o.hBorderPanel);
   }
   return rb;
}
function FGridControl_calculateDataSize(){
   var o = this;
   var r = o.__dataRect;
   if(!r){
      r = o.__dataRect = new TRect();
   }
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o.hFixPanel ? o.hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}
function FGridControl_createRow() {
   var o = this;
   var r = RClass.create(o.__rowClass);
   r.table = r.parent = o;
   return r;
}
function FGridControl_hasVisibleRow() {
   var o = this;
   var rs = o.rows;
   for(var n = 0; n<rs.count; n++){
	   var rt = rs.get(n);
	   if(rt.__visible){
	      return true;
	   }
   }
   return false;
}
function FGridControl_insertRow(i, r){
   var o = this;
   r.index = i;
   r.build();
   if(r.hFixPanel){
      o.hFixRows.appendChild(r.hFixPanel);
      RHtml.tableMoveRow(o.hColumnForm, r.hFixPanel.rowIndex, i + 2);
   }
   o.hRows.appendChild(r.hPanel);
   RHtml.tableMoveRow(o.hDataForm, r.hPanel.rowIndex, i + 2);
   r.refreshStyle();
   o.rows.insert(i, r);
}
function FGridControl_syncRow(i){
   var o = this;
   var rs = o.rows;
   var r = rs.get(i);
   if(!r){
      for(var n = rs.count; n <= i; n++){
         r = o.createRow();
         r.index = n;
         r.build();
         if(r.hFixPanel){
            o.hFixRows.appendChild(r.hFixPanel);
         }
         o.hRows.appendChild(r.hPanel);
         rs.push(r);
      }
   }
   r.extended = false;
   if(r.childRows){
      r.hideChild();
      r.childRows.clear();
   }
   return r;
}
function FGridControl_getCurrentRow(){
   var c = this.__focusCell;
   if(c){
      return c.row.saveRow();
   }
}
function FGridControl_getSelectedRow(){
   var rs = this.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect){
         return r;
      }
   }
}
function FGridControl_getSelectedRows(){
   var ls = new TList();
   var rs = this.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect && r.isVisible()){
         ls.push(r.saveRow());
      }
   }
   return ls;
}
function FGridControl_getChangedRows(){
   var ls = new TList();
   var rs = this.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isVisible()){
	      if(r.isDataChanged()){
	         ls.push(r.saveRow());
	      }
      }
   }
   return ls;
}
function FGridControl_getRows(){
   var ls = new TList();
   var rs = this.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
	  var r = rs.get(n);
	  if(r.isVisible()){
         ls.push(r.saveRow());
	  }
   }
   return ls;
}
function FGridControl_refreshHint(){
   var o = this;
   var h = o.hHint;
   var ds = o.__dataset;
   if(ds && h){
      var ci = 0;
      var r = o.getSelectedRow();
      if(r){
         ci = o.rows.indexOf(r)+1;
      }
      h.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>"+ds.pageCount +"</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>"+ds.total +"</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(ds.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
      o.hPage.value = ds.pageIndex + 1;
   }
}
function FGridControl_refreshSelected(){
	var o = this;
	var cs = o._columns;
	var sc = cs.get('_select');
	sc.hSelected.checked = false;
	var rs = o.rows;
	var rc = rs.count;
	for(var n = 0; n < rc; n++){
	   var r = rs.get(n);
	   r.isSelect = false;
	}
}
function FGridControl_hoverRow(r, f){
   var o = this;
   if(f){
      o.__hoverRow = r;
      r.refreshStyle();
   }else{
      if(o.__hoverRow == r){
         o.__hoverRow = null;
      }
      r.refreshStyle();
   }
}
function FGridControl_selectRow(row, reset, force) {
   var o = this;
   var has = false;
   if(reset){
      var rs = o.rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r != row && r.isSelect){
            r.select(false);
            has = true;
         }
      }
   }
   row.select(has || !row.isSelect || force);
   o.refreshHint();
}
function FGridControl_clearSelectRow(row) {
   var o = this;
   row.select(false);
   o.refreshHint();
}
function FGridControl_clearSelectRows() {
    var o = this;
    var rs = o.rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
}
function FGridControl_clickCell(c){
   this.__focusCell = c;
}
function FGridControl_clickRow(r){
   var o = this;
   o.lsnsRowClick.process(r);
   o.__focusRow = r;
   if(o.callEvent('onTableRowClick', r)){
	   return;
   }
   var e = o.__clickRowEvent;
   e.source = o;
   e.caller = r;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
   if(o.isLov){
      o.doubleClickRow(r);
   }
}
function FGridControl_doubleClickRow(r){
   var o = this;
   o.lsnsRowDblClick.process(r);
   if(o.callEvent('onTableRowDoubleClick', r)){
      return;
   }
   var e = o.__doubleClickRowEvent;
   e.source = o;
   e.caller = r;
   e.handle = 'onTableRowDoubleClick';
   RConsole.find(FFormConsole).processEvent(e);
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowDblClick, r, r)
}
function FGridControl_setDataStatus(r, s) {
   var o = this;
   r.dataStatus = s;
   o._statusColumn.setDataStatus(r, s);
}
function FGridControl_dsInsert() {
}
function FGridControl_dsUpdate(r){
   var o = this;
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
function FGridControl_dsDelete() {
}
function FGridControl_doSearch(){
   var o = this;
   o.dsSearchs.clear();
   var cs = o._columns;
   for(var n=0; n<cs.count; n++){
      var c = cs.value(n);
      var v = c.searchValue();
      if(RClass.isClass(c, FColumnCalendar)){
         if(v){
            var si = new TSearchItem();
            si.set(c.dataName, v.value, ESearch.Date, v.format);
            o.dsSearchs.push(si);
         }
      }else{
         if(!RString.isEmpty(v)){
            var si = new TSearchItem();
            si.set(c.dataName, v, ESearch.Like);
            o.dsSearchs.push(si);
         }
      }
   }
   o.dsValues = o.toDeepAttributes();
   o.dsSearch();
}
function FGridControl_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FColumn)){
      c.table = o;
      o._columns.set(c.name, c);
   }else if(RClass.isClass(c, FTableButton)){
      c.table = o;
      o.buttons.set(c.name, c);
   }
}
function FGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FGridControl_pack(){
   var o = this;
   var rfs = o.rows;
   var ct = rfs.count;
   var root = new TNode('Dataset');
   for(var n = 0; n < ct; n++){
      var r = rfs.get(n);
      if(r.isDataChanged()){
         var atts = r.toAttrs();
         var nd = new TNode('Row', atts)
         root.push(nd);
      }
   }
   return root;
}
function FGridControl_setVisible(v){
   var o = this;
   o.base.FContainer.setVisible.call(o, v);
   o.base.MHorizontal.setVisible.call(o, v);
}
function FGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o.buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}
function FGridControl_hideRows(){
   var o = this;
   var rs = o.rows;
   for(var n = rs.count-1; n >= 0 ; n--){
      rs.get(n).setVisible(false);
   }
}
function FGridControl_refreshStyle(){
   var o = this;
   var rs = o.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      rs.get(n).refreshStyle();
   }
}
function FGridControl_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hBorderPanel = null;
   o.hDelayPanel = null;
   o.hDelayForm = null;
   o.hFixPanel = null;
   o.hFixForm = null;
   o.hFixHead = null;
   o.hFixSearch = null;
   o.hHeadPanel = null;
   o.hHeadForm = null;
   o.hHead = null;
   o.hSearch = null;
   o.hColumnPanel = null;
   o.hColumnForm = null;
   o.hFixRows = null;
   o.hFixRowLine = null;
   o.hDataPanel = null;
   o.hDataForm = null;
   o.hRows = null;
   o.hRowLine = null;
   o.hHintForm = null;
   o.hInsertButton = null;
   o.hExtendButton = null;
   o.hExtendText = null;
}
function FGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   var rs = o.rows;
   for(var n = 0; n < rs.count; n++) {
      s.appendLine(rs.get(n).dump());
   }
   return s;
}
function FGridControl_storeValues(a){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var s = o.getSelectRows();
   if(s.count){
      if(1 != s.count){
         RMessage.fatal(o, 'Invalid selected rows. (count={0})', s.count);
      }
      s.get(0).toAttributes(a);
   }
   return a;
}
function FGridControl_buildRows(){
   return;
   var o = this;
   var rs = o.rows;
   if(!rs.count){
      var c = o._dispCount;
      for(var n = 0; n < c; n++){
         var r = RClass.create(FRow);
         r.table = this;
         r.build();
         o.hRows.appendChild(r.hPanel);
         rs.push(r);
      }
   }
}
function FGridControl_createChild(config) {
   var o = this;
   var c = o.base.FContainer.createChild.call(o, config);
   if(RClass.isClass(c, FRow)){
      c.table = o;
      c.row = o.dsLoadRowNode(config);
      o.rows.push(c);
      return null;
   }else if(RClass.isClass(c, FColumnEditControl)){
      c.table = o;
   }
   return c;
}
function FGridControl_setStyleStatus(row, status) {
   var hRow = row.hPanel;
   if (hRow) {
      switch (status) {
         case EStyle.Normal:
            row.select(false);
            break;
         case EStyle.Select:
            row.select(true);
            break;
      }
   }
}
function FGridControl_buildRow(row) {
   var o = this;
   var cs = o._columns;
   for ( var n = 0; n < cs.count; n++) {
      var c = cs.value(n);
      var cell = c.createCell(row);
      if(c.dataName){
         cell.set(RString.nvl(row.get(c.dataName), c.dataDefault));
      }
      row.push(cell);
   }
   return row;
}
function FGridControl_clearSelectAll() {
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
}
function FGridControl_appendRow(row) {
   this.hRows.appendChild(row.hRow);
   this.rows.push(row);
}
function FGridControl_deleteRow(r) {
   var o = this;
   r = RObject.nvl(r, o.selectedRow);
   if (!r) {
      return alert('Please select row.');
   }
   if (r.isExist()) {
      if (r.isDelete()) {
         r.doNormal();
         o.setDataStatus(r, EDataStatus.Unknown);
         o.setStyleStatus(r, EStyle.Select);
      } else {
         r.doDelete();
         o.setDataStatus(r, EDataStatus.Delete);
         o.setStyleStatus(r, EStyle.Delete);
      }
   } else {
      r.release();
   }
}
function FGridControl_clearRows() {
   var o = this;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      var r = o.rows.get(n);
      if(r){
         r.dispose();
      }
   }
   o.rows.clear();
   RHtml.clear(o.hRows);
}
function FGridControl_onColumnTreeService(g){
   var o = this;
   var d = g.resultDatasets.get(g.path);
   var rs = d.rows;
   if(rs && rs.count > 0){
      var pr = o.focusRow;
      pr.extdStatus = true;
      pr.psResize();
      var idx = pr.hPanel.rowIndex + 1;
      for(var n = 0; n < rs.count; n++){
         var r = RClass.create(FRow);
         r.table = o;
         pr.childRows.push(r);
         r.parentRow = pr;
         r.buildChild(o.hFixRows, o.hRows, idx + n);
         r.loadRow(rs.get(n));
      }
   }
}
function FGridControl_getRowType(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FRowType)){
         return c;
      }
   }
}
function FGridControl_onColumnTreeClick(s, e){
   var o = this;
   var c = o.getRowType();
   if(!c){
      return;
   }
   var r = s.row;
   if(r.childRows && r.childRows.count > 0){
      if(r.extended){
         r.hideChild();
      }else{
         r.showChild();
      }
      r.extended = !r.extended;
      if(r.extended){
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
      }else{
         s.hImg.src = s.styleIconPath('Expend', FColumnTree);
      }
   }else{
      o.focusRow = s.row;
      if(o.focusRow.row.get('ochd') == 'Y'){
         s.row.extended = true;
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
         var name = s.row.get('otyp');
         var tb = s.row.table;
         var rt = tb.component(name);
         var ds = o.topControl(MDataset);
         var g = new TDatasetFetchArg(ds.name, ds.formId, ds.dsPageSize, ds.dsPageIndex, null, null, o.fullPath(), rt.formResearch);
         ds.dsSearchs.clear();
         if(rt && rt.formWhere){
            var si = new TSearchItem();
            si.set(rt.dataName, rt.formWhere, ESearch.Source);
            ds.dsSearchs.push(si);
         }
         g.force = true;
         g.reset = true;
         g.searchs = ds.dsSearchs;
         var ats = new TAttributes();
         s.row.toDeepAttributes(ats);
         g.values = ats;
         g.callback = new TInvoke(o, o.onColumnTreeService);
         RConsole.find(FDatasetConsole).fetch(g);
      }
   }
}
function FRow(o){
   o = RClass.inherits(this, o, FRowControl);
   o.hFixPanel    = null;
   o.build        = FRow_build;
   o.select       = FRow_select;
   o.setVisible   = FRow_setVisible;
   o.push         = FRow_push;
   o.refreshSize  = FRow_refreshSize;
   o.refreshStyle = FRow_refreshStyle;
   o.dispose      = FRow_dispose;
   return o;
}
function FRow_build(){
   var o = this;
   var t = o.table;
   o.hFixPanel = RBuilder.create(null, 'TR', o.style('Panel'));
   o.base.FRowControl.build.call(o);
}
function FRow_select(v){
   var o = this;
   o.isSelect = v;
   var c = v ? EColor.RowSelect : EColor.Row;
   o.hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   o.refreshStyle();
}
function FRow_setVisible(f){
   var o = this;
   o.__visible = f;
   var s = f ? 'block' : 'none';
   o.hFixPanel.style.display = s;
   o.hPanel.style.display = s;
}
function FRow_push(c){
   var o = this;
   o.base.FRowControl.push.call(o, c);
   if(c.column.dispFixed){
      o.hFixPanel.appendChild(c.hPanel);
   }else{
      o.hPanel.appendChild(c.hPanel);
   }
}
function FRow_refreshSize(){
   this.hPanel.style.pixelHeight = this.hFixPanel.offsetHeight;
}
function FRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o.hFixPanel.offsetHeight){
      o.hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o.hFixPanel.offsetHeight;
   }
   if(o.table.isLov){
      o.hFixPanel.style.cursor = 'hand';
   }
   o.base.FRowControl.refreshStyle.call(o);
}
function FRow_dispose(){
   var o = this;
   o.base.FRowControl.dispose.call(o);
   RMemory.freeHtml(o.hFixPanel);
   o.hFixPanel = null;
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
function FMenuBar(o){
   o = RClass.inherits(this, o, FContainer);
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._hLine            = null;
   o.onBuildPanel = FMenuBar_onBuildPanel
   o.onBuild          = FMenuBar_onBuild;
   o.appendButton     = FMenuBar_appendButton;
   return this;
}
function FMenuBar_onBuildPanel(e){
   var o = this;
   var hc = o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(hc);
}
function FMenuBar_appendButton(p){
   var o = this;
   var hr = o._hLine;
   var hc = RBuilder.appendTableCell(hr);
   p.setPanel(hc);
}
function FMenuBar_onBuild(builder){
   var doc = builder.document;
   this.hBody = doc.createDiv();
   this.hBody.className = 'menu_panel';
   this.hParent.insertBefore(this.hBody);
   builder.hParent = this.hBody;
}
function FMenuBar_onLoaded(cnn){
   var doc = cnn.document;
   if(doc && doc.node){
      IControl.load(this, doc.node);
      this.build();
   }
}
function FMenuBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hBody);
   RMemory.freeHtml(o.hParent);
   o.hBody = null;
   o.hParent = null;
}
function FMenuBar_connect(type, action, attrs){
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   var self = this;
   var cnn = new TXmlCnn();
   cnn.onLoad = function(){self.onLoaded(cnn)};
   cnn.send(this.service, doc);
}
function FMenuBar_release(){
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
function FMenuButton(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   o._icon         = RClass.register(o, new APtyString('icon'));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._action       = RClass.register(o, new APtyString('action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleLabel', 'Icon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hText        = null;
   o.onBuildPanel  = FMenuButton_onBuildPanel
   o.onEnter       = FMenuButton_onEnter;
   o.onLeave       = FMenuButton_onLeave;
   o.onMouseDown   = FMenuButton_onMouseDown;
   o.onMouseUp     = FMenuButton_onMouseUp;
   o.oeBuild       = FMenuButton_oeBuild;
   o.icon          = FMenuButton_icon;
   o.setIcon       = FMenuButton_setIcon;
   o.setEnable     = FMenuButton_setEnable;
   o.click         = FMenuButton_click;
   o.dispose       = FMenuButton_dispose;
   return o;
}
function FMenuButton_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Normal'));
}
function FMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
function FMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FMenuButton_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hPanel;
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(hc, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      var s = o._label;
      if(o._hIcon){
      }
      o.hLabel = RBuilder.appendText(hc, o.styleName('Label'), s);
   }
   return EEventStatus.Stop;
}
function FMenuButton_icon(){
   return this._icon;
}
function FMenuButton_setIcon(p){
   this._icon = p;
}
function FMenuButton_setEnable(p){
   var o = this;
   o.__base.FControl.setEnable.call(o, p);
   if(p){
      o._hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o._hIcon.src = RRes._iconPath(o._icon);
      }
   }else{
      o._hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o._hIcon.src = RRes._iconPath(o._iconDisable);
      }
   }
}
function FMenuButton_click(){
   var o = this;
   if(!o._disabled){
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
      }
   }
}
function FMenuButton_dispose(){
   var o = this;
   o._hIcon = null;
   o._hText = null;
   o.__base.FControl.dispose.call(o);
}
function FMenuButtonMenu(o){
   o = RClass.inherits(this, o, FControl);
   o._action       = RClass.register(o, new APtyString('action', null));
   o._target       = RClass.register(o, new APtyString('target', null));
   o._page         = RClass.register(o, new APtyString('page'));
   o._hotkey       = RClass.register(o, new APtyString('hotkey'));
   o._method       = RClass.register(o, new APtyString('method'));
   o._icon         = RClass.register(o, new APtyString('icon', null));
   o._iconDisable  = RClass.register(o, new APtyString('iconDisable', null));
   o._attributes   = RClass.register(o, new APtyString('attributes'));
   o._disabled     = false;
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   o.oeBuild      = FMenuButtonMenu_oeBuild;
   o.oeEnable     = FMenuButtonMenu_oeEnable;
   o.oeDisable    = FMenuButtonMenu_oeDisable;
   o.onBuildPanel = FMenuButtonMenu_onBuildPanel;
   o.onEnter      = FMenuButtonMenu_onEnter;
   o.onLeave      = FMenuButtonMenu_onLeave;
   o.onMouseDown  = FMenuButtonMenu_onMouseDown;
   o.onMouseUp    = FMenuButtonMenu_onMouseUp;
   o.onClick      = FMenuButtonMenu_onClick;
   o.construct    = FMenuButtonMenu_construct;
   o.dispose      = FMenuButtonMenu_dispose;
   return o;
}
function FMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o._icon){
      o.hIcon = RBuilder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o.hLabel = RBuilder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return EEventStatus.Stop;
}
function FMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
function FMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
function FMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
function FMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
function FMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FMenuButtonMenu_onClick(){
   var o = this;
   if(!o._disabled){
      RConsole.find(FFocusConsole).focus(o);
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
         var form = RHtml.form(o.hButton);
         var p = RPage.parse(o._page);
         if(o._method){
            p._action = o._method;
         }
         p.split(o._attributes);
         p.post(form, o._target);
      }
      o.processClick();
   }
}
function FMenuButtonMenu_construct(){
   var o = this;
   o.base.FControl.construct.call(o);
}
function FMenuButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hIcon = null;
   o.hButton = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
function FMenuButtonSplit(o){
   o = RClass.inherits(this, o, FControl, MMenuButton);
   o.styleUp      = RClass.register(o, new AStyle('Up'));
   o.styleDown    = RClass.register(o, new AStyle('Down'));
   o.disabled     = false;
   o.oeBuild      = FMenuButtonSplit_oeBuild;
   o.onBuildPanel = FMenuButtonSplit_onBuildPanel;
   o.dispose      = FMenuButtonSplit_dispose;
   return o;
}
function FMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
function FMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
function FMenuButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function MMenuButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FToolBar(o){
   o = RClass.inherits(this, o, FContainer);
   o._hLine           = null;
   o.onBuildPanel = FToolBar_onBuildPanel;
   o.appendButton     = FToolBar_appendButton;
   return o;
}
function FToolBar_onBuildPanel(e){
   var o = this;
   var hc = o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(hc);
}
function FToolBar_appendButton(p){
   var o = this;
   var hr = o._hLine;
   var hc = RBuilder.appendTableCell(hr);
   p.setPanel(hc);
}
function FToolBar_addClickListener(name, method){
   var btn = this.component(name);
   if(btn){
      btn.addClickListener(new TListener(this, method));
   }
}
function FToolBar_button(name){
   return this.components.get(name);
}
function FToolBar_setVisibles(vs){
   var o = this;
   for(var n in vs){
      o.button(n).setVisible(vs[n]);
   }
}
function FToolBar_setEnables(vs){
   var o = this;
   for(var n in vs){
      o.button(n).psEnable(vs[n]);
   }
}
function FToolBar_clear(){
   if(this.hTable && this._hLine){
      this._hLine.removeNode(true);
      this._hLine = this.hTable.insertRow();
   }
   this.buttons = new Array();
}
function FToolBar_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o._hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o._hLine = null;
   o.hParent = null;
}
function FToolButton(o){
   o = RClass.inherits(this, o, FControl);
   o._icon         = RClass.register(o, new APtyString('_icon'));
   o._iconDisable  = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('_hotkey'));
   o._action       = RClass.register(o, new APtyString('_action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress', 'Press'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable', 'Disable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hLabel       = null;
   o.lsnsClick     = new TListeners();
   o.onBuildPanel  = FToolButton_onBuildPanel;
   o.onEnter       = FToolButton_onEnter;
   o.onLeave       = FToolButton_onLeave;
   o.onMouseDown   = FToolButton_onMouseDown;
   o.onMouseUp     = FToolButton_onMouseUp;
   o.oeBuild       = FToolButton_oeBuild;
   o.icon          = FToolButton_icon;
   o.setIcon       = FToolButton_setIcon;
   o.setLabel      = FToolButton_setLabel;
   o.setEnable     = FToolButton_setEnable;
   o.click         = FToolButton_click;
   o.dispose       = FToolButton_dispose;
   return o;
}
function FToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p.hDocument, o.styleName('Normal'));
}
function FToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}
function FToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FToolButton_oeBuild(p){
   var o = this;
   o.__base.FControl.oeBuild.call(o, p);
   var h = o._hPanel;
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      var s = o._label;
      if(o._hIcon){
      }
      o.hLabel = RBuilder.appendText(h, o.styleName('Label'), s);
   }
   return EEventStatus.Stop;
}
function FToolButton_icon(){
   return this._icon;
}
function FToolButton_setIcon(p){
   this._icon = p;
}
function FToolButton_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hLabel){
      o._hLabel.innerText = p;
   }
}
function FToolButton_setEnable(p){
   var o = this;
   o.__base.FControl.oeEnable.call(o, e);
   o._disabled = !e.enable;
   if(e.enable && o._icon){
      var is = RRes._iconPath(o._icon);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }else if(!e.enable && o._iconDisable){
      var is = RRes._iconPath(o._iconDisable);
      if(o._hIcon.src != is){
         o._hIcon.src = is;
      }
   }
   var css = o.styleName(e.enable ? 'Icon' : 'IconDisable');
   if(o._hIcon.className != css){
      o._hIcon.className = css;
   }
   var css = o.styleName(e.enable ? 'Button' : 'Disable');
   if(o._hPanel.className != css){
      o._hPanel.className = css;
   }
   var ci = o.styleIconPath(e.enable ? 'Button' : 'ButtonDisable');
   if(o._hButton.background != ci){
      o._hButton.background = ci;
   }
   return EEventStatus.Stop;
}
function FToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.lsnsClick.process(o);
}
function FToolButton_dispose(){
   var o = this;
   o._hButton = null;
   o._hButtonLine = null;
   o._hButtonPanel = null;
   o._hIcon = null;
   o._hText = null;
   o.__base.FControl.dispose.call(o);
}
function FToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
function FToolButtonCheck(o){
   o = RClass.inherits(this, o, FToolButton);
   o.down         = RClass.register(o, new APtyBoolean('down', false));
   o.onEnter      = FToolButtonCheck_onEnter;
   o.onLeave      = FToolButtonCheck_onLeave;
   o.onMouseDown  = FToolButtonCheck_onMouseDown;
   o.onMouseUp    = FToolButtonCheck_onMouseUp;
   o.setDown      = FToolButtonCheck_setDown;
   o.dispose      = FToolButtonCheck_dispose;
   return o;
}
function FToolButtonCheck_onEnter(){
   if(!this.down){
      this.hPanel.className = this.style('Hover');
   }
}
function FToolButtonCheck_onLeave(){
   if(!this.down){
      this.hPanel.className = this.style('Button');
   }
}
function FToolButtonCheck_onMouseDown(){
   this.hPanel.className = this.style('Press');
}
function FToolButtonCheck_onMouseUp(){
   var o = this;
   o.hPanel.className = o.style('Hover');
   o.setDown(!o.down)
   if(o.action){
      eval(o.action);
   }
   o.processClick(o, o.down);
}
function FToolButtonCheck_setDown(down){
   var o = this;
   if(o.down != down){
      o.down = down;
      if(down){
         o.hPanel.className = o.style('Down');
      }else{
         o.hPanel.className = o.style('Button');
      }
   }
}
function FToolButtonCheck_dispose(){
   var o = this;
   o.base.FToolButton.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function FToolButtonMenu(o){
   o = RClass.inherits(this, o, FToolButton, MContainer, MDropable, MFocus);
   o.popup         = null;
   o.hDropPanel    = null;
   o.siDropHover   = RClass.register(o, new AStyleIcon('DropHover'));
   o.onEnter       = FToolButtonMenu_onEnter;
   o.onLeave       = FToolButtonMenu_onLeave;
   o.onBlur        = FToolButtonMenu_onBlur;
   o.onButtonClick = FToolButtonMenu_onButtonClick;
   o.onDropClick   = FToolButtonMenu_onDropClick;
   o.oeBuild       = FToolButtonMenu_oeBuild;
   o.construct     = FToolButtonMenu_construct;
   o.push          = FToolButtonMenu_push;
   o.drop          = FToolButtonMenu_drop;
   o.dispose       = FToolButtonMenu_dispose;
   return o;
}
function FToolButtonMenu_onEnter(e){
   var o = this;
   o.base.FToolButton.onEnter.call(o, e);
   if(!o.disabled){
      o.hDropIcon.src = o.styleIconPath('DropHover');
   }
}
function FToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.base.FToolButton.onLeave.call(o, e);
      if(!o.disabled){
         o.hDropIcon.src = o.styleIconPath('Drop');
      }
   }
}
function FToolButtonMenu_onBlur(e){
   var o = this;
   if(e){
      if(o.popup.testInRange(e)){
         return false;
      }
   }
   o.hPanel.className = o.style('Button');
   o.popup.hide();
}
function FToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.base.FToolButton.onButtonClick.call(o);
      if(!(o.action || o.page)){
         o.drop();
      }else if(o.action){
         eval(o.action);
      }
   }
}
function FToolButtonMenu_onDropClick(e){
   this.drop();
}
function FToolButtonMenu_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FToolButton.oeBuild.call(o, e);
      var h = o.hDropPanel = o.hButtonLine.insertCell();
      h.className = o.style('Drop')
      o.hDropIcon = RBuilder.appendIcon(h, o.styleIcon('Drop'));
      o.attachEvent('onDropClick', h);
   }
   if(e.isAfter()){
      o.popup.psBuild();
   }
   return EEventStatus.Continue;
}
function FToolButtonMenu_construct(){
   var o = this;
   o.popup = RClass.create(FPopupMenu);
   o.popup.opener = o;
}
function FToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MMenuButton)){
      return o.popup.push(c);
   }
   o.base.FToolButton.push.call(o, c);
}
function FToolButtonMenu_drop(){
   var o = this;
   if(!o.disabled){
      o.popup.show(this.hDropPanel, EAlign.BottomRight);
   }
}
function FToolButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}
function FToolButtonSplit(o){
   o = RClass.inherits(this, o, FControl);
   o.styleButton  = RClass.register(o, new AStyle('Button'));
   o.hButton      = null;
   o.oeBuild      = FToolButtonSplit_oeBuild;
   o.onBuildPanel = FToolButtonSplit_onBuildPanel;
   o.dispose      = FToolButtonSplit_dispose;
   return o;
}
function FToolButtonSplit_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   o.hButton = RBuilder.append(this.hPanel, 'DIV', o.style('Button'));
   return EEventStatus.Stop;
}
function FToolButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Panel'));
}
function FToolButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hButton = null;
}
function FToolButtonText(o){
   o = RClass.inherits(this, o, FToolButton);
   return o;
}
function FPageBar(o){
   o = RClass.inherits(this, o, FContainer);
   o.tabs         = new TMap();
   o.selected     = null;
   o.hTop         = null;
   o.hLine        = null;
   o.hBottom      = null;
   o.hSheets      = null;
   o.oeBuild      = FPageBar_oeBuild;
   o.onBuildPanel = FPageBar_onBuildPanel;
   o.select       = FPageBar_select;
   o.tab          = FPageBar_tab;
   o.push         = FPageBar_push;
   o.dispose      = FPageBar_dispose;
   return o;
}
function FPageBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      o.hRows = RBuilder.append(o.hPanel, 'TBODY');
      o.hRow = RBuilder.append(o.hRows, 'TR');
   }else if(e.isAfter()){
      var ts = o.tabs;
      for(var n=0; n<ts.count; n++){
         o.hRow.appendChild(ts.value(n).hPanel);
      }
   }
}
function FPageBar_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
function FPageBar_select(sheet){
   this.selected = sheet;
   for(var n=0; n<this.tabs.count; n++){
      var o = this.tabs.value(n);
      o.select(sheet == o);
   }
   sheet.psRefresh();
}
function FPageBar_tab(name){
   return this.sheets.get(name);
}
function FPageBar_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FPageTab)){
      c.pageBar = o;
      c.index = o.tabs.count;
      o.tabs.set(c.name, c);
   }
}
function FPageBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hRow);
   o.hRow = null;
   o.hPanel = null;
}
function FPageTab(o){
   o = RClass.inherits(this, o, FControl);
   o.page         = RClass.register(o, new TPtyStr('page', null));
   o.icon         = RClass.register(o, new TPtyStr('icon', null));
   o.action       = RClass.register(o, new TPtyStr('action', null));
   o.stPanel      = RClass.register(o, new TStyle('LabelPanel'));
   o.stButtonIcon = RClass.register(o, new TStyleIcon('Button'));
   o.pageBar      = null;
   o.index        = null;
   o.selected     = false;
   o.hasBuilded   = false;
   o.lsnsSelect   = new TListeners();
   o.hTopL        = null;
   o.hTop         = null;
   o.hTopR        = null;
   o.hLeft        = null;
   o.hButton      = null;
   o.hIcon        = null;
   o.hText        = null;
   o.hBottomL     = null;
   o.hBottom      = null;
   o.hBottomR     = null;
   o.hRight       = null;
   o.oeBuild      = FPageTab_oeBuild;
   o.onBuildPanel = FPageTab_onBuildPanel;
   o.onEnter      = FPageTab_onEnter;
   o.onLeave      = FPageTab_onLeave;
   o.onMouseDown  = FPageTab_onMouseDown;
   o.select       = FPageTab_select;
   o.dump         = FPageTab_dump;
   return o;
}
function FPageTab_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var b = o.border = RBorder.create(EBorder.Round, o.hPanel);
   var hb = b.hPanel;
   o.hPanel.width = '90'
   hb.align = 'center';
   hb.className = o.style('LabelPanel');
   hb.background = o.styleIconPath('Button');
   o.hPanel.appendChild(b.hForm);
   var label = o.label;
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(hb, o.icon);
      label = ' ' + o.label;
   }
   RBuilder.appendText(hb, label);
   return EEventStatus.Stop;
}
function FPageTab_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FPageTab_onEnter(){
   if(!this.selected){
   }
}
function FPageTab_onLeave(){
   if(!this.selected){
   }
}
function FPageTab_onMouseDown(){
   var o = this;
   if(o.action){
      eval(o.action);
   }
}
function FPageTab_select(flag){
   var o = this;
   var b = o.pageBar;
   if(flag && !o.hasBuilded){
   }
   var first = (o.index == 0);
   var prior = (b.selected.index-1 == o.index);
   if(o.selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o.selected = flag;
   }
}
function FPageTab_dump(dump, space){
   dump = RString.nvlStr(dump);
   dump.append(space, RClass.name(this), ' [');
   dump.append('name=', this.name, ', ');
   dump.append('icon=', this.icon, ', ');
   dump.append('label=', this.label, ', ');
   dump.append('action=', this.action, ']');
   return dump;
}
function FTabBar(o){
   o = RClass.inherits(this, o, FContainer);
   o.left             = 20;
   o.width            = '100%';
   o.sheets           = new TMap();
   o.selected         = null;
   o.hTop             = null;
   o.hLine            = null;
   o.hBottom          = null;
   o.oeBuild          = FTabBar_oeBuild;
   o.onBuildPanel     = FTabBar_onBuildPanel;
   o.appendChild      = FTabBar_appendChild;
   o.addClickListener = FTabBar_addClickListener;
   o.select           = FTabBar_select;
   o.push             = FTabBar_push;
   o.dispose          = FTabBar_dispose;
   return o;
}
function FTabBar_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   if(event.isBefore()){
      var h = o.hTop.insertCell();
      RBuilder.appendEmpty(h);
      h.width = 20;
      var h = o.hLine.insertCell();
      var h = RBuilder.append(o.hBottom, 'TD', this.style('Bottom'));
      RBuilder.appendEmpty(h);
   }else if(event.isAfter()){
      RBuilder.append(o.hTop, 'TD', this.style('Top'));
      h = RBuilder.append(o.hLine, 'TD');
      RBuilder.appendEmpty(h);
      RBuilder.append(o.hBottom, 'TD', this.style('Bottom'));
      if(o.sheets.count){
         o.select(o.sheets.value(0));
      }
   }
}
function FTabBar_appendChild(sheet){
   this.hTop.appendChild(sheet.hTopL);
   this.hTop.appendChild(sheet.hTop);
   this.hTop.appendChild(sheet.hTopR);
   this.hLine.appendChild(sheet.hLeft);
   this.hLine.appendChild(sheet.hPanel);
   this.hLine.appendChild(sheet.hRight);
   this.hBottom.appendChild(sheet.hBottomL);
   this.hBottom.appendChild(sheet.hBottom);
   this.hBottom.appendChild(sheet.hBottomR);
}
function FTabBar_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.append(o.hParent, 'TABLE');
   h.border = 0;
   h.frame = 'box';
   h.cellPadding = 0;
   h.cellSpacing = 0;
   o.hTop = h.insertRow();
   o.hLine = h.insertRow();
   o.hBottom = h.insertRow();
}
function FTabBar_addClickListener(){
   var btn = this.components.get(name);
   if(btn){
      btn.lsnsClick.push(new TListener(this, method));
   }
}
function FTabBar_select(sheet){
   this.selected = sheet;
   for(var n=0; n<this.sheets.count; n++){
      var o = this.sheets.value(n);
      o.select(sheet == o);
   }
}
function FTabBar_selectPage(idx, force){
   this.activeIndex = idx;
   var oPage = null;
   if(!force){
      for(var n=0; n<this.items.length; n++){
         if(this.items[n].name == this.activePageName){
            oPage = this.items[n];
            this.activePageName = oPage.name;
            this.activeIndex = n;
            break;
         }
      }
      if(!oPage){
         oPage = this.items[this.activeIndex];
         this.activePageName = oPage.name;
      }
   }
   if(oPage){
      this.activePage = oPage;
   }else{
      oPage = this.activePage;
   }
   if(oPage){
      this.clear();
      this.refresh();
      oPage = this.items[this.activeIndex];
      this.activePageName = oPage.name;
      if(this.onSheetClick){
         this.onSheetClick(oPage);
      }
   }
   return oPage;
}
function FTabBar_push(o){
   this.base.FContainer.push.call(this, o);
   if(RClass.isClass(o, FTabButton)){
      o.tabBar = this;
      o.index = this.sheets.count;
      this.sheets.set(o.name, o);
   }
}
function FTabBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call();
   RMemory.freeHtml(o.hTop);
   RMemory.freeHtml(o.hLine);
   RMemory.freeHtml(o.hBottom);
   o.hTop = null;
   o.hLine = null;
   o.hBottom = null;
}
function FTabButton(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   o.icon         = null;
   o.caption      = null;
   o.action       = null;
   o.hint         = null;
   o.pageBar      = null;
   o.index        = null;
   o.selected     = false;
   o.oeBuild      = FTabButton_oeBuild;
   o.onBuildPanel = FTabButton_onBuildPanel;
   o.onEnter      = FTabButton_onEnter;
   o.onLeave      = FTabButton_onLeave;
   o.onMouseDown  = FTabButton_onMouseDown;
   o.onMouseUp    = FTabButton_onMouseUp;
   o.loadConfig   = FTabButton_loadConfig;
   o.saveConfig   = FTabButton_saveConfig;
   o.select       = FTabButton_select;
   o.dump         = FTabButton_dump;
   o.dispose      = FTabButton_dispose;
   return o;
}
function FTabButton_oeBuild(event){
   var o = this;
   var b = o.tabBar;
   o.hTopL = RBuilder.create(null, 'TD', b.style('Top'));
   o.hTop  = RBuilder.create(null, 'TD', b.style('Top'));
   o.hTopR = RBuilder.create(null, 'TD', b.style('Top'));
   o.hLeft = RBuilder.create(null, 'TD', b.style('Left'));
   RBuilder.appendEmpty(o.hLeft);
   o.hBottomL = RBuilder.create(null, 'TD', b.style('Bottom'));
   o.hBottom  = RBuilder.create(null, 'TD', b.style('Bottom'));
   o.hBottomR = RBuilder.create(null, 'TD', b.style('Bottom'));
   o.hRight = RBuilder.create(null, 'TD', b.style('Right'));
   RBuilder.appendEmpty(o.hRight);
   o.base.FControl.oeBuild.call(o, event);
   var tb = o.parent;
   var h = this.hPanel;
   o.hButton = RBuilder.append(this.hPanel, 'DIV', this.style('Button'));
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(o.hButton, this.icon);
   }
   if(o.caption){
      o.hText = RBuilder.append(o.hButton, 'SPAN');
      o.hText.innerText = ' ' + this.caption;
   }
   return EEventStatus.Stop;
}
function FTabButton_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Panel'));
}
function FTabButton_onEnter(){
   if(!this.selected){
      this.hButton.className = this.style('Hover');
   }
}
function FTabButton_onLeave(){
   if(!this.selected){
      this.hButton.className = this.style('Button');
   }
}
function FTabButton_onMouseDown(){
   this.parent.select(this);
}
function FTabButton_onMouseUp(){
   this.processClick();
}
function FTabButton_loadConfig(config){
   var o = this;
   o.base.FControl.loadConfig.call(o, config);
   o.icon    = config.get('icon');
   o.caption = config.get('caption');
   o.action  = config.get('action');
   o.hint    = config.get('hint');
}
function FTabButton_saveConfig(config){
   var o = this;
   o.base.FControl.saveConfig.call(o, config);
   config.set('icon',    o.icon);
   config.set('caption', o.caption);
   config.set('action',  o.action);
   config.set('hint',    o.hint);
}
function FTabButton_select(flag){
   var o = this;
   o.selected = flag;
   var b = this.tabBar;
   var first = (o.index == 0);
   var prior = true;
   if(b.selected){
      prior = (b.selected.index-1 == o.index);
   }
   o.hButton.className = flag ? o.style('Select') : o.style('Button');
   o.hTop.className = flag ? b.style('TopSel') : b.style('Top');
   o.hLeft.className = flag ? b.style('LeftSel') : (first ? b.style('Right') : b.style('Left'));
   o.hBottomL.className = flag ? b.style('BottomSel') : b.style('Bottom');
   o.hBottom.className = flag ? b.style('BottomSel') : b.style('Bottom');
   o.hBottomR.className = flag ? b.style('BottomSel') : b.style('Bottom');
   o.hRight.className = flag ? b.style('RightSel') : (prior ? b.style('RightP') : b.style('Right'));
}
function FTabButton_dump(dump, space){
   dump = RString.nvlStr(dump);
   dump.append(space, RClass.name(this), ' [');
   dump.append('name=', this.name, ', ');
   dump.append('icon=', this.icon, ', ');
   dump.append('label=', this.label, ', ');
   dump.append('action=', this.action, ']');
   return dump;
}
function FTabButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hTop);
   RMemory.freeHtml(o.hLeft);
   RMemory.freeHtml(o.hBottomL);
   RMemory.freeHtml(o.hBottom);
   RMemory.freeHtml(o.hBottomR);
   RMemory.freeHtml(o.hRight);
   o.hButton = null;
   o.hTop = null;
   o.hLeft = null;
   o.hBottomL = null;
   o.hBottom = null;
   o.hBottomR = null;
   o.hRight = null;
}
function FDataTreeView(o){
   o = RClass.inherits(this, o, FTreeView);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._statusLoading   = false;
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   o.onLoaded         = FDataTreeView_onLoaded;
   o.onNodeLoaded     = FDataTreeView_onNodeLoaded;
   o.construct        = FDataTreeView_construct;
   o.buildNode        = FDataTreeView_buildNode;
   o.loadNode         = FDataTreeView_loadNode;
   o.loadUrl          = FDataTreeView_loadUrl;
   o.loadNodeUrl      = FDataTreeView_loadNodeUrl;
   o.loadService      = FDataTreeView_loadService;
   o.loadNodeService  = FDataTreeView_loadNodeService;
   o.reloadNode       = FDataTreeView_reloadNode;
   o.reload           = FDataTreeView_reload;
   o.dispose          = FDataTreeView_dispose;
   o._queryService    = RClass.register(o, new APtyString('_queryService'));
   o.onQueryLoaded    = FDataTreeView_onQueryLoaded;
   o.doQuery          = FDataTreeView_doQuery;
   o.removeNode       = FDataTreeView_removeNode;
   o.clearNodes       = FDataTreeView_clearNodes;
   o.getChangedChecks = FDataTreeView_getChangedChecks;
   o.fetchExtendsAll  = FDataTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FDataTreeView_tempAppendNodes;
   o.removeNodes      = FDataTreeView_removeNodes;
   o.tempAppendChild  = FDataTreeView_tempAppendChild;
   return o;
}
function FDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   RControl.build(o, xt);
   o.lsnsLoaded.process(p);
   var s = xt.get('service');
   o.loadNodeService(s);
}
function FDataTreeView_onNodeLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var np = p.connection.parentNode;
   o._loadingNode.hide();
   o._statusLoading = false;
   o.buildNode(np, x);
   o.lsnsNodeLoaded.process(p);
}
function FDataTreeView_construct(){
   var o = this;
   o.__base.FTreeView.construct.call(o);
}
function FDataTreeView_buildNode(pn, px){
   var o = this;
   var xns = px._nodes;
   if(xns){
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('TreeNode')){
            var n = o.createNode();
            n.loadConfig(xn);
            if(pn){
               pn.push(n);
            }else{
               o.push(n);
            }
            o.appendNode(n, pn);
            if(xn.hasNode()){
               o.buildNode(n, xn);
               n.extend(false);
            }
         }
      }
   }
}
function FDataTreeView_loadNode(pn, pf){
   var o = this;
   o._statusLoading = true;
   var nt = null;
   var fn = pn;
   var svc = o._serviceName;
   while(RClass.isClass(fn, FTreeNode)){
      nt = fn.type();
      if(nt && nt._serviceName){
         svc = nt._serviceName;
         break;
      }
      fn = fn._parent;
   }
   if(!svc){
      throw new TError(o, 'Unknown service name.');
   }
   o.lsnsLoad.process(o, pn);
   var xd = new TXmlDocument();
   var x = xd.root();
   var fn = pn;
   while(RClass.isClass(fn, FTreeNode)){
      var xc = x.create('Node');
      fn.propertySave(xc);
      fn = fn._parent;
   }
   pn._extended = true;
   if(pn._child && pn._hImage){
      pn._hImage.src = RResource.iconPath(o._iconMinus);
   }
   var ln = o._loadingNode;
   var nr = pn._hPanel.rowIndex;
   if(ln._hPanel.rowIndex > nr){
      nr++;
   }
   RHtml.tableMoveRow(o._hNodeForm, ln._hPanel.rowIndex, nr);
   ln.setLevel(pn.level + 1);
   ln.show();
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc, xd);
   c.parentNode = pn;
   c.lsnsLoad.register(o, o.onLoaded);
}
function FDataTreeView_loadUrl(p){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.lsnsLoad.register(o, o.onLoaded);
}
function FDataTreeView_loadNodeUrl(p, n){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FDataTreeView_loadService(service, attrs){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this._service));
   if(!svc){
      return alert('Unknown service');
   }
   attrs = RObject.nvl(attrs, o._attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   RConsole.find(FEnvironmentConsole).build(xr);
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
   var ln = o._loadingNode;
}
function FDataTreeView_loadNodeService(ps, pa){
   var o = this;
   var svc = RService.parse(RString.nvl(ps, o._service));
   if(!svc){
      throw new TError(o, 'Unknown service.');
   }
   var as = RObject.nvl(pa, o._attributes);
   var xd = new TXmlDocument();
   var xr = xd.root();
   xr.set('action', svc.action);
   if(!as.isEmpty()){
      if(RClass.isClass(as, TNode)){
         xr.push(attrs);
      }if(RClass.isClass(as, TAttributes)){
      }else{
      }
   }
   var ln = o._loadingNode;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(svc.url, xr);
   c.parentNode = o._focusNode;
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FDataTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FDataTreeView_dispose(){
   var o = this;
   o.__base.FTreeView.dispose.call(o);
}
function FDataTreeView_onQueryLoaded(e){
   var o = this;
   var doc = e.document;
   if(doc){
      var tvn = doc.root().find('TreeView');
      if(tvn && tvn._nodes){
         var nc = tvn._nodes.count;
         for(var n=0; n<nc; n++){
            var nd = tvn._nodes.get(n);
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
function FDataTreeView_doQuery(){
   var o = this;
   var svc = RService.parse(o._queryService);
   if(!svc){
      return alert('Unknown query service');
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   root.create('Attributes').attrs = o._attributes;
   var e = new TEvent(o, EXmlEvent.Send, o.onQueryLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FDataTreeView_removeNode(oNode){
   if(oNode){
      var nodes = new Array();
      var oLoopNode = null;
      var nCount = this._allNodes.length;
      for(var n=0; n<nCount; n++){
         oLoopNode = this._allNodes[n];
         if(oLoopNode != oNode){
            nodes[nodes.length] = oLoopNode;
         }
      }
      this._allNodes = nodes;
      var oParent = oNode.parent;
      if(oParent){
         nodes = new Array();
         nCount = oParent._nodes.length;
         for(var n=0; n<nCount; n++){
            oLoopNode = oParent._nodes[n];
            if(oLoopNode != oNode){
               nodes[nodes.length] = oLoopNode;
            }
         }
         oParent._nodes = nodes;
         oNode.parent.childrenHTML.removeChild(oNode.ownerHTML);
      }
      if(oParent._nodes.length == 0){
         oParent.imageHTML.src = this.imgEmpty;
      }
      return true;
   }
   return false;
}
function FDataTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FDataTreeView_clearNodes(node){
   if(node){
      node.removeChildren();
   }
   return true;
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = this._allNodes.length;
   for(var n=0; n<nCount; n++){
      oLoopNode = this._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = this.imgEmpty ;
   this._allNodes = nodes;
   return true;
}
function FDataTreeView_fetchExtendsAll(s){
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
function FDataTreeView_getChangedChecks(){
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
function FDataTreeView_tempAppendNodes(parent, config){
   parent = RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = RClass.create(FTreeNode);
               tn.parent = parent;
               tn._tree = this;
               tn.loadConfig(nc);
               if(nc._nodes){
                  tn.icon = 'ctl.FBrowser_Folder';
               }else{
                  tn.icon = 'ctl.FBrowser_Txt';
               }
               tn.build(0);
               tn.hide();
               if(nc._nodes){
                  this.tempAppendNodes(tn, nc);
               }
               parent.push(tn);
               this._allNodes.push(tn);
            }
         }
      }
   }
   this.rootNode.extend(true);
}
function FDataTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FDataTreeView_tempAppendChild(child){
   var o = this;
   var hc = o._hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child._hPanel);
   }
}
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FTreeColumn_oeBuild;
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FControl.oeBuild.call(o, event);
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
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FTreeNode(o){
   o = RClass.inherits(this, o, FContainer);
   o._valid            = RClass.register(o, new APtyBoolean('_isValid'), true);
   o._typeName         = RClass.register(o, new APtyString('_typeName'));
   o._uuid             = RClass.register(o, new APtyString('_uuid'));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
   o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
   o._child            = RClass.register(o, new APtyBoolean('_child'), false);
   o._note             = RClass.register(o, new APtyString('_note'));
   o._tag              = RClass.register(o, new APtyString('_tag'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect', 'Select'));
   o._styleImage       = RClass.register(o, new AStyle('_styleImage', 'Image'));
   o._styleIcon        = RClass.register(o, new AStyle('_styleIcon', 'Icon'));
   o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable', 'IconDisable'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
   o._tree             = null;
   o._level            = 0;
   o._attributes       = null;
   o._nodes            = null;
   o._statusLinked     = false;
   o._statusDisplay    = true;
   o._statusSelected   = false;
   o._statusLoaded     = false;
   o._statusHover      = false;
   o._hNodePanel       = null;
   o._hCheck           = null;
   o._hImage           = null;
   o._hIcon            = null;
   o._hLabel           = null;
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FTreeNode_onNodeClick);
   o.onBuildPanel      = FTreeNode_onBuildPanel;
   o.oeBuild           = FTreeNode_oeBuild;
   o.construct         = FTreeNode_construct;
   o.type              = FTreeNode_type;
   o.setLabel          = FTreeNode_setLabel;
   o.setLevel          = FTreeNode_setLevel;
   o.get               = FTreeNode_get;
   o.set               = FTreeNode_set;
   o.check             = FTreeNode_check;
   o.setCheck          = FTreeNode_setCheck;
   o.hasChild          = FTreeNode_hasChild;
   o.topNode           = FTreeNode_topNode;
   o.topNodeByType     = FTreeNode_topNodeByType;
   o.show              = FTreeNode_show;
   o.hide              = FTreeNode_hide;
   o.select            = FTreeNode_select;
   o.extend            = FTreeNode_extend;
   o.extendAll         = FTreeNode_extendAll;
   o.createChild       = FTreeNode_createChild;
   o.appendNode        = FTreeNode_appendNode;
   o.push              = FTreeNode_push;
   o.remove            = FTreeNode_remove;
   o.removeChildren    = FTreeNode_removeChildren;
   o.click             = FTreeNode_click;
   o.refreshStyle      = FTreeNode_refreshStyle;
   o.propertyLoad      = FTreeNode_propertyLoad;
   o.propertySave      = FTreeNode_propertySave;
   o.loadConfig        = FTreeNode_loadConfig;
   o.reload           = FTreeNode_reload;
   o.reloadParent     = FTreeNode_reloadParent;
   o.loadQuery        = FTreeNode_loadQuery;
   o.isFolder         = FTreeNode_isFolder;
   o.dispose          = FTreeNode_dispose;
   o.innerDump        = FTreeNode_innerDump;
   o.findByName       = FTreeNode_findByName;
   o.findByUuid       = FTreeNode_findByUuid;
   o.checkChanged     = FTreeNode_checkChanged;
   o.pushChanged      = FTreeNode_pushChanged;
   o.getFullPath      = FTreeNode_getFullPath;
   return o;
}
function FTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
function FTreeNode_onNodeLeave(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FTreeNode_onNodeClick(e){
   var o = this;
   var t = o._tree;
   var esn = e.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == e.hSender._linkType);
   }
   var isParent = false;
   var find = t._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      t.selectNode(o, true);
   }
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         t.lsnsClick.process(t, o);
      }
   }else{
      if(o._child){
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
      if((isImg && isParent) || (isImg && !o._child) || !isImg){
         t.lsnsClick.process(t, o);
      }
   }
}
function FTreeNode_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableRow(e.hDocument, o.styleName('Panel'));
}
function FTreeNode_oeBuild(e){
   var o = this;
   var t = o._tree;
   var r = o.__base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hp = o._hPanel;
      hp.style.border = '1 solid red';
      o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
      o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
      o.attachEvent('onNodeClick', hp);
      var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
      hnp.noWrap = true;
      var ni = o._child ? t._iconPlus : t._iconNode;
      var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), ni, 16, 16);
      hi._linkType = 'image';
      var ni = RString.nvl(o._icon, o._typeName ? o._typeName._icon : null);
      if(ni){
         var hi = o._hIcon = RBuilder.appendIcon(hnp, o._valid ? o.styleName('Icon') : o.styleName('IconDisable'), ni, 16, 16);
      }else{
        var hi = o._hIcon = RBuilder.appendIcon(hnp, o._valid ? o.styleName('Icon') : o.styleName('IconDisable'), t._iconEmpty, 1, 1);
      }
      hi._linkType = 'icon';
      if(t.dispChecked){
         var hc = o._hCheck = RBuilder.appendCheck(hnp);
         hc.width = 13;
         hc.height = 13;
         hc.style.borderWidth = 0;
         o.setCheck(o._checked);
         t.linkEvent(o, 'onNodeCheckClick', hc);
      }
      o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
      o.setLabel(o._label);
      var cs = t.columns;
      if(cs){
         var cc = cs.count();
         for(var n = 1; n < cc; n++){
            var c = cs.value(n);
            var hc = RBuilder.appendTableCell(hp, o.styleName('Cell'));
            hc.align='center';
            hc.noWrap = true;
            hc.innerText = RString.nvl(o.get(c.dataName));
            RHtml.displaySet(hc, c.display);
         }
      }
   }
   return r;
}
function FTreeNode_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._attributes = new TAttributes();
}
function FTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeName)){
      return null;
   }
   return t.findType(o._typeName);
}
function FTreeNode_setLabel(p){
   var o = this;
   o.__base.FContainer.setLabel.call(o, p)
   var s = '';
   if(!RString.isEmpty(o._label)){
      s = '&nbsp;' + o._label;
      if(o._tag){
         s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(o._note){
         s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
   }
   o._hLabel.innerHTML = s;
}
function FTreeNode_setLevel(p){
   var o = this;
   var t = o._tree;
   o._level = p;
   o._hImage.style.marginLeft = t._indent * p;
}
function FTreeNode_get(n){
   return this._attributes.get(n);
}
function FTreeNode_set(n, v){
   this._attributes.set(n, v);
}
function FTreeNode_check(){
   return this._checked;
}
function FTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   o._hCheck.checked = p;
}
function FTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
function FTreeNode_topNode(){
   var r = this;
   while(r._parent){
      r = r._parent;
   }
   return r;
}
function FTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeName == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
function FTreeNode_show(){
   var o = this;
   var t = o._tree;
   RHtml.displaySet(o._hPanel, true);
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(!n._statusLinked){
            t.appendNode(n, o);
         }
         if(n._statusDisplay){
            RHtml.displaySet(n._hPanel, true);
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.displaySet(o._hPanel, false);
   }
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var cv = cs.value(i);
         if(cv){
            cv.hide();
         }
      }
   }
}
function FTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
function FTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o._hImage && !o.hasChild()){
         o._hImage.src = RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = RResource.iconPath(p ? t._iconMinus : t._iconPlus);
      }
      var ns = o._nodes;
      if(p){
         o.show();
      }else if(ns){
         var nc = ns.count();
         for(var i = nc - 1; i >= 0; i--){
            ns.get(i).hide();
         }
      }
   }
   t.refresh();
}
function FTreeNode_extendAll(p){
   var o = this;
   o.extend(p);
   var cs = o._components;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         c.extendAll(p);
      }
   }
}
function FTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FTreeNode);
      r._tree = this._tree;
   }
   return r;
}
function FTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
function FTreeNode_push(c){
   var o = this;
   var t = o._tree;
   o.__base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      var ns = o._nodes;
      if(!ns){
         ns = o._nodes = new TObjects();
      }
      c._tree = t;
      c._parent = o;
      ns.push(c);
      t._allNodes.pushUnique(c);
   }
}
function FTreeNode_remove(){
   var o = this;
   var t = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      t.freeNode(o);
   }
}
function FTreeNode_removeChildren(){
   var ns = this._nodes;
   if(ns){
      var c = ns.count();
      for(var i = c - 1; i >= 0; i--){
         var n = ns.get(i);
         if(n){
            n.remove();
         }
      }
      ns.clear();
   }
}
function FTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FTreeNode_refreshStyle(){
   var o = this;
   var cs = o._hPanel.cells;
   var c = cs.length;
   if(o._statusSelected){
      for(var i = 0; i < c; i++){
         cs[i].className = o.styleName('Select');
      }
   }else{
      if(o._statusHover){
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Hover');
         }
      }else{
         for(var i = 0; i < c; i++){
            cs[i].className = o.styleName('Normal');
         }
      }
   }
}
function FTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FContainer.propertyLoad.call(o, x);
   o._attributes.append(x.attrs);
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
function FTreeNode_propertySave(x){
   var o = this;
   o.__base.FContainer.propertySave.call(o, x);
   x.set('type_name', o._typeName);
   x.set('attributes', o._attributes.pack());
}
function FTreeNode_loadConfig(x){
   var o = this;
   var t = o._tree;
   o._typeName = null;
   o._uuid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o.propertyLoad(x);
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
   var ni = o._child ? t._iconPlus : t._iconNode;
   o._hImage.src = RResource.iconPath(ni);
   var ni = RString.nvl(o._icon, o._typeName ? o._typeName._icon : null);
   o._hIcon.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
   if(ni){
     o._hIcon.style.width = 16;
     o._hIcon.style.height = 16;
      o._hIcon.src = RResource.iconPath(ni);
   }else{
      o._hIcon.style.width = 1;
      o._hIcon.style.height = 1
   }
   if(!RString.isEmpty(o._attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o._attributes.get('checked'));
     if(o._hCheck){
         o._hCheck._checked = o._checked;
     }
   }
   o.setLabel(o._label);
}
function FTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
function FTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
function FTreeNode_loadQuery(x){
   var o = this;
   var sl = RString.nvl(x.get('label'), o._label);
   var sn = RString.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!RString.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o._hLabel.innerHTML = text;
   if(x.contains('visible')){
      o._statusDisplay = RBool.isTrue(x.get('visible'));
      o.setVisible(o._statusDisplay);
   }
}
function FTreeNode_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
}
function FTreeNode_innerDump(s){
   var o = this;
   s.append(RClass._typeNameOf(o));
   s.append('[level=',  o._level);
   if(o._typeName){
      s.append(' type=',  o._typeName.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o._label);
   s.append(', child=', o._child);
   s.append(']');
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
   if(o._uuid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._uuid == u){
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
    d.attrs = o._attributes;
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
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
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
   if(this._typeName){
       return (this._typeName._typeNameName == 'collections') ? true : false;
   }
}
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   o._typeName    = RClass.register(o, new APtyString('_typeName', 'type'));
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._serviceName = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._actionName  = RClass.register(o, new APtyString('_actionName', 'action'));
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.typeName     = FTreeNodeType_typeName;
   o.icon         = FTreeNodeType_icon;
   o.serviceName  = FTreeNodeType_serviceName;
   o.actionName   = FTreeNodeType_actionName;
   o.get          = FTreeNodeType_get;
   o.set          = FTreeNodeType_set;
   o.innerDump    = FTreeNodeType_innerDump;
   return o;
}
function FTreeNodeType_typeName(){
   return this._typeName;
}
function FTreeNodeType_icon(){
   return this._icon;
}
function FTreeNodeType_serviceName(){
   return this._serviceName;
}
function FTreeNodeType_actionName(){
   return this._actionName;
}
function FTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}
function FTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}
function FTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append('[type=',  o._typeName);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._serviceName);
   s.append(', action=', o._actionName);
   s.append(']');
}
function FTreeView(o){
   o = RClass.inherits(this, o, FContainer);
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   o._styleNodePanel  = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm   = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
   o._attributes      = null;
   o._nodeTypes       = null;
   o._nodeColumns     = null;
   o._nodeLevels      = null;
   o._nodes           = null;
   o._allNodes        = null;
   o._defaultNodeType = null;
   o._focusNode       = null;
   o._loadingNode     = null;
   o._freeNodes       = null;
   o._iconPlus        = 'control.treeview.plus';
   o._iconMinus       = 'control.treeview.minus';
   o._iconNode        = 'control.treeview.node';
   o._iconLoading     = 'control.treeview.loading';
   o._hNodePanel      = null;
   o._hNodeForm       = null;
   o._hHeadLine       = null;
   o._hNodeRows       = null;
   o.lsnsEnter        = new TListeners();
   o.lsnsLeave        = new TListeners();
   o.lsnsClick        = new TListeners();
   o.onBuildPanel     = FTreeView_onBuildPanel;
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FTreeView_onNodeCheckClick);
   o.oeBuild          = FTreeView_oeBuild;
   o.construct        = FTreeView_construct;
   o.attributes       = FTreeView_attributes;
   o.nodeTypes        = FTreeView_nodeTypes;
   o.nodeColumns      = FTreeView_nodeColumns;
   o.nodeLevels       = FTreeView_nodeLevels;
   o.nodes            = FTreeView_nodes;
   o.findType         = FTreeView_findType;
   o.findByName       = FTreeView_findByName;
   o.findByUuid       = FTreeView_findByUuid;
   o.createChild      = FTreeView_createChild;
   o.createNode       = FTreeView_createNode;
   o.appendNode       = FTreeView_appendNode;
   o.selectNode       = FTreeView_selectNode;
   o.push             = FTreeView_push;
   o.freeNode         = FTreeView_freeNode;
   o.calculateHeight  = FTreeView_calculateHeight;
   o.extendAuto       = FTreeView_extendAuto;
   o.extendAll        = FTreeView_extendAll;
   o.loadNode         = RMethod.empty;
   o.refresh          = FTreeView_refresh;
   o.filterNode       = FTreeView_filterNode;
   o.clear            = FTreeView_clear;
   o.dispose          = FTreeView_dispose;
   return o;
}
function FTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hPanel.width = '100%';
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
function FTreeView_oeBuild(e){
   var o = this;
   var r = o.__base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hr = RBuilder.appendTableRow(o._hPanel);
      var hc = RBuilder.appendTableCell(hr);
      var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
      var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
      hnf.width = '100%';
      o._hHeadLine = RBuilder.appendTableRow(hnf);
      o._hNodeRows = hnf.children[0];
      var ln = o._loadingNode = RClass.create(FTreeNode);
      ln._tree = o;
      ln._label = RContext.get('FTreeView:loading');
      ln._icon = o._iconLoading;
      ln.process(e);
      o.appendNode(ln);
      ln.hide();
   }else if(e.isAfter()){
      var ns = o._nodes;
      if(!ns.isEmpty()){
         var nc = ns.count;
         for(var i = 0; i < nc; i++){
            o.appendNode(ns.get(i));
         }
      }
      o.extendAuto();
   }
   return r;
}
function FTreeView_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._defaultNodeType = RClass.create(FTreeNodeType);
}
function FTreeView_attributes(){
   return this._attributes;
}
function FTreeView_nodeTypes(){
   return this._nodeTypes;
}
function FTreeView_nodeColumns(){
   return this._nodeColumns;
}
function FTreeView_nodeLevels(){
   return this._nodeLevels;
}
function FTreeView_nodes(){
   return this._nodes;
}
function FTreeView_findType(p){
   return this._nodeTypes.get(p);
}
function FTreeView_findByName(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._name == p){
            return n;
         }
      }
   }
}
function FTreeView_findByUuid(p){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   if(c){
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n._uuid == p){
            return n;
         }
      }
   }
}
function FTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = RClass.create(FTreeColumn);
         break;
      case 'TreeLevel':
         r = RClass.create(FTreeLevel);
         break;
      case 'TreeNodeType':
         r = RClass.create(FTreeNodeType);
         break;
      case 'TreeNode':
         r = RClass.create(FTreeNode);
         break;
      default:
         throw new TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}
function FTreeView_createNode(){
   var o = this;
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FTreeNode);
      n._tree = o;
      n.psBuild(o._hPanel);
   }
   RHtml.displaySet(n._hPanel, true);
   o._allNodes.push(n);
   return n;
}
function FTreeView_appendNode(n, p){
   var o = this;
   if(!n._statusLinked){
      var nh = n._hPanel;
      if(p){
         var nr = p._hPanel.rowIndex;
         var ns = p._nodes;
         if(ns){
            var nc = ns.count();
            for(var i = nc - 1; i >= 0; i--){
               var pn = ns.get(i)
               if(pn._statusLinked){
                  nr = pn._hPanel.rowIndex;
                  break;
               }
            }
         }
         if(nh.parentElement){
            if(nh.rowIndex > nr){
               nr++;
            }
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr);
         }else{
            o._hNodeRows.appendChild(nh);
            RHtml.tableMoveRow(o._hNodeForm, nh.rowIndex, nr+1);
         }
         n.setLevel(p._level + 1);
      }else{
         o._hNodeRows.appendChild(nh);
         n.setLevel(0);
         o.push(n);
      }
      n._statusLinked = true;
   }
}
function FTreeView_selectNode(n, s){
   var o = this;
   var fn = o._focusNode;
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
            o._focusNode = n;
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
function FTreeView_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   p._tree = o;
   if(RClass.isClass(p, FTreeColumn)){
      o._nodeColumns.set(p._name, p);
   }else if(RClass.isClass(p, FTreeLevel)){
      o._nodeLevels.set(p._id, p);
   }else if(RClass.isClass(p, FTreeNodeType)){
      o._nodeTypes.set(p._typeName, p);
   }else if(RClass.isClass(p, FTreeNode)){
      o._nodes.push(p);
      o._allNodes.push(p);
   }
}
function FTreeView_freeNode(p){
   var o = this;
   if(p._statusLinked){
      p._statusLinked = false;
      p.hidden();
      o._allNodes.remove(p);
      o._freeNodes.push(p);
   }
}
function FTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(RHtml.displayGet(n._hPanel)){
         c++;
      }
   }
   return c * 29;
}
function FTreeView_extendAuto(n){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count;
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(fn._extended);
            if(fn._extended){
               o.extendAuto(fn);
            }
         }
      }
   }
}
function FTreeView_extendAll(n, f){
   var o = this;
   var ns = n ? n._nodes : o._nodes;
   if(ns){
      var nc = ns.count();
      if(nc){
         for(var i = 0; i < nc; i++){
            var fn = ns.get(i);
            fn.extend(f);
            o.extendAll(fn, f);
         }
      }
   }
}
function FTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
function FTreeView_filterNode(pl, pa){
   var o = this;
   var nc = o._allNodes.count();
   var nl = null;
   var na = null;
   if(!pl){
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            n.show(true);
         }
      }
   }else{
      label = label.toLowerCase();
      var arAttr = null;
      var nAttrCount = 0;
      if(pa){
         pa = pa.toLowerCase();
         arAttr = pa.split("|");
         nAttrCount = arAttr.length;
      }
      for(var i = 0; i < nc; i++){
         var n = o._allNodes.get(i);
         if(!n.isDelete){
            nl = n.label.toLowerCase();
            if(arAttr){
               na = n.linkAttr.toLowerCase();
               for(var s = 0; s < nAttrCount; s++){
                  if(na.indexOf(arAttr[s]) != -1){
                     n.show((nl.indexOf(label) != -1));
                     break;
                  }
               }
            }else{
               n.show((nl.indexOf(label) != -1));
            }
         }
      }
   }
}
function FTreeView_clear(){
   var o = this;
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = c - 1; i >= 0; i--){
         ns.get(i).remove();
      }
      ns.clear();
   }
   o._allNodes.clear();
}
function FTreeView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   var ns = o._nodes;
   if(ns){
      ns.dispose();
      o._nodes = null;
   }
   var ns = o._allNodes;
   if(ns){
      ns.dispose();
      o._allNodes = null;
   }
   o._hNodePanel = null;
   o._hNodeForm = null;
   o._hHeadLine = null;
   return true;
}
function FFrame(o){
   o = RClass.inherits(this, o, FContainer);
   o.onBuildPanel = FFrame_onBuildPanel
   return o;
}
function FFrame_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
   o._hPanel.vAlign = 'top';
}
function FFrameSet(o){
   o = RClass.inherits(this, o, FContainer);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._directionCd  = EDirection.Vertical;
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = FFrameSet_onBuildPanel;
   o.construct     = FFrameSet_construct;
   o.appendFrame   = FFrameSet_appendFrame;
   o.appendSpliter = FFrameSet_appendSpliter;
   o.dispose       = FFrameSet_dispose;
   return o;
}
function FFrameSet_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}
function FFrameSet_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._frames = new TObjects();
}
function FFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      var hr = o._hLine;
      if(hr == null){
         hr = o._hLine = RBuilder.appendTableRow(o._hPanel);
      }
      p.setPanel(hr);
      if(p._size.width){
         p._hPanel.width = p._size.width;
      }
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      p.setPanel(hr);
      if(p._size.height){
         p._hPanel.height = p._size.height;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}
function FFrameSet_appendSpliter(){
   var o = this;
   var sp = RClass.create(FFrameSpliter);
   sp._frameset = o;
   sp.psBuild(o._hPanel);
   if(o._directionCd == EDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
function FFrameSet_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FFrameSpliter(o){
   o = RClass.inherits(this, o, FControl, MDragable);
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
   o._directionCd  = EDirection.Horizontal;
   o._alignCd      = EAlign.Left;
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._hDrag        = null;
   o._hSize        = null;
   o.onBuildPanel  = FFrameSpliter_onBuildPanel
   o.ohMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FFrameSpliter_ohMouseEnter);
   o.ohMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FFrameSpliter_ohMouseLeave);
   o.onDragStart   = FFrameSpliter_onDragStart;
   o.onDragMove    = FFrameSpliter_onDragMove;
   o.onDragStop    = FFrameSpliter_onDragStop;
   o.oeBuild       = FFrameSpliter_oeBuild;
   return o;
}
function FFrameSpliter_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Normal'));
}
function FFrameSpliter_ohMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
function FFrameSpliter_ohMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
function FFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == EDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = RHtml.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = EMouseCursor.HSize;
   }else if(o._directionCd == EDirection.Vertical){
      o._dragClientY = e.clientY;
      o._dragPanelY = RHtml.clientY(hc);
      o._sizeY = o._hSize.offsetHeight;
      hds.cursor = EMouseCursor.VSize;
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   hds.left = RHtml.clientX(hc) + 'px';
   hds.top = RHtml.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   RHtml.visibleSet(hd, true);
}
function FFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > 40){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == EDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > 40){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
function FFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === EAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === EAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > 40){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == EDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === EAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === EAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > 40){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   RHtml.visibleSet(hd, false);
}
function FFrameSpliter_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e)
   if(e.isBefore()){
      var fs = o._frameset;
      var h = o._hPanel;
      h.__linker = o;
      var hd = o._hDrag = RBuilder.createDiv(h.ownerDocument, o.styleName('Draging'));
      hd.__linker = o;
      hd.style.position = 'absolute';
      RHtml.displaySet(hd, false);
      RConsole.find(FDragConsole).register(o);
      h.appendChild(hd);
      h.style.cursor = 'e-resize';
      h._plinker = o;
      o.attachEvent('onMouseEnter', h, o.ohMouseEnter);
      o.attachEvent('onMouseLeave', h, o.ohMouseLeave);
   }
   return EEventStatus.Continue;
}
function FFrameSpliter_construct(){
   this.direction = EDirection.Horizontal;
}
function FFrameSpliter_build(){
   var o = this;
   var hf = o.hForm = RBuilder.appendTable(o.hDrag);
   hf.height = 36;
   hc = o.hButton = hf.insertRow().insertCell()
   hc.bgColor = o._dragBackgroundColor;
   hc.style.cursor = 'hand';
   o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
   o.attachEvent('onSplitButtonEnter', hc, o.ohDragButtonEnter);
   o.attachEvent('onSplitButtonLeave', hc, o.ohDragButtonLeave);
   o.attachEvent('onSplitButtonClick', hc, o.ohDragButtonClick);
}
function FFrameSpliter_link(hDrag, hSize){
   var o = this;
   var h = o.hDrag = hDrag;
   o.attachEvent('onSplitDown', h, o.ohDragStart);
   o.attachEvent('onSplitMove', h, o.ohDragMove);
   o.attachEvent('onSplitUp', h, o.ohDragStop);
   o.attachEvent('onSplitDoubleClick', h, o.ohDragDoubleClick);
   if(EDirection.Vertical == o.direction){
      h.style.cursor = 'N-resize'
   }else if(EDirection.Horizontal == o.direction){
      h.style.cursor = 'E-resize'
   }
   o.hSize = hSize;
   var h = o.hLayer = RBuilder.append(null, 'DIV');
   h.style.position = 'absolute';
   h.style.backgroundColor = '#a5eaea';
   h.style.border = '1 solid #70eaea';
   h.style.display = 'none';
   h.zIndex = 30000;
   RBuilder.appendEmpty(h, 1, 1);
}
function FFrameSpliter_click(){
   var o = this;
   var hs = o.hSize;
   if(hs){
      if('none' == hs.style.display){
         hs.style.display = 'block';
         if(o.hButtonIcon){
            o.hButtonIcon.src = RRes.iconPath('ctl.FSpliter_Left');
         }
      }else{
         hs.style.display = 'none';
         if(o.hButtonIcon){
            o.hButtonIcon.src = RRes.iconPath('ctl.FSpliter_Right');
         }
      }
   }
}
function FFrameSpliter_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDrag = null;
   o.hLayer = null;
   o.hSize = null;
   o.hForm = null;
   o.hButton = null;
   o.hButtonIcon = null;
}
function FWorkspace(o){
   o = RClass.inherits(this, o, FContainer);
   o._frames      = null;
   o.onBuildPanel = FWorkspace_onBuildPanel
   return o;
}
function FWorkspace_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Panel'));
}
