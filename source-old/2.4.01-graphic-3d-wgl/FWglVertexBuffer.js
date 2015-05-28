//==========================================================
// <T>WebGL渲染顶点流。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   //..........................................................
   // @attribute
   o._native = null;
   //..........................................................
   // @method
   o.setup   = FWglVertexBuffer_setup;
   // @method
   o.isValid = FWglVertexBuffer_isValid;
   o.upload  = FWglVertexBuffer_upload;
   // @method
   o.dispose = FWglVertexBuffer_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var graphic = o._graphicContext._native;
   o._native = graphic.createBuffer();
}

//==========================================================
// <T>当前缓冲是否有效。</T>
//
// @method
// @return Boolean 是否有效
//==========================================================
function FWglVertexBuffer_isValid(){
   var o = this;
   var graphic = o._graphicContext._native;
   return graphic.isBuffer(o._native);
}

//==========================================================
// <T>上传数据</T>
//
// @method
// @param data:Array 数据
// @param stride:Integer 宽度
// @param count:Integer 总数
//==========================================================
function FWglVertexBuffer_upload(data, stride, count){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._native;
   // 设置数据
   o._stride = stride;
   o._count = count;
   // 获得数据
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case EG3dAttributeFormat.Float1:
         case EG3dAttributeFormat.Float2:
         case EG3dAttributeFormat.Float3:
         case EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   // 绑定数据
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._native);
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
function FWglVertexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   // 释放对象
   var buffer = o._native;
   if(buffer){
      context._native.deleteBuffer(buffer);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
