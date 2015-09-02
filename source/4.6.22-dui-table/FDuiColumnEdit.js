//==========================================================
// <T>表格编辑列。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumnEdit = function FDuiColumnEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl, MO.MUiPropertyEdit);
   //..........................................................
   // @attribute
   o._cellClass     = MO.FDuiCellEdit;



   //o.hasDropArea    = true;
   //..........................................................
   // @event
   //o.onCellMouseEnter = FDuiColumnEdit_onCellMouseEnter;
   //o.onCellMouseLeave = FDuiColumnEdit_onCellMouseLeave;
   //o.onListClick      = FDuiColumnEdit_onListClick;
   //o.onZoomClick      = MO.Class.register(o, new MO.AEventClick('onZoomClick'), FDuiColumnEdit_onZoomClick);
   //o.onZoomHover      = MO.Class.register(o, new MO.AEventMouseEnter('onZoomHover'), FDuiColumnEdit_onZoomHover);
   //o.onZoomLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onZoomLeave'), FDuiColumnEdit_onZoomLeave);

   return o;
}
//==========================================================
MO.FDuiColumnEdit_onCellMouseEnter = function FDuiColumnEdit_onCellMouseEnter(s, e){
   //if(s.hLovImage){
      //s.hLovImage.style.display = 'block';
   //}
}
//==========================================================
MO.FDuiColumnEdit_onCellMouseLeave = function FDuiColumnEdit_onCellMouseLeave(s, e){
   //if(s.hLovImage){
      //s.hLovImage.style.display = 'none';
   //}
}
//==========================================================
MO.FDuiColumnEdit_onListClick = function FDuiColumnEdit_onListClick(s, e){
   var o = this;
   o.table.__focusCell = s;
   var cvs = s.row.saveRow().toAttributes();
   o.doListView(cvs);
}

//==========================================================
MO.FDuiColumnEdit_onZoomHover = function FDuiColumnEdit_onZoomHover(s, e){
   s.hEdit.style.color='black';
}

//==========================================================
MO.FDuiColumnEdit_onZoomLeave = function FDuiColumnEdit_onZoomLeave(s, e){
   s.hEdit.style.color='blue';
}

//==========================================================
MO.FDuiColumnEdit_onZoomClick = function FDuiColumnEdit_onZoomClick(s, e){
   var o = this;
   // 选择行处理
   o.table.clickRow(s.row);
   // 放大处理
   var r = s.row.saveRow();
   var v = r.get(o.zoomField)
   if(!MO.Lang.String.isEmpty(v)){
      o.doZoom(v);
   }
}
