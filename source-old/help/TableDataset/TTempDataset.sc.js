/***********************************************************
 * <T>用来存储页面数据内容的工具类。</T>
 * <P>可以同时存储多个数据页的记录，但同时只有一个页被选中，选中页中只有一条记录被选中。</P>
 * <P>页的索引和记录的索引都是从0开始计数。</P>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TTempDataset(){
   var o = this;
   //----------------------------------------------------------
   /// @attribute Integer 字段个数
   o.fieldCount    = 0;
   /// @attribute Array<String> 名称集合
   o.names         = new Array();
   /// @attribute Array<String, Integer> 名称位置的对换表
   o.table         = new Array();
   /// @attribute TMap<String, TDataPage> 数据页的集合
   o.pages         = new TMap();
   /// @attribute TList<TRow> 行记录的列表
   o.rows          = new TList();
   /// @attribute TMap<String, TRow> 行记录的集合,唯一键为主键
   o.ouids         = new TMap();
   /// @attribute Integer 页面大小
   o.pageSize      = 20;
   /// @attribute Integer 当前页的记录行数
   o.count         = 0;
   /// @attribute Integer 页面总数
   o.pageCount     = 0;
   /// @attribute Integer 记录总数
   o.total         = 0;
   //----------------------------------------------------------
   o.hasField      = TTempDataset_hasField;
   // 是否有指定的数据页
   o.hasPage       = TTempDataset_hasPage;
   // 同步创建一页
   o.syncPage      = TTempDataset_syncPage;
   // 加载数据集
   o.loadNode      = TTempDataset_loadNode;
   o.mergeNode     = TTempDataset_mergeNode;
   // 创建一行数据对象
   o.create        = TTempDataset_create;
   // 向当前数据集追加一个行对象
   o.push          = TTempDataset_push;
   // 向察看器中保存当前全部数据行
   o.saveViewer     = TTempDataset_saveViewer;
   // 向察看器中保存指定页的数据
   o.saveViewerPage = TTempDataset_saveViewerPage;
   // 根据索引获得行记录
   o.get           = TTempDataset_get;
   // 根据唯一索引获得行记录
   o.getByOuid     = TTempDataset_getByOuid;
   // 根据属性名称和属性内容查找一条记录
   o.find          = TTempDataset_find;
   // 清除所有记录
   o.clear         = TTempDataset_clear;
   // 获得调试信息
   o.dump          = TTempDataset_dump;
   return o;
}

/***********************************************************
 * <T>同步创建一个页对象。</T>
 *
 * @method
 * @param idx:index:Integer 数据页索引
 **********************************************************/
function TTempDataset_syncPage(idx){
   var o = this;
   var p = o.pages.get(idx);
   if(!p){
      p = new TDataPage();
      o.pages.set(idx, p);
   }
   return p;
}

/***********************************************************
 * <T>把指定数据页置为当前数据页。</T>
 *
 * @method
 * @param c:config:TNode 数据集节点
 **********************************************************/
function TTempDataset_loadNode(c){
   var o = this;
   // 数据集名称
   o.name = c.get('name');
   // 页大小
   o.pageSize = c.getInt('page_size', 1000);
   // 页索引
   o.pageIndex = c.getInt('pageIndex', 0);
   // 页数量
   o.page_count = c.getInt('page_count', 1);
   // 数据条总数目
   o.total = c.getInt('total');
   var p = o.syncPage(o.pageIndex);
   var ns = c.nodes;
   if(ns){
      var nc = ns.count;
      for(var n = 0; n < nc; n++){
         var nd = ns.get(n);
         if(nd && nd.isName(RDataset.Row)){
            var r = o.createRow();
            r.loadNode(nd);
            p.push(r);
         }
      }
   }
}

/***********************************************************
 * <T>查找指定数据索引ID的记录条。</T>
 *
 * @method
 * @param id:index:Integer 数据条索引
 **********************************************************/
function TTempDataset_findById(id){
   var o = this;
   var rs = o.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.index = id){
         return r;
      }
   }
   return null;
}

/***********************************************************
 * <T>创建一个行数据对象。</T>
 *
 * @method
 * @return r:TRow 行对象
 **********************************************************/
function TTempDataset_createRow(){
   var o = this;
   var r = new TRow(o);
   o.rows.push(r);
   return r;
}

