//==========================================================
// <T>用来存储单条数据内容的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TRow(o){
   if(!o){o = this;}
   TAttributes(o);
   // Attribute
   o.dataset       = ds;
   o.index         = null;
   o.uniqueId      = null;
   o.status        = null;
   // Method
   o.loadNode      = TRow_loadNode;
   o.saveNode      = TRow_saveNode;
   o.copy          = TRow_copy;
   o.toAttributes  = TRow_toAttributes;
   o.dump          = TRow_dump;
   return o;
}

//==========================================================
// <T>加载一个数据节点到当前行数据中。</T>
//
// @method
// @param x:node:TNode 指定的节点对象
//==========================================================
function TRow_loadNode(x){
   if(x && x.attrs){
      var o = this;
      o.index = x.get('_id');
      o.status = x.get('_status');
      o.uniqueId = x.get('ouid');
      o.append(x.attrs);
   }
}

//==========================================================
// <T>将当前行数据中的数据内容存储到一个数据节点上。</T>
//
// @method
// @param x:node:TNode 数据节点
//==========================================================
function TRow_saveNode(x){
   if(x){
      var o = this;
      // 存储行数据的状态
      x.set('_id', o.index);
      x.set('_status', o.status);
      // 存储行数据的所有属性
      var c = o.count;
      for(var n=0; n<c; n++){
         x.set(o.names[n], o.values[n]);
      }
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
   r.dataset = o.dataset;
   r.index = o.index;
   r.status = o.status;
   r.uniqueId = o.uniqueId;
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
   a.set(RDataset.ROW_STATUS, o.status);
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
   s.append(RClass.name(o), ' [', o.status, ': ');
   for(var n=0; n<c; n++){
      if(n > 0){
         s.append(',');
      }
      s.append(o.names[n], '=', o.values[n]);
   }
   s.append(']');
   return s;
}
