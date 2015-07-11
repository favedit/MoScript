 //==========================================================
// <T>渲染视频。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dFireworksParticle = function FE3dFireworksParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   //..........................................................
   // @attribute
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   // @attribute
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._itemDelay            = MO.Class.register(o, new MO.AGetSet('_itemDelay'), 0);
   o._itemColor            = MO.Class.register(o, new MO.AGetter('_itemColor'));
   o._itemPosition         = MO.Class.register(o, new MO.AGetter('_itemPosition'));
   o._itemRotation         = MO.Class.register(o, new MO.AGetter('_itemRotation'));
   o._itemScale            = MO.Class.register(o, new MO.AGetter('_itemScale'));
   o._itemSpeed            = MO.Class.register(o, new MO.AGetSet('_itemSpeed'), 0);
   o._itemAcceleration     = MO.Class.register(o, new MO.AGetSet('_itemAcceleration'));
   o._itemAttenuation      = MO.Class.register(o, new MO.AGetSet('_itemAttenuation'), 0);
   o._itemSplittingNumber  = MO.Class.register(o, new MO.AGetSet('_itemSplittingNumber'), 0);
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   //..........................................................
   // @method
   o.construct             = MO.FE3dFireworksParticle_construct;
   // @method
   o.setup                 = MO.FE3dFireworksParticle_setup;
   o.testInRange           = MO.FE3dFireworksParticle_testInRange;
   o.start                 = MO.FE3dFireworksParticle_start;
   // @method
   o.dispose               = MO.FE3dFireworksParticle_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_construct = function FE3dFireworksParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
   // 设置属性
   o._itemColor = new MO.SColor4(1, 1, 1, 1);
   o._itemPosition = new MO.SPoint3(0, 0, 0);
   o._itemRotation = new MO.SVector3(0, 0, 0);
   o._itemScale = new MO.SVector3(1, 1, 1);
   o._itemAcceleration = new MO.SVector3(0, 0, 0);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_setup = function FE3dFireworksParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_testInRange = function FE3dFireworksParticle_testInRange(x, y){
   var o = this;
   var position = o._position;
   var idx = parseInt((x + 17) / 20 * 220);
   var idy = parseInt((y + 3) * 6);
   var index = (360 * (60 - idy) + idx) * 4;
   var data = o._data.data;
   if(index >= 0 && index < data.length){
      var r = data[index    ];
      var g = data[index + 1];
      var b = data[index + 2];
      var a = data[index + 3];
   }
   return r > 0;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_start = function FE3dFireworksParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      // 计算角度
      var angle = o._angle + angleSingle * i;
      // 收集粒子项目
      var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
      item.setParticle(o);
      item.setDelay(o._itemDelay);
      item.position().assign(o._itemPosition);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.scale().assign(o._itemScale);
      item.color().assign(o._itemColor);
      item.setSpeed(o._itemSpeed);
      item.acceleration().assign(o._itemAcceleration);
      item.setAttenuation(o._itemAttenuation);
      item.setSplittingDistance(3 + Math.random());
      item.setSplittingNumber(o._itemSplittingNumber);
      item.start();
      // 放入处理集合
      o.pushItem(item);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   // 释放属性
   o._itemColor = MO.Lang.Object.dispose(o._itemColor);
   o._itemPosition = MO.Lang.Object.dispose(o._itemPosition);
   o._itemRotation = MO.Lang.Object.dispose(o._itemRotation);
   o._itemScale = MO.Lang.Object.dispose(o._itemScale);
   o._itemAcceleration = MO.Lang.Object.dispose(o._itemAcceleration);
   // 父处理
   o.__base.FE3dParticle.dispose.call(o);
}
