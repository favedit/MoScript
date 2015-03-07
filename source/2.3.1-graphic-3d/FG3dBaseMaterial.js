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
   o._name       = null;
   // @attribute 可见性
   o._visible    = true;
   // @attribute 材质信息
   o._info       = null;
   // @attribute 材质引用
   o._reference  = null;
   //..........................................................
   // @method
   o.construct   = FG3dBaseMaterial_construct;
   // @method
   o.visible     = FG3dBaseMaterial_visible;
   o.setVisible  = FG3dBaseMaterial_setVisible;
   o.info        = FG3dBaseMaterial_info;
   o.reference   = FG3dBaseMaterial_reference;
   // @method
   o.testVisible = FG3dBaseMaterial_testVisible;
   o.assignInfo  = FG3dBaseMaterial_assignInfo;
   o.assign      = FG3dBaseMaterial_assign;
   o.calculate   = FG3dBaseMaterial_calculate;
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
// <T>获得可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FG3dBaseMaterial_visible(){
   return this._visible;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param p:value:Boolean 可见性
//==========================================================
function FG3dBaseMaterial_setVisible(p){
   this._visible = p;
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
// <T>获得材质引用。</T>
//
// @method
// @return FG3dBaseMaterial 材质引用
//==========================================================
function FG3dBaseMaterial_reference(){
   return this._reference;
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FG3dBaseMaterial_testVisible(){
   var o = this;
   var r = o._visible;
   if(r && o._reference){
      r = o._reference.testVisible();
   }
   return r;
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

//==========================================================
// <T>接收材质信息。</T>
//
// @method
// @param p:materialInfo:SG3dMaterialInfo 材质信息
//==========================================================
function FG3dBaseMaterial_assign(p){
   var o = this;
   o._reference = p;
   o._info.assign(p.info());
}

//==========================================================
// <T>计算材质信息。</T>
//
// @method
// @param p:materialInfo:SG3dMaterialInfo 材质信息
//==========================================================
function FG3dBaseMaterial_calculate(p){
   var o = this;
   o._reference = p;
   o._info.calculate(p.info());
}
