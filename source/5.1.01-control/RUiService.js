with(MO){
   //==========================================================
   // <T>服务信息管理类。</T>
   //
   // @tool
   // @author maocy
   // @version 150119
   //===========================================================
   MO.RUiService = function RUiService(){
      var o = this;
      //..........................................................
      // @attribute
      o._services = new TDictionary();
      return o;
   }

   //==========================================================
   // <T>生成服务地址。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return String 服务地址
   //===========================================================
   MO.RUiService.prototype.url = function RUiService_url(p){
      if(RString.startsWith(p, 'http://')){
         return p;
      }
      if(RString.startsWith(p, '#')){
         return p.substr(1);
      }
      if(!RString.startsWith(p, '/')){
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
   MO.RUiService.prototype.makeUrl = function RUiService_makeUrl(s, a){
      return this.url(s) + '?action=' + a;
   }

   //==========================================================
   // <T>解析服务内容。</T>
   //
   // @method
   // @param p:source:String 来源
   // @return SServiceInfo 服务信息
   //===========================================================
   MO.RUiService.prototype.parse = function RUiService_parse(p){
      var o = this;
      var s = null;
      var ss = o._services;
      if(p){
         s = ss.get(p);
         if(s == null){
            var ps = p.split('@');
            if(ps.length == 1){
               if(ps[0]){
                  s = new SServiceInfo();
                  s.service = ps[0];
                  s.action = null;
                  s.url = o.url(ps[0]);
               }
            }else if(ps.length == 2){
               if(ps[0] && ps[1]){
                  s = new SServiceInfo();
                  s.service = ps[1];
                  s.action = ps[0];
                  s.url = o.url(ps[1]) + '?action=' + ps[0];
               }
            }
         }
         if(s == null){
            throw new TError(o, 'Unknown service format. (source={1})', p);
         }
         ss.set(p, s);
      }
      return s;
   }
   //..........................................................
   // 实例化内容
   MO.RUiService = new RUiService();
}
