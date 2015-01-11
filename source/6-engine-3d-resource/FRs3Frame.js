//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3Frame(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._tick       = 0;
   o._matrix     = null;
   //..........................................................
   // @method
   o.construct   = FRs3Frame_construct;
   o.tick        = FRs3Frame_tick;
   o.matrix      = FRs3Frame_matrix;
   o.unserialize = FRs3Frame_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Frame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return Integer 间隔
//==========================================================
function FRs3Frame_tick(){
   return this._tick;
}

//==========================================================
// <T>查找矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FRs3Frame_matrix(){
   return this._matrix;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Frame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._matrix.unserialize(p);
}
