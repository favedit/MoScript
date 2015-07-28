//==========================================================
// <T>服务信息管理类。</T>
//
// @tool
// @author maocy
// @version 150119
//===========================================================
MO.RDuiService = function RDuiService(){
   var o = this;
   //..........................................................
   // @attribute
   o._services = new MO.TDictionary();
   return o;
}

//==========================================================
// <T>生成服务地址。</T>
//
// @method
// @param p:name:String 名称
// @return String 服务地址
//===========================================================
MO.RDuiService.prototype.url = function RDuiService_url(p){
   if(MO.Lang.String.startsWith(p, 'http://')){
      return p;
   }
   if(MO.Lang.String.startsWith(p, '#')){
      return p.substr(1);
   }
   if(!MO.Lang.String.startsWith(p, '/')){
      p = '/' + p;
   }
   // return RBrowser.contentPath(p + '.ws');
   return p + '.ws';
}

//==========================================================
// <T>生成解析服务内容。</T>
//
// @method
// @param p:source:String 来源
// @return SServiceInfo 服务信息
//===========================================================
MO.RDuiService.prototype.makeUrl = function RDuiService_makeUrl(s, a){
   return this.url(s) + '?action=' + a;
}

//==========================================================
// <T>解析服务内容。</T>
//
// @method
// @param p:source:String 来源
// @return SServiceInfo 服务信息
//===========================================================
MO.RDuiService.prototype.parse = function RDuiService_parse(p){
   var o = this;
   var s = null;
   var ss = o._services;
   if(p){
      s = ss.get(p);
      if(s == null){
         var ps = p.split('@');
         if(ps.length == 1){
            if(ps[0]){
               s = new MO.SServiceInfo();
               s.service = ps[0];
               s.action = null;
               s.url = o.url(ps[0]);
            }
         }else if(ps.length == 2){
            if(ps[0] && ps[1]){
               s = new MO.SServiceInfo();
               s.service = ps[1];
               s.action = ps[0];
               s.url = o.url(ps[1]) + '?action=' + ps[0];
            }
         }
      }
      if(s == null){
         throw new MO.TError(o, 'Unknown service format. (source={1})', p);
      }
      ss.set(p, s);
   }
   return s;
}
//..........................................................
// 实例化内容
MO.RDuiService = new MO.RDuiService();
