with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsProjectSceneListItem = function FDsProjectSceneListItem(o){
      o = MO.Class.inherits(this, o, FDuiListViewItem);
      //..........................................................
      // @event
      o.onBuild      = FDsProjectSceneListItem_onBuild;
      //..........................................................
      // @method
      o.refreshStyle = FDsProjectSceneListItem_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDsProjectSceneListItem_onBuild = function FDsProjectSceneListItem_onBuild(p){
      var o = this;
      // 建立控件
      o.__base.FDuiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '260px';
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
   MO.FDsProjectSceneListItem_refreshStyle = function FDsProjectSceneListItem_refreshStyle(){
      var o = this;
      // 建立控件
      var url = '/cloud.content.scene.wv?do=preview&guid=' + o._guid;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
