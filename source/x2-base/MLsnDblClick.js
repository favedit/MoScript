/**************************************************************
 * 鼠标双击事件监听接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MLsnDblClick(o){
   o = RClass.inherits(this, o, MListener);
   // Method
   o.addDblClickListener = MLsnDblClick_addDblClickListener;
   o.processDblClick     = MLsnDblClick_processDblClick;
   return o;
}
// ------------------------------------------------------------
// method
// owner, method
function MLsnDblClick_addDblClickListener(owner, method){
   return this.registerListener('dblClick', owner, method);
}
// ------------------------------------------------------------
function MLsnDblClick_processDblClick(params){
   this.processListener('dblClick', params);
}
// ------------------------------------------------------------
