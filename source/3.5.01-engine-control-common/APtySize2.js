with(MO){
   //==========================================================
   // <T>二维尺寸的属性描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联名称
   // @param width:Integer 宽度
   // @param height:Integer 高度
   // @author maocy
   // @version 150101
   //==========================================================
   MO.APtySize2 = function APtySize2(name, linker, width, height){
      var o = this;
      AProperty.call(o, name, linker);
      //..........................................................
      // @attribute
      o._width   = RInteger.nvl(width);
      o._height  = RInteger.nvl(height);
      //..........................................................
      // @method
      o.load     = APtySize2_load;
      o.save     = APtySize2_save;
      // @method
      o.toString = APtySize2_toString;
      return o;
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param instance:Object 对象
   // @param xconfig:TNode 节点
   //============================================================
   MO.APtySize2_load = function APtySize2_load(instance, xconfig){
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
   MO.APtySize2_save = function APtySize2_save(instance, xconfig){
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
   MO.APtySize2_toString = function APtySize2_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
   }
}
