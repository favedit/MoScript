//==========================================================
// <T>渲染3D对象。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
function ME3dObject(o){
   o = RClass.inherits(this, o, MGraphicObject, MAttributeGuid, MAttributeCode);
   return o;
}
