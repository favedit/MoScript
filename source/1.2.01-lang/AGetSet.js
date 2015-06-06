with(MO){
   //============================================================
   // <T>设置获得代码描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联
   // @author maocy
   // @version 150606
   //============================================================
   MO.AGetSet = function AGetSet(name, linker){
      var o = this;
      ASource.call(o, name, ESource.GetSet, linker);
      //..........................................................
      // @method
      o.build = AGetSet_build;
      return o;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param clazz:TClass 类对象
   // @param instance:Object 实例
   //============================================================
   MO.AGetSet_build = function AGetSet_build(clazz, instance){
      var o = this;
      var getName = o._code;
      instance[getName] = RMethod.makePropertyGet(o._name, getName);
      var setName = 'set' + o._linker;
      instance[setName] = RMethod.makePropertySet(o._name, setName);
   }
}