/***********************************************************
 * <T>追加一个行对象。</T>
 *
 * @method
 * @param r:row:TRow 行对象
 **********************************************************/
function TTempDataset_push(r){
   var o = this;
   o.rows.push(r);
   o.ouids.set(r.uniqueId, r);
}

/***********************************************************
 * <T>判断当前页是否有数据。</T>
 *
 * @parem idx 指定的页码
 * @return Boolean
 *    <L value='true'>有</L>
 *    <L value='false'>没有</L>
 **********************************************************/
function TTempDataset_hasPage(idx){
   var o = this;
   return (null != o.pages.value(idx));
}











/***********************************************************
 * <T>把指定数据页置为当前数据页。</T>
 *
 * @method
 * @param p:page:Integer 数据页的索引号
 **********************************************************/
function TTempDataset_movePage(p){
   this.pageIndex = p;
}

/***********************************************************
 * <T>把第一页数据置为当前数据页。</T>
 *
 * @method
 * @see TTempDataset.currentCount
 **********************************************************/
function TTempDataset_movePageFirst(){
   this.pageIndex = 0;
}

/***********************************************************
 * <T>把上一页数据置为当前数据页。</T>
 *
 * @method
 * @see TTempDataset.currentCount
 * @return Boolean
 *    <L value='true'>成功</L>
 *    <L value='false'>失败</L>
 **********************************************************/
function TTempDataset_movePagePrior(){
   var o = this;
   if(o.pageIndex > 0){
      o.pageIndex--;
      return true;
   }
   return false;
}

/***********************************************************
 * <T>把下一页数据置为当前数据页。</T>
 *
 * @method
 * @see TTempDataset.currentCount
 *    <L value='true'>成功</L>
 *    <L value='false'>失败</L>
 **********************************************************/
function TTempDataset_movePageNext(){
   var o = this;
   if(o.pageIndex < o.pageCount - 1){
      o.pageIndex++;
      return true;
   }
   return false;
}

/***********************************************************
 * <T>把最后一页数据置为当前数据页。</T>
 *
 * @method
 * @see TTempDataset.currentCount
 **********************************************************/
function TTempDataset_movePageLast(){
   var o = this;
   o.pageIndex = o.pageCount - 1;
}

/***********************************************************
 * <T>获得一个指定索引位置的数据页面。如果不存在则创建。</T>
 *
 * @method
 * @param n:index:Integer 数据索引
 * @return TDataPage 数据页面
 **********************************************************/
function TTempDataset_syncPage(n){
   var o = this;
   var p = o.pages.get(n);
   if(!p){
      p = new TDataPage();
      o.pages.set(n, p);
   }
   return p;
}

/***********************************************************
 * <T>创建一个新的行对象，放在当前数据集中。</T>
 *
 * @method
 * @param c:config:TNode 设置节点
 **********************************************************/
function TTempDataset_createRow(){
   var o = this;
   var r = new TRow(o);
   o.rows.push(r);
   return r;
}


/***********************************************************
 * <T>加载新的设置节点到数据集中，不覆盖当前数据</T>
 *
 * @method
 * @param c:config:TNode 设置节点
 **********************************************************/
function TTempDataset_loadNode(c){
   var o = this;
   // 获得数据集信息
   debugger
   o.name = c.get('name');
   o.pageSize = c.getInt('page_size', 1000);
   o.pageIndex = c.getInt('page', 0);
   o.pageCount = c.getInt('page_count', 1);
   o.total = c.getInt('total');
   // 加载数据行记录
   var p = o.syncPage(o.pageIndex);
   var ns = c.nodes;
   if(ns){
      o.count = ns.count;
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         if(n && n.isName(RDataset.ROW)){
            var r = new TRow(o);
            r.loadNode(n);
            p.push(r);
            o.push(r);
         }
      }
   }
}

/***********************************************************
 * <T>将当前数据页存入数据观察器。</T>
 *
 * @method
 * @param v:viewer:TTempDatasetViewer 数据观察器
 **********************************************************/
function TTempDataset_saveViewer(v){
   var o = this;
   v.datasetName = o.name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v.count = o.rows.count;
   v.rows = o.rows;
   v.ouids = o.ouids;
   v.dataset = o;
}

