with(MO){
   //==========================================================
   // <T>资源分组。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FResourceType = function FResourceType(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
      o._pipeline    = MO.Class.register(o, new MO.AGetSet('_pipeline'));
      o._resources   = null;
      //..........................................................
      // @method
      o.construct    = FResourceType_construct;
      // @method
      o.findResource = FResourceType_findResource;
      o.resources    = FResourceType_resources;
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
      o._resources = new TDictionary();
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
   // <T>获得资源集合。</T>
   //
   // @method
   // @return 资源集合
   //==========================================================
   MO.FResourceType_resources = function FResourceType_resources(){
      return this._resources;
   }
}
