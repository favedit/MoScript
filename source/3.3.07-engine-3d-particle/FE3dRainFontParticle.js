 //==========================================================
// <T>渲染视频。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dRainFontParticle = function FE3dRainFontParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dParticle);
   //..........................................................
   // @attribute
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._delay                = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._speed                = MO.Class.register(o, new MO.AGetSet('_speed'), 1);
   o._angle                = MO.Class.register(o, new MO.AGetSet('_angle'), 0);
   o._acceleration         = MO.Class.register(o, new MO.AGetSet('_acceleration'), 0);
   o._attenuation          = MO.Class.register(o, new MO.AGetSet('_attenuation'), 0);
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   //..........................................................
   // @method
   o.construct             = MO.FE3dRainFontParticle_construct;
   // @method
   o.setup                 = MO.FE3dRainFontParticle_setup;
   o.testInRange           = MO.FE3dRainFontParticle_testInRange;
   o.start                 = MO.FE3dRainFontParticle_start;
   // @method
   o.dispose               = MO.FE3dRainFontParticle_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticle_construct = function FE3dRainFontParticle_construct(){
   var o = this;
   o.__base.FE3dParticle.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticle_setup = function FE3dRainFontParticle_setup(){
   var o = this;
   o.__base.FE3dParticle.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dRainFontParticle_testInRange = function FE3dRainFontParticle_testInRange(x, y){
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
MO.FE3dRainFontParticle_start = function FE3dRainFontParticle_start(){
   var o = this;
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var value = parseInt(MO.Random.get() * 360) % 360;
      //var angle = o._angle + angleSingle * i;
      // 创建粒子项目
      var item = particleConsole.itemAlloc(MO.FE3dRainFontParticleItem);
      item.setParticle(o);
      item.direction().set(0, -1, 0);
      item.position().set(0.1 * value - 12, 5, 0);
      item.rotation().set(0, 0, -Math.PI / 2);
      item.scale().set(0.1, 0.1, 0.1);
      item.setDelay(o._delay);
      item.setSpeed(o._speed);
      item.setAcceleration(o._acceleration);
      item.setAttenuation(o._attenuation);
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
MO.FE3dRainFontParticle_dispose = function FE3dRainFontParticle_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dParticle.dispose.call(o);
}
