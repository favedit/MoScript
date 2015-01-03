//===========================================================
// <T>运行信息管理类。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
var RBrowser = new function RBrowser(){
   var o = this;
   // @event
   o.typeCd    = 0;
   // @method
   o.construct = RBrowser_construct;
   return o;
}

//===========================================================
// <T>构造处理。</T>
//===========================================================
function RBrowser_construct(){
   var s = window.navigator.userAgent.toLowerCase();
   if(s.indexOf("msie") != -1){
      this.typeCd = EBrowser.Explorer;
   }else if(s.indexOf("windows") != -1){
      this.typeCd = EBrowser.Explorer;
   }else if(s.indexOf("firefox") != -1){
      this.typeCd = EBrowser.FireFox;
   }else if(s.indexOf("chrome") != -1){
      this.typeCd = EBrowser.Chrome;
   }else{
      alert(s);
   }
}
