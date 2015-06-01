with(MO){
   //==========================================================
   // <T>设计资源。</T>
   //
   // @class
   // @author maocy
   // @version 150331
   //==========================================================
   MO.FDrResource = function FDrResource(o){
      o = RClass.inherits(this, o, FDrObject, MAttributeGuid, MAttributeCode, MAttributeLabel);
      //..........................................................
      // @attribute
      o._classCode = null;
      //..........................................................
      // @method
      o.classCode  = FDrResource_classCode;
      // @method
      o.loadConfig = FDrResource_loadConfig;
      o.saveConfig = FDrResource_saveConfig;
      return o;
   }

   //==========================================================
   // <T>获得类代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FDrResource_classCode = function FDrResource_classCode(){
      return this._classCode;
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
