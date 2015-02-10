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
function FFocusConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o.scope              = EScope.Page;
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   o.hoverContainer     = null;
   o._hoverControl      = null;
   o._focusControl      = null;
   o._blurControl       = null;
   o._activeControl     = null;
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   o.onWindowMouseDown  = FFocusConsole_onWindowMouseDown;
   o.onWindowMouseWheel = FFocusConsole_onWindowMouseWheel;
   o.construct          = FFocusConsole_construct;
   o.isFocus            = FFocusConsole_isFocus;
   o.enter              = FFocusConsole_enter;
   o.leave              = FFocusConsole_leave;
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
function FFocusConsole_onWindowMouseDown(s, e){
   this.focusHtml(e);
}
function FFocusConsole_onWindowMouseWheel(s, e){
   var o = this;
   var fc = this._focusControl;
   if(RClass.isClass(fc, MMouseWheel)){
      fc.onMouseWheel(s, e);
   }
}
function FFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new TListeners();
   o.lsnsBlur = new TListeners();
   o.lsnsFocusClass = new TListeners();
   RLogger.info(o, 'Add listener for window mouse down and wheel.');
   RWindow.lsnsMouseDown.register(o, o.onWindowMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onWindowMouseWheel);
}
function FFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
function FFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MContainer)){
      o.hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
function FFocusConsole_leave(c){
   var o = this;
   if(o.hoverContainer == c){
      o.hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
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
function FFocusConsole_focusHtml(he){
   var o = this;
   var c = RControl.htmlControl(he.srcElement);
   RLogger.debug(o, 'Focus html control. (control={1},element={2})', RClass.dump(c), he.srcElement.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, he);
      }
   }else{
      o.blur(null, he);
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
   o = RClass.inherits(this, o, FUiControl, MContainer);
   o._controls         = null;
   o.oeDesign          = RMethod.empty;
   o.construct         = FUiContainer_construct;
   o.hasControl        = FUiContainer_hasControl;
   o.findControl       = FUiContainer_findControl;
   o.searchControl     = FUiContainer_searchControl;
   o.controls          = FUiContainer_controls;
   o.panel             = FUiContainer_panel;
   o.focusFirstControl = FUiContainer_focusFirstControl;
   o.createChild       = FUiContainer_createChild;
   o.appendChild       = FUiContainer_appendChild;
   o.push              = FUiContainer_push;
   o.dispose           = FUiContainer_dispose;
   o.storeConfig         = FUiContainer_storeConfig;
   o.psBuildChildren     = FUiContainer_psBuildChildren;
   o.setChildrenProperty = FUiContainer_setChildrenProperty;
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
function FUiContainer_createChild(p){
   var c = RControl.newInstance(p);
   c._parent = this;
   return c;
}
function FUiContainer_appendChild(p){
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
function FUiContainer_storeConfig(x){
   var o = this;
   x.name = RClass.name(o);
   o.saveConfig(x);
   var ps = o.components;
   if(ps){
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         var xp = x.create(RClass.name(p));
         if(RClass.isClass(p, FUiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
function FUiContainer_psBuildChildren(){
   var o = this;
   var e = REvent.alloc(o, EEvent.Build);
   o.ps(e, null, true);
   REvent.free(e);
}
function FUiContainer_setChildrenProperty(p, vs){
   var o = this;
   for(var n in vs){
      o.component(n)[p] = vs[n];
   }
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
   o.onMouseOver    = RClass.register(o, new AEventMouseOver('onMouseOver'));
   o.onMouseOut     = RClass.register(o, new AEventMouseOut('onMouseOut'));
   o.onMouseDown    = RClass.register(o, new AEventMouseDown('onMouseDown'));
   o.onMouseUp      = RClass.register(o, new AEventMouseUp('onMouseUp'));
   o.onClick        = RClass.register(o, new AEventClick('onClick'));
   o.onDoubleClick  = RClass.register(o, new AEventDoubleClick('onDoubleClick'));
   o.onResize       = RClass.register(o, new AEventResize('onResize'));
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
}
function FUiControl_onLeave(e){
   var o = this;
}
function FUiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
}
function FUiControl_onBuild(p){
   var o = this;
   o.onBuildPanel(p);
   o.setVisible(o._visible);
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
      RHtml.displaySet(h, p);
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
   var v = o._hPanel;
   if(v){
      RMemory.freel(v);
      o._hPanel = null;
   }
   o.__base.MPadding.dispose.call(o);
   o.__base.MSize.dispose.call(o);
   o.__base.MStyle.dispose.call(o);
   o.__base.FUiComponent.dispose.call(o);
}
function MContainer(o){
   o = RClass.inherits(this, o);
   o.createChild = RMethod.empty;
   o.appendChild = RMethod.empty;
   return o;
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
function MDataField(o){
   o = RClass.inherits(this, o, MDataValue);
   o._dataName = RClass.register(o, new APtyString('_dataName'));
   return o;
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
function MDataset(o){
   o = RClass.inherits(this, o, MDataContainer);
   o._dsDataset         = RClass.register(o, new APtyString('_dsDataset', 'dataset'));
   o._dsPageSize        = RClass.register(o, new APtyInteger('_dsPageSize', 'page_size'), 20);
   o._dsInsertAction    = RClass.register(o, new APtyString('_dsInsertAction', 'insert_action'));
   o._dsUpdateAction    = RClass.register(o, new APtyString('_dsUpdateAction', 'update_action'));
   o._dsDeleteAction    = RClass.register(o, new APtyString('_dsDeleteAction', 'delete_action'));
   o._dataSource        = null;
   o.onDsFetch          = MDataset_onDsFetch;
   o.onDatasetLoadBegin = RMethod.empty;
   o.onDatasetLoad      = RMethod.empty;
   o.onDatasetLoadEnd   = RMethod.empty;
   o.oeDataLoad         = MDataset_oeDataLoad;
   o.oeDataSave         = MDataset_oeDataSave;
   o.oeDatasetLoad      = MDataset_oeDatasetLoad;
   o.construct          = MDataset_construct;
   o.loadDataset        = MDataset_loadDataset;
   o.loadDatasets       = MDataset_loadDatasets;
   o.dsDatasetLoad      = MDataset_dsDatasetLoad;
   o.dsFetch            = MDataset_dsFetch;
   return o;
}
function MDataset_onDsFetch(g){
   var o = this;
   var ds = g.datasets;
   o.dsDatasetLoad(ds);
}
function MDataset_oeDataLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
function MDataset_oeDataSave(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.source;
      ds.selectDataset();
      ds.selectRow();
   }
   return EEventStatus.Contine;
}
function MDataset_oeDatasetLoad(p){
   var o = this;
   if(p.isBefore()){
      var ds = p.datasets;
      var d = ds.get(o._name);
      o._dataset = d;
      o.onDatasetLoad(d);
   }
   return EEventStatus.Contine;
}
function MDataset_construct(){
   var o = this;
}
function MDataset_loadDataset(d){
   var o = this;
   o.dsStore = d;
   d.saveViewer(o.dsViewer);
   o.onLoadDataset(d);
}
function MDataset_loadDatasets(p){
   var o = this;
   var c = p.count();
   for(var i = 0; i < c; i++){
      var d = p.value(n);
      var dc = o.findByPath(d.name)
      if(!dc){
         return RMessage.fatal(o, null, 'Load dataset failed. (dataset={1}', d.name);
      }
      dc.loadDataset(d);
   }
}
function MDataset_dsDatasetLoad(p){
   var o = this;
   var e = new TEventProcess(null, o, 'oeDatasetLoad', MDataset);
   e.datasets = p;
   o.process(e);
   e.dispose();
}
function MDataset_dsFetch(){
   var o = this;
   var g = new TDatasetFetchArg();
   g.owner = o;
   g.name = o._name;
   g.callback = o.onDsFetch;
   RConsole.find(FDatasetConsole).fetch(g);
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
function MDataset_dsInitialize(){
   this.callEvent('onFormInitialize', this, this.__initializeEvent);
}
function MDataset_dsShow(){
   this.callEvent('onFormShow', this, this.__showEvent);
}
function MDataset_dsLoaded(){
   this.callEvent('onDatasetLoaded', this, this.__loadedEvent);
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
function MListener(o){
   o = RClass.inherits(this, o);
   o._listeners      = null;
   o.addListener     = MListener_addListener;
   o.removeListener  = MListener_removeListener;
   o.processListener = MListener_processListener;
   return o;
}
function MListener_addListener(n, w, m){
   var o = this;
   var lss = o._listeners;
   if(!lss){
      lss = o._listeners = new Object();
   }
   var ls = lss[n];
   if(!ls){
      ls = lss[n] = new TListeners();
   }
   return ls.register(w, m);
}
function MListener_removeListener(n, w, m){
   var o = this;
   var lss = o._listeners;
   var ls = lss[n];
   return ls.unregister(w, m);
}
function MListener_processListener(n, p1, p2, p3, p4, p5){
   var o = this;
   var lss = o._listeners;
   if(lss){
      var ls = lss[n];
      if(ls){
         ls.process(p1, p2, p3, p4, p5);
      }
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
   o.processClickListener = MListenerClick_processClickListener;
   return o;
}
function MListenerClick_addClickListener(w, m){
   return this.addListener(EEvent.Click, w, m);
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
   return this.addListener(EEvent.Click, w, m);
}
function MListenerDoubleClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
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
function MListenerLoad(o){
   o = RClass.inherits(this, o, MListener);
   o.addLoadListener     = MListenerLoad_addLoadListener;
   o.processLoadListener = MListenerLoad_processLoadListener;
   return o;
}
function MListenerLoad_addLoadListener(w, m){
   return this.addListener(EEvent.Load, w, m);
}
function MListenerLoad_processLoadListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.Load, p1, p2, p3, p4, p5);
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
         }
      }else{
         throw new TError(o, 'Unknown parameter. (name={p})', p);
      }
      r = RClass.create(n);
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
   if(RClass.isClass(pc, MContainer) && px.hasNode()){
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
function RControl_innerbuild(pc, px, pa, ph){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(RClass.isClass(pc, MProperty)){
      pc.propertyLoad(px);
   }
   if(RClass.isClass(pc, FUiControl)){
      if(!pc.isBuild()){
         pc.build(ph);
      }else{
         pc.refresh();
      }
   }
   if(RClass.isClass(pc, MContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n);
         o.innerbuild(c, n, pa, ph);
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
   o.innerbuild(c, x, a, h);
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
