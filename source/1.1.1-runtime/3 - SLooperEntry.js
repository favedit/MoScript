//==========================================================
// <T>自循环节点。</T>
//
// @tool
// @author maocy
// @version 150110
//==========================================================
MO.SLooperEntry = function SLooperEntry(){
   var o = this;
   //..........................................................
   // @attribute
   o.prior   = null;
   o.next    = null;
   // @attribute
   o.value   = null;
   //..........................................................
   // @method
   o.dispose = SLooperEntry_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function SLooperEntry_dispose(){
   var o = this;
   o.prior = null;
   o.next = null;
   o.value = null;
}
