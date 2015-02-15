//==========================================================
// <T>包围盒。</T>
//
// @author maocy
// @history 150215
//==========================================================
function MDsBoundBox(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._boundBox    = null;
   //..........................................................
   // @method
   o.boundBox     = MDsBoundBox_boundBox;
   o.showBoundBox = MDsBoundBox_showBoundBox;
   o.hideBoundBox = MDsBoundBox_hideBoundBox;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function MDsBoundBox_boundBox(){
   var o = this;
   var b = o._boundBox;
   if(!b){
      // 创建包围盒
      b = o._boundBox = RClass.create(FRd3BoundBox);
      b.linkGraphicContext(o);
      b.setup();
   }
   return b;
}

//==========================================================
// <T>显示包围盒。</T>
//
// @method
//==========================================================
function MDsBoundBox_showBoundBox(){
   var o = this;
   // 隐藏包围盒
   var b = o.boundBox();
   b.remove();
   // 显示包围盒
   var r = o.resource();
   var rm = r.mesh();
   var rl = rm.outline();
   b.outline().assign(rl);
   b.upload();
   o._display.pushRenderable(b);
}

//==========================================================
// <T>隐藏包围盒。</T>
//
// @method
//==========================================================
function MDsBoundBox_hideBoundBox(){
   var o = this;
   // 隐藏包围盒
   var b = o._boundBox;
   if(b){
      b.remove();
   }
}
