//==========================================================
// <T>JSON数据通讯的控制台。</T>
//
// @console
// @author maocy
// @version 150104
//==========================================================
MO.FJsonConsole = function FJsonConsole(o){
   o = MO.Class.inherits(this, o, MO.FHttpConsole);
   //..........................................................
   // @method
   o.create = MO.FJsonConsole_create;
   return o;
}

//==========================================================
// <T>创建一个网络链接。</T>
//
// @method
// @return 网络链接
//==========================================================
MO.FJsonConsole_create = function FJsonConsole_create(){
   return MO.Class.create(MO.FJsonConnection);
}
