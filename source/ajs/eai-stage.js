MO.FEaiCompanyStage = function FEaiCompanyStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiCountryStage = function FEaiCountryStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiGroupReportStage = function FEaiGroupReportStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiGroupStage = function FEaiGroupStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
with(MO){
   MO.FEaiStage = function FEaiStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = null;
      o._spriteLayer = null;
      o._faceLayer   = null;
      o.construct    = FEaiStage_construct;
      o.mapLayer     = FEaiStage_mapLayer;
      o.spriteLayer  = FEaiStage_spriteLayer;
      o.faceLayer    = FEaiStage_faceLayer;
      o.active       = FEaiStage_active;
      o.deactive     = FEaiStage_deactive;
      return o;
   }
   MO.FEaiStage_construct = function FEaiStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
   }
   MO.FEaiStage_mapLayer = function FEaiStage_mapLayer(){
      return this._mapLayer;
   }
   MO.FEaiStage_spriteLayer = function FEaiStage_spriteLayer(){
      return this._spriteLayer;
   }
   MO.FEaiStage_faceLayer = function FEaiStage_faceLayer(){
      return this._faceLayer;
   }
   MO.FEaiStage_active = function FEaiStage_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FEaiStage_deactive = function FEaiStage_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
