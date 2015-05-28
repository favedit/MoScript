//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3rAnimation(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._valid       = false;
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = null;
   o._resource    = null;
   // @attribute
   o._playInfo    = null;
   //..........................................................
   // @method
   o.construct    = FE3rAnimation_construct;
   // @method
   o.findTrack    = FE3rAnimation_findTrack;
   o.tracks       = FE3rAnimation_tracks;
   o.resource     = FE3rAnimation_resource;
   o.loadResource = FE3rAnimation_loadResource;
   // @method
   o.record       = FE3rAnimation_record;
   o.process      = RMethod.virtual(o, 'process');
   // @method
   o.dispose      = FE3rAnimation_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._playInfo = new SE3rPlayInfo();
}

//==========================================================
// <T>根据骨头编号查找跟踪。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FE3rTrack 跟踪
//==========================================================
function FE3rAnimation_findTrack(p){
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
// <T>获得跟踪集合。</T>
//
// @method
// @return TObjects 跟踪集合
//==========================================================
function FE3rAnimation_tracks(){
   return this._tracks;
}

//==========================================================
// <T>获得动画资源。</T>
//
// @method
// @return FE3sAnimation 动画资源
//==========================================================
function FE3rAnimation_resource(){
   return this._resource;
}

//==========================================================
// <T>加载动画资源。</T>
//
// @method
// @param resource:FE3sAnimation 动画资源
//==========================================================
function FE3rAnimation_loadResource(resource){
   var o = this;
   var frameCount = resource.frameCount();
   // 设置属性
   o._resource = resource;
   // 加载跟踪集合
   var trackResources = resource.tracks();
   if(trackResources){
      var tracks = o._tracks = new TObjects();
      var count = trackResources.count();
      for(var i = 0; i < count; i++){
         var trackResource = trackResources.at(i);
         var track = RClass.create(FE3rTrack);
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
function FE3rAnimation_record(){
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
function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
