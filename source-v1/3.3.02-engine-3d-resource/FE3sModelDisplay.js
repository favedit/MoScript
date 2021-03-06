//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150415
//==========================================================
function FE3sModelDisplay(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   //..........................................................
   // @attribute
   o._model           = null;
   o._material        = null;
   //..........................................................
   // @method
   o.construct        = FE3sModelDisplay_construct;
   // @method
   o.material         = FE3sModelDisplay_material;
   // @method
   o.calculateOutline = FE3sModelDisplay_calculateOutline;
   // @method
   o.unserialize      = FE3sModelDisplay_unserialize;
   o.saveConfig       = FE3sModelDisplay_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sModelDisplay_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
   o._material = RClass.create(FE3sMaterial);
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FE3sMaterial 材质
//==========================================================
function FE3sModelDisplay_material(){
   return this._material;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
function FE3sModelDisplay_calculateOutline(){
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
function FE3sModelDisplay_unserialize(p){
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
function FE3sModelDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, p);
   // 存储属性
   o._material.saveConfig(p.create('Material'));
}
