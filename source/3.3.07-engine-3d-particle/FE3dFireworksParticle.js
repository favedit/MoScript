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
   o._delay                = MO.Class.register(o, new MO.AGetSet('_delay'), 0);
   o._speed                = MO.Class.register(o, new MO.AGetSet('_speed'), 1);
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
   o.process               = MO.FE3dFireworksParticle_process;
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
   o._items = new MO.TObjects();
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
   var count = o._itemCount;
   var angleSingle = Math.PI * 2 / count;
   for(var i = 0; i < count; i++){
      var angle = angleSingle * i;
      // 创建粒子项目
      var item = MO.Class.create(MO.FE3dFireworksParticleItem);
      item.direction().set(Math.sin(angle), Math.cos(angle), 0);
      item.rotation().set(0, 0, -angle + Math.PI / 2);
      item.scale().set(0.4, 0.4, 0.4);
      item.setDelay(o._delay);
      item.setSpeed(o._speed);
      item.setAcceleration(o._acceleration);
      item.setAttenuation(o._attenuation);
      item.start();
      o.pushItem(item);
   }
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_process = function FE3dFireworksParticle_process(){
   var o = this;
   o.__base.FE3dParticle.process.call(o);
   // 处理所有项目
   var items = o._items;
   var count = items.count();
   for(var i = 0; i < count; i++){
      var item = items.at(i);
      item.process();
   }
   // 更新数据
   o.upload();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFireworksParticle_dispose = function FE3dFireworksParticle_dispose(){
   var o = this;
   // 释放属性
   o._items = RObject.dispose(o._items);
   // 父处理
   o.__base.FE3dParticle.dispose.call(o);
}
