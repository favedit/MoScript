//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   //..........................................................
   // @method
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   // @method
   o.unserialize    = FE3sModel_unserialize;
   return o;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>获得网格集合。</T>
//
// @method
// @return TObjects 网格集合
//==========================================================
function FE3sModel_meshes(){
   return this._meshes;
}

//==========================================================
// <T>获得骨骼集合。</T>
//
// @method
// @return TObjects 骨骼集合
//==========================================================
function FE3sModel_skeletons(){
   return this._skeletons;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FE3sModel_animations(){
   return this._animations;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sModel_unserialize(p){
   // 读取父信息
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   //..........................................................
   // 存储模型
   var mc = RConsole.find(FE3sModelConsole);
   mc.models().set(o.guid(), o);
   //..........................................................
   // 读取几何体集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialMesh(p));
      }
   }
   //..........................................................
   // 读取骨骼集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialSkeleton(p));
      }
   }
   //..........................................................
   // 读取动画集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialAnimation(o, p));
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
