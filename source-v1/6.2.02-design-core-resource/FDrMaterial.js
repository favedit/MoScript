//==========================================================
// <T>设计材质资源。</T>
//
// @class
// @author maocy
// @version 150424
//==========================================================
function FDrMaterial(o){
   o = RClass.inherits(this, o, FDrResource);
   //..........................................................
   // @attribute
   o._classCode = 'Material';
   //..........................................................
   // @method
   o.loadConfig = FDrMaterial_loadConfig;
   o.saveConfig = FDrMaterial_saveConfig;
   return o;
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrMaterial_loadConfig(xconfig){
   var o = this;
   o.__base.FDrResource.loadConfig.call(o, xconfig);
}

//==========================================================
// <T>存储配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrMaterial_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
}
