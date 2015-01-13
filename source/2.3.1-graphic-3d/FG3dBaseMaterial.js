//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o._name      = null;
   // @attribute 材质信息
   o._info      = null;
   //..........................................................
   // @method
   o.construct  = FG3dBaseMaterial_construct;
   o.info       = FG3dBaseMaterial_info;
   o.assignInfo = FG3dBaseMaterial_assignInfo;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 构造属性
   o._info = new SG3dMaterialInfo();
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FG3dBaseMaterial_info(){
   return this._info;
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param p:materialInfo:SG3dMaterialInfo 材质信息
//==========================================================
function FG3dBaseMaterial_assignInfo(p){
   this._info.assign(p);
}
