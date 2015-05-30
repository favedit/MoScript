with(MO){
   //==========================================================
   // <T>控件阴影。</T>
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.MUiShadow = function MUiShadow(o){
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

   //==========================================================
   // <T>显示处理。</T>
   //
   // @method
   //==========================================================
   MO.MUiShadow_show = function MUiShadow_show(v){
      var o = this;
      if(!o._hShadow){
         o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
      }
      o._hShadow.style.zIndex = RUiLayer.next();
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
            hp.style.zIndex = RUiLayer.next();
         }
      }
   }

   //==========================================================
   // <T>隐藏处理。</T>
   //
   // @method
   //==========================================================
   MO.MUiShadow_hide = function MUiShadow_hide(){
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
   MO.MUiShadow_setVisible = function MUiShadow_setVisible(p){
      var o = this;
      if(p){
         if(!o._hShadow){
            o._hShadow = RBuilder.createDiv(o._hPanel, 'RWindow_Shadow');
         }
         o._hShadow.style.zIndex = RUiLayer.next();
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
            hp.style.zIndex = RUiLayer.next();
         }
      }else{
         if(o._hShadow){
            o._hShadow.style.display = 'none';
         }
      }
   }
}
