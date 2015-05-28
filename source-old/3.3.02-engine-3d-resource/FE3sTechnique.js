//==========================================================
// <T>资源技术。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
function FE3sTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._techniqueCode = null;
   o._passes        = null;
   //..........................................................
   // @method
   o.passes         = FE3sTechnique_passes;
   o.unserialize    = FE3sTechnique_unserialize;
   o.saveConfig     = FE3sTechnique_saveConfig;
   return o;
}

//==========================================================
// <T>获得过程集合。</T>
//
// @method
// @return 过程集合
//==========================================================
function FE3sTechnique_passes(){
   return this._passes;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
function FE3sTechnique_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取过程集合
   var passCount = input.readInt16();
   if(passCount > 0){
      var passes = o._passes = new TObjects();
      for(var i = 0; i < passCount; i++){
         var pass = RClass.create(FE3sTechniquePass);
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
function FE3sTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('technique_code', o._techniqueCode);
}
