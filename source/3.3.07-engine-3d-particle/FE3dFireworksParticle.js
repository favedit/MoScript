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
   o._itemCount            = MO.Class.register(o, new MO.AGetSet('_itemCount'), 0);
   o._color                = MO.Class.register(o, new MO.AGetter('_color'), 0);
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
   o.construct             = MO.FE3dFireworksParticle_construct;
   // @method
   o.setup                 = MO.FE3dFireworksParticle_setup;
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
   o._color = new MO.SColor4();
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
// <T>开始处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_start = function FE3dFireworksParticle_start(){
   var o = this;
   var position = o._position
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var angle = o._angle + angleSingle * i;
      var scale = Math.max(Math.random(), 0.4);
      // 创建粒子项目
      var item = particleConsole.itemAlloc(MO.FE3dFireworksParticleItem);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.position().assign(position);
      item.rotation().set(0, 0, -angle + Math.PI / 2);
      //item.scale().setAll(0.3);
      //item.scale().setAll(0.2 + Math.random() * 0.3);
      //item.color().set(Math.random(), Math.random(), Math.random(), 1);
      item.color().assign(o._color);
      //item.scale().setAll(0.3);
      item.scale().setAll(1);
      //item.scale().set(scale, scale, scale);
      item.setDelay(o._delay);
      //item.setSpeed(o._speed * Math.random());
      item.setSpeed(o._speed * Math.random());
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
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   // 释放属性
   o._color = MO.Lang.Object.dispose(o._color);
   // 父处理
   o.__base.FE3dParticle.dispose.call(o);
}
