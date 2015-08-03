//==========================================================
// <T>命名空间。</T>
//
// @space
// @author maocy
// @version 150228
//==========================================================
var MO = new function MoSpace(){
   var o = this;
   o.version = '0.3.0';
   o.info    = new Object();
   o.Lang    = new function MoLangSpace(){return this;}
   o.Stream  = new function MoStreamSpace(){return this;}
   o.Core    = new function MoCoreSpace(){return this;}
   o.Gui     = new function MoGuiSpace(){return this;}
   o.Dui     = new function MoDuiSpace(){return this;}
   return o;
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param name:String 名称
// @param value:Object 对象
//==========================================================
MO.initialize = function MO_initialize(){
   var o = this;
   // 初始化名称
   var count = 0;
   for(var name in o){
      var value = o[name];
      if(value){
         // 设置函数名称
         if(value.constructor == Function){
            value.__name = name;
         }
      }
      count++;
   }
   // 设置信息
   o.info.count = count;
}

//==========================================================
// <T>根据名称存储一个对象。</T>
//
// @method
// @param name:String 名称
// @param value:Object 对象
//==========================================================
MO.release = function MO_release(){
   var o = this;
}
