//==========================================================
// <T>数据获取参数信息。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.TDatasetFetchArg = function TDatasetFetchArg(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.datasets   = new MO.TDictionary();
   //..........................................................
   // @method
   o.saveConfig = MO.TDatasetFetchArg_saveConfig;
   //..........................................................
   // @method
   o.process    = MO.TDatasetFetchArg_process;


   //..........................................................
   //o.formName = n;
   //o.formId   = id;
   //o.pageSize = ps;
   //o.page     = p;
   //o.reset    = r;
   //o.force    = f;
   //o.path     = pt;
   //o.research = re;
   //o.searchs  = new TSearchItems();
   //o.orders   = new TOrderItems();
   //o.values   = new TAttributes();
   //o.callback = null;
   // Attribute
   //o.push     = TDatasetFetchArg_push;
   //o.invoke   = TDatasetFetchArg_invoke
   return o;
}

//==========================================================
// <T>将当前信息存储到配置节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.TDatasetFetchArg_saveConfig = function TDatasetFetchArg_saveConfig(p){
   var o = this;
   // 创建根节点
   p.set('name', o.name);
   //n.set('id', o.formId);
   //n.set('page', o.page);
   //n.set('page_size', o.pageSize);
   //n.set('path', o.path);
   //if(o.research){
   //   n.set('research', o.research);
   //}
   // 创建搜索信息的节点
   //var ss = o.searchs;
   //if(ss.count > 0){
   //   var ns = n.create('Search');
   //   var sl = ss.count;
   //   for(var m=0; m<sl; m++){
   //      ns.push(ss.get(m).toNode());
   //   }
   //}
   //var so = o.orders;
   //if(so.count > 0){
   //   // 创建排序信息的节点
   //   var no = n.create('Order');
   //   var ol = so.count;
   //   for(var m=0; m<ol; m++){
   //      no.push(so.get(m).toNode());
   //   }
   //}
   //if(o.values && o.values.count > 0){
   //   var nd = new TNode('Values', o.values);
   //   n.push(nd);
   //}
}


//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.TDatasetFetchArg_process = function TDatasetFetchArg_process(){
   var o = this;
   if(o.owner){
      o.callback.call(o.owner, o);
   }else{
      o.callback(o);
   }
}







//==========================================================
// <T>设置内部信息。</T>
//
// @method
// @param v:value:String 对象实例
//==========================================================
MO.TDatasetFetchArg_push = function TDatasetFetchArg_push(v){
   var o = this;
   if(MO.Class.isClass(v, TSearchItem)){
      o.searchs.push(v);
   }else if(MO.Class.isClass(v, TOrderItem)){
      o.orders.push(v);
   }
}

//==========================================================
// <T>回调函数。</T>
//
// @method
//==========================================================
MO.TDatasetFetchArg_invoke = function TDatasetFetchArg_invoke(){
   var o = this;
   if(o.callback){
      o.callback.invoke(o);
   }
}
