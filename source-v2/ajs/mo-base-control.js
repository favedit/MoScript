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
var EColor = new function EColor(){
   var o = this;
   o.Normal        = '#FFFFFF';
   o.Select        = '#F8C59A';
   o.Valid         = '#FFCCCC';
   o.Invalid       = '#FFCCCC';
   o.Edit          = '#FFFFFF';
   o.EditHover     = '#EBFFFF';
   o.Require       = '#FF0000';
   o.Readonly      = '#F0F0F0';
   o.Text          = '#000000';
   o.TextEdit      = '#0066FF';
   o.TextReadonly  = '#333333';
   o.TextInvalid   = 'red';
   o.Delete        = '#DDDDDD';
   o.ColumnReadonly = '#FFFFFF';
   o.Rows          = new Array('#FFFFFF', '#FAFAFA');
   o.RowSelect     = '#cde5ff';
   o.RowHover      = '#E8E8FF';
   o.RowEdit       = '#FFFFFF';
   o.RowEditSelect = '#FDEBDB';
   o.RowEditHover  = '#F8F8E0';
   o.RoundReadonly = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F8F8F8', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
   o.RoundHover = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F1FFFF', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
   o.RoundEdit = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F1FFFF', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
   o.RoundDropReadonly = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
   o.RoundDropHover = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
   o.RoundDropEdit = new Array(
      ['#DAF8F8', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#24C2DB', '#DAF8F8'],
      ['#24C2DB', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#CFF6F6', '#2AD6F0'],
      ['#24C2DB', '#CFF6F6', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#F1FFFF', '#FFFFFF', '#2AD6F0'],
      ['#24C2DB', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2AD6F0'],
      ['#DAF8F8', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#2AD6F0', '#DAF8F8']);
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
var ELayout = new function ELayout(){
   var o = this;
   o.Display = 'P';
   o.Search  = 'S';
   o.Design  = 'G';
   o.Insert  = 'I';
   o.Update  = 'U';
   o.Delete  = 'D';
   o.Zoom    = 'Z';
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
var ESize = new function ESize(){
   var o = this;
   o.Normal     = 0
   o.Horizontal = 1
   o.Vertical   = 2
   o.Both       = 3;
   return o;
}
var EUiLayer = new function EUiLayer(){
   var o = this;
   o.Default = 20000;
   o.Shadow  =  5000;
   o.Disable =  5000;
   o.Window  = 20000;
   o.Drop    = 40000;
   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
function FUiCanvas(o){
   o = RClass.inherits(this, o, FUiControl);
   o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
   o.onBuildPanel = FUiCanvas_onBuildPanel;
   o.onBuild      = FUiCanvas_onBuild;
   o.construct    = FUiCanvas_construct;
   o.dispose      = FUiCanvas_dispose;
   return o;
}
function FUiCanvas_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.create(p, 'CANVAS', o.styleName('Canvas'));
}
function FUiCanvas_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiControl.onBuild.call(o, p);
}
function FUiCanvas_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiCanvas_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
}
function FUiComponent(o){
   o = RClass.inherits(this, o, FObject, MProperty, MClone);
   o._parent       = null;
   o._components   = null;
   o._name         = RClass.register(o, new APtyString('_name'));
   o._label        = RClass.register(o, new APtyString('_label'));
   o.oeInitialize  = FUiComponent_oeInitialize;
   o.oeRelease     = FUiComponent_oeRelease;
   o.name          = FUiComponent_name;
   o.setName       = FUiComponent_setName;
   o.label         = FUiComponent_label;
   o.setLabel      = FUiComponent_setLabel;
   o.isParent      = FUiComponent_isParent;
   o.topComponent  = FUiComponent_topComponent;
   o.hasComponent  = FUiComponent_hasComponent;
   o.components    = FUiComponent_components;
   o.push          = FUiComponent_push;
   o.process       = FUiComponent_process;
   o.psInitialize  = FUiComponent_psInitialize;
   o.psRelease     = FUiComponent_psRelease;
   o.toString      = FUiComponent_toString;
   o.dispose       = FUiComponent_dispose;
   o.innerDumpInfo = FUiComponent_innerDumpInfo;
   o.innerDump     = FUiComponent_innerDump;
   return o;
}
function FUiComponent_oeInitialize(e){
   return EEventStatus.Continue;
}
function FUiComponent_oeRelease(e){
   return EEventStatus.Continue;
}
function FUiComponent_name(){
   return this._name;
}
function FUiComponent_setName(p){
   this._name = p;
}
function FUiComponent_label(){
   return this._label;
}
function FUiComponent_setLabel(p){
   this._label = p;
}
function FUiComponent_isParent(p){
   while(p){
      if(p == this){
         return true;
      }
      p = p._parent;
   }
}
function FUiComponent_topComponent(c){
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
function FUiComponent_hasComponent(){
   var ps = this._components;
   return ps ? !ps.isEmpty() : false;
}
function FUiComponent_components(){
   var o = this;
   var r = o._components;
   if(r == null){
      r = new TDictionary();
      o._components = r;
   }
   return r;
}
function FUiComponent_push(p){
   var o = this;
   if(RClass.isClass(p, FUiComponent)){
      var ps = o.components();
      p._parent = o;
      if(p._name == null){
         p._name = ps.count();
      }
      ps.set(p._name, p);
   }
}
function FUiComponent_process(e){
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
   if(RClass.isClass(o, MUiContainer)){
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
function FUiComponent_psInitialize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeInitialize', FUiComponent);
   o.process(e);
   e.dispose();
}
function FUiComponent_psRelease(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRelease', FUiComponent);
   o.process(e);
   e.dispose();
}
function FUiComponent_toString(){
   var o = this;
   return RClass.dump(o) + ':label=' + o._label;
}
function FUiComponent_dispose(){
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
function FUiComponent_innerDumpInfo(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append(',name=', o._name);
   s.append(',label=', o._label);
}
function FUiComponent_innerDump(s, l){
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
function FUiContainer(o){
   o = RClass.inherits(this, o, FUiControl, MUiContainer);
   o._controls           = null;
   o.oeDesign            = RMethod.empty;
   o.construct           = FUiContainer_construct;
   o.hasControl          = FUiContainer_hasControl;
   o.findControl         = FUiContainer_findControl;
   o.searchControl       = FUiContainer_searchControl;
   o.controls            = FUiContainer_controls;
   o.panel               = FUiContainer_panel;
   o.focusFirstControl   = FUiContainer_focusFirstControl;
   o.setControlsProperty = FUiContainer_setControlsProperty;
   o.storeConfig         = FUiContainer_storeConfig;
   o.push                = FUiContainer_push;
   o.dispose             = FUiContainer_dispose;
   return o;
}
function FUiContainer_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiContainer_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}
function FUiContainer_findControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
      }
   }
   return null;
}
function FUiContainer_searchControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
         if(RClass.isClass(c, FUiContainer)){
            var f = c.searchControl(p);
            if(f){
               return f;
            }
         }
      }
   }
   return null;
}
function FUiContainer_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new TDictionary();
      o._controls = r;
   }
   return r;
}
function FUiContainer_panel(t){
   var o = this;
   if(t == EPanel.Container){
      return o._hPanel;
   }
   return o.__base.FUiControl.panel.call(o, t);
}
function FUiContainer_focusFirstControl(){
   return null;
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var p = cs.value(i);
         if(RClass.isClass(c, MFocus) && c.testFocus()){
            if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                return c.focus();
            }
         }
      }
      RConsole.find(FFocusConsole).focus(o);
   }
}
function FUiContainer_setControlsProperty(p, vs){
   var o = this;
   var cs = o._controls;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var c = cs.value(i);
         c[p] = vs[n];
      }
   }
}
function FUiContainer_storeConfig(x){
   var o = this;
   x.name = RClass.name(o);
   o.saveConfig(x);
   var ps = o._components;
   if(ps){
      var c = ps.count();
      for(var i = 0; i < c; i++){
         var p = ps.value(i);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FUiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
function FUiContainer_push(p){
   var o = this;
   o.__base.FUiControl.push.call(o, p);
   if(RClass.isClass(p, FUiControl)){
      o.controls().set(p._name, p);
      o.appendChild(p);
   }
}
function FUiContainer_dispose(){
   var o = this;
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   o.__base.FUiControl.dispose.call(o);
}
function FUiControl(o){
   o = RClass.inherits(this, o, FUiComponent, MStyle, MSize, MPadding);
   o._visible       = RClass.register(o, new APtyBoolean('_visible'), true);
   o._disable       = RClass.register(o, new APtyBoolean('_disable'), false);
   o._nowrap        = RClass.register(o, new APtyBoolean('_nowrap'), false);
   o._hint          = RClass.register(o, new APtyString('_hint'));
   o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
   o._layoutCd      = ELayout.Display;
   o._sizeCd        = ESize.Normal;
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   o._statusBuilded = false;
   o._storage       = null;
   o._hParent       = null;
   o._hPanel        = null;
   o.onEnter        = RClass.register(o, new AEventMouseEnter('onEnter'), FUiControl_onEnter);
   o.onLeave        = RClass.register(o, new AEventMouseLeave('onLeave'), FUiControl_onLeave);
   o.onBuildPanel   = FUiControl_onBuildPanel;
   o.onBuild        = FUiControl_onBuild;
   o.onBuilded      = RMethod.empty;
   o.oeMode         = FUiControl_oeMode;
   o.oeEnable       = FUiControl_oeEnable;
   o.oeVisible      = FUiControl_oeVisible;
   o.oeResize       = FUiControl_oeResize;
   o.oeRefresh      = FUiControl_oeRefresh;
   o.construct      = FUiControl_construct;
   o.topControl     = FUiControl_topControl;
   o.panel          = FUiControl_panel;
   o.isVisible      = FUiControl_isVisible;
   o.setVisible     = FUiControl_setVisible;
   o.show           = FUiControl_show;
   o.hide           = FUiControl_hide;
   o.isEnable       = FUiControl_isEnable;
   o.setEnable      = FUiControl_setEnable;
   o.enable         = FUiControl_enable;
   o.disable        = FUiControl_disable;
   o.attachEvent    = FUiControl_attachEvent;
   o.linkEvent      = FUiControl_linkEvent;
   o.callEvent      = FUiControl_callEvent;
   o.psMode         = FUiControl_psMode;
   o.psDesign       = FUiControl_psDesign;
   o.psEnable       = FUiControl_psEnable;
   o.psVisible      = FUiControl_psVisible;
   o.psResize       = FUiControl_psResize;
   o.psRefresh      = FUiControl_psRefresh;
   o.isBuild        = FUiControl_isBuild;
   o.build          = FUiControl_build;
   o.builded        = FUiControl_builded;
   o.refresh        = FUiControl_refresh;
   o.setPanel       = FUiControl_setPanel;
   o.dispose        = FUiControl_dispose;
   return o;
}
function FUiControl_onEnter(e){
   var o = this;
   RConsole.find(FFocusConsole).enter(o);
   if(o._hint){
      RWindow.setStatus(o._hint);
   }
}
function FUiControl_onLeave(e){
   var o = this;
   RConsole.find(FFocusConsole).leave(o);
   if(o._hint){
      RWindow.setStatus();
   }
}
function FUiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiControl_onBuild(p){
   var o = this;
   o.onBuildPanel(p);
   if(o._statusVisible != o._visible){
      o.setVisible(o._visible);
   }
   var h = o._hPanel;
   RHtml.linkSet(h, 'control', o);
   o.attachEvent('onEnter', h);
   o.attachEvent('onLeave', h);
   o.refreshBounds();
   o.refreshPadding();
}
function FUiControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return EEventStatus.Continue;
}
function FUiControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return EEventStatus.Continue;
}
function FUiControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return EEventStatus.Continue;
}
function FUiControl_oeResize(e){
   return EEventStatus.Continue;
}
function FUiControl_oeRefresh(e){
   return EEventStatus.Continue;
}
function FUiControl_construct(){
   var o = this;
   o.__base.FUiComponent.construct.call(o);
   o.__base.MStyle.construct.call(o);
   o.__base.MSize.construct.call(o);
   o.__base.MPadding.construct.call(o);
}
function FUiControl_topControl(c){
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
         if(!RClass.isClass(r._parent, FUiControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
function FUiControl_panel(p){
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
function FUiControl_isVisible(){
   return _statusVisible;
}
function FUiControl_setVisible(p){
   var o = this;
   o._statusVisible = p;
   var h = o.panel(EPanel.Container);
   if(h){
      RHtml.visibleSet(h, p);
   }
}
function FUiControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
function FUiControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
function FUiControl_isEnable(){
   return this._statusEnable;
}
function FUiControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
function FUiControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
function FUiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
function FUiControl_attachEvent(n, h, m, u){
   return RControl.attachEvent(this, n, h, m, u);
}
function FUiControl_linkEvent(t, n, h, m){
   return RControl.linkEvent(this, t, n, h, m);
}
function FUiControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
function FUiControl_psMode(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeMode', FUiControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
function FUiControl_psDesign(m, f){
   var o = this;
   RConsole.find(FDesignConsole).setFlag(m, f, o);
   var e = new TEventProcess(null, o, 'oeDesign', MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
function FUiControl_psEnable(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeEnable', FUiControl)
   e.enable = v;
   o.process(e);
   e.dispose();
}
function FUiControl_psVisible(v){
   var o = this;
   var e = new TEventProcess(null, o, 'oeVisible', FUiControl);
   e.visible = v;
   o.process(e);
   e.dispose();
}
function FUiControl_psResize(){
   var o = this;
   var e = new TEventProcess(null, o, 'oeResize', FUiControl);
   o.process(e);
   e.dispose();
}
function FUiControl_psRefresh(t){
   var o = this;
   var e = new TEventProcess(null, o, 'oeRefresh', FUiControl);
   o.process(e);
   e.dispose();
}
function FUiControl_isBuild(){
   return this._statusBuild;
}
function FUiControl_build(p){
   var o = this;
   if(o._statusBuild){
      throw new TError(o, 'Current control is already builded.');
   }
   var d = null;
   if(p.createElement){
      d = p;
   }else if(p.ownerDocument && p.ownerDocument.createElement){
      d = p.ownerDocument;
   }else if(p.hDocument){
      d = p.hDocument;
   }else{
      throw new TError("Build document is invalid. (document={1})", p);
   }
   var a = new SArguments();
   a.owner = o;
   a.hDocument = d;
   o.onBuild(a);
   RObject.free(a);
   o._statusBuild = true;
}
function FUiControl_builded(p){
   var o = this;
   if(!o._statusBuild){
      throw new TError(o, 'Current control is not build.');
   }
   if(o._statusBuilded){
      throw new TError(o, 'Current control is already builded.');
   }
   o.onBuilded(p);
   o._statusBuilded = true;
}
function FUiControl_refresh(){
   var o = this;
   if(!o._statusBuild){
      throw new TError(o, 'Current control is not build.');
   }
}
function FUiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}
function FUiControl_dispose(){
   var o = this;
   o._disable = null;
   o._nowrap = null;
   o._hint = null;
   o._styleContainer = null;
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   o._hParent = null;
   o._hPanel = RHtml.free(o._hPanel);
   o.__base.MPadding.dispose.call(o);
   o.__base.MSize.dispose.call(o);
   o.__base.MStyle.dispose.call(o);
   o.__base.FUiComponent.dispose.call(o);
}
function MDataContainer(o){
   o = RClass.inherits(this, o, MDataValue);
   o.dsDataLoad = MDataContainer_dsDataLoad;
   o.dsDataSave = MDataContainer_dsDataSave;
   return o;
}
function MDataContainer_dsDataLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataLoad', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}
function MDataContainer_dsDataSave(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDataSave', MDataValue);
   e.source = p;
   o.process(e);
   e.dispose();
}
function MDataProperties(o){
   o = RClass.inherits(this, o);
   o._dataProperties = null;
   o.dataProperties  = MDataProperties_dataProperties;
   o.dataPropertyGet = MDataProperties_dataPropertyGet;
   o.dataPropertySet = MDataProperties_dataPropertySet;
   return o;
}
function MDataProperties_dataProperties(n, c){
   var o = this;
   var d = o._dataProperties;
   if(d == null){
      d = o._dataProperties = new TDictionary();
   }
   return d;
}
function MDataProperties_dataPropertyGet(n){
   var o = this;
   var d = o._dataProperties;
   return d ? d.get(n) : null;
}
function MDataProperties_dataPropertySet(n, v){
   this.dataProperties().set(n, v);
}
function MDataValue(o){
   o = RClass.inherits(this, o);
   o.oeDataLoad = RMethod.empty;
   o.oeDataSave = RMethod.empty;
   return o;
}
function MDescribeFrame(o){
   o = RClass.inherits(this, o);
   o._frameName  = null;
   o.buildDefine = MDescribeFrame_buildDefine;
   return o;
}
function MDescribeFrame_buildDefine(h, n){
   var o = this;
   if(RString.isEmpty(n)){
      n = o._frameName;
   }
   var fc = RConsole.find(FDescribeFrameConsole);
   var x = fc.load(n);
   RControl.build(o, x, null, h);
}
function MDesign(o){
   o = RClass.inherits(this, o);
   o._statusDesign      = false;
   o._storage       = null;
   o.oeDesign      = MDesign_oeDesign;
   o.onDesignEnter = RClass.register(o, new AEventMouseEnter('onDesignEnter'), MDesign_onDesignEnter);
   o.onDesignLeave = RClass.register(o, new AEventMouseEnter('onDesignLeave'), MDesign_onDesignLeave);
   o.onDesignBegin = RClass.register(o, new AEventMouseEnter('onDesignBegin'), MDesign_onDesignBegin);
   o.onDesignEnd   = RClass.register(o, new AEventMouseEnter('onDesignEnd'), MDesign_onDesignEnd);
   return o;
}
function MDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case EDesign.Move:
            var o = this;
            var h = o._hPanel;
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
            var h = o._hPanel;
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
function MDesign_onDesignEnter(p){
   var o = this;
   o._hPanel.className = o.style('Design');
}
function MDesign_onDesignLeave(p){
}
function MDesign_onDesignBegin(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   g.designStyle = o._hPanel.className;
   g.designLayer = o._hPanel.zIndex;
   o._hPanel.className = o.style('DesignDrag');
   o._statusDesign = true;
}
function MDesign_onDesignEnd(p){
   var o = this;
   var g = o._storage = RObject.nvlObj(o._storage);
   o._hPanel.className = g.designStyle;
   o._hPanel.zIndex = g.designLayer;
   o._statusDesign = false;
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
   return o;
}
function MEditable_testEdit(m){
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
function MEditChange(o){
   o = RClass.inherits(this, o);
   o._styleChangePanel = RClass.register(o, new AStyle('_styleChangePanel'));
   o._styleChangeIcon  = RClass.register(o, new AStyle('_styleChangeIcon'));
   o._hChangePanel     = null;
   o._hChangeIcon      = null;
   o.onBuildEditChange = MEditChange_onBuildEditChange;
   o.onChangeEnter     = RClass.register(o, new AEventMouseEnter('onChangeEnter'), MEditChange_onChangeEnter);
   o.onChangeLeave     = RClass.register(o, new AEventMouseLeave('onChangeLeave'), MEditChange_onChangeLeave);
   o.onChangeClick     = RClass.register(o, new AEventClick('onChangeClick'), MEditChange_onChangeClick);
   o.construct         = MEditChange_construct;
   o.changeSet         = MEditChange_changeSet;
   o.dispose           = MEditChange_dispose;
   return o;
}
function MEditChange_onBuildEditChange(p){
   var o = this;
   var h = o._hChangePanel;
   h.className = o.styleName('ChangePanel', MEditChange);
   h.vAlign = 'top';
   h.width = 5;
   o.attachEvent('onChangeEnter', h, o.onChangeEnter);
   o.attachEvent('onChangeLeave', h, o.onChangeLeave);
   o.attachEvent('onChangeClick', h, o.onChangeClick);
   var hi = o._hChangeIcon = RBuilder.appendIcon(h, o.styleName('ChangeIcon', MEditChange), 'control.change');
   hi._pname = 'change.icon';
}
function MEditChange_onChangeEnter(e){
   var o = this;
}
function MEditChange_onChangeLeave(e){
   var o = this;
}
function MEditChange_onChangeClick(e){
}
function MEditChange_construct(){
}
function MEditChange_changeSet(p){
}
function MEditChange_dispose(){
   var o = this;
   RHtml.free(o._hChangeIcon);
   o._hChangeIcon = null;
   RHtml.free(o._hChangePanel);
   o._hChangePanel = null;
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
function MEditDrop(o){
   o = RClass.inherits(this, o);
   o._styleDropPanel = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleDropIcon  = RClass.register(o, new AStyle('_styleDropIcon'));
   o._hDropPanel     = null;
   o._hDropIcon      = null;
   o.onBuildEditDrop = MEditDrop_onBuildEditDrop;
   o.onDropEnter     = RClass.register(o, new AEventMouseEnter('onDropEnter'), MEditDrop_onDropEnter);
   o.onDropLeave     = RClass.register(o, new AEventMouseLeave('onDropLeave'), MEditDrop_onDropLeave);
   o.onDropClick     = RClass.register(o, new AEventClick('onDropClick'), MEditDrop_onDropClick);
   o.construct       = MEditDrop_construct;
   o.dispose         = MEditDrop_dispose;
   return o;
}
function MEditDrop_onBuildEditDrop(p){
   var o = this;
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   var hi = o._hDropIcon = RBuilder.appendIcon(h, o.styleName('DropIcon', MEditDrop), 'control.drop');
   hi.align = 'center';
}
function MEditDrop_onDropEnter(e){
   var o = this;
}
function MEditDrop_onDropLeave(e){
   var o = this;
}
function MEditDrop_onDropClick(e){
}
function MEditDrop_construct(){
}
function MEditDrop_dispose(){
   var o = this;
   RHtml.free(o._hDropIcon);
   o._hDropIcon = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
}
function MEditReference(o){
   o = RClass.inherits(this, o);
   o._lovService    = RClass.register(o, new APtyString('_lovService', null, EDataService.WebForm));
   o._lovReference  = RClass.register(o, new APtyString('_lovReference'));
   o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
   o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
   o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
   o._listView     = null;
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
   return !RString.isEmpty(this._lovReference) && this._editable;
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
   var v = o._listView;
   if(!v){
      v = o._listView = top.RControl.create(top.FListWindow);
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
   o = RClass.inherits(this, o);
   o._dataValue = RClass.register(o, new APtyString('_dataValue'));
   o.get        = MEditValue_get;
   o.set        = MEditValue_set;
   return o;
}
function MEditValue_get(){
   return this._dataValue;
}
function MEditValue_set(p){
   var o = this;
   o._dataValue = RString.nvl(p);
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
function MEditValue_reget(){
   return this.descriptor().formatValue(this.text());
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
   o._zoomReference = RClass.register(o, new APtyString('_zoomReference'));
   o._zoomField     = RClass.register(o, new APtyString('_zoomField'));
   o.testZoom   = MEditZoom_testZoom;
   o.doZoom     = MEditZoom_doZoom;
   return o;
}
function MEditZoom_testZoom(){
   return !RString.isEmpty(this._zoomReference);
}
function MEditZoom_doZoom(p){
   RFormSpace.doZoom(this, p);
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
function MHorizontal(o){
   o = RClass.inherits(this, o);
   o.setVisible = MHorizontal_setVisible;
   return o;
}
function MHorizontal_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function MListenerBlur(o){
   o = RClass.inherits(this, o, MListener);
   o.addBlurListener     = MListenerBlur_addBlurListener;
   o.processBlurListener = MListenerBlur_processBlurListener;
   return o;
}
function MListenerBlur_addBlurListener(w, m){
   return this.addListener(EEvent.Blur, w, m);
}
function MListenerBlur_processBlurListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Blur, p1, p2, p3, p4, p5);
}
function MListenerClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addClickListener     = MListenerClick_addClickListener;
   o.removeClickListener  = MListenerClick_removeClickListener;
   o.processClickListener = MListenerClick_processClickListener;
   return o;
}
function MListenerClick_addClickListener(w, m){
   return this.addListener(EEvent.Click, w, m);
}
function MListenerClick_removeClickListener(w, m){
   return this.removeListener(EEvent.Click, w, m);
}
function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
}
function MListenerDataChanged(o){
   o = RClass.inherits(this, o, MListener);
   o.addDataChangedListener     = MListenerDataChanged_addDataChangedListener;
   o.processDataChangedListener = MListenerDataChanged_processDataChangedListener;
   return o;
}
function MListenerDataChanged_addDataChangedListener(w, m){
   return this.addListener(EEvent.DataChanged, w, m);
}
function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.DataChanged, p1, p2, p3, p4, p5);
}
function MListenerDoubleClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addClickListener     = MListenerDoubleClick_addClickListener;
   o.processClickListener = MListenerDoubleClick_processClickListener;
   return o;
}
function MListenerDoubleClick_addClickListener(w, m){
   return this.addListener(EEvent.DoubleClick, w, m);
}
function MListenerDoubleClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
}
function MListenerEnter(o){
   o = RClass.inherits(this, o, MListener);
   o.addEnterListener     = MListenerEnter_addEnterListener;
   o.processEnterListener = MListenerEnter_processEnterListener;
   return o;
}
function MListenerEnter_addEnterListener(w, m){
   return this.addListener(EEvent.Enter, w, m);
}
function MListenerEnter_processEnterListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Enter, p1, p2, p3, p4, p5);
}
function MListenerFocus(o){
   o = RClass.inherits(this, o, MListener);
   o.addFocusListener     = MListenerFocus_addFocusListener;
   o.processFocusListener = MListenerFocus_processFocusListener;
   return o;
}
function MListenerFocus_addFocusListener(w, m){
   return this.addListener(EEvent.Focus, w, m);
}
function MListenerFocus_processFocusListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Focus, p1, p2, p3, p4, p5);
}
function MListenerItemClick(o){
   o = RClass.inherits(this, o, MListener);
   o.addItemClickListener     = MListenerItemClick_addItemClickListener;
   o.processItemClickListener = MListenerItemClick_processItemClickListener;
   return o;
}
function MListenerItemClick_addItemClickListener(w, m){
   return this.addListener(EEvent.ItemClick, w, m);
}
function MListenerItemClick_processItemClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.ItemClick, p1, p2, p3, p4, p5);
}
function MListenerLeave(o){
   o = RClass.inherits(this, o, MListener);
   o.addLeaveListener     = MListenerLeave_addLeaveListener;
   o.processLeaveListener = MListenerLeave_processLeaveListener;
   return o;
}
function MListenerLeave_addLeaveListener(w, m){
   return this.addListener(EEvent.Leave, w, m);
}
function MListenerLeave_processLeaveListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Leave, p1, p2, p3, p4, p5);
}
function MListenerSelected(o){
   o = RClass.inherits(this, o, MListener);
   o.addSelectedListener     = MListenerSelected_addSelectedListener;
   o.processSelectedListener = MListenerSelected_processSelectedListener;
   return o;
}
function MListenerSelected_addSelectedListener(w, m){
   return this.addListener(EEvent.Selected, w, m);
}
function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Selected, p1, p2, p3, p4, p5);
}
function MPadding(o){
   o = RClass.inherits(this, o);
   o._padding       = RClass.register(o, new APtyPadding('_padding'));
   o.construct      = MPadding_construct;
   o.padding        = MPadding_padding;
   o.setPadding     = MPadding_setPadding;
   o.refreshPadding = MPadding_refreshPadding;
   o.dispose        = MPadding_dispose;
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
   var o = this;
   var p = o._padding;
   var h = o.panel(EPanel.Container);
   if(l != null){
      p.left = l;
      if(h){
         h.style.paddingLeft = (l == 0) ? null : l + 'px';
      }
   }
   if(t != null){
      p.top = t;
      if(h){
         h.style.paddingTop = (t == 0) ? null : t + 'px';
      }
   }
   if(r != null){
      p.right= r;
      if(h){
         h.style.paddingRight = (r == 0) ? null : r + 'px';
      }
   }
   if(b != null){
      p.bottom = b;
      if(h){
         h.style.paddingBottom = (b == 0) ? null : b + 'px';
      }
   }
}
function MPadding_refreshPadding(){
   var o = this;
   var p = o._padding;
   o.setPadding(p.left, p.top, p.right, p.bottom);
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
function MPropertyCheck(o){
   o = RClass.inherits(this, o);
   o._valueTrue  = RClass.register(o, new APtyNumber('_valueTrue'));
   o._valueFalse = RClass.register(o, new APtyNumber('_valueFalse'));
   return o;
}
function MPropertyEdit(o){
   o = RClass.inherits(this, o, MEditValidator, MEditReference, MEditZoom);
   o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
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
function MPropertyNumber(o){
   o = RClass.inherits(this, o);
   o._valueMin = RClass.register(o, new APtyNumber('_valueMin'));
   o._valueMax = RClass.register(o, new APtyNumber('_valueMax'));
   return o;
}
function MPropertySelect(o){
   o = RClass.inherits(this, o, MEditValidator, MEditReference, MEditZoom);
   o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
   o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
   o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
   o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
   o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
   o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
   o.oeValid         = MPropertySelect_oeValid;
   return o;
}
function MPropertySelect_oeValid(e){
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
   o._location       = RClass.register(o, new APtyPoint2('_location'));
   o._size           = RClass.register(o, new APtySize2('_size'));
   o.construct       = MSize_construct;
   o.left            = MSize_left;
   o.setLeft         = MSize_setLeft;
   o.top             = MSize_top;
   o.setTop          = MSize_setTop;
   o.location        = MSize_location;
   o.setLocation     = MSize_setLocation;
   o.refreshLocation = MSize_refreshLocation;
   o.width           = MSize_width;
   o.setWidth        = MSize_setWidth;
   o.height          = MSize_height;
   o.setHeight       = MSize_setHeight;
   o.size            = MSize_size;
   o.setSize         = MSize_setSize;
   o.refreshSize     = MSize_refreshSize;
   o.setBounds       = MSize_setBounds;
   o.refreshBounds   = MSize_refreshBounds;
   o.dispose         = MSize_dispose;
   o.innerDump       = MSize_innerDump;
   return o;
}
function MSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}
function MSize_left(){
   return this._location.x;
}
function MSize_setLeft(p){
   this.setLocation(p, null);
}
function MSize_top(){
   return this._location.y;
}
function MSize_setTop(p){
   this.setLocation(null, p);
}
function MSize_location(){
   return this._location;
}
function MSize_setLocation(x, y){
   var o = this;
   var t = o.panel(EPanel.Size);
   if(x != null){
      o._location.x = x;
      if(t){
         t.style.left = (x == 0) ? null : x + 'px';
      }
   }
   if(y != null){
      o._location.y = y;
      if(t){
         t.style.top = (y == 0) ? null : y + 'px';
      }
   }
}
function MSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
}
function MSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}
function MSize_width(){
   return this._size.width;
}
function MSize_setWidth(p){
   this.setSize(p, null);
}
function MSize_height(){
   return this._size.width;
}
function MSize_setHeight(p){
   this.setSize(null, p);
}
function MSize_size(){
   return this._size;
}
function MSize_setSize(w, h){
   var o = this;
   var t = o.panel(EPanel.Size);
   if(w != null){
      o._size.width = w;
      if(t){
         if(t.tagName == 'TD'){
            if(w != 0){
               t.width = w;
            }
         }else{
            t.style.width = (w == 0) ? null : w + 'px';
         }
      }
   }
   if(h != null){
      o._size.height = h;
      if(t){
         if(t.tagName == 'TD'){
            if(h != 0){
               t.height = h;
            }
         }else{
            t.style.height = (h == 0) ? null : h + 'px';
         }
      }
   }
}
function MSize_refreshSize(){
   var o = this;
   o.setSize(o._size.width, o._size.height);
}
function MSize_setBounds(l, t, w, h){
   var o = this;
   o.setLocation(l, t);
   o.setSize(w, h);
}
function MSize_refreshBounds(){
   var o = this;
   o.refreshLocation();
   o.refreshSize();
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
   s.append('MSize:');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
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
function MSize_resetSize(){
   var o = this;
   o.setBounds(o.left, o.top, o.left+o.width-1, o.top+o.height-1, true)
}
function MSize_calcRect(){
   this.rect = RRect.nvl(this.rect);
   RHtml.toRect(this.rect, this.hPanel);
   return this.rect;
}
function MSize_setBounds2(l, t, r, b, force){
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
   var o = this;
   var f = c ? c : o;
   var tn = RClass.name(f);
   var t = RClass.forName(tn);
   return t.style(n);
}
function MStyle_styleIcon(n, c){
   return RClass.name(c ? c : this, true) + '_' + n;
}
function MStyle_styleIconPath(n, c){
   return RResource.iconPath(RClass.name(c ? c : this, true) + '_' + n);
}
function MUiContainer(o){
   o = RClass.inherits(this, o);
   o.createChild = MUiContainer_createChild;
   o.appendChild = RMethod.empty;
   return o;
}
function MUiContainer_createChild(p){
   var c = RControl.newInstance(p);
   c._parent = this;
   return c;
}
function MVertical(o){
   o = RClass.inherits(this, o);
   o.setVisible = MHorizontal_setVisible;
   return o;
}
function MHorizontal_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      RHtml.displaySet(h, p);
   }
}
var RApplication = new function RApplication(){
   var o = this;
   o._workspaces   = new TDictionary();
   o.initialize    = RApplication_initialize;
   o.findWorkspace = RApplication_findWorkspace;
   o.release       = RApplication_release;
   return o;
}
function RApplication_initialize(){
   var o = this;
   RBrowser.construct();
   RWindow.connect(window);
   RKeyboard.construct();
}
function RApplication_findWorkspace(p){
   var o = this;
   var n = RClass.name(p);
   var ws = o._workspaces;
   var w = ws.get(n);
   if(w == null){
      w = RClass.create(p);
      ws.set(n, w);
   }
   return w;
}
function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
      RLogger.error(e);
   }
}
var RControl = new function RControl(){
   var o = this;
   o.PREFIX             = 'FUi';
   o.newInstance        = RControl_newInstance;
   o.attachEvent        = RControl_attachEvent;
   o.innerCreate        = RControl_innerCreate;
   o.create             = RControl_create;
   o.innerbuild         = RControl_innerbuild;
   o.build              = RControl_build;
   o.inMoving           = false;
   o.inSizing           = false;
   o.inDesign           = false;
   o.instances          = new TList();
   o.events             = new TMap();
   o.controls           = new TMap();
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
   return o;
}
function RControl_newInstance(p){
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
function RControl_attachEvent(c, n, h, m, u){
   var o = this;
   var e = null;
   var p = c[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(EAnnotation.Event, n);
      e = a.create();
      e.annotation = a;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = REvent.onProcess;
      REvent.find(h).push(a.linker(), e);
      RHtml.linkSet(h, '_plink', c);
      a.bind(h, u);
   }
   return e;
}
function RControl_innerCreate(pc, px, pa){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px)
   }
   if(RClass.isClass(pc, MUiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n, pa);
         if(c){
            o.innerCreate(c, n, pa);
            pc.push(c);
         }
      }
   }
}
function RControl_create(pc, px, pa){
   var o = this;
   var c = null;
   if(pc){
      c = pc;
   }else{
      c = RControl.newInstance(px.name());
   }
   o.innerCreate(c, px, pa);
   return c;
}
function RControl_innerbuild(pr, pc, px, pa, ph){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px);
   }
   var l = px.get('linker');
   if(l && pr){
      pr[l] = pc;
   }
   if(RClass.isClass(pc, FUiControl)){
      if(!pc.isBuild()){
         pc.build(ph);
      }else{
         pc.refresh();
      }
   }
   if(pc.__typed){
      pr = pc;
   }
   if(RClass.isClass(pc, MUiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n);
         if(!c){
            throw new TError('Invalid create child.');
         }
         o.innerbuild(pr, c, n, pa, ph);
         pc.push(c);
      }
   }
   if(RClass.isClass(pc, FUiControl)){
      pc.builded(ph);
   }
}
function RControl_build(c, x, a, h){
   var o = this;
   if(!c){
      c = RControl.newInstance(x);
   }
   o.innerbuild(c, c, x, a, h);
   return c;
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
var REvent = new function(){
   var o = this;
   o._objects  = new Array();
   o.ohEvent   = REvent_ohEvent;
   o.onProcess = REvent_onProcess;
   o.find      = REvent_find;
   o.process   = REvent_process;
   o.release   = REvent_release;
   o.current   = 0;
   o.events    = new Array();
   o.nvl       = REvent_nvl;
   o.alloc     = REvent_alloc;
   o.free      = REvent_free;
   return o;
}
function REvent_ohEvent(e){
   REvent.process(this, e ? e : window.event);
}
function REvent_onProcess(e){
   var e = this;
   var ea = e.annotation;
   if(ea._logger){
      RLogger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
   }
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
               if(ea._logger){
                  RLogger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
               }
               e.ohProcess.call(e.source, e);
            }else if(e.onProcess){
               RConsole.find(FFrameEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
function REvent_release(){
   var o = this;
   var v = o._objects;
   if(v){
      RMemory.free(v);
      o._objects = null;
   }
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
var RUiLayer = new function RUiLayer(){
   var o = this;
   o._layers = new Array();
   o.next    = RUiLayer_next;
   o.free    = RUiLayer_free;
   return o;
}
function RUiLayer_next(p){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   o._layers[n] = ++c;
   return c;
}
function RUiLayer_free(p, l){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   --c;
   if(c > n){
      o._layers[n] = c;
   }
   return c;
}
function TDatasetFetchArg(o){
   if(!o){o = this;}
   o.datasets   = new TDictionary();
   o.saveConfig = TDatasetFetchArg_saveConfig;
   o.process    = TDatasetFetchArg_process;
   return o;
}
function TDatasetFetchArg_saveConfig(p){
   var o = this;
   p.set('name', o.name);
}
function TDatasetFetchArg_process(){
   var o = this;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
function TDatasetFetchArg_push(v){
   var o = this;
   if(RClass.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(RClass.isClass(v, TOrderItem)){
      o.orders.push(v);
   }
}
function TDatasetFetchArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
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
function TOrderItem(o){
   if(!o){o = this;}
   return o;
}
function TOrderItem_set(n, t){
   var o = this;
   o.name = n;
   o.type = t;
}
function TOrderItem_toNode(){
   var o = this;
   var n = new TNode('OrderItem');
   n.set('name', o.name);
   n.set('type', o.type);
   return n;
}
function TOrderItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   return as.pack();
}
function TOrderItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name = as.get("name");
   o.type = as.get("type");
}
function TOrderItems(o){
   if(!o){o = this;}
   TObjects(o);
}
function TOrderItems_pack(){
   var o = this;
   var ts = new TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
function TOrderItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TOrderItem();
      ti.unpack(t);
      o.push(ti);
   }
}
function TSearchItem(o){
   if(!o){o = this;}
   return o;
}
function TSearchItem_set(n, v, t, f){
   var o = this;
   o.name  = n;
   o.type  = RString.nvl(t, ESearch.Equals);
   o.value = v;
   o.format = f;
}
function TSearchItem_toNode(){
   var o = this;
   var n = new TNode('SearchItem');
   n.set('name', o.name);
   n.set('type', o.type);
   n.set('value', o.value);
   n.set('format', o.format);
   return n;
}
function TSearchItem_equals(s){
   var o = this;
   if(o.name == s.name && o.type == s.type && o.value == s.value){
	   return true;
   }
   return false;
}
function TSearchItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   as.set("value", o.value);
   as.set("format", o.format);
   return as.pack();
}
function TSearchItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name  = as.get("name");
   o.type  = as.get("type");
   o.value = as.get("value");
   o.format = as.get("format");
}
function TSearchItems(o){
   if(!o){o = this;}
   TObjects(o);
}
function TSearchItems_pack(){
   var o = this;
   var ts = new TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
function TSearchItems_removeAll(v){
   if(null != v){
      var o = this;
      var n = 0;
      var c = o.count;
      for(var i=n; i<c; i++){
         if(!o.memory[i].equals(v)){
            o.memory[n++] = o.memory[i];
         }
      }
      o.count = n;
   }
}
function TSearchItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TSearchItem();
      ti.unpack(t);
      if(!RString.isEmpty(ti.name)){
         o.push(ti);
      }
      else{
         o.clear();
         RMessage.fatal(this, 'unpack', 'Invalid value (value={1})', p);
      }
   }
}
function FDescribeFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = FDescribeFrameConsole_construct;
   o.load           = FDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = FDescribeFrameConsole_createFromName;
   o.loadNode       = FDescribeFrameConsole_loadNode;
   o.loadService    = FDescribeFrameConsole_loadService;
   o.nextFormId     = FDescribeFrameConsole_nextFormId;
   o.get            = FDescribeFrameConsole_get;
   o.find           = FDescribeFrameConsole_find;
   o.getLov         = FDescribeFrameConsole_getLov;
   o.findLov        = FDescribeFrameConsole_findLov;
   o.getEvents      = FDescribeFrameConsole_getEvents;
   return o;
}
function FDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new TDictionary();
   o.lsnsLoaded = new TListeners();
}
function FDescribeFrameConsole_load(n){
   var o = this;
   var x = o._defines.get(n);
   if(x){
      return x;
   }
   var xd = new TXmlDocument();
   var x = xd.root();
   x.set('action', 'query');
   var xf = x.create('Frame');
   xf.set('name', n);
   var xc = RConsole.find(FXmlConsole);
   var xr = xc.send(RService.url(o._service), xd);
   var rs = xr.nodes();
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var rx = rs.get(i);
      o._defines.set(rx.get('name'), rx);
   }
   var x = o._defines.get(n);
   if(x == null){
      throw new TError(o, 'Unknown frame. (name={1])', n);
   }
   return x;
}
function FDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
function FDescribeFrameConsole_loadNode(x){
   var o = this;
   var nns = x.root();
   if(nns.hasNode()){
      var nodes = nns.nodes;
      var ct = nodes.count;
      for(var n = 0; n < ct; n++){
         var node = nodes.get(n);
         var fn = node.get('name');
         var tp = node.get('type');
         if(node.hasNode()){
            var nfds = node.nodes;
            for(var k = 0; k < nfds.count; k++){
               var dd = nfds.get(k);
               if(dd.isName('Define')){
                  if(dd.hasNode()){
                     var fds = dd.nodes;
                     for(var m = 0; m < fds.count; m++){
                        var nd = fds.get(m);
                        var mp = o._defines.get(tp);
                        mp.set(fn, nd);
                     }
                  }
               }else if(dd.isName('Events')){
                  o.events.set(fn, dd);
               }
            }
         }
      }
   }
}
function FDescribeFrameConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = EForm.Form;
   }
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = RService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
function FDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
function FDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
function FDescribeFrameConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(RClass.isMode(ERun.Debug)){
      RMemory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
function FDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
function FDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
function FDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
function FEditorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = FEditorConsole_construct;
   o.makeName     = FEditorConsole_makeName;
   o.enter        = FEditorConsole_enter;
   o.leave        = FEditorConsole_leave;
   o.focus        = FEditorConsole_focus;
   o.blur         = FEditorConsole_blur;
   o.lost         = FEditorConsole_lost;
   return o;
}
function FEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new TDictionary();
}
function FEditorConsole_makeName(cls, name){
   return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
}
function FEditorConsole_enter(editable, cls){
   var name = RClass.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = RClass.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
function FEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = RObject.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {0}', RClass.dump(editor));
   }
}
function FEditorConsole_focus(c, n, l){
   var o = this;
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = RClass.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   RLogger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
   e.reset();
   if(RClass.isClass(e, FUiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}
function FEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      RLogger.debug(o, 'Blur editor {1}', RClass.dump(editor));
      editor = RObject.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}
function FEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
function FFocusConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope              = EScope.Page;
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   o._hoverContainer    = null;
   o._hoverControl      = null;
   o._focusControl      = null;
   o._blurControl       = null;
   o._activeControl     = null;
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   o.onMouseDown        = FFocusConsole_onMouseDown;
   o.onMouseWheel       = FFocusConsole_onMouseWheel;
   o.construct          = FFocusConsole_construct;
   o.enter              = FFocusConsole_enter;
   o.leave              = FFocusConsole_leave;
   o.isFocus            = FFocusConsole_isFocus;
   o.focus              = FFocusConsole_focus;
   o.blur               = FFocusConsole_blur;
   o.findClass          = FFocusConsole_findClass;
   o.focusClass         = FFocusConsole_focusClass;
   o.focusHtml          = FFocusConsole_focusHtml;
   o.lockBlur           = FFocusConsole_lockBlur;
   o.unlockBlur         = FFocusConsole_unlockBlur;
   o.storeFocus         = FFocusConsole_storeFocus;
   o.restoreFocus       = FFocusConsole_restoreFocus;
   o.dispose            = FFocusConsole_dispose;
   return o;
}
function FFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
function FFocusConsole_onMouseWheel(s, e){
   var o = this;
}
function FFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new TListeners();
   o.lsnsBlur = new TListeners();
   o.lsnsFocusClass = new TListeners();
   RLogger.info(o, 'Add listener for window mouse down and wheel.');
   RWindow.lsnsMouseDown.register(o, o.onMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
}
function FFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MUiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
function FFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
function FFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
function FFocusConsole_focus(c, e){
   var o = this;
   if(!RClass.isClass(c, MFocus)){
      return;
   }
   var f = o._focusControl;
   if(f == c){
      return;
   }
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         o.lsnsBlur.process(f);
      }
   }
   if(o._focusAble){
      RLogger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      o.lsnsFocus.process(c);
   }
}
function FFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   if(bc != c && RClass.isClass(c, MFocus)){
      RLogger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   if(fc){
      RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}
function FFocusConsole_findClass(c){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   var p = o._activeControl;
   if(RClass.isClass(p, FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}
function FFocusConsole_focusClass(c, p){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      RLogger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
function FFocusConsole_focusHtml(p){
   var o = this;
   var c = RHtml.searchLinker(p, FUiControl);
   RLogger.debug(o, 'Focus html control. (control={1}, element={2})', RClass.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}
function FFocusConsole_lockBlur(){
   this._blurAble = false;
}
function FFocusConsole_unlockBlur(){
   this._blurAble = true;
}
function FFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
function FFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
function FFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
function FFrameConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd         = EScope.Local;
   o._frames          = null;
   o.construct        = FFrameConsole_construct;
   o.create           = FFrameConsole_create;
   o.find             = FFrameConsole_find;
   o.get              = FFrameConsole_get;
   return o;
}
function FFrameConsole_construct(){
   var o = this;
   o._frames = new TMap();
}
function FFrameConsole_create(c, n){
   var o = this;
   var dc = RConsole.find(FDescribeFrameConsole);
   var x = dc.load(n);
   var f = RControl.build(null, x, null, c._hPanel);
   return f;
}
function FFrameConsole_find(n){
   return this._frames.get(n);
}
function FFrameConsole_get(c, n, h){
   var o = this;
   var fs = o._frames;
   var f = fs.get(n);
   if(!f){
      f = o.create(c, n);
      if(h){
         f.setPanel(h);
      }
      fs.set(n, f);
   }
   return f;
}
function FFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
function FFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!RConsole.find(FMessageConsole).checkResult(m)){
         return;
      }
   }
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   g.invoke();
}
function FFrameConsole_process(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = RService.url(RString.nvl(g.url, 'logic.webform'));
   e.action = EDataAction.Process;
   e.argument = g;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
function FFrameConsole_loadEvents(cfg){
   return;
   var o = this;
   if(!(cfg && cfg.nodes)){
      return;
   }
   var ns = cfg.nodes;
   var l = ns.count;
   for(var n = 0; n < l; n++){
      var x = ns.get(n);
      if(x.isName('Event')){
         var c = RClass.create(FEvent);
         c.loadConfig(x);
         if(RString.isEmpty(c.name) || RString.isEmpty(c.source) || RString.isEmpty(c.form)){
            RMessage.fatel(o, null, "Event property is invalid. (event={0})", x.xml());
         }
         var s = c.name + '@' + c.source + '@' + c.form;
         o.events.set(s, c);
      }
   }
}
function FFrameConsole_processEvent(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(RClass.isClass(se, FControl)){
      var p = se.topControl();
      if(p){
         var s = RString.nvl(e.name, e.handle) + '@' + se.name + '@' + p.name;
         var c = es.get(s);
         var eo = e.caller ? e.caller : se;
         if(c && c.code){
            if(c.event){
               c.event.call(eo, eo, e);
            }else{
               c.event = new Function('o', 'e', c.code);
                  c.event.call(eo, eo, e);
            }
         }
      }
   }
}
function FFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
function FFrameConsole_dispose(){
   var o = this;
   RMemory.free(o._frames);
   RMemory.free(o._formIds);
   RMemory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
function FFrameEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd   = EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new TAttributes();
   o._events    = new TObjects();
   o._listeners = new TAttributes();
   o.onProcess  = FFrameEventConsole_onProcess;
   o.construct  = FFrameEventConsole_construct;
   o.register   = FFrameEventConsole_register;
   o.push       = FFrameEventConsole_push;
   o.clear      = FFrameEventConsole_clear;
   return o;
}
function FFrameEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   var ec = es.count();
   if(ec > 0){
      while(true){
         var has = false;
         for(var n = 0; n < ec; n++){
            var e = es.get(n);
            if(e){
               has = true;
               e.process();
               var ls = o._listeners.get(RMethod.name(e));
               if(ls){
                  ls.process(e);
               }
               es.set(n, null)
            }
         }
         if(!has){
            break;
         }
      }
      es.clear();
   }
}
function FFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}
function FFrameEventConsole_register(po, pc){
   this._events.push(new TEvent(po, null, pc));
}
function FFrameEventConsole_push(e){
   var o = this;
   var n = RClass.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = RBoolean.isTrue(o._allows.get(n));
      }
      if(a){
         var es = o._events;
         var c = es.count();
         for(var i = 0; i < c; i++){
            if(es.get(n) == e){
               es.set(n, null);
            }
         }
         es.push(e);
      }
   }
}
function FFrameEventConsole_clear(){
   this._events.clear();
}
function FFrameEventConsole_add(owner, proc){
   this._events.push(new TEvent(owner, null, proc));
}
function FFrameEventConsole_allowEvent(c){
   this._allows.set(RMethod.name(c), EBool.True);
}
function FFrameEventConsole_skipEvent(c){
   this._allows.set(RMethod.name(c), EBool.False);
}
function FFrameEventConsole_allowAll(){
   this._allow = true;
}
function FFrameEventConsole_skipAll(){
   this._allow = false;
}
function FFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
function FMessageConsole(o){
   o = RClass.inherits(this, o, FConsole, MStyle);
   o.scope        = EScope.Global;
   o.result       = new Array();
   o.attributes   = new Array();
   o.messageBox   = null;
   o.messageWindow = null;
   o.parse        = FMessageConsole_parse;
   o.popupMessage = FMessageConsole_popupMessage;
   o.closeMessage = FMessageConsole_closeMessage;
   o.checkResult  = FMessageConsole_checkResult;
   return o;
}
function FMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}
function FMessageConsole_popupMessage(g){
   var o = this;
   var w = o.messageWindow;
   if(!w){
      w = o.messageWindow = RControl.create('FMessageWindow');
   }
   w.loadMessages(g);
   w.show();
}
function FMessageConsole_closeMessage(){
   RWindow.setEnable(true);
}
function FMessageConsole_checkResult(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(EMessage.Fatal);
      if(m && m.attrType == "session.timeout"){
         var ss = RString.splitTwo(m.redirect, '@');
         var s = RContext.context(ss[1] + '?do='+ss[0]);
         fmMain.action = s;
         fmMain.target = '_self';
         fmMain.submit();
      }else{
         o.popupMessage(g);
      }
      return false;
   }
   return true;
}
function FResultConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope          = EScope.Page;
   o.executeCommand = FResultConsole_executeCommand;
   o.checkService   = FResultConsole_checkService;
   return o;
}
function FResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var uuid = command.get('uuid');
         if(uuid){
            var fn = tv.findByUuid(uuid);
            if(fn){
               tv.reloadNode(fn);
            }else{
               return alert("Can't find tree node. (uuid="+uuid+")");
            }
         }else{
            tv.reloadNode();
         }
      }
   }else if(EResultCommand.TreeParentRefresh == name){
      var tv = RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
function FResultConsole_checkService(config){
   var o = this;
   if(config){
      if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(config))){
         return false;
      }
      var cmdsNode = config.find('Commands');
      if(cmdsNode && cmdsNode.nodes && cmdsNode.nodes.count){
         for(var n=0; n<cmdsNode.nodes.count; n++){
            var node = cmdsNode.node(n);
            if(node.isName('Command')){
               o.executeCommand(node);
            }
         }
      }
      RConsole.find(FFocusConsole).restoreFocus();
   }
   return true;
}
var ESplitStyle = new function ESplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
function FListItem(o){
   o = RClass.inherits(this, o, FControl, MDesign, MHorizontal);
   o.styleForm    = RClass.register(o, new TStyle('Form'));
   o.styleIcon    = RClass.register(o, new TStyle('Icon'));
   o.styleLabel   = RClass.register(o, new TStyle('Label'));
   o.oeBuild      = FListItem_oeBuild;
   o.onBuildPanel = FListItem_onBuildPanel;
   o.formatValue  = FListItem_formatValue;
   o.text         = FListItem_text;
   o.setText      = FListItem_setText;
   o.dispose      = FListItem_dispose;
   return o;
}
function FListItem_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isBefore()){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel, o.style('Form'));
      var hRow = hf.insertRow();
      var hc = hRow.insertCell();
      hc.className = o.style('Icon');
      hc.width = 20;
      o.hIcon = RBuilder.appendIcon(hc, 'arrow');
      var hc = hRow.insertCell();
      var h = o.hLabel = RBuilder.append(hc, 'SPAN', o.style('Label'));
      h.innerText = o.label;
   }
}
function FListItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FListItem_formatValue(s){
   return RString.nvl(s);
}
function FListItem_text(){
   return this.hEdit.value;
}
function FListItem_setText(text){
   this.hEdit.value = text;
}
function FListItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hPanel = null;
   o.hEdit = null;
}
function FUiButton(o){
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
   o.onButtonEnter      = RClass.register(o, new HMouseEnter('onButtonEnter'), FUiButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new HMouseLeave('onButtonLeave'), FUiButton_onButtonLeave);
   o.onButtonDown       = RClass.register(o, new HMouseDown('onButtonDown'), FUiButton_onButtonDown);
   o.onButtonUp         = RClass.register(o, new HMouseUp('onButtonUp'), FUiButton_onButtonUp);
   o.onButtonClickDelay = FUiButton_onButtonClickDelay;
   o.onClick            = FUiButton_onClick;
   o.onButtonClick      = RClass.register(o, new HClick('onButtonClick'), FUiButton_onButtonClick);
   o.oeBuild            = FUiButton_oeBuild;
   o.oeMode             = FUiButton_oeMode;
   o.setLabel           = FUiButton_setLabel;
   o.setLabelColor      = FUiButton_setLabelColor;
   o.setLabelStyle      = FUiButton_setLabelStyle;
   o.doClick            = FUiButton_doClick;
   o.dispose            = FUiButton_dispose;
   return o;
}
function FUiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('HoverLeft');
	  o.hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o.hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FUiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('PressLeft');
	  o.hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o.hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FUiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FUiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FUiButton_onClick(e){
   this.doClick();
}
function FUiButton_onButtonClick(e){
   this.doClick();
}
function FUiButton_oeBuild(e){
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
function FUiButton_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FUiButton_setLabel(v){
   var o = this;
   o.label = v;
   o.hLabel.innerText = v;
   o.hLabel.noWrap = true;
}
function FUiButton_setLabelColor(c){
   var o = this;
   o.hLabel.style.color = '#FF0000';
}
function FUiButton_setLabelStyle(c, w, s){
   var o = this;
   o.hLabel.style.color = '#FF0000';
   o.hLabel.style.fontWeight = 'bold';
   o.hLabel.style.fontSize = '12';
}
function FUiButton_doClick(){
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
      var w = RConsole.find(FUiButtonConsole).find();
      w.linkUrl(o.editUrl);
      w.show();
   }
   if(o.editForm){
      var w = RConsole.find(FUiButtonFormConsole).find();
      w.linkForm(o);
      w.show();
   }
}
function FUiButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hFormEnd = null;
   o.hLabel = null;
}
function FUiCalendar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
   o.editFormat  = RDate.DisplayFormat;
   o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
   o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
   o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
   o.borderStyle = EBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = FUiCalendar_onKeyPress;
   o.onDataClick   = FUiCalendar_onDataClick;
   o.refreshStyle  = FUiCalendar_refreshStyle;
   o.onEditEnd   = FUiCalendar_onEditEnd;
   o.onBuildEdit = FUiCalendar_onBuildEdit;
   o.construct   = FUiCalendar_construct;
   o.formatValue = FUiCalendar_formatValue;
   o.formatText  = FUiCalendar_formatText;
   o.drop        = FUiCalendar_drop;
   o.doBlur      = FUiCalendar_doBlur;
   return o;
}
function FUiCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
function FUiCalendar_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = hr.insertCell();
   var h = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FUiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiCalendar_onKeyPress(e){
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      RKey.eventClear(e);
   }
}
function FUiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
function FUiCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return RDate.formatDate(o.date);
      }else{
         RDate.autoParse(o.date, t);
         return RDate.formatDate(o.date);
      }
   }
   return RString.nvl(t);
}
function FUiCalendar_formatText(value){
   if(value){
      var o = this;
      RDate.autoParse(o.date, value);
      return RDate.formatDate(o.date, o.editFormat);
   }
   return RString.nvl(value);
}
function FUiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FUiCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
function FUiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
function FUiCalendarEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MFocusLooper);
   o.editFormat       = null;
   o.dataValue        = null;
   o.date             = new TDate();
   o.hTitlePanel      = null;
   o.hYearPrior       = null;
   o.hYear            = null;
   o.hYearNext        = null;
   o.hMonthPrior      = null;
   o.hMonth           = null;
   o.hMonthNext       = null;
   o.hDaysPanel       = null;
   o.hTimePanel       = null;
   o.hTime            = null;
   o.hNow             = null;
   o.hOk              = null;
   o.hCancel          = null;
   o.hHour            = null;
   o.hMinute          = null;
   o.hSecond          = null;
   o.hSelect          = null;
   o.editFormat       = RDate.DisplayFormat;
   o.dateOrg          = new TDate();
   o.dateOrgValue     = null;
   o.dayCells         = new TList();
   o.focusObject      = null;
   o.skipBlur         = false;
   o.styleYearMonth   = RClass.register(o, new TStyle('YearMonth'));
   o.styleButton      = RClass.register(o, new TStyle('Button'));
   o.styleButtonHover = RClass.register(o, new TStyle('ButtonHover'));
   o.styleDay         = RClass.register(o, new TStyle('Day'));
   o.styleDaySel      = RClass.register(o, new TStyle('DaySel'));
   o.styleDayHover    = RClass.register(o, new TStyle('DayHover'));
   o.styleDayFree     = RClass.register(o, new TStyle('DayFree'));
   o.styleDayNone     = RClass.register(o, new TStyle('DayNone'));
   o.styleTitlePanel  = RClass.register(o, new TStyle('TitlePanel'));
   o.styleDaysPanel   = RClass.register(o, new TStyle('DaysPanel'));
   o.styleTimePanel   = RClass.register(o, new TStyle('TimePanel'));
   o.styleMonth       = RClass.register(o, new TStyle('Year'));
   o.styleMonth       = RClass.register(o, new TStyle('Month'));
   o.styleWeek        = RClass.register(o, new TStyle('Week'));
   o.styleTime        = RClass.register(o, new TStyle('Time'));
   o.styleHour        = RClass.register(o, new TStyle('Hour'));
   o.styleSplit       = RClass.register(o, new TStyle('Split'));
   o.styleMinute      = RClass.register(o, new TStyle('Minute'));
   o.styleSecond      = RClass.register(o, new TStyle('Second'));
   o.styleNow         = RClass.register(o, new TStyle('Now'));
   o.styleOk          = RClass.register(o, new TStyle('Ok'));
   o.onDaySelect      = RClass.register(o, new HMouseDown('onDaySelect'), FUiCalendarEditor_onDaySelect);
   o.onButtonNow      = RClass.register(o, new HMouseDown('onButtonNow'), FUiCalendarEditor_onButtonNow);
   o.onDateKeyDown    = RClass.register(o, new HKeyDown('onDateKeyDown'), FUiCalendarEditor_onDateKeyDown);
   o.onDateBlur       = RClass.register(o, new HBlur('onDateBlur'), FUiCalendarEditor_onDateBlur);
   o.onTimeBlur       = RClass.register(o, new HBlur('onTimeBlur'), FUiCalendarEditor_onTimeBlur);
   o.onTimeClick      = RClass.register(o, new HClick('onTimeClick'), FUiCalendarEditor_onTimeClick);
   o.onDayDbClick     = RClass.register(o, new HDoubleClick('onDayDbClick'), FUiCalendarEditor_onDayDbClick);
   o.onDayEnter       = RClass.register(o, new HMouseEnter('onDayEnter'),    FUiCalendarEditor_onDayEnter);
   o.onDayOut         = RClass.register(o, new HMouseOut('onDayOut'),        FUiCalendarEditor_onDayOut);
   o.onButtonOk       = RClass.register(o, new HMouseDown('onButtonOk'),     FUiCalendarEditor_onButtonOk);
   o.onButtonCancel   = RClass.register(o, new HMouseDown('onButtonCancel'), FUiCalendarEditor_onButtonCancel);
   o.onButtonOver     = RClass.register(o, new HMouseEnter('onButtonOver'),  FUiCalendarEditor_onButtonOver);
   o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'),     FUiCalendarEditor_onButtonOut);
   o.onMdown          = RClass.register(o, new HMouseDown('onMdown'),        FUiCalendarEditor_onMdown);
   o.onMup            = RClass.register(o, new HMouseUp('onMup'),            FUiCalendarEditor_onMup);
   o.onBuildDrop      = FUiCalendarEditor_onBuildDrop;
   o.show             = FUiCalendarEditor_show;
   o.setMinuteEditable = FUiCalendarEditor_setMinuteEditable;
   o.setHourEditable   = FUiCalendarEditor_setHourEditable;
   o.setSecondEditable = FUiCalendarEditor_setSecondEditable;
   o.buildTitle       = FUiCalendarEditor_buildTitle;
   o.buildDays        = FUiCalendarEditor_buildDays;
   o.buildTime        = FUiCalendarEditor_buildTime;
   o.testBlur         = FUiCalendarEditor_testBlur;
   o.get              = FUiCalendarEditor_get;
   o.set              = FUiCalendarEditor_set;
   o.setDate          = FUiCalendarEditor_setDate;
   o.storeChange      = FUiCalendarEditor_storeChange;
   o.daySelectLsns    = new TListeners();
   o.onBuildButton    = FUiCalendarEditor_onBuildButton;
   o.ohKdown          = FUiCalendarEditor_ohKdown;
   o.ohDaysChange     = FUiCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = FUiCalendarEditor_ohKeyCheck;
   o.onDateAction     = FUiCalendarEditor_onDateAction;
   o.panel            = FUiCalendarEditor_panel;
   o.dispose          = FUiCalendarEditor_dispose;
   return o;
}
function FUiCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
function FUiCalendarEditor_onTimeBlur(e){
	var o = this;
    var h = e.hSource;
    if(h == o.hHour){
       h.value = Math.min(RInteger.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(RInteger.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
function FUiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onDaySelect(e){
   var o = this;
   if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
	  var h = e.hSource;
	  if(o.hSelect){
		  o.hSelect.style.border = '1 solid #FFFFFF';
	  };
	  o.hSelect = h;
	  h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
function FUiCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.dataValue = RDate.format();
      o.editEnd();
   }
}
function FUiCalendarEditor_onDateKeyDown(e, he){
   var o = this;
   var h = e.hSource;
   var v = h.value;
   if(EKey.Enter == e.keyCode){
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Up == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) + 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) + 1;
      }else if(h == o.hHour){
    	  if(o.hHour.editAble){
		     if(v < 23){
			    h.value = RInteger.parse(h.value) + 1;
			 }
    	  }
	  }else if(h == o.hMinute){
		 if(o.hMinute.editAble){
		    if(v < 59){
			   h.value = RInteger.parse(h.value) + 1;
			}
	     }
	  }else{
		  if(o.hSecond.editAble){
		     if(v < 59){
			    h.value = RInteger.parse(h.value) + 1;
		     }
	      }
	  }
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Down == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = RInteger.parse(o.hYear.value) - 1;
      }else if(h == o.hMonth){
         o.hMonth.value = RInteger.parse(o.hMonth.value) - 1;
      }else if(h == o.hHour){
    	 if(o.hHour.editAble){
            if(v > 0){
	           h.value = RInteger.parse(h.value) - 1;
	        }
    	 }
	  }else if(h == o.hMinute){
		  if(o.hMinute.editAble){
		     if(v > 0){
	            h.value = RInteger.parse(h.value) - 1;
	         }
		  }
	  }else{
		  if(o.hSecond.editAble){
		     if(v > 0){
		        h.value = RInteger.parse(h.value) - 1;
		     }
		  }
	  }
      o.storeChange();
      o.setDate(o.date);
      h.select();
   }else{
	  if(h == o.hHour || h == o.hMinute || h == o.hSecond){
	     if(h.editAble){
	        RKey.fixChars(he, RDate.Chars);
	     }else{
	        he.keyCode = 0;
	        he.returnValue = false;
	     }
	  }else{
		  RKey.fixChars(he, RDate.Chars);
	  }
   }
}
function FUiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
function FUiCalendarEditor_onBuildDrop(){
   var o = this;
   o.hDatePanel = RBuilder.appendTable(o.hDropPanel);
   o.hDropPanel.align = 'center';
   o.hDatePanel.width = '100%';
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTitlePanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('TitlePanel');
   o.buildTitle();
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hDaysPanel = hRow.insertCell();
   hCell.colSpan = 2;
   hCell.className = o.style('DaysPanel');
   o.buildDays();
   var hRow = o.hDatePanel.insertRow();
   var hCell = o.hTimePanel = hRow.insertCell();
   o.buildTime();
   o.pushFocus(o.hYear);
   o.pushFocus(o.hMonth);
}
function FUiCalendarEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 273;
   o.base.MShadow.show.call(o);
}
function FUiCalendarEditor_buildTitle(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTitlePanel, null, 0, 5, 1);
   hTab.align = 'center';
   hTab.width = '100%';
   hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   var h = o.hYearPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hYear = RBuilder.append(hCel, 'INPUT', o.style('Year'));
   h.maxLength = '4';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FUiCalendarEditor:year');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hYearNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCell = hRow.insertCell();
   hCell.width='10';
   var hCel = hRow.insertCell();
   var h = o.hMonthPrior = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hMonth = RBuilder.append(hCel, 'INPUT', o.style('Month'));
   h.maxLength = '2';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FUiCalendarEditor:month');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hMonthNext = RBuilder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown", h);
   o.attachEvent("onMup", h);
}
function FUiCalendarEditor_buildDays(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FUiCalendarEditor:weekdays').split(',');
   var count = weekDays.length;
   var hWeekRow = hTab.insertRow();
   for(var n=0; n<count; n++){
      var h = hWeekRow.insertCell();
      h.className = o.style('Week');
      h.align = 'center';
      h.innerText = weekDays[n];
   }
   for(var n=0; n<6; n++){
      var hRow = hTab.insertRow();
      for(var i=0; i<count; i++){
         var h = hRow.insertCell();
         h.link = o;
         h.className = o.style('DayNone');
         o.attachEvent("onDayEnter", h);
         o.attachEvent("onDayOut", h);
         o.attachEvent("onDaySelect", h);
         o.attachEvent("onDayDbClick", h);
         h.innerText = '.';
         o.dayCells.push(h);
      }
   }
}
function FUiCalendarEditor_buildTime(){
   var o = this;
   var hTab = RBuilder.appendTable(o.hTimePanel, null, 0, 1, 1);
   var ht = o.hTimePanel;
   ht.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   var hRow = hTab.insertRow();
   var hb1 = hRow.insertCell();
   hb1.width = 5;
   var hl = hRow.insertCell();
   hl.width = 50;
   hl.style.color = '#1F8FB7';
   hl.style.fontWeight = 'BOLD';
   hl.innerText='时间:';
   var hc = hRow.insertCell();
   var hb = RBuilder.appendTable(hc, null, 0, 0, 0);
   hc.style.border = '1 solid #2BD6F0';
   hc.style.backgroundColor = '#FFFFFF';
   var hr = hb.insertRow();
   var hh =hr.insertCell();
   var hHour = o.hHour = RBuilder.appendEdit(hh, o.style('Hour'));
   hHour.maxLength = 2;
   o.attachEvent("onTimeClick", hHour);
   o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
   var hs1 = hr.insertCell();
   hs1.innerText = ':';
   var hm = hr.insertCell();
   var hMinute = o.hMinute = RBuilder.appendEdit(hm, o.style('Minute'));
   hMinute.maxLength = 2;
   o.attachEvent("onTimeClick", hMinute);
   o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
   var hs2 = hr.insertCell();
   hs2.innerText = ':';
   var hs = hr.insertCell();
   var hSecond = o.hSecond = RBuilder.appendEdit(hs, o.style('Second'));
   hSecond.maxLength = 2;
   o.attachEvent("onTimeClick", hSecond);
   o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
   var hb2 = hRow.insertCell();
   hb2.width = 50;
   var hn = hRow.insertCell();
   hn.style.display = 'none';
   var hNow = o.hNow = RBuilder.append(hn, 'SPAN', o.style('Now'));
   hNow.style.width = 50;
   hn.style.border='1 solid #2BD6F0';
   hNow.innerText = RContext.get('FUiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = RBuilder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FUiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = RBuilder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FUiCalendarEditor:ok');
}
function FUiCalendarEditor_testBlur(c){
   return this.source != c;
}
function FUiCalendarEditor_get(){
   return this.dataValue;
}
function FUiCalendarEditor_set(value, format){
   var o = this;
   o.changed = false;
   o.skipBlur = 0;
   o.dataValue = value;
   o.dateOrgValue = value;
   o.editFormat = format;
   RDate.parse(o.date, value);
   RDate.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      RDate.parse(o.date, value);
      RDate.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
function FUiCalendarEditor_setDate(date){
   var o = this;
   o.hYear.value = date.year;
   o.hMonth.value = date.month;
   o.hHour.value = RString.lpad(date.hour, 2, '0');
   o.hMinute.value = RString.lpad(date.minute, 2, '0');
   o.hSecond.value = RString.lpad(date.second, 2,'0');
   var selDay = date.day;
   if(!(o.dateOrg.year == date.year && o.dateOrg.month == date.month)){
      selDay = -1;
   }
   if(o.hSelect){
	   o.hSelect.style.border='1 solid #FFFFFF';
   }
   var monthWeekDay = this.date.monthWeekDay();
   var monthDays = this.date.monthDays();
   var weekDay = monthWeekDay;
   for(var n=0; n<o.dayCells.count; n++){
      var h = o.dayCells.get(n);
      if(n<monthWeekDay){
         h.className = o.style('DayNone');
         h.innerText = '.'
      }else if(n < monthDays+monthWeekDay){
         if(weekDay == 7){
            weekDay = 0;
         }
         var day = n-monthWeekDay+1;
         if(day == selDay){
            h.className = o.style('DaySel');
            h.isCurrent = true;
            o.hSelect = h;
            h.style.border = '1 solid #2BD6F0';
         }else{
            h.isFree = (weekDay==0 || weekDay==6);
            h.className = h.isFree ? o.style('DayFree') : o.style('Day');
            h.isCurrent = false;
         }
         h.innerText = day;
         weekDay++;
      }else{
         h.className = o.style('DayNone');
         h.innerText = '.'
      }
   }
}
function FUiCalendarEditor_setHourEditable(v){
   var o = this;
   if(!v){
	   o.hHour.value = '00';
	   o.hHour.style.cursor='default';
	   o.hHour.style.color='gray';
	   o.hHour.editAble = false;
   }else{
	   o.hHour.editAble = true;
   }
}
function FUiCalendarEditor_setMinuteEditable(v){
   var o = this;
   if(!v){
	   o.hMinute.value = '00';
	   o.hMinute.style.cursor='default';
	   o.hMinute.style.color='gray';
	   o.hMinute.editAble = false;
   }else{
	   o.hMinute.editAble = true;
   }
}
function FUiCalendarEditor_setSecondEditable(v){
   var o = this;
   if(!v){
	   o.hSecond.value = '00';
	   o.hSecond.style.cursor='default';
	   o.hSecond.style.color='gray';
	   o.hSecond.editAble = false;
   }else{
	   o.hSecond.editAble = true;
   }
}
function FUiCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
}
function FUiCalendarEditor_onBuildButton(){
   var o = this;
   return;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hNow = RBuilder.append(o.hButtonPanel, 'SPAN', o.style('Now'));
   var hp = o.hButtonPanel;
   hp.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hp.height = 20;
   h.innerText = RContext.get('FUiCalendarEditor:now');
   o.attachEvent("onButtonNow",h);
}
function FUiCalendarEditor_onMdown(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
function FUiCalendarEditor_onMup(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
function FUiCalendarEditor_ohKdown(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
      var e = RWindow.event(this);
      if(EKey.Esc == e.keyCode){
         o.dataValue = o.dateOrgValue;
         o.editStatus = EEditStatus.Cancel;
         o.endEdit();
      }else if(event.ctrlKey && EKey.Enter == e.keyCode){
         o.storeChange();
         o.editStatus = EEditStatus.Ok;
         o.endEdit();
      }else if(EKey.Enter == e.keyCode){
         o.storeChange();
         o.setDate(o.date);
      }else if(EKey.Tab == e.keyCode){
         o.isSkipBlur = true;
         if(e.shiftKey){
            o.focusPrior();
         }else{
            o.focusNext();
         }
         e.returnValue = 0;
      }
   }
}
function FUiCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
function FUiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
function FUiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = RDate.formatDate(o.date);
      o.editEnd();
   }
}
function FUiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor)){
	 o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
function FUiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(RClass.isClass(o, FUiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
function FUiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
      e.keyCode = 0;
   }
}
function FUiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
function FUiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
function FUiCalendarEditor_onDateAction(h){
   var o = this;
   if(o.hYearPrior == h){
      o.date.addYear(-1);
      o.setDate(o.date);
      if(o.focusObject != this.hYear){
         o.focusObject = this.hYear;
         o.hYear.focus();
         o.hYear.select();
      }
   }else if(o.hYearNext == h){
      o.date.addYear(1);
      o.setDate(o.date);
      if(o.focusObject != this.hYear){
         o.focusObject = this.hYear;
         o.hYear.focus();
         o.hYear.select();
      }
   }else if(o.hMonthPrior == h){
      this.date.addMonth(-1);
      o.setDate(o.date);
      if(o.focusObject != this.hMonth){
         o.focusObject = this.hMonth;
         o.hMonth.focus();
      }
   }else if(o.hMonthNext == h){
      this.date.addMonth(1);
      o.setDate(o.date);
      if(o.focusObject != this.hMonth){
         o.focusObject = this.hMonth;
         o.hMonth.focus();
      }
   }
}
function FUiCalendarEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
function FUiCalendarEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hDatePanel = null;
   o.hDropPanel = null;
   o.hTitlePanel = null;
   o.hOk = null;
   o.hNow = null;
   o.hButtonPanel = null;
   o.hMonthNext = null;
   o.hYear = null;
   o.hMonth = null;
   o.hTime = null;
   o.hTimePanel = null;
}
function FUiCheck(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiCheck_onBuildEditValue;
   o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
   o.oeSaveValue      = FUiCheck_oeSaveValue;
   o.get              = FUiCheck_get;
   o.set              = FUiCheck_set;
   o.refreshValue     = FUiCheck_refreshValue;
   o.refreshStyle     = FUiCheck_refreshStyle;
   return o;
}
function FUiCheck_onBuildEditValue(p){
   var o = this;
   var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}
