//==========================================================
// <T>字体的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param font:String 字体
// @param size:String 字号
// @param bold:String 粗体
// @param color:String 颜色
// @author sunpeng
// @version 150821
//==========================================================
MO.APtyFont = function APtyFont(name, linker, font, size, bold, color) {
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._font  = MO.Lang.Integer.nvl(font);
   o._size  = MO.Lang.Integer.nvl(size);
   o._bold  = MO.Lang.Integer.nvl(bold);
   o._color = MO.Lang.Integer.nvl(color);
   //..........................................................
   // @method
   o.load = MO.APtyFont_load;
   o.save = MO.APtyFont_save;
   // @method
   o.toString = MO.APtyFont_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyFont_load = function APtyFont_load(instance, xconfig) {
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
MO.APtyFont_save = function APtyFont_save(instance, xconfig) {
   var o = this;
   var value = instance[o._name];
   if (!value.isEmpty()) {
      xconfig.set(o._linker, value.toString());
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyFont_toString = function APtyFont_toString() {
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._font + ',' + o._size + o._bold + ',' + o._color;
}
