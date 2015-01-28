//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FNetRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._meshes     = null;
   //..........................................................
   // @method
   o.meshes      = FNetRs3Model_meshes;
   o.unserialize = FNetRs3Model_unserialize;
   return o;
}

//==========================================================
// <T>获得几何体集合。</T>
//
// @method
// @return TObjects 几何体集合
//==========================================================
function FNetRs3Model_meshes(){
   return this._meshes;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3Model_unserialize(p){
   // 读取父信息
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   //..........................................................
   // 读取几何体集合
   var c = p.readInt16();
   if(c > 0){
      var ms = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FNetRs3ModelMesh);
         m.unserialize(p);
         ms.push(m);
      }
   }
   RLogger.info(o, "Unserialize model success. (code={1}, mesh_count={2})", o._name, c);
}
