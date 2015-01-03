/**************************************************************
 * 实现窗口的边框控件接口
 * 模板:
 *  hPanel<TABLE>
 * ┌┬------------------------------------------------------------┬┐
 * ├┼------------------------------------------------------------┼┤
 * ││                                             hTitlePanel<TD>││
 * ││hTitleForm<TABLE>                                           ││
 * ││┌----------┬------------┬--------┬--------┬----------┐││
 * │││hIcon<IMG>│hCaption<TD>│hMin<TD>│hMax<TD>│hClose<TD>│││
 * ││└----------┴------------┴--------┴--------┴----------┘││
 * ├┼------------------------------------------------------------┼┤
 * ││                                              hBodyPanel<TD>││
 * ││hBody<DIV>                                                  ││
 * ││┌--------------------------------------------------------┐││
 * ││└--------------------------------------------------------┘││
 * ├┼------------------------------------------------------------┼┤
 * └┴------------------------------------------------------------┴┘
 *
 * @face
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MWinBorder(o){
   o = RClass.inherits(this, o);
   /// @style
   o.stBorderForm    = RClass.register(o, new TStyle('BorderForm'));
   o.stInner         = RClass.register(o, new TStyle('Inner'));
   o.stTitlePanel    = RClass.register(o, new TStyle('TitlePanel'));
   o.stTitleForm     = RClass.register(o, new TStyle('TitleForm'));
   o.stBodyPanel     = RClass.register(o, new TStyle('BodyPanel'));
   o.stCaption       = RClass.register(o, new TStyle('Caption'));
   o.stButton        = RClass.register(o, new TStyle('Button'));
   o.stBodyHover     = RClass.register(o, new TStyle('BodyHover'));
   // Attribute
   o.isDialog        = false;
   o.titleBlur       = true;
   // Html
   o.hBody           = null;
   o.hBodyPanel      = null;
   o.hBorder         = null;
   o.hBorderTb       = null;
   o.hIcon           = null;
   o.hTitle          = null;
   o.hTitlePanel     = null;
   o.hCaption        = null;
   o.hMinPanel       = null;
   o.hMinIcon        = null;
   o.hMaxPanel       = null;
   o.hMaxIcon        = null;
   o.hClosePanel     = null;
   o.hCloseIcon      = null;
   // Html Event
   o.onBuildPanel    = MWinBorder_onBuildPanel;
   o.onMinClick      = RClass.register(o, new HClick('onMinClick'), MWinBorder_onMinClick);
   o.onMaxClick      = RClass.register(o, new HClick('onMaxClick'), MWinBorder_onMaxClick);
   o.onCloseClick    = RClass.register(o, new HClick('onCloseClick'), MWinBorder_onCloseClick);
   o.onCloseHover    = RClass.register(o, new HMouseEnter('onCloseHover'), MWinBorder_onCloseHover);
   o.onCloseLeave    = RClass.register(o, new HMouseLeave('onCloseLeave'), MWinBorder_onCloseLeave);
   // Event
   o.onSize          = MWinBorder_onSize;
   o.onFocus         = MWinBorder_onFocus;
   o.onBlur          = MWinBorder_onBlur;
   // Process
   o.buildBorder     = MWinBorder_buildBorder;
   // Method
   o.min             = MWinBorder_min;
   o.max             = MWinBorder_max;
   o.close           = MWinBorder_close;
   o.buildBorderCell = MWinBorder_buildBorderCell;
   o.startDrag       = MWinBorder_startDrag;
   o.stopDrag        = MWinBorder_stopDrag;
   o.inSizeRange     = MWinBorder_inSizeRange;
   o.setIcon         = MWinBorder_setIcon;
   o.setCaption      = MWinBorder_setCaption;
   o.bringToFront    = MWinBorder_bringToFront;
   o.dispose         = MWinBorder_dispose;
   return o;
}

// *********************************************************
// <T>建立窗口的浮动边框。</T>
//
// @method
// *********************************************************
function MWinBorder_buildBorder(){
   var o = this;
   // Console
   var mc = RConsole.find(FMoveConsole);
   var sc = RConsole.find(FSizeConsole);
   //var p3 = mc.nextPoint();
   // Border
   var hp = o.hPanel;
   //hb.link = o;
   //hb.className = o.style('Panel');
   //hb._sizeable = true;
   //sc.registerDrag(o, hb);
   // Build title row
   var b = o.border;
   var htp = o.hTitlePanel = b.hTitle;
   htp.style.paddingLeft  = 1;
   htp.style.paddingTop  = 0;
   htp.style.paddingRight  = 1;
   // Build body row
   var hbp = o.hBodyPanel = b.hPanel;
   hbp.className = o.style('BodyPanel');
   // Title
   var htf = o.hTitleForm = RBuilder.appendTable(htp, null, 0, 0, 0);
   htf.height = "25px";
   htf.width = "100%";
   htf.link = o;
   htf.style.cursor = 'move';
   //htf.ondblclick = o.ohMin;
   mc.registerDrag(o, htf);
   // 建立图标和文字标题
   var hr = htf.insertRow();
   var hc1 = hr.insertCell();
   var s = o.styleIconPath('Title_Bg', FWindow);
   hc1.style.backgroundImage = 'url('+s+')';
   var hTab1 = RBuilder.appendTable(hc1, null, 0, 0, 0);
   var htr = hTab1.insertRow();
   htr.valign = 'bottom';
      // 建立标题栏的图标底板
      var hic = htr.insertCell();
      hic.align = 'center';
      hic.width = 20;
      // 建立标题栏的图标
      var hi = o.hIcon = RBuilder.appendIcon(hic, 'ctl.form-table');
      hi.link = o;
      // 建立标题栏的文字
      var hcc = o.hCaption = htr.insertCell();
      hcc.link = o;
      hcc.innerText = RString.nvl(o.caption, 'Empty - Window');
      hcc.style.color = '#FFFFFF';
   // 建立关闭按钮标题
   var hc2 = hr.insertCell();
   var s = o.styleIconPath('Close_Bg', FWindow);
   hc2.style.backgroundImage = 'url('+s+')';
   hc2.width = "200px";
   var hTab2 = RBuilder.appendTable(hc2, null, 0, 0, 2);
   hTab2.style.cursor = 'auto';
   hTab2.vAlign = "center";
   hTab2.align = "right"; 
   var r2 = hTab2.insertRow();
   if(o.isDialog){
      // 建立最小化图标
      var hmp = o.hMinPanel = r2.insertCell();
      var hmi = o.hMinIcon = RBuilder.appendImage(hmp);
      hmi.src =  o.styleIconPath('Min_Icon', FWindow);
      o.attachEvent('onMinClick', hmi);
      // 建立最大化图标
      var hmp = o.hMaxPanel = r2.insertCell();
      var hmi = o.hMaxIcon = RBuilder.appendImage(hmp);
      hmi.src =  o.styleIconPath('Max_Icon', FWindow);
      o.attachEvent('onMaxClick', hmi);
   }
   // 建立关闭图标
   var hcp = o.hClosePanel = r2.insertCell();
   hcp.style.vAlign='top';
   var hci = o.hCloseIcon = RBuilder.appendImage(hcp);
   hci.src =  o.styleIconPath('Close_Icon', FWindow);
   o.attachEvent('onCloseClick', hci);
   o.attachEvent('onCloseHover', hci);
   o.attachEvent('onCloseLeave', hci);
}

// *********************************************************
// <T>建立窗口的底板。</T>
//
// @method
// *********************************************************
function MWinBorder_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.appendTable();
   o.hPanel.style.display = 'none';
}

//*********************************************************
//<T>建立窗口的底板。</T>
//
//@method
//*********************************************************
function MWinBorder_onCloseHover(){
   var o = this;
   o.hCloseIcon.style.cursor='hand';
   o.hCloseIcon.src = o.styleIconPath('Close_IconPress', FWindow);
}

//*********************************************************
//<T>建立窗口的底板。</T>
//
//@method
//*********************************************************
function MWinBorder_onCloseLeave(){
   var o = this;
   o.hCloseIcon.src = o.styleIconPath('Close_Icon', FWindow);
}

/**************************************************************
 * 处理获得焦点
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MWinBorder_onFocus(){
   var o = this;
   var mc = IConsole.find(IMoveConsole);
   o.hBorder.style.zIndex = mc.nextLayer();
   //o.hTitleForm.className = 'MWinBorder_titleHover';
}

// ------------------------------------------------------------
function MWinBorder_onBlur(){
   var o = this;
   if(o.titleBlur){
      //o.hTitleForm.className = o.style('TitleForm');
   }
}

// ------------------------------------------------------------
function MWinBorder_onMinClick(){
   //alert('Min');
}

// ------------------------------------------------------------
function MWinBorder_onMaxClick(){
   //alert('Max');
}

// ------------------------------------------------------------
function MWinBorder_onCloseClick(){
   this.hide();
}

// ------------------------------------------------------------
function MWinBorder_inSizeRange(hObj){
   return hObj._sizeable;
}

// ------------------------------------------------------------
function MWinBorder_min(){
}

// ------------------------------------------------------------
function MWinBorder_max(){
}

// ------------------------------------------------------------
function MWinBorder_close(){
}

// ------------------------------------------------------------
function MWinBorder_onSize(){
}

// ------------------------------------------------------------
function MWinBorder_buildBorderCell(hr, img, height){
   var o = this;
   var h = hr.insertCell();
   h.className = o.style('Inner');
   h._sizeable = true;
   h.width = 1;
   if(img){
      var hi = RBuilder.appendEmpty(h, EMoveSize.InnerBorder, EMoveSize.InnerBorder);
      hi._sizeable = true;
   }
   return h;
}

// ------------------------------------------------------------
function MWinBorder_startDrag(type){
   var o = this;
   if(EDrag.Move == type){
      o.onBlur();
      //o.hBodyPanel.className = o.style('BodyHover');
      o.hPanel.style.zIndex = RLayer.next();
      //o.hBodyPanel.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=30)';
      //o.hBodyPanel.style.border = '1 solid red';
   }
}

// ------------------------------------------------------------
function MWinBorder_stopDrag(type){
   var o = this;
   if(EDrag.Move == type){
      o.hBodyPanel.className = o.style('BodyPanel');
      o.hPanel.style.zIndex = RLayer.next();
      //o.hBodyPanel.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
   }
}

// ------------------------------------------------------------
function MWinBorder_setIcon(s){
//   this.hIcon.src = RRes.iconPath(s);
   this.hIcon.src = this.styleIconPath(s);
}

// ------------------------------------------------------------
function MWinBorder_setCaption(s){
   this.hCaption.innerText = s;
}

// ------------------------------------------------------------
function MWinBorder_bringToFront(){
   this.hBorder.style.zIndex = RLayer.next();
}

// =========================================================
function MWinBorder_dispose(){
   var o = this;
   o.hTitlePanel = null;
   o.hBodyPanel = null;
   o.hBorder = null;
   o.hTitleForm = null;
   o.hIcon = null;
   o.hCaption = null;
}
