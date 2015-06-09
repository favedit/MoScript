with(MO){
   //==========================================================
   // <T>WebGL渲染索引流。</T>
   //
   // @class FObject
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FWglIndexBuffer = function FWglIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dIndexBuffer);
      //..........................................................
      // @attribute
      o._handle = null;
      //..........................................................
      // @method
      o.setup   = FWglIndexBuffer_setup;
      // @method
      o.isValid = FWglIndexBuffer_isValid;
      o.upload  = FWglIndexBuffer_upload;
      // @method
      o.dispose = FWglIndexBuffer_dispose;
      return o;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
      var o = this;
      o.__base.FG3dIndexBuffer.setup.call(o);
      o._handle = o._graphicContext._handle.createBuffer();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
      var o = this;
      var g = o._graphicContext._handle;
      return g.isBuffer(o._handle);
   }

   //==========================================================
   // <T>上传数据</T>
   //
   // @method
   // @param pd:data:Uin16Array 数据
   // @param pc:count:Integer 总数
   //==========================================================
   MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(pd, pc){
      var o = this;
      var c = o._graphicContext;
      var g = c._handle;
      // 设置数据
      o._count = pc;
      // 获得数据
      var d = null;
      if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
         if(o._strideCd == EG3dIndexStride.Uint16){
            d = new Uint16Array(pd);
         }else if(o._strideCd == EG3dIndexStride.Uint32){
            d = new Uint32Array(pd);
         }else{
            throw new TError(o, 'Index stride is invalid.');
         }
      }else if(pd.constructor == Uint16Array){
         if(o._strideCd != EG3dIndexStride.Uint16){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else if(pd.constructor == Uint32Array){
         if(o._strideCd != EG3dIndexStride.Uint32){
            throw new TError(o, 'Index stride16 is invalid.');
         }
         d = pd;
      }else{
         throw new TError(o, 'Upload index data type is invalid. (value={1})', pd);
      }
      // 上传数据
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._handle);
      c.checkError('bindBuffer', 'Bind buffer failure.');
      g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
      c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
      var o = this;
      var c = o._graphicContext;
      // 释放对象
      var n = o._handle;
      if(n){
         c._handle.deleteBuffer(n);
         o._handle = null;
      }
      // 父处理
      o.__base.FG3dIndexBuffer.dispose.call(o);
   }
}
