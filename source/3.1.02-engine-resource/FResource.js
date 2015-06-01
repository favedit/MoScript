with(MO){
   //==========================================================
   // <T>资源基类。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FResource = function FResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._typeCode     = null;
      o._type         = null;
      // @attribute
      o._dataCompress = false;
      o._dataBlock    = false;
      // @attribute
      o._guid         = null;
      o._code         = null;
      o._label        = null;
      // @attribute
      o._sourceUrl    = null;
      //..........................................................
      // @method
      o.typeCode      = FResource_typeCode;
      o.type          = FResource_type;
      // @method
      o.guid          = FResource_guid;
      o.setGuid       = FResource_setGuid;
      o.code          = FResource_code;
      o.setCode       = FResource_setCode;
      o.label         = FResource_label;
      o.setLabel      = FResource_setLabel;
      // @method
      o.sourceUrl     = FResource_sourceUrl;
      o.setSourceUrl  = FResource_setSourceUrl;
      return o;
   }

   //==========================================================
   // <T>获得类型代码。</T>
   //
   // @method
   // @return String 唯一编号
   //==========================================================
   MO.FResource_typeCode = function FResource_typeCode(){
      return this._typeCode;
   }

   //==========================================================
   // <T>获得类型。</T>
   //
   // @method
   // @return FResourceType 类型
   //==========================================================
   MO.FResource_type = function FResource_type(){
      return this._type;
   }

   //==========================================================
   // <T>获得唯一编号。</T>
   //
   // @method
   // @return String 唯一编号
   //==========================================================
   MO.FResource_guid = function FResource_guid(){
      return this._guid;
   }

   //==========================================================
   // <T>设置唯一编号。</T>
   //
   // @method
   // @param p:guid:String 唯一编号
   //==========================================================
   MO.FResource_setGuid = function FResource_setGuid(p){
      this._guid = p;
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FResource_code = function FResource_code(){
      return this._code;
   }

   //==========================================================
   // <T>设置代码。</T>
   //
   // @method
   // @param p:code:String 代码
   //==========================================================
   MO.FResource_setCode = function FResource_setCode(p){
      this._code = p;
   }

   //==========================================================
   // <T>获得标签。</T>
   //
   // @method
   // @return String 标签
   //==========================================================
   MO.FResource_label = function FResource_label(){
      return this._label;
   }

   //==========================================================
   // <T>设置标签。</T>
   //
   // @method
   // @param p:label:String 标签
   //==========================================================
   MO.FResource_setLabel = function FResource_setLabel(p){
      this._label = p;
   }

   //==========================================================
   // <T>获得来源地址。</T>
   //
   // @method
   // @return String 来源地址
   //==========================================================
   MO.FResource_sourceUrl = function FResource_sourceUrl(){
      return this._sourceUrl;
   }

   //==========================================================
   // <T>设置来源地址。</T>
   //
   // @method
   // @param p:sourceUrl:String 来源地址
   //==========================================================
   MO.FResource_setSourceUrl = function FResource_setSourceUrl(p){
      this._sourceUrl = p;
   }
}
