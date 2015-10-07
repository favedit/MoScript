//==========================================================
// <T>二进制网络端口。</T>
//
// @class
// @author maocy
// @history 151007
//==========================================================
MO.FBinarySocket = function FBinarySocket(o){
   o = MO.Class.inherits(this, o, MO.FSocket);
   //..........................................................
   // @method
   o.connect = MO.FBinarySocket_connect;
   return o;
}

//==========================================================
// <T>链接处理。</T>
//
// @method
// @param url:String 网络地址
//==========================================================
MO.FBinarySocket_connect = function FBinarySocket_connect(url){
   var o = this;
   o.__base.FSocket.connect.call(o, url);
   o._handle.binaryType = "arraybuffer" ; 
}
