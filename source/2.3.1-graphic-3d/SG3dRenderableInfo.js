//==========================================================
// <T>可渲染对象信息。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
function SG3dRenderableInfo(){
   var o = this;
   //..........................................................
   // @attribute 代码
   o.effect = null;
   o.layout = null;
   //..........................................................
   // @method
   o.reset  = SG3dRenderableInfo_reset;
   return o;
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = RObject.dispose(o.layout);
}
