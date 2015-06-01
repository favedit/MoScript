with(MO){
   //==========================================================
   // <T>设计项目资源。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrProject = function FDrProject(o){
      o = RClass.inherits(this, o, FDrResource);
      //..........................................................
      // @attribute
      o._classCode   = 'Project';
      // @attribute
      o._projectGuid = null;
      //..........................................................
      // @method
      o.saveConfig   = FDrProject_saveConfig;
      return o;
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrProject_saveConfig = function FDrProject_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      // 存储属性
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