function FUiCheck_onInputClick(p){
   this.refreshValue();
}
function FUiCheck_oeSaveValue(e){
   var o = this;
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FUiEditControl.oeSaveValue.call(o, e);
}
function FUiCheck_get(){
   return this._hInput.checked;
}
function FUiCheck_set(p){
   this._hInput.checked = RBoolean.parse(p);
}
function FUiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
function FCheckPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.items            = new TItems();
   o.borderStyle      = EBorder.RoundDrop;
   o.onBuildEdit      = FCheckPicker_onBuildEdit;
   o.onEditEnd        = FCheckPicker_onEditEnd;
   o.onDataKeyDown    = FCheckPicker_onDataKeyDown;
   o.loadConfig       = FCheckPicker_loadConfig;
   o.formatValue      = FCheckPicker_formatValue;
   o.validText        = FCheckPicker_validText;
   o.formatText       = FCheckPicker_formatText;
   o.refreshStyle     = FCheckPicker_refreshStyle;
   o.drop             = FCheckPicker_drop;
   o.dispose          = FCheckPicker_dispose;
   return o;
}
function FCheckPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FCheckPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
function FCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return EStatus.Stop;
}
function FCheckPicker_text(){
   return this.hEdit.value;
}
function FCheckPicker_setText(text){
   this.hEdit.value = text;
}
function FCheckPicker_formatValue(text){
   var o = this;
   if(!RString.isEmpty(text)){
      ta = RString.split(text, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < ta.length; n++){
         for(var m = 0; m < item.count; m++){
            var c = item.value(m);
            if(c.label == ta[n]){
               vs.push(c.value);
            }
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_validText(text){
   var o = this;
   if(RString.isEmpty(text)){
      return true;
   }
   return !RString.isEmpty(o.formatValue(text));
}
function FCheckPicker_formatText(v){
   var o = this;
   if(!RString.isEmpty(v)){
      va = RString.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return RString.toUpper(vs.join());
   }else{
      return '';
   }
}
function FCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
function FCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
function FCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
function FCheckPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth         = 120;
   o.onEditFocus      = RClass.register(o, new HFocus('onEditFocus'));
   o.onEditBlur       = RClass.register(o, new HBlur('onEditBlur'));
   o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
   o.stFlag           = RClass.register(o, new TStyle('Flag'));
   o.stEditForm       = RClass.register(o, new TStyle('EditForm'));
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = new Array();
   o.hBtnTextSpan     = null;
   o.onBuildDrop      = FCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = FCheckPickerEditor_onBuildButton;
   o.onItemClick      = FCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = FCheckPickerEditor_onEditKeyDown;
   o.construct        = FCheckPickerEditor_construct;
   o.set              = FCheckPickerEditor_set;
   o.setItems         = FCheckPickerEditor_setItems;
   o.select           = FCheckPickerEditor_select;
   o.linkControl      = FCheckPickerEditor_linkControl;
   o.show             = FCheckPickerEditor_show;
   o.hide             = FCheckPickerEditor_hide;
   o.dispose          = FCheckPickerEditor_dispose;
   return o;
}
function FCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
function FCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
function FCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = RBuilder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
function FCheckPickerEditor_onItemClick(s){
   var o = this;
   s.setChecked(!s.checked);
   var ts = o.items.items;
   var cs = o.components;
   var vs = new Array();
   for(var n = 0; n < ts.count; n++){
      var c = cs.value(n);
      if(c.checked){
         vs.push(c.value);
      }
   }
   var e = o.source;
   e.set(vs.join());
}
function FCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
function FCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
function FCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!RString.isEmpty(v)){
      o.values = v;
      va = RString.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
function FCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         RBuilder.appendEmpty(hd);
      }
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.itemClickListener);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      o.push(c);
   }
   o.position = 0;
}
function FCheckPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FCheckPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hItemsForm);
   RMemory.freeHtml(o.hItemsPanel);
   RMemory.freeHtml(o.hBtnTextSpan);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hButtonPanel);
   o.hPanel = null;
   o.hItemsForm = null;
   o.hItemsPanel = null;
   o.hBtnTextSpan = null;
   o.hDropPanel = null;
   o.hButtonPanel = null;
}
function FUiColor(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor_onBuildEditValue;
   o.construct        = FUiColor_construct;
   o.get              = FUiColor_get;
   o.set              = FUiColor_set;
   return o;
}
function FUiColor_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiColor_onDataKeyDown(s, e){
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
function FUiColor_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor_setText(t){
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
function FUiColor_validText(t){
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
function FUiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColorConsole).focus(o, FUiColorEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor_drop(){
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
function FUiColor_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor_link(){
   var o = this;
}
function FUiColor3Tpl(o){
   o = RClass.inherits(this, o, FEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   o.onBuildEditValue  = FUiColor3Tpl_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiColor3Tpl_onInputChanged);
   o.construct         = FUiColor3Tpl_construct;
   o.get               = FUiColor3Tpl_get;
   o.set               = FUiColor3Tpl_set;
   return o;
}
function FUiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
function FUiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiColor3Tpl_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColor3Tpl_get(p){
   var o = this;
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._hInputGreen;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._hInputBlue;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}
function FUiColor3Tpl_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   var v = o._innerDataValue;
   var h = o._hInputRed;
   if(h){
      h.value = RFloat.format(v.red, 0, null, 2, null);
   }
   var h = o._hInputGreen;
   if(h){
      h.value = RFloat.format(v.green, 0, null, 2, null);
   }
   var h = o._hInputBlue;
   if(h){
      h.value = RFloat.format(v.blue, 0, null, 2, null);
   }
   o.changeSet(false);
}
function FUiColor3Tpl_onDataKeyDown(s, e){
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
function FUiColor3Tpl_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor3Tpl_setText(t){
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
function FUiColor3Tpl_validText(t){
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
function FUiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3TplConsole).focus(o, FUiColor3TplEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor3Tpl_drop(){
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
function FUiColor3Tpl_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor3Tpl_link(){
   var o = this;
}
function FUiColor4(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiColor4_onBuildEditValue;
   o.construct        = FUiColor4_construct;
   o.get              = FUiColor4_get;
   o.set              = FUiColor4_set;
   return o;
}
function FUiColor4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiColor4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiColor4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiColor4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiColor4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiColor4_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var v = null;
   if(p.constructor == SColor4){
      var r = RFloat.format(p.red, 0, null, 3, null);
      var g = RFloat.format(p.green, 0, null, 3, null);
      var b = RFloat.format(p.blue, 0, null, 3, null);
      v = r + ',' + g + ',' + b;
   }
   var h = o._hInput;
   if(h){
      h.value = v;
   }
}
function FUiColor4_onDataKeyDown(s, e){
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
function FUiColor4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiColor4_setText(t){
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
function FUiColor4_validText(t){
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
function FUiColor4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor4Console).focus(o, FUiColor4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiColor4_drop(){
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
function FUiColor4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiColor4_link(){
   var o = this;
}
function FColorPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
   o.borderStyle = EBorder.RoundDrop;
   o.onBuildEdit = FColorPicker_onBuildEdit;
   o.onEditEnd   = FColorPicker_onEditEnd;
   o.onDataKeyDown   = FColorPicker_onDataKeyDown;
   o.checkColor = FColorPicker_checkColor;
   o.setText     = FColorPicker_setText;
   o.drop        = FColorPicker_drop;
   o.dispose     = FColorPicker_dispose;
   return o;
}
function FColorPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
function FColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
function FColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, RString.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
function FColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
   oSpan = null;
}
function FColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
function FColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         ed.set(o.reget());
      }
      ed.show();
   }
}
function FColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FColorPickerEditor(o){
   o = RClass.inherits(this, o, FDropEditor, MShadow);
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = RClass.register(o, new HMouseOver('onCellEnter'),  FColorPickerEditor_onCellEnter);
   o.onCellSelect = RClass.register(o, new HMouseDown('onCellSelect'), FColorPickerEditor_onCellSelect);
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
   o.onBuildDrop  = FColorPickerEditor_onBuildDrop;
   o.onKeyDown    = FColorPickerEditor_onKeyDown;
   o.onCellSelect = FColorPickerEditor_onCellSelect;
    o.onEditEnd = FColorPickerEditor_onEditEnd;
   o.makeCell     = FColorPickerEditor_makeCell;
   o.set          = FColorPickerEditor_set;
   o.show         = FColorPickerEditor_show;
   o.hide         = FColorPickerEditor_hide;
   o.linkControl  = FColorPickerEditor_linkControl;
   o.dispose      = FColorPickerEditor_dispose;
   return o;
}
function FColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = RBuilder.appendTable(o.hDropPanel);
   for(var i = 0; i < 2; i++){
      for(var j = 0; j < 6; j++){
         var hRow = o.hTable.insertRow();
         o.makeCell(hRow, "#000000");
         if (i == 0){
            o.makeCell(hRow, '#'+o.ColorHex[j] + o.ColorHex[j] + o.ColorHex[j]);
         }else {
            o.makeCell(hRow, '#'+o.SpColorHex[j]);
         }
         o.makeCell(hRow, "#000000");
         for (k = 0; k < 3; k++) {
            for (l = 0; l < 6; l++) {
               o.makeCell(hRow, '#'+o.ColorHex[k + i * 3] + o.ColorHex[l] + o.ColorHex[j]);
            }
         }
      }
   }
}
function FColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', RClass.dump(c.hEditCell), RClass.dump(c.hEdit));
   RHtml.toRect(o.rect, c.hEditCell);
   RHtml.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
function FColorPickerEditor_onCellEnter(e){
   var o = this;
   o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
function FColorPickerEditor_onCellSelect(e){
   var o = this;
   o.color = e.srcElement.style.backgroundColor;
   o.editStatus = EEditStatus.Ok
   o.blur();
}
function FColorPickerEditor_makeCell(hRow, color) {
   var o = this;
   var h = hRow.insertCell();
   h.link = o;
   h.width = o.cellWidth;
   h.height = o.cellHeight;
   h.style.backgroundColor = color;
   o.attachEvent('onCellEnter', h);
   o.attachEvent('onCellSelect', h);
   return h;
}
function FColorPickerEditor_onKeyDown(e){
   alert(FColorPickerEditor_onKeyDown);
   var o = this;
   var kc = e.keyCode;
   if(EKey.Up == kc){
      o.select(o.selectIndex-1);
   }else if(EKey.Down == kc){
      o.select(o.selectIndex+1);
   }else if(EKey.Esc == kc){
      o.editStatus = EEditStatus.Cancel;
      o.selectIndex = o.originIndex;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }else if(EKey.Enter == kc){
      o.editStatus = EEditStatus.Ok;
      RKey.eventClear(e);
      o.inEdit = false;
      o.hEdit.blur();
   }
}
function FColorPickerEditor_set(v){
   var o = this;
   o.color = v;
}
function FColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
function FColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', RClass.dump(t), REnum.decode(EEditStatus, o.editStatus));
   if(t){
      t.hDrop.style.backgroundColor = o.color;
      var ec = RConsole.find(FEventConsole);
      if(EEditStatus.Cancel == o.editStatus){
         ec.add(t, t.focus);
      }else if(EEditStatus.Ok == o.editStatus){
         t.onEditEnd(o);
         ec.add(t, t.focus);
      }
   }
   o.editable = null;
   o.inEdit = false;
}
function FColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
function FColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
function FUiColorPower(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel    = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._barRed             = null;
   o._barGreen           = null;
   o._barBlue            = null;
   o._barPower           = null;
   o._hColorPanel        = null;
   o._hColorImage        = null;
   o._hChannelPanel      = null;
   o._hChannelForm       = null;
   o.onBuildEditValue    = FUiColorPower_onBuildEditValue;
   o.onMouseCaptureStart = FUiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = FUiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = FUiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiColorPower_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiColorPower_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiColorPower_onInputChange);
   o.construct           = FUiColorPower_construct;
   o.get                 = FUiColorPower_get;
   o.set                 = FUiColorPower_set;
   o.setDisplayColor     = FUiColorPower_setDisplayColor;
   o.setDisplay          = FUiColorPower_setDisplay;
   o.refreshValue        = FUiColorPower_refreshValue;
   o.dispose             = FUiColorPower_dispose;
   return o;
}
function FUiColorPower_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hcp = o._hColorPanel = RBuilder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = RBuilder.appendIcon(hcp, null, 'n', 14, 65);
   var hcp = o._hChannelPanel = RBuilder.appendTableCell(hl);
   var hcf = o._hChannelForm = RBuilder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   var b = o._barRed = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   var b = o._barGreen = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   var b = o._barBlue = new SUiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   var b = o._barPower = new SUiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.hPanel = hcf;
   b.build();
}
function FUiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}
function FUiColorPower_onMouseCapture(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}
function FUiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = RHtml.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}
function FUiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(RKeyboard.isControlKey(c)){
      return;
   }
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   o.processDataChangedListener(o);
}
function FUiColorPower_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
function FUiColorPower_get(p){
   var o = this;
   var v = o._innerDataValue;
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
   return v;
}
function FUiColorPower_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
   o.changeSet(false);
}
function FUiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var va = v.alpha;
   var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
