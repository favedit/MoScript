//==========================================================
// <T>用来存储页面数据内容的工具类。</T>
// <P>页的索引和记录的索引都是从0开始计数。</P>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TDataset(){
   if(!o){o = this;}
   //..........................................................
   // @attribute String 名称
   o.name       = null;
   // @attribute Integer 当前页的记录行数
   o.count      = 0;
   // @attribute Integer 页面大小
   o.pageSize   = 20;
   // @attribute Integer 页面索引
   o.pageIndex  = 0;
   // @attribute Integer 页面总数
   o.pageCount  = 0;
   // @attribute Integer 记录总数
   o.total      = 0;
   // @attribute TList<TRow> 行记录的列表
   o.rows       = new TList();
   //..........................................................
   // @method
   o.createRow  = TDataset_createRow;
   o.row        = TDataset_row;
   o.find       = TDataset_find;
   o.findIndex  = TDataset_findIndex;
   o.push       = TDataset_push;
   o.remove     = TDataset_remove;
   o.removeRow  = TDataset_removeRow;
   o.loadNode   = TDataset_loadNode;
   o.saveViewer = TDataset_saveViewer;
   o.clear      = TDataset_clear;
   o.pack       = TDataset_pack;
   o.dump       = TDataset_dump;
   return o;
}

//==========================================================
// <T>创建一个新的行对象，并放入当前数据集中。</T>
//
// @method
//==========================================================
function TDataset_createRow(){
   var o = this;
   var r = new TRow();
   r.dataset = o;
   o.rows.push(r);
   return r;
}

//==========================================================
// <T>获得指定索引位置的数据行对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return TRow 数据行对象
//==========================================================
function TDataset_row(n){
   return (n >= 0 && n < this.count) ? this.rows.get(n) : null;
}

//==========================================================
// <T>根据字段名称和字段内容查找对应的行数据记录。</T>
//
// @method
// @return TRow 数据行对象
//==========================================================
function TDataset_find(){
   var o = this;
   var a = arguments;
   // 字段名称和字段内容必须成对出现
   var l = a.length;
   if(0 != l % 2){
      RMessage.fatal(o, null, 'Parameters must is pairs (length={0})', l);
   }
   // 查找所有的数据
   var rs = o.rows;
   for(var n=rs.count-1; n>=0; n--){
      var r = rs.get(n);
      var f = true;
      for(var i=0; i<l; i+=2){
         if(r.get(a[n]) != a[n+1]){
            f = false;
            break;
         }
      }
      if(f){
         return r;
      }
   }
   return null;
}

//==========================================================
// <T>获得指定索引位置的数据行对象。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return TRow 数据行对象
//==========================================================
function TDataset_findIndex(id){
   var o = this;
   var rs = o.rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.index = id){
         return r;
      }
   }
   return null;
}

//==========================================================
// <T>追加一个行对象。</T>
//
// @method
// @param r:row:TRow 行对象
//==========================================================
function TDataset_push(r){
   this.rows.push(r);
}

//==========================================================
// <T>从数据内容行数组里移除指定索引位置的数据行。</T>
//
// @method
// @param i:index:Integer 索引位置
// @return TRow 移除的数据行对象
//==========================================================
function TDataset_remove(i){
   return this.rows.remove(i);
}

//==========================================================
// <T>从数据内容行数组里移除指定的数据行。</T>
//
// @method
// @param r:ror:TRow 指定移除的数据行
//==========================================================
function TDataset_removeRow(r){
   var o = this;
   var i = o.indexOf(r);
   if(-1 != i){
      o.rows.remove(i);
   }
}

//==========================================================
// <T>加载新的设置节点到数据集中，不覆盖当前数据</T>
//
// @method
// @param x:config:TNode 设置节点
//==========================================================
function TDataset_loadNode(x){
   var o = this;
   // 获得数据集信息
   o.name = x.get('name');
   o.pageSize = RInteger.parse(x.get('page_size', 1000));
   o.pageIndex = RInteger.parse(x.get('page', 0));
   o.pageCount = RInteger.parse(x.get('page_count', 1));
   o.total = RInteger.parse(x.get('total'));
   // 加载数据行记录
   var xrs = x.nodes;
   if(xrs){
      var rs = o.rows;
      var xrc = o.count = xrs.count;
      for(var n=0; n<xrc; n++){
         var xr = xrs.get(n);
         if(xr.isName(RDataset.ROW)){
            // 察看原来的缓冲中是否有数据行，有则使用旧对象
            var r = rs.memory[n];
            if(!r){
               var r = new TRow();
               r.dataset = o;
               rs.count = n;
               rs.push(r);
            }else{
               r.release();
            }
            // 加载行对象的数据
            r.loadNode(xr);
         }
      }
      rs.count = xrc;
   }
}

//==========================================================
// <T>将当前数据页存入数据观察器。</T>
//
// @method
// @param v:viewer:TDatasetViewer 数据观察器
//==========================================================
function TDataset_saveViewer(v){
   var o = this;
   v.datasetName = o.name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v.count = o.rows.count;
   v.rows = o.rows;
   v.dataset = o;
}

//==========================================================
// <T>清除所有数据行。</T>
//
// @method
//==========================================================
function TDataset_clear(){
   var o = this;
   o.rows.clear();
   o.pageSize = 20;
   o.pageIndex = 0;
   o.count = 0;
   o.pageCount = 0;
   o.total = 0;
}

//==========================================================
// <T>获得当前对象内的调试信息。</T>
//
// @method
// @param d:dump:TString 调试字符串
// @return TString 调试信息
//==========================================================
function TDataset_pack(){
   var o = this;
   var rs = o.rows;
   var ss = new TStrings();
   for(var n = 0; n < rs.count; n++){
      ss.push(rs.get(n).pack());
   }
   return ss.pack();
}

//==========================================================
// <T>获得当前对象内的调试信息。</T>
//
// @method
// @param d:dump:TString 调试字符串
// @return TString 调试信息
//==========================================================
function TDataset_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   r.append(' count=', o.count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o.rows){
      var c = o.count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o.rows.get(n).dump(s);
         if(n != o.count-1){
            r.appendLine();
         }
      }
   }
   return r.toString();
}
