// ============================================================
// FPageTab
// ============================================================
function FPageTab(o){
   o = RClass.inherits(this, o, FControl);
   // Property
   o.page         = RClass.register(o, new TPtyStr('page', null));
   o.icon         = RClass.register(o, new TPtyStr('icon', null));
   o.action       = RClass.register(o, new TPtyStr('action', null));
   /// @style
   o.stPanel      = RClass.register(o, new TStyle('LabelPanel'));
   o.stButtonIcon = RClass.register(o, new TStyleIcon('Button'));
   // Attribute
   o.pageBar      = null;
   o.index        = null;
   o.selected     = false;
   o.hasBuilded   = false;
   o.lsnsSelect   = new TListeners();
   // Html
   o.hTopL        = null;
   o.hTop         = null;
   o.hTopR        = null;
   o.hLeft        = null;
   o.hButton      = null;
   o.hIcon        = null;
   o.hText        = null;
   o.hBottomL     = null;
   o.hBottom      = null;
   o.hBottomR     = null;
   o.hRight       = null;
   // Process
   o.oeBuild      = FPageTab_oeBuild;
   // Event
   o.onBuildPanel = FPageTab_onBuildPanel;
   o.onEnter      = FPageTab_onEnter;
   o.onLeave      = FPageTab_onLeave;
   o.onMouseDown  = FPageTab_onMouseDown;
   // Method
   o.select       = FPageTab_select;
   o.dump         = FPageTab_dump;
   // Event
   return o;
}
// ------------------------------------------------------------
function FPageTab_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var b = o.border = RBorder.create(EBorder.Round, o.hPanel);
   var hb = b.hPanel;
   o.hPanel.width = '90'
   hb.align = 'center';
   hb.className = o.style('LabelPanel');
   hb.background = o.styleIconPath('Button');
   o.hPanel.appendChild(b.hForm);
   var label = o.label;
   if(o.icon){
      o.hIcon = RBuilder.appendIcon(hb, o.icon);
      label = ' ' + o.label;
   }
   RBuilder.appendText(hb, label);
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FPageTab_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
// ------------------------------------------------------------
function FPageTab_onEnter(){
   if(!this.selected){
      //this.hButton.className = this.style('Hover');
   }
}
// ------------------------------------------------------------
function FPageTab_onLeave(){
   if(!this.selected){
      //this.hButton.className = this.style('Button');
   }
}
// ------------------------------------------------------------
function FPageTab_onMouseDown(){
   var o = this;
   if(o.action){
      eval(o.action);
   }
}
// ------------------------------------------------------------
function FPageTab_select(flag){
   var o = this;
   var b = o.pageBar;
   if(flag && !o.hasBuilded){
      //o.buildChildren();
      //o.hasBuilded = true;
   }
   var first = (o.index == 0);
   var prior = (b.selected.index-1 == o.index);
   // Select
   if(o.selected != flag){
      if(flag){
         o.lsnsSelect.process();
      }
      o.selected = flag;
   }
   // Style
   //o.hButton.className = flag ? o.style('Select') : o.style('Button');
   //o.hTop.className = flag ? b.style('TopSel') : b.style('Top');
   //o.hLeft.className = flag ? b.style('LeftSel') : (first ? b.style('Right') : b.style('Left'));
   //o.hBottomL.className = flag ? b.style('BottomSel') : b.style('Bottom');
   //o.hBottom.className = flag ? b.style('BottomSel') : b.style('Bottom');
   //o.hBottomR.className = flag ? b.style('BottomSel') : b.style('Bottom');
   //o.hRight.className = flag ? b.style('RightSel') : (prior ? b.style('RightP') : b.style('Right'));
   // Sheet
   //o.hSheet.style.display = flag ? 'block' : 'none';
}
// ------------------------------------------------------------
function FPageTab_dump(dump, space){
   dump = RString.nvlStr(dump);
   dump.append(space, RClass.name(this), ' [');
   dump.append('name=', this.name, ', ');
   dump.append('icon=', this.icon, ', ');
   dump.append('label=', this.label, ', ');
   dump.append('action=', this.action, ']');
   return dump;
}
// ------------------------------------------------------------
