//==========================================================
// <T>WebGL渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.FWglIndexBuffer = function FWglIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dIndexBuffer);
   //..........................................................
   // @attribute
   o._handle = null;
   //..........................................................
   // @method
   o.setup   = MO.FWglIndexBuffer_setup;
   // @method
   o.isValid = MO.FWglIndexBuffer_isValid;
   o.upload  = MO.FWglIndexBuffer_upload;
   // @method
   o.dispose = MO.FWglIndexBuffer_dispose;
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
   var handle = o._graphicContext._handle;
   return handle.isBuffer(o._handle);
}

//==========================================================
// <T>上传数据</T>
//
// @method
// @param data:Uin16Array 数据
// @param count:Integer 总数
// @param remain:Boolean 保留数据
//==========================================================
MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(data, count, remain){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   // 设置数据
   if(remain){
      o._data = data;
   }
   o._count = count;
   // 获得数据
   var memory = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      if(o._strideCd == MO.EG3dIndexStride.Uint16){
         memory = new Uint16Array(data);
      }else if(o._strideCd == MO.EG3dIndexStride.Uint32){
         memory = new Uint32Array(data);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(data.constructor == Uint16Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else if(data.constructor == Uint32Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', data);
   }
   // 上传数据
   handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bind buffer failure.');
   handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
   context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   // TODO：待优化
   o._resource = null;
   // 释放对象
   var handle = o._handle;
   if(handle){
      context._handle.deleteBuffer(handle);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dIndexBuffer.dispose.call(o);
}
