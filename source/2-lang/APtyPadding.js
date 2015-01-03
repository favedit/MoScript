//==========================================================
// <T>填充的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 150101
//==========================================================
function APtyPadding(o, n, l, vl, vt, vr, vb){
   if(!o){o = this;}
   AProperty(o, n, l);
   //..........................................................
   // @attribute
   o._left    = RInteger.nvl(vl);
   o._top     = RInteger.nvl(vt);
   o._right   = RInteger.nvl(vr);
   o._bottom  = RInteger.nvl(vb);
   //..........................................................
   // @method
   o.load     = APtyPadding_load;
   o.save     = APtyPadding_save;
   o.toString = APtyPadding_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
function APtyPadding_load(v, x){
   var o = this;
   v[o.name].parse(x.get(o.linker));
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
   x.set(o.name, v[o.name].toString());
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function APtyPadding_toString(){
   var o = this;
   return '<PaddingProperty:linker=' + o.linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom +  '>';
}

