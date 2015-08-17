//==========================================================
// <T>数据观察。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FEncryptedView = function FEncryptedView(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MDataView, MO.MEncryptedStream);
   //..........................................................
   // @method
   o.construct = MO.FEncryptedView_construct;
   // @method
   o.setSign   = MO.FEncryptedView_setSign;
   o.link      = MO.FEncryptedView_link;
   // @method
   o.dispose   = MO.FEncryptedView_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
MO.FEncryptedView_construct = function FEncryptedView_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._data = new ArrayBuffer(8);
   o._dataViewer = new DataView(o._data);
}

//==========================================================
// <T>设置整数签名。</T>
//
// @param sign:Integer 签名
//==========================================================
MO.FEncryptedView_setSign = function FEncryptedView_setSign(value){
   var o = this;
   var sign = o._sign = new Uint8Array(8);
   sign[0] = (value      ) & 0xFF;
   sign[1] = (value >>  8) & 0xFF;
   sign[2] = (value >> 16) & 0xFF;
   sign[3] = (value >> 24) & 0xFF;
   sign[4] = (value >> 24) & 0xFF;
   sign[5] = (value >> 16) & 0xFF;
   sign[6] = (value >>  8) & 0xFF;
   sign[7] = (value      ) & 0xFF;
   o._signLength = sign.length;
}

//==========================================================
// <T>构造处理。</T>
//
// @param data:Array 数组
//==========================================================
MO.FEncryptedView_link = function FEncryptedView_link(data){
   var o = this;
   o._memory = data;
   o._viewer = new DataView(data);
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
MO.FEncryptedView_dispose = function FEncryptedView_dispose(){
   var o = this;
   o._sign = null;
   o._data = null;
   o._dataViewer.buffer = null;
   o._dataViewer = null;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
