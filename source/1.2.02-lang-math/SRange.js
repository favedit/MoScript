//==========================================================
// <T>范围结构。</T>
//
// @struct
// @author maocy
// @version 141230
//==========================================================
MO.SRange = function SRange(x, y, w, h){
   var o = this;
   // Attribute
   o.x         = x;
   o.y         = y;
   o.width     = w;
   o.height    = h;
   // Method
   o.dump      = SRange_dump;
   return o;
}

//============================================================
// <T>重置数据。</T>
//
// @method
//============================================================
MO.SRange_reset = function SRange_reset(){
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
MO.SRange_assign = function SRange_assign(rect){
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
MO.SRange_set = function SRange_set(left, top, right, bottom){
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
MO.SRange_setBounds = function SRange_setBounds(left, top, width, height){
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
MO.SRange_width = function SRange_width(){
   return this.right - this.left + 1;
}

//============================================================
// 设定矩形宽度
//
// @method
// @param width:width:Integer 设置的宽度
//============================================================
MO.SRange_setWidth = function SRange_setWidth(width){
   if(width){
      this.right = this.left + width - 1;
   }
}

//============================================================
// 得到矩形的高度
//
// @method
//============================================================
MO.SRange_height = function SRange_height(){
   return this.bottom - this.top + 1;
}

//============================================================
// 设定矩形的高度
//
// @method
//============================================================
MO.SRange_setHeight = function SRange_setHeight(height){
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
MO.SRange_move = function SRange_move(x, y){
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
MO.SRange_inc = function SRange_inc(border){
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
MO.SRange_dec = function SRange_dec(border){
   var n = RInt.nvl(border, 1);
   this.left += n;
   this.top += n;
   this.right -= n;
   this.bottom -= n;
}

//============================================================
// <T>获得调试信息。</T>
//
// @method
//============================================================
MO.SRange_dump = function SRange_dump(d){
   var o = this;
   d = RString.nvlStr(d);
   d.append(RClass.name(o));
   d.append(' [', o.x, ',', o.y, '-', o.width, ',', o.height, '] ');
   return d;
}
