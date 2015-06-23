with(MO){
   //==========================================================
   // <T>设计资源。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrResource = function FDrResource(o){
      o = RClass.inherits(this, o, FDrObject, MAttributeCode, MAttributeLabel);
      //..........................................................
      // @attribute
      o._classCode = RClass.register(o, new AGetter('_classCode'));
      o._guid      = RClass.register(o, new AGetSet('_guid'));
      //..........................................................
      // @method
      o.loadConfig = FDrResource_loadConfig;
      o.saveConfig = FDrResource_saveConfig;
      return o;
   }

   //==========================================================
   // <T>加载配置信息。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrResource_loadConfig = function FDrResource_loadConfig(xconfig){
      var o = this;
      // 加载属性
      o._guid = xconfig.get('guid');
      o._code = xconfig.get('code');
      o._label = xconfig.get('label');
   }

   //==========================================================
   // <T>存储配置信息。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FDrResource_saveConfig = function FDrResource_saveConfig(xconfig){
      var o = this;
      // 存储属性
      xconfig.setName(o._classCode);
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
}
