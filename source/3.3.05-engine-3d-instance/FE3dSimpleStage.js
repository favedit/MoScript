//==========================================================
// <T>简单三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dSimpleStage = function FE3dSimpleStage(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage);
   //..........................................................
   // @attribute
   o._optionKeyboard = true;
   // @attribute
   o._skyLayer       = MO.RClass.register(o, new MO.AGetter('_skyLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._spriteLayer    = MO.RClass.register(o, new MO.AGetter('_spriteLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   //..........................................................
   // @method
   o.construct       = MO.FE3dSimpleStage_construct;
   // @method
   o.active          = MO.FE3dSimpleStage_active;
   o.deactive        = MO.FE3dSimpleStage_deactive;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleStage_construct = function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   // 创建天空层
   var layer = o._skyLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('SkyLayer', layer);
   // 创建地图层
   var layer = o._mapLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   // 创建精灵层
   var layer = o._spriteLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('SpriteLayer', layer);
   // 创建界面层
   var layer = o._faceLayer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleStage_active = function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
   // 注册事件
   //if(o._optionKeyboard){
   //   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   //}
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleStage_deactive = function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
   // 注销事件
   //if(o._optionKeyboard){
   //   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
   //}
}
