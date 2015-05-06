//==========================================================
// <T>资源分块。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FResourceBlock(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._ready    = false;
   o._data     = null;
   //..........................................................
   // @method
   o.testReady = FResourceBlock_testReady;
   // @method
   o.dispose   = FResourceBlock_dispose;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
function FResourceBlock_testReady(){
   return this._ready;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FResourceBlock_dispose(){
   var o = this;
   o._compressData = null;
   o._data = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
