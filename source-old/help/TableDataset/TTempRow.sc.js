/***********************************************************
 * <T>用来存储单条数据内容的工具类。</T>
 *
 * @tool
 * @param d:dataset:TDataset 数据集对象
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function TTempRow(d){
   var o = this;
   // Attribute
   // 必须传入所在的数据集
   o.dataset          = d;
   // 行状态(ERowStatus)
   o.status           = ERowStatus.Normal;
   // OUID
   o.uniqueId         = null;
   // 数据内容
   o.values           = new Array();
   //----------------------------------------------------------
   o.indexOf          = TTempRow_indexOf;
   o.contains         = TTempRow_contains;
   o.name             = TTempRow_name;
   o.value            = TTempRow_value;
   o.setValue         = TTempRow_setValue;
   o.ouid             = TTempRow_ouid;
   o.over             = TTempRow_over;
   o.get              = TTempRow_get;
   o.nvl              = TTempRow_nvl;
   o.set              = TTempRow_set;
   o.append           = TTempRow_append;
   o.appendAttributes = TTempRow_appendAttributes;
   o.loadNode         = TTempRow_loadNode;
   o.saveNode         = TTempRow_saveNode;
   o.toAttributes     = TTempRow_toAttributes;
   o.toString         = TTempRow_toString;
   o.copy             = TTempRow_copy;
   o.dump             = TTempRow_dump;
   return o;
}

/***********************************************************
 * <T>设置指定属性名称的属性值。</T>
 *
 * @method
 * @param n:name:String 属性名称
 * @param v:value:String 属性值
 **********************************************************/
function TTempRow_set(n, v){
   var o = this;
   if(null != n){
      var d = o.dataset;
      var l = n.toString().toLowerCase();
      var i = d.table[l];
      if(null == i || i >= d.fieldCount){
         i = d.fieldCount++;
         d.names[i] = n;
         d.table[l] = i;
      }
      o.values[i] = v;
   }
}

/***********************************************************
 * <T>加载一个XML节点到当前行数据中。</T>
 *
 * @method
 * @param nd:node:TNode 指定的节点对象
 **********************************************************/
function TTempRow_appendAtts(r){
   var o = this;
   if(r){
      var c = r.count;
      for(var n=0; n<c; n++){
         this.set(r.name(n), r.value(n));
      }
   }
}

/***********************************************************
 * <T>加载一个XML节点。</T>
 *
 * @method
 * @param nd:node:TNode 指定的节点对象
 **********************************************************/
function TTempRow_loadNode(nd){
   var o = this;
   if(nd && nd.attrs){
      o.appendAtts(nd.attrs);
      o.index = o.get('_ID');
      o.status = o.get('_STATUS');
      o.uniqueId = o.get('OUID');
   }
}












/***********************************************************
 * <T>查找行数据内，指定内容的索引位置。</T>
 *
 * @method
 * @param v:value:String 要查找的内容
 * @return Integer
 *    <L value='非-1'>索引位置</L>
 *    <L value='-1'>未找到</L>
 **********************************************************/
function TTempRow_indexOf(v){
   var s = this.values;
   var c = s.length;
   for(var n=0; n<c; n++){
      if(s[n] == v){
         return n;
      }
   }
   return -1;
}

/***********************************************************
 * <T>测试行数据内是否包含指定内容。</T>
 *
 * @method
 * @param v:value:String 要查找的内容
 * @return Boolean
 *    <L value='true'>含有</L>
 *    <L value='false'>不含有</L>
 **********************************************************/
function TTempRow_contains(v){
   return (-1 != this.indexOf(v));
}

/***********************************************************
 * <T>从当前行数据拷贝一行新数据。</T>
 *
 * @method
 * @param v:value:String 要查找的内容
 * @return Boolean
 *    <L value='true'>含有</L>
 *    <L value='false'>不含有</L>
 **********************************************************/
function TTempRow_copy(){
   var o = this;
   var r = new TTempRow(o.dataset);
   r.index = o.index;
   r.status = o.status;
   r.uniqueId = o.uniqueId;
   RArray.copy(o.values, r.values);
   return r;
}

/***********************************************************
 * <T>获得指定索引位置的数据名称。</T>
 *
 * @method
 * @param n:index:Integer 索引位置
 * @return String 数据名称
 **********************************************************/
function TTempRow_name(idx){
   var d = this.dataset;
   return (idx>=0 && idx<d.fieldCount) ? d.names[idx] : null;
}

/***********************************************************
 * <T>获得指定索引位置的数据内容。</T>
 *
 * @method
 * @param n:index:Integer 索引位置
 * @return String 数据内容
 **********************************************************/
