// ============================================================
// FHoverEditor
// ============================================================
function FHoverEditor(o){
   o = RClass.inherits(this, o, FEditor, MEvent, MEventHover, MEventFocus);
   // Attribute
   o.storedText    = null;
   o.attributes    = new TMap();
   o.editable      = null;
   o.editConsole   = null;
   o.changed       = false;
   o.rect          = new TRect();
   // Html
   o.hParent       = null;
   // Process Event
   o.oeBuild       = FHoverEditor_oeBuild;
   // Event
   o.onEnter       = FHoverEditor_onEnter;
   //o.onMouseOut    = FHoverEditor_onLeave;
   o.onLeave       = FHoverEditor_onLeave;
   o.onFocus       = FHoverEditor_onFocus;
   o.onBlur        = FHoverEditor_onBlur;
   // Method
   o.text          = RMethod.virtual(o, 'text');
   o.setText       = RMethod.virtual(o, 'setText');
   o.canEnter      = FHoverEditor_canEnter;
   o.canEdit       = FHoverEditor_canEdit;
   o.linkPanel     = FHoverEditor_linkPanel;
   o.unlinkPanel   = FHoverEditor_unlinkPanel;
   o.dispose       = FHoverEditor_dispose;
   return o;
}
// ------------------------------------------------------------
function FHoverEditor_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   // Build Edit
   o.onBuildEdit();
   o.hPanel.appendChild(o.hForm);
   // Build
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FHoverEditor_onEnter(){
   RLog.debug(this, 'Enter');
   this.setEditStyle(EStyle.Hover);
}
// ------------------------------------------------------------
function FHoverEditor_onLeave(){
   var o = this;
   RLog.debug(o, 'Leave (hover={1} focus={2})', o.isHover, o.isFocus);
   if(!o.isFocus){
      o.editConsole.leave();
      o.unlinkPanel();
   }
}
// ------------------------------------------------------------
function FHoverEditor_onFocus(){
   var o = this;
   RLog.debug(o, 'Focus');
   o.editConsole.focus(o);
}
// ------------------------------------------------------------
function FHoverEditor_onBlur(){
   var o = this;
   RLog.debug(o, 'Blur');
   o.editConsole.blur(o);
   o.unlinkPanel();
}
// ------------------------------------------------------------
function FHoverEditor_canEnter(){
}
// ------------------------------------------------------------
function FHoverEditor_canEdit(){
}
// ------------------------------------------------------------
function FHoverEditor_linkPanel(hPanel, hObj){
   var o = this;
   if(o.hParent != hPanel){
      o.hParent = hPanel;
      hPanel.appendChild(o.hPanel);
   }
   o.hPanel.style.display = 'block';
}
// ------------------------------------------------------------
function FHoverEditor_unlinkPanel(){
   this.hPanel.style.display = 'none';
}
// ------------------------------------------------------------

function FHoverEditor_dispose(){
   var o = this;
   o.base.FEditor.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hParent);
   o.hParent = null;
   o.hPanel = null;
}
// ------------------------------------------------------------

