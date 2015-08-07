//==========================================================
// <T>尺寸接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MDuiSize = function MDuiSize(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._location       = MO.Class.register(o, new MO.APtyPoint2('_location'));
   o._size           = MO.Class.register(o, new MO.APtySize2('_size'));
   //..........................................................
   // @method
   o.construct       = MO.MDuiSize_construct;
   // @method
   o.dockCd          = MO.MDuiSize_dockCd;
   o.setDockCd       = MO.MDuiSize_setDockCd;
   o.left            = MO.MDuiSize_left;
   o.setLeft         = MO.MDuiSize_setLeft;
   o.top             = MO.MDuiSize_top;
   o.setTop          = MO.MDuiSize_setTop;
   o.location        = MO.MDuiSize_location;
   o.setLocation     = MO.MDuiSize_setLocation;
   o.refreshLocation = MO.MDuiSize_refreshLocation;
   // @method
   o.width           = MO.MDuiSize_width;
   o.setWidth        = MO.MDuiSize_setWidth;
   o.height          = MO.MDuiSize_height;
   o.setHeight       = MO.MDuiSize_setHeight;
   o.size            = MO.MDuiSize_size;
   o.setSize         = MO.MDuiSize_setSize;
   o.refreshSize     = MO.MDuiSize_refreshSize;
   // @method
   o.setBounds       = MO.MDuiSize_setBounds;
   o.refreshBounds   = MO.MDuiSize_refreshBounds;
   // @method
   o.dispose         = MO.MDuiSize_dispose;
   // @method
   o.innerDump       = MO.MDuiSize_innerDump;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MDuiSize_construct = function MDuiSize_construct(){
   var o = this;
   o._location = new MO.SPoint2();
   o._size = new MO.SUiSize2();
}

//==========================================================
// <T>获得停靠类型。</T>
//
// @method
// @return EUiDock 停靠类型
//==========================================================
MO.MDuiSize_dockCd = function MDuiSize_dockCd(){
   return this._dockCd;
}

//==========================================================
// <T>设置停靠类型。</T>
//
// @method
// @param dockCd:EUiDock 停靠类型
//==========================================================
MO.MDuiSize_setDockCd = function MDuiSize_setDockCd(dockCd){
   this._dockCd = dockCd;
}

//==========================================================
// <T>获得左距离。</T>
//
// @method
// @return Number 左距离
//==========================================================
MO.MDuiSize_left = function MDuiSize_left(){
   return this._location.x;
}

//==========================================================
// <T>设置左距离。</T>
//
// @method
// @param p:width:Number 左距离
//==========================================================
MO.MDuiSize_setLeft = function MDuiSize_setLeft(p){
   this.setLocation(p, null);
}

//==========================================================
// <T>获得上距离。</T>
//
// @method
// @return Number 上距离
//==========================================================
MO.MDuiSize_top = function MDuiSize_top(){
   return this._location.y;
}

//==========================================================
// <T>设置上距离。</T>
//
// @method
// @param p:height:Number 上距离
//==========================================================
MO.MDuiSize_setTop = function MDuiSize_setTop(p){
   this.setLocation(null, p);
}

//==========================================================
// <T>获得坐标。</T>
//
// @method
// @return SPoint2 坐标
//==========================================================
MO.MDuiSize_location = function MDuiSize_location(){
   return this._location;
}

//==========================================================
// <T>设置坐标。</T>
//
// @method
// @param x:Number 左距离
// @param y:Number 上距离
//==========================================================
MO.MDuiSize_setLocation = function MDuiSize_setLocation(x, y){
   var o = this;
   var hPanel = o.panel(MO.EPanel.Size);
   // 设置左距离
   if(x != null){
      o._location.x = x;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.left = (x == 0) ? null : x + 'px';
      }
   }
   // 设置上距离
   if(y != null){
      o._location.y = y;
      if(hPanel && !hPanel.__fragment){
         hPanel.style.top = (y == 0) ? null : y + 'px';
      }
   }
}

//==========================================================
// <T>刷新坐标。</T>
//
// @method
//==========================================================
MO.MDuiSize_refreshLocation = function MDuiSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
}

//==========================================================
// <T>获得宽度。</T>
//
// @method
// @return Number 宽度
//==========================================================
MO.MDuiSize_width = function MDuiSize_width(){
   return this._size.width;
}

//==========================================================
// <T>设置宽度。</T>
//
// @method
// @param p:width:Number 宽度
//==========================================================
MO.MDuiSize_setWidth = function MDuiSize_setWidth(p){
   this.setSize(p, null);
}

//==========================================================
// <T>获得高度。</T>
//
// @method
// @return Number 高度
//==========================================================
MO.MDuiSize_height = function MDuiSize_height(){
   return this._size.width;
}

//==========================================================
// <T>设置高度。</T>
//
// @method
// @param p:height:Number 高度
//==========================================================
MO.MDuiSize_setHeight = function MDuiSize_setHeight(p){
   this.setSize(null, p);
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
MO.MDuiSize_size = function MDuiSize_size(){
   return this._size;
}

//==========================================================
// <T>设置大小。</T>
//
// @method
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.MDuiSize_setSize = function MDuiSize_setSize(width, height){
   var o = this;
   var hPanel = o.panel(MO.EPanel.Size);
   // 设置宽度
   if(width != null){
      o._size.width = width;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(width != 0){
               hPanel.width = width;
            }
         }else{
            if(MO.Lang.String.contains(width, '%')){
               hPanel.style.width = width;
            }else{
               hPanel.style.width = (width == 0) ? null : width + 'px';
            }
         }
      }
   }
   // 设置高度
   if(height != null){
      o._size.height = height;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(height != 0){
               hPanel.height = height;
            }
         }else{
            if(MO.Lang.String.contains(height, '%')){
               hPanel.style.height = height;
            }else{
               hPanel.style.height = (height == 0) ? null : height + 'px';
            }
         }
      }
   }
}

//==========================================================
// <T>刷新尺寸。</T>
//
// @method
//==========================================================
MO.MDuiSize_refreshSize = function MDuiSize_refreshSize(){
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
MO.MDuiSize_setBounds = function MDuiSize_setBounds(l, t, w, h){
   var o = this;
   o.setLocation(l, t);
   o.setSize(w, h);
}

//==========================================================
// <T>刷新边框。</T>
//
// @method
//==========================================================
MO.MDuiSize_refreshBounds = function MDuiSize_refreshBounds(){
   var o = this;
   o.refreshLocation();
   o.refreshSize();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MDuiSize_dispose = function MDuiSize_dispose(){
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
MO.MDuiSize_innerDump = function MDuiSize_innerDump(s, l){
   var o = this;
   s.append('MDuiSize:');
   s.append(o.left, ',', o.top, '-', o.width, ',', o.height, ']');
}
