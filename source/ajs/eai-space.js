MO.Eai.setup = function Eai_setup(clazz, hPanel){
   var o = this;
   o._hPanel = hPanel;
   var application = o.Application = MO.RClass.create(clazz);
   var canvas = o.Canvas = MO.RClass.create(MO.FEaiCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   application.linkGraphicContext(canvas);
   application.setup();
   return application;
}
