/**************************************************************
 * 创建Window的接口
 *
 * @face
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MPopBorder(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.isDialog        = false;
   o.titleBlur       = true;
   // Html
   o.hTitlePanel     = null;
   o.hBody           = null;
   o.hBodyPanel      = null;
   o.hBorder         = null;
   o.hBorderTb       = null;
   o.hCaption        = null;
   o.hClose          = null;
   o.hIcon           = null;
   o.hMax            = null;
   o.hMin            = null;
   o.hTitle          = null;
   // Html Event
   o.ohMin           = MPopBorder_ohMin;
   o.ohMax           = MPopBorder_ohMax;
   o.ohClose         = MPopBorder_ohClose;
   // Process
   o.oeBuild         = MPopBorder_oeBuild;
   // Event
   o.onBuildPanel    = MPopBorder_onBuildPanel;
   o.onSize          = MPopBorder_onSize;
   o.onFocus         = MPopBorder_onFocus;
   o.onBlur          = MPopBorder_onBlur;
   o.onMin           = MPopBorder_onMin;
   o.onMax           = MPopBorder_onMax;
   o.onClose         = MPopBorder_onClose;
   // Method
   o.min             = MPopBorder_min;
   o.max             = MPopBorder_max;
   o.close           = MPopBorder_close;
   o.buildBorderCell = MPopBorder_buildBorderCell;
   o.startDrag       = MPopBorder_startDrag;
   o.stopDrag        = MPopBorder_stopDrag;
   o.inSizeRange     = MPopBorder_inSizeRange;
   o.setIcon         = MPopBorder_setIcon;
   o.setCaption      = MPopBorder_setCaption;
   o.bringToFront    = MPopBorder_bringToFront;
   o.borderStyle     = MPopBorder_borderStyle;
   return o;
}

/**************************************************************
 * 相应鼠标的缩小按键
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MPopBorder_ohMin(){
   var o = this.link;
   if(RClass.isClass(o, MPopBorder)){
      o.onMin();
   }
}

/**************************************************************
 * 相应鼠标的放大按键
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MPopBorder_ohMax(){
   var o = this.link;
   if(RClass.isClass(o, MPopBorder)){
      o.onMax();
   }
}

/**************************************************************
 * 相应鼠标的关闭按键
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MPopBorder_ohClose(){
   var o = this.link;
   if(RClass.isClass(o, MPopBorder)){
      o.onClose();
   }
}

/**************************************************************
 * 构建window边框
 *
 * @method
 **************************************************************/
function MPopBorder_oeBuild(event){
   var o = this;
   if(event.isBefore()){
      // Console
      var mc = RConsole.find(FMoveConsole);
      var sc = RConsole.find(FSizeConsole);
      //var p3 = mc.nextPoint();
      // Border
      var hTab = o.hBorder = o.hPanel;
      hTab.link = o;
      hTab.className = o.borderStyle('Panel');
      hTab._sizeable = true;
      sc.registerDrag(o, hTab);
      // Build top row
      var hRow = hTab.insertRow();
      hRow.height = EMoveSize.InnerBorder;
      o.buildBorderCell(hRow, true);
      o.buildBorderCell(hRow);
      o.buildBorderCell(hRow);
      // Build title row
      var hRow = hTab.insertRow();
      hRow.height = 1;
      o.buildBorderCell(hRow);
      o.hTitlePanel = hRow.insertCell();
      o.buildBorderCell(hRow);
      // Build body row
      var hRow = hTab.insertRow();
      o.buildBorderCell(hRow);
      o.hBodyPanel = hRow.insertCell();
      o.buildBorderCell(hRow);
      // Build bottom row
      var hRow = hTab.insertRow();
      hRow.height = EMoveSize.InnerBorder;
      o.buildBorderCell(hRow);
      o.buildBorderCell(hRow);
      o.buildBorderCell(hRow, true);
      // Title
      var h = o.hTitle = RBuilder.appendTable(o.hTitlePanel, o.borderStyle('Title'), 0, 2, 1);
      h.link = o;
      h.ondblclick = o.ohMin;
      mc.registerDrag(o, h);
      // Title Row
      var hRow = o.hTitle.insertRow();
      hRow.valign = 'bottom';
      // Title Icon Cell
      var hIconCell = hRow.insertCell();
      hIconCell.align = 'center';
      hIconCell.width = 20;
      // Title Icon
      var hObj = o.hIcon = RBuilder.appendIcon(hIconCell, 'ctl.form-table');
      hObj.link = o;
      // Title Caption
      var h = o.hCaption = hRow.insertCell();
      h.link = o;
      h.className = o.borderStyle('Caption');
      h.innerText = RString.nvl(o.caption, 'Empty - Window');
      if(!o.isDialog){
         // Title Min Button
         h = o.hMin = hRow.insertCell();
         h.link = o;
         h.className = o.borderStyle('Button');
         h.innerText = '0';
         h.onclick = o.ohMin;
         // Title Max Button
         h = o.hMax = hRow.insertCell();
         h.link = o;
         h.className = o.borderStyle('Button');
         h.innerText = '1';
         h.onclick = o.ohMax;
      }
      // Title Close Button
      h = o.hClose = hRow.insertCell();
      h.link = o;
      h.className = o.borderStyle('Button');
      h.innerText = 'r';
      h.onclick = o.ohClose;
      // Body
      h = o.hPanel = o.hBody = RBuilder.append(o.hBodyPanel, 'DIV', 'MPopBorder_Body');
      h.link = o;
      h.isInnerBody = true;
   }
}

