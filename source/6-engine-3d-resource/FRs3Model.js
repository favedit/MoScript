//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   //..........................................................
   // @method
   o.geometrys   = FRs3Model_geometrys;
   o.skeleton    = FRs3Model_skeleton;
   o.animation   = FRs3Model_animation;
   o.unserialize = FRs3Model_unserialize;
   return o;
}

//==========================================================
// <T>获得几何体集合。</T>
//
// @method
// @return TObjects 几何体集合
//==========================================================
function FRs3Model_geometrys(){
   return this._geometrys;
}

//==========================================================
// <T>获得骨骼信息。</T>
//
// @method
// @return FRs3Skeleton 骨骼信息
//==========================================================
function FRs3Model_skeleton(){
   return this._skeleton;
}

//==========================================================
// <T>获得动画信息。</T>
//
// @method
// @return FRs3Animation 动画信息
//==========================================================
function FRs3Model_animation(){
   return this._animation;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Model_unserialize(p){
   // 读取父信息
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   //..........................................................
   // 读取几何体集合
   var gc = p.readInt16();
   if(gc > 0){
      var gs = o._geometrys = new TObjects();
      for(var i = 0; i < gc; i++){
         var g = RClass.create(FRs3Geometry);
         g.unserialize(p);
         gs.push(g);
      }
   }
   //..........................................................
   // 读取骨骼
   var sk = null;
   if(p.readBoolean()){
      sk = o._skeleton = RClass.create(FRs3Skeleton);
      sk.unserialize(p);
   }
   //..........................................................
   // 读取动画
   if(p.readBoolean()){
      var am = o._animation = RClass.create(FRs3Animation);
      am.unserialize(p);
      // 关联骨头和跟踪
      var ts = am.tracks();
      var tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         var b = sk.find(t.boneId());
         b.setTrack(t);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, geometry_count={2}, track_count={3})", o._name, gc, tc);
   RDump.dump(this, _dump);
}
