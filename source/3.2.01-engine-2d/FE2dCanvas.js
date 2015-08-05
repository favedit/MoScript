//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE2dCanvas = function FE2dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MCanvasObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._size         = MO.Class.register(o, new MO.AGetter('_size'));
   //..........................................................
   // @html
   o._hCanvas      = null;
   //..........................................................
   // @event
   o.onResize      = MO.FE2dCanvas_onResize;
   //..........................................................
   // @method
   o.construct     = MO.FE2dCanvas_construct;
   // @method
   o.createContext = MO.FE2dCanvas_createContext;
   // @method
   o.htmlCanvas    = MO.FE2dCanvas_htmlCanvas;
   o.build         = MO.FE2dCanvas_build;
   o.setPanel      = MO.FE2dCanvas_setPanel;
   o.resize        = MO.FE2dCanvas_resize;
   o.show          = MO.FE2dCanvas_show;
   o.hide          = MO.FE2dCanvas_hide;
   o.setVisible    = MO.FE2dCanvas_setVisible;
   o.reset         = MO.FE2dCanvas_reset;
   // @method
   o.dispose       = MO.FE2dCanvas_dispose;
   return o;
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2(1280, 720);
}

//==========================================================
// <T>创建绘制环境。</T>
//
// @method
// @return FG2dCanvasContext 绘制环境
//==========================================================
MO.FE2dCanvas_createContext = function FE2dCanvas_createContext(){
   return MO.Class.create(MO.FG2dCanvasContext);
}

//==========================================================
// <T>获得页面元素。</T>
//
// @method
// @return HtmlCanvasTag 页面元素
//==========================================================
MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
   return this._hCanvas;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param hDocument:HtmlTag 页面元素
//==========================================================
MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
   var o = this;
   // 获得大小
   var size = o._size;
   var width = size.width;
   var height = size.height;
   // 创建画板
   var hCanvas = o._hCanvas = MO.Window.Builder.create(hDocument, 'CANVAS');
   hCanvas.__linker = o;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   // 创建渲染环境
   var context = o._graphicContext = o.createContext();
   context.linkCanvas(hCanvas);
   // 设置大小
   o.resize(width, height);
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
// @param hPanel:HtmlTag 网页元素
//==========================================================
MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
   var o = this;
   // 放入父容器
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
   // 改变大小
   o.onResize();
}

//==========================================================
// <T>改变大小。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FE2dCanvas_resize = function FE2dCanvas_resize(width, height){
   var o = this;
   // 设置画板
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   // 设置尺寸
   o._size.set(width, height);
   o._graphicContext.size().set(width, height);
   MO.Logger.debug(o, 'Canvas2d resize. (size={1}x{2}, html={3})', width, height, hCanvas.outerHTML);
}

//==========================================================
// <T>可见处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvas_show = function FE2dCanvas_show(){
   this.setVisible(true);
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvas_hide = function FE2dCanvas_hide(){
   this.setVisible(false);
}

//==========================================================
// <T>设置可见处理。</T>
//
// @method
// @param visible:Boolean 可见性
//==========================================================
MO.FE2dCanvas_setVisible = function FE2dCanvas_setVisible(visible){
   MO.Window.Html.visibleSet(this._hCanvas, visible);
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
   this._graphicContext.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
   var o = this;
   // 释放属性
   o._size = MO.Lang.Object.dispose(o._size);
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._hPanel = MO.Window.Html.free(o._hPanel);
   o._hCanvas = MO.Window.Html.free(o._hCanvas);
   // 父处理
   o.__base.FCanvas.dispose.call(o);
}
