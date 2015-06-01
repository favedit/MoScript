/**************************************************************
 * <T>功能导航菜单栏。</T>
 *
 * @class 
 * @face FControl
 * @author MAOCY
 * @version 1.0.1
 **************************************************************/
function FNavigatorGroup(o){
   o = RClass.inherits(this, o, FControl, MContainer);
   // Method
   o.oeBuild         = FNavigatorGroup_oeBuild;
   o.onBuildPanel    = FNavigatorGroup_onBuildPanel;
   o.setItems        = FNavigatorGroup_setItems;
   o.dispose         = FNavigatorGroup_dispose;
   return o;
}

/**************************************************************
 * <T>事件构建函数。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorGroup_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   if(e.isBefore()){
      o.hTitle = o.hPanel.insertRow().insertCell();
      o.hTitle.innerText = o.label;
      o.hTitle.style.fontColor = 'blue';
      o.hTitle.style.fontWeight ="bolder";
      var hc = o.hPanel.insertRow().insertCell();
      o.hForm = RBuilder.appendTable(hc);
      o.hForm.style.padding = '2';
      o.hPanel.style.display = 'none';
   }
   return EEventStatus.Continue;
}

/**************************************************************
 * <T>构建控件底板。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorGroup_onBuildPanel(){
   var hp = this.hPanel = RBuilder.appendTable();
   //hp.border = 2;
   hp.cellPadding = '2';
}

/**************************************************************
 * <T>把按钮添加到组里。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorGroup_setItems(cs){
   var o = this;
   for(var n = 0; n < cs.count; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FNavigatorItem)){
         var t = o.editor;
         c.hPanel.style.display='block';
         var tBar = t.editable.parent;
         c.lsnsButtonClickBefore.register(tBar, tBar.onButtonClickBefore);
         c.lsnsButtonClick.register(tBar, tBar.onButtonClick);
         var hc = o.hForm.insertRow().insertCell();
         hc.appendChild(c.hPanel);
      }
   }
}

/**************************************************************
 * <T>把按钮添加到组里。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorGroup_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hTitle);
   RMemory.freeHtml(o.hForm);
   o.hTitle = null;
   o.hForm = null;
}