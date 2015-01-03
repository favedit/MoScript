// ============================================================
// RServiceFace
// ============================================================
var RService = new function(){
   var o = this;
   // Method
   o.url   = RService_url;
   o.parse = RService_parse;
   // Construct
   RMemory.register('RService', o);
   return o;
}
// ------------------------------------------------------------
function RService_url(name){
   if(RString.startsWith(name, 'http://')){
      return name;
   }
   if(RString.startsWith(name, '#')){
      return name.substr(1);
   }
   if(!RString.startsWith(name, '/')){
      name = '/' + name;
   }
   return top.RContext.context(name + '.ws');
}
// ------------------------------------------------------------
function RService_parse(service){
   var o = null;
   if(service){
      var items = service.split('@');
      if(items.length == 1){
         if(items[0]){
            o = new TService();
            o.service = items[0];
            o.action = null;
            o.url = this.url(o.service);
         }
      }else if(items.length == 2){
         if(items[0] && items[1]){
            o = new TService();
            o.service = items[1];
            o.action = items[0];
            o.url = this.url(o.service);
         }
      }
   }
   return o;
}

