//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
MO.FComponent = function FComponent(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   //..........................................................
   // @attribute
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   //..........................................................
   // @method
   o.dispose = MO.FComponent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FComponent_dispose = function FComponent_dispose(){
   var o = this;
   // 父处理
   o.__base.MParent.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
