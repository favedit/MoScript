//==========================================================
// <T>渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._source = null;
   //..........................................................
   // @method
   o.source  = FG3dShader_source;
   // @method
   o.upload  = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>获得源代码。</T>
//
// @method
// @return String 源代码
//==========================================================
function FG3dShader_source(){
   return this._source;
}
