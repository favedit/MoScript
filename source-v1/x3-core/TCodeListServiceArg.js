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
function TCodeListServiceArg(n){
   var o = this;
   // Attribute
   o.callback     = null;
   o.name         = n;
   o.resultConfig = null;
   o.values       = new TList();
   // Attribute
   o.toNode       = TCodeListServiceArg_toNode;
   o.invoke       = TCodeListServiceArg_invoke;
   return o;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TCodeListServiceArg_toNode(){
   var o = this;
   // 创建根节点
   if(o.values && o.values.count > 0){
      var nd = new TNode('Values', o.values.get(0).toAttributes());
      return nd;
   }
}

/***********************************************************
 * <T>回调函数。</T>
 *
 * @method
 **********************************************************/
function TCodeListServiceArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}