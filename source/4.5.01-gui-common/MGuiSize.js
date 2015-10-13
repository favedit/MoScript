//==========================================================
// <T>尺寸接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MGuiSize = function MGuiSize(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._location   = MO.Class.register(o, [new MO.APtyPoint2('_location'), new MO.AGetter('_location')]);
   o._right      = MO.Class.register(o, [new MO.APtyInteger('_right'), new MO.AGetSet('_right')], 0);
   o._bottom     = MO.Class.register(o, [new MO.APtyInteger('_bottom'), new MO.AGetSet('_bottom')], 0);
   o._size       = MO.Class.register(o, [new MO.APtySize2('_size'), new MO.AGetter('_size')]);
   o._scale      = MO.Class.register(o, [new MO.APtySize2('_scale'), new MO.AGetter('_scale')]);
   //..........................................................
   // @method
   o.construct   = MO.MGuiSize_construct;
   // @method
   o.left        = MO.MGuiSize_left;
   o.setLeft     = MO.MGuiSize_setLeft;
   o.top         = MO.MGuiSize_top;
   o.setTop      = MO.MGuiSize_setTop;
   o.setLocation = MO.MGuiSize_setLocation;
   // @method
   o.width       = MO.MGuiSize_width;
   o.setWidth    = MO.MGuiSize_setWidth;
   o.height      = MO.MGuiSize_height;
   o.setHeight   = MO.MGuiSize_setHeight;
   o.setSize     = MO.MGuiSize_setSize;
   // @method
   o.setScale    = MO.MGuiSize_setScale;
   // @method
   o.setBounds   = MO.MGuiSize_setBounds;
   // @method
   o.dispose     = MO.MGuiSize_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MGuiSize_construct = function MGuiSize_construct(){
   var o = this;
   o._location = new MO.SPoint2(0, 0);
   o._size = new MO.SSize2(128, 128);
   o._scale = new MO.SSize2(1, 1);
}

//==========================================================
// <T>获得左距离。</T>
//
// @method
// @return Number 左距离
//==========================================================
MO.MGuiSize_left = function MGuiSize_left(){
   return this._location.x;
}

//==========================================================
// <T>设置左距离。</T>
//
// @method
// @param value:Number 左距离
//==========================================================
MO.MGuiSize_setLeft = function MGuiSize_setLeft(value){
   this.setLocation(value, this._location.y);
}

//==========================================================
// <T>获得上距离。</T>
//
// @method
// @return Number 上距离
//==========================================================
MO.MGuiSize_top = function MGuiSize_top(){
   return this._location.y;
}

//==========================================================
// <T>设置上距离。</T>
//
// @method
// @param value:Number 上距离
//==========================================================
MO.MGuiSize_setTop = function MGuiSize_setTop(value){
   this.setLocation(this._location.x, value);
}

//==========================================================
// <T>设置坐标。</T>
//
// @method
// @param x:Number 左距离
// @param y:Number 上距离
//==========================================================
MO.MGuiSize_setLocation = function MGuiSize_setLocation(x, y){
   this._location.set(x, y);
}

//==========================================================
// <T>获得宽度。</T>
//
// @method
// @return Number 宽度
//==========================================================
MO.MGuiSize_width = function MGuiSize_width(){
   return this._size.width;
}

//==========================================================
// <T>设置宽度。</T>
//
// @method
// @param value:Number 宽度
//==========================================================
MO.MGuiSize_setWidth = function MGuiSize_setWidth(value){
   this.setSize(value, this._size.height);
}

//==========================================================
// <T>获得高度。</T>
//
// @method
// @return Number 高度
//==========================================================
MO.MGuiSize_height = function MGuiSize_height(){
   return this._size.height;
}

//==========================================================
// <T>设置高度。</T>
//
// @method
// @param value:Number 高度
//==========================================================
MO.MGuiSize_setHeight = function MGuiSize_setHeight(value){
   this.setSize(this._size.width, value);
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.MGuiSize_setSize = function MGuiSize_setSize(width, height){
   this._size.set(width, height);
}

//==========================================================
// <T>设置缩放。</T>
//
// @method
// @param width:Number 横向缩放
// @param height:Number 纵向缩放
//==========================================================
MO.MGuiSize_setScale = function MGuiSize_setScale(width, height){
   this._scale.set(width, height);
}

//==========================================================
// <T>设置边框。</T>
//
// @method
// @param left:Number 左距离
// @param top:Number 上距离
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.MGuiSize_setBounds = function MGuiSize_setBounds(left, top, width, height){
   var o = this;
   o.setLocation(left, top);
   o.setSize(width, height);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MGuiSize_dispose = function MGuiSize_dispose(){
   var o = this;
   o._location = MO.Lang.Object.dispose(o._location);
   o._size = MO.Lang.Object.dispose(o._size);
   o._scale = MO.Lang.Object.dispose(o._scale);
}
