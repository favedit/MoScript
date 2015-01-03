// ============================================================
// MSearch
// ============================================================
function MSearch(o){
   o = RClass.inherits(this, o);
   // Constant
   o.SearchType      = 'search.type';
   o.SearchOrder     = 'search.order'
   // Attribute
   o.searchType      = null;
   o.searchOrder     = null;
   // Html
   o.hType           = null;
   o.hOrder          = null;
   // Process
   o.oeBuild         = MSearch_oeBuild;
   // Process
   o.onBuildType     = MSearch_onBuildType;
   o.onBuildOrder    = MSearch_onBuildOrder;
   o.onTypeKeyPress  = MSearch_onTypeKeyPress;
   o.onOrderKeyPress = MSearch_onOrderKeyPress;
   // Method
   o.assign          = MSearch_assign;
   o.saveSearch      = MSearch_saveSearch;
   o.clearSearch     = MSearch_clearSearch;
   o.resetSearch     = MSearch_resetSearch;
   o.setEditStyle    = MSearch_setEditStyle;
   return o;
}
// ------------------------------------------------------------
function MSearch_oeBuild(event){
   var o = this;
   // Type
   var h = o.hTypePanel = o.hFormRow.insertCell();
   h.height = 25;
   h.className = RCss.style(FSearchWindow, 'TypePanel');
   o.onBuildType();
   // Order
   h = o.hOrderPanel = o.hFormRow.insertCell();
   h.className = RCss.style(FSearchWindow, 'OrderPanel');
   o.onBuildOrder();
}
// ------------------------------------------------------------
function MSearch_onBuildType(){
   var o = this;
   // Find items
   var items = RNaming.get(TItems, o.SearchType);
   if(!items){
      items = new TItems();
      items.create(ESearch.Equals, RContext.get('MSearch:search.equals'));
      items.create(ESearch.Begin, RContext.get('MSearch:search.begin'));
      items.create(ESearch.End, RContext.get('MSearch:search.end'));
      items.create(ESearch.Like, RContext.get('MSearch:search.like'));
      RNaming.set(items, o.SearchType);
   }
   // Create type select
   var sel = o.searchType = RClass.create(FSelect);
   sel.searchBox = o.searchBox;
   sel.dataValue = 'E';
   sel.labelVisible = false;
   sel.editWidth = 80;
   sel.editRefer = 'search.type'
   sel.items = items;
   sel.onKeyPress = o.onTypeKeyPress;
   sel.psBuild(o.hTypePanel);
   sel.psMode(EMode.Search);
}
// ------------------------------------------------------------
function MSearch_onBuildOrder(){
   var o = this;
   // Find items
   var items = RNaming.get(TItems, o.SearchOrder);
   if(!items){
      items = new TItems();
      items.create(EOrder.None, RContext.get('MSearch:order.none'));
      items.create(EOrder.Asc, RContext.get('MSearch:order.asc'));
      items.create(EOrder.Desc, RContext.get('MSearch:order.desc'));
      RNaming.set(items, o.SearchOrder);
   }
   // Create order select
   var sel = o.searchOrder = RClass.create(FSelect);
   sel.searchBox = o.searchBox;
   sel.dataValue = 'N';
   sel.labelVisible = false;
   sel.editWidth = 40;
   sel.editRefer = 'search.order'
   sel.items = items;
   sel.onKeyPress = o.onOrderKeyPress;
   sel.psBuild(o.hOrderPanel);
   sel.psMode(EMode.Search);
}
// ------------------------------------------------------------
function MSearch_onTypeKeyPress(e){
   var o = this;
   if(e.keyCode == EKey.Enter){
      o.blur();
      o.searchBox.doSearch();
   }
}
// ------------------------------------------------------------
function MSearch_onOrderKeyPress(e){
   var o = this;
   if(e.keyCode == EKey.Enter){
      o.blur();
      o.searchBox.doSearch();
   }
}
// ------------------------------------------------------------
function MSearch_assign(c, t){
   var o = this;
   o.nowrap = false;
   o.width = '100%';
   o.dataValue = null;
   o.labelWidth = 80;
   o.labelPosition = EPosition.Left;
   o.editWidth = 140;
}
// ------------------------------------------------------------
// config
function MSearch_saveSearch(x){
   var o = this;
   var v = o.text();
   var st = o.searchType.get();
   var so = o.searchOrder.get();
   if(v){
      var xs = x.create('Item');
      xs.set('name', o.name);
      xs.set('data_name', o.dataName);
      xs.set('data_value', v);
      xs.set('search_type', st);
      xs.set('search_order', so);
   }
}
// ------------------------------------------------------------
function MSearch_clearSearch(){
   var o = this;
   o.set();
   o.searchType.set();
   o.searchOrder.set();
}
// ------------------------------------------------------------
function MSearch_setEditStyle(style){
   var o = this;
   return;
   o.searchType.setEditStyle(style);
   o.searchOrder.setEditStyle(style);
}
// ------------------------------------------------------------
function MSearch_resetSearch(){
   var o = this;
   o.set();
   o.searchType.set();
   o.searchOrder.set();
}