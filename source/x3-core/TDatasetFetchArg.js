//==========================================================
// <T>获取数据集的参数信息类。</T>
//
// @tool
// @param n:name:String 数据集名称
// @param id:id:String 表单对象标志
// @param s:pageSize:Integer 分页大小
// @param p:page:Integer 页号
// @param r:reset:Boolean 整个数据集是否重新获取
// @param f:force:Boolean 是否重新获取当前页数据
// @param pt:path:String 表单路径
// @author maocy
// @version 1.0.1
//==========================================================
function TDatasetFetchArg(n, id, ps, p, r, f, pt, re){
   var o = this;
   // Attribute
   o.formName = n;
   o.formId   = id;
   o.pageSize = ps;
   o.page     = p;
   o.reset    = r;
   o.force    = f;
   o.path     = pt;
   o.research = re;
   o.searchs  = new TSearchItems();
   o.orders   = new TOrderItems();
   o.values   = new TAttributes();
   o.callback = null;
   o.resultDatasets = new TMap();
   // Attribute
   o.push     = TDatasetFetchArg_push;
   o.toNode   = TDatasetFetchArg_toNode;
   o.invoke   = TDatasetFetchArg_invoke
   return o;
}

//==========================================================
// <T>设置内部信息。</T>
//
// @method
// @param v:value:String 对象实例
//==========================================================
function TDatasetFetchArg_push(v){
   var o = this;
   if(RClass.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(RClass.isClass(v, TOrderItem)){
      o.orders.push(v);
   }
}

//==========================================================
// <T>将当前信息存储为一个XML节点。</T>
//
// @method
// @return TNode XML节点
//==========================================================
function TDatasetFetchArg_toNode(){
   var o = this;
   // 创建根节点
   var n = new TNode('Form');
   n.set('name', o.formName);
   n.set('id', o.formId);
   n.set('page', o.page);
   n.set('page_size', o.pageSize);
   n.set('path', o.path);
   if(o.research){
      n.set('research', o.research);
   }
   // 创建搜索信息的节点
   var ss = o.searchs;
   if(ss.count > 0){
      var ns = n.create('Search');
      var sl = ss.count;
      for(var m=0; m<sl; m++){
         ns.push(ss.get(m).toNode());
      }
   }
   var so = o.orders;
   if(so.count > 0){
      // 创建排序信息的节点
      var no = n.create('Order');
      var ol = so.count;
      for(var m=0; m<ol; m++){
         no.push(so.get(m).toNode());
      }
   }
   if(o.values && o.values.count > 0){
      var nd = new TNode('Values', o.values);
      n.push(nd);
   }
   return n;
}

//==========================================================
// <T>回调函数。</T>
//
// @method
//==========================================================
function TDatasetFetchArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
