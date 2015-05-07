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
   o._dockCd         = RClass.register(o, new APtyString('_dockCd'));
   o._location       = RClass.register(o, new APtyPoint2('_location'));
   o._size           = RClass.register(o, new APtySize2('_size'));
   //..........................................................
   // @method
   o.construct       = MUiSize_construct;
   // @method
   o.dockCd          = MUiSize_dockCd;
   o.setDockCd       = MUiSize_setDockCd;
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
   o._size = new SUiSize2();
}

//==========================================================
// <T>获得停靠类型。</T>
//
// @method
// @return EUiDock 停靠类型
//==========================================================
function MUiSize_dockCd(){
   return this._dockCd;
}

//==========================================================
// <T>设置停靠类型。</T>
//
// @method
// @param dockCd:EUiDock 停靠类型
//==========================================================
function MUiSize_setDockCd(dockCd){
   this._dockCd = dockCd;
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
   var hPanel = o.panel(EPanel.Size);
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
function MUiSize_refreshLocation(){
   var o = this;
   o.setLocation(o._location.x, o._location.y);
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
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
function MUiSize_setSize(width, height){
   var o = this;
   var hPanel = o.panel(EPanel.Size);
   // 设置宽度
   if(width != null){
      o._size.width = width;
      if(hPanel && !hPanel.__fragment){
         if(hPanel.tagName == 'TD'){
            if(width != 0){
               hPanel.width = width;
            }
         }else{
            if(RString.contains(width, '%')){
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
            if(RString.contains(height, '%')){
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
