MO.EEditConfig = new function EEditConfig(){
   var o = this;
   o.Search = 'S';
   o.Copy   = 'C';
   return o;
}
MO.EEditStatus = new function EEditStatus(o){
   if(!o){o=this;}
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
MO.EUiAlign = new function EUiAlign(){
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
MO.EUiBorder = new function EUiBorder(){
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
MO.EUiBorderStyle = new function EUiBorderStyle(){
   var o = this;
   o.Readonly = 1;
   o.Edit     = 2;
   o.Hover    = 3;
   return o;
}
MO.EUiColor = new function EUiColor(){
   var o = this;
   o.ReadonlyBackgroundColor = '#FEFECB';
   o.Normal        = '#FFFFFF';
   o.Select        = '#F8C59A';
   o.Valid         = '#FFCCCC';
   o.Invalid       = '#FFCCCC';
   o.Edit          = '#FFFFFF';
   o.EditHover     = '#EBFFFF';
   o.Require       = '#FF0000';
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
   return o;
}
MO.EUiCursor = new function EUiCursor(){
   var o = this;
   o.Default   = 'default';
   o.Auto      = 'auto';
   o.NorthWest = 'NW';
   o.SouthWest = 'SW';
   o.SouthEast = 'SE';
   o.NorthEast = 'NE';
   o.West      = 'W';
   o.South     = 'S';
   o.East      = 'E';
   o.North     = 'N';
   o.Pointer   = 'pointer';
   o.Cross     = 'crosshair';
   o.Move      = 'move';
   return o;
}
MO.EUiDialog = new function EUiDialog(){
   var o = this;
   o.Confirm = 1;
   o.Info    = 2
   o.Warn    = 3;
   o.Error   = 4;
   return o;
}
MO.EUiDirection = new function EUiDirection(){
   var o = this;
   o.Horizontal = 'H';
   o.Vertical   = 'V';
   return o;
}
MO.EUiDock = MO.EGuiDock;
MO.EUiLabelMode = new function EUiLabelMode(){
   var o = this;
   o.All    = 'A';
   o.Label  = 'L';
   o.Hidden = 'H';
   return o;
}
MO.EUiLabelPosition = new function EUiLabelPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   return o;
}
MO.EUiLayer = new function EUiLayer(){
   var o = this;
   o.Default = 20000;
   o.Shadow  =  6000;
   o.Disable =  5000;
   o.Drap    = 10000;
   o.Window  = 20000;
   o.Drop    = 40000;
   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
MO.EUiLayout = new function EUiLayout(){
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
MO.EUiMerge = new function EUiMerge(){
   var o = this;
   o.Append   = 'append';
   o.Override = 'override';
   o.Disable  = 'disable';
   return o;
}
MO.EPanel = new function EPanel(){
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
MO.EUiPosition = new function EUiPosition(){
   var o = this;
   o.Left   = 'left';
   o.Right  = 'right';
   o.Top    = 'top';
   o.Bottom = 'bottom';
   o.Center = 'center';
   o.Before     = 1;
   o.After      = 2;
   o.LineBefore = 3;
   o.LineAfter  = 4;
   return o;
}
MO.EUiScroll = new function EUiScroll(){
   var o = this;
   o.None           = 'N';
   o.Horizontal     = 'H';
   o.HorizontalAuto = 'HA';
   o.Vertical       = 'V';
   o.VerticalAuto   = 'VA';
   o.Both           = 'B';
   o.BothAuto       = 'BA';
   return o;
}
MO.EUiSize = new function EUiSize(){
   var o = this;
   o.Normal     = 0
   o.Horizontal = 1
   o.Vertical   = 2
   o.Fill       = 3;
   o.Both       = 4;
   return o;
}
MO.EUiWrap = new function EUiWrap(){
   var o = this;
   o.NextLine = 0;
   o.SameLine = 1;
   return o;
}
with(MO){
   MO.MListenerBlur = function MListenerBlur(o){
      o = RClass.inherits(this, o, MListener);
      o.addBlurListener     = MListenerBlur_addBlurListener;
      o.processBlurListener = MListenerBlur_processBlurListener;
      return o;
   }
   MO.MListenerBlur_addBlurListener = function MListenerBlur_addBlurListener(w, m){
      return this.addListener(EEvent.Blur, w, m);
   }
   MO.MListenerBlur_processBlurListener = function MListenerBlur_processBlurListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Blur, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerClick = function MListenerClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addClickListener     = MListenerClick_addClickListener;
      o.setClickListener     = MListenerClick_setClickListener;
      o.removeClickListener  = MListenerClick_removeClickListener;
      o.processClickListener = MListenerClick_processClickListener;
      return o;
   }
   MO.MListenerClick_addClickListener = function MListenerClick_addClickListener(owner, method){
      return this.addListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_setClickListener = function MListenerClick_setClickListener(owner, method){
      return this.setListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_removeClickListener = function MListenerClick_removeClickListener(owner, method){
      return this.removeListener(EEvent.Click, owner, method);
   }
   MO.MListenerClick_processClickListener = function MListenerClick_processClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Click, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerDataChanged = function MListenerDataChanged(o){
      o = RClass.inherits(this, o, MListener);
      o.addDataChangedListener     = MListenerDataChanged_addDataChangedListener;
      o.processDataChangedListener = MListenerDataChanged_processDataChangedListener;
      return o;
   }
   MO.MListenerDataChanged_addDataChangedListener = function MListenerDataChanged_addDataChangedListener(w, m){
      return this.addListener(EEvent.DataChanged, w, m);
   }
   MO.MListenerDataChanged_processDataChangedListener = function MListenerDataChanged_processDataChangedListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.DataChanged, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerDoubleClick = function MListenerDoubleClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addDoubleClickListener     = MListenerDoubleClick_addDoubleClickListener;
      o.setDoubleClickListener     = MListenerDoubleClick_setDoubleClickListener;
      o.processDoubleClickListener = MListenerDoubleClick_processDoubleClickListener;
      return o;
   }
   MO.MListenerDoubleClick_addDoubleClickListener = function MListenerDoubleClick_addDoubleClickListener(owner, method){
      return this.addListener(EEvent.DoubleClick, owner, method);
   }
   MO.MListenerDoubleClick_setDoubleClickListener = function MListenerDoubleClick_setDoubleClickListener(owner, method){
      return this.setListener(EEvent.DoubleClick, owner, method);
   }
   MO.MListenerDoubleClick_processDoubleClickListener = function MListenerDoubleClick_processDoubleClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.DoubleClick, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerEnter = function MListenerEnter(o){
      o = RClass.inherits(this, o, MListener);
      o.addEnterListener     = MListenerEnter_addEnterListener;
      o.processEnterListener = MListenerEnter_processEnterListener;
      return o;
   }
   MO.MListenerEnter_addEnterListener = function MListenerEnter_addEnterListener(w, m){
      return this.addListener(EEvent.Enter, w, m);
   }
   MO.MListenerEnter_processEnterListener = function MListenerEnter_processEnterListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Enter, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerFocus = function MListenerFocus(o){
      o = RClass.inherits(this, o, MListener);
      o.addFocusListener     = MListenerFocus_addFocusListener;
      o.processFocusListener = MListenerFocus_processFocusListener;
      return o;
   }
   MO.MListenerFocus_addFocusListener = function MListenerFocus_addFocusListener(w, m){
      return this.addListener(EEvent.Focus, w, m);
   }
   MO.MListenerFocus_processFocusListener = function MListenerFocus_processFocusListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Focus, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerItemClick = function MListenerItemClick(o){
      o = RClass.inherits(this, o, MListener);
      o.addItemClickListener     = MListenerItemClick_addItemClickListener;
      o.processItemClickListener = MListenerItemClick_processItemClickListener;
      return o;
   }
   MO.MListenerItemClick_addItemClickListener = function MListenerItemClick_addItemClickListener(w, m){
      return this.addListener(EEvent.ItemClick, w, m);
   }
   MO.MListenerItemClick_processItemClickListener = function MListenerItemClick_processItemClickListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.ItemClick, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerLeave = function MListenerLeave(o){
      o = RClass.inherits(this, o, MListener);
      o.addLeaveListener     = MListenerLeave_addLeaveListener;
      o.processLeaveListener = MListenerLeave_processLeaveListener;
      return o;
   }
   MO.MListenerLeave_addLeaveListener = function MListenerLeave_addLeaveListener(w, m){
      return this.addListener(EEvent.Leave, w, m);
   }
   MO.MListenerLeave_processLeaveListener = function MListenerLeave_processLeaveListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Leave, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerResult = function MListenerResult(o){
      o = RClass.inherits(this, o, MListener);
      o.addResultListener     = MListenerResult_addResultListener;
      o.removeResultListener  = MListenerResult_removeResultListener;
      o.processResultListener = MListenerResult_processResultListener;
      o.clearResultListeners  = MListenerResult_clearResultListeners;
      return o;
   }
   MO.MListenerResult_addResultListener = function MListenerResult_addResultListener(owner, method){
      return this.addListener(EEvent.Result, owner, method);
   }
   MO.MListenerResult_removeResultListener = function MListenerResult_removeResultListener(owner, method){
      return this.removeListener(EEvent.Result, owner, method);
   }
   MO.MListenerResult_processResultListener = function MListenerResult_processResultListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Result, p1, p2, p3, p4, p5);
   }
   MO.MListenerResult_clearResultListeners = function MListenerResult_clearResultListeners(){
      return this.clearListeners(EEvent.Result);
   }
}
with(MO){
   MO.MListenerSelected = function MListenerSelected(o){
      o = RClass.inherits(this, o, MListener);
      o.addSelectedListener     = MListenerSelected_addSelectedListener;
      o.processSelectedListener = MListenerSelected_processSelectedListener;
      return o;
   }
   MO.MListenerSelected_addSelectedListener = function MListenerSelected_addSelectedListener(w, m){
      return this.addListener(EEvent.Selected, w, m);
   }
   MO.MListenerSelected_processSelectedListener = function MListenerSelected_processSelectedListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.Selected, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MPropertyCheck = function MPropertyCheck(o){
      o = RClass.inherits(this, o);
      o._valueTrue  = RClass.register(o, new APtyString('_valueTrue'), EBoolean.True);
      o._valueFalse = RClass.register(o, new APtyString('_valueFalse'), EBoolean.False);
      return o;
   }
}
with(MO){
   MO.MPropertyEdit = function MPropertyEdit(o){
      o = RClass.inherits(this, o, MUiEditValidator, MUiEditReference, MUiEditZoom);
      o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
      o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
      o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
      o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
      o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
      o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
      o.oeValid         = MPropertyEdit_oeValid;
      return o;
   }
   MO.MPropertyEdit_oeValid = function MPropertyEdit_oeValid(e){
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
}
with(MO){
   MO.MPropertyNumber = function MPropertyNumber(o){
      o = RClass.inherits(this, o);
      o._valueMin       = RClass.register(o, new APtyNumber('_valueMin'));
      o._valueMax       = RClass.register(o, new APtyNumber('_valueMax'));
      o._valuePrecision = RClass.register(o, new APtyInteger('_valuePrecision'), 3);
      return o;
   }
}
with(MO){
   MO.MPropertySelect = function MPropertySelect(o){
      o = RClass.inherits(this, o, MUiEditValidator, MUiEditReference, MUiEditZoom);
      o._editCaseCd     = RClass.register(o, new APtyString('_editCaseCd'));
      o._editPattern    = RClass.register(o, new APtyString('_editPattern'));
      o._editLength     = RClass.register(o, new APtyInteger('_editLength'));
      o._editComplete   = RClass.register(o, new APtyBoolean('_editComplete'));
      o._validLengthMin = RClass.register(o, new APtyInteger('_validLengthMin'));
      o._validLengthMax = RClass.register(o, new APtyInteger('_validLengthMax'));
      o.oeValid         = MPropertySelect_oeValid;
      return o;
   }
   MO.MPropertySelect_oeValid = function MPropertySelect_oeValid(e){
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
}
with(MO){
   MO.MUiContainer = function MUiContainer(o){
      o = RClass.inherits(this, o);
      o.createChild = MUiContainer_createChild;
      o.appendChild = RMethod.empty;
      o.removeChild = RMethod.empty;
      return o;
   }
   MO.MUiContainer_createChild = function MUiContainer_createChild(p){
      var c = RUiControl.newInstance(p);
      c._parent = this;
      return c;
   }
}
with(MO){
   MO.MUiDataProperties = function MUiDataProperties(o){
      o = RClass.inherits(this, o);
      o._dataProperties = null;
      o.dataProperties  = MUiDataProperties_dataProperties;
      o.dataPropertyGet = MUiDataProperties_dataPropertyGet;
      o.dataPropertySet = MUiDataProperties_dataPropertySet;
      return o;
   }
   MO.MUiDataProperties_dataProperties = function MUiDataProperties_dataProperties(n, c){
      var o = this;
      var d = o._dataProperties;
      if(d == null){
         d = o._dataProperties = new TDictionary();
      }
      return d;
   }
   MO.MUiDataProperties_dataPropertyGet = function MUiDataProperties_dataPropertyGet(n){
      var o = this;
      var d = o._dataProperties;
      return d ? d.get(n) : null;
   }
   MO.MUiDataProperties_dataPropertySet = function MUiDataProperties_dataPropertySet(n, v){
      this.dataProperties().set(n, v);
   }
}
with(MO){
   MO.MUiDescribeFrame = function MUiDescribeFrame(o){
      o = RClass.inherits(this, o);
      o._frameName  = null;
      o.buildDefine = MUiDescribeFrame_buildDefine;
      return o;
   }
   MO.MUiDescribeFrame_buildDefine = function MUiDescribeFrame_buildDefine(hDocument, frameName){
      var o = this;
      if(RString.isEmpty(frameName)){
         frameName = o._frameName;
      }
      var frameConsole = RConsole.find(FUiDescribeFrameConsole);
      var xconfig = frameConsole.load(frameName);
      RUiControl.build(o, xconfig, null, hDocument);
   }
}
with(MO){
   MO.MUiDesign = function MUiDesign(o){
      o = RClass.inherits(this, o);
      o._statusDesign      = false;
      o._storage       = null;
      o.oeDesign      = MUiDesign_oeDesign;
      o.onDesignEnter = RClass.register(o, new AEventMouseEnter('onDesignEnter'), MUiDesign_onDesignEnter);
      o.onDesignLeave = RClass.register(o, new AEventMouseEnter('onDesignLeave'), MUiDesign_onDesignLeave);
      o.onDesignBegin = RClass.register(o, new AEventMouseEnter('onDesignBegin'), MUiDesign_onDesignBegin);
      o.onDesignEnd   = RClass.register(o, new AEventMouseEnter('onDesignEnd'), MUiDesign_onDesignEnd);
      return o;
   }
   MO.MUiDesign_oeDesign = function MUiDesign_oeDesign(e){
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
   MO.MUiDesign_onDesignEnter = function MUiDesign_onDesignEnter(p){
      var o = this;
      o._hPanel.className = o.style('Design');
   }
   MO.MUiDesign_onDesignLeave = function MUiDesign_onDesignLeave(p){
   }
   MO.MUiDesign_onDesignBegin = function MUiDesign_onDesignBegin(p){
      var o = this;
      var g = o._storage = RObject.nvlObj(o._storage);
      g.designStyle = o._hPanel.className;
      g.designLayer = o._hPanel.zIndex;
      o._hPanel.className = o.style('DesignDrag');
      o._statusDesign = true;
   }
   MO.MUiDesign_onDesignEnd = function MUiDesign_onDesignEnd(p){
      var o = this;
      var g = o._storage = RObject.nvlObj(o._storage);
      o._hPanel.className = g.designStyle;
      o._hPanel.zIndex = g.designLayer;
      o._statusDesign = false;
   }
}
with(MO){
   MO.MUiDisplay = function MUiDisplay(o){
      o = RClass.inherits(this, o);
      o._dispDisplay = RClass.register(o, new APtySet(null, '_dispDisplay', 'disp_mode', EDisplayMode.Display, false));
      o._dispSearch  = RClass.register(o, new APtySet(null, '_dispSearch', 'disp_mode', EDisplayMode.Search, false));
      o._dispInsert  = RClass.register(o, new APtySet(null, '_dispInsert', 'disp_mode', EDisplayMode.Insert, false));
      o._dispUpdate  = RClass.register(o, new APtySet(null, '_dispUpdate', 'disp_mode', EDisplayMode.Update, false));
      o._dispDelete  = RClass.register(o, new APtySet(null, '_dispDelete', 'disp_mode', EDisplayMode.Delete, false));
      o._dispZoom    = RClass.register(o, new APtySet(null, '_dispZoom', 'disp_mode', EDisplayMode.Zoom, false));
      o._dispAlign   = RClass.register(o, new APtyString(null, '_dispAlign', null, EAlign.Left));
      o._visible    = true;
      o.oeMode      = MUiDisplay_oeMode;
      o.canVisible  = MUiDisplay_canVisible;
      return o;
   }
   MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(e){
      var o = this;
      if(e.isBefore()){
         var v = true;
         if(!o.base.MUiDisplayAble){
            v = o.canVisible(e.mode);
         }
         o.setVisible(v);
      }
   }
   MO.MUiDisplay_canVisible = function MUiDisplay_canVisible(m){
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
}
with(MO){
   MO.MUiDragable = function MUiDragable(o){
      o = RClass.inherits(this, o);
      o.onDragStart = RMethod.virtual(o, 'onDragStart');
      o.onDragMove  = RMethod.virtual(o, 'onDragMove');
      o.onDragStop  = RMethod.virtual(o, 'onDragStop');
      return o;
   }
}
with(MO){
   MO.MUiDropable = function MUiDropable(o){
      o = RClass.inherits(this, o);
      o._styleDrop         = RClass.register(o, new AStyle('_styleDrop'));
      o._styleIconDrop     = RClass.register(o, new AStyleIcon('_styleIconDrop'));
      o._hDropPanel        = null;
      o._hDrop             = null;
      o.onBuildDrop       = MUiDropable_onBuildDrop;
      o.onDropEnter       = RClass.register(o, new AEventMouseEnter('onDropEnter'));
      o.onDropLeave       = RClass.register(o, new AEventMouseLeave('onDropLeave'));
      o.onDropClick       = RClass.register(o, new AEventClick('onDropClick'), MUiDropable_onDropClick);
      o.onDropDoubleClick = RClass.register(o, new AEventDoubleClick('onDropDoubleClick'), MUiDropable_onDropDoubleClick);
      o.canDrop           = MUiDropable_canDrop;
      return o;
   }
   MO.MUiDropable_onBuildDrop = function MUiDropable_onBuildDrop(hPanel){
      var o = this;
      o._hDropPanel = hPanel;
      hPanel.className = o.styleName('Drop', MUiDropable);
      var hDrop = o.hDrop = RBuilder.appendIcon(hPanel, null, 'control.drop');
      hDrop.style.width =16;
      hDrop.style.borderLeft = '1 solid #CCCCCC';
      hDrop.style.cursor = 'hand';
   }
   MO.MUiDropable_onDropClick = function MUiDropable_onDropClick(){
      var o = this;
      if(o._editable){
         o.drop();
      }
   }
   MO.MUiDropable_onDropDoubleClick = function MUiDropable_onDropDoubleClick(){
      var o = this;
      if(o._editable){
         o.drop();
      }
   }
   MO.MUiDropable_canDrop = function MUiDropable_canDrop(){
      var o = this;
      if(RClass.isClass(o, MUiDesign)){
         return !RConsole.find(FUiDesignConsole).canDesignMove;
      }
      return true;
   }
}
with(MO){
   MO.MUiEditable = function MUiEditable(o){
      o = RClass.inherits(this, o);
      return o;
   }
   MO.MUiEditable_testEdit = function MUiEditable_testEdit(m){
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
}
with(MO){
   MO.MUiEditChange = function MUiEditChange(o){
      o = RClass.inherits(this, o);
      o._styleChangePanel = RClass.register(o, new AStyle('_styleChangePanel'));
      o._styleChangeIcon  = RClass.register(o, new AStyle('_styleChangeIcon'));
      o._hChangePanel     = null;
      o._hChangeIcon      = null;
      o.onBuildEditChange = MUiEditChange_onBuildEditChange;
      o.onChangeEnter     = RClass.register(o, new AEventMouseEnter('onChangeEnter'), MUiEditChange_onChangeEnter);
      o.onChangeLeave     = RClass.register(o, new AEventMouseLeave('onChangeLeave'), MUiEditChange_onChangeLeave);
      o.onChangeClick     = RClass.register(o, new AEventClick('onChangeClick'), MUiEditChange_onChangeClick);
      o.construct         = MUiEditChange_construct;
      o.changeSet         = MUiEditChange_changeSet;
      o.dispose           = MUiEditChange_dispose;
      return o;
   }
   MO.MUiEditChange_onBuildEditChange = function MUiEditChange_onBuildEditChange(p){
      var o = this;
      var h = o._hChangePanel;
      h.className = o.styleName('ChangePanel', MUiEditChange);
      h.style.verticalAlign = 'top';
      h.width = 5;
      o.attachEvent('onChangeEnter', h, o.onChangeEnter);
      o.attachEvent('onChangeLeave', h, o.onChangeLeave);
      o.attachEvent('onChangeClick', h, o.onChangeClick);
      var hi = o._hChangeIcon = RBuilder.appendIcon(h, o.styleName('ChangeIcon', MUiEditChange), 'control.change');
      hi._pname = 'change.icon';
   }
   MO.MUiEditChange_onChangeEnter = function MUiEditChange_onChangeEnter(e){
      var o = this;
   }
   MO.MUiEditChange_onChangeLeave = function MUiEditChange_onChangeLeave(e){
      var o = this;
   }
   MO.MUiEditChange_onChangeClick = function MUiEditChange_onChangeClick(e){
   }
   MO.MUiEditChange_construct = function MUiEditChange_construct(){
   }
   MO.MUiEditChange_changeSet = function MUiEditChange_changeSet(p){
   }
   MO.MUiEditChange_dispose = function MUiEditChange_dispose(){
      var o = this;
      RHtml.free(o._hChangeIcon);
      o._hChangeIcon = null;
      RHtml.free(o._hChangePanel);
      o._hChangePanel = null;
   }
}
with(MO){
   MO.MUiEditDescriptor = function MUiEditDescriptor(o){
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
   MO.MUiEditDescriptor_onDataEnter = function MUiEditDescriptor_onDataEnter(s, e){
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
   MO.MUiEditDescriptor_onDataLeave = function MUiEditDescriptor_onDataLeave(s, e){
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
   MO.MUiEditDescriptor_onDataKeyDown = function MUiEditDescriptor_onDataKeyDown(s, e){
      var o = this;
      if(s._editable && !s._disabled){
         s._invalidText = o.validText(s.text());
         s.refreshStyle();
      }
   }
   MO.MUiEditDescriptor_onDataChange = function MUiEditDescriptor_onDataChange(s, e){
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
   MO.MUiEditDescriptor_onDataEditEnd = function MUiEditDescriptor_onDataEditEnd(s, e){
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
   MO.MUiEditDescriptor_oeSaveCode = function MUiEditDescriptor_oeSaveCode(e){
      var o = this;
      if(!RString.isEmpty(o.dataName) && !RString.isEmpty(o.dataCode)){
         e.values.set(o.dataName, o.dataCode);
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditDescriptor_canValid = function MUiEditDescriptor_canValid(m){
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
   MO.MUiEditDescriptor_formatValue = function MUiEditDescriptor_formatValue(v){
      return RString.nvl(v);
   }
   MO.MUiEditDescriptor_formatText = function MUiEditDescriptor_formatText(t){
      return RString.nvl(t);
   }
   MO.MUiEditDescriptor_validText = function MUiEditDescriptor_validText(t){
      var o = this;
   }
}
with(MO){
   MO.MUiEditDrop = function MUiEditDrop(o){
      o = RClass.inherits(this, o);
      o._styleDropPanel = RClass.register(o, new AStyle('_styleDropPanel'));
      o._styleDropIcon  = RClass.register(o, new AStyle('_styleDropIcon'));
      o._hDropPanel     = null;
      o._hDropIcon      = null;
      o.onBuildEditDrop = MUiEditDrop_onBuildEditDrop;
      o.onDropEnter     = RClass.register(o, new AEventMouseEnter('onDropEnter'), MUiEditDrop_onDropEnter);
      o.onDropLeave     = RClass.register(o, new AEventMouseLeave('onDropLeave'), MUiEditDrop_onDropLeave);
      o.onDropClick     = RClass.register(o, new AEventClick('onDropClick'), MUiEditDrop_onDropClick);
      o.construct       = MUiEditDrop_construct;
      o.dispose         = MUiEditDrop_dispose;
      return o;
   }
   MO.MUiEditDrop_onBuildEditDrop = function MUiEditDrop_onBuildEditDrop(p){
      var o = this;
      var h = o._hDropPanel;
      h.className = o.styleName('DropPanel', MUiEditDrop);
      h.width = 11;
      o.attachEvent('onDropEnter', h);
      o.attachEvent('onDropLeave', h);
      o.attachEvent('onDropClick', h);
      var hi = o._hDropIcon = RBuilder.appendIcon(h, o.styleName('DropIcon', MUiEditDrop), 'control.drop');
      hi.align = 'center';
   }
   MO.MUiEditDrop_onDropEnter = function MUiEditDrop_onDropEnter(e){
      var o = this;
   }
   MO.MUiEditDrop_onDropLeave = function MUiEditDrop_onDropLeave(e){
      var o = this;
   }
   MO.MUiEditDrop_onDropClick = function MUiEditDrop_onDropClick(e){
   }
   MO.MUiEditDrop_construct = function MUiEditDrop_construct(){
   }
   MO.MUiEditDrop_dispose = function MUiEditDrop_dispose(){
      var o = this;
      RHtml.free(o._hDropIcon);
      o._hDropIcon = null;
      RHtml.free(o._hDropPanel);
      o._hDropPanel = null;
   }
}
with(MO){
   MO.MUiEditFormator = function MUiEditFormator(o){
      o = RClass.inherits(this, o);
      o.formatText  = MUiEditFormator_formatText;
      o.formatValue = MUiEditFormator_formatValue;
      return o;
   }
   MO.MUiEditFormator_formatText = function MUiEditFormator_formatText(value){
      return value;
   }
   MO.MUiEditFormator_formatValue = function MUiEditFormator_formatValue(text){
      return text;
   }
}
with(MO){
   MO.MUiEditReference = function MUiEditReference(o){
      o = RClass.inherits(this, o);
      o._lovService    = RClass.register(o, new APtyString('_lovService'));
      o._lovReference  = RClass.register(o, new APtyString('_lovReference'));
      o._lovFields     = RClass.register(o, new APtyString('_lovFields'));
      o._lovWhere      = RClass.register(o, new APtyString('_lovWhere'));
      o._lovOrder      = RClass.register(o, new APtyString('_lovOrder'));
      o._listView     = null;
      o.onListSelected = RMethod.empty;
      o.canListView    = MUiEditReference_canListView;
      o.setLabelStyle  = MUiEditReference_setLabelStyle;
      o.doListView     = MUiEditReference_doListView;
      return o;
   }
   MO.MUiEditReference_onListClick = function MUiEditReference_onListClick(e){
      var o = this;
      if(o.canListView()){
         o.doListView();
      }
   }
   MO.MUiEditReference_canListView = function MUiEditReference_canListView(){
      return !RString.isEmpty(this._lovReference) && this._editable;
   }
   MO.MUiEditReference_setLabelStyle = function MUiEditReference_setLabelStyle(){
      var o = this;
      if(!RString.isEmpty(o.lovRefer)){
         o.hLabel.style.cursor = 'hand';
         o.attachEvent('onListClick', o.hLabel);
         o.hLabel.className = 'RLine_Underline';
      }
   }
   MO.MUiEditReference_doListView = function MUiEditReference_doListView(cvs){
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
}
with(MO){
   MO.MUiEditValidator = function MUiEditValidator(o){
      o = RClass.inherits(this, o);
      o._validable = false;
      o._valid     = true;
      o._validText = null;
      o.oeValid    = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.MUiEditValue = function MUiEditValue(o){
      o = RClass.inherits(this, o, MUiEditFormator);
      o._dataValue      = RClass.register(o, new APtyString('_dataValue'));
      o._statusEditable = true;
      o._statusEditing  = false;
      o._statusInvalid  = true;
      o._recordText     = null;
      o._recordValue    = null;
      o.isTextChanged   = MUiEditValue_isTextChanged;
      o.isValueChanged  = MUiEditValue_isValueChanged;
      o.formator        = MUiEditValue_formator;
      o.text            = MUiEditValue_text;
      o.setText         = MUiEditValue_setText;
      o.get             = MUiEditValue_get;
      o.set             = MUiEditValue_set;
      o.clearValue      = MUiEditValue_clearValue;
      o.resetValue      = MUiEditValue_resetValue;
      o.loadValue       = MUiEditValue_loadValue;
      o.saveValue       = MUiEditValue_saveValue;
      o.recordValue     = MUiEditValue_recordValue;
      o.validValue      = RMethod.empty;
      o.setEditAble     = MUiEditValue_setEditAble;
      o.doFocus         = MUiEditValue_doFocus;
      o.doBlur          = MUiEditValue_doBlur;
      return o;
   }
   MO.MUiEditValue_isTextChanged = function MUiEditValue_isTextChanged(){
      var o = this;
      var text = o.text();
      return RString.equals(o._recordText, text);
   }
   MO.MUiEditValue_isValueChanged = function MUiEditValue_isValueChanged(){
      var o = this;
      var value = o.get();
      return RString.equals(o._recordValue, value);
   }
   MO.MUiEditValue_formator = function MUiEditValue_formator(){
      return this;
   }
   MO.MUiEditValue_text = function MUiEditValue_text(){
   }
   MO.MUiEditValue_setText = function MUiEditValue_setText(text){
   }
   MO.MUiEditValue_get = function MUiEditValue_get(){
      var o = this;
      var text = o.text();
      var value = o._dataValue = o.formator().formatValue(text)
      return value;
   }
   MO.MUiEditValue_set = function MUiEditValue_set(value){
      var o = this;
      o._dataValue = RString.nvl(value);
      var text = o.formator().formatText(value)
      o.setText(text);
   }
   MO.MUiEditValue_clearValue = function MUiEditValue_clearValue(){
      var o = this;
      o._dataValue = RString.EMPTY;
      o.set(RString.EMPTY);
   }
   MO.MUiEditValue_resetValue = function MUiEditValue_resetValue(){
      var o = this;
      o._dataValue = value;
      o.set(value);
   }
   MO.MUiEditValue_loadValue = function MUiEditValue_loadValue(c, t){
      var o = this;
   }
   MO.MUiEditValue_saveValue = function MUiEditValue_saveValue(c, t){
      var o = this;
   }
   MO.MUiEditValue_recordValue = function MUiEditValue_recordValue(){
      var o = this;
      o._recordText = o.text();
      o._recordValue = o.get();
   }
   MO.MUiEditValue_setEditAble = function MUiEditValue_setEditAble(flag){
      var o = this;
      o._statusEditable = flag;
   }
   MO.MUiEditValue_doFocus = function MUiEditValue_doFocus(){
      var o = this;
      if(o._statusEditable){
         o._statusEditing = true;
      }
   }
   MO.MUiEditValue_doBlur = function MUiEditValue_doBlur(){
      var o = this;
      if(o._statusEditable && o._statusEditing){
         o._statusEditing = false;
      }
   }
   MO.MUiEditValue_oeClearValue = function MUiEditValue_oeClearValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.clearValue();
         o.dataValue = o.reget();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeResetValue = function MUiEditValue_oeResetValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.resetValue();
         o.dataValue = o.reget();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeLoadValue = function MUiEditValue_oeLoadValue(e){
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
   MO.MUiEditValue_oeSaveValue = function MUiEditValue_oeSaveValue(e){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.saveValue(e.values);
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_oeRecordValue = function MUiEditValue_oeRecordValue(){
      var o = this;
      var d = o.descriptor();
      if(!RString.isEmpty(d.dataName)){
         o.recordValue();
      }
      return EEventStatus.Stop;
   }
   MO.MUiEditValue_commitValue = function MUiEditValue_commitValue(){
      this.__commitValue = RString.nvl(this.reget());
   }
   MO.MUiEditValue_reget = function MUiEditValue_reget(){
      return this.descriptor().formatValue(this.text());
   }
   MO.MUiEditValue_setInfoPack = function MUiEditValue_setInfoPack(v){
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
   MO.MUiEditValue_setInfo = function MUiEditValue_setInfo(f){
      this.set(f.value);
   }
}
with(MO){
   MO.MUiEditZoom = function MUiEditZoom(o){
      o = RClass.inherits(this, o);
      o._zoomReference = RClass.register(o, new APtyString('_zoomReference'));
      o._zoomField     = RClass.register(o, new APtyString('_zoomField'));
      o.testZoom   = MUiEditZoom_testZoom;
      o.doZoom     = MUiEditZoom_doZoom;
      return o;
   }
   MO.MUiEditZoom_testZoom = function MUiEditZoom_testZoom(){
      return !RString.isEmpty(this._zoomReference);
   }
   MO.MUiEditZoom_doZoom = function MUiEditZoom_doZoom(p){
      RFormSpace.doZoom(this, p);
   }
}
with(MO){
   MO.MUiFocus = function MUiFocus(o){
      o = RClass.inherits(this, o);
      o.onFocus   = RClass.register(o, new AEventFocus('onFocus'), MUiFocus_onFocus);
      o.onBlur    = RClass.register(o, new AEventBlur('onBlur'));
      o.testFocus = RMethod.emptyTrue;
      o.testBlur  = RMethod.emptyTrue;
      o.doFocus   = RMethod.empty;
      o.doBlur    = RMethod.empty;
      o.focus     = MUiFocus_focus;
      o.blur      = MUiFocus_blur;
      return o;
   }
   MO.MUiFocus_onFocus = function MUiFocus_onFocus(e){
      RConsole.find(FUiFocusConsole).focus(this, e);
   }
   MO.MUiFocus_focus = function MUiFocus_focus(){
      RConsole.find(FUiFocusConsole).focus(this);
   }
   MO.MUiFocus_blur = function MUiFocus_blur(){
      RConsole.find(FUiFocusConsole).blur(this);
   }
}
with(MO){
   MO.MUiHorizontal = function MUiHorizontal(o){
      o = RClass.inherits(this, o);
      o.setVisible = MUiHorizontal_setVisible;
      return o;
   }
   MO.MUiHorizontal_setVisible = function MUiHorizontal_setVisible(p){
      var o = this;
      var h = o.hPanelLine;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
}
with(MO){
   MO.MUiMargin = function MUiMargin(o){
      o = RClass.inherits(this, o);
      o._margin       = RClass.register(o, new APtyPadding('_margin'));
      o.construct     = MUiMargin_construct;
      o.margin        = MUiMargin_margin;
      o.setMargin     = MUiMargin_setMargin;
      o.refreshMargin = MUiMargin_refreshMargin;
      o.dispose       = MUiMargin_dispose;
      return o;
   }
   MO.MUiMargin_construct = function MUiMargin_construct(){
      var o = this;
      o._margin = new SPadding();
   }
   MO.MUiMargin_margin = function MUiMargin_margin(){
      return this._margin;
   }
   MO.MUiMargin_setMargin = function MUiMargin_setMargin(left, top, right, bottom){
      var o = this;
      var padding = o._padding;
      var hPanel = o.panel(EPanel.Container);
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
   MO.MUiMargin_refreshMargin = function MUiMargin_refreshMargin(){
      var o = this;
      var p = o._margin;
      o.setMargin(p.left, p.top, p.right, p.bottom);
   }
   MO.MUiMargin_dispose = function MUiMargin_dispose(){
      var o = this;
      o._margin = RObject.dispose(o._margin);
   }
}
with(MO){
   MO.MUiPadding = function MUiPadding(o){
      o = RClass.inherits(this, o);
      o._padding       = RClass.register(o, new APtyPadding('_padding'));
      o.construct      = MUiPadding_construct;
      o.padding        = MUiPadding_padding;
      o.setPadding     = MUiPadding_setPadding;
      o.refreshPadding = MUiPadding_refreshPadding;
      o.dispose        = MUiPadding_dispose;
      return o;
   }
   MO.MUiPadding_construct = function MUiPadding_construct(){
      var o = this;
      o._padding = new SPadding();
   }
   MO.MUiPadding_padding = function MUiPadding_padding(){
      return this._padding;
   }
   MO.MUiPadding_setPadding = function MUiPadding_setPadding(left, top, right, bottom){
      var o = this;
      var padding = o._padding;
      var hPanel = o.panel(EPanel.Container);
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
   MO.MUiPadding_refreshPadding = function MUiPadding_refreshPadding(){
      var o = this;
      var p = o._padding;
      o.setPadding(p.left, p.top, p.right, p.bottom);
   }
   MO.MUiPadding_dispose = function MUiPadding_dispose(){
      var o = this;
      var v = o._padding;
      if(v){
         v.dispose();
         o._padding = null;
      }
   }
}
with(MO){
   MO.MUiPopup = function MUiPopup(o){
      o = RClass.inherits(this, o);
      o._opener = null;
      o.opener  = MUiPopup_opener;
   }
   MO.MUiPopup_opener = function MUiPopup_opener(){
      return this._opener;
   }
}
with(MO){
   MO.MUiProgress = function MUiProgress(o){
      o = RClass.inherits(this, o);
      o.oeProgress = RMethod.virtual(o, 'oeProgress');
      return o;
   }
}
with(MO){
   MO.MUiSize = function MUiSize(o){
      o = RClass.inherits(this, o);
      o._dockCd         = RClass.register(o, new APtyString('_dockCd'));
      o._location       = RClass.register(o, new APtyPoint2('_location'));
      o._size           = RClass.register(o, new APtySize2('_size'));
      o.construct       = MUiSize_construct;
      o.dockCd          = MUiSize_dockCd;
      o.setDockCd       = MUiSize_setDockCd;
      o.left            = MUiSize_left;
      o.setLeft         = MUiSize_setLeft;
      o.top             = MUiSize_top;
      o.setTop          = MUiSize_setTop;
      o.location        = MUiSize_location;
      o.setLocation     = MUiSize_setLocation;
      o.refreshLocation = MUiSize_refreshLocation;
      o.width           = MUiSize_width;
      o.setWidth        = MUiSize_setWidth;
      o.height          = MUiSize_height;
      o.setHeight       = MUiSize_setHeight;
      o.size            = MUiSize_size;
      o.setSize         = MUiSize_setSize;
      o.refreshSize     = MUiSize_refreshSize;
      o.setBounds       = MUiSize_setBounds;
      o.refreshBounds   = MUiSize_refreshBounds;
      o.dispose         = MUiSize_dispose;
      o.innerDump       = MUiSize_innerDump;
      return o;
   }
   MO.MUiSize_construct = function MUiSize_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SUiSize2();
   }
   MO.MUiSize_dockCd = function MUiSize_dockCd(){
      return this._dockCd;
   }
   MO.MUiSize_setDockCd = function MUiSize_setDockCd(dockCd){
      this._dockCd = dockCd;
   }
   MO.MUiSize_left = function MUiSize_left(){
      return this._location.x;
   }
   MO.MUiSize_setLeft = function MUiSize_setLeft(p){
      this.setLocation(p, null);
   }
   MO.MUiSize_top = function MUiSize_top(){
      return this._location.y;
   }
   MO.MUiSize_setTop = function MUiSize_setTop(p){
      this.setLocation(null, p);
   }
   MO.MUiSize_location = function MUiSize_location(){
      return this._location;
   }
   MO.MUiSize_setLocation = function MUiSize_setLocation(x, y){
      var o = this;
      var hPanel = o.panel(EPanel.Size);
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
   MO.MUiSize_refreshLocation = function MUiSize_refreshLocation(){
      var o = this;
      o.setLocation(o._location.x, o._location.y);
   }
   MO.MUiSize_width = function MUiSize_width(){
      return this._size.width;
   }
   MO.MUiSize_setWidth = function MUiSize_setWidth(p){
      this.setSize(p, null);
   }
   MO.MUiSize_height = function MUiSize_height(){
      return this._size.width;
   }
   MO.MUiSize_setHeight = function MUiSize_setHeight(p){
      this.setSize(null, p);
   }
   MO.MUiSize_size = function MUiSize_size(){
      return this._size;
   }
   MO.MUiSize_setSize = function MUiSize_setSize(width, height){
      var o = this;
      var hPanel = o.panel(EPanel.Size);
      if(width != null){
         o._size.width = width;
         if(hPanel && !hPanel.__fragment){
            if(hPanel.tagName == 'TD'){
               if(width != 0){
                  hPanel.width = width;
               }
            }else{
               if(RString.contains(width, '%')){
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
               if(RString.contains(height, '%')){
                  hPanel.style.height = height;
               }else{
                  hPanel.style.height = (height == 0) ? null : height + 'px';
               }
            }
         }
      }
   }
   MO.MUiSize_refreshSize = function MUiSize_refreshSize(){
      var o = this;
      o.setSize(o._size.width, o._size.height);
   }
   MO.MUiSize_setBounds = function MUiSize_setBounds(l, t, w, h){
      var o = this;
      o.setLocation(l, t);
      o.setSize(w, h);
   }
   MO.MUiSize_refreshBounds = function MUiSize_refreshBounds(){
      var o = this;
      o.refreshLocation();
      o.refreshSize();
   }
   MO.MUiSize_dispose = function MUiSize_dispose(){
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
   MO.MUiSize_innerDump = function MUiSize_innerDump(s, l){
      var o = this;
      s.append('MUiSize:');
      s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
   }
}
with(MO){
   MO.MUiSizeable = function MUiSizeable(o){
      o = RClass.inherits(this, o);
      o.isSizeable  = true;
      o.onSize      = null;
      o.inSizeRange = RMethod.virtual(o, 'inSizeRange');
      o.cursor      = MUiSizeable_cursor;
      o.setCursor   = MUiSizeable_setCursor;
      o.resize      = MUiSizeable_resize;
      o.setBounds   = MUiSizeable_setBounds;
      o.startDrag   = MUiSizeable_startDrag;
      o.stopDrag    = MUiSizeable_stopDrag;
      return o;
   }
   MO.MUiSizeable_cursor = function MUiSizeable_cursor(){
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
   MO.MUiSizeable_setCursor = function MUiSizeable_setCursor(cursor){
      if(!cursor){
         cursor = this.cursor();
      }
      var h = this.panel(EPanel.Size);
      if(h){
         h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
      }
   }
   MO.MUiSizeable_resize = function MUiSizeable_resize(width, height){
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
   MO.MUiSizeable_setBounds = function MUiSizeable_setBounds(left, top, right, bottom, force){
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
   MO.MUiSizeable_startDrag = function MUiSizeable_startDrag(){
   }
   MO.MUiSizeable_stopDrag = function MUiSizeable_stopDrag(){
   }
}
with(MO){
   MO.MUiStorage = function MUiStorage(o){
      o = RClass.inherits(this, o);
      o._storageCode      = null;
      o._storageObject    = null;
      o.storageGet        = MUiStorage_storageGet;
      o.storageGetBoolean = MUiStorage_storageGetBoolean;
      o.storageSet        = MUiStorage_storageSet;
      o.storageUpdate     = MUiStorage_storageUpdate;
      o.dispose           = MUiStorage_dispose;
      return o;
   }
   MO.MUiStorage_storageGet = function MUiStorage_storageGet(name, defaultValue){
      var o = this;
      if(name == null){
         throw new TError(o, 'Name is empty.');
      }
      var object = o._storageObject;
      if(!object){
         var storge = RWindow.storage(EScope.Local);
         var value = storge.get(o._storageCode);
         object = o._storageObject = MO.Json.parse(value, Object);
      }
      if(object){
         var value = object[name];
         if(value != null){
            return value;
         }
      }
      return defaultValue;
   }
   MO.MUiStorage_storageGetBoolean = function MUiStorage_storageGetBoolean(name, defaultValue){
      var o = this;
      var value = o.storageGet(name, defaultValue);
      return RBoolean.parse(value);
   }
   MO.MUiStorage_storageSet = function MUiStorage_storageSet(name, value){
      var o = this;
      if(name == null){
         throw new TError(o, 'Name is empty.');
      }
      var object = o._storageObject;
      if(!object){
         object = o._storageObject = new Object();
      }
      object[name] = value;
   }
   MO.MUiStorage_storageUpdate = function MUiStorage_storageUpdate(){
      var o = this;
      var object = o._storageObject;
      if(object){
         var storge = RWindow.storage(EScope.Local);
         var value = MO.Json.toString(object);
         storge.set(o._storageCode, value);
      }
   }
   MO.MUiStorage_dispose = function MUiStorage_dispose(){
      var o = this;
      o._storageCode = null;
      o._storageObject = null;
   }
}
with(MO){
   MO.MUiStyle = function MUiStyle(o){
      o = RClass.inherits(this, o);
      o.construct     = RMethod.empty;
      o.styleName     = MUiStyle_styleName;
      o.styleIcon     = MUiStyle_styleIcon;
      o.styleIconPath = MUiStyle_styleIconPath;
      o.dispose       = RMethod.empty;
      return o;
   }
   MO.MUiStyle_styleName = function MUiStyle_styleName(n, c){
      var o = this;
      var f = c ? c : o;
      var tn = RClass.name(f);
      var t = RClass.forName(tn);
      return t.style(n);
   }
   MO.MUiStyle_styleIcon = function MUiStyle_styleIcon(n, c){
      return RClass.name(c ? c : this, true) + '_' + n;
   }
   MO.MUiStyle_styleIconPath = function MUiStyle_styleIconPath(n, c){
      return RResource.iconPath(RClass.name(c ? c : this, true) + '_' + n);
   }
}
with(MO){
   MO.MUiValue = function MUiValue(o){
      o = RClass.inherits(this, o);
      o.get = RMethod.empty;
      o.set = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.MUiVertical = function MUiVertical(o){
      o = RClass.inherits(this, o);
      o.setVisible = MUiHorizontal_setVisible;
      return o;
   }
   MO.MUiHorizontal_setVisible = function MUiHorizontal_setVisible(p){
      var o = this;
      var h = o.hPanelLine;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
}
with(MO){
   MO.SServiceInfo = function SServiceInfo(){
      var o = this;
      o.service = null;
      o.action  = null;
      o.url     = null;
      return o;
   }
}
with(MO){
   MO.SUiSize2 = function SUiSize2(width, height){
      var o = this;
      SSize2.call(o, width, height);
      o.parse = SUiSize2_parse;
      return o;
   }
   MO.SUiSize2_parse = function SUiSize2_parse(source){
      var o = this;
      var items = source.split(',')
      if(items.length == 2){
         var width = items[0];
         if(RString.contains(width, '%')){
            o.width = width;
         }else{
            o.width = parseInt(width);
         }
         var height = items[1];
         if(RString.contains(height, '%')){
            o.height = height;
         }else{
            o.height = parseInt(height);
         }
      }else{
         throw new TError(o, "Parse value failure. (value={1})", items);
      }
   }
}
with(MO){
   MO.TDatasetFetchArg = function TDatasetFetchArg(o){
      if(!o){o = this;}
      o.datasets   = new TDictionary();
      o.saveConfig = TDatasetFetchArg_saveConfig;
      o.process    = TDatasetFetchArg_process;
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
}
with(MO){
   MO.TEvent = function TEvent(owner, code, proc){
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
}
with(MO){
   MO.TEventProcess = function TEventProcess(po, pm, pc){
      var o = this;
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
   MO.TEventProcess_isBefore = function TEventProcess_isBefore(){
      return this.invokeCd == EEventInvoke.Before;
   }
   MO.TEventProcess_isAfter = function TEventProcess_isAfter(){
      return this.invokeCd == EEventInvoke.After;
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
}
with(MO){
   MO.THtmlEvent = function THtmlEvent(){
      var o = this;
      o.linker  = null;
      o.events  = new Object();
      o.push    = THtmlEvent_push;
      o.dispose = THtmlEvent_dispose;
      o.dump    = THtmlEvent_dump;
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
}
with(MO){
   MO.TOrderItem = function TOrderItem(o){
      if(!o){o = this;}
      return o;
   }
   MO.TOrderItem_set = function TOrderItem_set(n, t){
      var o = this;
      o.name = n;
      o.type = t;
   }
   MO.TOrderItem_toNode = function TOrderItem_toNode(){
      var o = this;
      var n = new TNode('OrderItem');
      n.set('name', o.name);
      n.set('type', o.type);
      return n;
   }
   MO.TOrderItem_pack = function TOrderItem_pack(){
      var o = this;
      var as = new TAttributes();
      as.set("name", o.name);
      as.set("type", o.type);
      return as.pack();
   }
   MO.TOrderItem_unpack = function TOrderItem_unpack(s){
      var o = this;
      var as = new TAttributes();
      as.unpack(s);
      o.name = as.get("name");
      o.type = as.get("type");
   }
}
with(MO){
   MO.TOrderItems = function TOrderItems(o){
      if(!o){o = this;}
      TObjects(o);
   }
   MO.TOrderItems_pack = function TOrderItems_pack(){
      var o = this;
      var ts = new TStrings();
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
      var ts = new TStrings();
      ts.unpack(p);
      for(var n = 0; n < ts.count; n++){
         t = ts.get(n);
         var ti = new TOrderItem();
         ti.unpack(t);
         o.push(ti);
      }
   }
}
with(MO){
   MO.TSearchItem = function TSearchItem(o){
      if(!o){o = this;}
      return o;
   }
   MO.TSearchItem_set = function TSearchItem_set(n, v, t, f){
      var o = this;
      o.name  = n;
      o.type  = RString.nvl(t, ESearch.Equals);
      o.value = v;
      o.format = f;
   }
   MO.TSearchItem_toNode = function TSearchItem_toNode(){
      var o = this;
      var n = new TNode('SearchItem');
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
      var as = new TAttributes();
      as.set("name", o.name);
      as.set("type", o.type);
      as.set("value", o.value);
      as.set("format", o.format);
      return as.pack();
   }
   MO.TSearchItem_unpack = function TSearchItem_unpack(s){
      var o = this;
      var as = new TAttributes();
      as.unpack(s);
      o.name  = as.get("name");
      o.type  = as.get("type");
      o.value = as.get("value");
      o.format = as.get("format");
   }
}
with(MO){
   MO.TSearchItems = function TSearchItems(o){
      if(!o){o = this;}
      TObjects(o);
   }
   MO.TSearchItems_pack = function TSearchItems_pack(){
      var o = this;
      var ts = new TStrings();
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
}
with(MO){
   MO.FUiCanvas = function FUiCanvas(o){
      o = RClass.inherits(this, o, FUiControl);
      o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
      o.onBuildPanel = FUiCanvas_onBuildPanel;
      o.construct    = FUiCanvas_construct;
      o.dispose      = FUiCanvas_dispose;
      return o;
   }
   MO.FUiCanvas_onBuildPanel = function FUiCanvas_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.create(event, 'CANVAS', o.styleName('Canvas'));
   }
   MO.FUiCanvas_construct = function FUiCanvas_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
   }
   MO.FUiCanvas_dispose = function FUiCanvas_dispose(){
      var o = this;
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiComponent = function FUiComponent(o){
      o = RClass.inherits(this, o, FComponent, MProperty, MClone);
      o._guid         = RClass.register(o, [new APtyString('_guid'), new AGetSet('_guid')]);
      o._name         = RClass.register(o, [new APtyString('_name'), new AGetSet('_name')]);
      o._label        = RClass.register(o, [new APtyString('_label'), new AGetSet('_label')]);
      o._parent       = null;
      o._components   = null;
      o._tag          = RClass.register(o, new AGetSet('_tag'));
      o.oeInitialize  = FUiComponent_oeInitialize;
      o.oeRelease     = FUiComponent_oeRelease;
      o.topComponent  = FUiComponent_topComponent;
      o.hasComponent  = FUiComponent_hasComponent;
      o.findComponent = FUiComponent_findComponent;
      o.components    = FUiComponent_components;
      o.push          = FUiComponent_push;
      o.remove        = FUiComponent_remove;
      o.clear         = FUiComponent_clear;
      o.process       = FUiComponent_process;
      o.psInitialize  = FUiComponent_psInitialize;
      o.psRelease     = FUiComponent_psRelease;
      o.toString      = FUiComponent_toString;
      o.dispose       = FUiComponent_dispose;
      o.innerDumpInfo = FUiComponent_innerDumpInfo;
      o.innerDump     = FUiComponent_innerDump;
      return o;
   }
   MO.FUiComponent_oeInitialize = function FUiComponent_oeInitialize(e){
      return EEventStatus.Continue;
   }
   MO.FUiComponent_oeRelease = function FUiComponent_oeRelease(e){
      return EEventStatus.Continue;
   }
   MO.FUiComponent_topComponent = function FUiComponent_topComponent(c){
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
   MO.FUiComponent_hasComponent = function FUiComponent_hasComponent(){
      var s = this._components;
      return s ? !s.isEmpty() : false;
   }
   MO.FUiComponent_findComponent = function FUiComponent_findComponent(p){
      var s = this._components;
      return s ? s.get(p) : null;
   }
   MO.FUiComponent_components = function FUiComponent_components(){
      var o = this;
      var r = o._components;
      if(r == null){
         r = new TDictionary();
         o._components = r;
      }
      return r;
   }
   MO.FUiComponent_push = function FUiComponent_push(p){
      var o = this;
      if(RClass.isClass(p, FUiComponent)){
         var s = o.components();
         p._parent = o;
         if(p._name == null){
            p._name = s.count();
         }
         s.set(p._name, p);
      }
   }
   MO.FUiComponent_remove = function FUiComponent_remove(component){
      var o = this;
      if(!RClass.isClass(component, FUiComponent)){
         throw new TError(o, 'Parameter is not componet. (component={1})', component);
      }
      var components = o._components;
      if(!components.contains(component.name())){
         throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
      }
      components.removeValue(component);
   }
   MO.FUiComponent_clear = function FUiComponent_clear(p){
      var o = this;
      var s = o._components;
      if(s){
         s.clear();
      }
   }
   MO.FUiComponent_process = function FUiComponent_process(event){
      var o = this;
      var valid = o.__base[event.clazz];
      if(valid){
         event.invokeCd = EEventInvoke.Before;
         var callback = o[event.invoke];
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke before is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      if(RClass.isClass(o, MUiContainer)){
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
         if(!callback){
            return MO.Logger.fatal(o, null, 'Process invoke after is null. (sender={1}, invoke={2})', RClass.dump(o), event.invoke);
         }
         var result = callback.call(o, event);
         if((result == EEventStatus.Stop) || (result == EEventStatus.Cancel)){
            return result;
         }
      }
      return EEventStatus.Continue;
   }
   MO.FUiComponent_psInitialize = function FUiComponent_psInitialize(){
      var o = this;
      var e = new TEventProcess(o, 'oeInitialize', FUiComponent);
      o.process(e);
      e.dispose();
   }
   MO.FUiComponent_psRelease = function FUiComponent_psRelease(){
      var o = this;
      var e = new TEventProcess(o, 'oeRelease', FUiComponent);
      o.process(e);
      e.dispose();
   }
   MO.FUiComponent_toString = function FUiComponent_toString(){
      var o = this;
      return RClass.dump(o) + ':label=' + o._label;
   }
   MO.FUiComponent_dispose = function FUiComponent_dispose(){
      var o = this;
      o._parent = null;
      o._name = null;
      o._label = null;
      o._tag = null;
      o._components = RObject.dispose(o._components, true);
      o.__base.FComponent.dispose.call(o);
   }
   MO.FUiComponent_innerDumpInfo = function FUiComponent_innerDumpInfo(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append(',name=', o._name);
      s.append(',label=', o._label);
   }
   MO.FUiComponent_innerDump = function FUiComponent_innerDump(s, l){
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
}
with(MO){
   MO.FUiContainer = function FUiContainer(o){
      o = RClass.inherits(this, o, FUiControl, MUiContainer);
      o._scrollCd           = RClass.register(o, new APtyEnum('_scrollCd', null, EUiScroll, EUiScroll.None));
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
      o.remove              = FUiContainer_remove;
      o.clear               = FUiContainer_clear;
      o.dispose             = FUiContainer_dispose;
      return o;
   }
   MO.FUiContainer_construct = function FUiContainer_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
   }
   MO.FUiContainer_hasControl = function FUiContainer_hasControl(){
      var cs = this._controls;
      return cs ? !cs.isEmpty() : false;
   }
   MO.FUiContainer_findControl = function FUiContainer_findControl(p){
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
   MO.FUiContainer_searchControl = function FUiContainer_searchControl(p){
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
   MO.FUiContainer_controls = function FUiContainer_controls(){
      var o = this;
      var r = o._controls;
      if(r == null){
         r = new TDictionary();
         o._controls = r;
      }
      return r;
   }
   MO.FUiContainer_panel = function FUiContainer_panel(t){
      var o = this;
      if(t == EPanel.Container){
         return o._hPanel;
      }
      return o.__base.FUiControl.panel.call(o, t);
   }
   MO.FUiContainer_focusFirstControl = function FUiContainer_focusFirstControl(){
      var o = this;
      var cs = o._components;
      if(cs){
         var c = cs.count();
         for(var i = 0; i < c; i++){
            var p = cs.valueAt(i);
            if(RClass.isClass(c, MUiFocus) && c.testFocus()){
               if(!RClass.isClass(c, FCalendar) && !RClass.isClass(c, FSelect)  && !RClass.isClass(c, FNumber)){
                   return c.focus();
               }
            }
         }
         RConsole.find(FFocusConsole).focus(o);
      }
   }
   MO.FUiContainer_setControlsProperty = function FUiContainer_setControlsProperty(p, vs){
      var o = this;
      var cs = o._controls;
      if(cs){
         for(var i = cs.count() - 1; i >= 0; i--){
            var c = cs.value(i);
            c[p] = vs[n];
         }
      }
   }
   MO.FUiContainer_storeConfig = function FUiContainer_storeConfig(x){
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
   MO.FUiContainer_push = function FUiContainer_push(p){
      var o = this;
      o.__base.FUiControl.push.call(o, p);
      if(RClass.isClass(p, FUiControl)){
         o.controls().set(p._name, p);
         o.appendChild(p);
      }
   }
   MO.FUiContainer_remove = function FUiContainer_remove(component){
      var o = this;
      if(RClass.isClass(component, FUiControl)){
         var controls = o._controls;
         if(!controls.contains(component.name())){
            throw new TError(o, 'Parameter component is not in this component. (name={1})', component.name());
         }
         controls.removeValue(component);
         o.removeChild(component);
      }
      o.__base.FUiControl.remove.call(o, component);
   }
   MO.FUiContainer_clear = function FUiContainer_clear(){
      var o = this;
      var s = o._controls;
      if(s){
         for(var i = s.count() - 1; i >= 0; i--){
            o.removeChild(s.valueAt(i));
         }
         s.clear();
      }
      o.__base.FUiControl.clear.call(o);
   }
   MO.FUiContainer_dispose = function FUiContainer_dispose(){
      var o = this;
      var v = o._controls;
      if(v){
         v.dispose();
         o._controls = null;
      }
      o.__base.FUiControl.dispose.call(o);
   }
}
MO.FUiControl = function FUiControl(o){
   o = MO.Class.inherits(this, o, MO.FUiComponent, MO.MUiStyle, MO.MUiSize, MO.MUiPadding, MO.MUiMargin);
   o._wrapCd        = MO.Class.register(o, [new MO.APtyEnum('_wrapCd', null, MO.EUiWrap, MO.EUiWrap.NextLine), new MO.AGetSet('_wrapCd')]);
   o._visible       = MO.Class.register(o, new MO.APtyBoolean('_visible'), true);
   o._disable       = MO.Class.register(o, new MO.APtyBoolean('_disable'), false);
   o._hint          = MO.Class.register(o, new MO.APtyString('_hint'));
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
   o.onEnter        = MO.Class.register(o, new MO.AEventMouseEnter('onEnter'), MO.FUiControl_onEnter);
   o.onLeave        = MO.Class.register(o, new MO.AEventMouseLeave('onLeave'), MO.FUiControl_onLeave);
   o.onBuildPanel   = MO.FUiControl_onBuildPanel;
   o.onBuild        = MO.FUiControl_onBuild;
   o.onBuilded      = MO.Method.empty;
   o.oeMode         = MO.FUiControl_oeMode;
   o.oeEnable       = MO.FUiControl_oeEnable;
   o.oeVisible      = MO.FUiControl_oeVisible;
   o.oeResize       = MO.FUiControl_oeResize;
   o.oeRefresh      = MO.FUiControl_oeRefresh;
   o.oeFrame        = MO.FUiControl_oeFrame;
   o.construct      = MO.FUiControl_construct;
   o.topControl     = MO.FUiControl_topControl;
   o.panel          = MO.FUiControl_panel;
   o.isVisible      = MO.FUiControl_isVisible;
   o.setVisible     = MO.FUiControl_setVisible;
   o.show           = MO.FUiControl_show;
   o.hide           = MO.FUiControl_hide;
   o.isEnable       = MO.FUiControl_isEnable;
   o.setEnable      = MO.FUiControl_setEnable;
   o.enable         = MO.FUiControl_enable;
   o.disable        = MO.FUiControl_disable;
   o.attachEvent    = MO.FUiControl_attachEvent;
   o.linkEvent      = MO.FUiControl_linkEvent;
   o.callEvent      = MO.FUiControl_callEvent;
   o.psMode         = MO.FUiControl_psMode;
   o.psDesign       = MO.FUiControl_psDesign;
   o.psEnable       = MO.FUiControl_psEnable;
   o.psVisible      = MO.FUiControl_psVisible;
   o.psResize       = MO.FUiControl_psResize;
   o.psRefresh      = MO.FUiControl_psRefresh;
   o.psFrame        = MO.FUiControl_psFrame;
   o.isBuild        = MO.FUiControl_isBuild;
   o.build          = MO.FUiControl_build;
   o.builded        = MO.FUiControl_builded;
   o.refresh        = MO.FUiControl_refresh;
   o.setPanel       = MO.FUiControl_setPanel;
   o.dispose        = MO.FUiControl_dispose;
   return o;
}
MO.FUiControl_onEnter = function FUiControl_onEnter(e){
   var o = this;
   MO.Console.find(MO.FUiFocusConsole).enter(o);
   if(o._hint){
      MO.RWindow.setStatus(o._hint);
   }
}
MO.FUiControl_onLeave = function FUiControl_onLeave(e){
   var o = this;
   MO.Console.find(MO.FUiFocusConsole).leave(o);
   if(o._hint){
      MO.RWindow.setStatus();
   }
}
MO.FUiControl_onBuildPanel = function FUiControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(p, o.styleName('Panel'));
}
MO.FUiControl_onBuild = function FUiControl_onBuild(p){
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
MO.FUiControl_oeMode = function FUiControl_oeMode(e){
   var o = this;
   o._displayCd = e.displayCd;
   return MO.EEventStatus.Continue;
}
MO.FUiControl_oeEnable = function FUiControl_oeEnable(e){
   var o = this;
   if(e.isBefore()){
      o.setEnable(e.enable);
   }
   return MO.EEventStatus.Continue;
}
MO.FUiControl_oeVisible = function FUiControl_oeVisible(e){
   var o = this;
   if(e.isBefore()){
      o.setVisible(e.visible);
   }
   return MO.EEventStatus.Continue;
}
MO.FUiControl_oeResize = function FUiControl_oeResize(p){
   return MO.EEventStatus.Continue;
}
MO.FUiControl_oeRefresh = function FUiControl_oeRefresh(e){
   return MO.EEventStatus.Continue;
}
MO.FUiControl_oeFrame = function FUiControl_oeFrame(event){
   return MO.EEventStatus.Continue;
}
MO.FUiControl_construct = function FUiControl_construct(){
   var o = this;
   o.__base.FUiComponent.construct.call(o);
   o.__base.MUiStyle.construct.call(o);
   o.__base.MUiSize.construct.call(o);
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
}
MO.FUiControl_topControl = function FUiControl_topControl(c){
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
         if(!MO.Class.isClass(r._parent, FUiControl)){
            break;
         }
         r = r._parent;
      }
   }
   return r;
}
MO.FUiControl_panel = function FUiControl_panel(p){
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
MO.FUiControl_isVisible = function FUiControl_isVisible(){
   return this._statusVisible;
}
MO.FUiControl_setVisible = function FUiControl_setVisible(p){
   var o = this;
   o._statusVisible = p;
   var h = o.panel(MO.EPanel.Container);
   if(h){
      MO.RHtml.visibleSet(h, p);
   }
}
MO.FUiControl_show = function FUiControl_show(){
   var o = this;
   if(!o._statusVisible){
      o.setVisible(true);
   }
}
MO.FUiControl_hide = function FUiControl_hide(){
   var o = this;
   if(o._statusVisible){
      o.setVisible(false);
   }
}
MO.FUiControl_isEnable = function FUiControl_isEnable(){
   return this._statusEnable;
}
MO.FUiControl_setEnable = function FUiControl_setEnable(p){
   var o = this;
   o._statusEnable = p;
   var h = o.panel(EPanel.Container);
   if(h){
      h.style.disabled = !p;
   }
}
MO.FUiControl_enable = function FUiControl_enable(){
   var o = this;
   if(!o._statusEnable){
      o.setEnable(true);
   }
}
MO.FUiControl_disable = function FUiControl_disable(){
   var o = this;
   if(o._statusEnable){
      o.setEnable(false);
   }
}
MO.FUiControl_attachEvent = function FUiControl_attachEvent(n, h, m, u){
   return MO.RUiControl.attachEvent(this, n, h, m, u);
}
MO.FUiControl_linkEvent = function FUiControl_linkEvent(t, n, h, m){
   return MO.RUiControl.linkEvent(this, t, n, h, m);
}
MO.FUiControl_callEvent = function FUiControl_callEvent(n, s, e){
   var o = this;
   var es = o._events;
   if(es){
      var ec = es.get(n);
      if(ec){
         ec.invoke(s, s, e);
      }
   }
}
MO.FUiControl_psMode = function FUiControl_psMode(p){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeMode', MO.FUiControl);
   e.displayCd = p;
   o.process(e);
   e.dispose();
}
MO.FUiControl_psDesign = function FUiControl_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   var e = new MO.TEventProcess(o, 'oeDesign', MO.MDesign)
   e.mode = m;
   e.flag = f;
   o.process(e);
   e.dispose();
}
MO.FUiControl_psEnable = function FUiControl_psEnable(v){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeEnable', MO.FUiControl)
   e.enable = v;
   o.process(e);
   e.dispose();
}
MO.FUiControl_psVisible = function FUiControl_psVisible(v){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeVisible', MO.FUiControl);
   e.visible = v;
   o.process(e);
   e.dispose();
}
MO.FUiControl_psResize = function FUiControl_psResize(){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeResize', MO.FUiControl);
   o.process(e);
   e.dispose();
}
MO.FUiControl_psRefresh = function FUiControl_psRefresh(t){
   var o = this;
   var e = new MO.TEventProcess(o, 'oeRefresh', MO.FUiControl);
   o.process(e);
   e.dispose();
}
MO.FUiControl_psFrame = function FUiControl_psFrame(){
   var o = this;
   var event = new MO.TEventProcess(o, 'oeFrame', MO.FUiControl);
   o.process(event);
   event.dispose();
}
MO.FUiControl_isBuild = function FUiControl_isBuild(){
   return this._statusBuild;
}
MO.FUiControl_build = function FUiControl_build(p){
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
MO.FUiControl_builded = function FUiControl_builded(p){
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
MO.FUiControl_refresh = function FUiControl_refresh(){
   var o = this;
   if(!o._statusBuild){
      throw new MO.TError(o, 'Current control is not build.');
   }
}
MO.FUiControl_setPanel = function FUiControl_setPanel(h){
   var o = this;
   o._hParent = h;
   h.appendChild(o._hPanel);
}
MO.FUiControl_dispose = function FUiControl_dispose(){
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
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
   o.__base.MUiSize.dispose.call(o);
   o.__base.MUiStyle.dispose.call(o);
   o.__base.FUiComponent.dispose.call(o);
}
MO.FUiWorkspace = function FUiWorkspace(o){
   o = MO.Class.inherits(this, o, MO.FUiContainer, MO.MUiDescribeFrame);
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._frames      = null;
   o._hContainer  = null;
   o.onBuildPanel = MO.FUiWorkspace_onBuildPanel;
   o.appendChild  = MO.FUiWorkspace_appendChild;
   return o;
}
MO.FUiWorkspace_onBuildPanel = function FUiWorkspace_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.RBuilder.createDiv(event, o.styleName('Panel'));
}
MO.FUiWorkspace_appendChild = function FUiWorkspace_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, MO.FUiFrameSet)){
      o._hPanel.appendChild(control._hPanel);
   }else{
      throw new MO.TError(o, 'Unknown child type.');
   }
}
with(MO){
   MO.RUiControl = function RUiControl(){
      var o = this;
      o.PREFIX    = 'FUi';
      o.inMoving  = false;
      o.inSizing  = false;
      o.inDesign  = false;
      o.instances = new TObjects();
      o.events    = new TMap();
      o.controls  = new TMap();
      return o;
   }
   MO.RUiControl.prototype.newInstance = function RUiControl_newInstance(p){
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
   MO.RUiControl.prototype.attachEvent = function RUiControl_attachEvent(c, n, h, m, u){
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
         e.process = RUiEvent.onProcess;
         RUiEvent.find(h).push(a.linker(), e);
         RHtml.linkSet(h, '_plink', c);
         a.bind(h, u);
      }
      return e;
   }
   MO.RUiControl.prototype.innerCreate = function RUiControl_innerCreate(pc, px, pa){
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
   MO.RUiControl.prototype.create = function RUiControl_create(pc, px, pa){
      var o = this;
      var c = null;
      if(pc){
         c = pc;
      }else{
         c = RUiControl.newInstance(px.name());
      }
      o.innerCreate(c, px, pa);
      return c;
   }
   MO.RUiControl.prototype.innerbuild = function RUiControl_innerbuild(pr, pc, px, pa, ph){
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
   MO.RUiControl.prototype.build = function RUiControl_build(c, x, a, h){
      var o = this;
      if(!c){
         c = RUiControl.newInstance(x);
      }
      o.innerbuild(c, c, x, a, h);
      return c;
   }
   MO.RUiControl.prototype.setStyleScroll = function RUiControl_setStyleScroll(h, c){
      var s = h.style;
      switch(c){
         case EUiScroll.None:
            s.overflowX = '';
            s.overflowY = '';
            break;
         case EUiScroll.Horizontal:
            s.overflowX = 'scroll';
            break;
         case EUiScroll.HorizontalAuto:
            s.overflowX = 'auto';
            break;
         case EUiScroll.Vertical:
            s.overflowY = 'scroll';
            break;
         case EUiScroll.VerticalAuto:
            s.overflowY = 'auto';
            break;
         case EUiScroll.Both:
            s.overflow = 'scroll';
            break;
         case EUiScroll.BothAuto:
            s.overflow = 'auto';
            break;
         default:
            throw new TError(o, 'Unknown scroll type. (scroll_cd={1})', c);
      }
   }
   MO.RUiControl.prototype.linkEvent = function RUiControl_linkEvent(tc, sc, n, h, m){
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
         e.process = RUiEvent.onProcess;
         RUiEvent.find(h).push(e.type, e);
         h[e.handle] = RUiEvent.ohEvent;
         RHtml.linkSet(h, '_plink', tc);
         return e;
      }
   }
   MO.RUiControl.prototype.find = function RUiControl_find(c){
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
   MO.RUiControl.prototype.fromNode = function RUiControl_fromNode(x, h){
      if(x){
         return this.create(x, h);
      }
   }
   MO.RUiControl.prototype.fromXml = function RUiControl_fromXml(xml, hPanel, mode){
      var c = null;
      var x = RXml.makeNode(xml);
      if(x){
         c = this.create(x, hPanel, mode);
      }
      return c;
   }
   MO.RUiControl.prototype.toNode = function RUiControl_toNode(){
   }
   MO.RUiControl.prototype.toXml = function RUiControl_toXml(){
   }
   MO.RUiControl.prototype.store = function RUiControl_store(o, type){
      var x = new TNode();
      x.name = RClass.name(o).substr(1);
      if(RClass.isClass(o, FContainer)){
         o.storeConfig(x);
      }else{
         o.saveConfig(x);
      }
      return x;
   }
   MO.RUiControl.prototype.htmlControl = function RUiControl_htmlControl(e, c){
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
   MO.RUiControl.prototype.psDesign = function RUiControl_psDesign(action, mode, flag, params){
      var cs = this.instances;
      if(cs && cs.count){
         var l = cs.count;
         for(var n=0; n<l; n++){
            cs.get(n).psDesign(action, mode, flag, params);
         }
      }
   }
   MO.RUiControl.prototype.psMode = function RUiControl_psMode(action, mode, flag, params){
      var cs = this.instances;
      if(cs && cs.count){
         var l = cs.count;
         for(var n=0; n<l; n++){
            cs.get(n).psMode(action, mode, flag, params);
         }
      }
   }
   MO.RUiControl.prototype.isInfo = function RUiControl_isInfo(v){
      return v ? (0 == v.indexOf('C#')) : false;
   }
   MO.RUiControl.prototype.isGroup = function RUiControl_isGroup(v){
      return v ? (0 == v.indexOf('G#')) : false;
   }
   MO.RUiControl = new RUiControl();
}
with(MO){
   MO.RUiEvent = function RUiEvent(){
      var o = this;
      o._objects  = new Array();
      o.current   = 0;
      o.events    = new Array();
      return o;
   }
   MO.RUiEvent.prototype.ohEvent = function RUiEvent_ohEvent(e){
      RUiEvent.process(this, e ? e : window.event);
   }
   MO.RUiEvent.prototype.onProcess = function RUiEvent_onProcess(e){
      var e = this;
      var ea = e.annotation;
      if(ea._logger){
         MO.Logger.debug(e, 'Process {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.onProcess));
      }
      if(e.sender){
         e.onProcess.call(e.source, e.sender, e);
      }else{
         e.onProcess.call(e.source, e);
      }
   }
   MO.RUiEvent.prototype.find = function RUiEvent_find(p){
      var u = RHtml.uid(p);
      var es = this._objects;
      var e = es[u];
      if(e == null){
         e = es[u] = new THtmlEvent();
         e.linker = p;
      }
      return e;
   }
   MO.RUiEvent.prototype.process = function RUiEvent_process(hs, he){
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
                     MO.Logger.debug(e, 'Execute {1}. (source={2}, html={3}, process={4})', ea._handle, RClass.dump(e.source), RClass.dump(e.hSource), RMethod.name(e.ohProcess));
                  }
                  e.ohProcess.call(e.source, e);
               }else if(e.onProcess){
                  RConsole.find(FUiFrameEventConsole).push(e);
               }
            }
            return true;
         }
      }
      return false;
   }
   MO.RUiEvent.prototype.release = function RUiEvent_release(){
      var o = this;
      var v = o._objects;
      if(v){
         RMemory.free(v);
         o._objects = null;
      }
   }
   MO.RUiEvent.prototype.nvl = function RUiEvent_nvl(event, sender, code){
      if(!event){
         event = new TEvent();
      }
      event.sender = sender;
      event.code = code;
      return event;
   }
   MO.RUiEvent.prototype.alloc = function RUiEvent_alloc(s, c){
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
   MO.RUiEvent.prototype.free = function RUiEvent_free(e){
      e.inUsing = false;
   }
   MO.RUiEvent = new RUiEvent();
}
with(MO){
   MO.RUiLayer = function RUiLayer(){
      var o = this;
      o._layers = new Array();
      return o;
   }
   MO.RUiLayer.prototype.next = function RUiLayer_next(p){
      var o = this;
      var n = RInteger.nvl(p, EUiLayer.Default);
      var c = RInteger.nvl(o._layers[n], n);
      o._layers[n] = ++c;
      return c;
   }
   MO.RUiLayer.prototype.free = function RUiLayer_free(p, l){
      var o = this;
      var n = RInteger.nvl(p, EUiLayer.Default);
      var c = RInteger.nvl(o._layers[n], n);
      --c;
      if(c > n){
         o._layers[n] = c;
      }
      return c;
   }
   MO.RUiLayer = new RUiLayer();
}
with(MO){
   MO.RUiService = function RUiService(){
      var o = this;
      o._services = new TDictionary();
      return o;
   }
   MO.RUiService.prototype.url = function RUiService_url(p){
      if(RString.startsWith(p, 'http://')){
         return p;
      }
      if(RString.startsWith(p, '#')){
         return p.substr(1);
      }
      if(!RString.startsWith(p, '/')){
         p = '/' + p;
      }
      return p + '.ws';
   }
   MO.RUiService.prototype.makeUrl = function RUiService_makeUrl(s, a){
      return this.url(s) + '?action=' + a;
   }
   MO.RUiService.prototype.parse = function RUiService_parse(p){
      var o = this;
      var s = null;
      var ss = o._services;
      if(p){
         s = ss.get(p);
         if(s == null){
            var ps = p.split('@');
            if(ps.length == 1){
               if(ps[0]){
                  s = new SServiceInfo();
                  s.service = ps[0];
                  s.action = null;
                  s.url = o.url(ps[0]);
               }
            }else if(ps.length == 2){
               if(ps[0] && ps[1]){
                  s = new SServiceInfo();
                  s.service = ps[1];
                  s.action = ps[0];
                  s.url = o.url(ps[1]) + '?action=' + ps[0];
               }
            }
         }
         if(s == null){
            throw new TError(o, 'Unknown service format. (source={1})', p);
         }
         ss.set(p, s);
      }
      return s;
   }
   MO.RUiService = new RUiService();
}
with(MO){
   MO.FUiConfirmDialog = function FUiConfirmDialog(o){
      o = RClass.inherits(this, o, FUiDialog, MListenerResult);
      o._styleText            = RClass.register(o, new AStyle('_styleText'));
      o._frameName            = 'system.dialog.ConfirmDialog';
      o._controlText          = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FUiConfirmDialog_onBuilded;
      o.onConfirmClick        = FUiConfirmDialog_onConfirmClick;
      o.onCancelClick         = FUiConfirmDialog_onCancelClick;
      o.construct             = FUiConfirmDialog_construct;
      o.setText               = FUiConfirmDialog_setText;
      o.dispose               = FUiConfirmDialog_dispose;
      return o;
   }
   MO.FUiConfirmDialog_onBuilded = function FUiConfirmDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlText._hPanel.className = o.styleName('Text');
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FUiConfirmDialog_onConfirmClick = function FUiConfirmDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiConfirmDialog_onCancelClick = function FUiConfirmDialog_onCancelClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Cancel;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiConfirmDialog_construct = function FUiConfirmDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiConfirmDialog_setText = function FUiConfirmDialog_setText(value){
      this._controlText.set(value);
   }
   MO.FUiConfirmDialog_dispose = function FUiConfirmDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiDescribeFrameConsole = function FUiDescribeFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Global;
      o._service       = 'cloud.describe.frame';
      o._defines       = null;
      o.lsnsLoaded     = null;
      o.construct      = FUiDescribeFrameConsole_construct;
      o.load           = FUiDescribeFrameConsole_load;
      o.events         = null;
      o.formId         = 0;
      o.createFromName = FUiDescribeFrameConsole_createFromName;
      o.loadNode       = FUiDescribeFrameConsole_loadNode;
      o.loadService    = FUiDescribeFrameConsole_loadService;
      o.nextFormId     = FUiDescribeFrameConsole_nextFormId;
      o.get            = FUiDescribeFrameConsole_get;
      o.find           = FUiDescribeFrameConsole_find;
      o.getLov         = FUiDescribeFrameConsole_getLov;
      o.findLov        = FUiDescribeFrameConsole_findLov;
      o.getEvents      = FUiDescribeFrameConsole_getEvents;
      return o;
   }
   MO.FUiDescribeFrameConsole_construct = function FUiDescribeFrameConsole_construct(){
      var o = this;
      o._defines = new TDictionary();
      o.lsnsLoaded = new TListeners();
   }
   MO.FUiDescribeFrameConsole_load = function FUiDescribeFrameConsole_load(name){
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
      var url = RUiService.url(o._service);
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
         throw new TError(o, 'Unknown frame. (name={1])', name);
      }
      return xframe;
   }
   MO.FUiDescribeFrameConsole_createFromName = function FUiDescribeFrameConsole_createFromName(name, type){
      var o = this;
      var doc = o.loadService(name, type);
      o.loadNode(doc);
      if(EForm.Lov == type){
         return o.getLov(name);
      }else{
         return o.get(name);
      }
   }
   MO.FUiDescribeFrameConsole_loadNode = function FUiDescribeFrameConsole_loadNode(x){
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
   MO.FUiDescribeFrameConsole_loadService = function FUiDescribeFrameConsole_loadService(n, t){
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
      var url = RUiService.url('logic.webform');
      var doc = RConsole.find(FXmlConsole).send(url, doc);
      var r = doc.root();
      if(!RConsole.find(FMessageConsole).checkResult(new TMessageArg(r))){
         return null;
      }
      return doc;
   }
   MO.FUiDescribeFrameConsole_nextFormId = function FUiDescribeFrameConsole_nextFormId(){
      return ++this.formId;
   }
   MO.FUiDescribeFrameConsole_get = function FUiDescribeFrameConsole_get(n){
      return this._defines.get(EForm.Form).get(n);
   }
   MO.FUiDescribeFrameConsole_find = function FUiDescribeFrameConsole_find(n, t){
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
   MO.FUiDescribeFrameConsole_getLov = function FUiDescribeFrameConsole_getLov(n){
      return this._defines.get(EForm.Lov).get(n);
   }
   MO.FUiDescribeFrameConsole_findLov = function FUiDescribeFrameConsole_findLov(n){
      var o = this;
      var fc = o.getLov(n);
      if(!fc){
         fc = o.createFromName(n, EForm.Lov);
      }
      return fc;
   }
   MO.FUiDescribeFrameConsole_getEvents = function FUiDescribeFrameConsole_getEvents(n){
      return this.events.get(n);
   }
}
with(MO){
   MO.FUiDesktopConsole = function FUiDesktopConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._maskVisible     = false;
      o._statusEnable    = true;
      o._loadingVisible  = false;
      o._progressVisible = false;
      o._progressBar     = null;
      o._hMaskPanel      = null;
      o._hLoadingPanel   = null;
      o._hLoadingLabel   = null;
      o.construct        = FUiDesktopConsole_construct;
      o.getMaskPanel     = FUiDesktopConsole_getMaskPanel;
      o.getProgressBar   = FUiDesktopConsole_getProgressBar;
      o.getLoadingPanel  = FUiDesktopConsole_getLoadingPanel;
      o.setMaskVisible   = FUiDesktopConsole_setMaskVisible;
      o.isEnable         = FUiDesktopConsole_isEnable;
      o.enable           = FUiDesktopConsole_enable;
      o.disable          = FUiDesktopConsole_disable;
      o.showLoading      = FUiDesktopConsole_showLoading;
      o.showUploading    = FUiDesktopConsole_showUploading;
      o.showProgress     = FUiDesktopConsole_showProgress;
      o.hide             = FUiDesktopConsole_hide;
      return o;
   }
   MO.FUiDesktopConsole_construct = function FUiDesktopConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
   }
   MO.FUiDesktopConsole_getMaskPanel = function FUiDesktopConsole_getMaskPanel(){
      var o = this;
      var hDocument = top.MO.RWindow._hDocument;
      var hPanel = o._hMaskPanel;
      if(!hPanel){
         hPanel = o._hMaskPanel = RBuilder.createTable(hDocument, 'FUiDesktopConsole_MaskPanel');
         hPanel.style.zIndex = 5000;
         var hInnerPanel = o._hMaskInnerPanel = RBuilder.appendTableRowCell(hPanel);
         hInnerPanel.align = 'center';
         hInnerPanel.vAlign = 'middle';
      }
      return hPanel;
   }
   MO.FUiDesktopConsole_getLoadingPanel = function FUiDesktopConsole_getLoadingPanel(){
      var o = this;
      var hDocument = top.MO.RWindow._hDocument;
      var hPanel = o._hLoadingPanel;
      if(!hPanel){
         hPanel = o._hLoadingPanel = RBuilder.createTable(hDocument);
         var hCell = RBuilder.appendTableRowCell(hPanel);
         var hIcon = o._hLoadingIcon = RBuilder.appendIcon(hCell);
         hIcon.src = RResource.iconPath('control.RWindow_Loading');
         var hCell = o._hLoadingLabel = RBuilder.appendTableRowCell(hPanel);
         hCell.align = 'center';
         hCell.style.color = '#FFFFFF';
      }
      return hPanel;
   }
   MO.FUiDesktopConsole_getProgressBar = function FUiDesktopConsole_getProgressBar(){
      var o = this;
      var progressBar = o._progressBar;
      if(!progressBar){
         progressBar = o._progressBar = RClass.create(FUiProgressBar);
         progressBar.build(top.MO.RWindow._hDocument);
      }
      return progressBar;
   }
   MO.FUiDesktopConsole_setMaskVisible = function FUiDesktopConsole_setMaskVisible(visible){
      var o = this;
      if(o._maskVisible != visible){
         var hDocument = top.MO.RWindow._hDocument;
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
   MO.FUiDesktopConsole_isEnable = function FUiDesktopConsole_isEnable(){
      return this._statusEnable;
   }
   MO.FUiDesktopConsole_enable = function FUiDesktopConsole_enable(){
      var o = this;
      o._disableDeep--;
      if(o._disableDeep == 0){
         o.setEnable(true);
      }
   }
   MO.FUiDesktopConsole_disable = function FUiDesktopConsole_disable(){
      var o = this;
      if(o._disableDeep == 0){
         o.setEnable(false);
      }
      o._disableDeep++;
   }
   MO.FUiDesktopConsole_showLoading = function FUiDesktopConsole_showLoading(){
      var o = this;
      o.setMaskVisible(true);
      if(!o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         RHtml.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
         o._hMaskInnerPanel.appendChild(hLoadingPanel);
         o._loadingVisible = true;
      }
   }
   MO.FUiDesktopConsole_showUploading = function FUiDesktopConsole_showUploading(){
      var o = this;
      o.setMaskVisible(true);
      if(!o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         RHtml.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
         o._hMaskInnerPanel.appendChild(hLoadingPanel);
         o._loadingVisible = true;
      }
   }
   MO.FUiDesktopConsole_showProgress = function FUiDesktopConsole_showProgress(rate){
      var o = this;
      o.setMaskVisible(true);
      if(!o._progressVisible){
         var hMaskPanel = o.getMaskPanel();
         var progressBar = o.getProgressBar();
         hMaskPanel.appendChild(progressBar._hPanel);
         o._progressVisible = true;
      }
   }
   MO.FUiDesktopConsole_hide = function FUiDesktopConsole_hide(){
      var o = this;
      if(o._loadingVisible){
         var hLoadingPanel = o.getLoadingPanel();
         o._hMaskInnerPanel.removeChild(hLoadingPanel);
         o._loadingVisible  = false;
      }
      o.setMaskVisible(false);
   }
}
with(MO){
   MO.FUiEditorConsole = function FUiEditorConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Local;
      o._hoverEditor = null;
      o._focusEditor = null;
      o._editors     = null;
      o.construct    = FUiEditorConsole_construct;
      o.makeName     = FUiEditorConsole_makeName;
      o.enter        = FUiEditorConsole_enter;
      o.leave        = FUiEditorConsole_leave;
      o.focus        = FUiEditorConsole_focus;
      o.blur         = FUiEditorConsole_blur;
      o.lost         = FUiEditorConsole_lost;
      return o;
   }
   MO.FUiEditorConsole_construct = function FUiEditorConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._editors = new TDictionary();
   }
   MO.FUiEditorConsole_makeName = function FUiEditorConsole_makeName(cls, name){
      return name ? name + '@' + RClass.name(cls) : RClass.name(cls);
   }
   MO.FUiEditorConsole_enter = function FUiEditorConsole_enter(editable, cls){
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
   MO.FUiEditorConsole_leave = function FUiEditorConsole_leave(editor){
      var o = this;
      if(o._hoverEditor != o._focusEditor){
         editor = RObject.nvl(editor, o._hoverEditor);
         o._hoverEditor = null;
         RLog.debug(o, 'Leave {1}', RClass.dump(editor));
      }
   }
   MO.FUiEditorConsole_focus = function FUiEditorConsole_focus(c, n, l){
      var o = this;
      var name = o.makeName(n, l);
      var e = o._editors.get(l);
      if(!e){
         e = RClass.create(n);
         e.build(c._hPanel);
         o._editors.set(l, e);
      }
      MO.Logger.debug(o, 'Focus editor {1} (editable={2}, name={3})', RClass.dump(e), RClass.dump(c), l);
      e.reset();
      if(RClass.isClass(e, FUiDropEditor)){
         e.linkControl(c);
         o._focusEditor = e;
      }
      return e;
   }
   MO.FUiEditorConsole_blur = function FUiEditorConsole_blur(editor){
      var o = this;
      if(o._focusEditor){
         MO.Logger.debug(o, 'Blur editor {1}', RClass.dump(editor));
         editor = RObject.nvl(editor, o._focusEditor);
         if(editor){
            editor.onEditEnd();
         }
         o._focusEditor = null;
      }
   }
   MO.FUiEditorConsole_lost = function FUiEditorConsole_lost(e){
      var o = this;
      o.leave(e);
      o.blur(e);
   }
}
with(MO){
   MO.FUiEnvironmentConsole = function FUiEnvironmentConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope       = EScope.Local;
      o.environment = null;
      o.connect     = FUiEnvironmentConsole_connect;
      o.build       = FUiEnvironmentConsole_build;
      o.buildValue  = FUiEnvironmentConsole_buildValue;
      o.load        = FUiEnvironmentConsole_load;
      o.xml         = FUiEnvironmentConsole_xml;
      return o;
   }
   MO.FUiEnvironmentConsole_connect = function FUiEnvironmentConsole_connect(){
   }
   MO.FUiEnvironmentConsole_build = function FUiEnvironmentConsole_build(config){
      var o = this;
      if(!o.environment){
         o.connect()
      }
      if(o.environment){
         var node = config.create('Environment');
         node.attributes().append(this.environment.attributes());
      }
   }
   MO.FUiEnvironmentConsole_buildValue = function FUiEnvironmentConsole_buildValue(){
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
   MO.FUiEnvironmentConsole_load = function FUiEnvironmentConsole_load(p){
      this.environment = RXml.makeNode(p);
   }
   MO.FUiEnvironmentConsole_xml = function FUiEnvironmentConsole_xml(){
      if(!this.environment){
         this.connect()
      }
      if(this.environment){
         return this.environment.xml();
      }
      return null;
   }
}
with(MO){
   MO.FUiErrorDialog = function FUiErrorDialog(o){
      o = RClass.inherits(this, o, FUiDialog, MListenerResult);
      o._styleText            = RClass.register(o, new AStyle('_styleText'));
      o._frameName            = 'system.dialog.ErrorDialog';
      o._controlText          = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FUiErrorDialog_onBuilded;
      o.onConfirmClick        = FUiErrorDialog_onConfirmClick;
      o.construct             = FUiErrorDialog_construct;
      o.setCode               = FUiErrorDialog_setCode;
      o.setDescription        = FUiErrorDialog_setDescription;
      o.dispose               = FUiErrorDialog_dispose;
      return o;
   }
   MO.FUiErrorDialog_onBuilded = function FUiErrorDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
   }
   MO.FUiErrorDialog_onConfirmClick = function FUiErrorDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiErrorDialog_construct = function FUiErrorDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiErrorDialog_setCode = function FUiErrorDialog_setCode(value){
      this._controlCode.set(value);
   }
   MO.FUiErrorDialog_setDescription = function FUiErrorDialog_setDescription(value){
      this._controlDescription.set(value);
   }
   MO.FUiErrorDialog_dispose = function FUiErrorDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiFocusConsole = function FUiFocusConsole(o){
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
      o.onMouseDown        = FUiFocusConsole_onMouseDown;
      o.onMouseWheel       = FUiFocusConsole_onMouseWheel;
      o.construct          = FUiFocusConsole_construct;
      o.enter              = FUiFocusConsole_enter;
      o.leave              = FUiFocusConsole_leave;
      o.isFocus            = FUiFocusConsole_isFocus;
      o.focus              = FUiFocusConsole_focus;
      o.blur               = FUiFocusConsole_blur;
      o.findClass          = FUiFocusConsole_findClass;
      o.focusClass         = FUiFocusConsole_focusClass;
      o.focusHtml          = FUiFocusConsole_focusHtml;
      o.lockBlur           = FUiFocusConsole_lockBlur;
      o.unlockBlur         = FUiFocusConsole_unlockBlur;
      o.storeFocus         = FUiFocusConsole_storeFocus;
      o.restoreFocus       = FUiFocusConsole_restoreFocus;
      o.dispose            = FUiFocusConsole_dispose;
      return o;
   }
   MO.FUiFocusConsole_onMouseDown = function FUiFocusConsole_onMouseDown(p){
      this.focusHtml(p.hSource);
   }
   MO.FUiFocusConsole_onMouseWheel = function FUiFocusConsole_onMouseWheel(s, e){
      var o = this;
   }
   MO.FUiFocusConsole_construct = function FUiFocusConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._focusClasses = new Object();
      o.lsnsFocus = new TListeners();
      o.lsnsBlur = new TListeners();
      o.lsnsFocusClass = new TListeners();
      MO.Logger.info(o, 'Add listener for window mouse down and wheel.');
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
   }
   MO.FUiFocusConsole_enter = function FUiFocusConsole_enter(c){
      var o = this;
      if(RClass.isClass(c, MUiContainer)){
         o._hoverContainer = c;
      }else{
         o._hoverControl = c;
      }
   }
   MO.FUiFocusConsole_leave = function FUiFocusConsole_leave(c){
      var o = this;
      if(o._hoverContainer == c){
         o._hoverContainer = null;
      }
      if(o._hoverControl == c){
         o._hoverControl = null;
      }
   }
   MO.FUiFocusConsole_isFocus = function FUiFocusConsole_isFocus(c){
      return (this._focusControl == c);
   }
   MO.FUiFocusConsole_focus = function FUiFocusConsole_focus(c, e){
      var o = this;
      if(!RClass.isClass(c, MUiFocus)){
         return;
      }
      var f = o._focusControl;
      if(f == c){
         return;
      }
      var bc = o._blurControl;
      if(bc != f){
         if(o._blurAble && f && f.testBlur(c)){
            MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
            o._blurControl = f;
            f.doBlur(e);
            o.lsnsBlur.process(f);
         }
      }
      if(o._focusAble){
         MO.Logger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
         c.doFocus(e);
         o._focusControl = o._activeControl = c;
         o.lsnsFocus.process(c);
      }
   }
   MO.FUiFocusConsole_blur = function FUiFocusConsole_blur(c, e){
      var o = this;
      var fc = o._focusControl;
      var bc = o._blurControl;
      if(fc && c && !fc.testBlur(c)){
         return;
      }
      if(bc != c && RClass.isClass(c, MUiFocus)){
         MO.Logger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
         o._blurControl = c;
         c.doBlur(e);
      }
      if(fc){
         MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
         fc.doBlur(e);
         o._focusControl = null;
      }
   }
   MO.FUiFocusConsole_findClass = function FUiFocusConsole_findClass(c){
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
   MO.FUiFocusConsole_focusClass = function FUiFocusConsole_focusClass(c, p){
      var o = this;
      var n = RClass.name(c);
      if(o._focusClasses[n] != p){
         o._focusClasses[n] = p;
         MO.Logger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
         o.lsnsFocusClass.process(p, c);
      }
   }
   MO.FUiFocusConsole_focusHtml = function FUiFocusConsole_focusHtml(p){
      var o = this;
      var c = RHtml.searchLinker(p, FUiControl);
      MO.Logger.debug(o, 'Focus html control. (control={1}, element={2})', RClass.dump(c), p.tagName);
      if(c){
         if(o._focusControl != c){
            o.blur(c, p);
         }
      }else{
         o.blur(null, p);
      }
   }
   MO.FUiFocusConsole_lockBlur = function FUiFocusConsole_lockBlur(){
      this._blurAble = false;
   }
   MO.FUiFocusConsole_unlockBlur = function FUiFocusConsole_unlockBlur(){
      this._blurAble = true;
   }
   MO.FUiFocusConsole_storeFocus = function FUiFocusConsole_storeFocus(){
      var o = this;
      o._storeControl = o._focusControl;
   }
   MO.FUiFocusConsole_restoreFocus = function FUiFocusConsole_restoreFocus(){
      var o = this;
      if(o._storeControl){
         o._storeControl.focus();
         o._storeControl = null;
      }
   }
   MO.FUiFocusConsole_dispose = function FUiFocusConsole_dispose(){
      var o = this;
      o.__base.FConsole.dispose.call(o);
      o._focusClasses = null;
   }
}
with(MO){
   MO.FUiFrameConsole = function FUiFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._frames          = null;
      o.construct        = FUiFrameConsole_construct;
      o.create           = FUiFrameConsole_create;
      o.find             = FUiFrameConsole_find;
      o.findByClass      = FUiFrameConsole_findByClass;
      o.get              = FUiFrameConsole_get;
      return o;
   }
   MO.FUiFrameConsole_construct = function FUiFrameConsole_construct(){
      var o = this;
      o._frames = new TMap();
   }
   MO.FUiFrameConsole_create = function FUiFrameConsole_create(c, n){
      var o = this;
      var dc = RConsole.find(FUiDescribeFrameConsole);
      var x = dc.load(n);
      var f = RUiControl.build(null, x, null, c._hPanel);
      return f;
   }
   MO.FUiFrameConsole_find = function FUiFrameConsole_find(n){
      return this._frames.get(n);
   }
   MO.FUiFrameConsole_findByClass = function FUiFrameConsole_findByClass(control, clazz){
      var o = this;
      var className = RClass.name(clazz);
      var frames = o._frames;
      var instance = frames.get(className);
      if(!instance){
         instance = RClass.create(clazz);
         instance.buildDefine(control._hPanel);
         frames.set(className, instance);
      }
      return instance;
   }
   MO.FUiFrameConsole_get = function FUiFrameConsole_get(c, n, h){
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
   MO.FUiFrameConsole_hiddenAll = function FUiFrameConsole_hiddenAll(){
      var o = this;
      var fs = o._frames;
      var fc = fs.count;
      for(var n=0; n<fc; n++){
         fs.value(n).setVisible(false);
      }
   }
   MO.FUiFrameConsole_onProcessLoaded = function FUiFrameConsole_onProcessLoaded(e){
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
   MO.FUiFrameConsole_process = function FUiFrameConsole_process(g){
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
   MO.FUiFrameConsole_loadEvents = function FUiFrameConsole_loadEvents(cfg){
   }
   MO.FUiFrameConsole_processEvent = function FUiFrameConsole_processEvent(e){
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
   MO.FUiFrameConsole_free = function FUiFrameConsole_free(f){
      f.setVisible(false);
      this._freeFrames.push(f);
   }
   MO.FUiFrameConsole_dispose = function FUiFrameConsole_dispose(){
      var o = this;
      RMemory.free(o._frames);
      RMemory.free(o._formIds);
      RMemory.free(o._framesLoaded);
      o._frames = null;
      o._formIds = null;
      o._framesLoaded = null;
   }
}
with(MO){
   MO.FUiFrameEventConsole = function FUiFrameEventConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._thread    = null;
      o._interval  = 20;
      o._allow     = true;
      o._allows    = new TAttributes();
      o._events    = new TObjects();
      o._listeners = new TAttributes();
      o.onProcess  = FUiFrameEventConsole_onProcess;
      o.construct  = FUiFrameEventConsole_construct;
      o.register   = FUiFrameEventConsole_register;
      o.push       = FUiFrameEventConsole_push;
      o.clear      = FUiFrameEventConsole_clear;
      return o;
   }
   MO.FUiFrameEventConsole_onProcess = function FUiFrameEventConsole_onProcess(){
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
   MO.FUiFrameEventConsole_construct = function FUiFrameEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }
   MO.FUiFrameEventConsole_register = function FUiFrameEventConsole_register(po, pc){
      this._events.push(new TEvent(po, null, pc));
   }
   MO.FUiFrameEventConsole_push = function FUiFrameEventConsole_push(e){
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
   MO.FUiFrameEventConsole_clear = function FUiFrameEventConsole_clear(){
      this._events.clear();
   }
   MO.FUiFrameEventConsole_add = function FUiFrameEventConsole_add(owner, proc){
      this._events.push(new TEvent(owner, null, proc));
   }
   MO.FUiFrameEventConsole_allowEvent = function FUiFrameEventConsole_allowEvent(c){
      this._allows.set(RMethod.name(c), EBool.True);
   }
   MO.FUiFrameEventConsole_skipEvent = function FUiFrameEventConsole_skipEvent(c){
      this._allows.set(RMethod.name(c), EBool.False);
   }
   MO.FUiFrameEventConsole_allowAll = function FUiFrameEventConsole_allowAll(){
      this._allow = true;
   }
   MO.FUiFrameEventConsole_skipAll = function FUiFrameEventConsole_skipAll(){
      this._allow = false;
   }
   MO.FUiFrameEventConsole_onlyCall = function FUiFrameEventConsole_onlyCall(c, m){
      var o = this;
      o._allow = false;
      m.call(c);
      o._allow = true;
   }
}
with(MO){
   MO.FUiInfoDialog = function FUiInfoDialog(o){
      o = RClass.inherits(this, o, FUiDialog, MListenerResult);
      o._styleText            = RClass.register(o, new AStyle('_styleText'));
      o._frameName            = 'system.dialog.InfoDialog';
      o._controlText          = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FUiInfoDialog_onBuilded;
      o.onConfirmClick        = FUiInfoDialog_onConfirmClick;
      o.construct             = FUiInfoDialog_construct;
      o.setText               = FUiInfoDialog_setText;
      o.dispose               = FUiInfoDialog_dispose;
      return o;
   }
   MO.FUiInfoDialog_onBuilded = function FUiInfoDialog_onBuilded(p){
      var o = this;
      o.__base.FUiDialog.onBuilded.call(o, p);
      o._controlText._hPanel.className = o.styleName('Text');
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   }
   MO.FUiInfoDialog_onConfirmClick = function FUiInfoDialog_onConfirmClick(event){
      var o = this;
      var event = new SEvent();
      event.sender = o;
      event.resultCd = EResult.Success;
      o.processResultListener(event);
      event.dispose();
      o.hide();
   }
   MO.FUiInfoDialog_construct = function FUiInfoDialog_construct(){
      var o = this;
      o.__base.FUiDialog.construct.call(o);
   }
   MO.FUiInfoDialog_setText = function FUiInfoDialog_setText(value){
      this._controlText.set(value);
   }
   MO.FUiInfoDialog_dispose = function FUiInfoDialog_dispose(){
      var o = this;
      o.__base.FUiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FUiKeyConsole = function FUiKeyConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd        = EScope.Local;
      o._enable         = true;
      o._enableRegister = true;
      o._listeners      = new Object();
      o._disableKeys    = new Object();
      o.onKeyDown       = FUiKeyConsole_onKeyDown;
      o.construct       = FUiKeyConsole_construct;
      o.enable          = FUiKeyConsole_enable;
      o.disable         = FUiKeyConsole_disable;
      o.enableRegister  = FUiKeyConsole_enableRegister;
      o.disableRegister = FUiKeyConsole_disableRegister;
      o.register        = FUiKeyConsole_register;
      return o;
   }
   MO.FUiKeyConsole_onKeyDown = function FUiKeyConsole_onKeyDown(e){
      var o = this;
      var k = REnum.tryDecode(EKeyCode, e.keyCode);
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
   MO.FUiKeyConsole_construct = function FUiKeyConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
   MO.FUiKeyConsole_enable = function FUiKeyConsole_enable(){
      this._enable = true;
   }
   MO.FUiKeyConsole_disable = function FUiKeyConsole_disable(){
      this._enable = false;
   }
   MO.FUiKeyConsole_enableRegister = function FUiKeyConsole_enableRegister(){
      this._enableRegister = true;
   }
   MO.FUiKeyConsole_disableRegister = function FUiKeyConsole_disableRegister(){
      this._enableRegister = false;
   }
   MO.FUiKeyConsole_register = function FUiKeyConsole_register(k, w, p){
      var o = this;
      if(o._enableRegister){
         if(RInteger.isInteger(k)){
            k = REnum.decode(EKeyCode, k);
         }
         var ks = o._listeners;
         var s = ks[k];
         if(!s){
            s = ks[k] = new TListeners();
         }
         s.clear();
         s.register(w, p);
      }
   }
}
with(MO){
   MO.FUiMessageConsole = function FUiMessageConsole(o){
      o = RClass.inherits(this, o, FConsole, MUiStyle);
      o._scopeCd       = EScope.Global;
      o._result        = new Array();
      o._attributes    = new Array();
      o._messageBox    = null;
      o._messageWindow = null;
      o.showInfo       = FUiMessageConsole_showInfo;
      o.showConfirm    = FUiMessageConsole_showConfirm;
      o.showError      = FUiMessageConsole_showError;
      o.popup          = FUiMessageConsole_popup;
      o.close          = FUiMessageConsole_close;
      o.parse          = FUiMessageConsole_parse;
      o.check          = FUiMessageConsole_check;
      return o;
   }
   MO.FUiMessageConsole_showInfo = function FUiMessageConsole_showInfo(text){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiInfoDialog);
      dialog.clearResultListeners();
      dialog.setText(text);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_showConfirm = function FUiMessageConsole_showConfirm(text){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiConfirmDialog);
      dialog.clearResultListeners();
      dialog.setText(text);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_showError = function FUiMessageConsole_showError(code, message, description){
      var dialog = RConsole.find(FUiWindowConsole).find(FUiErrorDialog);
      dialog.clearResultListeners();
      dialog.setCode(message);
      dialog.setDescription(description);
      dialog.showPosition(EUiPosition.Center);
      return dialog;
   }
   MO.FUiMessageConsole_popup = function FUiMessageConsole_popup(g){
      var o = this;
      var w = o._messageWindow;
      if(!w){
         w = o._messageWindow = RControl.create(FUiMessageWindow);
      }
      w.loadMessages(g);
      w.show();
   }
   MO.FUiMessageConsole_close = function FUiMessageConsole_close(){
      RWindow.setEnable(true);
   }
   MO.FUiMessageConsole_parse = function FUiMessageConsole_parse(config){
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
   MO.FUiMessageConsole_check = function FUiMessageConsole_check(g){
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
}
with(MO){
   MO.FUiMessageDialog = function FUiMessageDialog(o){
      o = RClass.inherits(this, o, FUiWindow);
      o._styleMsgPanel     = RClass.register(o, new AStyle('_styleMsgPanel'));
      o._styleButtonPanel  = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._styleItmeForm     = RClass.register(o, new AStyle('_styleItmeForm'));
      o._styleItemTitle    = RClass.register(o, new AStyle('_styleItemTitle'));
      o._styleItemBodyForm = RClass.register(o, new AStyle('_styleItemBodyForm'));
      o._styleRowItem      = RClass.register(o, new AStyle('_styleRowItem'));
      o._styleDescForm     = RClass.register(o, new AStyle('_styleDescForm'));
      o._styleDescTitle    = RClass.register(o, new AStyle('_styleDescTitle'));
      o._styleDescBody     = RClass.register(o, new AStyle('_styleDescBody'));
      o._type              = null;
      o._isDialog          = false;
      o._titleBlur         = false;
      o._messageArg        = null;
      o._hMessagePanel     = null;
      o._hMessages         = null;
      o._hDescription      = null;
      o._hButtonPanel      = null;
      o._hBlank            = null;
      o.onBuild            = FUiMessageDialog_onBuild;
      o.onItemOver         = RClass.register(o, new AEventMouseOver('onItemOver'), FUiMessageDialog_onItemOver);
      o.onItemClick        = RClass.register(o, new AEventClick('onItemClick'), FUiMessageDialog_onItemClick);
      o.onDescClick        = RClass.register(o, new AEventClick('onDescClick'), FUiMessageDialog_onDescClick);
      o.onBuildMessages    = FUiMessageDialog_onBuildMessages;
      o.onBuildButtons     = FUiMessageDialog_onBuildButtons;
      o.onOk               = FUiMessageDialog_onOk;
      o.onCancel           = FUiMessageDialog_onCancel;
      o.onClose            = FUiMessageDialog_onClose;
      o.loadMessages       = FUiMessageDialog_loadMessages;
      o.show               = FUiMessageDialog_show;
      o.hide               = FUiMessageDialog_hide;
      o.dispose            = FUiMessageDialog_dispose;
      return o;
   }
   MO.FUiMessageDialog_onBuild = function FUiMessageDialog_onBuild(event){
      var o = this;
      o.__base.FUiWindow.oeBuild.call(o, e);
      o.setIcon('Icon');
      var hTab = RBuilder.appendTable(o.hBodyPanel, 0, 0, 0);
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
      RConsole.find(FKeyConsole).register(EKey.Esc, new TListener(o, o.onClose));
      return r;
   }
   MO.FUiMessageDialog_onItemOver = function FUiMessageDialog_onItemOver(e){
      var o = this;
      var hf = o.hItemBodyForm;
      var h = e.hSource;
   }
   MO.FUiMessageDialog_onItemClick = function FUiMessageDialog_onItemClick(e){
      var o = this;
      var hf = o.hItemBodyForm;
      for(var n = 0; n < hf.rows.count; n++){
      }
      var h = e.hSource;
      var idx = h.rowIndex;
   }
   MO.FUiMessageDialog_onDescClick = function FUiMessageDialog_onDescClick(e){
      var o = this;
   }
   MO.FUiMessageDialog_onBuildMessages = function FUiMessageDialog_onBuildMessages(){
      var o = this;
      if(!o._type){
         var hTab1 = o.hItmeForm = RBuilder.appendTable(o.hTitlePanel);
         hTab1.style.height = "100%";
         hTab1.style.width = "100%";
         hTab1.style.vAlign = "top";
         var hItemTitle = o.hItemTitle = hTab1.insertRow().insertCell();
         hItemTitle.height = 25;
         var h = RBuilder.appendTable(hItemTitle);
         h.height = '100%';
         h.width = '100%';
         h.style.backgroundColor = "#F5F5F5";
         var hr = h.insertRow();
         var hc1 = hr.insertCell();
         hc1.width = '20';
         var hTitleIcon = RBuilder.appendIcon(hc1, null, null, 16, 14);
         hTitleIcon.style.paddingLeft = 20;
         hTitleIcon.src = o.styleIconPath('TitleIcon');
         var hc2 = hr.insertCell();
         hc2.innerText = ' '+ RContext.get('FUiMessageDialog:MessageContext');
         var hItemBody  = o.hItemBody = hTab1.insertRow().insertCell();
         hItemBody.height = 100;
         o.hItemBody.style.borderBottom = '2 solid #F5F5F5';
         hItemBody.style.padding = '5';
         hItemBody.vAlign = "top";
         var hDiv = RBuilder.appendDiv(hItemBody);
         hDiv.style.height = '100px';
         hDiv.style.overflow = "auto";
         var hItemBodyForm = o.hItemBodyForm = RBuilder.appendTable(hDiv);
         hItemBodyForm.style.border = '2px solid #FFFFFF';
         hItemBodyForm.width = "100%";
         hItemBodyForm.style.vAlign = "top";
         var hTab2 = o.hDescForm = RBuilder.appendTable(o.hMsgPanel);
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
   MO.FUiMessageDialog_onBuildButtons = function FUiMessageDialog_onBuildButtons(t){
      var o = this;
      if(!o._type){
         var hBtnTab = RBuilder.appendTable(o._hButtonPanel, null, 0, 0, 2);
         var hRow = hBtnTab.insertRow();
         var hc = o._hBlank = hRow.insertCell();
         hc.width='72%';
         var b = o.btnOk = RClass.create(FButton);
         b.icon = 'tool.ok';
         b.label = RContext.get('FToolButton:ok');
         b.width = '100%';
         b.lsnsClick.register(o, o.onOk);
         var hoc = hRow.insertCell();
         hoc.style.align='right';
         hoc.width='15%';
         b.psBuild(hoc);
         var b = o.btnCancel = RClass.create(FButton);
         b.icon = 'tool.cancel';
         b.label = RContext.get('FToolButton:cancel');
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
   MO.FUiMessageDialog_onOk = function FUiMessageDialog_onOk(){
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
   MO.FUiMessageDialog_onCancel = function FUiMessageDialog_onCancel(){
      this.hide();
   }
   MO.FUiMessageDialog_onClose = function FUiMessageDialog_onClose(){
      this.hide();
   }
   MO.FUiMessageDialog_loadMessages = function FUiMessageDialog_loadMessages(g){
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
         var hIcon =  RBuilder.appendIcon(hc1, null, n, 16, 16);
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
         o.setCaption(' ' + RContext.get('FUiMessageDialog:Error'));
      }else if(EMessage.Warn == msgType){
         o.setCaption(' ' + RContext.get('FUiMessageDialog:Warn'));
      }else if(EMessage.Info == msgType){
         o.setCaption(' ' + RContext.get('FUiMessageDialog:Info'));
      }else if(EMessage.Fatal == msgType){
         o.setCaption(' ' + RContext.get('FUiMessageDialog:Fatal'));
      }
   }
   MO.FUiMessageDialog_show = function FUiMessageDialog_show(){
      var o = this;
      o.__base.FUiWindow.show.call(o);
      o.panel().style.zIndex = RLayer.next(ELayer.Message);
      RWindow.moveCenter(o.panel());
      o.psMode(EMode.Update);
      RConsole.find(FFocusConsole).blur();
      RWindow.setEnable(false, true);
      o.focus();
   }
   MO.FUiMessageDialog_hide = function FUiMessageDialog_hide(){
      var o = this;
      o.__base.FUiWindow.hide.call(o);
      var f = o._messageArg.argument.form;
      if(RClass.isClass(f, MDataset)){
         f.psProgress(false);
      }
      RWindow.setEnable(true);
   }
   MO.FUiMessageDialog_dispose = function FUiMessageDialog_dispose(){
      var o = this;
      o.__base.FUiWindow.dispose.call(o);
      o.hItmeForm = null;
      o.hDescBody = null;
      o.hDescDiv = null;
      o.hDescTitle = null;
      o.hItemBodyForm = null;
      o._hButtonPanel = null;
   }
}
with(MO){
   MO.FUiPopupConsole = function FUiPopupConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._activeControl = null;
      o.onMouseDown    = FUiPopupConsole_onMouseDown;
      o.onMouseWheel   = FUiPopupConsole_onMouseWheel;
      o.construct      = FUiPopupConsole_construct;
      o.show           = FUiPopupConsole_show;
      o.hide           = FUiPopupConsole_hide;
      o.dispose        = FUiPopupConsole_dispose;
      return o;
   }
   MO.FUiPopupConsole_onMouseDown = function FUiPopupConsole_onMouseDown(p){
      this.hide();
   }
   MO.FUiPopupConsole_onMouseWheel = function FUiPopupConsole_onMouseWheel(s, e){
      this.hide();
   }
   MO.FUiPopupConsole_construct = function FUiPopupConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      MO.Logger.info(o, 'Add listener for control popup.');
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseWheel.register(o, o.onMouseWheel);
   }
   MO.FUiPopupConsole_show = function FUiPopupConsole_show(control){
      var o = this;
      o.hide();
      if(RClass.isClass(control, MUiPopup)){
         o._activeControl = control;
      }
   }
   MO.FUiPopupConsole_hide = function FUiPopupConsole_hide(control){
      var o = this;
      if(o._activeControl){
         var opener = o._activeControl.opener();
         opener.drop(false);
      }
      o._activeControl = null;
   }
   MO.FUiPopupConsole_dispose = function FUiPopupConsole_dispose(){
      var o = this;
      o._activeControl = null;
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FUiResultConsole = function FUiResultConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o.scope          = EScope.Page;
      o.executeCommand = FUiResultConsole_executeCommand;
      o.checkService   = FUiResultConsole_checkService;
      o.checkEvent     = FUiResultConsole_checkEvent;
      return o;
   }
   MO.FUiResultConsole_executeCommand = function FUiResultConsole_executeCommand(command){
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
   MO.FUiResultConsole_checkService = function FUiResultConsole_checkService(config){
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
   MO.FUiResultConsole_checkEvent = function FUiResultConsole_checkEvent(event){
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
                  RConsole.find(FUiMessageConsole).showError(code, message, description);
                  return false;
               }
            }
         }
      }
      return true;
   }
}
with(MO){
   MO.FUiWindowConsole = function FUiWindowConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._activeWindow = null;
      o._windows      = null;
      o.construct    = FUiWindowConsole_construct;
      o.create       = FUiWindowConsole_create;
      o.find         = FUiWindowConsole_find;
      return this;
   }
   MO.FUiWindowConsole_construct = function FUiWindowConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._windows = new TDictionary();
   }
   MO.FUiWindowConsole_create = function FUiWindowConsole_create(clazz){
      var o = this;
      var instance = RClass.create(clazz);
      instance.buildDefine(RWindow._hDocument);
      return instance;
   }
   MO.FUiWindowConsole_find = function FUiWindowConsole_find(clazz){
      var o = this;
      var name = RClass.name(clazz);
      var find = o._windows.get(name);
      if(find){
         return find;
      }
      var instance = o.create(clazz);
      o._windows.set(name, instance);
      return instance;
   }
   MO.FUiWindowConsole_loadDefine = function FUiWindowConsole_loadDefine(name){
      if(name == null){
         return null;
      }
      var config = this.defines.find(name);
      if(config == null){
         var doc = new TXmlDocument();
         var root = doc.root();
         var action = root.create('Action');
         action.value = 'window.config.load';
         root.create('Window', 'name', name);
         var cnn = new TXmlCnn();
         var doc = cnn.syncSend('window.xml', doc);
         doc.root();
      }
      if(!config){
         return ILogger.fatal(this, 'loadDefine', 'Not find window define: ' + sWinName);
      }
      return config;
   }
   MO.FUiWindowConsole_dump = function FUiWindowConsole_dump(){
      var sDump = this.className;
      sDump += '\n\nDefine:\n' + this.m_oDefinePool.dump();
      sDump += '\n\nWindow:\n' + this.windowList.dump();
      return sDump;
   }
   MO.FUiWindowConsole_clear = function FUiWindowConsole_clear(){
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
   MO.FUiWindowConsole_hideAll = function FUiWindowConsole_hideAll(oExpWin, bDisplay){
      var nSize = this.windowList.size();
      for(var n=nSize-1; n>=0; n--){
         var oWin = this.windowList.value(n);
         if(oWin != oExpWin){
            oWin.hide(bDisplay);
         }
      }
   }
   MO.FUiWindowConsole_setMaxWindow = function FUiWindowConsole_setMaxWindow(oWin){
      this.maxFlag = true;
      this.hideAll(oWin);
   }
   MO.FUiWindowConsole_restore = function FUiWindowConsole_restore(){
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
   MO.FUiWindowConsole_initialize = function FUiWindowConsole_initialize(oCtWin){
      this.clientWindow = oCtWin;
   }
   MO.FUiWindowConsole_hasWindow = function FUiWindowConsole_hasWindow(){
      return !this.windowList.isEmpty();
   }
   MO.FUiWindowConsole_focus = function FUiWindowConsole_focus(oWinCtl){
      this.focusWinCtl = oWinCtl;
      if(this.maxFlag){
         oWinCtl.show();
         this.hideAll(oWinCtl, true)
         oWinCtl.max();
      }
   }
   MO.FUiWindowConsole_saveDefine = function FUiWindowConsole_saveDefine(oWinNode, oClientWindow){
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
   MO.FUiWindowConsole_onEventMousedown = function FUiWindowConsole_onEventMousedown(oCWin){
   }
   MO.FUiWindowConsole_onSaveDefineAfter = function FUiWindowConsole_onSaveDefineAfter(){
      ILogger.info(this, 'saveDefine', 'Save Ok.');
      if(this.clientWindow){this.clientWindow.document.body.disabled = false;}
   }
   MO.FUiWindowConsole_releaseWindowName = function FUiWindowConsole_releaseWindowName(sWinName){
      var oWin = this.windowList.removeName(sWinName);
      IEngine.process(this, this.EVENT_CLOSE, oWin);
   }
   MO.FUiWindowConsole_releaseWindow = function FUiWindowConsole_releaseWindow(oWin){
      this.windowList.removeValue(oWin);
      IEngine.process(this, this.EVENT_CLOSE, oWin);
   }
   MO.FUiWindowConsole_doFrameAction = function FUiWindowConsole_doFrameAction(sAction){
      if(!this.activeForm){
         return ILogger.fatal(this, 'doFrameAction', 'Not active form!');
      }
      this.activeForm.doAction(sAction);
   }
   MO.FUiWindowConsole_doProperties = function FUiWindowConsole_doProperties(){
      TrackManager.push(this, 'Do properties.');
      if(!WindowManager.focusWinCtl){return;}
      var arParams = new Array();
      arParams['WindowManager'] = WindowManager;
      window.showModalDialog(SystemManager.actionURL('window'), arParams, 'dialogWidth:500px;dialogHeight:360px;resizable:no;scroll:no;edge:sunken');
   }
   MO.FUiWindowConsole_onEventRelease = function FUiWindowConsole_onEventRelease(oCWin){
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
}
MO.FUiWorkspaceApplication = function FUiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   o.onProcess        = MO.FUiWorkspaceApplication_onProcess;
   o.selectWorkspace  = MO.FUiWorkspaceApplication_selectWorkspace;
   o.processResize    = MO.FUiWorkspaceApplication_processResize;
   o.processEvent     = MO.FUiWorkspaceApplication_processEvent;
   return o;
}
MO.FUiWorkspaceApplication_onProcess = function FUiWorkspaceApplication_onProcess(){
   var o = this;
   var workspace = o._activeWorkspace
   if(workspace){
      workspace.psFrame();
   }
}
MO.FUiWorkspaceApplication_selectWorkspace = function FUiWorkspaceApplication_selectWorkspace(clazz){
   var o = this;
   var workspace = o._activeWorkspace = MO.Class.create(clazz);
   return workspace;
}
MO.FUiWorkspaceApplication_processResize = function FUiWorkspaceApplication_processResize(){
   var o = this;
}
MO.FUiWorkspaceApplication_processEvent = function FUiWorkspaceApplication_processEvent(event){
   var o = this;
   return;
   o.dispatcherEvent(event);
   var chapter = o._activeWorkspace;
   if(chapter){
      chapter.processEvent(event);
   }
}
MO.FUiWorkspaceConsole = function FUiWorkspaceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._activeWorkspace = null;
   o._workspaces      = null;
   o._thread          = null;
   o._interval        = 100;
   o.onResize         = MO.FUiWorkspaceConsole_onResize;
   o.onProcess        = MO.FUiWorkspaceConsole_onProcess;
   o.construct        = MO.FUiWorkspaceConsole_construct;
   o.active           = MO.FUiWorkspaceConsole_active;
   o.resize           = MO.FUiWorkspaceConsole_resize;
   o.dispose          = MO.FUiWorkspaceConsole_dispose;
   return o;
}
MO.FUiWorkspaceConsole_onResize = function FUiWorkspaceConsole_onResize(p){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psResize();
   }
}
MO.FUiWorkspaceConsole_onProcess = function FUiWorkspaceConsole_onProcess(event){
   var o = this;
   var workspace = o._activeWorkspace;
   if(workspace){
      workspace.psFrame(event);
   }
}
MO.FUiWorkspaceConsole_construct = function FUiWorkspaceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._workspaces = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.RWindow.lsnsResize.register(o, o.onResize);
}
MO.FUiWorkspaceConsole_active = function FUiWorkspaceConsole_active(p){
   this._activeWorkspace = p;
}
MO.FUiWorkspaceConsole_resize = function FUiWorkspaceConsole_resize(){
   this.onResize();
}
MO.FUiWorkspaceConsole_dispose = function FUiWorkspaceConsole_dispose(){
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
with(MO){
   MO.MUiShadow = function MUiShadow(o){
      o = RClass.inherits(this, o);
      o._hShadow   = null;
      o.show       = MUiShadow_show;
      o.hide       = MUiShadow_hide;
      o.setVisible = MUiShadow_setVisible;
      return o;
   }
   MO.MUiShadow_show = function MUiShadow_show(v){
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
   MO.MUiShadow_hide = function MUiShadow_hide(){
      var o = this;
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
   MO.MUiShadow_setVisible = function MUiShadow_setVisible(p){
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
}
with(MO){
   MO.SUiColorBar = function SUiColorBar(){
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
      o.setRange          = SUiColorBar_setRange;
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
   MO.SUiColorBar_onMouseDown = function SUiColorBar_onMouseDown(p){
      var o = this;
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o._draging = true;
      RWindow.setOptionSelect(false);
      o.changeSlide(x);
   }
   MO.SUiColorBar_onMouseMove = function SUiColorBar_onMouseMove(p){
      var o = this;
      if(o._draging){
         var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
         o.changeSlide(x);
      }
   }
   MO.SUiColorBar_onMouseUp = function SUiColorBar_onMouseUp(p){
      var o = this;
      o._draging = false;
      RWindow.setOptionSelect(true);
   }
   MO.SUiColorBar_build = function SUiColorBar_build(p){
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
   MO.SUiColorBar_setRange = function SUiColorBar_setRange(i, a){
      var o = this;
      if(i != null){
         o.minValue = i;
      }
      if(a != null){
         o.maxValue = a;
      }
   }
   MO.SUiColorBar_setColorValue = function SUiColorBar_setColorValue(p){
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
   MO.SUiColorBar_setSlideValue = function SUiColorBar_setSlideValue(p){
      var o = this;
      var w = o.hSlideForm.offsetWidth;
      if(w > 0){
         var v = p / o.maxValue * w;
         o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
      }
   }
   MO.SUiColorBar_setInputValue = function SUiColorBar_setInputValue(p){
      this.hInput.value = p;
   }
   MO.SUiColorBar_convertGet = function SUiColorBar_convertGet(p){
      return p;
   }
   MO.SUiColorBar_get = function SUiColorBar_get(){
      var o = this;
      return o.convertGet(o.hInput.value);
   }
   MO.SUiColorBar_convertSet = function SUiColorBar_convertSet(p){
      return p;
   }
   MO.SUiColorBar_set = function SUiColorBar_set(p){
      var o = this;
      var v = o.convertSet(p);
      o.setColorValue(v);
      o.setSlideValue(v);
      o.setInputValue(v);
   }
   MO.SUiColorBar_convertSlide = function SUiColorBar_convertSlide(p){
      return p;
   }
   MO.SUiColorBar_changeSlide = function SUiColorBar_changeSlide(p){
      var o = this;
      var w = o.hSlideForm.offsetWidth - 3;
      var v = o.convertSlide(p / w);
      o.set(v);
      o.control.refreshValue();
   }
   MO.SUiColorBar_changeInputEdit = function SUiColorBar_changeInputEdit(){
      var o = this;
      var v = o.convertGet(o.hInput.value);
      o.setColorValue(v);
      o.setSlideValue(v);
      o.control.refreshValue();
   }
   MO.SUiColorBar_changeInputChange = function SUiColorBar_changeInputChange(){
      var o = this;
      var v = o.convertGet(o.hInput.value);
      o.set(v);
      o.control.refreshValue();
   }
}
with(MO){
   MO.SUiColorChannel = function SUiColorChannel(){
      var o = this;
      SUiColorBar.call(o);
      o.minValue      = 0;
      o.maxValue      = 255;
      o.setInputValue = SUiColorChannel_setInputValue;
      o.convertGet    = SUiColorChannel_convertGet;
      o.convertSet    = SUiColorChannel_convertSet;
      return o;
   }
   MO.SUiColorChannel_setInputValue = function SUiColorChannel_setInputValue(p){
      var o = this;
      var v = RInteger.toRange(p, o.minValue, o.maxValue);
      var t = RInteger.format(v);
      var h = o.hInput;
      if(h.value != t){
         h.value = t;
      }
   }
   MO.SUiColorChannel_convertGet = function SUiColorChannel_convertGet(p){
      var o = this;
      var v = RInteger.parse(RString.nvl(p, '0'));
      return RInteger.toRange(v, o.minValue, o.maxValue) / 255;
   }
   MO.SUiColorChannel_convertSet = function SUiColorChannel_convertSet(p){
      return parseInt(p * 255);
   }
}
with(MO){
   MO.SUiColorPower = function SUiColorPower(){
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
   MO.SUiColorPower_setColorValue = function SUiColorPower_setColorValue(p){
      var o = this;
      var v = RInteger.toRange(parseInt(p * 255), 0, 255);
      var s = RHex.format(v, 2);
      o.hColorImage.style.backgroundColor = '#' + s + s + s;
   }
   MO.SUiColorPower_setSlideValue = function SUiColorPower_setSlideValue(p){
      var o = this;
      var w = o.hSlideForm.offsetWidth;
      if(w > 0){
         var v = p / o.maxValue * w;
         o.hSlideRowML.width = RInteger.toRange(v, 1, w - 1);
      }
   }
   MO.SUiColorPower_setInputValue = function SUiColorPower_setInputValue(p){
      var o = this;
      var h = o.hInput;
      var v = RFloat.toRange(p, o.minValue, o.maxValue);
      var t = RFloat.format(v, 0, null, 2, null);
      if(h.value != t){
         h.value = t;
      }
   }
   MO.SUiColorPower_convertGet = function SUiColorPower_convertGet(p){
      return RFloat.parse(p);
   }
   MO.SUiColorPower_convertSet = function SUiColorPower_convertSet(p){
      return p;
   }
   MO.SUiColorPower_convertSlide = function SUiColorPower_convertSlide(p){
      return p * this.maxValue;
   }
}
with(MO){
   MO.SUiSlide = function SUiSlide(){
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
   MO.SUiSlide_onMouseDown = function SUiSlide_onMouseDown(p){
      var o = this;
      var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
      o._draging = true;
      RWindow.setOptionSelect(false);
      o.changeSlide(x);
   }
   MO.SUiSlide_onMouseMove = function SUiSlide_onMouseMove(p){
      var o = this;
      if(o._draging){
         var x = RHtml.clientX(p.hSource, o.hSlideForm) + p.offsetX;
         o.changeSlide(x);
      }
   }
   MO.SUiSlide_onMouseUp = function SUiSlide_onMouseUp(p){
      var o = this;
      o._draging = false;
      RWindow.setOptionSelect(true);
   }
   MO.SUiSlide_build = function SUiSlide_build(p){
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
   MO.SUiSlide_setRange = function SUiSlide_setRange(i, a){
      var o = this;
      if(i != null){
         o.minValue = RFloat.parse(i);
      }
      if(a != null){
         o.maxValue = RFloat.parse(a);
      }
      o.range = o.maxValue - o.minValue;
   }
   MO.SUiSlide_setSlideValue = function SUiSlide_setSlideValue(p){
      var o = this;
      var w = o.hSlideForm.offsetWidth;
      if(w > 0){
         var v = (p - o.minValue) / o.range * w;
         o.hSlideML.width = RInteger.toRange(v, 1, w - 1);
      }
   }
   MO.SUiSlide_get = function SUiSlide_get(){
      var o = this;
      var w = o.hSlideForm.offsetWidth - 3;
      var v = (p / w) * o.range + o.minValue;
      return v;
   }
   MO.SUiSlide_set = function SUiSlide_set(p){
      var o = this;
      o.setSlideValue(p);
   }
   MO.SUiSlide_changeSlide = function SUiSlide_changeSlide(p){
      var o = this;
      var c = o.control;
      var w = o.hSlideForm.offsetWidth - 3;
      o.hSlideML.width = RInteger.toRange(p, 1, w - 1);
      var v = (p / w) * o.range + o.minValue;
      v = RFloat.toRange(v, o.minValue, o.maxValue);
      o.onSlideChange.call(c, v);
   }
}
with(MO){
   MO.FUiButton = function FUiButton(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick);
      o._labelPositionCd   = RClass.register(o, new APtyString('_labelPositionCd'), EUiPosition.Left);
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._action            = RClass.register(o, new APtyString('_action'));
      o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
      o._styleForm         = RClass.register(o, new AStyle('_styleForm'));
      o._styleIcon         = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
      o._styleIconPanel    = RClass.register(o, new AStyleIcon('_styleIconPanel'));
      o._hForm             = null;
      o._hLeftButton       = null;
      o._hMiddleButton     = null;
      o._hRightButton      = null;
      o._hLabelPanel       = null;
      o._hLabel            = null;
      o.onBuild            = FUiButton_onBuild;
      o.onClick            = RClass.register(o, new AEventClick('onClick'), FUiButton_onClick);
      o.doClick            = FUiButton_doClick;
      return o;
   }
   MO.FUiButton_onBuild = function FUiButton_onBuild(e){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, e);
      var hPanel = o._hPanel;
      o.attachEvent('onClick', hPanel);
      var hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
      var hLine  = RBuilder.appendTableRow(hForm);
      if(o._icon){
         var hCell = RBuilder.appendTableCell(hLine);
         hCell.width = 16;
         o._hIcon = RBuilder.appendIcon(hCell, o.styleName('Icon'), o._icon);
      }
      if(o.label){
         var hCell = RBuilder.appendTableCell(hLine);
         hCell.align = 'center';
         hCell.noWrap = true;
         o._hLabel = RBuilder.appendText(hCell, o.styleName('Label'), o._label);
      }
   }
   MO.FUiButton_onButtonEnter = function FUiButton_onButtonEnter(e){
      var o = this;
      if(!o._disabled){
        o._hLeftButton.background = o.styleIconPath('HoverLeft');
        o._hMiddleButton.background = o.styleIconPath('HoverMiddle');
        o._hRightButton.background = o.styleIconPath('HoverRight');
      }
   }
   MO.FUiButton_onButtonLeave = function FUiButton_onButtonLeave(e){
      var o = this;
      if(!o._disabled){
        o._hLeftButton.background = o.styleIconPath('ButtonLeft');
        o._hMiddleButton.background = o.styleIconPath('Button');
        o._hRightButton.background = o.styleIconPath('ButtonRight');
      }
   }
   MO.FUiButton_onButtonDown = function FUiButton_onButtonDown(e){
      var o = this;
      if(!o._disabled){
        o._hLeftButton.background = o.styleIconPath('PressLeft');
        o._hMiddleButton.background = o.styleIconPath('PressMiddle');
        o._hRightButton.background = o.styleIconPath('PressRight');
      }
   }
   MO.FUiButton_onButtonUp = function FUiButton_onButtonUp(e){
      var o = this;
      if(!o._disabled){
        o._hLeftButton.background = o.styleIconPath('ButtonLeft');
        o._hMiddleButton.background = o.styleIconPath('Button');
        o._hRightButton.background = o.styleIconPath('ButtonRight');
      }
   }
   MO.FUiButton_onButtonClickDelay = function FUiButton_onButtonClickDelay(e){
      var o = this;
      o.__process = false;
      o.clickActive.status = EActive.Sleep;
   }
   MO.FUiButton_onClick = function FUiButton_onClick(e){
      this.doClick();
   }
   MO.FUiButton_onButtonClick = function FUiButton_onButtonClick(e){
      this.doClick();
   }
   MO.FUiButton_oeMode = function FUiButton_oeMode(e){
      var o = this;
      o.__base.FUiControl.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      return EEventStatus.Stop;
   }
   MO.FUiButton_setLabel = function FUiButton_setLabel(v){
      var o = this;
      o.label = v;
      o._hLabel.innerText = v;
      o._hLabel.noWrap = true;
   }
   MO.FUiButton_setLabelColor = function FUiButton_setLabelColor(c){
      var o = this;
      o._hLabel.style.color = '#FF0000';
   }
   MO.FUiButton_setLabelStyle = function FUiButton_setLabelStyle(c, w, s){
      var o = this;
      o._hLabel.style.color = '#FF0000';
      o._hLabel.style.fontWeight = 'bold';
      o._hLabel.style.fontSize = '12';
   }
   MO.FUiButton_doClick = function FUiButton_doClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FUiButton_dispose = function FUiButton_dispose(){
      var o = this;
      o.__base.FUiControl.dispose.call(o);
      o._hForm = null;
      o._hFormEnd = null;
      o._hLabel = null;
   }
}
with(MO){
   MO.FUiCalendar = function FUiCalendar(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDropable, MDescCalendar);
      o.editFormat  = RDate.DisplayFormat;
      o.editHour     = RClass.register(o, new TPtyBoolSet('editHour', 'editDate', EDateTimeMode.Hour));
      o.editMinute   = RClass.register(o, new TPtyBoolSet('editMinute', 'editDate', EDateTimeMode.Minute));
      o.editSecond   = RClass.register(o, new TPtyBoolSet('editSecond', 'editDate', EDateTimeMode.Second));
      o.borderStyle = EUiBorder.RoundDrop;
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
   MO.FUiCalendar_onDataClick = function FUiCalendar_onDataClick(){
      var o = this;
      if(!o.editCheck){
         o.drop();
      }
   }
   MO.FUiCalendar_onBuildEdit = function FUiCalendar_onBuildEdit(b){
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
   MO.FUiCalendar_onEditEnd = function FUiCalendar_onEditEnd(e){
      var o = this;
      if(e){
         o.set(e.get());
         o._invalidText = o.validText(o.text());
         o.refreshStyle();
      }
      o.onDataEditEnd(o);
   }
   MO.FUiCalendar_onKeyPress = function FUiCalendar_onKeyPress(e){
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
         RKey.eventClear(e);
      }
   }
   MO.FUiCalendar_construct = function FUiCalendar_construct(){
      var o = this;
      o.base.FEditControl.construct.call(o);
      o.date = new TDate();
      o.lsnEditEnd = new TListener(o, o.onEditEnd);
   }
   MO.FUiCalendar_formatValue = function FUiCalendar_formatValue(t){
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
   MO.FUiCalendar_formatText = function FUiCalendar_formatText(value){
      if(value){
         var o = this;
         RDate.autoParse(o.date, value);
         return RDate.formatDate(o.date, o.editFormat);
      }
      return RString.nvl(value);
   }
   MO.FUiCalendar_refreshStyle = function FUiCalendar_refreshStyle(){
      var o = this;
      o.base.FEditControl.refreshStyle.call(o);
      if(!o.editCheck){
         o.hEdit.readOnly = 'true';
      }
   }
   MO.FUiCalendar_drop = function FUiCalendar_drop(){
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
   MO.FUiCalendar_doBlur = function FUiCalendar_doBlur(){
      var o = this;
      o.base.FEditControl.doBlur.call(o);
      if(o.editor){
         o.editor.hide();
      }
   }
}
with(MO){
   MO.FUiCalendarEditor = function FUiCalendarEditor(o){
      o = RClass.inherits(this, o, FDropEditor, MUiFocusLooper);
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
   MO.FUiCalendarEditor_onTimeClick = function FUiCalendarEditor_onTimeClick(e){
      var o = this;
      var h = e.hSource;
      if(h.editAble){
         h.select();
      }
   }
   MO.FUiCalendarEditor_onTimeBlur = function FUiCalendarEditor_onTimeBlur(e){
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
   MO.FUiCalendarEditor_onDayDbClick = function FUiCalendarEditor_onDayDbClick(e){
      var o = e.source
      if(RClass.isClass(o, FUiCalendarEditor) && 0 != RInteger.parse(e.hSource.innerText)){
         o.date.setDay(e.hSource.innerText);
         o.dataValue = RDate.formatDate(o.date);
         o.editEnd();
      }
   }
   MO.FUiCalendarEditor_onDaySelect = function FUiCalendarEditor_onDaySelect(e){
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
   MO.FUiCalendarEditor_onButtonNow = function FUiCalendarEditor_onButtonNow(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         o.dataValue = RDate.format();
         o.editEnd();
      }
   }
   MO.FUiCalendarEditor_onDateKeyDown = function FUiCalendarEditor_onDateKeyDown(e, he){
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
   MO.FUiCalendarEditor_onDateBlur = function FUiCalendarEditor_onDateBlur(){
      var o = this;
      o.storeChange();
      o.setDate(o.date);
   }
   MO.FUiCalendarEditor_onBuildDrop = function FUiCalendarEditor_onBuildDrop(){
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
   MO.FUiCalendarEditor_show = function FUiCalendarEditor_show(v){
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
   MO.FUiCalendarEditor_buildTitle = function FUiCalendarEditor_buildTitle(){
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
   MO.FUiCalendarEditor_buildDays = function FUiCalendarEditor_buildDays(){
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
   MO.FUiCalendarEditor_buildTime = function FUiCalendarEditor_buildTime(){
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
   MO.FUiCalendarEditor_testBlur = function FUiCalendarEditor_testBlur(c){
      return this.source != c;
   }
   MO.FUiCalendarEditor_get = function FUiCalendarEditor_get(){
      return this.dataValue;
   }
   MO.FUiCalendarEditor_set = function FUiCalendarEditor_set(value, format){
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
   MO.FUiCalendarEditor_setDate = function FUiCalendarEditor_setDate(date){
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
   MO.FUiCalendarEditor_setHourEditable = function FUiCalendarEditor_setHourEditable(v){
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
   MO.FUiCalendarEditor_setMinuteEditable = function FUiCalendarEditor_setMinuteEditable(v){
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
   MO.FUiCalendarEditor_setSecondEditable = function FUiCalendarEditor_setSecondEditable(v){
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
   MO.FUiCalendarEditor_storeChange = function FUiCalendarEditor_storeChange(){
      var o = this;
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.date.setHour(Math.min(RInteger.parse(o.hHour.value), 23));
      o.date.setMinute(Math.min(RInteger.parse(o.hMinute.value), 59));
      o.date.setSecond(Math.min(RInteger.parse(o.hSecond.value), 59));
   }
   MO.FUiCalendarEditor_onBuildButton = function FUiCalendarEditor_onBuildButton(){
      var o = this;
   }
   MO.FUiCalendarEditor_onMdown = function FUiCalendarEditor_onMdown(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         o.isSkipBlur = true;
         if(e.hSource.linkAction){
            e.hSource.linkAction.call(o, e.hSource);
         }
      }
   }
   MO.FUiCalendarEditor_onMup = function FUiCalendarEditor_onMup(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         var f = o.focusObject;
         if(f && f.focus && f.select){
            f.focus();
            f.select();
         }
      }
   }
   MO.FUiCalendarEditor_ohKdown = function FUiCalendarEditor_ohKdown(){
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
   MO.FUiCalendarEditor_onButtonOver = function FUiCalendarEditor_onButtonOver(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         e.hSource.className = o.style('ButtonHover');
      }
   }
   MO.FUiCalendarEditor_onButtonOut = function FUiCalendarEditor_onButtonOut(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         e.hSource.className = o.style('Button');
      }
   }
   MO.FUiCalendarEditor_onButtonOk = function FUiCalendarEditor_onButtonOk(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
         o.editStatus = EEditStatus.Ok;
         o.dataValue = RDate.formatDate(o.date);
         o.editEnd();
      }
   }
   MO.FUiCalendarEditor_onButtonCancel = function FUiCalendarEditor_onButtonCancel(e) {
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor)){
       o.editStatus = EEditStatus.Cancel;
        o.dataValue = '';
        o.editEnd();
      }
   }
   MO.FUiCalendarEditor_ohDaysChange = function FUiCalendarEditor_ohDaysChange(){
      var o = this.link;
      if(RClass.isClass(o, FUiCalendarEditor)){
         o.date.setYear(o.hYear.value);
         o.date.setMonth(o.hMonth.value);
         o.setDate(o.date);
      }
   }
   MO.FUiCalendarEditor_ohKeyCheck = function FUiCalendarEditor_ohKeyCheck(){
      var e = RWindow.event(this)
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
         e.keyCode = 0;
      }
   }
   MO.FUiCalendarEditor_onDayEnter = function FUiCalendarEditor_onDayEnter(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
         if(!e.hSource.isCurrent){
            e.hSource.className = o.style('DayHover');
         }
      }
   }
   MO.FUiCalendarEditor_onDayOut = function FUiCalendarEditor_onDayOut(e){
      var o = e.source;
      if(RClass.isClass(o, FUiCalendarEditor) && e.hSource.innerText != '.'){
         if(!e.hSource.isCurrent){
            e.hSource.className = e.hSource.isFree ? o.style('DayFree') : o.style('Day');
         }
      }
   }
   MO.FUiCalendarEditor_onDateAction = function FUiCalendarEditor_onDateAction(h){
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
   MO.FUiCalendarEditor_panel = function FUiCalendarEditor_panel(type){
      var o = this;
      if(EPanel.Shadow == type){
         return o.hPanel;
      }
      return o.base.FDropEditor.panel.call(o, type);
   }
   MO.FUiCalendarEditor_dispose = function FUiCalendarEditor_dispose(){
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
}
with(MO){
   MO.FUiCheck = function FUiCheck(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hInput          = null;
      o.onBuildEditValue = FUiCheck_onBuildEditValue;
      o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
      o.oeSaveValue      = FUiCheck_oeSaveValue;
      o.construct        = FUiCheck_construct;
      o.formatLoad       = FUiCheck_formatLoad;
      o.formatSave       = FUiCheck_formatSave;
      o.get              = FUiCheck_get;
      o.set              = FUiCheck_set;
      o.refreshValue     = FUiCheck_refreshValue;
      o.refreshStyle     = FUiCheck_refreshStyle;
      return o;
   }
   MO.FUiCheck_onBuildEditValue = function FUiCheck_onBuildEditValue(p){
      var o = this;
      var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
      o.attachEvent('onInputClick', h);
   }
   MO.FUiCheck_onInputClick = function FUiCheck_onInputClick(p){
      this.refreshValue();
   }
   MO.FUiCheck_oeSaveValue = function FUiCheck_oeSaveValue(e){
      var o = this;
      if(EStore.Prepare == e.store){
         if(RBoolean.isTrue(o.reget())){
            e.values.set(o.dataName, EBoolean.True);
         }
         return EEventStatus.Stop;
      }
      return o.base.FUiEditControl.oeSaveValue.call(o, e);
   }
   MO.FUiCheck_construct = function FUiCheck_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._editSize.set(60, 20);
   }
   MO.FUiCheck_formatLoad = function FUiCheck_formatLoad(value){
      var o = this;
      return (value == o._valueTrue);
   }
   MO.FUiCheck_formatSave = function FUiCheck_formatSave(value){
      var o = this;
      return RBoolean.toString(value, o._valueTrue, o._valueFalse);
   }
   MO.FUiCheck_get = function FUiCheck_get(){
      return this._hInput.checked;
   }
   MO.FUiCheck_set = function FUiCheck_set(value){
      this._hInput.checked = value;
   }
   MO.FUiCheck_refreshValue = function FUiCheck_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiCheck_refreshStyle = function FUiCheck_refreshStyle(){
      var o = this;
      var h = o.panel(EPanel.Edit);
      h.disabled = !o._editable;
      if(!o._editable){
         o.hEdit.style.cursor = 'normal';
      }
   }
}
with(MO){
   MO.FCheckPicker = function FCheckPicker(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescCheckPicker, MDropable);
      o.stIconDropSelect = RClass.register(o, new TStyleIcon('DropSelect'));
      o.items            = new TItems();
      o.borderStyle      = EUiBorder.RoundDrop;
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
   MO.FCheckPicker_onBuildEdit = function FCheckPicker_onBuildEdit(b){
      var o = this;
      var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
      if(o.editLength){
         h.maxLength = o.editLength;
      }
   }
   MO.FCheckPicker_onEditEnd = function FCheckPicker_onEditEnd(editor){
      var o = this;
      RLog.debug(o, 'Begin (editor={1}:{2} value={3})', editor, editor?editor.value():'', o.dataValue);
      if(editor){
         o.set(editor.values);
      }
      o.onDataEditEnd(o);
      RLog.debug(o, 'End (editor={1} value={2})', editor, o.dataValue);
   }
   MO.FCheckPicker_loadConfig = function FCheckPicker_loadConfig(c){
      var o = this;
      o.base.FEditControl.loadConfig.call(o, c);
      if(o.dataEmpty){
         o.items.create();
      }
      o.items.loadConfig(c);
      return EStatus.Stop;
   }
   MO.FCheckPicker_text = function FCheckPicker_text(){
      return this.hEdit.value;
   }
   MO.FCheckPicker_setText = function FCheckPicker_setText(text){
      this.hEdit.value = text;
   }
   MO.FCheckPicker_formatValue = function FCheckPicker_formatValue(text){
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
   MO.FCheckPicker_validText = function FCheckPicker_validText(text){
      var o = this;
      if(RString.isEmpty(text)){
         return true;
      }
      return !RString.isEmpty(o.formatValue(text));
   }
   MO.FCheckPicker_formatText = function FCheckPicker_formatText(v){
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
   MO.FCheckPicker_refreshStyle = function FCheckPicker_refreshStyle(){
      var o = this;
      o.base.FEditControl.refreshStyle.call(o);
      o.hDrop.src = o.styleIconPath(o._hover ? 'DropSelect' : 'Drop');
   }
   MO.FCheckPicker_drop = function FCheckPicker_drop(){
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
   MO.FCheckPicker_onDataKeyDown = function FCheckPicker_onDataKeyDown(s, e){
      var o = this;
      o.base.FEditControl.onDataKeyDown.call(o, s, e);
      if(o.items.count()){
         if(o.editor && o.editor.source == o){
            o.editor.onEditKeyDown(s, e);
         }
      }
   }
   MO.FCheckPicker_dispose = function FCheckPicker_dispose(){
      var o = this;
      o.base.FEditControl.dispose.call(o);
      RMemory.freeHtml(o.hEdit);
      o.hEdit = null;
   }
}
with(MO){
   MO.FCheckPickerEditor = function FCheckPickerEditor(o){
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
   MO.FCheckPickerEditor_construct = function FCheckPickerEditor_construct(){
      var o = this;
      o.itemClickListener = new TListener(o, o.onItemClick);
   }
   MO.FCheckPickerEditor_onBuildDrop = function FCheckPickerEditor_onBuildDrop(){
      var o = this;
      o.hItemsForm = RBuilder.appendTable(o.hDropPanel);
      o.hItemsForm.width = '100%';
      o.hItemsPanel = RBuilder.append(o.hItemsForm, 'TBODY');
      o.onBuildButton();
   }
   MO.FCheckPickerEditor_onBuildButton = function FCheckPickerEditor_onBuildButton(){
      var o = this;
      o.base.FDropEditor.onBuildButton.call(o);
      var h = o.hBtnTextSpan = RBuilder.newSpan(o.hButtonPanel, null);
      h.innerText = 'colse';
   }
   MO.FCheckPickerEditor_onItemClick = function FCheckPickerEditor_onItemClick(s){
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
   MO.FCheckPickerEditor_select = function FCheckPickerEditor_select(p){
      var o = this;
      var cs = o.components;
      p = Math.min(Math.max(0, p), cs.count-1)
      for(var n=0; n<cs.count; n++){
         o.components.value(n).setChecked(n == p);
      }
      o.position = p;
   }
   MO.FCheckPickerEditor_onEditKeyDown = function FCheckPickerEditor_onEditKeyDown(s, e){
      var o = this;
      return;
   }
   MO.FCheckPickerEditor_set = function FCheckPickerEditor_set(v){
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
   MO.FCheckPickerEditor_setItems = function FCheckPickerEditor_setItems(items){
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
   MO.FCheckPickerEditor_linkControl = function FCheckPickerEditor_linkControl(c){
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
   MO.FCheckPickerEditor_show = function FCheckPickerEditor_show(v){
      var o = this;
      o.base.FDropEditor.show.call(o, v);
      RConsole.find(FFocusConsole).focus(o);
      if(o.border.hForm.offsetWidth < o.MinWidth){
         o.border.hForm.style.pixelWidth = o.MinWidth;
      }
      o.base.MShadow.show.call(o, v);
      o.isSkipBlur = false;
   }
   MO.FCheckPickerEditor_hide = function FCheckPickerEditor_hide(){
      var o = this;
      o.source = null;
      o.base.FDropEditor.hide.call(o);
      o.base.MShadow.hide.call(o);
   }
   MO.FCheckPickerEditor_dispose = function FCheckPickerEditor_dispose(){
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
}
with(MO){
   MO.FUiColor = function FUiColor(o){
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
   MO.FUiColor_oeDataLoad = function FUiColor_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FUiColor_oeDataSave = function FUiColor_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FUiColor_onBuildEditValue = function FUiColor_onBuildEditValue(p){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('InputPanel');
      var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
      if(o._editLength){
         he.maxLength = o._editLength;
      }
   }
   MO.FUiColor_construct = function FUiColor_construct(){
      var o = this;
      o.__base.FEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiColor_get = function FUiColor_get(p){
      var o = this;
      var r = o.__base.FEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FUiColor_set = function FUiColor_set(p){
      var o = this;
      o.__base.FEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FUiColor_onDataKeyDown = function FUiColor_onDataKeyDown(s, e){
      var o = this;
      o.__base.FEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiColor_formatValue = function FUiColor_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiColor_setText = function FUiColor_setText(t){
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
   MO.FUiColor_validText = function FUiColor_validText(t){
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
   MO.FUiColor_findEditor = function FUiColor_findEditor(){
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
   MO.FUiColor_drop = function FUiColor_drop(){
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
   MO.FUiColor_clone = function FUiColor_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiColor_link = function FUiColor_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiColor3Tpl = function FUiColor3Tpl(o){
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
   MO.FUiColor3Tpl_onBuildEditValue = function FUiColor3Tpl_onBuildEditValue(p){
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
   MO.FUiColor3Tpl_onInputKeyPress = function FUiColor3Tpl_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!EKeyCode.floatCodes[c]){
         p.cancel();
      }
   }
   MO.FUiColor3Tpl_onInputChanged = function FUiColor3Tpl_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiColor3Tpl_construct = function FUiColor3Tpl_construct(){
      var o = this;
      o.__base.FEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SColor4();
      o._innerDataValue = new SColor4();
   }
   MO.FUiColor3Tpl_get = function FUiColor3Tpl_get(p){
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
   MO.FUiColor3Tpl_set = function FUiColor3Tpl_set(p){
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
   MO.FUiColor3Tpl_onDataKeyDown = function FUiColor3Tpl_onDataKeyDown(s, e){
      var o = this;
      o.__base.FEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiColor3Tpl_formatValue = function FUiColor3Tpl_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiColor3Tpl_setText = function FUiColor3Tpl_setText(t){
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
   MO.FUiColor3Tpl_validText = function FUiColor3Tpl_validText(t){
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
   MO.FUiColor3Tpl_findEditor = function FUiColor3Tpl_findEditor(){
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
   MO.FUiColor3Tpl_drop = function FUiColor3Tpl_drop(){
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
   MO.FUiColor3Tpl_clone = function FUiColor3Tpl_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiColor3Tpl_link = function FUiColor3Tpl_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiColor4 = function FUiColor4(o){
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
   MO.FUiColor4_oeDataLoad = function FUiColor4_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FUiColor4_oeDataSave = function FUiColor4_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FUiColor4_onBuildEditValue = function FUiColor4_onBuildEditValue(p){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('InputPanel');
      var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
      if(o._editLength){
         he.maxLength = o._editLength;
      }
   }
   MO.FUiColor4_construct = function FUiColor4_construct(){
      var o = this;
      o.__base.FEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiColor4_get = function FUiColor4_get(p){
      var o = this;
      var r = o.__base.FEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FUiColor4_set = function FUiColor4_set(p){
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
   MO.FUiColor4_onDataKeyDown = function FUiColor4_onDataKeyDown(s, e){
      var o = this;
      o.__base.FEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiColor4_formatValue = function FUiColor4_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiColor4_setText = function FUiColor4_setText(t){
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
   MO.FUiColor4_validText = function FUiColor4_validText(t){
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
   MO.FUiColor4_findEditor = function FUiColor4_findEditor(){
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
   MO.FUiColor4_drop = function FUiColor4_drop(){
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
   MO.FUiColor4_clone = function FUiColor4_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiColor4_link = function FUiColor4_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiColorPicker = function FUiColorPicker(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescColor, MDropable);
      o.borderStyle = EUiBorder.RoundDrop;
      o.onBuildEdit = FUiColorPicker_onBuildEdit;
      o.onEditEnd   = FUiColorPicker_onEditEnd;
      o.onDataKeyDown   = FUiColorPicker_onDataKeyDown;
      o.checkColor = FUiColorPicker_checkColor;
      o.setText     = FUiColorPicker_setText;
      o.drop        = FUiColorPicker_drop;
      o.dispose     = FUiColorPicker_dispose;
      return o;
   }
   MO.FUiColorPicker_onBuildEdit = function FUiColorPicker_onBuildEdit(b){
      var o = this;
      var h = o.hEdit = RBuilder.appendEdit(b.hPanel, o.style('Edit'));
      h.maxLength = 20;
   }
   MO.FUiColorPicker_onEditEnd = function FUiColorPicker_onEditEnd(editor){
      var o = this;
      RLog.debug(o, 'Begin (editor={0}:{1} value={2})', editor, editor?editor.color:'', o.dataValue);
      if(editor){
         o.set(editor.color);
         o.hDrop.style.backgroundColor = editor.color;
      }
      o.onDataEditEnd(o);
      RLog.debug(o, 'End (editor={0} value={1})', editor, o.dataValue);
   }
   MO.FUiColorPicker_setText = function FUiColorPicker_setText(t){
      var o = this;
      o.base.FEditControl.setText.call(o, RString.toUpper(t));
      o.hDrop.style.backgroundColor = t;
   }
   MO.FUiColorPicker_checkColor = function FUiColorPicker_checkColor(c)
   {
      var oSpan = document.createElement("<span style='color:"+c+";'></span>");
      if(oSpan.style.color != ""){
         return true;
      }else{
         return false;
      }
   }
   MO.FUiColorPicker_onDataKeyDown = function FUiColorPicker_onDataKeyDown(e){
         var o = this;
         o.base.FEditControl.onDataKeyDown.call(o, o, e);
         if(o.checkColor(o.text())){
            o.hDrop.style.backgroundColor = o.text();
         }else{
            o.hDrop.style.backgroundColor = '';
         }
   }
   MO.FUiColorPicker_drop = function FUiColorPicker_drop(){
      var o = this;
      if(o.canDrop() && o.canEdit){
         var ed = o.editor = RConsole.find(FEditConsole).focus(o, FUiColorPickerEditor, o.name);
         if(ed.linkControl(o)){
            ed.set(o.reget());
         }
         ed.show();
      }
   }
   MO.FUiColorPicker_dispose = function FUiColorPicker_dispose(){
      var o = this;
      o.base.FEditControl.dispose.call(o);
      RMemory.freeHtml(o.hEdit);
      RMemory.freeHtml(o.hDrop);
      o.hEdit = null;
      o.hDrop = null;
   }
}
with(MO){
   MO.FColorPickerEditor = function FColorPickerEditor(o){
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
   MO.FColorPickerEditor_onBuildDrop = function FColorPickerEditor_onBuildDrop(){
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
   MO.FColorPickerEditor_linkControl = function FColorPickerEditor_linkControl(c){
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
   MO.FColorPickerEditor_onCellEnter = function FColorPickerEditor_onCellEnter(e){
      var o = this;
      o.editable.hDrop.style.backgroundColor = e.hSource.style.backgroundColor;
   }
   MO.FColorPickerEditor_onCellSelect = function FColorPickerEditor_onCellSelect(e){
      var o = this;
      o.color = e.srcElement.style.backgroundColor;
      o.editStatus = EEditStatus.Ok
      o.blur();
   }
   MO.FColorPickerEditor_makeCell = function FColorPickerEditor_makeCell(hRow, color) {
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
   MO.FColorPickerEditor_onKeyDown = function FColorPickerEditor_onKeyDown(e){
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
   MO.FColorPickerEditor_set = function FColorPickerEditor_set(v){
      var o = this;
      o.color = v;
   }
   MO.FColorPickerEditor_show = function FColorPickerEditor_show(v){
      var o = this;
      o.base.FDropEditor.show.call(o, v);
      RConsole.find(FFocusConsole).focus(o);
      if(o.border.hForm.offsetWidth < o.MinWidth){
         o.border.hForm.style.pixelWidth = o.MinWidth;
      }
      o.base.MShadow.show.call(o, v);
      o.isSkipBlur = false;
   }
   MO.FColorPickerEditor_onEditEnd = function FColorPickerEditor_onEditEnd(){
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
   MO.FColorPickerEditor_hide = function FColorPickerEditor_hide(){
      var o = this;
      o.source = null;
      o.base.FDropEditor.hide.call(o);
      o.base.MShadow.hide.call(o);
   }
   MO.FColorPickerEditor_dispose = function FColorPickerEditor_dispose(){
      var o = this;
      o.base.FDropEditor.dispose.call(o);
      RMemory.freeHtml(o.hTable);
      RMemory.freeHtml(o.hDropPanel);
      RMemory.freeHtml(o.hEdit);
      o.hTable = null;
      o.hDropPanel = null;
      o.hEdit = null;
   }
}
with(MO){
   MO.FUiColorPower = function FUiColorPower(o){
      o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MMouseCapture);
      o._inputSize          = RClass.register(o, new APtySize2('_inputSize'));
      o._valueMin           = RClass.register(o, new APtyNumber('_valueMin'));
      o._valueMax           = RClass.register(o, new APtyNumber('_valueMax'));
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
   MO.FUiColorPower_onBuildEditValue = function FUiColorPower_onBuildEditValue(p){
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
      b.setRange(o._valueMin, o._valueMax);
      b.hPanel = hcf;
      b.build();
   }
   MO.FUiColorPower_onMouseCaptureStart = function FUiColorPower_onMouseCaptureStart(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseDown(p);
      }
   }
   MO.FUiColorPower_onMouseCapture = function FUiColorPower_onMouseCapture(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseMove(p);
      }
   }
   MO.FUiColorPower_onMouseCaptureStop = function FUiColorPower_onMouseCaptureStop(p){
      var o = this;
      var b = RHtml.searchObject(p.hSource, '__pbar');
      if(b){
         b.onMouseUp(p);
      }
   }
   MO.FUiColorPower_onInputKeyPress = function FUiColorPower_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(RKeyboard.isControlKey(c)){
         return;
      }
      if(!RKeyboard.isFloatKey(c)){
         p.cancel();
      }
   }
   MO.FUiColorPower_onInputEdit = function FUiColorPower_onInputEdit(p){
      var o = this;
      var hs = p.hSender;
      var b = hs._pbar;
      if(b){
         b.changeInputEdit();
      }
      o.processDataChangedListener(o);
   }
   MO.FUiColorPower_onInputChange = function FUiColorPower_onInputChange(p){
      var o = this;
      var hs = p.hSender;
      var b = hs._pbar;
      if(b){
         b.changeInputChange();
      }
      o.processDataChangedListener(o);
   }
   MO.FUiColorPower_construct = function FUiColorPower_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SColor4();
      o._innerDataValue = new SColor4();
   }
   MO.FUiColorPower_get = function FUiColorPower_get(p){
      var o = this;
      var v = o._innerDataValue;
      v.red = o._barRed.get();
      v.green = o._barGreen.get();
      v.blue = o._barBlue.get();
      v.alpha = o._barPower.get();
      return v;
   }
   MO.FUiColorPower_set = function FUiColorPower_set(p){
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
   MO.FUiColorPower_setDisplayColor = function FUiColorPower_setDisplayColor(){
      var o = this;
      var v = o._innerDataValue;
      var va = v.alpha;
      var vr = RHex.format(RInteger.toRange(parseInt(v.red * va * 255), 0, 255), 2);
      var vg = RHex.format(RInteger.toRange(parseInt(v.green * va * 255), 0, 255), 2);
      var vb = RHex.format(RInteger.toRange(parseInt(v.blue * va * 255), 0, 255), 2);
      o._hColorImage.style.backgroundColor = '#' + vr + vg + vb;
   }
   MO.FUiColorPower_setDisplay = function FUiColorPower_setDisplay(){
      var o = this;
      o.setDisplayColor();
      var v = o._innerDataValue;
      o._barRed.set(v.red);
      o._barGreen.set(v.green);
      o._barBlue.set(v.blue);
      o._barPower.set(v.alpha);
   }
   MO.FUiColorPower_refreshValue = function FUiColorPower_refreshValue(){
      var o = this;
      o.get();
      o.setDisplayColor();
      o.processDataChangedListener(o);
   }
   MO.FUiColorPower_dispose = function FUiColorPower_dispose(t){
      var o = this;
      o.__base.FUiEditControl.dispose.call(o, t);
   }
}
with(MO){
   MO.FUiDateTime = function FUiDateTime(o){
      o = RClass.inherits(this, o, FUiEditControl, MUiDropable);
      o.editDispMode = RClass.register(o, new APtySet('editDisplay', 'editDate', EDateTimeMode.Display));
      o.editYear     = RClass.register(o, new APtySet('editYear', 'editDate', EDateTimeMode.Year));
      o.editMonth    = RClass.register(o, new APtySet('editMonth', 'editDate', EDateTimeMode.Month));
      o.editDay      = RClass.register(o, new APtySet('editDay', 'editDate', EDateTimeMode.Day));
      o._date        = null;
      o.borderStyle  = EUiBorder.RoundDrop;
      o.lsnEditEnd   = null;
      o.hYearPanel   = null;
      o.hYear        = null;
      o.hMonthPanel  = null;
      o.hMonth       = null;
      o.hDayPanel    = null;
      o.hDay         = null;
      o.onKeyPress   = FUiDateTime_onKeyPress;
      o.onEditEnd    = FUiDateTime_onEditEnd;
      o.onBuildEdit  = FUiDateTime_onBuildEdit;
      o.oeSaveValue  = FUiDateTime_oeSaveValue;
      o.construct    = FUiDateTime_construct;
      o.formatValue  = FUiDateTime_formatValue;
      o.text         = FUiDateTime_text;
      o.setText      = FUiDateTime_setText;
      o.validText    = FUiDateTime_validText;
      o.setEditable  = FUiDateTime_setEditable;
      o.refreshStyle = FUiDateTime_refreshStyle;
      o.drop         = FUiDateTime_drop;
      o.dispose      = FUiDateTime_dispose;
      return o;
   }
   MO.FUiDateTime_onKeyPress = function FUiDateTime_onKeyPress(e){
      if(!RString.inChars(String.fromCharCode(e.keyCode), RDate.Chars)){
         RKey.eventClear(e);
      }
   }
   MO.FUiDateTime_onEditEnd = function FUiDateTime_onEditEnd(e){
      var o = this;
      if(e){
         o.set(e.get());
      }
      o.onDataEditEnd(o);
   }
   MO.FUiDateTime_onBuildEdit = function FUiDateTime_onBuildEdit(b){
      var o = this;
      var htb = RBuilder.appendTable(b.hPanel);
      htb.width = '100%';
      htb.style.tableLayout = 'fixed';
      var hr = o.hEdit = htb.insertRow();
      o.onBuildChange(hr.insertCell())
      var hc = oonDateDoubleClickPanel = hr.insertCell();
      hc.width = '40%';
      hc.style.padding = '0 1';
      var he = o.hYear = RBuilder.appendEdit(hc);
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
      var he = o.hMonth = RBuilder.appendEdit(hc);
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
      var he = o.hDay = RBuilder.appendEdit(hc);
      he.maxLength = 2;
      he.style.border = 0;
      he.style.width = '100%';
      he.style.textAlign = 'right';
      o.hDay.style.display = o.editDay?'block':'none';
   }
   MO.FUiDateTime_oeSaveValue = function FUiDateTime_oeSaveValue(e){
      var o = this;
      var dn = RString.nvl(o.dataCode, o.dataName);
      if(!RString.isEmpty(dn)){
         var vs = e.values;
         var v = vs.get(dn);
         if(v){
            vs.set(dn, o.reget().substring(0, 8) + v.substring(8));
         }else{
            vs.set(dn, o.reget());
         }
      }
      return EEventStatus.Stop;
   }
   MO.FUiDateTime_construct = function FUiDateTime_construct(){
      var o = this;
      o.base.FUiEditControl.construct.call(o);
      o._date = new TDate();
      o.lsnEditEnd = new TListener(o, o.onEditEnd);
   }
   MO.FUiDateTime_formatValue = function FUiDateTime_formatValue(t){
      if(t){
         var o = this;
         if(t.toLowerCase() == '@now'){
            o._date.now();
            return RDate.formatDate(o._date);
         }else{
            RDate.autoParse(o._date, t);
            return RDate.formatDate(o._date);
         }
      }
      return RString.nvl(t);
   }
   MO.FUiDateTime_text = function FUiDateTime_text(){
      var o = this;
      o._date.setYear(o._date.year);
      o._date.setMonth(o._date.month);
      o._date.setDay(o._date.day);
      return RDate.formatDate(o._date);
   }
   MO.FUiDateTime_setText = function FUiDateTime_setText(t){
      var o = this;
      if(t){
         RDate.autoParse(o._date, t);
         o.hYear.value = RInteger.format(o._date.year, 4);
         o.hMonth.value = RInteger.format(o._date.month, 2);
         o.hDay.value = RInteger.format(o._date.day, 2);
      }else{
         o.hYear.value = '';
         o.hMonth.value = '';
         o.hDay.value = '';
      }
   }
   MO.FUiDateTime_validText = function FUiDateTime_validText(t){
      return null;
   }
   MO.FUiDateTime_setEditable = function FUiDateTime_setEditable(v){
      var o = this;
      o.base.FUiEditControl.setEditable.call(o, v);
      o.hYear.readOnly = !v;
      o.hMonth.readOnly = !v;
      o.hDay.readOnly = !v;
   }
   MO.FUiDateTime_refreshStyle = function FUiDateTime_refreshStyle(){
      var o = this;
      o.base.FUiEditControl.refreshStyle.call(o);
      o.hYear.style.color = o._textColor;
      o.hYear.style.backgroundColor = o._backColor;
      o.hMonth.style.color = o._textColor;
      o.hMonth.style.backgroundColor = o._backColor;
      o.hDay.style.color = o._textColor;
      o.hDay.style.backgroundColor = o._backColor;
   }
   MO.FUiDateTime_drop = function FUiDateTime_drop(){
      var o = this;
      if(o.canDrop() && o._editable){
         var e = o.editor = RConsole.find(FEditConsole).focus(o, FUiDateTimeEditor, o.editRefer);
         e.set(RDate.formatDate(o._date));
         e.setYearVisible(o.editYear);
         e.setMonthVisible(o.editMonth);
         e.setDayVisible(o.editDay);
         e.lsnEditEnd = o.lsnEditEnd;
         e.show();
      }
   }
   MO.FUiDateTime_dispose = function FUiDateTime_dispose(){
      var o = this;
      o.base.FUiEditControl.dispose.call(o);
      o._date = null;
   }
}
with(MO){
   MO.FUiDateTimeEditor = function FUiDateTimeEditor(o){
      o = RClass.inherits(this, o, FUiDropEditor);
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
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiDateTimeEditor_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiDateTimeEditor_onButtonLeave);
      o.onYearClick       = RClass.register(o, new AEventMouseDown('onYearClick'), FUiDateTimeEditor_onYearClick);
      o.onMonthClick      = RClass.register(o, new AEventMouseDown('onMonthClick'), FUiDateTimeEditor_onMonthClick);
      o.onDayClick        = RClass.register(o, new AEventMouseDown('onDayClick'), FUiDateTimeEditor_onDayClick);
      o.onDateDoubleClick = RClass.register(o, new AEventDoubleClick('onDateDoubleClick'), FUiDateTimeEditor_onDateDoubleClick);
      o.onNowClick        = RClass.register(o, new AEventMouseDown('onNowClick'), FUiDateTimeEditor_onNowClick);
      o.onConfirmClick    = RClass.register(o, new AEventMouseDown('onConfirmClick'), FUiDateTimeEditor_onConfirmClick);
      o.onBuildDrop       = FUiDateTimeEditor_onBuildDrop;
      o.onBuildButton     = FUiDateTimeEditor_onBuildButton;
      o.construct         = FUiDateTimeEditor_construct;
      o.buildTitle        = FUiDateTimeEditor_buildTitle;
      o.get               = FUiDateTimeEditor_get;
      o.set               = FUiDateTimeEditor_set;
      o.resetDay          = FUiDateTimeEditor_resetDay;
      o.setYearVisible    = FUiDateTimeEditor_setYearVisible;
      o.setMonthVisible   = FUiDateTimeEditor_setMonthVisible;
      o.setDayVisible     = FUiDateTimeEditor_setDayVisible;
      o.selectCell        = FUiDateTimeEditor_selectCell;
      o.restore           = FUiDateTimeEditor_restore;
      o.show              = FUiDateTimeEditor_show;
      o.dispose           = FUiDateTimeEditor_dispose;
      return o;
   }
   MO.FUiDateTimeEditor_onButtonEnter = function FUiDateTimeEditor_onButtonEnter(e){
      if(!e.hSource.isSelect){
        if(RString.isEmpty(e.hSource.innerText)){
            e.hSource.style.backgroundColor = '#CCCCFF';
        }
      }
   }
   MO.FUiDateTimeEditor_onButtonLeave = function FUiDateTimeEditor_onButtonLeave(e){
      if(!e.hSource.isSelect){
         e.hSource.style.backgroundColor = '#FFFFFF';
      }
   }
   MO.FUiDateTimeEditor_onYearClick = function FUiDateTimeEditor_onYearClick(e){
      var o = this;
      o.date.setYear(e.hSource.innerText);
      o.restore();
      o.resetDay();
   }
   MO.FUiDateTimeEditor_onMonthClick = function FUiDateTimeEditor_onMonthClick(e){
      var o = this;
      o.date.setMonth(e.hSource.innerText);
      o.restore();
      o.resetDay();
   }
   MO.FUiDateTimeEditor_onDayClick = function FUiDateTimeEditor_onDayClick(e){
      var o = this;
      if(!RString.equals(e.hSource.innerText, '.')){
         o.date.setDay(e.hSource.innerText);
         o.restore();
      }
   }
   MO.FUiDateTimeEditor_onDateDoubleClick = function FUiDateTimeEditor_onDateDoubleClick(){
      this.onConfirmClick();
   }
   MO.FUiDateTimeEditor_onNowClick = function FUiDateTimeEditor_onNowClick(){
      var o = this;
      o.date = new TDate();
      o.editEnd();
   }
   MO.FUiDateTimeEditor_onConfirmClick = function FUiDateTimeEditor_onConfirmClick(){
      var o = this;
      o.date.setYear(o.hYear.value);
      o.date.setMonth(o.hMonth.value);
      o.date.setDay(o.hDay.value);
      o.editEnd();
   }
   MO.FUiDateTimeEditor_onBuildDrop = function FUiDateTimeEditor_onBuildDrop(){
      var o = this;
      var hdp = o.hDropPanel;
      hdp.width = 220;
      o.attachEvent('onDateDoubleClick', hdp);
      o.hTitleYear = o.buildTitle('Year', 4);
      var hp = o.hPanelYear = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<4; m++){
         var hr = hp.insertRow();
         for(var n=0; n<4; n++){
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(2000 + 4*m+n, 2);
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
      var hp = o.hPanelMonth = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<2; m++){
         hr = hp.insertRow();
         for(var n=0; n<6; n++){
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(6*m+n+1, 2);
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
      var hp = o.hPanelDay = o.hSelectPanel = RBuilder.appendTable(hdp);
      hp.width = '100%';
      for(var m=0; m<5; m++){
         hr = hp.insertRow();
         for(var n=0; n<7; n++){
            var day = 7*m+n+1;
            if(day > 31){
               continue;
            }
            var hc = hr.insertCell();
            hc.innerText = RInteger.format(day, 2);
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
   MO.FUiDateTimeEditor_onBuildButton = function FUiDateTimeEditor_onBuildButton(){
      var o = this;
      o.base.FUiDropEditor.onBuildButton.call(o);
      var hf = RBuilder.appendTable(o.hButtonPanel);
      hf.width = '100%';
      hf.height = 20;
      hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EEEEEE', endColorStr='#FFFFFF', gradientType='0')";
      var hr = hf.insertRow();
      var hc = hr.insertCell();
      hc.style.padding = '0 6';
      var h = o.hNow = RBuilder.append(hc, 'SPAN');
      h.style.cursor = 'hand';
      o.attachEvent('onNowClick', h);
      h.innerText = RContext.get('FDate:Now');
      var hc = hr.insertCell();
      hc.style.padding = '0 6';
      hc.align = 'right';
      var h = o.hNow = RBuilder.append(hc, 'SPAN');
      h.style.cursor = 'hand';
      o.attachEvent('onConfirmClick', h);
      h.innerText = RContext.get('FDate:Confirm');
   }
   MO.FUiDateTimeEditor_construct = function FUiDateTimeEditor_construct(){
      var o = this;
      o.base.FUiDropEditor.construct.call(o);
      o.date = new TDate();
      o.years = new TList();
      o.months = new TList();
      o.days = new TList();
   }
   MO.FUiDateTimeEditor_buildTitle = function FUiDateTimeEditor_buildTitle(n, ml){
      var o = this;
      var hf = RBuilder.appendTable(o.hDropPanel);
      hf.width = '100%';
      hf.style.borderBottom = '1 solid #999999';
      hf.style.filter = "progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FFFFFF', endColorStr='#E5FAFE', gradientType='0')";
      hf.style.backgroundColor = '#F8F8F8';
      hf.style.padding = '2 6';
      var hr = hf.insertRow();
      var hc = hr.insertCell();
      hc.width = 60;
      var he = o['h' + n] = RBuilder.appendEdit(hc);
      he.style.width = '100%';
      he.style.textAlign = 'right';
      he.style.border = '1 solid #CCCCCC';
      he.maxLength = ml;
      var hc = hr.insertCell();
      hc.innerText = RContext.get('FDate:' + n);
      return hf;
   }
   MO.FUiDateTimeEditor_get = function FUiDateTimeEditor_get(){
      return RDate.formatDate(this.date);
   }
   MO.FUiDateTimeEditor_set = function FUiDateTimeEditor_set(v){
      var o = this;
      RDate.autoParse(o.date, v);
      o.restore();
   }
   MO.FUiDateTimeEditor_setYearVisible = function FUiDateTimeEditor_setYearVisible(v){
      var o = this;
      o.hPanelYear.style.display = v? 'block':'none';
      o.hTitleYear.style.display = v? 'block':'none';
   }
   MO.FUiDateTimeEditor_setMonthVisible = function FUiDateTimeEditor_setMonthVisible(v){
      var o = this;
      o.hPanelMonth.style.display = v? 'block':'none';
      o.hTitleMonth.style.display = v? 'block':'none';
   }
   MO.FUiDateTimeEditor_setDayVisible = function FUiDateTimeEditor_setDayVisible(v){
      var o = this;
      o.hPanelDay.style.display = v? 'block':'none';
      o.hTitleDay.style.display = v? 'block':'none';
   }
   MO.FUiDateTimeEditor_show = function FUiDateTimeEditor_show(v){
      var o = this;
      o.base.FUiDropEditor.show.call(o, v);
      var hp = o.hPanel;
      var hbf = o.hBorderForm;
      var s = o.source;
      var r = s.getEditRange();
      hp.style.pixelLeft = r.x;
      hp.style.pixelTop = r.y + r.height;
      hp.style.pixelWidth = 220;
      o.base.MShadow.show.call(o);
   }
   MO.FUiDateTimeEditor_resetDay = function FUiDateTimeEditor_resetDay(){
      var o = this;
      var monthDays = this.date.monthDays();
      for(var n=0; n<o.days.count; n++){
         var hd = o.days.get(n);
         if(n >= monthDays){
            hd.innerText = '.';
         }else{
           hd.innerText = RInteger.format(n+1, 2);
         }
      }
   }
   MO.FUiDateTimeEditor_selectCell = function FUiDateTimeEditor_selectCell(ls, v){
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
   MO.FUiDateTimeEditor_restore = function FUiDateTimeEditor_restore(){
      var o = this;
      o.hYear.value = o.date.year;
      o.hMonth.value = o.date.month;
      o.hDay.value = o.date.day;
      o.selectCell(o.years, o.date.year);
      o.selectCell(o.months, o.date.month);
      o.selectCell(o.days, o.date.day);
   }
   MO.FUiDateTimeEditor_dispose = function FUiDateTimeEditor_dispose(){
      var o = this;
      o.base.FUiDropEditor.dispose.call(o);
      o.hPanel = null;
   }
}
with(MO){
   MO.FUiDropEditor = function FUiDropEditor(o){
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
   MO.FUiDropEditor_onBuild = function FUiDropEditor_onBuild(p){
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
   MO.FUiDropEditor_panel = function FUiDropEditor_panel(p){
      var o = this;
      if(p == EPanel.Shadow){
         return o.hPanel;
      }
      return o.__base.FUiEditor.panel.call(o, p);
   }
   MO.FUiDropEditor_setVisible = function FUiDropEditor_setVisible(p){
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
   MO.FUiDropEditor_dispose = function FUiDropEditor_dispose(){
      var o = this;
      o._hButtonPanel = RHtml.free(o._hButtonPanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o._hDropForm = RHtml.free(o._hDropForm);
      o.__base.FControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiEdit = function FUiEdit(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
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
      o.formatText       = FUiEdit_formatText;
      o.formatValue      = FUiEdit_formatValue;
      o.text             = FUiEdit_text;
      o.setText          = FUiEdit_setText;
      o.setEditAble      = FUiEdit_setEditAble;
      o.refreshValue     = FUiEdit_refreshValue;
      return o;
   }
   MO.FUiEdit_onBuildEditValue = function FUiEdit_onBuildEditValue(p){
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
   MO.FUiEdit_onInputEdit = function FUiEdit_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FUiEdit_construct = function FUiEdit_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiEdit_formatText = function FUiEdit_formatText(p){
      var o = this;
      var r = RString.nvl(p);
      o._dataDisplay = r;
      return r;
   }
   MO.FUiEdit_formatValue = function FUiEdit_formatValue(value){
      return value;
   }
   MO.FUiEdit_text = function FUiEdit_text(){
      return this._hInput.value;
   }
   MO.FUiEdit_setText = function FUiEdit_setText(text){
      this._hInput.value = text;
   }
   MO.FUiEdit_setEditAble = function FUiEdit_setEditAble(flag){
      var o = this;
      o.__base.FUiEditControl.setEditAble.call(o, flag);
      o._hInput.readOnly = !flag;
   }
   MO.FUiEdit_refreshValue = function FUiEdit_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FUiEditControl = function FUiEditControl(o){
      o = RClass.inherits(this, o, FUiControl, MUiEditValue, MUiEditChange, MUiEditDrop);
      o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
      o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
      o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
      o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
      o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
      o._editSize         = RClass.register(o, new APtySize2('_editSize'));
      o._editColor        = RClass.register(o, new APtyString('_editColor'));
      o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
      o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
      o._progressing      = false;
      o._hLabelPanel      = null;
      o._hLabelForm       = null;
      o._hIconPanel       = null;
      o._hIcon            = null;
      o._hTextPanel       = null;
      o._hText            = null;
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
      o.oeMode            = FUiEditControl_oeMode;
      o.oeProgress        = FUiEditControl_oeProgress;
      o.construct         = FUiEditControl_construct;
      o.panel             = FUiEditControl_panel;
      o.label             = FUiEditControl_label;
      o.setLabel          = FUiEditControl_setLabel;
      o.getValueRectangle = FUiEditControl_getValueRectangle;
      o.dispose           = FUiEditControl_dispose;
      return o;
   }
   MO.FUiEditControl_onBuildLabelIcon = function FUiEditControl_onBuildLabelIcon(p){
      var o = this;
      if(o._labelIcon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
      }else{
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
      }
   }
   MO.FUiEditControl_onBuildLabelText = function FUiEditControl_onBuildLabelText(p){
      var o = this;
      o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
   }
   MO.FUiEditControl_onBuildLabel = function FUiEditControl_onBuildLabel(p){
      var o = this;
      var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
      var hr = RBuilder.appendTableRow(h);
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      hip.width = '20px';
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
   MO.FUiEditControl_onBuildEdit = function FUiEditControl_onBuildEdit(p){
      var o = this;
      var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
      var hr = o._hEditLine = RBuilder.appendTableRow(h);
      o._hValuePanel = RBuilder.appendTableCell(hr);
      o.onBuildEditValue(p);
      RHtml.setSize(h, o._editSize);
   }
   MO.FUiEditControl_onBuildPanel = function FUiEditControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiEditControl_onBuild = function FUiEditControl_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      var hc = o._hPanel;
      var hlp = null;
      var hep = null;
      var lmc = o._labelModeCd;
      if(lmc == EUiLabelMode.Label){
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lmc == EUiLabelMode.Hidden){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var lpc = o._labelPositionCd;
         if(lpc == EUiLabelPosition.Top){
            hlp = RBuilder.appendTableRowCell(hc);
            hep = RBuilder.appendTableRowCell(hc);
         }else if(lpc == EUiLabelPosition.Right){
            var hr = RBuilder.appendTableRow(hc);
            hep = RBuilder.appendTableCell(hr);
            hlp = RBuilder.appendTableCell(hr);
         }else if(lpc == EUiLabelPosition.Bottom){
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
   MO.FUiEditControl_oeMode = function FUiEditControl_oeMode(e){
      var o = this;
      o.__base.FUiControl.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      o._validable = o.canValid(e.mode);
      if(!o._progressing){
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiEditControl_oeProgress = function FUiEditControl_oeProgress(e){
      var o = this;
      if(o._progressing && e.enable){
         return EEventStatus.Stop;
      }
      o._progressing = e.enable;
      if(e.enable){
         var ea = o._editable;
         o.setEditable(false);
         o._editable = ea;
      }else{
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiEditControl_construct = function FUiEditControl_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
      o.__base.MUiEditChange.construct.call(o);
      o.__base.MUiEditDrop.construct.call(o);
      o._labelSize = new SSize2(100, 20);
      o._editSize = new SSize2(200, 20);
   }
   MO.FUiEditControl_panel = function FUiEditControl_panel(t){
      var o = this;
      if(EPanel.Edit == t){
         return o.hEdit;
      }else if(EPanel.Focus == t){
         return o.hEdit;
      }
      return o.__base.FUiControl.panel.call(o, t);
   }
   MO.FUiEditControl_label = function FUiEditControl_label(p){
      return this._label;
   }
   MO.FUiEditControl_setLabel = function FUiEditControl_setLabel(p){
      var o = this;
      o._label = p;
      if(o._hText){
         o._hText.innerHTML = RString.nvl(p);
      }
   }
   MO.FUiEditControl_getValueRectangle = function FUiEditControl_getValueRectangle(r){
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
   MO.FUiEditControl_dispose = function FUiEditControl_dispose(){
      var o = this;
      o._labelModeCd = null;
      o._labelPositionCd = null;
      o._labelAlignCd = null;
      o._dataTypeCd = null;
      o._labelSize = RObject.dispose(o._labelSize);
      o._editSize = RObject.dispose(o._editSize);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hLabelForm = RHtml.free(o._hLabelForm);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hTextPanel = RHtml.free(o._hTextPanel);
      o._hText = RHtml.free(o._hText);
      o._hEditPanel = RHtml.free(o._hEditPanel);
      o._hEditForm = RHtml.free(o._hEditForm);
      o._hValuePanel = RHtml.free(o._hValuePanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.MUiEditDrop.dispose.call(o);
      o.__base.MUiEditChange.dispose.call(o);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiEditor = function FUiEditor(o){
      o = RClass.inherits(this, o, FUiControl, MUiFocus);
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
   MO.FUiEditor_onEditBegin = function FUiEditor_onEditBegin(){
      this.editBegin();
   }
   MO.FUiEditor_onEditChanged = function FUiEditor_onEditChanged(){
      var o = this;
      MO.Logger.debug(o, 'Edit changed');
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
   MO.FUiEditor_onEditEnd = function FUiEditor_onEditEnd(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor end. (control={1})', RClass.dump(s));
      o.hide();
      if(o.lsnEditEnd){
         o.lsnEditEnd.process(o);
      }
      s._editor = null;
      o._source = null;
      o._statusEditing = false;
   }
   MO.FUiEditor_onBuildPanel = function FUiEditor_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createSpan(p);
      h.__linker = o;
   }
   MO.FUiEditor_onBuild = function FUiEditor_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      o._hPanel.style.zIndex = EUiLayer.Editor;
   }
   MO.FUiEditor_get = function FUiEditor_get(name){
   }
   MO.FUiEditor_set = function FUiEditor_set(name, value){
   }
   MO.FUiEditor_doBlur = function FUiEditor_doBlur(){
      var o = this;
      var s = o._source;
      if(s){
         o.editCancel();
         if(RClass.isClass(s, MUiFocus)){
            s.doBlur();
         }
      }
   }
   MO.FUiEditor_panel = function FUiEditor_panel(p){
      var o = this;
      if(p == EPanel.Edit){
         return o._hEdit;
      }else if(p == EPanel.Focus){
         return o._hEdit;
      }
      return o.__base.FUiControl.panel.call(o, p);
   }
   MO.FUiEditor_linkControl = function FUiEditor_linkControl(c){
      var o = this;
      o._source = c;
   }
   MO.FUiEditor_editBegin = function FUiEditor_editBegin(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor begin. (control={1})', RClass.dump(s));
      if(o.lsnEditCancel){
         o.lsnEditCancel.process(o);
      }
      s._editor = o;
      o._statusEditing = true;
   }
   MO.FUiEditor_editCancel = function FUiEditor_editCancel(){
      var o = this;
      var s = o._source;
      MO.Logger.debug(o, 'Editor cancel. (control={1})', RClass.dump(s));
      o.hide();
      if(o.lsnEditCancel){
         o.lsnEditCancel.process(o);
      }
      s._editor = null;
      o._source = null;
      o._statusEditing = false;
   }
   MO.FUiEditor_editEnd = function FUiEditor_editEnd(){
      this.onEditEnd();
   }
   MO.FUiEditor_reset = function FUiEditor_reset(){
      var o = this;
      o.lsnEditBegin = null;
      o.lsnEditCancel = null;
      o.lsnEditEnd = null;
   }
   MO.FUiEditor_setVisible = function FUiEditor_setVisible(p){
      var o = this;
      o.__base.FUiControl.setVisible.call(o, p);
      if(p){
         o.editBegin();
         o.focus();
      }
   }
   MO.FUiEditor_dispose = function FUiEditor_dispose(){
      var o = this;
      o.__base.FUiControl.dispose.call(o);
      o._hEdit = null;
   }
}
with(MO){
   MO.FUiFile = function FUiFile(o){
      o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._styleFile       = RClass.register(o, new AStyle('_styleFile'));
      o._styleBrowser    = RClass.register(o, new AStyle('_styleBrowser'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FUiFile_onBuildEditValue;
      o.onFileChange     = RClass.register(o, new AEventChange('onFileChange'), FUiFile_onFileChange);
      o.construct        = FUiFile_construct;
      o.formatDisplay    = FUiFile_formatDisplay;
      o.formatValue      = FUiFile_formatValue;
      o.get              = FUiFile_get;
      o.set              = FUiFile_set;
      o.refreshValue     = FUiFile_refreshValue;
      return o;
   }
   MO.FUiFile_onBuildEditValue = function FUiFile_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl,  o.styleName('InputPanel'));
      var he = o._hInputEdit = RBuilder.appendEdit(hInputPanel, o.styleName('Input'));
      var hFile = o._hInput = RBuilder.appendFile(hInputPanel, o.styleName('File'));
      o.attachEvent('onFileChange', hFile);
      var hBrowserPanel = o._hBrowserPanel = RBuilder.appendTableCell(o._hEditLine);
      hBrowserPanel.style.paddingLeft = '4px';
      var hBrowser = o._hBrowser = RBuilder.appendButton(hBrowserPanel, o.styleName('Browser'));
      hBrowser.value = '浏览...';
      RHtml.setSize(hInputPanel, o._inputSize);
      RHtml.setSize(hFile, o._inputSize);
      if(o._editLength){
         he.maxLength = o._editLength;
      }
   }
   MO.FUiFile_onFileChange = function FUiFile_onFileChange(event){
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
   MO.FUiFile_construct = function FUiFile_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiFile_formatDisplay = function FUiFile_formatDisplay(p){
      var o = this;
      var r = RString.nvl(p);
      o._dataDisplay = r;
      return r;
   }
   MO.FUiFile_formatValue = function FUiFile_formatValue(p){
      return p;
   }
   MO.FUiFile_get = function FUiFile_get(){
      var o = this;
      var r = o.__base.FUiEditControl.get.call(o);
      var r = o._hInput.value;
      return r;
   }
   MO.FUiFile_set = function FUiFile_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      o._hInput.value = RString.nvl(p);
   }
   MO.FUiFile_refreshValue = function FUiFile_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FUiForm = function FUiForm(o){
      o = RClass.inherits(this, o, FUiLayout, MUiDescribeFrame);
      o.onMouseDown        = FUiForm_onMouseDown;
      o.construct          = FUiForm_construct;
      o._dataStatusCd      = ERowStatus.Update;
      o._dataComponents    = null;
      o.lsnsLoaded         = null;
      o.lsnsClick          = null;
      o.onLoadDataset      = FUiForm_onLoadDataset;
      o.onLoadDatasetEnd   = FUiForm_onLoadDatasetEnd;
      o.isDataChanged      = FUiForm_isDataChanged;
      o.getFormLink        = FUiForm_getFormLink;
      o.allDataComponents  = FUiForm_allDataComponents;
      o.get                = FUiForm_get;
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
   MO.FUiForm_onMouseDown = function FUiForm_onMouseDown(p){
      var o = this;
   }
   MO.FUiForm_construct = function FUiForm_construct(){
      var o = this;
      o.__base.FUiLayout.construct.call(o);
   }
   MO.FUiForm_onLoadDataset = function FUiForm_onLoadDataset(ds){
      var o = this;
      o.doUpdate(o.dsViewer.current());
   }
   MO.FUiForm_onLoadDatasetEnd = function FUiForm_onLoadDatasetEnd(){
      var o = this;
      o.topControl().topResize();
      o.psProgress(false);
   }
   MO.FUiForm_isDataChanged = function FUiForm_isDataChanged(){
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
   MO.FUiForm_getFormLink = function FUiForm_getFormLink(t){
      var o = this;
      if(EFormLink.Form == t){
         return o.name;
      }else if(EFormLink.Table == t){
         return o.formName;
      }
      RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
   }
   MO.FUiForm_allDataComponents = function FUiForm_allDataComponents(p, m){
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
   MO.FUiForm_get = function FUiForm_get(n){
      var ps = this.allDataComponents();
      if(ps){
         var p = ps.get(n);
         if(p){
            return p.get();
         }
      }
   }
   MO.FUiForm_set = function FUiForm_set(n){
      var ps = this.allDataComponents();
      if(ps){
         var p = ps.get(n);
         if(p){
            return p.reget();
         }
      }
   }
   MO.FUiForm_set = function FUiForm_set(n, v){
      var ps = this.allDataComponents();
      if(ps){
         var p = ps.get(n);
         if(p){
            p.set(v);
         }
      }
   }
   MO.FUiForm_getDataCodes = function FUiForm_getDataCodes(){
      var o = this;
      var e = o._codeEvent;
      e.values = new TAttributes();
      o.process(e);
      return e.values;
   }
   MO.FUiForm_getCurrentRow = function FUiForm_getCurrentRow(){
      return this.saveValue();
   }
   MO.FUiForm_getSelectedRows = function FUiForm_getSelectedRows(){
      var ls = new TList();
      ls.push(this.saveValue());
      return ls;
   }
   MO.FUiForm_getCurrentRows = function FUiForm_getCurrentRows(){
      var o = this;
      var ls = new TList();
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
      return ls;
   }
   MO.FUiForm_getChangedRows = function FUiForm_getChangedRows(){
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
   MO.FUiForm_getRows = function FUiForm_getRows(){
      var ls = new TList();
      ls.push(this.saveValue());
      return ls;
   }
   MO.FUiForm_clearValue = function FUiForm_clearValue(){
      this.process(this._clearEvent);
   }
   MO.FUiForm_resetValue = function FUiForm_resetValue(){
      this.process(this._resetEvent);
   }
   MO.FUiForm_loadValue = function FUiForm_loadValue(r, m){
      if(r){
         var o = this;
         var e = o._loadEvent;
         e.viewer = o.dsViewer;
         e.store = m;
         e.values = r;
         o.process(e);
      }
   }
   MO.FUiForm_saveValue = function FUiForm_saveValue(r, m){
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
   MO.FUiForm_recordValue = function FUiForm_recordValue(){
      this.process(this._recordEvent);
   }
   MO.FUiForm_toAttributes = function FUiForm_toAttributes(r, m){
      return this.saveValue(r, m);
   }
   MO.FUiForm_focus = function FUiForm_focus(){
      var o = this;
      o.__base.MUiFocus.focus.call(o);
      o.focusControl();
      RConsole.find(FFocusConsole).focusClass(MDataset, o);
   }
   MO.FUiForm_dsUpdate = function FUiForm_dsUpdate(u, v){
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
   MO.FUiForm_setEditable = function FUiForm_setEditable(v){
      var ps = this.allDataComponents();
      if(ps){
         var pc = ps.count;
         for(var n = 0; n < pc; n++){
            var p = ps.value(n);
            p.setEditable(v);
         }
      }
   }
   MO.FUiForm_doPrepare = function FUiForm_doPrepare(v){
      var o = this;
      o._dataStatusCd = ERowStatus.Insert;
      o.resetValue();
      o.loadValue(v);
      o.recordValue();
      o.dsLoaded();
   }
   MO.FUiForm_doUpdate = function FUiForm_doUpdate(v){
      var o = this;
      o._dataStatusCd = ERowStatus.Update;
      o.clearValue();
      o.loadValue(v);
      o.recordValue();
      o.dsLoaded();
   }
   MO.FUiForm_doDelete = function FUiForm_doDelete(v){
      var o = this;
      o._dataStatusCd = ERowStatus.Delete;
      o.clearValue();
      o.loadValue(v);
      o.recordValue();
      o.dsLoaded();
   }
   MO.FUiForm_dispose = function FUiForm_dispose(){
      var o = this;
      o.__base.FUiLayout.dispose.call(o);
      RMemory.freeHtml(o.hEdit);
      RMemory.freeHtml(o.hDrop);
      o.hEdit = null;
      o.hDrop = null;
   }
   MO.FUiForm_allNameComponents = function FUiForm_allNameComponents(f, p, m){
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
   MO.FUiForm_onLoaded = function FUiForm_onLoaded(){
      var o = this.form;
      var doc = this.document;
      if(o && doc){
         RControl.build(o, doc.root());
         o.isLoading = false;
         o.lsnsLoaded.process(o);
      }
   }
   MO.FUiForm_onDsFetchEnd = function FUiForm_onDsFetchEnd(){
      var o = this;
      var v = o.dsCurrent();
      if(v){
         o.loadValue(v);
      }
   }
   MO.FUiForm_onDsUpdateBegin = function FUiForm_onDsUpdateBegin(){
      var o = this;
      var v = o.dsCurrent();
      if(v){
         o.saveValue(v);
      }
   }
   MO.FUiForm_onDsUpdateEnd = function FUiForm_onDsUpdateEnd(){
      var o = this;
      var v = o.dsCurrent();
      if(v){
         o.loadValue(v);
      }
   }
   MO.FUiForm_connect = function FUiForm_connect(service, type, action, attrs){
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
   MO.FUiForm_loadDocument = function FUiForm_loadDocument(doc){
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
   MO.FUiForm_testStatus = function FUiForm_testStatus(t){
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
   MO.FUiForm_hasAction = function FUiForm_hasAction(){
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
}
with(MO){
   MO.FUiFrame = function FUiFrame(o){
      o = RClass.inherits(this, o, FUiLayout);
      return o;
   }
}
with(MO){
   MO.FUiIconPicker = function FUiIconPicker(o){
      o = RClass.inherits(this, o, FUiEdit);
      return o;
   }
   MO.FUiIconPicker_onEditKeyDown = function FUiIconPicker_onEditKeyDown(e){
      var o = this;
      o.base.FUiEditControl.onEditKeyDown.call(o,e);
      o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }
   MO.FUiIconPicker_onEditKeyPress = function FUiIconPicker_onEditKeyPress(e){
      var o = this;
      o.base.FUiEditControl.onEditKeyPress.call(o, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiIconPicker_onBuildEdit = function FUiIconPicker_onBuildEdit(b){
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
   MO.FUiIconPicker_setText = function FUiIconPicker_setText(t){
      var o = this;
      o.base.FUiEditControl.setText.call(o, t);
      o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }
   MO.FUiIconPicker_dispose = function FUiIconPicker_dispose(){
      var o = this;
      o.base.FUiEditControl.dispose.call(o);
      o.hEditIcon = null;
      o.hEdit = null;
   }
}
with(MO){
   MO.FUiLabel = function FUiLabel(o){
      o = RClass.inherits(this, o, FUiControl);
      o.onBuild = FUiLabel_onBuild;
      o.get     = FUiLabel_get;
      o.set     = FUiLabel_set;
      return o;
   }
   MO.FUiLabel_onBuild = function FUiLabel_onBuild(event){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, event);
   }
   MO.FUiLabel_get = function FUiLabel_get(){
      return this._hPanel.innerHTML;
   }
   MO.FUiLabel_set = function FUiLabel_set(value){
      this._hPanel.innerHTML = value;
   }
}
with(MO){
   MO.FUiLayout = function FUiLayout(o){
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
   MO.FUiLayout_onBuildPanel = function FUiLayout_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
      if(o._layoutCd == EUiLayout.Design){
         var hr = RBuilder.appendTableRow(h);
         var hc = RBuilder.appendTableCell(hr);
         o._hContainer = hc;
      }
   }
   MO.FUiLayout_onDesignBegin = function FUiLayout_onDesignBegin(){
      var o = this;
      o.__base.MDesign.onDesignBegin.call(o);
   }
   MO.FUiLayout_onDesignEnd = function FUiLayout_onDesignEnd(){
      var o = this;
      o.__base.MDesign.onDesignEnd.call(o);
   }
   MO.FUiLayout_oeDesign = function FUiLayout_oeDesign(p){
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
   MO.FUiLayout_oeResize = function FUiLayout_oeResize(p){
      var o = this;
      o.__base.FUiContainer.oeResize.call(o, p);
      if(p.isAfter()){
         o.resize();
      }
   }
   MO.FUiLayout_oeRefresh = function FUiLayout_oeRefresh(p){
      var o = this;
      o.__base.FUiContainer.oeDesign.call(o, p);
      if(p.isAfter()){
         o.resize();
      }
   }
   MO.FUiLayout_insertPosition = function FUiLayout_insertPosition(cf, ct, idx, copy){
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
   MO.FUiLayout_moveChild = function FUiLayout_moveChild(cf, ct, pos, copy){
      if(!(cf && ct && pos) || (cf == ct)){
         return;
      }
      var o = this;
      var hPanel = o._hPanel;
      var moved = false;
      var cfh = RClass.isClass(cf, MUiHorizontal);
      var hCfTd = RHtml.parent(cf._hPanel, 'TD');
      var hCfTab = RHtml.parent(cf._hPanel, 'TABLE');
      var cth = RClass.isClass(ct, MUiHorizontal);
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
   MO.FUiLayout_innerAppendLine = function FUiLayout_innerAppendLine(){
      var o = this;
      var h = null;
      if(o._layoutCd == EUiLayout.Design){
         h = o._hPanelTable = RBuilder.appendTable(o._hContainer);
         h.style.paddingBottom = 4;
         o._hPanelLine = RBuilder.appendTableRow(h);
      }else{
         o._hPanelTable = null;
         o._hPanelLine = null;
      }
      return h;
   }
   MO.FUiLayout_appendChild = function FUiLayout_appendChild(control){
      var o = this;
      if(o._layoutCd == EUiLayout.Design){
         if(!o._hPanelLine){
            o.innerAppendLine();
         }
         if(RClass.isClass(control, MUiHorizontal)){
            if(o._hPanelTable.rows[0].cells.length == 0){
               o._hContainer.insertBefore(control._hPanel, o._hPanelTable);
            }else{
               o._hContainer.appendChild(control._hPanel);
               o.innerAppendLine();
            }
            return;
         }
         var hCell = RBuilder.appendTableCell(o._hPanelLine);
         if(!RClass.isClass(control, FUiLayout)){
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
         if(control.dockCd() == EUiDock.Fill){
            var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
            hCell.appendChild(control._hPanel);
         }else if(control._sizeCd == EUiSize.Fill){
            var hCell = RBuilder.appendTableRowCell(o._hPanelForm);
            hCell.appendChild(control._hPanel);
         }else if(RSet.contains(control._sizeCd, EUiSize.Horizontal) || '100%' == control.width){
            if(RClass.isClass(control, FUiSplit)){
               o._lastSplit = control;
            }
            var hr = RBuilder.appendTableRow(o._hPanelForm);
            var hc = RBuilder.appendTableCell(hr);
            hc.vAlign = 'top';
            hc.appendChild(control._hPanel);
            control._hLayoutRow = hr;
            o._hPanelLast = hc;
            if(!RSet.contains(control._sizeCd, EUiSize.Vertical)){
               hc.height = 1;
            }else if(control.height){
               hc.height = control.height;
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
            control._hLayoutRow = o._hPanelLine;
            o._hPanelLast = hc;
            hc.appendChild(control._hPanel);
            control._hLayoutCell = hc;
            if(control.wrapCd() == EUiWrap.NextLine){
               o._hPanelLine = null;
            }
         }
      }
   }
   MO.FUiLayout_resize = function FUiLayout_resize(){
      var o = this;
      var cs = o._components;
      if(cs){
         var ha = false;
         var c = cs.count();
         for(var n = 0; n < c; n++){
            var p = o._components.at(n);
            if(RClass.isClass(p, FUiTable) || RClass.isClass(p, FUiPageControl)){
               ha = true;
               break;
            }
         }
      }
   }
   MO.FUiLayout_dispose = function FUiLayout_dispose(){
      var o = this;
      o._hPanelCurrent = null;
      o._hPanelTable = null;
      o._hPanel = null;
      o._hContainer = null;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiLayoutHorizontal = function FUiLayoutHorizontal(o){
      o = RClass.inherits(this, o, FUiContainer);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hLine       = null;
      o.onBuildPanel = FUiLayoutHorizontal_onBuildPanel;
      o.onBuild      = FUiLayoutHorizontal_onBuild;
      o.appendChild  = FUiLayoutHorizontal_appendChild;
      o.dispose      = FUiLayoutHorizontal_dispose;
      return o;
   }
   MO.FUiLayoutHorizontal_onBuildPanel = function FUiLayoutHorizontal_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FUiLayoutHorizontal_onBuild = function FUiLayoutHorizontal_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event)
      o._hLine = RBuilder.appendTableRow(o._hPanel);
   }
   MO.FUiLayoutHorizontal_appendChild = function FUiLayoutHorizontal_appendChild(control){
      var o = this;
      var hCell = RBuilder.appendTableCell(o._hLine);
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
   MO.FUiLayoutHorizontal_dispose = function FUiLayoutHorizontal_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiLayoutVertical = function FUiLayoutVertical(o){
      o = RClass.inherits(this, o, FUiContainer);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hLine       = null;
      o.onBuildPanel = FUiLayoutVertical_onBuildPanel;
      o.appendChild  = FUiLayoutVertical_appendChild;
      o.dispose      = FUiLayoutVertical_dispose;
      return o;
   }
   MO.FUiLayoutVertical_onBuildPanel = function FUiLayoutVertical_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FUiLayoutVertical_appendChild = function FUiLayoutVertical_appendChild(control){
      var o = this;
      var hCell = RBuilder.appendTableRowCell(o._hPanel);
      hCell.appendChild(control._hPanel);
      var height = control.size().height;
      if(height){
         hCell.style.height = height + 'px';
      }
   }
   MO.FUiLayoutVertical_dispose = function FUiLayoutVertical_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiListBox = function FUiListBox(o){
      o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick);
      o._sizeCd      = EUiSize.Horizontal
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._hForm       = null;
      o.onBuildPanel = FUiListBox_onBuildPanel;
      o.createItem   = FUiListBox_createItem;
      o.appendChild  = FUiListBox_appendChild;
      o.clickItem    = FUiListBox_clickItem;
      o.clear        = FUiListBox_clear;
      o.dispose      = FUiListBox_dispose;
      return o;
   }
   MO.FUiListBox_onBuildPanel = function FUiListBox_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiListBox_createItem = function FUiListBox_createItem(icon, label){
      var o = this;
      var item = RClass.create(FUiListItem);
      item.build(o._hPanel);
      item.setLabel(label);
      return item;
   }
   MO.FUiListBox_appendChild = function FUiListBox_appendChild(control){
      var o = this;
      o._hPanel.appendChild(control._hPanel);
   }
   MO.FUiListBox_clickItem = function FUiListBox_clickItem(item){
      var o = this;
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FUiListItem)){
               component.setChecked(component == item);
            }
         }
      }
      var event = new SEvent(o);
      event.item = item;
      o.processClickListener(event);
      event.dispose();
   }
   MO.FUiListBox_clear = function FUiListBox_clear(){
      var o = this;
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FUiListItem)){
               o._hPanel.removeChild(component._hPanel);
            }
            component.dispose();
         }
         components.clear();
         o._controls.clear();
      }
   }
   MO.FUiListBox_dispose = function FUiListBox_dispose(){
      var o = this;
      o.__base.FContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiListItem = function FUiListItem(o){
      o = RClass.inherits(this, o, FUiControl);
      o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
      o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      o._checked        = false;
      o._hPanel         = null;
      o._hIconPanel     = null;
      o._hIcon          = null;
      o._hLabel         = null;
      o.onBuildPanel    = FUiListItem_onBuildPanel;
      o.onBuild         = FUiListItem_onBuild;
      o.onEnter         = FUiListItem_onEnter;
      o.onLeave         = FUiListItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListItem_onClick);
      o.label           = FUiListItem_label;
      o.setLabel        = FUiListItem_setLabel;
      o.setChecked      = FUiListItem_setChecked;
      o.dispose         = FUiListItem_dispose;
      return o;
   }
   MO.FUiListItem_onBuildPanel = function FUiListItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
   }
   MO.FUiListItem_onBuild = function FUiListItem_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      var h = o._hPanel;
      o._hIconPanel = RBuilder.appendTableCell(h, o.styleName('IconPanel'))
      if(o._icon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
      }
      o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
      if(o._label){
         o.setLabel(o._label);
      }
      o.attachEvent('onClick', h);
   }
   MO.FUiListItem_onEnter = function FUiListItem_onEnter(){
      var o = this;
      o.__base.FUiControl.onEnter.call(o);
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }
   MO.FUiListItem_onLeave = function FUiListItem_onLeave(){
      var o = this;
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FUiControl.onLeave.call(o);
   }
   MO.FUiListItem_onClick = function FUiListItem_onClick(p){
      var o = this;
      o._parent.clickItem(o);
   }
   MO.FUiListItem_label = function FUiListItem_label(p){
      return this._label;
   }
   MO.FUiListItem_setLabel = function FUiListItem_setLabel(p){
      var o = this;
      o._label = p;
      o._hLabel.innerHTML = RString.nvl(p);
   }
   MO.FUiListItem_setChecked = function FUiListItem_setChecked(p){
      var o = this;
      o._checked = p;
      if(o._hIcon){
         o._hIcon.style.display = p ? 'block' : 'none';
      }else{
         o._hIconPanel.innerHTML = p ? 'O' : '';
      }
      o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
   }
   MO.FUiListItem_dispose = function FUiListItem_dispose(){
      var o = this;
      o._hPanel = RHtml.free(o._hPanel);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiListView = function FUiListView(o){
      o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick, MListenerDoubleClick);
      o._sizeCd           = EUiSize.Horizontal
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._focusItem        = null;
      o._itemPool         = null;
      o._hForm            = null;
      o.onBuildPanel      = FUiListView_onBuildPanel;
      o.onBuild           = FUiListView_onBuild;
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiListView_onClick);
      o.construct         = FUiListView_construct;
      o.focusItem         = FUiListView_focusItem;
      o.createItem        = FUiListView_createItem;
      o.appendChild       = FUiListView_appendChild;
      o.selectItem        = FUiListView_selectItem;
      o.doClickItem       = FUiListView_doClickItem;
      o.doDoubleClickItem = FUiListView_doDoubleClickItem;
      o.clear             = FUiListView_clear;
      o.dispose           = FUiListView_dispose;
      return o;
   }
   MO.FUiListView_onBuildPanel = function FUiListView_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FUiListView_onBuild = function FUiListView_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      o.attachEvent('onClick', hPanel);
   }
   MO.FUiListView_onClick = function FUiListView_onClick(s, e){
      var o = this;
      if(s.hSender == o._hNodePanel){
         var node = o._focusNode;
         if(node){
            node.select(false);
            o._focusNode = null;
         }
      }
   }
   MO.FUiListView_construct = function FUiListView_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._itemPool = RClass.create(FObjectPool);
   }
   MO.FUiListView_focusItem = function FUiListView_focusItem(){
      return this._focusItem;
   }
   MO.FUiListView_createItem = function FUiListView_createItem(clazz, pi, pl){
      var o = this;
      var item = o._itemPool.alloc();
      if(!item){
         if(clazz){
            item = RClass.create(clazz);
         }else{
            item = RClass.create(FUiListViewItem);
         }
         item.build(o._hPanel);
      }
      return item;
   }
   MO.FUiListView_appendChild = function FUiListView_appendChild(p){
      var o = this;
      o._hPanel.appendChild(p._hPanel);
   }
   MO.FUiListView_selectItem = function FUiListView_selectItem(item){
      var o = this;
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.valueAt(i);
            if(RClass.isClass(component, FUiListViewItem)){
               component.setChecked(component == item);
            }
         }
      }
      o._focusItem = item;
   }
   MO.FUiListView_doClickItem = function FUiListView_doClickItem(item){
      var o = this;
      o.selectItem(item);
      var event = new SClickEvent(o);
      event.item = item;
      o.processClickListener(event);
      event.dispose();
   }
   MO.FUiListView_doDoubleClickItem = function FUiListView_doDoubleClickItem(item){
      var o = this;
      o.selectItem(item);
      var event = new SClickEvent(o);
      event.item = item;
      o.processDoubleClickListener(event);
      event.dispose();
   }
   MO.FUiListView_clear = function FUiListView_clear(){
      var o = this;
      var cs = o._components;
      if(cs){
         var c = cs.count();
         for(var i = 0; i < c; i++){
            var m = cs.value(i);
            if(RClass.isClass(m, FUiListViewItem)){
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
   MO.FUiListView_dispose = function FUiListView_dispose(){
      var o = this;
      o.__base.FContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiListViewItem = function FUiListViewItem(o){
      o = RClass.inherits(this, o, FUiControl);
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
      o._styleContent   = RClass.register(o, new AStyle('_styleContent'));
      o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
      o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
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
      o.onBuildPanel    = FUiListViewItem_onBuildPanel;
      o.onBuild         = FUiListViewItem_onBuild;
      o.onEnter         = FUiListViewItem_onEnter;
      o.onLeave         = FUiListViewItem_onLeave;
      o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListViewItem_onClick);
      o.onDoubleClick   = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiListViewItem_onDoubleClick);
      o.label           = FUiListViewItem_label;
      o.setLabel        = FUiListViewItem_setLabel;
      o.setChecked      = FUiListViewItem_setChecked;
      o.dispose         = FUiListViewItem_dispose;
      return o;
   }
   MO.FUiListViewItem_onBuildPanel = function FUiListViewItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FUiListViewItem_onBuild = function FUiListViewItem_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      var hPanel = o._hPanel;
      var hBorder = o._hBorder = RBuilder.appendDiv(hPanel, o.styleName('Normal'));
      var hTable = o._hForm = RBuilder.appendTable(hBorder, o.styleName('Form'));
      var hLine1 = o._hLine1 = RBuilder.appendTableRowCell(hTable)
      var hLine2 = o._hLine2 = RBuilder.appendTableRowCell(hTable)
      hLine2.height = o._contentHeight;
      var hContentForm = o._hContentForm = RBuilder.appendTable(hLine2, o.styleName('Content'));
      var hContentLine = o._hContentLine = RBuilder.appendTableRow(hContentForm);
      o._hIconPanel = RBuilder.appendTableCell(hContentLine, o.styleName('IconPanel'))
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), RString.nvl(o._icon, 'tools.select'));
      RHtml.displaySet(o._hIcon, false);
      o._hLabel = RBuilder.appendTableCell(hContentLine, o.styleName('Label'));
      if(o._label){
         o.setLabel(o._label);
      }
      o.attachEvent('onClick', hPanel);
      o.attachEvent('onDoubleClick', hPanel);
   }
   MO.FUiListViewItem_onEnter = function FUiListViewItem_onEnter(){
      var o = this;
      o.__base.FUiControl.onEnter.call(o);
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }
   MO.FUiListViewItem_onLeave = function FUiListViewItem_onLeave(){
      var o = this;
      o._hBorder.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FUiControl.onLeave.call(o);
   }
   MO.FUiListViewItem_onClick = function FUiListViewItem_onClick(event){
      var o = this;
      if(o._checked){
         o._parent.doDoubleClickItem(o);
      }else{
         o._parent.doClickItem(o);
      }
   }
   MO.FUiListViewItem_onDoubleClick = function FUiListViewItem_onDoubleClick(event){
      var o = this;
      o._parent.doDoubleClickItem(o);
   }
   MO.FUiListViewItem_label = function FUiListViewItem_label(p){
      return this._label;
   }
   MO.FUiListViewItem_setLabel = function FUiListViewItem_setLabel(p){
      var o = this;
      o._label = p;
      o._hLabel.innerHTML = RString.nvl(p);
   }
   MO.FUiListViewItem_setChecked = function FUiListViewItem_setChecked(checked){
      var o = this;
      o._checked = checked;
      if(o._hIcon){
         o._hIcon.style.display = checked ? 'block' : 'none';
      }else{
         o._hIconPanel.innerHTML = checked ? 'O' : '';
      }
      o._hBorder.className = checked ? o.styleName('Select') : o.styleName('Normal');
   }
   MO.FUiListViewItem_dispose = function FUiListViewItem_dispose(){
      var o = this;
      o._hPanel = RHtml.free(o._hPanel);
      o._hBorder = RHtml.free(o._hBorder);
      o._hForm = RHtml.free(o._hForm);
      o._hLine1 = RHtml.free(o._hLine1);
      o._hLine2 = RHtml.free(o._hLine2);
      o._hContentForm = RHtml.free(o._hContentForm);
      o._hContentLine = RHtml.free(o._hContentLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hLabel = RHtml.free(o._hLabel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiMemo = function FUiMemo(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FUiMemo_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiMemo_onInputEdit);
      o.construct        = FUiMemo_construct;
      o.formatDisplay    = FUiMemo_formatDisplay;
      o.formatValue      = FUiMemo_formatValue;
      o.get              = FUiMemo_get;
      o.set              = FUiMemo_set;
      o.refreshValue     = FUiMemo_refreshValue;
      return o;
   }
   MO.FUiMemo_onBuildEditValue = function FUiMemo_onBuildEditValue(p){
      var o = this;
      var hp = o._hValuePanel;
      hp.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hl = o._hValueLine = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hl);
      o.onBuildEditChange(p);
      var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl);
      var hInput = o._hInput = RBuilder.append(hInputPanel, 'TEXTAREA', o.styleName('Input'));
      hInput.wrap = 'off';
      o.attachEvent('onInputEdit', hInput, o.onInputEdit);
      RHtml.setSize(hInputPanel, o._inputSize);
      if(o._editLength){
         hInput.maxLength = o._editLength;
      }
   }
   MO.FUiMemo_onInputEdit = function FUiMemo_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FUiMemo_construct = function FUiMemo_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiMemo_formatDisplay = function FUiMemo_formatDisplay(value){
      var o = this;
      var text = RString.nvl(value);
      o._dataDisplay = text;
      return text;
   }
   MO.FUiMemo_formatValue = function FUiMemo_formatValue(value){
      return value;
   }
   MO.FUiMemo_get = function FUiMemo_get(){
      var o = this;
      o.__base.FUiEditControl.get.call(o);
      var value = o._hInput.value;
      return value;
   }
   MO.FUiMemo_set = function FUiMemo_set(value){
      var o = this;
      o.__base.FUiEditControl.set.call(o, value);
      o._hInput.value = RString.nvl(value);
   }
   MO.FUiMemo_refreshValue = function FUiMemo_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FUiNumber = function FUiNumber(o){
      o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged, MPropertyNumber);
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
      o.formatDisplay     = FUiNumber_formatDisplay;
      o.formatValue       = FUiNumber_formatValue;
      o.get               = FUiNumber_get;
      o.set               = FUiNumber_set;
      return o;
   }
   MO.FUiNumber_onBuildEditValue = function FUiNumber_onBuildEditValue(p){
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
   MO.FUiNumber_onInputKeyPress = function FUiNumber_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!RKeyboard.isFloatKey(c)){
         p.cancel();
      }
   }
   MO.FUiNumber_onInputChanged = function FUiNumber_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiNumber_construct = function FUiNumber_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._editSize.set(100, 20);
      o._inputSize = new SSize2(80, 0);
   }
   MO.FUiNumber_formatDisplay = function FUiNumber_formatDisplay(p){
      var o = this;
      var r = o._dataDisplay = RFloat.format(p, 0, null, o._valuePrecision, null);
      return r;
   }
   MO.FUiNumber_formatValue = function FUiNumber_formatValue(p){
      return p;
   }
   MO.FUiNumber_get = function FUiNumber_get(p){
      var o = this;
      var r = o.__base.FUiEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = o.formatValue(h.value);
      }
      return r;
   }
   MO.FUiNumber_set = function FUiNumber_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      var v = RString.nvl(p, '0');
      o._innerOriginValue = v;
      o._innerDataValue = v;
      var h = o._hInput;
      if(h){
         h.value = o.formatDisplay(p);
      }
      o.changeSet(false);
   }
   MO.FUiNumber_onDataKeyDown = function FUiNumber_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiNumber_setText = function FUiNumber_setText(t){
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
   MO.FUiNumber_validText = function FUiNumber_validText(t){
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
   MO.FUiNumber_findEditor = function FUiNumber_findEditor(){
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
   MO.FUiNumber_drop = function FUiNumber_drop(){
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
}
with(MO){
   MO.FUiNumber2 = function FUiNumber2(o){
      o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._innerOriginValue = null;
      o._innerDataValue   = null;
      o._hInput          = null;
      o.onBuildEditInput  = FUiNumber3_onBuildEditInput;
      o.onBuildEditValue = FUiNumber2_onBuildEditValue;
      o.onInputKeyPress   = RClass.register(o, new AEventKeyPress('onInputKeyPress'), FUiNumber2_onInputKeyPress);
      o.onInputChanged    = RClass.register(o, new AEventInputChanged('onInputChanged'), FUiNumber2_onInputChanged);
      o.construct        = FUiNumber2_construct;
      o.get              = FUiNumber2_get;
      o.set              = FUiNumber2_set;
      return o;
   }
   MO.FUiNumber2_oeDataLoad = function FUiNumber2_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FUiNumber2_oeDataSave = function FUiNumber2_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FUiNumber3_onBuildEditInput = function FUiNumber3_onBuildEditInput(p, h){
      var o = this;
      o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
      o.attachEvent('onInputChanged', h, o.onInputChanged);
   }
   MO.FUiNumber2_onBuildEditValue = function FUiNumber2_onBuildEditValue(event){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('InputPanel');
      var hf = o._hInputForm = RBuilder.appendTable(h);
      var hr = RBuilder.appendTableRow(hf);
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput1 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)
      var hCell = RBuilder.appendTableCell(hr);
      hCell.style.borderLeft = '1px solid #999999';
      var hInput = o._hInput2 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(event, hInput)
   }
   MO.FUiNumber2_onInputKeyPress = function FUiNumber2_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!EKeyCode.floatCodes[c]){
         p.cancel();
      }
   }
   MO.FUiNumber2_onInputChanged = function FUiNumber2_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiNumber2_construct = function FUiNumber2_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SPoint2();
      o._innerDataValue = new SPoint2();
   }
   MO.FUiNumber2_get = function FUiNumber2_get(value){
      var o = this;
      o.__base.FUiEditControl.get.call(o, value);
      var dataValue = o._innerDataValue;
      var hInput = o._hInput1;
      if(hInput){
         dataValue.x = RFloat.parse(hInput.value);
      }
      var hInput = o._hInput2;
      if(hInput){
         dataValue.y = RFloat.parse(hInput.value);
      }
      return dataValue;
   }
   MO.FUiNumber2_set = function FUiNumber2_set(value){
      var o = this;
      o.__base.FUiEditControl.set.call(o, value);
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
            throw new TError('Invalid value format.');
         }
      }else if(arguments.length == 2){
         originValue.set(arguments[0], arguments[1]);
         vd.assign(originValue);
      }else{
         throw new TError('Invalid value format.');
      }
      var hInput = o._hInput1;
      if(hInput){
         hInput.value = RFloat.format(vd.x, 0, null, 2, null);
      }
      var hInput = o._hInput2;
      if(hInput){
         hInput.value = RFloat.format(vd.y, 0, null, 2, null);
      }
      o.changeSet(false);
   }
   MO.FUiNumber2_onDataKeyDown = function FUiNumber2_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiNumber2_formatValue = function FUiNumber2_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiNumber2_setText = function FUiNumber2_setText(t){
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
   MO.FUiNumber2_validText = function FUiNumber2_validText(t){
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
   MO.FUiNumber2_findEditor = function FUiNumber2_findEditor(){
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
   MO.FUiNumber2_drop = function FUiNumber2_drop(){
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
   MO.FUiNumber2_clone = function FUiNumber2_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiNumber2_link = function FUiNumber2_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiNumber3 = function FUiNumber3(o){
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
   MO.FUiNumber3_onBuildEditInput = function FUiNumber3_onBuildEditInput(p, h){
      var o = this;
      o.attachEvent('onInputKeyPress', h, o.onInputKeyPress);
      o.attachEvent('onInputChanged', h, o.onInputChanged);
   }
   MO.FUiNumber3_onBuildEditValue = function FUiNumber3_onBuildEditValue(p){
      var o = this;
      var h = o._hValuePanel;
      h.className = o.styleName('ValuePanel');
      var hf = o._hValueForm = RBuilder.appendTable(h);
      var hr = RBuilder.appendTableRow(hf);
      o._hChangePanel = RBuilder.appendTableCell(hr);
      o.onBuildEditChange(p);
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput1 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(p, hInput)
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderLeft = '1px solid #999999';
      hCell.style.borderRight = '1px solid #666666';
      var hInput = o._hInput2 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(p, hInput)
      var hCell = RBuilder.appendTableCell(hr, o.styleName('InputPanel'));
      hCell.style.borderLeft = '1px solid #999999';
      var hInput = o._hInput3 = RBuilder.appendEdit(hCell, o.styleName('Input'));
      o.onBuildEditInput(p, hInput)
   }
   MO.FUiNumber3_onInputKeyPress = function FUiNumber3_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!EKeyCode.floatCodes[c]){
         p.cancel();
      }
   }
   MO.FUiNumber3_onInputChanged = function FUiNumber3_onInputChanged(p){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiNumber3_construct = function FUiNumber3_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
      o._innerOriginValue = new SPoint3();
      o._innerDataValue = new SPoint3();
   }
   MO.FUiNumber3_get = function FUiNumber3_get(p){
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
   MO.FUiNumber3_set = function FUiNumber3_set(p){
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
   MO.FUiNumber3_onDataKeyDown = function FUiNumber3_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiNumber3_formatValue = function FUiNumber3_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiNumber3_setText = function FUiNumber3_setText(t){
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
   MO.FUiNumber3_validText = function FUiNumber3_validText(t){
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
   MO.FUiNumber3_findEditor = function FUiNumber3_findEditor(){
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
   MO.FUiNumber3_drop = function FUiNumber3_drop(){
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
   MO.FUiNumber3_clone = function FUiNumber3_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiNumber3_link = function FUiNumber3_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiNumber4 = function FUiNumber4(o){
      o = RClass.inherits(this, o, FUiEditControl);
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
   MO.FUiNumber4_oeDataLoad = function FUiNumber4_oeDataLoad(p){
      var o = this;
      alert(p);
      return EEventStatus.Stop;
   }
   MO.FUiNumber4_oeDataSave = function FUiNumber4_oeDataSave(p){
      var o = this;
      return EEventStatus.Stop;
   }
   MO.FUiNumber4_onBuildEditValue = function FUiNumber4_onBuildEditValue(p){
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
   MO.FUiNumber4_construct = function FUiNumber4_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiNumber4_get = function FUiNumber4_get(p){
      var o = this;
      var r = o.__base.FUiEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FUiNumber4_set = function FUiNumber4_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FUiNumber4_onDataKeyDown = function FUiNumber4_onDataKeyDown(s, e){
      var o = this;
      o.__base.FUiEditControl.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiNumber4_formatValue = function FUiNumber4_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiNumber4_setText = function FUiNumber4_setText(t){
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
   MO.FUiNumber4_validText = function FUiNumber4_validText(t){
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
   MO.FUiNumber4_findEditor = function FUiNumber4_findEditor(){
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
   MO.FUiNumber4_drop = function FUiNumber4_drop(){
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
   MO.FUiNumber4_clone = function FUiNumber4_clone(){
      var o = this;
      var r = o._class.newInstance();
      GHtml_clone(r, o.hPanel);
      return r;
   }
   MO.FUiNumber4_link = function FUiNumber4_link(){
      var o = this;
   }
}
with(MO){
   MO.FUiPanel = function FUiPanel(o){
      o = RClass.inherits(this, o, FUiLayout, MUiDesign, MUiFocus);
      o._sizeCd      = EUiSize.Horizontal;
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
   MO.FUiPanel_onBuildPanel = function FUiPanel_onBuildPanel(p){
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
   MO.FUiPanel_onTitleClick = function FUiPanel_onTitleClick(p){
      var o = this;
      var s = !o._statusBody;
      o._statusBody = s;
      o._hImage.src = RResource.iconPath(s ? o._imageMinus : o._imagePlus);
      RHtml.displaySet(o._hBody, s);
   }
}
with(MO){
   MO.FUiPanelHorizontal = function FUiPanelHorizontal(o){
      o = RClass.inherits(this, o, FUiLayoutHorizontal);
      o._sizeCd = EUiSize.Horizontal;
      return o;
   }
}
with(MO){
   MO.FUiPanelVertical = function FUiPanelVertical(o){
      o = RClass.inherits(this, o, FUiLayoutVertical);
      return o;
   }
}
with(MO){
   MO.FUiPicture = function FUiPicture(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescEdit);
      o.storeType         = RClass.register(o, new TPtyStr('storeType'));
      o.storeCode         = RClass.register(o, new TPtyStr('storeCode'));
      o.storeName         = RClass.register(o, new TPtyStr('storeName'));
      o.editAdjust        = RClass.register(o, new TPtyInt('editAdjust'));
      o.editMaxWidth      = RClass.register(o, new TPtyInt('editMaxWidth'));
      o.editMaxHeight     = RClass.register(o, new TPtyInt('editMaxHeight'));
      o.__seed            = 0;
      o.attributes        = null;
      o.border            = null;
      o.borderStyle       = EUiBorder.Round;
      o.onUploadMouseDown = RClass.register(o, new HMouseDown('onUploadMouseDown'), FUiPicture_onUploadMouseDown);
      o.onFileUploaded    = FUiPicture_onFileUploaded;
      o.onBuildEdit       = FUiPicture_onBuildEdit;
      o.construct         = FUiPicture_construct;
      o.makeIconPath      = FUiPicture_makeIconPath;
      o.setText           = FUiPicture_setText;
      o.setEditable       = FUiPicture_setEditable;
      o.dispose           = FUiPicture_dispose;
      return o;
   }
   MO.FUiPicture_onUploadMouseDown = function FUiPicture_onUploadMouseDown(e){
      var o = this;
      if(o._editable && !o._disbaled){
         var uw = RConsole.find(FUploadConsole).findWindow();
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
   MO.FUiPicture_onFileUploaded = function FUiPicture_onFileUploaded(s, g){
      var o = this;
      var as = g.attributes;
      o.guid = as.get('GUID');
      o.mime = as.get('MIME');
      o.networkCode = as.get('NETWORK_CODE')
      o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
      o.hImage.style.display = 'block';
   }
   MO.FUiPicture_onBuildEdit = function FUiPicture_onBuildEdit(b){
      var o = this;
      var hif = o.hImageForm = o.hEdit = RBuilder.appendTable(b.hPanel);
      hif.width = '100%';
      hif.border = 1;
      hif.height = '100%';
      var hc = o.hImagePanel = hif.insertRow().insertCell();
      hc.align = 'center';
      hc.style.cursor = 'hand';
      o.attachEvent('onUploadMouseDown', o.hImagePanel);
      var h = o.hImage = RBuilder.append(hc, 'IMAGE');
      h.style.border = '1 solid #CCCCCC';
      h.style.display = 'none';
      if(o.left>0 && o.top>0){
         o.hPanel.style.position = 'absolute';
      }
   }
   MO.FUiPicture_construct = function FUiPicture_construct(){
      var o = this;
      o.base.FEditControl.construct.call(o);
      o.attributes = new TAttributes();
   }
   MO.FUiPicture_makeIconPath = function FUiPicture_makeIconPath(g, m, sc){
      var o = this;
      var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
      return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
   }
   MO.FUiPicture_setText = function FUiPicture_setText(t){
      var o = this;
      var as = o.attributes;
      as.clear();
      var v = false;
      if(!RString.isEmpty(t)){
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
   MO.FUiPicture_setEditable = function FUiPicture_setEditable(v){
      var o = this;
      o.base.FEditControl.setEditable.call(o, v);
      if(v){
         o.hImagePanel.style.cursor = 'hand';
      }else{
         o.hImagePanel.style.cursor = 'normal';
      }
   }
   MO.FUiPicture_dispose = function FUiPicture_dispose(){
      var o = this;
      o.base.FEditControl.dispose.call(o);
      o.hImage = null;
   }
}
with(MO){
   MO.FUiProgressBar = function FUiProgressBar(o){
      o = RClass.inherits(this, o, FUiControl);
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      o._rate        = 0;
      o._hForm       = null;
      o.onBuildPanel = FUiProgressBar_onBuildPanel;
      o.onBuild      = FUiProgressBar_onBuild;
      o.get          = FUiProgressBar_get;
      o.set          = FUiProgressBar_set;
      o.dispose      = FUiProgressBar_dispose;
      return o;
   }
   MO.FUiProgressBar_onBuildPanel = function FUiProgressBar_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }
   MO.FUiProgressBar_onBuild = function FUiProgressBar_onBuild(event){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, event);
      var hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
      o.hProgress = RBuilder.appendTableCell(hLine);
      o.hEmpty = RBuilder.appendTableCell(hLine);
   }
   MO.FUiProgressBar_get = function FUiProgressBar_get(){
      return this._rate;
   }
   MO.FUiProgressBar_set = function FUiProgressBar_set(value){
      var o = this;
      o._rate = value;
   }
   MO.FUiProgressBar_dispose = function FUiProgressBar_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiRadio = function FUiRadio(o){
      o = RClass.inherits(this, o, FEditControl);
      o._groupName       = RClass.register(o, new APtyString('_groupName'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
      o._hInput          = null;
      o.onBuildEditValue = FUiRadio_onBuildEditValue;
      return o;
   }
   MO.FUiRadio_onBuildEditValue = function FUiRadio_onBuildEditValue(p){
      var o = this;
      o._hInput = RBuilder.appendRadio(o._hValuePanel, o.styleName('Input'));
   }
   MO.FUiRadio_clearValue = function FUiRadio_clearValue(){
      this.hEdit.checked = false;
   }
   MO.FUiRadio_resetValue = function FUiRadio_resetValue(){
      this.hEdit.checked = this._editChecked;
   }
   MO.FUiRadio_saveValue = function FUiRadio_saveValue(vs){
      var o = this;
      if(o.hEdit.checked){
         vs.set(o.dataName, o.dataDefault);
      }
   }
   MO.FUiRadio_text = function FUiRadio_text(){
      return this.hEdit.checked ? this.dataDefault : '';
   }
   MO.FUiRadio_setText = function FUiRadio_setText(t){
      this.hEdit.checked = (this.dataDefault == t);
   }
   MO.FUiRadio_refreshStyle = function FUiRadio_refreshStyle(){
      var o = this;
      var h = o.panel(EPanel.Edit);
      h.disabled = !o._editable;
      h.style.cursor = o._editable? 'hand':'normal';
   }
}
with(MO){
   MO.FUiSelect = function FUiSelect(o){
      o = RClass.inherits(this, o, FUiEditControl, MUiContainer, MPropertySelect, MListenerDataChanged);
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
   MO.FUiSelect_onBuildEditValue = function FUiSelect_onBuildEditValue(p){
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
   MO.FUiSelect_onDropClick = function FUiSelect_onDropClick(p){
      this.drop();
   }
   MO.FUiSelect_onKeyDown = function FUiSelect_onKeyDown(p){
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
   MO.FUiSelect_construct = function FUiSelect_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
   }
   MO.FUiSelect_findItemByLabel = function FUiSelect_findItemByLabel(p){
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
   MO.FUiSelect_findItemByData = function FUiSelect_findItemByData(p){
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
   MO.FUiSelect_formatValue = function FUiSelect_formatValue(p){
      var o = this;
      var c = o.findItemByLabel(p);
      if(c){
         return RString.nvl(c._dataValue);
      }
      return p;
   }
   MO.FUiSelect_formatDisplay = function FUiSelect_formatDisplay(p){
      var o = this;
      var c = o.findItemByData(p);
      if(c){
         return RString.nvl(c._label);
      }
      return p;
   }
   MO.FUiSelect_get = function FUiSelect_get(){
      var o = this;
      var s = o._hInput.value;
      var v = o.formatValue(s);
      return v;
   }
   MO.FUiSelect_set = function FUiSelect_set(p){
      var o = this;
      var t = o.formatDisplay(p);
      o._hInput.value = RString.nvl(t);
   }
   MO.FUiSelect_selectItem = function FUiSelect_selectItem(p){
      var o = this;
      o._hInput.value = RString.nvl(p.label());
      o.refreshValue();
   }
   MO.FUiSelect_refreshValue = function FUiSelect_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiSelect_drop = function FUiSelect_drop(){
      var o = this;
      if(o.hasComponent()){
         var e = o._editor = RConsole.find(FUiEditorConsole).focus(o, FUiSelectEditor, o._name);
         e.buildItems(o);
         e.set(o.get());
         e.show();
      }
   }
   MO.FUiSelect_dispose = function FUiSelect_dispose(){
      var o = this;
      o.__base.FUiEditControl.dispose.call(o);
   }
   MO.FUiSelect_onEditEnd = function FUiSelect_onEditEnd(e){
      var o = this;
      if(e){
         o.set(e.get());
         o._invalidText = o.validText(o.text());
         o.refreshStyle();
      }
      o.onDataEditEnd(o);
   }
   MO.FUiSelect_loadConfig = function FUiSelect_loadConfig(c){
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
   MO.FUiSelect_refreshStyle = function FUiSelect_refreshStyle(){
      var o = this;
      o.__base.FUiEditControl.refreshStyle.call(o);
      if(!o.editCheck){
         o.hEdit.readOnly = 'true';
      }
   }
   MO.FUiSelect_doBlur = function FUiSelect_doBlur(){
      var o = this;
      o.__base.FUiEditControl.doBlur.call(o);
      if(o._editor){
         o._editor.hide();
      }
   }
}
with(MO){
   MO.FUiSelectEditor = function FUiSelectEditor(o){
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
   MO.FUiSelectEditor_onBuildDrop = function FUiSelectEditor_onBuildDrop(){
      var o = this;
      var hl = o._hDropLayout = RBuilder.appendDiv(o._hDropPanel)
      var hf = o._hItemsForm = RBuilder.appendTable(hl);
      o._hItemsBody = RBuilder.append(hf, 'TBODY');
   }
   MO.FUiSelectEditor_onItemClick = function FUiSelectEditor_onItemClick(p){
      var o = this;
      var s = o._source;
      o._position = o._items.indexOfValue(p);
      o.editEnd();
   }
   MO.FUiSelectEditor_onEditKeyDown = function FUiSelectEditor_onEditKeyDown(p){
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
   MO.FUiSelectEditor_onEditEnd = function FUiSelectEditor_onEditEnd(){
      var o = this;
      var s = o._source;
      var c = o._items.value(o._position);
      s.selectItem(c);
      o.__base.FUiDropEditor.onEditEnd.call(o);
   }
   MO.FUiSelectEditor_construct = function FUiSelectEditor_construct(){
      var o = this;
      o.__base.FUiDropEditor.construct.call(o);
   }
   MO.FUiSelectEditor_testBlur = function FUiSelectEditor_testBlur(c){
      var o = this;
      if(o._source == c){
         return false;
      }
      return !this._items.contains(c);
   }
   MO.FUiSelectEditor_clearItems = function FUiSelectEditor_clearItems(){
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
   MO.FUiSelectEditor_buildItems = function FUiSelectEditor_buildItems(p){
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
   MO.FUiSelectEditor_get = function FUiSelectEditor_get(){
      var o = this;
      return o._items.get(o._position).value;
   }
   MO.FUiSelectEditor_set = function FUiSelectEditor_set(v){
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
   MO.FUiSelectEditor_select = function FUiSelectEditor_select(p){
      var o = this;
      var s = o._items;
      var c = s.count();
      var n = RInteger.toRange(p, 0, c - 1);
      for(var i = 0; i < c; i++){
         s.value(i).setChecked(i == n);
      }
      o._position = n;
   }
   MO.FUiSelectEditor_fetch = function FUiSelectEditor_fetch(){
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
   MO.FUiSelectEditor_setVisible = function FUiSelectEditor_setVisible(p){
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
   MO.FUiSelectEditor_dispose = function FUiSelectEditor_dispose(){
      var o = this;
      o._hDropLayout = RHtml.free(o._hDropLayout);
      o._hItemsForm = RHtml.free(o._hItemsForm);
      o.__base.FUiDropEditor.dispose.call(o);
   }
}
with(MO){
   MO.FUiSelectItem = function FUiSelectItem(o){
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
      o._checked          = false;
      o._hIconPanel       = null;
      o._hIcon            = null;
      o._hLabelPanel      = null;
      o._hNotePanel       = null;
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
   MO.FUiSelectItem_onBuildPanel = function FUiSelectItem_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName("Normal"));
   }
   MO.FUiSelectItem_onBuild = function FUiSelectItem_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      var h = o._hPanel;
      o.attachEvent('onMouseDown', h);
      var hp = o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
      hp.width = 18;
      hp.align = 'center';
      var hp = o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
      if(o._label){
         hp.innerHTML = o._label;
      }else{
         hp.innerHTML = '&nbsp;';
      }
      o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
   }
   MO.FUiSelectItem_onEnter = function FUiSelectItem_onEnter(){
      var o = this;
      o.__base.FUiControl.onEnter.call(o);
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
   }
   MO.FUiSelectItem_onLeave = function FUiSelectItem_onLeave(){
      var o = this;
      o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
      o.__base.FUiControl.onLeave.call(o);
   }
   MO.FUiSelectItem_onMouseDown = function FUiSelectItem_onMouseDown(){
      var o = this;
      o.processClickListener(o);
   }
   MO.FUiSelectItem_setChecked = function FUiSelectItem_setChecked(p){
      var o = this;
      o._checked = p;
      if(o._hIcon){
         o._hIcon.style.display = p ? 'block' : 'none';
      }else{
         o._hIconPanel.innerHTML = p ? 'O' : '';
      }
      o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
   }
   MO.FUiSelectItem_set = function FUiSelectItem_set(icon, label, value, note){
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
   MO.FUiSelectItem_dispose = function FUiSelectItem_dispose(){
      var o = this;
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hNotePanel = RHtml.free(o._hNotePanel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiSlideNumber = function FUiSlideNumber(o){
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
   MO.FUiSlideNumber_onBuildEditValue = function FUiSlideNumber_onBuildEditValue(p){
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
   MO.FUiSlideNumber_onMouseCaptureStart = function FUiSlideNumber_onMouseCaptureStart(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseDown(p);
      }
   }
   MO.FUiSlideNumber_onMouseCapture = function FUiSlideNumber_onMouseCapture(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseMove(p);
      }
   }
   MO.FUiSlideNumber_onMouseCaptureStop = function FUiSlideNumber_onMouseCaptureStop(p){
      var o = this;
      var c = RHtml.searchObject(p.hSource, '__pcapture');
      if(c){
         c.onMouseUp(p);
      }
   }
   MO.FUiSlideNumber_onSlideChange = function FUiSlideNumber_onSlideChange(p){
      var o = this;
      o.setInputValue(p);
      o.refreshValue();
   }
   MO.FUiSlideNumber_onInputKeyPress = function FUiSlideNumber_onInputKeyPress(p){
      var o = this;
      var c = p.keyCode;
      if(!RKeyboard.isFloatKey(c)){
         p.cancel();
      }
   }
   MO.FUiSlideNumber_onInputEdit = function FUiSlideNumber_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o._slide.set(v);
      o.refreshValue();
   }
   MO.FUiSlideNumber_onInputChange = function FUiSlideNumber_onInputChange(p){
      var o = this;
      var v = o._hInput.value;
      o._slide.set(v);
      o.setInputValue(v);
      o.refreshValue();
   }
   MO.FUiSlideNumber_construct = function FUiSlideNumber_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiSlideNumber_get = function FUiSlideNumber_get(p){
      var o = this;
      var v = o._hInput.value;
      var r = RFloat.parse(v);
      return RFloat.toRange(r, o._valueMin, o._valueMax);
   }
   MO.FUiSlideNumber_set = function FUiSlideNumber_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      var v = RString.nvl(p, '0');
      o._innerOriginValue = v;
      o._innerDataValue = v;
      o._slide.set(v);
      o.setInputValue(v);
      o.changeSet(false);
   }
   MO.FUiSlideNumber_setInputValue = function FUiSlideNumber_setInputValue(p){
      var o = this;
      var v = RFloat.parse(p);
      if(isNaN(v)){
         return;
      }
      v = RFloat.toRange(v, o._valueMin, o._valueMax);
      o._dataDisplay = RFloat.format(v, 0, null, 2, null);
      o._hInput.value = o._dataDisplay;
   }
   MO.FUiSlideNumber_refreshValue = function FUiSlideNumber_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FUiSplit = function FUiSplit(o){
      o = RClass.inherits(this, o, FUiControl);
      return o;
   }
   MO.FUiSplit_onSplitMouseEnter = function FUiSplit_onSplitMouseEnter(e){
      var o = this;
      if(o.hImage){
         o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_hvr' : 'ctl.expand_hvr');
      }
   }
   MO.FUiSplit_onSplitMouseLeave = function FUiSplit_onSplitMouseLeave(e){
      var o = this;
      if(o.hImage){
         o.hImage.src = RRes._iconPath(o.extended ? 'ctl.collapse_nor' : 'ctl.expand_nor');
      }
   }
   MO.FUiSplit_onMouseDown = function FUiSplit_onMouseDown(){
      var o = this;
      if(ESplitStyle.Normal == o._dispStyle){
         o.extend(!o.extended);
      }
   }
   MO.FUiSplit_onBuildPanel = function FUiSplit_onBuildPanel(){
      var o = this;
      o.hPanel = RBuilder.create(null, 'DIV');
      o.hForm = RBuilder.appendTable(o.hPanel);
      o.hForm.width = '100%';
   }
   MO.FUiSplit_oeBuild = function FUiSplit_oeBuild(e){
      var o = this;
      o.base.FUiControl.oeBuild.call(o, e);
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
   MO.FUiSplit_oeMode = function FUiSplit_oeMode(e){
      var o = this;
      var r = o.base.FUiControl.oeMode.call(o, e);
      o.base.MDisplay.oeMode.call(o, e);
      o.extend(o._editExtend);
      return r;
   }
   MO.FUiSplit_construct = function FUiSplit_construct(){
      var o = this;
      o.__lines = new TList();
   }
   MO.FUiSplit_extend = function FUiSplit_extend(v){
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
   MO.FUiSplit_pushLine = function FUiSplit_pushLine(hr){
      this.__lines.push(hr);
   }
   MO.FUiSplit_dispose = function FUiSplit_dispose(){
      var o = this;
      o.base.FUiControl.dispose.call(o);
      if(o.__lines){
         o.__lines.release();
         o.__lines = null;
      }
      o.hForm = null;
      o.hText = null;
      o.hIcon = null;
      o.hImage = null;
   }
}
with(MO){
   MO.FUiTemplate = function FUiTemplate(o){
      o = RClass.inherits(this, o, FUiEditControl, MPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FUiTemplate_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiTemplate_onInputEdit);
      o.construct        = FUiTemplate_construct;
      o.formatDisplay    = FUiTemplate_formatDisplay;
      o.formatValue      = FUiTemplate_formatValue;
      o.get              = FUiTemplate_get;
      o.set              = FUiTemplate_set;
      o.refreshValue     = FUiTemplate_refreshValue;
      return o;
   }
   MO.FUiTemplate_onBuildEditValue = function FUiTemplate_onBuildEditValue(p){
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
   MO.FUiTemplate_onInputEdit = function FUiTemplate_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FUiTemplate_construct = function FUiTemplate_construct(){
      var o = this;
      o.__base.FUiEditControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiTemplate_formatDisplay = function FUiTemplate_formatDisplay(p){
      var o = this;
      var r = RString.nvl(p);
      o._dataDisplay = r;
      return r;
   }
   MO.FUiTemplate_formatValue = function FUiTemplate_formatValue(p){
      return p;
   }
   MO.FUiTemplate_get = function FUiTemplate_get(){
      var o = this;
      var r = o.__base.FUiEditControl.get.call(o);
      var r = o._hInput.value;
      return r;
   }
   MO.FUiTemplate_set = function FUiTemplate_set(p){
      var o = this;
      o.__base.FUiEditControl.set.call(o, p);
      o._hInput.value = RString.nvl(p);
   }
   MO.FUiTemplate_refreshValue = function FUiTemplate_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
with(MO){
   MO.FUiText = function FUiText(o){
      o = RClass.inherits(this, o, FUiTextControl, MPropertyEdit, MListenerDataChanged);
      o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
      o._unit            = RClass.register(o, new APtyString('_unit'));
      o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
      o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
      o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
      o._hValueForm      = null;
      o._hValueLine      = null;
      o._hInputPanel     = null;
      o._hInput          = null;
      o.onBuildEditValue = FUiText_onBuildEditValue;
      o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiText_onInputEdit);
      o.construct        = FUiText_construct;
      o.formatDisplay    = FUiText_formatDisplay;
      o.formatValue      = FUiText_formatValue;
      o.get              = FUiText_get;
      o.set              = FUiText_set;
      o.refreshValue     = FUiText_refreshValue;
      return o;
   }
   MO.FUiText_onBuildEditValue = function FUiText_onBuildEditValue(p){
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
   MO.FUiText_onInputEdit = function FUiText_onInputEdit(p){
      var o = this;
      var v = o._hInput.value;
      o.refreshValue();
   }
   MO.FUiText_construct = function FUiText_construct(){
      var o = this;
      o.__base.FUiTextControl.construct.call(o);
      o._inputSize = new SSize2(120, 0);
   }
   MO.FUiText_formatDisplay = function FUiText_formatDisplay(p){
      var o = this;
      var r = RString.nvl(p);
      o._dataDisplay = r;
      return r;
   }
   MO.FUiText_formatValue = function FUiText_formatValue(p){
      return p;
   }
   MO.FUiText_get = function FUiText_get(){
      var o = this;
      var r = o.__base.FUiTextControl.get.call(o);
      var r = o._hInput.value;
      return r;
   }
   MO.FUiText_set = function FUiText_set(p){
      var o = this;
      o.__base.FUiTextControl.set.call(o, p);
      o._hInput.value = RString.nvl(p);
   }
   MO.FUiText_refreshValue = function FUiText_refreshValue(){
      var o = this;
      o.processDataChangedListener(o);
   }
}
MO.EUiGridColumn = new function EUiGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
MO.EUiGridDisplay = new function EUiGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
with(MO){
   MO.FUiCell = function FUiCell(o){
      o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
      o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
      o._table       = null;
      o._column      = null;
      o._row         = null;
      o.onBuildPanel = FUiCell_onBuildPanel;
      o.onBuild      = FUiCell_onBuild;
      o.oeDataLoad   = FUiCell_oeDataLoad;
      o.oeDataSave   = FUiCell_oeDataSave;
      return o;
   }
   MO.FUiCell_onBuildPanel = function FUiCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
   }
   MO.FUiCell_onBuild = function FUiCell_onBuild(p){
      var o = this;
      o.__base.FControl.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
   }
   MO.FUiCell_oeDataLoad = function FUiCell_oeDataLoad(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(c._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FUiCell_oeDataSave = function FUiCell_oeDataSave(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(c._dataName, v);
      return EEventStatus.Stop;
   }
   MO.FUiCell_doFocus = function FUiCell_doFocus(){
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
   MO.FUiCell_doBlur = function FUiCell_doBlur(){
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
   MO.FUiCell_descriptor = function FUiCell_descriptor(){
      return this._column;
   }
   MO.FUiCell_text = function FUiCell_text(){
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
   MO.FUiCell_setText = function FUiCell_setText(t){
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
   MO.FUiCell_focus = function FUiCell_focus(s){
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
   MO.FUiCell_setVisible = function FUiCell_setVisible(v){
      this._hPanel.style.display = v ? 'block' : 'none';
   }
   MO.FUiCell_refreshStyle = function FUiCell_refreshStyle(){
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
   MO.FUiCell_dispose = function FUiCell_dispose(){
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
   MO.FUiCell_dump = function FUiCell_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.value);
      s.append(']');
      return s;
   }
}
with(MO){
   MO.FUiCellButton = function FUiCellButton(o){
      o = RClass.inherits(this, o, FCell);
      o.buttons           = null;
      o.attributes        = null;
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiCellButton_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiCellButton_onButtonLeave);
      o.onCellLeave       = RClass.register(o, new AEventMouseLeave('onCellLeave'), FUiCellButton_onCellLeave);
      o.onHintEnter       = RClass.register(o, new AEventMouseEnter('onHintEnter'), FUiCellButton_onHintEnter);
      o.onHintLeave       = RClass.register(o, new AEventMouseLeave('onHintLeave'), FUiCellButton_onHintLeave);
      o.onButtonClick     = RClass.register(o, new AEventClick('onButtonClick'), FUiCellButton_onButtonClick);
      o.construct         = FUiCellButton_construct;
      o.isDataChanged     = RMethod.emptyFalse;
      o.findButtonByPanel = FUiCellButton_findButtonByPanel;
      o.buildForm         = FUiCellButton_buildForm;
      o.set               = FUiCellButton_set;
      o.modifyButton      = FUiCellButton_modifyButton;
      o.refreshStyle      = FUiCellButton_refreshStyle;
      return o;
   }
   MO.FUiCellButton_onButtonEnter = function FUiCellButton_onButtonEnter(e){
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
   MO.FUiCellButton_onButtonLeave = function FUiCellButton_onButtonLeave(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = '#0661B0';
         hs.cursor = 'normal';
      }
   }
   MO.FUiCellButton_onHintEnter = function FUiCellButton_onHintEnter(e){
      var o = this;
      e.hSource.style.backgroundColor = "#eeeeee";
   }
   MO.FUiCellButton_onCellLeave = function FUiCellButton_onCellLeave(e){
      var bs = this.buttons;
      var c = bs.count;
      for(var n = 0; n<c; n++){
         var b = bs.value(n);
         if(b.hintBox){
            b.hintBox.style.display='none';
         }
      }
   }
   MO.FUiCellButton_onHintLeave = function FUiCellButton_onHintLeave(e){
      e.hSource.style.backgroundColor = "#ffffff";
       e.hSource.style.display = "none";
   }
   MO.FUiCellButton_onButtonClick = function FUiCellButton_onButtonClick(e){
      var o = this;
      var t = o.table;
      t.clickCell(o);
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         b.button.callEvent('onClick', o, e);
      }
   }
   MO.FUiCellButton_construct = function FUiCellButton_construct(){
      var o = this;
      o.base.FCell.construct.call(o);
      o.attributes = new TAttributes();
   }
   MO.FUiCellButton_findButtonByPanel = function FUiCellButton_findButtonByPanel(h){
      var o = this;
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         if(b.hPanel == h){
            return b;
         }
      }
   }
   MO.FUiCellButton_buildForm = function FUiCellButton_buildForm(){
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
   MO.FUiCellButton_set = function FUiCellButton_set(v){
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
   MO.FUiCellButton_modifyButton = function FUiCellButton_modifyButton(b, as){
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
   MO.FUiCellButton_refreshStyle = function FUiCellButton_refreshStyle(){
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
   MO.FUiCellEdit = function FUiCellEdit(o){
      o = RClass.inherits(this, o, FUiCellEditControl);
      o._styleInput = RClass.register(o, new AStyle('_styleInput'));
      o._hInput     = null;
      o.onBuildEdit = FUiCellEdit_onBuildEdit;
      o.get         = FUiCellEdit_get;
      o.set         = FUiCellEdit_set;
      return o;
   }
   MO.FUiCellEdit_onBuildEdit = function FUiCellEdit_onBuildEdit(p){
      var o = this;
      var c = o._column;
      o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
   }
   MO.FUiCellEdit_get = function FUiCellEdit_get(){
      var r = o.__base.FUiCellEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FUiCellEdit_set = function FUiCellEdit_set(p){
      var o = this;
      o.__base.FUiCellEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FUiCellEdit_buildDrop = function FUiCellEdit_buildDrop(){
      var o = this;
      var c = o.column;
      if(!RString.isEmpty(c.lovRefer)){
         var hdp = o.hDropPanel;
         hdp.align = 'right';
         hdp.style.paddingRight = 2;
         var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FUiCellEdit_Lov', null, 16, 16);
         hli.style.borderLeft='1 solid #CCCCCC';
         hli.style.cursor = 'hand';
         c.linkEvent(o, 'onListClick', hli);
      }
   }
   MO.FUiCellEdit_setInfo = function FUiCellEdit_setInfo(f){
      var o = this;
      o.base.FUiCellEditControl.setInfo.call(o, f);
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
   MO.FUiCellEdit_text = function FUiCellEdit_text(){
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
   MO.FUiCellEdit_setText = function FUiCellEdit_setText(t){
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
   MO.FUiCellEditControl = function FUiCellEditControl(o){
      o = RClass.inherits(this, o, FCell);
      o.onBuildIcon  = FUiCellEditControl_onBuildIcon;
      o.onBuildEdit  = FUiCellEditControl_onBuildEdit;
      o.onBuildDrop  = RMethod.empty;
      o.onBuildForm  = FUiCellEditControl_onBuildForm;
      o.onBuild      = FUiCellEditControl_onBuild;
      return o;
   }
   MO.FUiCellEditControl_onBuildIcon = function FUiCellEditControl_onBuildIcon(p){
      var o = this;
      o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
   }
   MO.FUiCellEditControl_onBuildEdit = function FUiCellEditControl_onBuildEdit(p){
      var o = this;
      var c = o._column;
   }
   MO.FUiCellEditControl_onBuildForm = function FUiCellEditControl_onBuildForm(p){
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
   MO.FUiCellEditControl_onBuild = function FUiCellEditControl_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      o.onBuildForm(p);
   }
   MO.FUiCellEditControl_getEditRange = function FUiCellEditControl_getEditRange(){
      var o = this;
      var hc = o.hPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FUiCellEditControl_select = function FUiCellEditControl_select(v){
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
   MO.FUiCellEditControl_setVisible = function FUiCellEditControl_setVisible(v){
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
   MO.FUiCellEditControl_refreshStyle = function FUiCellEditControl_refreshStyle(){
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
   MO.FUiCellSelected = function FUiCellSelected(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName  = '_select';
      o._styleEdit = RClass.register(o, new AStyle('_styleEdit'));
      o._hSelected = null;
      o.onBuild    = FUiCellSelected_onBuild;
      o.onSelected = FUiCellSelected_onSelected;
      return o;
   }
   MO.FUiCellSelected_onBuild = function FUiCellSelected_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      h.align = 'center';
      var hs = o._hSelected = RBuilder.appendCheck(h, o.styleName('Edit'));
      hs.parent = o;
      hs.onclick = o.onSelected;
   }
   MO.FUiCellSelected_onSelected = function FUiCellSelected_onSelected(p){
      var o = this;
   }
   MO.FUiCellSelected_refreshStyle = function FUiCellSelected_refreshStyle(){
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
   MO.FUiCellSelected_dispose = function FUiCellSelected_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hSelected = null;
   }
}
with(MO){
   MO.FUiCellStatus = function FUiCellStatus(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName = '_status';
      o._hStatus  = null;
      o.onBuild   = FUiCellStatus_onBuild;
      return o;
   }
   MO.FUiCellStatus_onBuild = function FUiCellStatus_onBuild(p){
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
   MO.FUiCellStatus_onStatusEnter = function FUiCellStatus_onStatusEnter(){
      this.row.table.getRowBar().linkCell(this);
   }
   MO.FUiCellStatus_setIcon = function FUiCellStatus_setIcon(s){
      this._hStatus.src = s;
   }
   MO.FUiCellStatus_refreshStyle = function FUiCellStatus_refreshStyle(){
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
   MO.FUiCellStatus_dispose = function FUiCellStatus_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hStatus = null;
   }
}
with(MO){
   MO.FUiColumn = function FUiColumn(o){
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
      o.onBuildLabel       = FUiColumn_onBuildLabel;
      o.onBuildSearchIcon  = RMethod.empty;
      o.onBuildSearchEdit  = FUiColumn_onBuildSearchEdit;
      o.onBuildSearchDrop  = RMethod.empty;
      o.onBuildSearchForm  = FUiColumn_onBuildSearchForm;
      o.onBuildSearch      = FUiColumn_onBuildSearch;
      o.onBuildTotal       = FUiColumn_onBuildTotal;
      o.onBuildPanel       = FUiColumn_onBuildPanel;
      o.onBuild            = FUiColumn_onBuild;
      o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
      o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
      o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
      o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
      o.createCell         = FUiColumn_createCell;
      return o;
   }
   MO.FUiColumn_onBuildLabel = function FUiColumn_onBuildLabel(p){
      var o = this;
      var hr = o._hFormLine;
      if (o._icon) {
         var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
         o._hIcon = RBuilder.appendIcon(hip, o.icon);
      }
      var hl = o._hLabel = RBuilder.appendTableCell(hr);
      hl.innerHTML = RString.nvl(o.label());
      var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
      var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FUiColumn));
      hsu.style.display = 'none';
      var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FUiColumn));
      hsu.style.display = 'none';
   }
   MO.FUiColumn_onBuildSearchEdit = function FUiColumn_onBuildSearchEdit(p){
      var o = this;
      var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
      var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
   }
   MO.FUiColumn_onBuildSearchForm = function FUiColumn_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      hf.style.backgroundColor = '#FFFFFF';
      var hfl = o._hSearchFormLine = hf.insertRow();
      if(RClass.isClass(o, FUiColumnButton)){
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
   MO.FUiColumn_onBuildSearch = function FUiColumn_onBuildSearch(p){
      var o = this;
      var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
      h.style.backgroundColor = "#FFFFFF";
      h.style.borderBottom = '1 solid #9EC4EB';
      RHtml.linkSet(h, 'control', o);
     o.attachEvent('onSearchEnter', h);
     o.attachEvent('onSearchLeave', h);
     o.onBuildSearchForm(p);
   }
   MO.FUiColumn_onBuildTotal = function FUiColumn_onBuildTotal(p){
      var o = this;
      var h = o._hTotalPanel = RBuilder.create(p, 'TD');
      RHtml.linkSet(h, 'control', o);
      h.align = 'right';
      h.style.color = '#686860';
      h.style.backgroundColor = '#F8F8F0';
      h.style.borderBottom = '1 solid #B8B8B0';
      h.innerText = ' ';
   }
   MO.FUiColumn_onBuildPanel = function FUiColumn_onBuildPanel(p) {
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
   }
   MO.FUiColumn_onBuild = function FUiColumn_onBuild(p) {
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
   MO.FUiColumn_createCell = function FUiColumn_createCell(p) {
      var o = this;
      var c = RClass.create(o._cellClass);
      var t = c._table = o._table;
      c._name = o._name;
      c._column = o;
      c.build(t._hPanel);
      c.setVisible(o._displayList);
      return c;
   }
   MO.FUiColumn_onCellMouseEnter = function FUiColumn_onCellMouseEnter(s, e){
      this.table.hoverRow(s.row, true);
   }
   MO.FUiColumn_onCellMouseLeave = function FUiColumn_onCellMouseLeave(s, e){
      this.table.hoverRow(s.row, false);
   }
   MO.FUiColumn_onCellMouseDown = function FUiColumn_onCellMouseDown(s, e){
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
   MO.FUiColumn_onCellClick = function FUiColumn_onCellClick(s, e){
      this.table.clickRow(s.row);
   }
   MO.FUiColumn_onCellDoubleClick = function FUiColumn_onCellDoubleClick(s, e){
      var o = this;
      var r = s.row;
      if(!o.isEditAble(r)){
         o.table.doubleClickRow(r);
      }
   }
   MO.FUiColumn_onCellKeyDown = function FUiColumn_onCellKeyDown(s, e, he){
      var o = this;
      if(he){
         o.table.onCellKeyDown(s, e, he);
      }
   }
   MO.FUiColumn_oeMode = function FUiColumn_oeMode(e){
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
   MO.FUiColumn_oeRefresh = function FUiColumn_oeRefresh(e) {
      var o = this;
      if(e.isBefore()){
         o.setVisible(o._displayList);
      }
   }
   MO.FUiColumn_onDataKeyDown = function FUiColumn_onDataKeyDown(s, e) {
      var o = this;
      o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   }
   MO.FUiColumn_onDataChanged = function FUiColumn_onDataChanged(s, e) {
      var o = this;
      o.table.setDataStatus(s.row, EDataStatus.Update);
   }
   MO.FUiColumn_onEditBegin = function FUiColumn_onEditBegin(editor) {
      var o = this;
      var row = editor.row;
      o.editor = editor;
      o.table.editRow = row;
      o.table.editColumn = o;
      o.table.select(row, true);
      MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
   }
   MO.FUiColumn_onEditEnd = function FUiColumn_onEditEnd(e) {
      var o = this;
      var row = editor.row;
      var text = editor.text();
      o.setValue(row, o.formatValue(text));
      o.setText(row, text);
      o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
      o.editor = null;
      MO.Logger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
   }
   MO.FUiColumn_onEditChanged = function FUiColumn_onEditChanged(cell) {
      cell.row.refresh();
   }
   MO.FUiColumn_onHeadMouseDown = function FUiColumn_onHeadMouseDown(e) {
      var o = this;
      var tbl = o.table;
      var ct = tbl.dsViewer.count;
      var x = e.x;
      if(!RClass.isClass(o, FUiColumnButton)){
         var l = o._hPanel.offsetWidth;
         var r = l - 6;
         if (x > 0 && x < r) {
            if (ct > 0 && !RClass.isClass(e.source, FUiColumnStatus)) {
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
   MO.FUiColumn_onRowClick = function FUiColumn_onRowClick(s, e){
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FUiColumn_createMoveable = function FUiColumn_createMoveable(p) {
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
   MO.FUiColumn_searchValue = function FUiColumn_searchValue() {
      var o = this;
      if(o._hSearchEdit){
         return o._hSearchEdit.value;
      }
   }
   MO.FUiColumn_setStyleStatus = function FUiColumn_setStyleStatus(row, status) {
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
   MO.FUiColumn_cell = function FUiColumn_cell(r){
      return r.cell(this.index);
   }
   MO.FUiColumn_equalsValue = function FUiColumn_equalsValue(s, t) {
      return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
   }
   MO.FUiColumn_setWidth = function FUiColumn_setWidth(w){
      var o = this;
      o._hPanel.style.pixelWidth = w;
      o._hFixPanel.style.pixelWidth = w;
   }
   MO.FUiColumn_setVisible = function FUiColumn_setVisible(v){
      var o = this;
      o.isDisplay = v;
      var s = v ? 'block' : 'none';
      o._hPanel.style.display = s;
      o._hSearchPanel.style.display = s;
      o._hTotalPanel.style.display = s;
      o._hFixPanel.style.display = s;
   }
   MO.FUiColumn_moveCellFocus = function FUiColumn_moveCellFocus(row, p) {
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
               if(RClass.isClass(ft, FUiColumn) && ft._displayList){
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
               if(RClass.isClass(ft, FUiColumn) && ft._displayList){
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
   MO.FUiColumn_getEditRange = function FUiColumn_getEditRange(){
      var o = this;
      var hc = o._hSearchPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FUiColumn_dispose = function FUiColumn_dispose(){
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
   MO.FUiColumn_dump = function FUiColumn_dump(s) {
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
   MO.FUiColumnButton = function FUiColumnButton(o){
      o = RClass.inherits(this, o, FColumn);
      o.__cellClass = FCellButton;
      return o;
   }
}
with(MO){
   MO.FUiColumnEdit = function FUiColumnEdit(o){
      o = RClass.inherits(this, o, FUiColumnEditControl, MPropertyEdit);
      o._cellClass     = FCellEdit;
      return o;
   }
   MO.FUiColumnEdit_onCellMouseEnter = function FUiColumnEdit_onCellMouseEnter(s, e){
   }
   MO.FUiColumnEdit_onCellMouseLeave = function FUiColumnEdit_onCellMouseLeave(s, e){
   }
   MO.FUiColumnEdit_onListClick = function FUiColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }
   MO.FUiColumnEdit_onZoomHover = function FUiColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }
   MO.FUiColumnEdit_onZoomLeave = function FUiColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }
   MO.FUiColumnEdit_onZoomClick = function FUiColumnEdit_onZoomClick(s, e){
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
   MO.FUiColumnEditControl = function FUiColumnEditControl(o){
      o = RClass.inherits(this, o, FColumn);
      o.isEditAble = FUiColumnEditControl_isEditAble;
      return o;
   }
   MO.FUiColumnEditControl_isEditAble = function FUiColumnEditControl_isEditAble(r){
      var o = this;
      if(r){
         return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
      }
   }
}
with(MO){
   MO.FUiColumnEmpty = function FUiColumnEmpty(o){
      o = RClass.inherits(this, o, FColumn);
      o._dispList         = true;
      o.onBuildSearchForm = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FUiColumnSelected = function FUiColumnSelected(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_select';
      o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
      o._optionFixed      = true;
      o._cellClass        = FCellSelected;
      o.onBuildSearchForm = FUiColumnSelected_onBuildSearchForm;
      o.onBuild           = FUiColumnSelected_onBuild;
      o.createCell        = FUiColumnSelected_createCell;
      o.dispose           = FUiColumnSelected_dispose;
      return o;
   }
   MO.FUiColumnSelected_onBuildSearchForm = function FUiColumnSelected_onBuildSearchForm(p){
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
   MO.FUiColumnSelected_onBuild = function FUiColumnSelected_onBuild(e){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, e);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(o._hPanel, 12, 12);
      return r;
   }
   MO.FUiColumnSelected_createCell = function FUiColumnSelected_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p.cellSelect = c;
      }
      return c;
   }
   MO.FUiColumnSelected_dispose = function FUiColumnSelected_dispose(){
      var o = this;
      o._hSelect = null;
      o.__base.FColumnEditControl.dispose.call(o);
   }
   MO.FUiColumnSelected_setVisible = function FUiColumnSelected_setVisible(){
      var o = this;
      var v = o._table._displayColumnSelect ? 'block' : 'none';
      o._hPanel.style.display = v
      o._hSelected.style.display = v;
      o._hSearchPanel.style.display = v;
      o._hTotalPanel.style.display = v;
      o._hFixPanel.style.display = v;
   }
   MO.FUiColumnSelected_onCellClick = function FUiColumnSelected_onCellClick(s, e){
      return;
   }
   MO.FUiColumnSelected_onSelectedClick = function FUiColumnSelected_onSelectedClick(s, e){
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
   MO.FUiColumnStatus = function FUiColumnStatus(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_status';
      o._optionFixed      = true;
      o._cellClass        = FCellStatus;
      o.onBuildSearchForm = FUiColumnStatus_onBuildSearchForm;
      o.onBuild           = FUiColumnStatus_onBuild;
      o.createCell        = FUiColumnStatus_createCell;
      return o;
   }
   MO.FUiColumnStatus_onBuildSearchForm = function FUiColumnStatus_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.height = 18;
      hf.width = '100%';
      var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
      var hc = RBuilder.appendTableCell(hfl);
      hc.align = 'center';
   }
   MO.FUiColumnStatus_onBuild = function FUiColumnStatus_onBuild(p){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, p);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(h, 12, 12);
   }
   MO.FUiColumnStatus_createCell = function FUiColumnStatus_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p._statusCell = c;
      }
      return c;
   }
   MO.FUiColumnStatus_onCellClick = function FUiColumnStatus_onCellClick(s, e){
      if(this.table.callEvent('onTableRowDoubleClick', s.row)){
         return;
      }
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FUiColumnStatus_setDataStatus = function FUiColumnStatus_setDataStatus(r, s){
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
   MO.FUiColumnStatus_ohCellMdclk = function FUiColumnStatus_ohCellMdclk(){
      var tab = this.lnkCol.table;
      tab.insertRow(this.lnkRow.rowIndex());
   }
   MO.FUiColumnStatus_dispose = function FUiColumnStatus_dispose(){
      var o = this;
      o.__base.FColumnEditControl.dispose.call(o);
      o._hSelect = null;
   }
}
with(MO){
   MO.FUiGrid = function FUiGrid(o) {
      o = RClass.inherits(this, o, FUiGridControl);
      o.onResizeAfter = FUiGrid_onResizeAfter;
      o.onBuildData   = FUiGrid_onBuildData;
      o.oeResize      = FUiGrid_oeResize;
      o.oeRefresh     = FUiGrid_oeRefresh;
      o.pushColumn    = FUiGrid_pushColumn;
      return o;
   }
   MO.FUiGrid_onResizeAfter = function FUiGrid_onResizeAfter(){
      var o = this;
      var hdp = o.hDataPanel;
      var hfp = o.hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FUiGrid_onBuildData = function FUiGrid_onBuildData(){
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
   MO.FUiGrid_oeResize = function FUiGrid_oeResize(e){
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
   MO.FUiGrid_oeRefresh = function FUiGrid_oeRefresh(e){
      var o = this;
      o.base.FUiGridControl.oeRefresh.call(o, e);
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
   MO.FUiGrid_pushColumn = function FUiGrid_pushColumn(c){
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
   MO.FUiGridControl = function FUiGridControl(o) {
      o = RClass.inherits(this, o, FUiContainer);
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
      o.onBuildTitle         = FUiGridControl_onBuildTitle;
      o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
      o.onBuildHint          = FUiGridControl_onBuildHint;
      o.onBuildPanel         = FUiGridControl_onBuildPanel;
      o.onBuild              = FUiGridControl_onBuild;
      o.onDatasetLoadDelay   = FUiGridControl_onDatasetLoadDelay;
      o.onDatasetLoad        = FUiGridControl_onDatasetLoad;
      o.construct            = FUiGridControl_construct;
      o.buildNavigatorButton = FUiGridControl_buildNavigatorButton;
      o.appendColumn         = RMethod.virtual(o, 'appendColumn');
      o.appendChild          = FUiGridControl_appendChild;
      o.push                 = FUiGridControl_push;
      o.createRow            = FUiGridControl_createRow;
      o.insertRow            = FUiGridControl_insertRow;
      o.syncRow              = FUiGridControl_syncRow;
      o.hideRows             = FUiGridControl_hideRows;
      o.clickCell            = FUiGridControl_clickCell;
      o.clickRow             = FUiGridControl_clickRow;
      o.doubleClickRow       = FUiGridControl_doubleClickRow;
      return o;
   }
   MO.FUiGridControl_onBuildPanel = function FUiGridControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiGridControl_onBuildTitle = function FUiGridControl_onBuildTitle(e){
      var o = this;
      var hf = o._hTitleForm = RBuilder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
      var hr = o._hTitleLine = RBuilder.appendTableRow(hf);
      var hc = o._hCaption = RBuilder.appendTableCell(hr, o.styleName('Caption'));
      hc.innerText = o.label();
      RHtml.displaySet(hf, o._displayTitle);
   }
   MO.FUiGridControl_onBuildHint = function FUiGridControl_onBuildHint(e) {
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
      o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FUiGridControl:First'));
      o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FUiGridControl:Prior'));
      o.hNavPrior.style.paddingRight = '20';
      o.hPage = RBuilder.appendEdit(hc)
      o.hPage.style.width = 40;
      o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Next')+'&nbsp;', 'control.grid.next');
      o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Last')+'&nbsp;', 'control.grid.last');
   }
   MO.FUiGridControl_onBuild = function FUiGridControl_onBuild(p){
      var o = this;
      if(!o._size.height || o._size.height < 160){
         o.height = '100%';
      }
      o.__base.FUiContainer.onBuild.call(o, p);
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
   MO.FUiGridControl_onDatasetLoadDelay = function FUiGridControl_onDatasetLoadDelay(p){
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
   MO.FUiGridControl_onDatasetLoad = function FUiGridControl_onDatasetLoad(p){
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
   MO.FUiGridControl_construct = function FUiGridControl_construct() {
      var o = this;
      o.__base.FUiContainer.construct.call(o);
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
   MO.FUiGridControl_buildNavigatorButton = function FUiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
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
   MO.FUiGridControl_appendChild = function FUiGridControl_appendChild(p){
      var o = this;
      o.__base.FUiContainer.appendChild.call(o, p);
      if(RClass.isClass(p, FColumn)){
         o.appendColumn(p);
      }
   }
   MO.FUiGridControl_push = function FUiGridControl_push(p){
      var o = this;
      if(RClass.isClass(p, FColumn)){
         p._table = o;
         o._columns.set(p.name(), p);
      }else if(RClass.isClass(p, FTableButton)){
         p._table = o;
         o._buttons.set(p.name(), p);
      }
      o.__base.FUiContainer.push.call(o, p);
   }
   MO.FUiGridControl_createRow = function FUiGridControl_createRow() {
      var o = this;
      var r = RClass.create(o._rowClass);
      r._table = r._parent = o;
      return r;
   }
   MO.FUiGridControl_insertRow = function FUiGridControl_insertRow(i, r){
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
   MO.FUiGridControl_syncRow = function FUiGridControl_syncRow(p){
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
   MO.FUiGridControl_hideRows = function FUiGridControl_hideRows(){
      var o = this;
      var rs = o._rows;
      var c = rs.count();
      for(var i = c - 1; i >= 0 ; i--){
         rs.get(i).setVisible(false);
      }
   }
   MO.FUiGridControl_clickCell = function FUiGridControl_clickCell(p){
      this._focusCell = p;
   }
   MO.FUiGridControl_clickRow = function FUiGridControl_clickRow(p){
      var o = this;
      o.lsnsRowClick.process(p);
      o._focusRow = p;
   }
   MO.FUiGridControl_doubleClickRow = function FUiGridControl_doubleClickRow(p){
      var o = this;
      o.lsnsRowDblClick.process(p);
      o._focusRow = p;
   }
   MO.FUiGridControl_pushButton = function FUiGridControl_pushButton(b){
      var o = this;
      var hc  = o._hButtons.insertCell();
      hc.style.border = '0 solid #C6D7FF';
      hc.appendChild(b._hPanel);
      o.push(b);
   }
   MO.FUiGridControl_onMouseDown = function FUiGridControl_onMouseDown(e, he){
      var o = this;
   }
   MO.FUiGridControl_onHeadMouseDown = function FUiGridControl_onHeadMouseDown(e){
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
   MO.FUiGridControl_onHeadMouseMove = function FUiGridControl_onHeadMouseMove(e){
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
   MO.FUiGridControl_onHeadMouseUp = function FUiGridControl_onHeadMouseUp(e){
      var o = this;
      if(EGridColumn.Size == o.hoverMode){
         o._hHeadForm.releaseCapture();
      }
      o.hoverMode = EGridColumn.None;
   }
   MO.FUiGridControl_onDataScroll = function FUiGridControl_onDataScroll(){
      var o = this;
      o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
      o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
   }
   MO.FUiGridControl_onCellKeyDown = function FUiGridControl_onCellKeyDown(c, e, he){
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
   MO.FUiGridControl_onRowMouseEnter = function FUiGridControl_onRowMouseEnter(s, e){
      this.hoverRow(s, true);
   }
   MO.FUiGridControl_onRowMouseLeave = function FUiGridControl_onRowMouseLeave(s, e){
      this.hoverRow(s, false);
   }
   MO.FUiGridControl_onRowClick = function FUiGridControl_onRowClick(s, e){
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
   MO.FUiGridControl_onColumnSearchKeyDown = function FUiGridControl_onColumnSearchKeyDown(s, e){
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
   MO.FUiGridControl_onButtonMouseDown = function FUiGridControl_onButtonMouseDown(e){
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
   MO.FUiGridControl_onPageCountDown = function FUiGridControl_onPageCountDown(e){
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
   MO.FUiGridControl_onInsertButtonClick = function FUiGridControl_onInsertButtonClick(){
      RFormSpace.doPrepare(this);
   }
   MO.FUiGridControl_onExtendButtonClick = function FUiGridControl_onExtendButtonClick(){
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
   MO.FUiGridControl_oeMode = function FUiGridControl_oeMode(e){
      var o = this;
      o.dispUpdate = true;
      o.dispDelete = true;
      o.__base.FUiContainer.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      return EEventStatus.Stop;
   }
   MO.FUiGridControl_oeProgress = function FUiGridControl_oeProgress(e){
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
         RBuilder.appendIcon(hc, 'ctl.FUiGridControl_Loading')
         var t = o._hDelayText = RBuilder.append(hc, 'SPAN');
         t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FUiGridControl:Loading') + "</B></FONT>";
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
   MO.FUiGridControl_isFormLinked = function FUiGridControl_isFormLinked(){
      return this._formLinked || this._formName;
   }
   MO.FUiGridControl_isDataSelected = function FUiGridControl_isDataSelected(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isSelect){
            return true;
         }
      }
   }
   MO.FUiGridControl_isDataChanged = function FUiGridControl_isDataChanged(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isDataChanged()){
            return true;
         }
      }
   }
   MO.FUiGridControl_hasAction = function FUiGridControl_hasAction(){
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
   MO.FUiGridControl_getFormLink = function FUiGridControl_getFormLink(t){
      var o = this;
      if(EFormLink.Form == t){
         return this._formName;
      }else if(EFormLink.Table == t){
         return this.name;
      }
      RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
   }
   MO.FUiGridControl_getHeadMode = function FUiGridControl_getHeadMode(e){
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
   MO.FUiGridControl_getRowBar = function FUiGridControl_getRowBar(){
      var o = this;
      var rb = o._rowBar;
      if(!rb){
         rb = o._rowBar = RClass.create(FGridRowBar);
         rb.table = o;
         rb.psBuild(o.hBorderPanel);
      }
      return rb;
   }
   MO.FUiGridControl_calculateDataSize = function FUiGridControl_calculateDataSize(){
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
   MO.FUiGridControl_hasVisibleRow = function FUiGridControl_hasVisibleRow() {
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
   MO.FUiGridControl_getCurrentRow = function FUiGridControl_getCurrentRow(){
      var c = this._focusCell;
      if(c){
         return c.row.saveRow();
      }
   }
   MO.FUiGridControl_getSelectedRow = function FUiGridControl_getSelectedRow(){
      var rs = this._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r.isSelect){
            return r;
         }
      }
   }
   MO.FUiGridControl_getSelectedRows = function FUiGridControl_getSelectedRows(){
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
   MO.FUiGridControl_getChangedRows = function FUiGridControl_getChangedRows(){
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
   MO.FUiGridControl_getRows = function FUiGridControl_getRows(){
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
   MO.FUiGridControl_refreshHint = function FUiGridControl_refreshHint(){
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
   MO.FUiGridControl_refreshSelected = function FUiGridControl_refreshSelected(){
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
   MO.FUiGridControl_hoverRow = function FUiGridControl_hoverRow(r, f){
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
   MO.FUiGridControl_selectRow = function FUiGridControl_selectRow(row, reset, force) {
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
   MO.FUiGridControl_clearSelectRow = function FUiGridControl_clearSelectRow(row) {
      var o = this;
      row.select(false);
      o.refreshHint();
   }
   MO.FUiGridControl_clearSelectRows = function FUiGridControl_clearSelectRows() {
       var o = this;
       var rs = o._rows;
       for(var n = 0; n < rs.count; n++){
          rs.get(n).isSelect = false;
       }
       o.refreshHint();
   }
   MO.FUiGridControl_setDataStatus = function FUiGridControl_setDataStatus(r, s) {
      var o = this;
      r.dataStatus = s;
      o._statusColumn.setDataStatus(r, s);
   }
   MO.FUiGridControl_dsInsert = function FUiGridControl_dsInsert() {
   }
   MO.FUiGridControl_dsUpdate = function FUiGridControl_dsUpdate(r){
      var o = this;
      o.psMode(EMode.Update);
      o.dsFetch(true);
   }
   MO.FUiGridControl_dsDelete = function FUiGridControl_dsDelete() {
   }
   MO.FUiGridControl_doSearch = function FUiGridControl_doSearch(){
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
   MO.FUiGridControl_focus = function FUiGridControl_focus(){
      var o = this;
      RConsole.find(FFocusConsole).focusClass(MDataset, o);
   }
   MO.FUiGridControl_pack = function FUiGridControl_pack(){
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
   MO.FUiGridControl_setVisible = function FUiGridControl_setVisible(v){
      var o = this;
      o.__base.FUiContainer.setVisible.call(o, v);
      o.__base.MUiHorizontal.setVisible.call(o, v);
   }
   MO.FUiGridControl_setButtonVisible = function FUiGridControl_setButtonVisible(n, v){
      var o = this;
      var b = o._buttons.get(n);
      if(b){
         b.setVisible(v);
      }
   }
   MO.FUiGridControl_refreshStyle = function FUiGridControl_refreshStyle(){
      var o = this;
      var rs = o._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         rs.get(n).refreshStyle();
      }
   }
   MO.FUiGridControl_dispose = function FUiGridControl_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
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
   MO.FUiGridControl_dump = function FUiGridControl_dump(s) {
      var o = this;
      s = RString.nvlStr(s);
      s.appendLine(RClass.name(o));
      var rs = o._rows;
      for(var n = 0; n < rs.count; n++) {
         s.appendLine(rs.get(n).dump());
      }
      return s;
   }
   MO.FUiGridControl_storeValues = function FUiGridControl_storeValues(a){
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
   MO.FUiGridControl_buildRows = function FUiGridControl_buildRows(){
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
   MO.FUiGridControl_createChild = function FUiGridControl_createChild(config) {
      var o = this;
      var c = o.__base.FUiContainer.createChild.call(o, config);
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
   MO.FUiGridControl_setStyleStatus = function FUiGridControl_setStyleStatus(row, status) {
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
   MO.FUiGridControl_buildRow = function FUiGridControl_buildRow(row) {
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
   MO.FUiGridControl_clearSelectAll = function FUiGridControl_clearSelectAll() {
      var o = this;
      var cs = o._columns;
      var sc = cs.get('_select');
      sc.hSelected.checked = false;
   }
   MO.FUiGridControl_appendRow = function FUiGridControl_appendRow(row) {
      this._hRows.appendChild(row._hRow);
      this._rows.push(row);
   }
   MO.FUiGridControl_deleteRow = function FUiGridControl_deleteRow(r) {
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
   MO.FUiGridControl_clearRows = function FUiGridControl_clearRows() {
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
   MO.FUiGridControl_onColumnTreeService = function FUiGridControl_onColumnTreeService(g){
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
   MO.FUiGridControl_getRowType = function FUiGridControl_getRowType(){
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
   MO.FUiGridControl_onColumnTreeClick = function FUiGridControl_onColumnTreeClick(s, e){
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
   MO.FUiGridRow = function FUiGridRow(o){
      o = RClass.inherits(this, o, FUiGridRowControl);
      o._hFixPanel   = null;
      o.onBuildPanel = FUiGridRow_onBuildPanel;
      o.setVisible   = FUiGridRow_setVisible;
      o.appendChild  = FUiGridRow_appendChild;
      o.dispose      = FUiGridRow_dispose;
      return o;
   }
   MO.FUiGridRow_onBuildPanel = function FUiGridRow_onBuildPanel(p){
      var o = this;
      o.__base.FUiGridRowControl.onBuildPanel.call(o, p);
      o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiGridRow_setVisible = function FUiGridRow_setVisible(p){
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
   MO.FUiGridRow_appendChild = function FUiGridRow_appendChild(p){
      var o = this;
      o.__base.FUiGridRowControl.appendChild.call(o, p);
      var c = p._column;
      if(c._optionFixed){
         o._hFixPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiGridRow_dispose = function FUiGridRow_dispose(){
      var o = this;
      var h = o._hFixPanel;
      if(h){
         RMemory.free(h);
         o._hFixPanel = null;
      }
      o.__base.FUiGridRowControl.dispose.call(o);
   }
   MO.FUiGridRow_select = function FUiGridRow_select(v){
      var o = this;
      o.isSelect = v;
      var c = v ? EColor.RowSelect : EColor.Row;
      o._hFixPanel.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.refreshStyle();
   }
   MO.FUiGridRow_refreshSize = function FUiGridRow_refreshSize(){
      this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
   }
   MO.FUiGridRow_refreshStyle = function FUiGridRow_refreshStyle(){
      var o = this;
      if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
         o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
      }else{
         o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
      }
      if(o.table.isLov){
         o._hFixPanel.style.cursor = 'hand';
      }
      o.__base.FUiGridRowControl.refreshStyle.call(o);
   }
}
with(MO){
   MO.FUiGridRowControl = function FUiGridRowControl(o){
      o = RClass.inherits(this, o, FContainer, MDataContainer);
      o._cells         = null;
      o._rows          = null;
      o._clearProcess  = null;
      o._resetProcess  = null;
      o._loadProcess   = null;
      o._saveProcess   = null;
      o._recordProcess = null;
      o._statusCell    = null;
      o.onBuildPanel   = FUiGridRowControl_onBuildPanel;
      o.onBuild        = FUiGridRowControl_onBuild;
      o.construct      = FUiGridRowControl_construct;
      o.loadRow        = FUiGridRowControl_loadRow;
      o.saveRow        = FUiGridRowControl_saveRow;
      o.setVisible     = FUiGridRowControl_setVisible;
      o.appendChild    = FUiGridRowControl_appendChild;
      o.push           = FUiGridRowControl_push;
      return o;
   }
   MO.FUiGridRowControl_onBuildPanel = function FUiGridRowControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiGridRowControl_onBuild = function FUiGridRowControl_onBuild(p){
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
   MO.FUiGridRowControl_construct = function FUiGridRowControl_construct(){
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
   MO.FUiGridRowControl_loadRow = function FUiGridRowControl_loadRow(p){
      var o = this;
      var ds = RClass.create(FDataSource);
      ds.selectRow(p);
      o.dsDataLoad(ds);
   }
   MO.FUiGridRowControl_saveRow = function FUiGridRowControl_saveRow(p){
      var o = this;
      return r;
   }
   MO.FUiGridRowControl_setVisible = function FUiGridRowControl_setVisible(p){
      var o = this;
      o._visible = p;
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FUiGridRowControl_appendChild = function FUiGridRowControl_appendChild(p){
      var o = this;
      o.__base.FContainer.appendChild.call(o, p);
      var c = p._column;
      if(!c._optionFixed){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiGridRowControl_push = function FUiGridRowControl_push(p){
      var o = this;
      o.__base.FContainer.push.call(o, p);
      p._row = o;
      o._cells.set(p._column._dataName, p);
      if(RClass.isClass(p, FCellStatus)){
         o._statusCell = p;
      }
   }
   MO.FUiGridRowControl_buildChildren = function FUiGridRowControl_buildChildren(){
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
   MO.FUiGridRowControl_isDataChanged = function FUiGridRowControl_isDataChanged(){
      var o = this;
      var cs = o._cells;
      for(var n=cs.count-1; n>=0; n--){
         if(cs.value(n).isDataChanged()){
            return true;
         }
      }
      return false;
   }
   MO.FUiGridRowControl_isVisible = function FUiGridRowControl_isVisible(){
   	var o = this;
   	return o._visible;
   }
   MO.FUiGridRowControl_getIndex = function FUiGridRowControl_getIndex(){
      return this._hPanel.rowIndex;
   }
   MO.FUiGridRowControl_getId = function FUiGridRowControl_getId(){
      var c = this._cells.get('ouid');
      return c ? c.reget() : '';
   }
   MO.FUiGridRowControl_getVersion = function FUiGridRowControl_getVersion(){
      var c = this._cells.get('over');
      return c ? c.reget() : '';
   }
   MO.FUiGridRowControl_getStatus = function FUiGridRowControl_getStatus(){
      return this._statusCell;
   }
   MO.FUiGridRowControl_cell = function FUiGridRowControl_cell(n){
      return this._cells.value(n);
   }
   MO.FUiGridRowControl_get = function FUiGridRowControl_get(n){
      return this._cells.get(n).get();
   }
   MO.FUiGridRowControl_reget = function FUiGridRowControl_reget(n){
      return this._cells.get(n).reget();
   }
   MO.FUiGridRowControl_set = function FUiGridRowControl_set(n, v){
      this._cells.get(n).set(v);
   }
   MO.FUiGridRowControl_loadValue = function FUiGridRowControl_loadValue(v){
      this.loadRow(v);
   }
   MO.FUiGridRowControl_saveValue = function FUiGridRowControl_saveValue(v){
      this.saveRow(v);
   }
   MO.FUiGridRowControl_recordValue = function FUiGridRowControl_recordValue(){
      this.process(this._recordProcess);
   }
   MO.FUiGridRowControl_toAttributes = function FUiGridRowControl_toAttributes(v){
      this.saveRow(v);
   }
   MO.FUiGridRowControl_toDeepAttributes = function FUiGridRowControl_toDeepAttributes(r){
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
   MO.FUiGridRowControl_select = function FUiGridRowControl_select(v){
      var o = this;
      o.isSelect = v;
      o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
      o.refreshStyle();
   }
   MO.FUiGridRowControl_extend = function FUiGridRowControl_extend(v){
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
   MO.FUiGridRowControl_doInsert = function FUiGridRowControl_doInsert(){
      var o = this;
      if(!o.row){
         o.row = new TRow();
      }
      o.status = ERowStatus.Insert;
      o.table.setDataStatus(o, ERowStatus.Insert);
   }
   MO.FUiGridRowControl_doDelete = function FUiGridRowControl_doDelete(){
      var o = this;
      o.status = ERowStatus.Delete;
      o.table.setDataStatus(o, ERowStatus.Delete);
   }
   MO.FUiGridRowControl_refresh = function FUiGridRowControl_refresh(){
      var o = this;
      o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
   }
   MO.FUiGridRowControl_refreshStyle = function FUiGridRowControl_refreshStyle(){
      var o = this;
      var cs = o._cells;
      if(cs){
         for(var n=cs.count-1; n>=0; n--){
            cs.value(n).refreshStyle();
         }
      }
   }
   MO.FUiGridRowControl_dump = function FUiGridRowControl_dump(s){
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
   MO.FUiTable = function FUiTable(o) {
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
      o.onBuildContent       = FUiTable_onBuildContent;
      o.oeRefresh         = FUiTable_oeRefresh;
      o.appendColumn      = FUiTable_appendColumn;
      return o;
   }
   MO.FUiTable_onBuildContent = function FUiTable_onBuildContent(p){
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
   MO.FUiTable_oeRefresh = function FUiTable_oeRefresh(e){
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
   MO.FUiTable_appendColumn = function FUiTable_appendColumn(p){
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
   MO.FUiTable_onResizeAfter = function FUiTable_onResizeAfter(){
      var o = this;
      var hdp = o._hDataPanel;
      var hfp = o._hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FUiTable_oeResize = function FUiTable_oeResize(e){
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
with(MO){
   MO.MUiMenuButton = function MUiMenuButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FUiMenuBar = function FUiMenuBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FUiMenuBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FUiMenuBar_appendChild;
      o.removeChild       = FUiMenuBar_removeChild;
      o.dispose           = FUiMenuBar_dispose;
      return o;
   }
   MO.FUiMenuBar_onBuildPanel = function FUiMenuBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      o._hLine = RBuilder.appendTableRow(h);
   }
   MO.FUiMenuBar_appendChild = function FUiMenuBar_appendChild(control){
      var o = this;
      o.__base.FUiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MUiMenuButton)){
         var hLine = o._hLine;
         var hCell = RBuilder.appendTableCell(hLine, o.styleName('ButtonPanel'));
         hCell._hParentLine = hLine;
         control.setPanel(hCell);
      }
   }
   MO.FUiMenuBar_removeChild = function FUiMenuBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, FUiMenuButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParentLine = null;
         p._hParent = null;
      }
      o.__base.FUiContainer.removeChild.call(o, p);
   }
   MO.FUiMenuBar_dispose = function FUiMenuBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiMenuButton = function FUiMenuButton(o){
      o = RClass.inherits(this, o, FUiControl, MUiMenuButton, MListenerClick);
      o._icon            = RClass.register(o, new APtyString('_icon'));
      o._iconDisable     = RClass.register(o, new APtyString('_iconDisable'));
      o._hotkey          = RClass.register(o, new APtyString('_hotkey'));
      o._action          = RClass.register(o, new APtyString('_action'));
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
      o.onBuildPanel     = FUiMenuButton_onBuildPanel
      o.onBuild          = FUiMenuButton_onBuild;
      o.onEnter          = FUiMenuButton_onEnter;
      o.onLeave          = FUiMenuButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiMenuButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiMenuButton_onMouseUp);
      o.icon             = FUiMenuButton_icon;
      o.setIcon          = FUiMenuButton_setIcon;
      o.setLabel         = FUiMenuButton_setLabel;
      o.setHint          = FUiMenuButton_setHint;
      o.setEnable        = FUiMenuButton_setEnable;
      o.click            = FUiMenuButton_click;
      o.dispose          = FUiMenuButton_dispose;
      return o;
   }
   MO.FUiMenuButton_onBuildPanel = function FUiMenuButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Normal'));
   }
   MO.FUiMenuButton_onBuild = function FUiMenuButton_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      var h = o._hPanel;
      o.attachEvent('onMouseDown', h);
      o.attachEvent('onMouseUp', h);
      var hf = o._hForm = RBuilder.appendTable(h);
      var hl = o._hLine = RBuilder.appendTableRow(hf);
      if(o._icon){
         var hc = o._hIconPanel = RBuilder.appendTableCell(hl, o.styleName('IconPanel'));
         o._hIcon = RBuilder.appendIcon(hc, null, o._icon);
      }
      if(o._icon && o._label){
         o._hSpacePanel = RBuilder.appendTableCell(hl, o.styleName('SpacePanel'));
      }
      if(o._label){
         var hLabelPanel = o._hLabelPanel = RBuilder.appendTableCell(hl, o.styleName('LabelPanel'));
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
   MO.FUiMenuButton_onEnter = function FUiMenuButton_onEnter(p){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }
   MO.FUiMenuButton_onLeave = function FUiMenuButton_onLeave(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Normal');
      }
   }
   MO.FUiMenuButton_onMouseDown = function FUiMenuButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Press');
         o.click();
      }
   }
   MO.FUiMenuButton_onMouseUp = function FUiMenuButton_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o._hPanel.className = o.styleName('Hover');
      }
   }
   MO.FUiMenuButton_icon = function FUiMenuButton_icon(){
      return this._icon;
   }
   MO.FUiMenuButton_setIcon = function FUiMenuButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FUiMenuButton_setLabel = function FUiMenuButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      RHtml.textSet(o._hLabelPanel, s);
   }
   MO.FUiMenuButton_setHint = function FUiMenuButton_setHint(p){
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
   MO.FUiMenuButton_setEnable = function FUiMenuButton_setEnable(p){
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
   MO.FUiMenuButton_click = function FUiMenuButton_click(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         MO.Logger.debug(o, 'Menu button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FUiMenuButton_dispose = function FUiMenuButton_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiMenuButtonMenu = function FUiMenuButtonMenu(o){
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
   MO.FUiMenuButtonMenu_oeBuild = function FUiMenuButtonMenu_oeBuild(event){
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
   MO.FUiMenuButtonMenu_onBuildPanel = function FUiMenuButtonMenu_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'DIV');
   }
   MO.FUiMenuButtonMenu_oeEnable = function FUiMenuButtonMenu_oeEnable(event){
      var o = this;
      o.base.FUiControl.oeEnable.call(o, event);
      o.hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o.hIcon.src = RRes._iconPath(o._icon);
      }
      return EEventStatus.Stop;
   }
   MO.FUiMenuButtonMenu_oeDisable = function FUiMenuButtonMenu_oeDisable(event){
      var o = this;
      o.base.FUiControl.oeDisable.call(o, event);
      o.hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o.hIcon.src = RRes._iconPath(o._iconDisable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiMenuButtonMenu_onEnter = function FUiMenuButtonMenu_onEnter(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   MO.FUiMenuButtonMenu_onLeave = function FUiMenuButtonMenu_onLeave(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Panel');
      }
   }
   MO.FUiMenuButtonMenu_onMouseDown = function FUiMenuButtonMenu_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Press');
      }
   }
   MO.FUiMenuButtonMenu_onMouseUp = function FUiMenuButtonMenu_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   MO.FUiMenuButtonMenu_onClick = function FUiMenuButtonMenu_onClick(){
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
   MO.FUiMenuButtonMenu_construct = function FUiMenuButtonMenu_construct(){
      var o = this;
      o.base.FUiControl.construct.call(o);
   }
   MO.FUiMenuButtonMenu_dispose = function FUiMenuButtonMenu_dispose(){
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
}
with(MO){
   MO.FUiMenuButtonSplit = function FUiMenuButtonSplit(o){
      o = RClass.inherits(this, o, FUiControl, MUiMenuButton);
      o._stylePanelHorizontal = RClass.register(o, new AStyle('_stylePanelHorizontal'));
      o._stylePanelVertical   = RClass.register(o, new AStyle('_stylePanelVertical'));
      o.onBuild               = FUiMenuButtonSplit_onBuild;
      return o;
   }
   MO.FUiMenuButtonSplit_onBuild = function FUiMenuButtonSplit_onBuild(event){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, event);
      var hPanel = o._hPanel;
      if(RClass.isClass(o._parent, FUiMenuBar)){
         hPanel.className = o.styleName('PanelVertical');
      }else{
         hPanel.className = o.styleName('PanelHorizontal');
      }
   }
}
with(MO){
   MO.FUiPopupMenu = function FUiPopupMenu(o){
      o = RClass.inherits(this, o, FUiContainer, MUiPopup);
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
      o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      o._styleButton    = RClass.register(o, new AStyle('_styleButton'));
      o._opener         = null;
      o._visible        = false;
      o._statusVisible  = false;
      o._hContainer     = null;
      o._hLabel         = null;
      o._hButtonPanel   = null;
      o._hIcon          = null;
      o._hText          = null;
      o.onBuild         = FUiPopupMenu_onBuild;
      o.appendChild     = FUiPopupMenu_appendChild;
      o.show            = FUiPopupMenu_show;
      o.setVisible      = FUiPopupMenu_setVisible;
      o.testInRange     = FUiPopupMenu_testInRange;
      o.doBlur          = FUiPopupMenu_doBlur;
      o.dispose         = FUiPopupMenu_dispose;
      return o;
   }
   MO.FUiPopupMenu_onBuild = function FUiPopupMenu_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
      var hLineTop = o._hLineTop = RBuilder.appendTableCell(hForm);
      hLineTop.bgColor = '#666666';
      hLineTop.height = '2px';
      var hContainerPanel = o._hContainerPanel = RBuilder.appendTableCell(hForm);
      var hLineBottom = o._hLineBottom = RBuilder.appendTableCell(hForm);
      hLineBottom.bgColor = '#666666';
      hLineBottom.height = '2px';
      var hContainer = o._hContainer = RBuilder.appendTable(hContainerPanel, o.styleName('Container'));
   }
   MO.FUiPopupMenu_doBlur = function FUiPopupMenu_doBlur(){
      var o = this;
   }
   MO.FUiPopupMenu_appendChild = function FUiPopupMenu_appendChild(control){
      var o = this;
      var hButtonPanel = RBuilder.appendTableRowCell(o._hContainer);
      hButtonPanel.className = o.styleName('Button');
      hButtonPanel.appendChild(control._hPanel);
   }
   MO.FUiPopupMenu_show = function FUiPopupMenu_show(h, positionCd, v){
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
      style.zIndex = RUiLayer.next();
   }
   MO.FUiPopupMenu_setVisible = function FUiPopupMenu_setVisible(visible){
      var o = this;
      var opener = o._opener;
      o._statusVisible = visible;
      var hOpener = opener._hPanelCell;
      var hPanel = o.panel(EPanel.Container);
      if(visible){
         hOpener.appendChild(hPanel);
      }else{
         hOpener.removeChild(hPanel);
      }
   }
   MO.FUiPopupMenu_testInRange = function FUiPopupMenu_testInRange(e){
      return this == RControl.htmlControl(e.srcElement, FUiPopupMenu);
   }
   MO.FUiPopupMenu_dispose = function FUiPopupMenu_dispose(e){
      var o = this;
      o._hContainer = RMemory.free(o._hContainer);
      o._hPanel = RMemory.free(o._hPanel);
      o._hLabel = RMemory.free(o._hLabel);
      o._hLastRow = RMemory.free(o._hLastRow);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.MUiToolButton = function MUiToolButton(o){
      o = RClass.inherits(this, o);
      return o;
   }
}
with(MO){
   MO.FUiToolBar = function FUiToolBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
      o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      o._hLine            = null;
      o.onBuildPanel      = FUiToolBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      o.appendChild       = FUiToolBar_appendChild;
      o.removeChild       = FUiToolBar_removeChild;
      o.dispose           = FUiToolBar_dispose;
      return o;
   }
   MO.FUiToolBar_onBuildPanel = function FUiToolBar_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiToolBar_appendChild = function FUiToolBar_appendChild(control){
      var o = this;
      o.__base.FUiContainer.appendChild.call(o, control);
      if(RClass.isClass(control, MUiToolButton)){
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
   MO.FUiToolBar_removeChild = function FUiToolBar_removeChild(p){
      var o = this;
      if(RClass.isClass(p, MUiToolButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParent = null;
         p._hParentLine = null;
      }
      o.__base.FUiContainer.removeChild.call(o, p);
   }
   MO.FUiToolBar_dispose = function FUiToolBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButton = function FUiToolButton(o){
      o = RClass.inherits(this, o, FUiControl, MUiToolButton, MListenerClick);
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
      o.onBuildPanel     = FUiToolButton_onBuildPanel;
      o.onBuildButton    = FUiToolButton_onBuildButton;
      o.onBuild          = FUiToolButton_onBuild;
      o.onEnter          = FUiToolButton_onEnter;
      o.onLeave          = FUiToolButton_onLeave;
      o.onMouseDown      = RClass.register(o, new AEventMouseDown('onMouseDown'), FUiToolButton_onMouseDown);
      o.onMouseUp        = RClass.register(o, new AEventMouseDown('onMouseUp'), FUiToolButton_onMouseUp);
      o.icon             = FUiToolButton_icon;
      o.setIcon          = FUiToolButton_setIcon;
      o.setLabel         = FUiToolButton_setLabel;
      o.setHint          = FUiToolButton_setHint;
      o.setEnable        = FUiToolButton_setEnable;
      o.doClick          = FUiToolButton_doClick;
      o.dispose          = FUiToolButton_dispose;
      return o;
   }
   MO.FUiToolButton_onBuildPanel = function FUiToolButton_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }
   MO.FUiToolButton_onBuildButton = function FUiToolButton_onBuildButton(p){
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
   MO.FUiToolButton_onBuild = function FUiToolButton_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      o.onBuildButton(p);
   }
   MO.FUiToolButton_onEnter = function FUiToolButton_onEnter(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FUiToolButton_onLeave = function FUiToolButton_onLeave(e){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Normal');
      }
   }
   MO.FUiToolButton_onMouseDown = function FUiToolButton_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FUiToolButton_onMouseUp = function FUiToolButton_onMouseUp(h){
      var o = this;
      if(!o._disabled){
         o._hForm.className = o.styleName('Hover');
      }
   }
   MO.FUiToolButton_icon = function FUiToolButton_icon(){
      return this._icon;
   }
   MO.FUiToolButton_setIcon = function FUiToolButton_setIcon(p){
      var o = this;
      o._icon = p;
      if(o._hIcon){
         o._hIcon.src = o.styleIconPath(o._icon);
      }
   }
   MO.FUiToolButton_setLabel = function FUiToolButton_setLabel(p){
      var o = this;
      var s = RString.nvl(p);
      o._label = s;
      var h = o._hLabelPanel;
      if(h){
         RHtml.textSet(h, s);
      }
   }
   MO.FUiToolButton_setHint = function FUiToolButton_setHint(p){
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
   MO.FUiToolButton_setEnable = function FUiToolButton_setEnable(p){
      var o = this;
      o.__base.FUiControl.oeEnable.call(o, e);
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
   MO.FUiToolButton_doClick = function FUiToolButton_doClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FUiFocusConsole).blur();
         MO.Logger.debug(o, 'Tool button click. (label={1})', o._label);
         var event = new SClickEvent(o);
         o.processClickListener(event);
         event.dispose();
         if(o._action){
            eval(o._action);
         }
      }
   }
   MO.FUiToolButton_dispose = function FUiToolButton_dispose(){
      var o = this;
      o._hForm = RHtml.free(o._hForm);
      o._hLine = RHtml.free(o._hLine);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hSpacePanel = RHtml.free(o._hSpacePanel);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o.__base.FUiControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButtonCheck = function FUiToolButtonCheck(o){
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
      o.isCheck         = FUiToolButtonCheck_isCheck;
      o.check           = FUiToolButtonCheck_check;
      o.dispose         = FUiToolButtonCheck_dispose;
      return o;
   }
   MO.FUiToolButtonCheck_onEnter = function FUiToolButtonCheck_onEnter(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Hover');
      }
   }
   MO.FUiToolButtonCheck_onLeave = function FUiToolButtonCheck_onLeave(p){
      var o = this;
      if(!o._statusChecked){
         o._hForm.className = this.styleName('Normal');
      }
   }
   MO.FUiToolButtonCheck_onMouseDown = function FUiToolButtonCheck_onMouseDown(p){
      var o = this;
      o.check(!o._statusChecked);
      var event = new SClickEvent(o);
      event.checked = o._statusChecked;
      o.processClickListener(event, o._statusChecked);
      event.dispose();
   }
   MO.FUiToolButtonCheck_onMouseUp = function FUiToolButtonCheck_onMouseUp(){
      var o = this;
   }
   MO.FUiToolButtonCheck_groupName = function FUiToolButtonCheck_groupName(){
      return this._groupName;
   }
   MO.FUiToolButtonCheck_setGroupName = function FUiToolButtonCheck_setGroupName(p){
      this._groupName = p;
   }
   MO.FUiToolButtonCheck_groupDefault = function FUiToolButtonCheck_groupDefault(){
      return this._groupDefault;
   }
   MO.FUiToolButtonCheck_setGroupDefault = function FUiToolButtonCheck_setGroupDefault(p){
      this._groupDefault = p;
   }
   MO.FUiToolButtonCheck_innerCheck = function FUiToolButtonCheck_innerCheck(p){
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
   MO.FUiToolButtonCheck_isCheck = function FUiToolButtonCheck_isCheck(){
      return this._statusChecked;
   }
   MO.FUiToolButtonCheck_check = function FUiToolButtonCheck_check(p){
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
   MO.FUiToolButtonCheck_dispose = function FUiToolButtonCheck_dispose(){
      var o = this;
      o._statusChecked = null;
      o._groupName = null;
      o.__base.FUiToolButton.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButtonEdit = function FUiToolButtonEdit(o){
      o = RClass.inherits(this, o, FUiToolButton, MListenerDataChanged);
      o._editSize      = RClass.register(o, new APtySize2('_editSize'));
      o._hEdit         = null;
      o.onBuildButton  = FUiToolButtonEdit_onBuildButton;
      o.onEnter        = RMethod.empty;
      o.onLeave        = RMethod.empty;
      o.onInputEdit    = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiToolButtonEdit_onInputEdit);
      o.onInputKeyDown = RClass.register(o, new AEventKeyDown('onInputKeyDown'), FUiToolButtonEdit_onInputKeyDown);
      o.construct      = FUiToolButtonEdit_construct;
      o.text           = FUiToolButtonEdit_text;
      o.setText        = FUiToolButtonEdit_setText;
      return o;
   }
   MO.FUiToolButtonEdit_onBuildButton = function FUiToolButtonEdit_onBuildButton(p){
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
   MO.FUiToolButtonEdit_onInputEdit = function FUiToolButtonEdit_onInputEdit(event){
      var o = this;
      o.processDataChangedListener(o);
   }
   MO.FUiToolButtonEdit_onInputKeyDown = function FUiToolButtonEdit_onInputKeyDown(event){
      var o = this;
      if(event.keyCode == EKeyCode.Enter){
         o.doClick();
      }
   }
   MO.FUiToolButtonEdit_construct = function FUiToolButtonEdit_construct(){
      var o = this;
      o.__base.FUiToolButton.construct.call(o);
      o._editSize = new SSize2();
   }
   MO.FUiToolButtonEdit_text = function FUiToolButtonEdit_text(){
      return this._hEdit.value;
   }
   MO.FUiToolButtonEdit_setText = function FUiToolButtonEdit_setText(text){
      this._hEdit.value = text;
   }
}
with(MO){
   MO.FUiToolButtonMenu = function FUiToolButtonMenu(o){
      o = RClass.inherits(this, o, FUiToolButton, MUiContainer, MUiDropable, MUiFocus);
      o._menu           = null;
      o._statusDrop     = false;
      o._hDropPanel     = null;
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropHover = RClass.register(o, new AStyleIcon('_styleDropHover'));
      o.onBuild         = FUiToolButtonMenu_onBuild;
      o.onEnter         = FUiToolButtonMenu_onEnter;
      o.onLeave         = FUiToolButtonMenu_onLeave;
      o.onMouseDown     = FUiToolButtonMenu_onMouseDown;
      o.onBlur          = FUiToolButtonMenu_onBlur;
      o.onMouseUp       = RMethod.empty;
      o.construct       = FUiToolButtonMenu_construct;
      o.push            = FUiToolButtonMenu_push;
      o.drop            = FUiToolButtonMenu_drop;
      o.doClick         = FUiToolButtonMenu_doClick;
      o.dispose         = FUiToolButtonMenu_dispose;
      return o;
   }
   MO.FUiToolButtonMenu_onBuild = function FUiToolButtonMenu_onBuild(event){
      var o = this;
      o.__base.FUiToolButton.onBuild.call(o, event);
      var hDropPanel = o._hDropPanel = RBuilder.appendTableCell(o._hLine);
      o.onBuildDrop(hDropPanel);
      o._menu.onBuild(event);
   }
   MO.FUiToolButtonMenu_onEnter = function FUiToolButtonMenu_onEnter(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onEnter.call(o, event);
      }
   }
   MO.FUiToolButtonMenu_onLeave = function FUiToolButtonMenu_onLeave(event){
      var o = this;
      if(!o._statusDrop){
         o.__base.FUiToolButton.onLeave.call(o, event);
      }
   }
   MO.FUiToolButtonMenu_onMouseDown = function FUiToolButtonMenu_onMouseDown(){
      var o = this;
      if(!o._statusDrop){
         o._hForm.className = this.styleName('Press');
         o.doClick();
      }
   }
   MO.FUiToolButtonMenu_onBlur = function FUiToolButtonMenu_onBlur(e){
      var o = this;
   }
   MO.FUiToolButtonMenu_construct = function FUiToolButtonMenu_construct(){
      var o = this;
      o.__base.FUiToolButton.construct.call(o);
      var menu = o._menu = RClass.create(FUiPopupMenu);
      menu._opener = o;
   }
   MO.FUiToolButtonMenu_push = function FUiToolButtonMenu_push(c){
      var o = this;
      if(RClass.isClass(c, MUiMenuButton)){
         return o._menu.push(c);
      }
      o.__base.FUiToolButton.push.call(o, c);
   }
   MO.FUiToolButtonMenu_drop = function FUiToolButtonMenu_drop(flag){
      var o = this;
      if(!o._disabled){
         o._statusDrop = !o._statusDrop;
         if(o._statusDrop){
            o._hForm.className = o.styleName('Press');
            o._menu.show(this._hDropPanel, EUiAlign.BottomRight);
            RConsole.find(FUiPopupConsole).show(o._menu);
         }else{
            o._hForm.className = o.styleName('Normal');
            o._menu.hide();
         }
      }
   }
   MO.FUiToolButtonMenu_doClick = function FUiToolButtonMenu_doClick(){
      var o = this;
      o.__base.FUiToolButton.doClick.call(o);
      o.drop(!o._statusDrop);
   }
   MO.FUiToolButtonMenu_dispose = function FUiToolButtonMenu_dispose(){
      var o = this;
      o._hDropIcon = RHtml.free(o._hDropIcon);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.FControl.dispose.call(o);
   }
}
with(MO){
   MO.FUiToolButtonSplit = function FUiToolButtonSplit(o){
      o = RClass.inherits(this, o, FUiToolButton, MUiToolButton);
      o._stylePanel = RClass.register(o, new AStyle('_stylePanel'));
      o.onBuild     = FUiToolButtonSplit_onBuild;
      return o;
   }
   MO.FUiToolButtonSplit_onBuild = function FUiToolButtonSplit_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p);
      o._hPanel.className = o.styleName('Panel');
   }
}
with(MO){
   MO.FUiToolButtonText = function FUiToolButtonText(o){
      o = RClass.inherits(this, o, FUiToolButton);
      return o;
   }
}
with(MO){
   MO.RUiToolBar = function RUiToolBar(){
      var o = this;
      o.fromNode = RUiToolBar_fromNode;
      return o;
   }
   MO.RUiToolBar_mergeNode = function RUiToolBar_mergeNode(xtb, xNode, r){
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
   MO.RUiToolBar_fromNode = function RUiToolBar_fromNode(control, config, panel, r){
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
   MO.RUiToolBar = new RUiToolBar();
}
with(MO){
   MO.FUiPageControl = function FUiPageControl(o){
      o = RClass.inherits(this, o, FUiContainer);
      o._sizeCd          = EUiSize.Horizontal;
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
      o._esize           = EUiSize.Both;
      o._hTop            = null;
      o._hLine           = null;
      o._hBottom         = null;
      o._hSheets         = null;
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
   MO.FUiPageControl_onBuildPanel = function FUiPageControl_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FUiPageControl_onBuild = function FUiPageControl_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
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
      hc.width = 12;
      o._hFirst = RBuilder.appendTableCell(o._hLine);
      var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
      hbc.className = o.styleName('Bottom', FUiPageSheet);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FUiPageSheet);
   }
   MO.FUiPageControl_oeRefresh = function FUiPageControl_oeRefresh(event){
      var o = this;
      var r = o.__base.FUiContainer.oeRefresh.call(o, event);
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
   MO.FUiPageControl_construct = function FUiPageControl_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._sheets = new TDictionary();
   }
   MO.FUiPageControl_appendChild = function FUiPageControl_appendChild(control){
      var o = this;
      if(RClass.isClass(control, FUiPageSheet)){
         var ci = o._hLast.cellIndex;
         var hc = control._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Top');
         var hc = control._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
         hc.className = control.styleName('Top');
         var hc = control._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Top');
         var hc = control._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Left');
         var hc = control._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
         control.attachEvent('onButtonEnter', hc);
         control.attachEvent('onButtonLeave', hc);
         control.attachEvent('onHeadMouseDown', hc);
         hc.width = 1;
         var hb = control._hButton = RBuilder.appendDiv(hc, control.styleName('Button'));
         if(control.icon){
            control._hIcon = RBuilder.appendIcon(hb, null, control.icon);
         }
         if(control.label){
            control._hText = RBuilder.appendSpan(hb, control.styleName('ButtonText'));
            control._hText.innerText = ' ' + control.label();
         }
         var hc = control._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Right')
         var hc = control._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         var hc = control._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
         hc.className = control.styleName('Bottom');
         var hc = control._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         var hr = RBuilder.appendTableRow(o._hPanel);
         if(control.index){
            hr.style.display = 'none';
         }
         var hc = RBuilder.appendTableCell(hr);
         control._hForm = hr;
         hc.style.verticalAlign = 'top';
         hc.appendChild(control._hPanel);
         o.selectByIndex(0);
      }
   }
   MO.FUiPageControl_sheet = function FUiPageControl_sheet(name){
      return this._sheets.get(name);
   }
   MO.FUiPageControl_select = function FUiPageControl_select(sheet){
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
   MO.FUiPageControl_selectByIndex = function FUiPageControl_selectByIndex(n){
      var o = this;
      var sheet = o._sheets.value(n);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiPageControl_push = function FUiPageControl_push(component){
      var o = this;
      if(RClass.isClass(component, FUiPageSheet)){
         var sheets = o._sheets;
         component._pageControl = o;
         component._index = sheets.count();
         sheets.set(component.name(), component);
      }
      o.__base.FUiContainer.push.call(o, component);
   }
   MO.FUiPageControl_dispose = function FUiPageControl_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiPageSheet = function FUiPageSheet(o){
      o = RClass.inherits(this, o, FUiLayout);
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._formName          = RClass.register(o, new APtyString('_formName'));
      o._formLink          = RClass.register(o, new APtyString('_formLink'));
      o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
      o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
      o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
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
   MO.FUiPageSheet_onBuildPanel = function FUiPageSheet_onBuildPanel(event){
      var o = this;
      var hPanel = o._hPanel = o._hContainer = RBuilder.createDiv(event, o.styleName('Panel'));
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var hForm = o._hPanelForm = RBuilder.appendTable(hPanel);
      hForm.style.width = '100%';
      hForm.style.height = '100%';
   }
   MO.FUiPageSheet_onButtonEnter = function FUiPageSheet_onButtonEnter(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FUiPageSheet_onButtonLeave = function FUiPageSheet_onButtonLeave(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FUiPageSheet_onHeadMouseDown = function FUiPageSheet_onHeadMouseDown(event){
      var o = this;
      o._parent.select(o);
   }
   MO.FUiPageSheet_construct = function FUiPageSheet_construct(){
      var o = this;
      o.__base.FUiLayout.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FUiPageSheet_innerSelect = function FUiPageSheet_innerSelect(flag){
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
      RHtml.visibleSet(o._hForm, flag);
   }
   MO.FUiPageSheet_select = function FUiPageSheet_select(flag){
      var o = this;
      o.innerSelect(flag);
      if(flag){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FUiPageSheet_setVisible = function FUiPageSheet_setVisible(flag){
      var o = this;
      RHtml.displaySet(o._hPanel, flag);
   }
   MO.FUiPageSheet_dispose = function FUiPageSheet_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FUiLayout.dispose.call(o);
   }
   MO.FUiPageSheet_innerDump = function FUiPageSheet_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
with(MO){
   MO.FUiTabBar = function FUiTabBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._sizeCd          = EUiSize.Horizontal;
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
      o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
      o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
      o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
      o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
      o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
      o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
      o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
      o._buttons          = null;
      o._activeButton     = null;
      o._esize           = EUiSize.Both;
      o._hTop             = null;
      o._hLine            = null;
      o._hBottom          = null;
      o._hSheets          = null;
      o.onBuildPanel     = FUiTabBar_onBuildPanel;
      o.onBuild          = FUiTabBar_onBuild;
      o.oeRefresh        = FUiTabBar_oeRefresh;
      o.construct        = FUiTabBar_construct;
      o.activeButton      = FUiTabBar_activeButton;
      o.appendChild      = FUiTabBar_appendChild;
      o.select           = FUiTabBar_select;
      o.selectByIndex    = FUiTabBar_selectByIndex;
      o.selectByName     = FUiTabBar_selectByName;
      o.sheet            = FUiTabBar_sheet;
      o.push             = FUiTabBar_push;
      o.dispose          = FUiTabBar_dispose;
      return o;
   }
   MO.FUiTabBar_onBuildPanel = function FUiTabBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FUiTabBar_onBuild = function FUiTabBar_onBuild(p){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, p);
      var h = o._hPanel;
      var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
      hc.vAlign = 'bottom';
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
      hbc.className = o.styleName('Bottom', FUiTabButton);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FUiTabButton);
   }
   MO.FUiTabBar_oeRefresh = function FUiTabBar_oeRefresh(p){
      var o = this;
      var r = o.__base.FUiContainer.oeRefresh.call(o, p);
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
   MO.FUiTabBar_construct = function FUiTabBar_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._buttons = new TDictionary();
   }
   MO.FUiTabBar_activeButton = function FUiTabBar_activeButton(){
      return this._activeButton;
   }
   MO.FUiTabBar_appendChild = function FUiTabBar_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FUiTabButton)){
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
         p.attachEvent('onButtonClick', hc);
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
         o.selectByIndex(0);
      }
   }
   MO.FUiTabBar_sheet = function FUiTabBar_sheet(p){
      return this._buttons.get(p);
   }
   MO.FUiTabBar_select = function FUiTabBar_select(p){
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
   MO.FUiTabBar_selectByIndex = function FUiTabBar_selectByIndex(index){
      var o = this;
      var sheet = o._buttons.value(index);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiTabBar_selectByName = function FUiTabBar_selectByName(name){
      var o = this;
      var sheet = o.findControl(name);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiTabBar_push = function FUiTabBar_push(component){
      var o = this;
      if(RClass.isClass(component, FUiTabButton)){
         var buttons = o._buttons;
         component._index = buttons.count();
         buttons.set(component.name(), component);
      }
      o.__base.FUiContainer.push.call(o, component);
   }
   MO.FUiTabBar_dispose = function FUiTabBar_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiTabButton = function FUiTabButton(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick);
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
      o.onBuildPanel       = FUiTabButton_onBuildPanel;
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiTabButton_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiTabButton_onButtonLeave);
      o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FUiTabButton_onButtonClick);
      o.construct          = FUiTabButton_construct;
      o.innerSelect        = FUiTabButton_innerSelect;
      o.select             = FUiTabButton_select;
      o.setVisible         = FUiTabButton_setVisible;
      o.doClick            = FUiTabButton_doClick;
      o.dispose            = FUiTabButton_dispose
      o.innerDump          = FUiTabButton_innerDump;
      return o;
   }
   MO.FUiTabButton_onBuildPanel = function FUiTabButton_onBuildPanel(p){
      var o = this;
      var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
      hp.width = '100%';
      hp.height = '100%';
   }
   MO.FUiTabButton_onButtonEnter = function FUiTabButton_onButtonEnter(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FUiTabButton_onButtonLeave = function FUiTabButton_onButtonLeave(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FUiTabButton_onButtonClick = function FUiTabButton_onButtonClick(p){
      this.doClick();
   }
   MO.FUiTabButton_construct = function FUiTabButton_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FUiTabButton_innerSelect = function FUiTabButton_innerSelect(p){
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
   MO.FUiTabButton_select = function FUiTabButton_select(p){
      var o = this;
      o.innerSelect(p);
      if(p){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FUiTabButton_setVisible = function FUiTabButton_setVisible(p){
      var o = this;
      RHtml.displaySet(o._hPanel, p);
   }
   MO.FUiTabButton_doClick = function FUiTabButton_doClick(){
      var o = this;
      o._parent.select(o);
      var e = new SClickEvent(o);
      o.processClickListener(e);
      e.dispose();
   }
   MO.FUiTabButton_dispose = function FUiTabButton_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FUiControl.dispose.call(o);
   }
   MO.FUiTabButton_innerDump = function FUiTabButton_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
MO.EUiTreeNodeGroup = new function EUiTreeNodeGroup(){
   var o = this;
   o.Container = 'container';
   o.Item      = 'item';
   return o;
}
with(MO){
   MO.FUiTreeColumn = function FUiTreeColumn(o){
      o = RClass.inherits(this, o, FUiControl);
      o._icon        = RClass.register(o, new APtyString('_icon'));
      o._dataName    = RClass.register(o, new APtyString('_dataName'));
      o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
      o._config      = RClass.register(o, new APtyConfig('_config'));
      o.oeBuild      = FUiTreeColumn_oeBuild;
      o.onBuildPanel = FUiTreeColumn_onBuildPanel;
      return o;
   }
   MO.FUiTreeColumn_oeBuild = function FUiTreeColumn_oeBuild(event){
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
   MO.FUiTreeColumn_onBuildPanel = function FUiTreeColumn_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'TD');
   }
}
with(MO){
   MO.FUiTreeLevel = function FUiTreeLevel(o){
      o = RClass.inherits(this, o, FUiControl);
      o._id        = RClass.register(o, new APtyString('_id'));
      o._color     = RClass.register(o, new APtyString('_color'));
      o._backColor = RClass.register(o, new APtyString('_backColor'));
      return o;
   }
}
with(MO){
   MO.FUiTreeNode = function FUiTreeNode(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDataProperties);
      o._valid            = RClass.register(o, new APtyBoolean('_valid', 'is_valid'), true);
      o._child            = RClass.register(o, new APtyBoolean('_child', 'has_child'), false);
      o._typeGroup        = RClass.register(o, [new APtyString('_typeGroup'), new AGetSet('_typeGroup')]);
      o._typeCode         = RClass.register(o, [new APtyString('_typeCode'), new AGetter('_typeCode')]);
      o._code             = RClass.register(o, [new APtyString('_code'), new AGetSet('_code')]);
      o._icon             = RClass.register(o, new APtyString('_icon'));
      o._checked          = RClass.register(o, new APtyBoolean('_checked'), false);
      o._extended         = RClass.register(o, new APtyBoolean('_extended'), false);
      o._note             = RClass.register(o, new APtyString('_note'));
      o._attributes       = RClass.register(o, new APtyAttributes('_attributes'));
      o._styleNormal      = RClass.register(o, new AStyle('_styleNormal'));
      o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
      o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
      o._styleImage       = RClass.register(o, new AStyle('_styleImage'));
      o._styleIcon        = RClass.register(o, new AStyle('_styleIcon'));
      o._styleIconDisable = RClass.register(o, new AStyle('_styleIconDisable'));
      o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell'));
      o._tree             = RClass.register(o, new AGetSet('_tree'));
      o._level            = RClass.register(o, new AGetter('_level'), 0);
      o._nodes            = RClass.register(o, new AGetter('_nodes'));
      o._cells            = RClass.register(o, new AGetter('_cells'));
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
      o.setTypeCode       = FUiTreeNode_setTypeCode;
      o.setLabel          = FUiTreeNode_setLabel;
      o.setNote           = FUiTreeNode_setNote;
      o.setLevel          = FUiTreeNode_setLevel;
      o.cell              = FUiTreeNode_cell;
      o.check             = FUiTreeNode_check;
      o.setCheck          = FUiTreeNode_setCheck;
      o.setImage          = FUiTreeNode_setImage;
      o.calculateImage    = FUiTreeNode_calculateImage;
      o.setIcon           = FUiTreeNode_setIcon;
      o.get               = FUiTreeNode_get;
      o.set               = FUiTreeNode_set;
      o.isFolder          = FUiTreeNode_isFolder;
      o.hasChild          = FUiTreeNode_hasChild;
      o.topNode           = FUiTreeNode_topNode;
      o.topNodeByType     = FUiTreeNode_topNodeByType;
      o.nodeCount         = FUiTreeNode_nodeCount;
      o.show              = FUiTreeNode_show;
      o.hide              = FUiTreeNode_hide;
      o.select            = FUiTreeNode_select;
      o.extend            = FUiTreeNode_extend;
      o.extendAll         = FUiTreeNode_extendAll;
      o.searchLast        = FUiTreeNode_searchLast;
      o.createChild       = FUiTreeNode_createChild;
      o.appendChild       = FUiTreeNode_appendChild;
      o.appendNode        = FUiTreeNode_appendNode;
      o.push              = FUiTreeNode_push;
      o.remove            = FUiTreeNode_remove;
      o.removeSelf        = FUiTreeNode_removeSelf;
      o.removeChildren    = FUiTreeNode_removeChildren;
      o.reset             = FUiTreeNode_reset;
      o.click             = FUiTreeNode_click;
      o.refreshStyle      = FUiTreeNode_refreshStyle;
      o.propertyLoad      = FUiTreeNode_propertyLoad;
      o.propertySave      = FUiTreeNode_propertySave;
      o.loadConfig        = FUiTreeNode_loadConfig;
      o.dispose           = FUiTreeNode_dispose;
      o.innerDump         = FUiTreeNode_innerDump;
      return o;
   }
   MO.FUiTreeNode_onBuildPanel = function FUiTreeNode_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiTreeNode_onBuild = function FUiTreeNode_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FUiContainer.onBuild.call(o, p);
      var hp = o._hPanel;
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
      var cs = t._nodeColumns;
      if(cs){
         var cc = cs.count();
         for(var n = 0; n < cc; n++){
            var c = cs.value(n);
            var nc = RClass.create(FUiTreeNodeCell);
            nc._column = c;
            nc.build(p);
            o.push(nc);
         }
      }
   }
   MO.FUiTreeNode_onNodeEnter = function FUiTreeNode_onNodeEnter(e){
      var o = this;
      var t = o._tree;
      if(!t._focusNode || (t._focusNode && (t._focusNode != o))){
         o._statusHover = true;
         o.refreshStyle();
         t.lsnsEnter.process(t, o);
      }
   }
   MO.FUiTreeNode_onNodeLeave = function FUiTreeNode_onNodeLeave(event){
      var o = this;
      var tree = o._tree;
      if(!tree._focusNode || (tree._focusNode && (tree._focusNode != o))){
         o._statusHover = false;
         o.refreshStyle();
         tree.lsnsLeave.process(tree, o);
      }
   }
   MO.FUiTreeNode_onNodeClick = function FUiTreeNode_onNodeClick(event){
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
   MO.FUiTreeNode_construct = function FUiTreeNode_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
   }
   MO.FUiTreeNode_type = function FUiTreeNode_type(){
      var o = this;
      var t = o._tree;
      if(RString.isEmpty(o._typeCode)){
         return null;
      }
      return t.findType(o._typeCode);
   }
   MO.FUiTreeNode_setTypeCode = function FUiTreeNode_setTypeCode(value){
      var o = this;
      o._typeCode = value;
      o.setIcon();
   }
   MO.FUiTreeNode_setLabel = function FUiTreeNode_setLabel(p){
      var o = this;
      o.__base.FUiContainer.setLabel.call(o, p)
      var h = o._hLabel;
      if(h){
         var s = '';
         if(!RString.isEmpty(o._label)){
            s = '&nbsp;' + o._label;
         }
         if(!RString.isEmpty(o._tag)){
            s += '&nbsp;<FONT color=blue>(' + o._tag + ')</FONT>';
         }
         if(!RString.isEmpty(o._note)){
            s += '&nbsp;<FONT color=green>[ ' + o._note + ' ]</FONT>';
         }
         h.innerHTML = s;
      }
   }
   MO.FUiTreeNode_setNote = function FUiTreeNode_setNote(p){
      var o = this;
      o._note = RString.empty(p);
      o.setLabel(o._label);
   }
   MO.FUiTreeNode_setLevel = function FUiTreeNode_setLevel(level){
      var o = this;
      o._level = level;
      var hPanel = o._hNodePanel;
      if(hPanel){
         hPanel.style.paddingLeft = (o._tree._indent * level) + 'px';
      }
   }
   MO.FUiTreeNode_cell = function FUiTreeNode_cell(p){
      return this._cells.get(p);
   }
   MO.FUiTreeNode_check = function FUiTreeNode_check(){
      return this._checked;
   }
   MO.FUiTreeNode_setCheck = function FUiTreeNode_setCheck(p){
      var o = this;
      o._checked = p;
      var attributes = o._attributes;
      if(attributes){
         var value = attributes.get('checked');
         if(!RString.isEmpty(value)){
           o._checked = RBoolean.isTrue(value);
           if(o._hCheck){
               o._hCheck._checked = o._checked;
           }
         }
      }
   }
   MO.FUiTreeNode_setImage = function FUiTreeNode_setImage(){
      var o = this;
      var tree = o._tree;
      var hImage = o._hImage;
      var icon = o._child ? tree._iconPlus : tree._iconNode;
      hImage.src = RResource.iconPath(icon);
   }
   MO.FUiTreeNode_calculateImage = function FUiTreeNode_calculateImage(){
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
      hImage.src = RResource.iconPath(icon);
   }
   MO.FUiTreeNode_setIcon = function FUiTreeNode_setIcon(p){
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
   MO.FUiTreeNode_get = function FUiTreeNode_get(n){
      return this._attributes.get(n);
   }
   MO.FUiTreeNode_set = function FUiTreeNode_set(n, v){
      this._attributes.set(n, v);
   }
   MO.FUiTreeNode_isFolder = function FUiTreeNode_isFolder(){
      var o = this;
      var t = o.type();
      return t.storage() == 'collections';
   }
   MO.FUiTreeNode_hasChild = function FUiTreeNode_hasChild(){
      var o = this;
      if(o._child){
         var ns = o._nodes;
         if(ns){
            return !ns.isEmpty();
         }
      }
      return false;
   }
   MO.FUiTreeNode_topNode = function FUiTreeNode_topNode(){
      var r = this;
      while(r._parent){
         if(RClass.isClass(r._parent, FUiTreeNode)){
            r = r._parent;
         }else{
            break;
         }
      }
      return r;
   }
   MO.FUiTreeNode_topNodeByType = function FUiTreeNode_topNodeByType(t){
      var r = this;
      while(r){
         if(r._typeCode == t){
            return r;
         }
         r = r._parent;
      }
      return null;
   }
   MO.FUiTreeNode_nodeCount = function FUiTreeNode_nodeCount(){
      var o = this;
      var nodes = o._nodes
      if(nodes){
         return nodes.count();
      }
      return 0;
   }
   MO.FUiTreeNode_show = function FUiTreeNode_show(){
      var o = this;
      var tree = o._tree;
      RHtml.visibleSet(o._hPanel, true);
      var nodes = o._nodes;
      if(nodes){
         var count = nodes.count();
         for(var i = 0; i < count; i++){
            var node = nodes.at(i);
            if(!node._statusLinked){
               tree.appendNode(node, o);
            }
            if(node._statusDisplay){
               RHtml.visibleSet(node._hPanel, true);
               if(node._extended){
                  node.show();
               }
            }
         }
      }
   }
   MO.FUiTreeNode_hide = function FUiTreeNode_hide(){
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
   MO.FUiTreeNode_select = function FUiTreeNode_select(v){
      var o = this;
      o._statusSelected = v;
      if(v){
         o._statusHover = false;
      }
      o.refreshStyle();
   }
   MO.FUiTreeNode_extend = function FUiTreeNode_extend(p){
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
   MO.FUiTreeNode_extendAll = function FUiTreeNode_extendAll(p){
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
   MO.FUiTreeNode_searchLast = function FUiTreeNode_searchLast(){
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
   MO.FUiTreeNode_createChild = function FUiTreeNode_createChild(x){
      var r = null;
      if(x.isName('Node') || x.isName('TreeNode')){
         r = RClass.create(FUiTreeNode);
         r._tree = this._tree;
      }
      return r;
   }
   MO.FUiTreeNode_appendChild = function FUiTreeNode_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FUiTreeNodeCell)){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiTreeNode_appendNode = function FUiTreeNode_appendNode(p){
      var o = this;
      var t = o._tree;
      o.push(p);
      t.appendNode(p, o);
      o.extend(true);
   }
   MO.FUiTreeNode_push = function FUiTreeNode_push(component){
      var o = this;
      var tree = o._tree;
      o.__base.FUiContainer.push.call(o, component);
      if(RClass.isClass(component, FUiTreeNode)){
         o._child = true;
         o._statusLoaded = true;
         var nodes = o._nodes;
         if(!nodes){
            nodes = o._nodes = new TObjects();
         }
         component._tree = tree;
         component._parent = o;
         nodes.push(component);
         tree._allNodes.pushUnique(component);
      }
      if(RClass.isClass(component, FUiTreeNodeCell)){
         var cells = o._cells;
         if(!cells){
            cells = o._cells = new TDictionary();
         }
         component._parent = o;
         component._tree = tree;
         component._node = o;
         cells.set(component._column._name, component);
      }
   }
   MO.FUiTreeNode_remove = function FUiTreeNode_remove(component){
      var o = this;
      if(RClass.isClass(component, FUiTreeNode)){
         o._nodes.remove(component);
      }
      o.__base.FUiContainer.remove.call(o, component);
   }
   MO.FUiTreeNode_removeSelf = function FUiTreeNode_removeSelf(){
      var o = this;
      var tree = o._tree;
      if(o._statusLinked){
         o.removeChildren();
         var parent = o._parent;
         if(RClass.isClass(parent, FUiTreeNode)){
            parent.remove(o);
            parent.calculateImage();
         }
         tree.freeNode(o);
      }
   }
   MO.FUiTreeNode_removeChildren = function FUiTreeNode_removeChildren(){
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
   MO.FUiTreeNode_reset = function FUiTreeNode_reset(){
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
   MO.FUiTreeNode_click = function FUiTreeNode_click(){
      var o = this;
      var tree = o._tree;
      tree.selectNode(o, true);
      tree.nodeClick(o);
   }
   MO.FUiTreeNode_refreshStyle = function FUiTreeNode_refreshStyle(){
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
   MO.FUiTreeNode_propertyLoad = function FUiTreeNode_propertyLoad(x){
      var o = this;
      var t = o._tree;
      o.__base.FUiContainer.propertyLoad.call(o, x);
      var attributes = o._attributes;
      if(attributes){
         attributes.append(x.attrs);
      }
      var ap = x.get('attributes')
      if(ap){
         o._attributes.unpack(ap);
      }
   }
   MO.FUiTreeNode_propertySave = function FUiTreeNode_propertySave(x){
      var o = this;
      o.__base.FUiContainer.propertySave.call(o, x);
      var t = o.type();
      x.set('type_code', t._code);
      x.set('storage', t._storage);
   }
   MO.FUiTreeNode_loadConfig = function FUiTreeNode_loadConfig(x){
      var o = this;
      o.reset();
      o.propertyLoad(x);
      o.setLabel(o._label);
      o.setCheck(o._checked);
      o.setImage();
      o.setIcon(o._icon);
   }
   MO.FUiTreeNode_dispose = function FUiTreeNode_dispose(){
      var o = this;
      o._hNodePanel = null;
      o._hImage = null;
      o._hIcon = null;
      o._hCheck = null;
      o._hLabel = null;
      o.__base.FUiContainer.dispose.call(o);
   }
   MO.FUiTreeNode_innerDump = function FUiTreeNode_innerDump(s){
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
   MO.FUiTreeNode_reload = function FUiTreeNode_reload(t){
      var o = this;
      if(t){
         o._tree.reload();
      }else{
         o._tree.reloadNode(o);
      }
   }
   MO.FUiTreeNode_reloadParent = function FUiTreeNode_reloadParent(){
      var o = this;
      if(o.parentNode){
         o._tree.reloadNode(o.parentNode);
      }else{
         o._tree.reload();
      }
   }
   MO.FUiTreeNode_loadQuery = function FUiTreeNode_loadQuery(x){
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
   MO.FUiTreeNode_findByName = function FUiTreeNode_findByName(n){
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
   MO.FUiTreeNode_findByUuid = function FUiTreeNode_findByUuid(u){
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
   MO.FUiTreeNode_pushChanged = function FUiTreeNode_pushChanged(trd){
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
   MO.FUiTreeNode_checkChanged = function FUiTreeNode_checkChanged(){
      var o = this;
      if(o._checked != o.check()){
         return true;
      }
      return false;
   }
   MO.FUiTreeNode_getFullPath = function FUiTreeNode_getFullPath(){
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
}
with(MO){
   MO.FUiTreeNodeCell = function FUiTreeNodeCell(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick, MListenerDoubleClick);
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
      o._tree             = null;
      o._column           = null;
      o._level            = 0;
      o._node             = null;
      o._hImage           = null;
      o._hIcon            = null;
      o._hLabel           = null;
      o.onBuildPanel      = FUiTreeNodeCell_onBuildPanel;
      o.onBuild           = FUiTreeNodeCell_onBuild;
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiTreeNodeCell_onClick);
      o.onDoubleClick     = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiTreeNodeCell_onDoubleClick);
      o.construct         = FUiTreeNodeCell_construct;
      o.icon              = FUiTreeNodeCell_icon;
      o.setIcon           = FUiTreeNodeCell_setIcon;
      o.get               = FUiTreeNodeCell_get;
      o.set               = FUiTreeNodeCell_set;
      return o;
   }
   MO.FUiTreeNodeCell_onBuildPanel = function FUiTreeNodeCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
   }
   MO.FUiTreeNodeCell_onBuild = function FUiTreeNodeCell_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FUiControl.onBuild.call(o, p);
      var h = o._hPanel;
      o.attachEvent('onClick', h);
      o.attachEvent('onDoubleClick', h);
   }
   MO.FUiTreeNodeCell_onClick = function FUiTreeNodeCell_onClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processClickListener(p);
   }
   MO.FUiTreeNodeCell_onDoubleClick = function FUiTreeNodeCell_onDoubleClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processDoubleClickListener(p);
   }
   MO.FUiTreeNodeCell_construct = function FUiTreeNodeCell_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
      o._attributes = new TAttributes();
   }
   MO.FUiTreeNodeCell_icon = function FUiTreeNodeCell_icon(){
      return o._icon;
   }
   MO.FUiTreeNodeCell_setIcon = function FUiTreeNodeCell_setIcon(p){
      var o = this;
      var h = o._hIcon;
      if(!h){
         h = o._hIcon = RBuilder.appendIcon(o._hPanel, null, null, 16, 16)
      }
      h.src = RResource.iconPath(p);
   }
   MO.FUiTreeNodeCell_get = function FUiTreeNodeCell_get(){
   }
   MO.FUiTreeNodeCell_set = function FUiTreeNodeCell_set(p){
   }
}
with(MO){
   MO.FUiTreeNodeType = function FUiTreeNodeType(o){
      o = RClass.inherits(this, o, FUiComponent);
      o._code       = RClass.register(o, [new APtyString('_code'), new AGetSet('_code')]);
      o._storage    = RClass.register(o, [new APtyString('_storage'), new AGetSet('_storage')]);
      o._icon       = RClass.register(o, [new APtyString('_icon'), new AGetSet('_icon')]);
      o._service    = RClass.register(o, [new APtyString('_service'), new AGetSet('_service')]);
      o._action     = RClass.register(o, [new APtyString('_action'), new AGetSet('_action')]);
      o._attributes = RClass.register(o, [new APtyAttributes('_attributes'), AGetter('_attributes')]);
      o.construct   = FUiTreeNodeType_construct;
      o.get         = FUiTreeNodeType_get;
      o.set         = FUiTreeNodeType_set;
      o.innerDump   = FUiTreeNodeType_innerDump;
      return o;
   }
   MO.FUiTreeNodeType_construct = function FUiTreeNodeType_construct(){
      var o = this;
      o.__base.FUiComponent.construct.call(o);
   }
   MO.FUiTreeNodeType_get = function FUiTreeNodeType_get(name){
      var attributes = this._attributes;
      return attributes ? attributes.get(name) : null;
   }
   MO.FUiTreeNodeType_set = function FUiTreeNodeType_set(name, value){
      var attributes = this._attributes;
      if(attributes){
         attributes.set(name, value)
      }
   }
   MO.FUiTreeNodeType_innerDump = function FUiTreeNodeType_innerDump(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append('[code=',  o._code);
      s.append(', icon=',  o._icon);
      s.append(', service=', o._service);
      s.append(', action=', o._action);
      s.append(']');
   }
}
with(MO){
   MO.FUiTreeView = function FUiTreeView(o){
      o = RClass.inherits(this, o, FUiContainer);
      o._optionCheck        = RClass.register(o, new APtyBoolean('_optionCheck'), false);
      o._indent             = RClass.register(o, new APtyInteger('_indent'), 16);
      o._stylePanel         = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
      o._styleNodePanel     = RClass.register(o, new AStyle('_styleNodePanel', 'NodePanel'));
      o._styleNodeForm      = RClass.register(o, new AStyle('_styleNodeForm', 'NodeForm'));
      o._attributes         = null;
      o._nodeTypes          = null;
      o._nodeColumns        = null;
      o._nodeLevels         = null;
      o._nodes              = null;
      o._allNodes           = null;
      o._defaultNodeType    = null;
      o._focusNode          = null;
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
      o.lsnsEnter           = new TListeners();
      o.lsnsLeave           = new TListeners();
      o._listenersNodeClick = RClass.register(o, new AListener('_listenersNodeClick', EEvent.NodeClick));
      o.onBuildPanel        = FUiTreeView_onBuildPanel;
      o.onBuild             = FUiTreeView_onBuild;
      o.onNodeClick         = FUiTreeView_onNodeClick;
      o.onClick             = RClass.register(o, new AEventClick('onClick'), FUiTreeView_onClick);
      o.onNodeCheckClick    = RClass.register(o, new AEventClick('onNodeCheckClick'), FUiTreeView_onNodeCheckClick);
      o.construct           = FUiTreeView_construct;
      o.attributes          = FUiTreeView_attributes;
      o.nodeTypes           = FUiTreeView_nodeTypes;
      o.nodeColumns         = FUiTreeView_nodeColumns;
      o.nodeLevels          = FUiTreeView_nodeLevels;
      o.hasNode             = FUiTreeView_hasNode;
      o.focusNode           = FUiTreeView_focusNode;
      o.nodes               = FUiTreeView_nodes;
      o.findType            = FUiTreeView_findType;
      o.findByName          = FUiTreeView_findByName;
      o.findByGuid          = FUiTreeView_findByGuid;
      o.createChild         = FUiTreeView_createChild;
      o.createNode          = FUiTreeView_createNode;
      o.appendChild         = FUiTreeView_appendChild;
      o.appendNode          = FUiTreeView_appendNode;
      o.appendNodes         = FUiTreeView_appendNodes;
      o.selectNode          = FUiTreeView_selectNode;
      o.push                = FUiTreeView_push;
      o.removeNode          = FUiTreeView_removeNode;
      o.removeNodes         = FUiTreeView_removeNodes;
      o.freeNode            = FUiTreeView_freeNode;
      o.clearNodes          = FUiTreeView_clearNodes;
      o.nodeClick           = FUiTreeView_nodeClick;
      o.calculateHeight     = FUiTreeView_calculateHeight;
      o.fetchChangedChecks  = FUiTreeView_fetchChangedChecks;
      o.extendAuto          = FUiTreeView_extendAuto;
      o.extendAll           = FUiTreeView_extendAll;
      o.loadNode            = RMethod.empty;
      o.refresh             = FUiTreeView_refresh;
      o.filterNode          = FUiTreeView_filterNode;
      o.clearAllNodes       = FUiTreeView_clearAllNodes;
      o.clear               = FUiTreeView_clear;
      o.dispose             = FUiTreeView_dispose;
      return o;
   }
   MO.FUiTreeView_onBuildPanel = function FUiTreeView_onBuildPanel(e){
      var o = this;
      o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   }
   MO.FUiTreeView_onBuild = function FUiTreeView_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      o.attachEvent('onClick', hPanel);
      var hr = RBuilder.appendTableRow(o._hPanel);
      var hc = RBuilder.appendTableCell(hr);
      var hnp = o._hNodePanel = RBuilder.appendDiv(hc, o.styleName('NodePanel'));
      var hnf = o._hNodeForm = RBuilder.appendTable(hnp, o.styleName('NodeForm'));
      hnf.width = '100%';
      o._hHeadLine = RBuilder.appendTableRow(hnf);
      o._hNodeRows = hnf.children[0];
      var node = o._loadingNode = RClass.create(FUiTreeNode);
      node._tree = o;
      node._label = RContext.get('FUiTreeView:loading');
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
   MO.FUiTreeView_onNodeClick = function FUiTreeView_onNodeClick(event){
      var o = this;
   }
   MO.FUiTreeView_onClick = function FUiTreeView_onClick(s, e){
      var o = this;
      if(s.hSender == o._hNodePanel){
         var node = o._focusNode;
         if(node){
            node.select(false);
            o._focusNode = null;
         }
      }
   }
   MO.FUiTreeView_onNodeCheckClick = function FUiTreeView_onNodeCheckClick(s, e){
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
               for(var n = 0; n < pcc; n++){
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
   MO.FUiTreeView_construct = function FUiTreeView_construct(){
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
   MO.FUiTreeView_attributes = function FUiTreeView_attributes(){
      return this._attributes;
   }
   MO.FUiTreeView_nodeTypes = function FUiTreeView_nodeTypes(){
      return this._nodeTypes;
   }
   MO.FUiTreeView_nodeColumns = function FUiTreeView_nodeColumns(){
      return this._nodeColumns;
   }
   MO.FUiTreeView_nodeLevels = function FUiTreeView_nodeLevels(){
      return this._nodeLevels;
   }
   MO.FUiTreeView_hasNode = function FUiTreeView_hasNode(){
      return this._rootNode.hasChild();
   }
   MO.FUiTreeView_focusNode = function FUiTreeView_focusNode(){
      return this._focusNode;
   }
   MO.FUiTreeView_nodes = function FUiTreeView_nodes(){
      return this._nodes;
   }
   MO.FUiTreeView_findType = function FUiTreeView_findType(p){
      return this._nodeTypes.get(p);
   }
   MO.FUiTreeView_findByName = function FUiTreeView_findByName(p){
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
   MO.FUiTreeView_findByGuid = function FUiTreeView_findByGuid(guid){
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
   MO.FUiTreeView_createChild = function FUiTreeView_createChild(x){
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
   MO.FUiTreeView_appendChild = function FUiTreeView_appendChild(child){
      var o = this;
   }
   MO.FUiTreeView_createNode = function FUiTreeView_createNode(){
      var o = this;
      var node = o._freeNodes.pop();
      if(!node){
         node = RClass.create(FUiTreeNode);
         node._tree = o;
         node.build(o._hPanel);
      }
      RHtml.visibleSet(node._hPanel, true);
      o._allNodes.push(node);
      return node;
   }
   MO.FUiTreeView_appendNode = function FUiTreeView_appendNode(node, parent){
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
            RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr);
         }else{
            o._hNodeRows.appendChild(hPanel);
            RHtml.tableMoveRow(o._hNodeForm, hPanel.rowIndex, nr+1);
         }
         node.setLevel(parent._level + 1);
      }else{
         o._hNodeRows.appendChild(hPanel);
         node.setLevel(0);
      }
      node._statusLinked = true;
   }
   MO.FUiTreeView_appendNodes = function FUiTreeView_appendNodes(parent, config){
      parent = RObject.nvl(parent, this.workNode, this.rootNode);
      if(config && config._nodes){
         var count = config._nodes.count;
         if(count > 0){
            parent.child = true;
            parent.loaded = true;
            for(var n = 0; n < count; n++){
               var nc = config._nodes.get(n);
               if(nc && (nc.isName('Node') || nc.isName('TreeNode'))){
                  var tn = RClass.create(FUiTreeNode);
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
   MO.FUiTreeView_selectNode = function FUiTreeView_selectNode(n, s){
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
   MO.FUiTreeView_push = function FUiTreeView_push(control){
      var o = this;
      o.__base.FUiContainer.push.call(o, control);
      control._tree = o;
      if(RClass.isClass(control, FUiTreeColumn)){
         o._nodeColumns.set(control.name(), control);
      }else if(RClass.isClass(control, FUiTreeLevel)){
         o._nodeLevels.set(control.id(), control);
      }else if(RClass.isClass(control, FUiTreeNodeType)){
         o._nodeTypes.set(control.code(), control);
      }else if(RClass.isClass(control, FUiTreeNode)){
         o._nodes.push(control);
         o._allNodes.push(control);
         o.appendNode(control);
      }
   }
   MO.FUiTreeView_removeNode = function FUiTreeView_removeNode(oNode){
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
   MO.FUiTreeView_removeNodes = function FUiTreeView_removeNodes(node){
      node = RObject.nvl(node, this.workNode, this.rootNode);
      if(node.hasChild()){
         node.removeChildren();
      }
      node.remove();
   }
   MO.FUiTreeView_freeNode = function FUiTreeView_freeNode(node){
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
   MO.FUiTreeView_clearNodes = function FUiTreeView_clearNodes(node){
      if(node){
         node.removeChildren();
      }
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
   MO.FUiTreeView_nodeClick = function FUiTreeView_nodeClick(node){
      var o = this;
      var event = new SEvent();
      event.tree = o;
      event.node = node;
      o.onNodeClick(event);
      o.processNodeClickListener(event);
      event.dispose();
   }
   MO.FUiTreeView_calculateHeight = function FUiTreeView_calculateHeight(){
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
   MO.FUiTreeView_fetchChangedChecks = function FUiTreeView_fetchChangedChecks(){
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
   MO.FUiTreeView_extendAuto = function FUiTreeView_extendAuto(n){
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
   MO.FUiTreeView_extendAll = function FUiTreeView_extendAll(n, f){
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
   MO.FUiTreeView_refresh = function FUiTreeView_refresh(){
      var o = this;
      if(o.parentObj){
         o.parentObj.style.height = o.calculateHeight();
      }
   }
   MO.FUiTreeView_filterNode = function FUiTreeView_filterNode(pl, pa){
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
   MO.FUiTreeView_clearAllNodes = function FUiTreeView_clearAllNodes(){
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
   MO.FUiTreeView_clear = function FUiTreeView_clear(){
      var o = this;
      o.clearAllNodes();
   }
   MO.FUiTreeView_dispose = function FUiTreeView_dispose(){
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
}
with(MO){
   MO.FUiDialog = function FUiDialog(o){
      o = RClass.inherits(this, o, FUiWindow, MUiDescribeFrame);
      o.construct          = FUiDialog_construct;
      return o;
   }
   MO.FUiDialog_construct = function FUiDialog_construct(){
      var o = this;
      o.__base.FUiWindow.construct.call(o);
   }
}
with(MO){
   MO.FUiFramePage = function FUiFramePage(o){
      o = RClass.inherits(this, o, FUiContainer);
      o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
      o._hContainer     = null;
      o.onBuildPanel    = FUiFramePage_onBuildPanel;
      o.onBuild         = FUiFramePage_onBuild;
      o.oeResize        = FUiFramePage_oeResize;
      o.appendChild     = FUiFramePage_appendChild;
      o.removeChild     = FUiFramePage_removeChild;
      return o;
   }
   MO.FUiFramePage_onBuildPanel = function FUiFramePage_onBuildPanel(p){
      var o = this;
      var hPanel = o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
      hPanel.vAlign = 'top';
      hPanel.height = '100%';
   }
   MO.FUiFramePage_onBuild = function FUiFramePage_onBuild(p){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, p);
      var h = o._hPanel;
      if(o._scrollCd != EUiScroll.None){
         var hc = o._hContainer = RBuilder.appendDiv(h, o.styleName('Container'));
         RUiControl.setStyleScroll(hc, o._scrollCd);
      }else{
         o._hContainer = h;
      }
   }
   MO.FUiFramePage_oeResize = function FUiFramePage_oeResize(p){
      var o = this;
      var p = o._parent;
      if(p._directionCd == EUiDirection.Horizontal){
      }else if(p._directionCd == EUiDirection.Vertical){
      }else{
         throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
      }
      return EEventStatus.Continue;
   }
   MO.FUiFramePage_appendChild = function FUiFramePage_appendChild(control){
      var o = this;
      if(control._hPanel){
         o._hContainer.appendChild(control._hPanel);
      }
   }
   MO.FUiFramePage_removeChild = function FUiFramePage_removeChild(control){
      var o = this;
      o._hContainer.removeChild(control._hPanel);
   }
}
with(MO){
   MO.FUiFrameSet = function FUiFrameSet(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      o._sizeCd       = EUiSize.Fill;
      o._directionCd  = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection), EUiDirection.Vertical);
      o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
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
   MO.FUiFrameSet_onBuildPanel = function FUiFrameSet_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiFrameSet_construct = function FUiFrameSet_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._frames = new TObjects();
   }
   MO.FUiFrameSet_appendFrame = function FUiFrameSet_appendFrame(frame){
      var o = this;
      if(o._directionCd == EUiDirection.Horizontal){
         var hLine = o._hLine;
         if(!hLine){
            hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
         }
         frame.setPanel(hLine);
         var sizeWidth = frame._size.width;
         if(sizeWidth){
            frame._hPanel.width = sizeWidth;
         }
      }else if(o._directionCd == EUiDirection.Vertical){
         var hLine = RBuilder.appendTableRow(o._hPanel);
         frame.setPanel(hLine);
         var sizeHeight = frame._size.height;
         if(sizeHeight){
            frame._hPanel.height = sizeHeight;
         }
      }else{
         throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
      }
      o._frames.push(frame);
   }
   MO.FUiFrameSet_appendSpliter = function FUiFrameSet_appendSpliter(p){
      var o = this;
      var sp = null;
      if(p){
         sp = p;
      }else{
         sp = RClass.create(FUiFrameSpliter);
         sp.build(o._hPanel);
      }
      if(o._directionCd == EUiDirection.Horizontal){
         o._hLine.appendChild(sp._hPanel);
         sp._hPanel.style.width = '4px';
      }else if(o._directionCd == EUiDirection.Vertical){
         var hr = RBuilder.appendTableRow(o._hPanel);
         hr.appendChild(sp._hPanel);
         sp._hPanel.style.height = '4px';
      }else{
         throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
      }
      o._frames.push(sp);
      return sp;
   }
   MO.FUiFrameSet_appendChild = function FUiFrameSet_appendChild(p){
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
   MO.FUiFrameSet_dispose = function FUiFrameSet_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiFrameSpliter = function FUiFrameSpliter(o){
      o = RClass.inherits(this, o, FUiControl, MUiDragable);
      o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
      o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
      o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
      o._directionCd  = EUiDirection.Horizontal;
      o._alignCd      = EUiAlign.Left;
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
      o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
      o.onBuild       = FUiFrameSpliter_onBuild;
      o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
      o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
      o.onDoubleClick = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiFrameSpliter_onDoubleClick);
      o.onDragStart   = FUiFrameSpliter_onDragStart;
      o.onDragMove    = FUiFrameSpliter_onDragMove;
      o.onDragStop    = FUiFrameSpliter_onDragStop;
      o.construct     = FUiFrameSpliter_construct;
      o.alignCd       = FUiFrameSpliter_alignCd;
      o.setAlignCd    = FUiFrameSpliter_setAlignCd;
      o.sizeHtml      = FUiFrameSpliter_sizeHtml;
      o.setSizeHtml   = FUiFrameSpliter_setSizeHtml;
      o.changeVisible = FUiFrameSpliter_changeVisible;
      o.dispose       = FUiFrameSpliter_dispose;
      return o;
   }
   MO.FUiFrameSpliter_onBuildPanel = function FUiFrameSpliter_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
   }
   MO.FUiFrameSpliter_onBuild = function FUiFrameSpliter_onBuild(p){
      var o = this;
      o.__base.FUiControl.onBuild.call(o, p)
      var fs = o._frameset;
      var h = o._hPanel;
      h.style.zIndex = EUiLayer.Drap;
      h.__linker = o;
      var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
      hd.__linker = o;
      hd.style.position = 'absolute';
      RHtml.displaySet(hd, false);
      h.appendChild(hd);
      h.style.cursor = 'e-resize';
      h._plinker = o;
      o.attachEvent('onMouseEnter', h, o.onMouseEnter);
      o.attachEvent('onMouseLeave', h, o.onMouseLeave);
      o.attachEvent('onDoubleClick', h);
      o._hIcon = RBuilder.appendIcon(h, null, 'control.FSpliter_Left');
      RConsole.find(FDragConsole).register(o);
   }
   MO.FUiFrameSpliter_onMouseEnter = function FUiFrameSpliter_onMouseEnter(p){
      var o = this;
      var hc = o._hPanel;
      hc.className = o.styleName('Hover');
   }
   MO.FUiFrameSpliter_onMouseLeave = function FUiFrameSpliter_onMouseLeave(p){
      var o = this;
      var hc = o._hPanel;
      hc.className = o.styleName('Normal');
   }
   MO.FUiFrameSpliter_onDoubleClick = function FUiFrameSpliter_onDoubleClick(p){
      this.changeVisible();
   }
   MO.FUiFrameSpliter_onDragStart = function FUiFrameSpliter_onDragStart(e){
      var o = this;
      var hc = o._hPanel;
      var hd = o._hDrag;
      var hds = hd.style;
      if(o._directionCd == EUiDirection.Horizontal){
         o._dragClientX = e.clientX;
         o._dragPanelX = RHtml.clientX(hc);
         o._dragSizeX = o._hSize.offsetWidth;
         hds.cursor = EMouseCursor.HSize;
      }else if(o._directionCd == EUiDirection.Vertical){
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
      RWindow.setOptionSelect(false);
      RWindow.disable();
   }
   MO.FUiFrameSpliter_onDragMove = function FUiFrameSpliter_onDragMove(e){
      var o = this;
      var hd = o._hDrag;
      if(o._directionCd == EUiDirection.Horizontal){
         var x = e.clientX - o._dragClientX;
         var cx = o._dragPanelX + x;
         if(cx > o._sizeMin){
            hd.style.left = cx + 'px';
         }
      }else if(o._directionCd == EUiDirection.Vertical){
         var y = e.clientY - o._dragClientY;
         var cy = o._dragPanelY + y;
         if(cy > o._sizeMin){
            hd.style.top = cy + 'px';
         }
      }else{
         throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
      }
   }
   MO.FUiFrameSpliter_onDragStop = function FUiFrameSpliter_onDragStop(e){
      var o = this;
      var hd = o._hDrag;
      if(o._directionCd == EUiDirection.Horizontal){
         var x = e.clientX - o._dragClientX;
         var cx = 0;
         if(o._alignCd === EUiAlign.Left){
            cx = o._dragSizeX + x;
         }else if(o._alignCd === EUiAlign.Right){
            cx = o._dragSizeX - x;
         }else{
            throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
         }
         if(cx > o._sizeMin){
            o._hSize.style.width = cx + 'px';
         }
      }else if(o._directionCd == EUiDirection.Vertical){
         var y = e.clientY - o._dragClientY;
         var cy = o._dragSizeY + y;
         if(o._alignCd === EUiAlign.Top){
            cy = o._dragSizeY + y;
         }else if(o._alignCd === EUiAlign.Bottom){
            cy = o._dragSizeY - y;
         }else{
            throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
         }
         if(cy > o._sizeMin){
            o._hSize.style.width = cy + 'px';
         }
      }else{
         throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
      }
      RHtml.visibleSet(hd, false);
      RWindow.enable();
      RWindow.setOptionSelect(true);
   }
   MO.FUiFrameSpliter_construct = function FUiFrameSpliter_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
   }
   MO.FUiFrameSpliter_alignCd = function FUiFrameSpliter_alignCd(){
      return this._alignCd;
   }
   MO.FUiFrameSpliter_setAlignCd = function FUiFrameSpliter_setAlignCd(alignCd){
      var o = this;
      if(alignCd == EUiAlign.Left){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
      }else if(alignCd == EUiAlign.Right){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
      }else{
         throw new TError(o, 'Align type is invalid.');
      }
      o._alignCd = alignCd;
   }
   MO.FUiFrameSpliter_sizeHtml = function FUiFrameSpliter_sizeHtml(){
      return this._hSize;
   }
   MO.FUiFrameSpliter_setSizeHtml = function FUiFrameSpliter_setSizeHtml(p){
      this._hSize = p;
   }
   MO.FUiFrameSpliter_changeVisible = function FUiFrameSpliter_changeVisible(){
      var o = this;
      var hs = o._hSize;
      if(!hs){
         return;
      }
      var c = null;
      var v = RHtml.visibleGet(hs);
      if(v){
         RHtml.visibleSet(hs, false);
         if(o._alignCd == EUiAlign.Left){
            c = EUiAlign.Right;
         }else if(o._alignCd == EUiAlign.Right){
            c = EUiAlign.Left;
         }
      }else{
         RHtml.visibleSet(hs, true);
         if(o._alignCd == EUiAlign.Left){
            c = EUiAlign.Left;
         }else if(o._alignCd == EUiAlign.Right){
            c = EUiAlign.Right;
         }
      }
      if(c == EUiAlign.Left){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
      }else if(c == EUiAlign.Right){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
      }
      RConsole.find(FUiWorkspaceConsole).resize();
   }
   MO.FUiFrameSpliter_dispose = function FUiFrameSpliter_dispose(){
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
}
with(MO){
   MO.FUiWindow = function FUiWindow(o){
      o = RClass.inherits(this, o, FUiLayout, MMouseCapture);
      o._statusVisible      = false;
      o._stylePanel         = RClass.register(o, new AStyle('_stylePanel'));
      o._styleBodyForm      = RClass.register(o, new AStyle('_styleBodyForm'));
      o._styleTitleForm     = RClass.register(o, new AStyle('_styleTitleForm'));
      o._styleTitlePanel    = RClass.register(o, new AStyle('_styleTitlePanel'));
      o._styleBodyPanel     = RClass.register(o, new AStyle('_styleBodyPanel'));
      o._styleStatusPanel   = RClass.register(o, new AStyle('_styleStatusPanel'));
      o._mousePosition      = null;
      o._mouseControl       = null;
      o.onBuildPanel        = FUiWindow_onBuildPanel;
      o.onBuild             = FUiWindow_onBuild;
      o.onMouseCaptureStart = FUiWindow_onMouseCaptureStart;
      o.onMouseCapture      = FUiWindow_onMouseCapture;
      o.onMouseCaptureStop  = FUiWindow_onMouseCaptureStop;
      o.construct      = FUiWindow_construct;
      o.setVisible     = FUiWindow_setVisible;
      o.setLabel       = FUiWindow_setLabel;
      o.showPosition   = FUiWindow_showPosition;
      return o;
   }
   MO.FUiWindow_onBuildPanel = function FUiWindow_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createDiv(event, o.styleName('Panel'));
      var hForm = o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
      hForm.style.width = '100%';
      hForm.style.height = '100%';
   }
   MO.FUiWindow_onBuild = function FUiWindow_onBuild(event){
      var o = this;
      o.__base.FUiLayout.onBuild.call(o, event);
      var hPanel = o._hPanel;
      var hBodyForm = o._hBodyForm = RBuilder.appendTable(hPanel, o.styleName('BodyForm'));
      var hTitlePanel = o._hTitlePanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
      hTitlePanel.__linker = o;
      var hBodyPanel = o._hBodyPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
      hBodyPanel.vAlign = 'top'
      o._hStatusPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
      var hTitleForm = o._hTitleForm = RBuilder.appendTable(hTitlePanel, o.styleName('TitleForm'));
      var hTitleLine = RBuilder.appendTableRow(hTitleForm);
      var hTitle = o._hTitle = RBuilder.appendTableCell(hTitleLine);
      hTitle.align = 'center';
      RHtml.textSet(hTitle, o._label);
      var hTitleButton = RBuilder.appendTableCell(hTitleLine);
      hTitleButton.width = 20;
      hBodyPanel.appendChild(o._hPanelForm);
      o.refreshSize();
   }
   MO.FUiWindow_onMouseCaptureStart = function FUiWindow_onMouseCaptureStart(event){
      var o = this;
      o._mouseDraging = true;
      o._mousePosition.set(event.x, event.y);
      o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
      RHtml.cursorSet(o._hPanel, EUiCursor.Move);
   }
   MO.FUiWindow_onMouseCapture = function FUiWindow_onMouseCapture(event){
      var o = this;
      if(o._mouseDraging){
         var cx = event.x - o._mousePosition.x;
         var cy = event.y - o._mousePosition.y;
         o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
         o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
      }
   }
   MO.FUiWindow_onMouseCaptureStop = function FUiWindow_onMouseCaptureStop(event){
      var o = this;
      o._mouseDraging = false;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FUiWindow_construct = function FUiWindow_construct(){
      var o = this;
      o.__base.FUiLayout.construct.call(o);
      o._mousePosition = new SPoint2();
      o._mouseControl = new SPoint2();
      RConsole.find(FMouseConsole).register(o);
   }
   MO.FUiWindow_setVisible = function FUiWindow_setVisible(visible){
      var o = this;
      o._statusVisible = visible;
      var hPanel = o.panel(EPanel.Container);
      if(visible){
         RWindow._hContainer.appendChild(hPanel);
      }else{
         RWindow._hContainer.removeChild(hPanel);
      }
   }
   MO.FUiWindow_setLabel = function FUiWindow_setLabel(label){
      var o = this;
      o.__base.FUiLayout.setLabel.call(o, label)
      RHtml.textSet(o._hTitle, o._label);
   }
   MO.FUiWindow_showPosition = function FUiWindow_showPosition(positionCd){
      var o = this;
      o.show();
      if(positionCd == EUiPosition.Center){
         var width = o._hPanel.offsetWidth;
         var height = o._hPanel.offsetHeight;
         var left = (window.document.body.offsetWidth - width) / 2;
         var top = (window.document.body.offsetHeight - height) / 2;
         o._hPanel.style.left = left + 'px';
         o._hPanel.style.top = top + 'px';
      }
   }
   MO.FUiWindow_doFocus = function FUiWindow_doFocus(){
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
   MO.FUiWindow_oeVisible = function FUiWindow_oeVisible(e){
      var o = this;
      o.__base.FUiLayout.oeVisible.call(o, e);
      if(e.isAfter()){
         o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
         o.hPanel.style.display = 'block';
      }
   }
   MO.FUiWindow_panel = function FUiWindow_panel(t){
      var o = this;
      if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
         return o.hPanel;
      }else if(EPanel.Move == t){
         return o.hTitleForm;
      }
      return o.__base.FUiLayout.panel.call(o, t);
   }
   MO.FUiWindow_dump = function FUiWindow_dump(oCtl, sLeft){
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
   MO.FUiWindow_pushAllControl = function FUiWindow_pushAllControl(oCtl){
      if(!this.allControls){this.allControls = new Array();}
      this.allControls.push(oCtl);
   }
   MO.FUiWindow_control = function FUiWindow_control(sName){
      if(this.allControls){
         for(var n=0; n<this.allControls.length; n++){
            if(this.allControls[n].name == sName){
               return this.allControls[n];
            }
         }
      }
      return null;
   }
   MO.FUiWindow_restore = function FUiWindow_restore(){
      this.max(true);
   }
   MO.FUiWindow_processResize = function FUiWindow_processResize(){
      if(!SystemManager.runMode){
         var oRect = this.rect()
         this.width = oRect.width();
         this.height = oRect.height();
      }
      this.processEvent(this, IWindowEvent.RESIZE);
   }
   MO.FUiWindow_fillAllControl = function FUiWindow_fillAllControl(){
      var oControl = null;
      var nCount = this.controls.size();
      for(var n=0; n<nCount; n++){
         oControl = this.controls.value(n);
         if(oControl.fill){
            oControl.fill();
         }
      }
   }
   MO.FUiWindow_refresh = function FUiWindow_refresh(bConfig){
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
   MO.FUiWindow_initialize = function FUiWindow_initialize(){
      if(this.allControls){
         for(var n=0; n<this.allControls.length; n++){
            var oCtl = this.allControls[n];
            if(oCtl.initialize){oCtl.initialize();}
            if(oCtl.initializeControl){oCtl.initializeControl();}
         }
      }
   }
   MO.FUiWindow_release = function FUiWindow_release(){
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
   MO.FUiWindow_stopDropExecute = function FUiWindow_stopDropExecute(oSource){
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
   MO.FUiWindow_selectDsExecute = function FUiWindow_selectDsExecute(oSource){
      if(oSource && oSource.constructor == FDatasetCtl){
         var bRefresh = (DatasetManager.activeDsCtl != oSource);
         DatasetManager.activeDsCtl = oSource;
         if(bRefresh){
            DatasetManager.refreshToolbar();
         }
      }
   }
   MO.FUiWindow_dispose = function FUiWindow_dispose(){
      var o = this;
      o.__base.FUiLayout.dispose.call(o);
      o.__base.MWinBorder.dispose.call(o);
      o.hBorderForm = null;
   }
}
