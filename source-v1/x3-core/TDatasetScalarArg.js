/***********************************************************
 * <T>获取数据集的参数信息类。</T>
 *
 * @tool
 * @param n:name:String 数据集名称
 * @param id:id:String 表单对象标志
 * @param s:pageSize:Integer 分页大小
 * @param p:page:Integer 页号
 * @param f:force:Boolean 是否要重新取数据
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TDatasetScalarArg(c, u, p){
   var o = this;
   // Attribute
   o.callback     = null;
   o.control      = c;
   o.ouid         = u;
   o.parameters   = p;
   o.resultConfig = null;
   o.result       = null;
   // Attribute
   o.set          = TDatasetScalarArg_set;
   o.toNode       = TDatasetScalarArg_toNode;
   o.invoke       = TDatasetScalarArg_invoke;
   return o;
}

/***********************************************************
 * <T>设置内部信息。</T>
 *
 * @method
 * @param n:name:String 数据集名称
 * @param id:id:String 表单对象标志
 * @param ps:pageSize:Integer 分页大小
 * @param p:page:Integer 页号
 **********************************************************/
function TDatasetScalarArg_set(n, c, v){
   var o = this;
   o.name     = n;
   o.control  = c;
   o.value    = v;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetScalarArg_toNode(){
   var o = this;
   // 创建根节点
   var n = new TNode('Control');
   n.set('form', o.control.topControl().name);
   n.set('control', o.control.fullPath());
   n.set('ouid', o.ouid);
   if(o.parameters){
      n.set('parameters', o.parameters.pack());
   }
   return n;
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TDatasetScalarArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
