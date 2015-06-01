//==========================================================
// <T>更新数据集的参数信息类。</T>
//
// @tool
// @param n:name:String 数据集名称
// @param i:id:Integer 表单标识
// @param dn:datasetName:String 数据集名称
// @param pt:datasetName:String 表单路径
// @author maocy
// @version 1.0.1
//==========================================================
function TDatasetUpdateArg(n, i, dn, pt){
   var o = this;
   // Attribute
   o.callback        = null;
   o.callbackSuccess = null;
   o.name            = n;
   o.id              = i;
   o.dsName          = dn;
   o.path            = pt
   o.dataset         = new TDataset();
   o.resultDataset   = new TDataset();
   o.checked         = null;
   o.actionType      = 'update';
   o.processFinish   = false;
   // method
   o.hasData         = TDatasetUpdateArg_hasData;
   o.set             = TDatasetUpdateArg_set;
   o.push            = TDatasetUpdateArg_push;
   o.toNode          = TDatasetUpdateArg_toNode;
   o.invoke          = TDatasetUpdateArg_invoke;
   o.invokeSuccess   = TDatasetUpdateArg_invokeSuccess;
   return o;
}

//==========================================================
// <T>是否含有数据。</T>
//
// @method
// @return Boolean
//    <L value='true'>有</L>
//    <L value='false'>无</L>
//==========================================================
function TDatasetUpdateArg_hasData(){
   var o = this;
   if(o.dataset){
      return !o.dataset.rows.isEmpty();
   }
   return false;
}

//==========================================================
// <T>设置对象信息。</T>
//
// @method
// @return TNode XML节点
//==========================================================
function TDatasetUpdateArg_set(n, i, dn){
   var o = this;
   o.name = n;
   o.id   = i;
   o.dsName = dn;
}
//==========================================================
// <T>插入行参数到指定的数据集参数中。</T>
//
// @method
// @param dn:datasetName 指定数据集名称
// @param r:row 数据行参数对象
//==========================================================
function TDatasetUpdateArg_push(r){
   var o = this;
   var nd = new TNode('Row');
   r.saveNode(nd);
   var rd = o.dataset.createRow();
   rd.loadNode(nd);
}
//==========================================================
// <T>将当前信息存储为一个XML节点。</T>
//
// @method
// @return TNode XML节点
//==========================================================
function TDatasetUpdateArg_toNode(){
   var o = this;
   // 创建根节点
   var root = new TNode("Form");
   root.set("name", o.name);
   root.set("id", o.id);
   root.set("path", o.path);
   var ds = new TNode("Dataset");
   ds.set("name", o.dsName);
   root.push(ds);
   var rs = o.dataset.rows;
   var rc = rs.count;
   for(var n=0; n<rc; n++){
      var r = rs.get(n);
      var rn = new TNode('Row');
      r.saveNode(rn);
      ds.push(rn);
   }
   return root;
}

//==========================================================
// <T>回调函数。</T>
//
// @method
// @return TNode XML节点
//==========================================================
function TDatasetUpdateArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}

//==========================================================
// <T>用户指定的成功后的回调函数。</T>
//
// @method
// @return
//    <L value='true'>调用成功，终止操作</L>
//    <L value='false'>未调用成功，后续操作</L>
//==========================================================
function TDatasetUpdateArg_invokeSuccess(){
   var o = this;
   if(o.callbackSuccess){
      return o.callbackSuccess.invoke(o);
   }
   return false;
}
