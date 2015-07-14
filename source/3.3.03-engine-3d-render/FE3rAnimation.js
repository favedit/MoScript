//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3rAnimation = function FE3rAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = MO.Class.register(o, new AGetter('_tracks'));
   o._resource    = MO.Class.register(o, new AGetter('_resource'));
   // @attribute
   o._playInfo    = null;
   //..........................................................
   // @method
   o.construct    = MO.FE3rAnimation_construct;
   // @method
   o.findTrack    = MO.FE3rAnimation_findTrack;
   o.loadResource = MO.FE3rAnimation_loadResource;
   // @method
   o.record       = MO.FE3rAnimation_record;
   o.process      = MO.Method.virtual(o, 'process');
   // @method
   o.dispose      = MO.FE3rAnimation_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rAnimation_construct = function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new MO.SE3rPlayInfo();
}

//==========================================================
// <T>根据骨头编号查找跟踪。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FE3rTrack 跟踪
//==========================================================
MO.FE3rAnimation_findTrack = function FE3rAnimation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneIndex() == p){
         return t;
      }
   }
   return null;
}

//==========================================================
// <T>加载动画资源。</T>
//
// @method
// @param resource:FE3sAnimation 动画资源
//==========================================================
MO.FE3rAnimation_loadResource = function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   // 设置属性
   o._resource = resource;
   // 加载跟踪集合
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new MO.TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = MO.Class.create(MO.FE3rTrack);
         track._animation = o;
         track.loadResource(trackResource);
         tracks.push(track);
      }
   }
   // 设置播放信息
   if(frameCount > 0){
      var info = o._playInfo;
      info.beginIndex = 0;
      info.endIndex = (frameCount > 0) ? frameCount - 1 : 0;
      info.frameCount = frameCount;
      o._valid = true;
   }
}

//==========================================================
// <T>刻录时间。</T>
//
// @method
//==========================================================
MO.FE3rAnimation_record = function FE3rAnimation_record(){
   var o = this;
   // 获得时间
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rAnimation_dispose = function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
