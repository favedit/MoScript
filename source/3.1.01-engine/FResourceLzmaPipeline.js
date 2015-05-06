//==========================================================
// <T>资源处理管道。</T>
//
// @class
// @author maocy
// @version 150317
//==========================================================
function FResourceLzmaPipeline(o){
   o = RClass.inherits(this, o, FResourcePipeline);
   //..........................................................
   // @attribute
   o._worker          = null;
   o._dataLength      = 0;
   o._startTime       = 0;
   //..........................................................
   // @event
   o.onComplete       = FResourceLzmaPipeline_onComplete;
   o.onBlockComplete  = FResourceLzmaPipeline_onBlockComplete;
   //..........................................................
   // @method
   o.construct        = FResourceLzmaPipeline_construct;
   // @method
   o.worker           = FResourceLzmaPipeline_worker;
   // @method
   o.decompress       = FResourceLzmaPipeline_decompress;
   o.decompressBlock  = FResourceLzmaPipeline_decompressBlock;
   o.decompressSingle = FResourceLzmaPipeline_decompressSingle;
   // @method
   o.dispose          = FResourceLzmaPipeline_dispose;
   return o;
}

//==========================================================
// <T>完成处理。</T>
//
// @method
// @param data:ArrayBuffer 数据
//==========================================================
function FResourceLzmaPipeline_onComplete(data){
   var o = this;
   var resource = o._resource;
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource decompress. (guid={1}, length={2}, total={3}, tick={4})', resource.guid(), o._dataLength, data.byteLength, span);
   o._console.onPipelineComplete(o, resource, data);
   o._startTime = RTimer.current();
}

//==========================================================
// <T>完成分块处理。</T>
//
// @method
// @param data:ArrayBuffer 数据
//==========================================================
function FResourceLzmaPipeline_onBlockComplete(data){
   var o = this;
   var resource = o._resource;
   var block = o._block;
   var span = RTimer.now() - o._startTime;
   RLogger.info(o, 'Process resource block decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', resource.guid(), block._index, o._dataLength, data.byteLength, span);
   o._console.onPipelineBlockComplete(o, resource, block, data);
   o._startTime = RTimer.current();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
}

//==========================================================
// <T>获得工作器。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_worker(){
   var o = this;
   var worker = o._worker;
   if(!worker){
      var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA(uri);
   }
   return worker;
}

//==========================================================
// <T>解压处理。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_decompress(resource){
   var o = this;
   var data = resource._data;
   o._resource = resource;
   // 解压缩处理
   var worker = o.worker();
   worker.decompress(data, function(value){o.onComplete(value);}, null);
   o._dataLength = data.byteLength;
   o._startTime = RTimer.current();
}

//==========================================================
// <T>解压处理。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_decompressBlock(resource, block){
   var o = this;
   var data = block._compressData;
   o._resource = resource;
   o._block = block;
   // 解压缩处理
   var worker = o.worker();
   worker.decompress(data, function(value){o.onBlockComplete(value);}, null);
   o._dataLength = data.byteLength;
   o._startTime = RTimer.current();
}

//==========================================================
// <T>解压处理。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_decompressSingle(resource){
   var o = this;
   var d = resource._data;
   o._resource = resource;
   o._dataLength = d.byteLength;
   o._startTime = RTimer.now();
   // 回调工作方式
   //var inflate = new Zlib.RawInflate(d);
   //var inflate = new Zlib.Inflate(d);
   //var plain = inflate.decompress();
   LZMAD.decompress(d, function(value){o.onComplete(value);}, null);
   //o.onComplete(plain);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_dispose(){
   var o = this;
   o._worker = null;
   // 父处理
   o.__base.FPipeline.dispose.call(o);
}
