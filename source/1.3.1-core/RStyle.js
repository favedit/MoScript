//===========================================================
// <T>样式管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//===========================================================
MO.RStyle = new function RStyle(){
   var o = this;
   // @attribute
   o._connected = false;
   o._rules     = new MO.TMap();
   // @method
   o.connect    = RStyle_connect;
   o.has        = RStyle_has;
   o.nvl        = RStyle_nvl;
   o.style      = RStyle_style;
   return o;

   //============================================================
   // <T>建立样式表。</T>
   //============================================================
   function RStyle_connect(){
      var o = this;
      if(o._connected){
         return;
      }
      // 链接数据
      var s = o._rules;
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
      o._connected = true;
   }

   //============================================================
   // <T>判断是否含有。</T>
   //============================================================
   function RStyle_has(s){
      var o = this;
      // 链接数据
      if(!o._connected){
         o.connect();
      }
      // 判断内容
      if(s){
         return this._rules.contains('.' + s.toLowerCase());
      }
      return false;
   }

   //============================================================
   // <T>获得内容。</T>
   //============================================================
   function RStyle_nvl(s, n){
      var o = this;
      o.connect();
      var a = arguments;
      var c = a.length;
      for(var n = 0; n < c; n++){
         var s = a[n];
         if(s){
            if(o._rules.contains('.' + s.toLowerCase())){
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
   function RStyle_style(c, n){
      return RClass.name(c) + '_' + n;
   }
}
