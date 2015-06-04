with(MO){
   //==========================================================
   // <T>引擎服务进程。</T>
   //
   // @class
   // @author maocy
   // @version 150305
   //==========================================================
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FProcessServer);
      //..........................................................
      // @attribute
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      //..........................................................
      // @method
      o.name  = FGuiButton_name;
      return o;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   MO.FGuiButton_name = function FGuiButton_name(){
      return this._name;
   }
}
