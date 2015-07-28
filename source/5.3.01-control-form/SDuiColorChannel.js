with(MO){
   //==========================================================
   // <T>颜色通道编辑框。</T>
   //
   // @class
   // @author maocy
   // @version 150213
   //==========================================================
   MO.SDuiColorChannel = function SDuiColorChannel(){
      var o = this;
      SDuiColorBar.call(o);
      //..........................................................
      // @attribute
      o.minValue      = 0;
      o.maxValue      = 255;
      //..........................................................
      // @method
      o.setInputValue = SDuiColorChannel_setInputValue;
      // @method
      o.convertGet    = SDuiColorChannel_convertGet;
      o.convertSet    = SDuiColorChannel_convertSet;
      return o;
   }

   //==========================================================
   // <T>设置输入内容。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   MO.SDuiColorChannel_setInputValue = function SDuiColorChannel_setInputValue(p){
      var o = this;
      var v = RInteger.toRange(p, o.minValue, o.maxValue);
      var t = RInteger.format(v);
      var h = o.hInput;
      if(h.value != t){
         h.value = t;
      }
   }

   //==========================================================
   // <T>获得转换。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   MO.SDuiColorChannel_convertGet = function SDuiColorChannel_convertGet(p){
      var o = this;
      var v = RInteger.parse(RString.nvl(p, '0'));
      return RInteger.toRange(v, o.minValue, o.maxValue) / 255;
   }

   //==========================================================
   // <T>设置转换。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   MO.SDuiColorChannel_convertSet = function SDuiColorChannel_convertSet(p){
      return parseInt(p * 255);
   }
}
