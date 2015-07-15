//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiComponent = function FGuiComponent(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MUiComponent, MO.MProperty);
   //..........................................................
   // @method
   o.dispose = MO.FGuiComponent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiComponent_dispose = function FGuiComponent_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiComponent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
