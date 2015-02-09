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
   o._code               = null;
   o._label              = null;
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
   o.code                = FRs3SceneMaterial_code;
   o.info                = FRs3SceneMaterial_info;
   o.unserialize         = FRs3SceneMaterial_unserialize;
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
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3SceneMaterial_code(){
   return this._code;
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
