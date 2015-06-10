with(MO){
   //==========================================================
   // <T>控件对象。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiControl = function FGuiControl(o){
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject);
      //..........................................................
      // @attribute
      o._renderable  = RClass.register(o, new AGetter('_renderable'));
      //..........................................................
      // @method
      o.onPaintBegin = FGuiControl_onPaintBegin;
      o.onPaintEnd   = FGuiControl_onPaintEnd;
      //..........................................................
      o.paint        = FGuiControl_paint;
      o.build        = FGuiControl_build;
      o.process      = FGuiControl_process;
      // @attribute
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onPaintBegin = function FGuiControl_onPaintBegin(graphic){
      var o = this;
      graphic.fillRectangle(0, 0, 400, 200, '#00FF00', 1);
      graphic.drawText('Hello', 10, 10, '#FF0000');
   }

   //==========================================================
   // <T>后绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(graphic){
      var o = this;
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_paint = function FGuiControl_paint(graphic){
      var o = this;
      //..........................................................
      // 开始绘制处理
      o.onPaintBegin(graphic);
      //..........................................................
      // 子控件处理
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FGuiControl)){
               component.paint(graphic);
            }
         }
      }
      //..........................................................
      // 绘制结束处理
      o.onPaintEnd(graphic);
   }

   //==========================================================
   // <T>建立处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_build = function FGuiControl_build(){
      var o = this;
      //..........................................................
      // 获得渲染对象
      var renderable = o._renderable;
      if(!renderable){
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlData);
      }
      renderable.setLocation(100, 50);
      renderable.setSize(400, 200);
      //..........................................................
      // 绘制处理
      var graphic = renderable.beginDraw();
      o.paint(graphic);
      renderable.endDraw();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   // @param region 区域
   //==========================================================
   MO.FGuiControl_process = function FGuiControl_process(region){
      var o = this;
   }
}
