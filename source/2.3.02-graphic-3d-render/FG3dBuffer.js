//==========================================================
// <T>渲染缓冲。</T>
//
// @class
// @author maocy
// @history 150305
//==========================================================
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data   = MO.Class.register(o, new MO.AGetSet('_data'));
   //..........................................................
   // @method
   o.isValid = MO.Method.virtual(o, 'isValid');
   // @method
   o.dispose = MO.FG3dBuffer_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dBuffer_dispose = function FG3dBuffer_dispose(){
   var o = this;
   // 释放属性集合
   o._data = null;
   // 父处理
   o.__base.FG3dObject.dispose.call(o);
}
