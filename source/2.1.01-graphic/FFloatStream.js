//==========================================================
// <T>图形数据。</T>
//
// @class
// @author maocy
// @history 150308
//==========================================================
MO.FFloatStream = function FFloatStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   o._length     = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory     = MO.Class.register(o, new MO.AGetter('_memory'), null);
   o._position   = 0;
   //..........................................................
   // @method
   o.construct   = MO.FFloatStream_construct;
   // @method
   o.setLength   = MO.FFloatStream_setLength;
   // @method
   o.writeFloat4 = MO.FFloatStream_writeFloat4;
   o.writeColor4 = MO.FFloatStream_writeColor4;
   // @method
   o.reset       = MO.FFloatStream_reset;
   o.clear       = MO.FFloatStream_clear;
   // @method
   o.dispose     = MO.FFloatStream_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FFloatStream_construct = function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>设置长度。</T>
//
// @method
// @param length:Integer 长度
//==========================================================
MO.FFloatStream_setLength = function FFloatStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new Float32Array(length);
}

//==========================================================
// <T>写入4个浮点数。</T>
//
// @method
// @param value1:Float 浮点数1
// @param value2:Float 浮点数2
// @param value3:Float 浮点数3
// @param value4:Float 浮点数4
//==========================================================
MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(value1, value2, value3, value4){
   var o = this;
   o._memory[o._position++] = value1;
   o._memory[o._position++] = value2;
   o._memory[o._position++] = value3;
   o._memory[o._position++] = value4;
}

//==========================================================
// <T>写入颜色。</T>
//
// @method
// @param value:SColor4 颜色
//==========================================================
MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(value){
   this.writeFloat4(value.red, value.green, value.blue, value.alpha);
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FFloatStream_reset = function FFloatStream_reset(){
   this._position = 0;
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FFloatStream_clear = function FFloatStream_clear(){
   this._position = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
MO.FFloatStream_dispose = function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
