//==========================================================
// <T>资源场景技术过程。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._targetWidth  = null;
   o._targetHeight = null;
   //..........................................................
   // @method
   o.targetWidth   = FE3sSceneTechniquePass_targetWidth;
   o.targetHeight  = FE3sSceneTechniquePass_targetHeight;
   o.unserialize   = FE3sSceneTechniquePass_unserialize;
   return o;
}

//==========================================================
// <T>获得目标宽度。</T>
//
// @method
// @return 目标宽度
//==========================================================
function FE3sSceneTechniquePass_targetWidth(){
   return this._targetWidth;
}

//==========================================================
// <T>获得目标高度。</T>
//
// @method
// @return 目标高度
//==========================================================
function FE3sSceneTechniquePass_targetHeight(){
   return this._targetHeight;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
