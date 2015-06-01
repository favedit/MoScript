/**************************************************************
 * 设置控件空余控件的接口类
 *
 * @manger
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MPad(o){
   o = RClass.inherits(this, o);
   // Property
   o.padLeft   = RClass.register(o, new TPtyInt('padLeft', 0));
   o.padTop    = RClass.register(o, new TPtyInt('padTop', 0));
   o.padRight  = RClass.register(o, new TPtyInt('padRight', 0));
   o.padTottom = RClass.register(o, new TPtyInt('padTottom', 0));
   // Method
   o.setPads   = MPad_setPads;
   return o;
}
// ------------------------------------------------------------
function MPad_setPads(l, t, r, b){
   var h = this.hPanel;
   if(!h){
      return;
   }
   var s = h.style;
   if(l){
      s.paddingLeft = l;
   }
   if(t){
      s.paddingTop = t;
   }
   if(r){
      s.paddingRight = r;
   }
   if(b){
      s.paddingBottom = b;
   }
}
// ------------------------------------------------------------
