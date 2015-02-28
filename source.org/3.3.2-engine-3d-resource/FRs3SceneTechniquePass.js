//==========================================================
// <T>资源场景技术过程。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneTechniquePass(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._targetWidth  = null;
   o._targetHeight = null;
   //..........................................................
   // @method
   o.targetWidth   = FRs3SceneTechniquePass_targetWidth;
   o.targetHeight  = FRs3SceneTechniquePass_targetHeight;
   o.unserialize   = FRs3SceneTechniquePass_unserialize;
   return o;
}

//==========================================================
// <T>获得目标宽度。</T>
//
// @method
// @return 目标宽度
//==========================================================
function FRs3SceneTechniquePass_targetWidth(){
   return this._targetWidth;
}

//==========================================================
// <T>获得目标高度。</T>
//
// @method
// @return 目标高度
//==========================================================
function FRs3SceneTechniquePass_targetHeight(){
   return this._targetHeight;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取属性
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
