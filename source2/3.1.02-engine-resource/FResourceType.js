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
      o._code        = null;
      o._pipeline    = null;
      o._resources   = null;
      //..........................................................
      // @method
      o.construct    = FResourceType_construct;
      // @method
      o.code         = FResourceType_code;
      o.setCode      = FResourceType_setCode;
      o.pipeline     = FResourceType_pipeline;
      o.setPipeline  = FResourceType_setPipeline;
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
   // <T>获得代码。</T>
   //
   // @method
   // @property get
   // @return String 代码
   //==========================================================
   MO.FResourceType_code = function FResourceType_code(){
      return this._code;
   }

   //==========================================================
   // <T>设置代码。</T>
   //
   // @method
   // @property set
   // @param String 代码
   //==========================================================
   MO.FResourceType_setCode = function FResourceType_setCode(p){
      this._code = p;
   }

   //==========================================================
   // <T>获得管道。</T>
   //
   // @method
   // @property get
   // @return String 管道
   //==========================================================
   MO.FResourceType_pipeline = function FResourceType_pipeline(){
      return this._pipeline;
   }

   //==========================================================
   // <T>设置管道。</T>
   //
   // @method
   // @property set
   // @param String 管道
   //==========================================================
   MO.FResourceType_setPipeline = function FResourceType_setPipeline(p){
      this._pipeline = p;
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
