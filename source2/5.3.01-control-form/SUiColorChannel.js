with(MO){
   //==========================================================
   // <T>颜色通道编辑框。</T>
   //
   // @class
   // @author maocy
   // @version 150213
   //==========================================================
   MO.SUiColorChannel = function SUiColorChannel(){
      var o = this;
      SUiColorBar.call(o);
      //..........................................................
      // @attribute
      o.minValue      = 0;
      o.maxValue      = 255;
      //..........................................................
      // @method
      o.setInputValue = SUiColorChannel_setInputValue;
      // @method
      o.convertGet    = SUiColorChannel_convertGet;
      o.convertSet    = SUiColorChannel_convertSet;
      return o;
   }

   //==========================================================
   // <T>设置输入内容。</T>
   //
   // @method
   // @param p:value:Number 内容
   //==========================================================
   MO.SUiColorChannel_setInputValue = function SUiColorChannel_setInputValue(p){
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
   MO.SUiColorChannel_convertGet = function SUiColorChannel_convertGet(p){
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
   MO.SUiColorChannel_convertSet = function SUiColorChannel_convertSet(p){
      return parseInt(p * 255);
   }
}
