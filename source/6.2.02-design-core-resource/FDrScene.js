with(MO){
   //==========================================================
   // <T>设计场景资源。</T>
   //
   // @class
   // @author maocy
   // @version 150411
   //==========================================================
   MO.FDrScene = function FDrScene(o){
      o = MO.Class.inherits(this, o, FDrResource);
      //..........................................................
      // @attribute
      o._classCode   = 'Scene';
      // @attribute
      o._projectGuid = null;
      //..........................................................
      // @method
      o.saveConfig   = FDrScene_saveConfig;
      return o;
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrScene_saveConfig = function FDrScene_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      // 存储属性
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
