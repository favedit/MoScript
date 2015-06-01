/**************************************************************
 * 加载监听接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MLsnLoaded(o){
   o = RClass.inherits(this, o, MListener);
   // Method
   o.addLoadedListener = MLsnLoaded_addLoadedListener;
   o.processLoaded     = MLsnLoaded_processLoaded;
   return o;
}
// ------------------------------------------------------------
function MLsnLoaded_addLoadedListener(owner, method){
   return this.registerListener('loaded', owner, method);
}
// ------------------------------------------------------------
function MLsnLoaded_processLoaded(params){
   this.processListener('loaded', params);
}
// ------------------------------------------------------------
