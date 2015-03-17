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
   o._worker    = null;
   //..........................................................
   // @event
   o.onComplete = FResourceLzmaPipeline_onComplete;
   //..........................................................
   // @method
   o.construct  = FResourceLzmaPipeline_construct;
   // @method
   o.decompress = FResourceLzmaPipeline_decompress;
   // @method
   o.dispose    = FResourceLzmaPipeline_dispose;
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
   o._console.onPipelineComplete(o, r, p);
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
   // 创建工作器
   var u = RBrowser.contentPath('/ajs/lzma_worker.js');
   o._worker = new LZMA(u);
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
   o._worker.decompress(d, function(v){o.onComplete(v);}, null);
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
