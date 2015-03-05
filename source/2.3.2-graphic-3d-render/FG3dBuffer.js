//==========================================================
// <T>渲染缓冲。</T>
//
// @class
// @author maocy
// @history 150305
//==========================================================
function FG3dBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._name   = null;
   //..........................................................
   // @method
   o.name    = FG3dBuffer_name;
   // @method
   o.isValid = RMethod.virtual(o, 'isValid');
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return 名称
//==========================================================
function FG3dBuffer_name(){
   return this._name;
}
