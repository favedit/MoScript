with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsResourceListItem = function FDsResourceListItem(o){
      o = MO.Class.inherits(this, o, FDuiListViewItem);
      //..........................................................
      o._styleTypePanel        = MO.Class.register(o, new MO.AStyle('_styleTypePanel'));
      o._styleTypePrivateLabel = MO.Class.register(o, new MO.AStyle('_styleTypePublicLabel'));
      o._styleTypePublicLabel  = MO.Class.register(o, new MO.AStyle('_styleTypePrivateLabel'));
      //..........................................................
      // @event
      o.onBuild         = FDsResourceListItem_onBuild;
      //..........................................................
      // @method
      o.setTypeLabel    = FDsResourceListItem_setTypeLabel;
      o.refreshStyle    = FDsResourceListItem_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDsResourceListItem_onBuild = function FDsResourceListItem_onBuild(p){
      var o = this;
      // 建立控件
      o.__base.FDuiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '200px';
      h.style.height = '150px';
      // 建立类型
      o._hLine1.className = o.styleName('TypePanel');
      o._hLine1.vAlign = 'top';
      o._hTypeLabel = MO.Window.Builder.appendDiv(o._hLine1, o.styleName('TypePrivateLabel'));
   }

   //==========================================================
   // <T>设置类型标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsResourceListItem_setTypeLabel = function FDsResourceListItem_setTypeLabel(label){
      this._hTypeLabel.innerHTML = label;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDsResourceListItem_refreshStyle = function FDsResourceListItem_refreshStyle(){
      var o = this;
      // 设置样式
      if(o._shareCd == 'Public'){
         o._hTypeLabel.className = o.styleName('TypePublicLabel');
      }else{
         o._hTypeLabel.className = o.styleName('TypePrivateLabel');
      }
      // 建立控件
      var url = '/cloud.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid + '&update_date=' + o._updateDate;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
