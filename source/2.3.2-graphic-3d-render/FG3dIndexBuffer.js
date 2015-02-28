//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._strideCd = EG3dIndexStride.Uint16;
   o._count    = 0;
   //..........................................................
   // @method
   o.strideCd  = FG3dIndexBuffer_strideCd;
   o.count     = FG3dIndexBuffer_count;
   // @method
   o.upload    = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>获得宽度类型。</T>
//
// @method
// @return EG3dIndexStride 宽度类型
//==========================================================
function FG3dIndexBuffer_strideCd(){
   return this._strideCd;
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
function FG3dIndexBuffer_count(){
   return this._count;
}
