//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sDisplayContainer(o){
   o = RClass.inherits(this, o, FE3sDisplay);
   //..........................................................
   // @attribute
   o._displays        = null;
   //..........................................................
   // @method
   o.construct        = FE3sDisplayContainer_construct;
   // @method
   o.displays         = FE3sDisplayContainer_displays;
   o.calculateOutline = FE3sDisplayContainer_calculateOutline;
   o.unserialize      = FE3sDisplayContainer_unserialize;
   // @method
   o.saveConfig       = FE3sDisplayContainer_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sDisplayContainer_construct(){
   var o = this;
   o.__base.FE3sDisplay.construct.call(o);
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FE3sDisplayContainer_displays(){
   return this._displays;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
function FE3sDisplayContainer_calculateOutline(){
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
function FE3sDisplayContainer_unserialize(input){
   var o = this;
   o.__base.FE3sDisplay.unserialize.call(o, input);
   // 读取显示集合
   var displayCount = input.readUint16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = RClass.create(FE3sSceneDisplay);
         display.unserialize(input);
         displays.push(display);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sDisplayContainer_saveConfig(xconfig){
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
