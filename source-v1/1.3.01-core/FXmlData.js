//==========================================================
// <T>配置数据。</T>
//
// @class
// @author maocy
// @version 150311
//==========================================================
function FXmlData(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._ready    = null;
   o._config   = null;
   //..........................................................
   // @method
   o.testReady = FXmlData_testReady;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
function FXmlData_testReady(){
   return this._ready;
}
