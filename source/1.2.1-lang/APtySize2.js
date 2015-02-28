//==========================================================
// <T>二维尺寸的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 150101
//==========================================================
MO.APtySize2 = function APtySize2(n, l, w, h){
   var o = this;
   MO.AProperty.call(o, n, l);
   //..........................................................
   // @attribute
   o._width   = MO.RInteger.nvl(w);
   o._height  = MO.RInteger.nvl(h);
   //..........................................................
   // @method
   o.load     = APtySize2_load;
   o.save     = APtySize2_save;
   o.toString = APtySize2_toString;
   return o;

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   function APtySize2_load(v, x){
      var o = this;
      v[o._name].parse(x.get(o._linker));
   }

   //============================================================
   // <T>存储属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   function APtySize2_save(v, x){
      var o = this;
      var d = v[o._name];
      if(!d.isEmpty()){
         x.set(o._linker, d.toString());
      }
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @method
   // @return String 字符串
   //============================================================
   function APtySize2_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
   }
}
