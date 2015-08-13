//==========================================================
// <T>控件阴影。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.MDuiShadow = function MDuiShadow(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @html
   o._hShadow   = null;
   //..........................................................
   // @method
   o.show       = MO.MDuiShadow_show;
   o.hide       = MO.MDuiShadow_hide;
   o.setVisible = MO.MDuiShadow_setVisible;
   return o;
}

//==========================================================
// <T>显示处理。</T>
//
// @method
//==========================================================
MO.MDuiShadow_show = function MDuiShadow_show(v){
   var o = this;
   if(!o._hShadow){
      o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
   }
   o._hShadow.style.zIndex = MO.RDuiLayer.next();
   if(v == false){
      o.hide();
   }else{
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var s = o._hShadow.style;
         s.pixelLeft = hs.offsetLeft + 2;
         s.pixelTop = hs.offsetTop + 2;
         s.pixelWidth = hs.offsetWidth;
         s.pixelHeight = hs.offsetHeight;
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
MO.MDuiShadow_hide = function MDuiShadow_hide(){
   var o = this;
   if(o._hShadow){
      o._hShadow.style.display = 'none';
   }
}

//==========================================================
// <T>设置显示状态。</T>
//
// @method
// @param p:value:Boolean 可见
//==========================================================
MO.MDuiShadow_setVisible = function MDuiShadow_setVisible(p){
   var o = this;
   if(p){
      if(!o._hShadow){
         o._hShadow = MO.Window.Builder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = MO.RDuiLayer.next();
      var hs = o.panel(MO.EPanel.Shadow);
      if(hs){
         var r = MO.Window.Html.rect(hs);
         var s = o._hShadow.style;
         s.pixelLeft = r.left + 2;
         s.pixelTop = r.top + 2;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
         s.display = 'block';
      }
      var hp = o.panel(MO.EPanel.Panel);
      if(hp){
         hp.style.zIndex = MO.RDuiLayer.next();
      }
   }else{
      if(o._hShadow){
         o._hShadow.style.display = 'none';
      }
   }
}
