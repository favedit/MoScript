//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FNetRs3TemplateMaterial(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._guid          = null;
   o._groupGuid     = null;
   o._effectCode    = null;
   o._ambientColor  = null;
   o._diffuseColor  = null;
   o._specularColor = null;
   o._specularLevel = 0;
   // @attribute
   o._textures      = null;
   //..........................................................
   // @method
   o.construct      = FNetRs3TemplateMaterial_construct;
   // @method
   o.guid           = FNetRs3TemplateMaterial_guid;
   o.groupGuid      = FNetRs3TemplateMaterial_groupGuid;
   // @method
   o.unserialize    = FNetRs3TemplateMaterial_unserialize;
   return o;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return 
//==========================================================
function FNetRs3TemplateMaterial_construct(){
   var o = this;
   o._ambientColor = new SColor4();
   o._diffuseColor = new SColor4();
   o._specularColor = new SColor4();
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FNetRs3TemplateMaterial_guid(){
   return this._guid;
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FNetRs3TemplateMaterial_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return 
//==========================================================
function FNetRs3TemplateMaterial_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FNetRs3TemplateMaterial_unserialize(p){
   var o = this;
   // 读取属性
   o._guid = p.readString();
   o._groupGuid = p.readString();
   o._effectCode = p.readString();
   o._ambientColor.unserialize3(p);
   o._diffuseColor.unserialize3(p);
   o._specularColor.unserialize3(p);
   o._specularLevel = p.readFloat();
   // 读取纹理集合
   var c = p.readUint16();
   if(c > 0){
      var s = o._textures = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FNetRs3TemplateTexture);
         t.unserialize(p);
         s.push(t);
      }
   }
}
