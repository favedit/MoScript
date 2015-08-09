RJsLoader = new function RJsLoader(){
   var o = this;
   o._callback = null;
   o.onFinish  = RJsLoader_onFinish;
   o.onLoad    = RJsLoader_onLoad;
   o.loadUrl   = RJsLoader_loadUrl;
   return o;
}
function RJsLoader_onFinish(buffer){
   eval(buffer);
   top.MO = MO;
   RJsLoader._callback();
}
function RJsLoader_onLoad(event){
   var o = this;
   var content = event.content;
   if(content.constructor != ArrayBuffer){
      return alert('Load script failure.');
   }
   var lzma = new LZMA("../ajs/lzma_worker.js");
   lzma.decompress(new Uint8Array(content), o.onFinish, null);
}
function RJsLoader_loadUrl(url, callback){
   var o = this;
   var connection = MO.Class.create(MO.FHttpConnection);
   connection.setAsynchronous(true);
   connection.addLoadListener(o, o.onLoad);
   connection.send(url);
   o._callback = callback;
}
