//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   //..........................................................
   // @attribute
   o._native       = null;
   //..........................................................
   // @method
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   // @method
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   // @method
   o.dispose       = FG2dContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param h:hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}

//==========================================================
// <T>绘制直线。</T>
//
// @method
// @param x1:Number 起始横坐标
// @param y1:Number 起始纵坐标
// @param x2:Number 目标横坐标
// @param y2:Number 目标纵坐标
//==========================================================
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}

//==========================================================
// <T>绘制矩形。</T>
//
// @method
// @param x1:Number 起始横坐标
// @param y1:Number 起始纵坐标
// @param x2:Number 目标横坐标
// @param y2:Number 目标纵坐标
//==========================================================
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}

//==========================================================
// <T>绘制文本。</T>
//
// @method
// @param x:Number 横坐标
// @param y:Number 纵坐标
// @param t:text:String 文本内容
//==========================================================
function FG2dContext_drawText(x, y, t){
   var o = this;
   //o._native.font = "italic 60px serif";
   o._native.fillText(t, x, y);
}

//==========================================================
// <T>绘制位图。</T>
//
// @method
// @param p:image:FImage 位图
//==========================================================
function FG2dContext_drawImage(){
}

//==========================================================
// <T>填充矩形。</T>
//
// @method
// @param x1:Number 起始横坐标
// @param y1:Number 起始纵坐标
// @param x2:Number 目标横坐标
// @param y2:Number 目标纵坐标
//==========================================================
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
