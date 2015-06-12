MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   o._hPanel     = null;
   return o;
}
MO.Eai.setup = function Eai_setup(hPanel){
   var o = this;
   o._hPanel = hPanel;
   var application = o.Application = MO.RClass.create(MO.FEaiApplication);
   var canvas = o.Canvas = MO.RClass.create(MO.FEaiCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   o.Application.setup();
}
