//==========================================================
// <T>填充的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param left:Integer 左边距
// @param top:Integer 上边距
// @param right:Integer 右边距
// @param bottom:Integer 下边距
// @author maocy
// @version 150101
//==========================================================
MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._left    = MO.Lang.Integer.nvl(left);
   o._top     = MO.Lang.Integer.nvl(top);
   o._right   = MO.Lang.Integer.nvl(right);
   o._bottom  = MO.Lang.Integer.nvl(bottom);
   //..........................................................
   // @method
   o.load     = MO.APtyPadding_load;
   o.save     = MO.APtyPadding_save;
   // @method
   o.toString = MO.APtyPadding_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var padding = instance[name];
   if(!padding){
      padding = instance[name] = new MO.SPadding();
   }
   padding.parse(value);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var padding = instance[name];
   if(padding){
      if(!padding.isEmpty()){
         var value = padding.toString()
         xconfig.set(o._linker, value);
      }
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyPadding_toString = function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
