with(MO){
   //==========================================================
   // <T>渲染布局取样器。</T>
   //
   // @class
   // @author maocy
   // @history 150311
   //==========================================================
   MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
      var o = this;
      //..........................................................
      // @attribute
      o.slot     = null;
      o.buffer   = null;
      o.index    = null;
      o.formatCd = null;
      //..........................................................
      // @method
      o.dispose  = SG3dLayoutBuffer_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
      var o = this;
      o.slot = null;
      o.buffer = null;
      o.index = null;
      o.formatCd = null;
   }
}
