//==========================================================
// <T>环境信息的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
MO.RContext = function RContext(){
   var o = this;
   //..........................................................
   // @attribute
   o._location   = null;
   o._contexts   = new Object();
   // @attribute
   o.contextPath = null;
   o.contextTag  = null;
   o.themeId     = null;
   o.languageId  = null;
   return o;
}

//==========================================================
// <T>根据路径获得访问路径地址。</T>
// <P>包含协议，地址，端口等部分的全部地址。</P>
//
// @method
// @param s:source:String 路径
// @return String 访问路径
//==========================================================
MO.RContext.prototype.location = function RContext_location(s){
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
MO.RContext.prototype.context = function RContext_context(s){
   var o = this;
   if(s != null){
      if(MO.Lang.String.endsWith(s, '.wv')){
         // 获得服务地址
         return o.contextPath + '/' + s;
      }else if(MO.Lang.String.startsWith(s, '#')){
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
MO.RContext.prototype.initialize = function RContext_initialize(s){
   var o = this;
   for(var n in s){
      var ls = s[n];
      for(var nc in ls){
         var v = ls[nc];
         var fn = n + ':' + nc;
         o._contexts[fn] = new MO.TContext(n, nc, v);
      }
   }
}

//==========================================================
// <T>根据路径获得一个定义内容。</T>
//
// @method
// @param code:String 路径
// @return String 内容
//==========================================================
MO.RContext.prototype.get = function RContext_get(code, p1, p2, p3, p4, p5){
   var o = this;
   var context = o._contexts[code];
   if(!context){
      return MO.Logger.warn(o, 'Can not find context (code={1})', code);
   }
   return MO.Lang.String.format(context.text, p1, p2, p3, p4, p5)
}

//==========================================================
// <T>根据类和名称获得一个定义内容。</T>
//
// @method
// @param s:scope:String 范围
// @param c:name:String 代码
// @return String 内容
//==========================================================
MO.RContext.prototype.find = function RContext_find(s, c){
   var o = this;
   var id = s + ':' + c;
   var r = o._contexts[id];
   if(!r){
      return MO.Logger.warn(o, 'Can not find context (id={1})', id);
   }
   return r.text;
}
//..........................................................
// 实例化内容
MO.RContext = new MO.RContext();
