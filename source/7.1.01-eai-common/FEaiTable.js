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
      o.createRow      = FEaiTable_createRow;
      o.setDataCount   = FEaiTable_setDataCount;
      o.dataRow        = FEaiTable_dataRow;
      return o;
   }

   //==========================================================
   // <T>创建行。</T>
   //
   // @method
   //==========================================================
   MO.FEaiTable_createRow = function FEaiTable_createRow(){
      var o = this;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiTable_setDataCount = function FEaiTable_setDataCount(count){
      var o = this;
      var headLineCount = o._headLineCount;
      var total = headLineCount + count;
      // 创建行集合
      var rowCount = o._hTable.rows.length;
      for(var i = rowCount; i < total; i++){
         o.createRow();
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
   MO.FEaiTable_dataRow = function FEaiTable_dataRow(index){
      var o = this;
      var rowIndex = o._headLineCount + index;
      return o._hTable.rows[rowIndex];
  }
}