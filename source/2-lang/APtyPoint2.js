//==========================================================
// <T>二维点的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @author maocy
// @version 150101
//==========================================================
function APtyPoint2(o, n, l, x, y){
   if(!o){o = this;}
   AProperty(o, n, l);
   //..........................................................
   // @attribute
   o._x       = RInteger.nvl(x);
   o._y       = RInteger.nvl(y);
   //..........................................................
   // @method
   o.load     = APtyPoint2_load;
   o.save     = APtyPoint2_save;
   o.toString = APtyPoint2_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param x:config:TNode 节点
//============================================================
function APtyPoint2_load(v, x){
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
function APtyPoint2_save(v, x){
   var o = this;
   x.set(o.name, v[o.name].toString());
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function APtyPoint2_toString(){
   var o = this;
   return '<Point2Property:linker=' + o.linker + ',value=' + o._x + ',' + o._y +  '>';
}
