//==========================================================
// <T>命名空间。</T>
//
// @space
// @author maocy
// @version 150228
//==========================================================
var MO = new function MoSpace(){
   var o = this;
   o.version = '0.2.0';
   o.info    = new Object();
   return o;
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param name:String 名称
// @param value:Object 对象
//==========================================================
MO.initialize = function RMO_initialize(){
   var o = this;
   var info = o.info;
   var count = 0;
   for(var name in this){
      var value = this[name];
      if(value){
         if(value.constructor == Function){
            value.__name = name;
         }
      }
      count++;
   }
   info.count = count;
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param name:String 名称
// @param value:Object 对象
//==========================================================
MO.release = function RMO_release(){
}
