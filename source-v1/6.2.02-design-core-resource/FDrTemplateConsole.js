//==========================================================
// <T>设计资源模型控制台。</T>
//
// @class
// @author maocy
// @version 150415
//==========================================================
function FDrTemplateConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   //..........................................................
   // @attribute
   o._serviceCode   = 'cloud.resource.template';
   //..........................................................
   // @method
   o.selectMaterial = FDrTemplateConsole_selectMaterial;
   o.createDisplay  = FDrTemplateConsole_createDisplay;
   o.update         = FDrTemplateConsole_update;
   return o;
}

//==========================================================
// <T>选择材质处理。</T>
//
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrTemplateConsole_selectMaterial(xconfig){
   var o = this;
   var url = o.makeServiceUrl('createMaterial');
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}

//==========================================================
// <T>插入精灵处理。</T>
//
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrTemplateConsole_createDisplay(xconfig){
   var o = this;
   var url = o.makeServiceUrl('createDisplay');
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}

//==========================================================
// <T>更新处理。</T>
//
// @param config:TXmlNode 配置节点
//==========================================================
function FDrTemplateConsole_update(config){
   var o = this;
   // 生成地址
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
   // 发送数据
   return RConsole.find(FXmlConsole).sendAsync(url, config);
}
