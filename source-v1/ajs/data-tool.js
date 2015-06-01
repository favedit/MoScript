function FUiDataToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   return o;
}
function FUiDataToolButton(o){
   o = RClass.inherits(this, o, FUiToolButton);
   o._serviceName     = RClass.register(o, new APtyString('_serviceName'));
   return o;
}
function FUiDataToolButton_click(){
   var o = this;
   RLogger.debug(o, 'Mouse button click. (label={1})' + o._label);
      o.processClickListener(o);
}
function FUiDataToolButton_onShowHint(a){
   var o = this;
   a.status = EActive.Finish;
   if(o.hintBox){
      o.hintBox.show();
   }
}
