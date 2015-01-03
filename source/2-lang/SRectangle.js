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
function SRectangle(l, t, r, b){
   var o = this;
   // @attribute
   o.left      = RInteger.nvl(left);
   o.top       = RInteger.nvl(top);
   o.right     = RInteger.nvl(right);
   o.bottom    = RInteger.nvl(bottom);
   // @method
   o.reset     = SRectangle_reset;
   o.assign    = SRectangle_assign;
   o.set       = SRectangle_set;
   o.setBounds = SRectangle_setBounds;
   o.width     = SRectangle_width;
   o.setWidth  = SRectangle_setWidth;
   o.height    = SRectangle_height;
   o.setHeight = SRectangle_setHeight;
   o.move      = SRectangle_move;
   o.inc       = SRectangle_inc;
   o.dec       = SRectangle_dec;
   o.pack      = SRectangle_dump;
   o.unpack    = SRectangle_dump;
   o.dump      = SRectangle_dump;
   return o;
}

function SRectangle_reset(){
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
function SRectangle_assign(rect){
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
function SRectangle_set(left, top, right, bottom){
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
function SRectangle_setBounds(left, top, width, height){
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
function SRectangle_width(){
   return this.right - this.left + 1;
}

//============================================================
// 设定矩形宽度
//
// @method
// @param width:width:Integer 设置的宽度
//============================================================
function SRectangle_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}

//============================================================
// 得到矩形的高度
//
// @method
//============================================================
function SRectangle_height(){
   return this.bottom - this.top + 1;
}

//============================================================
// 设定矩形的高度
//
// @method
//============================================================
function SRectangle_setHeight(height){
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
function SRectangle_move(x, y){
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
function SRectangle_inc(border){
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
function SRectangle_dec(border){
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
function SRectangle_dump(d){
   d = RString.nvlStr(d);
   d.append(RClass.name(this));
   d.append(' [', this.left, ',', this.top, '-', this.right, ',', this.bottom, '] ');
   d.append('(', this.width(), '-', this.height(), ')');
   return d;
}
