//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
function FG2dCanvasContext(o){
   o = RClass.inherits(this, o, FG2dContext);
   //..........................................................
   // @attribute
   o._native       = null;
   //..........................................................
   // @method
   o.construct     = FG2dCanvasContext_construct;
   // @method
   o.linkCanvas    = FG2dCanvasContext_linkCanvas;
   // @method
   o.clear         = FG2dCanvasContext_clear;
   o.drawLine      = FG2dCanvasContext_drawLine;
   o.drawRectangle = FG2dCanvasContext_drawRectangle;
   o.drawText      = FG2dCanvasContext_drawText;
   o.drawImage     = FG2dCanvasContext_drawImage;
   o.fillRectangle = FG2dCanvasContext_fillRectangle;
   o.toBytes       = FG2dCanvasContext_toBytes;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG2dCanvasContext_construct(){
   var o = this;
   o.__base.FG2dContext.construct.call(o);
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FG2dCanvasContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   // 获得环境
   if(hCanvas.getContext){
      // 初始化对象
      var graphic = hCanvas.getContext('2d');
      if(!graphic){
         throw new TError(o, "Current browser can't support Context2D technique.");
      }
      o._native = graphic;
   }
   o._hCanvas = hCanvas;
}

//==========================================================
// <T>清空内容。</T>
//
// @param r:red:Float 红色
// @param g:green:Float 绿色
// @param b:blue:Float 蓝色
// @param a:alpha:Float 透明
// @param d:depth:Float 深度
//==========================================================
function FG2dCanvasContext_clear(r, g, b, a, d){
   var o = this;
   var g = o._native;
   var size = o._size;
   g.clearRect(0, 0, size.width, size.height);
}

//==========================================================
// <T>绘制直线。</T>
//
// @method
// @param x1:Integer 横坐标1
// @param y1:Integer 纵坐标1
// @param x2:Integer 横坐标2
// @param y2:Integer 纵坐标2
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.moveTo(x1, y1);
   g.lineTo(x2, y2);
   g.stroke();
}

//==========================================================
// <T>绘制矩形。</T>
//
// @method
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 宽度
// @param height:Integer 高度
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
   var o = this;
   var g = o._native;
   g.strokeStyle = color;
   g.lineWidth = lineWidth;
   g.strokeRect(x, y, width, height);
}

//==========================================================
// <T>绘制文字。</T>
//
// @method
// @param text:String 文本
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
//==========================================================
function FG2dCanvasContext_drawText(text, x, y, color){
   var o = this;
   var g = o._native;
   //g.font = "italic 200 36px/2 Unknown Font, sans-serif"; 
   //g.strokeStyle = "blue";
   //g.fillStyle = "red";
   //g.lineWidth = "10";
   //g.strokeText(text, x, y);
   g.fillStyle = color;
   g.fillText(text, x, y);
}

//==========================================================
// <T>绘制图像。</T>
//
// @method
// @param m:image:Object 图像
//==========================================================
function FG2dCanvasContext_drawImage(data, x, y){
   var o = this;
   var g = o._native;
   // 获得数据
   var pixels = null
   if(data.tagName == 'IMG'){
      pixels = data;
   }else if(RClass.isClass(data, FImage)){
      pixels = data.image();
   }else{
      throw new TError(o, 'Unknown data type');
   }
   // 绘制位图
   g.drawImage(pixels, x, y, o._size.width, o._size.height);
}

//==========================================================
// <T>绘制矩形。</T>
//
// @method
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 宽度
// @param height:Integer 高度
// @param color:String 颜色
// @param lineWidth:Integer 线宽
//==========================================================
function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
   var o = this;
   var g = o._native;
   g.fillStyle = color;
   g.fillRect(x, y, width, height);
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return Uint8Array 数据
//==========================================================
function FG2dCanvasContext_toBytes(){
   var o = this;
   var s = o._size;
   return o._native.getImageData(0, 0, s.width, s.height);
}
