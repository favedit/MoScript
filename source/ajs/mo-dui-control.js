MO.EEditConfig = new function EEditConfig(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
MO.EEditStatus = new function EEditStatus(){
   var o = this;
   o.Blur   = 0;
   o.Cancel = 1;
   o.Ok     = 2;
   return o;
}
MO.EEventType = new function EEventType(){
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
MO.ERowStatus = new function ERowStatusFace(){
   var o = this;
   o.Normal = 'N';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete  = 'D';
   return o;
}
MO.MDuiContainer = function MDuiContainer(o){
   o = MO.Class.inherits(this, o);
   o.createChild = MO.MDuiContainer_createChild;
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
}
MO.MDuiContainer_createChild = function MDuiContainer_createChild(p){
   var c = MO.RDuiControl.newInstance(p);
   c._parent = this;
   return c;
}
MO.MDuiDescribeFrame = function MDuiDescribeFrame(o){
   o = MO.Class.inherits(this, o);
   o._frameName  = null;
   o.buildDefine = MO.MDuiDescribeFrame_buildDefine;
   return o;
}
MO.MDuiDescribeFrame_buildDefine = function MDuiDescribeFrame_buildDefine(hDocument, frameName){
   var o = this;
   if(MO.Lang.String.isEmpty(frameName)){
      frameName = o._frameName;
   }
   var frameConsole = MO.Console.find(MO.FUiFrameDefineConsole);
   var xconfig = frameConsole.load(frameName);
   MO.Dui.Control.build(o, xconfig, null, hDocument);
}
MO.MDuiDesign = function MDuiDesign(o){
   o = MO.Class.inherits(this, o);
   o._statusDesign      = false;
   o._storage       = null;
   o.oeDesign      = MO.MDuiDesign_oeDesign;
   o.onDesignEnter = MO.Class.register(o, new MO.AEventMouseEnter('onDesignEnter'), MO.MDuiDesign_onDesignEnter);
   o.onDesignLeave = MO.Class.register(o, new MO.AEventMouseEnter('onDesignLeave'), MO.MDuiDesign_onDesignLeave);
   o.onDesignBegin = MO.Class.register(o, new MO.AEventMouseEnter('onDesignBegin'), MO.MDuiDesign_onDesignBegin);
   o.onDesignEnd   = MO.Class.register(o, new MO.AEventMouseEnter('onDesignEnd'), MO.MDuiDesign_onDesignEnd);
   return o;
}
MO.MDuiDesign_oeDesign = function MDuiDesign_oeDesign(e){
   if(e.isBefore()){
      switch(e.mode){
         case MO.EDesign.Move:
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               o.isDesign = true;
               MO.RHtml.link(h, 'className', h.className);
               MO.RHtml.link(h, 'onmousedown', h.onmousedown);
               h.onmousedown = null;
               o.onDesignEnter();
            }else{
               o.isDesign = false;
               h.className = MO.RHtml.findLink(h, 'className');
               var omd = MO.RHtml.findLink(h, 'onmousedown');
               if(omd){
                  h.onmousedown = omd;
               }
            }
            break;
         case MO.EDesign.Border:
            var o = this;
            var h = o._hPanel;
            if(e.flag){
               MO.RHtml.link(h, 'styleBorder', h.style.border);
               h.style.border = '1 solid red';
            }else{
               h.style.border = MO.RHtml.findLink(h, 'styleBorder');
            }
            break;
      }
   }
}
MO.MDuiDesign_onDesignEnter = function MDuiDesign_onDesignEnter(p){
   var o = this;
   o._hPanel.className = o.style('Design');
}
MO.MDuiDesign_onDesignLeave = function MDuiDesign_onDesignLeave(p){
}
MO.MDuiDesign_onDesignBegin = function MDuiDesign_onDesignBegin(p){
   var o = this;
   var g = o._storage = MO.Lang.Object.nvlObj(o._storage);
   g.designStyle = o._hPanel.className;
   g.designLayer = o._hPanel.zIndex;
   o._hPanel.className = o.style('DesignDrag');
   o._statusDesign = true;
}
MO.MDuiDesign_onDesignEnd = function MDuiDesign_onDesignEnd(p){
   var o = this;
   var g = o._storage = MO.Lang.Object.nvlObj(o._storage);
   o._hPanel.className = g.designStyle;
   o._hPanel.zIndex = g.designLayer;
   o._statusDesign = false;
}
MO.MDuiDisplay = function MDuiDisplay(o){
   o = MO.Class.inherits(this, o);
   o._dispDisplay = MO.Class.register(o, new MO.APtySet(null, '_dispDisplay', 'disp_mode', MO.EDisplayMode.Display, false));
   o._dispSearch  = MO.Class.register(o, new MO.APtySet(null, '_dispSearch', 'disp_mode', MO.EDisplayMode.Search, false));
   o._dispInsert  = MO.Class.register(o, new MO.APtySet(null, '_dispInsert', 'disp_mode', MO.EDisplayMode.Insert, false));
   o._dispUpdate  = MO.Class.register(o, new MO.APtySet(null, '_dispUpdate', 'disp_mode', MO.EDisplayMode.Update, false));
   o._dispDelete  = MO.Class.register(o, new MO.APtySet(null, '_dispDelete', 'disp_mode', MO.EDisplayMode.Delete, false));
   o._dispZoom    = MO.Class.register(o, new MO.APtySet(null, '_dispZoom', 'disp_mode', MO.EDisplayMode.Zoom, false));
   o._dispAlign   = MO.Class.register(o, new MO.APtyString(null, '_dispAlign', null, MO.EAlign.Left));
   o._visible    = true;
   o.oeMode      = MO.MDuiDisplay_oeMode;
   o.canVisible  = MO.MDuiDisplay_canVisible;
   return o;
}
MO.MDuiDisplay_oeMode = function MDuiDisplay_oeMode(e){
   var o = this;
   if(e.isBefore()){
      var v = true;
      if(!o.base.MDuiDisplayAble){
         v = o.canVisible(e.mode);
      }
      o.setVisible(v);
   }
}
MO.MDuiDisplay_canVisible = function MDuiDisplay_canVisible(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case MO.EMode.Display:
         return o.dispList;
      case MO.EMode.Search:
         return o.dispSearch;
      case MO.EMode.Insert:
         return o.dispInsert;
      case MO.EMode.Update:
         return o.dispUpdate;
      case MO.EMode.Delete:
         return o.dispDelete;
      case MO.EMode.Zoom:
         return o.dispZoom;
   }
}
MO.MDuiDropable = function MDuiDropable(o){
   o = MO.Class.inherits(this, o);
   o._styleDrop         = MO.Class.register(o, new MO.AStyle('_styleDrop'));
   o._styleIconDrop     = MO.Class.register(o, new MO.AStyleIcon('_styleIconDrop'));
   o._hDropPanel        = null;
   o._hDrop             = null;
   o.onBuildDrop       = MO.MDuiDropable_onBuildDrop;
   o.onDropEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onDropEnter'));
   o.onDropLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onDropLeave'));
   o.onDropClick       = MO.Class.register(o, new MO.AEventClick('onDropClick'), MO.MDuiDropable_onDropClick);
   o.onDropDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDropDoubleClick'), MO.MDuiDropable_onDropDoubleClick);
   o.canDrop           = MO.MDuiDropable_canDrop;
   return o;
}
MO.MDuiDropable_onBuildDrop = function MDuiDropable_onBuildDrop(hPanel){
   var o = this;
   o._hDropPanel = hPanel;
   hPanel.className = o.styleName('Drop', MO.MDuiDropable);
   var hDrop = o.hDrop = MO.RBuilder.appendIcon(hPanel, null, 'control.drop');
   hDrop.style.width =16;
   hDrop.style.borderLeft = '1 solid #CCCCCC';
   hDrop.style.cursor = 'hand';
}
MO.MDuiDropable_onDropClick = function MDuiDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
MO.MDuiDropable_onDropDoubleClick = function MDuiDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
MO.MDuiDropable_canDrop = function MDuiDropable_canDrop(){
   var o = this;
   if(MO.Class.isClass(o, MO.MDuiDesign)){
      return !MO.Console.find(MO.FUiDesignConsole).canDesignMove;
   }
   return true;
}
MO.MDuiEditable = function MDuiEditable(o){
   o = MO.Class.inherits(this, o);
   return o;
}
MO.MDuiEditable_testEdit = function MDuiEditable_testEdit(m){
   var o = this;
   switch(MO.Lang.String.nvl(m, o._emode)){
      case MO.EMode.Insert:
         return o.editInsert;
      case MO.EMode.Update:
         return o.editUpdate;
      case MO.EMode.Delete:
         return o.editDelete;
      case MO.EMode.Zoom:
         return o.editZoom;
   }
}
MO.MDuiEditChange = function MDuiEditChange(o){
   o = MO.Class.inherits(this, o);
   o._styleChangePanel = MO.Class.register(o, new MO.AStyle('_styleChangePanel'));
   o._styleChangeIcon  = MO.Class.register(o, new MO.AStyle('_styleChangeIcon'));
   o._hChangePanel     = null;
   o._hChangeIcon      = null;
   o.onBuildEditChange = MO.MDuiEditChange_onBuildEditChange;
   o.onChangeEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onChangeEnter'), MO.MDuiEditChange_onChangeEnter);
   o.onChangeLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onChangeLeave'), MO.MDuiEditChange_onChangeLeave);
   o.onChangeClick     = MO.Class.register(o, new MO.AEventClick('onChangeClick'), MO.MDuiEditChange_onChangeClick);
   o.construct         = MO.MDuiEditChange_construct;
   o.changeSet         = MO.MDuiEditChange_changeSet;
   o.dispose           = MO.MDuiEditChange_dispose;
   return o;
}
MO.MDuiEditChange_onBuildEditChange = function MDuiEditChange_onBuildEditChange(p){
   var o = this;
   var h = o._hChangePanel;
   h.className = o.styleName('ChangePanel', MO.MDuiEditChange);
   h.style.verticalAlign = 'top';
   h.width = 5;
   o.attachEvent('onChangeEnter', h, o.onChangeEnter);
   o.attachEvent('onChangeLeave', h, o.onChangeLeave);
   o.attachEvent('onChangeClick', h, o.onChangeClick);
   var hi = o._hChangeIcon = MO.RBuilder.appendIcon(h, o.styleName('ChangeIcon', MO.MDuiEditChange), 'control.change');
   hi._pname = 'change.icon';
}
MO.MDuiEditChange_onChangeEnter = function MDuiEditChange_onChangeEnter(e){
   var o = this;
}
MO.MDuiEditChange_onChangeLeave = function MDuiEditChange_onChangeLeave(e){
   var o = this;
}
MO.MDuiEditChange_onChangeClick = function MDuiEditChange_onChangeClick(e){
}
MO.MDuiEditChange_construct = function MDuiEditChange_construct(){
}
MO.MDuiEditChange_changeSet = function MDuiEditChange_changeSet(p){
}
MO.MDuiEditChange_dispose = function MDuiEditChange_dispose(){
   var o = this;
   o._hChangeIcon = MO.Window.Html.free(o._hChangeIcon);
   o._hChangePanel = MO.Window.Html.free(o._hChangePanel);
}
MO.MDuiEditDescriptor = function MDuiEditDescriptor(o){
   o = MO.Class.inherits(this, o, MO.MEditable);
   o._dataName          = MO.Class.register(o, new MO.APtyString(null, '_dataName'));
   o._dataCode          = MO.Class.register(o, new MO.APtyString(null, '_dataCode'));
   o._dataDefault       = MO.Class.register(o, new MO.APtyString(null, '_dataDefault'));
   o._labelIcon         = MO.Class.register(o, new MO.APtyString(null, '_labelIcon'));
   o._labelIconDisable  = MO.Class.register(o, new MO.APtyString(null, '_labelIconDisable'));
   o._labelColor        = MO.Class.register(o, new MO.APtyString(null, '_labelColor'));
   o._labelAlign        = MO.Class.register(o, new MO.APtyString(null, '_labelAlign', null, MO.EAlign.Left));
   o._labelValign       = MO.Class.register(o, new MO.APtyString(null, '_labelValign', null, MO.EAlign.Middle));
   o._editSearch        = MO.Class.register(o, new MO.APtySet(null, '_editSearch', 'editAccess', MO.EEditConfig.Search, false));
   o._editCopy          = MO.Class.register(o, new MO.APtySet(null, '_editCopy', 'editAccess', MO.EEditConfig.Copy, false));
   o._editAlign         = MO.Class.register(o, new MO.APtyString(null, '_editAlign', null, MO.EAlign.Left));
   o._editValign        = MO.Class.register(o, new MO.APtyString(null, '_editValign', null, MO.EAlign.Middle));
   o._editFormat        = MO.Class.register(o, new MO.APtyString(null, '_editFormat'));
   o._editUnit          = MO.Class.register(o, new MO.APtyString(null, '_editUnit'));
   o._editTip           = MO.Class.register(o, new MO.APtyString(null, '_editTip'));
   o._validInsert       = MO.Class.register(o, new MO.APtySet(null, '_validInsert', 'validAccess', MO.EDisplayMode.Insert, false));
   o._validUpdate       = MO.Class.register(o, new MO.APtySet(null, '_validUpdate', 'validAccess', MO.EDisplayMode.Update, false));
   o._validDelete       = MO.Class.register(o, new MO.APtySet(null, '_validDelete', 'validAccess', MO.EDisplayMode.Delete, false));
   o._validRequire      = MO.Class.register(o, new MO.APtyBoolean(null, '_validRequire', null, false));
   return o;
}
MO.MDuiEditDescriptor_onDataEnter = function MDuiEditDescriptor_onDataEnter(s, e){
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
MO.MDuiEditDescriptor_onDataLeave = function MDuiEditDescriptor_onDataLeave(s, e){
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
MO.MDuiEditDescriptor_onDataKeyDown = function MDuiEditDescriptor_onDataKeyDown(s, e){
   var o = this;
   if(s._editable && !s._disabled){
      s._invalidText = o.validText(s.text());
      s.refreshStyle();
   }
}
MO.MDuiEditDescriptor_onDataChange = function MDuiEditDescriptor_onDataChange(s, e){
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
MO.MDuiEditDescriptor_onDataEditEnd = function MDuiEditDescriptor_onDataEditEnd(s, e){
   var o = this;
   var vt = s._invalidText = o.validText(s.text());
   if(vt){
      MO.Logger.debug(this, 'Edit valid failed ({0})', vt);
   }else{
      s.commitValue();
   }
   if(s.isTextChanged()){
	   o.callEvent('onDataChange', o, o.__changedEvent);
   }
   s.refreshStyle();
}
MO.MDuiEditDescriptor_oeSaveCode = function MDuiEditDescriptor_oeSaveCode(e){
   var o = this;
   if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
      e.values.set(o.dataName, o.dataCode);
   }
   return EEventStatus.Stop;
}
MO.MDuiEditDescriptor_canValid = function MDuiEditDescriptor_canValid(m){
   var o = this;
   switch(MO.Lang.String.nvl(m, o._emode)){
      case MO.EMode.Insert:
         return o.validInsert;
      case MO.EMode.Update:
         return o.validUpdate;
      case MO.EMode.Delete:
         return o.validDelete;
   }
}
MO.MDuiEditDescriptor_formatValue = function MDuiEditDescriptor_formatValue(v){
   return MO.Lang.String.nvl(v);
}
MO.MDuiEditDescriptor_formatText = function MDuiEditDescriptor_formatText(t){
   return MO.Lang.String.nvl(t);
}
MO.MDuiEditDescriptor_validText = function MDuiEditDescriptor_validText(t){
   var o = this;
}
MO.MDuiEditDrop = function MDuiEditDrop(o){
   o = MO.Class.inherits(this, o);
   o._styleDropPanel = MO.Class.register(o, new MO.AStyle('_styleDropPanel'));
   o._styleDropIcon  = MO.Class.register(o, new MO.AStyle('_styleDropIcon'));
   o._hDropPanel     = null;
   o._hDropIcon      = null;
   o.onBuildEditDrop = MO.MDuiEditDrop_onBuildEditDrop;
   o.onDropEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onDropEnter'), MO.MDuiEditDrop_onDropEnter);
   o.onDropLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onDropLeave'), MO.MDuiEditDrop_onDropLeave);
   o.onDropClick     = MO.Class.register(o, new MO.AEventClick('onDropClick'), MO.MDuiEditDrop_onDropClick);
   o.construct       = MO.MDuiEditDrop_construct;
   o.dispose         = MO.MDuiEditDrop_dispose;
   return o;
}
MO.MDuiEditDrop_onBuildEditDrop = function MDuiEditDrop_onBuildEditDrop(p){
   var o = this;
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MO.MDuiEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   var hi = o._hDropIcon = MO.RBuilder.appendIcon(h, o.styleName('DropIcon', MO.MDuiEditDrop), 'control.drop');
   hi.align = 'center';
}
MO.MDuiEditDrop_onDropEnter = function MDuiEditDrop_onDropEnter(e){
   var o = this;
}
MO.MDuiEditDrop_onDropLeave = function MDuiEditDrop_onDropLeave(e){
   var o = this;
}
MO.MDuiEditDrop_onDropClick = function MDuiEditDrop_onDropClick(e){
}
MO.MDuiEditDrop_construct = function MDuiEditDrop_construct(){
}
MO.MDuiEditDrop_dispose = function MDuiEditDrop_dispose(){
   var o = this;
   o._hDropIcon = MO.Window.Html.free(o._hDropIcon);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
}
MO.MDuiEditReference = function MDuiEditReference(o){
   o = MO.Class.inherits(this, o);
   o._lovService    = MO.Class.register(o, new MO.APtyString('_lovService'));
   o._lovReference  = MO.Class.register(o, new MO.APtyString('_lovReference'));
   o._lovFields     = MO.Class.register(o, new MO.APtyString('_lovFields'));
   o._lovWhere      = MO.Class.register(o, new MO.APtyString('_lovWhere'));
   o._lovOrder      = MO.Class.register(o, new MO.APtyString('_lovOrder'));
   o._listView      = null;
   o.onListSelected = MO.Method.empty;
   o.canListView    = MO.MDuiEditReference_canListView;
   o.setLabelStyle  = MO.MDuiEditReference_setLabelStyle;
   o.doListView     = MO.MDuiEditReference_doListView;
   return o;
}
MO.MDuiEditReference_onListClick = function MDuiEditReference_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}
MO.MDuiEditReference_canListView = function MDuiEditReference_canListView(){
   return !MO.Lang.String.isEmpty(this._lovReference) && this._editable;
}
MO.MDuiEditReference_setLabelStyle = function MDuiEditReference_setLabelStyle(){
   var o = this;
   if(!MO.Lang.String.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}
MO.MDuiEditReference_doListView = function MDuiEditReference_doListView(cvs){
   var o = this;
   var v = o._listView;
   if(!v){
      v = o._listView = top.MO.RControl.create(top.MO.FListWindow);
   }
   v.linkConsole = MO.RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
MO.MDuiEditValidator = function MDuiEditValidator(o){
   o = MO.Class.inherits(this, o);
   o._validable = false;
   o._valid     = true;
   o._validText = null;
   o.oeValid    = MO.Method.empty;
   return o;
}
MO.MDuiEditZoom = function MDuiEditZoom(o){
   o = MO.Class.inherits(this, o);
   o._zoomReference = MO.Class.register(o, new MO.APtyString('_zoomReference'));
   o._zoomField     = MO.Class.register(o, new MO.APtyString('_zoomField'));
   o.testZoom       = MO.MDuiEditZoom_testZoom;
   o.doZoom         = MO.MDuiEditZoom_doZoom;
   return o;
}
MO.MDuiEditZoom_testZoom = function MDuiEditZoom_testZoom(){
   return !MO.Lang.String.isEmpty(this._zoomReference);
}
MO.MDuiEditZoom_doZoom = function MDuiEditZoom_doZoom(p){
   MO.RFormSpace.doZoom(this, p);
}
MO.MDuiFocus = function MDuiFocus(o){
   o = MO.Class.inherits(this, o);
   o.onFocus   = MO.Class.register(o, new MO.AEventFocus('onFocus'), MO.MDuiFocus_onFocus);
   o.onBlur    = MO.Class.register(o, new MO.AEventBlur('onBlur'));
   o.testFocus = MO.Method.emptyTrue;
   o.testBlur  = MO.Method.emptyTrue;
   o.doFocus   = MO.Method.empty;
   o.doBlur    = MO.Method.empty;
   o.focus     = MO.MDuiFocus_focus;
   o.blur      = MO.MDuiFocus_blur;
   return o;
}
MO.MDuiFocus_onFocus = function MDuiFocus_onFocus(e){
   MO.Console.find(MO.FDuiFocusConsole).focus(this, e);
}
MO.MDuiFocus_focus = function MDuiFocus_focus(){
   MO.Console.find(MO.FDuiFocusConsole).focus(this);
}
MO.MDuiFocus_blur = function MDuiFocus_blur(){
   MO.Console.find(MO.FDuiFocusConsole).blur(this);
}
MO.MDuiHorizontal = function MDuiHorizontal(o){
   o = MO.Class.inherits(this, o);
   o.setVisible = MO.MDuiHorizontal_setVisible;
   return o;
}
MO.MDuiHorizontal_setVisible = function MDuiHorizontal_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      MO.RHtml.displaySet(h, p);
   }
}
MO.MDuiPopup = function MDuiPopup(o){
   o = MO.Class.inherits(this, o);
   o._opener = null;
   o.opener  = MO.MDuiPopup_opener;
}
MO.MDuiPopup_opener = function MDuiPopup_opener(){
   return this._opener;
}
MO.MDuiSize = function MDuiSize(o){
   o = MO.Class.inherits(this, o);
   o._location       = MO.Class.register(o, new MO.APtyPoint2('_location'));
   o._size           = MO.Class.register(o, new MO.APtySize2('_size'));
   o.construct       = MO.MDuiSize_construct;
   o.dockCd          = MO.MDuiSize_dockCd;
   o.setDockCd       = MO.MDuiSize_setDockCd;
   o.left            = MO.MDuiSize_left;
   o.setLeft         = MO.MDuiSize_setLeft;
   o.top             = MO.MDuiSize_top;
   o.setTop          = MO.MDuiSize_setTop;
   o.location        = MO.MDuiSize_location;
   o.setLocation     = MO.MDuiSize_setLocation;
   o.refreshLocation = MO.MDuiSize_refreshLocation;
   o.width           = MO.MDuiSize_width;
   o.setWidth        = MO.MDuiSize_setWidth;
   o.height          = MO.MDuiSize_height;
   o.setHeight       = MO.MDuiSize_setHeight;
   o.size            = MO.MDuiSize_size;
   o.setSize         = MO.MDuiSize_setSize;
   o.refreshSize     = MO.MDuiSize_refreshSize;
   o.setBounds       = MO.MDuiSize_setBounds;
   o.refreshBounds   = MO.MDuiSize_refreshBounds;
   o.dispose         = MO.MDuiSize_dispose;
   o.innerDump       = MO.MDuiSize_innerDump;
   return o;
}
MO.MDuiSize_construct = function MDuiSize_construct(){
   var o = this;
   o._location = new MO.SPoint2();
   o._size = new MO.SUiSize2();
}
MO.MDuiSize_dockCd = function MDuiSize_dockCd(){
   return this._dockCd;
}
MO.MDuiSize_setDockCd = function MDuiSize_setDockCd(dockCd){
   this._dockCd = dockCd;
}
MO.MDuiSize_left = function MDuiSize_left(){
   return this._location.x;
}
MO.MDuiSize_setLeft = function MDuiSize_setLeft(p){
   this.setLocation(p, null);
}
MO.MDuiSize_top = function MDuiSize_top(){
   return this._location.y;
}
MO.MDuiSize_setTop = function MDuiSize_setTop(p){
   this.setLocation(null, p);
}
MO.MDuiSize_location = function MDuiSize_location(){
   return this._location;
}
MO.MDuiSize_setLocation = function MDuiSize_setLocation(x, y){
   var o = this;
   var hPanel = o.panel(MO.EPanel.Size);
   if(x != null){
      o._location.x = x;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.left = (x == 0) ? null : x + 'px';
      }
   }
   if(y != null){
      o._location.y = y;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.top = (y == 0) ? null : y + 'px';
      }
   }
}
MO.MDuiSize_refreshLocation = function MDuiSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
}
MO.MDuiSize_width = function MDuiSize_width(){
   return this._size.width;
}
MO.MDuiSize_setWidth = function MDuiSize_setWidth(p){
   this.setSize(p, null);
}
MO.MDuiSize_height = function MDuiSize_height(){
   return this._size.width;
}
MO.MDuiSize_setHeight = function MDuiSize_setHeight(p){
   this.setSize(null, p);
}
MO.MDuiSize_size = function MDuiSize_size(){
   return this._size;
}
MO.MDuiSize_setSize = function MDuiSize_setSize(width, height){
   var o = this;
   var hPanel = o.panel(MO.EPanel.Size);
   if(width != null){
      o._size.width = width;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(width != 0){
               hPanel.width = width;
            }
         }else{
            if(MO.Lang.String.contains(width, '%')){
               hPanel.style.width = width;
            }else{
               hPanel.style.width = (width == 0) ? null : width + 'px';
            }
         }
      }
   }
   if(height != null){
      o._size.height = height;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(height != 0){
               hPanel.height = height;
            }
         }else{
            if(MO.Lang.String.contains(height, '%')){
               hPanel.style.height = height;
            }else{
               hPanel.style.height = (height == 0) ? null : height + 'px';
            }
         }
      }
   }
}
MO.MDuiSize_refreshSize = function MDuiSize_refreshSize(){
   var o = this;
   o.setSize(o._size.width, o._size.height);
}
MO.MDuiSize_setBounds = function MDuiSize_setBounds(l, t, w, h){
   var o = this;
   o.setLocation(l, t);
   o.setSize(w, h);
}
MO.MDuiSize_refreshBounds = function MDuiSize_refreshBounds(){
   var o = this;
   o.refreshLocation();
   o.refreshSize();
}
MO.MDuiSize_dispose = function MDuiSize_dispose(){
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
MO.MDuiSize_innerDump = function MDuiSize_innerDump(s, l){
   var o = this;
   s.append('MDuiSize:');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
MO.MDuiSizeable = function MDuiSizeable(o){
   o = MO.Class.inherits(this, o);
   o.isSizeable  = true;
   o.onSize      = null;
   o.inSizeRange = MO.Method.virtual(o, 'inSizeRange');
   o.cursor      = MO.MDuiSizeable_cursor;
   o.setCursor   = MO.MDuiSizeable_setCursor;
   o.resize      = MO.MDuiSizeable_resize;
   o.setBounds   = MO.MDuiSizeable_setBounds;
   o.startDrag   = MO.MDuiSizeable_startDrag;
   o.stopDrag    = MO.MDuiSizeable_stopDrag;
   return o;
}
MO.MDuiSizeable_cursor = function MDuiSizeable_cursor(){
   var o = this;
   var src = MO.Window.source();
   if(!o.inSizeRange(src)){
      return MO.ECursor.Default;
   }
   var hObj = o.panel(MO.EPanel.Border);
   var r = MO.Window.Html.rect(hObj);
   var pos = MO.Window.offsetPos();
   var p = new MO.TPoint(pos.x-r.left, pos.y-r.top);
   while(src){
      p.x += src.offsetLeft + src.clientLeft;
      p.y += src.offsetTop + src.clientTop;
      if(src == hObj){
         break;
      }
      src = src.offsetParent;
   }
   var border = MO.EMoveSize.Border;
   var range = MO.EMoveSize.Range;
   x = p.x;
   y = p.y;
   var right = r.width();
   var bottom = r.height();
   if(x>=0 && x<=range && y>=0 && y<=range){
      return MO.ECursor.NorthWest;
   }else if(x>=0 && x<=range && y>=bottom-range && y<=bottom){
      return MO.ECursor.SouthWest;
   }else if(x>=right-range && x<=right && y>=bottom-range && y<=bottom){
      return MO.ECursor.SouthEast;
   }else if(x>=right-range && x<=right && y>=0 && y<=range){
      return MO.ECursor.NorthEast;
   }else if(x>=0 && x<border && y>range && y<bottom-range){
      return MO.ECursor.West;
   }else if(x>range && x<right-range && y>=bottom-border && y<=bottom){
      return MO.ECursor.South;
   }else if(x>=right-border && x<=right && y>range && y<bottom-range){
      return MO.ECursor.East;
   }else if(x>range && x<right-range && y>=0 && y<border){
      return MO.ECursor.North;
   }
   return ECursor.Default;
}
MO.MDuiSizeable_setCursor = function MDuiSizeable_setCursor(cursor){
   if(!cursor){
      cursor = this.cursor();
   }
   var h = this.panel(MO.EPanel.Size);
   if(h){
      h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
   }
}
MO.MDuiSizeable_resize = function MDuiSizeable_resize(width, height){
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
MO.MDuiSizeable_setBounds = function MDuiSizeable_setBounds(left, top, right, bottom, force){
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
MO.MDuiSizeable_startDrag = function MDuiSizeable_startDrag(){
}
MO.MDuiSizeable_stopDrag = function MDuiSizeable_stopDrag(){
}
MO.MDuiStyle = function MDuiStyle(o){
   o = MO.Class.inherits(this, o);
   o.construct     = MO.Method.empty;
   o.styleName     = MO.MDuiStyle_styleName;
   o.styleIcon     = MO.MDuiStyle_styleIcon;
   o.styleIconPath = MO.MDuiStyle_styleIconPath;
   o.dispose       = MO.Method.empty;
   return o;
}
MO.MDuiStyle_styleName = function MDuiStyle_styleName(n, c){
   var o = this;
   var f = c ? c : o;
   var tn = MO.Class.name(f);
   var t = MO.Class.forName(tn);
   return t.style(n);
}
MO.MDuiStyle_styleIcon = function MDuiStyle_styleIcon(n, c){
   return MO.Class.name(c ? c : this, true) + '_' + n;
}
MO.MDuiStyle_styleIconPath = function MDuiStyle_styleIconPath(n, c){
   return MO.RResource.iconPath(MO.Class.name(c ? c : this, true) + '_' + n);
}
MO.MDuiVertical = function MDuiVertical(o){
   o = MO.Class.inherits(this, o);
   o.setVisible = MO.MDuiVertical_setVisible;
   return o;
}
MO.MDuiVertical_setVisible = function MDuiVertical_setVisible(p){
   var o = this;
   var h = o.hPanelLine;
   if(h){
      MO.Window.Html.displaySet(h, p);
   }
}
MO.MListenerClick = function MListenerClick(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addClickListener     = MO.MListenerClick_addClickListener;
   o.setClickListener     = MO.MListenerClick_setClickListener;
   o.removeClickListener  = MO.MListenerClick_removeClickListener;
   o.processClickListener = MO.MListenerClick_processClickListener;
   return o;
}
MO.MListenerClick_addClickListener = function MListenerClick_addClickListener(owner, method){
   return this.addListener(MO.EEvent.Click, owner, method);
}
MO.MListenerClick_setClickListener = function MListenerClick_setClickListener(owner, method){
   return this.setListener(MO.EEvent.Click, owner, method);
}
MO.MListenerClick_removeClickListener = function MListenerClick_removeClickListener(owner, method){
   return this.removeListener(MO.EEvent.Click, owner, method);
}
MO.MListenerClick_processClickListener = function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Click, p1, p2, p3, p4, p5);
}
MO.MListenerDataChanged = function MListenerDataChanged(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addDataChangedListener     = MO.MListenerDataChanged_addDataChangedListener;
   o.processDataChangedListener = MO.MListenerDataChanged_processDataChangedListener;
   return o;
}
MO.MListenerDataChanged_addDataChangedListener = function MListenerDataChanged_addDataChangedListener(w, m){
   return this.addListener(MO.EEvent.DataChanged, w, m);
}
MO.MListenerDataChanged_processDataChangedListener = function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.DataChanged, p1, p2, p3, p4, p5);
}
MO.MListenerResult = function MListenerResult(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addResultListener     = MO.MListenerResult_addResultListener;
   o.removeResultListener  = MO.MListenerResult_removeResultListener;
   o.processResultListener = MO.MListenerResult_processResultListener;
   o.clearResultListeners  = MO.MListenerResult_clearResultListeners;
   return o;
}
MO.MListenerResult_addResultListener = function MListenerResult_addResultListener(owner, method){
   return this.addListener(MO.EEvent.Result, owner, method);
}
MO.MListenerResult_removeResultListener = function MListenerResult_removeResultListener(owner, method){
   return this.removeListener(MO.EEvent.Result, owner, method);
}
MO.MListenerResult_processResultListener = function MListenerResult_processResultListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Result, p1, p2, p3, p4, p5);
}
MO.MListenerResult_clearResultListeners = function MListenerResult_clearResultListeners(){
   return this.clearListeners(MO.EEvent.Result);
}
MO.MListenerSelected = function MListenerSelected(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   o.addSelectedListener     = MO.MListenerSelected_addSelectedListener;
   o.processSelectedListener = MO.MListenerSelected_processSelectedListener;
   return o;
}
MO.MListenerSelected_addSelectedListener = function MListenerSelected_addSelectedListener(w, m){
   return this.addListener(MO.EEvent.Selected, w, m);
}
MO.MListenerSelected_processSelectedListener = function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
   this.processListener(MO.EEvent.Selected, p1, p2, p3, p4, p5);
}
MO.SServiceInfo = function SServiceInfo(){
   var o = this;
   o.service = null;
   o.action  = null;
   o.url     = null;
   return o;
}
MO.SUiSize2 = function SUiSize2(width, height){
   var o = this;
   MO.SSize2.call(o, width, height);
   o.parse = MO.SUiSize2_parse;
   return o;
}
MO.SUiSize2_parse = function SUiSize2_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 2){
      var width = items[0];
      if(MO.Lang.String.contains(width, '%')){
         o.width = width;
      }else{
         o.width = parseInt(width);
      }
      var height = items[1];
      if(MO.Lang.String.contains(height, '%')){
         o.height = height;
      }else{
         o.height = parseInt(height);
      }
   }else{
      throw new MO.TError(o, "Parse value failure. (value={1})", items);
   }
}
MO.TDatasetFetchArg = function TDatasetFetchArg(o){
   if(!o){o = this;}
   o.datasets   = new MO.TDictionary();
   o.saveConfig = MO.TDatasetFetchArg_saveConfig;
   o.process    = MO.TDatasetFetchArg_process;
   return o;
}
MO.TDatasetFetchArg_saveConfig = function TDatasetFetchArg_saveConfig(p){
   var o = this;
   p.set('name', o.name);
}
MO.TDatasetFetchArg_process = function TDatasetFetchArg_process(){
   var o = this;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}
MO.TDatasetFetchArg_push = function TDatasetFetchArg_push(v){
   var o = this;
   if(RClass.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(RClass.isClass(v, TOrderItem)){
      o.orders.push(v);
   }
}
MO.TDatasetFetchArg_invoke = function TDatasetFetchArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
MO.TEvent = function TEvent(owner, code, proc){
   var o = this;
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   o.onProcess = proc;
   o.isBefore  = MO.TEvent_isBefore;
   o.isAfter   = MO.TEvent_isAfter;
   o.process   = MO.TEvent_process;
   o.dump      = MO.TEvent_dump;
   return o;
}
MO.TEvent_isBefore = function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}
MO.TEvent_isAfter = function TEvent_isAfter(){
   return (EEventType.After == this.type);
}
MO.TEvent_process = function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={1})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}
MO.TEvent_dump = function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
MO.TEventProcess = function TEventProcess(po, pm, pc){
   var o = this;
   o.owner    = po;
   o.invoke   = pm;
   o.clazz    = MO.Class.name(pc);
   o.invokeCd = MO.EEventInvoke.Unknown;
   o.isBefore = MO.TEventProcess_isBefore;
   o.isAfter  = MO.TEventProcess_isAfter;
   o.dispose  = MO.TEventProcess_dispose;
   o.dump     = MO.TEventProcess_dump;
   return o;
}
MO.TEventProcess_isBefore = function TEventProcess_isBefore(){
   return this.invokeCd == MO.EEventInvoke.Before;
}
MO.TEventProcess_isAfter = function TEventProcess_isAfter(){
   return this.invokeCd == MO.EEventInvoke.After;
}
MO.TEventProcess_dispose = function TEventProcess_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}
MO.TEventProcess_dump = function TEventProcess_dump(){
   var o = this;
   return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
}
MO.THtmlEvent = function THtmlEvent(){
   var o = this;
   o.linker  = null;
   o.events  = new Object();
   o.push    = MO.THtmlEvent_push;
   o.dispose = MO.THtmlEvent_dispose;
   o.dump    = MO.THtmlEvent_dump;
   return o;
}
MO.THtmlEvent_push = function THtmlEvent_push(pn, pe){
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
MO.THtmlEvent_dispose = function THtmlEvent_dispose(){
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
MO.THtmlEvent_dump = function THtmlEvent_dump(){
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
MO.THtmlEvent_load = function THtmlEvent_load(e){
   var o = this;
   o.ctrlKey = e.ctrlKey;
   o.keyCode = e.keyCode;
}
MO.TOrderItem = function TOrderItem(o){
   var o = this;
   return o;
}
MO.TOrderItem_set = function TOrderItem_set(n, t){
   var o = this;
   o.name = n;
   o.type = t;
}
MO.TOrderItem_toNode = function TOrderItem_toNode(){
   var o = this;
   var n = new MO.TNode('OrderItem');
   n.set('name', o.name);
   n.set('type', o.type);
   return n;
}
MO.TOrderItem_pack = function TOrderItem_pack(){
   var o = this;
   var as = new MO.TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   return as.pack();
}
MO.TOrderItem_unpack = function TOrderItem_unpack(s){
   var o = this;
   var as = new MO.TAttributes();
   as.unpack(s);
   o.name = as.get("name");
   o.type = as.get("type");
}
MO.TOrderItems = function TOrderItems(){
   var o = this;
   MO.TObjects.call(o);
}
MO.TOrderItems_pack = function TOrderItems_pack(){
   var o = this;
   var ts = new MO.TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
MO.TOrderItems_unpack = function TOrderItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new MO.TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TOrderItem();
      ti.unpack(t);
      o.push(ti);
   }
}
MO.TSearchItem = function TSearchItem(){
   var o = this;
   return o;
}
MO.TSearchItem_set = function TSearchItem_set(n, v, t, f){
   var o = this;
   o.name  = n;
   o.type  = MO.Lang.String.nvl(t, MO.ESearch.Equals);
   o.value = v;
   o.format = f;
}
MO.TSearchItem_toNode = function TSearchItem_toNode(){
   var o = this;
   var n = new MO.TNode('SearchItem');
   n.set('name', o.name);
   n.set('type', o.type);
   n.set('value', o.value);
   n.set('format', o.format);
   return n;
}
MO.TSearchItem_equals = function TSearchItem_equals(s){
   var o = this;
   if(o.name == s.name && o.type == s.type && o.value == s.value){
	   return true;
   }
   return false;
}
MO.TSearchItem_pack = function TSearchItem_pack(){
   var o = this;
   var as = new MO.TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   as.set("value", o.value);
   as.set("format", o.format);
   return as.pack();
}
MO.TSearchItem_unpack = function TSearchItem_unpack(s){
   var o = this;
   var as = new MO.TAttributes();
   as.unpack(s);
   o.name  = as.get("name");
   o.type  = as.get("type");
   o.value = as.get("value");
   o.format = as.get("format");
}
MO.TSearchItems = function TSearchItems(){
   var o = this;
   MO.TObjects.call(o);
}
MO.TSearchItems_pack = function TSearchItems_pack(){
   var o = this;
   var ts = new MO.TStrings();
   var len = o.count;
   for(var n = 0; n < len; n++){
      var s = o.get(n).pack();
      ts.push(s);
   }
   return ts.pack();
}
MO.TSearchItems_removeAll = function TSearchItems_removeAll(v){
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
MO.TSearchItems_unpack = function TSearchItems_unpack(p){
   var o = this;
   o.clear();
   var ts = new MO.TStrings();
   ts.unpack(p);
   for(var n = 0; n < ts.count; n++){
      t = ts.get(n);
      var ti = new TSearchItem();
      ti.unpack(t);
      if(!MO.Lang.String.isEmpty(ti.name)){
         o.push(ti);
      }
      else{
         o.clear();
         MO.RMessage.fatal(this, 'unpack', 'Invalid value (value={1})', p);
      }
   }
}
MO.FDuiCanvas = function FDuiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._styleCanvas = MO.Class.register(o, new MO.AStyle('_styleCanvas'));
   o.onBuildPanel = MO.FDuiCanvas_onBuildPanel;
   o.construct    = MO.FDuiCanvas_construct;
   o.dispose      = MO.FDuiCanvas_dispose;
   return o;
}
MO.FDuiCanvas_onBuildPanel = function FDuiCanvas_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'CANVAS', o.styleName('Canvas'));
}
MO.FDuiCanvas_construct = function FDuiCanvas_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}
MO.FDuiCanvas_dispose = function FDuiCanvas_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiComponent = function FDuiComponent(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MUiComponent, MO.MProperty, MO.MClone);
   o.dispose = MO.FDuiComponent_dispose;
   return o;
}
MO.FDuiComponent_dispose = function FDuiComponent_dispose(){
   var o = this;
   o.__base.MUiComponent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
MO.FDuiContainer = function FDuiContainer(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MDuiContainer);
   o._scrollCd           = MO.Class.register(o, new MO.APtyEnum('_scrollCd', null, MO.EUiScroll, MO.EUiScroll.None));
   o._controls           = null;
   o.oeDesign            = MO.Method.empty;
   o.construct           = MO.FDuiContainer_construct;
   o.hasControl          = MO.FDuiContainer_hasControl;
   o.findControl         = MO.FDuiContainer_findControl;
   o.searchControl       = MO.FDuiContainer_searchControl;
   o.controls            = MO.FDuiContainer_controls;
   o.panel               = MO.FDuiContainer_panel;
   o.focusFirstControl   = MO.FDuiContainer_focusFirstControl;
   o.setControlsProperty = MO.FDuiContainer_setControlsProperty;
   o.storeConfig         = MO.FDuiContainer_storeConfig;
   o.push                = MO.FDuiContainer_push;
   o.remove              = MO.FDuiContainer_remove;
   o.clear               = MO.FDuiContainer_clear;
   o.dispose             = MO.FDuiContainer_dispose;
   return o;
}
MO.FDuiContainer_construct = function FDuiContainer_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}
MO.FDuiContainer_hasControl = function FDuiContainer_hasControl(){
   var cs = this._controls;
   return cs ? !cs.isEmpty() : false;
}
MO.FDuiContainer_findControl = function FDuiContainer_findControl(p){
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
MO.FDuiContainer_searchControl = function FDuiContainer_searchControl(p){
   var o = this;
   var cs = o._controls;
   if(cs){
      var cc = cs.count();
      for(var i = 0; i < cc; i++){
         var c = cs.value(i);
         if(c.name() == p){
            return c;
         }
         if(MO.Class.isClass(c, MO.FDuiContainer)){
            var f = c.searchControl(p);
            if(f){
               return f;
            }
         }
      }
   }
   return null;
}
MO.FDuiContainer_controls = function FDuiContainer_controls(){
   var o = this;
   var r = o._controls;
   if(r == null){
      r = new MO.TDictionary();
      o._controls = r;
   }
   return r;
}
MO.FDuiContainer_panel = function FDuiContainer_panel(t){
   var o = this;
   if(t == MO.EPanel.Container){
      return o._hPanel;
   }
   return o.__base.FDuiControl.panel.call(o, t);
}
MO.FDuiContainer_focusFirstControl = function FDuiContainer_focusFirstControl(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var p = cs.valueAt(i);
         if(MO.Class.isClass(c, MO.MDuiFocus) && c.testFocus()){
            if(!MO.Class.isClass(c, MO.FCalendar) && !MO.Class.isClass(c, MO.FSelect)  && !MO.Class.isClass(c, MO.FNumber)){
                return c.focus();
            }
         }
      }
      MO.Console.find(MO.FFocusConsole).focus(o);
   }
}
MO.FDuiContainer_setControlsProperty = function FDuiContainer_setControlsProperty(p, vs){
   var o = this;
   var cs = o._controls;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var c = cs.value(i);
         c[p] = vs[n];
      }
   }
}
MO.FDuiContainer_storeConfig = function FDuiContainer_storeConfig(x){
   var o = this;
   x.name = MO.Class.name(o);
   o.saveConfig(x);
   var ps = o._components;
   if(ps){
      var c = ps.count();
      for(var i = 0; i < c; i++){
         var p = ps.value(i);
         var xp = x.create(MO.Class.name(p));
         if(MO.Class.isClass(p, MO.FDuiContainer)){
            p.storeConfig(xp);
         }else{
            p.saveConfig(xp);
         }
      }
   }
}
MO.FDuiContainer_push = function FDuiContainer_push(p){
   var o = this;
   o.__base.FDuiControl.push.call(o, p);
   if(MO.Class.isClass(p, MO.FDuiControl)){
      o.controls().set(p._name, p);
      o.appendChild(p);
   }
}
MO.FDuiContainer_remove = function FDuiContainer_remove(component){
   var o = this;
   if(MO.Class.isClass(component, MO.FDuiControl)){
      var controls = o._controls;
      if(!controls.contains(component.name())){
         throw new MO.TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      controls.removeValue(component);
      o.removeChild(component);
   }
   o.__base.FDuiControl.remove.call(o, component);
}
MO.FDuiContainer_clear = function FDuiContainer_clear(){
   var o = this;
   var s = o._controls;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         o.removeChild(s.at(i));
      }
      s.clear();
   }
   o.__base.FDuiControl.clear.call(o);
}
MO.FDuiContainer_dispose = function FDuiContainer_dispose(){
   var o = this;
   var v = o._controls;
   if(v){
      v.dispose();
      o._controls = null;
   }
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiControl = function FDuiControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiComponent, MO.MUiControl, MO.MListener, MO.MUiMargin, MO.MUiPadding, MO.MDuiSize, MO.MDuiStyle);
   o._foreColor     = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')]);
   o._foreFont      = MO.Class.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor     = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backFont      = MO.Class.register(o, [new MO.APtyString('_backFont'), new MO.AGetSet('_backFont')]);
   o._wrapCd        = MO.Class.register(o, [new MO.APtyEnum('_wrapCd', null, MO.EUiWrap, MO.EUiWrap.NextLine), new MO.AGetSet('_wrapCd')]);
   o._stylePanel    = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._layoutCd      = MO.EUiLayout.Display;
   o._sizeCd        = MO.EUiSize.Normal;
   o._statusVisible = true;
   o._statusEnable  = true;
   o._statusBuild   = false;
   o._statusBuilded = false;
   o._storage       = null;
   o._hParent       = null;
   o._hPanel        = null;
   o.onEnter        = MO.Class.register(o, new MO.AEventMouseEnter('onEnter'), MO.FDuiControl_onEnter);
   o.onLeave        = MO.Class.register(o, new MO.AEventMouseLeave('onLeave'), MO.FDuiControl_onLeave);
   o.onBuildPanel   = MO.FDuiControl_onBuildPanel;
   o.onBuild        = MO.FDuiControl_onBuild;
   o.onBuilded      = MO.Method.empty;
   o.oeMode         = MO.FDuiControl_oeMode;
   o.construct      = MO.FDuiControl_construct;
   o.topControl     = MO.FDuiControl_topControl;
   o.panel          = MO.FDuiControl_panel;
   o.isVisible      = MO.FDuiControl_isVisible;
   o.setVisible     = MO.FDuiControl_setVisible;
   o.show           = MO.FDuiControl_show;
   o.hide           = MO.FDuiControl_hide;
   o.isEnable       = MO.FDuiControl_isEnable;
   o.setEnable      = MO.FDuiControl_setEnable;
   o.enable         = MO.FDuiControl_enable;
   o.disable        = MO.FDuiControl_disable;
   o.setMargin      = MO.FDuiControl_setMargin;
   o.refreshMargin  = MO.FDuiControl_refreshMargin;
   o.setPadding     = MO.FDuiControl_setPadding;
   o.refreshPadding = MO.FDuiControl_refreshPadding;
   o.attachEvent    = MO.FDuiControl_attachEvent;
   o.linkEvent      = MO.FDuiControl_linkEvent;
   o.callEvent      = MO.FDuiControl_callEvent;
   o.psMode         = MO.FDuiControl_psMode;
   o.psDesign       = MO.FDuiControl_psDesign;
   o.isBuild        = MO.FDuiControl_isBuild;
   o.build          = MO.FDuiControl_build;
   o.builded        = MO.FDuiControl_builded;
   o.refresh        = MO.FDuiControl_refresh;
   o.setPanel       = MO.FDuiControl_setPanel;
   o.dispose        = MO.FDuiControl_dispose;
   return o;
}
MO.FDuiControl_onEnter = function FDuiControl_onEnter(e){
   var o = this;
   MO.Console.find(MO.FDuiFocusConsole).enter(o);
   if(o._hint){
      MO.RWindow.setStatus(o._hint);
   }
}
MO.FDuiControl_onLeave = function FDuiControl_onLeave(e){
   var o = this;
   MO.Console.find(MO.FDuiFocusConsole).leave(o);
   if(o._hint){
      MO.RWindow.setStatus();
   }
}
MO.FDuiControl_onBuildPanel = function FDuiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(p, o.styleName('Panel'));
}
MO.FDuiControl_onBuild = function FDuiControl_onBuild(p){
   var o = this;
   o.onBuildPanel(p);
   if(o._statusVisible != o._visible){
      o.setVisible(o._visible);
   }
   var h = o._hPanel;
   MO.RHtml.linkSet(h, 'control', o);
   o.attachEvent('onEnter', h);
   o.attachEvent('onLeave', h);
   o.refreshBounds();
   o.refreshPadding();
   o.refreshMargin();
}
MO.FDuiControl_oeMode = function FDuiControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return MO.EEventStatus.Continue;
}
MO.FDuiControl_construct = function FDuiControl_construct(){
   var o = this;
   o.__base.FDuiComponent.construct.call(o);
   o.__base.MDuiSize.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MDuiStyle.construct.call(o);
}
MO.FDuiControl_topControl = function FDuiControl_topControl(c){
   var r = this;
   if(c){
      while(r._parent){
         if(MO.Class.isClass(r._parent, c)){
            return r._parent;
         }
         r = r._parent;
      }
      if(!MO.Class.isClass(r, c)){
         return null;
      }
   }else{
      while(r._parent){
         if(!MO.Class.isClass(r._parent, FDuiControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
MO.FDuiControl_panel = function FDuiControl_panel(p){
   var o = this;
   switch(p){
      case MO.EPanel.Parent:
         return o._hParent;
      case MO.EPanel.Container:
      case MO.EPanel.Size:
         return o._hPanel;
   }
   return null;
}
MO.FDuiControl_isVisible = function FDuiControl_isVisible(){
   return this._statusVisible;
}
MO.FDuiControl_setVisible = function FDuiControl_setVisible(p){
   var o = this;
   o._statusVisible = p;
   var h = o.panel(MO.EPanel.Container);
   if(h){
      MO.RHtml.visibleSet(h, p);
   }
}
MO.FDuiControl_show = function FDuiControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
MO.FDuiControl_hide = function FDuiControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
MO.FDuiControl_isEnable = function FDuiControl_isEnable(){
   return this._statusEnable;
}
MO.FDuiControl_setEnable = function FDuiControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
MO.FDuiControl_enable = function FDuiControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
MO.FDuiControl_disable = function FDuiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
MO.FDuiControl_setMargin = function FDuiControl_setMargin(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(MO.EPanel.Container);
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.marginLeft = (left == 0) ? null : left + 'px';
      }
   }
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.marginTop = (top == 0) ? null : top + 'px';
      }
   }
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.marginRight = (right == 0) ? null : right + 'px';
      }
   }
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}
MO.FDuiControl_refreshMargin = function FDuiControl_refreshMargin(){
   var o = this;
   var p = o._margin;
   o.setMargin(p.left, p.top, p.right, p.bottom);
}
MO.FDuiControl_setPadding = function FDuiControl_setPadding(left, top, right, bottom){
   var o = this;
   var padding = o._padding;
   var hPanel = o.panel(MO.EPanel.Container);
   var hStyle = null;
   if(hPanel && !hPanel.__fragment){
      hStyle = hPanel.style;
   }
   if(left != null){
      padding.left = left;
      if(hStyle){
         hStyle.paddingLeft = (left == 0) ? null : left + 'px';
      }
   }
   if(top != null){
      padding.top = top;
      if(hStyle){
         hStyle.paddingTop = (top == 0) ? null : top + 'px';
      }
   }
   if(right != null){
      padding.right= right;
      if(hStyle){
         hStyle.paddingRight = (right == 0) ? null : right + 'px';
      }
   }
   if(bottom != null){
      padding.bottom = bottom;
      if(hStyle){
         hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
      }
   }
}
MO.FDuiControl_refreshPadding = function FDuiControl_refreshPadding(){
   var o = this;
   var p = o._padding;
   o.setPadding(p.left, p.top, p.right, p.bottom);
}
MO.FDuiControl_attachEvent = function FDuiControl_attachEvent(n, h, m, u){
   return MO.RDuiControl.attachEvent(this, n, h, m, u);
}
MO.FDuiControl_linkEvent = function FDuiControl_linkEvent(t, n, h, m){
   return MO.RDuiControl.linkEvent(this, t, n, h, m);
}
MO.FDuiControl_callEvent = function FDuiControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
MO.FDuiControl_psMode = function FDuiControl_psMode(p){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeMode', MO.FDuiControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
MO.FDuiControl_psDesign = function FDuiControl_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   var e = new MO.TEventProcess(o, 'oeDesign', MO.MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
MO.FDuiControl_isBuild = function FDuiControl_isBuild(){
   return this._statusBuild;
}
MO.FDuiControl_build = function FDuiControl_build(p){
   var o = this;
   if(o._statusBuild){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   var d = null;
   if(p.createElement){
      d = p;
   }else if(p.ownerDocument && p.ownerDocument.createElement){
      d = p.ownerDocument;
   }else if(p.hDocument){
      d = p.hDocument;
   }else{
      throw new MO.TError("Build document is invalid. (document={1})", p);
   }
   var a = new MO.SArguments();
   a.owner = o;
   a.hDocument = d;
   o.onBuild(a);
   a.owner = null;
   a.hDocument = null;
   MO.Lang.Object.free(a);
   o._statusBuild = true;
}
MO.FDuiControl_builded = function FDuiControl_builded(p){
   var o = this;
   if(!o._statusBuild){
      throw new MO.TError(o, 'Current control is not build.');
   }
   if(o._statusBuilded){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   o.onBuilded(p);
   o._statusBuilded = true;
}
MO.FDuiControl_refresh = function FDuiControl_refresh(){
   var o = this;
   if(!o._statusBuild){
      throw new MO.TError(o, 'Current control is not build.');
   }
}
MO.FDuiControl_setPanel = function FDuiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}
MO.FDuiControl_dispose = function FDuiControl_dispose(){
   var o = this;
   o._disable = null;
   o._wrapCd = null;
   o._hint = null;
   o._styleContainer = null;
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   o._hParent = null;
   o._hPanel = MO.RHtml.free(o._hPanel);
   o.__base.MDuiStyle.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MDuiSize.dispose.call(o);
   o.__base.MUiControl.dispose.call(o);
   o.__base.FDuiComponent.dispose.call(o);
}
MO.FDuiWorkspace = function FDuiWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._frames      = null;
   o._hContainer  = null;
   o.onBuildPanel = MO.FDuiWorkspace_onBuildPanel;
   o.appendChild  = MO.FDuiWorkspace_appendChild;
   return o;
}
MO.FDuiWorkspace_onBuildPanel = function FDuiWorkspace_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(event, o.styleName('Panel'));
}
MO.FDuiWorkspace_appendChild = function FDuiWorkspace_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FDuiFrameSet)){
      o._hPanel.appendChild(control._hPanel);
   }else{
      throw new MO.TError(o, 'Unknown child type.');
   }
}
MO.RDuiControl = function RDuiControl(){
   var o = this;
   o.PREFIX    = 'FDui';
   o.inMoving  = false;
   o.inSizing  = false;
   o.inDesign  = false;
   o.instances = new MO.TObjects();
   o.events    = new MO.TMap();
   o.controls  = new MO.TMap();
   return o;
}
MO.RDuiControl.prototype.newInstance = function RDuiControl_newInstance(p){
   var o = this;
   var r = null;
   if(p){
      var n = null
      var tn = null;
      if(p.constructor == String){
         if(!RString.startsWith(p, o.PREFIX)){
            n = o.PREFIX + p;
         }
      }else if(p.constructor == MO.TXmlNode){
         n = p.get('type');
         if(MO.Lang.String.isEmpty(n)){
            n = p.name();
            if(!MO.Lang.String.startsWith(n, o.PREFIX)){
               n = o.PREFIX + n;
            }
         }else{
            tn = n;
         }
      }else{
         throw new TError(o, 'Unknown parameter. (name={p})', p);
      }
      r = MO.Class.create(n);
      if(tn){
         r.__typed = true;
      }
   }
   if(r == null){
      throw new MO.TError(o, 'Create instance failure. (name={p})', p);
   }
   return r;
}
MO.RDuiControl.prototype.attachEvent = function RDuiControl_attachEvent(c, n, h, m, u){
   var o = this;
   var e = null;
   var p = c[n];
   if(!MO.Method.isEmpty(p) || m){
      var cz = MO.Class.find(c.constructor);
      var a = cz.annotation(MO.EAnnotation.Event, n);
      e = a.create();
      e.annotation = a;
      e.source = c;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = MO.RDuiEvent.onProcess;
      MO.RDuiEvent.find(h).push(a.linker(), e);
      MO.RHtml.linkSet(h, '_plink', c);
      a.bind(h, u);
   }
   return e;
}
MO.RDuiControl.prototype.innerCreate = function RDuiControl_innerCreate(pc, px, pa){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(MO.Class.isClass(pc, MO.MProperty)){
      pc.propertyLoad(px)
   }
   if(MO.Class.isClass(pc, MO.MDuiContainer) && px.hasNode()){
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
MO.RDuiControl.prototype.create = function RDuiControl_create(pc, px, pa){
   var o = this;
   var c = null;
   if(pc){
      c = pc;
   }else{
      c = MO.RDuiControl.newInstance(px.name());
   }
   o.innerCreate(c, px, pa);
   return c;
}
MO.RDuiControl.prototype.innerbuild = function RDuiControl_innerbuild(pr, pc, px, pa, ph){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(MO.Class.isClass(pc, MO.MProperty)){
      pc.propertyLoad(px);
   }
   var l = px.get('linker');
   if(l && pr){
      pr[l] = pc;
   }
   if(MO.Class.isClass(pc, MO.FDuiControl)){
      if(!pc.isBuild()){
         pc.build(ph);
      }else{
         pc.refresh();
      }
   }
   if(pc.__typed){
      pr = pc;
   }
   if(MO.Class.isClass(pc, MO.MDuiContainer) && px.hasNode()){
      var ns = px.nodes();
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         var n = ns.get(i);
         var c = pc.createChild(n);
         if(!c){
            throw new MO.TError('Invalid create child.');
         }
         o.innerbuild(pr, c, n, pa, ph);
         pc.push(c);
      }
   }
   if(MO.Class.isClass(pc, MO.FDuiControl)){
      pc.builded(ph);
   }
}
MO.RDuiControl.prototype.build = function RDuiControl_build(c, x, a, h){
   var o = this;
   if(!c){
      c = MO.RDuiControl.newInstance(x);
   }
   o.innerbuild(c, c, x, a, h);
   return c;
}
MO.RDuiControl.prototype.setStyleScroll = function RDuiControl_setStyleScroll(h, c){
   var s = h.style;
   switch(c){
      case MO.EUiScroll.None:
         s.overflowX = '';
         s.overflowY = '';
         break;
      case MO.EUiScroll.Horizontal:
         s.overflowX = 'scroll';
         break;
      case MO.EUiScroll.HorizontalAuto:
         s.overflowX = 'auto';
         break;
      case MO.EUiScroll.Vertical:
         s.overflowY = 'scroll';
         break;
      case MO.EUiScroll.VerticalAuto:
         s.overflowY = 'auto';
         break;
      case MO.EUiScroll.Both:
         s.overflow = 'scroll';
         break;
      case MO.EUiScroll.BothAuto:
         s.overflow = 'auto';
         break;
      default:
         throw new MO.TError(o, 'Unknown scroll type. (scroll_cd={1})', c);
   }
}
MO.RDuiControl.prototype.linkEvent = function RDuiControl_linkEvent(tc, sc, n, h, m){
   var o = this;
   var p = tc[n];
   if(!RMethod.isEmpty(p) || m){
      var cz = RClass.find(c.constructor);
      var a = cz.annotation(MO.EAnnotation.Event, n);
      var e = new a.constructor();
      e.name = a.name;
      e.source = tc;
      e.sender = sc;
      e.hSource = h;
      e.ohProcess = m;
      e.onProcess = p;
      e.process = RDuiEvent.onProcess;
      RDuiEvent.find(h).push(e.type, e);
      h[e.handle] = RDuiEvent.ohEvent;
      RHtml.linkSet(h, '_plink', tc);
      return e;
   }
}
MO.RDuiControl.prototype.find = function RDuiControl_find(c){
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
MO.RDuiControl.prototype.fromNode = function RDuiControl_fromNode(x, h){
   if(x){
      return this.create(x, h);
   }
}
MO.RDuiControl.prototype.fromXml = function RDuiControl_fromXml(xml, hPanel, mode){
   var c = null;
   var x = RXml.makeNode(xml);
   if(x){
      c = this.create(x, hPanel, mode);
   }
   return c;
}
MO.RDuiControl.prototype.toNode = function RDuiControl_toNode(){
}
MO.RDuiControl.prototype.toXml = function RDuiControl_toXml(){
}
MO.RDuiControl.prototype.store = function RDuiControl_store(o, type){
   var x = new TNode();
   x.name = RClass.name(o).substr(1);
   if(RClass.isClass(o, FContainer)){
      o.storeConfig(x);
   }else{
      o.saveConfig(x);
   }
   return x;
}
MO.RDuiControl.prototype.htmlControl = function RDuiControl_htmlControl(e, c){
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
MO.RDuiControl.prototype.psDesign = function RDuiControl_psDesign(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psDesign(action, mode, flag, params);
      }
   }
}
MO.RDuiControl.prototype.psMode = function RDuiControl_psMode(action, mode, flag, params){
   var cs = this.instances;
   if(cs && cs.count){
      var l = cs.count;
      for(var n=0; n<l; n++){
         cs.get(n).psMode(action, mode, flag, params);
      }
   }
}
MO.RDuiControl.prototype.isInfo = function RDuiControl_isInfo(v){
   return v ? (0 == v.indexOf('C#')) : false;
}
MO.RDuiControl.prototype.isGroup = function RDuiControl_isGroup(v){
   return v ? (0 == v.indexOf('G#')) : false;
}
MO.RDuiControl = new MO.RDuiControl();
MO.Dui.Control = MO.RDuiControl;
MO.RDuiEvent = function RDuiEvent(){
   var o = this;
   o._objects  = new Array();
   o.current   = 0;
   o.events    = new Array();
   return o;
}
MO.RDuiEvent.prototype.ohEvent = function RDuiEvent_ohEvent(e){
   MO.RDuiEvent.process(this, e ? e : window.event);
}
MO.RDuiEvent.prototype.onProcess = function RDuiEvent_onProcess(e){
   var e = this;
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
}
MO.RDuiEvent.prototype.find = function RDuiEvent_find(p){
   var u = MO.RHtml.uid(p);
   var es = this._objects;
   var e = es[u];
   if(e == null){
      e = es[u] = new MO.THtmlEvent();
      e.linker = p;
   }
   return e;
}
MO.RDuiEvent.prototype.process = function RDuiEvent_process(hs, he){
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
            e.source = MO.RHtml.linkGet(hs, '_plink');
            e.hSender = MO.RHtml.eventSource(he);
            e.sender = e.hSender._plinker;
            e.hSource = hs;
            ea.attach(e, he);
            if(e.ohProcess){
               e.ohProcess.call(e.source, e);
            }else if(e.onProcess){
               MO.Console.find(MO.FDuiFrameEventConsole).push(e);
            }
         }
         return true;
      }
   }
   return false;
}
MO.RDuiEvent.prototype.release = function RDuiEvent_release(){
   var o = this;
   var v = o._objects;
   if(v){
      MO.RMemory.free(v);
      o._objects = null;
   }
}
MO.RDuiEvent.prototype.nvl = function RDuiEvent_nvl(event, sender, code){
   if(!event){
      event = new MO.TEvent();
   }
   event.sender = sender;
   event.code = code;
   return event;
}
MO.RDuiEvent.prototype.alloc = function RDuiEvent_alloc(s, c){
   var e = null;
   var es = this.events;
   for(var n=0; n<es.length; n++){
      if(!es[n].inUsing){
         e = es[n];
         break;
      }
   }
   if(!e){
      e = es[es.length] = new MO.TEvent();
   }
   e.inUsing = true;
   e.sender = s;
   e.code = c;
   return e;
}
MO.RDuiEvent.prototype.free = function RDuiEvent_free(e){
   e.inUsing = false;
}
MO.RDuiEvent = new MO.RDuiEvent();
MO.RDuiLayer = function RDuiLayer(){
   var o = this;
   o._layers = new Array();
   return o;
}
MO.RDuiLayer.prototype.next = function RDuiLayer_next(p){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, EUiLayer.Default);
   var c = MO.Lang.Integer.nvl(o._layers[n], n);
   o._layers[n] = ++c;
   return c;
}
MO.RDuiLayer.prototype.free = function RDuiLayer_free(p, l){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, EUiLayer.Default);
   var c = MO.Lang.Integer.nvl(o._layers[n], n);
   --c;
   if(c > n){
      o._layers[n] = c;
   }
   return c;
}
MO.RDuiLayer = new MO.RDuiLayer();
MO.RDuiService = function RDuiService(){
   var o = this;
   o._services = new MO.TDictionary();
   return o;
}
MO.RDuiService.prototype.url = function RDuiService_url(p){
   if(MO.Lang.String.startsWith(p, 'http://')){
      return p;
   }
   if(MO.Lang.String.startsWith(p, '#')){
      return p.substr(1);
   }
   if(!MO.Lang.String.startsWith(p, '/')){
      p = '/' + p;
   }
   return p + '.ws';
}
MO.RDuiService.prototype.makeUrl = function RDuiService_makeUrl(s, a){
   return this.url(s) + '?action=' + a;
}
MO.RDuiService.prototype.parse = function RDuiService_parse(p){
   var o = this;
   var s = null;
   var ss = o._services;
   if(p){
      s = ss.get(p);
      if(s == null){
         var ps = p.split('@');
         if(ps.length == 1){
            if(ps[0]){
               s = new MO.SServiceInfo();
               s.service = ps[0];
               s.action = null;
               s.url = o.url(ps[0]);
            }
         }else if(ps.length == 2){
            if(ps[0] && ps[1]){
               s = new MO.SServiceInfo();
               s.service = ps[1];
               s.action = ps[0];
               s.url = o.url(ps[1]) + '?action=' + ps[0];
            }
         }
      }
      if(s == null){
         throw new MO.TError(o, 'Unknown service format. (source={1})', p);
      }
      ss.set(p, s);
   }
   return s;
}
MO.RDuiService = new MO.RDuiService();
MO.FDuiConfirmDialog = function FDuiConfirmDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.ConfirmDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiConfirmDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiConfirmDialog_onConfirmClick;
   o.onCancelClick         = MO.FDuiConfirmDialog_onCancelClick;
   o.construct             = MO.FDuiConfirmDialog_construct;
   o.setText               = MO.FDuiConfirmDialog_setText;
   o.dispose               = MO.FDuiConfirmDialog_dispose;
   return o;
}
MO.FDuiConfirmDialog_onBuilded = function FDuiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
MO.FDuiConfirmDialog_onConfirmClick = function FDuiConfirmDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiConfirmDialog_onCancelClick = function FDuiConfirmDialog_onCancelClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Cancel;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiConfirmDialog_construct = function FDuiConfirmDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiConfirmDialog_setText = function FDuiConfirmDialog_setText(value){
   this._controlText.set(value);
}
MO.FDuiConfirmDialog_dispose = function FDuiConfirmDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiDescribeFrameConsole = function FDuiDescribeFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Global;
   o._service       = 'cloud.describe.frame';
   o._defines       = null;
   o.lsnsLoaded     = null;
   o.construct      = MO.FDuiDescribeFrameConsole_construct;
   o.load           = MO.FDuiDescribeFrameConsole_load;
   o.events         = null;
   o.formId         = 0;
   o.createFromName = MO.FDuiDescribeFrameConsole_createFromName;
   o.loadNode       = MO.FDuiDescribeFrameConsole_loadNode;
   o.loadService    = MO.FDuiDescribeFrameConsole_loadService;
   o.nextFormId     = MO.FDuiDescribeFrameConsole_nextFormId;
   o.get            = MO.FDuiDescribeFrameConsole_get;
   o.find           = MO.FDuiDescribeFrameConsole_find;
   o.getLov         = MO.FDuiDescribeFrameConsole_getLov;
   o.findLov        = MO.FDuiDescribeFrameConsole_findLov;
   o.getEvents      = MO.FDuiDescribeFrameConsole_getEvents;
   return o;
}
MO.FDuiDescribeFrameConsole_construct = function FDuiDescribeFrameConsole_construct(){
   var o = this;
   o._defines = new MO.TDictionary();
   o.lsnsLoaded = new MO.TListeners();
}
MO.FDuiDescribeFrameConsole_load = function FDuiDescribeFrameConsole_load(name){
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
   var url = MO.RDuiService.url(o._service);
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1])', name);
   }
   return xframe;
}
MO.FDuiDescribeFrameConsole_createFromName = function FDuiDescribeFrameConsole_createFromName(name, type){
   var o = this;
   var doc = o.loadService(name, type);
   o.loadNode(doc);
   if(MO.EForm.Lov == type){
      return o.getLov(name);
   }else{
      return o.get(name);
   }
}
MO.FDuiDescribeFrameConsole_loadNode = function FDuiDescribeFrameConsole_loadNode(x){
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
MO.FDuiDescribeFrameConsole_loadService = function FDuiDescribeFrameConsole_loadService(n, t){
   var o = this;
   if(!t){
      t = MO.EForm.Form;
   }
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'loadDefine');
   var f = root.create('WebForm');
   f.set('name', n);
   f.set('type', t);
   var url = MO.RDuiService.url('logic.webform');
   var doc = MO.Console.find(MO.FXmlConsole).send(url, doc);
   var r = doc.root();
   if(!MO.Console.find(MO.FMessageConsole).checkResult(new TMessageArg(r))){
      return null;
   }
   return doc;
}
MO.FDuiDescribeFrameConsole_nextFormId = function FDuiDescribeFrameConsole_nextFormId(){
   return ++this.formId;
}
MO.FDuiDescribeFrameConsole_get = function FDuiDescribeFrameConsole_get(n){
   return this._defines.get(EForm.Form).get(n);
}
MO.FDuiDescribeFrameConsole_find = function FDuiDescribeFrameConsole_find(n, t){
   var o = this;
   if(EForm.Lov == t){
      return o.findLov(n);
   }
   var fc = o.get(n);
   if(MO.Class.isMode(MO.ERun.Debug)){
      MO.Memory.free(fc);
      fc = null;
      o._defines.get(EForm.Form).set(n, null);
   }
   if(!fc){
      fc = o.createFromName(n);
   }
   return fc;
}
MO.FDuiDescribeFrameConsole_getLov = function FDuiDescribeFrameConsole_getLov(n){
   return this._defines.get(EForm.Lov).get(n);
}
MO.FDuiDescribeFrameConsole_findLov = function FDuiDescribeFrameConsole_findLov(n){
   var o = this;
   var fc = o.getLov(n);
   if(!fc){
      fc = o.createFromName(n, EForm.Lov);
   }
   return fc;
}
MO.FDuiDescribeFrameConsole_getEvents = function FDuiDescribeFrameConsole_getEvents(n){
   return this.events.get(n);
}
MO.FDuiDesktopConsole = function FDuiDesktopConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._maskVisible     = false;
   o._statusEnable    = true;
   o._loadingVisible  = false;
   o._progressVisible = false;
   o._progressBar     = null;
   o._hMaskPanel      = null;
   o._hLoadingPanel   = null;
   o._hLoadingLabel   = null;
   o.construct        = MO.FDuiDesktopConsole_construct;
   o.getMaskPanel     = MO.FDuiDesktopConsole_getMaskPanel;
   o.getProgressBar   = MO.FDuiDesktopConsole_getProgressBar;
   o.getLoadingPanel  = MO.FDuiDesktopConsole_getLoadingPanel;
   o.setMaskVisible   = MO.FDuiDesktopConsole_setMaskVisible;
   o.isEnable         = MO.FDuiDesktopConsole_isEnable;
   o.enable           = MO.FDuiDesktopConsole_enable;
   o.disable          = MO.FDuiDesktopConsole_disable;
   o.showLoading      = MO.FDuiDesktopConsole_showLoading;
   o.showUploading    = MO.FDuiDesktopConsole_showUploading;
   o.showProgress     = MO.FDuiDesktopConsole_showProgress;
   o.hide             = MO.FDuiDesktopConsole_hide;
   return o;
}
MO.FDuiDesktopConsole_construct = function FDuiDesktopConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}
MO.FDuiDesktopConsole_getMaskPanel = function FDuiDesktopConsole_getMaskPanel(){
   var o = this;
   var hDocument = top.MO.RWindow._hDocument;
   var hPanel = o._hMaskPanel;
   if(!hPanel){
      hPanel = o._hMaskPanel = MO.Window.Builder.createTable(hDocument, 'FDuiDesktopConsole_MaskPanel');
      hPanel.style.zIndex = 5000;
      var hInnerPanel = o._hMaskInnerPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      hInnerPanel.align = 'center';
      hInnerPanel.vAlign = 'middle';
   }
   return hPanel;
}
MO.FDuiDesktopConsole_getLoadingPanel = function FDuiDesktopConsole_getLoadingPanel(){
   var o = this;
   var hDocument = top.MO.RWindow._hDocument;
   var hPanel = o._hLoadingPanel;
   if(!hPanel){
      hPanel = o._hLoadingPanel = MO.Window.Builder.createTable(hDocument);
      var hCell = MO.Window.Builder.appendTableRowCell(hPanel);
      var hIcon = o._hLoadingIcon = MO.Window.Builder.appendIcon(hCell);
      hIcon.src = MO.RResource.iconPath('control.RWindow_Loading');
      var hCell = o._hLoadingLabel = MO.Window.Builder.appendTableRowCell(hPanel);
      hCell.align = 'center';
      hCell.style.color = '#FFFFFF';
   }
   return hPanel;
}
MO.FDuiDesktopConsole_getProgressBar = function FDuiDesktopConsole_getProgressBar(){
   var o = this;
   var progressBar = o._progressBar;
   if(!progressBar){
      progressBar = o._progressBar = MO.Class.create(MO.FDuiProgressBar);
      progressBar.build(top.MO.Window._hDocument);
   }
   return progressBar;
}
MO.FDuiDesktopConsole_setMaskVisible = function FDuiDesktopConsole_setMaskVisible(visible){
   var o = this;
   if(o._maskVisible != visible){
      var hDocument = top.MO.Window._hDocument;
      var hBody = hDocument.body;
      var hMaskPanel = o.getMaskPanel();
      if(visible){
         var hStyle = hMaskPanel.style;
         hStyle.left = '0px';
         hStyle.top = '0px';
         hBody.appendChild(hMaskPanel);
      }else{
         hBody.removeChild(hMaskPanel);
      }
   }
   o._maskVisible = visible;
}
MO.FDuiDesktopConsole_isEnable = function FDuiDesktopConsole_isEnable(){
   return this._statusEnable;
}
MO.FDuiDesktopConsole_enable = function FDuiDesktopConsole_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}
MO.FDuiDesktopConsole_disable = function FDuiDesktopConsole_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}
MO.FDuiDesktopConsole_showLoading = function FDuiDesktopConsole_showLoading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      MO.Window.Html.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
MO.FDuiDesktopConsole_showUploading = function FDuiDesktopConsole_showUploading(){
   var o = this;
   o.setMaskVisible(true);
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      MO.Window.Html.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}
MO.FDuiDesktopConsole_showProgress = function FDuiDesktopConsole_showProgress(rate){
   var o = this;
   o.setMaskVisible(true);
   if(!o._progressVisible){
      var hMaskPanel = o.getMaskPanel();
      var progressBar = o.getProgressBar();
      hMaskPanel.appendChild(progressBar._hPanel);
      o._progressVisible = true;
   }
}
MO.FDuiDesktopConsole_hide = function FDuiDesktopConsole_hide(){
   var o = this;
   if(o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      o._hMaskInnerPanel.removeChild(hLoadingPanel);
      o._loadingVisible  = false;
   }
   o.setMaskVisible(false);
}
MO.FDuiEditorConsole = function FDuiEditorConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Local;
   o._hoverEditor = null;
   o._focusEditor = null;
   o._editors     = null;
   o.construct    = MO.FDuiEditorConsole_construct;
   o.makeName     = MO.FDuiEditorConsole_makeName;
   o.enter        = MO.FDuiEditorConsole_enter;
   o.leave        = MO.FDuiEditorConsole_leave;
   o.focus        = MO.FDuiEditorConsole_focus;
   o.blur         = MO.FDuiEditorConsole_blur;
   o.lost         = MO.FDuiEditorConsole_lost;
   return o;
}
MO.FDuiEditorConsole_construct = function FDuiEditorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._editors = new MO.TDictionary();
}
MO.FDuiEditorConsole_makeName = function FDuiEditorConsole_makeName(cls, name){
   return name ? name + '@' + MO.Class.name(cls) : MO.Class.name(cls);
}
MO.FDuiEditorConsole_enter = function FDuiEditorConsole_enter(editable, cls){
   var name = MO.Class.name(cls);
   var editor = this._hoverEditors.get(name);
   if(!editor){
      editor = MO.Class.create(cls);
      editor.psBuild();
      this._hoverEditors.set(name, editor);
   }
   this._hoverEditor = editor;
   editor.editable = editable;
   editor.show();
   return editor;
}
MO.FDuiEditorConsole_leave = function FDuiEditorConsole_leave(editor){
   var o = this;
   if(o._hoverEditor != o._focusEditor){
      editor = MO.Lang.Object.nvl(editor, o._hoverEditor);
      o._hoverEditor = null;
      RLog.debug(o, 'Leave {1}', MO.Class.dump(editor));
   }
}
MO.FDuiEditorConsole_focus = function FDuiEditorConsole_focus(c, n, l){
   var o = this;
   var name = o.makeName(n, l);
   var e = o._editors.get(l);
   if(!e){
      e = MO.Class.create(n);
      e.build(c._hPanel);
      o._editors.set(l, e);
   }
   MO.Logger.debug(o, 'Focus editor {1} (editable={2}, name={3})', MO.Class.dump(e), MO.Class.dump(c), l);
   e.reset();
   if(MO.Class.isClass(e, MO.FDuiDropEditor)){
      e.linkControl(c);
      o._focusEditor = e;
   }
   return e;
}
MO.FDuiEditorConsole_blur = function FDuiEditorConsole_blur(editor){
   var o = this;
   if(o._focusEditor){
      MO.Logger.debug(o, 'Blur editor {1}', MO.Class.dump(editor));
      editor = MO.Lang.Object.nvl(editor, o._focusEditor);
      if(editor){
         editor.onEditEnd();
      }
      o._focusEditor = null;
   }
}
MO.FDuiEditorConsole_lost = function FDuiEditorConsole_lost(e){
   var o = this;
   o.leave(e);
   o.blur(e);
}
MO.FDuiEnvironmentConsole = function FDuiEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope       = MO.EScope.Local;
   o.environment = null;
   o.connect     = MO.FDuiEnvironmentConsole_connect;
   o.build       = MO.FDuiEnvironmentConsole_build;
   o.buildValue  = MO.FDuiEnvironmentConsole_buildValue;
   o.load        = MO.FDuiEnvironmentConsole_load;
   o.xml         = MO.FDuiEnvironmentConsole_xml;
   return o;
}
MO.FDuiEnvironmentConsole_connect = function FDuiEnvironmentConsole_connect(){
}
MO.FDuiEnvironmentConsole_build = function FDuiEnvironmentConsole_build(config){
   var o = this;
   if(!o.environment){
      o.connect()
   }
   if(o.environment){
      var node = config.create('Environment');
      node.attributes().append(this.environment.attributes());
   }
}
MO.FDuiEnvironmentConsole_buildValue = function FDuiEnvironmentConsole_buildValue(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      var env = RHtml.get('_environment');
      if(env){
         env.value = this.environment.xml();
      }
   }
}
MO.FDuiEnvironmentConsole_load = function FDuiEnvironmentConsole_load(p){
   this.environment = RXml.makeNode(p);
}
MO.FDuiEnvironmentConsole_xml = function FDuiEnvironmentConsole_xml(){
   if(!this.environment){
      this.connect()
   }
   if(this.environment){
      return this.environment.xml();
   }
   return null;
}
MO.FDuiErrorDialog = function FDuiErrorDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.ErrorDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiErrorDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiErrorDialog_onConfirmClick;
   o.construct             = MO.FDuiErrorDialog_construct;
   o.setCode               = MO.FDuiErrorDialog_setCode;
   o.setDescription        = MO.FDuiErrorDialog_setDescription;
   o.dispose               = MO.FDuiErrorDialog_dispose;
   return o;
}
MO.FDuiErrorDialog_onBuilded = function FDuiErrorDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
}
MO.FDuiErrorDialog_onConfirmClick = function FDuiErrorDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiErrorDialog_construct = function FDuiErrorDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiErrorDialog_setCode = function FDuiErrorDialog_setCode(value){
   this._controlCode.set(value);
}
MO.FDuiErrorDialog_setDescription = function FDuiErrorDialog_setDescription(value){
   this._controlDescription.set(value);
}
MO.FDuiErrorDialog_dispose = function FDuiErrorDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiFocusConsole = function FDuiFocusConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope              = MO.EScope.Page;
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
   o.onMouseDown        = MO.FDuiFocusConsole_onMouseDown;
   o.onMouseWheel       = MO.FDuiFocusConsole_onMouseWheel;
   o.construct          = MO.FDuiFocusConsole_construct;
   o.enter              = MO.FDuiFocusConsole_enter;
   o.leave              = MO.FDuiFocusConsole_leave;
   o.isFocus            = MO.FDuiFocusConsole_isFocus;
   o.focus              = MO.FDuiFocusConsole_focus;
   o.blur               = MO.FDuiFocusConsole_blur;
   o.findClass          = MO.FDuiFocusConsole_findClass;
   o.focusClass         = MO.FDuiFocusConsole_focusClass;
   o.focusHtml          = MO.FDuiFocusConsole_focusHtml;
   o.lockBlur           = MO.FDuiFocusConsole_lockBlur;
   o.unlockBlur         = MO.FDuiFocusConsole_unlockBlur;
   o.storeFocus         = MO.FDuiFocusConsole_storeFocus;
   o.restoreFocus       = MO.FDuiFocusConsole_restoreFocus;
   o.dispose            = MO.FDuiFocusConsole_dispose;
   return o;
}
MO.FDuiFocusConsole_onMouseDown = function FDuiFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}
MO.FDuiFocusConsole_onMouseWheel = function FDuiFocusConsole_onMouseWheel(s, e){
   var o = this;
}
MO.FDuiFocusConsole_construct = function FDuiFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._focusClasses = new Object();
   o.lsnsFocus = new MO.TListeners();
   o.lsnsBlur = new MO.TListeners();
   o.lsnsFocusClass = new MO.TListeners();
   MO.Logger.info(o, 'Add listener for window mouse down and wheel.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}
MO.FDuiFocusConsole_enter = function FDuiFocusConsole_enter(c){
   var o = this;
   if(MO.Class.isClass(c, MO.MDuiContainer)){
      o._hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}
MO.FDuiFocusConsole_leave = function FDuiFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}
MO.FDuiFocusConsole_isFocus = function FDuiFocusConsole_isFocus(c){
   return (this._focusControl == c);
}
MO.FDuiFocusConsole_focus = function FDuiFocusConsole_focus(c, e){
   var o = this;
   if(!MO.Class.isClass(c, MO.MDuiFocus)){
      return;
   }
   var f = o._focusControl;
   if(f == c){
      return;
   }
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, MO.Class.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         o.lsnsBlur.process(f);
      }
   }
   if(o._focusAble){
      MO.Logger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      o.lsnsFocus.process(c);
   }
}
MO.FDuiFocusConsole_blur = function FDuiFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   if(bc != c && MO.Class.isClass(c, MO.MDuiFocus)){
      MO.Logger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   if(fc){
      MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, MO.Class.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}
MO.FDuiFocusConsole_findClass = function FDuiFocusConsole_findClass(c){
   var o = this;
   var n = MO.Class.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   var p = o._activeControl;
   if(MO.Class.isClass(p, MO.FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}
MO.FDuiFocusConsole_focusClass = function FDuiFocusConsole_focusClass(c, p){
   var o = this;
   var n = MO.Class.name(c);
   if(o._focusClasses[n] != p){
      o._focusClasses[n] = p;
      MO.Logger.debug(o, 'Focus class. (name={1}, class={2})', n, MO.Class.dump(p));
      o.lsnsFocusClass.process(p, c);
   }
}
MO.FDuiFocusConsole_focusHtml = function FDuiFocusConsole_focusHtml(p){
   var o = this;
   var c = MO.Window.Html.searchLinker(p, MO.FDuiControl);
   MO.Logger.debug(o, 'Focus html control. (control={1}, element={2})', MO.Class.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}
MO.FDuiFocusConsole_lockBlur = function FDuiFocusConsole_lockBlur(){
   this._blurAble = false;
}
MO.FDuiFocusConsole_unlockBlur = function FDuiFocusConsole_unlockBlur(){
   this._blurAble = true;
}
MO.FDuiFocusConsole_storeFocus = function FDuiFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}
MO.FDuiFocusConsole_restoreFocus = function FDuiFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}
MO.FDuiFocusConsole_dispose = function FDuiFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
MO.FDuiFrameConsole = function FDuiFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._frames          = null;
   o.construct        = MO.FDuiFrameConsole_construct;
   o.create           = MO.FDuiFrameConsole_create;
   o.find             = MO.FDuiFrameConsole_find;
   o.findByClass      = MO.FDuiFrameConsole_findByClass;
   o.get              = MO.FDuiFrameConsole_get;
   return o;
}
MO.FDuiFrameConsole_construct = function FDuiFrameConsole_construct(){
   var o = this;
   o._frames = new MO.TMap();
}
MO.FDuiFrameConsole_create = function FDuiFrameConsole_create(c, n){
   var o = this;
   var dc = MO.Console.find(MO.FUiFrameDefineConsole);
   var x = dc.load(n);
   var f = MO.RDuiControl.build(null, x, null, c._hPanel);
   return f;
}
MO.FDuiFrameConsole_find = function FDuiFrameConsole_find(n){
   return this._frames.get(n);
}
MO.FDuiFrameConsole_findByClass = function FDuiFrameConsole_findByClass(control, clazz){
   var o = this;
   var className = MO.Class.name(clazz);
   var frames = o._frames;
   var instance = frames.get(className);
   if(!instance){
      instance = MO.Class.create(clazz);
      instance.buildDefine(control._hPanel);
      frames.set(className, instance);
   }
   return instance;
}
MO.FDuiFrameConsole_get = function FDuiFrameConsole_get(control, name, hPanel){
   var o = this;
   var frames = o._frames;
   var frame = frames.get(name);
   if(!frame){
      frame = o.create(control, name);
      if(hPanel){
         frame.setPanel(hPanel);
      }
      frames.set(name, frame);
   }
   return frame;
}
MO.FDuiFrameConsole_hiddenAll = function FDuiFrameConsole_hiddenAll(){
   var o = this;
   var fs = o._frames;
   var fc = fs.count;
   for(var n=0; n<fc; n++){
      fs.value(n).setVisible(false);
   }
}
MO.FDuiFrameConsole_onProcessLoaded = function FDuiFrameConsole_onProcessLoaded(e){
   var o = this;
   var r = e.document.root();
   var g = e.argument;
   if(!e.messageChecked){
      var m = new MO.TMessageArg();
      m.argument = g;
      m.form = g.form;
      m.config = r;
      m.invokeCaller = new MO.TInvoke(o, o.onLoaded);
      m.invokeParam = e;
      m.event = e;
      if(!MO.Console.find(MO.FMessageConsole).checkResult(m)){
         return;
      }
   }
   var g = e.argument;
   var fn = r.find('Form');
   if(fn){
      var ds = MO.RDataset.make(fn);
      g.resultDataset = ds;
      g.resultRow = ds.rows.get(0);
   }
   g.invoke();
}
MO.FDuiFrameConsole_process = function FDuiFrameConsole_process(g){
   var o = this;
   var doc = new MO.TXmlDocument();
   var root = doc.root();
   root.set('action', 'process');
   if(g.checked){
      root.set('checked', g.checked);
   }
   root.push(g.toNode());
   var e = new MO.TEvent(o, EXmlEvent.Send, o.onProcessLoaded);
   e.url = MO.RService.url(MO.Lang.String.nvl(g.url, 'logic.webform'));
   e.action = MO.EDataAction.Process;
   e.argument = g;
   e.document = doc;
   MO.Console.find(MO.FXmlConsole).process(e);
}
MO.FDuiFrameConsole_loadEvents = function FDuiFrameConsole_loadEvents(cfg){
}
MO.FDuiFrameConsole_processEvent = function FDuiFrameConsole_processEvent(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(MO.Class.isClass(se, FControl)){
      var p = se.topControl();
      if(p){
         var s = MO.Lang.String.nvl(e.name, e.handle) + '@' + se.name + '@' + p.name;
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
MO.FDuiFrameConsole_free = function FDuiFrameConsole_free(f){
   f.setVisible(false);
   this._freeFrames.push(f);
}
MO.FDuiFrameConsole_dispose = function FDuiFrameConsole_dispose(){
   var o = this;
   MO.Memory.free(o._frames);
   MO.Memory.free(o._formIds);
   MO.Memory.free(o._framesLoaded);
   o._frames = null;
   o._formIds = null;
   o._framesLoaded = null;
}
MO.FDuiFrameEventConsole = function FDuiFrameEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd   = MO.EScope.Local;
   o._thread    = null;
   o._interval  = 20;
   o._allow     = true;
   o._allows    = new MO.TAttributes();
   o._events    = new MO.TObjects();
   o._listeners = new MO.TAttributes();
   o.onProcess  = MO.FDuiFrameEventConsole_onProcess;
   o.construct  = MO.FDuiFrameEventConsole_construct;
   o.register   = MO.FDuiFrameEventConsole_register;
   o.push       = MO.FDuiFrameEventConsole_push;
   o.clear      = MO.FDuiFrameEventConsole_clear;
   return o;
}
MO.FDuiFrameEventConsole_onProcess = function FDuiFrameEventConsole_onProcess(){
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
               var ls = o._listeners.get(MO.Method.name(e));
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
MO.FDuiFrameEventConsole_construct = function FDuiFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(t));
}
MO.FDuiFrameEventConsole_register = function FDuiFrameEventConsole_register(po, pc){
   this._events.push(new MO.TEvent(po, null, pc));
}
MO.FDuiFrameEventConsole_push = function FDuiFrameEventConsole_push(e){
   var o = this;
   var n = MO.Class.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = MO.Lang.Boolean.isTrue(o._allows.get(n));
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
MO.FDuiFrameEventConsole_clear = function FDuiFrameEventConsole_clear(){
   this._events.clear();
}
MO.FDuiFrameEventConsole_add = function FDuiFrameEventConsole_add(owner, proc){
   this._events.push(new MO.TEvent(owner, null, proc));
}
MO.FDuiFrameEventConsole_allowEvent = function FDuiFrameEventConsole_allowEvent(c){
   this._allows.set(MO.Method.name(c), EBool.True);
}
MO.FDuiFrameEventConsole_skipEvent = function FDuiFrameEventConsole_skipEvent(c){
   this._allows.set(MO.Method.name(c), EBool.False);
}
MO.FDuiFrameEventConsole_allowAll = function FDuiFrameEventConsole_allowAll(){
   this._allow = true;
}
MO.FDuiFrameEventConsole_skipAll = function FDuiFrameEventConsole_skipAll(){
   this._allow = false;
}
MO.FDuiFrameEventConsole_onlyCall = function FDuiFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
MO.FDuiInfoDialog = function FDuiInfoDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   o._frameName            = 'system.dialog.InfoDialog';
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = MO.FDuiInfoDialog_onBuilded;
   o.onConfirmClick        = MO.FDuiInfoDialog_onConfirmClick;
   o.construct             = MO.FDuiInfoDialog_construct;
   o.setText               = MO.FDuiInfoDialog_setText;
   o.dispose               = MO.FDuiInfoDialog_dispose;
   return o;
}
MO.FDuiInfoDialog_onBuilded = function FDuiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
}
MO.FDuiInfoDialog_onConfirmClick = function FDuiInfoDialog_onConfirmClick(event){
   var o = this;
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   o.hide();
}
MO.FDuiInfoDialog_construct = function FDuiInfoDialog_construct(){
   var o = this;
   o.__base.FDuiDialog.construct.call(o);
}
MO.FDuiInfoDialog_setText = function FDuiInfoDialog_setText(value){
   this._controlText.set(value);
}
MO.FDuiInfoDialog_dispose = function FDuiInfoDialog_dispose(){
   var o = this;
   o.__base.FDuiDialog.dispose.call(o);
}
MO.FDuiKeyConsole = function FDuiKeyConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd        = EScope.Local;
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   o.onKeyDown       = MO.FDuiKeyConsole_onKeyDown;
   o.construct       = MO.FDuiKeyConsole_construct;
   o.enable          = MO.FDuiKeyConsole_enable;
   o.disable         = MO.FDuiKeyConsole_disable;
   o.enableRegister  = MO.FDuiKeyConsole_enableRegister;
   o.disableRegister = MO.FDuiKeyConsole_disableRegister;
   o.register        = MO.FDuiKeyConsole_register;
   return o;
}
MO.FDuiKeyConsole_onKeyDown = function FDuiKeyConsole_onKeyDown(e){
   var o = this;
   var k = MO.REnum.tryDecode(MO.EKeyCode, e.keyCode);
   if(k && o._enable){
      var ls = o._listeners[k];
      if(ls){
         ls.process(o, e);
         e.keyCode = null;
         e.returnValue = false;
      }
   }
   if(k && o._disableKeys[k]){
      e.keyCode = null;
      e.returnValue = false;
   }
}
MO.FDuiKeyConsole_construct = function FDuiKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Window.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FDuiKeyConsole_enable = function FDuiKeyConsole_enable(){
   this._enable = true;
}
MO.FDuiKeyConsole_disable = function FDuiKeyConsole_disable(){
   this._enable = false;
}
MO.FDuiKeyConsole_enableRegister = function FDuiKeyConsole_enableRegister(){
   this._enableRegister = true;
}
MO.FDuiKeyConsole_disableRegister = function FDuiKeyConsole_disableRegister(){
   this._enableRegister = false;
}
MO.FDuiKeyConsole_register = function FDuiKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      if(MO.Lang.Integer.isInteger(k)){
         k = MO.REnum.decode(EKeyCode, k);
      }
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new MO.TListeners();
      }
      s.clear();
      s.register(w, p);
   }
}
MO.FDuiMessageConsole = function FDuiMessageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MDuiStyle);
   o._scopeCd       = MO.EScope.Global;
   o._result        = new Array();
   o._attributes    = new Array();
   o._messageBox    = null;
   o._messageWindow = null;
   o.showInfo       = MO.FDuiMessageConsole_showInfo;
   o.showConfirm    = MO.FDuiMessageConsole_showConfirm;
   o.showError      = MO.FDuiMessageConsole_showError;
   o.popup          = MO.FDuiMessageConsole_popup;
   o.close          = MO.FDuiMessageConsole_close;
   o.parse          = MO.FDuiMessageConsole_parse;
   o.check          = MO.FDuiMessageConsole_check;
   return o;
}
MO.FDuiMessageConsole_showInfo = function FDuiMessageConsole_showInfo(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiInfoDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_showConfirm = function FDuiMessageConsole_showConfirm(text){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiConfirmDialog);
   dialog.clearResultListeners();
   dialog.setText(text);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_showError = function FDuiMessageConsole_showError(code, message, description){
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDuiErrorDialog);
   dialog.clearResultListeners();
   dialog.setCode(message);
   dialog.setDescription(description);
   dialog.showPosition(MO.EUiPosition.Center);
   return dialog;
}
MO.FDuiMessageConsole_popup = function FDuiMessageConsole_popup(g){
   var o = this;
   var w = o._messageWindow;
   if(!w){
      w = o._messageWindow = RControl.create(FUiMessageWindow);
   }
   w.loadMessages(g);
   w.show();
}
MO.FDuiMessageConsole_close = function FDuiMessageConsole_close(){
   RWindow.setEnable(true);
}
MO.FDuiMessageConsole_parse = function FDuiMessageConsole_parse(config){
   var msgs = null;
   var msgsNode = config.find('Messages');
   if(msgsNode && msgsNode.nodes && msgsNode.nodes.count){
      msgs = new MO.TMessages();
      for(var n=0; n<msgsNode.nodes.count; n++){
         var node = msgsNode.node(n);
         var msg = new TMessage();
         msg.loadConfig(msgsNode.node(n));
         msgs.push(msg);
      }
   }
   return msgs;
}
MO.FDuiMessageConsole_check = function FDuiMessageConsole_check(g){
   var o = this;
   var ms = g.messages = o.parse(g.config);
   if(ms){
      var m = ms.message(MO.EMessage.Fatal);
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
MO.FDuiMessageDialog = function FDuiMessageDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiWindow);
   o._styleMsgPanel     = MO.Class.register(o, new MO.AStyle('_styleMsgPanel'));
   o._styleButtonPanel  = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._styleItmeForm     = MO.Class.register(o, new MO.AStyle('_styleItmeForm'));
   o._styleItemTitle    = MO.Class.register(o, new MO.AStyle('_styleItemTitle'));
   o._styleItemBodyForm = MO.Class.register(o, new MO.AStyle('_styleItemBodyForm'));
   o._styleRowItem      = MO.Class.register(o, new MO.AStyle('_styleRowItem'));
   o._styleDescForm     = MO.Class.register(o, new MO.AStyle('_styleDescForm'));
   o._styleDescTitle    = MO.Class.register(o, new MO.AStyle('_styleDescTitle'));
   o._styleDescBody     = MO.Class.register(o, new MO.AStyle('_styleDescBody'));
   o._type              = null;
   o._isDialog          = false;
   o._titleBlur         = false;
   o._messageArg        = null;
   o._hMessagePanel     = null;
   o._hMessages         = null;
   o._hDescription      = null;
   o._hButtonPanel      = null;
   o._hBlank            = null;
   o.onBuild            = MO.FDuiMessageDialog_onBuild;
   o.onItemOver         = MO.Class.register(o, new MO.AEventMouseOver('onItemOver'), MO.FDuiMessageDialog_onItemOver);
   o.onItemClick        = MO.Class.register(o, new MO.AEventClick('onItemClick'), MO.FDuiMessageDialog_onItemClick);
   o.onDescClick        = MO.Class.register(o, new MO.AEventClick('onDescClick'), MO.FDuiMessageDialog_onDescClick);
   o.onBuildMessages    = MO.FDuiMessageDialog_onBuildMessages;
   o.onBuildButtons     = MO.FDuiMessageDialog_onBuildButtons;
   o.onOk               = MO.FDuiMessageDialog_onOk;
   o.onCancel           = MO.FDuiMessageDialog_onCancel;
   o.onClose            = MO.FDuiMessageDialog_onClose;
   o.loadMessages       = MO.FDuiMessageDialog_loadMessages;
   o.show               = MO.FDuiMessageDialog_show;
   o.hide               = MO.FDuiMessageDialog_hide;
   o.dispose            = MO.FDuiMessageDialog_dispose;
   return o;
}
MO.FDuiMessageDialog_onBuild = function FDuiMessageDialog_onBuild(event){
   var o = this;
   o.__base.FDuiWindow.oeBuild.call(o, e);
   o.setIcon('Icon');
   var hTab = MO.RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
   hTab.style.vAlign = "top";
   hTab.width = '100%';
   hTab.height = '100%';
   var h1 = o.hTitlePanel = hTab.insertRow().insertCell();
   h1.style.height = "100%";
   h1.style.vAlign = "top";
   var h2 = o.hMsgPanel = hTab.insertRow().insertCell();
   h2.style.height = "100%";
   o.onBuildMessages();
   var h0 = o._hButtonPanel = hTab.insertRow().insertCell();
   h0.style.align = 'right';
   o.onBuildButtons();
   h0.height = 20;
   MO.Console.find(FKeyConsole).register(MO.EKey.Esc, new MO.TListener(o, o.onClose));
   return r;
}
MO.FDuiMessageDialog_onItemOver = function FDuiMessageDialog_onItemOver(e){
   var o = this;
   var hf = o.hItemBodyForm;
   var h = e.hSource;
}
MO.FDuiMessageDialog_onItemClick = function FDuiMessageDialog_onItemClick(e){
   var o = this;
   var hf = o.hItemBodyForm;
   for(var n = 0; n < hf.rows.count; n++){
   }
   var h = e.hSource;
   var idx = h.rowIndex;
}
MO.FDuiMessageDialog_onDescClick = function FDuiMessageDialog_onDescClick(e){
   var o = this;
}
MO.FDuiMessageDialog_onBuildMessages = function FDuiMessageDialog_onBuildMessages(){
   var o = this;
   if(!o._type){
      var hTab1 = o.hItmeForm = MO.RBuilder.appendTable(o.hTitlePanel);
      hTab1.style.height = "100%";
      hTab1.style.width = "100%";
      hTab1.style.vAlign = "top";
      var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
      hItemTitle.height = 25;
      var h = MO.RBuilder.appendTable(hItemTitle);
      h.height = '100%';
      h.width = '100%';
      h.style.backgroundColor = "#F5F5F5";
      var hr = h.insertRow();
      var hc1 = hr.insertCell();
      hc1.width = '20';
      var hTitleIcon = MO.RBuilder.appendIcon(hc1, null, null, 16, 14);
      hTitleIcon.style.paddingLeft = 20;
      hTitleIcon.src = o.styleIconPath('TitleIcon');
      var hc2 = hr.insertCell();
      hc2.innerText = ' '+ MO.Context.get('FDuiMessageDialog:MessageContext');
      var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
      hItemBody.height = 100;
      o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
      hItemBody.style.padding = '5';
      hItemBody.vAlign = "top";
      var hDiv = MO.RBuilder.appendDiv(hItemBody);
      hDiv.style.height = '100px';
      hDiv.style.overflow = "auto";
      var hItemBodyForm = o.hItemBodyForm = MO.RBuilder.appendTable(hDiv);
      hItemBodyForm.style.border = '2px solid #FFFFFF';
      hItemBodyForm.width = "100%";
      hItemBodyForm.style.vAlign = "top";
      var hTab2 = o.hDescForm = MO.RBuilder.appendTable(o.hMsgPanel);
      hTab2.style.tableLayout = "fixed";
      hTab2.style.border='2px solid #EEEDED';
      hTab2.style.borderTopWidth = 0;
   }
   o.hItmeForm.style.display = 'none';
   o.hDescForm.style.display = 'none';
   o.hMsgPanel.style.height = '100%';
   if(EMessage.Fatal == o._type || EMessage.Error == o._type){
      o.hItmeForm.style.display = 'block';
      o.hDescForm.style.display = 'block';
   }else{
      o.hItmeForm.style.display = 'block';
   }
}
MO.FDuiMessageDialog_onBuildButtons = function FDuiMessageDialog_onBuildButtons(t){
   var o = this;
   if(!o._type){
      var hBtnTab = MO.Window.Builder.appendTable(o._hButtonPanel, null, 0, 0, 2);
      var hRow = hBtnTab.insertRow();
      var hc = o._hBlank = hRow.insertCell();
      hc.width='72%';
      var b = o.btnOk = MO.Class.create(MO.FButton);
      b.icon = 'tool.ok';
      b.label = RContext.get('FToolButton:ok');
      b.width = '100%';
      b.lsnsClick.register(o, o.onOk);
      var hoc = hRow.insertCell();
      hoc.style.align='right';
      hoc.width='15%';
      b.psBuild(hoc);
      var b = o.btnCancel = MO.Class.create(MO.FButton);
      b.icon = 'tool.cancel';
      b.label = MO.RContext.get('FToolButton:cancel');
      b.width = '100%';
      b.lsnsClick.register(o, o.onCancel);
      var hcc = hRow.insertCell();
      hcc.width='15%';
      b.psBuild(hcc);
   }
   o.btnOk.hPanel.style.display = "none";
   o.btnCancel.hPanel.style.display = "none";
   if(EMessage.Warn == o._type){
      o.btnOk.hPanel.style.display = "block";
      o.btnCancel.hPanel.style.display = "block";
      o._hBlank.width = '72%';
   }else{
      o.btnOk.hPanel.style.display = "block";
      o._hBlank.width = '87%';
   }
}
MO.FDuiMessageDialog_onOk = function FDuiMessageDialog_onOk(){
   var o = this;
   var g = o._messageArg;
   var cg = g.argument;
   var type = o.msgs.get(0)._type;
   if(EMessage.Warn == type){
      if(cg){
         cg.checked = EBoolean.True;
         if('process' == cg.actionType){
            RConsole.find(FFormConsole).process(cg);
         }else if('update' == cg.actionType){
            RConsole.find(FDatasetConsole).update(cg);
         }
      }
   }
   if(type == EMessage.Info){
      if(g.invokeCaller){
         g.invokeParam.messageChecked = true;
         g.invokeCaller.invoke(g.invokeParam);
      }
   }
   o.hide();
}
MO.FDuiMessageDialog_onCancel = function FDuiMessageDialog_onCancel(){
   this.hide();
}
MO.FDuiMessageDialog_onClose = function FDuiMessageDialog_onClose(){
   this.hide();
}
MO.FDuiMessageDialog_loadMessages = function FDuiMessageDialog_loadMessages(g){
   var o = this;
   o._messageArg = g;
   var ms = g.messages;
   o._type = ms._type();
   o.onBuildButtons();
   o.onBuildMessages();
   RHtml.clear(o.hItemBodyForm);
   RHtml.clear(o.hDescDiv);
   var first = true;
   var msgs = o.msgs = ms.items;
   var msgType = EMessage.Info;
   for(var n=0; n<msgs.count; n++){
      var msg = msgs.get(n);
      var m = msg.message;
      var d = msg.description;
      var t = msg._type;
      var hr = o.hItemBodyForm.insertRow();
      hr.height = 12;
      var hc1 = hr.insertCell();
      hc1.width = 20;
      var hIcon =  MO.Window.Builder.appendIcon(hc1, null, n, 16, 16);
      if(EMessage.Error == t){
    	 o.setIcon('TitleError');
         hIcon.src = o.styleIconPath('ItemError');
         msgType = EMessage.Error;
      }else if(EMessage.Warn == t){
    	 o.setIcon('TitleWarn');
         hIcon.src = o.styleIconPath('ItemWarn');
         msgType = EMessage.Warn;
      }else if(EMessage.Info == t){
    	 o.setIcon('TitleInfo');
         msgType = EMessage.Info;
         hIcon.src = o.styleIconPath('ItemInfo');
      }else if(EMessage.Fatal == t){
         msgType = EMessage.Fatal;
         hIcon.src = o.styleIconPath('ItemError');
      }
      var hc2 = hr.insertCell();
      hc2.style.textOverflow = 'ellipsis';
      hc2.style.overflow = 'hidden';
      hc2.innerText = ' ' + m;
      hc2.style.cursor = "hand";
      o.attachEvent('onItemClick', hr);
      o.attachEvent('onItemOver', hr);
      if(first){
         first = false;
      }
   }
   if(EMessage.Error == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Error'));
   }else if(EMessage.Warn == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Warn'));
   }else if(EMessage.Info == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Info'));
   }else if(EMessage.Fatal == msgType){
      o.setCaption(' ' + RContext.get('FDuiMessageDialog:Fatal'));
   }
}
MO.FDuiMessageDialog_show = function FDuiMessageDialog_show(){
   var o = this;
   o.__base.FDuiWindow.show.call(o);
   o.panel().style.zIndex = RLayer.next(ELayer.Message);
   RWindow.moveCenter(o.panel());
   o.psMode(EMode.Update);
   RConsole.find(FFocusConsole).blur();
   RWindow.setEnable(false, true);
   o.focus();
}
MO.FDuiMessageDialog_hide = function FDuiMessageDialog_hide(){
   var o = this;
   o.__base.FDuiWindow.hide.call(o);
   var f = o._messageArg.argument.form;
   if(RClass.isClass(f, MDataset)){
      f.psProgress(false);
   }
   RWindow.setEnable(true);
}
MO.FDuiMessageDialog_dispose = function FDuiMessageDialog_dispose(){
   var o = this;
   o.__base.FDuiWindow.dispose.call(o);
   o.hItmeForm = null;
   o.hDescBody = null;
   o.hDescDiv = null;
   o.hDescTitle = null;
   o.hItemBodyForm = null;
   o._hButtonPanel = null;
}
MO.FDuiPopupConsole = function FDuiPopupConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._activeControl = null;
   o.onMouseDown    = MO.FDuiPopupConsole_onMouseDown;
   o.onMouseWheel   = MO.FDuiPopupConsole_onMouseWheel;
   o.construct      = MO.FDuiPopupConsole_construct;
   o.show           = MO.FDuiPopupConsole_show;
   o.hide           = MO.FDuiPopupConsole_hide;
   o.dispose        = MO.FDuiPopupConsole_dispose;
   return o;
}
MO.FDuiPopupConsole_onMouseDown = function FDuiPopupConsole_onMouseDown(p){
   this.hide();
}
MO.FDuiPopupConsole_onMouseWheel = function FDuiPopupConsole_onMouseWheel(s, e){
   this.hide();
}
MO.FDuiPopupConsole_construct = function FDuiPopupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   MO.Logger.info(o, 'Add listener for control popup.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}
MO.FDuiPopupConsole_show = function FDuiPopupConsole_show(control){
   var o = this;
   o.hide();
   if(MO.Class.isClass(control, MO.MDuiPopup)){
      o._activeControl = control;
   }
}
MO.FDuiPopupConsole_hide = function FDuiPopupConsole_hide(control){
   var o = this;
   if(o._activeControl){
      var opener = o._activeControl.opener();
      opener.drop(false);
   }
   o._activeControl = null;
}
MO.FDuiPopupConsole_dispose = function FDuiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}
MO.FDuiResultConsole = function FDuiResultConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o.scope          = MO.EScope.Page;
   o.executeCommand = MO.FDuiResultConsole_executeCommand;
   o.checkService   = MO.FDuiResultConsole_checkService;
   o.checkEvent     = MO.FDuiResultConsole_checkEvent;
   return o;
}
MO.FDuiResultConsole_executeCommand = function FDuiResultConsole_executeCommand(command){
   var name = command.get('name');
   if(EResultCommand.TreeReload == name){
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         tv.reload();
      }
   }else if(EResultCommand.TreeNodeRefresh == name){
      var tv = MO.RGlobal.get('catalog.tree');
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
      var tv = MO.RGlobal.get('catalog.tree');
      if(tv){
         var fn = tv.focusNode;
         if(fn){
            tv.reloadNode(fn.parentNode);
         }
      }
   }else if(EResultCommand.PageRedirect == name){
      var action = command.get('action');
      var page = top.MO.RContext.context(command.get('page'));
      if(action){
         page += '?do=' + action;
      }
      fmMain.action = page;
      fmMain.target = '';
      fmMain.submit();
   }
}
MO.FDuiResultConsole_checkService = function FDuiResultConsole_checkService(config){
   var o = this;
   if(config){
      if(!MO.Console.find(MO.FMessageConsole).checkResult(new MO.TMessageArg(config))){
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
      MO.Console.find(MO.FFocusConsole).restoreFocus();
   }
   return true;
}
MO.FDuiResultConsole_checkEvent = function FDuiResultConsole_checkEvent(event){
   var o = this;
   var xconfig = event.root;
   if(xconfig){
      var resultCd = xconfig.get('result_cd');
      if(resultCd == 'success'){
         return true;
      }
      var messageCd = xconfig.get('message_cd');
      var xmessages = xconfig.find('Messages');
      if(xmessages){
         var count = xmessages.nodeCount();
         for(var i = 0; i < count; i++){
            var xmessage = xmessages.node(i);
            if(xmessage.isName('Message')){
               var code = xmessage.get('code');
               var message = xmessage.get('message');
               var description = xmessage.get('description');
               MO.Console.find(MO.FDuiMessageConsole).showError(code, message, description);
               return false;
            }
         }
      }
   }
   return true;
}
MO.FDuiWindowConsole = function FDuiWindowConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd      = MO.EScope.Local;
   o._activeWindow = null;
   o._windows      = null;
   o.construct    = MO.FDuiWindowConsole_construct;
   o.create       = MO.FDuiWindowConsole_create;
   o.find         = MO.FDuiWindowConsole_find;
   return this;
}
MO.FDuiWindowConsole_construct = function FDuiWindowConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._windows = new MO.TDictionary();
}
MO.FDuiWindowConsole_create = function FDuiWindowConsole_create(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
   instance.buildDefine(MO.Window._hDocument);
   return instance;
}
MO.FDuiWindowConsole_find = function FDuiWindowConsole_find(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var find = o._windows.get(name);
   if(find){
      return find;
   }
   var instance = o.create(clazz);
   o._windows.set(name, instance);
   return instance;
}
MO.FDuiWindowConsole_loadDefine = function FDuiWindowConsole_loadDefine(name){
   if(name == null){
      return null;
   }
   var config = this.defines.find(name);
   if(config == null){
      var doc = new MO.TXmlDocument();
      var root = doc.root();
      var action = root.create('Action');
      action.value = 'window.config.load';
      root.create('Window', 'name', name);
      var cnn = new MO.TXmlCnn();
      var doc = cnn.syncSend('window.xml', doc);
      doc.root();
   }
   if(!config){
      return MO.Logger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
   }
   return config;
}
MO.FDuiWindowConsole_dump = function FDuiWindowConsole_dump(){
   var sDump = this.className;
   sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
   sDump += '\n\nWindow:\n' + this.windowList.dump();
   return sDump;
}
MO.FDuiWindowConsole_clear = function FDuiWindowConsole_clear(){
   this.focusWinCtl = null;
   this._activeWindow = null;
   this.activeForm = null;
   this.activeControl = null;
   this.m_oDefinePool = new FList();
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      this.windowList.value(n).release();
   }
   this.windowList = new FList();
   IEngine.process(this, this.EVENT_CLOSEALL);
}
MO.FDuiWindowConsole_hideAll = function FDuiWindowConsole_hideAll(oExpWin, bDisplay){
   var nSize = this.windowList.size();
   for(var n=nSize-1; n>=0; n--){
      var oWin = this.windowList.value(n);
      if(oWin != oExpWin){
         oWin.hide(bDisplay);
      }
   }
}
MO.FDuiWindowConsole_setMaxWindow = function FDuiWindowConsole_setMaxWindow(oWin){
   this.maxFlag = true;
   this.hideAll(oWin);
}
MO.FDuiWindowConsole_restore = function FDuiWindowConsole_restore(){
   var nSize = this.windowList.size();
   this.hideAll(null, true);
   for(var n=0; n<nSize; n++){
      var oWin = this.windowList.value(n);
      if(oWin.maxFlag){
         this.windowList.value(n).restore();
      }
   }
   this.maxFlag = false;
}
MO.FDuiWindowConsole_initialize = function FDuiWindowConsole_initialize(oCtWin){
   this.clientWindow = oCtWin;
}
MO.FDuiWindowConsole_hasWindow = function FDuiWindowConsole_hasWindow(){
   return !this.windowList.isEmpty();
}
MO.FDuiWindowConsole_focus = function FDuiWindowConsole_focus(oWinCtl){
   this.focusWinCtl = oWinCtl;
   if(this.maxFlag){
      oWinCtl.show();
      this.hideAll(oWinCtl, true)
      oWinCtl.max();
   }
}
MO.FDuiWindowConsole_saveDefine = function FDuiWindowConsole_saveDefine(oWinNode, oClientWindow){
   if(oClientWindow){this.clientWindow.document.body.disabled = true;}
   if(!oWinNode){
      return LoggerUtil.fatal(this, 'saveDefine', 'Window node is null.');
   }
   var sFullName = oWinNode.attribute('full_name');
   if(!sFullName){
      return ILogger.fatal(this, 'saveDefine', 'Window full name is null.');
   }
   var oDoc = new FXMLDocument('Config');
   var oActNode = oDoc.rootNode.createNode('Action');
   oActNode.setAttribute('name', 'define.save');
   oDoc.rootNode.push(oWinNode);
   var oConnect = new FXMLConnect(SystemManager.serviceURL('window'), oDoc);
   oConnect.clientWindow = oClientWindow;
   oConnect.onload = this.onSaveDefineAfter;
   oConnect.send();
}
MO.FDuiWindowConsole_onEventMousedown = function FDuiWindowConsole_onEventMousedown(oCWin){
}
MO.FDuiWindowConsole_onSaveDefineAfter = function FDuiWindowConsole_onSaveDefineAfter(){
   ILogger.info(this, 'saveDefine', 'Save Ok.');
   if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
}
MO.FDuiWindowConsole_releaseWindowName = function FDuiWindowConsole_releaseWindowName(sWinName){
   var oWin = this.windowList.removeName(sWinName);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
MO.FDuiWindowConsole_releaseWindow = function FDuiWindowConsole_releaseWindow(oWin){
   this.windowList.removeValue(oWin);
   IEngine.process(this, this.EVENT_CLOSE, oWin);
}
MO.FDuiWindowConsole_doFrameAction = function FDuiWindowConsole_doFrameAction(sAction){
   if(!this.activeForm){
      return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
   }
   this.activeForm.doAction(sAction);
}
MO.FDuiWindowConsole_doProperties = function FDuiWindowConsole_doProperties(){
   TrackManager.push(this, 'Do properties.');
   if(!WindowManager.focusWinCtl){return;}
   var arParams = new Array();
   arParams['WindowManager'] = WindowManager;
   window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
}
MO.FDuiWindowConsole_onEventRelease = function FDuiWindowConsole_onEventRelease(oCWin){
   if(oCWin){
      var oSubWin = null;
      var oRemoves = new Array();
      var nSize = this.windowList.size();
      for(var n=0; n<nSize; n++){
         oSubWin = this.windowList.value(n);
         if(oSubWin.clientWindow == oCWin){
            if(oSubWin == MoveManager.focusBorder){
               MoveManager.focus(null);
            }
            oRemoves.push(oSubWin);
         }
      }
      for(var n=0; n<oRemoves.length; n++){
         this.windowList.removeValue(oRemoves[n]);
      }
   }else{
      this.windowList.clear();
      MoveManager.focus(null);
   }
}
MO.FDuiWorkspaceApplication = function FDuiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   o.onProcess        = MO.FDuiWorkspaceApplication_onProcess;
   o.selectWorkspace  = MO.FDuiWorkspaceApplication_selectWorkspace;
   o.processResize    = MO.FDuiWorkspaceApplication_processResize;
   o.processEvent     = MO.FDuiWorkspaceApplication_processEvent;
   return o;
}
MO.FDuiWorkspaceApplication_onProcess = function FDuiWorkspaceApplication_onProcess(){
   var o = this;
   var workspace = o._activeWorkspace
   if(workspace){
      workspace.psFrame();
   }
}
MO.FDuiWorkspaceApplication_selectWorkspace = function FDuiWorkspaceApplication_selectWorkspace(clazz){
   var o = this;
   var workspace = o._activeWorkspace = MO.Class.create(clazz);
   return workspace;
}
MO.FDuiWorkspaceApplication_processResize = function FDuiWorkspaceApplication_processResize(){
   var o = this;
}
MO.FDuiWorkspaceApplication_processEvent = function FDuiWorkspaceApplication_processEvent(event){
   var o = this;
}
MO.FDuiWorkspaceConsole = function FDuiWorkspaceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o._thread          = null;
   o._interval        = 100;
   o.onResize         = MO.FDuiWorkspaceConsole_onResize;
   o.onProcess        = MO.FDuiWorkspaceConsole_onProcess;
   o.construct        = MO.FDuiWorkspaceConsole_construct;
   o.active           = MO.FDuiWorkspaceConsole_active;
   o.resize           = MO.FDuiWorkspaceConsole_resize;
   o.dispose          = MO.FDuiWorkspaceConsole_dispose;
   return o;
}
MO.FDuiWorkspaceConsole_onResize = function FDuiWorkspaceConsole_onResize(p){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psResize();
   }
}
MO.FDuiWorkspaceConsole_onProcess = function FDuiWorkspaceConsole_onProcess(event){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psFrame(event);
   }
}
MO.FDuiWorkspaceConsole_construct = function FDuiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.RWindow.lsnsResize.register(o, o.onResize);
}
MO.FDuiWorkspaceConsole_active = function FDuiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
MO.FDuiWorkspaceConsole_resize = function FDuiWorkspaceConsole_resize(){
   this.onResize();
}
MO.FDuiWorkspaceConsole_dispose = function FDuiWorkspaceConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
MO.EUiSplitStyle = new function EUiSplitStyle(){
   var o = this;
   o.Normal     = 'N';
   o.BulgeLine  = 'B';
   o.HollowLine = 'H';
   return o;
}
MO.MDuiShadow = function MDuiShadow(o){
   o = MO.Class.inherits(this, o);
   o._hShadow   = null;
   o.show       = MO.MDuiShadow_show;
   o.hide       = MO.MDuiShadow_hide;
   o.setVisible = MO.MDuiShadow_setVisible;
   return o;
}
MO.MDuiShadow_show = function MDuiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = MO.RDuiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }
}
MO.MDuiShadow_hide = function MDuiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
MO.MDuiShadow_setVisible = function MDuiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = MO.RDuiLayer.next();
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var r = MO.Window.Html.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
MO.SDuiColorBar = function SDuiColorBar(){
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
   o.onMouseDown       = MO.SDuiColorBar_onMouseDown;
   o.onMouseMove       = MO.SDuiColorBar_onMouseMove;
   o.onMouseUp         = MO.SDuiColorBar_onMouseUp;
   o.build             = MO.SDuiColorBar_build;
   o.setRange          = MO.SDuiColorBar_setRange;
   o.setColorValue     = MO.SDuiColorBar_setColorValue;
   o.setSlideValue     = MO.SDuiColorBar_setSlideValue;
   o.setInputValue     = MO.SDuiColorBar_setInputValue;
   o.convertSlide      = MO.SDuiColorBar_convertSlide;
   o.convertGet        = MO.SDuiColorBar_convertGet;
   o.convertSet        = MO.SDuiColorBar_convertSet;
   o.get               = MO.SDuiColorBar_get;
   o.set               = MO.SDuiColorBar_set;
   o.changeSlide       = MO.SDuiColorBar_changeSlide;
   o.changeInputEdit   = MO.SDuiColorBar_changeInputEdit;
   o.changeInputChange = MO.SDuiColorBar_changeInputChange;
   return o;
}
MO.SDuiColorBar_onMouseDown = function SDuiColorBar_onMouseDown(p){
   var o = this;
   var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   MO.Window.setOptionSelect(false);
   o.changeSlide(x);
}
MO.SDuiColorBar_onMouseMove = function SDuiColorBar_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
MO.SDuiColorBar_onMouseUp = function SDuiColorBar_onMouseUp(p){
   var o = this;
   o._draging = false;
   MO.Window.setOptionSelect(true);
}
MO.SDuiColorBar_build = function SDuiColorBar_build(p){
   var o = this;
   var c = o.control;
   var hcf = o.hPanel;
   var hr = MO.Window.Builder.appendTableRow(hcf);
   var hc = o.hColorPanel = MO.Window.Builder.appendTableCell(hr);
   hc.width = 13;
   hc.style.padding = '2px';
   o.hColorImage = MO.Window.Builder.appendIcon(hc, null, 'n', 11, 11);
   var hc = o.hSlidePanel = MO.Window.Builder.appendTableCell(hr);
   hc.style.padding = '2px';
   hc.vAlign = 'middle';
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(hc);
   hf.__pbar = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideRowUp = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowUR = MO.Window.Builder.appendTableCell(hl);
   var hl = o.hSlideRow = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideRowML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideRowMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideRowMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideRowDown = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideRowBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideRowBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideRowBR = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hInputPanel = MO.Window.Builder.appendTableCell(hr, o.control.styleName('InputPanel'));
   hc.width = 36;
   var he = o.hInput = MO.Window.Builder.appendEdit(hc, o.control.styleName('Input'));
   he._pbar = o;
   c.attachEvent('onInputKeyPress', he, c.onInputKeyPress);
   c.attachEvent('onInputEdit', he, c.onInputEdit);
   c.attachEvent('onInputChange', he, c.onInputChange);
}
MO.SDuiColorBar_setRange = function SDuiColorBar_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = i;
   }
   if(a != null){
      o.maxValue = a;
   }
}
MO.SDuiColorBar_setColorValue = function SDuiColorBar_setColorValue(p){
   var o = this;
   var v = MO.Lang.Hex.format(p, 2);
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
         throw new MO.TError(o, 'Invalid type.');
   }
   o.hColorImage.style.backgroundColor = '#' + c;
}
MO.SDuiColorBar_setSlideValue = function SDuiColorBar_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiColorBar_setInputValue = function SDuiColorBar_setInputValue(p){
   this.hInput.value = p;
}
MO.SDuiColorBar_convertGet = function SDuiColorBar_convertGet(p){
   return p;
}
MO.SDuiColorBar_get = function SDuiColorBar_get(){
   var o = this;
   return o.convertGet(o.hInput.value);
}
MO.SDuiColorBar_convertSet = function SDuiColorBar_convertSet(p){
   return p;
}
MO.SDuiColorBar_set = function SDuiColorBar_set(p){
   var o = this;
   var v = o.convertSet(p);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.setInputValue(v);
}
MO.SDuiColorBar_convertSlide = function SDuiColorBar_convertSlide(p){
   return p;
}
MO.SDuiColorBar_changeSlide = function SDuiColorBar_changeSlide(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = o.convertSlide(p / w);
   o.set(v);
   o.control.refreshValue();
}
MO.SDuiColorBar_changeInputEdit = function SDuiColorBar_changeInputEdit(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.setColorValue(v);
   o.setSlideValue(v);
   o.control.refreshValue();
}
MO.SDuiColorBar_changeInputChange = function SDuiColorBar_changeInputChange(){
   var o = this;
   var v = o.convertGet(o.hInput.value);
   o.set(v);
   o.control.refreshValue();
}
MO.SDuiColorChannel = function SDuiColorChannel(){
   var o = this;
   MO.SDuiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 255;
   o.setInputValue = MO.SDuiColorChannel_setInputValue;
   o.convertGet    = MO.SDuiColorChannel_convertGet;
   o.convertSet    = MO.SDuiColorChannel_convertSet;
   return o;
}
MO.SDuiColorChannel_setInputValue = function SDuiColorChannel_setInputValue(p){
   var o = this;
   var v = MO.Integer.toRange(p, o.minValue, o.maxValue);
   var t = MO.Integer.format(v);
   var h = o.hInput;
   if(h.value != t){
      h.value = t;
   }
}
MO.SDuiColorChannel_convertGet = function SDuiColorChannel_convertGet(p){
   var o = this;
   var v = MO.Lang.Integer.parse(MO.Lang.String.nvl(p, '0'));
   return MO.Lang.Integer.toRange(v, o.minValue, o.maxValue) / 255;
}
MO.SDuiColorChannel_convertSet = function SDuiColorChannel_convertSet(p){
   return parseInt(p * 255);
}
MO.SDuiColorPower = function SDuiColorPower(){
   var o = this;
   MO.SDuiColorBar.call(o);
   o.minValue      = 0;
   o.maxValue      = 4;
   o.setColorValue = MO.SDuiColorPower_setColorValue;
   o.setSlideValue = MO.SDuiColorPower_setSlideValue;
   o.setInputValue = MO.SDuiColorPower_setInputValue;
   o.convertGet    = MO.SDuiColorPower_convertGet;
   o.convertSet    = MO.SDuiColorPower_convertSet;
   o.convertSlide  = MO.SDuiColorPower_convertSlide;
   return o;
}
MO.SDuiColorPower_setColorValue = function SDuiColorPower_setColorValue(p){
   var o = this;
   var v = MO.Lang.Integer.toRange(parseInt(p * 255), 0, 255);
   var s = MO.Lang.Hex.format(v, 2);
   o.hColorImage.style.backgroundColor = '#' + s + s + s;
}
MO.SDuiColorPower_setSlideValue = function SDuiColorPower_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = p / o.maxValue * w;
      o.hSlideRowML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiColorPower_setInputValue = function SDuiColorPower_setInputValue(p){
   var o = this;
   var h = o.hInput;
   var v = MO.Lang.Float.toRange(p, o.minValue, o.maxValue);
   var t = MO.Lang.Float.format(v, 0, null, 2, null);
   if(h.value != t){
      h.value = t;
   }
}
MO.SDuiColorPower_convertGet = function SDuiColorPower_convertGet(p){
   return MO.Lang.Float.parse(p);
}
MO.SDuiColorPower_convertSet = function SDuiColorPower_convertSet(p){
   return p;
}
MO.SDuiColorPower_convertSlide = function SDuiColorPower_convertSlide(p){
   return p * this.maxValue;
}
MO.SDuiSlide = function SDuiSlide(){
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
   o.onMouseDown   = MO.SDuiSlide_onMouseDown;
   o.onMouseMove   = MO.SDuiSlide_onMouseMove;
   o.onMouseUp     = MO.SDuiSlide_onMouseUp;
   o.onSlideChange = MO.Method.empty;
   o.build         = MO.SDuiSlide_build;
   o.setRange      = MO.SDuiSlide_setRange;
   o.setSlideValue = MO.SDuiSlide_setSlideValue;
   o.get           = MO.SDuiSlide_get;
   o.set           = MO.SDuiSlide_set;
   o.changeSlide   = MO.SDuiSlide_changeSlide;
   return o;
}
MO.SDuiSlide_onMouseDown = function SDuiSlide_onMouseDown(p){
   var o = this;
   var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
   o._draging = true;
   MO.Window.setOptionSelect(false);
   o.changeSlide(x);
}
MO.SDuiSlide_onMouseMove = function SDuiSlide_onMouseMove(p){
   var o = this;
   if(o._draging){
      var x = MO.Window.Html.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o.changeSlide(x);
   }
}
MO.SDuiSlide_onMouseUp = function SDuiSlide_onMouseUp(p){
   var o = this;
   o._draging = false;
   MO.Window.setOptionSelect(true);
}
MO.SDuiSlide_build = function SDuiSlide_build(p){
   var o = this;
   var c = o.control;
   var hf = o.hSlideForm = MO.Window.Builder.appendTable(o.hPanel);
   hf.__pcapture = o;
   hf.width = '100%';
   hf.style.height = '9px';
   hf.style.cursor = 'pointer';
   var hl = o.hSlideU = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideUL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideUM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideUR = MO.Window.Builder.appendTableCell(hl);
   var hl = o.hSlideM = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   var hc = o.hSlideML = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hc = o.hSlideMM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   var hc = o.hSlideMR = MO.Window.Builder.appendTableCell(hl);
   hc.bgColor = '#999999';
   var hl = o.hSlideB = MO.Window.Builder.appendTableRow(hf);
   hl.style.height = '3px';
   o.hSlideBL = MO.Window.Builder.appendTableCell(hl);
   var hc = o.hSlideBM = MO.Window.Builder.appendTableCell(hl);
   hc.width = 2;
   hc.bgColor = '#EEEEEE';
   o.hSlideBR = MO.Window.Builder.appendTableCell(hl);
}
MO.SDuiSlide_setRange = function SDuiSlide_setRange(i, a){
   var o = this;
   if(i != null){
      o.minValue = MO.Lang.Float.parse(i);
   }
   if(a != null){
      o.maxValue = MO.Lang.Float.parse(a);
   }
   o.range = o.maxValue - o.minValue;
}
MO.SDuiSlide_setSlideValue = function SDuiSlide_setSlideValue(p){
   var o = this;
   var w = o.hSlideForm.offsetWidth;
   if(w > 0){
      var v = (p - o.minValue) / o.range * w;
      o.hSlideML.width = MO.Lang.Integer.toRange(v, 1, w - 1);
   }
}
MO.SDuiSlide_get = function SDuiSlide_get(){
   var o = this;
   var w = o.hSlideForm.offsetWidth - 3;
   var v = (p / w) * o.range + o.minValue;
   return v;
}
MO.SDuiSlide_set = function SDuiSlide_set(p){
   var o = this;
   o.setSlideValue(p);
}
MO.SDuiSlide_changeSlide = function SDuiSlide_changeSlide(p){
   var o = this;
   var c = o.control;
   var w = o.hSlideForm.offsetWidth - 3;
   o.hSlideML.width = MO.Lang.Integer.toRange(p, 1, w - 1);
   var v = (p / w) * o.range + o.minValue;
   v = MO.Lang.Float.toRange(v, o.minValue, o.maxValue);
   o.onSlideChange.call(c, v);
}
MO.FDuiButton = function FDuiButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MListenerClick);
   o._labelPositionCd   = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiPosition.Left);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._action            = MO.Class.register(o, new MO.APtyString('_action'));
   o._listenersClick    = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleForm         = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleIcon         = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleIconPanel    = MO.Class.register(o, new MO.AStyleIcon('_styleIconPanel'));
   o._hForm             = null;
   o._hLeftButton       = null;
   o._hMiddleButton     = null;
   o._hRightButton      = null;
   o._hLabelPanel       = null;
   o._hLabel            = null;
   o.onBuild            = MO.FDuiButton_onBuild;
   o.onClick            = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiButton_onClick);
   o.doClick            = MO.FDuiButton_doClick;
   return o;
}
MO.FDuiButton_onBuild = function FDuiButton_onBuild(e){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Form'));
   var hLine  = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.width = 16;
      o._hIcon = MO.Window.Builder.appendIcon(hCell, o.styleName('Icon'), o._icon);
   }
   if(o.label){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.align = 'center';
      hCell.noWrap = true;
      o._hLabel = MO.Window.Builder.appendText(hCell, o.styleName('Label'), o._label);
   }
}
MO.FDuiButton_onButtonEnter = function FDuiButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('HoverLeft');
     o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
     o._hRightButton.background = o.styleIconPath('HoverRight');
   }
}
MO.FDuiButton_onButtonLeave = function FDuiButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('ButtonLeft');
     o._hMiddleButton.background = o.styleIconPath('Button');
     o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
MO.FDuiButton_onButtonDown = function FDuiButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('PressLeft');
     o._hMiddleButton.background = o.styleIconPath('PressMiddle');
     o._hRightButton.background = o.styleIconPath('PressRight');
   }
}
MO.FDuiButton_onButtonUp = function FDuiButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
     o._hLeftButton.background = o.styleIconPath('ButtonLeft');
     o._hMiddleButton.background = o.styleIconPath('Button');
     o._hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
MO.FDuiButton_onButtonClickDelay = function FDuiButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = MO.EActive.Sleep;
}
MO.FDuiButton_onClick = function FDuiButton_onClick(e){
   this.doClick();
}
MO.FDuiButton_onButtonClick = function FDuiButton_onButtonClick(e){
   this.doClick();
}
MO.FDuiButton_oeMode = function FDuiButton_oeMode(e){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   return MO.EEventStatus.Stop;
}
MO.FDuiButton_setLabel = function FDuiButton_setLabel(v){
   var o = this;
   o.label = v;
   o._hLabel.innerText = v;
   o._hLabel.noWrap = true;
}
MO.FDuiButton_setLabelColor = function FDuiButton_setLabelColor(c){
   var o = this;
   o._hLabel.style.color = '#FF0000';
}
MO.FDuiButton_setLabelStyle = function FDuiButton_setLabelStyle(c, w, s){
   var o = this;
   o._hLabel.style.color = '#FF0000';
   o._hLabel.style.fontWeight = 'bold';
   o._hLabel.style.fontSize = '12';
}
MO.FDuiButton_doClick = function FDuiButton_doClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiButton_dispose = function FDuiButton_dispose(){
   var o = this;
   o._hForm = null;
   o._hFormEnd = null;
   o._hLabel = null;
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiCalendar = function FDuiCalendar(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDropable, MO.MDescCalendar);
   o.editFormat  = MO.Lang.Date.DisplayFormat;
   o.editHour     = MO.Class.register(o, new MO.TPtyBoolSet('editHour', 'editDate', MO.EDateTimeMode.Hour));
   o.editMinute   = MO.Class.register(o, new MO.TPtyBoolSet('editMinute', 'editDate', MO.EDateTimeMode.Minute));
   o.editSecond   = MO.Class.register(o, new MO.TPtyBoolSet('editSecond', 'editDate', MO.EDateTimeMode.Second));
   o.borderStyle = MO.EUiBorder.RoundDrop;
   o.date        = null;
   o.lsnEditEnd  = null;
   o.hForm       = null;
   o.hDrop       = null;
   o.hForm       = null;
   o.onKeyPress  = MO.FDuiCalendar_onKeyPress;
   o.onDataClick   = MO.FDuiCalendar_onDataClick;
   o.refreshStyle  = MO.FDuiCalendar_refreshStyle;
   o.onEditEnd   = MO.FDuiCalendar_onEditEnd;
   o.onBuildEdit = MO.FDuiCalendar_onBuildEdit;
   o.construct   = MO.FDuiCalendar_construct;
   o.formatValue = MO.FDuiCalendar_formatValue;
   o.formatText  = MO.FDuiCalendar_formatText;
   o.drop        = MO.FDuiCalendar_drop;
   o.doBlur      = MO.FDuiCalendar_doBlur;
   return o;
}
MO.FDuiCalendar_onDataClick = function FDuiCalendar_onDataClick(){
   var o = this;
   if(!o.editCheck){
      o.drop();
   }
}
MO.FDuiCalendar_onBuildEdit = function FDuiCalendar_onBuildEdit(b){
   var o = this;
   var htb = MO.Window.Builder.appendTable(b.hPanel);
    htb.style.tableLayout = 'fixed';
    var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = hr.insertCell();
   var h = o.hEdit = MO.Window.Builder.appendEdit(hc, o.style('Edit'));
   h.style.disabled = 'true';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
MO.FDuiCalendar_onEditEnd = function FDuiCalendar_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
MO.FDuiCalendar_onKeyPress = function FDuiCalendar_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      RKey.eventClear(e);
   }
}
MO.FDuiCalendar_construct = function FDuiCalendar_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.date = new TDate();
   o.lsnEditEnd = new TListener(o, o.onEditEnd);
}
MO.FDuiCalendar_formatValue = function FDuiCalendar_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o.date.now();
         return MO.Lang.Date.formatDate(o.date);
      }else{
         MO.Lang.Date.autoParse(o.date, t);
         return MO.Lang.Date.formatDate(o.date);
      }
   }
   return MO.Lang.String.nvl(t);
}
MO.FDuiCalendar_formatText = function FDuiCalendar_formatText(value){
   if(value){
      var o = this;
      MO.Lang.Date.autoParse(o.date, value);
      return MO.Lang.Date.formatDate(o.date, o.editFormat);
   }
   return MO.Lang.String.nvl(value);
}
MO.FDuiCalendar_refreshStyle = function FDuiCalendar_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
MO.FDuiCalendar_drop = function FDuiCalendar_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FDuiCalendarEditor, o.name);
      e.set(o.reget(), o.editFormat);
      e.setHourEditable(o.editHour);
      e.setMinuteEditable(o.editMinute);
      e.setSecondEditable(o.editSecond);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
MO.FDuiCalendar_doBlur = function FDuiCalendar_doBlur(){
   var o = this;
   o.base.FEditControl.doBlur.call(o);
   if(o.editor){
      o.editor.hide();
   }
}
MO.FDuiCalendarEditor = function FDuiCalendarEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MDuiFocusLooper);
   o.editFormat       = null;
   o.dataValue        = null;
   o.date             = new MO.TDate();
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
   o.editFormat       = MO.MO.Lang.Date.DisplayFormat;
   o.dateOrg          = new MO.TDate();
   o.dateOrgValue     = null;
   o.dayCells         = new MO.TList();
   o.focusObject      = null;
   o.skipBlur         = false;
   o.styleYearMonth   = MO.Class.register(o, new TStyle('YearMonth'));
   o.styleButton      = MO.Class.register(o, new TStyle('Button'));
   o.styleButtonHover = MO.Class.register(o, new TStyle('ButtonHover'));
   o.styleDay         = MO.Class.register(o, new TStyle('Day'));
   o.styleDaySel      = MO.Class.register(o, new TStyle('DaySel'));
   o.styleDayHover    = MO.Class.register(o, new TStyle('DayHover'));
   o.styleDayFree     = MO.Class.register(o, new TStyle('DayFree'));
   o.styleDayNone     = MO.Class.register(o, new TStyle('DayNone'));
   o.styleTitlePanel  = MO.Class.register(o, new TStyle('TitlePanel'));
   o.styleDaysPanel   = MO.Class.register(o, new TStyle('DaysPanel'));
   o.styleTimePanel   = MO.Class.register(o, new TStyle('TimePanel'));
   o.styleMonth       = MO.Class.register(o, new TStyle('Year'));
   o.styleMonth       = MO.Class.register(o, new TStyle('Month'));
   o.styleWeek        = MO.Class.register(o, new TStyle('Week'));
   o.styleTime        = MO.Class.register(o, new TStyle('Time'));
   o.styleHour        = MO.Class.register(o, new TStyle('Hour'));
   o.styleSplit       = MO.Class.register(o, new TStyle('Split'));
   o.styleMinute      = MO.Class.register(o, new TStyle('Minute'));
   o.styleSecond      = MO.Class.register(o, new TStyle('Second'));
   o.styleNow         = MO.Class.register(o, new TStyle('Now'));
   o.styleOk          = MO.Class.register(o, new TStyle('Ok'));
   o.onDaySelect      = MO.Class.register(o, new HMouseDown('onDaySelect'), FDuiCalendarEditor_onDaySelect);
   o.onButtonNow      = MO.Class.register(o, new HMouseDown('onButtonNow'), FDuiCalendarEditor_onButtonNow);
   o.onDateKeyDown    = MO.Class.register(o, new HKeyDown('onDateKeyDown'), FDuiCalendarEditor_onDateKeyDown);
   o.onDateBlur       = MO.Class.register(o, new HBlur('onDateBlur'), FDuiCalendarEditor_onDateBlur);
   o.onTimeBlur       = MO.Class.register(o, new HBlur('onTimeBlur'), FDuiCalendarEditor_onTimeBlur);
   o.onTimeClick      = MO.Class.register(o, new HClick('onTimeClick'), FDuiCalendarEditor_onTimeClick);
   o.onDayDbClick     = MO.Class.register(o, new HDoubleClick('onDayDbClick'), FDuiCalendarEditor_onDayDbClick);
   o.onDayEnter       = MO.Class.register(o, new HMouseEnter('onDayEnter'),    FDuiCalendarEditor_onDayEnter);
   o.onDayOut         = MO.Class.register(o, new HMouseOut('onDayOut'),        FDuiCalendarEditor_onDayOut);
   o.onButtonOk       = MO.Class.register(o, new HMouseDown('onButtonOk'),     FDuiCalendarEditor_onButtonOk);
   o.onButtonCancel   = MO.Class.register(o, new HMouseDown('onButtonCancel'), FDuiCalendarEditor_onButtonCancel);
   o.onButtonOver     = MO.Class.register(o, new HMouseEnter('onButtonOver'),  FDuiCalendarEditor_onButtonOver);
   o.onButtonOut      = MO.Class.register(o, new HMouseOut('onButtonOut'),     FDuiCalendarEditor_onButtonOut);
   o.onMdown          = MO.Class.register(o, new HMouseDown('onMdown'),        FDuiCalendarEditor_onMdown);
   o.onMup            = MO.Class.register(o, new HMouseUp('onMup'),            FDuiCalendarEditor_onMup);
   o.onBuildDrop      = MO.FDuiCalendarEditor_onBuildDrop;
   o.show             = MO.FDuiCalendarEditor_show;
   o.setMinuteEditable = MO.FDuiCalendarEditor_setMinuteEditable;
   o.setHourEditable   = MO.FDuiCalendarEditor_setHourEditable;
   o.setSecondEditable = MO.FDuiCalendarEditor_setSecondEditable;
   o.buildTitle       = MO.FDuiCalendarEditor_buildTitle;
   o.buildDays        = MO.FDuiCalendarEditor_buildDays;
   o.buildTime        = MO.FDuiCalendarEditor_buildTime;
   o.testBlur         = MO.FDuiCalendarEditor_testBlur;
   o.get              = MO.FDuiCalendarEditor_get;
   o.set              = MO.FDuiCalendarEditor_set;
   o.setDate          = MO.FDuiCalendarEditor_setDate;
   o.storeChange      = MO.FDuiCalendarEditor_storeChange;
   o.daySelectLsns    = new MO.TListeners();
   o.onBuildButton    = MO.FDuiCalendarEditor_onBuildButton;
   o.ohKdown          = MO.FDuiCalendarEditor_ohKdown;
   o.ohDaysChange     = MO.FDuiCalendarEditor_ohDaysChange;
   o.ohKeyCheck       = MO.FDuiCalendarEditor_ohKeyCheck;
   o.onDateAction     = MO.FDuiCalendarEditor_onDateAction;
   o.panel            = MO.FDuiCalendarEditor_panel;
   o.dispose          = MO.FDuiCalendarEditor_dispose;
   return o;
}
MO.FDuiCalendarEditor_onTimeClick = function FDuiCalendarEditor_onTimeClick(e){
   var o = this;
   var h = e.hSource;
   if(h.editAble){
      h.select();
   }
}
MO.FDuiCalendarEditor_onTimeBlur = function FDuiCalendarEditor_onTimeBlur(e){
   var o = this;
    var h = e.hSource;
    if(h == o.hHour){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 23);
    }else if(h == o.hMinute){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 59);
    }else if(h == o.hSecond){
       h.value = Math.min(MO.Lang.Integer.parse(h.value), 59);
    }
    o.storeChange();
    o.setDate(o.date);
}
MO.FDuiCalendarEditor_onDayDbClick = function FDuiCalendarEditor_onDayDbClick(e){
   var o = e.source
   if(MO.Class.isClass(o, FDuiCalendarEditor) && 0 != MO.Lang.Integer.parse(e.hSource.innerText)){
      o.date.setDay(e.hSource.innerText);
      o.dataValue = MO.Lang.Date.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onDaySelect = function FDuiCalendarEditor_onDaySelect(e){
   var o = this;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && 0 != MO.Lang.Integer.parse(e.hSource.innerText)){
     var h = e.hSource;
     if(o.hSelect){
        o.hSelect.style.border = '1 solid #FFFFFF';
     };
     o.hSelect = h;
     h.style.border = '1 solid #2BD6F0';
      o.date.setDay(h.innerText);
   }
}
MO.FDuiCalendarEditor_onButtonNow = function FDuiCalendarEditor_onButtonNow(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.dataValue = MO.Lang.Date.format();
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onDateKeyDown = function FDuiCalendarEditor_onDateKeyDown(e, he){
   var o = this;
   var h = e.hSource;
   var v = h.value;
   if(EKey.Enter == e.keyCode){
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Up == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = MO.Lang.Integer.parse(o.hYear.value) + 1;
      }else if(h == o.hMonth){
         o.hMonth.value = MO.Lang.Integer.parse(o.hMonth.value) + 1;
      }else if(h == o.hHour){
         if(o.hHour.editAble){
           if(v < 23){
             h.value = MO.Lang.Integer.parse(h.value) + 1;
          }
         }
     }else if(h == o.hMinute){
       if(o.hMinute.editAble){
          if(v < 59){
            h.value = MO.Lang.Integer.parse(h.value) + 1;
         }
        }
     }else{
        if(o.hSecond.editAble){
           if(v < 59){
             h.value = MO.Lang.Integer.parse(h.value) + 1;
           }
         }
     }
      o.storeChange();
      o.setDate(o.date);
   }else if(EKey.Down == e.keyCode){
      if(h == o.hYear){
         o.hYear.value = MO.Lang.Integer.parse(o.hYear.value) - 1;
      }else if(h == o.hMonth){
         o.hMonth.value = MO.Lang.Integer.parse(o.hMonth.value) - 1;
      }else if(h == o.hHour){
        if(o.hHour.editAble){
            if(v > 0){
              h.value = MO.Lang.Integer.parse(h.value) - 1;
           }
        }
     }else if(h == o.hMinute){
        if(o.hMinute.editAble){
           if(v > 0){
               h.value = MO.Lang.Integer.parse(h.value) - 1;
            }
        }
     }else{
        if(o.hSecond.editAble){
           if(v > 0){
              h.value = MO.Lang.Integer.parse(h.value) - 1;
           }
        }
     }
      o.storeChange();
      o.setDate(o.date);
      h.select();
   }else{
     if(h == o.hHour || h == o.hMinute || h == o.hSecond){
        if(h.editAble){
           RKey.fixChars(he, MO.Lang.Date.Chars);
        }else{
           he.keyCode = 0;
           he.returnValue = false;
        }
     }else{
        RKey.fixChars(he, MO.Lang.Date.Chars);
     }
   }
}
MO.FDuiCalendarEditor_onDateBlur = function FDuiCalendarEditor_onDateBlur(){
   var o = this;
   o.storeChange();
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_onBuildDrop = function FDuiCalendarEditor_onBuildDrop(){
   var o = this;
   o.hDatePanel = MO.Window.Builder.appendTable(o.hDropPanel);
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
MO.FDuiCalendarEditor_show = function FDuiCalendarEditor_show(v){
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
MO.FDuiCalendarEditor_buildTitle = function FDuiCalendarEditor_buildTitle(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hTitlePanel, null, 0, 5, 1);
   hTab.align = 'center';
   hTab.width = '100%';
   hTab.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#E5FAFE', endColorStr='#FFFFFF', gradientType='0')";
   var hRow = hTab.insertRow();
   var hCel = hRow.insertCell();
   var h = o.hYearPrior = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hYear = MO.Window.Builder.append(hCel, 'INPUT', o.style('Year'));
   h.maxLength = '4';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FDuiCalendarEditor:year');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hYearNext = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
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
   var h = o.hMonthPrior = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '3';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown",h);
   o.attachEvent("onMup",h);
   var hCel = hRow.insertCell();
   var h = o.hMonth = MO.Window.Builder.append(hCel, 'INPUT', o.style('Month'));
   h.maxLength = '2';
   o.attachEvent('onDateBlur', h, o.onDateBlur);
   o.attachEvent('onDateKeyDown', h, o.onDateKeyDown);
   var hCel = hRow.insertCell();
   hCel.innerText = RContext.get('FDuiCalendarEditor:month');
   hCel.className = o.style('YearMonth');
   var hCel = hRow.insertCell();
   var h = o.hMonthNext = MO.Window.Builder.append(hCel, 'SPAN', o.style('Button'));
   h.link = o;
   h.linkAction = o.onDateAction;
   h.innerText = '4';
   o.attachEvent("onButtonOver",h);
   o.attachEvent("onButtonOut",h);
   o.attachEvent("onMdown", h);
   o.attachEvent("onMup", h);
}
MO.FDuiCalendarEditor_buildDays = function FDuiCalendarEditor_buildDays(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hDaysPanel, null, 0, 0, 1);
   hTab.width = '100%';
   var weekDays = RContext.get('FDuiCalendarEditor:weekdays').split(',');
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
MO.FDuiCalendarEditor_buildTime = function FDuiCalendarEditor_buildTime(){
   var o = this;
   var hTab = MO.Window.Builder.appendTable(o.hTimePanel, null, 0, 1, 1);
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
   var hb = MO.Window.Builder.appendTable(hc, null, 0, 0, 0);
   hc.style.border = '1 solid #2BD6F0';
   hc.style.backgroundColor = '#FFFFFF';
   var hr = hb.insertRow();
   var hh =hr.insertCell();
   var hHour = o.hHour = MO.Window.Builder.appendEdit(hh, o.style('Hour'));
   hHour.maxLength = 2;
   o.attachEvent("onTimeClick", hHour);
   o.attachEvent("onDateKeyDown", hHour, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hHour, o.onTimeBlur);
   var hs1 = hr.insertCell();
   hs1.innerText = ':';
   var hm = hr.insertCell();
   var hMinute = o.hMinute = MO.Window.Builder.appendEdit(hm, o.style('Minute'));
   hMinute.maxLength = 2;
   o.attachEvent("onTimeClick", hMinute);
   o.attachEvent("onDateKeyDown", hMinute, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hMinute, o.onTimeBlur);
   var hs2 = hr.insertCell();
   hs2.innerText = ':';
   var hs = hr.insertCell();
   var hSecond = o.hSecond = MO.Window.Builder.appendEdit(hs, o.style('Second'));
   hSecond.maxLength = 2;
   o.attachEvent("onTimeClick", hSecond);
   o.attachEvent("onDateKeyDown", hSecond, o.onDateKeyDown);
   o.attachEvent("onTimeBlur", hSecond, o.onTimeBlur);
   var hb2 = hRow.insertCell();
   hb2.width = 50;
   var hn = hRow.insertCell();
   hn.style.display = 'none';
   var hNow = o.hNow = MO.Window.Builder.append(hn, 'SPAN', o.style('Now'));
   hNow.style.width = 50;
   hn.style.border='1 solid #2BD6F0';
   hNow.innerText = RContext.get('FDuiCalendarEditor:now');
   hNow.style.display = 'none';
   hNow.link = o;
   o.attachEvent("onButtonNow", hNow);
   var hc = hRow.insertCell();
   var hCl = o.hCancel = MO.Window.Builder.append(hc, 'SPAN', o.style('Ok'));
   hCl.style.width = 50;
   hc.style.border='1 solid #2BD6F0';
   hCl.link = o;
   o.attachEvent("onButtonCancel", hCl);
   hCl.innerText = RContext.get('FDuiCalendarEditor:cancel');
   var ho = hRow.insertCell();
   var hOk = o.hOk = MO.Window.Builder.append(ho, 'SPAN', o.style('Ok'));
   hOk.style.width = 50;
   ho.style.border='1 solid #2BD6F0';
   hOk.link = o;
   o.attachEvent("onButtonOk", hOk);
   hOk.innerText = RContext.get('FDuiCalendarEditor:ok');
}
MO.FDuiCalendarEditor_testBlur = function FDuiCalendarEditor_testBlur(c){
   return this.source != c;
}
MO.FDuiCalendarEditor_get = function FDuiCalendarEditor_get(){
   return this.dataValue;
}
MO.FDuiCalendarEditor_set = function FDuiCalendarEditor_set(value, format){
   var o = this;
   o.changed = false;
   o.skipBlur = 0;
   o.dataValue = value;
   o.dateOrgValue = value;
   o.editFormat = format;
   MO.Lang.Date.parse(o.date, value);
   MO.Lang.Date.parse(o.dateOrg, value);
   if(!value){
      o.date.now();
      MO.Lang.Date.parse(o.date, value);
      MO.Lang.Date.parse(o.dateOrg, value);
   }
   o.setDate(o.date);
}
MO.FDuiCalendarEditor_setDate = function FDuiCalendarEditor_setDate(date){
   var o = this;
   o.hYear.value = date.year;
   o.hMonth.value = date.month;
   o.hHour.value = MO.Lang.String.lpad(date.hour, 2, '0');
   o.hMinute.value = MO.Lang.String.lpad(date.minute, 2, '0');
   o.hSecond.value = MO.Lang.String.lpad(date.second, 2,'0');
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
MO.FDuiCalendarEditor_setHourEditable = function FDuiCalendarEditor_setHourEditable(v){
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
MO.FDuiCalendarEditor_setMinuteEditable = function FDuiCalendarEditor_setMinuteEditable(v){
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
MO.FDuiCalendarEditor_setSecondEditable = function FDuiCalendarEditor_setSecondEditable(v){
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
MO.FDuiCalendarEditor_storeChange = function FDuiCalendarEditor_storeChange(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setHour(Math.min(MO.Lang.Integer.parse(o.hHour.value), 23));
   o.date.setMinute(Math.min(MO.Lang.Integer.parse(o.hMinute.value), 59));
   o.date.setSecond(Math.min(MO.Lang.Integer.parse(o.hSecond.value), 59));
}
MO.FDuiCalendarEditor_onBuildButton = function FDuiCalendarEditor_onBuildButton(){
   var o = this;
}
MO.FDuiCalendarEditor_onMdown = function FDuiCalendarEditor_onMdown(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.isSkipBlur = true;
      if(e.hSource.linkAction){
         e.hSource.linkAction.call(o, e.hSource);
      }
   }
}
MO.FDuiCalendarEditor_onMup = function FDuiCalendarEditor_onMup(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      var f = o.focusObject;
      if(f && f.focus && f.select){
         f.focus();
         f.select();
      }
   }
}
MO.FDuiCalendarEditor_ohKdown = function FDuiCalendarEditor_ohKdown(){
   var o = this.link;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
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
MO.FDuiCalendarEditor_onButtonOver = function FDuiCalendarEditor_onButtonOver(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('ButtonHover');
   }
}
MO.FDuiCalendarEditor_onButtonOut = function FDuiCalendarEditor_onButtonOut(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      e.hSource.className = o.style('Button');
   }
}
MO.FDuiCalendarEditor_onButtonOk = function FDuiCalendarEditor_onButtonOk(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.editStatus = EEditStatus.Ok;
      o.dataValue = MO.Lang.Date.formatDate(o.date);
      o.editEnd();
   }
}
MO.FDuiCalendarEditor_onButtonCancel = function FDuiCalendarEditor_onButtonCancel(e) {
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
    o.editStatus = EEditStatus.Cancel;
     o.dataValue = '';
     o.editEnd();
   }
}
MO.FDuiCalendarEditor_ohDaysChange = function FDuiCalendarEditor_ohDaysChange(){
   var o = this.link;
   if(MO.Class.isClass(o, FDuiCalendarEditor)){
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.setDate(o.date);
   }
}
MO.FDuiCalendarEditor_ohKeyCheck = function FDuiCalendarEditor_ohKeyCheck(){
   var e = RWindow.event(this)
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      e.keyCode = 0;
   }
}
MO.FDuiCalendarEditor_onDayEnter = function FDuiCalendarEditor_onDayEnter(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = o.style('DayHover');
      }
   }
}
MO.FDuiCalendarEditor_onDayOut = function FDuiCalendarEditor_onDayOut(e){
   var o = e.source;
   if(MO.Class.isClass(o, FDuiCalendarEditor) && e.hSource.innerText != '.'){
      if(!e.hSource.isCurrent){
         e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
      }
   }
}
MO.FDuiCalendarEditor_onDateAction = function FDuiCalendarEditor_onDateAction(h){
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
MO.FDuiCalendarEditor_panel = function FDuiCalendarEditor_panel(type){
   var o = this;
   if(EPanel.Shadow == type){
      return o.hPanel;
   }
   return o.base.FDropEditor.panel.call(o, type);
}
MO.FDuiCalendarEditor_dispose = function FDuiCalendarEditor_dispose(){
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
MO.FDuiCheck = function FDuiCheck(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyCheck, MO.MListenerDataChanged);
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiCheck_onBuildEditValue;
   o.onInputClick     = MO.Class.register(o, new MO.AEventClick('onInputClick'), MO.FDuiCheck_onInputClick);
   o.oeSaveValue      = MO.FDuiCheck_oeSaveValue;
   o.construct        = MO.FDuiCheck_construct;
   o.formatLoad       = MO.FDuiCheck_formatLoad;
   o.formatSave       = MO.FDuiCheck_formatSave;
   o.get              = MO.FDuiCheck_get;
   o.set              = MO.FDuiCheck_set;
   o.refreshValue     = MO.FDuiCheck_refreshValue;
   o.refreshStyle     = MO.FDuiCheck_refreshStyle;
   return o;
}
MO.FDuiCheck_onBuildEditValue = function FDuiCheck_onBuildEditValue(p){
   var o = this;
   var h = o._hInput = MO.Window.Builder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}
MO.FDuiCheck_onInputClick = function FDuiCheck_onInputClick(p){
   this.refreshValue();
}
MO.FDuiCheck_oeSaveValue = function FDuiCheck_oeSaveValue(e){
   var o = this;
   if(MO.EStore.Prepare == e.store){
      if(MO.Lang.Boolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return MO.EEventStatus.Stop;
   }
   return o.base.FDuiEditControl.oeSaveValue.call(o, e);
}
MO.FDuiCheck_construct = function FDuiCheck_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._editSize.set(60, 20);
}
MO.FDuiCheck_formatLoad = function FDuiCheck_formatLoad(value){
   var o = this;
   return (value == o._valueTrue);
}
MO.FDuiCheck_formatSave = function FDuiCheck_formatSave(value){
   var o = this;
   return MO.Lang.Boolean.toString(value, o._valueTrue, o._valueFalse);
}
MO.FDuiCheck_get = function FDuiCheck_get(){
   return this._hInput.checked;
}
MO.FDuiCheck_set = function FDuiCheck_set(value){
   this._hInput.checked = value;
}
MO.FDuiCheck_refreshValue = function FDuiCheck_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiCheck_refreshStyle = function FDuiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
MO.FDuiCheckPicker = function FDuiCheckPicker(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescCheckPicker, MO.MDropable);
   o.stIconDropSelect = MO.Class.register(o, new MO.AStyleIcon('DropSelect'));
   o.items            = new MO.TItems();
   o.borderStyle      = MO.EUiBorder.RoundDrop;
   o.onBuildEdit      = MO.FDuiCheckPicker_onBuildEdit;
   o.onEditEnd        = MO.FDuiCheckPicker_onEditEnd;
   o.onDataKeyDown    = MO.FDuiCheckPicker_onDataKeyDown;
   o.loadConfig       = MO.FDuiCheckPicker_loadConfig;
   o.formatValue      = MO.FDuiCheckPicker_formatValue;
   o.validText        = MO.FDuiCheckPicker_validText;
   o.formatText       = MO.FDuiCheckPicker_formatText;
   o.refreshStyle     = MO.FDuiCheckPicker_refreshStyle;
   o.drop             = MO.FDuiCheckPicker_drop;
   o.dispose          = MO.FDuiCheckPicker_dispose;
   return o;
}
MO.FDuiCheckPicker_onBuildEdit = function FDuiCheckPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = MO.Window.Builder.appendEdit(b.hPanel, o.style('Edit'));
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
MO.FDuiCheckPicker_onEditEnd = function FDuiCheckPicker_onEditEnd(editor){
   var o = this;
   MO.Logger.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
   if(editor){
      o.set(editor.values);
   }
   o.onDataEditEnd(o);
   MO.Logger.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
}
MO.FDuiCheckPicker_loadConfig = function FDuiCheckPicker_loadConfig(c){
   var o = this;
   o.base.FEditControl.loadConfig.call(o, c);
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return MO.EStatus.Stop;
}
MO.FDuiCheckPicker_text = function FDuiCheckPicker_text(){
   return this.hEdit.value;
}
MO.FDuiCheckPicker_setText = function FDuiCheckPicker_setText(text){
   this.hEdit.value = text;
}
MO.FDuiCheckPicker_formatValue = function FDuiCheckPicker_formatValue(text){
   var o = this;
   if(!MO.Lang.String.isEmpty(text)){
      ta = MO.Lang.String.split(text, ',');
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
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
}
MO.FDuiCheckPicker_validText = function FDuiCheckPicker_validText(text){
   var o = this;
   if(MO.Lang.String.isEmpty(text)){
      return true;
   }
   return !MO.Lang.String.isEmpty(o.formatValue(text));
}
MO.FDuiCheckPicker_formatText = function FDuiCheckPicker_formatText(v){
   var o = this;
   if(!MO.Lang.String.isEmpty(v)){
      va = MO.Lang.String.split(v, ',');
      var vs = new Array();
      var item = o.items.items;
      for(var n = 0; n < va.length; n++){
         var t = item.values[item.indexOf(va[n])];
         if(t){
            vs.push(t.label);
         }
      }
      return MO.Lang.String.toUpper(vs.join());
   }else{
      return '';
   }
}
MO.FDuiCheckPicker_refreshStyle = function FDuiCheckPicker_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
}
MO.FDuiCheckPicker_drop = function FDuiCheckPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit && o.items.count() > 0){
      var ed = o.editor = MO.Console.find(FEditConsole).focus(o, FDuiCheckPickerEditor, o.editRefer);
      if(ed.linkControl(o)){
         ed.setItems(o.items);
         ed.set(o.reget());
      }
      ed.show();
   }
}
MO.FDuiCheckPicker_onDataKeyDown = function FDuiCheckPicker_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.items.count()){
      if(o.editor && o.editor.source == o){
         o.editor.onEditKeyDown(s, e);
      }
   }
}
MO.FDuiCheckPicker_dispose = function FDuiCheckPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = MO.Lang.Html.free(o.hEdit);
}
MO.FDuiCheckPickerEditor = function FDuiCheckPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   o.MinWidth         = 120;
   o.onEditFocus      = MO.Class.register(o, new MO.HFocus('onEditFocus'));
   o.onEditBlur       = MO.Class.register(o, new MO.HBlur('onEditBlur'));
   o.stIconDropSelect = MO.Class.register(o, new MO.TStyleIcon('DropSelect'));
   o.stFlag           = MO.Class.register(o, new MO.TStyle('Flag'));
   o.stEditForm       = MO.Class.register(o, new MO.TStyle('EditForm'));
   o.pattern          = null;
   o.originItem       = null;
   o.selectItem       = null;
   o.items            = null;
   o.itemClickListener = null;
   o.values           = new Array();
   o.hBtnTextSpan     = null;
   o.onBuildDrop      = MO.FDuiCheckPickerEditor_onBuildDrop;
   o.onBuildButton    = MO.FDuiCheckPickerEditor_onBuildButton;
   o.onItemClick      = MO.FDuiCheckPickerEditor_onItemClick;
   o.onEditKeyDown    = MO.FDuiCheckPickerEditor_onEditKeyDown;
   o.construct        = MO.FDuiCheckPickerEditor_construct;
   o.set              = MO.FDuiCheckPickerEditor_set;
   o.setItems         = MO.FDuiCheckPickerEditor_setItems;
   o.select           = MO.FDuiCheckPickerEditor_select;
   o.linkControl      = MO.FDuiCheckPickerEditor_linkControl;
   o.show             = MO.FDuiCheckPickerEditor_show;
   o.hide             = MO.FDuiCheckPickerEditor_hide;
   o.dispose          = MO.FDuiCheckPickerEditor_dispose;
   return o;
}
MO.FDuiCheckPickerEditor_construct = function FDuiCheckPickerEditor_construct(){
   var o = this;
   o.itemClickListener = new TListener(o, o.onItemClick);
}
MO.FDuiCheckPickerEditor_onBuildDrop = function FDuiCheckPickerEditor_onBuildDrop(){
   var o = this;
   o.hItemsForm = MO.Window.Builder.appendTable(o.hDropPanel);
   o.hItemsForm.width = '100%';
   o.hItemsPanel = MO.Window.Builder.append(o.hItemsForm, 'TBODY');
   o.onBuildButton();
}
MO.FDuiCheckPickerEditor_onBuildButton = function FDuiCheckPickerEditor_onBuildButton(){
   var o = this;
   o.base.FDropEditor.onBuildButton.call(o);
   var h = o.hBtnTextSpan = MO.Window.Builder.newSpan(o.hButtonPanel, null);
   h.innerText = 'colse';
}
MO.FDuiCheckPickerEditor_onItemClick = function FDuiCheckPickerEditor_onItemClick(s){
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
MO.FDuiCheckPickerEditor_select = function FDuiCheckPickerEditor_select(p){
   var o = this;
   var cs = o.components;
   p = Math.min(Math.max(0, p), cs.count-1)
   for(var n=0; n<cs.count; n++){
      o.components.value(n).setChecked(n == p);
   }
   o.position = p;
}
MO.FDuiCheckPickerEditor_onEditKeyDown = function FDuiCheckPickerEditor_onEditKeyDown(s, e){
   var o = this;
   return;
}
MO.FDuiCheckPickerEditor_set = function FDuiCheckPickerEditor_set(v){
   var o = this;
   var cs = o.components;
   var cl = cs.count;
   for(var n = 0;n < cl;n++){
      cs.value(n).setChecked(false);
   }
   if(!MO.Lang.String.isEmpty(v)){
      o.values = v;
      va = MO.Lang.String.split(v, ',');
      for(var n = 0; n < va.length; n++){
         var c = cs.get(va[n]);
         if(c){
            c.setChecked(true);
         }
      }
   }
}
MO.FDuiCheckPickerEditor_setItems = function FDuiCheckPickerEditor_setItems(items){
   var o = this;
   if(o.components){
      return;
   }
   var hip = o.hItemsPanel;
   o.items = items;
   var count = items.count();
   for(var n=0; n<count; n++){
      if(n > 0){
         var hr = MO.Window.Builder.append(hip, 'TR');
         hr.height = 1;
         var hd = MO.Window.Builder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24c2db';
         MO.Window.Builder.appendEmpty(hd);
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
MO.FDuiCheckPickerEditor_linkControl = function FDuiCheckPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', MO.Class.dump(c.hEditCell), MO.Class.dump(c.hEdit));
   MO.Window.Html.toRect(o.rect, c.hEditCell);
   MO.Window.Html.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
MO.FDuiCheckPickerEditor_show = function FDuiCheckPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
MO.FDuiCheckPickerEditor_hide = function FDuiCheckPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
MO.FDuiCheckPickerEditor_dispose = function FDuiCheckPickerEditor_dispose(){
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
MO.FDuiColor = function FDuiColor(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiColor_onBuildEditValue;
   o.construct        = MO.FDuiColor_construct;
   o.get              = MO.FDuiColor_get;
   o.set              = MO.FDuiColor_set;
   return o;
}
MO.FDuiColor_oeDataLoad = function FDuiColor_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
MO.FDuiColor_oeDataSave = function FDuiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
MO.FDuiColor_onBuildEditValue = function FDuiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = MO.Window.Builder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiColor_construct = function FDuiColor_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
MO.FDuiColor_get = function FDuiColor_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
MO.FDuiColor_set = function FDuiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = MO.Lang.String.nvl(p);
   }
}
MO.FDuiColor_onDataKeyDown = function FDuiColor_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor_formatValue = function FDuiColor_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor_setText = function FDuiColor_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor_validText = function FDuiColor_validText(t){
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
MO.FDuiColor_findEditor = function FDuiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColorConsole).focus(o, FDuiColorEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor_drop = function FDuiColor_drop(){
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
MO.FDuiColor_clone = function FDuiColor_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor_link = function FDuiColor_link(){
   var o = this;
}
MO.FDuiColor3Tpl = function FDuiColor3Tpl(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MListenerDataChanged);
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   o.onBuildEditValue  = MO.FDuiColor3Tpl_onBuildEditValue;
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('MO.onInputChanged'), FDuiColor3Tpl_onInputChanged);
   o.construct         = MO.FDuiColor3Tpl_construct;
   o.get               = MO.FDuiColor3Tpl_get;
   o.set               = MO.FDuiColor3Tpl_set;
   return o;
}
MO.FDuiColor3Tpl_onBuildEditValue = function FDuiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}
MO.FDuiColor3Tpl_onInputKeyPress = function FDuiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
MO.FDuiColor3Tpl_onInputChanged = function FDuiColor3Tpl_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiColor3Tpl_construct = function FDuiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}
MO.FDuiColor3Tpl_get = function FDuiColor3Tpl_get(p){
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
MO.FDuiColor3Tpl_set = function FDuiColor3Tpl_set(p){
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
MO.FDuiColor3Tpl_onDataKeyDown = function FDuiColor3Tpl_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor3Tpl_formatValue = function FDuiColor3Tpl_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor3Tpl_setText = function FDuiColor3Tpl_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor3Tpl_validText = function FDuiColor3Tpl_validText(t){
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
MO.FDuiColor3Tpl_findEditor = function FDuiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColor3TplConsole).focus(o, FDuiColor3TplEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor3Tpl_drop = function FDuiColor3Tpl_drop(){
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
MO.FDuiColor3Tpl_clone = function FDuiColor3Tpl_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor3Tpl_link = function FDuiColor3Tpl_link(){
   var o = this;
}
MO.FDuiColor4 = function FDuiColor4(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiColor4_onBuildEditValue;
   o.construct        = MO.FDuiColor4_construct;
   o.get              = MO.FDuiColor4_get;
   o.set              = MO.FDuiColor4_set;
   return o;
}
MO.FDuiColor4_oeDataLoad = function FDuiColor4_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}
MO.FDuiColor4_oeDataSave = function FDuiColor4_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
MO.FDuiColor4_onBuildEditValue = function FDuiColor4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = MO.Window.Builder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiColor4_construct = function FDuiColor4_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
MO.FDuiColor4_get = function FDuiColor4_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
MO.FDuiColor4_set = function FDuiColor4_set(p){
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
MO.FDuiColor4_onDataKeyDown = function FDuiColor4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiColor4_formatValue = function FDuiColor4_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiColor4_setText = function FDuiColor4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor4_validText = function FDuiColor4_validText(t){
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
MO.FDuiColor4_findEditor = function FDuiColor4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColor4Console).focus(o, FDuiColor4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiColor4_drop = function FDuiColor4_drop(){
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
MO.FDuiColor4_clone = function FDuiColor4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiColor4_link = function FDuiColor4_link(){
   var o = this;
}
MO.FDuiColorPicker = function FDuiColorPicker(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescColor, MO.MDropable);
   o.borderStyle   = MO.EUiBorder.RoundDrop;
   o.onBuildEdit   = MO.FDuiColorPicker_onBuildEdit;
   o.onEditEnd     = MO.FDuiColorPicker_onEditEnd;
   o.onDataKeyDown = MO.FDuiColorPicker_onDataKeyDown;
   o.checkColor    = MO.FDuiColorPicker_checkColor;
   o.setText       = MO.FDuiColorPicker_setText;
   o.drop          = MO.FDuiColorPicker_drop;
   o.dispose       = MO.FDuiColorPicker_dispose;
   return o;
}
MO.FDuiColorPicker_onBuildEdit = function FDuiColorPicker_onBuildEdit(b){
   var o = this;
   var h = o.hEdit = MO.Window.Builder.appendEdit(b.hPanel, o.style('Edit'));
   h.maxLength = 20;
}
MO.FDuiColorPicker_onEditEnd = function FDuiColorPicker_onEditEnd(editor){
   var o = this;
   RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
   if(editor){
      o.set(editor.color);
      o.hDrop.style.backgroundColor = editor.color;
   }
   o.onDataEditEnd(o);
   RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
}
MO.FDuiColorPicker_setText = function FDuiColorPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, MO.Lang.String.toUpper(t));
   o.hDrop.style.backgroundColor = t;
}
MO.FDuiColorPicker_checkColor = function FDuiColorPicker_checkColor(c)
{
   var oSpan = document.createElement("<span style='color:"+c+";'></span>");
   if(oSpan.style.color != ""){
      return true;
   }else{
      return false;
   }
}
MO.FDuiColorPicker_onDataKeyDown = function FDuiColorPicker_onDataKeyDown(e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, o, e);
      if(o.checkColor(o.text())){
         o.hDrop.style.backgroundColor = o.text();
      }else{
         o.hDrop.style.backgroundColor = '';
      }
}
MO.FDuiColorPicker_drop = function FDuiColorPicker_drop(){
   var o = this;
   if(o.canDrop() && o.canEdit){
      var ed = o.editor = RConsole.find(FEditConsole).focus(o, FDuiColorPickerEditor, o.name);
      if(ed.linkControl(o)){
         ed.set(o.reget());
      }
      ed.show();
   }
}
MO.FDuiColorPicker_dispose = function FDuiColorPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
MO.FDuiColorPickerEditor = function FDuiColorPickerEditor(o){
   o = MO.Class.inherits(this, o, MO.FDropEditor, MO.MShadow);
   o.MinWidth     = 240;
   o.ColorHex     = new Array('00', '33', '66', '99', 'CC', 'FF');
   o.SpColorHex   = new Array('FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF','FF00FF');
   o.onCellEnter  = MO.Class.register(o, new HMouseOver('onCellEnter'),  MO.FDuiColorPickerEditor_onCellEnter);
   o.onCellSelect = MO.Class.register(o, new HMouseDown('onCellSelect'), MO.FDuiColorPickerEditor_onCellSelect);
   o.color        = null;
   o.hTable       = null;
   o.cellWidth    = 16;
   o.cellHeight   = 10;
   o.onBuildDrop  = MO.FDuiColorPickerEditor_onBuildDrop;
   o.onKeyDown    = MO.FDuiColorPickerEditor_onKeyDown;
   o.onCellSelect = MO.FDuiColorPickerEditor_onCellSelect;
    o.onEditEnd   = MO.FDuiColorPickerEditor_onEditEnd;
   o.makeCell     = MO.FDuiColorPickerEditor_makeCell;
   o.set          = MO.FDuiColorPickerEditor_set;
   o.show         = MO.FDuiColorPickerEditor_show;
   o.hide         = MO.FDuiColorPickerEditor_hide;
   o.linkControl  = MO.FDuiColorPickerEditor_linkControl;
   o.dispose      = MO.FDuiColorPickerEditor_dispose;
   return o;
}
MO.FDuiColorPickerEditor_onBuildDrop = function FDuiColorPickerEditor_onBuildDrop(){
   var o = this;
   o.hTable = MO.Window.Builder.appendTable(o.hDropPanel);
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
MO.FDuiColorPickerEditor_linkControl = function FDuiColorPickerEditor_linkControl(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   o.source = c;
   RLog.debug(o, 'link Panel (panel={0}, edit={1})', MO.Class.dump(c.hEditCell), MO.Class.dump(c.hEdit));
   MO.Window.Html.toRect(o.rect, c.hEditCell);
   MO.Window.Html.setPixelRect(o.hPanel, o.rect);
   o.hPanel.style.pixelTop = o.rect.bottom;
   var hbf = o.border.hForm;
   hbf.style.pixelWidth = c.editBorder.hForm.width;
   hbf.style.pixelHeight = c.editBorder.hForm.height;
   return true;
}
MO.FDuiColorPickerEditor_onCellEnter = function FDuiColorPickerEditor_onCellEnter(e){
   var o = this;
   o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
}
MO.FDuiColorPickerEditor_onCellSelect = function FDuiColorPickerEditor_onCellSelect(e){
   var o = this;
   o.color = e.srcElement.style.backgroundColor;
   o.editStatus = EEditStatus.Ok
   o.blur();
}
MO.FDuiColorPickerEditor_makeCell = function FDuiColorPickerEditor_makeCell(hRow, color) {
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
MO.FDuiColorPickerEditor_onKeyDown = function FDuiColorPickerEditor_onKeyDown(e){
   alert(FDuiColorPickerEditor_onKeyDown);
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
MO.FDuiColorPickerEditor_set = function FDuiColorPickerEditor_set(v){
   var o = this;
   o.color = v;
}
MO.FDuiColorPickerEditor_show = function FDuiColorPickerEditor_show(v){
   var o = this;
   o.base.FDropEditor.show.call(o, v);
   RConsole.find(FFocusConsole).focus(o);
   if(o.border.hForm.offsetWidth < o.MinWidth){
      o.border.hForm.style.pixelWidth = o.MinWidth;
   }
   o.base.MShadow.show.call(o, v);
   o.isSkipBlur = false;
}
MO.FDuiColorPickerEditor_onEditEnd = function FDuiColorPickerEditor_onEditEnd(){
   var o = this;
   var t = o.editable;
   RLog.debug(o, 'Edit end (editable={0}, status={1})', MO.Class.dump(t), REnum.decode(EEditStatus, o.editStatus));
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
MO.FDuiColorPickerEditor_hide = function FDuiColorPickerEditor_hide(){
   var o = this;
   o.source = null;
   o.base.FDropEditor.hide.call(o);
   o.base.MShadow.hide.call(o);
}
MO.FDuiColorPickerEditor_dispose = function FDuiColorPickerEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hDropPanel);
   RMemory.freeHtml(o.hEdit);
   o.hTable = null;
   o.hDropPanel = null;
   o.hEdit = null;
}
MO.FDuiColorPower = function FDuiColorPower(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged, MO.MMouseCapture);
   o._inputSize          = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._valueMin           = MO.Class.register(o, new MO.APtyNumber('_valueMin'));
   o._valueMax           = MO.Class.register(o, new MO.APtyNumber('_valueMax'));
   o._styleValuePanel    = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel    = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput         = MO.Class.register(o, new MO.AStyle('_styleInput'));
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
   o.onBuildEditValue    = MO.FDuiColorPower_onBuildEditValue;
   o.onMouseCaptureStart = MO.FDuiColorPower_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiColorPower_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiColorPower_onMouseCaptureStop;
   o.onInputKeyPress     = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColorPower_onInputKeyPress);
   o.onInputEdit         = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiColorPower_onInputEdit);
   o.onInputChange       = MO.Class.register(o, new MO.AEventChange('onInputChange'), MO.FDuiColorPower_onInputChange);
   o.construct           = MO.FDuiColorPower_construct;
   o.get                 = MO.FDuiColorPower_get;
   o.set                 = MO.FDuiColorPower_set;
   o.setDisplayColor     = MO.FDuiColorPower_setDisplayColor;
   o.setDisplay          = MO.FDuiColorPower_setDisplay;
   o.refreshValue        = MO.FDuiColorPower_refreshValue;
   o.dispose             = MO.FDuiColorPower_dispose;
   return o;
}
MO.FDuiColorPower_onBuildEditValue = function FDuiColorPower_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hcp = o._hColorPanel = MO.Window.Builder.appendTableCell(hl);
   hcp.width = 16;
   hcp.style.padding = '2px';
   o._hColorImage = MO.Window.Builder.appendIcon(hcp, null, 'n', 14, 65);
   var hcp = o._hChannelPanel = MO.Window.Builder.appendTableCell(hl);
   var hcf = o._hChannelForm = MO.Window.Builder.appendTable(hcp, null, 0, 1, 0);
   hcf.__linker = o;
   hcf.width = '100%';
   var b = o._barRed = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'red';
   b.hPanel = hcf;
   b.build();
   var b = o._barGreen = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'green';
   b.hPanel = hcf;
   b.build();
   var b = o._barBlue = new MO.SDuiColorChannel();
   b.control = o;
   b.typeCd = 'blue';
   b.hPanel = hcf;
   b.build();
   var b = o._barPower = new MO.SDuiColorPower();
   b.control = o;
   b.typeCd = 'power';
   b.setRange(o._valueMin, o._valueMax);
   b.hPanel = hcf;
   b.build();
}
MO.FDuiColorPower_onMouseCaptureStart = function FDuiColorPower_onMouseCaptureStart(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseDown(p);
   }
}
MO.FDuiColorPower_onMouseCapture = function FDuiColorPower_onMouseCapture(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseMove(p);
   }
}
MO.FDuiColorPower_onMouseCaptureStop = function FDuiColorPower_onMouseCaptureStop(p){
   var o = this;
   var b = MO.Window.Html.searchObject(p.hSource, '__pbar');
   if(b){
      b.onMouseUp(p);
   }
}
MO.FDuiColorPower_onInputKeyPress = function FDuiColorPower_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(MO.RKeyboard.isControlKey(c)){
      return;
   }
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
MO.FDuiColorPower_onInputEdit = function FDuiColorPower_onInputEdit(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputEdit();
   }
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_onInputChange = function FDuiColorPower_onInputChange(p){
   var o = this;
   var hs = p.hSender;
   var b = hs._pbar;
   if(b){
      b.changeInputChange();
   }
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_construct = function FDuiColorPower_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SColor4();
   o._innerDataValue = new MO.SColor4();
}
MO.FDuiColorPower_get = function FDuiColorPower_get(p){
   var o = this;
   var v = o._innerDataValue;
   v.red = o._barRed.get();
   v.green = o._barGreen.get();
   v.blue = o._barBlue.get();
   v.alpha = o._barPower.get();
   return v;
}
MO.FDuiColorPower_set = function FDuiColorPower_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   if(p.constructor == MO.SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
   o.changeSet(false);
}
MO.FDuiColorPower_setDisplayColor = function FDuiColorPower_setDisplayColor(){
   var o = this;
   var v = o._innerDataValue;
   var va = v.alpha;
   var vr = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.red * va * 255), 0, 255), 2);
   var vg = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.green * va * 255), 0, 255), 2);
   var vb = MO.Lang.Hex.format(MO.Lang.Integer.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
   o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
}
MO.FDuiColorPower_setDisplay = function FDuiColorPower_setDisplay(){
   var o = this;
   o.setDisplayColor();
   var v = o._innerDataValue;
   o._barRed.set(v.red);
   o._barGreen.set(v.green);
   o._barBlue.set(v.blue);
   o._barPower.set(v.alpha);
}
MO.FDuiColorPower_refreshValue = function FDuiColorPower_refreshValue(){
   var o = this;
   o.get();
   o.setDisplayColor();
   o.processDataChangedListener(o);
}
MO.FDuiColorPower_dispose = function FDuiColorPower_dispose(t){
   var o = this;
   o.__base.FDuiEditControl.dispose.call(o, t);
}
MO.FDuiDateTime = function FDuiDateTime(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiDropable);
   o.editDispMode = MO.Class.register(o, new MO.APtySet('editDisplay', 'editDate', MO.EDateTimeMode.Display));
   o.editYear     = MO.Class.register(o, new MO.APtySet('editYear', 'editDate', MO.EDateTimeMode.Year));
   o.editMonth    = MO.Class.register(o, new MO.APtySet('editMonth', 'editDate', MO.EDateTimeMode.Month));
   o.editDay      = MO.Class.register(o, new MO.APtySet('editDay', 'editDate', MO.EDateTimeMode.Day));
   o._date        = null;
   o.borderStyle  = MO.EUiBorder.RoundDrop;
   o.lsnEditEnd   = null;
   o.hYearPanel   = null;
   o.hYear        = null;
   o.hMonthPanel  = null;
   o.hMonth       = null;
   o.hDayPanel    = null;
   o.hDay         = null;
   o.onKeyPress   = MO.FDuiDateTime_onKeyPress;
   o.onEditEnd    = MO.FDuiDateTime_onEditEnd;
   o.onBuildEdit  = MO.FDuiDateTime_onBuildEdit;
   o.oeSaveValue  = MO.FDuiDateTime_oeSaveValue;
   o.construct    = MO.FDuiDateTime_construct;
   o.formatValue  = MO.FDuiDateTime_formatValue;
   o.text         = MO.FDuiDateTime_text;
   o.setText      = MO.FDuiDateTime_setText;
   o.validText    = MO.FDuiDateTime_validText;
   o.setEditable  = MO.FDuiDateTime_setEditable;
   o.refreshStyle = MO.FDuiDateTime_refreshStyle;
   o.drop         = MO.FDuiDateTime_drop;
   o.dispose      = MO.FDuiDateTime_dispose;
   return o;
}
MO.FDuiDateTime_onKeyPress = function FDuiDateTime_onKeyPress(e){
   if(!MO.Lang.String.inChars(String.fromCharCode(e.keyCode), MO.Lang.Date.Chars)){
      MO.RKey.eventClear(e);
   }
}
MO.FDuiDateTime_onEditEnd = function FDuiDateTime_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
   }
   o.onDataEditEnd(o);
}
MO.FDuiDateTime_onBuildEdit = function FDuiDateTime_onBuildEdit(b){
   var o = this;
   var htb = MO.Window.Builder.appendTable(b.hPanel);
   htb.width = '100%';
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell())
   var hc = oonDateDoubleClickPanel = hr.insertCell();
   hc.width = '40%';
   hc.style.padding = '0 1';
   var he = o.hYear = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 4;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hYearSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hYear.style.display = o.editYear?'block':'none'
   o.hYearSplit.style.display = o.editYear?'block':'none'
   var hc = o.hMonthPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1';
   var he = o.hMonth = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   var hc = o.hMonthSplit = hr.insertCell();
   hc.width = 5;
   hc.innerText = '-';
   o.hMonth.style.display = o.editMonth?'block':'none';
   o.hMonthSplit.style.display = o.editDay?'block':'none';
   var hc = o.hDayPanel = hr.insertCell();
   hc.width = '20%';
   hc.style.padding = '0 1'
   var he = o.hDay = MO.Window.Builder.appendEdit(hc);
   he.maxLength = 2;
   he.style.border = 0;
   he.style.width = '100%';
   he.style.textAlign = 'right';
   o.hDay.style.display = o.editDay?'block':'none';
}
MO.FDuiDateTime_oeSaveValue = function FDuiDateTime_oeSaveValue(e){
   var o = this;
   var dn = MO.Lang.String.nvl(o.dataCode, o.dataName);
   if(!MO.Lang.String.isEmpty(dn)){
      var vs = e.values;
      var v = vs.get(dn);
      if(v){
         vs.set(dn, o.reget().substring(0, 8) + v.substring(8));
      }else{
         vs.set(dn, o.reget());
      }
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiDateTime_construct = function FDuiDateTime_construct(){
   var o = this;
   o.base.FDuiEditControl.construct.call(o);
   o._date = new MO.TDate();
   o.lsnEditEnd = new MO.TListener(o, o.onEditEnd);
}
MO.FDuiDateTime_formatValue = function FDuiDateTime_formatValue(t){
   if(t){
      var o = this;
      if(t.toLowerCase() == '@now'){
         o._date.now();
         return MO.Lang.Date.formatDate(o._date);
      }else{
         MO.Lang.Date.autoParse(o._date, t);
         return MO.Lang.Date.formatDate(o._date);
      }
   }
   return MO.Lang.String.nvl(t);
}
MO.FDuiDateTime_text = function FDuiDateTime_text(){
   var o = this;
   o._date.setYear(o._date.year);
   o._date.setMonth(o._date.month);
   o._date.setDay(o._date.day);
   return MO.Lang.Date.formatDate(o._date);
}
MO.FDuiDateTime_setText = function FDuiDateTime_setText(t){
   var o = this;
   if(t){
      MO.Lang.Date.autoParse(o._date, t);
      o.hYear.value = MO.Lang.Integer.format(o._date.year, 4);
      o.hMonth.value = MO.Lang.Integer.format(o._date.month, 2);
      o.hDay.value = MO.Lang.Integer.format(o._date.day, 2);
   }else{
      o.hYear.value = '';
      o.hMonth.value = '';
      o.hDay.value = '';
   }
}
MO.FDuiDateTime_validText = function FDuiDateTime_validText(t){
   return null;
}
MO.FDuiDateTime_setEditable = function FDuiDateTime_setEditable(v){
   var o = this;
   o.base.FDuiEditControl.setEditable.call(o, v);
   o.hYear.readOnly = !v;
   o.hMonth.readOnly = !v;
   o.hDay.readOnly = !v;
}
MO.FDuiDateTime_refreshStyle = function FDuiDateTime_refreshStyle(){
   var o = this;
   o.base.FDuiEditControl.refreshStyle.call(o);
   o.hYear.style.color = o._textColor;
   o.hYear.style.backgroundColor = o._backColor;
   o.hMonth.style.color = o._textColor;
   o.hMonth.style.backgroundColor = o._backColor;
   o.hDay.style.color = o._textColor;
   o.hDay.style.backgroundColor = o._backColor;
}
MO.FDuiDateTime_drop = function FDuiDateTime_drop(){
   var o = this;
   if(o.canDrop() && o._editable){
      var e = o.editor = RConsole.find(FEditConsole).focus(o, FDuiDateTimeEditor, o.editRefer);
      e.set(MO.Lang.Date.formatDate(o._date));
      e.setYearVisible(o.editYear);
      e.setMonthVisible(o.editMonth);
      e.setDayVisible(o.editDay);
      e.lsnEditEnd = o.lsnEditEnd;
      e.show();
   }
}
MO.FDuiDateTime_dispose = function FDuiDateTime_dispose(){
   var o = this;
   o.base.FDuiEditControl.dispose.call(o);
   o._date = null;
}
MO.FDuiDateTimeEditor = function FDuiDateTimeEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiDropEditor);
   o.date              = null;
   o.years             = null;
   o.months            = null;
   o.days              = null;
   o.hPanelDay         = null;
   o.hPanelMonth       = null;
   o.hPanelYear        = null;
   o.hTitleDay         = null;
   o.hTitleMonth       = null;
   o.hTitleYear        = null;
   o.onButtonEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiDateTimeEditor_onButtonEnter);
   o.onButtonLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiDateTimeEditor_onButtonLeave);
   o.onYearClick       = MO.Class.register(o, new MO.AEventMouseDown('onYearClick'), MO.FDuiDateTimeEditor_onYearClick);
   o.onMonthClick      = MO.Class.register(o, new MO.AEventMouseDown('onMonthClick'), MO.FDuiDateTimeEditor_onMonthClick);
   o.onDayClick        = MO.Class.register(o, new MO.AEventMouseDown('onDayClick'), MO.FDuiDateTimeEditor_onDayClick);
   o.onDateDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDateDoubleClick'), MO.FDuiDateTimeEditor_onDateDoubleClick);
   o.onNowClick        = MO.Class.register(o, new MO.AEventMouseDown('onNowClick'), MO.FDuiDateTimeEditor_onNowClick);
   o.onConfirmClick    = MO.Class.register(o, new MO.AEventMouseDown('MO.onConfirmClick'), FDuiDateTimeEditor_onConfirmClick);
   o.onBuildDrop       = MO.FDuiDateTimeEditor_onBuildDrop;
   o.onBuildButton     = MO.FDuiDateTimeEditor_onBuildButton;
   o.construct         = MO.FDuiDateTimeEditor_construct;
   o.buildTitle        = MO.FDuiDateTimeEditor_buildTitle;
   o.get               = MO.FDuiDateTimeEditor_get;
   o.set               = MO.FDuiDateTimeEditor_set;
   o.resetDay          = MO.FDuiDateTimeEditor_resetDay;
   o.setYearVisible    = MO.FDuiDateTimeEditor_setYearVisible;
   o.setMonthVisible   = MO.FDuiDateTimeEditor_setMonthVisible;
   o.setDayVisible     = MO.FDuiDateTimeEditor_setDayVisible;
   o.selectCell        = MO.FDuiDateTimeEditor_selectCell;
   o.restore           = MO.FDuiDateTimeEditor_restore;
   o.show              = MO.FDuiDateTimeEditor_show;
   o.dispose           = MO.FDuiDateTimeEditor_dispose;
   return o;
}
MO.FDuiDateTimeEditor_onButtonEnter = function FDuiDateTimeEditor_onButtonEnter(e){
   if(!e.hSource.isSelect){
     if(MO.Lang.String.isEmpty(e.hSource.innerText)){
         e.hSource.style.backgroundColor = '#CCCCFF';
     }
   }
}
MO.FDuiDateTimeEditor_onButtonLeave = function FDuiDateTimeEditor_onButtonLeave(e){
   if(!e.hSource.isSelect){
      e.hSource.style.backgroundColor = '#FFFFFF';
   }
}
MO.FDuiDateTimeEditor_onYearClick = function FDuiDateTimeEditor_onYearClick(e){
   var o = this;
   o.date.setYear(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
MO.FDuiDateTimeEditor_onMonthClick = function FDuiDateTimeEditor_onMonthClick(e){
   var o = this;
   o.date.setMonth(e.hSource.innerText);
   o.restore();
   o.resetDay();
}
MO.FDuiDateTimeEditor_onDayClick = function FDuiDateTimeEditor_onDayClick(e){
   var o = this;
   if(!MO.Lang.String.equals(e.hSource.innerText, '.')){
      o.date.setDay(e.hSource.innerText);
      o.restore();
   }
}
MO.FDuiDateTimeEditor_onDateDoubleClick = function FDuiDateTimeEditor_onDateDoubleClick(){
   this.onConfirmClick();
}
MO.FDuiDateTimeEditor_onNowClick = function FDuiDateTimeEditor_onNowClick(){
   var o = this;
   o.date = new TDate();
   o.editEnd();
}
MO.FDuiDateTimeEditor_onConfirmClick = function FDuiDateTimeEditor_onConfirmClick(){
   var o = this;
   o.date.setYear(o.hYear.value);
   o.date.setMonth(o.hMonth.value);
   o.date.setDay(o.hDay.value);
   o.editEnd();
}
MO.FDuiDateTimeEditor_onBuildDrop = function FDuiDateTimeEditor_onBuildDrop(){
   var o = this;
   var hdp = o.hDropPanel;
   hdp.width = 220;
   o.attachEvent('onDateDoubleClick', hdp);
   o.hTitleYear = o.buildTitle('Year', 4);
   var hp = o.hPanelYear = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<4; m++){
      var hr = hp.insertRow();
      for(var n=0; n<4; n++){
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(2000 + 4*m+n, 2);
         hc.align = 'center';
         hc.style.padding = '1 6';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onYearClick', hc);
         o.years.push(hc);
      }
   }
   o.hTitleMonth = o.buildTitle('Month', 2);
   var hp = o.hPanelMonth = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<2; m++){
      hr = hp.insertRow();
      for(var n=0; n<6; n++){
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(6*m+n+1, 2);
         hc.align = 'center';
         hc.style.cursor = 'hand';
         hc.style.borderBottom = '1 solid #EEEEEE';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onMonthClick', hc);
         o.months.push(hc);
      }
   }
   o.hTitleDay = o.buildTitle('Day', 2);
   var hp = o.hPanelDay = o.hSelectPanel = MO.Window.Builder.appendTable(hdp);
   hp.width = '100%';
   for(var m=0; m<5; m++){
      hr = hp.insertRow();
      for(var n=0; n<7; n++){
         var day = 7*m+n+1;
         if(day > 31){
            continue;
         }
         var hc = hr.insertCell();
         hc.innerText = MO.Lang.Integer.format(day, 2);
         hc.align = 'center';
         hc.style.borderBottom = '1 solid #EEEEEE';
         hc.style.cursor = 'hand';
         if(n < 5){
            hc.style.borderRight = '1 solid #EEEEEE';
         }
         o.attachEvent('onButtonEnter', hc);
         o.attachEvent('onButtonLeave', hc);
         o.attachEvent('onDayClick', hc);
         o.days.push(hc);
      }
   }
}
MO.FDuiDateTimeEditor_onBuildButton = function FDuiDateTimeEditor_onBuildButton(){
   var o = this;
   o.base.FDuiDropEditor.onBuildButton.call(o);
   var hf = MO.Window.Builder.appendTable(o.hButtonPanel);
   hf.width = '100%';
   hf.height = 20;
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   var h = o.hNow = MO.Window.Builder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onNowClick', h);
   h.innerText = MO.RContext.get('FDate:Now');
   var hc = hr.insertCell();
   hc.style.padding = '0 6';
   hc.align = 'right';
   var h = o.hNow = MO.Window.Builder.append(hc, 'SPAN');
   h.style.cursor = 'hand';
   o.attachEvent('onConfirmClick', h);
   h.innerText = MO.RContext.get('FDate:Confirm');
}
MO.FDuiDateTimeEditor_construct = function FDuiDateTimeEditor_construct(){
   var o = this;
   o.base.FDuiDropEditor.construct.call(o);
   o.date = new MO.TDate();
   o.years = new MO.TList();
   o.months = new MO.TList();
   o.days = new MO.TList();
}
MO.FDuiDateTimeEditor_buildTitle = function FDuiDateTimeEditor_buildTitle(n, ml){
   var o = this;
   var hf = MO.Window.Builder.appendTable(o.hDropPanel);
   hf.width = '100%';
   hf.style.borderBottom = '1 solid #999999';
   hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
   hf.style.backgroundColor = '#F8F8F8';
   hf.style.padding = '2 6';
   var hr = hf.insertRow();
   var hc = hr.insertCell();
   hc.width = 60;
   var he = o['h' + n] = MO.Window.Builder.appendEdit(hc);
   he.style.width = '100%';
   he.style.textAlign = 'right';
   he.style.border = '1 solid #CCCCCC';
   he.maxLength = ml;
   var hc = hr.insertCell();
   hc.innerText = MO.RContext.get('FDate:' + n);
   return hf;
}
MO.FDuiDateTimeEditor_get = function FDuiDateTimeEditor_get(){
   return MO.Lang.Date.formatDate(this.date);
}
MO.FDuiDateTimeEditor_set = function FDuiDateTimeEditor_set(v){
   var o = this;
   MO.Lang.Date.autoParse(o.date, v);
   o.restore();
}
MO.FDuiDateTimeEditor_setYearVisible = function FDuiDateTimeEditor_setYearVisible(v){
   var o = this;
   o.hPanelYear.style.display = v? 'block':'none';
   o.hTitleYear.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_setMonthVisible = function FDuiDateTimeEditor_setMonthVisible(v){
   var o = this;
   o.hPanelMonth.style.display = v? 'block':'none';
   o.hTitleMonth.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_setDayVisible = function FDuiDateTimeEditor_setDayVisible(v){
   var o = this;
   o.hPanelDay.style.display = v? 'block':'none';
   o.hTitleDay.style.display = v? 'block':'none';
}
MO.FDuiDateTimeEditor_show = function FDuiDateTimeEditor_show(v){
   var o = this;
   o.base.FDuiDropEditor.show.call(o, v);
   var hp = o.hPanel;
   var hbf = o.hBorderForm;
   var s = o.source;
   var r = s.getEditRange();
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = 220;
   o.base.MShadow.show.call(o);
}
MO.FDuiDateTimeEditor_resetDay = function FDuiDateTimeEditor_resetDay(){
   var o = this;
   var monthDays = this.date.monthDays();
   for(var n=0; n<o.days.count; n++){
      var hd = o.days.get(n);
      if(n >= monthDays){
         hd.innerText = '.';
      }else{
        hd.innerText = MO.Lang.Integer.format(n+1, 2);
      }
   }
}
MO.FDuiDateTimeEditor_selectCell = function FDuiDateTimeEditor_selectCell(ls, v){
   var c = ls.count;
   for(var n=0; n<c; n++){
      var h = ls.get(n);
      if(h.innerText == v){
         h.style.color = '#FFFFFF';
         h.style.backgroundColor = '#9999EE';
         h.isSelect = true;
      }else{
         h.style.color = '#000000';
         h.style.backgroundColor = '#FFFFFF';
         h.isSelect = false;
      }
   }
}
MO.FDuiDateTimeEditor_restore = function FDuiDateTimeEditor_restore(){
   var o = this;
   o.hYear.value = o.date.year;
   o.hMonth.value = o.date.month;
   o.hDay.value = o.date.day;
   o.selectCell(o.years, o.date.year);
   o.selectCell(o.months, o.date.month);
   o.selectCell(o.days, o.date.day);
}
MO.FDuiDateTimeEditor_dispose = function FDuiDateTimeEditor_dispose(){
   var o = this;
   o.base.FDuiDropEditor.dispose.call(o);
   o.hPanel = null;
}
MO.FDuiDropEditor = function FDuiDropEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditor, MO.MDuiShadow);
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleDropForm    = MO.Class.register(o, new MO.AStyle('_styleDropForm'));
   o._styleDropPanel   = MO.Class.register(o, new MO.AStyle('_styleDropPanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._minWidth         = 160;
   o._minHeight        = 300;
   o._hDropForm        = null;
   o._hDropPanel       = null;
   o._hButtonPanel     = null;
   o.onBuildDrop       = MO.Method.virtual(o, 'onBuildDrop');
   o.onBuildButton     = MO.Method.empty;
   o.onBuild           = MO.FDuiDropEditor_onBuild;
   o.onDropMouseDown   = MO.Class.register(o, new MO.AEventMouseDown('onDropMouseDown'));
   o.onDropMouseUp     = MO.Class.register(o, new MO.AEventMouseUp('onDropMouseUp'));
   o.panel             = MO.FDuiDropEditor_panel;
   o.setVisible        = MO.FDuiDropEditor_setVisible;
   o.dispose           = MO.FDuiDropEditor_dispose;
   return o;
}
MO.FDuiDropEditor_onBuild = function FDuiDropEditor_onBuild(p){
   var o = this;
   o.__base.FDuiEditor.onBuild.call(o, p);
   var h = o._hPanel;
   h.className = o.styleName('Panel');
   var hf = o._hDropForm = MO.Window.Builder.appendTable(h, o.styleName('DropForm'));
   o._hDropPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('DropPanel'));
   o._hButtonPanel = MO.Window.Builder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
   o.onBuildDrop();
   o.onBuildButton();
}
MO.FDuiDropEditor_panel = function FDuiDropEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Shadow){
      return o.hPanel;
   }
   return o.__base.FDuiEditor.panel.call(o, panelCd);
}
MO.FDuiDropEditor_setVisible = function FDuiDropEditor_setVisible(p){
   var o = this;
   var h = o._hPanel;
   var hd = o._hPanel.ownerDocument;
   if(p){
      hd.body.appendChild(h);
   }else{
      hd.body.removeChild(h);
   }
   o.__base.FDuiEditor.setVisible.call(o, p);
}
MO.FDuiDropEditor_dispose = function FDuiDropEditor_dispose(){
   var o = this;
   o._hButtonPanel = MO.Window.Html.free(o._hButtonPanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o._hDropForm = MO.Window.Html.free(o._hDropForm);
   o.__base.FControl.dispose.call(o);
}
MO.FDuiEdit = function FDuiEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit);
   o._inputSize            = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit                 = MO.Class.register(o, new MO.APtyString('_unit'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel      = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiEdit_onBuildEditValue;
   o.onInputEdit           = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiEdit_onInputEdit);
   o.construct             = MO.FDuiEdit_construct;
   o.formatText            = MO.FDuiEdit_formatText;
   o.formatValue           = MO.FDuiEdit_formatValue;
   o.text                  = MO.FDuiEdit_text;
   o.setText               = MO.FDuiEdit_setText;
   o.setEditAble           = MO.FDuiEdit_setEditAble;
   o.refreshValue          = MO.FDuiEdit_refreshValue;
   return o;
}
MO.FDuiEdit_onBuildEditValue = function FDuiEdit_onBuildEditValue(p){
   var o = this;
   var hValuePanel = o._hValuePanel;
   hValuePanel.className = o.styleName('ValuePanel');
   var hValueForm = o._hValueForm = MO.Window.Builder.appendTable(hValuePanel);
   hValueForm.width = '100%';
   var hValueLine = o._hValueLine = MO.Window.Builder.appendTableRow(hValueForm);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hValueLine);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hValueLine);
   var hInput = o._hInput = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiEdit_onInputEdit = function FDuiEdit_onInputEdit(p){
   var o = this;
   o.refreshValue();
}
MO.FDuiEdit_construct = function FDuiEdit_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiEdit_formatText = function FDuiEdit_formatText(value){
   var o = this;
   var result = MO.Lang.String.nvl(value);
   o._dataDisplay = result;
   return result;
}
MO.FDuiEdit_formatValue = function FDuiEdit_formatValue(value){
   return value;
}
MO.FDuiEdit_text = function FDuiEdit_text(){
   return this._hInput.value;
}
MO.FDuiEdit_setText = function FDuiEdit_setText(text){
   this._hInput.value = text;
}
MO.FDuiEdit_setEditAble = function FDuiEdit_setEditAble(flag){
   var o = this;
   o.__base.FDuiEditControl.setEditAble.call(o, flag);
   o._hInput.readOnly = !flag;
}
MO.FDuiEdit_refreshValue = function FDuiEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiEditControl = function FDuiEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataValue, MO.MUiDataField, MO.MUiEditValue, MO.MDuiEditChange, MO.MDuiEditDrop);
   o._labelModeCd            = MO.Class.register(o, new MO.APtyString('_labelModeCd'), MO.EUiLabelMode.All);
   o._labelPositionCd        = MO.Class.register(o, new MO.APtyString('_labelPositionCd'), MO.EUiLabelPosition.Left);
   o._labelSize              = MO.Class.register(o, new MO.APtySize2('_labelSize'));
   o._labelAlignCd           = MO.Class.register(o, new MO.APtyString('_labelAlignCd'), MO.EUiAlign.Left);
   o._labelColor             = MO.Class.register(o, new MO.APtyString('_labelColor'));
   o._editSize               = MO.Class.register(o, new MO.APtySize2('_editSize'));
   o._editColor              = MO.Class.register(o, new MO.APtyString('_editColor'));
   o._styleLabelPanel        = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._styleEditPanel         = MO.Class.register(o, new MO.AStyle('_styleEditPanel'));
   o._progressing            = false;
   o._hLabelPanel            = null;
   o._hLabelForm             = null;
   o._hIconPanel             = null;
   o._hIcon                  = null;
   o._hTextPanel             = null;
   o._hText                  = null;
   o._hEditPanel             = null;
   o._hEditForm              = null;
   o._hValuePanel            = null;
   o.onBuildLabelIcon        = MO.FDuiEditControl_onBuildLabelIcon;
   o.onBuildLabelText        = MO.FDuiEditControl_onBuildLabelText;
   o.onBuildLabel            = MO.FDuiEditControl_onBuildLabel;
   o.onBuildEditValue        = MO.Method.virtual(o, 'onBuildEditValue');
   o.onBuildEdit             = MO.FDuiEditControl_onBuildEdit;
   o.onBuildPanel            = MO.FDuiEditControl_onBuildPanel;
   o.onBuild                 = MO.FDuiEditControl_onBuild;
   o.oeMode                  = MO.FDuiEditControl_oeMode;
   o.oeProgress              = MO.FDuiEditControl_oeProgress;
   o.oeLoadUnit              = MO.FDuiEditControl_oeLoadUnit;
   o.oeSaveUnit              = MO.FDuiEditControl_oeSaveUnit;
   o.construct               = MO.FDuiEditControl_construct;
   o.panel                   = MO.FDuiEditControl_panel;
   o.setLabel                = MO.FDuiEditControl_setLabel;
   o.calculateValueRectangle = MO.FDuiEditControl_calculateValueRectangle;
   o.dispose                 = MO.FDuiEditControl_dispose;
   return o;
}
MO.FDuiEditControl_onBuildLabelIcon = function FDuiEditControl_onBuildLabelIcon(event){
   var o = this;
   if(o._labelIcon){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, o._labelIcon);
   }else{
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
   }
}
MO.FDuiEditControl_onBuildLabelText = function FDuiEditControl_onBuildLabelText(event){
   var o = this;
   o._hText = MO.Window.Builder.appendSpan(o._hTextPanel, null, o._label);
}
MO.FDuiEditControl_onBuildLabel = function FDuiEditControl_onBuildLabel(event){
   var o = this;
   var hLabelForm = o._hLabelForm = MO.Window.Builder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hLabelLine = MO.Window.Builder.appendTableRow(hLabelForm);
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hIconPanel.width = '20px';
   o.onBuildLabelIcon(event);
   var hTextPanel = o._hTextPanel = MO.Window.Builder.appendTableCell(hLabelLine);
   hTextPanel.noWrap = true;
   o.onBuildLabelText(event);
   MO.Window.Html.setSize(hLabelForm, o._labelSize);
   if(o._labelAlignCd){
      hTextPanel.align = o._labelAlignCd;
      hTextPanel.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
MO.FDuiEditControl_onBuildEdit = function FDuiEditControl_onBuildEdit(event){
   var o = this;
   var hEditForm = o._hEditForm = MO.Window.Builder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hEditLine = o._hEditLine = MO.Window.Builder.appendTableRow(hEditForm);
   o._hValuePanel = MO.Window.Builder.appendTableCell(hEditLine);
   o.onBuildEditValue(event);
   MO.Window.Html.setSize(hEditForm, o._editSize);
}
MO.FDuiEditControl_onBuildPanel = function FDuiEditControl_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiEditControl_onBuild = function FDuiEditControl_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var labelModeCd = o._labelModeCd;
   var hLabelPanel = null;
   var hEditPanel = null;
   if(labelModeCd == MO.EUiLabelMode.Label){
      hLabelPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else if(labelModeCd == MO.EUiLabelMode.Hidden){
      hEditPanel = MO.Window.Builder.appendTableCell(MO.Window.Builder.appendTableRow(hPanel));
   }else{
      var labelPositionCd = o._labelPositionCd;
      if(labelPositionCd == MO.EUiLabelPosition.Top){
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else if(labelPositionCd == MO.EUiLabelPosition.Right){
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
      }else if(labelPositionCd == MO.EUiLabelPosition.Bottom){
         hEditPanel = MO.Window.Builder.appendTableRowCell(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableRowCell(hPanel);
      }else{
         var hRow = MO.Window.Builder.appendTableRow(hPanel);
         hLabelPanel = MO.Window.Builder.appendTableCell(hRow);
         hEditPanel = MO.Window.Builder.appendTableCell(hRow);
      }
   }
   o._hLabelPanel = hLabelPanel;
   o._hEditPanel = hEditPanel;
   if(hLabelPanel){
      o.onBuildLabel(event);
      hLabelPanel.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hEditPanel){
      o.onBuildEdit(event);
   }
}
MO.FDuiEditControl_oeMode = function FDuiEditControl_oeMode(event){
   var o = this;
   o.__base.FDuiControl.oeMode.call(o, event);
   o.__base.MDisplay.oeMode.call(o, event);
   o._editable = o.canEdit(event.mode);
   o._validable = o.canValid(event.mode);
   if(!o._progressing){
      o.setEditable(o._editable);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeProgress = function FDuiEditControl_oeProgress(event){
   var o = this;
   if(o._progressing && event.enable){
      return MO.EEventStatus.Stop;
   }
   o._progressing = event.enable;
   if(event.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeLoadUnit = function FDuiEditControl_oeLoadUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var value = unit.get(o._dataName);
      o.set(value);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_oeSaveUnit = function FDuiEditControl_oeSaveUnit(event){
   var o = this;
   var unit = event.unit;
   var dataName = o._dataName;
   if(!MO.Lang.String.isEmpty(dataName)){
      var value = o.get();
      unit.set(o._dataName, value)
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiEditControl_construct = function FDuiEditControl_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o.__base.MDuiEditChange.construct.call(o);
   o.__base.MDuiEditDrop.construct.call(o);
   o._labelSize = new MO.SSize2(100, 20);
   o._editSize = new MO.SSize2(200, 20);
}
MO.FDuiEditControl_panel = function FDuiEditControl_panel(panelCd){
   var o = this;
   if(MO.EPanel.Edit == panelCd){
      return o._hEdit;
   }else if(MO.EPanel.Focus == panelCd){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}
MO.FDuiEditControl_setLabel = function FDuiEditControl_setLabel(value){
   var o = this;
   o._label = value;
   if(o._hText){
      o._hText.innerHTML = MO.Lang.String.nvl(value);
   }
}
MO.FDuiEditControl_calculateValueRectangle = function FDuiEditControl_calculateValueRectangle(rectangle){
   var o = this;
   if(!rectangle){
      rectangle = new MO.SRectangle();
   }
   var hPanel = o._hValuePanel;
   var position = MO.Window.Html.clientPosition(hPanel);
   rectangle.left = position.x;
   rectangle.top = position.y;
   rectangle.width = hPanel.offsetWidth;
   rectangle.height = hPanel.offsetHeight;
   return rectangle;
}
MO.FDuiEditControl_dispose = function FDuiEditControl_dispose(){
   var o = this;
   o._labelSize = MO.Lang.Object.dispose(o._labelSize);
   o._editSize = MO.Lang.Object.dispose(o._editSize);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hLabelForm = MO.Window.Html.free(o._hLabelForm);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hTextPanel = MO.Window.Html.free(o._hTextPanel);
   o._hText = MO.Window.Html.free(o._hText);
   o._hEditPanel = MO.Window.Html.free(o._hEditPanel);
   o._hEditForm = MO.Window.Html.free(o._hEditForm);
   o._hValuePanel = MO.Window.Html.free(o._hValuePanel);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
   o.__base.MDuiEditDrop.dispose.call(o);
   o.__base.MDuiEditChange.dispose.call(o);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiEditor = function FDuiEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MDuiFocus);
   o._visible       = false;
   o._statusVisible = false;
   o._styleEdit     = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   o._statusEditing = false;
   o._source        = null;
   o._hEdit         = null;
   o.lsnEditBegin   = null;
   o.lsnEditCancel  = null;
   o.lsnEditEnd     = null;
   o.onEditKeyDown  = MO.Class.register(o, new MO.AEventKeyDown('onEditKeyDown'));
   o.onEditKeyPress = MO.Class.register(o, new MO.AEventKeyPress('onEditKeyPress'));
   o.onEditKeyUp    = MO.Class.register(o, new MO.AEventKeyUp('onEditKeyUp'));
   o.onEditChange   = MO.Class.register(o, new MO.AEventChange('onEditChange'));
   o.onEditBegin    = MO.FDuiEditor_onEditBegin;
   o.onEditChanged  = MO.FDuiEditor_onEditChanged;
   o.onEditEnd      = MO.FDuiEditor_onEditEnd;
   o.onBuildPanel   = MO.FDuiEditor_onBuildPanel;
   o.onBuild        = MO.FDuiEditor_onBuild;
   o.get            = MO.Method.virtual(o, 'get');
   o.set            = MO.Method.virtual(o, 'set');
   o.doBlur         = MO.FDuiEditor_doBlur;
   o.panel          = MO.FDuiEditor_panel;
   o.linkControl    = MO.FDuiEditor_linkControl;
   o.editBegin      = MO.FDuiEditor_editBegin;
   o.editCancel     = MO.FDuiEditor_editCancel;
   o.editEnd        = MO.FDuiEditor_editEnd;
   o.reset          = MO.FDuiEditor_reset;
   o.setVisible     = MO.FDuiEditor_setVisible;
   o.dispose        = MO.FDuiEditor_dispose;
   return o;
}
MO.FDuiEditor_onEditBegin = function FDuiEditor_onEditBegin(){
   this.editBegin();
}
MO.FDuiEditor_onEditChanged = function FDuiEditor_onEditChanged(){
   var o = this;
   MO.Logger.debug(o, 'Edit changed');
   var g = o.storage = MO.Lang.Object.nvlObj(o.storage);
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
MO.FDuiEditor_onEditEnd = function FDuiEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   MO.Logger.debug(o, 'Editor end. (control={1})', MO.Class.dump(s));
   o.hide();
   if(o.lsnEditEnd){
      o.lsnEditEnd.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
MO.FDuiEditor_onBuildPanel = function FDuiEditor_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createSpan(p);
   h.__linker = o;
}
MO.FDuiEditor_onBuild = function FDuiEditor_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   o._hPanel.style.zIndex = MO.EUiLayer.Editor;
}
MO.FDuiEditor_get = function FDuiEditor_get(name){
}
MO.FDuiEditor_set = function FDuiEditor_set(name, value){
}
MO.FDuiEditor_doBlur = function FDuiEditor_doBlur(){
   var o = this;
   var s = o._source;
   if(s){
      o.editCancel();
      if(MO.Class.isClass(s, MO.MDuiFocus)){
         s.doBlur();
      }
   }
}
MO.FDuiEditor_panel = function FDuiEditor_panel(panelCd){
   var o = this;
   if(panelCd == MO.EPanel.Edit){
      return o._hEdit;
   }else if(panelCd == MO.EPanel.Focus){
      return o._hEdit;
   }
   return o.__base.FDuiControl.panel.call(o, panelCd);
}
MO.FDuiEditor_linkControl = function FDuiEditor_linkControl(c){
   var o = this;
   o._source = c;
}
MO.FDuiEditor_editBegin = function FDuiEditor_editBegin(){
   var o = this;
   var s = o._source;
   MO.Logger.debug(o, 'Editor begin. (control={1})', MO.Class.dump(s));
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = o;
   o._statusEditing = true;
}
MO.FDuiEditor_editCancel = function FDuiEditor_editCancel(){
   var o = this;
   var s = o._source;
   MO.Logger.debug(o, 'Editor cancel. (control={1})', MO.Class.dump(s));
   o.hide();
   if(o.lsnEditCancel){
      o.lsnEditCancel.process(o);
   }
   s._editor = null;
   o._source = null;
   o._statusEditing = false;
}
MO.FDuiEditor_editEnd = function FDuiEditor_editEnd(){
   this.onEditEnd();
}
MO.FDuiEditor_reset = function FDuiEditor_reset(){
   var o = this;
   o.lsnEditBegin = null;
   o.lsnEditCancel = null;
   o.lsnEditEnd = null;
}
MO.FDuiEditor_setVisible = function FDuiEditor_setVisible(p){
   var o = this;
   o.__base.FDuiControl.setVisible.call(o, p);
   if(p){
      o.editBegin();
      o.focus();
   }
}
MO.FDuiEditor_dispose = function FDuiEditor_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
   o._hEdit = null;
}
MO.FDuiFile = function FDuiFile(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleFile       = MO.Class.register(o, new MO.AStyle('_styleFile'));
   o._styleBrowser    = MO.Class.register(o, new MO.AStyle('_styleBrowser'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiFile_onBuildEditValue;
   o.onFileChange     = MO.Class.register(o, new MO.AEventChange('onFileChange'), MO.FDuiFile_onFileChange);
   o.construct        = MO.FDuiFile_construct;
   o.formatDisplay    = MO.FDuiFile_formatDisplay;
   o.formatValue      = MO.FDuiFile_formatValue;
   o.get              = MO.FDuiFile_get;
   o.set              = MO.FDuiFile_set;
   o.refreshValue     = MO.FDuiFile_refreshValue;
   return o;
}
MO.FDuiFile_onBuildEditValue = function FDuiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hl,  o.styleName('InputPanel'));
   var he = o._hInputEdit = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   var hFile = o._hInput = MO.Window.Builder.appendFile(hInputPanel, o.styleName('File'));
   o.attachEvent('onFileChange', hFile);
   var hBrowserPanel = o._hBrowserPanel = MO.Window.Builder.appendTableCell(o._hEditLine);
   hBrowserPanel.style.paddingLeft = '4px';
   var hBrowser = o._hBrowser = MO.Window.Builder.appendButton(hBrowserPanel, o.styleName('Browser'));
   hBrowser.value = '浏览...';
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   MO.Window.Html.setSize(hFile, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiFile_onFileChange = function FDuiFile_onFileChange(event){
   var o = this;
   var hFile = o._hInput;
   if(hFile.files){
      if(hFile.files.length){
         var file = hFile.files[0];
         var name = file.name;
         o._hInputEdit.value = name + ' (' + file.size + 'byte)';
         o.processDataChangedListener(event);
      }
   }
}
MO.FDuiFile_construct = function FDuiFile_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiFile_formatDisplay = function FDuiFile_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiFile_formatValue = function FDuiFile_formatValue(p){
   return p;
}
MO.FDuiFile_get = function FDuiFile_get(){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiFile_set = function FDuiFile_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiFile_refreshValue = function FDuiFile_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiForm = function FDuiForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MUiDataContainer, MO.MDuiDescribeFrame);
   o.construct          = MO.FDuiForm_construct;
   o.dispose            = MO.FDuiForm_dispose;
   return o;
}
MO.FDuiForm_construct = function FDuiForm_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
}
MO.FDuiForm_dispose = function FDuiForm_dispose(){
   var o = this;
   o._hEdit = MO.Window.Html.free(o._hEdit);
   o._hDrop = MO.Window.Html.free(o._hDrop);
   o.__base.FDuiLayout.dispose.call(o);
}
MO.FDuiForm_onMouseDown = function FDuiForm_onMouseDown(p){
   var o = this;
}
MO.FDuiForm_onLoadDataset = function FDuiForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
MO.FDuiForm_onLoadDatasetEnd = function FDuiForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
MO.FDuiForm_isDataChanged = function FDuiForm_isDataChanged(){
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
MO.FDuiForm_getFormLink = function FDuiForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
MO.FDuiForm_allDataComponents = function FDuiForm_allDataComponents(p, m){
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
         if(!MO.Class.isClass(c, MDataset)){
            if(MO.Class.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
MO.FDuiForm_get = function FDuiForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
MO.FDuiForm_set = function FDuiForm_set(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
MO.FDuiForm_set = function FDuiForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
MO.FDuiForm_getDataCodes = function FDuiForm_getDataCodes(){
   var o = this;
   var e = o._codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
MO.FDuiForm_getCurrentRow = function FDuiForm_getCurrentRow(){
   return this.saveValue();
}
MO.FDuiForm_getSelectedRows = function FDuiForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
MO.FDuiForm_getCurrentRows = function FDuiForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
MO.FDuiForm_getChangedRows = function FDuiForm_getChangedRows(){
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
MO.FDuiForm_getRows = function FDuiForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
MO.FDuiForm_clearValue = function FDuiForm_clearValue(){
   this.process(this._clearEvent);
}
MO.FDuiForm_resetValue = function FDuiForm_resetValue(){
   this.process(this._resetEvent);
}
MO.FDuiForm_loadValue = function FDuiForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o._loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
MO.FDuiForm_saveValue = function FDuiForm_saveValue(r, m){
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
MO.FDuiForm_recordValue = function FDuiForm_recordValue(){
   this.process(this._recordEvent);
}
MO.FDuiForm_toAttributes = function FDuiForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
MO.FDuiForm_focus = function FDuiForm_focus(){
   var o = this;
   o.__base.MDuiFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
MO.FDuiForm_dsUpdate = function FDuiForm_dsUpdate(u, v){
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
MO.FDuiForm_setEditable = function FDuiForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
      var pc = ps.count;
      for(var n = 0; n < pc; n++){
         var p = ps.value(n);
         p.setEditable(v);
      }
   }
}
MO.FDuiForm_doPrepare = function FDuiForm_doPrepare(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_doUpdate = function FDuiForm_doUpdate(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_doDelete = function FDuiForm_doDelete(v){
   var o = this;
   o._dataStatusCd = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
MO.FDuiForm_allNameComponents = function FDuiForm_allNameComponents(f, p, m){
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
         if(!MO.Class.isClass(c, MDataset)){
            if(MO.Class.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
MO.FDuiForm_onLoaded = function FDuiForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
MO.FDuiForm_onDsFetchEnd = function FDuiForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
MO.FDuiForm_onDsUpdateBegin = function FDuiForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
MO.FDuiForm_onDsUpdateEnd = function FDuiForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
MO.FDuiForm_connect = function FDuiForm_connect(service, type, action, attrs){
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
MO.FDuiForm_loadDocument = function FDuiForm_loadDocument(doc){
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
MO.FDuiForm_testStatus = function FDuiForm_testStatus(t){
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
MO.FDuiForm_hasAction = function FDuiForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(MO.Class.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
MO.FDuiFrame = function FDuiFrame(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   return o;
}
MO.FDuiIconPicker = function FDuiIconPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiEdit);
   return o;
}
MO.FDuiIconPicker_onEditKeyDown = function FDuiIconPicker_onEditKeyDown(e){
   var o = this;
   o.base.FDuiEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(MO.Lang.String.nvl(o.text(), o.styleIcon("Default")));
}
MO.FDuiIconPicker_onEditKeyPress = function FDuiIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FDuiEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiIconPicker_onBuildEdit = function FDuiIconPicker_onBuildEdit(b){
   var o = this;
   var h = b.hPanel;
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = MO.Lang.String.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = MO.Window.Builder.appendIcon(h, hi);
   var h = o.hEdit = MO.Window.Builder.appendEdit(h, o.style('Edit'));
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}
MO.FDuiIconPicker_setText = function FDuiIconPicker_setText(t){
   var o = this;
   o.base.FDuiEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(MO.Lang.String.nvl(o.text(), o.styleIcon("Default")));
}
MO.FDuiIconPicker_dispose = function FDuiIconPicker_dispose(){
   var o = this;
   o.base.FDuiEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
MO.FDuiLabel = function FDuiLabel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o.onBuild = MO.FDuiLabel_onBuild;
   o.get     = MO.FDuiLabel_get;
   o.set     = MO.FDuiLabel_set;
   return o;
}
MO.FDuiLabel_onBuild = function FDuiLabel_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
}
MO.FDuiLabel_get = function FDuiLabel_get(){
   return this._hPanel.innerHTML;
}
MO.FDuiLabel_set = function FDuiLabel_set(value){
   this._hPanel.innerHTML = value;
}
MO.FDuiLayout = function FDuiLayout(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._styleForm      = MO.Class.register(o, new MO.AStyle('_styleForm', 'Form'));
   o._lastSplit      = null;
   o._hPanelForm     = null;
   o._hContainer     = null;
   o._hPanelTable    = null;
   o._hPanelLine     = null;
   o.onBuildPanel    = MO.FDuiLayout_onBuildPanel;
   o.onDesignBegin   = MO.FDuiLayout_onDesignBegin;
   o.onDesignEnd     = MO.FDuiLayout_onDesignEnd;
   o.oeDesign        = MO.FDuiLayout_oeDesign;
   o.oeResize        = MO.FDuiLayout_oeResize;
   o.oeRefresh       = MO.FDuiLayout_oeRefresh;
   o.insertPosition  = MO.FDuiLayout_insertPosition;
   o.moveChild       = MO.FDuiLayout_moveChild;
   o.innerAppendLine = MO.FDuiLayout_innerAppendLine;
   o.appendChild     = MO.FDuiLayout_appendChild;
   o.resize          = MO.FDuiLayout_resize;
   o.dispose         = MO.FDuiLayout_dispose;
   return o;
}
MO.FDuiLayout_onBuildPanel = function FDuiLayout_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   if(o._layoutCd == MO.EUiLayout.Design){
      var hr = MO.Window.Builder.appendTableRow(h);
      var hc = MO.Window.Builder.appendTableCell(hr);
      o._hContainer = hc;
   }
}
MO.FDuiLayout_onDesignBegin = function FDuiLayout_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
}
MO.FDuiLayout_onDesignEnd = function FDuiLayout_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
}
MO.FDuiLayout_oeDesign = function FDuiLayout_oeDesign(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      switch(p.layoutCd){
         case MO.EDesign.Move:
            break;
         case MO.EDesign.Border:
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
MO.FDuiLayout_oeResize = function FDuiLayout_oeResize(p){
   var o = this;
   o.__base.FDuiContainer.oeResize.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
MO.FDuiLayout_oeRefresh = function FDuiLayout_oeRefresh(p){
   var o = this;
   o.__base.FDuiContainer.oeDesign.call(o, p);
   if(p.isAfter()){
      o.resize();
   }
}
MO.FDuiLayout_insertPosition = function FDuiLayout_insertPosition(cf, ct, idx, copy){
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
MO.FDuiLayout_moveChild = function FDuiLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o._hPanel;
   var moved = false;
   var cfh = MO.Class.isClass(cf, MO.MDuiHorizontal);
   var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
   var hCfTab = MO.Window.Html.parent(cf._hPanel, 'TABLE');
   var cth = MO.Class.isClass(ct, MO.MDuiHorizontal);
   var hTd = MO.Window.Html.parent(ct._hPanel, 'TD');
   var hTable = MO.Window.Html.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n = 0; n < hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex);
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
               var hCfTd = MO.Window.Html.parent(cf._hPanel, 'TD');
               var hCell = MO.Window.Builder.appendTableCell(hRow, null, hTd.cellIndex + 1);
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
               var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
                     var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
            var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
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
MO.FDuiLayout_innerAppendLine = function FDuiLayout_innerAppendLine(){
   var o = this;
   var h = null;
   if(o._layoutCd == EUiLayout.Design){
      h = o._hPanelTable = MO.Window.Builder.appendTable(o._hContainer);
      h.style.paddingBottom = 4;
      o._hPanelLine = MO.Window.Builder.appendTableRow(h);
   }else{
      o._hPanelTable = null;
      o._hPanelLine = null;
   }
   return h;
}
MO.FDuiLayout_appendChild = function FDuiLayout_appendChild(control){
   var o = this;
   if(o._layoutCd == MO.EUiLayout.Design){
      if(!o._hPanelLine){
         o.innerAppendLine();
      }
      if(MO.Class.isClass(control, MO.MDuiHorizontal)){
         if(o._hPanelTable.rows[0].cells.length == 0){
            o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
         }else{
            o._hContainer.appendChild(control._hPanel);
            o.innerAppendLine();
         }
         return;
      }
      var hCell = MO.Window.Builder.appendTableCell(o._hPanelLine);
      if(!MO.Class.isClass(control, MO.FDuiLayout)){
         control._hPanelLine = o._hPanelTable;
      }
      hCell.appendChild(control._hPanel);
      control._hLayoutCell = hCell;
      if((control.wrapCd() == EUiWrap.NextLine) && (o.controls.last() != control)){
         o.innerAppendLine();
      }
   }else{
      control._hPanel.style.paddingTop = 2;
      control._hPanel.style.paddingBottom = 2;
      if(control.dockCd() == MO.EUiDock.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(control._sizeCd == MO.EUiSize.Fill){
         var hCell = MO.Window.Builder.appendTableRowCell(o._hPanelForm);
         hCell.appendChild(control._hPanel);
      }else if(MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Horizontal) || '100%' == control.width){
         if(MO.Class.isClass(control, MO.FDuiSplit)){
            o._lastSplit = control;
         }
         var hr = MO.Window.Builder.appendTableRow(o._hPanelForm);
         var hc = MO.Window.Builder.appendTableCell(hr);
         hc.vAlign = 'top';
         hc.appendChild(control._hPanel);
         control._hLayoutRow = hr;
         o._hPanelLast = hc;
         if(!MO.Lang.Set.contains(control._sizeCd, MO.EUiSize.Vertical)){
            hc.height = 1;
         }else if(control.height){
            hc.height = control.height;
         }
         o._hPanelLine = null;
      }else{
         if(!o._hPanelLine){
            var hr = MO.Window.Builder.appendTableRow(o._hPanelForm);
            hr.height = 1;
            if(o._lastSplit){
               o._lastSplit.pushLine(hr);
            }
            var hc = MO.Window.Builder.appendTableCell(hr);
            hc.vAlign = 'top';
            var ht = o._hPanelTable = MO.Window.Builder.appendTable(hc);
            o._hPanelLine = MO.Window.Builder.appendTableRow(ht);
         }
         var hc = MO.Window.Builder.appendTableCell(o._hPanelLine)
         control._hLayoutRow = o._hPanelLine;
         o._hPanelLast = hc;
         hc.appendChild(control._hPanel);
         control._hLayoutCell = hc;
         if(control.wrapCd() == MO.EUiWrap.NextLine){
            o._hPanelLine = null;
         }
      }
   }
}
MO.FDuiLayout_resize = function FDuiLayout_resize(){
   var o = this;
   var cs = o._components;
   if(cs){
      var ha = false;
      var c = cs.count();
      for(var n = 0; n < c; n++){
         var p = o._components.at(n);
         if(MO.Class.isClass(p, FDuiTable) || MO.Class.isClass(p, FDuiPageControl)){
            ha = true;
            break;
         }
      }
   }
}
MO.FDuiLayout_dispose = function FDuiLayout_dispose(){
   var o = this;
   o._hPanelCurrent = null;
   o._hPanelTable = null;
   o._hPanel = null;
   o._hContainer = null;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiLayoutHorizontal = function FDuiLayoutHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = MO.FDuiLayoutHorizontal_onBuildPanel;
   o.onBuild      = MO.FDuiLayoutHorizontal_onBuild;
   o.appendChild  = MO.FDuiLayoutHorizontal_appendChild;
   o.dispose      = MO.FDuiLayoutHorizontal_dispose;
   return o;
}
MO.FDuiLayoutHorizontal_onBuildPanel = function FDuiLayoutHorizontal_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiLayoutHorizontal_onBuild = function FDuiLayoutHorizontal_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event)
   o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
}
MO.FDuiLayoutHorizontal_appendChild = function FDuiLayoutHorizontal_appendChild(control){
   var o = this;
   var hCell = MO.Window.Builder.appendTableCell(o._hLine);
   hCell.appendChild(control._hPanel);
   var dockCd = control.dockCd();
   if(dockCd == 'left'){
      hCell.align = 'left';
   }else if(dockCd == 'center'){
      hCell.align = 'center';
   }else if(dockCd == 'right'){
      hCell.align = 'right';
   }
}
MO.FDuiLayoutHorizontal_dispose = function FDuiLayoutHorizontal_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiLayoutVertical = function FDuiLayoutVertical(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hLine       = null;
   o.onBuildPanel = MO.FDuiLayoutVertical_onBuildPanel;
   o.appendChild  = MO.FDuiLayoutVertical_appendChild;
   o.dispose      = MO.FDuiLayoutVertical_dispose;
   return o;
}
MO.FDuiLayoutVertical_onBuildPanel = function FDuiLayoutVertical_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiLayoutVertical_appendChild = function FDuiLayoutVertical_appendChild(control){
   var o = this;
   var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel);
   hCell.appendChild(control._hPanel);
   var height = control.size().height;
   if(height){
      hCell.style.height = height + 'px';
   }
}
MO.FDuiLayoutVertical_dispose = function FDuiLayoutVertical_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiListBox = function FDuiListBox(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiHorizontal, MO.MListenerClick);
   o._sizeCd      = MO.EUiSize.Horizontal
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._hForm       = null;
   o.onBuildPanel = MO.FDuiListBox_onBuildPanel;
   o.createItem   = MO.FDuiListBox_createItem;
   o.appendChild  = MO.FDuiListBox_appendChild;
   o.clickItem    = MO.FDuiListBox_clickItem;
   o.clear        = MO.FDuiListBox_clear;
   o.dispose      = MO.FDuiListBox_dispose;
   return o;
}
MO.FDuiListBox_onBuildPanel = function FDuiListBox_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiListBox_createItem = function FDuiListBox_createItem(icon, label){
   var o = this;
   var item = MO.Class.create(MO.FDuiListItem);
   item.build(o._hPanel);
   item.setLabel(label);
   return item;
}
MO.FDuiListBox_appendChild = function FDuiListBox_appendChild(control){
   var o = this;
   o._hPanel.appendChild(control._hPanel);
}
MO.FDuiListBox_clickItem = function FDuiListBox_clickItem(item){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FDuiListItem)){
            component.setChecked(component == item);
         }
      }
   }
   var event = new MO.SEvent(o);
   event.item = item;
   o.processClickListener(event);
   event.dispose();
}
MO.FDuiListBox_clear = function FDuiListBox_clear(){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.at(i);
         if(MO.Class.isClass(component, MO.FDuiListItem)){
            o._hPanel.removeChild(component._hPanel);
         }
         component.dispose();
      }
      components.clear();
      o._controls.clear();
   }
}
MO.FDuiListBox_dispose = function FDuiListBox_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
MO.FDuiListItem = function FDuiListItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._styleNormal    = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover     = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect    = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleIcon      = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._checked        = false;
   o._hPanel         = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = MO.FDuiListItem_onBuildPanel;
   o.onBuild         = MO.FDuiListItem_onBuild;
   o.onEnter         = MO.FDuiListItem_onEnter;
   o.onLeave         = MO.FDuiListItem_onLeave;
   o.onClick         = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListItem_onClick);
   o.label           = MO.FDuiListItem_label;
   o.setLabel        = MO.FDuiListItem_setLabel;
   o.setChecked      = MO.FDuiListItem_setChecked;
   o.dispose         = MO.FDuiListItem_dispose;
   return o;
}
MO.FDuiListItem_onBuildPanel = function FDuiListItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Normal'));
}
MO.FDuiListItem_onBuild = function FDuiListItem_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o._hIconPanel = MO.Window.Builder.appendTableCell(h, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   o._hLabel = MO.Window.Builder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', h);
}
MO.FDuiListItem_onEnter = function FDuiListItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiListItem_onLeave = function FDuiListItem_onLeave(){
   var o = this;
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiListItem_onClick = function FDuiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}
MO.FDuiListItem_label = function FDuiListItem_label(p){
   return this._label;
}
MO.FDuiListItem_setLabel = function FDuiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = MO.Lang.String.nvl(p);
}
MO.FDuiListItem_setChecked = function FDuiListItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiListItem_dispose = function FDuiListItem_dispose(){
   var o = this;
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiListView = function FDuiListView(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiHorizontal);
   o._sizeCd           = MO.EUiSize.Horizontal
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._focusItem        = null;
   o._itemPool         = null;
   o._listenersClick       = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._listenersDoubleClick = MO.Class.register(o, new MO.AListener('_listenersDoubleClick', MO.EEvent.DoubleClick));
   o._hForm            = null;
   o.onBuildPanel      = MO.FDuiListView_onBuildPanel;
   o.onBuild           = MO.FDuiListView_onBuild;
   o.onClick           = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListView_onClick);
   o.construct         = MO.FDuiListView_construct;
   o.focusItem         = MO.FDuiListView_focusItem;
   o.createItem        = MO.FDuiListView_createItem;
   o.appendChild       = MO.FDuiListView_appendChild;
   o.selectItem        = MO.FDuiListView_selectItem;
   o.doClickItem       = MO.FDuiListView_doClickItem;
   o.doDoubleClickItem = MO.FDuiListView_doDoubleClickItem;
   o.clear             = MO.FDuiListView_clear;
   o.dispose           = MO.FDuiListView_dispose;
   return o;
}
MO.FDuiListView_onBuildPanel = function FDuiListView_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
}
MO.FDuiListView_onBuild = function FDuiListView_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
}
MO.FDuiListView_onClick = function FDuiListView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
MO.FDuiListView_construct = function FDuiListView_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._itemPool = MO.Class.create(MO.FObjectPool);
}
MO.FDuiListView_focusItem = function FDuiListView_focusItem(){
   return this._focusItem;
}
MO.FDuiListView_createItem = function FDuiListView_createItem(clazz, pi, pl){
   var o = this;
   var item = o._itemPool.alloc();
   if(!item){
      if(clazz){
         item = MO.Class.create(clazz);
      }else{
         item = MO.Class.create(MO.FDuiListViewItem);
      }
      item.build(o._hPanel);
   }
   return item;
}
MO.FDuiListView_appendChild = function FDuiListView_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}
MO.FDuiListView_selectItem = function FDuiListView_selectItem(item){
   var o = this;
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.valueAt(i);
         if(MO.Class.isClass(component, FDuiListViewItem)){
            component.setChecked(component == item);
         }
      }
   }
   o._focusItem = item;
}
MO.FDuiListView_doClickItem = function FDuiListView_doClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new MO.SClickEvent(o);
   event.item = item;
   o.processClickListener(event);
   event.dispose();
}
MO.FDuiListView_doDoubleClickItem = function FDuiListView_doDoubleClickItem(item){
   var o = this;
   o.selectItem(item);
   var event = new MO.SClickEvent(o);
   event.item = item;
   o.processDoubleClickListener(event);
   event.dispose();
}
MO.FDuiListView_clear = function FDuiListView_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(MO.Class.isClass(m, MO.FDuiListViewItem)){
            o._hPanel.removeChild(m._hPanel);
            o._itemPool.free(m)
         }else{
            m.dispose();
         }
      }
      cs.clear();
      o._controls.clear();
   }
}
MO.FDuiListView_dispose = function FDuiListView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
MO.FDuiListViewItem = function FDuiListViewItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel     = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleNormal    = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover     = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect    = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleForm      = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleContent   = MO.Class.register(o, new MO.AStyle('_styleContent'));
   o._styleIconPanel = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleIcon      = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._checked        = false;
   o._contentHeight  = 28;
   o._hPanel         = null;
   o._hBorder        = null;
   o._hForm          = null;
   o._hContentForm   = null;
   o._hContentLine   = null;
   o._hIconPanel     = null;
   o._hIcon          = null;
   o._hLabel         = null;
   o.onBuildPanel    = MO.FDuiListViewItem_onBuildPanel;
   o.onBuild         = MO.FDuiListViewItem_onBuild;
   o.onEnter         = MO.FDuiListViewItem_onEnter;
   o.onLeave         = MO.FDuiListViewItem_onLeave;
   o.onClick         = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiListViewItem_onClick);
   o.onDoubleClick   = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiListViewItem_onDoubleClick);
   o.label           = MO.FDuiListViewItem_label;
   o.setLabel        = MO.FDuiListViewItem_setLabel;
   o.setChecked      = MO.FDuiListViewItem_setChecked;
   o.dispose         = MO.FDuiListViewItem_dispose;
   return o;
}
MO.FDuiListViewItem_onBuildPanel = function FDuiListViewItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
}
MO.FDuiListViewItem_onBuild = function FDuiListViewItem_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p);
   var hPanel = o._hPanel;
   var hBorder = o._hBorder = MO.Window.Builder.appendDiv(hPanel, o.styleName('Normal'));
   var hTable = o._hForm = MO.Window.Builder.appendTable(hBorder, o.styleName('Form'));
   var hLine1 = o._hLine1 = MO.Window.Builder.appendTableRowCell(hTable)
   var hLine2 = o._hLine2 = MO.Window.Builder.appendTableRowCell(hTable)
   hLine2.height = o._contentHeight;
   var hContentForm = o._hContentForm = MO.Window.Builder.appendTable(hLine2, o.styleName('Content'));
   var hContentLine = o._hContentLine = MO.Window.Builder.appendTableRow(hContentForm);
   o._hIconPanel = MO.Window.Builder.appendTableCell(hContentLine, o.styleName('IconPanel'))
   o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleName('Icon'), MO.Lang.String.nvl(o._icon, 'tools.select'));
   MO.Window.Html.displaySet(o._hIcon, false);
   o._hLabel = MO.Window.Builder.appendTableCell(hContentLine, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   o.attachEvent('onClick', hPanel);
   o.attachEvent('onDoubleClick', hPanel);
}
MO.FDuiListViewItem_onEnter = function FDuiListViewItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiListViewItem_onLeave = function FDuiListViewItem_onLeave(){
   var o = this;
   o._hBorder.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiListViewItem_onClick = function FDuiListViewItem_onClick(event){
   var o = this;
   if(o._checked){
      o._parent.doDoubleClickItem(o);
   }else{
      o._parent.doClickItem(o);
   }
}
MO.FDuiListViewItem_onDoubleClick = function FDuiListViewItem_onDoubleClick(event){
   var o = this;
   o._parent.doDoubleClickItem(o);
}
MO.FDuiListViewItem_label = function FDuiListViewItem_label(p){
   return this._label;
}
MO.FDuiListViewItem_setLabel = function FDuiListViewItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = MO.Lang.String.nvl(p);
}
MO.FDuiListViewItem_setChecked = function FDuiListViewItem_setChecked(checked){
   var o = this;
   o._checked = checked;
   if(o._hIcon){
      o._hIcon.style.display = checked ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = checked ? 'O' : '';
   }
   o._hBorder.className = checked ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiListViewItem_dispose = function FDuiListViewItem_dispose(){
   var o = this;
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hBorder = MO.Window.Html.free(o._hBorder);
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine1 = MO.Window.Html.free(o._hLine1);
   o._hLine2 = MO.Window.Html.free(o._hLine2);
   o._hContentForm = MO.Window.Html.free(o._hContentForm);
   o._hContentLine = MO.Window.Html.free(o._hContentLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiMemo = function FDuiMemo(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiMemo_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiMemo_onInputEdit);
   o.construct        = MO.FDuiMemo_construct;
   o.formatDisplay    = MO.FDuiMemo_formatDisplay;
   o.formatValue      = MO.FDuiMemo_formatValue;
   o.get              = MO.FDuiMemo_get;
   o.set              = MO.FDuiMemo_set;
   o.refreshValue     = MO.FDuiMemo_refreshValue;
   return o;
}
MO.FDuiMemo_onBuildEditValue = function FDuiMemo_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var hInput = o._hInput = MO.Window.Builder.append(hInputPanel, 'TEXTAREA', o.styleName('Input'));
   hInput.wrap = 'off';
   o.attachEvent('onInputEdit', hInput, o.onInputEdit);
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   if(o._editLength){
      hInput.maxLength = o._editLength;
   }
}
MO.FDuiMemo_onInputEdit = function FDuiMemo_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
MO.FDuiMemo_construct = function FDuiMemo_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiMemo_formatDisplay = function FDuiMemo_formatDisplay(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   o._dataDisplay = text;
   return text;
}
MO.FDuiMemo_formatValue = function FDuiMemo_formatValue(value){
   return value;
}
MO.FDuiMemo_get = function FDuiMemo_get(){
   var o = this;
   o.__base.FDuiEditControl.get.call(o);
   var value = o._hInput.value;
   return value;
}
MO.FDuiMemo_set = function FDuiMemo_set(value){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, value);
   o._hInput.value = MO.Lang.String.nvl(value);
}
MO.FDuiMemo_refreshValue = function FDuiMemo_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber = function FDuiNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged, MO.MUiPropertyNumber);
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleAdjustForm  = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel     = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel   = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o._iconUp           = null;
   o._iconDown         = null;
   o.onBuildEditValue  = FDuiNumber_onBuildEditValue;
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber_onInputChanged);
   o.construct         = MO.FDuiNumber_construct;
   o.formatDisplay     = MO.FDuiNumber_formatDisplay;
   o.formatValue       = MO.FDuiNumber_formatValue;
   o.get               = MO.FDuiNumber_get;
   o.set               = MO.FDuiNumber_set;
   return o;
}
MO.FDuiNumber_onBuildEditValue = function FDuiNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hip = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hip, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = MO.Window.Builder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.down');
}
MO.FDuiNumber_onInputKeyPress = function FDuiNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
MO.FDuiNumber_onInputChanged = function FDuiNumber_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber_construct = function FDuiNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._editSize.set(100, 20);
   o._inputSize = new SSize2(80, 0);
}
MO.FDuiNumber_formatDisplay = function FDuiNumber_formatDisplay(p){
   var o = this;
   var r = o._dataDisplay = MO.Lang.Float.format(p, 0, null, o._valuePrecision, null);
   return r;
}
MO.FDuiNumber_formatValue = function FDuiNumber_formatValue(p){
   return p;
}
MO.FDuiNumber_get = function FDuiNumber_get(p){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = o.formatValue(h.value);
   }
   return r;
}
MO.FDuiNumber_set = function FDuiNumber_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var v = MO.Lang.String.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   var h = o._hInput;
   if(h){
      h.value = o.formatDisplay(p);
   }
   o.changeSet(false);
}
MO.FDuiNumber_onDataKeyDown = function FDuiNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber_setText = function FDuiNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber_validText = function FDuiNumber_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber_findEditor = function FDuiNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumberConsole).focus(o, FDuiNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber_drop = function FDuiNumber_drop(){
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
MO.FDuiNumber2 = function FDuiNumber2(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput          = null;
   o.onBuildEditInput  = MO.FDuiNumber3_onBuildEditInput;
   o.onBuildEditValue = MO.FDuiNumber2_onBuildEditValue;
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiNumber2_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), MO.FDuiNumber2_onInputChanged);
   o.construct        = MO.FDuiNumber2_construct;
   o.get              = MO.FDuiNumber2_get;
   o.set              = MO.FDuiNumber2_set;
   return o;
}
MO.FDuiNumber2_oeDataLoad = function FDuiNumber2_oeDataLoad(p){
   var o = this;
   alert(p);
   return MO.EEventStatus.Stop;
}
MO.FDuiNumber2_oeDataSave = function FDuiNumber2_oeDataSave(p){
   var o = this;
   return MO.EEventStatus.Stop;
}
MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
MO.FDuiNumber2_onBuildEditValue = function FDuiNumber2_onBuildEditValue(event){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = MO.Window.Builder.appendTable(h);
   var hr = MO.Window.Builder.appendTableRow(hf);
   var hCell = MO.Window.Builder.appendTableCell(hr);
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   o.onBuildEditInput(event, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hr);
   hCell.style.borderLeft = '1px solid #999999';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   o.onBuildEditInput(event, hInput)
}
MO.FDuiNumber2_onInputKeyPress = function FDuiNumber2_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!MO.EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
MO.FDuiNumber2_onInputChanged = function FDuiNumber2_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber2_construct = function FDuiNumber2_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SPoint2();
   o._innerDataValue = new MO.SPoint2();
}
MO.FDuiNumber2_get = function FDuiNumber2_get(value){
   var o = this;
   o.__base.FDuiEditControl.get.call(o, value);
   var dataValue = o._innerDataValue;
   var hInput = o._hInput1;
   if(hInput){
      dataValue.x = MO.Lang.Float.parse(hInput.value);
   }
   var hInput = o._hInput2;
   if(hInput){
      dataValue.y = MO.Lang.Float.parse(hInput.value);
   }
   return dataValue;
}
MO.FDuiNumber2_set = function FDuiNumber2_set(value){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, value);
   var originValue = o._innerOriginValue;
   var vd = o._innerDataValue;
   if(arguments.length == 1){
      var value = arguments[0];
      if(value.constructor == SPoint2){
         originValue.assign(value);
         vd.assign(value);
      }else if(value.constructor == SSize2){
         originValue.set(value.width, value.height);
         vd.set(value.width, value.height);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(arguments.length == 2){
      originValue.set(arguments[0], arguments[1]);
      vd.assign(originValue);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   var hInput = o._hInput1;
   if(hInput){
      hInput.value = MO.Lang.Float.format(vd.x, 0, null, 2, null);
   }
   var hInput = o._hInput2;
   if(hInput){
      hInput.value = MO.Lang.Float.format(vd.y, 0, null, 2, null);
   }
   o.changeSet(false);
}
MO.FDuiNumber2_onDataKeyDown = function FDuiNumber2_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      MO.RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber2_formatValue = function FDuiNumber2_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber2_setText = function FDuiNumber2_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber2_validText = function FDuiNumber2_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return MO.RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return MO.RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
MO.FDuiNumber2_findEditor = function FDuiNumber2_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = MO.Console.find(MO.FDuiNumber2Console).focus(o, MO.FDuiNumber2Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber2_drop = function FDuiNumber2_drop(){
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
MO.FDuiNumber2_clone = function FDuiNumber2_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber2_link = function FDuiNumber2_link(){
   var o = this;
}
MO.FDuiNumber3 = function FDuiNumber3(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged);
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel  = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   o._hInput           = null;
   o.onBuildEditInput  = MO.FDuiNumber3_onBuildEditInput;
   o.onBuildEditValue  = MO.FDuiNumber3_onBuildEditValue;
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), FDuiNumber3_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('onInputChanged'), FDuiNumber3_onInputChanged);
   o.construct         = MO.FDuiNumber3_construct;
   o.get               = MO.FDuiNumber3_get;
   o.set               = MO.FDuiNumber3_set;
   return o;
}
MO.FDuiNumber3_onBuildEditInput = function FDuiNumber3_onBuildEditInput(p, h){
   var o = this;
   o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
   o.attachEvent('onInputChanged', h, o.onInputChanged);
}
MO.FDuiNumber3_onBuildEditValue = function FDuiNumber3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   var hr = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hr);
   o.onBuildEditChange(p);
   var hCell = MO.Window.Builder.appendTableCell(hr, o.styleName('InputPanel'));
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput1 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   o.onBuildEditInput(p, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hr, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   hCell.style.borderRight = '1px solid #666666';
   var hInput = o._hInput2 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   o.onBuildEditInput(p, hInput)
   var hCell = MO.Window.Builder.appendTableCell(hr, o.styleName('InputPanel'));
   hCell.style.borderLeft = '1px solid #999999';
   var hInput = o._hInput3 = MO.Window.Builder.appendEdit(hCell, o.styleName('Input'));
   o.onBuildEditInput(p, hInput)
}
MO.FDuiNumber3_onInputKeyPress = function FDuiNumber3_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}
MO.FDuiNumber3_onInputChanged = function FDuiNumber3_onInputChanged(p){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiNumber3_construct = function FDuiNumber3_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
   o._innerOriginValue = new MO.SPoint3();
   o._innerDataValue = new MO.SPoint3();
}
MO.FDuiNumber3_get = function FDuiNumber3_get(p){
   var o = this;
   o.__base.FDuiEditControl.get.call(o, p);
   var v = o._innerDataValue;
   var h = o._hInput1;
   if(h){
      v.x = MO.Lang.Float.parse(h.value);
   }
   var h = o._hInput2;
   if(h){
      v.y = MO.Lang.Float.parse(h.value);
   }
   var h = o._hInput3;
   if(h){
      v.z = MO.Lang.Float.parse(h.value);
   }
   return v;
}
MO.FDuiNumber3_set = function FDuiNumber3_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var a = arguments;
   var vo = o._innerOriginValue
   var vd = o._innerDataValue;
   if(a.length == 1){
      if((p.constructor == MO.SPoint3) || (p.constructor == MO.SVector3)){
         vo.assign(p);
         vd.assign(p);
      }else{
         throw new MO.TError('Invalid value format.');
      }
   }else if(a.length == 3){
      vo.set(a[0], a[1], a[2]);
      vd.assign(vo);
   }else{
      throw new MO.TError('Invalid value format.');
   }
   var h = o._hInput1;
   if(h){
      h.value = MO.Lang.Float.format(vd.x, 0, null, 3, null);
   }
   var h = o._hInput2;
   if(h){
      h.value = MO.Lang.Float.format(vd.y, 0, null, 3, null);
   }
   var h = o._hInput3;
   if(h){
      h.value = MO.Lang.Float.format(vd.z, 0, null, 3, null);
   }
   o.changeSet(false);
}
MO.FDuiNumber3_onDataKeyDown = function FDuiNumber3_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber3_formatValue = function FDuiNumber3_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber3_setText = function FDuiNumber3_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber3_validText = function FDuiNumber3_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber3_findEditor = function FDuiNumber3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber3Console).focus(o, FDuiNumber3Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber3_drop = function FDuiNumber3_drop(){
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
MO.FDuiNumber3_clone = function FDuiNumber3_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber3_link = function FDuiNumber3_link(){
   var o = this;
}
MO.FDuiNumber4 = function FDuiNumber4(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiNumber4_onBuildEditValue;
   o.construct        = MO.FDuiNumber4_construct;
   o.get              = MO.FDuiNumber4_get;
   o.set              = MO.FDuiNumber4_set;
   return o;
}
MO.FDuiNumber4_oeDataLoad = function FDuiNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return MO.EEventStatus.Stop;
}
MO.FDuiNumber4_oeDataSave = function FDuiNumber4_oeDataSave(p){
   var o = this;
   return MO.EEventStatus.Stop;
}
MO.FDuiNumber4_onBuildEditValue = function FDuiNumber4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var hf = o._hInputForm = MO.Window.Builder.appendTable(h);
   var hr = MO.Window.Builder.appendTableRow(hf);
   var hc1 = MO.Window.Builder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = MO.Window.Builder.appendEdit(hc1, o.styleName('Input'));
   var hc2 = MO.Window.Builder.appendTableCell(hr);
   hc2.style.borderRight = '1px solid #666666';
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = MO.Window.Builder.appendEdit(hc2, o.styleName('Input'));
   var hc3 = MO.Window.Builder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   hc3.style.borderRight = '1px solid #666666';
   var he3 = o._hInput3 = MO.Window.Builder.appendEdit(hc3, o.styleName('Input'));
   var hc4 = MO.Window.Builder.appendTableCell(hr);
   hc4.style.borderLeft = '1px solid #999999';
   var he4 = o._hInput4 = MO.Window.Builder.appendEdit(hc4, o.styleName('Input'));
}
MO.FDuiNumber4_construct = function FDuiNumber4_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiNumber4_get = function FDuiNumber4_get(p){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o, p);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
MO.FDuiNumber4_set = function FDuiNumber4_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = MO.Lang.String.nvl(p);
   }
}
MO.FDuiNumber4_onDataKeyDown = function FDuiNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
MO.FDuiNumber4_formatValue = function FDuiNumber4_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}
MO.FDuiNumber4_setText = function FDuiNumber4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiNumber4_validText = function FDuiNumber4_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
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
MO.FDuiNumber4_findEditor = function FDuiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber4Console).focus(o, FDuiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
MO.FDuiNumber4_drop = function FDuiNumber4_drop(){
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
MO.FDuiNumber4_clone = function FDuiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
MO.FDuiNumber4_link = function FDuiNumber4_link(){
   var o = this;
}
MO.FDuiPanel = function FDuiPanel(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MDuiDesign, MO.MDuiFocus);
   o._sizeCd      = MO.EUiSize.Horizontal;
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleLabel  = MO.Class.register(o, new MO.AStyle('_styleLabel', 'Label'));
   o._styleBody   = MO.Class.register(o, new MO.AStyle('_styleBody', 'Body'));
   o._hImage      = null;
   o._imagePlus   = 'control.panel.plus';
   o._imageMinus  = 'control.panel.minus';
   o._statusBody  = true;
   o.onBuildPanel = MO.FDuiPanel_onBuildPanel;
   o.onTitleClick = MO.Class.register(o, new MO.AEventClick('onTitleClick'), MO.FDuiPanel_onTitleClick);
   return o;
}
MO.FDuiPanel_onBuildPanel = function FDuiPanel_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createDiv(p, o.styleName('Panel'));
   var hl = MO.Window.Builder.appendTable(h, o.styleName('Label'));
   o.attachEvent('onTitleClick', hl);
   hl.width = '100%';
   var hr = MO.Window.Builder.appendTableRow(hl);
   hr.vAlign = 'middle';
   var hri = MO.Window.Builder.appendTableCell(hr);
   hri.width = 20;
   o._hImage = MO.Window.Builder.appendIcon(hri, null, o._imageMinus);
   var hrt = MO.Window.Builder.appendTableCell(hr);
   hrt.innerHTML = o._label;
   var hb = o._hBody = MO.Window.Builder.appendDiv(h, o.styleName('Body'))
   o._hPanelForm = MO.Window.Builder.appendTable(hb, o.styleName('Form'));
}
MO.FDuiPanel_onTitleClick = function FDuiPanel_onTitleClick(p){
   var o = this;
   var s = !o._statusBody;
   o._statusBody = s;
   o._hImage.src = MO.RResource.iconPath(s ? o._imageMinus : o._imagePlus);
   Html.displaySet(o._hBody, s);
}
MO.FDuiPanelHorizontal = function FDuiPanelHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayoutHorizontal);
   o._sizeCd = MO.EUiSize.Horizontal;
   return o;
}
MO.FDuiPanelVertical = function FDuiPanelVertical(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayoutVertical);
   return o;
}
MO.FDuiPicture = function FDuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescEdit);
   o.storeType         = MO.Class.register(o, new MO.APtyString('storeType'));
   o.storeCode         = MO.Class.register(o, new MO.APtyString('storeCode'));
   o.storeName         = MO.Class.register(o, new MO.APtyString('storeName'));
   o.editAdjust        = MO.Class.register(o, new MO.APtyInteger('editAdjust'));
   o.editMaxWidth      = MO.Class.register(o, new MO.APtyInteger('editMaxWidth'));
   o.editMaxHeight     = MO.Class.register(o, new MO.APtyInteger('editMaxHeight'));
   o.__seed            = 0;
   o.attributes        = null;
   o.border            = null;
   o.borderStyle       = MO.EUiBorder.Round;
   o.onUploadMouseDown = MO.Class.register(o, new HMouseDown('onUploadMouseDown'), FDuiPicture_onUploadMouseDown);
   o.onFileUploaded    = MO.FDuiPicture_onFileUploaded;
   o.onBuildEdit       = MO.FDuiPicture_onBuildEdit;
   o.construct         = MO.FDuiPicture_construct;
   o.makeIconPath      = MO.FDuiPicture_makeIconPath;
   o.setText           = MO.FDuiPicture_setText;
   o.setEditable       = MO.FDuiPicture_setEditable;
   o.dispose           = MO.FDuiPicture_dispose;
   return o;
}
MO.FDuiPicture_onUploadMouseDown = function FDuiPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      var uw = MO.Console.find(MO.FUploadConsole).findWindow();
      uw.lsnsUploaded.register(o, o.onFileUploaded);
      uw.typeCode = 'P';
      uw.fileEdit = false;
      uw.recordCode = o.recordCode;
      uw.recordGuid = o.recordGuid;
      uw.recordName = o.recordName;
      uw.guid = o.guid;
      uw.adjustWidth = o.editWidth;
      uw.adjustHeight = o.editHeight;
      uw.show();
   }
}
MO.FDuiPicture_onFileUploaded = function FDuiPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + MO.Lang.Date.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}
MO.FDuiPicture_onBuildEdit = function FDuiPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = MO.Window.Builder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   var h = o.hImage = MO.Window.Builder.append(hc, 'IMAGE');
   h.style.border = '1 solid #CCCCCC';
   h.style.display = 'none';
   if(o.left>0 && o.top>0){
      o.hPanel.style.position = 'absolute';
   }
}
MO.FDuiPicture_construct = function FDuiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new MO.TAttributes();
}
MO.FDuiPicture_makeIconPath = function FDuiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + MO.Lang.String.toLower(s));
}
MO.FDuiPicture_setText = function FDuiPicture_setText(t){
   var o = this;
   var as = o.attributes;
   as.clear();
   var v = false;
   if(!MO.Lang.String.isEmpty(t)){
      as.unpack(t);
      o.networkCode = as.get('nc');
      o.recordCode = as.get('code');
      o.recordGuid = as.get('guid');
      o.recordName = as.get('name');
      o.guid = as.get('ogid');
      o.mime = as.get('mime');
      if(o.guid && o.mime){
         v = true;
         o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
      }
   }
   o.hImage.style.display = v ? 'block' : 'none';
}
MO.FDuiPicture_setEditable = function FDuiPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
MO.FDuiPicture_dispose = function FDuiPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
MO.FDuiProgressBar = function FDuiProgressBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._rate        = 0;
   o._hForm       = null;
   o.onBuildPanel = MO.FDuiProgressBar_onBuildPanel;
   o.onBuild      = MO.FDuiProgressBar_onBuild;
   o.get          = MO.FDuiProgressBar_get;
   o.set          = MO.FDuiProgressBar_set;
   o.dispose      = MO.FDuiProgressBar_dispose;
   return o;
}
MO.FDuiProgressBar_onBuildPanel = function FDuiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}
MO.FDuiProgressBar_onBuild = function FDuiProgressBar_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
   o.hProgress = MO.Window.Builder.appendTableCell(hLine);
   o.hEmpty = MO.Window.Builder.appendTableCell(hLine);
}
MO.FDuiProgressBar_get = function FDuiProgressBar_get(){
   return this._rate;
}
MO.FDuiProgressBar_set = function FDuiProgressBar_set(value){
   var o = this;
   o._rate = value;
}
MO.FDuiProgressBar_dispose = function FDuiProgressBar_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiRadio = function FDuiRadio(o){
   o = MO.Class.inherits(this, o, MO.FEditControl);
   o._groupName       = MO.Class.register(o, new MO.APtyString('_groupName'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput', 'Input'));
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiRadio_onBuildEditValue;
   return o;
}
MO.FDuiRadio_onBuildEditValue = function FDuiRadio_onBuildEditValue(p){
   var o = this;
   o._hInput = MO.Window.Builder.appendRadio(o._hValuePanel, o.styleName('Input'));
}
MO.FDuiRadio_clearValue = function FDuiRadio_clearValue(){
   this.hEdit.checked = false;
}
MO.FDuiRadio_resetValue = function FDuiRadio_resetValue(){
   this.hEdit.checked = this._editChecked;
}
MO.FDuiRadio_saveValue = function FDuiRadio_saveValue(vs){
   var o = this;
   if(o.hEdit.checked){
      vs.set(o.dataName, o.dataDefault);
   }
}
MO.FDuiRadio_text = function FDuiRadio_text(){
   return this.hEdit.checked ? this.dataDefault : '';
}
MO.FDuiRadio_setText = function FDuiRadio_setText(t){
   this.hEdit.checked = (this.dataDefault == t);
}
MO.FDuiRadio_refreshStyle = function FDuiRadio_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   h.style.cursor = o._editable? 'hand':'normal';
}
MO.FDuiSelect = function FDuiSelect(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MDuiContainer, MO.MUiPropertySelect);
   o._styleValuePanel      = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput           = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._hValueForm           = null;
   o._hValueLine           = null;
   o._hInputPanel          = null;
   o._hInput               = null;
   o.onBuildEditValue      = MO.FDuiSelect_onBuildEditValue;
   o.onDoubleClick         = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiSelect_onDropClick);
   o.onDropClick           = MO.FDuiSelect_onDropClick;
   o.onKeyDown             = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'), MO.FDuiSelect_onKeyDown);
   o.construct             = MO.FDuiSelect_construct;
   o.findItemByLabel       = MO.FDuiSelect_findItemByLabel;
   o.findItemByData        = MO.FDuiSelect_findItemByData;
   o.formatValue           = MO.FDuiSelect_formatValue;
   o.formatDisplay         = MO.FDuiSelect_formatDisplay;
   o.get                   = MO.FDuiSelect_get;
   o.set                   = MO.FDuiSelect_set;
   o.selectItem            = MO.FDuiSelect_selectItem;
   o.refreshValue          = MO.FDuiSelect_refreshValue;
   o.drop                  = MO.FDuiSelect_drop;
   o.dispose               = MO.FDuiSelect_dispose;
   return o;
}
MO.FDuiSelect_onBuildEditValue = function FDuiSelect_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onDoubleClick', he);
   o.attachEvent('onKeyDown', he);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
   var c = o._emptyItem = MO.Class.create(MO.FDuiSelectItem);
   c.build(p);
   o.push(c);
}
MO.FDuiSelect_onDropClick = function FDuiSelect_onDropClick(p){
   this.drop();
}
MO.FDuiSelect_onKeyDown = function FDuiSelect_onKeyDown(p){
   var o = this;
   var e = o._editor;
   if(e && e._statusEditing && (e._source == o)){
      e.onEditKeyDown(p);
      return;
   }
   if(p.keyCode == MO.EKeyCode.Down){
      o.drop();
   }
}
MO.FDuiSelect_construct = function FDuiSelect_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
}
MO.FDuiSelect_findItemByLabel = function FDuiSelect_findItemByLabel(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(MO.Lang.String.equals(c._label, p, true)){
            return c;
         }
      }
   }
   return null;
}
MO.FDuiSelect_findItemByData = function FDuiSelect_findItemByData(p){
   var o = this;
   var s = o._components;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         var c = s.valueAt(i);
         if(MO.Lang.String.equals(c._dataValue, p, true)){
            return c;
         }
      }
   }
   return null;
}
MO.FDuiSelect_formatValue = function FDuiSelect_formatValue(label){
   var o = this;
   var item = o.findItemByLabel(label);
   if(item){
      return MO.Lang.String.nvl(item.dataValue());
   }
   return item;
}
MO.FDuiSelect_formatDisplay = function FDuiSelect_formatDisplay(value){
   var o = this;
   var item = o.findItemByData(value);
   if(item){
      return MO.Lang.String.nvl(item.label());
   }
   return item;
}
MO.FDuiSelect_get = function FDuiSelect_get(){
   var o = this;
   var value = o._hInput.value;
   var result = o.formatValue(value);
   return result;
}
MO.FDuiSelect_set = function FDuiSelect_set(value){
   var o = this;
   var text = o.formatDisplay(value);
   o._hInput.value = MO.Lang.String.nvl(text);
}
MO.FDuiSelect_selectItem = function FDuiSelect_selectItem(item){
   var o = this;
   o._hInput.value = MO.Lang.String.nvl(item.label());
   o.refreshValue();
}
MO.FDuiSelect_refreshValue = function FDuiSelect_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiSelect_drop = function FDuiSelect_drop(){
   var o = this;
   if(o.hasComponent()){
      var e = o._editor = MO.Console.find(MO.FDuiEditorConsole).focus(o, MO.FDuiSelectEditor, o._name);
      e.buildItems(o);
      e.set(o.get());
      e.show();
   }
}
MO.FDuiSelect_dispose = function FDuiSelect_dispose(){
   var o = this;
   o.__base.FDuiEditControl.dispose.call(o);
}
MO.FDuiSelect_onEditEnd = function FDuiSelect_onEditEnd(e){
   var o = this;
   if(e){
      o.set(e.get());
      o._invalidText = o.validText(o.text());
      o.refreshStyle();
   }
   o.onDataEditEnd(o);
}
MO.FDuiSelect_loadConfig = function FDuiSelect_loadConfig(c){
   var o = this;
   o.__base.FDuiEditControl.loadConfig.call(o, c);
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
            var e = MO.Class.create(FEvent);
             e.loadConfig(p);
             o.push(e);
         }
      }
   }
   return EStatus.Stop;
}
MO.FDuiSelect_refreshStyle = function FDuiSelect_refreshStyle(){
   var o = this;
   o.__base.FDuiEditControl.refreshStyle.call(o);
   if(!o.editCheck){
      o.hEdit.readOnly = 'true';
   }
}
MO.FDuiSelect_doBlur = function FDuiSelect_doBlur(){
   var o = this;
   o.__base.FDuiEditControl.doBlur.call(o);
   if(o._editor){
      o._editor.hide();
   }
}
MO.FDuiSelectEditor = function FDuiSelectEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiDropEditor);
   o._items              = null;
   o._position           = null;
   o._valueRectangle     = null;
   o._listenersItemClick = MO.Class.register(o, new MO.AListener('_listenersItemClick', MO.EEvent.ItemClick));
   o._hDropLayout        = null;
   o._hItemsForm         = null;
   o.onBuildDrop        = MO.FDuiSelectEditor_onBuildDrop;
   o.onItemClick        = MO.FDuiSelectEditor_onItemClick;
   o.onEditKeyDown      = MO.FDuiSelectEditor_onEditKeyDown;
   o.onEditEnd          = MO.FDuiSelectEditor_onEditEnd;
   o.construct          = MO.FDuiSelectEditor_construct;
   o.testBlur           = MO.FDuiSelectEditor_testBlur;
   o.buildItems         = MO.FDuiSelectEditor_buildItems;
   o.clearItems         = MO.FDuiSelectEditor_clearItems;
   o.get                = MO.FDuiSelectEditor_get;
   o.set                = MO.FDuiSelectEditor_set;
   o.select             = MO.FDuiSelectEditor_select;
   o.fetch              = MO.FDuiSelectEditor_fetch;
   o.setVisible         = MO.FDuiSelectEditor_setVisible;
   o.dispose            = MO.FDuiSelectEditor_dispose;
   return o;
}
MO.FDuiSelectEditor_onBuildDrop = function FDuiSelectEditor_onBuildDrop(){
   var o = this;
   var hl = o._hDropLayout = MO.Window.Builder.appendDiv(o._hDropPanel)
   var hf = o._hItemsForm = MO.Window.Builder.appendTable(hl);
   o._hItemsBody = MO.Window.Builder.append(hf, 'TBODY');
}
MO.FDuiSelectEditor_onItemClick = function FDuiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}
MO.FDuiSelectEditor_onEditKeyDown = function FDuiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case MO.EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case MO.EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case MO.EKeyCode.Enter:
         o.editEnd();
         break;
      case MO.EKeyCode.Esc:
         o.editCancel();
         break;
   }
}
MO.FDuiSelectEditor_onEditEnd = function FDuiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FDuiDropEditor.onEditEnd.call(o);
}
MO.FDuiSelectEditor_construct = function FDuiSelectEditor_construct(){
   var o = this;
   o.__base.FDuiDropEditor.construct.call(o);
   o._valueRectangle = new MO.SRectangle();
}
MO.FDuiSelectEditor_testBlur = function FDuiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}
MO.FDuiSelectEditor_clearItems = function FDuiSelectEditor_clearItems(){
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
MO.FDuiSelectEditor_buildItems = function FDuiSelectEditor_buildItems(p){
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
MO.FDuiSelectEditor_get = function FDuiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}
MO.FDuiSelectEditor_set = function FDuiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(MO.Lang.String.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}
MO.FDuiSelectEditor_select = function FDuiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   var n = MO.Lang.Integer.toRange(p, 0, c - 1);
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}
MO.FDuiSelectEditor_fetch = function FDuiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = MO.Console.find(MO.FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}
MO.FDuiSelectEditor_setVisible = function FDuiSelectEditor_setVisible(visible){
   var o = this;
   o.__base.FDuiDropEditor.setVisible.call(o, visible);
   var hPanel = o._hPanel;
   var hItemsForm = o._hItemsForm;
   if(visible){
      var source = o._source;
      var rectangle = source.calculateValueRectangle(o._valueRectangle);
      hItemsForm.width = '';
      var formWidth = hItemsForm.offsetWidth;
      hPanel.style.left = rectangle.left + 'px';
      hPanel.style.top = rectangle.bottom() + 'px';
      hPanel.style.width = Math.max(formWidth, rectangle.width) + 'px';
      hItemsForm.width = '100%';
      if(hItemsForm.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}
MO.FDuiSelectEditor_dispose = function FDuiSelectEditor_dispose(){
   var o = this;
   o._valueRectangle = MO.Lang.Object.dispose(o._valueRectangle);
   o._hDropLayout = MO.Window.Html.free(o._hDropLayout);
   o._hItemsForm = MO.Window.Html.free(o._hItemsForm);
   o.__base.FDuiDropEditor.dispose.call(o);
}
MO.FDuiSelectItem = function FDuiSelectItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._icon             = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetter('_icon')]);
   o._dataValue        = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   o._note             = MO.Class.register(o, [new MO.APtyString('_note'), new MO.AGetSet('_note')]);
   o._styleNormal      = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover       = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect      = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleIconChecked = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel       = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleNote        = MO.Class.register(o, new MO.AStyle('_styleNote'));
   o._checked          = false;
   o._listenersClick   = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   o.onBuildPanel      = MO.FDuiSelectItem_onBuildPanel;
   o.onBuild           = MO.FDuiSelectItem_onBuild;
   o.onEnter           = MO.FDuiSelectItem_onEnter;
   o.onLeave           = MO.FDuiSelectItem_onLeave;
   o.onMouseDown       = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSelectItem_onMouseDown);
   o.setChecked        = MO.FDuiSelectItem_setChecked;
   o.set               = MO.FDuiSelectItem_set;
   o.dispose           = MO.FDuiSelectItem_dispose;
   return o;
}
MO.FDuiSelectItem_onBuildPanel = function FDuiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName("Normal"));
}
MO.FDuiSelectItem_onBuild = function FDuiSelectItem_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Icon"));
   hIconPanel.width = 18;
   hIconPanel.align = 'center';
   var hIconPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Label"));
   if(o._label){
      hIconPanel.innerHTML = o._label;
   }else{
      hIconPanel.innerHTML = '&nbsp;';
   }
   o._hNotePanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Note"));
}
MO.FDuiSelectItem_onEnter = function FDuiSelectItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}
MO.FDuiSelectItem_onLeave = function FDuiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}
MO.FDuiSelectItem_onMouseDown = function FDuiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
}
MO.FDuiSelectItem_setChecked = function FDuiSelectItem_setChecked(value){
   var o = this;
   o._checked = value;
   if(o._hIcon){
      o._hIcon.style.display = value ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = value ? 'O' : '';
   }
   o._hPanel.className = value ? o.styleName('Select') : o.styleName('Normal');
}
MO.FDuiSelectItem_set = function FDuiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = MO.Lang.String.nvl(icon);
   if(!MO.Lang.String.isEmpty(o._icon)){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = MO.Lang.String.nvl(label);
   o._value = MO.Lang.String.nvl(value);
   o._note = MO.Lang.String.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}
MO.FDuiSelectItem_dispose = function FDuiSelectItem_dispose(){
   var o = this;
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hNotePanel = MO.Window.Html.free(o._hNotePanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiSlideNumber = function FDuiSlideNumber(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyNumber, MO.MListenerDataChanged, MO.MMouseCapture);
   o._inputSize          = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._styleSlidePanel    = MO.Class.register(o, new MO.AStyle('_styleSlidePanel'));
   o._styleValuePanel    = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput         = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleAdjustForm    = MO.Class.register(o, new MO.AStyle('_styleAdjustForm'));
   o._styleUpPanel       = MO.Class.register(o, new MO.AStyle('_styleUpPanel'));
   o._styleDownPanel     = MO.Class.register(o, new MO.AStyle('_styleDownPanel'));
   o._innerOriginValue   = null;
   o._innerDataValue     = null;
   o._slide              = null;
   o._hInput             = null;
   o._iconUp             = null;
   o._iconDown           = null;
   o.onBuildEditValue    = MO.FDuiSlideNumber_onBuildEditValue;
   o.onMouseCaptureStart = MO.FDuiSlideNumber_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiSlideNumber_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiSlideNumber_onMouseCaptureStop;
   o.onSlideChange       = MO.FDuiSlideNumber_onSlideChange;
   o.onInputKeyPress     = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiSlideNumber_onInputKeyPress);
   o.onInputEdit         = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiSlideNumber_onInputEdit);
   o.onInputChange       = MO.Class.register(o, new MO.AEventChange('onInputChange'), MO.FDuiSlideNumber_onInputChange);
   o.construct           = MO.FDuiSlideNumber_construct;
   o.get                 = MO.FDuiSlideNumber_get;
   o.set                 = MO.FDuiSlideNumber_set;
   o.setInputValue       = MO.FDuiSlideNumber_setInputValue;
   o.refreshValue        = MO.FDuiSlideNumber_refreshValue;
   return o;
}
MO.FDuiSlideNumber_onBuildEditValue = function FDuiSlideNumber_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.__linker = o;
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hsp = o._hSlidePanel = MO.Window.Builder.appendTableCell(hl, o.styleName('SlidePanel'));
   var b = o._slide = new MO.SDuiSlide();
   b.control = o;
   b.hPanel = hsp;
   b.setRange(o._valueMin, o._valueMax);
   b.onSlideChange = o.onSlideChange;
   b.build();
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   o.attachEvent('onInputChange', he, o.onInputChange);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
   var hap = o._hAdjustPanel = MO.Window.Builder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = MO.Window.Builder.appendTable(hap, o.styleName('AdjustForm'));
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   var hc = MO.Window.Builder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = MO.Window.Builder.appendIcon(hc, null, 'control.number.down');
}
MO.FDuiSlideNumber_onMouseCaptureStart = function FDuiSlideNumber_onMouseCaptureStart(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseDown(p);
   }
}
MO.FDuiSlideNumber_onMouseCapture = function FDuiSlideNumber_onMouseCapture(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseMove(p);
   }
}
MO.FDuiSlideNumber_onMouseCaptureStop = function FDuiSlideNumber_onMouseCaptureStop(p){
   var o = this;
   var c = MO.Window.Html.searchObject(p.hSource, '__pcapture');
   if(c){
      c.onMouseUp(p);
   }
}
MO.FDuiSlideNumber_onSlideChange = function FDuiSlideNumber_onSlideChange(p){
   var o = this;
   o.setInputValue(p);
   o.refreshValue();
}
MO.FDuiSlideNumber_onInputKeyPress = function FDuiSlideNumber_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   if(!MO.RKeyboard.isFloatKey(c)){
      p.cancel();
   }
}
MO.FDuiSlideNumber_onInputEdit = function FDuiSlideNumber_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.refreshValue();
}
MO.FDuiSlideNumber_onInputChange = function FDuiSlideNumber_onInputChange(p){
   var o = this;
   var v = o._hInput.value;
   o._slide.set(v);
   o.setInputValue(v);
   o.refreshValue();
}
MO.FDuiSlideNumber_construct = function FDuiSlideNumber_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiSlideNumber_get = function FDuiSlideNumber_get(p){
   var o = this;
   var v = o._hInput.value;
   var r = MO.Lang.Float.parse(v);
   return MO.Lang.Float.toRange(r, o._valueMin, o._valueMax);
}
MO.FDuiSlideNumber_set = function FDuiSlideNumber_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   var v = MO.Lang.String.nvl(p, '0');
   o._innerOriginValue = v;
   o._innerDataValue = v;
   o._slide.set(v);
   o.setInputValue(v);
   o.changeSet(false);
}
MO.FDuiSlideNumber_setInputValue = function FDuiSlideNumber_setInputValue(p){
   var o = this;
   var v = MO.Lang.Float.parse(p);
   if(isNaN(v)){
      return;
   }
   v = MO.Lang.Float.toRange(v, o._valueMin, o._valueMax);
   o._dataDisplay = MO.Lang.Float.format(v, 0, null, 2, null);
   o._hInput.value = o._dataDisplay;
}
MO.FDuiSlideNumber_refreshValue = function FDuiSlideNumber_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiSplit = function FDuiSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   return o;
}
MO.FDuiSplit_onSplitMouseEnter = function FDuiSplit_onSplitMouseEnter(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
   }
}
MO.FDuiSplit_onSplitMouseLeave = function FDuiSplit_onSplitMouseLeave(e){
   var o = this;
   if(o.hImage){
      o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
   }
}
MO.FDuiSplit_onMouseDown = function FDuiSplit_onMouseDown(){
   var o = this;
   if(ESplitStyle.Normal == o._dispStyle){
      o.extend(!o.extended);
   }
}
MO.FDuiSplit_onBuildPanel = function FDuiSplit_onBuildPanel(){
   var o = this;
   o.hPanel = MO.Window.Builder.create(null, 'DIV');
   o.hForm = MO.Window.Builder.appendTable(o.hPanel);
   o.hForm.width = '100%';
}
MO.FDuiSplit_oeBuild = function FDuiSplit_oeBuild(e){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, e);
   o.height = 2;
   if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.Normal)){
      var hf = o.hForm;
      var hr = hf.insertRow()
      o.attachEvent('onSplitMouseEnter', hf);
      o.attachEvent('onSplitMouseLeave', hf);
      var hc = hr.insertCell();
      hc.width = '100%';
      hc.height = 25;
      hc.style.padding = '0 0';
      hc.style.background = 'url(' + RRes._iconPath('ctl.FDuiSplit_Panel') + ')';
      MO.Window.Builder.appendEmpty(hc, 4);
      o.hImage = MO.Window.Builder.appendIcon(hc, o._iconMinus);
      if(o._icon){
         o.hIcon = MO.Window.Builder.appendIcon(hc, o._icon);
      }
      o.hText = MO.Window.Builder.appendText(hc, '&nbsp;&nbsp;' + o.label);
      o.hText.style.fontWeight='BOLD';
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.BulgeLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #666666';
      h.style.borderTop  = '1px solid #DDDDDD';
      h.height = 2;
   }else if(MO.Lang.String.equals(o._dispStyle, ESplitStyle.HollowLine)){
      var h = this.hForm.insertRow().insertCell();
      h.style.borderBottom  = '1px solid #DDDDDD';
      h.style.borderTop  = '1px solid #666666';
      h.height = 2;
   }
   return EEventStatus.Stop;
}
MO.FDuiSplit_oeMode = function FDuiSplit_oeMode(e){
   var o = this;
   var r = o.base.FDuiControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   o.extend(o._editExtend);
   return r;
}
MO.FDuiSplit_construct = function FDuiSplit_construct(){
   var o = this;
   o.__lines = new TList();
}
MO.FDuiSplit_extend = function FDuiSplit_extend(v){
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
MO.FDuiSplit_pushLine = function FDuiSplit_pushLine(hr){
   this.__lines.push(hr);
}
MO.FDuiSplit_dispose = function FDuiSplit_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   if(o.__lines){
      o.__lines.release();
      o.__lines = null;
   }
   o.hForm = null;
   o.hText = null;
   o.hIcon = null;
   o.hImage = null;
}
MO.FDuiTemplate = function FDuiTemplate(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiTemplate_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), MO.FDuiTemplate_onInputEdit);
   o.construct        = MO.FDuiTemplate_construct;
   o.formatDisplay    = MO.FDuiTemplate_formatDisplay;
   o.formatValue      = MO.FDuiTemplate_formatValue;
   o.get              = MO.FDuiTemplate_get;
   o.set              = MO.FDuiTemplate_set;
   o.refreshValue     = MO.FDuiTemplate_refreshValue;
   return o;
}
MO.FDuiTemplate_onBuildEditValue = function FDuiTemplate_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiTemplate_onInputEdit = function FDuiTemplate_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
MO.FDuiTemplate_construct = function FDuiTemplate_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiTemplate_formatDisplay = function FDuiTemplate_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiTemplate_formatValue = function FDuiTemplate_formatValue(p){
   return p;
}
MO.FDuiTemplate_get = function FDuiTemplate_get(){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiTemplate_set = function FDuiTemplate_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiTemplate_refreshValue = function FDuiTemplate_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.FDuiText = function FDuiText(o){
   o = MO.Class.inherits(this, o, MO.FDuiTextControl, MO.MUiPropertyEdit, MO.MListenerDataChanged);
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   o.onBuildEditValue = MO.FDuiText_onBuildEditValue;
   o.onInputEdit      = MO.Class.register(o, new MO.AEventInputChanged('onInputEdit'), FDuiText_onInputEdit);
   o.construct        = MO.FDuiText_construct;
   o.formatDisplay    = MO.FDuiText_formatDisplay;
   o.formatValue      = MO.FDuiText_formatValue;
   o.get              = MO.FDuiText_get;
   o.set              = MO.FDuiText_set;
   o.refreshValue     = MO.FDuiText_refreshValue;
   return o;
}
MO.FDuiText_onBuildEditValue = function FDuiText_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   var hep = o._hInputPanel = MO.Window.Builder.appendTableCell(hl);
   var he = o._hInput = MO.Window.Builder.appendEdit(hep, o.styleName('Input'));
   o.attachEvent('onInputEdit', he, o.onInputEdit);
   MO.Window.Html.setSize(hep, o._inputSize);
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
MO.FDuiText_onInputEdit = function FDuiText_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
MO.FDuiText_construct = function FDuiText_construct(){
   var o = this;
   o.__base.FDuiTextControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}
MO.FDuiText_formatDisplay = function FDuiText_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   o._dataDisplay = r;
   return r;
}
MO.FDuiText_formatValue = function FDuiText_formatValue(p){
   return p;
}
MO.FDuiText_get = function FDuiText_get(){
   var o = this;
   var r = o.__base.FDuiTextControl.get.call(o);
   var r = o._hInput.value;
   return r;
}
MO.FDuiText_set = function FDuiText_set(p){
   var o = this;
   o.__base.FDuiTextControl.set.call(o, p);
   o._hInput.value = MO.Lang.String.nvl(p);
}
MO.FDuiText_refreshValue = function FDuiText_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
MO.EDuiGridColumn = new function EDuiGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
MO.EDuiGridDisplay = new function EDuiGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
with(MO){
   MO.FDuiCell = function FDuiCell(o){
      o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
      o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
      o._table       = null;
      o._column      = null;
      o._row         = null;
      o.onBuildPanel = FDuiCell_onBuildPanel;
      o.onBuild      = FDuiCell_onBuild;
      o.oeDataLoad   = FDuiCell_oeDataLoad;
      o.oeDataSave   = FDuiCell_oeDataSave;
      return o;
   }
   MO.FDuiCell_onBuildPanel = function FDuiCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
   }
   MO.FDuiCell_onBuild = function FDuiCell_onBuild(p){
      var o = this;
      o.__base.FControl.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
   }
   MO.FDuiCell_oeDataLoad = function FDuiCell_oeDataLoad(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(c._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FDuiCell_oeDataSave = function FDuiCell_oeDataSave(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(c._dataName, v);
      return EEventStatus.Stop;
   }
   MO.FDuiCell_doFocus = function FDuiCell_doFocus(){
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
   MO.FDuiCell_doBlur = function FDuiCell_doBlur(){
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
   MO.FDuiCell_descriptor = function FDuiCell_descriptor(){
      return this._column;
   }
   MO.FDuiCell_text = function FDuiCell_text(){
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
   MO.FDuiCell_setText = function FDuiCell_setText(t){
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
   MO.FDuiCell_focus = function FDuiCell_focus(s){
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
   MO.FDuiCell_setVisible = function FDuiCell_setVisible(v){
      this._hPanel.style.display = v ? 'block' : 'none';
   }
   MO.FDuiCell_refreshStyle = function FDuiCell_refreshStyle(){
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
   MO.FDuiCell_dispose = function FDuiCell_dispose(){
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
   MO.FDuiCell_dump = function FDuiCell_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.value);
      s.append(']');
      return s;
   }
}
with(MO){
   MO.FDuiCellButton = function FDuiCellButton(o){
      o = RClass.inherits(this, o, FCell);
      o.buttons           = null;
      o.attributes        = null;
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FDuiCellButton_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FDuiCellButton_onButtonLeave);
      o.onCellLeave       = RClass.register(o, new AEventMouseLeave('onCellLeave'), FDuiCellButton_onCellLeave);
      o.onHintEnter       = RClass.register(o, new AEventMouseEnter('onHintEnter'), FDuiCellButton_onHintEnter);
      o.onHintLeave       = RClass.register(o, new AEventMouseLeave('onHintLeave'), FDuiCellButton_onHintLeave);
      o.onButtonClick     = RClass.register(o, new AEventClick('onButtonClick'), FDuiCellButton_onButtonClick);
      o.construct         = FDuiCellButton_construct;
      o.isDataChanged     = RMethod.emptyFalse;
      o.findButtonByPanel = FDuiCellButton_findButtonByPanel;
      o.buildForm         = FDuiCellButton_buildForm;
      o.set               = FDuiCellButton_set;
      o.modifyButton      = FDuiCellButton_modifyButton;
      o.refreshStyle      = FDuiCellButton_refreshStyle;
      return o;
   }
   MO.FDuiCellButton_onButtonEnter = function FDuiCellButton_onButtonEnter(e){
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
   MO.FDuiCellButton_onButtonLeave = function FDuiCellButton_onButtonLeave(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = '#0661B0';
         hs.cursor = 'normal';
      }
   }
   MO.FDuiCellButton_onHintEnter = function FDuiCellButton_onHintEnter(e){
      var o = this;
      e.hSource.style.backgroundColor = "#eeeeee";
   }
   MO.FDuiCellButton_onCellLeave = function FDuiCellButton_onCellLeave(e){
      var bs = this.buttons;
      var c = bs.count;
      for(var n = 0; n<c; n++){
         var b = bs.value(n);
         if(b.hintBox){
            b.hintBox.style.display='none';
         }
      }
   }
   MO.FDuiCellButton_onHintLeave = function FDuiCellButton_onHintLeave(e){
      e.hSource.style.backgroundColor = "#ffffff";
       e.hSource.style.display = "none";
   }
   MO.FDuiCellButton_onButtonClick = function FDuiCellButton_onButtonClick(e){
      var o = this;
      var t = o.table;
      t.clickCell(o);
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         b.button.callEvent('onClick', o, e);
      }
   }
   MO.FDuiCellButton_construct = function FDuiCellButton_construct(){
      var o = this;
      o.base.FCell.construct.call(o);
      o.attributes = new TAttributes();
   }
   MO.FDuiCellButton_findButtonByPanel = function FDuiCellButton_findButtonByPanel(h){
      var o = this;
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         if(b.hPanel == h){
            return b;
         }
      }
   }
   MO.FDuiCellButton_buildForm = function FDuiCellButton_buildForm(){
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
   MO.FDuiCellButton_set = function FDuiCellButton_set(v){
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
   MO.FDuiCellButton_modifyButton = function FDuiCellButton_modifyButton(b, as){
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
   MO.FDuiCellButton_refreshStyle = function FDuiCellButton_refreshStyle(){
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
}
with(MO){
   MO.FDuiCellEdit = function FDuiCellEdit(o){
      o = RClass.inherits(this, o, FDuiCellEditControl);
      o._styleInput = RClass.register(o, new AStyle('_styleInput'));
      o._hInput     = null;
      o.onBuildEdit = FDuiCellEdit_onBuildEdit;
      o.get         = FDuiCellEdit_get;
      o.set         = FDuiCellEdit_set;
      return o;
   }
   MO.FDuiCellEdit_onBuildEdit = function FDuiCellEdit_onBuildEdit(p){
      var o = this;
      var c = o._column;
      o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
   }
   MO.FDuiCellEdit_get = function FDuiCellEdit_get(){
      var r = o.__base.FDuiCellEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FDuiCellEdit_set = function FDuiCellEdit_set(p){
      var o = this;
      o.__base.FDuiCellEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FDuiCellEdit_buildDrop = function FDuiCellEdit_buildDrop(){
      var o = this;
      var c = o.column;
      if(!RString.isEmpty(c.lovRefer)){
         var hdp = o.hDropPanel;
         hdp.align = 'right';
         hdp.style.paddingRight = 2;
         var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FDuiCellEdit_Lov', null, 16, 16);
         hli.style.borderLeft='1 solid #CCCCCC';
         hli.style.cursor = 'hand';
         c.linkEvent(o, 'onListClick', hli);
      }
   }
   MO.FDuiCellEdit_setInfo = function FDuiCellEdit_setInfo(f){
      var o = this;
      o.base.FDuiCellEditControl.setInfo.call(o, f);
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
   MO.FDuiCellEdit_text = function FDuiCellEdit_text(){
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
   MO.FDuiCellEdit_setText = function FDuiCellEdit_setText(t){
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
}
with(MO){
   MO.FDuiCellEditControl = function FDuiCellEditControl(o){
      o = RClass.inherits(this, o, FCell);
      o.onBuildIcon  = FDuiCellEditControl_onBuildIcon;
      o.onBuildEdit  = FDuiCellEditControl_onBuildEdit;
      o.onBuildDrop  = RMethod.empty;
      o.onBuildForm  = FDuiCellEditControl_onBuildForm;
      o.onBuild      = FDuiCellEditControl_onBuild;
      return o;
   }
   MO.FDuiCellEditControl_onBuildIcon = function FDuiCellEditControl_onBuildIcon(p){
      var o = this;
      o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
   }
   MO.FDuiCellEditControl_onBuildEdit = function FDuiCellEditControl_onBuildEdit(p){
      var o = this;
      var c = o._column;
   }
   MO.FDuiCellEditControl_onBuildForm = function FDuiCellEditControl_onBuildForm(p){
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
   MO.FDuiCellEditControl_onBuild = function FDuiCellEditControl_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      o.onBuildForm(p);
   }
   MO.FDuiCellEditControl_getEditRange = function FDuiCellEditControl_getEditRange(){
      var o = this;
      var hc = o.hPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FDuiCellEditControl_select = function FDuiCellEditControl_select(v){
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
   MO.FDuiCellEditControl_setVisible = function FDuiCellEditControl_setVisible(v){
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
   MO.FDuiCellEditControl_refreshStyle = function FDuiCellEditControl_refreshStyle(){
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
}
with(MO){
   MO.FDuiCellSelected = function FDuiCellSelected(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName  = '_select';
      o._styleEdit = RClass.register(o, new AStyle('_styleEdit'));
      o._hSelected = null;
      o.onBuild    = FDuiCellSelected_onBuild;
      o.onSelected = FDuiCellSelected_onSelected;
      return o;
   }
   MO.FDuiCellSelected_onBuild = function FDuiCellSelected_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      h.align = 'center';
      var hs = o._hSelected = RBuilder.appendCheck(h, o.styleName('Edit'));
      hs.parent = o;
      hs.onclick = o.onSelected;
   }
   MO.FDuiCellSelected_onSelected = function FDuiCellSelected_onSelected(p){
      var o = this;
   }
   MO.FDuiCellSelected_refreshStyle = function FDuiCellSelected_refreshStyle(){
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
   MO.FDuiCellSelected_dispose = function FDuiCellSelected_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hSelected = null;
   }
}
with(MO){
   MO.FDuiCellStatus = function FDuiCellStatus(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName = '_status';
      o._hStatus  = null;
      o.onBuild   = FDuiCellStatus_onBuild;
      return o;
   }
   MO.FDuiCellStatus_onBuild = function FDuiCellStatus_onBuild(p){
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
   MO.FDuiCellStatus_onStatusEnter = function FDuiCellStatus_onStatusEnter(){
      this.row.table.getRowBar().linkCell(this);
   }
   MO.FDuiCellStatus_setIcon = function FDuiCellStatus_setIcon(s){
      this._hStatus.src = s;
   }
   MO.FDuiCellStatus_refreshStyle = function FDuiCellStatus_refreshStyle(){
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
   MO.FDuiCellStatus_dispose = function FDuiCellStatus_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hStatus = null;
   }
}
with(MO){
   MO.FDuiColumn = function FDuiColumn(o){
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
      o.onBuildLabel       = FDuiColumn_onBuildLabel;
      o.onBuildSearchIcon  = RMethod.empty;
      o.onBuildSearchEdit  = FDuiColumn_onBuildSearchEdit;
      o.onBuildSearchDrop  = RMethod.empty;
      o.onBuildSearchForm  = FDuiColumn_onBuildSearchForm;
      o.onBuildSearch      = FDuiColumn_onBuildSearch;
      o.onBuildTotal       = FDuiColumn_onBuildTotal;
      o.onBuildPanel       = FDuiColumn_onBuildPanel;
      o.onBuild            = FDuiColumn_onBuild;
      o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
      o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
      o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
      o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
      o.createCell         = FDuiColumn_createCell;
      return o;
   }
   MO.FDuiColumn_onBuildLabel = function FDuiColumn_onBuildLabel(p){
      var o = this;
      var hr = o._hFormLine;
      if (o._icon) {
         var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
         o._hIcon = RBuilder.appendIcon(hip, o.icon);
      }
      var hl = o._hLabel = RBuilder.appendTableCell(hr);
      hl.innerHTML = RString.nvl(o.label());
      var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
      var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FDuiColumn));
      hsu.style.display = 'none';
      var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FDuiColumn));
      hsu.style.display = 'none';
   }
   MO.FDuiColumn_onBuildSearchEdit = function FDuiColumn_onBuildSearchEdit(p){
      var o = this;
      var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
      var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
   }
   MO.FDuiColumn_onBuildSearchForm = function FDuiColumn_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      hf.style.backgroundColor = '#FFFFFF';
      var hfl = o._hSearchFormLine = hf.insertRow();
      if(RClass.isClass(o, FDuiColumnButton)){
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
   MO.FDuiColumn_onBuildSearch = function FDuiColumn_onBuildSearch(p){
      var o = this;
      var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
      h.style.backgroundColor = "#FFFFFF";
      h.style.borderBottom = '1 solid #9EC4EB';
      RHtml.linkSet(h, 'control', o);
     o.attachEvent('onSearchEnter', h);
     o.attachEvent('onSearchLeave', h);
     o.onBuildSearchForm(p);
   }
   MO.FDuiColumn_onBuildTotal = function FDuiColumn_onBuildTotal(p){
      var o = this;
      var h = o._hTotalPanel = RBuilder.create(p, 'TD');
      RHtml.linkSet(h, 'control', o);
      h.align = 'right';
      h.style.color = '#686860';
      h.style.backgroundColor = '#F8F8F0';
      h.style.borderBottom = '1 solid #B8B8B0';
      h.innerText = ' ';
   }
   MO.FDuiColumn_onBuildPanel = function FDuiColumn_onBuildPanel(p) {
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
   }
   MO.FDuiColumn_onBuild = function FDuiColumn_onBuild(p) {
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
   MO.FDuiColumn_createCell = function FDuiColumn_createCell(p) {
      var o = this;
      var c = RClass.create(o._cellClass);
      var t = c._table = o._table;
      c._name = o._name;
      c._column = o;
      c.build(t._hPanel);
      c.setVisible(o._displayList);
      return c;
   }
   MO.FDuiColumn_onCellMouseEnter = function FDuiColumn_onCellMouseEnter(s, e){
      this.table.hoverRow(s.row, true);
   }
   MO.FDuiColumn_onCellMouseLeave = function FDuiColumn_onCellMouseLeave(s, e){
      this.table.hoverRow(s.row, false);
   }
   MO.FDuiColumn_onCellMouseDown = function FDuiColumn_onCellMouseDown(s, e){
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
   MO.FDuiColumn_onCellClick = function FDuiColumn_onCellClick(s, e){
      this.table.clickRow(s.row);
   }
   MO.FDuiColumn_onCellDoubleClick = function FDuiColumn_onCellDoubleClick(s, e){
      var o = this;
      var r = s.row;
      if(!o.isEditAble(r)){
         o.table.doubleClickRow(r);
      }
   }
   MO.FDuiColumn_onCellKeyDown = function FDuiColumn_onCellKeyDown(s, e, he){
      var o = this;
      if(he){
         o.table.onCellKeyDown(s, e, he);
      }
   }
   MO.FDuiColumn_oeMode = function FDuiColumn_oeMode(e){
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
   MO.FDuiColumn_oeRefresh = function FDuiColumn_oeRefresh(e) {
      var o = this;
      if(e.isBefore()){
         o.setVisible(o._displayList);
      }
   }
   MO.FDuiColumn_onDataKeyDown = function FDuiColumn_onDataKeyDown(s, e) {
      var o = this;
      o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   }
   MO.FDuiColumn_onDataChanged = function FDuiColumn_onDataChanged(s, e) {
      var o = this;
      o.table.setDataStatus(s.row, EDataStatus.Update);
   }
   MO.FDuiColumn_onEditBegin = function FDuiColumn_onEditBegin(editor) {
      var o = this;
      var row = editor.row;
      o.editor = editor;
      o.table.editRow = row;
      o.table.editColumn = o;
      o.table.select(row, true);
      MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
   }
   MO.FDuiColumn_onEditEnd = function FDuiColumn_onEditEnd(e) {
      var o = this;
      var row = editor.row;
      var text = editor.text();
      o.setValue(row, o.formatValue(text));
      o.setText(row, text);
      o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
      o.editor = null;
      MO.Logger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
   }
   MO.FDuiColumn_onEditChanged = function FDuiColumn_onEditChanged(cell) {
      cell.row.refresh();
   }
   MO.FDuiColumn_onHeadMouseDown = function FDuiColumn_onHeadMouseDown(e) {
      var o = this;
      var tbl = o.table;
      var ct = tbl.dsViewer.count;
      var x = e.x;
      if(!RClass.isClass(o, FDuiColumnButton)){
         var l = o._hPanel.offsetWidth;
         var r = l - 6;
         if (x > 0 && x < r) {
            if (ct > 0 && !RClass.isClass(e.source, FDuiColumnStatus)) {
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
   MO.FDuiColumn_onRowClick = function FDuiColumn_onRowClick(s, e){
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FDuiColumn_createMoveable = function FDuiColumn_createMoveable(p) {
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
   MO.FDuiColumn_searchValue = function FDuiColumn_searchValue() {
      var o = this;
      if(o._hSearchEdit){
         return o._hSearchEdit.value;
      }
   }
   MO.FDuiColumn_setStyleStatus = function FDuiColumn_setStyleStatus(row, status) {
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
   MO.FDuiColumn_cell = function FDuiColumn_cell(r){
      return r.cell(this.index);
   }
   MO.FDuiColumn_equalsValue = function FDuiColumn_equalsValue(s, t) {
      return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
   }
   MO.FDuiColumn_setWidth = function FDuiColumn_setWidth(w){
      var o = this;
      o._hPanel.style.pixelWidth = w;
      o._hFixPanel.style.pixelWidth = w;
   }
   MO.FDuiColumn_setVisible = function FDuiColumn_setVisible(v){
      var o = this;
      o.isDisplay = v;
      var s = v ? 'block' : 'none';
      o._hPanel.style.display = s;
      o._hSearchPanel.style.display = s;
      o._hTotalPanel.style.display = s;
      o._hFixPanel.style.display = s;
   }
   MO.FDuiColumn_moveCellFocus = function FDuiColumn_moveCellFocus(row, p) {
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
               if(RClass.isClass(ft, FDuiColumn) && ft._displayList){
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
               if(RClass.isClass(ft, FDuiColumn) && ft._displayList){
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
   MO.FDuiColumn_getEditRange = function FDuiColumn_getEditRange(){
      var o = this;
      var hc = o._hSearchPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FDuiColumn_dispose = function FDuiColumn_dispose(){
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
   MO.FDuiColumn_dump = function FDuiColumn_dump(s) {
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
}
with(MO){
   MO.FDuiColumnButton = function FDuiColumnButton(o){
      o = RClass.inherits(this, o, FColumn);
      o.__cellClass = FCellButton;
      return o;
   }
}
with(MO){
   MO.FDuiColumnEdit = function FDuiColumnEdit(o){
      o = RClass.inherits(this, o, FDuiColumnEditControl, MUiPropertyEdit);
      o._cellClass     = FCellEdit;
      return o;
   }
   MO.FDuiColumnEdit_onCellMouseEnter = function FDuiColumnEdit_onCellMouseEnter(s, e){
   }
   MO.FDuiColumnEdit_onCellMouseLeave = function FDuiColumnEdit_onCellMouseLeave(s, e){
   }
   MO.FDuiColumnEdit_onListClick = function FDuiColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }
   MO.FDuiColumnEdit_onZoomHover = function FDuiColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }
   MO.FDuiColumnEdit_onZoomLeave = function FDuiColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }
   MO.FDuiColumnEdit_onZoomClick = function FDuiColumnEdit_onZoomClick(s, e){
      var o = this;
      o.table.clickRow(s.row);
      var r = s.row.saveRow();
      var v = r.get(o.zoomField)
      if(!RString.isEmpty(v)){
         o.doZoom(v);
      }
   }
}
with(MO){
   MO.FDuiColumnEditControl = function FDuiColumnEditControl(o){
      o = RClass.inherits(this, o, FColumn);
      o.isEditAble = FDuiColumnEditControl_isEditAble;
      return o;
   }
   MO.FDuiColumnEditControl_isEditAble = function FDuiColumnEditControl_isEditAble(r){
      var o = this;
      if(r){
         return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
      }
   }
}
with(MO){
   MO.FDuiColumnEmpty = function FDuiColumnEmpty(o){
      o = RClass.inherits(this, o, FColumn);
      o._dispList         = true;
      o.onBuildSearchForm = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FDuiColumnSelected = function FDuiColumnSelected(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_select';
      o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
      o._optionFixed      = true;
      o._cellClass        = FCellSelected;
      o.onBuildSearchForm = FDuiColumnSelected_onBuildSearchForm;
      o.onBuild           = FDuiColumnSelected_onBuild;
      o.createCell        = FDuiColumnSelected_createCell;
      o.dispose           = FDuiColumnSelected_dispose;
      return o;
   }
   MO.FDuiColumnSelected_onBuildSearchForm = function FDuiColumnSelected_onBuildSearchForm(p){
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
   MO.FDuiColumnSelected_onBuild = function FDuiColumnSelected_onBuild(e){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, e);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(o._hPanel, 12, 12);
      return r;
   }
   MO.FDuiColumnSelected_createCell = function FDuiColumnSelected_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p.cellSelect = c;
      }
      return c;
   }
   MO.FDuiColumnSelected_dispose = function FDuiColumnSelected_dispose(){
      var o = this;
      o._hSelect = null;
      o.__base.FColumnEditControl.dispose.call(o);
   }
   MO.FDuiColumnSelected_setVisible = function FDuiColumnSelected_setVisible(){
      var o = this;
      var v = o._table._displayColumnSelect ? 'block' : 'none';
      o._hPanel.style.display = v
      o._hSelected.style.display = v;
      o._hSearchPanel.style.display = v;
      o._hTotalPanel.style.display = v;
      o._hFixPanel.style.display = v;
   }
   MO.FDuiColumnSelected_onCellClick = function FDuiColumnSelected_onCellClick(s, e){
      return;
   }
   MO.FDuiColumnSelected_onSelectedClick = function FDuiColumnSelected_onSelectedClick(s, e){
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
}
with(MO){
   MO.FDuiColumnStatus = function FDuiColumnStatus(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_status';
      o._optionFixed      = true;
      o._cellClass        = FCellStatus;
      o.onBuildSearchForm = FDuiColumnStatus_onBuildSearchForm;
      o.onBuild           = FDuiColumnStatus_onBuild;
      o.createCell        = FDuiColumnStatus_createCell;
      return o;
   }
   MO.FDuiColumnStatus_onBuildSearchForm = function FDuiColumnStatus_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.height = 18;
      hf.width = '100%';
      var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
      var hc = RBuilder.appendTableCell(hfl);
      hc.align = 'center';
   }
   MO.FDuiColumnStatus_onBuild = function FDuiColumnStatus_onBuild(p){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, p);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(h, 12, 12);
   }
   MO.FDuiColumnStatus_createCell = function FDuiColumnStatus_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p._statusCell = c;
      }
      return c;
   }
   MO.FDuiColumnStatus_onCellClick = function FDuiColumnStatus_onCellClick(s, e){
      if(this.table.callEvent('onTableRowDoubleClick', s.row)){
         return;
      }
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FDuiColumnStatus_setDataStatus = function FDuiColumnStatus_setDataStatus(r, s){
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
   MO.FDuiColumnStatus_ohCellMdclk = function FDuiColumnStatus_ohCellMdclk(){
      var tab = this.lnkCol.table;
      tab.insertRow(this.lnkRow.rowIndex());
   }
   MO.FDuiColumnStatus_dispose = function FDuiColumnStatus_dispose(){
      var o = this;
      o.__base.FColumnEditControl.dispose.call(o);
      o._hSelect = null;
   }
}
with(MO){
   MO.FDuiGrid = function FDuiGrid(o) {
      o = RClass.inherits(this, o, FDuiGridControl);
      o.onResizeAfter = FDuiGrid_onResizeAfter;
      o.onBuildData   = FDuiGrid_onBuildData;
      o.oeResize      = FDuiGrid_oeResize;
      o.oeRefresh     = FDuiGrid_oeRefresh;
      o.pushColumn    = FDuiGrid_pushColumn;
      return o;
   }
   MO.FDuiGrid_onResizeAfter = function FDuiGrid_onResizeAfter(){
      var o = this;
      var hdp = o.hDataPanel;
      var hfp = o.hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FDuiGrid_onBuildData = function FDuiGrid_onBuildData(){
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
   MO.FDuiGrid_oeResize = function FDuiGrid_oeResize(e){
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
   MO.FDuiGrid_oeRefresh = function FDuiGrid_oeRefresh(e){
      var o = this;
      o.base.FDuiGridControl.oeRefresh.call(o, e);
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
   MO.FDuiGrid_pushColumn = function FDuiGrid_pushColumn(c){
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
}
with(MO){
   MO.FDuiGridControl = function FDuiGridControl(o) {
      o = RClass.inherits(this, o, FDuiContainer);
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
      o.onBuildTitle         = FDuiGridControl_onBuildTitle;
      o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
      o.onBuildHint          = FDuiGridControl_onBuildHint;
      o.onBuildPanel         = FDuiGridControl_onBuildPanel;
      o.onBuild              = FDuiGridControl_onBuild;
      o.onDatasetLoadDelay   = FDuiGridControl_onDatasetLoadDelay;
      o.onDatasetLoad        = FDuiGridControl_onDatasetLoad;
      o.construct            = FDuiGridControl_construct;
      o.buildNavigatorButton = FDuiGridControl_buildNavigatorButton;
      o.appendColumn         = RMethod.virtual(o, 'appendColumn');
      o.appendChild          = FDuiGridControl_appendChild;
      o.push                 = FDuiGridControl_push;
      o.createRow            = FDuiGridControl_createRow;
      o.insertRow            = FDuiGridControl_insertRow;
      o.syncRow              = FDuiGridControl_syncRow;
      o.hideRows             = FDuiGridControl_hideRows;
      o.clickCell            = FDuiGridControl_clickCell;
      o.clickRow             = FDuiGridControl_clickRow;
      o.doubleClickRow       = FDuiGridControl_doubleClickRow;
      return o;
   }
   MO.FDuiGridControl_onBuildPanel = function FDuiGridControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FDuiGridControl_onBuildTitle = function FDuiGridControl_onBuildTitle(e){
      var o = this;
      var hf = o._hTitleForm = RBuilder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
      var hr = o._hTitleLine = RBuilder.appendTableRow(hf);
      var hc = o._hCaption = RBuilder.appendTableCell(hr, o.styleName('Caption'));
      hc.innerText = o.label();
      RHtml.displaySet(hf, o._displayTitle);
   }
   MO.FDuiGridControl_onBuildHint = function FDuiGridControl_onBuildHint(e) {
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
      o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FDuiGridControl:First'));
      o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FDuiGridControl:Prior'));
      o.hNavPrior.style.paddingRight = '20';
      o.hPage = RBuilder.appendEdit(hc)
      o.hPage.style.width = 40;
      o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Next')+'&nbsp;', 'control.grid.next');
      o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Last')+'&nbsp;', 'control.grid.last');
   }
   MO.FDuiGridControl_onBuild = function FDuiGridControl_onBuild(p){
      var o = this;
      if(!o._size.height || o._size.height < 160){
         o.height = '100%';
      }
      o.__base.FDuiContainer.onBuild.call(o, p);
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
   MO.FDuiGridControl_onDatasetLoadDelay = function FDuiGridControl_onDatasetLoadDelay(p){
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
   MO.FDuiGridControl_onDatasetLoad = function FDuiGridControl_onDatasetLoad(p){
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
   MO.FDuiGridControl_construct = function FDuiGridControl_construct() {
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
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
   MO.FDuiGridControl_buildNavigatorButton = function FDuiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
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
   MO.FDuiGridControl_appendChild = function FDuiGridControl_appendChild(p){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, p);
      if(RClass.isClass(p, FColumn)){
         o.appendColumn(p);
      }
   }
   MO.FDuiGridControl_push = function FDuiGridControl_push(p){
      var o = this;
      if(RClass.isClass(p, FColumn)){
         p._table = o;
         o._columns.set(p.name(), p);
      }else if(RClass.isClass(p, FTableButton)){
         p._table = o;
         o._buttons.set(p.name(), p);
      }
      o.__base.FDuiContainer.push.call(o, p);
   }
   MO.FDuiGridControl_createRow = function FDuiGridControl_createRow() {
      var o = this;
      var r = RClass.create(o._rowClass);
      r._table = r._parent = o;
      return r;
   }
   MO.FDuiGridControl_insertRow = function FDuiGridControl_insertRow(i, r){
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
   MO.FDuiGridControl_syncRow = function FDuiGridControl_syncRow(p){
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
   MO.FDuiGridControl_hideRows = function FDuiGridControl_hideRows(){
      var o = this;
      var rs = o._rows;
      var c = rs.count();
      for(var i = c - 1; i >= 0 ; i--){
         rs.get(i).setVisible(false);
      }
   }
   MO.FDuiGridControl_clickCell = function FDuiGridControl_clickCell(p){
      this._focusCell = p;
   }
   MO.FDuiGridControl_clickRow = function FDuiGridControl_clickRow(p){
      var o = this;
      o.lsnsRowClick.process(p);
      o._focusRow = p;
   }
   MO.FDuiGridControl_doubleClickRow = function FDuiGridControl_doubleClickRow(p){
      var o = this;
      o.lsnsRowDblClick.process(p);
      o._focusRow = p;
   }
   MO.FDuiGridControl_pushButton = function FDuiGridControl_pushButton(b){
      var o = this;
      var hc  = o._hButtons.insertCell();
      hc.style.border = '0 solid #C6D7FF';
      hc.appendChild(b._hPanel);
      o.push(b);
   }
   MO.FDuiGridControl_onMouseDown = function FDuiGridControl_onMouseDown(e, he){
      var o = this;
   }
   MO.FDuiGridControl_onHeadMouseDown = function FDuiGridControl_onHeadMouseDown(e){
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
   MO.FDuiGridControl_onHeadMouseMove = function FDuiGridControl_onHeadMouseMove(e){
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
   MO.FDuiGridControl_onHeadMouseUp = function FDuiGridControl_onHeadMouseUp(e){
      var o = this;
      if(EGridColumn.Size == o.hoverMode){
         o._hHeadForm.releaseCapture();
      }
      o.hoverMode = EGridColumn.None;
   }
   MO.FDuiGridControl_onDataScroll = function FDuiGridControl_onDataScroll(){
      var o = this;
      o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
      o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
   }
   MO.FDuiGridControl_onCellKeyDown = function FDuiGridControl_onCellKeyDown(c, e, he){
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
   MO.FDuiGridControl_onRowMouseEnter = function FDuiGridControl_onRowMouseEnter(s, e){
      this.hoverRow(s, true);
   }
   MO.FDuiGridControl_onRowMouseLeave = function FDuiGridControl_onRowMouseLeave(s, e){
      this.hoverRow(s, false);
   }
   MO.FDuiGridControl_onRowClick = function FDuiGridControl_onRowClick(s, e){
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
   MO.FDuiGridControl_onColumnSearchKeyDown = function FDuiGridControl_onColumnSearchKeyDown(s, e){
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
   MO.FDuiGridControl_onButtonMouseDown = function FDuiGridControl_onButtonMouseDown(e){
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
   MO.FDuiGridControl_onPageCountDown = function FDuiGridControl_onPageCountDown(e){
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
   MO.FDuiGridControl_onInsertButtonClick = function FDuiGridControl_onInsertButtonClick(){
      RFormSpace.doPrepare(this);
   }
   MO.FDuiGridControl_onExtendButtonClick = function FDuiGridControl_onExtendButtonClick(){
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
   MO.FDuiGridControl_oeMode = function FDuiGridControl_oeMode(e){
      var o = this;
      o.dispUpdate = true;
      o.dispDelete = true;
      o.__base.FDuiContainer.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      return EEventStatus.Stop;
   }
   MO.FDuiGridControl_oeProgress = function FDuiGridControl_oeProgress(e){
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
         RBuilder.appendIcon(hc, 'ctl.FDuiGridControl_Loading')
         var t = o._hDelayText = RBuilder.append(hc, 'SPAN');
         t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FDuiGridControl:Loading') + "</B></FONT>";
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
   MO.FDuiGridControl_isFormLinked = function FDuiGridControl_isFormLinked(){
      return this._formLinked || this._formName;
   }
   MO.FDuiGridControl_isDataSelected = function FDuiGridControl_isDataSelected(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isSelect){
            return true;
         }
      }
   }
   MO.FDuiGridControl_isDataChanged = function FDuiGridControl_isDataChanged(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isDataChanged()){
            return true;
         }
      }
   }
   MO.FDuiGridControl_hasAction = function FDuiGridControl_hasAction(){
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
   MO.FDuiGridControl_getFormLink = function FDuiGridControl_getFormLink(t){
      var o = this;
      if(EFormLink.Form == t){
         return this._formName;
      }else if(EFormLink.Table == t){
         return this.name;
      }
      RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
   }
   MO.FDuiGridControl_getHeadMode = function FDuiGridControl_getHeadMode(e){
      var o = this;
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
   MO.FDuiGridControl_getRowBar = function FDuiGridControl_getRowBar(){
      var o = this;
      var rb = o._rowBar;
      if(!rb){
         rb = o._rowBar = RClass.create(FGridRowBar);
         rb.table = o;
         rb.psBuild(o.hBorderPanel);
      }
      return rb;
   }
   MO.FDuiGridControl_calculateDataSize = function FDuiGridControl_calculateDataSize(){
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
   MO.FDuiGridControl_hasVisibleRow = function FDuiGridControl_hasVisibleRow() {
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
   MO.FDuiGridControl_getCurrentRow = function FDuiGridControl_getCurrentRow(){
      var c = this._focusCell;
      if(c){
         return c.row.saveRow();
      }
   }
   MO.FDuiGridControl_getSelectedRow = function FDuiGridControl_getSelectedRow(){
      var rs = this._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r.isSelect){
            return r;
         }
      }
   }
   MO.FDuiGridControl_getSelectedRows = function FDuiGridControl_getSelectedRows(){
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
   MO.FDuiGridControl_getChangedRows = function FDuiGridControl_getChangedRows(){
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
   MO.FDuiGridControl_getRows = function FDuiGridControl_getRows(){
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
   MO.FDuiGridControl_refreshHint = function FDuiGridControl_refreshHint(){
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
   MO.FDuiGridControl_refreshSelected = function FDuiGridControl_refreshSelected(){
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
   MO.FDuiGridControl_hoverRow = function FDuiGridControl_hoverRow(r, f){
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
   MO.FDuiGridControl_selectRow = function FDuiGridControl_selectRow(row, reset, force) {
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
   MO.FDuiGridControl_clearSelectRow = function FDuiGridControl_clearSelectRow(row) {
      var o = this;
      row.select(false);
      o.refreshHint();
   }
   MO.FDuiGridControl_clearSelectRows = function FDuiGridControl_clearSelectRows() {
       var o = this;
       var rs = o._rows;
       for(var n = 0; n < rs.count; n++){
          rs.get(n).isSelect = false;
       }
       o.refreshHint();
   }
   MO.FDuiGridControl_setDataStatus = function FDuiGridControl_setDataStatus(r, s) {
      var o = this;
      r.dataStatus = s;
      o._statusColumn.setDataStatus(r, s);
   }
   MO.FDuiGridControl_dsInsert = function FDuiGridControl_dsInsert() {
   }
   MO.FDuiGridControl_dsUpdate = function FDuiGridControl_dsUpdate(r){
      var o = this;
      o.psMode(EMode.Update);
      o.dsFetch(true);
   }
   MO.FDuiGridControl_dsDelete = function FDuiGridControl_dsDelete() {
   }
   MO.FDuiGridControl_doSearch = function FDuiGridControl_doSearch(){
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
   MO.FDuiGridControl_focus = function FDuiGridControl_focus(){
      var o = this;
      RConsole.find(FFocusConsole).focusClass(MDataset, o);
   }
   MO.FDuiGridControl_pack = function FDuiGridControl_pack(){
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
   MO.FDuiGridControl_setVisible = function FDuiGridControl_setVisible(v){
      var o = this;
      o.__base.FDuiContainer.setVisible.call(o, v);
      o.__base.MDuiHorizontal.setVisible.call(o, v);
   }
   MO.FDuiGridControl_setButtonVisible = function FDuiGridControl_setButtonVisible(n, v){
      var o = this;
      var b = o._buttons.get(n);
      if(b){
         b.setVisible(v);
      }
   }
   MO.FDuiGridControl_refreshStyle = function FDuiGridControl_refreshStyle(){
      var o = this;
      var rs = o._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         rs.get(n).refreshStyle();
      }
   }
   MO.FDuiGridControl_dispose = function FDuiGridControl_dispose(){
      var o = this;
      o.__base.FDuiContainer.dispose.call(o);
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
   MO.FDuiGridControl_dump = function FDuiGridControl_dump(s) {
      var o = this;
      s = RString.nvlStr(s);
      s.appendLine(RClass.name(o));
      var rs = o._rows;
      for(var n = 0; n < rs.count; n++) {
         s.appendLine(rs.get(n).dump());
      }
      return s;
   }
   MO.FDuiGridControl_storeValues = function FDuiGridControl_storeValues(a){
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
   MO.FDuiGridControl_buildRows = function FDuiGridControl_buildRows(){
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
   MO.FDuiGridControl_createChild = function FDuiGridControl_createChild(config) {
      var o = this;
      var c = o.__base.FDuiContainer.createChild.call(o, config);
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
   MO.FDuiGridControl_setStyleStatus = function FDuiGridControl_setStyleStatus(row, status) {
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
   MO.FDuiGridControl_buildRow = function FDuiGridControl_buildRow(row) {
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
   MO.FDuiGridControl_clearSelectAll = function FDuiGridControl_clearSelectAll() {
      var o = this;
      var cs = o._columns;
      var sc = cs.get('_select');
      sc.hSelected.checked = false;
   }
   MO.FDuiGridControl_appendRow = function FDuiGridControl_appendRow(row) {
      this._hRows.appendChild(row._hRow);
      this._rows.push(row);
   }
   MO.FDuiGridControl_deleteRow = function FDuiGridControl_deleteRow(r) {
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
   MO.FDuiGridControl_clearRows = function FDuiGridControl_clearRows() {
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
   MO.FDuiGridControl_onColumnTreeService = function FDuiGridControl_onColumnTreeService(g){
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
   MO.FDuiGridControl_getRowType = function FDuiGridControl_getRowType(){
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
   MO.FDuiGridControl_onColumnTreeClick = function FDuiGridControl_onColumnTreeClick(s, e){
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
}
with(MO){
   MO.FDuiGridRow = function FDuiGridRow(o){
      o = RClass.inherits(this, o, FDuiGridRowControl);
      o._hFixPanel   = null;
      o.onBuildPanel = FDuiGridRow_onBuildPanel;
      o.setVisible   = FDuiGridRow_setVisible;
      o.appendChild  = FDuiGridRow_appendChild;
      o.dispose      = FDuiGridRow_dispose;
      return o;
   }
   MO.FDuiGridRow_onBuildPanel = function FDuiGridRow_onBuildPanel(p){
      var o = this;
      o.__base.FDuiGridRowControl.onBuildPanel.call(o, p);
      o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FDuiGridRow_setVisible = function FDuiGridRow_setVisible(p){
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
   MO.FDuiGridRow_appendChild = function FDuiGridRow_appendChild(p){
      var o = this;
      o.__base.FDuiGridRowControl.appendChild.call(o, p);
      var c = p._column;
      if(c._optionFixed){
         o._hFixPanel.appendChild(p._hPanel);
      }
   }
   MO.FDuiGridRow_dispose = function FDuiGridRow_dispose(){
      var o = this;
      var h = o._hFixPanel;
      if(h){
         RMemory.free(h);
         o._hFixPanel = null;
      }
      o.__base.FDuiGridRowControl.dispose.call(o);
   }
   MO.FDuiGridRow_select = function FDuiGridRow_select(v){
      var o = this;
      o.isSelect = v;
      var c = v ? EColor.RowSelect : EColor.Row;
      o._hFixPanel.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.refreshStyle();
   }
   MO.FDuiGridRow_refreshSize = function FDuiGridRow_refreshSize(){
      this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
   }
   MO.FDuiGridRow_refreshStyle = function FDuiGridRow_refreshStyle(){
      var o = this;
      if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
         o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
      }else{
         o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
      }
      if(o.table.isLov){
         o._hFixPanel.style.cursor = 'hand';
      }
      o.__base.FDuiGridRowControl.refreshStyle.call(o);
   }
}
with(MO){
   MO.FDuiGridRowControl = function FDuiGridRowControl(o){
      o = RClass.inherits(this, o, FContainer, MDataContainer);
      o._cells         = null;
      o._rows          = null;
      o._clearProcess  = null;
      o._resetProcess  = null;
      o._loadProcess   = null;
      o._saveProcess   = null;
      o._recordProcess = null;
      o._statusCell    = null;
      o.onBuildPanel   = FDuiGridRowControl_onBuildPanel;
      o.onBuild        = FDuiGridRowControl_onBuild;
      o.construct      = FDuiGridRowControl_construct;
      o.loadRow        = FDuiGridRowControl_loadRow;
      o.saveRow        = FDuiGridRowControl_saveRow;
      o.setVisible     = FDuiGridRowControl_setVisible;
      o.appendChild    = FDuiGridRowControl_appendChild;
      o.push           = FDuiGridRowControl_push;
      return o;
   }
   MO.FDuiGridRowControl_onBuildPanel = function FDuiGridRowControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FDuiGridRowControl_onBuild = function FDuiGridRowControl_onBuild(p){
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
   MO.FDuiGridRowControl_construct = function FDuiGridRowControl_construct(){
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
   MO.FDuiGridRowControl_loadRow = function FDuiGridRowControl_loadRow(p){
      var o = this;
      var ds = RClass.create(FDataSource);
      ds.selectRow(p);
      o.dsDataLoad(ds);
   }
   MO.FDuiGridRowControl_saveRow = function FDuiGridRowControl_saveRow(p){
      var o = this;
      return r;
   }
   MO.FDuiGridRowControl_setVisible = function FDuiGridRowControl_setVisible(p){
      var o = this;
      o._visible = p;
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FDuiGridRowControl_appendChild = function FDuiGridRowControl_appendChild(p){
      var o = this;
      o.__base.FContainer.appendChild.call(o, p);
      var c = p._column;
      if(!c._optionFixed){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FDuiGridRowControl_push = function FDuiGridRowControl_push(p){
      var o = this;
      o.__base.FContainer.push.call(o, p);
      p._row = o;
      o._cells.set(p._column._dataName, p);
      if(RClass.isClass(p, FCellStatus)){
         o._statusCell = p;
      }
   }
   MO.FDuiGridRowControl_buildChildren = function FDuiGridRowControl_buildChildren(){
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
   MO.FDuiGridRowControl_isDataChanged = function FDuiGridRowControl_isDataChanged(){
      var o = this;
      var cs = o._cells;
      for(var n=cs.count-1; n>=0; n--){
         if(cs.value(n).isDataChanged()){
            return true;
         }
      }
      return false;
   }
   MO.FDuiGridRowControl_isVisible = function FDuiGridRowControl_isVisible(){
   	var o = this;
   	return o._visible;
   }
   MO.FDuiGridRowControl_getIndex = function FDuiGridRowControl_getIndex(){
      return this._hPanel.rowIndex;
   }
   MO.FDuiGridRowControl_getId = function FDuiGridRowControl_getId(){
      var c = this._cells.get('ouid');
      return c ? c.reget() : '';
   }
   MO.FDuiGridRowControl_getVersion = function FDuiGridRowControl_getVersion(){
      var c = this._cells.get('over');
      return c ? c.reget() : '';
   }
   MO.FDuiGridRowControl_getStatus = function FDuiGridRowControl_getStatus(){
      return this._statusCell;
   }
   MO.FDuiGridRowControl_cell = function FDuiGridRowControl_cell(n){
      return this._cells.value(n);
   }
   MO.FDuiGridRowControl_get = function FDuiGridRowControl_get(n){
      return this._cells.get(n).get();
   }
   MO.FDuiGridRowControl_reget = function FDuiGridRowControl_reget(n){
      return this._cells.get(n).reget();
   }
   MO.FDuiGridRowControl_set = function FDuiGridRowControl_set(n, v){
      this._cells.get(n).set(v);
   }
   MO.FDuiGridRowControl_loadValue = function FDuiGridRowControl_loadValue(v){
      this.loadRow(v);
   }
   MO.FDuiGridRowControl_saveValue = function FDuiGridRowControl_saveValue(v){
      this.saveRow(v);
   }
   MO.FDuiGridRowControl_recordValue = function FDuiGridRowControl_recordValue(){
      this.process(this._recordProcess);
   }
   MO.FDuiGridRowControl_toAttributes = function FDuiGridRowControl_toAttributes(v){
      this.saveRow(v);
   }
   MO.FDuiGridRowControl_toDeepAttributes = function FDuiGridRowControl_toDeepAttributes(r){
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
   MO.FDuiGridRowControl_select = function FDuiGridRowControl_select(v){
      var o = this;
      o.isSelect = v;
      o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
      o.refreshStyle();
   }
   MO.FDuiGridRowControl_extend = function FDuiGridRowControl_extend(v){
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
   MO.FDuiGridRowControl_doInsert = function FDuiGridRowControl_doInsert(){
      var o = this;
      if(!o.row){
         o.row = new TRow();
      }
      o.status = ERowStatus.Insert;
      o.table.setDataStatus(o, ERowStatus.Insert);
   }
   MO.FDuiGridRowControl_doDelete = function FDuiGridRowControl_doDelete(){
      var o = this;
      o.status = ERowStatus.Delete;
      o.table.setDataStatus(o, ERowStatus.Delete);
   }
   MO.FDuiGridRowControl_refresh = function FDuiGridRowControl_refresh(){
      var o = this;
      o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
   }
   MO.FDuiGridRowControl_refreshStyle = function FDuiGridRowControl_refreshStyle(){
      var o = this;
      var cs = o._cells;
      if(cs){
         for(var n=cs.count-1; n>=0; n--){
            cs.value(n).refreshStyle();
         }
      }
   }
   MO.FDuiGridRowControl_dump = function FDuiGridRowControl_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.isSelect ? 'S' : '_');
      s.append(']');
      s.append(o.saveRow().dump());
      return s;
   }
}
with(MO){
   MO.FDuiTable = function FDuiTable(o) {
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
      o.onBuildContent       = FDuiTable_onBuildContent;
      o.oeRefresh         = FDuiTable_oeRefresh;
      o.appendColumn      = FDuiTable_appendColumn;
      return o;
   }
   MO.FDuiTable_onBuildContent = function FDuiTable_onBuildContent(p){
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
   MO.FDuiTable_oeRefresh = function FDuiTable_oeRefresh(e){
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
      }
   }
   MO.FDuiTable_appendColumn = function FDuiTable_appendColumn(p){
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
   MO.FDuiTable_onResizeAfter = function FDuiTable_onResizeAfter(){
      var o = this;
      var hdp = o._hDataPanel;
      var hfp = o._hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FDuiTable_oeResize = function FDuiTable_oeResize(e){
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
}
MO.FDuiMenuBar = function FDuiMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiMenuBar_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.appendChild       = MO.FDuiMenuBar_appendChild;
   o.removeChild       = MO.FDuiMenuBar_removeChild;
   o.dispose           = MO.FDuiMenuBar_dispose;
   return o;
}
MO.FDuiMenuBar_onBuildPanel = function FDuiMenuBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
   o._hLine = MO.Window.Builder.appendTableRow(h);
}
MO.FDuiMenuBar_appendChild = function FDuiMenuBar_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.MUiMenuButton)){
      var hLine = o._hLine;
      var hCell = MO.Window.Builder.appendTableCell(hLine, o.styleName('ButtonPanel'));
      hCell._hParentLine = hLine;
      control.setPanel(hCell);
   }
}
MO.FDuiMenuBar_removeChild = function FDuiMenuBar_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, FDuiMenuButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiMenuBar_dispose = function FDuiMenuBar_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiMenuButton = function FDuiMenuButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._icon            = MO.Class.register(o, new MO.APtyString('_icon'));
   o._iconDisable     = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   o._hotkey          = MO.Class.register(o, new MO.APtyString('_hotkey'));
   o._action          = MO.Class.register(o, new MO.APtyString('_action'));
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = MO.FDuiMenuButton_onBuildPanel
   o.onBuild          = MO.FDuiMenuButton_onBuild;
   o.onEnter          = MO.FDuiMenuButton_onEnter;
   o.onLeave          = MO.FDuiMenuButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiMenuButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiMenuButton_onMouseUp);
   o.icon             = MO.FDuiMenuButton_icon;
   o.setIcon          = MO.FDuiMenuButton_setIcon;
   o.setLabel         = MO.FDuiMenuButton_setLabel;
   o.setHint          = MO.FDuiMenuButton_setHint;
   o.setEnable        = MO.FDuiMenuButton_setEnable;
   o.click            = MO.FDuiMenuButton_click;
   o.dispose          = MO.FDuiMenuButton_dispose;
   return o;
}
MO.FDuiMenuButton_onBuildPanel = function FDuiMenuButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Normal'));
}
MO.FDuiMenuButton_onBuild = function FDuiMenuButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiMenuButton_onEnter = function FDuiMenuButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiMenuButton_onLeave = function FDuiMenuButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
MO.FDuiMenuButton_onMouseDown = function FDuiMenuButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
MO.FDuiMenuButton_onMouseUp = function FDuiMenuButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiMenuButton_icon = function FDuiMenuButton_icon(){
   return this._icon;
}
MO.FDuiMenuButton_setIcon = function FDuiMenuButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiMenuButton_setLabel = function FDuiMenuButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiMenuButton_setHint = function FDuiMenuButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = text;
}
MO.FDuiMenuButton_setEnable = function FDuiMenuButton_setEnable(p){
   var o = this;
   o.__base.FDuiControl.setEnable.call(o, p);
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
MO.FDuiMenuButton_click = function FDuiMenuButton_click(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiMenuButton_dispose = function FDuiMenuButton_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiMenuButtonMenu = function FDuiMenuButtonMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._action      = MO.Class.register(o, new MO.APtyString('action', null));
   o._target      = MO.Class.register(o, new MO.APtyString('target', null));
   o._page        = MO.Class.register(o, new MO.APtyString('page'));
   o._hotkey      = MO.Class.register(o, new MO.APtyString('hotkey'));
   o._method      = MO.Class.register(o, new MO.APtyString('method'));
   o._icon        = MO.Class.register(o, new MO.APtyString('icon', null));
   o._iconDisable = MO.Class.register(o, new MO.APtyString('iconDisable', null));
   o._attributes  = MO.Class.register(o, new MO.APtyString('attributes'));
   o._disabled    = false;
   o.hButton      = null;
   o.hButtonLine  = null;
   o.hButtonPanel = null;
   o.hIcon        = null;
   o.hText        = null;
   o.oeBuild      = MO.FDuiMenuButtonMenu_oeBuild;
   o.oeEnable     = MO.FDuiMenuButtonMenu_oeEnable;
   o.oeDisable    = MO.FDuiMenuButtonMenu_oeDisable;
   o.onBuildPanel = MO.FDuiMenuButtonMenu_onBuildPanel;
   o.onEnter      = MO.FDuiMenuButtonMenu_onEnter;
   o.onLeave      = MO.FDuiMenuButtonMenu_onLeave;
   o.onMouseDown  = MO.FDuiMenuButtonMenu_onMouseDown;
   o.onMouseUp    = MO.FDuiMenuButtonMenu_onMouseUp;
   o.onClick      = MO.FDuiMenuButtonMenu_onClick;
   o.construct    = MO.FDuiMenuButtonMenu_construct;
   o.dispose      = MO.FDuiMenuButtonMenu_dispose;
   return o;
}
MO.FDuiMenuButtonMenu_oeBuild = function FDuiMenuButtonMenu_oeBuild(event){
   var o = this;
   o.base.FDuiControl.oeBuild.call(o, event);
   var h = o.hPanel;
   o.hButton = MO.Window.Builder.appendTable(o.hPanel, o.style('Button'));
   o.linkClickEvent(o.hButton);
   var hLine = o.hButtonLine = o.hButton.insertRow();
   var hCel = hLine.insertCell();
   if(o._icon){
      o.hIcon = MO.Window.Builder.appendIcon(hCel, o._icon);
   }
   if(o.label){
      o.hLabel = MO.Window.Builder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
      o.hLabel.className = o.style('Label');
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_onBuildPanel = function FDuiMenuButtonMenu_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'DIV');
}
MO.FDuiMenuButtonMenu_oeEnable = function FDuiMenuButtonMenu_oeEnable(event){
   var o = this;
   o.base.FDuiControl.oeEnable.call(o, event);
   o.hPanel.className = o.style('Button');
   if(o._iconDisable && o._icon){
      o.hIcon.src = RRes._iconPath(o._icon);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_oeDisable = function FDuiMenuButtonMenu_oeDisable(event){
   var o = this;
   o.base.FDuiControl.oeDisable.call(o, event);
   o.hPanel.className = o.style('Disable');
   if(o._iconDisable){
      o.hIcon.src = RRes._iconPath(o._iconDisable);
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiMenuButtonMenu_onEnter = function FDuiMenuButtonMenu_onEnter(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
MO.FDuiMenuButtonMenu_onLeave = function FDuiMenuButtonMenu_onLeave(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Panel');
   }
}
MO.FDuiMenuButtonMenu_onMouseDown = function FDuiMenuButtonMenu_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Press');
   }
}
MO.FDuiMenuButtonMenu_onMouseUp = function FDuiMenuButtonMenu_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o.hPanel.className = o.style('Hover');
   }
}
MO.FDuiMenuButtonMenu_onClick = function FDuiMenuButtonMenu_onClick(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FFocusConsole).focus(o);
      if(o._action){
         eval(o._action);
      }
      if(o._page || o._method){
         var form = MO.Window.Html.form(o.hButton);
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
MO.FDuiMenuButtonMenu_construct = function FDuiMenuButtonMenu_construct(){
   var o = this;
   o.base.FDuiControl.construct.call(o);
}
MO.FDuiMenuButtonMenu_dispose = function FDuiMenuButtonMenu_dispose(){
   var o = this;
   o.base.FDuiControl.dispose.call(o);
   o.hPanel = MO.Window.Html.free(o.hPanel);
   o.hButton = MO.Window.Html.free(o.hButton);
   o.hIcon = null;
   o.hButtonLine = null;
   o.hLabel = null;
}
MO.FDuiMenuButtonSplit = function FDuiMenuButtonSplit(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._stylePanelHorizontal = MO.Class.register(o, new MO.AStyle('_stylePanelHorizontal'));
   o._stylePanelVertical   = MO.Class.register(o, new MO.AStyle('_stylePanelVertical'));
   o.onBuild               = MO.FDuiMenuButtonSplit_onBuild;
   return o;
}
MO.FDuiMenuButtonSplit_onBuild = function FDuiMenuButtonSplit_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   if(MO.Class.isClass(o._parent, MO.FDuiMenuBar)){
      hPanel.className = o.styleName('PanelVertical');
   }else{
      hPanel.className = o.styleName('PanelHorizontal');
   }
}
MO.FDuiPopupMenu = function FDuiPopupMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiPopup);
   o._stylePanel     = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleForm      = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   o._styleLabel     = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleButton    = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._opener         = null;
   o._visible        = false;
   o._statusVisible  = false;
   o._hContainer     = null;
   o._hLabel         = null;
   o._hButtonPanel   = null;
   o._hIcon          = null;
   o._hText          = null;
   o.onBuild         = MO.FDuiPopupMenu_onBuild;
   o.appendChild     = MO.FDuiPopupMenu_appendChild;
   o.show            = MO.FDuiPopupMenu_show;
   o.setVisible      = MO.FDuiPopupMenu_setVisible;
   o.testInRange     = MO.FDuiPopupMenu_testInRange;
   o.doBlur          = MO.FDuiPopupMenu_doBlur;
   o.dispose         = MO.FDuiPopupMenu_dispose;
   return o;
}
MO.FDuiPopupMenu_onBuild = function FDuiPopupMenu_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel, o.styleName('Form'));
   var hLineTop = o._hLineTop = MO.Window.Builder.appendTableCell(hForm);
   hLineTop.bgColor = '#666666';
   hLineTop.height = '2px';
   var hContainerPanel = o._hContainerPanel = MO.Window.Builder.appendTableCell(hForm);
   var hLineBottom = o._hLineBottom = MO.Window.Builder.appendTableCell(hForm);
   hLineBottom.bgColor = '#666666';
   hLineBottom.height = '2px';
   var hContainer = o._hContainer = MO.Window.Builder.appendTable(hContainerPanel, o.styleName('Container'));
}
MO.FDuiPopupMenu_doBlur = function FDuiPopupMenu_doBlur(){
   var o = this;
}
MO.FDuiPopupMenu_appendChild = function FDuiPopupMenu_appendChild(control){
   var o = this;
   var hButtonPanel = MO.Window.Builder.appendTableRowCell(o._hContainer);
   hButtonPanel.className = o.styleName('Button');
   hButtonPanel.appendChild(control._hPanel);
}
MO.FDuiPopupMenu_show = function FDuiPopupMenu_show(h, positionCd, v){
   var o = this;
   var hPanel = o._hPanel;
   var opener = o._opener;
   o.setVisible(true);
   var hOpener = opener._hPanel;
   var openerWidth = hOpener.offsetWidth;
   var openerHeight = hOpener.offsetHeight;
   var width = hPanel.offsetWidth;
   var height = hPanel.offsetHeight;
   var style = hPanel.style;
   if(width < openerWidth){
      width = openerWidth;
   }
   if(height > 300){
      o._hFormPanel.style.overflowY = 'scroll';
      style.height = height + 'px';
   }
   style.left = '3px';
   style.top = (openerHeight + 1) + 'px';
   style.width = width + 'px';
   style.zIndex = RDuiLayer.next();
}
MO.FDuiPopupMenu_setVisible = function FDuiPopupMenu_setVisible(visible){
   var o = this;
   var opener = o._opener;
   o._statusVisible = visible;
   var hOpener = opener._hPanelCell;
   var hPanel = o.panel(MO.EPanel.Container);
   if(visible){
      hOpener.appendChild(hPanel);
   }else{
      hOpener.removeChild(hPanel);
   }
}
MO.FDuiPopupMenu_testInRange = function FDuiPopupMenu_testInRange(e){
   return this == RControl.htmlControl(e.srcElement, FDuiPopupMenu);
}
MO.FDuiPopupMenu_dispose = function FDuiPopupMenu_dispose(e){
   var o = this;
   o._hContainer = MO.Window.Html.free(o._hContainer);
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hLabel = MO.Window.Html.free(o._hLabel);
   o._hLastRow = MO.Window.Html.free(o._hLastRow);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiSliderButton = function FDuiSliderButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiMenuButton);
   o._icon            = MO.Class.register(o, new MO.APtyString('_icon'));
   o._iconDisable     = MO.Class.register(o, new MO.APtyString('_iconDisable'));
   o._hotkey          = MO.Class.register(o, new MO.APtyString('_hotkey'));
   o._action          = MO.Class.register(o, new MO.APtyString('_action'));
   o._styleNormal     = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover      = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._stylePress      = MO.Class.register(o, new MO.AStyle('_stylePress'));
   o._styleDisable    = MO.Class.register(o, new MO.AStyle('_styleDisable'));
   o._styleIconPanel  = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._disabled        = false;
   o._listenersClick  = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._hForm           = null;
   o._hLine           = null;
   o._hIconPanel      = null;
   o._hIcon           = null;
   o._hSpacePanel     = null;
   o._hLabelPanel     = null;
   o.onBuildPanel     = MO.FDuiSliderButton_onBuildPanel
   o.onBuild          = MO.FDuiSliderButton_onBuild;
   o.onEnter          = MO.FDuiSliderButton_onEnter;
   o.onLeave          = MO.FDuiSliderButton_onLeave;
   o.onMouseDown      = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSliderButton_onMouseDown);
   o.onMouseUp        = MO.Class.register(o, new MO.AEventMouseDown('onMouseUp'), MO.FDuiSliderButton_onMouseUp);
   o.icon             = MO.FDuiSliderButton_icon;
   o.setIcon          = MO.FDuiSliderButton_setIcon;
   o.setLabel         = MO.FDuiSliderButton_setLabel;
   o.setHint          = MO.FDuiSliderButton_setHint;
   o.setEnable        = MO.FDuiSliderButton_setEnable;
   o.click            = MO.FDuiSliderButton_click;
   o.dispose          = MO.FDuiSliderButton_dispose;
   return o;
}
MO.FDuiSliderButton_onBuildPanel = function FDuiSliderButton_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Normal'));
}
MO.FDuiSliderButton_onBuild = function FDuiSliderButton_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   o.attachEvent('onMouseUp', hPanel);
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiSliderButton_onEnter = function FDuiSliderButton_onEnter(p){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiSliderButton_onLeave = function FDuiSliderButton_onLeave(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Normal');
   }
}
MO.FDuiSliderButton_onMouseDown = function FDuiSliderButton_onMouseDown(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Press');
      o.click();
   }
}
MO.FDuiSliderButton_onMouseUp = function FDuiSliderButton_onMouseUp(){
   var o = this;
   if(!o._disabled){
      o._hPanel.className = o.styleName('Hover');
   }
}
MO.FDuiSliderButton_icon = function FDuiSliderButton_icon(){
   return this._icon;
}
MO.FDuiSliderButton_setIcon = function FDuiSliderButton_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiSliderButton_setLabel = function FDuiSliderButton_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiSliderButton_setHint = function FDuiSliderButton_setHint(hint){
   var o = this;
   o._hint = hint;
   var text = MO.Lang.String.nvl(hint);
   if(o._hint){
      if(o._hotkey){
         text += ' [' + o._hotkey + ']';
      }
   }
   o._hPanel.title = text;
}
MO.FDuiSliderButton_setEnable = function FDuiSliderButton_setEnable(p){
   var o = this;
   o.__base.FDuiControl.setEnable.call(o, p);
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
MO.FDuiSliderButton_click = function FDuiSliderButton_click(){
   var o = this;
   if(!o._disabled){
      MO.Console.find(MO.FDuiFocusConsole).blur();
      MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
      var event = new MO.SClickEvent(o);
      o.processClickListener(event);
      event.dispose();
      if(o._action){
         eval(o._action);
      }
   }
}
MO.FDuiSliderButton_dispose = function FDuiSliderButton_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   o._hLine = MO.Window.Html.free(o._hLine);
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hIcon = MO.Window.Html.free(o._hIcon);
   o._hSpacePanel = MO.Window.Html.free(o._hSpacePanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiSliderGroup = function FDuiSliderGroup(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleButtonPanel = MO.Class.register(o, new MO.AStyle('_styleButtonPanel'));
   o._styleIconPanel   = MO.Class.register(o, new MO.AStyle('_styleIconPanel'));
   o._styleSpacePanel  = MO.Class.register(o, new MO.AStyle('_styleSpacePanel'));
   o._styleLabelPanel  = MO.Class.register(o, new MO.AStyle('_styleLabelPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiSliderGroup_onBuildPanel;
   o.onBuild           = MO.FDuiSliderGroup_onBuild;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.setIcon           = MO.FDuiSliderGroup_setIcon;
   o.setLabel          = MO.FDuiSliderGroup_setLabel;
   o.appendChild       = MO.FDuiSliderGroup_appendChild;
   o.removeChild       = MO.FDuiSliderGroup_removeChild;
   o.dispose           = MO.FDuiSliderGroup_dispose;
   return o;
}
MO.FDuiSliderGroup_onBuildPanel = function FDuiSliderGroup_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiSliderGroup_onBuild = function FDuiSliderGroup_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
   var hForm = o._hForm = MO.Window.Builder.appendTable(hCell);
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(hForm);
   if(o._icon){
      var hc = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('IconPanel'));
      o._hIcon = MO.Window.Builder.appendIcon(hc, null, o._icon);
   }
   if(o._icon && o._label){
      o._hSpacePanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('SpacePanel'));
   }
   if(o._label){
      var hLabelPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hLine, o.styleName('LabelPanel'));
      hLabelPanel.noWrap = true;
      o.setLabel(o._label);
   }
   if(o._hotkey){
      MO.Console.find(MO.FKeyConsole).register(o._hotkey, o, o.onMouseDown);
   }
   if(o._hint){
      o.setHint(o._hint);
   }
}
MO.FDuiSliderGroup_setIcon = function FDuiSliderGroup_setIcon(icon){
   var o = this;
   o._icon = icon;
   if(o._hIcon){
      o._hIcon.src = o.styleIconPath(icon);
   }
}
MO.FDuiSliderGroup_setLabel = function FDuiSliderGroup_setLabel(label){
   var o = this;
   var text = MO.Lang.String.nvl(label);
   o._label = text;
   MO.Window.Html.textSet(o._hLabelPanel, text);
}
MO.FDuiSliderGroup_appendChild = function FDuiSliderGroup_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.FDuiSliderButton)){
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ButtonPanel'));
      control.setPanel(hCell);
   }
}
MO.FDuiSliderGroup_removeChild = function FDuiSliderGroup_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, FDuiSliderButton)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
      p._hParentLine = null;
      p._hParent = null;
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiSliderGroup_dispose = function FDuiSliderGroup_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiSliderMenu = function FDuiSliderMenu(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._mergeCd          = MO.Class.register(o, new MO.APtyEnum('_mergeCd', null, MO.EUiMerge, MO.EUiMerge.Override));
   o._stylePanel       = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleMenuPanel   = MO.Class.register(o, new MO.AStyle('_styleMenuPanel'));
   o._styleGroupPanel  = MO.Class.register(o, new MO.AStyle('_styleGroupPanel'));
   o._hLine            = null;
   o.onBuildPanel      = MO.FDuiSliderMenu_onBuildPanel;
   o.onEnter           = MO.Method.empty;
   o.onLeave           = MO.Method.empty;
   o.appendChild       = MO.FDuiSliderMenu_appendChild;
   o.removeChild       = MO.FDuiSliderMenu_removeChild;
   o.dispose           = MO.FDuiSliderMenu_dispose;
   return o;
}
MO.FDuiSliderMenu_onBuildPanel = function FDuiSliderMenu_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   var hMenuPanel = o._hMenuPanel = MO.Window.Builder.appendTableRowCell(hPanel, o.styleName('MenuPanel'));
   hMenuPanel.align = 'center';
   MO.Window.Builder.appendIcon(hMenuPanel, null, 'editor.design.menuv|png');
}
MO.FDuiSliderMenu_appendChild = function FDuiSliderMenu_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.FDuiSliderGroup)){
      var hLine = o._hLine;
      var hCell = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('GroupPanel'));
      control.setPanel(hCell);
   }
}
MO.FDuiSliderMenu_removeChild = function FDuiSliderMenu_removeChild(p){
   var o = this;
   if(MO.Class.isClass(p, MO.FDuiSliderGroup)){
      var hp = p._hParent;
      var hl = p._hParentLine;
      hl.removeChild(hp);
   }
   o.__base.FDuiContainer.removeChild.call(o, p);
}
MO.FDuiSliderMenu_dispose = function FDuiSliderMenu_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   o.__base.FDuiContainer.dispose.call(o);
}
with(MO){
   MO.MDuiToolButton = function MDuiToolButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FDuiToolBar = function FDuiToolBar(o){
      o = RClass.inherits(this, o, FDuiContainer, MDuiDescribeFrame);
      o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
      o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FDuiToolBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FDuiToolBar_appendChild;
      o.removeChild       = FDuiToolBar_removeChild;
      o.dispose           = FDuiToolBar_dispose;
      return o;
   }
   MO.FDuiToolBar_onBuildPanel = function FDuiToolBar_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FDuiToolBar_appendChild = function FDuiToolBar_appendChild(control){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MDuiToolButton)){
         var h = o._hPanel;
         var hl = o._hLine;
         if(o._directionCd == EUiDirection.Horizontal){
            if(!hl){
               hl = o._hLine = RBuilder.appendTableRow(h);
            }
         }
         if(o._directionCd == EUiDirection.Vertical){
            hl = o._hLine = RBuilder.appendTableRow(h);
         }
         var hc = RBuilder.appendTableCell(hl, o.styleName('ButtonPanel'));
         control._hPanelCell = hc;
         control.setPanel(hc);
      }
   }
   MO.FDuiToolBar_removeChild = function FDuiToolBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, MDuiToolButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParent = null;
         p._hParentLine = null;
      }
      o.__base.FDuiContainer.removeChild.call(o, p);
   }
   MO.FDuiToolBar_dispose = function FDuiToolBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButton = function FDuiToolButton(o){
      o = RClass.inherits(this, o, FDuiControl, MDuiToolButton, MListenerClick);
      o._icon            = RClass.register(o, new APtyString('_icon'));
      o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
      o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
      o._action          = RClass.register(o, new APtyString('_action'));
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
      o._styleNormal     = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover      = RClass.register(o, new AStyle('_styleHover'));
      o._stylePress      = RClass.register(o, new AStyle('_stylePress'));
      o._styleDisable    = RClass.register(o, new AStyle('_styleDisable'));
      o._styleIconPanel  = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleSpacePanel = RClass.register(o, new AStyle('_styleSpacePanel'));
      o._styleLabelPanel = RClass.register(o, new AStyle('_styleLabelPanel'));
      o._disabled        = false;
      o._hForm           = null;
      o._hLine           = null;
      o._hIconPanel      = null;
      o._hIcon           = null;
      o._hSpacePanel     = null;
      o._hLabelPanel     = null;
      o.onBuildPanel     = FDuiToolButton_onBuildPanel;
      o.onBuildButton    = FDuiToolButton_onBuildButton;
      o.onBuild          = FDuiToolButton_onBuild;
      o.onEnter          = FDuiToolButton_onEnter;
      o.onLeave          = FDuiToolButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FDuiToolButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FDuiToolButton_onMouseUp);
      o.icon             = FDuiToolButton_icon;
      o.setIcon          = FDuiToolButton_setIcon;
      o.setLabel         = FDuiToolButton_setLabel;
      o.setHint          = FDuiToolButton_setHint;
      o.setEnable        = FDuiToolButton_setEnable;
      o.doClick          = FDuiToolButton_doClick;
      o.dispose          = FDuiToolButton_dispose;
      return o;
   }
   MO.FDuiToolButton_onBuildPanel = function FDuiToolButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FDuiToolButton_onBuildButton = function FDuiToolButton_onBuildButton(p){
      var o = this;
      var hPanel = o._hPanel;
      o.attachEvent('onMouseDown', hPanel);
      o.attachEvent('onMouseUp', hPanel);
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Normal'));
      var hLine = o._hLine = RBuilder.appendTableRow(hForm);
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      if(o._icon && o._label){
         o.hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
         hLabelPanel.noWrap = true;
         o.setLabel(o._label);
      }
      if(o._hotkey){
         RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
      }
      if(o._hint){
         o.setHint(o._hint);
      }
   }
   MO.FDuiToolButton_onBuild = function FDuiToolButton_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o.onBuildButton(p);
   }
   MO.FDuiToolButton_onEnter = function FDuiToolButton_onEnter(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FDuiToolButton_onLeave = function FDuiToolButton_onLeave(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Normal');
      }
   }
   MO.FDuiToolButton_onMouseDown = function FDuiToolButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FDuiToolButton_onMouseUp = function FDuiToolButton_onMouseUp(h){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FDuiToolButton_icon = function FDuiToolButton_icon(){
      return this._icon;
   }
   MO.FDuiToolButton_setIcon = function FDuiToolButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FDuiToolButton_setLabel = function FDuiToolButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      var h = o._hLabelPanel;
      if(h){
         RHtml.textSet(h, s);
      }
   }
   MO.FDuiToolButton_setHint = function FDuiToolButton_setHint(p){
      var o = this;
      o._hint = p;
      var s = RString.nvl(p);
      if(o._hint){
         if(o._hotkey){
            s += ' [' + o._hotkey + ']';
         }
      }
      o._hPanel.title = o._hint;
   }
   MO.FDuiToolButton_setEnable = function FDuiToolButton_setEnable(p){
      var o = this;
      o.__base.FDuiControl.oeEnable.call(o, e);
      o._disabled = !e.enable;
      if(e.enable && o._icon){
         var is = RResource.iconPath(o._icon);
         if(o._hIcon.src != is){
            o._hIcon.src = is;
         }
      }else if(!e.enable && o._iconDisable){
         var is = RResource.iconPath(o._iconDisable);
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
   MO.FDuiToolButton_doClick = function FDuiToolButton_doClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FDuiFocusConsole).blur();
         MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FDuiToolButton_dispose = function FDuiToolButton_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o.__base.FDuiControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButtonCheck = function FDuiToolButtonCheck(o){
      o = RClass.inherits(this, o, FDuiToolButton);
      o._optionChecked  = RClass.register(o, new APtyBoolean('_optionChecked', 'check'));
      o._groupName      = RClass.register(o, new APtyString('_groupName'));
      o._groupDefault   = RClass.register(o, new APtyString('_groupDefault'));
      o._statusChecked  = false;
      o.onEnter         = FDuiToolButtonCheck_onEnter;
      o.onLeave         = FDuiToolButtonCheck_onLeave;
      o.onMouseDown     = FDuiToolButtonCheck_onMouseDown;
      o.onMouseUp       = FDuiToolButtonCheck_onMouseUp;
      o.groupName       = FDuiToolButtonCheck_groupName;
      o.setGroupName    = FDuiToolButtonCheck_setGroupName;
      o.groupDefault    = FDuiToolButtonCheck_groupDefault;
      o.setGroupDefault = FDuiToolButtonCheck_setGroupDefault;
      o.innerCheck      = FDuiToolButtonCheck_innerCheck;
      o.isCheck         = FDuiToolButtonCheck_isCheck;
      o.check           = FDuiToolButtonCheck_check;
      o.dispose         = FDuiToolButtonCheck_dispose;
      return o;
   }
   MO.FDuiToolButtonCheck_onEnter = function FDuiToolButtonCheck_onEnter(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Hover');
      }
   }
   MO.FDuiToolButtonCheck_onLeave = function FDuiToolButtonCheck_onLeave(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Normal');
      }
   }
   MO.FDuiToolButtonCheck_onMouseDown = function FDuiToolButtonCheck_onMouseDown(p){
      var o = this;
      o.check(!o._statusChecked);
      var event = new SClickEvent(o);
      event.checked = o._statusChecked;
      o.processClickListener(event, o._statusChecked);
      event.dispose();
   }
   MO.FDuiToolButtonCheck_onMouseUp = function FDuiToolButtonCheck_onMouseUp(){
      var o = this;
   }
   MO.FDuiToolButtonCheck_groupName = function FDuiToolButtonCheck_groupName(){
      return this._groupName;
   }
   MO.FDuiToolButtonCheck_setGroupName = function FDuiToolButtonCheck_setGroupName(p){
      this._groupName = p;
   }
   MO.FDuiToolButtonCheck_groupDefault = function FDuiToolButtonCheck_groupDefault(){
      return this._groupDefault;
   }
   MO.FDuiToolButtonCheck_setGroupDefault = function FDuiToolButtonCheck_setGroupDefault(p){
      this._groupDefault = p;
   }
   MO.FDuiToolButtonCheck_innerCheck = function FDuiToolButtonCheck_innerCheck(p){
      var o = this;
      if(o._statusChecked != p){
         o._statusChecked = p;
         if(p){
            o._hForm.className = o.styleName('Press');
         }else{
            o._hForm.className = o.styleName('Normal');
         }
      }
   }
   MO.FDuiToolButtonCheck_isCheck = function FDuiToolButtonCheck_isCheck(){
      return this._statusChecked;
   }
   MO.FDuiToolButtonCheck_check = function FDuiToolButtonCheck_check(p){
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
                  if(RClass.isClass(c, FDuiToolButtonCheck)){
                     c.innerCheck(false);
                  }
               }
            }
         }
      }else{
         if(!RString.isEmpty(o._groupDefault)){
            var components = o._parent.components();
            var control = components.get(o._groupDefault);
            if(control){
               control.innerCheck(true);
            }else{
               MO.Logger.error("Can't find group default control. (name={1})", o._groupDefault);
            }
         }
      }
   }
   MO.FDuiToolButtonCheck_dispose = function FDuiToolButtonCheck_dispose(){
      var o = this;
      o._statusChecked = null;
      o._groupName = null;
      o.__base.FDuiToolButton.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButtonEdit = function FDuiToolButtonEdit(o){
      o = RClass.inherits(this, o, FDuiToolButton, MListenerDataChanged);
      o._editSize      = RClass.register(o, new APtySize2('_editSize'));
      o._hEdit         = null;
      o.onBuildButton  = FDuiToolButtonEdit_onBuildButton;
      o.onEnter        = RMethod.empty;
      o.onLeave        = RMethod.empty;
      o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FDuiToolButtonEdit_onInputEdit);
      o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FDuiToolButtonEdit_onInputKeyDown);
      o.construct      = FDuiToolButtonEdit_construct;
      o.text           = FDuiToolButtonEdit_text;
      o.setText        = FDuiToolButtonEdit_setText;
      return o;
   }
   MO.FDuiToolButtonEdit_onBuildButton = function FDuiToolButtonEdit_onBuildButton(p){
      var o = this;
      var hPanel = o._hPanel;
      var hForm = o._hForm = RBuilder.appendTable(hPanel);
      var hLine = o._hLine = RBuilder.appendTableRow(hForm);
      var hEditPanel = o._hEditPanel = RBuilder.appendTableCell(hLine);
      var hEdit = o._hEdit = RBuilder.appendEdit(hEditPanel);
      hEdit.style.width = o._editSize.width +  'px';
      o.attachEvent('onInputEdit', hEdit, o.onInputEdit);
      o.attachEvent('onInputKeyDown', hEdit);
      o._hEditSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hLine, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      if(o._icon && o._label){
         o._hSpacePanel = RBuilder.appendTableCell(hLine, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hLine, o.styleName('LabelPanel'));
         o.attachEvent('onMouseDown', hLabelPanel);
         o.attachEvent('onMouseUp', hLabelPanel);
         hLabelPanel.noWrap = true;
         o.setLabel(o._label);
      }
      if(o._hotkey){
         RConsole.find(FKeyConsole).register(o._hotkey, o, o.onMouseDown);
      }
      if(o._hint){
         o.setHint(o._hint);
      }
   }
   MO.FDuiToolButtonEdit_onInputEdit = function FDuiToolButtonEdit_onInputEdit(event){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FDuiToolButtonEdit_onInputKeyDown = function FDuiToolButtonEdit_onInputKeyDown(event){
      var o = this;
      if(event.keyCode == EKeyCode.Enter){
         o.doClick();
      }
   }
   MO.FDuiToolButtonEdit_construct = function FDuiToolButtonEdit_construct(){
      var o = this;
      o.__base.FDuiToolButton.construct.call(o);
      o._editSize = new SSize2();
   }
   MO.FDuiToolButtonEdit_text = function FDuiToolButtonEdit_text(){
      return this._hEdit.value;
   }
   MO.FDuiToolButtonEdit_setText = function FDuiToolButtonEdit_setText(text){
      this._hEdit.value = text;
   }
}
with(MO){
   MO.FDuiToolButtonMenu = function FDuiToolButtonMenu(o){
      o = RClass.inherits(this, o, FDuiToolButton, MDuiContainer, MDuiDropable, MDuiFocus);
      o._menu           = null;
      o._statusDrop     = false;
      o._hDropPanel     = null;
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
      o.onBuild         = FDuiToolButtonMenu_onBuild;
      o.onEnter         = FDuiToolButtonMenu_onEnter;
      o.onLeave         = FDuiToolButtonMenu_onLeave;
      o.onMouseDown     = FDuiToolButtonMenu_onMouseDown;
      o.onBlur          = FDuiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      o.construct       = FDuiToolButtonMenu_construct;
      o.push            = FDuiToolButtonMenu_push;
      o.drop            = FDuiToolButtonMenu_drop;
      o.doClick         = FDuiToolButtonMenu_doClick;
      o.dispose         = FDuiToolButtonMenu_dispose;
      return o;
   }
   MO.FDuiToolButtonMenu_onBuild = function FDuiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FDuiToolButton.onBuild.call(o, event);
      var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
      o.onBuildDrop(hDropPanel);
      o._menu.onBuild(event);
   }
   MO.FDuiToolButtonMenu_onEnter = function FDuiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onEnter.call(o, event);
      }
   }
   MO.FDuiToolButtonMenu_onLeave = function FDuiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FDuiToolButton.onLeave.call(o, event);
      }
   }
   MO.FDuiToolButtonMenu_onMouseDown = function FDuiToolButtonMenu_onMouseDown(){
      var o = this;
      if(!o._statusDrop){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FDuiToolButtonMenu_onBlur = function FDuiToolButtonMenu_onBlur(e){
      var o = this;
   }
   MO.FDuiToolButtonMenu_construct = function FDuiToolButtonMenu_construct(){
      var o = this;
      o.__base.FDuiToolButton.construct.call(o);
      var menu = o._menu = RClass.create(FDuiPopupMenu);
      menu._opener = o;
   }
   MO.FDuiToolButtonMenu_push = function FDuiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MUiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FDuiToolButton.push.call(o, c);
   }
   MO.FDuiToolButtonMenu_drop = function FDuiToolButtonMenu_drop(flag){
      var o = this;
      if(!o._disabled){
         o._statusDrop = !o._statusDrop;
         if(o._statusDrop){
            o._hForm.className = o.styleName('Press');
            o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
            RConsole.find(FDuiPopupConsole).show(o._menu);
         }else{
            o._hForm.className = o.styleName('Normal');
            o._menu.hide();
         }
      }
   }
   MO.FDuiToolButtonMenu_doClick = function FDuiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FDuiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }
   MO.FDuiToolButtonMenu_dispose = function FDuiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
with(MO){
   MO.FDuiToolButtonSplit = function FDuiToolButtonSplit(o){
      o = RClass.inherits(this, o, FDuiToolButton, MDuiToolButton);
      o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
      o.onBuild     = FDuiToolButtonSplit_onBuild;
      return o;
   }
   MO.FDuiToolButtonSplit_onBuild = function FDuiToolButtonSplit_onBuild(p){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, p);
      o._hPanel.className = o.styleName('Panel');
   }
}
with(MO){
   MO.FDuiToolButtonText = function FDuiToolButtonText(o){
      o = RClass.inherits(this, o, FDuiToolButton);
      return o;
   }
}
with(MO){
   MO.RDuiToolBar = function RDuiToolBar(){
      var o = this;
      o.fromNode = RDuiToolBar_fromNode;
      return o;
   }
   MO.RDuiToolBar_mergeNode = function RDuiToolBar_mergeNode(xtb, xNode, r){
      var ns = xNode.nodes;
      for(var j=0; j<ns.count; j++){
         var n = ns.get(j);
         if('ToolBar' == n.name){
            if(n.nodes){
               for(var i=0; i<n.nodes.count; i++){
                  xtb.push(n.nodes.get(i));
               }
            }
         }
      }
      if(r){
         for(var j=ns.count-1; j>=0; j--){
            var n = ns.get(j);
            if('ToolBar' == n.name){
               ns.removeItem(n);
            }
         }
      }
      return xtb;
   }
   MO.RDuiToolBar_fromNode = function RDuiToolBar_fromNode(control, config, panel, r){
      if(config && config._nodes){
         var xtb = null;
         var ns = config._nodes;
         var jc = ns.count();
         for(var j = 0; j < jc; j++){
            var n = ns.getAt(j);
            if(n.isName('ToolBar')){
               if(!xtb){
                  xtb = n;
               }else if(n.hasNode()){
                  xtb.nodes().append(n.nodes());
               }
            }
         }
         if(r){
            for(var i = 0; i < ns.count(); i++){
               var n = ns.getAt(i);
               if(n.isName('ToolBar')){
                  ns.erase(i--);
               }
            }
         }
         if(xtb){
            RControl.build(control, xtb, null, panel);
         }
      }
   }
   MO.RDuiToolBar = new RDuiToolBar();
}
MO.FDuiPageControl = function FDuiPageControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._sizeCd          = MO.EUiSize.Horizontal;
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm  = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleDataPanel  = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm   = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   o._styleTop        = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleBottom     = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleForm       = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = MO.EUiSize.Both;
   o._hTop            = null;
   o._hLine           = null;
   o._hBottom         = null;
   o._hSheets         = null;
   o.onBuildPanel     = MO.FDuiPageControl_onBuildPanel;
   o.onBuild          = MO.FDuiPageControl_onBuild;
   o.oeRefresh        = MO.FDuiPageControl_oeRefresh;
   o.construct        = MO.FDuiPageControl_construct;
   o.appendChild      = MO.FDuiPageControl_appendChild;
   o.select           = MO.FDuiPageControl_select;
   o.selectByIndex    = MO.FDuiPageControl_selectByIndex;
   o.sheet            = MO.FDuiPageControl_sheet;
   o.push             = MO.FDuiPageControl_push;
   o.dispose          = MO.FDuiPageControl_dispose;
   return o;
}
MO.FDuiPageControl_onBuildPanel = function FDuiPageControl_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   h.width = '100%';
}
MO.FDuiPageControl_onBuild = function FDuiPageControl_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var h = o._hPanel;
   var hc = MO.Window.Builder.appendTableRowCell(h, o.styleName('TitlePanel'));
   var hf = o.hTitleForm = MO.Window.Builder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = MO.Window.Builder.appendTableRow(hf);
   var hr = o._hBottom = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = MO.Window.Builder.appendTableCell(o._hTop);
   hc.width = 12;
   o._hFirst = MO.Window.Builder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FDuiPageSheet);
   var hc = o._hLastTop = MO.Window.Builder.appendTableCell(o._hTop);
   o._hLast = MO.Window.Builder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FDuiPageSheet);
}
MO.FDuiPageControl_oeRefresh = function FDuiPageControl_oeRefresh(event){
   var o = this;
   var r = o.__base.FDuiContainer.oeRefresh.call(o, event);
   if(event.isBefore()){
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
MO.FDuiPageControl_construct = function FDuiPageControl_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._sheets = new MO.TDictionary();
}
MO.FDuiPageControl_appendChild = function FDuiPageControl_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, FDuiPageSheet)){
      var ci = o._hLast.cellIndex;
      var hc = control._hTopL = MO.Window.Builder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hTop = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = control.styleName('Top');
      var hc = control._hTopR = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hLeft = MO.Window.Builder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Left');
      var hc = control._hButtonPanel = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 1);
      control.attachEvent('onButtonEnter', hc);
      control.attachEvent('onButtonLeave', hc);
      control.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = control._hButton = MO.Window.Builder.appendDiv(hc, control.styleName('Button'));
      if(control.icon){
         control._hIcon = MO.Window.Builder.appendIcon(hb, null, control.icon);
      }
      if(control.label){
         control._hText = MO.Window.Builder.appendSpan(hb, control.styleName('ButtonText'));
         control._hText.innerText = ' ' + control.label();
      }
      var hc = control._hRight = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Right')
      var hc = control._hBottomL = MO.Window.Builder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hc = control._hBottom = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = control.styleName('Bottom');
      var hc = control._hBottomR = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hr = MO.Window.Builder.appendTableRow(o._hPanel);
      if(control.index){
         hr.style.display = 'none';
      }
      var hc = MO.Window.Builder.appendTableCell(hr);
      control._hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(control._hPanel);
      o.selectByIndex(0);
   }
}
MO.FDuiPageControl_sheet = function FDuiPageControl_sheet(name){
   return this._sheets.get(name);
}
MO.FDuiPageControl_select = function FDuiPageControl_select(sheet){
   var o = this;
   o._activeSheet = sheet;
   var sheets = o._sheets;
   var count = sheets.count();
   for(var i = 0; i < count; i++){
      var findSheet = sheets.at(i);
      if(findSheet != sheet){
         findSheet.select(false);
      }
   }
   sheet.select(true);
}
MO.FDuiPageControl_selectByIndex = function FDuiPageControl_selectByIndex(n){
   var o = this;
   var sheet = o._sheets.value(n);
   if(sheet){
      o.select(sheet);
   }
}
MO.FDuiPageControl_push = function FDuiPageControl_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.FDuiPageSheet)){
      var sheets = o._sheets;
      component._pageControl = o;
      component._index = sheets.count();
      sheets.set(component.name(), component);
   }
   o.__base.FDuiContainer.push.call(o, component);
}
MO.FDuiPageControl_dispose = function FDuiPageControl_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiPageSheet = function FDuiPageSheet(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTop          = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleTopSelect    = MO.Class.register(o, new MO.AStyle('_styleTopSelect'));
   o._styleLeft         = MO.Class.register(o, new MO.AStyle('_styleLeft'));
   o._styleLeftSelect   = MO.Class.register(o, new MO.AStyle('_styleLeftSelect'));
   o._styleRight        = MO.Class.register(o, new MO.AStyle('_styleRight'));
   o._styleRightSelect  = MO.Class.register(o, new MO.AStyle('_styleRightSelect'));
   o._styleRightPrior   = MO.Class.register(o, new MO.AStyle('_styleRightPrior'));
   o._styleButtom       = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleBottomSelect = MO.Class.register(o, new MO.AStyle('_styleBottomSelect'));
   o._styleButtonText   = MO.Class.register(o, new MO.AStyle('_styleButtonText'));
   o._styleButton       = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._styleButtonHover  = MO.Class.register(o, new MO.AStyle('_styleButtonHover'));
   o._styleButtonSelect = MO.Class.register(o, new MO.AStyle('_styleButtonSelect'));
   o._styleDataPanel    = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
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
   o.onBuildPanel       = MO.FDuiPageSheet_onBuildPanel;
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiPageSheet_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = MO.Class.register(o, new MO.AEventMouseDown('onHeadMouseDown'), MO.FDuiPageSheet_onHeadMouseDown);
   o.construct          = MO.FDuiPageSheet_construct;
   o.innerSelect        = MO.FDuiPageSheet_innerSelect;
   o.select             = MO.FDuiPageSheet_select;
   o.setVisible         = MO.FDuiPageSheet_setVisible;
   o.dispose            = MO.FDuiPageSheet_dispose
   o.innerDump          = MO.FDuiPageSheet_innerDump;
   return o;
}
MO.FDuiPageSheet_onBuildPanel = function FDuiPageSheet_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = o._hContainer = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   var hForm = o._hPanelForm = MO.Window.Builder.appendTable(hPanel);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
MO.FDuiPageSheet_onButtonEnter = function FDuiPageSheet_onButtonEnter(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
MO.FDuiPageSheet_onButtonLeave = function FDuiPageSheet_onButtonLeave(event){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
MO.FDuiPageSheet_onHeadMouseDown = function FDuiPageSheet_onHeadMouseDown(event){
   var o = this;
   o._parent.select(o);
}
MO.FDuiPageSheet_construct = function FDuiPageSheet_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
   o.lsnsSelect = new MO.TListeners();
}
MO.FDuiPageSheet_innerSelect = function FDuiPageSheet_innerSelect(flag){
   var o = this;
   var b = o._parent;
   if(flag && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeSheet._index - 1 == o._index);
   if(o._selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o._selected = flag;
   }
   o._hButton.className = flag ? o.styleName('ButtonSelect') : o.styleName('Button');
   o._hTop.className = flag ? o.styleName('TopSelect') : o.styleName('Top');
   o._hLeft.className = flag ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
   o._hBottomL.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottom.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hBottomR.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
   o._hRight.className = flag ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   MO.Window.Html.visibleSet(o._hForm, flag);
}
MO.FDuiPageSheet_select = function FDuiPageSheet_select(flag){
   var o = this;
   o.innerSelect(flag);
   if(flag){
      o.psRefresh();
      o.psResize();
   }
}
MO.FDuiPageSheet_setVisible = function FDuiPageSheet_setVisible(flag){
   var o = this;
   MO.Window.Html.displaySet(o._hPanel, flag);
}
MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   o.__base.FDuiLayout.dispose.call(o);
}
MO.FDuiPageSheet_innerDump = function FDuiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
MO.FDuiTabBar = function FDuiTabBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._sizeCd          = MO.EUiSize.Horizontal;
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm  = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleDataPanel  = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm   = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   o._styleTop        = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleBottom     = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleForm       = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._buttons          = null;
   o._activeButton     = null;
   o._esize            = MO.EUiSize.Both;
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   o.onBuildPanel      = MO.FDuiTabBar_onBuildPanel;
   o.onBuild           = MO.FDuiTabBar_onBuild;
   o.oeRefresh         = MO.FDuiTabBar_oeRefresh;
   o.construct         = MO.FDuiTabBar_construct;
   o.activeButton      = MO.FDuiTabBar_activeButton;
   o.appendChild       = MO.FDuiTabBar_appendChild;
   o.select            = MO.FDuiTabBar_select;
   o.selectByIndex     = MO.FDuiTabBar_selectByIndex;
   o.selectByName      = MO.FDuiTabBar_selectByName;
   o.sheet             = MO.FDuiTabBar_sheet;
   o.push              = MO.FDuiTabBar_push;
   o.dispose           = MO.FDuiTabBar_dispose;
   return o;
}
MO.FDuiTabBar_onBuildPanel = function FDuiTabBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}
MO.FDuiTabBar_onBuild = function FDuiTabBar_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   var hc = MO.Window.Builder.appendTableRowCell(h, o.styleName('TitlePanel'));
   hc.vAlign = 'bottom';
   var hf = o.hTitleForm = MO.Window.Builder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = MO.Window.Builder.appendTableRow(hf);
   var hr = o._hBottom = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = MO.Window.Builder.appendTableCell(o._hTop);
   hc.width = 20;
   o._hFirst = MO.Window.Builder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', MO.FDuiTabButton);
   var hc = o._hLastTop = MO.Window.Builder.appendTableCell(o._hTop);
   o._hLast = MO.Window.Builder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', MO.FDuiTabButton);
}
MO.FDuiTabBar_oeRefresh = function FDuiTabBar_oeRefresh(p){
   var o = this;
   var r = o.__base.FDuiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      if(o._buttons.count()){
         if(o._activeButton){
            o._activeButton.oeRefresh(e);
         }else{
            var s = o._activeButton = o._buttons.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
MO.FDuiTabBar_construct = function FDuiTabBar_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._buttons = new MO.TDictionary();
}
MO.FDuiTabBar_activeButton = function FDuiTabBar_activeButton(){
   return this._activeButton;
}
MO.FDuiTabBar_appendChild = function FDuiTabBar_appendChild(p){
   var o = this;
   if(MO.Class.isClass(p, MO.FDuiTabButton)){
      var ci = o._hLast.cellIndex;
      var hc = p._hTopL = MO.Window.Builder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hLeft = MO.Window.Builder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      var hc = p._hButtonPanel = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onButtonClick', hc);
      hc.width = 1;
      var hb = p._hButton = MO.Window.Builder.append(hc, 'DIV', p.styleName('Button'));
      if(p.icon){
         p._hIcon = MO.Window.Builder.appendIcon(hb, null, p.icon);
      }
      if(p.label){
         p._hText = MO.Window.Builder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      var hc = p._hRight = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      var hc = p._hBottomL = MO.Window.Builder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      o.selectByIndex(0);
   }
}
MO.FDuiTabBar_sheet = function FDuiTabBar_sheet(p){
   return this._buttons.get(p);
}
MO.FDuiTabBar_select = function FDuiTabBar_select(p){
   var o = this;
   var ss = o._buttons;
   var c = ss.count();
   o._activeButton = p;
   for(var i = 0; i < c; i++){
      var s = o._buttons.value(i);
      if(s != p){
         s.select(false);
      }
   }
   p.select(true);
}
MO.FDuiTabBar_selectByIndex = function FDuiTabBar_selectByIndex(index){
   var o = this;
   var sheet = o._buttons.value(index);
   if(sheet){
      o.select(sheet);
   }
}
MO.FDuiTabBar_selectByName = function FDuiTabBar_selectByName(name){
   var o = this;
   var sheet = o.findControl(name);
   if(sheet){
      o.select(sheet);
   }
}
MO.FDuiTabBar_push = function FDuiTabBar_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.FDuiTabButton)){
      var buttons = o._buttons;
      component._index = buttons.count();
      buttons.set(component.name(), component);
   }
   o.__base.FDuiContainer.push.call(o, component);
}
MO.FDuiTabBar_dispose = function FDuiTabBar_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiTabButton = function FDuiTabButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MListenerClick);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   o._styleTop          = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleTopSelect    = MO.Class.register(o, new MO.AStyle('_styleTopSelect'));
   o._styleLeft         = MO.Class.register(o, new MO.AStyle('_styleLeft'));
   o._styleLeftSelect   = MO.Class.register(o, new MO.AStyle('_styleLeftSelect'));
   o._styleRight        = MO.Class.register(o, new MO.AStyle('_styleRight'));
   o._styleRightSelect  = MO.Class.register(o, new MO.AStyle('_styleRightSelect'));
   o._styleRightPrior   = MO.Class.register(o, new MO.AStyle('_styleRightPrior'));
   o._styleButtom       = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleBottomSelect = MO.Class.register(o, new MO.AStyle('_styleBottomSelect'));
   o._styleButtonText   = MO.Class.register(o, new MO.AStyle('_styleButtonText'));
   o._styleButton       = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._styleButtonHover  = MO.Class.register(o, new MO.AStyle('_styleButtonHover'));
   o._styleButtonSelect = MO.Class.register(o, new MO.AStyle('_styleButtonSelect'));
   o._styleDataPanel    = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
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
   o.onBuildPanel       = MO.FDuiTabButton_onBuildPanel;
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiTabButton_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiTabButton_onButtonLeave);
   o.onButtonClick      = MO.Class.register(o, new MO.AEventClick('onButtonClick'), MO.FDuiTabButton_onButtonClick);
   o.construct          = MO.FDuiTabButton_construct;
   o.innerSelect        = MO.FDuiTabButton_innerSelect;
   o.select             = MO.FDuiTabButton_select;
   o.setVisible         = MO.FDuiTabButton_setVisible;
   o.doClick            = MO.FDuiTabButton_doClick;
   o.dispose            = MO.FDuiTabButton_dispose
   o.innerDump          = MO.FDuiTabButton_innerDump;
   return o;
}
MO.FDuiTabButton_onBuildPanel = function FDuiTabButton_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = MO.Window.Builder.createDiv(p);
   hp.width = '100%';
   hp.height = '100%';
}
MO.FDuiTabButton_onButtonEnter = function FDuiTabButton_onButtonEnter(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('ButtonHover');
   }
}
MO.FDuiTabButton_onButtonLeave = function FDuiTabButton_onButtonLeave(p){
   var o = this;
   if(!o._selected){
      o._hButton.className = o.styleName('Button');
   }
}
MO.FDuiTabButton_onButtonClick = function FDuiTabButton_onButtonClick(p){
   this.doClick();
}
MO.FDuiTabButton_construct = function FDuiTabButton_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o.lsnsSelect = new MO.TListeners();
}
MO.FDuiTabButton_innerSelect = function FDuiTabButton_innerSelect(p){
   var o = this;
   var b = o._parent;
   if(p && !o._hasBuilded){
      o._hasBuilded = true;
   }
   var first = (o._index == 0);
   var prior = (b._activeButton._index - 1 == o._index);
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
}
MO.FDuiTabButton_select = function FDuiTabButton_select(p){
   var o = this;
   o.innerSelect(p);
   if(p){
      o.psRefresh();
      o.psResize();
   }
}
MO.FDuiTabButton_setVisible = function FDuiTabButton_setVisible(p){
   var o = this;
   MO.Window.Html.displaySet(o._hPanel, p);
}
MO.FDuiTabButton_doClick = function FDuiTabButton_doClick(){
   var o = this;
   o._parent.select(o);
   var e = new MO.SClickEvent(o);
   o.processClickListener(e);
   e.dispose();
}
MO.FDuiTabButton_dispose = function FDuiTabButton_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiTabButton_innerDump = function FDuiTabButton_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
MO.EDuiTreeNodeGroup = new function EDuiTreeNodeGroup(){
   var o = this;
   o.Container = 'container';
   o.Item      = 'item';
   return o;
}
MO.FDuiTreeColumn = function FDuiTreeColumn(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._icon        = MO.Class.register(o, new MO.APtyString('_icon'));
   o._dataName    = MO.Class.register(o, new MO.APtyString('_dataName'));
   o._display     = MO.Class.register(o, new MO.APtyBoolean('_display'), MO.EBoolean.False);
   o._config      = MO.Class.register(o, new MO.APtyConfig('_config'));
   o.oeBuild      = MO.FDuiTreeColumn_oeBuild;
   o.onBuildPanel = MO.FDuiTreeColumn_onBuildPanel;
   return o;
}
MO.FDuiTreeColumn_oeBuild = function FDuiTreeColumn_oeBuild(event){
   var o = this;
   o.__base.FDuiControl.oeBuild.call(o, event);
   var hPanel = o._hPanel;
   hPanel.innerText = MO.Lang.String.nvl(o.label);
   hPanel.noWrap = true;
   if(!o.display){
      hPanel.style.display = 'block';
   }
   if(o.width){
      hPanel.width = o.width;
   }
   return MO.EEventStatus.Stop;
}
MO.FDuiTreeColumn_onBuildPanel = function FDuiTreeColumn_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'TD');
}
MO.FDuiTreeLevel = function FDuiTreeLevel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._id        = MO.Class.register(o, new MO.APtyString('_id'));
   o._color     = MO.Class.register(o, new MO.APtyString('_color'));
   o._backColor = MO.Class.register(o, new MO.APtyString('_backColor'));
   return o;
}
MO.FDuiTreeNode = function FDuiTreeNode(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataProperties);
   o._valid            = MO.Class.register(o, new MO.APtyBoolean('_valid', 'is_valid'), true);
   o._child            = MO.Class.register(o, new MO.APtyBoolean('_child', 'has_child'), false);
   o._typeGroup        = MO.Class.register(o, [new MO.APtyString('_typeGroup'), new MO.AGetSet('_typeGroup')]);
   o._typeCode         = MO.Class.register(o, [new MO.APtyString('_typeCode'), new MO.AGetter('_typeCode')]);
   o._code             = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._icon             = MO.Class.register(o, new MO.APtyString('_icon'));
   o._checked          = MO.Class.register(o, new MO.APtyBoolean('_checked'), false);
   o._extended         = MO.Class.register(o, new MO.APtyBoolean('_extended'), false);
   o._note             = MO.Class.register(o, new MO.APtyString('_note'));
   o._styleNormal      = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover       = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect      = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleImage       = MO.Class.register(o, new MO.AStyle('_styleImage'));
   o._styleIcon        = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleIconDisable = MO.Class.register(o, new MO.AStyle('_styleIconDisable'));
   o._styleLabel       = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleCell        = MO.Class.register(o, new MO.AStyle('_styleCell'));
   o._tree             = MO.Class.register(o, new MO.AGetSet('_tree'));
   o._level            = MO.Class.register(o, new MO.AGetter('_level'), 0);
   o._nodes            = MO.Class.register(o, new MO.AGetter('_nodes'));
   o._cells            = MO.Class.register(o, new MO.AGetter('_cells'));
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
   o.onBuildPanel      = MO.FDuiTreeNode_onBuildPanel;
   o.onBuild           = MO.FDuiTreeNode_onBuild;
   o.onNodeEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onNodeEnter'), MO.FDuiTreeNode_onNodeEnter);
   o.onNodeLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onNodeLeave'), MO.FDuiTreeNode_onNodeLeave);
   o.onNodeClick       = MO.Class.register(o, new MO.AEventClick('onNodeClick'), MO.FDuiTreeNode_onNodeClick);
   o.construct         = MO.FDuiTreeNode_construct;
   o.type              = MO.FDuiTreeNode_type;
   o.setTypeCode       = MO.FDuiTreeNode_setTypeCode;
   o.setLabel          = MO.FDuiTreeNode_setLabel;
   o.setNote           = MO.FDuiTreeNode_setNote;
   o.setLevel          = MO.FDuiTreeNode_setLevel;
   o.cell              = MO.FDuiTreeNode_cell;
   o.check             = MO.FDuiTreeNode_check;
   o.setCheck          = MO.FDuiTreeNode_setCheck;
   o.setImage          = MO.FDuiTreeNode_setImage;
   o.calculateImage    = MO.FDuiTreeNode_calculateImage;
   o.setIcon           = MO.FDuiTreeNode_setIcon;
   o.get               = MO.FDuiTreeNode_get;
   o.set               = MO.FDuiTreeNode_set;
   o.isFolder          = MO.FDuiTreeNode_isFolder;
   o.hasChild          = MO.FDuiTreeNode_hasChild;
   o.topNode           = MO.FDuiTreeNode_topNode;
   o.topNodeByType     = MO.FDuiTreeNode_topNodeByType;
   o.nodeCount         = MO.FDuiTreeNode_nodeCount;
   o.show              = MO.FDuiTreeNode_show;
   o.hide              = MO.FDuiTreeNode_hide;
   o.select            = MO.FDuiTreeNode_select;
   o.extend            = MO.FDuiTreeNode_extend;
   o.extendAll         = MO.FDuiTreeNode_extendAll;
   o.searchLast        = MO.FDuiTreeNode_searchLast;
   o.createChild       = MO.FDuiTreeNode_createChild;
   o.appendChild       = MO.FDuiTreeNode_appendChild;
   o.appendNode        = MO.FDuiTreeNode_appendNode;
   o.push              = MO.FDuiTreeNode_push;
   o.remove            = MO.FDuiTreeNode_remove;
   o.removeSelf        = MO.FDuiTreeNode_removeSelf;
   o.removeChildren    = MO.FDuiTreeNode_removeChildren;
   o.reset             = MO.FDuiTreeNode_reset;
   o.click             = MO.FDuiTreeNode_click;
   o.refreshStyle      = MO.FDuiTreeNode_refreshStyle;
   o.propertyLoad      = MO.FDuiTreeNode_propertyLoad;
   o.propertySave      = MO.FDuiTreeNode_propertySave;
   o.loadConfig        = MO.FDuiTreeNode_loadConfig;
   o.dispose           = MO.FDuiTreeNode_dispose;
   o.innerDump         = MO.FDuiTreeNode_innerDump;
   return o;
}
MO.FDuiTreeNode_onBuildPanel = function FDuiTreeNode_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
}
MO.FDuiTreeNode_onBuild = function FDuiTreeNode_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FDuiContainer.onBuild.call(o, p);
   var hp = o._hPanel;
   o.attachEvent('onNodeEnter', hp, o.onNodeEnter);
   o.attachEvent('onNodeLeave', hp, o.onNodeLeave);
   o.attachEvent('onNodeClick', hp);
   var hnp = o._hNodePanel = MO.Window.Builder.appendTableCell(hp, o.styleName('Normal'));
   hnp.noWrap = true;
   var hi = o._hImage = MO.Window.Builder.appendIcon(hnp, o.styleName('Image'), null, 16, 16);
   hi._linkType = 'image';
   o.setImage();
   var hi = o._hIcon = MO.Window.Builder.appendIcon(hnp, null, null, 16, 16)
   hi._linkType = 'icon';
   o.setIcon(o._icon);
   if(t.dispChecked){
      var hc = o._hCheck = MO.Window.Builder.appendCheck(hnp);
      hc.width = 13;
      hc.height = 13;
      hc.style.borderWidth = 0;
      o.setCheck(o._checked);
      t.linkEvent(o, 'onNodeCheckClick', hc);
   }
   o._hLabel = MO.Window.Builder.appendText(hnp, o.styleName('Label'));
   o.setLabel(o._label);
   var cs = t._nodeColumns;
   if(cs){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.value(n);
         var nc = MO.Class.create(MO.FDuiTreeNodeCell);
         nc._column = c;
         nc.build(p);
         o.push(nc);
      }
   }
}
MO.FDuiTreeNode_onNodeEnter = function FDuiTreeNode_onNodeEnter(e){
   var o = this;
   var t = o._tree;
   if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
      o._statusHover = true;
      o.refreshStyle();
      t.lsnsEnter.process(t, o);
   }
}
MO.FDuiTreeNode_onNodeLeave = function FDuiTreeNode_onNodeLeave(event){
   var o = this;
   var tree = o._tree;
   if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
      o._statusHover = false;
      o.refreshStyle();
      tree.lsnsLeave.process(tree, o);
   }
}
MO.FDuiTreeNode_onNodeClick = function FDuiTreeNode_onNodeClick(event){
   var o = this;
   var tree = o._tree;
   var esn = event.hSender.tagName;
   if('INPUT' == esn){
      return;
   }
   var isImg = false;
   if('IMG' == esn){
      isImg = ('image' == event.hSender._linkType);
   }
   var isParent = false;
   var find = tree._focusNode;
   while(find){
      if(find == o){
         isParent = true;
         break;
      }
      find = find.parent;
   }
   if(!isImg || (isImg && (isParent || !o._child))){
      tree.selectNode(o, true);
   }
   if(!o._statusLoaded && o._child){
      o.extend(true);
      if(!isImg){
         tree.nodeClick(o);
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
         tree.nodeClick(o);
      }
   }
}
MO.FDuiTreeNode_construct = function FDuiTreeNode_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
}
MO.FDuiTreeNode_type = function FDuiTreeNode_type(){
   var o = this;
   var tree = o._tree;
   var typeCode = o._typeCode;
   var type = null;
   if(!MO.Lang.String.isEmpty(typeCode)){
      type = tree.findType(typeCode);
   }
   return type;
}
MO.FDuiTreeNode_setTypeCode = function FDuiTreeNode_setTypeCode(value){
   var o = this;
   o._typeCode = value;
   o.setIcon();
}
MO.FDuiTreeNode_setLabel = function FDuiTreeNode_setLabel(p){
   var o = this;
   o.__base.FDuiContainer.setLabel.call(o, p)
   var h = o._hLabel;
   if(h){
      var s = '';
      if(!MO.Lang.String.isEmpty(o._label)){
         s = '&nbsp;' + o._label;
      }
      if(!MO.Lang.String.isEmpty(o._tag)){
         s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
      }
      if(!MO.Lang.String.isEmpty(o._note)){
         s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
      }
      h.innerHTML = s;
   }
}
MO.FDuiTreeNode_setNote = function FDuiTreeNode_setNote(p){
   var o = this;
   o._note = MO.Lang.String.empty(p);
   o.setLabel(o._label);
}
MO.FDuiTreeNode_setLevel = function FDuiTreeNode_setLevel(level){
   var o = this;
   o._level = level;
   var hPanel = o._hNodePanel;
   if(hPanel){
      hPanel.style.paddingLeft = (o._tree._indent * level) + 'px';
   }
}
MO.FDuiTreeNode_cell = function FDuiTreeNode_cell(p){
   return this._cells.get(p);
}
MO.FDuiTreeNode_check = function FDuiTreeNode_check(){
   return this._checked;
}
MO.FDuiTreeNode_setCheck = function FDuiTreeNode_setCheck(p){
   var o = this;
   o._checked = p;
   var attributes = o._attributes;
   if(attributes){
      var value = attributes.get('checked');
      if(!MO.Lang.String.isEmpty(value)){
        o._checked = MO.Lang.Boolean.isTrue(value);
        if(o._hCheck){
            o._hCheck._checked = o._checked;
        }
      }
   }
}
MO.FDuiTreeNode_setImage = function FDuiTreeNode_setImage(){
   var o = this;
   var tree = o._tree;
   var hImage = o._hImage;
   var icon = o._child ? tree._iconPlus : tree._iconNode;
   hImage.src = MO.RResource.iconPath(icon);
}
MO.FDuiTreeNode_calculateImage = function FDuiTreeNode_calculateImage(){
   var o = this;
   var tree = o._tree;
   var hImage = o._hImage;
   var icon = null;
   var count = o.nodeCount();
   if(count){
      icon = o._extended ? tree._iconMinus : tree._iconPlus;
   }else{
      icon = tree._iconNode;
   }
   hImage.src = MO.RResource.iconPath(icon);
}
MO.FDuiTreeNode_setIcon = function FDuiTreeNode_setIcon(icon){
   var o = this;
   o._icon = icon;
   var hIcon = o._hIcon;
   if(hIcon){
      var iconPath = null;
      if(o._icon){
         iconPath = icon;
      }else{
         var type = o.type();
         if(type){
            iconPath = type.icon();
         }
      }
      if(iconPath){
         MO.Window.Html.displaySet(hIcon, true);
         hIcon.style.width = 16;
         hIcon.style.height = 16;
         hIcon.className = o._valid ? o.styleName('Icon') : o.styleName('IconDisable');
         hIcon.src = MO.RResource.iconPath(iconPath);
      }else{
         MO.Window.Html.displaySet(hIcon, false);
      }
   }
}
MO.FDuiTreeNode_get = function FDuiTreeNode_get(n){
   return this._attributes.get(n);
}
MO.FDuiTreeNode_set = function FDuiTreeNode_set(n, v){
   this._attributes.set(n, v);
}
MO.FDuiTreeNode_isFolder = function FDuiTreeNode_isFolder(){
   var o = this;
   var type = o.type();
   if(type){
      var storage = type.storage()
      return storage == 'collections';
   }
   return false;
}
MO.FDuiTreeNode_hasChild = function FDuiTreeNode_hasChild(){
   var o = this;
   if(o._child){
      var ns = o._nodes;
      if(ns){
         return !ns.isEmpty();
      }
   }
   return false;
}
MO.FDuiTreeNode_topNode = function FDuiTreeNode_topNode(){
   var r = this;
   while(r._parent){
      if(MO.Class.isClass(r._parent, FDuiTreeNode)){
         r = r._parent;
      }else{
         break;
      }
   }
   return r;
}
MO.FDuiTreeNode_topNodeByType = function FDuiTreeNode_topNodeByType(t){
   var r = this;
   while(r){
      if(r._typeCode == t){
         return r;
      }
      r = r._parent;
   }
   return null;
}
MO.FDuiTreeNode_nodeCount = function FDuiTreeNode_nodeCount(){
   var o = this;
   var nodes = o._nodes
   if(nodes){
      return nodes.count();
   }
   return 0;
}
MO.FDuiTreeNode_show = function FDuiTreeNode_show(){
   var o = this;
   var tree = o._tree;
   MO.Window.Html.visibleSet(o._hPanel, true);
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = 0; i < count; i++){
         var node = nodes.at(i);
         if(!node._statusLinked){
            tree.appendNode(node, o);
         }
         if(node._statusDisplay){
            MO.Window.Html.visibleSet(node._hPanel, true);
            if(node._extended){
               node.show();
            }
         }
      }
   }
}
MO.FDuiTreeNode_hide = function FDuiTreeNode_hide(){
   var o = this;
   var t = o._tree;
   if(o._hPanel){
      MO.Window.Html.visibleSet(o._hPanel, false);
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
MO.FDuiTreeNode_select = function FDuiTreeNode_select(v){
   var o = this;
   o._statusSelected = v;
   if(v){
      o._statusHover = false;
   }
   o.refreshStyle();
}
MO.FDuiTreeNode_extend = function FDuiTreeNode_extend(p){
   var o = this;
   var t = o._tree;
   if(!o._statusLoaded && o._child){
      if(t.__loading){
         return;
      }
      t.loadNode(o);
   }else{
      if(o._hImage && !o.hasChild()){
         o._hImage.src = MO.RResource.iconPath(t._iconNode);
         return false;
      }
      o._extended = p;
      if(o._child && o._hImage){
         o._hImage.src = MO.RResource.iconPath(p ? t._iconMinus : t._iconPlus);
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
MO.FDuiTreeNode_extendAll = function FDuiTreeNode_extendAll(p){
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
MO.FDuiTreeNode_searchLast = function FDuiTreeNode_searchLast(){
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
MO.FDuiTreeNode_createChild = function FDuiTreeNode_createChild(x){
   var r = null;
   if(x.isName('Node') || x.isName('TreeNode')){
      r = MO.Class.create(FDuiTreeNode);
      r._tree = this._tree;
   }
   return r;
}
MO.FDuiTreeNode_appendChild = function FDuiTreeNode_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FDuiTreeNodeCell)){
      o._hPanel.appendChild(control._hPanel);
   }
}
MO.FDuiTreeNode_appendNode = function FDuiTreeNode_appendNode(p){
   var o = this;
   var t = o._tree;
   o.push(p);
   t.appendNode(p, o);
   o.extend(true);
}
MO.FDuiTreeNode_push = function FDuiTreeNode_push(component){
   var o = this;
   var tree = o._tree;
   o.__base.FDuiContainer.push.call(o, component);
   if(MO.Class.isClass(component, MO.FDuiTreeNode)){
      o._child = true;
      o._statusLoaded = true;
      var nodes = o._nodes;
      if(!nodes){
         nodes = o._nodes = new MO.TObjects();
      }
      component._tree = tree;
      component._parent = o;
      nodes.push(component);
      tree._allNodes.pushUnique(component);
   }
   if(MO.Class.isClass(component, MO.FDuiTreeNodeCell)){
      var cells = o._cells;
      if(!cells){
         cells = o._cells = new MO.TDictionary();
      }
      component._parent = o;
      component._tree = tree;
      component._node = o;
      cells.set(component._column._name, component);
   }
}
MO.FDuiTreeNode_remove = function FDuiTreeNode_remove(component){
   var o = this;
   if(MO.Class.isClass(component, FDuiTreeNode)){
      o._nodes.remove(component);
   }
   o.__base.FDuiContainer.remove.call(o, component);
}
MO.FDuiTreeNode_removeSelf = function FDuiTreeNode_removeSelf(){
   var o = this;
   var tree = o._tree;
   if(o._statusLinked){
      o.removeChildren();
      var parent = o._parent;
      if(MO.Class.isClass(parent, FDuiTreeNode)){
         parent.remove(o);
         parent.calculateImage();
      }
      tree.freeNode(o);
   }
}
MO.FDuiTreeNode_removeChildren = function FDuiTreeNode_removeChildren(){
   var nodes = this._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         var node = nodes.get(i);
         if(node){
            node.removeSelf();
         }
      }
      nodes.clear();
   }
}
MO.FDuiTreeNode_reset = function FDuiTreeNode_reset(){
   var o = this;
   o._typeCode = null;
   o._guid = null;
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
MO.FDuiTreeNode_click = function FDuiTreeNode_click(){
   var o = this;
   var tree = o._tree;
   tree.selectNode(o, true);
   tree.nodeClick(o);
}
MO.FDuiTreeNode_refreshStyle = function FDuiTreeNode_refreshStyle(){
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
MO.FDuiTreeNode_propertyLoad = function FDuiTreeNode_propertyLoad(x){
   var o = this;
   var t = o._tree;
   o.__base.FDuiContainer.propertyLoad.call(o, x);
   var attributes = o._attributes;
   if(attributes){
      attributes.append(x.attrs);
   }
   var ap = x.get('attributes')
   if(ap){
      o._attributes.unpack(ap);
   }
}
MO.FDuiTreeNode_propertySave = function FDuiTreeNode_propertySave(x){
   var o = this;
   o.__base.FDuiContainer.propertySave.call(o, x);
   var t = o.type();
   x.set('type_code', t._code);
   x.set('storage', t._storage);
}
MO.FDuiTreeNode_loadConfig = function FDuiTreeNode_loadConfig(x){
   var o = this;
   o.reset();
   o.propertyLoad(x);
   o.setLabel(o._label);
   o.setCheck(o._checked);
   o.setImage();
   o.setIcon(o._icon);
}
MO.FDuiTreeNode_dispose = function FDuiTreeNode_dispose(){
   var o = this;
   o._hNodePanel = null;
   o._hImage = null;
   o._hIcon = null;
   o._hCheck = null;
   o._hLabel = null;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiTreeNode_innerDump = function FDuiTreeNode_innerDump(s){
   var o = this;
   s.append(RClass.name(o));
   s.append('[level=',  o._level);
   if(o._typeCode){
      s.append(' type=',  o._typeCode.name);
   }
   s.append(', icon=',  o._icon);
   s.append(', caption=', o._label);
   s.append(', child=', o._child);
   s.append(']');
}
MO.FDuiTreeNode_reload = function FDuiTreeNode_reload(t){
   var o = this;
   if(t){
      o._tree.reload();
   }else{
      o._tree.reloadNode(o);
   }
}
MO.FDuiTreeNode_reloadParent = function FDuiTreeNode_reloadParent(){
   var o = this;
   if(o.parentNode){
      o._tree.reloadNode(o.parentNode);
   }else{
      o._tree.reload();
   }
}
MO.FDuiTreeNode_loadQuery = function FDuiTreeNode_loadQuery(x){
   var o = this;
   var sl = MO.Lang.String.nvl(x.get('label'), o._label);
   var sn = MO.Lang.String.nvl(x.get('note'), o._note);
   var text = '&nbsp;' + sl;
   if(!MO.Lang.String.isEmpty(sn)){
      text += '&nbsp;<FONT color=green>[ ' + sn + ' ]</FONT>';
   }
   o._hLabel.innerHTML = text;
   if(x.contains('visible')){
      o._statusDisplay = RBool.isTrue(x.get('visible'));
      o.setVisible(o._statusDisplay);
   }
}
MO.FDuiTreeNode_findByName = function FDuiTreeNode_findByName(n){
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
MO.FDuiTreeNode_findByUuid = function FDuiTreeNode_findByUuid(u){
   var o = this;
   if(o._guid == u){
      return o;
   }
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c){
            if(c._guid == u){
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
MO.FDuiTreeNode_pushChanged = function FDuiTreeNode_pushChanged(trd){
   var o = this;
    var d = new MO.TNode();
    d.attrs = o._attributes;
    if(d.attrs){
         d.attrs.set('checked', MO.Lang.Boolean.toString(o.check()));
    }
    trd.push(d);
   if(o.components && o.components.count > 0){
      var cc = o.components.count;
      for(var n = 0; n < cc; n++){
         var c = o.components.value(n);
         if(MO.Class.isClass(c, FDuiTreeNode)){
            c.pushChanged(trd);
         }
      }
   }
}
MO.FDuiTreeNode_checkChanged = function FDuiTreeNode_checkChanged(){
   var o = this;
   if(o._checked != o.check()){
      return true;
   }
   return false;
}
MO.FDuiTreeNode_getFullPath = function FDuiTreeNode_getFullPath(){
   var o = this;
   var path = '';
   if(o._label){
       path = o._label;
   }
    if(o.parent){
       var s = o.parent.getFullPath();
       if(!MO.Lang.String.isEmpty(s)){
           path = s + "/" + path;
       }
    }
    return path;
}
MO.FDuiTreeNodeCell = function FDuiTreeNodeCell(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   o._stylePanel           = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleCell            = MO.Class.register(o, new MO.AStyle('_styleCell', 'Cell'));
   o._tree                 = null;
   o._column               = null;
   o._level                = 0;
   o._node                 = null;
   o._listenersClick       = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   o._listenersDoubleClick = MO.Class.register(o, new MO.AListener('_listenersDoubleClick', MO.EEvent.DoubleClick));
   o._hImage               = null;
   o._hIcon                = null;
   o._hLabel               = null;
   o.onBuildPanel          = MO.FDuiTreeNodeCell_onBuildPanel;
   o.onBuild               = MO.FDuiTreeNodeCell_onBuild;
   o.onClick               = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeNodeCell_onClick);
   o.onDoubleClick         = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiTreeNodeCell_onDoubleClick);
   o.construct             = MO.FDuiTreeNodeCell_construct;
   o.icon                  = MO.FDuiTreeNodeCell_icon;
   o.setIcon               = MO.FDuiTreeNodeCell_setIcon;
   o.get                   = MO.FDuiTreeNodeCell_get;
   o.set                   = MO.FDuiTreeNodeCell_set;
   return o;
}
MO.FDuiTreeNodeCell_onBuildPanel = function FDuiTreeNodeCell_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
}
MO.FDuiTreeNodeCell_onBuild = function FDuiTreeNodeCell_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FDuiControl.onBuild.call(o, p);
   var h = o._hPanel;
   o.attachEvent('onClick', h);
   o.attachEvent('onDoubleClick', h);
}
MO.FDuiTreeNodeCell_onClick = function FDuiTreeNodeCell_onClick(event){
   var o = this;
   event.treeNode = o._node;
   event.treeColumn = o._column;
   event.treeNodeCell = o;
   o.processClickListener(p);
}
MO.FDuiTreeNodeCell_onDoubleClick = function FDuiTreeNodeCell_onDoubleClick(event){
   var o = this;
   event.treeNode = o._node;
   event.treeColumn = o._column;
   event.treeNodeCell = o;
   o.processDoubleClickListener(p);
}
MO.FDuiTreeNodeCell_construct = function FDuiTreeNodeCell_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._attributes = new MO.TAttributes();
}
MO.FDuiTreeNodeCell_icon = function FDuiTreeNodeCell_icon(){
   return o._icon;
}
MO.FDuiTreeNodeCell_setIcon = function FDuiTreeNodeCell_setIcon(p){
   var o = this;
   var h = o._hIcon;
   if(!h){
      h = o._hIcon = MO.Window.Builder.appendIcon(o._hPanel, null, null, 16, 16)
   }
   h.src = MO.RResource.iconPath(p);
}
MO.FDuiTreeNodeCell_get = function FDuiTreeNodeCell_get(){
}
MO.FDuiTreeNodeCell_set = function FDuiTreeNodeCell_set(p){
}
MO.FDuiTreeNodeType = function FDuiTreeNodeType(o){
   o = MO.Class.inherits(this, o, MO.FDuiComponent);
   o._code       = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._storage    = MO.Class.register(o, [new MO.APtyString('_storage'), new MO.AGetSet('_storage')]);
   o._icon       = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetSet('_icon')]);
   o._service    = MO.Class.register(o, [new MO.APtyString('_service'), new MO.AGetSet('_service')]);
   o._action     = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetSet('_action')]);
   o.construct   = MO.FDuiTreeNodeType_construct;
   o.get         = MO.FDuiTreeNodeType_get;
   o.set         = MO.FDuiTreeNodeType_set;
   o.innerDump   = MO.FDuiTreeNodeType_innerDump;
   return o;
}
MO.FDuiTreeNodeType_construct = function FDuiTreeNodeType_construct(){
   var o = this;
   o.__base.FDuiComponent.construct.call(o);
}
MO.FDuiTreeNodeType_get = function FDuiTreeNodeType_get(name){
   var attributes = this._attributes;
   return attributes ? attributes.get(name) : null;
}
MO.FDuiTreeNodeType_set = function FDuiTreeNodeType_set(name, value){
   var attributes = this._attributes;
   if(attributes){
      attributes.set(name, value)
   }
}
MO.FDuiTreeNodeType_innerDump = function FDuiTreeNodeType_innerDump(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append('[code=',  o._code);
   info.append(', icon=',  o._icon);
   info.append(', service=', o._service);
   info.append(', action=', o._action);
   info.append(']');
}
MO.FDuiTreeView = function FDuiTreeView(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._optionCheck        = MO.Class.register(o, new MO.APtyBoolean('_optionCheck'), false);
   o._indent             = MO.Class.register(o, new MO.APtyInteger('_indent'), 16);
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel', 'Panel'));
   o._styleNodePanel     = MO.Class.register(o, new MO.AStyle('_styleNodePanel', 'NodePanel'));
   o._styleNodeForm      = MO.Class.register(o, new MO.AStyle('_styleNodeForm', 'NodeForm'));
   o._attributes         = MO.Class.register(o, new MO.AGetter('_attributes'));
   o._nodeTypes          = MO.Class.register(o, new MO.AGetter('_nodeTypes'));
   o._nodeColumns        = MO.Class.register(o, new MO.AGetter('_nodeColumns'));
   o._nodeLevels         = MO.Class.register(o, new MO.AGetter('_nodeLevels'));
   o._nodes              = MO.Class.register(o, new MO.AGetter('_nodes'));
   o._allNodes           = null;
   o._defaultNodeType    = null;
   o._focusNode          = MO.Class.register(o, new MO.AGetter('_focusNode'));
   o._loadingNode        = null;
   o._freeNodes          = null;
   o._iconPlus           = 'control.treeview.plus';
   o._iconMinus          = 'control.treeview.minus';
   o._iconNode           = 'control.treeview.node';
   o._iconLoading        = 'control.treeview.loading';
   o._hNodePanel         = null;
   o._hNodeForm          = null;
   o._hHeadLine          = null;
   o._hNodeRows          = null;
   o.lsnsEnter           = new MO.TListeners();
   o.lsnsLeave           = new MO.TListeners();
   o._listenersNodeClick = MO.Class.register(o, new MO.AListener('_listenersNodeClick', MO.EEvent.NodeClick));
   o.onBuildPanel        = MO.FDuiTreeView_onBuildPanel;
   o.onBuild             = MO.FDuiTreeView_onBuild;
   o.onNodeClick         = MO.FDuiTreeView_onNodeClick;
   o.onClick             = MO.Class.register(o, new MO.AEventClick('onClick'), MO.FDuiTreeView_onClick);
   o.onNodeCheckClick    = MO.Class.register(o, new MO.AEventClick('onNodeCheckClick'), MO.FDuiTreeView_onNodeCheckClick);
   o.construct           = MO.FDuiTreeView_construct;
   o.hasNode             = MO.FDuiTreeView_hasNode;
   o.findType            = MO.FDuiTreeView_findType;
   o.findByName          = MO.FDuiTreeView_findByName;
   o.findByGuid          = MO.FDuiTreeView_findByGuid;
   o.createChild         = MO.FDuiTreeView_createChild;
   o.createNode          = MO.FDuiTreeView_createNode;
   o.appendChild         = MO.FDuiTreeView_appendChild;
   o.appendNode          = MO.FDuiTreeView_appendNode;
   o.appendNodes         = MO.FDuiTreeView_appendNodes;
   o.selectNode          = MO.FDuiTreeView_selectNode;
   o.push                = MO.FDuiTreeView_push;
   o.removeNode          = MO.FDuiTreeView_removeNode;
   o.removeNodes         = MO.FDuiTreeView_removeNodes;
   o.freeNode            = MO.FDuiTreeView_freeNode;
   o.clearNodes          = MO.FDuiTreeView_clearNodes;
   o.nodeClick           = MO.FDuiTreeView_nodeClick;
   o.calculateHeight     = MO.FDuiTreeView_calculateHeight;
   o.fetchChangedChecks  = MO.FDuiTreeView_fetchChangedChecks;
   o.extendAuto          = MO.FDuiTreeView_extendAuto;
   o.extendAll           = MO.FDuiTreeView_extendAll;
   o.loadNode            = MO.Method.empty;
   o.refresh             = MO.FDuiTreeView_refresh;
   o.filterNode          = MO.FDuiTreeView_filterNode;
   o.clearAllNodes       = MO.FDuiTreeView_clearAllNodes;
   o.clear               = MO.FDuiTreeView_clear;
   o.dispose             = MO.FDuiTreeView_dispose;
   return o;
}
MO.FDuiTreeView_onBuildPanel = function FDuiTreeView_onBuildPanel(e){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(e.hDocument, o.styleName('Panel'));
}
MO.FDuiTreeView_onBuild = function FDuiTreeView_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hPanel = o._hPanel;
   o.attachEvent('onClick', hPanel);
   var hr = MO.Window.Builder.appendTableRow(o._hPanel);
   var hc = MO.Window.Builder.appendTableCell(hr);
   var hnp = o._hNodePanel = MO.Window.Builder.appendDiv(hc, o.styleName('NodePanel'));
   var hnf = o._hNodeForm = MO.Window.Builder.appendTable(hnp, o.styleName('NodeForm'));
   hnf.width = '100%';
   o._hHeadLine = MO.Window.Builder.appendTableRow(hnf);
   o._hNodeRows = hnf.children[0];
   var node = o._loadingNode = MO.Class.create(MO.FDuiTreeNode);
   node._tree = o;
   node._label = MO.RContext.get('FDuiTreeView:loading');
   node._icon = o._iconLoading;
   node.build(event);
   var ns = o._nodes;
   if(!ns.isEmpty()){
      var nc = ns.count();
      for(var i = 0; i < nc; i++){
         o.appendNode(ns.get(i));
      }
   }
   o.extendAuto();
}
MO.FDuiTreeView_onNodeClick = function FDuiTreeView_onNodeClick(event){
   var o = this;
}
MO.FDuiTreeView_onClick = function FDuiTreeView_onClick(s, e){
   var o = this;
   if(s.hSender == o._hNodePanel){
      var node = o._focusNode;
      if(node){
         node.select(false);
         o._focusNode = null;
      }
   }
}
MO.FDuiTreeView_onNodeCheckClick = function FDuiTreeView_onNodeCheckClick(s, e){
   var o = this;
   if(s && MO.Class.isClass(s, FDuiTreeNode)){
      var f = s.check();
      var cs = s.controls;
      if(cs){
         for(var n = 0; n < cs.count; n++){
            var nd = cs.value(n);
            if(nd && MO.Class.isClass(nd, FDuiTreeNode)){
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
            for(var n = 0; n < pcc; n++){
              var pnd = pcs.value(n);
               if(pnd && MO.Class.isClass(pnd, FDuiTreeNode)){
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
MO.FDuiTreeView_construct = function FDuiTreeView_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._attributes = new MO.TAttributes();
   o._nodeTypes = new MO.TDictionary();
   o._nodeColumns = new MO.TDictionary();
   o._nodeLevels = new MO.TDictionary();
   o._nodes = new MO.TObjects();
   o._allNodes = new MO.TObjects();
   o._freeNodes = new MO.TObjects();
   o._defaultNodeType = MO.Class.create(MO.FDuiTreeNodeType);
}
MO.FDuiTreeView_hasNode = function FDuiTreeView_hasNode(){
   return this._rootNode.hasChild();
}
MO.FDuiTreeView_findType = function FDuiTreeView_findType(p){
   return this._nodeTypes.get(p);
}
MO.FDuiTreeView_findByName = function FDuiTreeView_findByName(p){
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
MO.FDuiTreeView_findByGuid = function FDuiTreeView_findByGuid(guid){
   var o = this;
   var nodes = o._allNodes;
   var count = nodes.count();
   if(count){
      for(var i = 0; i < count; i++){
         var node = nodes.getAt(i);
         if(node._guid == guid){
            return node;
         }
      }
   }
}
MO.FDuiTreeView_createChild = function FDuiTreeView_createChild(x){
   var o = this;
   var r = null;
   var n = x.name();
   switch(n){
      case 'TreeColumn':
         r = MO.Class.create(MO.FDuiTreeColumn);
         break;
      case 'TreeLevel':
         r = MO.Class.create(MO.FDuiTreeLevel);
         break;
      case 'TreeNodeType':
         r = MO.Class.create(MO.FDuiTreeNodeType);
         break;
      case 'TreeNode':
         r = MO.Class.create(MO.FDuiTreeNode);
         break;
      default:
         throw new MO.TError(o, 'Unknown child type. (config={1})', x.xml());
   }
   r._tree = o;
   return r;
}
MO.FDuiTreeView_appendChild = function FDuiTreeView_appendChild(child){
   var o = this;
}
MO.FDuiTreeView_createNode = function FDuiTreeView_createNode(){
   var o = this;
   var node = o._freeNodes.pop();
   if(!node){
      node = MO.Class.create(MO.FDuiTreeNode);
      node._tree = o;
      node.build(o._hPanel);
   }
   MO.Window.Html.visibleSet(node._hPanel, true);
   o._allNodes.push(node);
   return node;
}
MO.FDuiTreeView_appendNode = function FDuiTreeView_appendNode(node, parent){
   var o = this;
   if(node._statusLinked){
      return;
   }
   var hPanel = node._hPanel;
   if(parent){
      var nl = parent.searchLast();
      var nr = nl._hPanel.rowIndex;
      if(hPanel.parentElement){
         if(hPanel.rowIndex > nr){
            nr++;
         }
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
      }else{
         o._hNodeRows.appendChild(hPanel);
         MO.Window.Html.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
      }
      node.setLevel(parent._level + 1);
   }else{
      o._hNodeRows.appendChild(hPanel);
      node.setLevel(0);
   }
   node._statusLinked = true;
}
MO.FDuiTreeView_appendNodes = function FDuiTreeView_appendNodes(parent, config){
   parent = MO.RObject.nvl(parent, this.workNode, this.rootNode);
   if(config && config._nodes){
      var count = config._nodes.count;
      if(count > 0){
         parent.child = true;
         parent.loaded = true;
         for(var n = 0; n < count; n++){
            var nc = config._nodes.get(n);
            if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
               var tn = MO.Class.create(FDuiTreeNode);
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
MO.FDuiTreeView_selectNode = function FDuiTreeView_selectNode(n, s){
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
MO.FDuiTreeView_push = function FDuiTreeView_push(control){
   var o = this;
   o.__base.FDuiContainer.push.call(o, control);
   control._tree = o;
   if(MO.Class.isClass(control, MO.FDuiTreeColumn)){
      var columnName = control.name();
      MO.Assert.debugNotEmpty(columnName);
      o._nodeColumns.set(columnName, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeLevel)){
      var levelId = control.id();
      MO.Assert.debugNotEmpty(levelId);
      o._nodeLevels.set(levelId, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNodeType)){
      var typeCode = control.code();
      MO.Assert.debugNotEmpty(typeCode);
      o._nodeTypes.set(typeCode, control);
   }else if(MO.Class.isClass(control, MO.FDuiTreeNode)){
      o._nodes.push(control);
      o._allNodes.push(control);
      o.appendNode(control);
   }
}
MO.FDuiTreeView_removeNode = function FDuiTreeView_removeNode(oNode){
   var o = this;
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
      o._allNodes = nodes;
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
         oParent.imageHTML.src = o.imgEmpty;
      }
      return true;
   }
   return false;
}
MO.FDuiTreeView_removeNodes = function FDuiTreeView_removeNodes(node){
   var o = this;
   node = MO.RObject.nvl(node, o.workNode, o.rootNode);
   if(node.hasChild()){
      node.removeChildren();
   }
   node.remove();
}
MO.FDuiTreeView_freeNode = function FDuiTreeView_freeNode(node){
   var o = this;
   if(node._statusLinked){
      node._statusLinked = false;
      o._hNodeRows.removeChild(node._hPanel);
      var cells = node.cells();
      if(cells){
         var cellCount = cells.count();
         for(var i = 0; i < cellCount; i++){
            var cell = cells.at(i);
            cell.clearAllListeners();
         }
      }
      o._allNodes.remove(node);
      o._freeNodes.push(node);
   }
}
MO.FDuiTreeView_clearNodes = function FDuiTreeView_clearNodes(node){
   var o = this;
   if(node){
      node.removeChildren();
   }
   var nodes = new Array();
   var oLoopNode = null;
   var nCount = o._allNodes.length;
   for(var n = 0; n < nCount; n++){
      oLoopNode = o._allNodes[n];
      if(oLoopNode.parent != oNode){
         nodes[nodes.length] = oLoopNode;
      }else{
      oNode.childrenHTML.removeChild(oLoopNode.ownerHTML);
      }
   }
   oNode.imageHTML.src = o.imgEmpty ;
   o._allNodes = nodes;
   return true;
}
MO.FDuiTreeView_nodeClick = function FDuiTreeView_nodeClick(node){
   var o = this;
   var event = new MO.SEvent();
   event.tree = o;
   event.node = node;
   o.onNodeClick(event);
   o.processNodeClickListener(event);
   event.dispose();
}
MO.FDuiTreeView_calculateHeight = function FDuiTreeView_calculateHeight(){
   var o = this;
   var ns = o._allNodes;
   var c = ns.count();
   for(var i = 0; i < c; i++){
      var n = ns.get(i);
      if(MO.RHtml.displayGet(n._hPanel)){
         c++;
      }
   }
   return c * 29;
}
MO.FDuiTreeView_fetchChangedChecks = function FDuiTreeView_fetchChangedChecks(){
   var o = this;
   var treeView = new MO.TNode('TreeView');
   treeView.set('name', o.name);
   var rnd = MO.RObject.nvl(o.rootNode, o);
   var cs = rnd.controls;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      c.pushChanged(treeView);
   }
   return treeView;
}
MO.FDuiTreeView_extendAuto = function FDuiTreeView_extendAuto(n){
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
MO.FDuiTreeView_extendAll = function FDuiTreeView_extendAll(n, f){
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
MO.FDuiTreeView_refresh = function FDuiTreeView_refresh(){
   var o = this;
   if(o.parentObj){
      o.parentObj.style.height = o.calculateHeight();
   }
}
MO.FDuiTreeView_filterNode = function FDuiTreeView_filterNode(pl, pa){
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
MO.FDuiTreeView_clearAllNodes = function FDuiTreeView_clearAllNodes(){
   var o = this;
   var nodes = o._nodes;
   if(nodes){
      var count = nodes.count();
      for(var i = count - 1; i >= 0; i--){
         nodes.get(i).removeSelf();
      }
      nodes.clear();
   }
   o._allNodes.clear();
}
MO.FDuiTreeView_clear = function FDuiTreeView_clear(){
   var o = this;
   o.clearAllNodes();
}
MO.FDuiTreeView_dispose = function FDuiTreeView_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
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
MO.FDuiDialog = function FDuiDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiWindow, MO.MDuiDescribeFrame);
   o.construct = MO.FDuiDialog_construct;
   return o;
}
MO.FDuiDialog_construct = function FDuiDialog_construct(){
   var o = this;
   o.__base.FDuiWindow.construct.call(o);
}
MO.FDuiFramePage = function FDuiFramePage(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   o._hContainer     = null;
   o.onBuildPanel    = MO.FDuiFramePage_onBuildPanel;
   o.onBuild         = MO.FDuiFramePage_onBuild;
   o.oeResize        = MO.FDuiFramePage_oeResize;
   o.appendChild     = MO.FDuiFramePage_appendChild;
   o.removeChild     = MO.FDuiFramePage_removeChild;
   return o;
}
MO.FDuiFramePage_onBuildPanel = function FDuiFramePage_onBuildPanel(p){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
   hPanel.vAlign = 'top';
   hPanel.height = '100%';
   if(o._backColor){
      hPanel.bgColor = o._backColor;
   }
}
MO.FDuiFramePage_onBuild = function FDuiFramePage_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != MO.EUiScroll.None){
      var hc = o._hContainer = MO.Window.Builder.appendDiv(h, o.styleName('Container'));
      MO.RDuiControl.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}
MO.FDuiFramePage_oeResize = function FDuiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == MO.EUiDirection.Horizontal){
   }else if(p._directionCd == MO.EUiDirection.Vertical){
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return MO.EEventStatus.Continue;
}
MO.FDuiFramePage_appendChild = function FDuiFramePage_appendChild(control){
   var o = this;
   if(control._hPanel){
      o._hContainer.appendChild(control._hPanel);
   }
}
MO.FDuiFramePage_removeChild = function FDuiFramePage_removeChild(control){
   var o = this;
   o._hContainer.removeChild(control._hPanel);
}
MO.FDuiFrameSet = function FDuiFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._sizeCd       = MO.EUiSize.Fill;
   o._directionCd  = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection), MO.EUiDirection.Vertical);
   o._stylePanel   = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = MO.FDuiFrameSet_onBuildPanel;
   o.construct     = MO.FDuiFrameSet_construct;
   o.appendFrame   = MO.FDuiFrameSet_appendFrame;
   o.appendSpliter = MO.FDuiFrameSet_appendSpliter;
   o.appendChild   = MO.FDuiFrameSet_appendChild;
   o.dispose       = MO.FDuiFrameSet_dispose;
   return o;
}
MO.FDuiFrameSet_onBuildPanel = function FDuiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiFrameSet_construct = function FDuiFrameSet_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._frames = new MO.TObjects();
}
MO.FDuiFrameSet_appendFrame = function FDuiFrameSet_appendFrame(frame){
   var o = this;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var hLine = o._hLine;
      if(!hLine){
         hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      }
      frame.setPanel(hLine);
      var sizeWidth = frame._size.width;
      if(sizeWidth){
         frame._hPanel.width = sizeWidth;
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      frame.setPanel(hLine);
      var sizeHeight = frame._size.height;
      if(sizeHeight){
         frame._hPanel.height = sizeHeight;
      }
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(frame);
}
MO.FDuiFrameSet_appendSpliter = function FDuiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = MO.Class.create(MO.FDuiFrameSpliter);
      sp.build(o._hPanel);
   }
   if(o._directionCd == MO.EUiDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var hr = MO.Window.Builder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
MO.FDuiFrameSet_appendChild = function FDuiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(MO.Class.isClass(p, MO.FDuiFramePage)){
      o.appendFrame(p);
      return;
   }else if(MO.Class.isClass(p, MO.FDuiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FDuiContainer.appendChild.call(o, p);
}
MO.FDuiFrameSet_dispose = function FDuiFrameSet_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiFrameSpliter = function FDuiFrameSpliter(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDragable);
   o._styleNormal  = MO.Class.register(o, new MO.AStyle('_styleNormal', 'Normal'));
   o._styleHover   = MO.Class.register(o, new MO.AStyle('_styleHover', 'Hover'));
   o._styleDraging = MO.Class.register(o, new MO.AStyle('_styleDraging', 'Draging'));
   o._directionCd  = MO.EUiDirection.Horizontal;
   o._alignCd      = MO.EUiAlign.Left;
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._sizeMin      = 40;
   o._hDrag        = null;
   o._hSize        = null;
   o._hIcon        = null;
   o.onBuildPanel  = MO.FDuiFrameSpliter_onBuildPanel
   o.onBuild       = MO.FDuiFrameSpliter_onBuild;
   o.onMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onMouseEnter'), MO.FDuiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onMouseLeave'), MO.FDuiFrameSpliter_onMouseLeave);
   o.onDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiFrameSpliter_onDoubleClick);
   o.onDragStart   = MO.FDuiFrameSpliter_onDragStart;
   o.onDragMove    = MO.FDuiFrameSpliter_onDragMove;
   o.onDragStop    = MO.FDuiFrameSpliter_onDragStop;
   o.construct     = MO.FDuiFrameSpliter_construct;
   o.alignCd       = MO.FDuiFrameSpliter_alignCd;
   o.setAlignCd    = MO.FDuiFrameSpliter_setAlignCd;
   o.sizeHtml      = MO.FDuiFrameSpliter_sizeHtml;
   o.setSizeHtml   = MO.FDuiFrameSpliter_setSizeHtml;
   o.changeVisible = MO.FDuiFrameSpliter_changeVisible;
   o.dispose       = MO.FDuiFrameSpliter_dispose;
   return o;
}
MO.FDuiFrameSpliter_onBuildPanel = function FDuiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Normal'));
}
MO.FDuiFrameSpliter_onBuild = function FDuiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.style.zIndex = MO.EUiLayer.Drap;
   h.__linker = o;
   var hd = o._hDrag = MO.Window.Builder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   MO.Window.Html.displaySet(hd, false);
   h.appendChild(hd);
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   o.attachEvent('onDoubleClick', h);
   o._hIcon = MO.Window.Builder.appendIcon(h, null, 'control.FSpliter_Left');
   MO.Console.find(MO.FDragConsole).register(o);
}
MO.FDuiFrameSpliter_onMouseEnter = function FDuiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
MO.FDuiFrameSpliter_onMouseLeave = function FDuiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
MO.FDuiFrameSpliter_onDoubleClick = function FDuiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}
MO.FDuiFrameSpliter_onDragStart = function FDuiFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = MO.Window.Html.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = MO.EMouseCursor.HSize;
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      o._dragClientY = e.clientY;
      o._dragPanelY = MO.Window.Html.clientY(hc);
      o._sizeY = o._hSize.offsetHeight;
      hds.cursor = MO.EMouseCursor.VSize;
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   hds.left = MO.Window.Html.clientX(hc) + 'px';
   hds.top = MO.Window.Html.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   MO.Window.Html.visibleSet(hd, true);
   MO.Window.setOptionSelect(false);
   MO.Window.disable();
}
MO.FDuiFrameSpliter_onDragMove = function FDuiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > o._sizeMin){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > o._sizeMin){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
MO.FDuiFrameSpliter_onDragStop = function FDuiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === MO.EUiAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === MO.EUiAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new MO.TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > o._sizeMin){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === MO.EUiAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === MO.EUiAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new MO.TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > o._sizeMin){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   MO.Window.Html.visibleSet(hd, false);
   MO.Window.enable();
   MO.Window.setOptionSelect(true);
}
MO.FDuiFrameSpliter_construct = function FDuiFrameSpliter_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}
MO.FDuiFrameSpliter_alignCd = function FDuiFrameSpliter_alignCd(){
   return this._alignCd;
}
MO.FDuiFrameSpliter_setAlignCd = function FDuiFrameSpliter_setAlignCd(alignCd){
   var o = this;
   if(alignCd == MO.EUiAlign.Left){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Left');
   }else if(alignCd == MO.EUiAlign.Right){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Right');
   }else{
      throw new MO.TError(o, 'Align type is invalid.');
   }
   o._alignCd = alignCd;
}
MO.FDuiFrameSpliter_sizeHtml = function FDuiFrameSpliter_sizeHtml(){
   return this._hSize;
}
MO.FDuiFrameSpliter_setSizeHtml = function FDuiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}
MO.FDuiFrameSpliter_changeVisible = function FDuiFrameSpliter_changeVisible(){
   var o = this;
   var hs = o._hSize;
   if(!hs){
      return;
   }
   var c = null;
   var v = MO.Window.Html.visibleGet(hs);
   if(v){
      MO.Window.Html.visibleSet(hs, false);
      if(o._alignCd == MO.EUiAlign.Left){
         c = MO.EUiAlign.Right;
      }else if(o._alignCd == MO.EUiAlign.Right){
         c = MO.EUiAlign.Left;
      }
   }else{
      RHtml.visibleSet(hs, true);
      if(o._alignCd == MO.EUiAlign.Left){
         c = MO.EUiAlign.Left;
      }else if(o._alignCd == MO.EUiAlign.Right){
         c = MO.EUiAlign.Right;
      }
   }
   if(c == MO.EUiAlign.Left){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Left');
   }else if(c == MO.EUiAlign.Right){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Right');
   }
   MO.Console.find(MO.FDuiWorkspaceConsole).resize();
}
MO.FDuiFrameSpliter_dispose = function FDuiFrameSpliter_dispose(){
   var o = this;
   o._hDrag = MO.Window.Html.free(o._hDrag);
   o._hSize = MO.Window.Html.free(o._hSize);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiWindow = function FDuiWindow(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MMouseCapture);
   o._statusVisible      = false;
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleBodyForm      = MO.Class.register(o, new MO.AStyle('_styleBodyForm'));
   o._styleTitleForm     = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = MO.Class.register(o, new MO.AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = MO.Class.register(o, new MO.AStyle('_styleStatusPanel'));
   o._mousePosition      = null;
   o._mouseControl       = null;
   o.onBuildPanel        = MO.FDuiWindow_onBuildPanel;
   o.onBuild             = MO.FDuiWindow_onBuild;
   o.onMouseCaptureStart = MO.FDuiWindow_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiWindow_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiWindow_onMouseCaptureStop;
   o.construct      = MO.FDuiWindow_construct;
   o.setVisible     = MO.FDuiWindow_setVisible;
   o.setLabel       = MO.FDuiWindow_setLabel;
   o.showPosition   = MO.FDuiWindow_showPosition;
   return o;
}
MO.FDuiWindow_onBuildPanel = function FDuiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   var hForm = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
MO.FDuiWindow_onBuild = function FDuiWindow_onBuild(event){
   var o = this;
   o.__base.FDuiLayout.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hBodyForm = o._hBodyForm = MO.Window.Builder.appendTable(hPanel, o.styleName('BodyForm'));
   var hTitlePanel = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
   hTitlePanel.__linker = o;
   var hBodyPanel = o._hBodyPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
   hBodyPanel.vAlign = 'top'
   o._hStatusPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
   var hTitleForm = o._hTitleForm = MO.Window.Builder.appendTable(hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitle = o._hTitle = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitle.align = 'center';
   MO.Window.Html.textSet(hTitle, o._label);
   var hTitleButton = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitleButton.width = 20;
   hBodyPanel.appendChild(o._hPanelForm);
   o.refreshSize();
}
MO.FDuiWindow_onMouseCaptureStart = function FDuiWindow_onMouseCaptureStart(event){
   var o = this;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
   MO.Window.Html.cursorSet(o._hPanel, EUiCursor.Move);
}
MO.FDuiWindow_onMouseCapture = function FDuiWindow_onMouseCapture(event){
   var o = this;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}
MO.FDuiWindow_onMouseCaptureStop = function FDuiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
MO.FDuiWindow_construct = function FDuiWindow_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
   o._mousePosition = new MO.SPoint2();
   o._mouseControl = new MO.SPoint2();
   MO.Console.find(MO.FMouseConsole).register(o);
}
MO.FDuiWindow_setVisible = function FDuiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   var hPanel = o.panel(MO.EPanel.Container);
   if(visible){
      MO.Window._hContainer.appendChild(hPanel);
   }else{
      MO.Window._hContainer.removeChild(hPanel);
   }
}
MO.FDuiWindow_setLabel = function FDuiWindow_setLabel(label){
   var o = this;
   o.__base.FDuiLayout.setLabel.call(o, label)
   MO.RHtml.textSet(o._hTitle, o._label);
}
MO.FDuiWindow_showPosition = function FDuiWindow_showPosition(positionCd){
   var o = this;
   o.show();
   if(positionCd == MO.EUiPosition.Center){
      var width = o._hPanel.offsetWidth;
      var height = o._hPanel.offsetHeight;
      var left = (window.document.body.offsetWidth - width) / 2;
      var top = (window.document.body.offsetHeight - height) / 2;
      o._hPanel.style.left = left + 'px';
      o._hPanel.style.top = top + 'px';
   }
}
MO.FDuiWindow_doFocus = function FDuiWindow_doFocus(){
   var o = this;
   if(o.searchControls && o.searchControls.count > 0){
      var cs = o.searchControls;
      for(var n = 0; n < cs.count; n++){
         var c = o.searchControls.get(0)
         if(RClass.isClass(c, MEditValue)){
            c.focus();
         }
      }
   }
}
MO.FDuiWindow_oeVisible = function FDuiWindow_oeVisible(e){
   var o = this;
   o.__base.FDuiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}
MO.FDuiWindow_panel = function FDuiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FDuiLayout.panel.call(o, t);
}
MO.FDuiWindow_dump = function FDuiWindow_dump(oCtl, sLeft){
   var sDump = '';
   if(!oCtl){
      oCtl = this;
   }
   if(!sLeft){
      sLeft = '   ';
   }
   sDump += oCtl.className + '\n';
   if(oCtl.children){
      var arChildren = oCtl.children;
      for(var n=0; n<arChildren.length; n++){
         sDump += sLeft + this.dump(arChildren[n], sLeft + '   ');
      }
   }
   return sDump;
}
MO.FDuiWindow_pushAllControl = function FDuiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}
MO.FDuiWindow_control = function FDuiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}
MO.FDuiWindow_restore = function FDuiWindow_restore(){
   this.max(true);
}
MO.FDuiWindow_processResize = function FDuiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}
MO.FDuiWindow_fillAllControl = function FDuiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}
MO.FDuiWindow_refresh = function FDuiWindow_refresh(bConfig){
   if(this.loadConfig){this.loadConfig();}
   this.setCaption(this.label);
   this.setWidth(this.width);
   this.setHeight(this.height);
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.refresh){
            if(bConfig && oCtl.reloadConfig){
               oCtl.reloadConfig();
            }
            oCtl.refresh();
         }
      }
   }
}
MO.FDuiWindow_initialize = function FDuiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}
MO.FDuiWindow_release = function FDuiWindow_release(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.releaseControl){oCtl.releaseControl();}
         if(oCtl.release){oCtl.release();}
      }
   }
   this.htmlBorder.removeNode(true);
   DatasetManager.focus(null, true);
   WindowManager.releaseWindow(this);
}
MO.FDuiWindow_stopDropExecute = function FDuiWindow_stopDropExecute(oSource){
   if(oSource.config && oSource.rect){
      var oRect = oSource.rect();
      oSource.config.setAttribute('left', oRect.left);
      oSource.config.setAttribute('top', oRect.top);
      oSource.config.setAttribute('width', oRect.width());
      oSource.config.setAttribute('height', oRect.height());
   }
   if(this.owner.onStopDrop){
      this.owner.onStopDrop(oSource);
   }
}
MO.FDuiWindow_selectDsExecute = function FDuiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
MO.FDuiWindow_dispose = function FDuiWindow_dispose(){
   var o = this;
   o.__base.FDuiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