/**************************************************************
 * ???
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MPopBorder_onBuildPanel(){
   this.hPanel = RBuilder.appendTable();
   this.hPanel.style.display = 'none';
}

/**************************************************************
 * 处理获得焦点
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function MPopBorder_onFocus(){
   var mc = IConsole.find(IMoveConsole);
   this.hBorder.style.zIndex = mc.nextLayer();
   this.hTitle.className = 'MPopBorder_titleHover';
}
// ------------------------------------------------------------
function MPopBorder_onBlur(){
   var o = this;
   if(o.titleBlur){
      o.hTitle.className = o.borderStyle('Title');
   }
}
// ------------------------------------------------------------
function MPopBorder_onMin(){
   alert('Min');
}
// ------------------------------------------------------------
function MPopBorder_onMax(){
   alert('Max');
}
// ------------------------------------------------------------
function MPopBorder_onClose(){
   alert('Close');
}
// ------------------------------------------------------------
function MPopBorder_inSizeRange(hObj){
   return hObj._sizeable;
}
// ------------------------------------------------------------
function MPopBorder_min(){
   this.onMin();
}
// ------------------------------------------------------------
function MPopBorder_max(){
   this.onMax();
}
// ------------------------------------------------------------
function MPopBorder_close(){
   this.onClose();
}
// ------------------------------------------------------------
function MPopBorder_onSize(){
}
// ------------------------------------------------------------
function MPopBorder_buildBorderCell(hRow, img, height){
   var o = this;
   var h = hRow.insertCell();
   h.className = o.borderStyle('Inner');
   h._sizeable = true;
   h.width = 1;
   if(img){
      var hImg = RBuilder.appendEmpty(h, EMoveSize.InnerBorder, EMoveSize.InnerBorder);
      hImg._sizeable = true;
   }
   return h;
}
// ------------------------------------------------------------
function MPopBorder_startDrag(type){
   var o = this;
   if(EDrag.Move == type){
      o.onBlur();
      o.hBody.className = o.borderStyle('BodyHover');
      o.hBorder.style.zIndex = RLayer.next();
   }
}
// ------------------------------------------------------------
function MPopBorder_stopDrag(type){
   if(EDrag.Move == type){
      var o = this;
      o.hBody.className = o.borderStyle('Body');
      o.hBorder.style.zIndex = RLayer.next();
   }
}
// ------------------------------------------------------------
function MPopBorder_setIcon(s){
   this.hIcon.src = RRes.iconPath(s);
}
// ------------------------------------------------------------
function MPopBorder_setCaption(s){
   this.hCaption.innerText = s;
}
// ------------------------------------------------------------
function MPopBorder_bringToFront(){
   this.hBorder.style.zIndex = RLayer.next();
}
// ------------------------------------------------------------
// name
function MPopBorder_borderStyle(n){
   return RClass.find(MPopBorder).style(n);
}
