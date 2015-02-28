//==========================================================
// <T>数据行。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TRow(o){
   if(!o){o = this;}
   TAttributes(o);
   //..........................................................
   // @attribute
   o._dataset   = null;
   o._index     = null;
   o._uniqueId  = null;
   o._statusCd  = null;
   //..........................................................
   // @method
   o.loadConfig = TRow_loadConfig;
   o.saveConfig = TRow_saveConfig;
   //o.copy         = TRow_copy;
   //o.toAttributes = TRow_toAttributes;
   //o.dump         = TRow_dump;
   return o;
}

//==========================================================
// <T>加载一个数据节点到当前行数据中。</T>
//
// @method
// @param x:node:TNode 指定的节点对象
//==========================================================
function TRow_loadConfig(x){
   var o = this;
   o._index = x.get('_id');
   o._statusCd = x.get('_status');
   o._uniqueId = x.get('ouid');
   if(x.hasAttribute()){
      o.append(x.attributes());
   }
}

//==========================================================
// <T>将当前行数据中的数据内容存储到一个数据节点上。</T>
//
// @method
// @param x:node:TNode 数据节点
//==========================================================
function TRow_saveConfig(x){
   var o = this;
   // 存储行数据的状态
   x.set('_id', o._index);
   x.set('_status', o._statusCd);
   // 存储行数据的所有属性
   var c = o.count();
   for(var i = 0; i < c; i++){
      x.set(o._names[i], o._values[i]);
   }
}

//==========================================================
// <T>生成当前行数据的一个副本。</T>
//
// @method
// @param x:node:TNode 数据节点
//==========================================================
function TRow_copy(){
   var o = this;
   // 复制信息
   var r = new TRow();
   r._dataset = o._dataset;
   r._index = o._index;
   r._statusCd = o._statusCd;
   r._uniqueId = o._uniqueId;
   // 存储行数据
   var c = o.count;
   for(var n=0; n<c; n++){
      r.set(o.names[n], o.values[n]);
   }
   return r;
}

//==========================================================
// <T>将当前行记录中的数据内容转化为属性表。</T>
//
// @method
// @param a:attributes:TAttributes 属性表
// @return TAttributes 属性表
//==========================================================
function TRow_toAttributes(a){
   var o = this;
   // 获得属性表
   if(!a){
      a = new TAttributes();
   }
   // 存储行状态
   a.set(RDataset.ROW_STATUS, o._statusCd);
   // 存储行数据
   a.append(o);
   return a;
}

//==========================================================
// <T>获得当前对象内的调试信息。</T>
//
// @method
// @param d:dump:TString 调试字符串
// @return TString 调试信息
//==========================================================
function TRow_dump(s){
   var o = this;
   var c = o.count;
   s = RString.nvlStr(s);
   s.append(RClass.name(o), ' [', o._statusCd, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
