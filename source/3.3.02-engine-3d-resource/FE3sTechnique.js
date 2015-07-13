//==========================================================
// <T>资源技术。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
MO.FE3sTechnique = function FE3sTechnique(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._techniqueCode = MO.Class.register(o, new MO.AGetter('_techniqueCode'));
   o._passes        = MO.Class.register(o, new MO.AGetter('_passes'));
   //..........................................................
   // @method
   o.passes         = MO.FE3sTechnique_passes;
   o.unserialize    = MO.FE3sTechnique_unserialize;
   o.saveConfig     = MO.FE3sTechnique_saveConfig;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取过程集合
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new MO.TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = MO.Class.create(MO.FE3sTechniquePass);
         pass.unserialize(input);
         passes.push(pass);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.FE3sTechnique_saveConfig = function FE3sTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('technique_code', o._techniqueCode);
}
