// ============================================================
// MShadow
// ============================================================
function MShadow(o){
   o = RClass.inherits(this, o);
   // Html
   o.hShadow    = null;
   // Event
   o.show       = MShadow_show;
   o.hide       = MShadow_hide;
   o.setVisible = MShadow_setVisible;
   return o;
}
// ------------------------------------------------------------
// x, y, width, height, flag
function MShadow_show(v){
   var o = this;
   if(!o.hShadow){
      o.hShadow = RBuilder.append(RWindow.hContainer, 'DIV', 'RWindow_Shadow');
   }
   o.hShadow.style.zIndex = RLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var s = o.hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RLayer.next();
      }
   }
}
// ------------------------------------------------------------
function MShadow_hide(){
   var o = this;
   if(o.hShadow){
      o.hShadow.style.display = 'none';
   }
}
// ------------------------------------------------------------
function MShadow_setVisible(v){
   var o = this;
   if(v){
      if(!o.hShadow){
         o.hShadow = RBuilder.append(null, 'DIV', 'RWindow_Shadow');
      }
      o.hShadow.style.zIndex = RLayer.next();
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var r = RHtml.rect(hs);
         var s = o.hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(EPanel.Panel);
      if(hp){
         hp.style.zIndex = RLayer.next();
      }
   }else{
      if(o.hShadow){
         o.hShadow.style.display = 'none';
      }
   }
}
// ------------------------------------------------------------
