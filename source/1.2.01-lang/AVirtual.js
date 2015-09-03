//============================================================
// <T>虚函数代码描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联
// @author maocy
// @version 150903
//============================================================
MO.AVirtual = function AVirtual(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Virtual, linker);
   //..........................................................
   // @method
   o.build   = MO.AVirtual_build;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param clazz:TClass 类对象
// @param instance:Object 实例
//============================================================
MO.AVirtual_build = function AVirtual_build(clazz, instance){
   var o = this;
   instance[o._name] = MO.Method.makeVirtual(o._clazz, o._name);
}
