with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSolutionListItem = function FDsSolutionListItem(o){
      o = RClass.inherits(this, o, FUiListViewItem);
      //..........................................................
      // @event
      o.onBuild      = FDsSolutionListItem_onBuild;
      //..........................................................
      // @method
      o.refreshStyle = FDsSolutionListItem_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDsSolutionListItem_onBuild = function FDsSolutionListItem_onBuild(p){
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
   MO.FDsSolutionListItem_refreshStyle = function FDsSolutionListItem_refreshStyle(){
      var o = this;
      // 建立控件
      var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
