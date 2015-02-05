//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._meshes     = null;
   o._skeletons  = null;
   o._animations = null;
   //..........................................................
   // @method
   o.meshes      = FRs3Model_meshes;
   o.skeletons   = FRs3Model_skeletons;
   o.animations  = FRs3Model_animations;
   o.unserialize = FRs3Model_unserialize;
   return o;
}

//==========================================================
// <T>获得网格集合。</T>
//
// @method
// @return TObjects 网格集合
//==========================================================
function FRs3Model_meshes(){
   return this._meshes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TObjects 骨骼集合
//==========================================================
function FRs3Model_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FRs3Model_animations(){
   return this._animations;
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
   debugger
   //..........................................................
   // 读取几何体集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FRs3Mesh);
         m.unserialize(p);
         s.push(m);
      }
   }
   //..........................................................
   // 读取骨骼集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FRs3Skeleton);
         k.unserialize(p);
         s.push(k);
      }
   }
   //..........................................................
   // 读取动画集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         var a = RClass.create(FRs3Animation);
         a.unserialize(p);
         s.push(a);
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
