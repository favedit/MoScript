// ============================================================
// FTemplate
// ============================================================
function FTemplate(o){
   o = RClass.inherits(this, o, FControl, MDisplayAble, MDesign, MHorizontal);
   // Property
   o.icon         = RClass.register(o, new TPtyStr('icon'));
   /// @style
   o.styleTitle   = RClass.register(o, new TStyle('Title'));
   // Attribute
   o.extended     = true;
   // Html
   o.hImage       = null;
   o.hIcon        = null;
   o.hText        = null;
   // Process
   o.oeBuild      = FTemplate_oeBuild;
   // Event
   o.onBuildPanel = FTemplate_onBuildPanel;
   return o;
}
// ------------------------------------------------------------
function FTemplate_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   // Text
   var h = o.hForm.insertRow().insertCell();
   h.className = o.style('Title');
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(h, o.icon);
   }
   o.hText = RBuilder.appendText(h, '&nbsp;' + this.label);
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FTemplate_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.create(null, 'DIV');
   o.hForm = RBuilder.appendTable(this.hPanel);
   o.hForm.width = '100%';
}
// ------------------------------------------------------------
