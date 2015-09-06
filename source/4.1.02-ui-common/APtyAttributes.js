//==========================================================
// <T>填充的属性描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联名称
// @param splitName:String 名称分隔
// @param splitValue:String 内容分隔
// @author maocy
// @version 150101
//==========================================================
MO.APtyAttributes = function APtyAttributes(name, linker, splitName, splitValue){
   var o = this;
   MO.AProperty.call(o, name, linker);
   //..........................................................
   // @attribute
   o._splitName  = MO.Lang.String.nvl(splitName, '=');
   o._splitValue = MO.Lang.String.nvl(splitValue, '\n');
   //..........................................................
   // @method
   o.load        = MO.APtyAttributes_load;
   o.save        = MO.APtyAttributes_save;
   // @method
   o.toString    = MO.APtyAttributes_toString;
   return o;
}

//============================================================
// <T>加载属性值。</T>
//
// @method
// @param instance:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyAttributes_load = function APtyAttributes_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var attributes = instance[name];
   if(!attributes){
      attributes = instance[name] = new MO.TAttributes();
   }
   var value = xconfig.get(o._linker);
   attributes.split(value, o._splitName, o._splitValue);
}

//============================================================
// <T>存储属性值。</T>
//
// @method
// @param v:value:Object 对象
// @param xconfig:TNode 节点
//============================================================
MO.APtyAttributes_save = function APtyAttributes_save(instance, xconfig){
   var o = this;
   var attributes = instance[o._name];
   if(attributes){
      xconfig.set(o._linker, attributes.join(o._splitName, o._splitValue));
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyAttributes_toString = function APtyAttributes_toString(){
   var o = this;
   return 'linker=' + o._linker + ',split_name=' + o._splitName + ',split_value' + o._splitValue;
}
