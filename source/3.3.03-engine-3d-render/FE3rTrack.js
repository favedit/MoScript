//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3rTrack = function FE3rTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._matrix      = MO.Class.register(o, new AGetter('_matrix'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   //..........................................................
   // @method
   o.construct    = MO.FE3rTrack_construct;
   // @method
   o.loadResource = MO.FE3rTrack_loadResource;
   // @method
   o.dispose      = MO.FE3rTrack_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rTrack_construct = function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sBone 资源
//==========================================================
MO.FE3rTrack_loadResource = function FE3rTrack_loadResource(p){
   var o = this;
   o._resource = p;
   // 设置属性
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rTrack_dispose = function FE3rTrack_dispose(){
   var o = this;
   // 释放内容
   o._resource = null;
   // 父处理
   o.__base.FG3dTrack.dispose.call(o);
}
