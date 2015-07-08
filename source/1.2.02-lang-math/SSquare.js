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
   o.left      = MO.Lang.Integer.nvl(left);
   o.top       = MO.Lang.Integer.nvl(top);
   o.right     = MO.Lang.Integer.nvl(right);
   o.bottom    = MO.Lang.Integer.nvl(bottom);
   // @method
   o.reset     = MO.SSquare_reset;
   o.assign    = MO.SSquare_assign;
   o.set       = MO.SSquare_set;
   o.setBounds = MO.SSquare_setBounds;
   o.width     = MO.SSquare_width;
   o.setWidth  = MO.SSquare_setWidth;
   o.height    = MO.SSquare_height;
   o.setHeight = MO.SSquare_setHeight;
   o.move      = MO.SSquare_move;
   o.inc       = MO.SSquare_inc;
   o.dec       = MO.SSquare_dec;
   o.pack      = MO.SSquare_dump;
   o.unpack    = MO.SSquare_dump;
   o.dump      = MO.SSquare_dump;
   return o;
}

//============================================================
// <T>重置数据。</T>
//
// @method
// @param rect:rectangle:rectangle 矩形对象
//============================================================
MO.SSquare_reset = function SSquare_reset(){
   var o = this;
   o.left = 0;
   o.top = 0;
   o.right = 0;
   o.bottom = 0;
}

//============================================================
// <T>接受数据。</T>
//
// @method
// @param value:SRectangle 矩形对象
//============================================================
MO.SSquare_assign = function SSquare_assign(value){
   var o = this;
   o.left = value.left;
   o.top = value.top;
   o.right = value.right;
   o.bottom = value.bottom;
}

//============================================================
// <T>设置数据。</T>
//
// @method
//============================================================
MO.SSquare_set = function SSquare_set(left, top, right, bottom){
   var o = this;
   o.left = left;
   o.top = top;
   o.right = right;
   o.bottom = bottom;
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
// <T>获得运行数据。</T>
//
// @method
//============================================================
MO.SSquare_dump = function SSquare_dump(d){
   d = MO.Lang.String.nvlStr(d);
   d.append(MO.Class.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
