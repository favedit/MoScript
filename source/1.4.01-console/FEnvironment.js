with(MO){
   //==========================================================
   // <T>环境信息。</T>
   //
   // @class
   // @author maocy
   // @version 150606
   //==========================================================
   MO.FEnvironment = function FEnvironment(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._name  = RClass.register(o, new AGetSet('_name'));
      o._value = RClass.register(o, new AGetSet('_value'));
      //..........................................................
      // @method
      o.set    = FEnvironment_set;
      return o;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   MO.FEnvironment_set = function FEnvironment_set(name, value){
      var o = this;
      o._name = name;
      o._value = value;
   }
}
