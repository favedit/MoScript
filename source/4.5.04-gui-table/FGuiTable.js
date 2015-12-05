//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiTable = function FGuiTable(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridControl);
   //..........................................................
   // @attribute
   //..........................................................
   // @process
   o.oeUpdate        = MO.FGuiTable_oeUpdate;
   //..........................................................
   // @method
   o.construct       = MO.FGuiTable_construct;
   // @method
   o.insertRow       = MO.FGuiTable_insertRow;
   o.loadDataset     = MO.FGuiTable_loadDataset;
   // @method
   o.dispose         = MO.FGuiTable_dispose;
   return o;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FGuiTable_oeUpdate = function FGuiTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiGridControl.oeUpdate.call(o, event);
   var rows = o._rows;
   // 计算卷动
   if(event.isBefore()){
      // 是否要刷新
      if(o._rowScroll < 0){
         // 计算速度
         var scrollSpeed = Math.max(parseInt(-o._rowScroll / o._rowHeight), o._rowScrollSpeed);
         o._rowScroll += scrollSpeed;
         // 删除多余的数据
         if(o._rowScroll >= 0){
            o._rowScroll = 0;
         }
         o.dirty();
      }
      //如果表格内的行数大于最大行数,则删除表格内多余的行
      var limitCount = o._rowLimitCount;
      if (limitCount != 0) {
         if (rows.count() > limitCount) {
            var row = rows.pop();
            o.freeRow(row);
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiTable_construct = function FGuiTable_construct(){
   var o = this;
   o.__base.FGuiGridControl.construct.call(o);
   o.__base.MUiGridControl.construct.call(o);
   // 设置变量
   o._rowClass = MO.FGuiGridRow;
}

//==========================================================
// <T>从开头插入一个数据行。</T>
//
// @method
// @param row:FGuiGridRow 行对象
//==========================================================
MO.FGuiTable_insertRow = function FGuiTable_insertRow(row){
   var o = this;
   MO.Assert.debugNotNull(row);
   o._rows.unshift(row);
   o._rowScroll -= o._rowHeight;
   o.dirty();
}

//==========================================================
// <T>加载数据集。</T>
//
// @method
// @param dataset:FDataset 数据集
//==========================================================
MO.FGuiTable_loadDataset = function FGuiTable_loadDataset(dataset){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiTable_dispose = function FGuiTable_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridControl.dispose.call(o);
   o.__base.FGuiGridControl.dispose.call(o);
}
