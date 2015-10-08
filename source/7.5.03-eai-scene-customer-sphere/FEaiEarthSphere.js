//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthSphere = function FEaiEarthSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dSphere);
   //..........................................................
   // @method
   o.setup = MO.FEaiEarthSphere_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthSphere_setup = function FEaiEarthSphere_setup(){
   var o = this;
   o.__base.FE3dSphere.setup.call(o);
}
