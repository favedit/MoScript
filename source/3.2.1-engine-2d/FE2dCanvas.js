//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE2dCanvas(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._size     = null;
   o._context  = null;
   //..........................................................
   // @event
   o.onResize  = FE2dCanvas_onResize;
   //..........................................................
   // @method
   o.construct = FE2dCanvas_construct;
   // @method
   o.size      = FE2dCanvas_size;
   o.context   = FE2dCanvas_context;
   o.build     = FE2dCanvas_build;
   o.setPanel  = FE2dCanvas_setPanel;
   // @method
   o.dispose   = FE2dCanvas_dispose;
   return o;
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
function FE2dCanvas_onResize(p){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE2dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}

//==========================================================
// <T>获得尺寸。</T>
//
// @method
// @return SSize2 尺寸
//==========================================================
function FE2dCanvas_size(){
   return this._size;
}

//==========================================================
// <T>获得环境。</T>
//
// @method
// @return FG2dContext 环境
//==========================================================
function FE2dCanvas_context(){
   return this._context;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:document:HtmlTag 页面元素
//==========================================================
function FE2dCanvas_build(p){
   var o = this;
   var s = o._size;
   // 创建画板
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.width = s.width;
   h.height = s.height;
   // 创建渲染环境
   var c = o._context = RClass.create(FG2dCanvasContext);
   c.linkCanvas(h);
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
//==========================================================
function FE2dCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   // 放入父容器
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   // 改变大小
   o.onResize();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE2dCanvas_dispose(){
   var o = this;
   // 释放属性
   o._context = RObject.dispose(o._context);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