function FUiColorPower_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}
function FUiColorPower_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
function FUiColorPower_dispose(t){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o, t);
}
function FUiDropEditor(o){
   o = RClass.inherits(this, o, FUiEditor, MUiShadow);
   o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
   o._styleDropForm    = RClass.register(o, new AStyle('_styleDropForm'));
   o._styleDropPanel   = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
   o._minWidth         = 160;
   o._minHeight        = 300;
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   o.onBuildDrop       = RMethod.virtual(o, 'onBuildDrop');
   o.onBuildButton     = RMethod.empty;
   o.onBuild           = FUiDropEditor_onBuild;
   o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
   o.panel             = FUiDropEditor_panel;
   o.setVisible        = FUiDropEditor_setVisible;
   o.dispose           = FUiDropEditor_dispose;
   return o;
}
function FUiDropEditor_onBuild(p){
   var o = this;
   o.__base.FUiEditor.onBuild.call(o, p);
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   var hf = o._hDropForm = RBuilder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = RBuilder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = RBuilder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   o.onBuildDrop();
   o.onBuildButton();
}
function FUiDropEditor_panel(p){
   var o = this;
   if(p == EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FUiEditor.panel.call(o, p);
}
function FUiDropEditor_setVisible(p){
   var o = this;
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FUiEditor.setVisible.call(o, p);
}
function FUiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = RHtml.free(o._hButtonPanel);
   o._hDropPanel = RHtml.free(o._hDropPanel);
   o._hDropForm = RHtml.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
function FUiEdit(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiEdit_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiEdit_onInputEdit);
   o.construct        = FUiEdit_construct;
   o.get              = FUiEdit_get;
   o.set              = FUiEdit_set;
   o.refreshValue     = FUiEdit_refreshValue;
   return o;
}
function FUiEdit_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiEdit_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiEdit_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiEdit_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
function FUiEdit_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   o._hInput.value = RString.nvl(p);
}
function FUiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiEditControl(o){
   o = RClass.inherits(this, o, FUiControl, MDataField, MEditValue, MEditChange, MEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), ELabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), ELabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EAlign.Left);
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._dataTypeCd       = RClass.register(o, new APtyString('_dataTypeCd'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._hLabelPanel      = null;
   o,_hLabelForm       = null;
   o,_hIconPanel       = null;
   o,_hIcon            = null;
   o,_hTextPanel       = null;
   o,_hText            = null;
   o._hEditPanel       = null;
   o._hEditForm        = null;
   o._hValuePanel      = null;
   o.onBuildLabelIcon  = FUiEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiEditControl_onBuildEdit;
   o.onBuildPanel      = FUiEditControl_onBuildPanel;
   o.onBuild           = FUiEditControl_onBuild;
   o.oeDataLoad        = FUiEditControl_oeDataLoad;
   o.oeDataSave        = FUiEditControl_oeDataSave;
   o.oeDesign          = FUiEditControl_oeDesign;
   o.oeMode            = FUiEditControl_oeMode;
   o.construct         = FUiEditControl_construct;
   o.panel             = FUiEditControl_panel;
   o.label             = FUiEditControl_label;
   o.setLabel          = FUiEditControl_setLabel;
   o.getValueRectangle = FUiEditControl_getValueRectangle;
   o.dispose           = FUiEditControl_dispose;
   return o;
}
function FUiEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }
}
function FUiEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}
function FUiEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   o.onBuildLabelIcon(p);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   RHtml.setSize(h, o._labelSize);
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FUiEditControl_onBuildEdit(p){
   var o = this;
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   RHtml.setSize(h, o._editSize);
}
function FUiEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiEditControl_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var hc = o._hPanel;
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
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEdit(p);
   }
}
function FUiEditControl_getValueRectangle(r){
   var o = this;
   if(!r){
      r = new SRectangle();
   }
   var h = o._hValuePanel;
   var p = RHtml.clientPosition(h);
   r.position.assign(p);
   r.setSize(h.offsetWidth, h.offsetHeight);
   return r;
}
function FUiEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FUiEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FUiEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FUiEditControl_onDataKeyDown(s, e){
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
function FUiEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FUiEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FUiEditControl_oeDataLoad(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FUiEditControl_oeDataSave(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}
function FUiEditControl_oeDesign(p){
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
function FUiEditControl_oeMode(e){
   var o = this;
   o.__base.FUiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiEditControl_oeProgress(e){
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
function FUiEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FUiEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FUiEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FUiEditControl_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o.__base.MEditChange.construct.call(o);
   o.__base.MEditDrop.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FUiEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiControl.panel.call(o, t);
}
function FUiEditControl_label(p){
   return this._label;
}
function FUiEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}
function FUiEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FUiEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FUiEditControl_setText(t){
   this.hEdit.value = t;
}
function FUiEditControl_setEditable(v){
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
function FUiEditControl_setVisible(v){
   var o = this;
   o.__base.FUiControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FUiEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FUiEditControl_refreshStyle(){
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
function FUiEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   var v = o._labelSize;
   if(v){
      v.dispose();
      o._labelSize = null;
   }
   var v = o._editSize;
   if(v){
      v.dispose();
      o._editSize = null;
   }
   RHtml.free(o._hLabelPanel);
   o._hLabelPanel = null;
   RHtml.free(o,_hLabelForm);
   o,_hLabelForm = null;
   RHtml.free(o,_hIconPanel);
   o,_hIconPanel = null;
   RHtml.free(o,_hIcon);
   o,_hIcon = null;
   RHtml.free(o,_hTextPanel);
   o,_hTextPanel = null;
   RHtml.free(o,_hText);
   o,_hText = null;
   RHtml.free(o._hEditPanel);
   o._hEditPanel = null;
   RHtml.free(o._hEditForm);
   o._hEditForm = null;
   RHtml.free(o._hValuePanel);
   o._hValuePanel = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
   o.__base.MEditDrop.dispose.call(o);
   o.__base.MEditChange.dispose.call(o);
   o.__base.FUiControl.dispose.call(o);
}
function FUiEditor(o){
   o = RClass.inherits(this, o, FUiControl, MFocus);
   o._visible       = false;
   o._statusVisible = false;
   o._styleEdit     = RClass.register(o, new AStyle('_styleEdit'));
   o._statusEditing = false;
   o._source        = null;
   o._hEdit         = null;
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   o.onEditKeyDown  = RClass.register(o, new AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = RClass.register(o, new AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = RClass.register(o, new AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = RClass.register(o, new AEventChange('onEditChange'));
   o.onEditBegin    = FUiEditor_onEditBegin;
   o.onEditChanged  = FUiEditor_onEditChanged;
   o.onEditEnd      = FUiEditor_onEditEnd;
   o.onBuildPanel   = FUiEditor_onBuildPanel;
   o.onBuild        = FUiEditor_onBuild;
   o.get            = RMethod.virtual(o, 'get');
   o.set            = RMethod.virtual(o, 'set');
   o.doBlur         = FUiEditor_doBlur;
   o.panel          = FUiEditor_panel;
   o.linkControl    = FUiEditor_linkControl;
   o.editBegin      = FUiEditor_editBegin;
   o.editCancel     = FUiEditor_editCancel;
   o.editEnd        = FUiEditor_editEnd;
   o.reset          = FUiEditor_reset;
   o.setVisible     = FUiEditor_setVisible;
   o.dispose        = FUiEditor_dispose;
   return o;
}
function FUiEditor_onEditBegin(){
   this.editBegin();
}
function FUiEditor_onEditChanged(){
   var o = this;
   RLogger.debug(o, 'Edit changed');
   var g = o.storage = RObject.nvlObj(o.storage);
   if(g.value == o.value()){
      if(o.changed){
         o.changed = false;
      }
   }else{
      if(!o.changed){
         o.changed = true;
      }
   }
}
function FUiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createSpan(p);
   h.__linker = o;
}
function FUiEditor_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = EUiLayer.Editor;
}
function FUiEditor_get(name){
}
function FUiEditor_set(name, value){
}
function FUiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(RClass.isClass(s, MFocus)){
         s.doBlur();
      }
   }
}
function FUiEditor_panel(p){
   var o = this;
   if(p == EPanel.Edit){
      return o._hEdit;
   }else if(p == EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FUiControl.panel.call(o, p);
}
function FUiEditor_linkControl(c){
   var o = this;
   o._source = c;
}
function FUiEditor_editBegin(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = o;
   o._statusEditing = true;
}
function FUiEditor_editCancel(){
   var o = this;
   var s = o._source;
   RLogger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
   o.hide();
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
function FUiEditor_editEnd(){
   this.onEditEnd();
}
function FUiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}
function FUiEditor_setVisible(p){
   var o = this;
   o.__base.FUiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}
function FUiEditor_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
   o._hEdit = null;
}
function FUiForm(o){
   o = RClass.inherits(this, o, FUiLayout, MDataset, MDescribeFrame);
   o.onMouseDown        = FUiForm_onMouseDown;
   o.construct          = FUiForm_construct;
   o._dataStatusCd      = ERowStatus.Update;
   o._clearEvent        = null;
   o._resetEvent        = null;
   o._loadEvent         = null;
   o._saveEvent         = null;
   o._recordEvent       = null;
   o._codeEvent         = null;
   o._dataComponents    = null;
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   o.onLoadDataset      = FUiForm_onLoadDataset;
   o.onLoadDatasetEnd   = FUiForm_onLoadDatasetEnd;
   o.isDataChanged      = FUiForm_isDataChanged;
   o.getFormLink        = FUiForm_getFormLink;
   o.allDataComponents  = FUiForm_allDataComponents;
   o.get                = FUiForm_get;
   o.reget              = FUiForm_reget;
   o.set                = FUiForm_set;
   o.getDataCodes       = FUiForm_getDataCodes;
   o.getCurrentRow      = FUiForm_getCurrentRow;
   o.getSelectedRows    = FUiForm_getSelectedRows;
   o.getCurrentRows     = FUiForm_getCurrentRows;
   o.getChangedRows     = FUiForm_getChangedRows;
   o.getRows            = FUiForm_getRows;
   o.clearValue         = FUiForm_clearValue;
   o.resetValue         = FUiForm_resetValue;
   o.loadValue          = FUiForm_loadValue;
   o.saveValue          = FUiForm_saveValue;
   o.recordValue        = FUiForm_recordValue;
   o.toAttributes       = FUiForm_toAttributes;
   o.focus              = FUiForm_focus;
   o.dsUpdate           = FUiForm_dsUpdate;
   o.doPrepare          = FUiForm_doPrepare;
   o.doUpdate           = FUiForm_doUpdate;
   o.doDelete           = FUiForm_doDelete;
   o.dispose            = FUiForm_dispose;
   return o;
}
function FUiForm_onMouseDown(p){
   var o = this;
}
function FUiForm_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
}
function FUiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
function FUiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
function FUiForm_isDataChanged(){
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
function FUiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FUiForm_allDataComponents(p, m){
   var o = this;
   if(!p){
      p = o;
   }
   if(!m){
      m = o._dataComponents;
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
function FUiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
function FUiForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
function FUiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
function FUiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
function FUiForm_getCurrentRow(){
   return this.saveValue();
}
function FUiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
function FUiForm_getChangedRows(){
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
function FUiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FUiForm_clearValue(){
   this.process(this._clearEvent);
}
function FUiForm_resetValue(){
   this.process(this._resetEvent);
}
function FUiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
function FUiForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = o._saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o._dataStatusCd);
   return r;
}
function FUiForm_recordValue(){
   this.process(this._recordEvent);
}
function FUiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
function FUiForm_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FUiForm_dsUpdate(u, v){
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
function FUiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}
function FUiForm_doPrepare(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doUpdate(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_doDelete(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FUiForm_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FUiForm_allNameComponents(f, p, m){
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
function FUiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
function FUiForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
function FUiForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FUiForm_connect(service, type, action, attrs){
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
function FUiForm_loadDocument(doc){
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
function FUiForm_testStatus(t){
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
function FUiForm_hasAction(){
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
function FUiFrame(o){
   o = RClass.inherits(this, o, FUiLayout);
   return o;
}
function FIconPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MListView);
   o.iconDefault    = RClass.register(o, new TPtyStr('iconDefault'));
   o.stIconDefault  = RClass.register(o, new TStyleIcon('Default'));
   o.hEditIcon      = null;
   o.borderStyle    = EBorder.RoundIcon;
   o.onEditKeyDown  = FIconPicker_onEditKeyDown;
   o.onEditKeyPress = FIconPicker_onEditKeyPress;
   o.onBuildEdit    = FIconPicker_onBuildEdit;
   o.setText        = FIconPicker_setText;
   o.dispose        = FIconPicker_dispose;
   return o;
}
function FIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
function FIconPicker_onBuildEdit(b){
   var o = this;
   var h = b.hPanel;
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = RString.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = RBuilder.appendIcon(h, hi);
   var h = o.hEdit = RBuilder.appendEdit(h, o.style('Edit'));
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
function FIconPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
function FIconPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
function FUiLabel(o){
   o = RClass.inherits(this, o, FEditControl);
   o.onBuildEdit  = FUiLabel_onBuildEdit;
   o.text         = FUiLabel_text;
   o.setText      = FUiLabel_setText;
   o.refreshStyle = RMethod.empty;
   return o;
}
function FUiLabel_onBuildEdit(){
   var o = this;
}
function FUiLabel_text(){
}
function FUiLabel_setText(t){
}
function FUiLayout(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._styleForm      = RClass.register(o, new AStyle('_styleForm', 'Form'));
   o._lastSplit      = null;
   o._hPanelForm     = null;
   o._hContainer     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   o.onBuildPanel    = FUiLayout_onBuildPanel;
   o.onDesignBegin   = FUiLayout_onDesignBegin;
   o.onDesignEnd     = FUiLayout_onDesignEnd;
   o.oeDesign        = FUiLayout_oeDesign;
   o.oeResize        = FUiLayout_oeResize;
   o.oeRefresh       = FUiLayout_oeRefresh;
   o.insertPosition  = FUiLayout_insertPosition;
   o.moveChild       = FUiLayout_moveChild;
   o.innerAppendLine = FUiLayout_innerAppendLine;
   o.appendChild     = FUiLayout_appendChild;
   o.resize          = FUiLayout_resize;
   o.dispose         = FUiLayout_dispose;
   return o;
}
function FUiLayout_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = o._hPanelForm = RBuilder.createTable(p.hDocument, o.styleName('Form'), null, 0, 1);
   if(o._layoutCd == ELayout.Design){
      var hr = RBuilder.appendTableRow(h);
      var hc = RBuilder.appendTableCell(hr);
      o._hContainer = hc;
   }
}
function FUiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}
function FUiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}
function FUiLayout_oeDesign(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o._hPanel.border = 1;
               o._hPanel.style.border = '1 solid red';
            }else{
               o._hPanel.border = 0;
               o._hPanel.style.border = null;
            }
            break;
      }
   }
}
function FUiLayout_oeResize(p){
   var o = this;
   o.__base.FUiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_oeRefresh(p){
   var o = this;
   o.__base.FUiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
function FUiLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o._components;
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
function FUiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf._hPanel, 'TD');
   var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct._hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf._hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf._hPanel, 'TD');
               var hCell = RBuilder.appendTableCell(hRow, null, hTd.cellIndex + 1);
               hCell.appendChild(cf._hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf._hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o._hContainer.insertBefore(cf._hPanel, ct._hPanel);
            }else{
               var hNewTab = o.innerAppendLine();
               o._hContainer.insertBefore(hNewTab, ct._hPanel);
               var hCell = RBuilder.appendTableCell(o._hPanelLine);
               hCell.appendChild(cf._hPanel);
               cf._hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o._hContainer.children.length;
            for(var n = 0; n < count; n++){
               if(o._hContainer.children[n] == hTable){
                  if(cfh){
                     o._hContainer.insertBefore(cf._hPanel, hTable);
                  }else{
                     var hNewTab = o.innerAppendLine();
                     o._hContainer.insertBefore(hNewTab, hTable);
                     var hCell = RBuilder.appendTableCell(o._hPanelLine);
                     hCell.appendChild(cf._hPanel);
                     cf._hPanelLine = hNewTab;
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
            o._hContainer.appendChild(cf._hPanel);
         }else{
            var hNewTab = o.innerAppendLine();
            var hCell = RBuilder.appendTableCell(o._hPanelLine);
            hCell.appendChild(cf._hPanel);
            hCell.appendChild(cf._hPanel);
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
function FUiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == ELayout.Design){
      h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = RBuilder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}
function FUiLayout_appendChild(ctl){
   var o = this;
   if(o._layoutCd == ELayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(RClass.isClass(ctl, MHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(ctl._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(ctl._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      var hCell = RBuilder.appendTableCell(o._hPanelLine);
      if(!RClass.isClass(ctl, FUiLayout)){
         ctl._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(ctl._hPanel);
      ctl._hLayoutCell = hCell;
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.innerAppendLine();
      }
   }else{
      ctl._hPanel.style.paddingTop = 2;
      ctl._hPanel.style.paddingBottom = 2;
      if(RSet.contains(ctl._sizeCd, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FUiSplit)){
            o._lastSplit = ctl;
         }
         var hr = RBuilder.appendTableRow(o._hPanelForm);
         var hc = RBuilder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(ctl._hPanel);
         ctl._hLayoutRow = hr;
         o._hPanelLast = hc;
         if(!RSet.contains(ctl._sizeCd, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o._hPanelLine = null;
      }else{
         if(!o._hPanelLine){
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            var ht = o._hPanelTable = RBuilder.appendTable(hc);
            o._hPanelLine = RBuilder.appendTableRow(ht);
         }
         var hc = RBuilder.appendTableCell(o._hPanelLine)
         ctl._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(ctl._hPanel);
         ctl._hLayoutCell = hc;
         if(!ctl.nowrap){
            o._hPanelLine = null;
         }
      }
   }
}
function FUiLayout_resize(){
   var o = this;
   var cs = o._components;
   if(cs){
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FUiPageControl)){
            ha = true;
            break;
         }
      }
   }
}
function FUiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiListBox(o){
   o = RClass.inherits(this, o, FUiContainer, MHorizontal, MListenerClick);
   o._sizeCd      = ESize.Horizontal
   o._styleForm   = RClass.register(o, new AStyle('_styleForm'));
   o._hForm       = null;
   o.onBuildPanel = FUiListBox_onBuildPanel;
   o.createItem   = FUiListBox_createItem;
   o.appendChild  = FUiListBox_appendChild;
   o.clickItem    = FUiListBox_clickItem;
   o.clear        = FUiListBox_clear;
   o.dispose      = FUiListBox_dispose;
   return o;
}
function FUiListBox_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Form'));
}
function FUiListBox_createItem(pi, pl){
   var o = this;
   var c = RClass.create(FUiListItem);
   c.build(o._hPanel);
   c.setLabel(pl);
   return c;
}
function FUiListBox_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiListBox_clickItem(p){
   var o = this;
   o.processClickListener(o, p);
}
function FUiListBox_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListItem)){
            o._hPanel.removeChild(m._hPanel);
         }
         m.dispose();
      }
      cs.clear();
      o._controls.clear();
   }
}
function FUiListBox_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FUiListItem(o){
   o = RClass.inherits(this, o, FUiControl);
   o._styleForm   = RClass.register(o, new AStyle('_styleForm'));
   o._styleIcon   = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel  = RClass.register(o, new AStyle('_styleLabel'));
   o._hPanel      = null;
   o._hIcon       = null;
   o._hLabel      = null;
   o.onBuildPanel = FUiListItem_onBuildPanel;
   o.onBuild      = FUiListItem_onBuild;
   o.onClick      = RClass.register(o, new AEventClick('onClick'), FUiListItem_onClick);
   o.label        = FUiListItem_label;
   o.setLabel     = FUiListItem_setLabel;
   o.dispose      = FUiListItem_dispose;
   return o;
}
function FUiListItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Form'));
}
function FUiListItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._icon){
      o._hIconPanel = RBuilder.appendTableCell(h)
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
}
function FUiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}
function FUiListItem_label(p){
   return this._label;
}
function FUiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}
function FUiListItem_dispose(){
   var o = this;
   o._hPanel = null;
   o._hIcon = null;
   o._hLabel = null;
   o.__base.FUiControl.dispose.call(o);
}
function FUiListView(o){
   o = RClass.inherits(this, o, FContainer, MShadow);
   o.type           = null;
   o.lovControl     = null;
   o.listView       = null;
   o.hForm          = null;
   o.hMessages      = null;
   o.ohClearClick   = FUiListView_ohClearClick;
   o.ohCloseClick   = FUiListView_ohCloseClick;
   o.ohResetClick   = FUiListView_ohResetClick;
   o.ohLoaded       = FUiListView_ohLoaded;
   o.oeBuild        = FUiListView_oeBuild;
   o.onBuildPanel   = FUiListView_onBuildPanel;
   o.onBuildFields  = FUiListView_onBuildFields;
   o.onBuildButton  = FUiListView_onBuildButton;
   o.onBuildData    = FUiListView_onBuildData;
   o.onKeyDown      = FUiListView_onKeyDown;
   o.buildField     = FUiListView_buildField;
   o.linkLovControl = FUiListView_linkLovControl;
   o.isBuilded      = FUiListView_isBuilded;
   o.show           = FUiListView_show;
   o.hide           = FUiListView_hide;
   o.doSearch       = FUiListView_doSearch;
   o.selectRow      = FUiListView_selectRow;
   o.dispose        = FUiListView_dispose;
   return o;
}
function FUiListView_ohCloseClick(){
   this.hide();
}
function FUiListView_ohClearClick(){
   var o = this;
   var cs = o.fieldsPanel.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         cs.value(n).clearSearch();
      }
   }
}
function FUiListView_ohResetClick(){
}
function FUiListView_ohLoaded(){
   this.lovControl.onBuildData(this.document.root());
}
function FUiListView_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   var hTab = RBuilder.appendTable(o.hPanel);
   hTab.width = '100%';
   hTab.height = '100%';
   var hRow = hTab.insertRow();
   var h = o.hTitlePanel = hRow.insertCell();
   h.className = o.style('TitlePanel');
   RBuilder.appendIcon(h, 'tool.search');
   RBuilder.appendText(h, '&nbsp;List of View');
   h.colSpan = 2;
   hRow = hTab.insertRow();
   var h = o.hFieldsPanel = hRow.insertCell();
   h.className = o.style('FieldsPanel');
   var h = o.hButtonPanel = hRow.insertCell();
   h.className = o.style('ButtonPanel');
   o.onBuildButton();
   return EEventStatus.Stop;
}
function FUiListView_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.append(null, 'DIV');
   o.hPanel.style.zIndex = ELayer.Message;
}
function FUiListView_onBuildFields(){
   return;
   var o = this;
   var hTab = o.hFieldsTab = RBuilder.appendTable(o.hFieldsPanel, null, 10, 10);
   hTab.width = '100%';
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Message:';
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Message');
   o.hMessages = RBuilder.appendTable(hCel);
   o.hMessages.width = '100%';
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Title');
   hCel.innerText = 'Description:';
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.className = this.style('Description');
}
function FUiListView_onBuildButton(){
   var o = this;
   var hBtnTab = RBuilder.appendTable(o.hButtonPanel, null, 0, 0, 6);
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   var b = o.btnSelect = RClass.create(FButton);
   b.label = 'Select'
   b.width = '100%';
   b.addClickListener(o, o.selectRow);
   b.build(hBtnTab.insertRow().insertCell());
   var b = o.btnClose = RClass.create(FButton);
   b.label = 'Close';
   b.width = '100%';
   b.addClickListener(o, o.ohCloseClick);
   b.build(hBtnTab.insertRow().insertCell());
   var b = o.btnRefresh = RClass.create(FButton);
   b.label = 'Refresh';
   b.width = '100%';
   b.addClickListener(o, o.ohClearClick);
   b.build(hBtnTab.insertRow().insertCell());
   var hRow = hBtnTab.insertRow();
   var hCel = hRow.insertCell();
   hCel.innerHTML = '&nbsp;';
}
function FUiListView_buildField(c){
   var o = this;
   var hCell = o.hFieldsTab.insertRow().insertCell();
   hCell.innerText = c.label;
   o.fieldsPanel = RControl.create(FPanel);
   o.fieldsPanel.build();
   o.fieldsPanel.setPanel(hCel);
}
function FUiListView_linkLovControl(ctl){
   var o = this;
   o.lovControl = ctl;
   o.lovRefer = ctl.lovRefer;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'dsPicker');
   RConsole.find('FEnvConsole').build(root);
   var dn = root.create('Control');
   dn.set('lov_refer', ctl.lovRefer);
   dn.set('lov_where', ctl.lovWhere);
   dn.set('lov_order', ctl.lovOrder);
   RLog.info(o, 'Send lov request (service={1},node={2})', ctl.lovRefer, root.dump());
   var e = new TEvent(o, EXmlEvent.Send);
   e.url = RService.url(ctl.lovService);
   e.document = doc;
   e.lovControl = o;
   e.onLoad = o.ohLoaded;
   RConsole.find(FXmlConsole).process(e);
}
function FUiListView_onBuildData(config){
   var o = this;
   var v = o.listView = RControl.fromNode(config, o.hFieldsPanel);
   v.hPanel.height = '100%';
   v.resize();
   v.addDblClickListener(o, o.selectRow);
   v.addSelectListener(o, o.selectRow);
   v.addKeyDownListener(o, o.onKeyDown);
   o.show();
}
function FUiListView_onKeyDown(sender, e){
   if(EKey.Esc == e.keyCode){
      this.hide();
   }
}
function FUiListView_show(){
   var o = this;
   if(!o.isVisible()){
      o.base.FContainer.show.call(o);
      RWindow.setEnable(false);
      RWindow.moveCenter(o.hPanel);
      o.base.MShadow.show.call(o, true);
      o.focus();
      o.listView.focus();
   }
}
function FUiListView_hide(){
   var o = this;
   if(o.isVisible()){
      o.base.FContainer.hide.call(o);
      o.base.MShadow.hide.call(o);
      RWindow.setEnable(true);
      o.lovControl.focus();
   }
}
function FUiListView_doSearch(){
   var o = this;
   var cs = o.fieldsPanel.components;
   if(cs){
      var sn = new TNode('Search');
      for(var n=0; n<cs.count; n++){
         cs.value(n).saveSearch(sn);
      }
      RLog.debug(o, 'Search value {1}', sn.dump());
   }
   o.hide();
}
function FUiListView_selectRow(table, row){
   var o = this;
   var fields = o.lovControl.lovFields;
   var dsCtl = o.lovControl.topControl(MDataset);
   if(dsCtl && fields){
      if(!row){
         row = o.listView.selectRow;
      }
      if(row){
         var flds = RString.splitTwo(fields, ',');
         for(var n=0; n<flds.length; n++){
            var v = RString.splitTwo(flds[n], ' ');
            dsCtl.dsSet(RString.nvl(v[1], v[0]), row.get(v[0]));
         }
         dsCtl.loadValue(dsCtl.dsCurrent());
      }
   }
   o.hide();
}
function FUiListView_isBuilded(){
   return (null != this.listView);
}
function FUiListView_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hButton);
   RMemory.freeHtml(o.hText);
   RMemory.freeHtml(o.userSrc);
   RMemory.freeHtml(o.femaleSrc);
   RMemory.freeHtml(o.errorSrc);
   RMemory.freeHtml(o.orgSrc);
   RMemory.freeHtml(o.dutySrc);
   RMemory.freeHtml(o.roleSrc);
   RMemory.freeHtml(o.userUk);
   o.hEdit = null;
   o.hButton = null;
   o.hText = null;
   o.userSrc = null;
   o.femaleSrc = null;
   o.errorSrc = null;
   o.orgSrc = null;
   o.dutySrc = null;
   o.roleSrc = null;
   o.userUk = null;
}
function FUiNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm  = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel     = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel   = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o._iconUp           = null;
   o._iconDown         = null;
   o.onBuildEditValue  = FUiNumber_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber_onInputChanged);
   o.construct         = FUiNumber_construct;
   o.get               = FUiNumber_get;
   o.set               = FUiNumber_set;
   return o;
}
function FUiNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hip = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hip, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
}
function FUiNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiNumber_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber_get(p){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._dataDisplay = RFloat.format(p, 0, null, 3, null);
   var h = o._hInput;
   if(h){
      h.value = o._dataDisplay;
   }
   o.changeSet(false);
}
function FUiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
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
function FUiNumber_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber_setText(t){
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
function FUiNumber_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
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
function FUiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumberConsole).focus(o, FUiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber_drop(){
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
function FUiNumber_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber_link(){
   var o = this;
}
function FUiNumber2(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber2_onBuildEditValue;
   o.construct        = FUiNumber2_construct;
   o.get              = FUiNumber2_get;
   o.set              = FUiNumber2_set;
   return o;
}
function FUiNumber2_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber2_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber2_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
}
function FUiNumber2_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber2_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber2_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber2_onDataKeyDown(s, e){
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
function FUiNumber2_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber2_setText(t){
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
function FUiNumber2_validText(t){
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
function FUiNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber2Console).focus(o, FUiNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber2_drop(){
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
function FUiNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber2_link(){
   var o = this;
}
function FUiNumber3(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   o._inputSize        = RClass.register(o, new APtySize2('_inputSize'));
   o._styleValuePanel  = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel  = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput       = RClass.register(o, new AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o.onBuildEditInput  = FUiNumber3_onBuildEditInput;
   o.onBuildEditValue  = FUiNumber3_onBuildEditValue;
   o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber3_onInputKeyPress);
   o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber3_onInputChanged);
   o.construct         = FUiNumber3_construct;
   o.get               = FUiNumber3_get;
   o.set               = FUiNumber3_set;
   return o;
}
function FUiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
function FUiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditChange(p);
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput1 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInput2 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
   var hc = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInput3 = RBuilder.appendEdit(hc, o.styleName('Input'));
   o.onBuildEditInput(p, he)
}
function FUiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
function FUiNumber3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiNumber3_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SPoint3();
   o._innerDataValue = new SPoint3();
}
function FUiNumber3_get(p){
   var o = this;
   o.__base.FUiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   var h = o._hInput1;
   if(h){
      v.x = RFloat.parse(h.value);
   }
   var h = o._hInput2;
   if(h){
      v.y = RFloat.parse(h.value);
   }
   var h = o._hInput3;
   if(h){
      v.z = RFloat.parse(h.value);
   }
   return v;
}
function FUiNumber3_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var a = arguments;
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == SPoint3) || (p.constructor == SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new TError('Invalid value format.');
   }
   var h = o._hInput1;
   if(h){
      h.value = RFloat.format(vd.x, 0, null, 3, null);
   }
   var h = o._hInput2;
   if(h){
      h.value = RFloat.format(vd.y, 0, null, 3, null);
   }
   var h = o._hInput3;
   if(h){
      h.value = RFloat.format(vd.z, 0, null, 3, null);
   }
   o.changeSet(false);
}
function FUiNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
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
function FUiNumber3_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber3_setText(t){
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
function FUiNumber3_validText(t){
   var o = this;
   var r = o.__base.FUiEditControl.validText.call(o, t);
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
function FUiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber3Console).focus(o, FUiNumber3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber3_drop(){
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
function FUiNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber3_link(){
   var o = this;
}
function FUiNumber4(o){
   o = RClass.inherits(this, o, FEditControl);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiNumber4_onBuildEditValue;
   o.construct        = FUiNumber4_construct;
   o.get              = FUiNumber4_get;
   o.set              = FUiNumber4_set;
   return o;
}
function FUiNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
function FUiNumber4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiNumber4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = RBuilder.appendTable(h);
   var hr = RBuilder.appendTableRow(hf);
   var hc1 = RBuilder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = RBuilder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = RBuilder.appendTableCell(hr);
   hc2.style.borderRight = '1px solid #666666';
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = RBuilder.appendEdit(hc2, o.styleName('Input'));
   var hc3 = RBuilder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   hc3.style.borderRight = '1px solid #666666';
   var he3 = o._hInput3 = RBuilder.appendEdit(hc3, o.styleName('Input'));
   var hc4 = RBuilder.appendTableCell(hr);
   hc4.style.borderLeft = '1px solid #999999';
   var he4 = o._hInput4 = RBuilder.appendEdit(hc4, o.styleName('Input'));
}
function FUiNumber4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiNumber4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiNumber4_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiNumber4_onDataKeyDown(s, e){
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
function FUiNumber4_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiNumber4_setText(t){
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
function FUiNumber4_validText(t){
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
function FUiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiNumber4Console).focus(o, FUiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiNumber4_drop(){
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
function FUiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiNumber4_link(){
   var o = this;
}
function FUiPageControl(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._sizeCd          = ESize.Horizontal;
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
   o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
   o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
   o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = ESize.Both;
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   o.onBuildPanel     = FUiPageControl_onBuildPanel;
   o.onBuild          = FUiPageControl_onBuild;
   o.oeRefresh        = FUiPageControl_oeRefresh;
   o.construct        = FUiPageControl_construct;
   o.appendChild      = FUiPageControl_appendChild;
   o.select           = FUiPageControl_select;
   o.selectByIndex    = FUiPageControl_selectByIndex;
   o.sheet            = FUiPageControl_sheet;
   o.push             = FUiPageControl_push;
   o.dispose          = FUiPageControl_dispose;
   return o;
}
function FUiPageControl_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}
function FUiPageControl_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
   var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = RBuilder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = RBuilder.appendTableRow(hf);
   var hr = o._hBottom = RBuilder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
   hc.width = 20;
   o._hFirst = RBuilder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FUiPageSheet);
   var hc = RBuilder.appendTableRowCell(h);
   hc.height = 4;
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiPageSheet);
}
function FUiPageControl_oeRefresh(p){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      if(o._sheets.count()){
         if(o._activeSheet){
            o._activeSheet.oeRefresh(e);
         }else{
            var s = o._activeSheet = o._sheets.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
function FUiPageControl_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._sheets = new TDictionary();
}
function FUiPageControl_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiPageSheet)){
      var ci = o._hLast.cellIndex;
      var hc = p._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      var hc = p._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = p._hButton = RBuilder.append(hc, 'DIV', p.styleName('Button'));
      if(p.icon){
         p._hIcon = RBuilder.appendIcon(hb, null, p.icon);
      }
      if(p.label){
         p._hText = RBuilder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      var hc = p._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      var hc = p._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hr = RBuilder.appendTableRow(o._hPanel);
      if(p.index){
         hr.style.display = 'none';
      }
      var hc = RBuilder.appendTableCell(hr);
      p._hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(p._hPanel);
      o.selectByIndex(0);
   }
}
function FUiPageControl_sheet(p){
   return this._sheets.get(p);
}
function FUiPageControl_select(p){
   var o = this;
   var ss = o._sheets;
   var c = ss.count();
   o._activeSheet = p;
   for(var i = 0; i < c; i++){
      var s = o._sheets.value(i);
      if(s != p){
         s.select(false);
      }
   }
   p.select(true);
}
function FUiPageControl_selectByIndex(n){
   var o = this;
   var p = o._sheets.value(n);
   if(p){
      o.select(p);
   }
}
function FUiPageControl_push(p){
   var o = this;
   if(RClass.isClass(p, FUiPageSheet)){
      var ss = o._sheets;
      p._pageControl = o;
      p._index = ss.count();
      ss.set(p.name(), p);
   }
   o.__base.FUiContainer.push.call(o, p);
}
function FUiPageControl_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiPageSheet(o){
   o = RClass.inherits(this, o, FUiPanel);
   o._icon              = RClass.register(o, new APtyString('_icon'));
   o._formName          = RClass.register(o, new APtyString('_formName'));
   o._formLink          = RClass.register(o, new APtyString('_formLink'));
   o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
   o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
   o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
   o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
   o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
   o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
   o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
   o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
   o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
   o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
   o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
   o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
   o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
   o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
   o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
   o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
   o._top               = 0;
   o._pages             = null;
   o._index             = null;
   o._selected          = false;
   o._hasBuilded        = false;
   o.lsnsSelect         = null;
   o._hTopL             = null;
   o._hTop              = null;
   o._hTopR             = null;
   o._hLeft             = null;
   o._hButton           = null;
   o._hIcon             = null;
   o._hText             = null;
   o._hBottomL          = null;
   o._hBottom           = null;
   o._hBottomR          = null;
   o._hRight            = null;
   o.onBuildPanel       = FUiPageSheet_onBuildPanel;
   o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiPageSheet_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FUiPageSheet_onHeadMouseDown);
   o.construct          = FUiPageSheet_construct;
   o.innerSelect        = FUiPageSheet_innerSelect;
   o.select             = FUiPageSheet_select;
   o.setVisible         = FUiPageSheet_setVisible;
   o.dispose            = FUiPageSheet_dispose
   o.innerDump          = FUiPageSheet_innerDump;
   return o;
}
function FUiPageSheet_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
   hp.width = '100%';
   hp.height = '100%';
   var hf = o._hPanelForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   hf.height = '100%';
}
function FUiPageSheet_onButtonEnter(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
function FUiPageSheet_onButtonLeave(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
function FUiPageSheet_onHeadMouseDown(p){
   var o = this;
   o._parent.select(o);
}
function FUiPageSheet_construct(){
   var o = this;
   o.__base.FUiPanel.construct.call(o);
   o.lsnsSelect = new TListeners();
}
function FUiPageSheet_innerSelect(p){
   var o = this;
   var b = o._parent;
   if(p && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeSheet._index - 1 == o._index);
   if(o._selected != p){
      if(p){
         o.lsnsSelect.process();
      }
      o._selected = p;
   }
   o._hButton.className = p ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = p ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = p ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = p ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   o._hForm.style.display = p ? 'block' : 'none';
}
function FUiPageSheet_select(p){
   var o = this;
   o.innerSelect(p);
   if(p){
      o.psRefresh();
      o.psResize();
   }
}
function FUiPageSheet_setVisible(p){
   var o = this;
   RHtml.displaySet(o._hPanel, p);
}
function FUiPageSheet_dispose(){
   var o = this;
   RMemory.free(o._hButton);
   o._hButton = null;
   RMemory.free(o._hTop);
   o._hTop = null;
   RMemory.free(o._hLeft);
   o._hLeft = null;
   RMemory.free(o._hBottomL);
   o._hBottomL = null;
   RMemory.free(o._hBottom);
   o._hBottom = null;
   RMemory.free(o._hBottomR);
   o._hBottomR = null;
   RMemory.free(o._hRight);
   o._hRight = null;
   o.__base.FUiPanel.dispose.call(o);
}
function FUiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, RClass.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
function FUiPanel(o){
   o = RClass.inherits(this, o, FUiLayout, MDesign, MFocus);
   o._sizeCd      = ESize.Horizontal;
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = RClass.register(o, new AStyle('_styleLabel', 'Label'));
   o._styleBody   = RClass.register(o, new AStyle('_styleBody', 'Body'));
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   o.onBuildPanel = FUiPanel_onBuildPanel;
   o.onTitleClick = RClass.register(o, new AEventClick('onTitleClick'), FUiPanel_onTitleClick);
   return o;
}
function FUiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   var hl = RBuilder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = RBuilder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = RBuilder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = RBuilder.appendIcon(hri, null, o._imageMinus);
   var hrt = RBuilder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   var hb = o._hBody = RBuilder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = RBuilder.appendTable(hb, o.styleName('Form'));
}
function FUiPanel_onTitleClick(p){
   var o = this;
   var s = !o._statusBody;
   o._statusBody = s;
   o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
   RHtml.displaySet(o._hBody, s);
}
function FUiRadio(o){
   o = RClass.inherits(this, o, FEditControl);
   o._groupName       = RClass.register(o, new APtyString('_groupName'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = FUiRadio_onBuildEditValue;
   return o;
}
function FUiRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
function FUiRadio_clearValue(){
   this.hEdit.checked = false;
}
function FUiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
function FUiRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
function FUiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
function FUiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
function FUiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
function FUiSelect(o){
   o = RClass.inherits(this, o, FUiEditControl, MUiContainer, MPropertySelect, MDropable, MListenerDataChanged);
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = FUiSelect_onBuildEditValue;
   o.onDoubleClick    = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiSelect_onDropClick);
   o.onDropClick      = FUiSelect_onDropClick;
   o.onKeyDown        = RClass.register(o, new AEventKeyDown('onKeyDown'), FUiSelect_onKeyDown);
   o.construct        = FUiSelect_construct;
   o.findItemByLabel  = FUiSelect_findItemByLabel;
   o.findItemByData   = FUiSelect_findItemByData;
   o.formatValue      = FUiSelect_formatValue;
   o.formatDisplay    = FUiSelect_formatDisplay;
   o.get              = FUiSelect_get;
   o.set              = FUiSelect_set;
   o.selectItem       = FUiSelect_selectItem;
   o.refreshValue     = FUiSelect_refreshValue;
   o.drop             = FUiSelect_drop;
   o.dispose          = FUiSelect_dispose;
   return o;
}
function FUiSelect_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   var c = o._emptyItem = RClass.create(FUiSelectItem);
   c.build(p);
   o.push(c);
}
function FUiSelect_onDropClick(p){
   this.drop();
}
function FUiSelect_onKeyDown(p){
   var o = this;
   var e = o._editor;
   if(e && e._statusEditing && (e._source == o)){
      e.onEditKeyDown(p);
      return;
   }
   if(p.keyCode == EKeyCode.Down){
      o.drop();
   }
}
function FUiSelect_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
}
function FUiSelect_findItemByLabel(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._label, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_findItemByData(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(RString.equals(c._dataValue, p, true)){
            return c;
         }
      }
   }
   return null;
}
function FUiSelect_formatValue(p){
   var o = this;
   var c = o.findItemByLabel(p);
   if(c){
      return RString.nvl(c._dataValue);
   }
   return p;
}
function FUiSelect_formatDisplay(p){
   var o = this;
   var c = o.findItemByData(p);
   if(c){
      return RString.nvl(c._label);
   }
   return p;
}
function FUiSelect_get(){
   var o = this;
   var s = o._hInput.value;
   var v = o.formatValue(s);
   return v;
}
function FUiSelect_set(p){
   var o = this;
   var t = o.formatDisplay(p);
   o._hInput.value = RString.nvl(t);
}
function FUiSelect_selectItem(p){
   var o = this;
   o._hInput.value = RString.nvl(p.label());
   o.refreshValue();
}
function FUiSelect_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var e = o._editor = RConsole.find(FEditorConsole).focus(o, FUiSelectEditor, o._name);
      e.buildItems(o);
      e.set(o.get());
      e.show();
   }
}
function FUiSelect_dispose(){
   var o = this;
   o.__base.FUiEditControl.dispose.call(o);
}
function FUiSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
function FUiSelect_loadConfig(c){
   var o = this;
   o.__base.FUiEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   if(!o.editCheck){
      o.items.create('', '');
   }
   o.items.loadConfig(c);
   var ns = c.nodes;
   if(ns){
   var nc = ns.count;
      for(var n = 0; n < nc; n++){
        var p = ns.get(n);
         if(p.isName('Event')){
            var e = RClass.create(FEvent);
             e.loadConfig(p);
             o.push(e);
         }
      }
   }
   return EStatus.Stop;
}
function FUiSelect_refreshStyle(){
   var o = this;
   o.__base.FUiEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
function FUiSelect_doBlur(){
   var o = this;
   o.__base.FUiEditControl.doBlur.call(o);
   if(o._editor){
      o._editor.hide();
   }
}
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor, MListenerItemClick);
   o._items         = null;
   o._position      = null;
   o._hDropLayout   = null;
   o._hItemsForm    = null;
   o.onBuildDrop   = FUiSelectEditor_onBuildDrop;
   o.onItemClick   = FUiSelectEditor_onItemClick;
   o.onEditKeyDown = FUiSelectEditor_onEditKeyDown;
   o.onEditEnd     = FUiSelectEditor_onEditEnd;
   o.construct     = FUiSelectEditor_construct;
   o.testBlur      = FUiSelectEditor_testBlur;
   o.buildItems    = FUiSelectEditor_buildItems;
   o.clearItems    = FUiSelectEditor_clearItems;
   o.get           = FUiSelectEditor_get;
   o.set           = FUiSelectEditor_set;
   o.select        = FUiSelectEditor_select;
   o.fetch         = FUiSelectEditor_fetch;
   o.setVisible    = FUiSelectEditor_setVisible;
   o.dispose       = FUiSelectEditor_dispose;
   return o;
}
function FUiSelectEditor_onBuildDrop(){
   var o = this;
   var hl = o._hDropLayout = RBuilder.appendDiv(o._hDropPanel)
   var hf = o._hItemsForm = RBuilder.appendTable(hl);
   o._hItemsBody = RBuilder.append(hf, 'TBODY');
}
function FUiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}
function FUiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case EKeyCode.Enter:
         o.editEnd();
         break;
      case EKeyCode.Esc:
         o.editCancel();
         break;
   }
}
function FUiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FUiDropEditor.onEditEnd.call(o);
}
function FUiSelectEditor_construct(){
   var o = this;
   o.__base.FUiDropEditor.construct.call(o);
}
function FUiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}
function FUiSelectEditor_clearItems(){
   var o = this;
   var hb = o._hItemsBody;
   var cs = o._items;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var ci = cs.value(i);
         ci.removeClickListener(o, o.onItemClick);
         hb.removeChild(ci._hPanel);
      }
   }
   o._position = 0;
}
function FUiSelectEditor_buildItems(p){
   var o = this;
   var hb = o._hItemsBody;
   var cs = p.components();
   if(cs == o._items){
      return;
   }else{
      o.clearItems();
   }
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var ci = cs.value(i);
      ci.addClickListener(o, o.onItemClick);
      ci.setPanel(hb);
   }
   o._position = 0;
   o._items = cs;
}
function FUiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}
function FUiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(RString.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
function FUiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   var n = RInteger.toRange(p, 0, c - 1);
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}
function FUiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
function FUiSelectEditor_setVisible(p){
   var o = this;
   o.__base.FUiDropEditor.setVisible.call(o, p);
   var hp = o._hPanel;
   var hif = o._hItemsForm;
   if(p){
      var s = o._source;
      var r = s.getValueRectangle(RValue.rectangle);
      hif.width = '';
      var iw = hif.offsetWidth;
      hp.style.left = r.left() + 'px';
      hp.style.top = r.bottom() + 'px';
      hp.style.width = Math.max(iw, r.width()) + 'px';
      hif.width = '100%';
      if(hif.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}
function FUiSelectEditor_dispose(){
   var o = this;
   o._hDropLayout = RHtml.free(o._hDropLayout);
   o._hItemsForm = RHtml.free(o._hItemsForm);
   o.__base.FUiDropEditor.dispose.call(o);
}
function FUiSelectItem(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._note             = RClass.register(o, new APtyString('_note'));
   o._dataValue        = RClass.register(o, new APtyString('_dataValue'));
   o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconChecked = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleNote        = RClass.register(o, new AStyle('_styleNote'));
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   o._checked          = false;
   o.onBuildPanel      = FUiSelectItem_onBuildPanel;
   o.onBuild           = FUiSelectItem_onBuild;
   o.onEnter           = FUiSelectItem_onEnter;
   o.onLeave           = FUiSelectItem_onLeave;
   o.onMouseDown       = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiSelectItem_onMouseDown);
   o.setChecked        = FUiSelectItem_setChecked;
   o.set               = FUiSelectItem_set;
   o.dispose           = FUiSelectItem_dispose;
   return o;
}
function FUiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName("Normal"));
}
function FUiSelectItem_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   var hp = o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
   hp.width = 18;
   hp.align = 'center';
   if(o._icon){
   }
   var hp = o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
   if(o._label){
      hp.innerHTML = o._label;
   }else{
      hp.innerHTML = '&nbsp;';
   }
   o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
}
function FUiSelectItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
function FUiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Panel');
   o.__base.FUiControl.onLeave.call(o);
}
function FUiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
}
function FUiSelectItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Panel');
}
function FUiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = RString.nvl(icon);
   if(!RString.isEmpty(o._icon)){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = RString.nvl(label);
   o._value = RString.nvl(value);
   o._note = RString.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}
