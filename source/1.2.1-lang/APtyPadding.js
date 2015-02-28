//==========================================================
// <T>填充的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param vl:left:Integer 左边距
// @param vt:top:Integer 上边距
// @param vr:right:Integer 右边距
// @param vb:bottom:Integer 下边距
// @author maocy
// @version 150101
//==========================================================
MO.APtyPadding = function APtyPadding(n, l, vl, vt, vr, vb){
   var o = this;
   MO.AProperty.call(o, n, l);
   //..........................................................
   // @attribute
   o._left    = MO.RInteger.nvl(vl);
   o._top     = MO.RInteger.nvl(vt);
   o._right   = MO.RInteger.nvl(vr);
   o._bottom  = MO.RInteger.nvl(vb);
   //..........................................................
   // @method
   o.load     = APtyPadding_load;
   o.save     = APtyPadding_save;
   o.toString = APtyPadding_toString;
   return o;

   //============================================================
   // <T>加载属性值。</T>
   //
   // @method
   // @param v:value:Object 对象
   // @param x:config:TNode 节点
   //============================================================
   function APtyPadding_load(v, x){
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
   function APtyPadding_save(v, x){
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
   function APtyPadding_toString(){
      var o = this;
      return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
   }
}
