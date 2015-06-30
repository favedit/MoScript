//==========================================================
// <T>渲染视角。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FG3dViewport = function FG3dViewport(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   //..........................................................
   // @method
   o.set    = MO.FG3dViewport_set;
   return o;
}

//==========================================================
// <T>设置信息。</T>
//
// @param left:Number 左边
// @param top:Number 上边
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.FG3dViewport_set = function FG3dViewport_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height= height;
}
