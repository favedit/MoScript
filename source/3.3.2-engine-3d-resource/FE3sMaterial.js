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
   // @attribute 高度
   //o._heightDepth        = null;
   // @attribute 表面
   //o._surfaceRate        = null;
   //o._surfaceReflect     = null;
   //o._surfaceBright      = null;
   //o._surfaceBrightLevel = null;
   //o._surfaceCoarse      = null;
   //o._surfaceCoarseLevel = null;
   //o._surfaceMerge       = null;
   //o._surfacePower       = null;
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
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('group_guid', o._groupGuid);
   // 存储材质
   o._info.saveConfig(p);
}
