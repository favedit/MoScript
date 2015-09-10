//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FGuiBubble = function FGuiBubble(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   //..........................................................
   // @attribute
   //o._radius         = MO.Class.register(o, new MO.AGetSet('_radius'), 10);
   //o._lineWidth      = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   //o._foreFillColor  = MO.Class.register(o, new MO.AGetSet('_foreFillColor'), '#f9a800');
   //o._backFillColor  = MO.Class.register(o, new MO.AGetSet('_backFillColor'), '#007cb0');
   //o._strokeColor    = MO.Class.register(o, new MO.AGetSet('_strokeColor'), '#1f3855');
   o._bubbleStyle    = MO.Class.register(o, new MO.AGetSet('_bubbleStyle'));
   // @attribute
   o._data           = MO.Class.register(o, new MO.AGetSet('_data'));
   //..........................................................
   // @method
   o.construct       = MO.FGuiBubble_construct;
   o.bubbleStyle     = MO.FGuiBubble_bubbleStyle;
   o.setBubbleStyle  = MO.FGuiBubble_setBubbleStyle;
   // @method
   o.setup           = MO.FGuiBubble_setup;
   o.draw            = MO.FGuiBubble_draw;
   // @method
   o.dispose         = MO.FGuiBubble_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiBubble_construct = function FGuiBubble_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   // 设置变量
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiBubble_setup = function FGuiBubble_setup() {
   var o = this;

}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiBubble_draw = function FGuiBubble_draw(context) {
   var o = this;
   //o.__base.FGuiControl.onPaintBegin.call(o, event);
   //if (!o._data) {
   //   return;
   //}

   var graphic = context.graphic;
   //var rectangle = o._clientRectangle;

   var hCenter = o.left() + o.width() / 2;
   var vCenter = o.top() + o.height() / 2;

   var style = o._bubbleStyle;

   // 绘制背景圆圈
   graphic.drawCircle(hCenter, vCenter, style.radius, style.lineWidth, style.strokeColor, style.backFillColor);
   // 设置剪裁区
   var handle = graphic._handle;
   handle.save();
   handle.beginPath();
   handle.arc(hCenter, vCenter, style.radius, 0, 2 * Math.PI, false);
   handle.clip();
   // 绘制数值前景填充
   var fillY = o.top() + o.height() * (1 - 0.618);
   graphic.fillRectangle(o.left(), fillY, o.width(), o.height(), style.foreFillColor);
   // 绘制外边框
   graphic.drawCircle(hCenter, vCenter, style.radius, style.lineWidth, style.strokeColor, '');
   handle.restore();
   
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiBubble_dispose = function FGuiBubble_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o._bubbleStyle = MO.Lang.Object.dispose(o._bubbleStyle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
