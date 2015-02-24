//==========================================================
// <T>控件阴影。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function MUiShadow(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @html
   o._hShadow   = null;
   //..........................................................
   // @method
   o.show       = MUiShadow_show;
   o.hide       = MUiShadow_hide;
   o.setVisible = MUiShadow_setVisible;
   return o;
}
// ------------------------------------------------------------
// x, y, width, height, flag
function MUiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.append(RWindow.hContainer, 'DIV', 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = RLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
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
function MUiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}
// ------------------------------------------------------------
function MUiShadow_setVisible(v){
   var o = this;
   if(v){
      if(!o._hShadow){
         o._hShadow = RBuilder.append(null, 'DIV', 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RLayer.next();
      var hs = o.panel(EPanel.Shadow);
      if(hs){
         var r = RHtml.rect(hs);
         var s = o._hShadow.style;
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
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
// ------------------------------------------------------------