function FUiSelectItem_dispose(){
   var o = this;
   o._hIconPanel = RHtml.free(o._hIconPanel);
   o._hLabelPanel = RHtml.free(o._hLabelPanel);
   o._hNotePanel = RHtml.free(o._hNotePanel);
   o.__base.FUiControl.dispose.call(o);
}
function FUiSlideNumber(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyNumber, MListenerDataChanged, MMouseCapture);
   o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
   o._styleSlidePanel    = RClass.register(o, new AStyle('_styleSlidePanel'));
   o._styleValuePanel    = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput         = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm    = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel       = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel     = RClass.register(o, new AStyle('_styleDownPanel'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._slide              = null;
   o._hInput             = null;
   o._iconUp             = null;
   o._iconDown           = null;
   o.onBuildEditValue    = FUiSlideNumber_onBuildEditValue;
   o.onMouseCaptureStart = FUiSlideNumber_onMouseCaptureStart;
   o.onMouseCapture      = FUiSlideNumber_onMouseCapture;
   o.onMouseCaptureStop  = FUiSlideNumber_onMouseCaptureStop;
   o.onSlideChange       = FUiSlideNumber_onSlideChange;
   o.onInputKeyPress     = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiSlideNumber_onInputKeyPress);
   o.onInputEdit         = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiSlideNumber_onInputEdit);
   o.onInputChange       = RClass.register(o, new AEventChange('onInputChange'), FUiSlideNumber_onInputChange);
   o.construct           = FUiSlideNumber_construct;
   o.get                 = FUiSlideNumber_get;
   o.set                 = FUiSlideNumber_set;
   o.setInputValue       = FUiSlideNumber_setInputValue;
   o.refreshValue        = FUiSlideNumber_refreshValue;
   return o;
}
function FUiSlideNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.__linker = o;
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hsp = o._hSlidePanel = RBuilder.appendTableCell(hl, o.styleName('SlidePanel'));
   var b = o._slide = new SUiSlide();
   b.control = o;
   b.hPanel = hsp;
   b.setRange(o._valueMin, o._valueMax);
   b.onSlideChange = o.onSlideChange;
   b.build();
   var hep = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   o.attachEvent('onInputChange', he, o.onInputChange);
   RHtml.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
}
function FUiSlideNumber_onMouseCaptureStart(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseDown(p);
   }
}
function FUiSlideNumber_onMouseCapture(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseMove(p);
   }
}
function FUiSlideNumber_onMouseCaptureStop(p){
   var o = this;
   var c = RHtml.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseUp(p);
   }
}
function FUiSlideNumber_onSlideChange(p){
   var o = this;
   o.setInputValue(p);
   o.refreshValue();
}
function FUiSlideNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
function FUiSlideNumber_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.refreshValue();
}
function FUiSlideNumber_onInputChange(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.setInputValue(v);
   o.refreshValue();
}
function FUiSlideNumber_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiSlideNumber_get(p){
   var o = this;
   var v = o._hInput.value;
   var r = RFloat.parse(v);
   return RFloat.toRange(r, o._valueMin, o._valueMax);
}
function FUiSlideNumber_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   var v = RString.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._slide.set(v);
   o.setInputValue(v);
   o.changeSet(false);
}
function FUiSlideNumber_setInputValue(p){
   var o = this;
   var v = RFloat.parse(p);
   if(isNaN(v)){
      return;
   }
   v = RFloat.toRange(v, o._valueMin, o._valueMax);
   o._dataDisplay = RFloat.format(v, 0, null, 2, null);
   o._hInput.value = o._dataDisplay;
}
function FUiSlideNumber_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiSplit(o){
   o = RClass.inherits(this, o, FControl);
   o._dispStyle        = RClass.register(o, new APtyString('_dispStyle', ESplitStyle.Normal));
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._editExtend       = RClass.register(o, new APtyBoolean('_editExtend'), true);
   o._styleTitle       = RClass.register(o, new TStyle('Title'));
   o._iconMinus        = 'ctl.collapse_nor';
   o._iconPlus         = 'ctl.expand_nor';
   o.__lines           = null;
   o._esize            = ESize.Horizontal;
   o.extended          = true;
   o.hImage            = null;
   o.hIcon             = null;
   o.hText             = null;
   o.onSplitMouseEnter = RClass.register(o, new HMouseEnter('onSplitMouseEnter'), FUiSplit_onSplitMouseEnter);
   o.onSplitMouseLeave = RClass.register(o, new HMouseLeave('onSplitMouseLeave'), FUiSplit_onSplitMouseLeave);
   o.onMouseDown       = FUiSplit_onMouseDown;
   o.onBuildPanel      = FUiSplit_onBuildPanel;
   o.oeBuild           = FUiSplit_oeBuild;
   o.oeMode            = FUiSplit_oeMode;
   o.construct         = FUiSplit_construct;
   o.extend            = FUiSplit_extend;
   o.pushLine          = FUiSplit_pushLine;
   o.dispose           = FUiSplit_dispose;
   return o;
}
function FUiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
function FUiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
function FUiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
function FUiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
function FUiSplit_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   o.height = 2;
   if(RString.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FUiSplit_Panel') + ')';
      RBuilder.appendEmpty(hc, 4);
      o.hImage = RBuilder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hc, o._icon);
      }
      o.hText = RBuilder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(RString.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(RString.equals(o._dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   return EEventStatus.Stop;
}
function FUiSplit_oeMode(e){
   var o = this;
   var r = o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
function FUiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
function FUiSplit_extend(v){
   var o = this;
   if(EMode.Design == o._emode){
      return;
   }
   if(o.extended == v){
      return;
   }
   o.extended = v;
   if(o.hImage){
      o.hImage.src = v ? RResource._iconPath(o._iconMinus) : RRes._iconPath(o._iconPlus);
   }
   var c = o.__lines.count;
   for(var n=0; n<c; n++){
      o.__lines.get(n).style.display = v ? 'block' : 'none';
   }
   o.topControl().topResize(o);
}
function FUiSplit_pushLine(hr){
   this.__lines.push(hr);
}
function FUiSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
function MUiShadow(o){
   o = RClass.inherits(this, o);
   o._hShadow   = null;
   o.show       = MUiShadow_show;
   o.hide       = MUiShadow_hide;
   o.setVisible = MUiShadow_setVisible;
   return o;
}
function MUiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = RUiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }
}
function MUiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
function MUiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RUiLayer.next();
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var r = RHtml.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RUiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
function SUiColorBar(){
   var o = this;
   o._draging          = false;
   o.control           = null;
   o.typeCd            = null;
   o.minValue          = 0;
   o.maxValue          = 1;
   o.hPanel            = null;
   o.hColorPanel       = null;
   o.hColorImage       = null;
   o.hSlidePanel       = null;
   o.hSlideForm        = null;
   o.hSlideRowUL       = null;
   o.hSlideRowUM       = null;
   o.hSlideRowUR       = null;
   o.hSlideRowML       = null;
   o.hSlideRowMM       = null;
   o.hSlideRowMR       = null;
   o.hSlideRowBL       = null;
   o.hSlideRowBM       = null;
   o.hSlideRowBR       = null;
   o.hInputPanel       = null;
   o.hInput            = null;
   o.onMouseDown       = SUiColorBar_onMouseDown;
   o.onMouseMove       = SUiColorBar_onMouseMove;
   o.onMouseUp         = SUiColorBar_onMouseUp;
   o.build             = SUiColorBar_build;
   o.setColorValue     = SUiColorBar_setColorValue;
   o.setSlideValue     = SUiColorBar_setSlideValue;
   o.setInputValue     = SUiColorBar_setInputValue;
   o.convertSlide      = SUiColorBar_convertSlide;
   o.convertGet        = SUiColorBar_convertGet;
   o.convertSet        = SUiColorBar_convertSet;
   o.get               = SUiColorBar_get;
   o.set               = SUiColorBar_set;
   o.changeSlide       = SUiColorBar_changeSlide;
   o.changeInputEdit   = SUiColorBar_changeInputEdit;
   o.changeInputChange = SUiColorBar_changeInputChange;
   return o;
}
function SUiColorBar_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
function SUiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = RBuilder.appendTableRow(hcf);
   var hc = o.hColorPanel = RBuilder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = RBuilder.appendIcon(hc, null, 'n', 11, 11);
   var hc = o.hSlidePanel = RBuilder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = RBuilder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideRowUp = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideRow = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideRowDown = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideRowBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = RBuilder.appendTableCell(hl);
   var hc = o.hInputPanel = RBuilder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = RBuilder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}
