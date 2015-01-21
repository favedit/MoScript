//==========================================================
// <T>尺寸接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MSize(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._location = RClass.register(o, new APtyPoint2('_location'));
   o._size     = RClass.register(o, new APtySize2('_size'));
   //..........................................................
   // @event
   o.onSize    = null;
   //..........................................................
   // @method
   o.construct = MSize_construct;
   // @method
   o.calcRect  = MSize_calcRect;
   o.resize    = MSize_resize;
   o.setWidth  = MSize_setWidth;
   o.setHeight = MSize_setHeight;
   o.setSize   = MSize_setSize;
   o.setBounds = MSize_setBounds;
   o.resetSize = MSize_resetSize;
   // @method
   o.dispose   = MSize_dispose;
   // @method
   o.innerDump = MSize_innerDump;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}

//==========================================================
// <T>改变大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(null != width){
      width = Math.max(parseInt(width), EMoveSize.MinWidth);
      if(this.width != width){
         this.width = width;
         hStyle.pixelWidth = width;
         sizeable = true;
      }
   }
   if(height != null){
      height = Math.max(parseInt(height), EMoveSize.MinHeight);
      if(this.height != height){
         this.height = height;
         hStyle.pixelHeight = height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}

//==========================================================
// <T>设置宽度。</T>
//
// @method
// @param p:width:Number 宽度
//==========================================================
function MSize_setWidth(p){
   this.setSize(p, null);
}

//==========================================================
// <T>设置高度。</T>
//
// @method
// @param p:height:Number 高度
//==========================================================
function MSize_setHeight(p){
   this.setSize(null, p);
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_setSize(w, h){
   var o = this;
   var t = this.panel(EPanel.Size);
   if(w != null){
      o._size.width = w;
      if(t){
         t.style.width = w;
      }
   }
   if(h != null){
      o._size.height = h;
      if(t){
         t.style.height = h;
      }
   }
}

//==========================================================
// <T>设置尺寸。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_setBounds(l, t, r, b, force){
   var o = this;
   var h = o.panel(EPanel.Size);
   if(!h){
      return;
   }
   var s = h.style;
   var c = false;
   // set left and top
   if(l && l >= 0){
      if(force || o.left != l){
         o.left = l;
         s.pixelLeft = l;
         c = true;
      }
   }
   if(t && t >= 0){
      if(force || o.top != t){
         o.top = t;
         s.pixelTop = t;
         c = true;
      }
   }
   // set left and top
   if(r && r >= 0){
      var width = r-o.left+1;
      if(force || o.width != width){
         o.width = width;
         s.pixelWidth = o.width;
         c = true;
      }
   }
   if(b && b >= 0){
      var height = b-o.top+1;
      if(force || o.height != height){
         o.height = height;
         s.pixelHeight = o.height;
         c = true;
      }
   }
   if(c && o.onSize){
      o.onSize();
   }
}

//==========================================================
// <T>重置大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_resetSize(){
   var o = this;
   o.setBounds(o.left, o.top, o.left+o.width-1, o.top+o.height-1, true)
}

//==========================================================
// <T>计算矩形。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_calcRect(){
   this.rect = RRect.nvl(this.rect);
   RHtml.toRect(this.rect, this.hPanel);
   return this.rect;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MSize_dispose(){
   var o = this;
   // 释放位置
   var v = o._location;
   if(v){
      v.dispose();
      o._location = null;
   }
   // 释放尺寸
   var v = o._size;
   if(v){
      v.dispose();
      o._size = null;
   }
}

//==========================================================
// <T>计算矩形。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MSize_innerDump(s, l){
   var o = this;
   s.append('Size [', RBoolean.toString(o.isSizeable), ':');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
