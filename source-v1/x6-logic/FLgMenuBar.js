/**************************************************************
 * 表格列表类，
 * 模板:
 *  hPanel<TABLE>
 * ┌-------------------------------------------------------┐
 * │┌---------------------------------------------------┐│
 * │└---------------------------------------------------┘│
 * └-------------------------------------------------------┘
 *
 * @class FContainer
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FLgMenuBar(o){
   o = RClass.inherits(this, o, FContainer);
   // Html
   o.hTop             = null;
   o.hLine            = null;
   o.hBottom          = null;
   o.hSheets          = null;
   // Attribute
   o.menus            = new TMap();
   o.selected         = null;
   o.lsnsClick        = new TListeners();
   //o.lsnsMenuClick    = new TListeners();
   //o.lsnsSubMenuClick = new TListeners();
   // Process
   o.oeBuild          = FLgMenuBar_oeBuild;
   // Event
   o.onBuildPanel     = FLgMenuBar_onBuildPanel;
   o.onClick          = FLgMenuBar_onClick;
   // Method
   o.findMenu         = FLgMenuBar_findMenu;
   o.select           = FLgMenuBar_select;
   o.selectIndex      = FLgMenuBar_selectIndex;
   o.selectAttribute  = FLgMenuBar_selectAttribute;
   o.menu             = FLgMenuBar_menu;
   o.push             = FLgMenuBar_push;
   o.buildSubMenus    = FLgMenuBar_buildSubMenus;
   return o;
}
// ------------------------------------------------------------
function FLgMenuBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      o.hRows = RBuilder.append(o.hPanel, 'TBODY');
      o.hRow = RBuilder.append(o.hRows, 'TR');
   }else if(e.isAfter()){
      var ms = o.menus;
      for(var n=0; n<ms.count; n++){
         var m = ms.value(n);
         o.hRow.appendChild(m.hLeft);
         o.hRow.appendChild(m.hPanel);
         o.hRow.appendChild(m.hRight);
      }
   }
}
// ------------------------------------------------------------
function FLgMenuBar_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}

// ------------------------------------------------------------
function FLgMenuBar_onClick(e, s){
   this.lsnsClick.process(e, RObject.nvl(s, this));
}

// ------------------------------------------------------------
function FLgMenuBar_findMenu(name, value){
   var ms = this.menus;
   for(var n = 0; n<ms.count; n++){
      var m = ms.value(n); 
      if(m[name] == value){
         return m;
      }
   }
}

// ------------------------------------------------------------
function FLgMenuBar_select(m){
   var o = this;
   o.selected = m;
   for(var n=0; n<this.menus.count; n++){
      var cm = this.menus.value(n);
      cm.select(m == cm);
   }
}
// ------------------------------------------------------------
function FLgMenuBar_selectIndex(n){
   var o = this;
   o.select(o.menus.value(n));
}
// ------------------------------------------------------------
function FLgMenuBar_selectAttribute(name, value){
   var ms = this.menus;
   for(var n = 0; n<ms.count; n++){
     var m = ms.value(n); 
     m.select(m[name] == value);
   }
}
// ------------------------------------------------------------
function FLgMenuBar_menu(name){
   return this.menus.get(name);
}
// ------------------------------------------------------------
function FLgMenuBar_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FLgMenu)){
      c.lsnsClick.register(o, o.onClick);
      c.menuBar = o;
      c.index = o.menus.count;
      o.menus.set(c.name, c);
   }
}
// ------------------------------------------------------------
function FLgMenuBar_buildSubMenus(hSubMenu){
   var o = this;
   var ms = o.menus;
   for(var n=0; n<ms.count; n++){
      ms.value(n).buildSubMenus(hSubMenu);
   }
}
// ------------------------------------------------------------
