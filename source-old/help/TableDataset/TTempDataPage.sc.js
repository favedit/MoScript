/***********************************************************
 * <T>用来存储页面数据内容的工具类。</T>
 * <P>可以同时存储多个数据页的记录，但同时只有一个页被选中，选中页中只有一条记录被选中。</P>
 * <P>页的索引和记录的索引都是从0开始计数。</P>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TTempDataPage(){
   var o = this;
   o.count    = 0;
   /// @attribute TList<TRow> 行记录的列表
   o.rows     = new TList();
   /// @attribute TMap<String, TRow> 行记录的集合，用唯一键做为索引
   o.ouids    = new TMap();
   // Method
   o.loadNode = TTempDataPage_loadNode;
   o.get      = TTempDataPage_get;
   o.push     = TTempDataPage_push;
   o.clear    = TTempDataPage_clear;
   o.dump     = TTempDataPage_dump;
   return o;
}

/***********************************************************
 * <T>获得当前的数据记录行数。</T>
 *
 * @method
 * @return Integer 数据行数
 **********************************************************/
function TTempDataPage_count(){
   return this.rows.count;
}

/***********************************************************
 * <T>加载新的设置节点到数据集中，不覆盖当前数据</T>
 *
 * @method
 * @param c:config:TNode 设置节点
 **********************************************************/
function TTempDataPage_loadNode(c){
   var o = this;
   var ns = c.nodes;
   if(ns){
      o.count = ns.count;
      var nc = ns.count;
      for(var i=0; i<nc; i++){
         var n = ns.get(i);
         if(n && n.isName(RDataset.ROW)){
            var r = new TRow();
            r.loadNode(c);
            o.push(r);
         }
      }
   }
}

/***********************************************************
 * <T>追加一个行对象。</T>
 *
 * @method
 * @param r:row:TRow 行对象
 **********************************************************/
function TTempDataPage_push(r){
   var o = this;
   o.rows.push(r);
   o.ouids.set(r.uniqueId, r);
}
