//==========================================================
// <T>枚举的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param e:enum:Class 枚举类型
// @param d:default:Object 枚举内容
// @author maocy
// @version 150210
//==========================================================
MO.APtyEnum = function APtyEnum(n, l, e, d){
   var o = this;
   MO.AProperty.call(o, n, l);
   //..........................................................
   // @attribute
   o._enum    = e;
   o._default = d;
   //..........................................................
   // @method
   o.build    = APtyEnum_build;
   o.load     = APtyEnum_load;
   o.save     = APtyEnum_save;
   o.toString = APtyEnum_toString;
   return o;

   //============================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param v:value:Object 对象
   //============================================================
   function APtyEnum_build(v){
      var o = this;
      if(v[o._name] == null){
         v[o._name] = o._default;
      }
   }

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   function APtyEnum_load(v, x){
      var o = this;
      v[o._name] = x.get(o._linker);
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   function APtyEnum_save(v, x){
      var o = this;
      x.set(o._linker, v[o._name]);
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   function APtyEnum_toString(){
      var o = this;
      return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
   }
}
