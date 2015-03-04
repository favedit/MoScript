//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o._stride   = 0;
   o._count    = 0;
   //..........................................................
   // @method
   o.name      = FG3dVertexBuffer_name;
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return 名称
//==========================================================
function FG3dVertexBuffer_name(){
   return this._name;
}
