function FDsSpacePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   o._visible      = false;
   o._workspace    = null;
   o._activeSpace  = null;
   o._controlGuid  = null;
   o._controlCode  = null;
   o._controlLabel = null;
   o.onBuilded     = FDsSpacePropertyFrame_onBuilded;
   o.onDataChanged = FDsSpacePropertyFrame_onDataChanged;
   o.construct     = FDsSpacePropertyFrame_construct;
   o.loadObject    = FDsSpacePropertyFrame_loadObject;
   o.dispose       = FDsSpacePropertyFrame_dispose;
   return o;
}
function FDsSpacePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}
function FDsSpacePropertyFrame_onDataChanged(p){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   resource.setLabel(o._controlLabel.get());
}
function FDsSpacePropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}
function FDsSpacePropertyFrame_loadObject(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}
function FDsSpacePropertyFrame_dispose(){
   var o = this;
   o.__base.FUiForm.dispose.call(o);
}
