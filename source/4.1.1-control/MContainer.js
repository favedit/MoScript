//==========================================================
// <T>可以含有子组件的容器接口。</T>
//
// @author maocy
// @version 141231
//==========================================================
function MContainer(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.createChild = RMethod.empty;
   /// @method
   o.appendChild = RMethod.empty;
   return o;
}
