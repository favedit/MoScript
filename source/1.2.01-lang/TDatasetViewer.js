//==========================================================
// <T>用来存储页面数据内容的工具类。</T>
// <P>可以同时存储多个数据页的记录，但同时只有一个页被选中，选中页中只有一条记录被选中。</P>
// <P>页的索引和记录的索引都是从0开始计数。</P>
//
// @tool
// @author maocy
// @version 150319
//==========================================================
MO.TDatasetViewer = function TDatasetViewer(){
   var o = this;
   //..........................................................
   // @attribute
   o._datasetId = null;
   // @attribute Integer 索引位置(从0开始计数)
   o._position  = 0;
   o._start     = 0;
   o._count     = 0;
   // @attribute TObjects<TRow> 行记录集合
   e._values   = null;
   // @attribute TObjects<TRow> 行记录集合
   o._rows      = null;
   // @attribute TDictionary<TRow> 行记录字典
   o._ouids     = null;
   //..........................................................
   // @method
   o.isEmpty   = MO.TDatasetViewer_isEmpty;
   o.count     = MO.TDatasetViewer_count;
   o.current   = MO.TDatasetViewer_current;
   o.reset     = MO.TDatasetViewer_reset;
   o.move      = MO.TDatasetViewer_move;
   o.moveToRow = MO.TDatasetViewer_moveToRow;
   o.first     = MO.TDatasetViewer_first;
   o.prior     = MO.TDatasetViewer_prior;
   o.next      = MO.TDatasetViewer_next;
   o.last      = MO.TDatasetViewer_last;
   return o;
}

//===========================================================
// <T>判断当前结果集是否有数据。</T>
//
// @method
// @return Boolean
//    <L value='true'>有</L>
//    <L value='false'>没有</L>
//===========================================================
MO.TDatasetViewer_isEmpty = function TDatasetViewer_isEmpty(){
   return (this._count == null);
}

//===========================================================
// <T>获得当前的数据记录行数。</T>
//
// @method
// @return Integer 数据行数
//===========================================================
MO.TDatasetViewer_count = function TDatasetViewer_count(){
   return this._count;
}

//===========================================================
// <T>获得当前的数据行对象。</T>
//
// @method
// @return TRow 数据行对象
//===========================================================
MO.TDatasetViewer_current = function TDatasetViewer_current(){
   var o = this;
   var s = o._rows;
   return s ? s.get(o._position - o._start) : null;
}

//===========================================================
// <T>重新设置开始位置。</T>
//
// @method
//===========================================================
MO.TDatasetViewer_reset = function TDatasetViewer_reset(){
   this._position = -1;
}

//===========================================================
// <T>移动记录游标到指定的索引位置。</T>
//
// @method
// @param p:position 索引位置
//===========================================================
MO.TDatasetViewer_move = function TDatasetViewer_move(p){
   this._position = p;
}

//===========================================================
// <T>移动记录游标到指定的数据行。</T>
//
// @method
// @param r:row:TRow 数据行
//===========================================================
MO.TDatasetViewer_moveToRow = function TDatasetViewer_moveToRow(r){
   var o = this;
   var p = o._rows.indexOf(r);
   if(p != -1){
      o._position = p - o._start;
   }
}

//===========================================================
// <T>把记录游标移动到第一条记录的位置。</T>
//
// @method
// @param r:reset:Boolean
//    <L value='true'>移动到第一条记录之前</L>
//    <L value='false'>移动到第一条记录上</L>
//===========================================================
MO.TDatasetViewer_first = function TDatasetViewer_first(r){
   this._position = r ? -1 : 0;
}

//===========================================================
// <T>移动记录游标到上一个数据行。</T>
//
// @method
// @return Boolean
//    <L value='true'>成功</L>
//    <L value='false'>失败</L>
//===========================================================
MO.TDatasetViewer_prior = function TDatasetViewer_prior(){
   var o = this;
   if(o._position > 0){
      o._position--;
      return true;
   }
   return false;
}

//===========================================================
// <T>移动记录游标到下一个数据行。</T>
//
// @method
// @return Boolean
//    <L value='true'>成功</L>
//    <L value='false'>失败</L>
//===========================================================
MO.TDatasetViewer_next = function TDatasetViewer_next(){
   var o = this;
   if(o._position < o._count-1){
      o._position++;
      return true;
   }
   return false;
}

//===========================================================
// <T>移动记录游标到最后一个数据行。</T>
//
// @method
//===========================================================
MO.TDatasetViewer_last = function TDatasetViewer_last(){
   this._position = this._count-1;
}
