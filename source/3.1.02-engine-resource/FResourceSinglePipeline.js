//==========================================================
// <T>资源处理管道。</T>
//
// @class
// @author maocy
// @version 150507
//==========================================================
MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
   o = MO.Class.inherits(this, o, MO.FResourcePipeline);
   //..........................................................
   // @attribute
   o._startTime  = 0;
   o._statusBusy = false;
   o._data       = 0;
   o._dataLength = 0;
   o._worker     = null;
   //..........................................................
   // @event
   o.onComplete  = MO.FResourceSinglePipeline_onComplete;
   //..........................................................
   // @method
   o.construct   = MO.FResourceSinglePipeline_construct;
   // @method
   o.testBusy    = MO.FResourceSinglePipeline_testBusy;
   o.decompress  = MO.FResourceSinglePipeline_decompress;
   // @method
   o.dispose     = MO.FResourceSinglePipeline_dispose;
   return o;
}

//==========================================================
// <T>完成处理。</T>
//
// @method
// @param buffer:ArrayBuffer 数据
//==========================================================
MO.FResourceSinglePipeline_onComplete = function FResourceSinglePipeline_onComplete(buffer){
   var o = this;
   var data = o._data;
   // 获得数据
   var bufferData = null;
   if(buffer.constructor == Array){
      bufferData = new Uint8Array(buffer);
   }else if(buffer.constructor == ArrayBuffer){
      bufferData = buffer;
   }else{
      throw new MO.TError(o, 'Unknown buffer type.');
   }
   // 设置数据
   data.completeData(bufferData);
   // 输出信息
   var span = MO.Timer.now() - o._startTime;
   MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, bufferData.byteLength, span);
   // 完成处理
   o._console.onPipelineComplete(null, data);
   // 清空数据
   o._data = null;
   o._statusBusy = false;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FResourceSinglePipeline_construct = function FResourceSinglePipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}

//==========================================================
// <T>测试是否处理中。</T>
//
// @method
// @return Boolean 是否处理中
//==========================================================
MO.FResourceSinglePipeline_testBusy = function FResourceSinglePipeline_testBusy(){
   return this._statusBusy;
}

//==========================================================
// <T>解压资源数据处理。</T>
//
// @method
// @param data:MResourceData 资源数据
//==========================================================
MO.FResourceSinglePipeline_decompress = function FResourceSinglePipeline_decompress(data){
   var o = this;
   o._statusBusy = true;
   o._startTime = MO.Timer.current();
   // 获得数据
   var compressData = data.compressData();
   o._data = data;
   o._dataLength = compressData.byteLength;
   // 获得数据
   var processData = null;
   if(compressData.constructor == ArrayBuffer){
      processData = new Uint8Array(compressData);
   }else if(compressData.constructor == Uint8Array){
      processData = compressData;
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   // 解压缩处理
   LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
   var o = this;
   o._data = null;
   o._worker = null;
   // 父处理
   o.__base.FPipeline.dispose.call(o);
}
