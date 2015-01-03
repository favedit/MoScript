// ============================================================
// FLgMenu
// ============================================================
function FLgMenu(o){
   o = RClass.inherits(this, o, FContainer);
   // Property
   o.viewId         = RClass.register(o, new TPtyInt('viewId'));
   o.ouid           = RClass.register(o, new TPtyStr('ouid'));
   o.properties     = RClass.register(o, new TPtyStr('properties'));
   o.isEditable     = RClass.register(o, new TPtyBool('isEditable'), false);
   /// @style
   o.stMenuNormal   = RClass.register(o, new TStyle('MenuNormal'));
   o.stMenuHover    = RClass.register(o, new TStyle('MenuHover'));
   o.stMenuSelect   = RClass.register(o, new TStyle('MenuSelect'));
   // Attribute
   o.isSelected     = false;
   o.menus          = new TMap();
   // Listener
   o.lsnsClick      = new TListeners();
   o.lsnsEnter      = new TListeners();
   o.lsnsLeave      = new TListeners();
   // Html
   o.hLeft          = null;
   o.hRight         = null;
   // Process Event
   o.oeBuild        = FLgMenu_oeBuild;
   // Event
   o.onBuildPanel   = FLgMenu_onBuildPanel;
   o.onEnter        = FLgMenu_onEnter;
   o.onLeave        = FLgMenu_onLeave;
   o.onClick        = FLgMenu_onClick;
   // Method
   o.select         = FLgMenu_select;
   o.selectSubMenu  = FLgMenu_selectSubMenu;
   o.push           = FLgMenu_push;
   o.buildSubMenus  = FLgMenu_buildSubMenus;
   return o;
}
// ------------------------------------------------------------
function FLgMenu_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      // Left border
      o.hLeft.width = 1;
      // Set icon/labe
      var hp = o.hPanel;
      //if(o.isEditable){
	      //hi.style.paddingRight = '2px';
	      hp.className = o.style('MenuNormal');
	      o.hText = RBuilder.appendText(hp, o.label);
	      // Right border
	      o.hRight.width = 1;
      //}else{
	      //hi.style.paddingRight = '2px';
	      //hp.className = o.style('MenuDisable');
	      //hp.style.color = "#CCCCCC";
	      //hp.style.cursor = "normal";
	      //o.hText = RBuilder.appendText(hp, o.label);
	      // Right border
	      //o.hRight.width = 1;
      //}
   }
   return r;
}
// ------------------------------------------------------------
function FLgMenu_onBuildPanel(){
   var o = this;
   o.hLeft = RBuilder.create(null, 'TD');
   o.hPanel = RBuilder.create(null, 'TD');
   o.hRight = RBuilder.create(null, 'TD');
}
// ------------------------------------------------------------
function FLgMenu_onEnter(){
   var o = this;
   //if(!o.isEditable){
	   if(!o.isSelected){
	      o.hPanel.className = o.style('MenuHover');
	   }
   //}
   o.lsnsEnter.process(o);
}
// ------------------------------------------------------------
function FLgMenu_onLeave(){
   var o = this;
  // if(!o.isEditable){
	   if(!o.isSelected){
	      o.hPanel.className = o.style('MenuNormal');
	   }
   //}
   o.lsnsLeave.process(o);
}
// ------------------------------------------------------------
function FLgMenu_onClick(e, s){
   var o = this;
   //if(o.isEditable){
      // 纷发事件
      o.lsnsClick.process(e, RObject.nvl(s, o));
      // 选中菜单
      o.menuBar.select(this);   
   //}
}
// ------------------------------------------------------------
// Selected
function FLgMenu_select(s){
   var o = this;
   var b = o.menuBar;
   o.isSelected = s;
   var mc = b.menus.count;
   // 调整控件的选中和未选中的样式
   o.hPanel.className = o.style(s ? 'MenuSelect' : 'MenuNormal');
   o.hLeft.style.display = (o.index == 0) ? 'none' : 'block';
   o.hRight.style.display = (o.index == mc-1) ? 'block' : 'none';
   if(o.index == 0){
      //o.hLeft.bgColor = '#FFFFFF'
   }
   if(o.index == mc-1){
      //o.hRight.bgColor = '#FFFFFF'
   }
   // 设置子控件是否可见
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         cs.value(n).setVisible(s);
      }
   }
}
// ------------------------------------------------------------
function FLgMenu_selectSubMenu(s){
   var o = this;
   var cs = o.components;
   if(cs){
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         c.select(s == c);
      }
   }
}
// ------------------------------------------------------------
function FLgMenu_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FLgSubMenu)){
      c.menu = o;
      c.index = o.menus.count;
      c.lsnsClick.register(o, o.onClick);
      o.menus.set(c.name, c);
   }
}
// ------------------------------------------------------------
function FLgMenu_buildSubMenus(hSubMenu){
   var o = this;
   var ms = o.menus;
   for(var n=0; n<ms.count; n++){
      var m = ms.value(n);
      hSubMenu.appendChild(m.hPanel);
   }
}
// ------------------------------------------------------------
