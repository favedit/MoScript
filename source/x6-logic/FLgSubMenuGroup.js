// ============================================================
// FLgSubMenuGroup
// ============================================================
function FLgSubMenuGroup(o){
   o = RClass.inherits(this, o, FContainer);
   // Property
   o.viewId         = RClass.register(o, new TPtyInt('viewId'));
   o.ouid           = RClass.register(o, new TPtyStr('ouid'));
   o.type           = RClass.register(o, new TPtyStr('type'));
   o.properties     = RClass.register(o, new TPtyStr('properties'));
   /// @style
   o.stButtonNormal = RClass.register(o, new TStyle('ButtonNormal'));
   o.stButtonHover  = RClass.register(o, new TStyle('ButtonHover'));
   o.stButtonSelect = RClass.register(o, new TStyle('ButtonSelect'));
   // Attribute
   o.lsnsClick      = new TListeners();
   // Process Event
   o.oeBuild        = FLgSubMenuGroup_oeBuild;
   // Event
   o.onBuildPanel   = FLgSubMenuGroup_onBuildPanel;
   o.onEnter        = FLgSubMenuGroup_onEnter;
   o.onLeave        = FLgSubMenuGroup_onLeave;
   o.onClick        = FLgSubMenuGroup_onClick;
   return o;
}
// ------------------------------------------------------------
function FLgSubMenuGroup_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   var hp = o.hPanel;
   if(e.isAfter()){
      var cs = o.components;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FLgSubMenuItem)){
            // 注册事件
            c.lsnsClick.register(o, o.onClick);
            // 追加对象
            var hc = hp.insertRow().insertCell();
            c.setPanel(hc);
         }
      }
   }
   return EEventStatus.Continue;
}
// ------------------------------------------------------------
function FLgSubMenuGroup_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.create(null, 'Table');
}
// ------------------------------------------------------------
function FLgSubMenuGroup_onEnter(){
   var o = this;
}
// ------------------------------------------------------------
function FLgSubMenuGroup_onLeave(){
   var o = this;
}
// ------------------------------------------------------------
function FLgSubMenuGroup_onClick(e, s){
   var o = this;
   o.lsnsClick.process(e, RObject.nvl(s, o));
}
// ------------------------------------------------------------
