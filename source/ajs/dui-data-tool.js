with(MO){
   MO.FUiDataToolBar = function FUiDataToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      return o;
   }
}
with(MO){
   MO.FUiDataToolButton = function FUiDataToolButton(o){
      o = MO.Class.inherits(this, o, FDuiToolButton);
      o._serviceName     = MO.Class.register(o, new MO.APtyString('_serviceName'));
      return o;
   }
   MO.FUiDataToolButton_click = function FUiDataToolButton_click(){
      var o = this;
      MO.Logger.debug(o, 'Mouse button click. (label={1})' + o._label);
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
