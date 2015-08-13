with(MO){
   //==========================================================
   // <T>设计材质资源控制台。</T>
   //
   // @class
   // @author maocy
   // @version 150424
   //==========================================================
   MO.FDrMaterialConsole = function FDrMaterialConsole(o){
      o = MO.Class.inherits(this, o, FDrAbsResourceConsole);
      //..........................................................
      // @attribute
      o._serviceCode = 'cloud.resource.material';
      o._classUnit   = FDrMaterial;
      //..........................................................
      // @method
      o.query        = FDrMaterialConsole_query;
      o.update       = FDrMaterialConsole_update;
      o.deleteBitmap = FDrMaterialConsole_deleteBitmap;
      return o;
   }

   //==========================================================
   // <T>获取处理。</T>
   //
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDrMaterialConsole_query = function FDrMaterialConsole_query(guid){
      var o = this;
      // 生成地址
      var uri = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      // 发送数据
      var xroot = MO.Console.find(FXmlConsole).send(url);
      // 加载数据
      var nodeCount = xroot.nodeCount();
      for(var n = 0; n < nodeCount; n++){
         var xbitmap = xroot.node(n);
         if(xbitmap.isName('Material')){
            o.loadResource(xbitmap);
         }
      }
      // 返回结果
      return o._resources.get(guid);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrMaterialConsole_update = function FDrMaterialConsole_update(xconfig){
      var o = this;
      // 生成地址
      var uri = '/' + o._serviceCode + '.ws?action=update';
      var url = RBrowser.hostPath(uri);
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync(url, xconfig);
   }

   //==========================================================
   // <T>删除位图处理。</T>
   //
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrMaterialConsole_deleteBitmap = function FDrMaterialConsole_deleteBitmap(guid){
      var o = this;
      // 生成地址
      var uri = '/' + o._serviceCode + '.ws?action=deleteBitmap&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      // 发送数据
      return MO.Console.find(FXmlConsole).sendAsync(url);
   }
}
