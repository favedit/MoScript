with(MO){
   //==========================================================
   // <T>设计网格3D资源控制台。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrMeshConsole = function FDrMeshConsole(o){
      o = MO.Class.inherits(this, o, FDrAbsResourceConsole);
      //..........................................................
      // @attribute
      o._serviceCode = 'cloud.resource.mesh';
      //..........................................................
      // @method
      o.update       = FDrMeshConsole_update;
      return o;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param config:TXmlNode 配置节点
   //==========================================================
   MO.FDrMeshConsole_update = function FDrMeshConsole_update(config){
      var o = this;
      // 生成地址
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=update&date=' + RDate.format());
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync(url, config);
   }
}
