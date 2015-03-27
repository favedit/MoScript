//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsProjectSearchItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   //..........................................................
   // @event
   o.onBuild      = FDsProjectSearchItem_onBuild;
   //..........................................................
   // @method
   o.refreshStyle = FDsProjectSearchItem_refreshStyle;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FDsProjectSearchItem_onBuild(p){
   var o = this;
   // 建立控件
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
   //var hForm = o._hForm;
   //hForm.style.backgroundImage = 'url("../home/ars/pvw.show.item.009.jpg")';
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FDsProjectSearchItem_refreshStyle(){
   var o = this;
   // 建立控件
   var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
