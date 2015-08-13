with(MO){
   //==========================================================
   // <T>设计资源模型控制台。</T>
   //
   // @class
   // @author maocy
   // @version 150415
   //==========================================================
   MO.FDrModelConsole = function FDrModelConsole(o){
      o = MO.Class.inherits(this, o, FDrAbsResourceConsole);
      //..........................................................
      // @attribute
      o._serviceCode = 'cloud.resource.model';
      //..........................................................
      // @method
      o.update       = FDrModelConsole_update;
      return o;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param config:TXmlNode 配置节点
   //==========================================================
   MO.FDrModelConsole_update = function FDrModelConsole_update(config){
      var o = this;
      // 生成地址
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync(url, config);
   }
}
