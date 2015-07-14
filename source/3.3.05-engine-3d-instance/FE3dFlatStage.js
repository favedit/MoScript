//==========================================================
// <T>平面舞台对象。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
MO.FE3dFlatStage = function FE3dFlatStage(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage);
   //..........................................................
   // @attribute
   o._layer    = MO.Class.register(o, new MO.AGetter('_layer'));
   //..........................................................
   // @method
   o.construct = MO.FE3dFlatStage_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dFlatStage_construct = function FE3dFlatStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   // 创建天空层
   var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('Layer', layer);
}
