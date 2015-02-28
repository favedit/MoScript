//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3Animation(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
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
   o.construct    = FRd3Animation_construct;
   // @method
   o.findTrack    = FRd3Animation_findTrack;
   o.tracks       = FRd3Animation_tracks;
   o.resource     = FRd3Animation_resource;
   o.loadResource = FRd3Animation_loadResource;
   // @method
   o.record       = FRd3Animation_record;
   o.process      = RMethod.virtual(o, 'process');
   // @method
   o.dispose      = FRd3Animation_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Animation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._tracks = new TObjects();
   o._playInfo = new SRd3PlayInfo();
}

//==========================================================
// <T>根据骨头编号查找跟踪。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FRd3Track 跟踪
//==========================================================
function FRd3Animation_findTrack(p){
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
function FRd3Animation_tracks(){
   return this._tracks;
}

//==========================================================
// <T>获得动画资源。</T>
//
// @method
// @return FRs3Animation 动画资源
//==========================================================
function FRd3Animation_resource(){
   return this._resource;
}

//==========================================================
// <T>加载动画资源。</T>
//
// @method
// @param p:resource:FRs3Animation 动画资源
//==========================================================
function FRd3Animation_loadResource(p){
   var o = this;
   // 设置属性
   o._resource = p;
   // 加载跟踪集合
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t._animation = o;
      t.loadResource(rt);
      o._tracks.push(t);
   }
}

//==========================================================
// <T>刻录时间。</T>
//
// @method
//==========================================================
function FRd3Animation_record(){
   var o = this;
   // 获得时间
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRd3Animation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
