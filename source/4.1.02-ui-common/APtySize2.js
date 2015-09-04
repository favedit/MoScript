//==========================================================
// <T>二维尺寸的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param width:Integer 宽度
// @param height:Integer 高度
// @author maocy
// @version 150101
//==========================================================
MO.APtySize2 = function APtySize2(name, linker, width, height){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._width   = MO.Lang.Integer.nvl(width);
   o._height  = MO.Lang.Integer.nvl(height);
   //..........................................................
   // @method
   o.load     = MO.APtySize2_load;
   o.save     = MO.APtySize2_save;
   // @method
   o.toString = MO.APtySize2_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtySize2_load = function APtySize2_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var size = instance[name];
   if(!size){
      size = instance[name] = new MO.SSize2();
   }
   size.parse(value);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtySize2_save = function APtySize2_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var size = instance[name];
   if(size){
      var value = size.toString()
      xconfig.set(o._linker, value);
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtySize2_toString = function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
