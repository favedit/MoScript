//==========================================================
// <T>脚本加载器。</T>
//
// @reference
// @author maocy
// @version 150809
//==========================================================
RJsLoader = new function RJsLoader(){
   var o = this;
   //..........................................................
   // @method
   o._callback = null;
   //..........................................................
   // @method
   o.onFinish  = RJsLoader_onFinish;
   o.onLoad    = RJsLoader_onLoad;
   //..........................................................
   // @method
   o.loadUrl   = RJsLoader_loadUrl;
   return o;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
// @param buffer:String 数据内容
//==========================================================
function RJsLoader_onFinish(buffer){
   // 解析字符串
   var source = MO.Lang.String.decodeUtf(buffer);
   // 解析脚本
   eval(source);
   // 设置变量
   top.MO = MO;
   // 回调处理
   RJsLoader._callback();
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
function RJsLoader_onLoad(event){
   var o = this;
   // 检查内容
   var content = event.content;
   if(content.constructor != ArrayBuffer){
      return alert('Load script failure.');
   }
   // 解压缩处理
   var lzma = new LZMA("../ajs/lzma_worker.js");
   lzma.decompress(new Uint8Array(content), o.onFinish, null);
}

//==========================================================
// <T>加载网络脚本文件。</T>
//
// @method
// @param url:String 网络地址
// @param callback:Function 回调函数
//==========================================================
function RJsLoader_loadUrl(url, callback){
   var o = this;
   // 发送数据请求
   var connection = MO.Class.create(MO.FHttpConnection);
   connection.setAsynchronous(true);
   connection.addLoadListener(o, o.onLoad);
   connection.send(url);
   // 设置回调函数
   o._callback = callback;
}
