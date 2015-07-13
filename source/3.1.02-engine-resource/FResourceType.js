//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FResourceType = function FResourceType(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
   o._resources   = MO.Class.register(o, new MO.AGetter('_resources'));
   //..........................................................
   // @method
   o.construct    = MO.FResourceType_construct;
   // @method
   o.findResource = MO.FResourceType_findResource;
   // @method
   o.dispose      = MO.FResourceType_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FResourceType_construct = function FResourceType_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._resources = new MO.TDictionary();
}

//==========================================================
// <T>获得资源集合。</T>
//
// @method
// @param p:name:String 资源名称
// @return 资源集合
//==========================================================
MO.FResourceType_findResource = function FResourceType_findResource(p){
   return this._resources.get(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FResourceType_dispose = function FResourceType_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.dispose(o._resources);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
