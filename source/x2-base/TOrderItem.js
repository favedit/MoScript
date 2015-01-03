/***********************************************************
 * <T>搜索排序信息的工具类。</T>
 *
 * @tool
 * @param n:name:String 排序字段
 * @param t:type:EOrder 排序类型
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TOrderItem(n, t){
   var o = this;
   /// @attribute String 排序字段
   o.name   = n;
   /// @attribute String 排序类型
   o.type   = t;
   // Method
   o.set    = TOrderItem_set;
   o.toNode = TOrderItem_toNode;
   o.pack   = TOrderItem_pack;
   o.unpack = TOrderItem_unpack;
   return o;
}

/***********************************************************
 * <T>设置内部信息。</T>
 *
 * @method
 * @param n:name:String 排序字段
 * @param t:type:String 排序类型
 **********************************************************/
function TOrderItem_set(n, t){
   var o = this;
   o.name = n;
   o.type = t;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TOrderItem_toNode(){
   var o = this;
   var n = new TNode('OrderItem');
   n.set('name', o.name);
   n.set('type', o.type);
   return n;
}

/***********************************************************
 * <T>将当前信息存储为一个XML节点。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TOrderItem_pack(){
   var o = this;
   var as = new TAttributes();
   as.set("name", o.name);
   as.set("type", o.type);
   return as.pack();
}

/***********************************************************
 * <T>解压缩一个字符串。</T>
 *
 * @method
 * @return TNode XML节点
 **********************************************************/
function TOrderItem_unpack(s){
   var o = this;
   var as = new TAttributes();
   as.unpack(s);
   o.name = as.get("name");
   o.type = as.get("type");
}