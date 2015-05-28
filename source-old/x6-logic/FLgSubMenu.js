// ============================================================
// FLgSubMenu
// ============================================================
function FLgSubMenu(o){
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
   o.isSelected     = false;
   o.hasDrop        = false;
   o.lsnsClick      = new TListeners();
   // Process Event
   o.oeBuild        = FLgSubMenu_oeBuild;
   // Event
   o.onBuildPanel   = FLgSubMenu_onBuildPanel;
   o.onEnter        = FLgSubMenu_onEnter;
   o.onLeave        = FLgSubMenu_onLeave;
   o.onClick        = FLgSubMenu_onClick;
   // Method
   o.select         = FLgSubMenu_select;
   o.push           = FLgSubMenu_push;
   return o;
}
// ------------------------------------------------------------
function FLgSubMenu_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isAfter()){
      var hp = o.hPanel;
      hp.style.position = 'relative';
      // 建立内部表格
      var hf = o.hForm = RBuilder.appendTable(hp, o.style('ButtonNormal'));
      var hr = hf.insertRow();
      var hc = hr.insertCell();
      hc.innerText = o.label;
      hc.style.whiteSpace = 'nowrap';
      // 建立下拉菜单
      if(o.hasDrop){
         // 建立下拉菜单的内部底板
         var hfp = o.hFloatPanel = RBuilder.appendDiv(hp);
         hfp.style.position = 'absolute';
         hfp.style.pixeLeft = 0;
         hfp.style.display = 'none';
         hfp.style.border = '1 solid #77AFEE';
         hfp.style.backgroundColor = '#FFFFFF';
         hfp.style.padding = 8;
         // 建立下拉菜单的内部表格
         var hff = o.hFloatForm = RBuilder.appendTable(hfp);
         var hfr = hff.insertRow();
         // 建立菜单内容
         var cs = o.components;
         if(cs){
            var ct = cs.count;
            for(var n = 0; n < ct; n++){
               var c = cs.value(n);
               if(RClass.isClass(c, FLgSubMenuGroup)){
                  // 注册事件
                  c.lsnsClick.register(o, o.onClick);
                  var hc = hfr.insertCell()
                  c.setPanel(hc);
               }
            }
         }
      }
   }
   return r;
}
// ------------------------------------------------------------
function FLgSubMenu_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
// ------------------------------------------------------------
function FLgSubMenu_onEnter(){
   var o = this;
   if(!o.isSelected){
      o.hForm.className = o.style('ButtonHover');
   }
   // 显示下拉菜单
   if(o.hasDrop){
      var hfp = o.hFloatPanel;
      hfp.style.pixelTop = o.hPanel.offsetHeight;
      hfp.style.display = 'block';
   }
}
// ------------------------------------------------------------
function FLgSubMenu_onLeave(){
   var o = this;
   if(!o.isSelected){
      o.hForm.className = o.style('ButtonNormal');
   }
   // 隐藏下拉菜单
   if(o.hasDrop){
      o.hFloatPanel.style.display = 'none';
   }
}
// ------------------------------------------------------------
function FLgSubMenu_onClick(e, s){
   var o = this;
   if(RClass.isClass(s, FLgSubMenu)){
      // 隐藏下拉菜单
      if(o.hasDrop){
         o.hFloatPanel.style.display = 'none';
      }
   }
   o.lsnsClick.process(e, RObject.nvl(s, o));
}
// ------------------------------------------------------------
function FLgSubMenu_select(v){
   var o = this;
   o.isSelected = v;
   o.hPanel.className = v ? o.style('ButtonSelect') : o.style('ButtonNormal');
}
// ------------------------------------------------------------
function FLgSubMenu_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FLgSubMenuGroup)){
      o.hasDrop = true;
   }
}
