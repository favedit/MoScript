/***********************************************************
 * <T>更新数据集的参数信息类。</T>
 *
 * @tool
 * @param n:name:String 数据集名称
 * @param i:id:Integer 表单标识
 * @param dn:datasetName:String 数据集名称
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TDatasetTreeViewArg(n, i){
   var o = this;
   // Attribute
   g.action         = 'update';
   o.callback       = null;
   o.name           = n;
   o.id             = i;
   o.treeNode       = null;
   o.resultDataset  = new TDataset();
   o.values         = null;
   // method
   o.set            = TDatasetTreeViewArg_set;
   o.toNode         = TDatasetTreeViewArg_push;
   o.push           = TDatasetTreeViewArg_toNode;
   o.invoke         = TDatasetTreeViewArg_invoke;
   return o;
}
/***********************************************************
 * <T>设置对象信息。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetTreeViewArg_set(n, i, dn){
   var o = this;
   o.name = n;
   o.id   = i;
   o.dsName = dn;
}

/***********************************************************
 * <T>设置对象信息。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetTreeViewArg_push(r){
   var o = this;
   var nd = new TNode('Row');
   r.saveNode(nd);
   var rd = o.dataset.createRow();
   rd.loadNode(nd);
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetTreeViewArg_toNode(){
   var o = this;
   // 创建根节点
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TDatasetTreeViewArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}