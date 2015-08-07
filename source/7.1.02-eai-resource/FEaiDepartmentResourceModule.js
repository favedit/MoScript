//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiDepartmentResourceModule = function FEaiDepartmentResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule, MO.MPersistence);
   //..........................................................
   // @attribute
   o._departments     = MO.Class.register(o, [new MO.AGetter('_departments'), new MO.APersistence('_departments', MO.EDataType.Objects, MO.FEaiDepartmentResource)]);
   //..........................................................
   // @method
   o.construct        = MO.FEaiDepartmentResourceModule_construct;
   // @method
   o.find             = MO.FEaiDepartmentResourceModule_find;
   o.findByFullLabel  = MO.FEaiDepartmentResourceModule_findByFullLabel;
   // @method
   o.dispose          = MO.FEaiDepartmentResourceModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiDepartmentResourceModule_construct = function FEaiDepartmentResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
   // 创建属性
   o._departments = new MO.TObjects();
}

//==========================================================
// <T>根据代码查找城市信息。</T>
//
// @method
// @param code:String 代码
// @return 城市信息
//==========================================================
MO.FEaiDepartmentResourceModule_find = function FEaiDepartmentResourceModule_find(code){
   return this._departments.get(code);
}

//==========================================================
// <T>根据全称查找部门信息。</T>
//
// @method
// @param card:String 代码
// @return 城市信息
//==========================================================
MO.FEaiDepartmentResourceModule_findByFullLabel = function FEaiDepartmentResourceModule_findByFullLabel(fullLabel) {
   var o = this;
   var departments = o._departments;
   var count = departments.count();
   for(var i = 0; i < count; i++){
      var department = departments.at(i);
      if(department.fullLabel() == fullLabel){
         return department;
      }
   }
   return null;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiDepartmentResourceModule_dispose = function FEaiDepartmentResourceModule_dispose(){
   var o = this;
   o._departments = MO.Lang.Object.dispose(o._departments);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
