with(MO){
   //==========================================================
   // <T>资源处理管道。</T>
   //
   // @class
   // @author maocy
   // @version 150507
   //==========================================================
   MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      //..........................................................
      // @attribute
      o._startTime  = 0;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      //..........................................................
      // @event
      o.onComplete  = FResourceThreadPipeline_onComplete;
      //..........................................................
      // @method
      o.construct   = FResourceThreadPipeline_construct;
      // @method
      o.worker      = FResourceThreadPipeline_worker;
      // @method
      o.decompress  = FResourceThreadPipeline_decompress;
      // @method
      o.dispose     = FResourceThreadPipeline_dispose;
      return o;
   }

   //==========================================================
   // <T>完成处理。</T>
   //
   // @method
   // @param buffer:ArrayBuffer 数据
   //==========================================================
   MO.FResourceThreadPipeline_onComplete = function FResourceThreadPipeline_onComplete(buffer){
      var o = this;
      // 获得数据
      var bufferData = null;
      if(buffer.constructor == Array){
         bufferData = new Uint8Array(buffer);
      }else if(buffer.constructor == Uint8Array){
         bufferData = buffer;
      }else{
         throw new TError(o, 'Unknown buffer type.');
      }
      // 设置数据
      var data = o._data;
      data.completeData(bufferData);
      // 输出信息
      var span = RTimer.now() - o._startTime;
      RLogger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, buffer.byteLength, span);
      // 完成处理
      o._console.onPipelineComplete(o, data);
      // 清空数据
      o._data = null;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FResourceThreadPipeline_construct = function FResourceThreadPipeline_construct(){
      var o = this;
      o.__base.FResourcePipeline.construct.call(o);
   }

   //==========================================================
   // <T>获得工作器。</T>
   //
   // @method
   // @return LZMA 工作器
   //==========================================================
   MO.FResourceThreadPipeline_worker = function FResourceThreadPipeline_worker(){
      var o = this;
      var worker = o._worker;
      if(!worker){
         var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
         worker = o._worker = new LZMA_WORKER(uri);
      }
      return worker;
   }

   //==========================================================
   // <T>解压资源数据处理。</T>
   //
   // @method
   // @param data:MResourceData 资源数据
   //==========================================================
   MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
      var o = this;
      o._startTime = RTimer.current();
      // 获得数据
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      // 解压缩处理
      var worker = o.worker();
      worker.decompress(compressData, function(buffer){o.onComplete(buffer);}, null);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   MO.FResourceThreadPipeline_dispose = function FResourceThreadPipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      // 父处理
      o.__base.FPipeline.dispose.call(o);
   }
}
