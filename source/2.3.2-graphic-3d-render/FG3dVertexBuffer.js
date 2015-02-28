//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.Graphic3d.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dObject);
   //..........................................................
   // @attribute
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   //..........................................................
   // @method
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @return 名称
   //==========================================================
   function FG3dVertexBuffer_name(){
      return this._name;
   }
}
