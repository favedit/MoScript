with(MO){
   //============================================================
   // <T>设置代码描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联
   // @author maocy
   // @version 150606
   //============================================================
   MO.AGetter = function AGetter(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Get, linker);
      //..........................................................
      // @method
      o.build = AGetter_build;
      return o;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param clazz:TClass 类对象
   // @param instance:Object 实例
   //============================================================
   MO.AGetter_build = function AGetter_build(clazz, instance){
      var o = this;
      var getName = o._code;
      instance[getName] = RMethod.makePropertyGet(o._name, getName);
   }
}