function TTempDataset_saveViewerPage(v){
   var o = this;
   var p = o.syncPage(o.pageIndex);
   v.datasetName = o.name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v.count = p.count();
   v.rows = p.rows;
   v.ouids = p.ouids;
   v.dataset = o;
}


/***********************************************************
 * <T>判断是否有含有指定的字段名称。</T>
 *
 * @method
 * @param n:name:String 字段名称
 * @return Boolean
 *    <L value='true'>含有</L>
 *    <L value='false'>不含有</L>
 **********************************************************/
function TTempDataset_hasField(n){
   return (null != n) ? (null != this.table[n.toString().toLowerCase()]) : false;
}

/***********************************************************
 * <T>判断当前页是否有数据。</T>
 *
 * @return Boolean
 *    <L value='true'>有</L>
 *    <L value='false'>没有</L>
 **********************************************************/
function TTempDataset_hasPage(){
   var o = this;
   return (null != o.pages.get(o.pageIndex));
}

/***********************************************************
 * <T>获得指定行的索引位置。</T>
 *
 * @method
 * @param r:row:TRow 行对象
 * @return Boolean
 *    <L value='非-1'>索引位置</L>
 *    <L value='-1'>没有</L>
 **********************************************************/
function TTempDataset_indexOf(r){
   return this.ouids.indexOf(r);
}

/***********************************************************
 * <T>在当前数据行中，根据字段名称获得数据内容。</T>
 *
 * @method
 * @param n:name:String 字段名称
 * @param v:value:String 默认数据
 * @return String 数据内容
 * @see TTempDataset.current
 **********************************************************/
function TTempDataset_get(n, v){
   var r = this.current();
   return r ? r.get(n, v) : null;
}

/***********************************************************
 * <T>根据行的唯一标识获得行对象。</T>
 *
 * @method
 * @param u:ouid:Integer 唯一标识
 * @return TRow 行对象
 **********************************************************/
function TTempDataset_getByOuid(u){
   return this.ouids.get(u);
}

/***********************************************************
 * <T>在当前数据行中，根据字段名称设置数据内容。</T>
 *
 * @method
 * @param n:name:String 字段名称
 * @param v:value:String 数据内容
 * @see TTempDataset.current
 **********************************************************/
function TTempDataset_set(n, v){
   var r = this.current();
   if(r){
      r.set(n, v);
   }
}

/***********************************************************
 * <T>获得当前的数据行对象。</T>
 *
 * @method
 * @return TRow 数据行对象
 **********************************************************/
function TTempDataset_current(){
   var o = this;
   var p = o.position;
   return (p >= 0 && p < o.total) ? o.ouids[p] : null;
}

/***********************************************************
 * <T>获得当前的数据记录行数。</T>
 *
 * @method
 * @return Integer 数据行数
 **********************************************************/
function TTempDataset_currentCount(){
   var o = this;
   if(o.pageIndex == o.pageCount - 1){
      var count = o.total % o.pageSize;
      if(count == 0 && o.total > 0){
         return o.pageSize;
      }
      return count;
   }
   return (o.total > 0) ? o.pageSize : 0;
}

/***********************************************************
 * <T>根据传值查找对应的行数据记录。</T>
 *
 * @method
 * @return TRow  数据行对象
 **********************************************************/
function TTempDataset_find(){
   var o = this;
   var a = arguments;
   var l = a.length;
   if(l % 2 == 1){
      RMessage.fatal(o, null, 'Parameters must is pairs (length={0})', l);
   }
   var s = o.ouids;
   for(var n=0; n<s.length; n++){
      var r = s[n];
      var f = true;
      for(var i=0; i<l; i+=2){
         if(r.get(a[n]) != a[n+1]){
            f = false;
            break;
         }
      }
      if(f){
         return r;
      }
   }
   return null;
}

/***********************************************************
 * <T>获得指定索引位置的数据行对象。</T>
 *
 * @method
 * @param n:index:Integer 索引位置
 * @return TRow 数据行对象
 **********************************************************/
function TTempDataset_row(n){
   return (n >= 0 && n < this.count) ? this.ouids[n] : null;
}

/***********************************************************
 * <T>移动记录游标到指定的索引位置。</T>
 *
 * @method
 * @param p:position
 **********************************************************/
function TTempDataset_move(p){
   this.position = p;
}

/***********************************************************
 * <T>移动记录游标到指定的数据行。</T>
 *
 * @method
 * @param r:row:TRow 数据行
 **********************************************************/
