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
//==========================================================
function FResourceLzmaPipeline_onComplete(p){
   var o = this;
   var r = o._resource;
   var t = RTimer.current() - o._startTime;
   RLogger.info(o, 'Process resource decompress. (guid={1}, length={2}, tick={3})', r.guid(), o._dataLength, t);
   o._console.onPipelineComplete(o, r, p);
   o._startTime = RTimer.current();
}

//==========================================================
// <T>获得压缩类型。</T>
//
// @method
// @return EResourceCompress 压缩类型
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
function FResourceLzmaPipeline_decompress(r){
   var o = this;
   var d = r._data;
   o._resource = r;
   // 创建工作器
   var w = o._worker;
   if(!w){
      var u = RBrowser.contentPath('/ajs/lzma_worker.js');
      w = o._worker = new LZMA(u);
   }
   // 解压缩处理
   w.decompress(d, function(v){o.onComplete(v);}, null);
   o._dataLength = d.byteLength;
   o._startTime = RTimer.current();
}

//==========================================================
// <T>解压处理。</T>
//
// @method
//==========================================================
function FResourceLzmaPipeline_decompressSingle(r){
   var o = this;
   var d = r._data;
   o._resource = r;
   // 回调工作方式
   LZMAD.decompress(d, function(v){o.onComplete(v);}, null);
   o._dataLength = d.byteLength;
   o._startTime = RTimer.current();
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
