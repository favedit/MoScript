with(MO){
   //==========================================================
   // <T>模型资源。</T>
   //
   // @author maocy
   // @history 150115
   //==========================================================
   MO.FE3sProjection = function FE3sProjection(o){
      o = RClass.inherits(this, o, FE3sObject);
      //..........................................................
      // @attribute 属性
      o._angle      = null;
      o._znear      = null;
      o._zfar       = null;
      //..........................................................
      // @method
      o.angle       = FE3sProjection_angle;
      o.znear       = FE3sProjection_znear;
      o.zfar        = FE3sProjection_zfar;
      o.unserialize = FE3sProjection_unserialize;
      o.saveConfig  = FE3sProjection_saveConfig;
      return o;
   }

   //==========================================================
   // <T>获得张角。</T>
   //
   // @method
   // @return Float 张角
   //==========================================================
   MO.FE3sProjection_angle = function FE3sProjection_angle(){
      return this._angle;
   }

   //==========================================================
   // <T>获得近平面距离。</T>
   //
   // @method
   // @return Float 近平面距离
   //==========================================================
   MO.FE3sProjection_znear = function FE3sProjection_znear(){
      return this._znear;
   }

   //==========================================================
   // <T>获得远平面距离。</T>
   //
   // @method
   // @return Float 远平面距离
   //==========================================================
   MO.FE3sProjection_zfar = function FE3sProjection_zfar(){
      return this._zfar;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @param p:input:FByteStream 数据流
   // @return 处理结果
   //==========================================================
   MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      // 读取属性
      o._angle = p.readFloat();
      o._znear = p.readFloat();
      o._zfar = p.readFloat();
   }

   //==========================================================
   // <T>数据内容存储到配置节点中。</T>
   //
   // @method
   // @param xconfig:TXmlNode 配置节点
   //==========================================================
   MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      // 存储属性
      xconfig.setFloat('angle', o._angle);
      xconfig.setFloat('znear', o._znear);
      xconfig.setFloat('zfar', o._zfar);
   }
}
