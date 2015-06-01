/**************************************************************
 * 树目录里一个节点的类，主要定义一个节点的显示图标，注释，子节点
 * 模板:
 *  hPanel<TR>
 * ┌---------------------------------------------┬-------------┐
 * │ hNodePanel<TD>                              │             │
 * │┌-----------┐┌----------┐┌------------┐│             │
 * ││hImage<IMG>││hIcon<IMG>││hLabel<SPAN>││(Other cells)│
 * │└-----------┘└----------┘└------------┘│             │
 * └---------------------------------------------┴-------------┘
 *
 * @class FControl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FSideButton(o){
   o = RClass.inherits(this, o, FControl);
   o.action           = RClass.register(o, new TPtyStr('action'));
   o.onButtonClick    = RClass.register(o, new HClick('onButtonClick'), FSideButton_onButtonClick);
   o.onButtonHover    = RClass.register(o, new HMouseOver('onButtonHover'), FSideButton_onButtonHover);
   o.onButtonOut      = RClass.register(o, new HMouseOut('onButtonOut'), FSideButton_onButtonOut);
   o.icon             = RClass.register(o, new TPtyBool('icon'));
   /// @style
   o.stTitleForm      = RClass.register(o, new TStyle('TitleForm'));
   /// @property
   o.hPanel           = null;
   o.hDataPanel       = null;
   o.hDataDiv         = null;
   o.hTitlePanel      = null;
   o.hTitleForm       = null;
   // event
   o.oeBuild          = FSideButton_oeBuild;
   o.build            = FSideButton_build;
   o.onBuildPanel     = FSideButton_onBuildPanel;
   o.onDataDisplay    = FSideButton_onDataDisplay;
   // method
   o.appendBody       = FSideButton_appendBody;
   o.select           = FSideButton_select;
   o.show             = FSideButton_show;
   o.hide             = FSideButton_hide;
   o.dispose          = FSideButton_dispose;
   return o;
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_oeBuild(event){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, event);
   return r;
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_build(){
   var o = this;
   var hp = o.hPanel;
   var hc1 = o.hTitelPanel = hp.insertRow().insertCell();
   hc1.height = '1';
   var hc2 = o.hDataPanel = hp.insertRow().insertCell();
   hc2.vAlign = 'top'
   var htf = o.hTitleForm = RBuilder.appendTable(hc1);
   htf.width = '100%';
   htf.height = '100%';
   htf.className = o.style('TitleForm');
   //htf.style.backgroundColor = '#dcf7ff';
   htf.style.cursor = 'hand';
   htf.style.border = '1px solid #8ce1f5';
   htf.height = '20'
   htf.vAlign = 'top';
   hc2.innerText = '';
   var htr = htf.insertRow();
   var htc1 = htr.insertCell();
   htc1.style.padding = '0, 4';
   var htc2 = htr.insertCell();
   var htc3 = htr.insertCell();
   htc1.width = '20';
   o.hIcon = RBuilder.appendIcon(htc1, null, null, 16, 16);
   if(o.icon){
      o.hIcon.src = o.styleIconPath(o.icon);
   }else{
      o.hIcon.src = '../../../ats/00/rs/icon/ctl/FSideButton_Default.gif';
   }
   htc2.style.fontSize = 13;
   htc2.innerText = o.label;
   htc2.width = '100%'
   htc3.width = '20';
   o.hExt = RBuilder.appendIcon(htc3, null, null, 16, 16);
   o.hExt.align = 'right';
   //o.hExt.style.border='0px solid red';
   o.hExt.src = '../../../ats/00/rs/icon/ctl/FSideButton_extend2.gif';
   //o.hDataPanel.style.display = 'none';
   o.attachEvent('onButtonClick', o.hTitleForm);
   o.attachEvent('onButtonHover', o.hTitleForm);
   o.attachEvent('onButtonOut', o.hTitleForm);
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.newTable();
   h.width = '100%';
   h.height = '100%';
   //h.style.border = '2px solid BLUE';
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_onButtonClick(e){
   var o = this;
   o.parent.select(o);
   if(o.action){
      eval(o.action);
   }
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_onDataDisplay(){
   var o = this;
   var t = o.activeDisplay;
   o.hDataPanel.style.height = t.count;
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_onButtonHover(e){
   var o = this;
   o.hTitleForm.style.backgroundColor='#dcf7ff';
}
/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_onButtonOut(e){
   var o = this;
   o.hTitleForm.style.backgroundColor='#dcf7ff';
}
function FSideButton_appendBody(h){
   this.hDataPanel.appendChild(h);
}

/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_select(s){
   var o = this;
// o.hDataPanel.style.height = 0;
// var t = new TActive();
// var a = o.activeDisplay = new TActive(o, o.ffd);
// a.status = EActive.Active;
// RConsole.find(FActiveConsole).push(a);
 //var s = o.hDataPanel.style.display;
   if(s){
      o.hParent.height = null;
      o.hDataPanel.style.display = 'block';
      o.hExt.src = '../../../ats/00/rs/icon/ctl/FSideButton_extend1.gif';
   }else{
      o.hDataPanel.style.display = 'none';
      o.hExt.src = '../../../ats/00/rs/icon/ctl/FSideButton_extend2.gif';
      o.hParent.height = 1;
   }
}

/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_show(){
   var o = this;
   o.hPanel.style.display = 'block';
}

/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_hide(){
   var o = this;
   o.hPanel.style.display = 'none';
}

/**************************************************************
 * 鼠标移到节点上时触发的函数
 *
 * @method
 * @see RClass.isClass
 **************************************************************/
function FSideButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hTitelPanel);
   RMemory.freeHtml(o.hTitleForm);
   RMemory.freeHtml(o.hDataPanel);
   RMemory.freeHtml(o.hIcon);
   o.hTitelPanel = null;
   o.hTitleForm = null;
   o.hDataPanel = null;
   o.hIcon = null;
}
