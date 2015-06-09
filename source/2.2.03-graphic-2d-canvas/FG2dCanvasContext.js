with(MO){
   //==========================================================
   // <T>WebGL渲染环境。</T>
   //
   // @author maocy
   // @refer https://www.khronos.org/registry/webgl
   // @history 141230
   //==========================================================
   MO.FG2dCanvasContext = function FG2dCanvasContext(o){
      o = RClass.inherits(this, o, FG2dContext);
      //..........................................................
      // @attribute
      o._handle       = null;
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
   MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct(){
      var o = this;
      o.__base.FG2dContext.construct.call(o);
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas){
      var o = this;
      o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
      // 获得环境
      if(hCanvas.getContext){
         // 初始化对象
         var handle = hCanvas.getContext('2d');
         if(!handle){
            throw new TError(o, "Current browser can't support Context2D technique.");
         }
         o._handle = handle;
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
   MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(r, g, b, a, d){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      handle.clearRect(0, 0, size.width, size.height);
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
   MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth){
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.moveTo(x1, y1);
      handle.lineTo(x2, y2);
      handle.stroke();
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
   MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth){
      var o = this;
      var handle = o._handle;
      handle.strokeStyle = color;
      handle.lineWidth = lineWidth;
      handle.strokeRect(x, y, width, height);
   }

   //==========================================================
   // <T>绘制文字。</T>
   //
   // @method
   // @param text:String 文本
   // @param x:Integer 横坐标
   // @param y:Integer 纵坐标
   //==========================================================
   MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color){
      var o = this;
      var handle = o._handle;
      //handle.font = "italic 200 36px/2 Unknown Font, sans-serif"; 
      //handle.strokeStyle = "blue";
      //handle.fillStyle = "red";
      //handle.lineWidth = "10";
      //handle.strokeText(text, x, y);
      handle.fillStyle = color;
      handle.fillText(text, x, y);
   }

   //==========================================================
   // <T>绘制图像。</T>
   //
   // @method
   // @param content:Object 图像内容
   // @param x:Integer 横向位置
   // @param y:Integer 纵向位置
   //==========================================================
   MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y){
      var o = this;
      var handle = o._handle;
      var size = o._size;
      // 获得数据
      var data = null
      if(content.tagName == 'IMG'){
         data = content;
      }else if(RClass.isClass(content, FImage)){
         data = content.image();
      }else{
         throw new TError(o, 'Unknown content type');
      }
      // 绘制位图
      handle.drawImage(data, x, y, size.width, size.height);
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
   MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color){
      var o = this;
      var handle = o._handle;
      handle.fillStyle = color;
      handle.fillRect(x, y, width, height);
   }

   //==========================================================
   // <T>获得数据。</T>
   //
   // @method
   // @return Uint8Array 数据
   //==========================================================
   MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes(){
      var o = this;
      var size = o._size;
      return o._handle.getImageData(0, 0, size.width, size.height);
   }
}
