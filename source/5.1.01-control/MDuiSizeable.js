// ============================================================
// MDuiSizeable
// ============================================================
MO.MDuiSizeable = function MDuiSizeable(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o.isSizeable  = true;
   //..........................................................
   // @event
   o.onSize      = null;
   //..........................................................
   // @method
   o.inSizeRange = MO.Method.virtual(o, 'inSizeRange');
   o.cursor      = MO.MDuiSizeable_cursor;
   o.setCursor   = MO.MDuiSizeable_setCursor;
   o.resize      = MO.MDuiSizeable_resize;
   o.setBounds   = MO.MDuiSizeable_setBounds;
   o.startDrag   = MO.MDuiSizeable_startDrag;
   o.stopDrag    = MO.MDuiSizeable_stopDrag;
   return o;
}
// ------------------------------------------------------------
MO.MDuiSizeable_cursor = function MDuiSizeable_cursor(){
   var o = this;
   var src = MO.Window.source();
   if(!o.inSizeRange(src)){
      return MO.ECursor.Default;
   }
   var hObj = o.panel(MO.EPanel.Border);
   var r = MO.Window.Html.rect(hObj);
   var pos = MO.Window.offsetPos();
   var p = new MO.TPoint(pos.x-r.left, pos.y-r.top);
   while(src){
      p.x += src.offsetLeft + src.clientLeft;
      p.y += src.offsetTop + src.clientTop;
      if(src == hObj){
         break;
      }
      src = src.offsetParent;
   }
   var border = MO.EMoveSize.Border;
   var range = MO.EMoveSize.Range;
   x = p.x;
   y = p.y;
   var right = r.width();
   var bottom = r.height();
   //RLog.debug(o, p.dump() + '- (' + right + ',' + bottom + ') - ' + r.dump() + ' - ' + range);
   // Calculate
   if(x>=0 && x<=range && y>=0 && y<=range){
      return MO.ECursor.NorthWest;
   }else if(x>=0 && x<=range && y>=bottom-range && y<=bottom){
      return MO.ECursor.SouthWest;
   }else if(x>=right-range && x<=right && y>=bottom-range && y<=bottom){
      return MO.ECursor.SouthEast;
   }else if(x>=right-range && x<=right && y>=0 && y<=range){
      return MO.ECursor.NorthEast;
   }else if(x>=0 && x<border && y>range && y<bottom-range){
      return MO.ECursor.West;
   }else if(x>range && x<right-range && y>=bottom-border && y<=bottom){
      return MO.ECursor.South;
   }else if(x>=right-border && x<=right && y>range && y<bottom-range){
      return MO.ECursor.East;
   }else if(x>range && x<right-range && y>=0 && y<border){
      return MO.ECursor.North;
   }
   return ECursor.Default;
}
// ------------------------------------------------------------
MO.MDuiSizeable_setCursor = function MDuiSizeable_setCursor(cursor){
   if(!cursor){
      cursor = this.cursor();
   }
   var h = this.panel(MO.EPanel.Size);
   if(h){
      h.style.cursor = (cursor == null || cursor == 'default') ? 'default' : cursor + '-resize';
   }
}
// ------------------------------------------------------------
MO.MDuiSizeable_resize = function MDuiSizeable_resize(width, height){
   var sizeable = false;
   var hStyle = this.htmlPanel(EPanel.Border).style;
   if(width != null){
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
// ------------------------------------------------------------
MO.MDuiSizeable_setBounds = function MDuiSizeable_setBounds(left, top, right, bottom, force){
   var sizeable = false;
   var st = this.htmlPanel(EPanel.Border).style;
   if(left != null){
      if(right == null || (right != null && right-left > EMoveSize.MinWidth)){
         left = Math.max(left, 0);
      }else{
         left = this.left;
      }
      if(force || this.left != left){
         this.left = left;
         st.pixelLeft = left;
         sizeable = true;
      }
   }
   if(top != null){
      if(bottom == null || (bottom != null && bottom-top > EMoveSize.MinHeight)){
         top = Math.max(top, 0);
      }else{
         top = this.top;
      }
      if(force || this.top != top){
         this.top = top;
         st.pixelTop = top;
         sizeable = true;
      }
   }
   if(right != null){
      var width = Math.max(right-this.left+1, EMoveSize.MinWidth);
      if(force || this.width != width){
         this.width = width;
         st.pixelWidth = this.width;
         sizeable = true;
      }
   }
   if(bottom != null){
      var height = Math.max(bottom-this.top+1, EMoveSize.MinHeight);
      if(force || this.height != height){
         this.height = height;
         st.pixelHeight = this.height;
         sizeable = true;
      }
   }
   if(sizeable && this.onSize){
      this.onSize();
   }
}
// ------------------------------------------------------------
MO.MDuiSizeable_startDrag = function MDuiSizeable_startDrag(){
}
// ------------------------------------------------------------
MO.MDuiSizeable_stopDrag = function MDuiSizeable_stopDrag(){
}
