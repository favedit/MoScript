//==========================================================
// <T>资源技术过程。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
MO.FE3sTechniquePass = function FE3sTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._targetWidth  = MO.Class.register(o, new MO.AGetter('_targetWidth'));
   o._targetHeight = MO.Class.register(o, new MO.AGetter('_targetHeight'));
   //..........................................................
   // @method
   o.unserialize   = MO.FE3sTechniquePass_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
