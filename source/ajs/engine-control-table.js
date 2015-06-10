with(MO){
   MO.FGuiGridControl = function FGuiGridControl(o){
      o = RClass.inherits(this, o, FProcessServer);
      o._typeName  = null;
      o._groupName = null;
      o._name      = null;
      o.name  = FGuiGridControl_name;
      return o;
   }
   MO.FGuiGridControl_name = function FGuiGridControl_name(){
      return this._name;
   }
}
