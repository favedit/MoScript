/***********************************************************
 * <T>选取引用时的参数信息类。</T>
 *
 * @tool
 * @param n:name:String 数据集名称
 * @param cp:controlPath:String 控件路径
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TDatasetLovArg(n, cp){
   var o = this;
   // Attribute
   o.callback    = null;
   o.name        = n;
   o.controlPath = cp;
   o.dataset     = new TDataset();
   o.lovNode     = null;
   // method
   o.set         = TDatasetLovArg_set;
   o.push        = TDatasetLovArg_push;
   o.toNode      = TDatasetLovArg_toNode;
   o.invoke      = TDatasetLovArg_invoke;
   return o;
}
/***********************************************************
 * <T>设置对象信息。</T>
 *
 * @method
 * @param n:name:String 数据集名称
 * @param cp:controlPath:String 控件路径
 **********************************************************/
function TDatasetLovArg_set(n, cp){
   var o = this;
   o.name = n;
   o.controPath = cp;
}
/***********************************************************
 * <T>插入行参数到指定的数据集参数中。</T>
 *
 * @method
 * @param dn:datasetName 指定数据集名称
 * @param r:row 数据行参数对象
 **********************************************************/
function TDatasetLovArg_push(r){
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
function TDatasetLovArg_toNode(){
   var o = this;
   // 创建根节点
   var root = new TNode("Form");
   root.set("name", o.name);
   root.set("control", o.controlPath);
   var dsn = new TNode("Dataset");
   dsn.set("name", o.dsName);
   root.push(dsn);
   var ds = o.dataset;
   var len = ds.total;
   for(var n = 0;  n<len; n++){
      var r = ds.rows.get(n);
      var nd = new TNode('Row');
      r.loadNode(nd);
      dsn.push(nd);
   }
   return root;
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TDatasetLovArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
