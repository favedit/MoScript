 //==========================================================
// <T>类工厂。</T>
//
// @class
// @author maocy
// @history 150215
//==========================================================
MO.FClassFactory = function FClassFactory(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._classes   = null;
   //..........................................................
   // @method
   o.construct  = FClassFactory_construct;
   // @method
   o.register   = FClassFactory_register;
   o.unregister = FClassFactory_unregister;
   // @method
   o.create     = FClassFactory_create;
   // @method
   o.dispose    = FClassFactory_dispose;
   return o;

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   function FClassFactory_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._classes = new TDictionary();
   }

   //==========================================================
   // <T>注册类对象。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param c:class:Function 类名称
   //==========================================================
   function FClassFactory_register(n, c){
      this._classes.set(n, c);
   }

   //==========================================================
   // <T>注销类对象。</T>
   //
   // @method
   // @param n:name:String 名称
   //==========================================================
   function FClassFactory_unregister(n){
      this._classes.set(n, null);
   }

   //==========================================================
   // <T>创建指定名称的类对象实例。</T>
   //
   // @method
   // @param n:name:String 名称
   // @return 实例
   //==========================================================
   function FClassFactory_create(n){
      var o = this;
      var c = o._classes.get(n);
      if(!c){
         throw new TError('Create unregister class. (name={1})', n);
      }
      return RClass.create(c);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   function FClassFactory_dispose(){
      var o = this;
      o._classes = RObject.dispose(o._classes);
      o.__base.FObject.dispose.call(o);
   }
}