function SUiColorBar_setColorValue(p){
   var o = this;
   var v = RHex.format(p, 2);
   var c = null;
   switch(o.typeCd){
      case 'red':
         c = v + '0000';
         break;
      case 'green':
         c = '00' + v + '00';
         break;
      case 'blue':
         c = '0000' + v;
         break;
      default:
         throw new TError(o, 'Invalid type.');
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
function SUiColorBar_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorBar_setInputValue(p){
   this.hInput.value = p;
}
function SUiColorBar_convertGet(p){
   return p;
}
function SUiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}
function SUiColorBar_convertSet(p){
   return p;
}
function SUiColorBar_set(p){
   var o = this;
   var v = o.convertSet(p);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.setInputValue(v);
}
function SUiColorBar_convertSlide(p){
   return p;
}
function SUiColorBar_changeSlide(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputEdit(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.control.refreshValue();
}
function SUiColorBar_changeInputChange(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   o.control.refreshValue();
}
function SUiColorChannel(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 255;
   o.setInputValue = SUiColorChannel_setInputValue;
   o.convertGet    = SUiColorChannel_convertGet;
   o.convertSet    = SUiColorChannel_convertSet;
   return o;
}
function SUiColorChannel_setInputValue(p){
   var o = this;
   var v = RInteger.toRange(p, o.minValue, o.maxValue);
   var t = RInteger.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorChannel_convertGet(p){
   var o = this;
   var v = RInteger.parse(RString.nvl(p, '0'));
   return RInteger.toRange(v, o.minValue, o.maxValue) / 255;
}
function SUiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
function SUiColorPower(){
   var o = this;
   SUiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 4;
   o.setColorValue = SUiColorPower_setColorValue;
   o.setSlideValue = SUiColorPower_setSlideValue;
   o.setInputValue = SUiColorPower_setInputValue;
   o.convertGet    = SUiColorPower_convertGet;
   o.convertSet    = SUiColorPower_convertSet;
   o.convertSlide  = SUiColorPower_convertSlide;
   return o;
}
function SUiColorPower_setColorValue(p){
   var o = this;
   var v = RInteger.toRange(parseInt(p * 255), 0, 255);
   var s = RHex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}
function SUiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = RFloat.toRange(p, o.minValue, o.maxValue);
   var t = RFloat.format(v, 0, null, 2, null);
   if(h.value != t){
      h.value = t;
   }
}
function SUiColorPower_convertGet(p){
   return RFloat.parse(p);
}
function SUiColorPower_convertSet(p){
   return p;
}
function SUiColorPower_convertSlide(p){
   return p * this.maxValue;
}
function SUiSlide(){
   var o = this;
   o._draging      = false;
   o.control       = null;
   o.stepValue     = 1;
   o.minValue      = 0;
   o.maxValue      = 100;
   o.range         = 100;
   o.hPanel        = null;
   o.hSlidePanel   = null;
   o.hSlideForm    = null;
   o.hSlideU       = null;
   o.hSlideUL      = null;
   o.hSlideUM      = null;
   o.hSlideUR      = null;
   o.hSlideM       = null;
   o.hSlideML      = null;
   o.hSlideMM      = null;
   o.hSlideMR      = null;
   o.hSlideB       = null;
   o.hSlideBL      = null;
   o.hSlideBM      = null;
   o.hSlideBR      = null;
   o.onMouseDown   = SUiSlide_onMouseDown;
   o.onMouseMove   = SUiSlide_onMouseMove;
   o.onMouseUp     = SUiSlide_onMouseUp;
   o.onSlideChange = RMethod.empty;
   o.build          = SUiSlide_build;
   o.setRange       = SUiSlide_setRange;
   o.setSlideValue  = SUiSlide_setSlideValue;
   o.get            = SUiSlide_get;
   o.set            = SUiSlide_set;
   o.changeSlide    = SUiSlide_changeSlide;
   return o;
}
function SUiSlide_onMouseDown(p){
   var o = this;
   var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   RWindow.setOptionSelect(false);
   o.changeSlide(x);
}
function SUiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
function SUiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   RWindow.setOptionSelect(true);
}
function SUiSlide_build(p){
   var o = this;
   var c = o.control;
   var hf = o.hSlideForm = RBuilder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideU = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideUM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = RBuilder.appendTableCell(hl);
   var hl = o.hSlideM = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = RBuilder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideB = RBuilder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = RBuilder.appendTableCell(hl);
   var hc = o.hSlideBM = RBuilder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = RBuilder.appendTableCell(hl);
}
function SUiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = RFloat.parse(i);
   }
   if(a != null){
      o.maxValue = RFloat.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}
function SUiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = RInteger.toRange(v, 1, w - 1);
   }
}
function SUiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}
function SUiSlide_set(p){
   var o = this;
   o.setSlideValue(p);
}
function SUiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = RInteger.toRange(p, 1, w - 1);
   var v = (p / w) * o.range + o.minValue;
   v = RFloat.toRange(v, o.minValue, o.maxValue);
   o.onSlideChange.call(c, v);
}
var EGridColumn = new function EGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
var EGridDisplay = new function EGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
   o._table       = null;
   o._column      = null;
   o._row         = null;
   o.onBuildPanel = FCell_onBuildPanel;
   o.onBuild      = FCell_onBuild;
   o.oeDataLoad   = FCell_oeDataLoad;
   o.oeDataSave   = FCell_oeDataSave;
   return o;
}
function FCell_onBuildPanel(p) {
   var o = this;
   o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
}
function FCell_onBuild(p){
   var o = this;
   o.__base.FControl.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   RHtml.linkSet(h, 'control', o);
}
function FCell_oeDataLoad(p){
   var o = this;
   var c = o._column;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(c._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FCell_oeDataSave(p){
   var o = this;
   var c = o._column;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(c._dataName, v);
   return EEventStatus.Stop;
}
function FCell_doFocus(){
   var o = this;
   o._table.__focusCell = o;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
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
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
function FCell_descriptor(){
   return this._column;
}
function FCell_text(){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      return o._hPanel.innerHTML;
   }else if(c._absEdit && o._hEdit){
      return o._hEdit.value;
   }else if(o._hEditPanel){
      return o._hEditPanel.innerText;
   }
   return '';
}
function FCell_setText(t){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      o._hPanel.innerHTML = t;
   }else if(c._absEdit && o._hEdit){
      o._hEdit.value = t;
   }else if(o._hEditPanel){
      o._hEditPanel.innerText = t;
   }
}
function FCell_focus(s){
   var o = this;
   var h = o._hEdit;
   if(h){
      o._column._table.selectRow(o._row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}
function FCell_setVisible(v){
   this._hPanel.style.display = v ? 'block' : 'none';
}
function FCell_refreshStyle(){
   var o = this;
   var t = o._table;
   var r = o._row;
   var s = r.isSelect;
   var he = o._hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   var bc = null;
   if(s){
      bc = EColor._rowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor._rowHover;
      }else{
         bc = EColor._rows[r.index % EColor._rows.length];
      }
   }
   if(o.__focus){
      bc = EColor._rowEditHover;
   }
   o._hPanel.style.backgroundColor = bc;
}
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hPanel);
   o._hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o._hEditPanel = null;
   o._hEdit = null;
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
function FCellButton(o){
   o = RClass.inherits(this, o, FCell);
   o.buttons           = null;
   o.attributes        = null;
   o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FCellButton_onButtonEnter);
   o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FCellButton_onButtonLeave);
   o.onCellLeave       = RClass.register(o, new AEventMouseLeave('onCellLeave'), FCellButton_onCellLeave);
   o.onHintEnter       = RClass.register(o, new AEventMouseEnter('onHintEnter'), FCellButton_onHintEnter);
   o.onHintLeave       = RClass.register(o, new AEventMouseLeave('onHintLeave'), FCellButton_onHintLeave);
   o.onButtonClick     = RClass.register(o, new AEventClick('onButtonClick'), FCellButton_onButtonClick);
   o.construct         = FCellButton_construct;
   o.isDataChanged     = RMethod.emptyFalse;
   o.findButtonByPanel = FCellButton_findButtonByPanel;
   o.buildForm         = FCellButton_buildForm;
   o.set               = FCellButton_set;
   o.modifyButton      = FCellButton_modifyButton;
   o.refreshStyle      = FCellButton_refreshStyle;
   return o;
}
function FCellButton_onButtonEnter(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = 'black';
      hs.cursor = 'hand';
      if(b.hintBox){
        b.hintBox.style.display = "block";
       }
   }
   if (o.hHintPanel) {
      o.hHintPanel.style.display = '';
   }
}
function FCellButton_onButtonLeave(e){
   var o = this;
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      var hs = b.hPanel.style;
      hs.color = '#0661B0';
      hs.cursor = 'normal';
   }
}
function FCellButton_onHintEnter(e){
   var o = this;
   e.hSource.style.backgroundColor = "#eeeeee";
}
function FCellButton_onCellLeave(e){
   var bs = this.buttons;
   var c = bs.count;
   for(var n = 0; n<c; n++){
      var b = bs.value(n);
      if(b.hintBox){
         b.hintBox.style.display='none';
      }
   }
}
function FCellButton_onHintLeave(e){
   e.hSource.style.backgroundColor = "#ffffff";
    e.hSource.style.display = "none";
}
function FCellButton_onButtonClick(e){
   var o = this;
   var t = o.table;
   t.clickCell(o);
   var b = o.findButtonByPanel(e.hSource);
   if(b){
      b.button.callEvent('onClick', o, e);
   }
}
function FCellButton_construct(){
   var o = this;
   o.base.FCell.construct.call(o);
   o.attributes = new TAttributes();
}
function FCellButton_findButtonByPanel(h){
   var o = this;
   var bs = o.buttons;
   for(var n=0; n<bs.count; n++){
      var b = bs.value(n);
      if(b.hPanel == h){
         return b;
      }
   }
}
function FCellButton_buildForm(){
   var o = this;
   var c = o.column;
   var hp = o.hPanel;
   RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
   hp.align = 'left';
   hp.padding = 1;
   var hf = o.hForm = RBuilder.appendTable(o.hPanel);
   var hr = o.hFormLine = hf.insertRow();
   var bs = c.components;
   if(bs){
      o.buttons = new TMap();
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         var hc = hr.insertCell();
         hc.align = 'center';
         hc.style.padding = '0 3';
         var hbp = RBuilder.append(hc, 'DIV');
         var hi = null;
         if(b.icon){
            hi = RBuilder.appendIcon(hbp, b.icon);
         }else{
            hbp.style.padding = '2 6';
            hbp.style.color = '#0661B0';
            hbp.style.textDecoration = 'underline';
         }
         o.attachEvent('onButtonEnter', hbp, o.onButtonEnter);
         o.attachEvent('onButtonLeave', hbp, o.onButtonLeave);
         o.attachEvent('onButtonClick', hbp, o.onButtonClick);
         var ht = null;
         if(b.label){
            if(b.icon){
               hi.title = b.label;
            }else{
               ht = RBuilder.appendText(hbp, b.label);
            }
         }
         var cb = new TCellButton();
         cb.button = b;
         cb.hLayout = hc;
         cb.hPanel = hbp;
         cb.hIcon = hi;
         cb.hText = ht;
         o.buttons.set(b.name, cb);
      }
      var hfp = o.hHintPanel = o.hForm.insertRow().insertCell();
      hfp.height = 1;
      hfp.style.position = 'relative';
   }
}
function FCellButton_set(v){
   var o = this;
   if(!RString.isEmpty(v)){
      var pbs = new TAttributes();
      pbs.unpack(v);
      for(var n=0; n<pbs.count; n++){
         var b = o.buttons.get(pbs.name(n));
         var pk = pbs.value(n);
         if(b && !RString.isEmpty(pk)){
            var as = o.attributes;
            as.clear();
            as.unpack(pk);
            o.modifyButton(b, as);
         }
      }
   }
}
function FCellButton_modifyButton(b, as){
   var o = this;
   var bv = true;
   if(as.contains('visible')){
      bv = RBoolean.isTrue(as.get('visible'));
   }
   b.hLayout.style.display = bv ? 'block' : 'none';
   var pd = as.get('disabled');
   if(pd){
      if(RBoolean.isTrue(pd)){
         hc.style.padding = 3;
         hc.style.border = 0;
      }else{
         hc.style.padding = 2;
         hc.style.borderLeft = '1 solid #DDDDDD';
         hc.style.borderTop = '1 solid #DDDDDD';
         hc.style.borderRight = '1 solid #999999';
         hc.style.borderBottom = '1 solid #999999';
         hc.style.backgroundColor = '#FFFFFF';
      }
   }
   var pl = as.get('label');
   if(pl){
      if(b.icon){
         b.hIcon.title = pl;
      }else{
         b.hText.innerText = pl;
      }
   }
   if(as.contains('hint')){
      hfd = o.hFloatDrop = RBuilder.append(o.hHintPanel, 'DIV');
      hfd.style.borderLeft = '1 solid #CCCCCC';
      hfd.style.borderTop = '1 solid #CCCCCC';
      hfd.style.borderRight = '1 solid #666666';
      hfd.style.borderBottom = '1 solid #666666';
      hfd.style.zIndex = 40000;
      hfd.style.backgroundColor = '#FFFFFF';
      hfd.style.display = 'none';
      hfd.style.position = 'absolute'
      hfd.style.padding = '4 8';
      hfd.style.width = '300px';
      hfd.style.pixelTop = b.offsetHeight + 1;
      hfd.style.pixelLeft = b.hPanel.offsetWidth + 20;
      hfd.innerHTML = as.get('hint');
      o.attachEvent('onHintEnter', hfd, o.onHintEnter);
      o.attachEvent('onHintLeave', hfd, o.onHintLeave);
      b.hintBox = hfd;
   }
}
function FCellButton_refreshStyle(){
   var o = this;
   var r = o.row;
   var bc = null;
   if(r.isSelect){
      bc = EColor.RowSelect;
   }else{
      var ih = (o.column.table.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCellEdit(o){
   o = RClass.inherits(this, o, FCellEditControl);
   o._styleInput = RClass.register(o, new AStyle('_styleInput'));
   o._hInput     = null;
   o.onBuildEdit = FCellEdit_onBuildEdit;
   o.get         = FCellEdit_get;
   o.set         = FCellEdit_set;
   return o;
}
function FCellEdit_onBuildEdit(p){
   var o = this;
   var c = o._column;
   o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
}
function FCellEdit_get(){
   var r = o.__base.FCellEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FCellEdit_set(p){
   var o = this;
   o.__base.FCellEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
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
function FCellEditControl(o){
   o = RClass.inherits(this, o, FCell);
   o.onBuildIcon  = FCellEditControl_onBuildIcon;
   o.onBuildEdit  = FCellEditControl_onBuildEdit;
   o.onBuildDrop  = RMethod.empty;
   o.onBuildForm  = FCellEditControl_onBuildForm;
   o.onBuild      = FCellEditControl_onBuild;
   return o;
}
function FCellEditControl_onBuildIcon(p){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}
function FCellEditControl_onBuildEdit(p){
   var o = this;
   var c = o._column;
}
function FCellEditControl_onBuildForm(p){
   var o = this;
   var c = o._column;
   if(c._hasIconArea || c._hasDropArea){
      var hf = o.hForm = RBuilder.appendTable(o._hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.onBuildIcon(p);
      }
      o._hEditPanel = hr.insertCell();
      o.onBuildEdit(p);
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.onBuildDrop(p);
      }
   }else{
      var hep = o._hEditPanel = o._hPanel;
      o.onBuildEdit(p);
   }
}
function FCellEditControl_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   o.onBuildForm(p);
}
function FCellEditControl_getEditRange(){
   var o = this;
   var hc = o.hPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FCellEditControl_select(v){
   var o = this;
   var a = o.descriptor().isEditAble(o.row);
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
      }else{
         o.setEditStyle(EStyle.ReadonlySelect);
         o.column.disable();
      }
   }else{
      if(!RClass.isClass(o, FCellCalendar)){
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
      }else{
         o.setEditStyle(EStyle.Readonly);
         o.column.disable();
      }
   }
}
function FCellEditControl_setVisible(v){
   var o = this;
   o.hPanel.style.display = v ? 'block' : 'none';
   if(v){
      if(!RClass.isClass(o, FCellCalendar)){
         var a = o.descriptor().isEditAble(o.row);
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
     }else{
       o.setEditStyle(EStyle.Readonly);
       o.column.disable();
     }
   }
}
function FCellEditControl_refreshStyle(){
   var o = this;
   var t = o.table;
   var c = o.column;
   var r = o.row;
   var hep = o.hEditPanel;
   var he = o.hEdit;
   var hd = o.hDrop;
   var e = c.isEditAble(r);
   var s = r.isSelect;
   var ce = e ? EColor.TextEdit : EColor.TextReadonly;
   if(he){
      he.readOnly = !e;
      if(!c.zoomRefer){
         he.style.color = ce;
      }
      if(hd){
         he.style.cursor = e? 'hand':'normal';
         hd.style.cursor = e? 'hand':'normal';
      }
   }
   if(hep){
      hep.style.color = ce;
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
   if(he){
      he.style.backgroundColor = bc;
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCellSelected(o){
   o = RClass.inherits(this, o, FCell);
   o._dataName  = '_select';
   o._styleEdit = RClass.register(o, new AStyle('_styleEdit'));
   o._hSelected = null;
   o.onBuild    = FCellSelected_onBuild;
   o.onSelected = FCellSelected_onSelected;
   return o;
}
function FCellSelected_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   var hs = o._hSelected = RBuilder.appendCheck(h, o.styleName('Edit'));
   hs.parent = o;
   hs.onclick = o.onSelected;
}
function FCellSelected_onSelected(p){
   var o = this;
}
function FCellSelected_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(t.dispSelected){
      o.hPanel.style.display = 'block';
      if(r.isSelect){
         o._hSelected.checked = true;
         o.hPanel.style.backgroundColor = '#CEE7FF';
      }else{
         o._hSelected.checked = false;
         o.hPanel.style.backgroundColor = '#FFFFFF';
      }
   }else{
      o.hPanel.style.display = 'none';
   }
}
function FCellSelected_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o._hSelected = null;
}
function FCellStatus(o){
   o = RClass.inherits(this, o, FCell);
   o._dataName = '_status';
   o._hStatus  = null;
   o.onBuild   = FCellStatus_onBuild;
   return o;
}
function FCellStatus_onBuild(p){
   var o = this;
   o.__base.FCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   h.style.paddingTop = 2;
   h.style.paddingBottom = 2;
   h.style.cursor = 'normal';
   o._hStatus = RBuilder.appendIcon(h, null, 'n');
}
function FCellStatus_onStatusEnter(){
   this.row.table.getRowBar().linkCell(this);
}
function FCellStatus_setIcon(s){
   this._hStatus.src = s;
}
function FCellStatus_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(r.isDataChanged()){
      p = 'Changed';
   }else{
      p = t.isFormLinked() ? 'Normal' : 'Normal';
   }
   o.setIcon(o.column.styleIconPath(p));
}
function FCellStatus_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o._hStatus = null;
}
function FColumn(o){
   o = RClass.inherits(this, o, FControl, MDataField);
   o._displayList       = true;
   o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
   o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
   o._cellClass         = FCell;
   o._hForm             = null;
   o._hFormLine         = null;
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o.onBuildLabel       = FColumn_onBuildLabel;
   o.onBuildSearchIcon  = RMethod.empty;
   o.onBuildSearchEdit  = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop  = RMethod.empty;
   o.onBuildSearchForm  = FColumn_onBuildSearchForm;
   o.onBuildSearch      = FColumn_onBuildSearch;
   o.onBuildTotal       = FColumn_onBuildTotal;
   o.onBuildPanel       = FColumn_onBuildPanel;
   o.onBuild            = FColumn_onBuild;
   o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
   o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
   o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
   o.createCell         = FColumn_createCell;
   return o;
}
function FColumn_onBuildLabel(p){
   var o = this;
   var hr = o._hFormLine;
   if (o._icon) {
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      o._hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   var hl = o._hLabel = RBuilder.appendTableCell(hr);
   hl.innerHTML = RString.nvl(o.label());
   var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
   var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
}
function FColumn_onBuildSearchEdit(p){
   var o = this;
   var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
   var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
}
function FColumn_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o._hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
      o._hSearchPanel.style.backgroundColor = '#EEEFF1';
      o._hSearchPanel.style.borderLeft='1 solid #808080';
      o._hSearchPanel.style.borderTop='1 solid #808080';
      o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
      return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FColumn_onBuildSearch(p){
   var o = this;
   var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.linkSet(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm(p);
}
function FColumn_onBuildTotal(p){
   var o = this;
   var h = o._hTotalPanel = RBuilder.create(p, 'TD');
   RHtml.linkSet(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FColumn_onBuildPanel(p) {
   var o = this;
   o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
}
function FColumn_onBuild(p) {
   var o = this;
   var t = o.table;
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!RString.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   if (!RString.isEmpty(o._viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.__base.FControl.onBuild.call(o, p);
   var hp = o._hPanel;
   hp.style.padding = 4;
   var hf = o._hForm = RBuilder.appendTable(hp);
   if (!o._orderAble) {
     hf.style.cursor = 'hand';
   }
   var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
   o.onBuildLabel(p);
   o.onBuildSearch(p);
   o.onBuildTotal(p);
   var h = o._hFixPanel = RBuilder.create(p, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(o._size.width < 40){
      o._size.width = 40;
   }
   RHtml.setSize(h, o._size);
   o._hPanel.style.pixelWidth = o.width;
   o._hFixPanel.style.pixelWidth = o.width;
}
function FColumn_createCell(p) {
   var o = this;
   var c = RClass.create(o._cellClass);
   var t = c._table = o._table;
   c._name = o._name;
   c._column = o;
   c.build(t._hPanel);
   c.setVisible(o._displayList);
   return c;
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
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o._displayList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._displayList);
   }
}
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
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
	   var l = o._hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c._hSortUp.style.display = 'none';
	            c._hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o._hSortUp.style.display = 'none';
	            o._hSortDown.style.display = 'block';
	         } else {
	            o._hSortUp.style.display = 'block';
	            o._hSortDown.style.display = 'none';
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
   hr.className = r.styleName('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FColumn_searchValue() {
   var o = this;
   if(o._hSearchEdit){
      return o._hSearchEdit.value;
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
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
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
            if(RClass.isClass(ft, FColumn) && ft._displayList){
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
            if(RClass.isClass(ft, FColumn) && ft._displayList){
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
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FColumn_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   RMemory.freeHtml(o._hSearchPanel);
   RMemory.freeHtml(o._hFixPanel);
   o._hForm = null;
   o._hFormLine = null;
   o._hIconPanel = null;
   o._hIcon = null;
   o._hHeadPanel = null;
   o._hLabel = null;
   o._hSortPanel = null;
   o._hSortUp = null;
   o._hSortDown = null;
   o._hSearchPanel = null;
   o._hSearchForm = null;
   o._hSearchFormLine = null;
   o._hSearchIconPanel = null;
   o._hSearchIcon = null;
   o._hSearchEditPanel = null;
   o._hSearchEdit = null;
   o._hSearchDropPanel = null;
   o._hSearchDrop = null;
   o._hFixPanel = null;
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
function FColumnButton(o){
   o = RClass.inherits(this, o, FColumn);
   o.__cellClass = FCellButton;
   return o;
}
function FColumnEdit(o){
   o = RClass.inherits(this, o, FColumnEditControl, MPropertyEdit);
   o._cellClass     = FCellEdit;
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
function FColumnEditControl(o){
   o = RClass.inherits(this, o, FColumn);
   o.isEditAble = FColumnEditControl_isEditAble;
   return o;
}
function FColumnEditControl_isEditAble(r){
   var o = this;
   if(r){
      return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
   }
}
function FColumnEmpty(o){
   o = RClass.inherits(this, o, FColumn);
   o._dispList         = true;
   o.onBuildSearchForm = RMethod.empty;
   return o;
}
function FColumnSelected(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   o._dataName         = '_select';
   o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
   o._optionFixed      = true;
   o._cellClass        = FCellSelected;
   o.onBuildSearchForm = FColumnSelected_onBuildSearchForm;
   o.onBuild           = FColumnSelected_onBuild;
   o.createCell        = FColumnSelected_createCell;
   o.dispose           = FColumnSelected_dispose;
   return o;
}
function FColumnSelected_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
   var hc = RBuilder.appendTableCell(hfl);
   hc.align = 'center';
   o._hSelected = RBuilder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}
function FColumnSelected_onBuild(e){
   var o = this;
   var r = o.__base.FColumnEditControl.onBuild.call(o, e);
   var h = o._hPanel;
   h.align = 'center';
   h.style.width = '30px';
   h.style.height = '22px';
   RBuilder.appendEmpty(o._hPanel, 12, 12);
   return r;
}
function FColumnSelected_createCell(p){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, p);
   if(p){
      p.cellSelect = c;
   }
   return c;
}
function FColumnSelected_dispose(){
   var o = this;
   o._hSelect = null;
   o.__base.FColumnEditControl.dispose.call(o);
}
function FColumnSelected_setVisible(){
   var o = this;
   var v = o._table._displayColumnSelect ? 'block' : 'none';
   o._hPanel.style.display = v
   o._hSelected.style.display = v;
   o._hSearchPanel.style.display = v;
   o._hTotalPanel.style.display = v;
   o._hFixPanel.style.display = v;
}
function FColumnSelected_onCellClick(s, e){
   return;
}
function FColumnSelected_onSelectedClick(s, e){
   var o = this;
   var c = o.column;
   var rs = c.table.rows;
    var rc = rs.count;
    for(var n = 0; n<rc; n++){
       var r = rs.get(n);
       if(r.selectAble){
          if(o.checked){
             c.table.selectRow(r, false, true);
          }else{
             c.table.clearSelectRow(r);
          }
       }
    }
}
function FColumnStatus(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   o._dataName         = '_status';
   o._optionFixed      = true;
   o._cellClass        = FCellStatus;
   o.onBuildSearchForm = FColumnStatus_onBuildSearchForm;
   o.onBuild           = FColumnStatus_onBuild;
   o.createCell        = FColumnStatus_createCell;
   return o;
}
function FColumnStatus_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
   hf.height = 18;
   hf.width = '100%';
   var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
   var hc = RBuilder.appendTableCell(hfl);
   hc.align = 'center';
}
function FColumnStatus_onBuild(p){
   var o = this;
   var r = o.__base.FColumnEditControl.onBuild.call(o, p);
   var h = o._hPanel;
   h.align = 'center';
   h.style.width = '30px';
   h.style.height = '22px';
   RBuilder.appendEmpty(h, 12, 12);
}
function FColumnStatus_createCell(p){
   var o = this;
   var c = o.__base.FColumnEditControl.createCell.call(o, p);
   if(p){
      p._statusCell = c;
   }
   return c;
}
function FColumnStatus_onCellClick(s, e){
	return;
   if(this.table.callEvent('onTableRowDoubleClick', s.row)){
      return;
   }
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumnStatus_setDataStatus(r, s){
   var o = this;
   var t = o.table;
   var c = r.getStatus();
   var p = null;
   switch(s){
      case EDataStatus.Insert:
         p = 'Insert';
         break;
      case EDataStatus.Delete:
         p = 'Delete';
         break;
      default:
         if(r.isDataChanged()){
            p = 'Changed';
         }else{
            p = t.isFormLinked() ? 'NormalEnter' : 'Normal';
         }
         break;
   }
   c.setIcon(o.styleIconPath(p));
}
function FColumnStatus_ohCellMdclk(){
   var tab = this.lnkCol.table;
   tab.insertRow(this.lnkRow.rowIndex());
}
function FColumnStatus_dispose(){
   var o = this;
   o.__base.FColumnEditControl.dispose.call(o);
   o._hSelect = null;
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
   o = RClass.inherits(this, o, FContainer);
   o._displayCount        = RClass.register(o, new APtyInteger('_displayCount'), 20);
   o._displayTitle        = RClass.register(o, new APtySet('_displayTitle', 'display_title', EGridDisplay.Title), true);
   o._displayColumnStatus = true;
   o._displayColumnSelect = true;
   o._rowHeight           = RClass.register(o, new APtyInteger('rowHeight'), 0);
   o._stylePanel          = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel     = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm      = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleCaption        = RClass.register(o, new AStyle('_styleCaption'));
   o._styleContentPanel   = RClass.register(o, new AStyle('_styleContentPanel'));
   o._styleContentForm    = RClass.register(o, new AStyle('_styleContentForm'));
   o._styleHintPanel      = RClass.register(o, new AStyle('_styleHintPanel'));
   o._styleHintForm       = RClass.register(o, new AStyle('_styleHintForm'));
   o._styleHint           = RClass.register(o, new AStyle('_styleHint'));
   o._styleButton         = RClass.register(o, new AStyle('_styleButton'));
   o._minHeight           = 80;
   o._buttons             = null;
   o._columns             = null;
   o._rowClass            = FGridRow;
   o._rows                = null;
   o._focusCell           = null;
   o._focusRow            = null;
   o._loadEvent           = null;
   o._hTitlePanel         = null;
   o._hTitleForm          = null;
   o._hTitleLine          = null;
   o._hCaption            = null;
   o._hContentPanel       = null;
   o._hHintPanel          = null;
   o._hHintForm           = null;
   o.lsnsRowClick         = null;
   o.lsnsRowDblClick      = null;
   o.onBuildTitle         = FGridControl_onBuildTitle;
   o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
   o.onBuildHint          = FGridControl_onBuildHint;
   o.onBuildPanel         = FGridControl_onBuildPanel;
   o.onBuild              = FGridControl_onBuild;
   o.onDatasetLoadDelay   = FGridControl_onDatasetLoadDelay;
   o.onDatasetLoad        = FGridControl_onDatasetLoad;
   o.construct            = FGridControl_construct;
   o.buildNavigatorButton = FGridControl_buildNavigatorButton;
   o.appendColumn         = RMethod.virtual(o, 'appendColumn');
   o.appendChild          = FGridControl_appendChild;
   o.push                 = FGridControl_push;
   o.createRow            = FGridControl_createRow;
   o.insertRow            = FGridControl_insertRow;
   o.syncRow              = FGridControl_syncRow;
   o.hideRows             = FGridControl_hideRows;
   o.clickCell            = FGridControl_clickCell;
   o.clickRow             = FGridControl_clickRow;
   o.doubleClickRow       = FGridControl_doubleClickRow;
   return o;
}
function FGridControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FGridControl_onBuildTitle(e){
   var o = this;
   var hf = o._hTitleForm = RBuilder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
   var hr = o._hTitleLine = RBuilder.appendTableRow(hf);
   var hc = o._hCaption = RBuilder.appendTableCell(hr, o.styleName('Caption'));
   hc.innerText = o.label();
   RHtml.displaySet(hf, o._displayTitle);
}
function FGridControl_onBuildHint(e) {
   var o = this;
   var hr = RBuilder.appendTableRow(o._hHintForm);
   var hc = RBuilder.appendTableCell(hr);
   hc.width = 60;
   o.hExtendButton = o.buildNavigatorButton(hc, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
      var hc = RBuilder.appendTableCell(hr);
      hc.width = 60;
      o.hInsertButton = o.buildNavigatorButton(hc, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
   var hc = RBuilder.appendTableCell(hr);
   hc.width = 10;
   var hc = RBuilder.appendTableCell(hr);
   hc.noWrap = true;
   o._hHint = RBuilder.appendText(hc, o.styleName('Hint'))
   var hc = RBuilder.appendTableCell(hr);
   hc.noWrap = true;
   hc.align = 'right';
   o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FGridControl:First'));
   o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FGridControl:Prior'));
   o.hNavPrior.style.paddingRight = '20';
   o.hPage = RBuilder.appendEdit(hc)
   o.hPage.style.width = 40;
   o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Next')+'&nbsp;', 'control.grid.next');
   o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Last')+'&nbsp;', 'control.grid.last');
}
function FGridControl_onBuild(p){
   var o = this;
   if(!o._size.height || o._size.height < 160){
      o.height = '100%';
   }
   o.__base.FContainer.onBuild.call(o, p);
   var hc = o._hTitlePanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
   o.onBuildTitle(p);
   var hbp = o._hContentPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
   o.onBuildContent(p);
   o._hHintPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
   o._hHintForm = RBuilder.appendTable(o._hHintPanel, o.styleName('HintForm'));
   o.onBuildHint(p);
   var c = o._statusColumn = RClass.create(FColumnStatus);
   c._table = this;
   c._name = '_s';
   c.build(p);
   o.push(c);
   var c = o._selectColumn = RClass.create(FColumnSelected);
   c._table = this;
   c._name = '_select';
   c.build(p);
   o.push(c);
}
function FGridControl_onDatasetLoadDelay(p){
   var o = this;
   var c = o._displayCount;
   var h = o._rowHeight;
   var d = p.dataset;
   var rc = d.count();
   var rb = p.index;
   var re = rb + p.acceleration;
   if(re > rc - 1){
      re = rc - 1;
   }
   if(o._hHeadPanel){
      o._hHeadPanel.scrollLeft = 0;
   }
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
   }
   for(var i = rb; i <= re; i++){
      var r = o.syncRow(i);
      if(h > 0) {
         r._hFixPanel.height = h + 'px';
      }
      var dr = d.row(i);
      r.loadRow(dr);
      r.setVisible(true);
   }
   if(re == rc - 1){
      p.setValid(false);
      o.psRefresh();
      return;
   }
   p.index += a.acceleration;
}
function FGridControl_onDatasetLoad(p){
   var o = this;
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
      o._hColumnPanel.scrollLeft = 0;
   }
   if(o._hDataPanel){
     o._hDataPanel.scrollTop = 0;
     o._hDataPanel.scrollLeft = 0;
   }
   if(p.isEmpty()){
      return;
   }
   var e = o._loadEvent;
   e.index = 0;
   e.acceleration = 5;
   e.dataset = o._dataset;
   e.setValid(true);
   RConsole.find(FEventConsole).push(o._loadEvent);
}
function FGridControl_construct() {
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._buttons = new TDictionary();
   o._columns = new TDictionary();
   o._rows = new TObjects();
   o.lsnsRowClick = new TListeners();
   o.lsnsRowDblClick = new TListeners();
   var e = o._loadEvent = RClass.create(FEvent);
   e.setOwner(o);
   e.setCallback(o.onDatasetLoadDelay);
   e.setValid(false);
}
function FGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
   var o = this;
   var h = RBuilder.append(hParent, 'SPAN', o.styleName('Button'));
   h.style.cursor = 'hand';
   h.style.paddingLeft = '10';
   if (iconBf) {
      RBuilder.appendIcon(h, null, iconBf);
   }
   if(text){
      if(name){
         o[name + 'Text'] = RBuilder.appendText(h, null, text);
      }else{
         RBuilder.appendText(h, null, text);
      }
   }
   if(iconAf){
      RBuilder.appendIcon(h, null, iconAf);
   }
   return h;
}
function FGridControl_appendChild(p){
   var o = this;
   o.__base.FContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FColumn)){
      o.appendColumn(p);
   }
}
function FGridControl_push(p){
   var o = this;
   if(RClass.isClass(p, FColumn)){
      p._table = o;
      o._columns.set(p.name(), p);
   }else if(RClass.isClass(p, FTableButton)){
      p._table = o;
      o._buttons.set(p.name(), p);
   }
   o.__base.FContainer.push.call(o, p);
}
function FGridControl_createRow() {
   var o = this;
   var r = RClass.create(o._rowClass);
   r._table = r._parent = o;
   return r;
}
function FGridControl_insertRow(i, r){
   var o = this;
   r.index = i;
   r.build();
   if(r._hFixPanel){
      o._hFixRows.appendChild(r._hFixPanel);
      RHtml.tableMoveRow(o._hColumnForm, r._hFixPanel.rowIndex, i + 2);
   }
   o._hRows.appendChild(r._hPanel);
   RHtml.tableMoveRow(o._hContentForm, r._hPanel.rowIndex, i + 2);
   r.refreshStyle();
   o._rows.insert(i, r);
}
function FGridControl_syncRow(p){
   var o = this;
   var rs = o._rows;
   var r = rs.get(p);
   if(!r){
      for(var i = rs.count(); i <= p; i++){
         r = o.createRow();
         r._index = i;
         r.build(o._hPanel);
         if(r._hFixPanel){
            o._hFixRows.appendChild(r._hFixPanel);
         }
         o._hRows.appendChild(r._hPanel);
         r._hPanel.style.height = r._hFixPanel.offsetHeight + 'px';
         rs.push(r);
      }
   }
   r._extended = false;
   if(r._childRows){
      r.hideChild();
      r._childRows.clear();
   }
   return r;
}
function FGridControl_hideRows(){
   var o = this;
   var rs = o._rows;
   var c = rs.count();
   for(var i = c - 1; i >= 0 ; i--){
      rs.get(i).setVisible(false);
   }
}
function FGridControl_clickCell(p){
   this._focusCell = p;
}
function FGridControl_clickRow(p){
   var o = this;
   o.lsnsRowClick.process(p);
   o._focusRow = p;
}
function FGridControl_doubleClickRow(p){
   var o = this;
   o.lsnsRowDblClick.process(p);
   o._focusRow = p;
}
function FGridControl_pushButton(b){
   var o = this;
   var hc  = o._hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b._hPanel);
   o.push(b);
}
function FGridControl_onMouseDown(e, he){
   var o = this;
   return;
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
   if(EGridColumn.Size == m){
      o.hoverMode = EGridColumn.Size;
      e.srcElement.status = EGridColumn.Size;
      o.hoverX = e.srcElement.offsetLeft + e.x;
      o.hoverDataCell = null;
      if(o._hContentForm._rows.length){
         o.hoverDataCell = o._hContentForm._rows[0].cells[o.hoverHead.index];
      }
      o._hHeadForm.setCapture();
   }
}
function FGridControl_onHeadMouseMove(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      var bl = o.hoverCellLength;
      var mx = e.srcElement.offsetLeft + e.x;
      var w =  mx - o.hoverX + bl;
      if(w > 0){
         o.hoverHead._hPanel.style.pixelWidth = w;
         o.hoverHead._hFixPanel.style.pixelWidth = w;
      }
   }else if(EGridColumn.None == o.hoverMode){
      var m = o.getHeadMode(e);
      var c = 'default';
      if(EGridColumn.Size == m){
         c = 'e-resize';
      }else if(EGridColumn.Drag == m){
         c = 'hand';
      }
      o._hHeadForm.style.cursor = c;
   }
}
function FGridControl_onHeadMouseUp(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      o._hHeadForm.releaseCapture();
   }
   o.hoverMode = EGridColumn.None;
}
function FGridControl_onDataScroll(){
   var o = this;
   o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
   o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
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
             o.table.dpScrollLeft = o.table._hContentPanel.scrollLeft;
             o.table.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
         }else{
            o.doSearch();
            o.dpScrollLeft = o._hContentPanel.scrollLeft;
            o.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
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
function FGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.__base.FContainer.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   return EEventStatus.Stop;
}
function FGridControl_oeProgress(e){
   var o = this;
   if('none' == o._hPanel.currentStyle.display){
      return;
   }
   var hdp = o._hDelayPanel;
   if(!hdp){
      hdp = o._hDelayPanel = RBuilder.appendDiv(o.hBorderPanel);
      var st = hdp.style;
      st.position = 'absolute';
      st.zIndex = RLayer.next();
      st.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
      st.backgroundColor = '#FFFFFF';
      st.top = 0;
      st.width = '100%';
      st.height = '100%';
      st.display = 'none';
      var hdf = o._hDelayForm = RBuilder.appendTable(hdp);
      hdf.style.width = '100%';
      hdf.style.height = '100%';
      var hc = hdf.insertRow().insertCell();
      hc.align = 'center';
      hc.vAlign = 'middle';
      RBuilder.appendIcon(hc, 'ctl.FGridControl_Loading')
      var t = o._hDelayText = RBuilder.append(hc, 'SPAN');
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
function FGridControl_isFormLinked(){
   return this._formLinked || this._formName;
}
function FGridControl_isDataSelected(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isSelect){
         return true;
      }
   }
}
function FGridControl_isDataChanged(){
   var rs = this._rows;
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
   return;
   var p = RHtml.point(o._hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o._columns;
   for(var n = 0; n<cs.count; n++){
      var c = cs.value(n);
      if(c.dispSize){
         var l = c._hPanel.offsetLeft + c._hPanel.offsetWidth - p.x;
         o.hoverCellLength = c._hPanel.offsetWidth;
         if(l - 6 <= x && x<=l){
            o.hoverHead = c;
            return EGridColumn.Size;
         }
      }
   }
   return EGridColumn.None;
}
function FGridControl_getRowBar(){
   var o = this;
   var rb = o._rowBar;
   if(!rb){
      rb = o._rowBar = RClass.create(FGridRowBar);
      rb.table = o;
      rb.psBuild(o.hBorderPanel);
   }
   return rb;
}
function FGridControl_calculateDataSize(){
   var o = this;
   var r = o._dataRect;
   if(!r){
      r = o._dataRect = new TRect();
   }
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o._hFixPanel ? o._hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}
function FGridControl_hasVisibleRow() {
   var o = this;
   var rs = o._rows;
   for(var n = 0; n<rs.count; n++){
      var rt = rs.get(n);
      if(rt._visible){
         return true;
      }
   }
   return false;
}
function FGridControl_getCurrentRow(){
   var c = this._focusCell;
   if(c){
      return c.row.saveRow();
   }
}
function FGridControl_getSelectedRow(){
   var rs = this._rows;
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
   var rs = this._rows;
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
   var rs = this._rows;
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
   var rs = this._rows;
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
   var h = o._hHint;
   var ds = o._dataset;
   if(ds && h){
      var ci = 0;
      var r = o.getSelectedRow();
      if(r){
         ci = o._rows.indexOf(r)+1;
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
   var rs = o._rows;
   var rc = rs.count;
   for(var n = 0; n < rc; n++){
      var r = rs.get(n);
      r.isSelect = false;
   }
}
function FGridControl_hoverRow(r, f){
   var o = this;
   if(f){
      o._hoverRow = r;
      r.refreshStyle();
   }else{
      if(o._hoverRow == r){
         o._hoverRow = null;
      }
      r.refreshStyle();
   }
}
function FGridControl_selectRow(row, reset, force) {
   var o = this;
   var has = false;
   if(reset){
      var rs = o._rows;
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
    var rs = o._rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
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
function FGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FGridControl_pack(){
   var o = this;
   var rfs = o._rows;
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
   o.__base.FContainer.setVisible.call(o, v);
   o.__base.MHorizontal.setVisible.call(o, v);
}
function FGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o._buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}
function FGridControl_refreshStyle(){
   var o = this;
   var rs = o._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      rs.get(n).refreshStyle();
   }
}
function FGridControl_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   o.hBorderPanel = null;
   o._hDelayPanel = null;
   o._hDelayForm = null;
   o._hFixPanel = null;
   o._hFixForm = null;
   o._hFixHead = null;
   o._hFixSearch = null;
   o._hHeadPanel = null;
   o._hHeadForm = null;
   o._hHead = null;
   o._hSearch = null;
   o._hColumnPanel = null;
   o._hColumnForm = null;
   o._hFixRows = null;
   o._hFixRowLine = null;
   o._hContentPanel = null;
   o._hContentForm = null;
   o._hRows = null;
   o._hRowLine = null;
   o._hHintForm = null;
   o._hInsertButton = null;
   o._hExtendButton = null;
   o._hExtendText = null;
}
function FGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   var rs = o._rows;
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
   var rs = o._rows;
   if(!rs.count){
      var c = o._displayCount;
      for(var n = 0; n < c; n++){
         var r = RClass.create(FGridRow);
         r.table = this;
         r.build();
         o._hRows.appendChild(r._hPanel);
         rs.push(r);
      }
   }
}
function FGridControl_createChild(config) {
   var o = this;
   var c = o.__base.FContainer.createChild.call(o, config);
   if(RClass.isClass(c, FGridRow)){
      c.table = o;
      c.row = o.dsLoadRowNode(config);
      o._rows.push(c);
      return null;
   }else if(RClass.isClass(c, FColumnEditControl)){
      c.table = o;
   }
   return c;
}
function FGridControl_setStyleStatus(row, status) {
   var hRow = row._hPanel;
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
   this._hRows.appendChild(row._hRow);
   this._rows.push(row);
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
   var c = o._rows.count;
   for(var n=0; n<c; n++){
      var r = o._rows.get(n);
      if(r){
         r.dispose();
      }
   }
   o._rows.clear();
   RHtml.clear(o._hRows);
}
function FGridControl_onColumnTreeService(g){
   var o = this;
   var d = g.resultDatasets.get(g.path);
   var rs = d._rows;
   if(rs && rs.count > 0){
      var pr = o.focusRow;
      pr.extdStatus = true;
      pr.psResize();
      var idx = pr._hPanel.rowIndex + 1;
      for(var n = 0; n < rs.count; n++){
         var r = RClass.create(FGridRow);
         r.table = o;
         pr.childRows.push(r);
         r.parentRow = pr;
         r.buildChild(o._hFixRows, o._hRows, idx + n);
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
      if(RClass.isClass(c, FGridRowType)){
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
function FGridRow(o){
   o = RClass.inherits(this, o, FGridRowControl);
   o._hFixPanel   = null;
   o.onBuildPanel = FGridRow_onBuildPanel;
   o.setVisible   = FGridRow_setVisible;
   o.appendChild  = FGridRow_appendChild;
   o.dispose      = FGridRow_dispose;
   return o;
}
function FGridRow_onBuildPanel(p){
   var o = this;
   o.__base.FGridRowControl.onBuildPanel.call(o, p);
   o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FGridRow_setVisible(p){
   var o = this;
   o._visible = p;
   var h = o._hFixPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
   var h = o._hPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function FGridRow_appendChild(p){
   var o = this;
   o.__base.FGridRowControl.appendChild.call(o, p);
   var c = p._column;
   if(c._optionFixed){
      o._hFixPanel.appendChild(p._hPanel);
   }
}
function FGridRow_dispose(){
   var o = this;
   var h = o._hFixPanel;
   if(h){
      RMemory.free(h);
      o._hFixPanel = null;
   }
   o.__base.FGridRowControl.dispose.call(o);
}
function FGridRow_select(v){
   var o = this;
   o.isSelect = v;
   var c = v ? EColor.RowSelect : EColor.Row;
   o._hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   o.refreshStyle();
}
function FGridRow_refreshSize(){
   this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
}
function FGridRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
      o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
   }
   if(o.table.isLov){
      o._hFixPanel.style.cursor = 'hand';
   }
   o.__base.FGridRowControl.refreshStyle.call(o);
}
function FGridRowControl(o){
   o = RClass.inherits(this, o, FContainer, MDataContainer);
   o._cells         = null;
   o._rows          = null;
   o._clearProcess  = null;
   o._resetProcess  = null;
   o._loadProcess   = null;
   o._saveProcess   = null;
   o._recordProcess = null;
   o._statusCell    = null;
   o.onBuildPanel   = FGridRowControl_onBuildPanel;
   o.onBuild        = FGridRowControl_onBuild;
   o.construct      = FGridRowControl_construct;
   o.loadRow        = FGridRowControl_loadRow;
   o.saveRow        = FGridRowControl_saveRow;
   o.setVisible     = FGridRowControl_setVisible;
   o.appendChild    = FGridRowControl_appendChild;
   o.push           = FGridRowControl_push;
   return o;
}
function FGridRowControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FGridRowControl_onBuild(p){
   var o = this;
   o.__base.FContainer.onBuild.call(o, p)
   var t = o._table;
   var h = o._hPanel;
   var cs = t._columns;
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var rl = cs.value(i);
      var rc = rl.createCell();
      o.push(rc);
   }
}
function FGridRowControl_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._cells = new TDictionary();
   o._rows = new TObjects();
   o._clearProcess = new TEventProcess(null, o, 'oeClearValue', MEditValue);
   o._resetProcess = new TEventProcess(null, o, 'oeResetValue', MEditValue);
   o._loadProcess = new TEventProcess(null, o, 'oeLoadValue', MEditValue);
   o._saveProcess = new TEventProcess(null, o, 'oeSaveValue', MEditValue);
   o._recordProcess = new TEventProcess(null, o, 'oeRecordValue', MEditValue);
}
function FGridRowControl_loadRow(p){
   var o = this;
   var ds = RClass.create(FDataSource);
   ds.selectRow(p);
   o.dsDataLoad(ds);
}
function FGridRowControl_saveRow(p){
   var o = this;
   return r;
}
function FGridRowControl_setVisible(p){
   var o = this;
   o._visible = p;
   var h = o._hPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
}
function FGridRowControl_appendChild(p){
   var o = this;
   o.__base.FContainer.appendChild.call(o, p);
   var c = p._column;
   if(!c._optionFixed){
      o._hPanel.appendChild(p._hPanel);
   }
}
function FGridRowControl_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   p._row = o;
   o._cells.set(p._column._dataName, p);
   if(RClass.isClass(p, FCellStatus)){
      o._statusCell = p;
   }
}
function FGridRowControl_buildChildren(){
   var o = this;
   var t = o.table;
   var hfr = o.hFixPanel = hfp.insertRow(idx);
   hfr.className = o.style('Panel');
   var hr = o._hPanel = hp.insertRow(idx);
   hr.className = o.style('Panel');
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      var c = cs.value(n);
      var cl = c.createCell(o);
      if(c.dispFixed){
         hfr.appendChild(cl._hPanel);
      }else{
         hr.appendChild(cl._hPanel);
      }
      o._cells.set(c.dataName, cl);
   }
   o.doRefresh()
}
function FGridRowControl_isDataChanged(){
   var o = this;
   var cs = o._cells;
   for(var n=cs.count-1; n>=0; n--){
      if(cs.value(n).isDataChanged()){
         return true;
      }
   }
   return false;
}
function FGridRowControl_isVisible(){
	var o = this;
	return o._visible;
}
function FGridRowControl_getIndex(){
   return this._hPanel.rowIndex;
}
function FGridRowControl_getId(){
   var c = this._cells.get('ouid');
   return c ? c.reget() : '';
}
function FGridRowControl_getVersion(){
   var c = this._cells.get('over');
   return c ? c.reget() : '';
}
function FGridRowControl_getStatus(){
   return this._statusCell;
}
function FGridRowControl_cell(n){
   return this._cells.value(n);
}
function FGridRowControl_get(n){
   return this._cells.get(n).get();
}
function FGridRowControl_reget(n){
   return this._cells.get(n).reget();
}
function FGridRowControl_set(n, v){
   this._cells.get(n).set(v);
}
function FGridRowControl_loadValue(v){
   this.loadRow(v);
}
function FGridRowControl_saveValue(v){
   this.saveRow(v);
}
function FGridRowControl_recordValue(){
   this.process(this._recordProcess);
}
function FGridRowControl_toAttributes(v){
   this.saveRow(v);
}
function FGridRowControl_toDeepAttributes(r){
   var o = this;
   var ts = new TList();
   var p = o.table;
   while(p){
      if(p != o.table && RClass.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
   }
   for(var n=ts.count-1; n>=0; n--){
      var m = ts.get(n);
      if(RClass.isClass(m, FForm)){
         m.toAttributes(r);
      }else if(RClass.isClass(m, FTable)){
         var rs = m.getSelectRows();
         if(1 != rs.count){
            return RMessage.fatal(o, 'Invalid selected rows. (count={0})', rs.count);
         }
         rs.get(0).toAttributes(r);
      }
   }
   o.toAttributes(r);
}
function FGridRowControl_select(v){
   var o = this;
   o.isSelect = v;
   o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
   o.refreshStyle();
}
function FGridRowControl_extend(v){
   var o = this;
   var rs = o._rows;
   if(rs && rs.count){
      var rc = rs.count;
      for(var n=0; n<rc; n++){
         var r = rs.get(n);
         if(v){
            r.setVisible(true);
            r.extend(r.extended);
         }else{
            r.setVisible(false);
         }
         r.refresh();
      }
   }
   o.extended = v;
}
function FGridRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
function FGridRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}
function FGridRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}
function FGridRowControl_refreshStyle(){
   var o = this;
   var cs = o._cells;
   if(cs){
      for(var n=cs.count-1; n>=0; n--){
         cs.value(n).refreshStyle();
      }
   }
}
function FGridRowControl_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.isSelect ? 'S' : '_');
   s.append(']');
   s.append(o.saveRow().dump());
   return s;
}
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl, MDataset);
   o._detailFrameName  = RClass.register(o, new APtyString('_detailFrameName'));
   o._styleFixPanel    = RClass.register(o, new AStyle('_styleFixPanel'));
   o._styleFixForm     = RClass.register(o, new AStyle('_styleFixForm'));
   o._styleHeadPanel   = RClass.register(o, new AStyle('_styleHeadPanel'));
   o._styleHeadForm    = RClass.register(o, new AStyle('_styleHeadForm'));
   o._styleColumnPanel = RClass.register(o, new AStyle('_styleColumnPanel'));
   o._styleColumnForm  = RClass.register(o, new AStyle('_styleColumnForm'));
   o._styleDataPanel   = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm    = RClass.register(o, new AStyle('_styleDataForm'));
   o._hFixPanel        = null;
   o._hFixForm         = null;
   o._hHeadPanel       = null;
   o._hHeadForm        = null;
   o._hColumnPanel     = null;
   o._hColumnForm      = null;
   o._hDataPanel       = null;
   o._hDataForm        = null;
   o.onBuildContent       = FTable_onBuildContent;
   o.oeRefresh         = FTable_oeRefresh;
   o.appendColumn      = FTable_appendColumn;
   return o;
}
function FTable_onBuildContent(p){
   var o = this;
   var hbp = o._hContentPanel;
   var hfp = o._hFixPanel = RBuilder.appendDiv(hbp, o.styleName('FixPanel'));
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o._hFixForm = RBuilder.appendTable(hfp, o.styleName('FixForm'), 0, 0, 1);
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o._hFixHead =  RBuilder.appendTableRow(hff);
   o._hFixSearch = RBuilder.appendTableRow(hff);
   o._hFixTotal = RBuilder.appendTableRow(hff);
   o._hFixTotal.style.display = 'none';
   var hhp = o._hHeadPanel = RBuilder.appendDiv(hbp, o.styleName('HeadPanel'));
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o._hHeadForm = RBuilder.appendTable(hhp, o.styleName('HeadForm'), 0, 0, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o._hHead = hhf.insertRow();
   o._hSearch = hhf.insertRow();
   o._hTotal = hhf.insertRow();
   o._hTotal.style.display = 'none';
   var hcp = o._hColumnPanel = RBuilder.appendDiv(hbp, o.styleName('ColumnPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o._hColumnForm = RBuilder.appendTable(hcp, o.styleName('ColumnForm'), 0, 0, 1);
   o._hFixRows = RBuilder.append(hcf, 'TBODY');
   o._hFixRowLine = RBuilder.append(o._hFixRows, 'TR');
   var hdp = o._hDataPanel = RBuilder.appendDiv(hbp, o.styleName('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o._hDataForm = RBuilder.appendTable(hdp, o.styleName('DataForm'), 0, 0, 1);
   o._hRows = RBuilder.append(hdf, 'TBODY');
   o._hRowLine = RBuilder.append(o._hRows, 'TR');
   o.panelNavigator = true;
}
function FTable_oeRefresh(e){
   var o = this;
   o.__base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hfp = o._hFixPanel;
      var hhp = o._hHeadPanel;
      var hcp = o._hColumnPanel;
      var hdp = o._hDataPanel;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o._hContentPanel.offsetWidth;
      var oh = o._hContentPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.left = '0px';
      hfp.style.top = '0px';
      hhp.style.left = hfpw + 'px';
      hhp.style.top = '0px';
      hhp.style.width = (ow - hfpw) + 'px';
      o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
      o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
      hcp.style.top = hfph + 'px';
      hcp.style.width = hfpw + 'px';
      hcp.style.height = (oh - hfph) + 'px';
      hdp.style.left = '0px';
      hdp.style.top = '0px';
      hdp.style.width = (ow - hfpw) + 'px';
      hdp.style.height = (oh - hfph) + 'px';
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      return;
      var ca = null;
      var aw = ow;
      var cs = o._columns;
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={1},name2={2})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c._hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}
function FTable_appendColumn(p){
   var o = this;
   if(p._optionFixed){
      o._hFixHead.appendChild(p._hPanel);
      o._hFixSearch.appendChild(p._hSearchPanel);
      o._hFixTotal.appendChild(p._hTotalPanel);
      o._hFixRowLine.appendChild(p._hFixPanel);
   }else{
      o._hHead.appendChild(p._hPanel);
      o._hSearch.appendChild(p._hSearchPanel);
      o._hTotal.appendChild(p._hTotalPanel);
      o._hRowLine.appendChild(p._hFixPanel);
   }
}
function FTable_onResizeAfter(){
   var o = this;
   var hdp = o._hDataPanel;
   var hfp = o._hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FTable_oeResize(e){
   var o = this;
   var h = o._hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o._hTitleForm;
   var hfp = o._hFixPanel;
   var hhp = o._hHeadPanel;
   var hcp = o._hColumnPanel;
   var hdp = o._hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o._hBorderPanel.offsetWidth;
   var oh = o._hBorderPanel.offsetHeight;
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
function FUiMenuBar(o){
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = FUiMenuBar_onBuildPanel;
   o.appendChild = FUiMenuBar_appendChild;
   return this;
}
function FUiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}
function FUiMenuBar_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FUiMenuButton)){
      var hr = o._hLine;
      var hc = RBuilder.appendTableCell(hr);
      p.setPanel(hc);
   }
}
function FUiMenuBar_onBuild(builder){
   var doc = builder.document;
   this.hBody = doc.createDiv();
   this.hBody.className = 'menu_panel';
   this.hParent.insertBefore(this.hBody);
   builder.hParent = this.hBody;
}
function FUiMenuBar_onLoaded(cnn){
   var doc = cnn.document;
   if(doc && doc.node){
      IControl.load(this, doc.node);
      this.build();
   }
}
function FUiMenuBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hBody);
   RMemory.freeHtml(o.hParent);
   o.hBody = null;
   o.hParent = null;
}
function FUiMenuBar_connect(type, action, attrs){
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
function FUiMenuBar_release(){
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
function FUiMenuButton(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton, MListenerClick);
   o._icon         = RClass.register(o, new APtyString('_icon'));
   o._iconDisable  = RClass.register(o, new APtyString('_iconDisable'));
   o._hotkey       = RClass.register(o, new APtyString('_hotkey'));
   o._action       = RClass.register(o, new APtyString('_action'));
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover'));
   o._stylePress   = RClass.register(o, new AStyle('_stylePress'));
   o._styleDisable = RClass.register(o, new AStyle('_styleDisable'));
   o._styleIcon    = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel   = RClass.register(o, new AStyle('_styleLabel'));
   o._disabled     = false;
   o._hIcon        = null;
   o._hLabel       = null;
   o.onBuildPanel  = FUiMenuButton_onBuildPanel
   o.onBuild       = FUiMenuButton_onBuild;
   o.onEnter       = FUiMenuButton_onEnter;
   o.onLeave       = FUiMenuButton_onLeave;
   o.onMouseDown   = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
   o.onMouseUp     = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
   o.icon          = FUiMenuButton_icon;
   o.setIcon       = FUiMenuButton_setIcon;
   o.setLabel      = FUiMenuButton_setLabel;
   o.setEnable     = FUiMenuButton_setEnable;
   o.click         = FUiMenuButton_click;
   o.dispose       = FUiMenuButton_dispose;
   return o;
}
function FUiMenuButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiMenuButton_onBuild(e){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, e);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      o._hLabel = RBuilder.appendText(h, o.styleName('Label'));
      o.setLabel(o._label);
   }
}
function FUiMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
function FUiMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiMenuButton_icon(){
   return this._icon;
}
function FUiMenuButton_setIcon(p){
   this._icon = p;
}
function FUiMenuButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   if(o._hIcon){
      s = ' ' + o._label;
   }
   if(o._hLabel){
      o._hLabel.innerText = s;
   }
}
function FUiMenuButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.setEnable.call(o, p);
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
function FUiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      o.processClickListener(o);
   }
}
function FUiMenuButton_dispose(){
   var o = this;
   o._hIcon = null;
   o._hLabel = null;
   o.__base.FUiControl.dispose.call(o);
}
function FUiMenuButtonMenu(o){
   o = RClass.inherits(this, o, FUiControl);
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
   o.oeBuild      = FUiMenuButtonMenu_oeBuild;
   o.oeEnable     = FUiMenuButtonMenu_oeEnable;
   o.oeDisable    = FUiMenuButtonMenu_oeDisable;
   o.onBuildPanel = FUiMenuButtonMenu_onBuildPanel;
   o.onEnter      = FUiMenuButtonMenu_onEnter;
   o.onLeave      = FUiMenuButtonMenu_onLeave;
   o.onMouseDown  = FUiMenuButtonMenu_onMouseDown;
   o.onMouseUp    = FUiMenuButtonMenu_onMouseUp;
   o.onClick      = FUiMenuButtonMenu_onClick;
   o.construct    = FUiMenuButtonMenu_construct;
   o.dispose      = FUiMenuButtonMenu_dispose;
   return o;
}
function FUiMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, event);
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
function FUiMenuButtonMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'DIV');
}
function FUiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FUiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FUiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return EEventStatus.Stop;
}
function FUiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
function FUiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
function FUiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
function FUiMenuButtonMenu_onClick(){
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
function FUiMenuButtonMenu_construct(){
   var o = this;
   o.base.FUiControl.construct.call(o);
}
function FUiMenuButtonMenu_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hIcon = null;
   o.hButton = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
function FUiMenuButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl, MMenuButton);
   o.styleUp      = RClass.register(o, new AStyle('Up'));
   o.styleDown    = RClass.register(o, new AStyle('Down'));
   o.disabled     = false;
   o.oeBuild      = FUiMenuButtonSplit_oeBuild;
   o.onBuildPanel = FUiMenuButtonSplit_onBuildPanel;
   o.dispose      = FUiMenuButtonSplit_dispose;
   return o;
}
function FUiMenuButtonSplit_oeBuild(e){
   var o = this;
   o.base.FUiControl.oeBuild.call(o, e);
   var h = o.hPanel;
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Up');
   var hc = h.insertRow().insertCell();
   hc.className = o.style('Down');
   return EEventStatus.Stop;
}
function FUiMenuButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
function FUiMenuButtonSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
}
function MMenuButton(o){
   o = RClass.inherits(this, o);
   return o;
}
function FUiToolBar(o){
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = FUiToolBar_onBuildPanel;
   o.appendChild  = FUiToolBar_appendChild;
   return o;
}
function FUiToolBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}
function FUiToolBar_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FUiToolButton)){
      var hr = o._hLine;
      var hc = RBuilder.appendTableCell(hr);
      p.setPanel(hc);
   }
}
function FUiToolBar_addClickListener(name, method){
   var btn = this.component(name);
   if(btn){
      btn.addClickListener(new TListener(this, method));
   }
}
function FUiToolBar_button(name){
   return this.components.get(name);
}
function FUiToolBar_setVisibles(vs){
   var o = this;
   for(var n in vs){
      o.button(n).setVisible(vs[n]);
   }
}
function FUiToolBar_setEnables(vs){
   var o = this;
   for(var n in vs){
      o.button(n).psEnable(vs[n]);
   }
}
function FUiToolBar_clear(){
   if(this.hTable && this._hLine){
      this._hLine.removeNode(true);
      this._hLine = this.hTable.insertRow();
   }
   this.buttons = new Array();
}
function FUiToolBar_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o._hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o._hLine = null;
   o.hParent = null;
}
function FUiToolButton(o){
   o = RClass.inherits(this, o, FUiControl, MListenerClick);
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
   o.onBuildPanel  = FUiToolButton_onBuildPanel;
   o.onBuild       = FUiToolButton_onBuild;
   o.onEnter       = FUiToolButton_onEnter;
   o.onLeave       = FUiToolButton_onLeave;
   o.onMouseDown   = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiToolButton_onMouseDown);
   o.onMouseUp     = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiToolButton_onMouseUp);
   o.icon          = FUiToolButton_icon;
   o.setIcon       = FUiToolButton_setIcon;
   o.setLabel      = FUiToolButton_setLabel;
   o.setEnable     = FUiToolButton_setEnable;
   o.click         = FUiToolButton_click;
   o.dispose       = FUiToolButton_dispose;
   return o;
}
function FUiToolButton_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
}
function FUiToolButton_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onMouseDown', h);
   o.attachEvent('onMouseUp', h);
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(h, o.styleName('Icon'), o._icon);
   }
   if(o._label){
      o._hLabel = RBuilder.appendText(h, o.styleName('Label'));
      o.setLabel(o._label);
   }
}
function FUiToolButton_onEnter(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiToolButton_onLeave(e){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
function FUiToolButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = this.styleName('Press');
      o.click();
   }
}
function FUiToolButton_onMouseUp(h){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
function FUiToolButton_icon(){
   return this._icon;
}
function FUiToolButton_setIcon(p){
   this._icon = p;
}
function FUiToolButton_setLabel(p){
   var o = this;
   var s = RString.nvl(p);
   o._label = s;
   if(o._hIcon){
      s = ' ' + o._label;
   }
   if(o._hLabel){
      o._hLabel.innerText = s;
   }
}
function FUiToolButton_setEnable(p){
   var o = this;
   o.__base.FUiControl.oeEnable.call(o, e);
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
function FUiToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.processClickListener(o);
}
function FUiToolButton_dispose(){
   var o = this;
   o._hButton = null;
   o._hButtonLine = null;
   o._hButtonPanel = null;
   o._hIcon = null;
   o._hText = null;
   o.__base.FUiControl.dispose.call(o);
}
function FUiToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
function FUiToolButtonCheck(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
   o._groupName      = RClass.register(o, new APtyString('_groupName'));
   o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
   o._statusChecked  = false;
   o.onEnter         = FUiToolButtonCheck_onEnter;
   o.onLeave         = FUiToolButtonCheck_onLeave;
   o.onMouseDown     = FUiToolButtonCheck_onMouseDown;
   o.onMouseUp       = FUiToolButtonCheck_onMouseUp;
   o.groupName       = FUiToolButtonCheck_groupName;
   o.setGroupName    = FUiToolButtonCheck_setGroupName;
   o.groupDefault    = FUiToolButtonCheck_groupDefault;
   o.setGroupDefault = FUiToolButtonCheck_setGroupDefault;
   o.innerCheck      = FUiToolButtonCheck_innerCheck;
   o.check           = FUiToolButtonCheck_check;
   o.dispose         = FUiToolButtonCheck_dispose;
   return o;
}
function FUiToolButtonCheck_onEnter(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Hover');
   }
}
function FUiToolButtonCheck_onLeave(p){
   var o = this;
   if(!o._statusChecked){
      o._hPanel.className = this.styleName('Normal');
   }
}
function FUiToolButtonCheck_onMouseDown(p){
   var o = this;
   o.check(!o._statusChecked);
   o.processClickListener(o, o._statusChecked);
}
function FUiToolButtonCheck_onMouseUp(){
   var o = this;
}
function FUiToolButtonCheck_groupName(){
   return this._groupName;
}
function FUiToolButtonCheck_setGroupName(p){
   this._groupName = p;
}
function FUiToolButtonCheck_groupDefault(){
   return this._groupDefault;
}
function FUiToolButtonCheck_setGroupDefault(p){
   this._groupDefault = p;
}
function FUiToolButtonCheck_innerCheck(p){
   var o = this;
   if(o._statusChecked != p){
      o._statusChecked = p;
      if(p){
         o._hPanel.className = o.styleName('Press');
      }else{
         o._hPanel.className = o.styleName('Normal');
      }
   }
}
function FUiToolButtonCheck_check(p){
   var o = this;
   if(!p){
      if(o._groupDefault == o){
         return;
      }
   }
   o.innerCheck(p);
   if(!o._parent){
      return;
   }
   if(p){
      if(!RString.isEmpty(o._groupName)){
         var cs = o._parent.components();
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            if(c != o){
               if(RClass.isClass(c, FUiToolButtonCheck)){
                  c.innerCheck(false);
               }
            }
         }
      }
   }else{
      if(!RString.isEmpty(o._groupDefault)){
         var cs = o._parent.components();
         var c = cs.get(o._groupDefault);
         c.innerCheck(true);
      }
   }
}
function FUiToolButtonCheck_dispose(){
   var o = this;
   o._statusChecked = null;
   o._groupName = null;
   o.__base.FUiToolButton.dispose.call(o);
}
function FUiToolButtonMenu(o){
   o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MDropable, MFocus);
   o.popup         = null;
   o.hDropPanel    = null;
   o._styleDropHover = RClass.register(o, new AStyleIcon('DropHover'));
   o.onBuild       = FUiToolButtonMenu_onBuild;
   o.onEnter       = FUiToolButtonMenu_onEnter;
   o.onLeave       = FUiToolButtonMenu_onLeave;
   o.onBlur        = FUiToolButtonMenu_onBlur;
   o.onButtonClick = FUiToolButtonMenu_onButtonClick;
   o.onDropClick   = FUiToolButtonMenu_onDropClick;
   o.construct     = FUiToolButtonMenu_construct;
   o.push          = FUiToolButtonMenu_push;
   o.drop          = FUiToolButtonMenu_drop;
   o.dispose       = FUiToolButtonMenu_dispose;
   return o;
}
function FUiToolButtonMenu_onEnter(e){
   var o = this;
   o.base.FUiToolButton.onEnter.call(o, e);
   if(!o.disabled){
      o.hDropIcon.src = o.styleIconPath('DropHover');
   }
}
function FUiToolButtonMenu_onLeave(e){
   var o = this;
   if(!o.popup.isVisible()){
      o.base.FUiToolButton.onLeave.call(o, e);
      if(!o.disabled){
         o.hDropIcon.src = o.styleIconPath('Drop');
      }
   }
}
function FUiToolButtonMenu_onBlur(e){
   var o = this;
   if(e){
      if(o.popup.testInRange(e)){
         return false;
      }
   }
   o.hPanel.className = o.style('Button');
   o.popup.hide();
}
function FUiToolButtonMenu_onButtonClick(){
   var o = this;
   if(!o.disabled){
      o.base.FUiToolButton.onButtonClick.call(o);
      if(!(o.action || o.page)){
         o.drop();
      }else if(o.action){
         eval(o.action);
      }
   }
}
function FUiToolButtonMenu_onDropClick(e){
   this.drop();
}
function FUiToolButtonMenu_onBuild(e){
   var o = this;
   if(e.isBefore()){
      o.base.FUiToolButton.onBuild.call(o, e);
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
function FUiToolButtonMenu_construct(){
   var o = this;
   o.popup = RClass.create(FPopupMenu);
   o.popup.opener = o;
}
function FUiToolButtonMenu_push(c){
   var o = this;
   if(RClass.isClass(c, MMenuButton)){
      return o.popup.push(c);
   }
   o.base.FUiToolButton.push.call(o, c);
}
function FUiToolButtonMenu_drop(){
   var o = this;
   if(!o.disabled){
      o.popup.show(this.hDropPanel, EAlign.BottomRight);
   }
}
function FUiToolButtonMenu_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDropIcon = null;
   o.hDropPanel = null;
}
function FUiToolButtonSplit(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
   o.onBuild     = FUiToolButtonSplit_onBuild;
   return o;
}
function FUiToolButtonSplit_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p);
   o._hPanel.className = o.styleName('Panel');
}
function FUiToolButtonText(o){
   o = RClass.inherits(this, o, FUiToolButton);
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
function FUiDataTreeView(o){
   o = RClass.inherits(this, o, FUiTreeView);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._statusLoading   = false;
   o.lsnsLoaded       = new TListeners();
   o.lsnsNodeLoad     = new TListeners();
   o.lsnsNodeLoaded   = new TListeners();
   o.onLoaded         = FUiDataTreeView_onLoaded;
   o.onNodeLoaded     = FUiDataTreeView_onNodeLoaded;
   o.construct        = FUiDataTreeView_construct;
   o.buildNode        = FUiDataTreeView_buildNode;
   o.loadNode         = FUiDataTreeView_loadNode;
   o.loadUrl          = FUiDataTreeView_loadUrl;
   o.loadNodeUrl      = FUiDataTreeView_loadNodeUrl;
   o.loadService      = FUiDataTreeView_loadService;
   o.loadNodeService  = FUiDataTreeView_loadNodeService;
   o.reloadNode       = FUiDataTreeView_reloadNode;
   o.reload           = FUiDataTreeView_reload;
   o.dispose          = FUiDataTreeView_dispose;
   o._queryService    = RClass.register(o, new APtyString('_queryService'));
   o.onQueryLoaded    = FUiDataTreeView_onQueryLoaded;
   o.doQuery          = FUiDataTreeView_doQuery;
   o.removeNode       = FUiDataTreeView_removeNode;
   o.clearNodes       = FUiDataTreeView_clearNodes;
   o.getChangedChecks = FUiDataTreeView_getChangedChecks;
   o.fetchExtendsAll  = FUiDataTreeView_fetchExtendsAll;
   o.tempAppendNodes  = FUiDataTreeView_tempAppendNodes;
   o.removeNodes      = FUiDataTreeView_removeNodes;
   o.tempAppendChild  = FUiDataTreeView_tempAppendChild;
   return o;
}
function FUiDataTreeView_onLoaded(p){
   var o = this;
   var x = p.root;
   if(x == null){
      throw new TError(o, 'Load tree data failure.');
   }
   var xt = x.find('TreeView');
   RControl.build(o, xt, null, o._hPanel);
   o.lsnsLoaded.process(p);
   var s = xt.get('service');
   if(s){
      o.loadNodeService(s);
   }
}
function FUiDataTreeView_onNodeLoaded(p){
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
function FUiDataTreeView_construct(){
   var o = this;
   o.__base.FUiTreeView.construct.call(o);
}
function FUiDataTreeView_buildNode(pn, px){
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
function FUiDataTreeView_loadNode(pn, pf){
   var o = this;
   o._statusLoading = true;
   var nt = null;
   var fn = pn;
   var svc = o._serviceName;
   while(RClass.isClass(fn, FTreeNode)){
      nt = fn.type();
      if(nt && nt._service){
         svc = nt._service;
         break;
      }
      fn = fn._parent;
   }
   if(!svc){
      throw new TError(o, 'Unknown service name.');
   }
   o.lsnsNodeLoad.process(o, pn);
   var xd = new TXmlDocument();
   var x = xd.root();
   var fn = pn;
   while(RClass.isClass(fn, FTreeNode)){
      var xc = x.create('TreeNode');
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
   ln.setLevel(pn.level() + 1);
   ln.show();
   var sv = RService.parse(RString.nvl(svc, o._service));
   if(!sv){
      throw new TError(o, 'Unknown service.');
   }
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(sv.url, xd);
   c.parentNode = pn;
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FUiDataTreeView_loadUrl(p){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.lsnsLoad.register(o, o.onLoaded);
}
function FUiDataTreeView_loadNodeUrl(p, n){
   var o = this;
   var xc = RConsole.find(FXmlConsole);
   var c = xc.sendAsync(p);
   c.parentNode = RObject.nvl(n, o._focusNode);
   c.lsnsLoad.register(o, o.onNodeLoaded);
}
function FUiDataTreeView_loadService(service, attrs){
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
function FUiDataTreeView_loadNodeService(ps, pa){
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
function FUiDataTreeView_reloadNode(n){
   var o = this;
   n = RObject.nvl(n, o._focusNode);
   if(!n){
      return o.reload();
   }
   n.removeChildren();
   o.loadNode(n);
}
function FUiDataTreeView_reload(){
   var o = this;
   o.clear();
   o.loadUrl();
}
function FUiDataTreeView_dispose(){
   var o = this;
   o.__base.FUiTreeView.dispose.call(o);
}
function FUiDataTreeView_onQueryLoaded(e){
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
function FUiDataTreeView_doQuery(){
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
function FUiDataTreeView_removeNode(oNode){
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
function FUiDataTreeView_haveNodes(){
   return this.rootNode.hasChild();
}
function FUiDataTreeView_clearNodes(node){
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
function FUiDataTreeView_fetchExtendsAll(s){
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
function FUiDataTreeView_getChangedChecks(){
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
function FUiDataTreeView_tempAppendNodes(parent, config){
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
function FUiDataTreeView_removeNodes(node){
   node = RObject.nvl(node, this.workNode, this.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
function FUiDataTreeView_tempAppendChild(child){
   var o = this;
   var hc = o._hHeadLine.insertCell();
   hc.height = '100%';
   if(RClass.isClass(child, FTreeColumn)){
      hc.appendChild(child._hPanel);
   }
}
function FUiTreeColumn(o){
   o = RClass.inherits(this, o, FUiControl);
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   o.oeBuild      = FUiTreeColumn_oeBuild;
   o.onBuildPanel = FUiTreeColumn_onBuildPanel;
   return o;
}
function FUiTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FUiControl.oeBuild.call(o, event);
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
function FUiTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
function FUiTreeLevel(o){
   o = RClass.inherits(this, o, FUiControl);
   o._id        = RClass.register(o, new APtyString('_id'));
   o._color     = RClass.register(o, new APtyString('_color'));
   o._backColor = RClass.register(o, new APtyString('_backColor'));
   return o;
}
function FUiTreeNode(o){
   o = RClass.inherits(this, o, FUiContainer, MDataProperties);
   o._valid            = RClass.register(o, new APtyBoolean('_isValid'), true);
   o._typeName         = RClass.register(o, new APtyString('_typeName', 'type'));
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
   o.onBuildPanel      = FUiTreeNode_onBuildPanel;
   o.onBuild           = FUiTreeNode_onBuild;
   o.onNodeEnter       = RClass.register(o, new AEventMouseEnter('onNodeEnter'), FUiTreeNode_onNodeEnter);
   o.onNodeLeave       = RClass.register(o, new AEventMouseLeave('onNodeLeave'), FUiTreeNode_onNodeLeave);
   o.onNodeClick       = RClass.register(o, new AEventClick('onNodeClick'), FUiTreeNode_onNodeClick);
   o.construct         = FUiTreeNode_construct;
   o.type              = FUiTreeNode_type;
   o.typeName          = FUiTreeNode_typeName;
   o.setTypeName       = FUiTreeNode_setTypeName;
   o.setLabel          = FUiTreeNode_setLabel;
   o.setNote           = FUiTreeNode_setNote;
   o.level             = FUiTreeNode_level;
   o.setLevel          = FUiTreeNode_setLevel;
   o.check             = FUiTreeNode_check;
   o.setCheck          = FUiTreeNode_setCheck;
   o.setImage          = FUiTreeNode_setImage;
   o.setIcon           = FUiTreeNode_setIcon;
   o.get               = FUiTreeNode_get;
   o.set               = FUiTreeNode_set;
   o.hasChild          = FUiTreeNode_hasChild;
   o.topNode           = FUiTreeNode_topNode;
   o.topNodeByType     = FUiTreeNode_topNodeByType;
   o.show              = FUiTreeNode_show;
   o.hide              = FUiTreeNode_hide;
   o.select            = FUiTreeNode_select;
   o.extend            = FUiTreeNode_extend;
   o.extendAll         = FUiTreeNode_extendAll;
   o.searchLast        = FUiTreeNode_searchLast;
   o.createChild       = FUiTreeNode_createChild;
   o.appendNode        = FUiTreeNode_appendNode;
   o.push              = FUiTreeNode_push;
   o.remove            = FUiTreeNode_remove;
   o.removeChildren    = FUiTreeNode_removeChildren;
   o.reset             = FUiTreeNode_reset;
   o.click             = FUiTreeNode_click;
   o.refreshStyle      = FUiTreeNode_refreshStyle;
   o.propertyLoad      = FUiTreeNode_propertyLoad;
   o.propertySave      = FUiTreeNode_propertySave;
   o.loadConfig        = FUiTreeNode_loadConfig;
   o.reload           = FUiTreeNode_reload;
   o.reloadParent     = FUiTreeNode_reloadParent;
   o.loadQuery        = FUiTreeNode_loadQuery;
   o.isFolder         = FUiTreeNode_isFolder;
   o.dispose          = FUiTreeNode_dispose;
   o.innerDump        = FUiTreeNode_innerDump;
   o.findByName       = FUiTreeNode_findByName;
   o.findByUuid       = FUiTreeNode_findByUuid;
   o.checkChanged     = FUiTreeNode_checkChanged;
   o.pushChanged      = FUiTreeNode_pushChanged;
   o.getFullPath      = FUiTreeNode_getFullPath;
   return o;
}
function FUiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}
function FUiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiContainer.onBuild.call(o, p);
   var hp = o._hPanel;
   hp.style.border = '1 solid red';
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   var hnp = o._hNodePanel = RBuilder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   var hi = o._hImage = RBuilder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   var hi = o._hIcon = RBuilder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
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
         RHtml.visibleSet(hc, c.display);
      }
   }
}
function FUiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
function FUiTreeNode_onNodeLeave(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      t.lsnsLeave.process(t, o);
   }
}
function FUiTreeNode_onNodeClick(e){
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
function FUiTreeNode_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._attributes = new TAttributes();
}
function FUiTreeNode_type(){
   var o = this;
   var t = o._tree;
   if(RString.isEmpty(o._typeName)){
      return null;
   }
   return t.findType(o._typeName);
}
function FUiTreeNode_typeName(){
   return this._typeName;
}
function FUiTreeNode_setTypeName(p){
   var o = this;
   o._typeName = p;
   o.setIcon();
}
function FUiTreeNode_setLabel(p){
   var o = this;
   o.__base.FUiContainer.setLabel.call(o, p)
   var h = o._hLabel;
   if(h){
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
      h.innerHTML = s;
   }
}
function FUiTreeNode_setNote(p){
   var o = this;
   o._note = RString.empty(p);
   o.setLabel(o._label);
}
function FUiTreeNode_level(){
   return this._level;
}
function FUiTreeNode_setLevel(p){
   var o = this;
   o._level = p;
   var h = o._hNodePanel;
   if(h){
      h.style.paddingLeft = (o._tree._indent * p) + 'px';
   }
}
function FUiTreeNode_check(){
   return this._checked;
}
function FUiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   if(!RString.isEmpty(o._attributes.get('checked'))){
     o._checked = RBoolean.isTrue(o._attributes.get('checked'));
     if(o._hCheck){
         o._hCheck._checked = o._checked;
     }
   }
}
function FUiTreeNode_setImage(){
   var o = this;
   var t = o._tree;
   var h = o._hImage;
   if(h){
      var ni = o._child ? t._iconPlus : t._iconNode;
      h.src = RResource.iconPath(ni);
   }
}
function FUiTreeNode_setIcon(p){
   var o = this;
   o._icon = p;
   var h = o._hIcon;
   if(h){
      var ni = null;
      if(o._icon){
         ni = p;
      }else{
         var t = o.type();
         if(t){
            ni = t.icon();
         }
      }
      if(ni){
         RHtml.displaySet(h, true);
         h.style.width = 16;
         h.style.height = 16;
         h.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         h.src = RResource.iconPath(ni);
      }else{
         RHtml.displaySet(h, false);
      }
   }
}
function FUiTreeNode_get(n){
   return this._attributes.get(n);
}
function FUiTreeNode_set(n, v){
   this._attributes.set(n, v);
}
function FUiTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
function FUiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      r = r._parent;
   }
   return r;
}
function FUiTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeName == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
function FUiTreeNode_show(){
   var o = this;
   var t = o._tree;
   RHtml.visibleSet(o._hPanel, true);
   var ns = o._nodes;
   if(ns){
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(!n._statusLinked){
            t.appendNode(n, o);
         }
         if(n._statusDisplay){
            RHtml.visibleSet(n._hPanel, true);
            if(n._extended){
               n.show();
            }
         }
      }
   }
}
function FUiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      RHtml.visibleSet(o._hPanel, false);
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
function FUiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
function FUiTreeNode_extend(p){
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
function FUiTreeNode_extendAll(p){
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
function FUiTreeNode_searchLast(){
   var o = this;
   var s = o._nodes;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i)
         if(n._statusLinked){
            return n.searchLast();
         }
      }
   }
   return o;
}
function FUiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = RClass.create(FUiTreeNode);
      r._tree = this._tree;
   }
   return r;
}
function FUiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
function FUiTreeNode_push(c){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.push.call(o, c);
   if(RClass.isClass(c, FUiTreeNode)){
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
function FUiTreeNode_remove(){
   var o = this;
   var t = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      t.freeNode(o);
   }
}
function FUiTreeNode_removeChildren(){
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
function FUiTreeNode_reset(){
   var o = this;
   o._typeName = null;
   o._uuid = null;
   o._valid = true;
   o._icon = null;
   o._tag = null;
   o._note = null;
   o._child = false;
   o._checked = false;
   o._extended = true;
   o._statusLinked = false;
   o._statusDisplay = true;
   o._statusHover = false;
   o._extended = false;
   o._statusSelected = false;
   o._statusLoaded = false;
   o._level = 0;
}
function FUiTreeNode_click(){
   var o = this;
   var t = o._tree;
   t.selectNode(o, true);
   t.lsnsClick.process(t, o);
}
function FUiTreeNode_refreshStyle(){
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
function FUiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FUiContainer.propertyLoad.call(o, x);
   o._attributes.append(x.attrs);
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
function FUiTreeNode_propertySave(x){
   var o = this;
   o.__base.FUiContainer.propertySave.call(o, x);
   x.set('type_name', o._typeName);
   x.set('attributes', o._attributes.pack());
}
function FUiTreeNode_loadConfig(x){
   var o = this;
   o.reset();
   o.propertyLoad(x);
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}
function FUiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
function FUiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
function FUiTreeNode_loadQuery(x){
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
function FUiTreeNode_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
}
function FUiTreeNode_innerDump(s){
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
function FUiTreeNode_findByName(n){
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
function FUiTreeNode_findByUuid(u){
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
function FUiTreeNode_pushChanged(trd){
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
         if(RClass.isClass(c, FUiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
function FUiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
function FUiTreeNode_getFullPath(){
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
function FUiTreeNode_isFolder(){
   if(this._typeName){
       return (this._typeName._typeNameName == 'collections') ? true : false;
   }
}
function FUiTreeNodeType(o){
   o = RClass.inherits(this, o, FUiComponent);
   o._linker   = RClass.register(o, new APtyString('_linker'));
   o._icon     = RClass.register(o, new APtyString('_icon'));
   o._service  = RClass.register(o, new APtyString('_service'));
   o._action   = RClass.register(o, new APtyString('_action'));
   o._config   = RClass.register(o, new APtyConfig('_config'));
   o.linker    = FUiTreeNodeType_linker;
   o.icon      = FUiTreeNodeType_icon;
   o.service   = FUiTreeNodeType_service;
   o.action    = FUiTreeNodeType_action;
   o.get       = FUiTreeNodeType_get;
   o.set       = FUiTreeNodeType_set;
   o.innerDump = FUiTreeNodeType_innerDump;
   return o;
}
function FUiTreeNodeType_linker(){
   return this._linker;
}
function FUiTreeNodeType_icon(){
   return this._icon;
}
function FUiTreeNodeType_service(){
   return this._service;
}
function FUiTreeNodeType_action(){
   return this._action;
}
function FUiTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}
function FUiTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}
function FUiTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass.dump(o));
   s.append('[linker=',  o._linker);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
function FUiTreeView(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._optionCheck     = RClass.register(o, new APtyBoolean('_optionCheck'), false);
   o._indent          = RClass.register(o, new APtyInteger('_indent'), 16);
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
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
   o.onBuildPanel     = FUiTreeView_onBuildPanel;
   o.onBuild          = FUiTreeView_onBuild;
   o.onNodeCheckClick = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
   o.construct        = FUiTreeView_construct;
   o.attributes       = FUiTreeView_attributes;
   o.nodeTypes        = FUiTreeView_nodeTypes;
   o.nodeColumns      = FUiTreeView_nodeColumns;
   o.nodeLevels       = FUiTreeView_nodeLevels;
   o.nodes            = FUiTreeView_nodes;
   o.findType         = FUiTreeView_findType;
   o.findByName       = FUiTreeView_findByName;
   o.findByUuid       = FUiTreeView_findByUuid;
   o.createChild      = FUiTreeView_createChild;
   o.createNode       = FUiTreeView_createNode;
   o.appendNode       = FUiTreeView_appendNode;
   o.selectNode       = FUiTreeView_selectNode;
   o.push             = FUiTreeView_push;
   o.freeNode         = FUiTreeView_freeNode;
   o.calculateHeight  = FUiTreeView_calculateHeight;
   o.extendAuto       = FUiTreeView_extendAuto;
   o.extendAll        = FUiTreeView_extendAll;
   o.loadNode         = RMethod.empty;
   o.refresh          = FUiTreeView_refresh;
   o.filterNode       = FUiTreeView_filterNode;
   o.clear            = FUiTreeView_clear;
   o.dispose          = FUiTreeView_dispose;
   return o;
}
function FUiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}
function FUiTreeView_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var hr = RBuilder.appendTableRow(o._hPanel);
   var hc = RBuilder.appendTableCell(hr);
   var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
   var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   o._hHeadLine = RBuilder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   var ln = o._loadingNode = RClass.create(FUiTreeNode);
   ln._tree = o;
   ln._label = RContext.get('FUiTreeView:loading');
   ln._icon = o._iconLoading;
   ln.build(p);
   o.appendNode(ln);
   ln.hide();
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
}
function FUiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && RClass.isClass(s, FUiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && RClass.isClass(nd, FUiTreeNode)){
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
               if(pnd && RClass.isClass(pnd, FUiTreeNode)){
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
function FUiTreeView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._attributes = new TAttributes();
   o._nodeTypes = new TDictionary();
   o._nodeColumns = new TDictionary();
   o._nodeLevels = new TDictionary();
   o._nodes = new TObjects();
   o._allNodes = new TObjects();
   o._freeNodes = new TObjects();
   o._defaultNodeType = RClass.create(FUiTreeNodeType);
}
function FUiTreeView_attributes(){
   return this._attributes;
}
function FUiTreeView_nodeTypes(){
   return this._nodeTypes;
}
function FUiTreeView_nodeColumns(){
   return this._nodeColumns;
}
function FUiTreeView_nodeLevels(){
   return this._nodeLevels;
}
function FUiTreeView_nodes(){
   return this._nodes;
}
function FUiTreeView_findType(p){
   return this._nodeTypes.get(p);
}
function FUiTreeView_findByName(p){
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
function FUiTreeView_findByUuid(p){
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
function FUiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = RClass.create(FUiTreeColumn);
         break;
      case 'TreeLevel':
         r = RClass.create(FUiTreeLevel);
         break;
      case 'TreeNodeType':
         r = RClass.create(FUiTreeNodeType);
         break;
      case 'TreeNode':
         r = RClass.create(FUiTreeNode);
         break;
      default:
         throw new TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}
function FUiTreeView_createNode(){
   var o = this;
   var n = o._freeNodes.pop();
   if(!n){
      var n = RClass.create(FUiTreeNode);
      n._tree = o;
      n.build(o._hPanel);
   }
   RHtml.visibleSet(n._hPanel, true);
   o._allNodes.push(n);
   return n;
}
function FUiTreeView_appendNode(n, p){
   var o = this;
   if(!n._statusLinked){
      var nh = n._hPanel;
      if(p){
         var nl = p.searchLast();
         var nr = nl._hPanel.rowIndex;
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
      }
      n._statusLinked = true;
   }
}
function FUiTreeView_selectNode(n, s){
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
function FUiTreeView_push(p){
   var o = this;
   o.__base.FUiContainer.push.call(o, p);
   p._tree = o;
   if(RClass.isClass(p, FUiTreeColumn)){
      o._nodeColumns.set(p.name(), p);
   }else if(RClass.isClass(p, FUiTreeLevel)){
      o._nodeLevels.set(p.id(), p);
   }else if(RClass.isClass(p, FUiTreeNodeType)){
      o._nodeTypes.set(p.linker(), p);
   }else if(RClass.isClass(p, FUiTreeNode)){
      o._nodes.push(p);
      o._allNodes.push(p);
   }
}
function FUiTreeView_freeNode(p){
   var o = this;
   if(p._statusLinked){
      p._statusLinked = false;
      p.hidden();
      o._allNodes.remove(p);
      o._freeNodes.push(p);
   }
}
function FUiTreeView_calculateHeight(){
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
function FUiTreeView_extendAuto(n){
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
function FUiTreeView_extendAll(n, f){
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
function FUiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
function FUiTreeView_filterNode(pl, pa){
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
function FUiTreeView_clear(){
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
function FUiTreeView_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
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
function FUiFramePage(o){
   o = RClass.inherits(this, o, FUiContainer);
   o.onBuildPanel = FUiFramePage_onBuildPanel
   o.appendChild  = FUiFramePage_appendChild;
   return o;
}
function FUiFramePage_onBuildPanel(e){
   var o = this;
   var h = o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
   h.vAlign = 'top';
}
function FUiFramePage_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
function FUiFrameSet(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._directionCd  = RClass.register(o, new APtyEnum('_directionCd', null, EDirection), EDirection.Vertical);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = FUiFrameSet_onBuildPanel;
   o.construct     = FUiFrameSet_construct;
   o.appendFrame   = FUiFrameSet_appendFrame;
   o.appendSpliter = FUiFrameSet_appendSpliter;
   o.appendChild   = FUiFrameSet_appendChild;
   o.dispose       = FUiFrameSet_dispose;
   return o;
}
function FUiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiFrameSet_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._frames = new TObjects();
}
function FUiFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      var hr = o._hLine;
      if(!hr){
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
function FUiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = RClass.create(FUiFrameSpliter);
      sp.build(o._hPanel);
   }
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
function FUiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(RClass.isClass(p, FUiFramePage)){
      o.appendFrame(p);
      return;
   }else if(RClass.isClass(p, FUiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FUiContainer.appendChild.call(o, p);
}
function FUiFrameSet_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiFrameSpliter(o){
   o = RClass.inherits(this, o, FUiControl, MDragable);
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
   o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
   o.onBuild       = FUiFrameSpliter_onBuild;
   o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
   o.onDragStart   = FUiFrameSpliter_onDragStart;
   o.onDragMove    = FUiFrameSpliter_onDragMove;
   o.onDragStop    = FUiFrameSpliter_onDragStop;
   o.construct     = FUiFrameSpliter_construct;
   o.dispose       = FUiFrameSpliter_dispose;
   return o;
}
function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
}
function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.__linker = o;
   var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   RHtml.displaySet(hd, false);
   RConsole.find(FDragConsole).register(o);
   h.appendChild(hd);
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
}
function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
function FUiFrameSpliter_onDragStart(e){
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
function FUiFrameSpliter_onDragMove(e){
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
function FUiFrameSpliter_onDragStop(e){
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
function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiFrameSpliter_dispose(){
   var o = this;
   var h = o._hDrag;
   if(h){
      RHtml.free(h);
      o._hDrag = null;
   }
   var h = o._hSize;
   if(h){
      RHtml.free(h);
      o._hSize = null;
   }
   o.__base.FUiControl.dispose.call(o);
}
function FUiFrameSpliter_build(){
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
function FUiFrameSpliter_link(hDrag, hSize){
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
function FUiFrameSpliter_click(){
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
function FUiWorkspace(o){
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   o._hContainer  = null;
   o._frames      = null;
   o.onBuildPanel = FUiWorkspace_onBuildPanel;
   o.appendChild  = FUiWorkspace_appendChild;
   return o;
}
function FUiWorkspace_onBuildPanel(p){
   var o = this;
   o._hContainer = p.hDocument.body;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiWorkspace_appendChild(p){
   var o = this;
   if(RClass.isClass(p, FUiFrameSet)){
      o._hContainer.appendChild(p._hPanel);
   }
}
