//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
MO.FE3sDisplay = function FE3sDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   //..........................................................
   // @attribute
   o._outline         = null;
   o._renderables     = MO.Class.register(o, new MO.AGetter('_renderables'));
   //..........................................................
   // @method
   o.construct        = MO.FE3sDisplay_construct;
   // @method
   o.calculateOutline = MO.FE3sDisplay_calculateOutline;
   // @method
   o.unserialize      = MO.FE3sDisplay_unserialize;
   o.saveConfig       = MO.FE3sDisplay_saveConfig;
   o.clone            = MO.FE3sDisplay_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   // 设置属性
   o._outline = new MO.SOutline3d();
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
MO.FE3sDisplay_calculateOutline = function FE3sDisplay_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.at(i);
            var renderableOutline = renderable.calculateOutline();
            outline.mergeMax(renderableOutline);
         }
         outline.update();
      }
   }
   return outline;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sDisplay_unserialize = function FE3sDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   // 读取主题集合
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new MO.TObjects();
      for(var i = 0; i < renderableCount; i++){
         var renderable = resourceConsole.unserialize(input);
         renderables.push(renderable);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sDisplay_saveConfig = function FE3sDisplay_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   // 存储显示集合
   var renderables = o._renderables;
   if(renderables){
      var xrenderables = xconfig.create('RenderableCollection');
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.saveConfig(xrenderables.create('Renderable'));
      }
   }
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
MO.FE3sDisplay_clone = function FE3sDisplay_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   result._outline.assign(o._outline)
   // o._renderables     = null;
   return result;
}
