with(MO){
   //==========================================================
   // <T>表格按键列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FColumnButton = function FColumnButton(o){
      o = RClass.inherits(this, o, FColumn);
      //..........................................................
      // @attribute
      o.__cellClass = FCellButton;
      return o;
   }
}
