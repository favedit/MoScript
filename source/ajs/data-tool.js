with(MO){
   MO.FUiDataToolBar = function FUiDataToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      return o;
   }
}
with(MO){
   MO.FUiDataToolButton = function FUiDataToolButton(o){
      o = RClass.inherits(this, o, FUiToolButton);
      o._serviceName     = RClass.register(o, new APtyString('_serviceName'));
      return o;
   }
   MO.FUiDataToolButton_click = function FUiDataToolButton_click(){
      var o = this;
         o.processClickListener(o);
   }
   MO.FUiDataToolButton_onShowHint = function FUiDataToolButton_onShowHint(a){
      var o = this;
      a.status = EActive.Finish;
      if(o.hintBox){
         o.hintBox.show();
      }
   }
}
