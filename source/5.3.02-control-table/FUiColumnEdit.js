with(MO){
   //==========================================================
   // <T>表格编辑列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiColumnEdit = function FUiColumnEdit(o){
      o = RClass.inherits(this, o, FUiColumnEditControl, MPropertyEdit);
      //..........................................................
      // @attribute
      o._cellClass     = FCellEdit;




      //o.hasDropArea    = true;
      //..........................................................
      // @event
      //o.onCellMouseEnter = FUiColumnEdit_onCellMouseEnter;
      //o.onCellMouseLeave = FUiColumnEdit_onCellMouseLeave;
      //o.onListClick      = FUiColumnEdit_onListClick;
      //o.onZoomClick      = RClass.register(o, new AEventClick('onZoomClick'), FUiColumnEdit_onZoomClick);
      //o.onZoomHover      = RClass.register(o, new AEventMouseEnter('onZoomHover'), FUiColumnEdit_onZoomHover);
      //o.onZoomLeave      = RClass.register(o, new AEventMouseLeave('onZoomLeave'), FUiColumnEdit_onZoomLeave);

      return o;
   }
   //==========================================================
   MO.FUiColumnEdit_onCellMouseEnter = function FUiColumnEdit_onCellMouseEnter(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'block';
      //}
   }
   //==========================================================
   MO.FUiColumnEdit_onCellMouseLeave = function FUiColumnEdit_onCellMouseLeave(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'none';
      //}
   }
   //==========================================================
   MO.FUiColumnEdit_onListClick = function FUiColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }

   //==========================================================
   MO.FUiColumnEdit_onZoomHover = function FUiColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }

   //==========================================================
   MO.FUiColumnEdit_onZoomLeave = function FUiColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }

   //==========================================================
   MO.FUiColumnEdit_onZoomClick = function FUiColumnEdit_onZoomClick(s, e){
      var o = this;
      // 选择行处理
      o.table.clickRow(s.row);
      // 放大处理
      var r = s.row.saveRow();
      var v = r.get(o.zoomField)
      if(!RString.isEmpty(v)){
         o.doZoom(v);
      }
   }
}
