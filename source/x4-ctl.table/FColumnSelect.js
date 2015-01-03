//==========================================================
// FColumnNumber
//==========================================================
function FColumnSelect(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescSelect);
   // @attribute
   o.__cellClass         = FCellSelect;
   o.hasDropArea         = true;
   o.items               = new TItems();
   o.lsnCellEditEnd      = null;
   o.lsnSearchEditEnd    = null;
   /// @event
   o.onBuildSearchEdit   = FColumnSelect_onBuildSearchEdit;
   o.onBuildSearchDrop   = FColumnSelect_onBuildSearchDrop;
   o.onSearchEnter       = FColumnSelect_onSearchEnter;
   o.onSearchLeave       = FColumnSelect_onSearchLeave;
   o.onSearchKeyDown     = FColumnSelect_onSearchKeyDown;
   o.onSearchDblClick    = RClass.register(o, new HDoubleClick('onSearchDblClick'), FColumnSelect_onSearchDblClick);
   o.onSearchDropClick   = RClass.register(o, new HMouseDown('onSearchDropClick'), FColumnSelect_onSearchDropClick);
   o.onCellDropClick     = RClass.register(o, new HMouseDown('onCellDropClick'), FColumnSelect_onCellDropClick);
   o.onCellDoubleClick   = FColumnSelect_onCellDoubleClick;
   o.onCellEditEnd       = FColumnSelect_onCellEditEnd;
   o.onSearchEditEnd     = FColumnSelect_onSearchEditEnd;
   /// @method
   o.construct           = FColumnSelect_construct;
   o.loadConfig          = FColumnSelect_loadConfig;
   o.formatValue         = FColumnSelect_formatValue;
   o.formatText          = FColumnSelect_formatText;
   o.searchValue         = FColumnSelect_searchValue;
   o.set                 = FColumnSelect_setSearchValue;
   o.searchDrop          = FColumnSelect_searchDrop;
   return o;
}

//==========================================================
function FColumnSelect_onCellEditEnd(e){
   var o = this;
   var c = e.source;
   c.set(e.get());
   c.focus();
}

//==========================================================
function FColumnSelect_onSearchEditEnd(e){
   var o = this;
   o.hSearchEdit.value = o.items.label(e.get());
}

// =========================================================
// <T>构建对象。</T>
//
// @method
// =========================================================
function FColumnSelect_construct(){
   var o = this;
   o.base.FColumnEditControl.construct.call(o);
   o.lsnCellEditEnd = new TListener(o, o.onCellEditEnd);
   o.lsnSearchEditEnd = new TListener(o, o.onSearchEditEnd);
}

//==========================================================
function FColumnSelect_onBuildSearchEdit(){
   var o = this;
   o.base.FColumnEditControl.onBuildSearchEdit.call(o);
   var he = o.hSearchEdit;
   o.attachEvent('onSearchKeyDown', he);
   o.attachEvent('onSearchDblClick', he);
}

//==========================================================
function FColumnSelect_onBuildSearchDrop(){
   var o = this;
   var hdp = o.hSearchDropPanel = o.hSearchFormLine.insertCell();
   hdp.width = 1;
   var hd = o.hSearchDrop = RBuilder.appendIcon(hdp, o.styleIcon('SearchDrop', FColumn));
   o.attachEvent('onSearchDropClick', hd);
}

//==========================================================
function FColumnSelect_onSearchEnter(){
   var o = this;
   o.hSearchDrop.src = o.styleIconPath('SearchDropHover', FColumn);
}

//==========================================================
function FColumnSelect_onSearchLeave(){
   var o = this;
   o.hSearchDrop.src = o.styleIconPath('SearchDrop', FColumn);
}

//==========================================================
function FColumnSelect_onSearchKeyDown(e){
   var o = this;
   if(EKey.Down == e.keyCode){
      o.searchDrop();
   }
}

//==========================================================
function FColumnSelect_onSearchDblClick(){
   var o = this;
   o.searchDrop();
}

//==========================================================
function FColumnSelect_onSearchDropClick(e){
   var o = this;
   o.searchDrop();
}

//==========================================================
function FColumnSelect_onCellDropClick(s, e){
   var o = this;
   if(!o.disabled){
      o.onCellMouseDown(s, e);
      s.drop();
    }
}

//==========================================================
function FColumnSelect_onCellDoubleClick(s, e){
   var o = this;
   if(o.isEditAble(s)){
      return o.onCellDropClick(s, e);
   }
   return o.base.FColumnEditControl.onCellDoubleClick.call(o, s, e);
}

//==========================================================
function FColumnSelect_loadConfig(c){
   var o = this;
   o.base.FColumnEditControl.loadConfig.call(o, c);
   // Load items
   if(o.dataEmpty){
      o.items.create();
   }
   o.items.loadConfig(c);
   return EStatus.Stop;
}

//==========================================================
function FColumnSelect_formatValue(t){
   var o = this;
   if(RBool.isTrue(o.editCheck)){
      var v = this.items.value(t);
      if(v){
         return v;
      }else{
         return RString.nvl(t);
      }
   }
   return this.items.value(t);
}

//==========================================================
function FColumnSelect_formatText(v){
   var o = this;
   if(RBool.isTrue(o.editCheck) && RString.isEmpty(o.items.label(v))){
      return v;
   }
   return o.items.label(v);
}

//==========================================================
function FColumnSelect_searchValue(){
   var o = this;
   if(o.hSearchEdit){
      var s = o.hSearchEdit.value;
      return RString.nvl(o.items.value(s));
   }
}

//==========================================================
function FColumnSelect_setSearchValue(s){
   var o = this;
   o.hSearchEdit.value = s;
}

//==========================================================
function FColumnSelect_searchDrop(){
   var o = this;
   if(o.items){
      var e = RConsole.find(FEditConsole).focus(o, FSelectEditor, o.name);
      e.lsnEditEnd = o.lsnSearchEditEnd;
      e.setItems(o.items);
      e.set(o.hSearchEdit.value);
      e.show();
   }
}
