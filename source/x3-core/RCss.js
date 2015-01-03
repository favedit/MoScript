//************************************************************
// <T>样式表管理器。</T>
//************************************************************
var RCss = new function(){
   var o = this;
   // Attribute
   o.connected = false;
   o.rules     = new TMap();
   // Method
   o.connect   = RCss_connect;
   o.has       = RCss_has;
   o.nvl       = RCss_nvl;
   o.style     = RCss_style;
   // Construct
   RMemory.register('RCss', o);
   return o;
}

//============================================================
// <T>建立样式表。</T>
//============================================================
function RCss_connect(){
   var o = this;
   if(o.connected){
      return;
   }
   // 链接数据
   var s = o.rules;
   var ds = document.styleSheets;
   var dc = ds.length;
   for(var n = 0; n < dc; n++){
      var rs = ds[n].cssRules;
      if(rs){
         var rc = rs.length;
         for(var i = 0; i < rc; i++){
            var r = rs[i];
            s.set(r.selectorText, r);
         }
      }
   }
   o.connected = true;
}

//============================================================
// <T>判断是否含有。</T>
//============================================================
function RCss_has(s){
   var o = this;
   // 建立数据
   if(!o.connected){
      o.connect();
   }
   // 判断内容
   if(s){
      return o.rules.contains('.' + s.toLowerCase());
   }
   return false;
}

//============================================================
// <T>获得内容。</T>
//============================================================
function RCss_nvl(s, n){
   var o = this;
   // 建立数据
   if(!o.connected){
      o.connect();
   }
   // 获得内容
   var c = arguments.length;
   for(var n = 0; n < c; n++){
      var s = arguments[n];
      if(s){
         if(o.rules.contains('.' + s.toLowerCase())){
            return s;
         }
      }
   }
   return null;
}

//============================================================
// <T>获得内容。</T>
//
// @param c:class:TClass 类对象
// @param n:name:String 名称
//============================================================
function RCss_style(c, n){
   return RClass.name(c) + '_' + n;
}
