with(MO){
   //==========================================================
   // <T>数字的属性描述类。</T>
   //
   // @property
   // @param n:name:String 名称
   // @param l:linker:String 关联名称
   // @param v:value:Integer 缺省内容
   // @author maocy
   // @version 141231
   //==========================================================
   MO.APtyNumber = function APtyNumber(n, l, v){
      var o = this;
      AProperty.call(o, n, l);
      //..........................................................
      // @attribute
      o._value   = RInteger.nvl(v);
      //..........................................................
      // @method
      o.build    = APtyNumber_build;
      o.toString = APtyNumber_toString;
      return o;
   }

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   MO.APtyNumber_build = function APtyNumber_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._value;
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   MO.APtyNumber_toString = function APtyNumber_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._value;
   }
}
