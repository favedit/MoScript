MO.EEaiChapter = new function EEaiChapter(){
   var o = this;
   o.Loading = 'loading';
   o.Login   = 'login';
   o.Scene   = 'scene';
   o.Chart   = 'chart';
   return o;
}
MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   o.Resource    = "eai.resource";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line       = 0;
   o.Map        = 1;
   o.Investment = 2;
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartTotal      = 'chart.total';
   o.ChartHistory    = 'chart.history';
   o.ChartLive       = 'chart.live';
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   return o;
}
with(MO){
   MO.FEaiTable = function FEaiTable(o){
      o = RClass.inherits(this, o, FObject);
      o._headLineCount = 0;
      o._hTable        = null
      o.createRow      = FEaiTable_createRow;
      o.setDataCount   = FEaiTable_setDataCount;
      o.dataRow        = FEaiTable_dataRow;
      return o;
   }
   MO.FEaiTable_createRow = function FEaiTable_createRow(){
      var o = this;
   }
   MO.FEaiTable_setDataCount = function FEaiTable_setDataCount(count){
      var o = this;
      var headLineCount = o._headLineCount;
      var total = headLineCount + count;
      var rowCount = o._hTable.rows.length;
      for(var i = rowCount; i < total; i++){
         o.createRow();
      }
      var rowCount = o._hTable.rows.length;
      for(var i = headLineCount; i < rowCount; i++){
         var hRow = o._hTable.rows[i];
         hRow.style.display = (i - headLineCount < count) ? null : 'none';
      }
   }
   MO.FEaiTable_dataRow = function FEaiTable_dataRow(index){
      var o = this;
      var rowIndex = o._headLineCount + index;
      return o._hTable.rows[rowIndex];
  }
}
