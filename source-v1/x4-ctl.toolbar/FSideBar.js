/**************************************************************
 * 
 * @class FSideBar
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FSideBar(o){
   o = RClass.inherits(this, o, FContainer);
   o.hPanel                = null;
   o.hForm                 = null;
   o.buttonClickListener   = null;
   o.oeBuild               = FSideBar_oeBuild;
   o.onBuildPanel          = FSideBar_onBuildPanel;
   o.onBuildControls       = FSideBar_onBuildControls;
   o.selectByIndex         = FSideBar_selectByIndex;
   o.selectByName          = FSideBar_selectByName;
   o.select                = FSideBar_select;
   o.onBuildControls       = FSideBar_onBuildControls;
   o.hideNoDataButton      = FSideBar_hideNoDataButton;
   o.dispose               = FSideBar_dispose;
   return o;
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_oeBuild(event){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, event);
   if(event.isAfter()){
      o.onBuildControls();
      o.selectByIndex(0);
   }
   return r;
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.newTable(null, null, 0, 0, 0);
   o.hPanel.width = '100%';
   o.hPanel.height = '100%';
   o.hPanel.style.border = '1px solid #8ce1f6';
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_onBuildControls(){
   var o = this;
   var hp = o.hPanel;
   var hc1 = hp.insertRow().insertCell();
   hc1.innerText = o.label;
   hc1.style.paddingLeft = 8;
   hc1.style.fontWeight = 'bolder';
   hc1.style.color = '#15428B';
   hc1.height = '23px'; 
   hc1.style.backgroundImage='url(../../../ats/00/rs/icon/ctl/FSideBar_Caption.gif)';
   var hc2 = hp.insertRow().insertCell();
   hc2.vAlign = 'top';
   var h = o.hDataForm = RBuilder.appendTable(hc2);
   h.width = '100%';
   h.height = '100%';
   var cs = o.controls;
   if(cs){
      for(var n = 0; n < cs.count; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FSideButton)){
            c.parent = o;
            var hp = c.hPanel;
            var hc = h.insertRow().insertCell();
            hc.height = '1';
            c.hParent = hc;
            hc.appendChild(hp);
            c.build();
         }
      }
   }
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_selectByIndex(n){
   var o = this;
   var ct = o.controls.count;
   if(ct < n+1){
      n = 0;
   }
   this.select(this.components.value(n));
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_selectByName(n){
   this.select(this.components.get(n));
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_select(b){
   var o = this;
   var cs = o.controls;
   for(var n=0; n<cs.count; n++){
      var c = cs.value(n);
      c.select(c == b);
   }
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_dispose(b){
   var o = this;
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
   o.hDatePanel = null;
}
/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FSideBar_hideNoDataButton(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(c && RClass.checkClass(c, FSideButton)){
         if(RString.isEmpty(c.hDataPanel.innerText)){
            c.hPanel.style.display = 'none';
         }else{
            c.hPanel.style.display = 'block';
         }
      }
   }
}