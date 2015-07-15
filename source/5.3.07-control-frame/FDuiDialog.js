with(MO){
   //==========================================================
   // <T>表单控件。</T>
   //
   // @class
   // @author maocy
   // @version 150122
   //==========================================================
   MO.FUiDialog = function FUiDialog(o){
      o = RClass.inherits(this, o, FUiWindow, MUiDescribeFrame);
      //..........................................................
      // @method
      o.construct          = FUiDialog_construct;
      //..........................................................
      return o;
   }

   //==========================================================
   // <T>构造函数。</T>
   //
   // @method
   //==========================================================
   MO.FUiDialog_construct = function FUiDialog_construct(){
      var o = this;
      o.__base.FUiWindow.construct.call(o);
   }
}
