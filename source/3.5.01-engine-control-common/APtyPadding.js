with(MO){
   //==========================================================
   // <T>填充的属性描述类。</T>
   //
   // @property
   // @param name:String 名称
   // @param linker:String 关联名称
   // @param left:Integer 左边距
   // @param top:Integer 上边距
   // @param right:Integer 右边距
   // @param bottom:Integer 下边距
   // @author maocy
   // @version 150101
   //==========================================================
   MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
      var o = this;
      AProperty.call(o, name, linker);
      //..........................................................
      // @attribute
      o._left    = RInteger.nvl(left);
      o._top     = RInteger.nvl(top);
      o._right   = RInteger.nvl(right);
      o._bottom  = RInteger.nvl(bottom);
      //..........................................................
      // @method
      o.load     = APtyPadding_load;
      o.save     = APtyPadding_save;
      // @method
      o.toString = APtyPadding_toString;
      return o;
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param instance:Object 对象
   // @param xconfig:TNode 节点
   //============================================================
   MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
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
   MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
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
   MO.APtyPadding_toString = function APtyPadding_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
   }
}
