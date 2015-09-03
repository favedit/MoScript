//==========================================================
// <T>集合的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param search:String 缺省内容
// @param value:Boolean 缺省内容
// @author maocy
// @version 141231
//==========================================================
MO.APtySet = function APtySet(name, linker, search, value){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   var code = null;
   if(MO.Lang.String.startsWith(name, '_')){
      code = name.substring(1);
   }else{
      code = name;
   }
   o._code   = MO.Lang.String.toUnderline(code);
   o._search = search;
   o._value  = value;
   //..........................................................
   // @method
   o.code     = MO.APtySet_code;
   o.build    = MO.APtySet_build;
   o.load     = MO.APtySet_load;
   o.save     = MO.APtySet_save;
   o.toString = MO.APtySet_toString;
   return o;
}

//============================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//============================================================
MO.APtySet_code = function APtySet_code(){
   return this._code;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param instance:Object 对象
//============================================================
MO.APtySet_build = function APtySet_build(instance){
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
MO.APtySet_load = function APtySet_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker)
   instance[o._name] = MO.Lang.Set.containsString(value, o._search);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtySet_save = function APtySet_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var search = o._search;
   var value = instance[name];
   var values = xconfig.get(o._linker);
   var exists = MO.Lang.Set.containsString(xs, search);
   if(value && !exists){
      xconfig.set(name, values + search);
   }else if(!value && exists){
      xconfig.set(name, MO.Lang.String.remove(values, search));
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtySet_toString = function APtySet_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value + ',search=' + o._search;
}
