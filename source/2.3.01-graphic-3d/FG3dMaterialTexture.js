//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial);
   //..........................................................
   // 设置合并
   o._texture = null;
   return o;
}
