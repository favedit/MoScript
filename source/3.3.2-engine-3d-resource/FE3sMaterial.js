//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._groupGuid  = null;
   // @attribute
   o._info       = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FE3sMaterial_construct;
   // @method
   o.groupGuid   = FE3sMaterial_groupGuid;
   o.group       = FE3sMaterial_group;
   // @method
   o.effectCode  = FE3sMaterial_effectCode;
   o.info        = FE3sMaterial_info;
   o.textures    = FE3sMaterial_textures;
   // @method
   o.unserialize = FE3sMaterial_unserialize;
   o.saveConfig  = FE3sMaterial_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sMaterial_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得材质分组。</T>
//
// @method
// @return FE3sMaterialGroup 材质分组
//==========================================================
function FE3sMaterial_group(){
   return RConsole.find(FE3sMaterialConsole).findGroup(this._groupGuid);
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FE3sMaterial_info(){
   return this._info;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObjects 纹理集合
//==========================================================
function FE3sMaterial_textures(){
   return this._textures;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取属性
   o._groupGuid = p.readString();
   // 读取信息
   o._info.unserialize(p);
   // 读取纹理集合
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FE3sMaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}

//==========================================================
// <T>保存数据信息到配置节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sMaterial_saveConfig(p){
   var o = this;
   var mi = o._info;
   // 存储属性
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
   // 存储配置
   p.set('option_alpha', mi.optionAlpha);
   p.set('option_double', mi.optionDouble);
   // 存储透明
   p.set('alpha_base', mi.alphaBase);
   p.set('alpha_rate', mi.alphaRate);
   // 存储材质
   p.set('ambient_color', mi.ambientColor.toString());
   p.set('diffuse_color', mi.diffuseColor.toString());
   p.set('specular_color', mi.specularColor.toString());
   p.set('specular_base', mi.specularBase);
   p.set('specular_level', mi.specularLevel);
   p.set('reflect_color', mi.reflectColor.toString());
   p.set('reflect_merge', mi.reflectMerge);
   p.set('emissive_color', mi.emissiveColor.toString());
}
