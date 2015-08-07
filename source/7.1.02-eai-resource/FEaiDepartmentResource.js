//==========================================================
// <T>部门资源。</T>
//
// @class
// @author maocy
// @history 150807
//==========================================================
MO.FEaiDepartmentResource = function FEaiDepartmentResource(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   //..........................................................
   // @attribute
   o._code      = MO.Class.register(o, [new MO.AGetter('_code'), new MO.APersistence('_code', MO.EDataType.String)]);
   o._label     = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._fullLabel = MO.Class.register(o, [new MO.AGetter('_fullLabel'), new MO.APersistence('_fullLabel', MO.EDataType.String)]);
   return o;
}
