with(MO){
   //==========================================================
   // <T>表格状态单元格。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiCellStatus = function FUiCellStatus(o){
      o = RClass.inherits(this, o, FCell);
      //..........................................................
      // @property
      o._dataName = '_status';
      //..........................................................
      // @html
      o._hStatus  = null;
      //..........................................................
      // @event
      o.onBuild   = FUiCellStatus_onBuild;


      //..........................................................
      // @event
      //o.onStatusEnter = RClass.register(o, new HMouseEnter('onStatusEnter'), FUiCellStatus_onStatusEnter);
      //..........................................................
      // @method
      //o.isDataChanged = RMethod.emptyFalse;
      //o.get           = RMethod.empty;
      //o.reget         = RMethod.empty;
      //o.set           = RMethod.empty;
      //o.setIcon       = FUiCellStatus_setIcon;
      //o.refreshStyle  = FUiCellStatus_refreshStyle;
      //o.dispose       = FUiCellStatus_dispose;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiCellStatus_onBuild = function FUiCellStatus_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      // 创建底板
      var c = o._column;
      var h = o._hPanel;
      h.align = 'center';
      h.style.paddingTop = 2;
      h.style.paddingBottom = 2;
      h.style.cursor = 'normal';
      //c.linkEvent(o, 'onCellClick', hp, c.onCellClick);
      // 创建状态图标
      //o._hStatus = RBuilder.appendIcon(hp, o.column.styleIcon(c.table.isFormLinked() ? 'Normal' : 'Normal'));
      o._hStatus = RBuilder.appendIcon(h, null, 'n');
      //if(c.table.dispRowbar){
         //o.attachEvent('onStatusEnter', o._hStatus);
      //}
   }






   //==========================================================
   // <T>锟斤拷锟斤拷锟斤拷锟斤拷锟诫单元锟斤拷锟铰硷拷锟斤拷</T>
   //
   // @method
   //==========================================================
   MO.FUiCellStatus_onStatusEnter = function FUiCellStatus_onStatusEnter(){
      this.row.table.getRowBar().linkCell(this);
   }

   //==========================================================
   // <T>锟斤拷锟斤拷图锟疥。</T>
   //
   // @method
   // @param s:statusIcon:String 图锟斤拷
   //==========================================================
   MO.FUiCellStatus_setIcon = function FUiCellStatus_setIcon(s){
      this._hStatus.src = s;
   }

   //==========================================================
   // <T>刷锟铰碉拷元锟斤拷锟斤拷式锟斤拷</T>
   //
   // @method
   //==========================================================
   MO.FUiCellStatus_refreshStyle = function FUiCellStatus_refreshStyle(){
      var o = this;
      var r = o.row;
      var t = r.table;
      var p = null;
      if(r.isDataChanged()){
         p = 'Changed';
      }else{
         p = t.isFormLinked() ? 'Normal' : 'Normal';
      }
      o.setIcon(o.column.styleIconPath(p));
   }

   //==========================================================
   // <T>锟酵放碉拷元锟斤拷锟节碉拷锟斤拷锟叫讹拷锟斤拷</T>
   //
   // @method
   //==========================================================
   MO.FUiCellStatus_dispose = function FUiCellStatus_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hStatus = null;
   }
}
