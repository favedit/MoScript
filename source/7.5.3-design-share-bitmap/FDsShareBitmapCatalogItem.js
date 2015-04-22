//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsShareBitmapCatalogItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   //..........................................................
   o._styleTypePanel = RClass.register(o, new AStyle('_styleTypePanel'));
   o._styleTypeLabel = RClass.register(o, new AStyle('_styleTypeLabel'));
   //..........................................................
   // @event
   o.onBuild         = FDsShareBitmapCatalogItem_onBuild;
   //..........................................................
   // @method
   o.setTypeLabel    = FDsShareBitmapCatalogItem_setTypeLabel;
   o.refreshStyle    = FDsShareBitmapCatalogItem_refreshStyle;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FDsShareBitmapCatalogItem_onBuild(p){
   var o = this;
   // 建立控件
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   // 建立类型
   o._hLine1.className = o.styleName('TypePanel');
   o._hLine1.vAlign = 'top';
   o._hTypeLabel = RBuilder.appendDiv(o._hLine1, o.styleName('TypeLabel'));
}

//==========================================================
// <T>设置类型标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
function FDsShareBitmapCatalogItem_setTypeLabel(label){
   this._hTypeLabel.innerHTML = label;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FDsShareBitmapCatalogItem_refreshStyle(){
   var o = this;
   // 建立控件
   var url = '/cloud.content2d.bitmap.image.wv?do=preview&guid=' + o._guid + '&update_date=' + o._updateDate;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
