with(MO){
   //==========================================================
   // <T>尺寸接口。</T>
   //
   // @face
   // @author maocy
   // @version 150101
   //==========================================================
   MO.MGuiSize = function MGuiSize(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._location   = RClass.register(o, [new APtyPoint2('_location'), new AGetter('_location')]);
      o._size       = RClass.register(o, [new APtySize2('_size'), new AGetter('_size')]);
      //..........................................................
      // @method
      o.construct   = MGuiSize_construct;
      // @method
      o.left        = MGuiSize_left;
      o.setLeft     = MGuiSize_setLeft;
      o.top         = MGuiSize_top;
      o.setTop      = MGuiSize_setTop;
      o.setLocation = MGuiSize_setLocation;
      // @method
      o.width       = MGuiSize_width;
      o.setWidth    = MGuiSize_setWidth;
      o.height      = MGuiSize_height;
      o.setHeight   = MGuiSize_setHeight;
      o.setSize     = MGuiSize_setSize;
      // @method
      o.setBounds   = MGuiSize_setBounds;
      // @method
      o.dispose     = MGuiSize_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.MGuiSize_construct = function MGuiSize_construct(){
      var o = this;
      o._location = new SPoint2();
      o._size = new SSize2();
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
      this._location.x = value;
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
      this._location.y = value;
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
      this._size.width = value;
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
      this._size.height = value;
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
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
   }
}
