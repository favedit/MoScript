//============================================================
// <T>设置代码描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联
// @author maocy
// @version 150606
//============================================================
MO.AGetterSource = function AGetterSource(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Get, linker);
   //..........................................................
   // @attribute
   o._linker = linker;
   //..........................................................
   // @method
   o.build   = MO.AGetterSource_build;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param clazz:TClass 类对象
// @param instance:Object 实例
//============================================================
MO.AGetterSource_build = function AGetterSource_build(clazz, instance){
   var o = this;
   var getName = o._linker ? o._linker : o._code;
   instance[getName] = MO.Method.makePropertyGetSource(o._name, getName);
}
