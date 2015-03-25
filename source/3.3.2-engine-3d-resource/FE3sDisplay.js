//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sDisplay(o){
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
   o.construct       = FE3sDisplay_construct;
   // @method
   o.typeName        = FE3sDisplay_typeName;
   o.modelGuid       = FE3sDisplay_modelGuid;
   o.model           = FE3sDisplay_model;
   o.meshGuid        = FE3sDisplay_meshGuid;
   o.mesh            = FE3sDisplay_mesh;
   o.matrix          = FE3sDisplay_matrix;
   o.activeMaterial  = FE3sDisplay_activeMaterial;
   o.materials       = FE3sDisplay_materials;
   // @method
   o.unserialize     = FE3sDisplay_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sDisplay_construct(){
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
function FE3sDisplay_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得模型编号。</T>
//
// @method
// @return String 模型编号
//==========================================================
function FE3sDisplay_modelGuid(){
   return this._modelGuid;
}

//==========================================================
// <T>获得模型。</T>
//
// @method
// @return FE3sModel 模型
//==========================================================
function FE3sDisplay_model(){
   return RConsole.find(FE3sModelConsole).findModel(this._modelGuid);
}

//==========================================================
// <T>获得网格编号。</T>
//
// @method
// @return String 网格编号
//==========================================================
function FE3sDisplay_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>获得网格。</T>
//
// @method
// @return FE3sMesh 网格
//==========================================================
function FE3sDisplay_mesh(){
   return RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3sDisplay_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得激活材质。</T>
//
// @method
// @return FE3sDisplayMaterial 材质
//==========================================================
function FE3sDisplay_activeMaterial(){
   return this._activeMaterial;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FE3sDisplay_materials(){
   return this._materials;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sDisplay_unserialize(p){
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
         var m = RClass.create(FE3sDisplayMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
