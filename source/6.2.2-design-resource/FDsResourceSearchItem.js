//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceSearchItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   //..........................................................
   // @event
   o.onBuild = FDsResourceSearchItem_onBuild;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FDsResourceSearchItem_onBuild(p){
   var o = this;
   // 建立控件
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';

   var hForm = o._hForm;
   hForm.style.backgroundImage = 'url("../home/ars/pvw.show.item.009.jpg")';
}
