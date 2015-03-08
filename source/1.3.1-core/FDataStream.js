//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FDataStream(o){
   o = RClass.inherits(this, o, FObject, MDataView, MDataStream);
   //..........................................................
   // @attribute
   o._length   = 0;
   o._memory   = null;
   o._viewer   = null;
   //..........................................................
   // @method
   o.construct = FDataStream_construct;
   // @method
   o.length    = FDataStream_length;
   o.setLength = FDataStream_setLength;
   o.memory    = FDataStream_memory;
   // @method
   o.dispose   = FDataStream_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FDataStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   //o._memory = new ArrayBuffer();
   //o._viewer = new DataView(o._memory);
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Integer 长度
//==========================================================
function FDataStream_length(){
   return this._length;
}

//==========================================================
// <T>设置长度。</T>
//
// @method
// @param p:length:Integer 长度
//==========================================================
function FDataStream_setLength(p){
   var o = this;
   o._length = p;
   o._memory = new ArrayBuffer(p);
   o._viewer = new DataView(o._memory);
}

//==========================================================
// <T>获得内存。</T>
//
// @method
// @return ArrayBuffer 内存
//==========================================================
function FDataStream_memory(){
   return this._memory;
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
function FDataStream_dispose(){
   var o = this;
   o._viewer = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