function TTempRow_value(idx){
   var o = this;
   var d = o.dataset;
   return (idx>=0 && idx<d.fieldCount) ? o.values[idx] : null;
}

/***********************************************************
 * <T>获得指定数据名称的数据内容。</T>
 * <P>如果数据不存在的时候，返回默认内容。</P>
 *
 * @method
 * @param n:name:String 数据名称
 * @param v:value:String 默认内容
 * @return String 数据内容
 **********************************************************/
function TTempRow_get(n, v){
   if(null != n){
      var o = this;
      var i = o.dataset.table[n.toString().toLowerCase()];
      if(null != i){
         return o.values[i];
      }
   }
   return v;
}

/***********************************************************
 * <T>获得指定数据名称的非空数据内容。</T>
 * <P>如果数据不存在或为空的时候，返回默认内容。</P>
 * <P>如果未设置默认内容，则返回空字符串。</P>
 *
 * @method
 * @param n:name:String 数据名称
 * @param v:value:String 默认内容
 * @return String 数据内容
 **********************************************************/
function TTempRow_nvl(n, v){
   return RString.nvl(this.get(n), v);
}

/***********************************************************
 * <T>设定数据名称和数据内容。</T>
 *
 * @method
 * @param n:name:String 数据名称
 * @param v:value:String 数据内容
 **********************************************************/
function TTempRow_set(n, v){
   if(null != n){
      var o = this;
      var d = o.dataset;
      var l = n.toString().toLowerCase();
      var i = d.table[l];
      if(null == i || i >= d.fieldCount){
         i = d.fieldCount++;
         d.names[i] = n;
         d.table[l] = i;
      }
      o.values[i] = v;
   }
}

/***********************************************************
 * <T>设置索引位置的数据内容。</T>
 *
 * @method
 * @param n:index:Integer 索引位置
 * @param v:value:String 数据内容
 **********************************************************/
function TTempRow_setValue(n, v){
   var o = this;
   if(n>=0 && n<o.dataset.fieldCount){
      o.values[n] = v;
   }
}

/***********************************************************
 * <T>追加一个行数据对象到当前对象内。</T>
 *
 * @method
 * @param r:row:TTempRow 行数据对象
 **********************************************************/
function TTempRow_append(r){
   if(r){
      var c = r.count;
      for(var n=0; n<c; n++){
         this.set(r.name(n), r.value(n));
      }
   }
}

/***********************************************************
 * <T>加载一个XML节点到当前行数据中。</T>
 *
 * @method
 * @param n:n:TNode 指定的节点对象
 **********************************************************/
function TTempRow_loadNode(n){
   var o = this;
   if(n && n.attrs){
      o.append(n.attrs);
      o.index = o.get('_ID');
      o.status = o.get('_STATUS');
      o.uniqueId = o.get('OUID');
   }
}

/***********************************************************
 * <T>将当前行数据中的数据内容存储到一个节点上。</T>
 *
 * @method
 * @param c:config:TNode 数据节点
**********************************************************/
function TTempRow_saveNode(n){
   if(n){
      var o = this;
      // 存储行数据的状态
      n.set('_ID', o.index);
      n.set('_STATUS', o.status);
      // 存储行数据的所有属性
      var d = o.dataset;
      var c = d.fieldCount;
      for(var i=0; i<c; i++){
         n.set(d.names[i], o.values[i]);
      }
   }
}

/***********************************************************
 * <T>将当前行记录中的数据内容转化为属性表。</T>
 *
 * @method
 * @return TAttributes 属性表
 **********************************************************/
function TTempRow_toAttributes(){
   var o = this;
   var a = new TAttributes();
   // 存储行数据的状态
   a.set(RDataset.ROW_STATUS, o.status);
   // 存储行数据的所有属性
   var d = o.dataset;
   var c = d.fieldCount;
   for(var n=0; n<c; n++){
      a.set(d.names[n], o.values[n]);
   }
   return a;
}

/***********************************************************
 * <T>获得数组的内部信息。</T>
 *
 * @method
 * @return String 信息字符串
 **********************************************************/
function TTempRow_toString(){
   return this.dump().toString();
}

/***********************************************************
 * <T>获得当前对象内的调试信息。</T>
 *
 * @method
 * @param d:dump:TString 调试字符串
 * @return TString 调试信息
 **********************************************************/
function TTempRow_dump(s){
   var o = this;
   var d = o.dataset;
   var c = d.fieldCount;
   s = RString.nvlStr(s);
   s.append(RClass.name(o), ' [', o.status, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(d.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
function TTempRow_ouid(){
   return this.get('OUID');
}
function TTempRow_over(){
   return this.get('OVER');
}
