with(MO){
   //==========================================================
   // <T>场景实体基类。</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiStatisticsTable = function FEaiStatisticsTable(o){
      o = RClass.inherits(this, o, FEaiTable);
      //..........................................................
      // @method
      o.createRow      = FEaiCityEntity_createRow;
      return o;
   }

   //==========================================================
   // <T>创建行。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_createRow = function FEaiCityEntity_createRow(){
      var o = this;
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
}
