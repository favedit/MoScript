// ============================================================
// RPage
// ============================================================
var RPage = new function(){
   var o = this;
   // Method
   o.url      = RPage_url;
   o.parse    = RPage_parse;
   o.redirect = RPage_redirect;
   // Construct
   RMemory.register('RPage', o);
   return o;
}
// ------------------------------------------------------------
function RPage_url(name){
   if(RString.startsWith(name, 'http://')){
      return name;
   }
   return top.RContext.context(name);
}
// ------------------------------------------------------------
function RPage_parse(page){
   if(!page){
      return null;
   }
   // 找出参数前的地址部分
   var ps = '';
   var n = page.indexOf('?');
   if(-1 != n){
      ps = page.substring(n);
      page = page.substring(0, n);
   }
   // 分割函数和地址
   var p = null;
   var items = page.split('@');
   if(1 == items.length && items[0]){
      p = new TPage();
      p.action = null;
      p.page = items[0] + ps;
      p.url = this.url(p.page);
   }else if(2 == items.length && items[0] && items[1]){
      p = new TPage();
      p.action = items[0];
      p.page = items[1] + ps;
      p.url = this.url(p.page);
   }
   return p;
}

// ------------------------------------------------------------
// form, target, uri, method
function RPage_redirect(f, t, u, m){
   // Set env
   RConsole.find(FEnvConsole).buildValue();
   // Send
   u = RString.nvl(u);
   if(m){
      u += '?do=' + m;
   }
   f.action = u;
   if(t){
      f.target = t;
   }
   f.method = 'POST';
   f.submit();
}
// ------------------------------------------------------
