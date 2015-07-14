//==========================================================
// <T>渲染顶点缓冲。</T>
//
// @class
// @author maocy
// @history 150512
//==========================================================
MO.FE3rIndexBuffer = function FE3rIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FWglIndexBuffer, MO.MLinkerResource);
   //..........................................................
   // @method
   o.dispose = MO.FE3rIndexBuffer_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rIndexBuffer_dispose = function FE3rIndexBuffer_dispose(){
   var o = this;
   o.__base.MLinkerResource.dispose.call(o);
   o.__base.FWglIndexBuffer.dispose.call(o);
}
