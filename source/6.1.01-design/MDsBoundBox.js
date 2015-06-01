with(MO){
   //==========================================================
   // <T>包围盒。</T>
   //
   // @author maocy
   // @history 150215
   //==========================================================
   MO.MDsBoundBox = function MDsBoundBox(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._boundVisible = false;
      o._boundBox     = null;
      //..........................................................
      // @method
      o.boundBox      = MDsBoundBox_boundBox;
      o.showBoundBox  = MDsBoundBox_showBoundBox;
      o.hideBoundBox  = MDsBoundBox_hideBoundBox;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.MDsBoundBox_boundBox = function MDsBoundBox_boundBox(){
      var o = this;
      var boundBox = o._boundBox;
      if(!boundBox){
         // 创建包围盒
         boundBox = o._boundBox = RClass.create(FE3dBoundBox);
         boundBox.linkGraphicContext(o);
         //boundBox.setParent(o);
         boundBox._drawable = o;
         boundBox._parent = o;
         boundBox.setup();
      }
      return boundBox;
   }

   //==========================================================
   // <T>显示包围盒。</T>
   //
   // @method
   //==========================================================
   MO.MDsBoundBox_showBoundBox = function MDsBoundBox_showBoundBox(){
      var o = this;
      // 隐藏包围盒
      var boundBox = o.boundBox();
      //boundBox.remove();
      // 显示包围盒
      var resource = o.resource();
      var meshResource = resource.mesh();
      var outline = meshResource.outline();
      boundBox.outline().assign(outline);
      boundBox.upload();
      // 放入绘制集合
      //o.pushDrawable(boundBox);
      o._boundVisible = true;
   }

   //==========================================================
   // <T>隐藏包围盒。</T>
   //
   // @method
   //==========================================================
   MO.MDsBoundBox_hideBoundBox = function MDsBoundBox_hideBoundBox(){
      var o = this;
      var boundBox = o._boundBox;
      // 移除绘制集合
      //o.removeDrawable(boundBox);
      o._boundVisible = false;
   }
}
