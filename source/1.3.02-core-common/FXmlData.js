//==========================================================
// <T>配置数据。</T>
//
// @class
// @author maocy
// @version 150311
//==========================================================
MO.FXmlData = function FXmlData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._ready    = null;
   o._config   = null;
   //..........................................................
   // @method
   o.testReady = MO.FXmlData_testReady;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FXmlData_testReady = function FXmlData_testReady(){
   return this._ready;
}
