MO.FGuiGridControl = function FGuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FProcessServer);
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   o.name  = MO.FGuiGridControl_name;
   return o;
}
MO.FGuiGridControl_name = function FGuiGridControl_name(){
   return this._name;
}
