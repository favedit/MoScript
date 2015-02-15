//==========================================================
// <T>资源场景材质。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneMaterial(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute 属性
   o._groupGuid          = null;
   // @attribute 设置
   o._info               = null;
   // @attribute 高度
   o._heightDepth        = null;
   // @attribute 表面
   o._surfaceRate        = null;
   o._surfaceReflect     = null;
   o._surfaceBright      = null;
   o._surfaceBrightLevel = null;
   o._surfaceCoarse      = null;
   o._surfaceCoarseLevel = null;
   o._surfaceMerge       = null;
   o._surfacePower       = null;
   //..........................................................
   // @method
   o.construct           = FRs3SceneMaterial_construct;
   // @method
   o.groupGuid           = FRs3SceneMaterial_groupGuid;
   o.info                = FRs3SceneMaterial_info;
   // @method
   o.unserialize         = FRs3SceneMaterial_unserialize;
   o.saveConfig          = FRs3SceneMaterial_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3SceneMaterial_construct(){
   var o = this;
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 分组唯一编号
//==========================================================
function FRs3SceneMaterial_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得信息。</T>
//
// @method
// @return SRs3MaterialInfo 信息
//==========================================================
function FRs3SceneMaterial_info(){
   return this._info;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneMaterial_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取属性
   o._groupGuid = p.readString();
   // 读取设置
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
   // 读取高度
   //o._heightDepth = p.readFloat();
   // 读取表面
   //o._surfaceRate = p.readFloat();
   //o._surfaceReflect = p.readFloat();
   //o._surfaceBright = p.readFloat();
   //o._surfaceBrightLevel = p.readFloat();
   //o._surfaceCoarse = p.readFloat();
   //o._surfaceCoarseLevel = p.readFloat();
   //o._surfaceMerge = p.readFloat();
   //o._surfacePower = p.readFloat();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FRs3SceneMaterial_saveConfig(p){
   var o = this;
   o.__base.FRs3Object.saveConfig.call(o, p);
   // 存储属性
   p.set('group_guid', o._groupGuid);
   // 存储材质
   o._info.saveConfig(p);
}