function TTempDataset_moveToRow(r){
   var o = this;
   var p = o.indexOf(r);
   if(-1 != p){
      o.position = p;
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
function TTempDataset_moveFirst(r){
   var o = this;
   o.position = r ? o.pageSize*o.page-1 : o.pageSize*o.pageIndex;
}

/***********************************************************
 * <T>移动记录游标到上一个数据行。</T>
 *
 * @method
 * @return Boolean
 *    <L value='true'>成功</L>
 *    <L value='false'>失败</L>
 **********************************************************/
function TTempDataset_movePrior(){
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
function TTempDataset_moveNext(){
   var o = this;
   if(o.position < o.pageSize*o.pageIndex+o.count-1){
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
function TTempDataset_moveLast(){
   this.position = this.count-1;
}
















/***********************************************************
 * <T>根据节点创建数据集。</T>
 *
 * @method
 * @param c:config:TNode 节点数据
 * @param i:i:Integer 行数
 * @param m:m:Boolean 是否创建新的行
 * @param r:row:TRow 
 **********************************************************/
function TTempDataset_create(c, i, m){
   var o = this;
   // 获得行的缓冲
   var ouid = c.get('ouid');
   var r = null;
   if(m && ouid){
      r = o.ouids.get(ouid);
   }
   // 如果不存在，则新建一行
   if(!r){
      r = new TRow(o);
      if(null == i){
         i = o.count++;
      }
      r.index = i;
      o.ouids[i] = r;
   }
   // 加载行数据
   if(c){
      if(RClass.isClass(c, TAttributes)){
         r.append(c);
      }else if(RClass.isClass(c, TNode)){
         r.loadNode(c);
      }
   }
   // 保存行的唯一标识索引
   if(ouid){
      o.ouids.set(ouid, r);
   }
   return r;
}



/***********************************************************
 * <T>加载新的节点数据，并与已有数据进行合并。</T>
 *
 * @method
 * @param c:config:TNode 数据节点
 **********************************************************/
function TTempDataset_mergeNode(c){
   if(c){
      var o = this;
      // Load attributes
      o.name = c.get('name');
      o.pageIndex = c.getInt('page', 0);
      o.pageSize = c.getInt('page_size', 1000);
      o.pageCount = c.getInt('page_count', 1);
      // Load row nodes
      if(c.nodes){
         var p = o.pageSize * o.pageIndex;
         var ns = c.nodes;
         for(var i=0; i<ns.count; i++){
            var n = ns.get(i);
            if(n && n.isName(RDataset.ROW)){
               var r = o.create(n, p++, true)
               r.store();
            }
         }
         o.count = Math.min(Math.max(o.count, ns.count), o.pageSize);
      }
      o.total = c.getInt('total', o.count);
   }
}

/***********************************************************
 * <T>从数据内容行数组里移除指定索引位置的数据行。</T>
 *
 * @method
 * @param n:index:Integer 索引位置
 * @return TRow 移除的数据行对象
 **********************************************************/
function TTempDataset_remove(n){
   var o = this;
   var r = null;
   if(n >= 0 && n < o.count){
      var rs = o.ouids;
      r = rs[n];
      var l = --o.count;
      for(var i=n; i<l; i++){
         rs[i] = rs[i+1];
      }
   }
   return r;
}

/***********************************************************
 * <T>从数据内容行数组里移除指定的数据行。</T>
 *
 * @method
 * @param r:ror:TRow 指定移除的数据行
 * @see TTempDataset.remove
 **********************************************************/
function TTempDataset_removeRow(r){
   var o = this;
   var n = o.indexOf(r);
   if(-1 != n){
      o.remove(n);
   }
}

/***********************************************************
 * <T>获得当前对象内的调试信息。</T>
 *
 * @method
 * @param d:dump:TString 调试字符串
 * @return TString 调试信息
 * @see TString.append
 * @see TString.appendLine
 **********************************************************/
function TTempDataset_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.name(o));
   s.append(' count=', o.count);
   s.append(' fields=', o.fieldCount);
   s.appendLine();
   if(o.ouids){
      for(var n=0; n<o.ouids.length; n++){
         s.append('- ');
         o.ouids[n].dump(s);
         if(n != o.ouids.length-1){
            s.appendLine();
         }
      }
   }
   return s;
}
