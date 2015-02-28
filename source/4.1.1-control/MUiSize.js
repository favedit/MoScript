//==========================================================
// <T>尺寸接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MUiSize(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._location       = RClass.register(o, new APtyPoint2('_location'));
   o._size           = RClass.register(o, new APtySize2('_size'));
   //..........................................................
   // @method
   o.construct       = MUiSize_construct;
   // @method
   o.left            = MUiSize_left;
   o.setLeft         = MUiSize_setLeft;
   o.top             = MUiSize_top;
   o.setTop          = MUiSize_setTop;
   o.location        = MUiSize_location;
   o.setLocation     = MUiSize_setLocation;
   o.refreshLocation = MUiSize_refreshLocation;
   // @method
   o.width           = MUiSize_width;
   o.setWidth        = MUiSize_setWidth;
   o.height          = MUiSize_height;
   o.setHeight       = MUiSize_setHeight;
   o.size            = MUiSize_size;
   o.setSize         = MUiSize_setSize;
   o.refreshSize     = MUiSize_refreshSize;
   // @method
   o.setBounds       = MUiSize_setBounds;
   o.refreshBounds   = MUiSize_refreshBounds;
   // @method
   o.dispose         = MUiSize_dispose;
   // @method
   o.innerDump       = MUiSize_innerDump;


   //..........................................................
   // @event
   //o.onSize    = null;
   //..........................................................
   // @method
   //o.calcRect  = MUiSize_calcRect;
   //o.resize    = MUiSize_resize;
   //o.resetSize = MUiSize_resetSize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MUiSize_construct(){
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
function MUiSize_left(){
   return this._location.x;
}

//==========================================================
// <T>设置左距离。</T>
//
// @method
// @param p:width:Number 左距离
//==========================================================
function MUiSize_setLeft(p){
   this.setLocation(p, null);
}

//==========================================================
// <T>获得上距离。</T>
//
// @method
// @return Number 上距离
//==========================================================
function MUiSize_top(){
   return this._location.y;
}

//==========================================================
// <T>设置上距离。</T>
//
// @method
// @param p:height:Number 上距离
//==========================================================
function MUiSize_setTop(p){
   this.setLocation(null, p);
}

//==========================================================
// <T>获得坐标。</T>
//
// @method
// @return SPoint2 坐标
//==========================================================
function MUiSize_location(){
   return this._location;
}

//==========================================================
// <T>设置坐标。</T>
//
// @method
// @param x:Number 左距离
// @param y:Number 上距离
//==========================================================
function MUiSize_setLocation(x, y){
   var o = this;
   var t = o.panel(EPanel.Size);
   // 设置左距离
   if(x != null){
      o._location.x = x;
      if(t){
         t.style.left = (x == 0) ? null : x + 'px';
      }
   }
   // 设置上距离
   if(y != null){
      o._location.y = y;
      if(t){
         t.style.top = (y == 0) ? null : y + 'px';
      }
   }
}

//==========================================================
// <T>刷新坐标。</T>
//
// @method
//==========================================================
function MUiSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MUiSize_construct(){
   var o = this;
   o._location = new SPoint2();
   o._size = new SSize2();
}

//==========================================================
// <T>获得宽度。</T>
//
// @method
// @return Number 宽度
//==========================================================
function MUiSize_width(){
   return this._size.width;
}

//==========================================================
// <T>设置宽度。</T>
//
// @method
// @param p:width:Number 宽度
//==========================================================
function MUiSize_setWidth(p){
   this.setSize(p, null);
}

//==========================================================
// <T>获得高度。</T>
//
// @method
// @return Number 高度
//==========================================================
function MUiSize_height(){
   return this._size.width;
}

//==========================================================
// <T>设置高度。</T>
//
// @method
// @param p:height:Number 高度
//==========================================================
function MUiSize_setHeight(p){
   this.setSize(null, p);
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
function MUiSize_size(){
   return this._size;
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MUiSize_setSize(w, h){
   var o = this;
   var t = o.panel(EPanel.Size);
   // 设置宽度
   if(w != null){
      o._size.width = w;
      if(t){
         if(t.tagName == 'TD'){
            if(w != 0){
               t.width = w;
            }
         }else{
            t.style.width = (w == 0) ? null : w + 'px';
         }
      }
   }
   // 设置高度
   if(h != null){
      o._size.height = h;
      if(t){
         if(t.tagName == 'TD'){
            if(h != 0){
               t.height = h;
            }
         }else{
            t.style.height = (h == 0) ? null : h + 'px';
         }
      }
   }
}

//==========================================================
// <T>刷新尺寸。</T>
//
// @method
//==========================================================
function MUiSize_refreshSize(){
   var o = this;
   o.setSize(o._size.width, o._size.height);
}

//==========================================================
// <T>设置边框。</T>
//
// @method
// @param l:left:Number 左距离
// @param t:top:Number 上距离
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MUiSize_setBounds(l, t, w, h){
   var o = this;
   o.setLocation(l, t);
   o.setSize(w, h);
}

//==========================================================
// <T>刷新边框。</T>
//
// @method
//==========================================================
function MUiSize_refreshBounds(){
   var o = this;
   o.refreshLocation();
   o.refreshSize();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MUiSize_dispose(){
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
// <T>获得内部运行信息。</T>
//
// @method
// @param s:source:TString 内容
// @param l:level:Integer 层级
//==========================================================
function MUiSize_innerDump(s, l){
   var o = this;
   s.append('MUiSize:');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}

















//==========================================================
// <T>改变大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MUiSize_resize(width, height){
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
// <T>重置大小。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MUiSize_resetSize(){
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
function MUiSize_calcRect(){
   this.rect = RRect.nvl(this.rect);
   RHtml.toRect(this.rect, this.hPanel);
   return this.rect;
}

//==========================================================
// <T>设置尺寸。</T>
//
// @method
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function MUiSize_setBounds2(l, t, r, b, force){
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