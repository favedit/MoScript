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
   o._native    = null;
   //..........................................................
   // @method
   o.construct  = FG2dCanvasContext_construct;
   // @method
   o.linkCanvas = FG2dCanvasContext_linkCanvas;
   // @method
   o.clear      = FG2dCanvasContext_clear;
   o.drawImage  = FG2dCanvasContext_drawImage;
   o.toBytes    = FG2dCanvasContext_toBytes;
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
// @param h:hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FG2dCanvasContext_linkCanvas(h){
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, h)
   // 获得环境
   o._hCanvas = h;
   if(h.getContext){
      // 初始化对象
      var n = h.getContext('2d');
      if(!n){
         throw new TError("Current browser can't support Context2D technique.");
      }
      o._native = n;
   }
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
   var c = o._native;
}

//==========================================================
// <T>绘制图像。</T>
//
// @method
// @param m:image:Object 图像
//==========================================================
function FG2dCanvasContext_drawImage(m){
   var o = this;
   var g = o._native;
   // 绘制位图
   if(RClass.isClass(m, FImage)){
      g.drawImage(m.image(), 0, 0, o._size.width, o._size.height);
   }else{
      throw new TError(o, 'Unknown data type');
   }
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
