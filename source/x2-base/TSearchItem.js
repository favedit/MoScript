/***********************************************************
 * <T>搜索条件信息的工具类。</T>
 *
 * @tool
 * @param n:name:String 名称
 * @param v:value:String 内容
 * @param t:type:ESearch 类型
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TSearchItem(n, v, t, f){
   var o = this;
   /// @attribute String 名称
   o.name   = n;
   /// @attribute String 内容
   o.value  = v;
   /// @attribute String 格式化
   o.format = f;
   o.type   = RString.nvl(t, ESearch.Equals);
   // Method
   o.set    = TSearchItem_set;
   o.equals = TSearchItem_equals;
   o.toNode = TSearchItem_toNode;
   o.pack   = TSearchItem_pack;
   o.unpack = TSearchItem_unpack;
   return o;
}

/***********************************************************
 * <T>设置内部信息。</T>
 *
 * @method
 * @param n:name:String 名称
 * @param t:type:String 类型
 * @param v:value:String 内容
 **********************************************************/
function TSearchItem_set(n, v, t, f){
   var o = this;
   o.name  = n;
   o.type  = RString.nvl(t, ESearch.Equals);
   o.value = v;
   o.format = f;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TSearchItem_toNode(){
   var o = this;
   var n = new TNode('SearchItem');
   n.set('name', o.name);
   n.set('type', o.type);
   n.set('value', o.value);
   n.set('format', o.format);
   return n;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TSearchItem_equals(s){
   var o = this;
   if(o.name == s.name && o.type == s.type && o.value == s.value){
	   return true;
   }
   return false;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TSearchItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   as.set("value", o.value);
   as.set("format", o.format);
   return as.pack();
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TSearchItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name  = as.get("name");
   o.type  = as.get("type");
   o.value = as.get("value");
   o.format = as.get("format");
}
