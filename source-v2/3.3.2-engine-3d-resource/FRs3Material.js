//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._groupGuid  = null;
   // @attribute
   o._info       = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FRs3Material_construct;
   // @method
   o.groupGuid   = FRs3Material_groupGuid;
   o.group       = FRs3Material_group;
   // @method
   o.effectCode  = FRs3Material_effectCode;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   // @method
   o.unserialize = FRs3Material_unserialize;
   o.saveConfig  = FRs3Material_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FRs3Material_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得材质分组。</T>
//
// @method
// @return FRs3MaterialGroup 材质分组
//==========================================================
function FRs3Material_group(){
   return RConsole.find(FRs3MaterialConsole).findGroup(this._groupGuid);
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
function FRs3Material_effectCode(){
   return this._info.effectCode;
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FRs3Material_info(){
   return this._info;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObjects 纹理集合
//==========================================================
function FRs3Material_textures(){
   return this._textures;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Material_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取属性
   o._groupGuid = p.readString();
   // 读取信息
   o._info.unserialize(p);
   // 读取纹理集合
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
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
function FRs3Material_saveConfig(p){
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
