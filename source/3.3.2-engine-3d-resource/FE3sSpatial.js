//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sSpatial(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._typeName       = null;
   o._template       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   //..........................................................
   // @method
   o.construct       = FE3sSpatial_construct;
   // @method
   o.typeName        = FE3sSpatial_typeName;
   o.modelGuid       = FE3sSpatial_modelGuid;
   o.model           = FE3sSpatial_model;
   o.meshGuid        = FE3sSpatial_meshGuid;
   o.mesh            = FE3sSpatial_mesh;
   o.matrix          = FE3sSpatial_matrix;
   o.activeMaterial  = FE3sSpatial_activeMaterial;
   o.materials       = FE3sSpatial_materials;
   // @method
   o.unserialize     = FE3sSpatial_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSpatial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FE3sSpatial_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得模型编号。</T>
//
// @method
// @return String 模型编号
//==========================================================
function FE3sSpatial_modelGuid(){
   return this._modelGuid;
}

//==========================================================
// <T>获得模型。</T>
//
// @method
// @return FE3sModel 模型
//==========================================================
function FE3sSpatial_model(){
   return RConsole.find(FE3sModelConsole).findModel(this._modelGuid);
}

//==========================================================
// <T>获得网格编号。</T>
//
// @method
// @return String 网格编号
//==========================================================
function FE3sSpatial_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>获得网格。</T>
//
// @method
// @return FE3sMesh 网格
//==========================================================
function FE3sSpatial_mesh(){
   return RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sSpatial_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得激活材质。</T>
//
// @method
// @return FE3sSpatialMaterial 材质
//==========================================================
function FE3sSpatial_activeMaterial(){
   return this._activeMaterial;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FE3sSpatial_materials(){
   return this._materials;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSpatial_unserialize(p){
   // 读取父信息
   var o = this;
   o._typeName = p.readString();
   o._modelGuid = p.readString();
   o._meshGuid = p.readString();
   o._matrix.unserialize(p);
   // 读取主题集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSpatialMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
