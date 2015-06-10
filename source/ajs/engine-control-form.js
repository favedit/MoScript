with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
with(MO){
   MO.FGuiPanel = function FGuiPanel(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
with(MO){
   MO.FGuiPicture = function FGuiPicture(o){
      o = RClass.inherits(this, o, FGuiControl);
      o._source = RClass.register(o, [new APtyString('_source'), new AGetSet('_source')]);
      return o;
   }
}
