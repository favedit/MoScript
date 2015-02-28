//==========================================================
// <T>资源场景技术。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3sSceneTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._techniqueCode = null;
   o._passes        = null;
   //..........................................................
   // @method
   o.passes         = FE3sSceneTechnique_passes;
   o.unserialize    = FE3sSceneTechnique_unserialize;
   o.saveConfig     = FE3sSceneTechnique_saveConfig;
   return o;
}

//==========================================================
// <T>获得过程集合。</T>
//
// @method
// @return 过程集合
//==========================================================
function FE3sSceneTechnique_passes(){
   return this._passes;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSceneTechnique_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取过程集合
   var c = p.readInt16();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sSceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sSceneTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储属性
   p.set('technique_code', o._techniqueCode);
}
