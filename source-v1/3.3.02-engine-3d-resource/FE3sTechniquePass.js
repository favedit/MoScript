//==========================================================
// <T>资源技术过程。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
function FE3sTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._targetWidth  = null;
   o._targetHeight = null;
   //..........................................................
   // @method
   o.targetWidth   = FE3sTechniquePass_targetWidth;
   o.targetHeight  = FE3sTechniquePass_targetHeight;
   o.unserialize   = FE3sTechniquePass_unserialize;
   return o;
}

//==========================================================
// <T>获得目标宽度。</T>
//
// @method
// @return 目标宽度
//==========================================================
function FE3sTechniquePass_targetWidth(){
   return this._targetWidth;
}

//==========================================================
// <T>获得目标高度。</T>
//
// @method
// @return 目标高度
//==========================================================
function FE3sTechniquePass_targetHeight(){
   return this._targetHeight;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
function FE3sTechniquePass_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._targetWidth = input.readUint16();
   o._targetHeight = input.readUint16();
}
