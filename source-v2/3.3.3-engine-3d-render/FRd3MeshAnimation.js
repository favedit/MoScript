//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3MeshAnimation(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._bones       = null;
   o._tracks      = null;
   o._resource    = null;
   // @attribute
   o._playInfo    = null;
   //..........................................................
   // @method
   o.construct    = FRd3MeshAnimation_construct;
   o.findBone     = FRd3MeshAnimation_findBone;
   o.bones        = FRd3MeshAnimation_bones;
   o.findTrack    = FRd3MeshAnimation_findTrack;
   o.tracks       = FRd3MeshAnimation_tracks;
   o.loadResource = FRd3MeshAnimation_loadResource;
   o.process      = FRd3MeshAnimation_process;
   o.dispose      = FRd3MeshAnimation_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3MeshAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TDictionary();
   o._tracks = new TObjects();
   o._playInfo = new SRd3PlayInfo();
}

//==========================================================
// <T>根据编号查找骨头。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FRd3Bone 骨头
//==========================================================
function FRd3MeshAnimation_findBone(p){
   return this._bones.get(p);
}

//==========================================================
// <T>获得骨头字典。</T>
//
// @method
// @return TDictionary 骨头字典
//==========================================================
function FRd3MeshAnimation_bones(){
   return this._bones;
}

//==========================================================
// <T>根据骨头编号查找跟踪。</T>
//
// @method
// @param p:boneId:Integer 编号
// @return FRd3Track 跟踪
//==========================================================
function FRd3MeshAnimation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneId() == p){
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
function FRd3MeshAnimation_tracks(){
   return this._tracks;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function FRd3MeshAnimation_loadResource(p){
   var o = this;
   o._resource = p;
   // 加载跟踪集合
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FRd3Track);
      t.loadResource(rt);
      o._tracks.push(t);
   }
   // 设置骨头集合
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.value(i);
      var bi = b.id();
      var t = o.findTrack(bi);
      if(t == null){
         throw new TError('Track is not exists. (bone_id={1})', bi);
      }
      b.setTrackResource(t);
   }
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:track:FRd3Track 跟踪器
//==========================================================
function FRd3MeshAnimation_process(p){
   var o = this;
   // 获得时间
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   var ct = o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
   // 计算间隔
   var r = p._resource;
   var pi = o._playInfo;
   r.calculate(pi, ct);
   pi.update();
   // 更新跟踪
   var m = p._matrix;
   m.assign(r.matrixInvert());
   m.append(pi.matrix);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRd3MeshAnimation_dispose(){
   var o = this;
   o._bones = null;
   o._tracks = null;
   o._resource = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
