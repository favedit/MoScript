//==========================================================
// <T>界面层。</T>
//
// @reference
// @author maocy
// @version 150225
//==========================================================
var RUiLayer = new function RUiLayer(){
   var o = this;
   //..........................................................
   // @attribute
   o._layers = new Array();
   //..........................................................
   // @member
   o.next    = RUiLayer_next;
   o.free    = RUiLayer_free;
   return o;
}

//==========================================================
// <T>获得下一层。</T>
//
// @method
// @param p:typeCd:EUiLayer 层类型
// @return Integer 层数
//==========================================================
function RUiLayer_next(p){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   o._layers[n] = ++c;
   return c;
}

//==========================================================
// <T>释放一个层。</T>
//
// @method
// @param p:typeCd:EUiLayer 层类型
// @param l:layer:Integer 层数据
// @return Integer 层数
//==========================================================
function RUiLayer_free(p, l){
   var o = this;
   var n = RInteger.nvl(p, EUiLayer.Default);
   var c = RInteger.nvl(o._layers[n], n);
   --c;
   if(c > n){
      o._layers[n] = c;
   }
   return c;
}
