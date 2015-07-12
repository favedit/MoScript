//==========================================================
// <T>可渲染对象信息。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
   var o = this;
   //..........................................................
   // @attribute 代码
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   //..........................................................
   // @method
   o.reset    = MO.SG3dRenderableInfo_reset;
   return o;
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = MO.Lang.Object.dispose(o.layout);
}
