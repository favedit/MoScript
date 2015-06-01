/**************************************************************
 * 鼠标单击监听接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MLsnClick(o){
   o = RClass.inherits(this, o, MListener);
   // Method
   o.addClickListener = MLsnClick_addClickListener;
   o.processClick     = MLsnClick_processClick;
   return o;
}
// ------------------------------------------------------------
// method
// owner, method
function MLsnClick_addClickListener(owner, method){
   return this.registerListener('click', owner, method);
}
// ------------------------------------------------------------
function MLsnClick_processClick(params){
   this.processListener('click', params);
}
// ------------------------------------------------------------
