//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150212
//==========================================================
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @method
   o.setup   = FG3dObject_setup;
   o.dispose = FG3dObject_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dObject_setup(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
