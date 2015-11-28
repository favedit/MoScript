//==========================================================
// <T>列表控件。</T>
//
// @class
// @author 孙鹏
// @version 151105
//==========================================================
MO.FGuiListBox = function FGuiListBox(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._gap           = MO.Class.register(o, new MO.AGetSet('_gap'), 0);
   o._items         = MO.Class.register(o, new MO.AGetSet('_items'));
   o._displayCount  = MO.Class.register(o, new MO.AGetSet('_displayCount'), 5);
   // @attribute
   o._startTick     = MO.Class.register(o, new MO.AGetSet('_startTick'), 0);
   o._dataAnimationDuration = 5000;
   o._animationPlaying = MO.Class.register(o, new MO.AGetSet('_animationPlaying'), false);
   // @attribute
   o._itemRectangle = null;
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FGuiListBox_onPaintBegin;
   //..........................................................
   // @method
   o.construct      = MO.FGuiListBox_construct;
   // @method
   o.push           = MO.FGuiListBox_push;
   o.clear          = MO.FGuiListBox_clear;
   // @method
   o.dispose        = MO.FGuiListBox_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_onPaintBegin = function FGuiListBox_onPaintBegin(event) {
   var o = this;
   var rectangle = event.rectangle;
   var graphic = event.graphic;
   var padding = o._padding;
   var left = rectangle.left + padding.left;
   var top = rectangle.top + padding.top;
   var bottom = rectangle.bottom() - padding.bottom;
   var width = rectangle.width - padding.left - padding.right;
   var height = rectangle.height - padding.top - padding.bottom;

   var itemRect = o._itemRectangle;
   var itemDrawX = left;
   var itemDrawY = top;
   var itemWidth = 0;
   var itemHeight = 0;

   var items = o._items;
   var itemCount = items.count();
   var displayCount = o._displayCount;
   var gap = o._gap;
   var rate = o._animationPlaying ? (MO.Timer.current() - o._startTick) / o._dataAnimationDuration : 1;
   if (rate > 1) {
      rate = 1;
      o._animationPlaying = false;
   }
   for (var i = 0; i < itemCount && i < displayCount; i++) {
      var item = items.at(i);
      itemWidth = item.width() > rectangle.width ? rectangle.width : item.width();
      itemHeight = item.height();
      itemRect.set(itemDrawX, itemDrawY, itemWidth, itemHeight);
      item.draw(graphic, itemRect, rate);
      itemDrawY += itemHeight + gap;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_construct = function FGuiListBox_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
   o._items = new MO.TObjects();
   o._itemRectangle = new MO.SRectangle();
}

//==========================================================
// <T>增加一个子对象。</T>
//
// @method
//==========================================================
MO.FGuiListBox_push = function FGuiListBox_push(control){
   var o = this;
   o.__base.FGuiControl.push.call(o, control);
   // 设置变量
   if(MO.Class.isClass(control, MO.FGuiListBoxItem)){
      o._items.push(control);
   }
}

//==========================================================
// <T>增加一个子对象。</T>
//
// @method
//==========================================================
MO.FGuiListBox_clear = function FGuiListBox_clear(){
   var o = this;
   o.__base.FGuiControl.clear.call(o);
   o._items.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiListBox_dispose = function FGuiListBox_dispose() {
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o._itemRectangle = MO.Lang.Object.dispose(o._itemRectangle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
