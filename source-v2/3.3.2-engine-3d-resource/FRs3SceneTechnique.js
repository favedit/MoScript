//==========================================================
// <T>资源场景技术。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneTechnique(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name       = null;
   o._passes     = null;
   //..........................................................
   // @method
   o.name        = FRs3SceneTechnique_name;
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FRs3SceneTechnique_name(){
   return this._name;
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
   // 读取属性
   o._name = p.readString();
   // 读取过程集合
   var c = p.readUint8();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3SceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
