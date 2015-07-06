//==========================================================
// <T>环境信息。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
MO.FEnvironment = function FEnvironment(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name  = MO.Class.register(o, new MO.AGetSet('_name'));
   o._value = MO.Class.register(o, new MO.AGetSet('_value'));
   //..........................................................
   // @method
   o.set    = MO.FEnvironment_set;
   return o;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param name:String 名称
// @param value:String 内容
//==========================================================
MO.FEnvironment_set = function FEnvironment_set(name, value){
   var o = this;
   o._name = name;
   o._value = value;
}
