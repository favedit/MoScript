with(MO){
   //==========================================================
   // <T>自循环节点。</T>
   //
   // @tool
   // @author maocy
   // @version 150110
   //==========================================================
   MO.SLooperEntry = function SLooperEntry(){
      var o = this;
      //..........................................................
      // @attribute
      o.prior   = null;
      o.next    = null;
      // @attribute
      o.value   = null;
      //..........................................................
      // @method
      o.dispose = SLooperEntry_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.SLooperEntry_dispose = function SLooperEntry_dispose(){
      this.prior = null;
      this.next = null;
      this.value = null;
   }
}
