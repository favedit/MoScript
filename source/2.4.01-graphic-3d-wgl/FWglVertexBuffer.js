//==========================================================
// <T>WebGL渲染顶点流。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexBuffer);
   //..........................................................
   // @attribute
   o._handle = null;
   //..........................................................
   // @method
   o.setup   = MO.FWglVertexBuffer_setup;
   // @method
   o.isValid = MO.FWglVertexBuffer_isValid;
   o.upload  = MO.FWglVertexBuffer_upload;
   // @method
   o.dispose = MO.FWglVertexBuffer_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createBuffer();
}

//==========================================================
// <T>当前缓冲是否有效。</T>
//
// @method
// @return Boolean 是否有效
//==========================================================
MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
   var o = this;
   var graphic = o._graphicContext._handle;
   return graphic.isBuffer(o._handle);
}

//==========================================================
// <T>上传数据</T>
//
// @method
// @param data:Array 数据
// @param stride:Integer 宽度
// @param count:Integer 总数
// @param remain:Boolean 保留数据
//==========================================================
MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count, remain){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._handle;
   // 设置数据
   if(remain){
      o._data = data;
   }
   o._stride = stride;
   o._count = count;
   // 获得数据
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case MO.EG3dAttributeFormat.Float1:
         case MO.EG3dAttributeFormat.Float2:
         case MO.EG3dAttributeFormat.Float3:
         case MO.EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new MO.TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new MO.TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   // 绑定数据
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bindbuffer');
   // 上传数据
   graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
   context.checkError('bufferData', 'bufferData');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   // TODO：待优化
   o._resource = null;
   // 释放对象
   var buffer = o._handle;
   if(buffer){
      context._handle.deleteBuffer(buffer);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
