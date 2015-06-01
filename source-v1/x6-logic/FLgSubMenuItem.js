// ============================================================
// FLgSubMenuItem
// ============================================================
function FLgSubMenuItem(o){
   o = RClass.inherits(this, o, FControl);
   // Property
   o.page           = RClass.register(o, new TPtyStr('page'));
   o.properties     = RClass.register(o, new TPtyStr('properties'));
   /// @style
   o.stButtonNormal = RClass.register(o, new TStyle('ButtonNormal'));
   o.stButtonHover  = RClass.register(o, new TStyle('ButtonHover'));
   o.stButtonSelect = RClass.register(o, new TStyle('ButtonSelect'));
   // Attribute
   o.lsnsClick      = new TListeners();
   // Process Event
   o.oeBuild        = FLgSubMenuItem_oeBuild;
   // Event
   o.onBuildPanel   = FLgSubMenuItem_onBuildPanel;
   o.onEnter        = FLgSubMenuItem_onEnter;
   o.onLeave        = FLgSubMenuItem_onLeave;
   o.onClick        = FLgSubMenuItem_onClick;
   return o;
}
// ------------------------------------------------------------
function FLgSubMenuItem_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   var hp = o.hPanel;
   // 建立底板
   var hf = o.hForm = RBuilder.appendTable(hp);
   hf.style.border = '1 solid #FFFFFF';
   hf.style.backgroundColor = '#FFFFFF';
   var hr = hf.insertRow();
   // 建立图标
   if(o.icon){
      var hip = o.hIconPanel = hr.insertCell();
      o.hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   // 建立文本内容
   if(o.label){
      var ht = o.hText = hr.insertCell();
      ht.style.padding = '2 12';
      ht.style.cursor = 'hand';
      ht.noWrap = true;
      ht.innerText = o.label;
   }
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FLgSubMenuItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
// ------------------------------------------------------------
function FLgSubMenuItem_onEnter(){
   var o = this;
   var hf = o.hForm;
   hf.style.border = '1 solid #ADDBEF';
   hf.style.backgroundColor = '#F0F7FD';
}
// ------------------------------------------------------------
function FLgSubMenuItem_onLeave(){
   var o = this;
   var hf = o.hForm;
   hf.style.border = '1 solid #FFFFFF';
   hf.style.backgroundColor = '#FFFFFF';
}
// ------------------------------------------------------------
function FLgSubMenuItem_onClick(e){
   var o = this;
   // 纷发事件
   o.lsnsClick.process(e, o);
}
// ------------------------------------------------------------
