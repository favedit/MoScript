//==========================================================
// <T>设计场景资源控制台。</T>
//
// @class
// @author maocy
// @version 150411
//==========================================================
function FDrSceneConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   // @attribute
   o._serviceCode = 'cloud.resource.scene';
   // @attribute
   o.update       = FDrSceneConsole_update;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FDrSceneConsole_update(p){
   var o = this;
   // 生成地址
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
   // 发送数据
   return RConsole.find(FXmlConsole).sendAsync(url, p);
}
