with(MO){
   //==========================================================
   // <T>边框的属性描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联名称
   // @author maocy
   // @version 150101
   //==========================================================
   MO.APtyBorder = function APtyBorder(name, linker){
      var o = this;
      AProperty.call(o, name, linker);
      //..........................................................
      // @method
      o.load     = APtyBorder_load;
      o.save     = APtyBorder_save;
      o.toString = APtyBorder_toString;
      return o;
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param instance:Object 对象
   // @param xconfig:TNode 节点
   //============================================================
   MO.APtyBorder_load = function APtyBorder_load(instance, xconfig){
      var o = this;
      var value = xconfig.get(o._linker);
      instance[o._name].parse(value);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param instance:Object 对象
   // @param xconfig:TNode 节点
   //============================================================
   MO.APtyBorder_save = function APtyBorder_save(instance, xconfig){
      var o = this;
      var value = instance[o._name];
      if(!value.isEmpty()){
         xconfig.set(o._linker, value.toString());
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.APtyBorder_toString = function APtyBorder_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
   }
}
