//==========================================================
// <T>布尔的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param value:Boolean 缺省内容
// @author maocy
// @version 141231
//==========================================================
MO.APtyBoolean = function APtyBoolean(name, linker, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._value    = value ? value : false;
   //..........................................................
   // @method
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param instance:Object 对象
//============================================================
MO.APtyBoolean_build = function APtyBoolean_build(instance){
   var o = this;
   if(instance[o._name] == null){
      instance[o._name] = o._value;
   }
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyBoolean_load = function APtyBoolean_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name] = MO.Lang.Boolean.parse(value);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyBoolean_save = function APtyBoolean_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(value){
      xconfig.set(o._linker, MO.Lang.Boolean.toString(value));
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyBoolean_toString = function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
