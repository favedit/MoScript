 //==========================================================
// <T>类工厂。</T>
//
// @class
// @author maocy
// @history 150215
//==========================================================
MO.FClassFactory = function FClassFactory(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._classes   = null;
   //..........................................................
   // @method
   o.construct  = MO.FClassFactory_construct;
   // @method
   o.register   = MO.FClassFactory_register;
   o.unregister = MO.FClassFactory_unregister;
   // @method
   o.create     = MO.FClassFactory_create;
   // @method
   o.dispose    = MO.FClassFactory_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FClassFactory_construct = function FClassFactory_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._classes = new MO.TDictionary();
}

//==========================================================
// <T>注册类对象。</T>
//
// @method
// @param n:name:String 名称
// @param c:class:Function 类名称
//==========================================================
MO.FClassFactory_register = function FClassFactory_register(n, c){
   this._classes.set(n, c);
}

//==========================================================
// <T>注销类对象。</T>
//
// @method
// @param n:name:String 名称
//==========================================================
MO.FClassFactory_unregister = function FClassFactory_unregister(n){
   this._classes.set(n, null);
}

//==========================================================
// <T>创建指定名称的类对象实例。</T>
//
// @method
// @param n:name:String 名称
// @return 实例
//==========================================================
MO.FClassFactory_create = function FClassFactory_create(n){
   var o = this;
   var c = o._classes.get(n);
   if(!c){
      throw new MO.TError('Create unregister class. (name={1})', n);
   }
   return MO.Class.create(c);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FClassFactory_dispose = function FClassFactory_dispose(){
   var o = this;
   o._classes = MO.Lang.Object.dispose(o._classes);
   o.__base.FObject.dispose.call(o);
}
