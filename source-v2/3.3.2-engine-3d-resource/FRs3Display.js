//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FRs3Display(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._template       = null;
   o._typeName       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   //..........................................................
   // @method
   o.construct       = FRs3Display_construct;
   // @method
   o.typeName        = FRs3Display_typeName;
   o.modelGuid       = FRs3Display_modelGuid;
   o.model           = FRs3Display_model;
   o.meshGuid        = FRs3Display_meshGuid;
   o.mesh            = FRs3Display_mesh;
   o.matrix          = FRs3Display_matrix;
   o.materials       = FRs3Display_materials;
   // @method
   o.unserialize     = FRs3Display_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Display_construct(){
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
function FRs3Display_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得模型编号。</T>
//
// @method
// @return String 模型编号
//==========================================================
function FRs3Display_modelGuid(){
   return this._modelGuid;
}

//==========================================================
// <T>获得模型。</T>
//
// @method
// @return FRs3Model 模型
//==========================================================
function FRs3Display_model(){
   return RConsole.find(FRs3ModelConsole).findModel(this._modelGuid);
}

//==========================================================
// <T>获得网格编号。</T>
//
// @method
// @return String 网格编号
//==========================================================
function FRs3Display_meshGuid(){
   return this._meshGuid;
}

//==========================================================
// <T>获得网格。</T>
//
// @method
// @return FRs3Mesh 网格
//==========================================================
function FRs3Display_mesh(){
   return RConsole.find(FRs3ModelConsole).findMesh(this._meshGuid);
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3Display_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FRs3Display_materials(){
   return this._materials;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Display_unserialize(p){
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
         var m = RClass.create(FRs3DisplayMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
