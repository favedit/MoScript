//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FRenderable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o.left   = 0;
   o.top    = 0;
   //..........................................................
   // @method
   o.set    = FRenderable_set;
   return o;
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function FRenderable_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
}
