//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FProcess = function FProcess(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._typeName  = null;
   o._groupName = null;
   o._name      = null;
   //..........................................................
   // @method
   o.name  = FProcess_name;
   return o;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   function FProcess_name(){
      return this._name;
   }
}
