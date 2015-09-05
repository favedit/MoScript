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
   var hPanel = o._hChangePanel;
   hPanel.className = o.styleName('ChangePanel', MO.MDuiEditChange);
   o.attachEvent('onChangeEnter', hPanel, o.onChangeEnter);
   o.attachEvent('onChangeLeave', hPanel, o.onChangeLeave);
   o.attachEvent('onChangeClick', hPanel, o.onChangeClick);
   var hIcon = o._hChangeIcon = MO.Window.Builder.appendIcon(hPanel, o.styleName('ChangeIcon', MO.MDuiEditChange), 'control.change');
   hIcon._pname = 'change.icon';
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
   if(!MO.Lang.String.isEmpty(o.dataName) && !MO.Lang.String.isEmpty(o.dataCode)){
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
   o.refreshStyle    = MO.MDuiEditDrop_refreshStyle;
   o.dispose         = MO.MDuiEditDrop_dispose;
   return o;
}
MO.MDuiEditDrop_onBuildEditDrop = function MDuiEditDrop_onBuildEditDrop(p){
   var o = this;
   var hDropPanel = o._hDropPanel;
   hDropPanel.align = 'center';
   hDropPanel.className = o.styleName('DropPanel', MO.MDuiEditDrop);
   o.attachEvent('onDropEnter', hDropPanel);
   o.attachEvent('onDropLeave', hDropPanel);
   o.attachEvent('onDropClick', hDropPanel);
   var hDropIcon = o._hDropIcon = MO.Window.Builder.appendIcon(hDropPanel, o.styleName('DropIcon', MO.MDuiEditDrop), 'control.drop');
   hDropIcon.align = 'absmiddle';
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
MO.MDuiEditDrop_refreshStyle = function MDuiEditDrop_refreshStyle(){
   var o = this;
   var hDropIcon = o._hDropIcon;
   if(o._statusEditable){
      var icon = null;
      if(o._statusValueHover){
         icon = 'control.drop-hover';
      }else{
         icon = 'control.drop';
      }
      hDropIcon.src = MO.Window.Resource.iconPath(icon );
   }
   MO.Window.Html.visibleSet(o._hDropPanel, o._statusEditable);
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
MO.MDuiStyle_styleName = function MDuiStyle_styleName(name, method){
   var o = this;
   var findMethod = method ? method : o;
   var className = MO.Class.name(findMethod);
   var clazz = MO.Class.forName(className);
   return clazz.style(name);
}
MO.MDuiStyle_styleIcon = function MDuiStyle_styleIcon(name, method){
   var className = MO.Class.name(method ? method : this, true);
   return className + '_' + name;
}
MO.MDuiStyle_styleIconPath = function MDuiStyle_styleIconPath(name, method){
   var className = MO.Class.name(method ? method : this, true);
   var iconName = className + '_' + name;
   return MO.RResource.iconPath(iconName);
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
   if(MO.Class.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(MO.Class.isClass(v, TOrderItem)){
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
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiContainer);
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
   o.createChild         = MO.FDuiContainer_createChild;
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
MO.FDuiContainer_createChild = function FDuiContainer_createChild(xconfig){
   var control = MO.Dui.Control.newInstance(xconfig);
   control._parent = this;
   return control;
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
   o._nowrap        = MO.Class.register(o, [new MO.APtyBoolean('_nowrap'), new MO.AGetSet('_nowrap')]);
   o._foreColor     = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')]);
   o._foreFont      = MO.Class.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
   o._backColor     = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   o._backFont      = MO.Class.register(o, [new MO.APtyString('_backFont'), new MO.AGetSet('_backFont')]);
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
   var hPanel = o._hPanel;
   MO.Window.Html.linkSet(hPanel, 'control', o);
   o.attachEvent('onEnter', hPanel);
   o.attachEvent('onLeave', hPanel);
   o.refreshBounds();
   o.refreshPadding();
   o.refreshMargin();
}
MO.FDuiControl_oeMode = function FDuiControl_oeMode(event){
   var o = this;
   o._modeCd = event.modeCd;
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
MO.FDuiControl_attachEvent = function FDuiControl_attachEvent(name, hTag, method, capture){
   return MO.Dui.Control.attachEvent(this, name, hTag, method, capture);
}
MO.FDuiControl_linkEvent = function FDuiControl_linkEvent(control, name, hTag, method, capture){
   return MO.Dui.Control.linkEvent(this, control, name, hTag, method, capture);
}
MO.FDuiControl_callEvent = function FDuiControl_callEvent(name, source, event){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(name);
      if(ec){
         ec.invoke(source, source, event);
      }
   }
}
MO.FDuiControl_isBuild = function FDuiControl_isBuild(){
   return this._statusBuild;
}
MO.FDuiControl_build = function FDuiControl_build(parent){
   var o = this;
   if(o._statusBuild){
      throw new MO.TError(o, 'Current control is already builded.');
   }
   var hDocument = null;
   if(MO.Class.isClass(parent, MO.FDuiControl)){
      hDocument = parent._hPanel.ownerDocument;
   }else if(parent.createElement){
      hDocument = parent;
   }else if(parent.ownerDocument && parent.ownerDocument.createElement){
      hDocument = parent.ownerDocument;
   }else if(parent.hDocument){
      hDocument = parent.hDocument;
   }else{
      throw new MO.TError("Parent is invalid. (parent={1})", parent);
   }
   var event = new MO.SEvent(o);
   event.hDocument = hDocument;
   o.onBuild(event);
   event.dispose();
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
   o._hint = null;
   o._styleContainer = null;
   o._statusVisible = null;
   o._statusEnable = null;
   o._statusBuild = null;
   o._hParent = null;
   o._hPanel = MO.Window.Html.free(o._hPanel);
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
MO.RDuiControl.prototype.attachEvent = function RDuiControl_attachEvent(control, name, hTag, method, capture){
   var o = this;
   var event = null;
   var callback = control[name];
   if(!MO.Method.isEmpty(callback) || method){
      var clazz = MO.Class.find(control.constructor);
      var annotation = clazz.annotation(MO.EAnnotation.Event, name);
      var linker = annotation.linker();
      event = annotation.create();
      event.annotation = annotation;
      event.source = control;
      event.hSource = hTag;
      event.ohProcess = method;
      event.onProcess = callback;
      event.process = MO.Dui.Event.onProcess;
      MO.Dui.Event.find(hTag).push(linker, event);
      MO.Window.Html.linkSet(hTag, '_plink', control);
      annotation.bind(hTag, capture);
   }
   return event;
}
MO.RDuiControl.prototype.linkEvent = function RDuiControl_linkEvent(targetControl, sourceControl, name, hTag, method, capture){
   var o = this;
   var event = null;
   var callback = targetControl[name];
   if(!MO.Method.isEmpty(callback) || method){
      var clazz = MO.Class.find(targetControl.constructor);
      var annotation = clazz.annotation(MO.EAnnotation.Event, name);
      var linker = annotation.linker();
      var event = new annotation.constructor();
      event.annotation = annotation;
      event.source = targetControl;
      event.sender = sourceControl;
      event.hSource = hTag;
      event.ohProcess = method;
      event.onProcess = callback;
      event.process = MO.Dui.Event.onProcess;
      MO.Dui.Event.find(hTag).push(linker, event);
      MO.Window.Html.linkSet(hTag, '_plink', targetControl);
      annotation.bind(hTag, capture);
   }
   return event;
}
MO.RDuiControl.prototype.innerCreate = function RDuiControl_innerCreate(pc, px, pa){
   var o = this;
   if((pc == null) || (px == null)){
      return;
   }
   if(MO.Class.isClass(pc, MO.MProperty)){
      pc.propertyLoad(px)
   }
   if(MO.Class.isClass(pc, MO.MUiContainer) && px.hasNode()){
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
MO.RDuiControl.prototype.innerbuild = function RDuiControl_innerbuild(reference, control, xconfig, attributes, hTag){
   var o = this;
   if((control == null) || (xconfig == null)){
      return;
   }
   if(MO.Class.isClass(control, MO.MProperty)){
      control.propertyLoad(xconfig);
   }
   var linker = xconfig.get('linker');
   if(linker && reference){
      reference[linker] = control;
   }
   if(MO.Class.isClass(control, MO.FDuiControl)){
      if(!control.isBuild()){
         control.build(hTag);
      }else{
         control.refresh();
      }
   }
   if(control.__typed){
      reference = control;
   }
   if(MO.Class.isClass(control, MO.MUiContainer) && xconfig.hasNode()){
      var xnodes = xconfig.nodes();
      var nodeCount = xnodes.count();
      for(var i = 0; i < nodeCount; i++){
         var xnode = xnodes.at(i);
         var child = control.createChild(xnode);
         if(!child){
            throw new MO.TError('Invalid create child.');
         }
         o.innerbuild(reference, child, xnode, attributes, hTag);
         control.push(child);
      }
   }
   if(MO.Class.isClass(control, MO.FDuiControl)){
      control.builded(hTag);
   }
}
MO.RDuiControl.prototype.build = function RDuiControl_build(control, xconfig, attributes, hPanel){
   var o = this;
   if(!control){
      control = MO.Dui.Control.newInstance(xconfig);
   }
   o.innerbuild(control, control, xconfig, attributes, hPanel);
   return control;
}
MO.RDuiControl.prototype.setStyleScroll = function RDuiControl_setStyleScroll(hTag, scrollCd){
   var hStyle = hTag.style;
   switch(scrollCd){
      case MO.EUiScroll.None:
         hStyle.overflowX = '';
         hStyle.overflowY = '';
         break;
      case MO.EUiScroll.Horizontal:
         hStyle.overflowX = 'scroll';
         break;
      case MO.EUiScroll.HorizontalAuto:
         hStyle.overflowX = 'auto';
         break;
      case MO.EUiScroll.Vertical:
         hStyle.overflowY = 'scroll';
         break;
      case MO.EUiScroll.VerticalAuto:
         hStyle.overflowY = 'auto';
         break;
      case MO.EUiScroll.Both:
         hStyle.overflow = 'scroll';
         break;
      case MO.EUiScroll.BothAuto:
         hStyle.overflow = 'auto';
         break;
      default:
         throw new MO.TError(o, 'Unknown scroll type. (scroll_cd={1})', scrollCd);
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
   x.name = MO.Class.name(o).substr(1);
   if(MO.Class.isClass(o, FContainer)){
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
         if(o && MO.Class.isClass(o, c)){
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
MO.Dui.Control = new MO.RDuiControl();
MO.RDuiEvent = function RDuiEvent(){
   var o = this;
   o._objects  = new Array();
   o.current   = 0;
   o.events    = new Array();
   return o;
}
MO.RDuiEvent.prototype.ohEvent = function RDuiEvent_ohEvent(event){
   MO.Dui.Event.process(this, event ? event : window.event);
}
MO.RDuiEvent.prototype.onProcess = function RDuiEvent_onProcess(e){
   var e = this;
   if(e.sender){
      e.onProcess.call(e.source, e.sender, e);
   }else{
      e.onProcess.call(e.source, e);
   }
}
MO.RDuiEvent.prototype.find = function RDuiEvent_find(hTag){
   var o = this;
   var uid = MO.Window.Html.uid(hTag);
   var events = o._objects;
   var event = events[uid];
   if(event == null){
      event = events[uid] = new MO.THtmlEvent();
      event.linker = hTag;
   }
   return event;
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
MO.Dui.Event = new MO.RDuiEvent();
MO.RDuiLayer = function RDuiLayer(){
   var o = this;
   o._layers = new Array();
   return o;
}
MO.RDuiLayer.prototype.next = function RDuiLayer_next(p){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, MO.EUiLayer.Default);
   var c = MO.Lang.Integer.nvl(o._layers[n], n);
   o._layers[n] = ++c;
   return c;
}
MO.RDuiLayer.prototype.free = function RDuiLayer_free(p, l){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, MO.EUiLayer.Default);
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
