with(MO){
   //==========================================================
   // <T>场景实体基类。</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiTable = function FEaiTable(o){
      o = RClass.inherits(this, o, FObject);
      o._headLineCount = 0;
      o._hTable        = null
      //..........................................................
      // @method
      o.setDataCount   = FEaiCityEntity_setDataCount;
      o.dataRow        = FEaiCityEntity_dataRow;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_setDataCount = function FEaiCityEntity_setDataCount(count){
      var o = this;
      var headLineCount = o._headLineCount;
      var total = headLineCount + count;
      // 创建行集合
      var rowCount = o._hTable.rows.length;
      for(var i = rowCount; i < total; i++){
         // 创建行
         var hRow = RBuilder.appendTableRow(o._hTable);
         hRow.className = 'Investment_DataGrid_Row';
         // 创建格子
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'center';
         var hCell = RBuilder.appendTableCell(hRow);
         hCell.className = 'Investment_DataGrid_Cell';
         hCell.align = 'right';
      }
      // 设置行可见性
      var rowCount = o._hTable.rows.length;
      for(var i = headLineCount; i < rowCount; i++){
         var hRow = o._hTable.rows[i];
         hRow.style.display = (i - headLineCount < count) ? null : 'none';
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_dataRow = function FEaiCityEntity_dataRow(index){
      var o = this;
      var rowIndex = o._headLineCount + index;
      return o._hTable.rows[rowIndex];
  }
}