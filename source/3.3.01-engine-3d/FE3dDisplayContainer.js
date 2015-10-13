//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3dDisplayContainer = function FE3dDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   //..........................................................
   // @attribute
   o._outline         = null;
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   //..........................................................
   // @method
   o.construct        = MO.FE3dDisplayContainer_construct;
   // @method
   o.calculateOutline = MO.FE3dDisplayContainer_calculateOutline;
   // @method
   o.dispose          = MO.FE3dDisplayContainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDisplayContainer_construct = function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   // 设置属性
   o._outline = new MO.SOutline3d();
}

//==========================================================
// <T>计算轮廓大小。</T>
//
// @method
// @return SOutline3 轮廓
//==========================================================
MO.FE3dDisplayContainer_calculateOutline = function FE3dDisplayContainer_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      // 计算渲染集合的轮廓
      var renderables = o._renderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            var renderableOutline = renderable.calculateOutline()
            outline.mergeMax(renderableOutline);
         }
      }
   }
   return outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dDisplayContainer_dispose = function FE3dDisplayContainer_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.dispose(o._materials);
   // 父处理
   o.__base.FDisplayContainer.dispose.call(o);
}
