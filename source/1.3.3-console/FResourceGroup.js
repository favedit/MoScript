//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FResourceGroup = function FResourceGroup(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name = null;
   //..........................................................
   // @method
   o.name  = FResourceGroup_name;
   return o;

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   function FResourceGroup_name(){
      return this._name;
   }
}
