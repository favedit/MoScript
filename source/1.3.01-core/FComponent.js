with(MO){
   //==========================================================
   // <T>组件对象。</T>
   //
   // @class
   // @author maocy
   // @history 150416
   //==========================================================
   MO.FComponent = function FComponent(o){
      o = RClass.inherits(this, o, FObject, MParent);
      //..........................................................
      // @attribute
      o._code   = RClass.register(o, new AGetSet('_code'));
      //..........................................................
      // @method
      o.dispose = FComponent_dispose;
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
}
