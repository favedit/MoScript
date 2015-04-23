//==========================================================
// <T>环境信息的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
var RContext = new function(){
   var o = this;
   //..........................................................
   // @property
   o.optionGarbage = true;
   // @attribute
   o._location     = null;
   o._contexts     = new Object();
   // @attribute
   o.contextPath   = null;
   o.contextTag    = null;
   o.themeId       = null;
   o.languageId    = null;
   //..........................................................
   // @method
   o.construct     = RContext_construct;
   o.initialize    = RContext_initialize;
   o.get           = RContext_get;
   o.find          = RContext_find;
   o.location      = RContext_location;
   o.context       = RContext_context;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//===========================================================
// <T>构造环境信息的管理类。</T>
//
// @method
//===========================================================
function RContext_construct(){
   var o = this;
   if(window.ActiveXObject){
      o.optionGarbage = true;
   }else{
      o.optionGarbage = false;
   }
}

//==========================================================
// <T>根据路径获得访问路径地址。</T>
// <P>包含协议，地址，端口等部分的全部地址。</P>
//
// @method
// @param s:source:String 路径
// @return String 访问路径
//==========================================================
function RContext_location(s){
   var o = this;
   var r = o._location;
   if(r == null){
      // 重新计算访问路径
      var l = window.location;
      var hr = l.href;
      var pn = l.pathname;
      r = hr.substring(0, hr.indexOf(pn))
      if(o.contextPath){
         r += o.contextPath;
      }
      o._location = r;
   }
   // 获得访问全路径
   if(s){
      r += s;
   }
   return r;
}

//==========================================================
// <T>根据路径获得环境路径地址。</T>
// <P>不包含协议，地址，端口等部分的路径。</P>
//
// @method
// @param s:source:String 路径
// @return String 环境路径
//==========================================================
function RContext_context(s){
   var o = this;
   if(s != null){
      if(RString.endsWith(s, '.wv')){
         // 获得服务地址
         return o.contextPath + '/' + s;
      }else if(RString.startsWith(s, '#')){
         // 获得标签环境地址
         return o.contextPath + o.contextTag + s.substr(1);
      }
      // 获得环境地址
      return o.contextPath + s;
   }
   return o.contextPath;
}

//==========================================================
// <T>初始化全部的环境内容。</T>
//
// @method
// @param s:source:Object 环境内容
//==========================================================
function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new TContext(n, nc, v);
      }
   }
}

//==========================================================
// <T>根据路径获得一个定义内容。</T>
//
// @method
// @param p:path:String 路径
// @return String 内容
//==========================================================
function RContext_get(p, p1, p2, p3, p4, p5){
   var o = this;
   var r = o._contexts[p];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (path={1})', p);
   }
   return RString.format(r.text, p1, p2, p3, p4, p5)
}

//==========================================================
// <T>根据类和名称获得一个定义内容。</T>
//
// @method
// @param s:scope:String 范围
// @param c:name:String 代码
// @return String 内容
//==========================================================
function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return RLogger.fatal(o, null, 'Can not find context (id={1})', id);
   }
   return r.text;
}
