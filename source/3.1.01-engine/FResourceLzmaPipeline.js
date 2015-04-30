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
   //..........................................................
   // @method
   o.construct        = FResourceLzmaPipeline_construct;
   // @method
   o.decompress       = FResourceLzmaPipeline_decompress;
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
// <T>获得压缩类型。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_construct(){
   var o = this;
   o.__base.FResourcePipeline.construct.call(o);
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
   // 创建工作器
   var worker = o._worker;
   if(!worker){
      var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
      worker = o._worker = new LZMA(uri);
   }
   // 解压缩处理
   worker.decompress(data, function(value){o.onComplete(value);}, null);
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
