with(MO){
   //==========================================================
   // <T>界面层。</T>
   //
   // @reference
   // @author maocy
   // @version 150225
   //==========================================================
   MO.RUiLayer = function RUiLayer(){
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
   MO.RUiLayer.prototype.next = function RUiLayer_next(p){
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
   MO.RUiLayer.prototype.free = function RUiLayer_free(p, l){
      var o = this;
      var n = RInteger.nvl(p, EUiLayer.Default);
      var c = RInteger.nvl(o._layers[n], n);
      --c;
      if(c > n){
         o._layers[n] = c;
      }
      return c;
   }
   //..........................................................
   // 实例化内容
   MO.RUiLayer = new RUiLayer();
}
