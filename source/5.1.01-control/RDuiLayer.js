//==========================================================
// <T>界面层。</T>
//
// @reference
// @author maocy
// @version 150225
//==========================================================
MO.RDuiLayer = function RDuiLayer(){
   var o = this;
   //..........................................................
   // @attribute
   o._layers = new Array();
   return o;
}

//==========================================================
// <T>获得下一层。</T>
//
// @method
// @param p:typeCd:EUiLayer 层类型
// @return Integer 层数
//==========================================================
MO.RDuiLayer.prototype.next = function RDuiLayer_next(p){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, EUiLayer.Default);
   var c = MO.Lang.Integer.nvl(o._layers[n], n);
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
MO.RDuiLayer.prototype.free = function RDuiLayer_free(p, l){
   var o = this;
   var n = MO.Lang.Integer.nvl(p, EUiLayer.Default);
   var c = MO.Lang.Integer.nvl(o._layers[n], n);
   --c;
   if(c > n){
      o._layers[n] = c;
   }
   return c;
}
//..........................................................
// 实例化内容
MO.RDuiLayer = new MO.RDuiLayer();
