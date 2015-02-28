//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.Graphic3d.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute 名称
   o._name      = null;
   // @attribute 材质信息
   o._info      = null;
   //..........................................................
   // @method
   o.construct  = FG3dBaseMaterial_construct;
   // @method
   o.info       = FG3dBaseMaterial_info;
   // @method
   o.assignInfo = FG3dBaseMaterial_assignInfo;
   o.assign     = FG3dBaseMaterial_assign;
   o.calculate  = FG3dBaseMaterial_calculate;
   return o;

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

   //==========================================================
   // <T>接收材质信息。</T>
   //
   // @method
   // @param p:materialInfo:SG3dMaterialInfo 材质信息
   //==========================================================
   function FG3dBaseMaterial_assign(p){
      this._info.assign(p.info());
   }

   //==========================================================
   // <T>计算材质信息。</T>
   //
   // @method
   // @param p:materialInfo:SG3dMaterialInfo 材质信息
   //==========================================================
   function FG3dBaseMaterial_calculate(p){
      this._info.calculate(p.info());
   }
}
