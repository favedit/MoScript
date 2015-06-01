with(MO){
   //==========================================================
   // <T>平面舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FE3dFlatStage = function FE3dFlatStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      //..........................................................
      // @attribute
      o._layer    = null;
      //..........................................................
      // @method
      o.construct = FE3dFlatStage_construct;
      // @method
      o.layer     = FE3dFlatStage_layer;
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
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
   }

   //==========================================================
   // <T>获得显示层。</T>
   //
   // @method
   // @return FDisplayLayer 显示层
   //==========================================================
   MO.FE3dFlatStage_layer = function FE3dFlatStage_layer(){
      return this._layer;
   }
}
