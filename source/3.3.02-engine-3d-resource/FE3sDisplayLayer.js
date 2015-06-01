with(MO){
   //==========================================================
   // <T>资源场景空间。</T>
   //
   // @author maocy
   // @history 150115
   //==========================================================
   MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      //..........................................................
      // @attribute 类型
      o._typeCd        = null;
      // @attribute 变换类型
      o._transformCd   = null;
      //..........................................................
      // @method
      o.typeCd         = FE3sDisplayLayer_typeCd;
      o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
      o.transformCd    = FE3sDisplayLayer_transformCd;
      o.setTransformCd = FE3sDisplayLayer_setTransformCd;
      // @method
      o.unserialize    = FE3sDisplayLayer_unserialize;
      o.saveConfig     = FE3sDisplayLayer_saveConfig;
      return o;
   }

   //==========================================================
   // <T>获得类型。</T>
   //
   // @method
   // @return String 类型
   //==========================================================
   MO.FE3sDisplayLayer_typeCd = function FE3sDisplayLayer_typeCd(){
      return this._typeCd;
   }

   //==========================================================
   // <T>设置类型。</T>
   //
   // @method
   // @param p:value:String 类型
   //==========================================================
   MO.FE3sDisplayLayer_setTypeCd = function FE3sDisplayLayer_setTypeCd(p){
      this._typeCd = p;
   }

   //==========================================================
   // <T>获得变换类型。</T>
   //
   // @method
   // @return String 变换类型
   //==========================================================
   MO.FE3sDisplayLayer_transformCd = function FE3sDisplayLayer_transformCd(){
      return this._transformCd;
   }

   //==========================================================
   // <T>设置变换类型。</T>
   //
   // @method
   // @param p:value:String 变换类型
   //==========================================================
   MO.FE3sDisplayLayer_setTransformCd = function FE3sDisplayLayer_setTransformCd(p){
      this._transformCd = p;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   MO.FE3sDisplayLayer_unserialize = function FE3sDisplayLayer_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      // 读取属性
      o._typeCd = input.readString();
      o._transformCd = input.readString();
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FE3sDisplayLayer_saveConfig = function FE3sDisplayLayer_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
      // 存储属性
      xconfig.set('type_cd', o._typeCd);
      xconfig.set('transform_cd', o._transformCd);
   }
}
