with(MO){
   //==========================================================
   // <T>矩形结构。</T>
   //
   // @struct
   // @param l:width:Number 宽度
   // @param t:height:Number 高度
   // @param r:deep:Number 深度
   // @param b:deep:Number 深度
   // @author maocy
   // @version 141230
   //==========================================================
   MO.SSquare = function SSquare(l, t, r, b){
      var o = this;
      // @attribute
      o.left      = RInteger.nvl(left);
      o.top       = RInteger.nvl(top);
      o.right     = RInteger.nvl(right);
      o.bottom    = RInteger.nvl(bottom);
      // @method
      o.reset     = SSquare_reset;
      o.assign    = SSquare_assign;
      o.set       = SSquare_set;
      o.setBounds = SSquare_setBounds;
      o.width     = SSquare_width;
      o.setWidth  = SSquare_setWidth;
      o.height    = SSquare_height;
      o.setHeight = SSquare_setHeight;
      o.move      = SSquare_move;
      o.inc       = SSquare_inc;
      o.dec       = SSquare_dec;
      o.pack      = SSquare_dump;
      o.unpack    = SSquare_dump;
      o.dump      = SSquare_dump;
      return o;
   }

   MO.SSquare_reset = function SSquare_reset(){
      var o = this;
      o.left = 0;
      o.top = 0;
      o.right = 0;
      o.bottom = 0;
   }

   //============================================================
   // 指定矩形坐标类
   //
   // @method
   // @param rect:rectangle:rectangle 矩形对象
   //============================================================
   MO.SSquare_assign = function SSquare_assign(rect){
      this.left = rect.left;
      this.top = rect.top;
      this.right = rect.right;
      this.bottom = rect.bottom;
   }

   //============================================================
   // 指定当前矩形的四个坐标
   //
   // @method
   //============================================================
   MO.SSquare_set = function SSquare_set(left, top, right, bottom){
      this.left = left;
      this.top = top;
      this.right = right;
      this.bottom = bottom;
   }

   //============================================================
   // 设定边框的位置
   //
   // @method
   //============================================================
   MO.SSquare_setBounds = function SSquare_setBounds(left, top, width, height){
      var o = this;
      o.left = left;
      o.top = top;
      o.right = o.left + width - 1;
      o.bottom = o.top + height - 1;
   }

   //============================================================
   // 取得宽度
   //
   // @method
   //============================================================
   MO.SSquare_width = function SSquare_width(){
      return this.right - this.left + 1;
   }

   //============================================================
   // 设定矩形宽度
   //
   // @method
   // @param width:width:Integer 设置的宽度
   //============================================================
   MO.SSquare_setWidth = function SSquare_setWidth(width){
      if(width){
         this.right = this.left + width - 1;
      }
   }

   //============================================================
   // 得到矩形的高度
   //
   // @method
   //============================================================
   MO.SSquare_height = function SSquare_height(){
      return this.bottom - this.top + 1;
   }

   //============================================================
   // 设定矩形的高度
   //
   // @method
   //============================================================
   MO.SSquare_setHeight = function SSquare_setHeight(height){
      if(height){
         this.bottom = this.top + height - 1;
      }
   }

   //============================================================
   // 把矩形移动到某个位置
   //
   // @method
   // @param x:xPosition:Integ
   //============================================================
   MO.SSquare_move = function SSquare_move(x, y){
      this.left += x;
      this.top += y;
      this.right += x;
      this.bottom += y;
   }

   //============================================================
   // 放大指定的大小
   //
   // @method
   //============================================================
   MO.SSquare_inc = function SSquare_inc(border){
      var n = RInt.nvl(border, 1);
      this.left -= n;
      this.top -= n;
      this.right += n;
      this.bottom += n;
   }

   //============================================================
   // 把矩形缩小指定的宽度和高度
   //
   // @method
   //============================================================
   MO.SSquare_dec = function SSquare_dec(border){
      var n = RInt.nvl(border, 1);
      this.left += n;
      this.top += n;
      this.right -= n;
      this.bottom -= n;
   }

   //============================================================
   // ???
   //
   // @method
   //============================================================
   MO.SSquare_dump = function SSquare_dump(d){
      d = RString.nvlStr(d);
      d.append(RClass.name(this));
      d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
      d.append('(', this.width(), '-', this.height(), ')');
      return d;
   }
}
