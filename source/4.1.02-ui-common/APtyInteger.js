//==========================================================
// <T>整数的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param value:Integer 缺省内容
// @author maocy
// @version 141231
//==========================================================
MO.APtyInteger = function APtyInteger(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._value   = MO.Lang.Integer.nvl(value);
   //..........................................................
   // @method
   o.build    = MO.APtyInteger_build;
   o.load     = MO.APtyInteger_load;
   o.save     = MO.APtyInteger_save;
   o.toString = MO.APtyInteger_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param instance:Object 对象
//============================================================
MO.APtyInteger_build = function APtyInteger_build(instance){
   var o = this;
   var name = o._name;
   if(instance[name] == null){
      instance[name] = o._value;
   }
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyInteger_load = function APtyInteger_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Integer.parse(value);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyInteger_save = function APtyInteger_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   xconfig.set(o._linker, MO.Lang.Integer.toString(value));
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyInteger_toString = function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
