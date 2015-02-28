//==========================================================
// <T>全局对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RGlobal = new function RGlobal(){
   var o = this;
   /// @attribute TMap 全局对象的存储表
   o.instances = new TDictionary();
   // @method
   o.get       = RGlobal_get;
   o.set       = RGlobal_set;
   o.globalGet = RGlobal_globalGet;
   o.globalSet = RGlobal_globalSet;
   return o;
}

//==========================================================
// <T>根据名称获得一个对象。</T>
//
// @method
// @param n:name:String 名称
// @return Object 对象
//==========================================================
function RGlobal_get(n){
   return this.instances.get(n);
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:Object 对象
//==========================================================
function RGlobal_set(n, v){
   this.instances.set(n, v);
}

//==========================================================
// <T>根据名称获得一个对象。</T>
//
// @method
// @param n:name:String 名称
// @return Object 对象
//==========================================================
function RGlobal_globalGet(n){
   if(top.RGlobal){
      return top.RGlobal.get(n);
   }
   return this.instances.get(n);
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param n:name:String 名称
// @param v:value:Object 对象
//==========================================================
function RGlobal_globalSet(n, v){
   if(top.RGlobal){
      top.RGlobal.set(n, v);
   }else{
      this.instances.set(n, v);
   }
}
