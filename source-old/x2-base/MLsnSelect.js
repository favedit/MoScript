/**************************************************************
 * 选择监听接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MLsnSelect(o){
   o = RClass.inherits(this, o, MListener);
   // Method
   o.addSelectListener = MLsnSelect_addSelectListener;
   o.processSelect     = MLsnSelect_processSelect;
   return o;
}
// ------------------------------------------------------------
function MLsnSelect_addSelectListener(owner, method){
   return this.registerListener('select', owner, method);
}
// ------------------------------------------------------------
function MLsnSelect_processSelect(params){
   this.processListener('select', params);
}
// ------------------------------------------------------------
