//==========================================================
// <T>全局对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RGlobal = function RGlobal(){
   var o = MO.RSingleton.call(this);
   //..........................................................
   // @attribute
   o._instances = new MO.TDictionary();
   return o;
}

//==========================================================
// <T>根据名称获得一个对象。</T>
//
// @method
// @param name:String 名称
// @return Object 对象
//==========================================================
MO.RGlobal.prototype.get = function RGlobal_get(name){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   } 
   return global._instances.get(name);
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param name:String 名称
// @param value:Object 对象
//==========================================================
MO.RGlobal.prototype.set = function RGlobal_set(name, value){
   var global = this;
   if(top.MO){
      if(top.MO.Global){
         global = top.MO.Global;
      }
   } 
   return global._instances.set(name, value);
}
//..........................................................
// 实例化内容
MO.Global = new MO.RGlobal();
