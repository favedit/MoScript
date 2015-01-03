/*******************************************************************************
 * Window提示框
 * 
 * @class
 * @face FContaine
 * @author maochunyang
 * @version 1.0.1
 ******************************************************************************/
function FHintWindow(o){
   o = RClass.inherits(this, o, FControl);   
   //html
   o.hPanel       = null;
   o.hForm        = null;
   o.hTitleRow    = null;
   o.hTitleTd     = null;
   o.hBoxRow      = null;
   o.hBoxTd       = null;   
   //attribute
   o.linkObj      = null;
   //method
   o.oeBuild      = FHintWindow_oeBuild;
   o.onBuildPanel = FHintWindow_onBuildPanel;
   o.linkControl  = FHintWindow_linkControl;
   o.show         = FHintWindow_show;
   o.hide         = FHintWindow_hide;
   o.setPosition  = FHintWindow_setPosition;
   o.dispose      = FHintWindow_dispose;
   return o;
}
//建立HTML元素
function FHintWindow_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isBefore()){
      var f = o.hForm  = RBuilder.appendTable(o.hPanel);
      //标题栏
      var tRow = o.hTitleRow = f.insertRow();
      var tTd  = o.hTitleTd  = tRow.insertCell();
      tTd.width = '100';
      tTd.vAlign = 'center';
      tTd.height = '40';
      //内容栏
      var bRow = o.hBoxRow   = f.insertRow();
      var bTd  = o.hBoxTd = bRow.insertCell();
   }
   return EEventStatus.Continue;
}
//建立HTML元素
function FHintWindow_onBuildPanel(){
   var hp = this.hPanel = RBuilder.appendDiv();
   hp.style.position = 'absolute';
   hp.style.border = '1px solid #77AFEE';
   hp.style.backgroundColor = 'white';
   hp.style.padding = '6';
   hp.style.zindex = RLayer.next();
}
//链接引用对象控件
function FHintWindow_linkControl(c){
   var o = this;
   //设置显示位置
   this.hide();
   o.linkObj = c;
   var r = RHtml.rect(c.hPanel);
   var tr = o.calcRect();
   r.bottom = r.bottom + 5;
   o.setBounds(r.left, r.bottom);
   if(c.hotkey){
      o.hTitleTd.innerHTML= "快捷按键:"+"<br><B>"+"<font size='4'>"+c.hotkey+"</font></B>";
      if(c.hint){
         o.hBoxTd.innerHTML = "功能简介:"+"<br>"+c.hint;
      }
   }
}
function FHintWindow_show(){
   var o = this; 
   o.hPanel.style.display = 'block';
}
function FHintWindow_hide(){
   var o = this; 
   o.hPanel.style.display = 'none';
}
function FHintWindow_setPosition(left,top){
   var o = this;
   o.hPanel.style.top  = left;
   o.hPanel.style.left = top;
}
//------------------------------------------------------------
function FHintWindow_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hTitleRow);
   RMemory.freeHtml(o.hTitleTd);
   RMemory.freeHtml(o.hBoxRow);
   RMemory.freeHtml(o.hBoxTd);
   o.hTitleRow = null;
   o.hTitleTd = null;
   o.hBoxRow = null;
   o.hBoxTd = null;
}
