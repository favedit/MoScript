/***********************************************************
 * <T>获取数据集的参数信息类。</T>
 *
 * @tool
 * @param s:service:String 执行的service
 * @param r:url:String service地址
 * @param fn:formName:String 表单名称
 * @param c:controlPath:String 控件路径
 * @author MAOCY
 * @version 1.0.1
 **********************************************************/
function TActionServiceArg(fn, da){
   var o = this;
   // Attribute
   o.formName   = fn;
   o.dataAction = da;
   o.service    = null;
   o.action     = null;
   o.rows       = new TList();
   o.actionType = 'process';
   o.values     = null;
   o.resultRows = null;
   o.callback   = null;
   // Attribute
   o.toNode     = TActionServiceArg_toNode;
   o.invoke     = TActionServiceArg_invoke;
   return o;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TActionServiceArg_toNode(){
   var o = this;
   // 创建根节点
   var nf = new TNode('Form');
   nf.set('name', o.dsName);
   nf.set('data_action', o.actName);
   // 获得数据行
   var rs = o.rows;
   if(o.values && o.values.count > 0){
      var nd = new TNode('Row', o.values);
      nf.push(nd);
   }
   return nf;
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TActionServiceArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
