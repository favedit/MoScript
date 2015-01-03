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
function TDatasetPrepareArg(n, i){
   var o = this;
   // Attribute
   o.callback       = null;
   o.callbackSuccess = null;
   o.name           = n;
   o.id             = i;
   o.dataset        = new TDataset();
   o.resultDataset  = new TDataset();
   o.resultDatasets = new TMap();
   o.values         = new TAttributes();
   // method
   o.set            = TDatasetPrepareArg_set;
   o.toNode         = TDatasetPrepareArg_toNode;
   o.push           = TDatasetPrepareArg_push;
   o.invoke         = TDatasetPrepareArg_invoke;
   o.invokeSuccess  = TDatasetPrepareArg_invokeSuccess;
   return o;
}
/***********************************************************
 * <T>设置对象信息。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetPrepareArg_set(n, i, dn){
   var o = this;
   o.name = n;
   o.id   = i;
   o.dsName    = dn;
}

/***********************************************************
 * <T>设置对象信息。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetPrepareArg_push(r){
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
function TDatasetPrepareArg_toNode(){
   var o = this;
   // 创建根节点
   var root = new TNode("Form");
   root.set("name", o.name);
   root.set("id", o.id);
   var dsn = new TNode("Dataset");
   dsn.set("name", o.dsName);
   var ds = o.dataset;
   var len = ds.total;
   for(var n = 0; n < len; n++){
      var r = ds.rows.get(n);
      var nd = new TNode('Row');
      r.saveNode(nd);
      dsn.push(nd);
   }
   if(o.values && o.values.count > 0){
      var td = new TNode('Values', o.values);
      dsn.push(td);
   }
   root.push(dsn);
   return root;
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TDatasetPrepareArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
//==========================================================
//<T>用户指定的成功后的回调函数。</T>
//
//@method
//@return
// <L value='true'>调用成功，终止操作</L>
// <L value='false'>未调用成功，后续操作</L>
//==========================================================
function TDatasetPrepareArg_invokeSuccess(){
   var o = this;
   if(o.callbackSuccess){
      return o.callbackSuccess.invoke(o);
   }
   return false;
}