/***********************************************************
 * <T>用来存储页面数据内容的工具类。</T>
 * <P>可以同时存储多个数据页的记录，但同时只有一个页被选中，选中页中只有一条记录被选中。</P>
 * <P>页的索引和记录的索引都是从0开始计数。</P>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TTempDataViewer(){
   var o = this;
   //----------------------------------------------------------
   o.datasetId    = null;
   /// @attribute Integer 索引位置(从0开始计数)
   o.position     = 0;
   o.count        = 0;
   o.pagePosition = 0;
   o.pageCount    = 0;
   /// @attribute TList<TRow> 行记录的列表
   o.rows         = null;
   /// @attribute TMap<String, TRow> 行记录的集合
   o.ouids        = null;
   //----------------------------------------------------------
   // Method
   o.isEmpty      = TTempDataViewer_isEmpty;
   o.count        = TTempDataViewer_count;
   o.current      = TTempDataViewer_current;
   o.currentPage  = TTempDataViewer_currentPage;
   o.reset        = TTempDataViewer_reset;
   o.move         = TTempDataViewer_move;
   o.moveToRow    = TTempDataViewer_moveToRow;
   o.first        = TTempDataViewer_first;
   o.prior        = TTempDataViewer_prior;
   o.next         = TTempDataViewer_next;
   o.last         = TTempDataViewer_last;
   o.movePage     = TTempDataset_movePage;
   o.firstPage    = TTempDataset_firstPage;
   o.priorPage    = TTempDataset_priorPage;
   o.nextPage     = TTempDataset_nextPage;
   o.lastPage     = TTempDataset_lastPage;
   o.clear        = TTempDataset_clear;
   return o;
}

/***********************************************************
 * <T>判断当前结果集是否有数据。</T>
 *
 * @method
 * @return Boolean
 *    <L value='true'>有</L>
 *    <L value='false'>没有</L>
 **********************************************************/
function TTempDataViewer_isEmpty(){
   return (0 == this.count);
}

/***********************************************************
 * <T>获得当前的数据记录行数。</T>
 *
 * @method
 * @return Integer 数据行数
 **********************************************************/
function TTempDataViewer_count(){
   return this.count;
}

/***********************************************************
 * <T>获得当前的数据行对象。</T>
 *
 * @method
 * @return TRow 数据行对象
 **********************************************************/
function TTempDataViewer_current(){
   var o = this;
   var rs = o.rows;
   return rs ? rs.get(o.position - o.start) : null;
}

/***********************************************************
 * <T>重新设置开始位置。</T>
 *
 * @method
 **********************************************************/
function TTempDataViewer_reset(){
   this.position = -1;
}

/***********************************************************
 * <T>移动记录游标到指定的索引位置。</T>
 *
 * @method
 * @param p:position 索引位置
 **********************************************************/
function TTempDataViewer_move(p){
   this.position = p;
}

/***********************************************************
 * <T>移动记录游标到指定的数据行。</T>
 *
 * @method
 * @param r:row:TRow 数据行
 **********************************************************/
function TTempDataViewer_moveToRow(r){
   var o = this;
   var p = o.rows.indexOf(r);
   if(-1 != p){
      o.position = p - o.start;
   }
}

/***********************************************************
 * <T>把记录游标移动到第一条记录的位置。</T>
 *
 * @method
 * @param r:reset:Boolean
 *    <L value='true'>移动到第一条记录之前</L>
 *    <L value='false'>移动到第一条记录上</L>
 **********************************************************/
function TTempDataViewer_first(r){
   this.position = r ? -1 : 0;
}

/***********************************************************
 * <T>移动记录游标到上一个数据行。</T>
 *
 * @method
 * @return Boolean
 *    <L value='true'>成功</L>
 *    <L value='false'>失败</L>
 **********************************************************/
function TTempDataViewer_prior(){
   var o = this;
   if(o.position > 0){
      o.position--;
      return true;
   }
   return false;
}

/***********************************************************
 * <T>移动记录游标到下一个数据行。</T>
 *
 * @method
 * @return Boolean
 *    <L value='true'>成功</L>
 *    <L value='false'>失败</L>
 **********************************************************/
function TTempDataViewer_next(){
   var o = this;
   if(o.position < o.count-1){
      o.position++;
      return true;
   }
   return false;
}

/***********************************************************
 * <T>移动记录游标到最后一个数据行。</T>
 *
 * @method
 **********************************************************/
function TTempDataViewer_last(){
   this.position = this.count-1;
}

function TTempDataViewer_findById(id){
}

