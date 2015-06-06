with(MO){
   //============================================================
   // <T>获得代码描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联
   // @author maocy
   // @version 150606
   //============================================================
   MO.ASetter = function ASetter(name, linker){
      var o = this;
      ASource.call(o, name, ESource.Set, linker);
      //..........................................................
      // @method
      o.build = ASetter_build;
      return o;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param clazz:TClass 类对象
   // @param instance:Object 实例
   //============================================================
   MO.ASetter_build = function ASetter_build(clazz, instance){
      var o = this;
      var setName = 'set' + o._linker;
      instance[setName] = RMethod.makePropertySet(o._name, setName);
   }
}
