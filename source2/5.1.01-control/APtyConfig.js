with(MO){
   //==========================================================
   // <T>节点的属性描述类。</T>
   //
   // @property
   // @param n:name:String 名称
   // @author maocy
   // @version 141231
   //==========================================================
   MO.APtyConfig = function APtyConfig(n, l){
      var o = this;
      AProperty.call(o, n, l);
      //..........................................................
      // @attribute
      o.force = true;
      //..........................................................
      // @method
      o.load  = APtyConfig_load;
      o.save  = RMethod.empty;
      return o;
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.APtyConfig_load = function APtyConfig_load(v, x){
      v[this.name] = x;
   }
}
