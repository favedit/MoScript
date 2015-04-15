//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sDisplay(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   //..........................................................
   // @attribute
   o._outline         = null;
   o._renderables     = null;
   //..........................................................
   // @method
   o.construct        = FE3sDisplay_construct;
   // @method
   o.renderables      = FE3sDisplay_renderables;
   // @method
   o.calculateOutline = FE3sDisplay_calculateOutline;
   // @method
   o.unserialize      = FE3sDisplay_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sDisplay_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
   // 设置属性
   o._outline = new SOutline3d();
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FE3sDisplay_renderables(){
   return this._renderables;
}

//==========================================================
// <T>计算三维轮廓。</T>
//
// @method
// @return SOutline3 三维轮廓
//==========================================================
function FE3sDisplay_calculateOutline(){
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
function FE3sDisplay_unserialize(input){
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   // 读取主题集合
   var renderableCount = input.readUint16();
   if(renderableCount > 0){
      var renderables = o._renderables = new TObjects();
      for(var i = 0; i < renderableCount; i++){
         var renderable = resourceConsole.unserialize(input);
         renderables.push(renderable);
      }
   }
}
