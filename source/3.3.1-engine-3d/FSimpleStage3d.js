//==========================================================
// <T>简单三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FSimpleStage3d(o){
   o = RClass.inherits(this, o, FStage3d);
   //..........................................................
   // @attribute
   o,_skyLayer    = null;
   o,_mapLayer    = null;
   o,_spriteLayer = null;
   o,_faceLayer   = null;
   //..........................................................
   // @event
   o.onKeyDown    = FSimpleStage3d_onKeyDown;
   //..........................................................
   // @method
   o.construct    = FSimpleStage3d_construct;
   // @method
   o.skyLayer     = FSimpleStage3d_skyLayer;
   o.mapLayer     = FSimpleStage3d_mapLayer;
   o.spriteLayer  = FSimpleStage3d_spriteLayer;
   o.faceLayer    = FSimpleStage3d_faceLayer;
   // @method
   o.active       = FSimpleStage3d_active;
   o.deactive     = FSimpleStage3d_deactive;
   return o;
}

//==========================================================
// <T>按键处理。</T>
//
// @method
//==========================================================
function FSimpleStage3d_onKeyDown(e){
   var o = this;
   // 事件处理
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FSimpleStage3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   // 创建天空层
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   // 创建地图层
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   // 创建精灵层
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', l);
   // 创建界面层
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('face', l);
}

//==========================================================
// <T>获得天空层。</T>
//
// @method
// @return FDisplayLayer 天空层
//==========================================================
function FSimpleStage3d_skyLayer(){
   return this._skyLayer;
}

//==========================================================
// <T>获得地图层。</T>
//
// @method
// @return FDisplayLayer 地图层
//==========================================================
function FSimpleStage3d_mapLayer(){
   return this._mapLayer;
}

//==========================================================
// <T>获得精灵层。</T>
//
// @method
// @return FDisplayLayer 精灵层
//==========================================================
function FSimpleStage3d_spriteLayer(){
   return this._spriteLayer;
}

//==========================================================
// <T>获得界面层。</T>
//
// @method
// @return FDisplayLayer 界面层
//==========================================================
function FSimpleStage3d_faceLayer(){
   return this._faceLayer;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FSimpleStage3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   // 注册事件
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FSimpleStage3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   // 注销事件
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
}
