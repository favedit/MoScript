//==========================================================
// <T>资源场景技术。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneTechnique(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._techniqueCode = null;
   o._passes        = null;
   //..........................................................
   // @method
   o.passes         = FRs3SceneTechnique_passes;
   o.unserialize    = FRs3SceneTechnique_unserialize;
   o.saveConfig     = FRs3SceneTechnique_saveConfig;
   return o;
}

//==========================================================
// <T>获得过程集合。</T>
//
// @method
// @return 过程集合
//==========================================================
function FRs3SceneTechnique_passes(){
   return this._passes;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取过程集合
   var c = p.readInt16();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3SceneTechniquePass);
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
function FRs3SceneTechnique_saveConfig(p){
   var o = this;
   o.__base.FRs3Object.saveConfig.call(o, p);
   // 存储属性
   p.set('technique_code', o._techniqueCode);
}
