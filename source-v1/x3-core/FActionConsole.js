/***********************************************************
 * <T>按键操作的控制台。</T>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function FActionConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope         = EScope.Global;
   o.window        = null;
   // Method
   o.find          = FActionConsole_find;
   return o;
}
//------------------------------------------------------------
function FActionConsole_find(){
   var o = this;
   if(!o.window){
      o.window = top.RControl.create('FActionWindow');
   }
   return o.window;
}
