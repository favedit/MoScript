with(MO){
   //==========================================================
   // <T>表格编辑列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FColumnEdit = function FColumnEdit(o){
      o = RClass.inherits(this, o, FColumnEditControl, MPropertyEdit);
      //..........................................................
      // @attribute
      o._cellClass     = FCellEdit;




      //o.hasDropArea    = true;
      //..........................................................
      // @event
      //o.onCellMouseEnter = FColumnEdit_onCellMouseEnter;
      //o.onCellMouseLeave = FColumnEdit_onCellMouseLeave;
      //o.onListClick      = FColumnEdit_onListClick;
      //o.onZoomClick      = RClass.register(o, new AEventClick('onZoomClick'), FColumnEdit_onZoomClick);
      //o.onZoomHover      = RClass.register(o, new AEventMouseEnter('onZoomHover'), FColumnEdit_onZoomHover);
      //o.onZoomLeave      = RClass.register(o, new AEventMouseLeave('onZoomLeave'), FColumnEdit_onZoomLeave);

      return o;
   }
   //==========================================================
   MO.FColumnEdit_onCellMouseEnter = function FColumnEdit_onCellMouseEnter(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'block';
      //}
   }
   //==========================================================
   MO.FColumnEdit_onCellMouseLeave = function FColumnEdit_onCellMouseLeave(s, e){
      //if(s.hLovImage){
         //s.hLovImage.style.display = 'none';
      //}
   }
   //==========================================================
   MO.FColumnEdit_onListClick = function FColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }

   //==========================================================
   MO.FColumnEdit_onZoomHover = function FColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }

   //==========================================================
   MO.FColumnEdit_onZoomLeave = function FColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }

   //==========================================================
   MO.FColumnEdit_onZoomClick = function FColumnEdit_onZoomClick(s, e){
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
