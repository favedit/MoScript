//==========================================================
// <T>设计场景资源控制台。</T>
//
// @class
// @author maocy
// @version 150411
//==========================================================
function FDrSceneConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   // @attribute
   o._serviceCode = 'cloud.content.scene';
   return o;
}
