//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute 名称
   o._name       = null;
   // @attribute 材质信息
   o._info       = MO.Class.register(o, new MO.AGetter('_info'));
   //..........................................................
   // @method
   o.construct   = MO.FG3dBaseMaterial_construct;
   // @method
   o.assignInfo  = MO.FG3dBaseMaterial_assignInfo;
   o.assign      = MO.FG3dBaseMaterial_assign;
   o.calculate   = MO.FG3dBaseMaterial_calculate;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 构造属性
   o._info = new MO.SG3dMaterialInfo();
}

//==========================================================
// <T>接收数据。</T>
//
// @method
// @param info:SG3dMaterialInfo 材质信息
//==========================================================
MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
   this._info.assign(info);
}

//==========================================================
// <T>接收材质信息。</T>
//
// @method
// @param material:SG3dMaterialInfo 材质信息
//==========================================================
MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
   this._info.assign(material.info());
}

//==========================================================
// <T>计算材质信息。</T>
//
// @method
// @param material:SG3dMaterialInfo 材质信息
//==========================================================
MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
   this._info.calculate(material.info());
}
