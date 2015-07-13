//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150415
//==========================================================
MO.FE3sModelDisplay = function FE3sModelDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   //..........................................................
   // @attribute
   o._model           = null;
   o._material        = null;
   //..........................................................
   // @method
   o.construct        = MO.FE3sModelDisplay_construct;
   // @method
   o.material         = MO.FE3sModelDisplay_material;
   // @method
   o.calculateOutline = MO.FE3sModelDisplay_calculateOutline;
   // @method
   o.unserialize      = MO.FE3sModelDisplay_unserialize;
   o.saveConfig       = MO.FE3sModelDisplay_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = MO.Class.create(MO.FE3sMaterial);
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FE3sMaterial 材质
//==========================================================
MO.FE3sModelDisplay_material = function FE3sModelDisplay_material(){
   return this._material;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
MO.FE3sModelDisplay_calculateOutline = function FE3sModelDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var meshes = o._model.meshes();
      if(meshes){
         outline.setMin();
         var count = meshes.count();
         for(var i = 0; i < count; i++){
            var mesh = meshes.at(i);
            var meshOutline = mesh.calculateOutline();
            outline.mergeMax(meshOutline);
         }
         outline.update();
      }
   }
   return outline;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sModelDisplay_unserialize = function FE3sModelDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, p);
   // 读取属性
   o._material.unserialize(p);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.FE3sModelDisplay_saveConfig = function FE3sModelDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, p);
   // 存储属性
   o._material.saveConfig(p.create('Material'));
}
