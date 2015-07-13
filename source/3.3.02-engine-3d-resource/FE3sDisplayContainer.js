//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplay);
   //..........................................................
   // @attribute
   o._displays        = MO.Class.register(o, new MO.AGetter('_displays'));
   //..........................................................
   // @method
   o.construct        = MO.FE3sDisplayContainer_construct;
   // @method
   o.pushDisplay      = MO.FE3sDisplayContainer_pushDisplay;
   // @method
   o.calculateOutline = MO.FE3sDisplayContainer_calculateOutline;
   o.unserialize      = MO.FE3sDisplayContainer_unserialize;
   // @method
   o.saveConfig       = MO.FE3sDisplayContainer_saveConfig;
   o.clone            = MO.FE3sDisplayContainer_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new MO.TObjects();
   }
   display.setParent(o);
   displays.push(display);
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
MO.FE3sDisplayContainer_calculateOutline = function FE3sDisplayContainer_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      var renderabels = o._renderables;
      if(renderabels){
         outline.setMin();
         var count = renderabels.count();
         for(var i = 0; i < count; i++){
            var renderable = renderabels.getAt(i);
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
MO.FE3sDisplayContainer_unserialize = function FE3sDisplayContainer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, input);
   // 读取显示集合
   var displayCount = input.readUint16();
   if(displayCount > 0){
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = MO.Class.create(MO.FE3sSceneDisplay);
         display.unserialize(input);
         o.pushDisplay(display);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sDisplayContainer_saveConfig = function FE3sDisplayContainer_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplay.saveConfig.call(o, xconfig);
   // 存储显示集合
   var displays = o._displays;
   if(displays){
      var xdisplays = xconfig.create('DisplayCollection');
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
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
MO.FE3sDisplayContainer_clone = function FE3sDisplayContainer_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplay.clone.call(o, instance);
   //o._displays        = null;
   return result;
}
