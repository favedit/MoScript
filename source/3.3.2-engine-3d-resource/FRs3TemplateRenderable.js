//==========================================================
// <T>资源模板渲染对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3TemplateRenderable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 属性
   o._modelCode       = null;
   o._geometryIndex   = null;
   o._materialCode    = null;
   // @attribute 设置
   o._optionInstnaced = false;
   o._instanceCount   = 1;
   o._optionDynamic   = false;
   o._optionMerge     = false;
   o._optionBoneScale = false;
   o._optionSelect    = false;
   o._optionVisible   = false;
   o._optionGround    = false;
   // @attribute 设置
   o._matrix          = null;
   //..........................................................
   // @method
   o.construct        = FRs3TemplateRenderable_construct;
   o.modelCode        = FRs3TemplateRenderable_modelCode;
   o.geometryIndex    = FRs3TemplateRenderable_geometryIndex;
   o.materialCode     = FRs3TemplateRenderable_materialCode;
   o.matrix           = FRs3TemplateRenderable_matrix;
   // @method
   o.unserialize      = FRs3TemplateRenderable_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3TemplateRenderable_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得模型代码。</T>
//
// @method
// @return String 模型代码
//==========================================================
function FRs3TemplateRenderable_modelCode(){
   return this._modelCode;
}

//==========================================================
// <T>获得网格索引。</T>
//
// @method
// @return Integer 网格索引
//==========================================================
function FRs3TemplateRenderable_geometryIndex(p){
   return this._geometryIndex;
}

//==========================================================
// <T>获得材质代码。</T>
//
// @method
// @return String 材质代码
//==========================================================
function FRs3TemplateRenderable_materialCode(){
   return this._materialCode;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3TemplateRenderable_matrix(){
   return this._matrix;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3TemplateRenderable_unserialize(p){
   var o = this;
   // 读取属性
   o._modelCode = p.readString();
   o._geometryIndex = p.readUint16();
   o._materialCode = p.readString();
   // 读取设置
   o._optionInstnaced = p.readBoolean();
   o._instanceCount = p.readUint8();
   o._optionDynamic = p.readBoolean();
   o._optionMerge = p.readBoolean();
   o._optionBoneScale = p.readBoolean();
   o._optionSelect = p.readBoolean();
   o._optionVisible = p.readBoolean();
   o._optionGround = p.readBoolean();
   // 读取矩阵
   o._matrix.unserialize(p);
}
