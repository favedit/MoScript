with(MO){
   //==========================================================
   // <T>整数的属性描述类。</T>
   //
   // @property
   // @param n:name:String 名称
   // @param l:linker:String 关联名称
   // @param v:value:Integer 缺省内容
   // @author maocy
   // @version 141231
   //==========================================================
   MO.APtyInteger = function APtyInteger(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      //..........................................................
      // @attribute
      o._value   = RInteger.nvl(v);
      //..........................................................
      // @method
      o.build    = APtyInteger_build;
      o.load     = APtyInteger_load;
      o.save     = APtyInteger_save;
      o.toString = APtyInteger_toString;
      return o;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.APtyInteger_build = function APtyInteger_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.APtyInteger_load = function APtyInteger_load(v, x){
      var o = this;
      v[o._name] = RInteger.parse(x.get(o._linker));
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   MO.APtyInteger_save = function APtyInteger_save(v, x){
      var o = this;
      x.set(o._linker, RInteger.toString(v[o._name]));
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.APtyInteger_toString = function APtyInteger_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
