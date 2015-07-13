//==========================================================
// <T>资源场景空间。</T>
//
// @author maocy
// @history 150115
//==========================================================
MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   //..........................................................
   // @attribute 类型
   o._typeCd      = MO.Class.register(o, new MO.AGetSet('_typeCd'));
   // @attribute 变换类型
   o._transformCd = MO.Class.register(o, new MO.AGetSet('_transformCd'));
   //..........................................................
   // @method
   o.unserialize  = MO.FE3sDisplayLayer_unserialize;
   o.saveConfig   = MO.FE3sDisplayLayer_saveConfig;
   return o;
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
