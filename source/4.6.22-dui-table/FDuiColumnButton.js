with(MO){
   //==========================================================
   // <T>表格按键列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FDuiColumnButton = function FDuiColumnButton(o){
      o = RClass.inherits(this, o, FColumn);
      //..........................................................
      // @attribute
      o.__cellClass = FCellButton;
      return o;
   }
}
