//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   //..........................................................
   // @method
   o.construct   = FRs3Template_construct;
   o.geometrys   = FRs3Template_geometrys;
   o.unserialize = FRs3Template_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Template_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}

//==========================================================
// <T>获得几何体集合。</T>
//
// @method
// @return 
//==========================================================
function FRs3Template_geometrys(){
   return this._geometrys;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Template_unserialize(p){
   // 读取父信息
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   // 读取几何体集合
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
   // 读取骨骼
   //_skeleton.unserialize(pInput);
   // 读取动画
   //_animation.unserialize(pInput);
   // 关联骨头和跟踪
   //GRs3dTrackPtrs& tracks = _pAnimation->Tracks();
   //TInt trackCount = tracks.Count();
   //for(TInt n = 0; n < trackCount; n++){
   //   FRs3dTrack* pTrack = tracks.Get(n);
   //   TInt boneId = pTrack->BoneId();
   //   FRs3dBone* pBone = _pSkeleton->Find(boneId);
   //   pBone->SetTrack(pTrack);
   //}
   //MO_DEBUG("Unserialize model success. (code=%d, geometry_count=%d, track_count=%d)", _code, geometryCount, trackCount);
}
