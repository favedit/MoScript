with(MO){
   //==========================================================
   // <T>编辑格式化接口。</T>
   //
   // @face
   // @author maocy
   // @version 150410
   //==========================================================
   MO.MUiEditFormator = function MUiEditFormator(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @method
      o.formatText  = MUiEditFormator_formatText;
      o.formatValue = MUiEditFormator_formatValue;
      return o;
   }

   //==========================================================
   // <T>格式化数据为文本。</T>
   //
   // @method
   // @param value:String 数据
   // @return 文本
   //==========================================================
   MO.MUiEditFormator_formatText = function MUiEditFormator_formatText(value){
      return value;
   }

   //==========================================================
   // <T>格式化文本为数据。</T>
   //
   // @method
   // @param text:String 文本
   // @return 数据
   //==========================================================
   MO.MUiEditFormator_formatValue = function MUiEditFormator_formatValue(text){
      return text;
   }
}
