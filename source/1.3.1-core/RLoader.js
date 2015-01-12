//==========================================================
// <T>管理系统加载的各种脚本内容。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//===========================================================
var RLoader = new function RLoader(){
   var o = this;
   // Attribute
   o._loading      = new TArray();
   o._loaded       = new TArray()
   o._waits        = new TArray()
   o._intervalId   = null;
   // Html
   o.hWindow       = null;
   // Event
   o.onInterval    = RLoader_onInterval;
   // Method
   o.intervalStart = RLoader_intervalStart;
   o.intervalStop  = RLoader_intervalStop;
   o.loadJsFile    = RLoader_loadJsFile;
   o.loadJs        = RLoader_loadJs;
   o.loaded        = RLoader_loaded;
   o.wait          = RLoader_wait;
   o.waitJs        = RLoader_waitJs;
   o.dispose       = RLoader_dispose;
   return o;
}
 
//==========================================================
//
//==========================================================
function RLoader_dispose(){
   var o = this;
   o.intervalStop();
   o.hWindow = null;
}

//==========================================================
// <T>监视页面中加载的脚本文件，如果满足条件则回调加载后函数。</T>
//
// @method
//==========================================================
function RLoader_onInterval(){
   var o = this;
   // 检查已加载的标识
   var ws = o._waits;
   var c = ws.length;
   for(var n=0; n<c; n++){
      var l = ws.get(n);
      if(l){
         if(l.check(o._loaded)){
            // 调用加载响应函数
            l.invoke.invoke();
            ws.set(n, null);
         }
      }
   }
   // 清除未使用得项目，如果为空，则停止定时器
   ws.compress();
   if(ws.isEmpty()){
      o.intervalStop();
   }
}

//==========================================================
// <T>启动定时检查器。</T>
//
// @method
//==========================================================
function RLoader_intervalStart(){
   var o = this;
   if(!o._intervalId){
      o.hWindow = window;
      // 布置定时器
      o._intervalId = window.setInterval(function(){o.onInterval();}, 10);
   }
}

//==========================================================
// <T>停止定时检查器。</T>
//
// @method
//==========================================================
function RLoader_intervalStop(){
   var o = this;
   var w = o.hWindow;
   if(w && o._intervalId){
      // 清除定时器
      w.clearInterval(o._intervalId);
      o.hWindow = null;
      o._intervalId = null;
   }
}

//==========================================================
// <T>异步加载指定的一个脚本文件。</T>
//
// @method
// @param id:String 标识
// @param src:source:String 源名称
//==========================================================
function RLoader_loadJsFile(id, src){
   var o = this;
   var d = RWindow.hDocument;
   var h = d.getElementsByTagName("head")[0];
   // 建立页面链接
   if(document.getElementById(id) == null){
      var url = top.RContext.location(src);
      var hs = RWindow.createElement('SCRIPT');
      hs.id = id;
      hs.type = 'text/javascript';
      hs.src = url;
      if(d.attachEvent){
         // IE browser
         hs.onreadystatechange = function(){
            var s = hs.readyState;
            if('loaded' == s || 'complete' == s){
               hs.onreadystatechange = null;
               // 设置加载信息标识
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }else{
         // Firefox/Chrome browser
         hs.onload = function(){
            if(d.readyState == 'complete'){
               hs.onload = null;
               // 设置加载信息标识
               o._loading.extract(id);
               o._loaded.push(id);
            }
         }
      }
      // 开始加载
      h.appendChild(hs);
   }
}

//==========================================================
// <T>异步加载指定的多个脚本文件。</T>
//
// @method
// @param ps:params:String... 脚本文件列表
//==========================================================
function RLoader_loadJs(ps){
   var as = arguments;
   var c = as.length;
   for(var n = 0; n < c; n++){
      var p = as[n];
      this.loadJsFile('js:' + p, '/ajs/' + p.replace(/\./g, '/') + '.js');
   }
}

//==========================================================
// <T>某个脚本已经被加载。</T>
//
// @method
// @param id:String... 标识列表
//==========================================================
function RLoader_loaded(id){
   var o = this;
   // 设置加载中和已加载的标识
   o._loading.extract(id);
   o._loaded.push(id);
}

//==========================================================
// <T>等待指定的一个或多个标识的脚本文件被加载后，调用要响应的函数。</T>
//
// @method
// @param invoke:TInvoke 回调函数
// @param ids:String... 标识列表
//==========================================================
function RLoader_wait(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var c = arguments.length;
   for(var n = 1; n < c; n++){
      l.ids.push(arguments[n]);
   }
   o._waits.push(l);
   // 布置检查定时器
   o.intervalStart();
}

//==========================================================
// <T>等待指定的一个或多个标识的脚本文件被加载后，调用要响应的函数。</T>
//
// @method
// @param invoke:TInvoke 回调函数
// @param ids:String... 标识列表
//==========================================================
function RLoader_waitJs(invoke, ids){
   var o = this;
   var l = new TLoaderListener();
   l.invoke = invoke;
   var as = arguments;
   var c = as.length;
   for(var n = 1; n < c; n++){
      l.ids.push('js:' + as[n]);
   }
   o._waits.push(l);
   // 布置检查定时器
   o.intervalStart();
}
