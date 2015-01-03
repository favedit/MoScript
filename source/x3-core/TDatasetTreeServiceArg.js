/***********************************************************
 * <T>获取数据集的参数信息类。</T>
 *
 * @tool
 * @param fn:name:String 列表名称
 * @param id:id:String 表单id
 * @param ac:action:String 列表的响应函数
 * @param sv:service:String 列表的响应服务
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TDatasetTreeServiceArg(fn, id, pt, ac, sv){
   var o = this;
   // Attribute
   o.callback     = null;
   o.formName     = fn;
   o.formId       = id;
   o.path         = pt;
   o.action       = ac;
   o.service      = sv;
   o.resultConfig = null;
   o.rows         = new TList();
   // Attribute
   o.toNode       = TDatasetTreeServiceArg_toNode;
   o.invoke       = TDatasetTreeServiceArg_invoke;
   return o;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TDatasetTreeServiceArg_toNode(){
   var o = this;
   // 创建根节点
   var n = new TNode('Form');
   n.set('name', o.formName);
   n.set('id', o.formId);
   n.set('path', o.path);
   var rp = null;
   if(o.rows && o.rows.count > 0){
      rp = new TNode("RowPath");
      var ct = o.rows.count;
      for(var k = 0; k < ct; k++){
         rp.push(new TNode('Row', o.rows.get(k)));
      }
   }
   if(rp){
      n.push(rp);
   }
   return n;
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TDatasetTreeServiceArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
