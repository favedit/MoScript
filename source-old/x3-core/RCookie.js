/***********************************************************
 * <T>页面存储信息的工具类。</T>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
var RCookie = new function(o){
   o = moNvl(o, this);
   // Constant
   o.ConnectId  = 'MOCK';
   // Attribute
   o.storeDays  = 30;
   o.cookies    = new TAttributes();
   // Method
   o.get        = RCookie_get;
   o.set        = RCookie_set;
   o.connect    = RCookie_connect;
   o.disconnect = RCookie_disconnect;
   o.release    = RCookie_release;
   // Construct
   RMemory.register('RCookie', o);
   return o;
}

/***********************************************************
 * <T>根据名称获得属性内容。</T>
 *
 * @method
 * @param n:name:String 名称
 * @return String 内容
 **********************************************************/
function RCookie_get(n){
   return RString.nvl(this.cookies.get(n));
}

/***********************************************************
 * <T>设置名称和属性内容。</T>
 *
 * @method
 * @param n:name:String 名称
 * @param v:value:String 内容
 * @return String 内容
 **********************************************************/
function RCookie_set(n, v){
   this.cookies.set(n, v);
}

/***********************************************************
 * <T>关联存储信息。</T>
 *
 * @method
 **********************************************************/
function RCookie_connect(){
   var o = this;
   var cs = o.cookies;
   var ac = document.cookie.split('; ');
   for(var n=0; n<ac.length; n++){
      var s = ac[n];
      var i = s.indexOf('=');
      if(-1 != i){
         var n = s.substring(0, i);
         if(o.ConnectId == n){
            var ts = new TAttributes()
            ts.unpack(s.substring(i + 1));
            for(var n=0; n<ts.count; n++){
               var cv = ts.value(n);
               if(!RString.isEmpty(cv)){
                  cs.set(ts.name(n), unescape(ts.value(n)));
               }
            }
            break;
         }
      }
   }
}

/***********************************************************
 * <T>关闭存储信息。</T>
 *
 * @method
 **********************************************************/
function RCookie_disconnect(){
   var o = this;
   var d = new Date();
   d.setTime(d.getTime() + (RDate.DaySeconds * o.storeDays));
   var cs = o.cookies;
   var ts = new TAttributes();
   var c = cs.count;
   for(var n=0; n<c; n++){
      var v = cs.value(n);
      if(!RString.isEmpty(v)){
         ts.set(cs.name(n), escape(v));
      }
   }
   document.cookie = o.ConnectId + "=" + ts.pack() + ";expires=" + d.toGMTString();
}

/***********************************************************
 * <T>释放所有存储信息。</T>
 *
 * @method
 **********************************************************/
function RCookie_release(){
   var o = this;
   var d = new Date();
   d.setTime(d.getTime() -1 );
   document.cookie = o.ConnectId + "=null;expires=" + d.toGMTString();
}
