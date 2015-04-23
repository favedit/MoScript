//==========================================================
// <T>图形数据。</T>
//
// @class
// @author maocy
// @history 150308
//==========================================================
function FFloatStream(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   o._length     = 0;
   o._memory     = null;
   o._position   = 0;
   //..........................................................
   // @method
   o.construct   = FFloatStream_construct;
   // @method
   o.length      = FFloatStream_length;
   o.setLength   = FFloatStream_setLength;
   o.memory      = FFloatStream_memory;
   // @method
   o.writeFloat4 = FFloatStream_writeFloat4;
   o.writeColor4 = FFloatStream_writeColor4;
   // @method
   o.reset       = FFloatStream_reset;
   o.clear       = FFloatStream_clear;
   // @method
   o.dispose     = FFloatStream_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>获得长度。</T>
//
// @method
// @return Integer 长度
//==========================================================
function FFloatStream_length(){
   return this._length;
}

//==========================================================
// <T>设置长度。</T>
//
// @method
// @param p:length:Integer 长度
//==========================================================
function FFloatStream_setLength(p){
   var o = this;
   o._length = p;
   o._memory = new Float32Array(p);
}

//==========================================================
// <T>获得内存。</T>
//
// @method
// @return ArrayBuffer 内存
//==========================================================
function FFloatStream_memory(){
   return this._memory;
}

//==========================================================
// <T>写入4个浮点数。</T>
//
// @method
// @param a:value1:Float 浮点数1
// @param b:value2:Float 浮点数2
// @param c:value3:Float 浮点数3
// @param d:value4:Float 浮点数4
//==========================================================
function FFloatStream_writeFloat4(a, b, c, d){
   var o = this;
   o._memory[o._position++] = a;
   o._memory[o._position++] = b;
   o._memory[o._position++] = c;
   o._memory[o._position++] = d;
}

//==========================================================
// <T>写入颜色。</T>
//
// @method
// @param p:color:SColor4 颜色
//==========================================================
function FFloatStream_writeColor4(p){
   this.writeFloat4(p.red, p.green, p.blue, p.alpha);
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
function FFloatStream_reset(){
   this._position = 0;
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FFloatStream_clear(){
   this._position = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @author maocy
//==========================================================
function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
