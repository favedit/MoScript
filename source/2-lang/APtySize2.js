//==========================================================
// <T>二维尺寸的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 150101
//==========================================================
function APtySize2(o, n, l, w, h){
   if(!o){o = this;}
   AProperty(o, n, l);
   //..........................................................
   // @attribute
   o._width   = RInteger.nvl(w);
   o._height  = RInteger.nvl(h);
   //..........................................................
   // @method
   o.load     = APtySize2_load;
   o.save     = APtySize2_save;
   o.toString = APtySize2_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
function APtySize2_load(v, x){
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
function APtySize2_save(v, x){
   var o = this;
   x.set(o.name, v[o.name].toString());
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function APtySize2_toString(){
   var o = this;
   return '<Size2Property:linker=' + o.linker + ',value=' + o._width + ',' + o._height +  '>';
}
