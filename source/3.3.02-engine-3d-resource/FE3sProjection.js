//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sProjection = function FE3sProjection(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute 属性
   o._angle      = MO.Class.register(o, MO.AGetter('_angle'), 90);
   o._znear      = MO.Class.register(o, MO.AGetter('_znear'), 1);
   o._zfar       = MO.Class.register(o, MO.AGetter('_zfar'), 200);
   //..........................................................
   // @method
   o.unserialize = MO.FE3sProjection_unserialize;
   o.saveConfig  = MO.FE3sProjection_saveConfig;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取属性
   o._angle = input.readFloat();
   o._znear = input.readFloat();
   o._zfar = input.readFloat();
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
