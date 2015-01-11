//===========================================================
// <T>循环入口。</T>
//
// @tool
// @author maocy
// @version 141229
//===========================================================
function SLoopEntry(o){
   if(!o){o = this;}
   // @property
   o.prior = null;
   o.next  = 0;
   o.value = null;
   return o;
}
