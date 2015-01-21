//==========================================================
// FColumnEdit
//==========================================================
function FColumnEdit(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescEdit);
   //..........................................................
   // @attribute
   o.__cellClass    = FCellEdit;
   o.hasDropArea    = true;
   //..........................................................
   // @event
   o.onCellMouseEnter = FColumnEdit_onCellMouseEnter;
   o.onCellMouseLeave = FColumnEdit_onCellMouseLeave;
   o.onListClick      = FColumnEdit_onListClick;
   o.onZoomClick      = RClass.register(o, new HClick('onZoomClick'), FColumnEdit_onZoomClick);
   o.onZoomHover      = RClass.register(o, new HMouseEnter('onZoomHover'), FColumnEdit_onZoomHover);
   o.onZoomLeave      = RClass.register(o, new HMouseLeave('onZoomLeave'), FColumnEdit_onZoomLeave);

   return o;
}
//==========================================================
function FColumnEdit_onCellMouseEnter(s, e){
   if(s.hLovImage){
      //s.hLovImage.style.display = 'block';
   }
}
//==========================================================
function FColumnEdit_onCellMouseLeave(s, e){
   if(s.hLovImage){
      //s.hLovImage.style.display = 'none';
   }
}
//==========================================================
function FColumnEdit_onListClick(s, e){
   var o = this;
   o.table.__focusCell = s;
   var cvs = s.row.saveRow().toAttributes();
   o.doListView(cvs);
}

//==========================================================
function FColumnEdit_onZoomHover(s, e){
   s.hEdit.style.color='black';
}

//==========================================================
function FColumnEdit_onZoomLeave(s, e){
   s.hEdit.style.color='blue';
}

//==========================================================
function FColumnEdit_onZoomClick(s, e){
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
