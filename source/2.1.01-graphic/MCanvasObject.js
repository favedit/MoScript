//==========================================================
// <T>画板对象。</T>
//
// @face
// @author maocy
// @history 150411
//==========================================================
MO.MCanvasObject = function MCanvasObject(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.htmlCanvas = MO.Method.virtual(o, 'htmlCanvas');
   return o;
}
