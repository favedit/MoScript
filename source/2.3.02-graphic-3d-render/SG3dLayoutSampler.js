//==========================================================
// <T>渲染布局取样器。</T>
//
// @class
// @author maocy
// @history 150311
//==========================================================
function SG3dLayoutSampler(){
   var o = this;
   //..........................................................
   // @attribute
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   //..........................................................
   // @method
   o.dispose = SG3dLayoutSampler_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
