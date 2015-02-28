//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FResourceType(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name      = null;
   o._pipeline  = null;
   o._resources = null;
   //..........................................................
   // @method
   o.construct  = FResourceType_construct;
   o.name       = FResourceType_name;
   o.resource   = FResourceType_resource;
   o.resources  = FResourceType_resources;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FResourceType_construct(){
   var o = this;
   o.__base.construct.call(o);
   o._resources = new TDictionary();
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FResourceType_name(){
   return this._name;
}

//==========================================================
// <T>获得资源集合。</T>
//
// @method
// @param p:name:String 资源名称
// @return 资源集合
//==========================================================
function FResourceType_resource(p){
   return this._resources.get(p);
}

//==========================================================
// <T>获得资源集合。</T>
//
// @method
// @return 资源集合
//==========================================================
function FResourceType_resources(){
   return this._resources;
}
