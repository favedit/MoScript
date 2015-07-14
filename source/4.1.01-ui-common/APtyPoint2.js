//==========================================================
// <T>二维点的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @author maocy
// @version 150101
//==========================================================
MO.APtyPoint2 = function APtyPoint2(name, linker, x, y){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._x       = MO.Lang.Integer.nvl(x);
   o._y       = MO.Lang.Integer.nvl(y);
   //..........................................................
   // @method
   o.load     = MO.APtyPoint2_load;
   o.save     = MO.APtyPoint2_save;
   o.toString = MO.APtyPoint2_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyPoint2_load = function APtyPoint2_load(instance, xconfig){
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
MO.APtyPoint2_save = function APtyPoint2_save(instance, xconfig){
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
MO.APtyPoint2_toString = function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
