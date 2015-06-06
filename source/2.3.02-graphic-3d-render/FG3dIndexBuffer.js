with(MO){
   //==========================================================
   // <T>渲染索引流。</T>
   //
   // @class FObject
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      //..........................................................
      // @attribute
      o._strideCd     = EG3dIndexStride.Uint16;
      o._count        = 0;
      // @attribute
      o._drawModeCd   = EG3dDrawMode.Triangles;
      o._lineWidth    = 1;
      //..........................................................
      // @method
      o.strideCd      = FG3dIndexBuffer_strideCd;
      o.setStrideCd   = FG3dIndexBuffer_setStrideCd;
      o.drawModeCd    = FG3dIndexBuffer_drawModeCd;
      o.setDrawModeCd = FG3dIndexBuffer_setDrawModeCd;
      o.lineWidth     = FG3dIndexBuffer_lineWidth;
      o.setLineWidth  = FG3dIndexBuffer_setLineWidth;
      o.count         = FG3dIndexBuffer_count;
      // @method
      o.upload        = RMethod.virtual(o, 'upload');
      return o;
   }

   //==========================================================
   // <T>获得宽度类型。</T>
   //
   // @method
   // @return EG3dIndexStride 宽度类型
   //==========================================================
   MO.FG3dIndexBuffer_strideCd = function FG3dIndexBuffer_strideCd(){
      return this._strideCd;
   }

   //==========================================================
   // <T>设置宽度类型。</T>
   //
   // @method
   // @param strideCd:EG3dIndexStride 宽度类型
   //==========================================================
   MO.FG3dIndexBuffer_setStrideCd = function FG3dIndexBuffer_setStrideCd(strideCd){
      this._strideCd = strideCd;
   }

   //==========================================================
   // <T>获得绘制模式。</T>
   //
   // @method
   // @return EG3dDrawMode 填充模式
   //==========================================================
   MO.FG3dIndexBuffer_drawModeCd = function FG3dIndexBuffer_drawModeCd(){
      return this._drawModeCd;
   }

   //==========================================================
   // <T>设置绘制模式。</T>
   //
   // @method
   // @param drawModeCd:EG3dDrawMode 填充模式
   //==========================================================
   MO.FG3dIndexBuffer_setDrawModeCd = function FG3dIndexBuffer_setDrawModeCd(drawModeCd){
      this._drawModeCd = drawModeCd;
   }

   //==========================================================
   // <T>获得线宽。</T>
   //
   // @method
   // @return Number 线宽
   //==========================================================
   MO.FG3dIndexBuffer_lineWidth = function FG3dIndexBuffer_lineWidth(){
      return this._lineWidth;
   }

   //==========================================================
   // <T>设置线宽。</T>
   //
   // @method
   // @param lineWidth:Number 线宽
   //==========================================================
   MO.FG3dIndexBuffer_setLineWidth = function FG3dIndexBuffer_setLineWidth(lineWidth){
      this._lineWidth = lineWidth;
   }

   //==========================================================
   // <T>获得总数。</T>
   //
   // @method
   // @return Integer 总数
   //==========================================================
   MO.FG3dIndexBuffer_count = function FG3dIndexBuffer_count(){
      return this._count;
   }
}
