MO.Graphic2d = new function Graphic2dSpace(){
   return this;
}
MO.Graphic2d.FG2dContext = function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
   function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
   }
   function FG2dContext_linkCanvas(h){
      var o = this;
      o._hCanvas = h;
      o._native = h.getContext('2d')
   }
   function FG2dContext_drawLine(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.stroke();
   }
   function FG2dContext_drawRecrangle(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.moveTo(x1, y1);
      c.lineTo(x2, y1);
      c.lineTo(x2, y2);
      c.lineTo(x1, y2);
      c.lineTo(x1, y1);
      c.stroke();
   }
   function FG2dContext_drawText(x, y, t){
      var o = this;
      o._native.fillText(t, x, y);
   }
   function FG2dContext_drawImage(){
   }
   function FG2dContext_fillRecrangle(x1, y1, x2, y2){
      var o = this;
      var c = o._native;
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y1);
      c.lineTo(x2, y2);
      c.lineTo(x1, y2);
      c.lineTo(x1, y1);
      c.closePath();
      c.fill();
   }
   function FG2dContext_dispose(){
      var o = this;
      o._native = null;
      o.__base.FGraphicContext.dispose.call(o);
   }
}
