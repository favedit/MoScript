//==========================================================
// <T>XML数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FXmlConsole = function FXmlConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   //..........................................................
   // @method
   o.create = MO.FXmlConsole_create;
   return o;
}

//==========================================================
// <T>创建一个网络链接。</T>
//
// @method
// @return 网络链接
//==========================================================
MO.FXmlConsole_create = function FXmlConsole_create(){
   return MO.Class.create(MO.FXmlConnection);
}
