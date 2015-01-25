//==========================================================
// <T>数据集。</T>
// <P>页索引和记录索引都是从0开始计数。</P>
//
// @tool
// @author maocy
// @version 150124
//==========================================================
function TDataset(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute String 名称
   //o._name      = null;
   // @attribute Integer 页面大小
   //o._pageSize  = 20;
   // @attribute Integer 页面索引
   //o._pageIndex = 0;
   // @attribute Integer 页面总数
   //o._pageCount = 0;
   // @attribute Integer 记录总数
   //o._total     = 0;
   // @attribute TObjects<TRow> 行记录的列表
   o._rows      = new TObjects();
   //..........................................................
   // @method
   o.isEmpty    = TDataset_isEmpty;
   // @method
   o.createRow  = TDataset_createRow;
   o.count      = TDataset_count;
   o.row        = TDataset_row;
   o.rows       = TDataset_rows;
   o.find       = TDataset_find;
   o.push       = TDataset_push;
   o.loadConfig = TDataset_loadConfig;
   o.clear      = TDataset_clear;



   //o.findIndex  = TDataset_findIndex;
   //o.remove     = TDataset_remove;
   //o.removeRow  = TDataset_removeRow;
   //o.saveViewer = TDataset_saveViewer;
   //o.pack       = TDataset_pack;
   //o.dump       = TDataset_dump;
   return o;
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
function TDataset_isEmpty(){
   var o = this;
   return o._rows.isEmpty();
}

//==========================================================
// <T>创建一个新的数据行，并放入当前数据集中。</T>
//
// @method
// @return TRow 数据行
//==========================================================
function TDataset_createRow(){
   var o = this;
   var r = new TRow();
   r._dataset = o;
   o._rows.push(r);
   return r;
}

//==========================================================
// <T>获得数据行总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
function TDataset_count(){
   return this._rows.count();
}

//==========================================================
// <T>获得索引位置的数据行。</T>
//
// @method
// @param p:index:Integer 索引位置
// @return TRow 数据行
//==========================================================
function TDataset_row(p){
   return this._rows.get(p);
}

//==========================================================
// <T>获得数据行集合。</T>
//
// @method
// @return TObjects<TRow> 数据行集合
//==========================================================
function TDataset_rows(){
   return this._rows;
}

//==========================================================
// <T>根据名称和内容查找对应的行数据记录。</T>
//
// @method
// @param p:parameters:String... 参数集合
// @return TRow 数据行对象
//==========================================================
function TDataset_find(p){
   var o = this;
   var a = arguments;
   // 字段名称和字段内容必须成对出现
   var l = a.length;
   if((l % 2) != 0){
      throw new TError(o, 'Parameters must is pairs (length={1})', l);
   }
   // 查找所有的数据
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var f = true;
      for(var i = 0; i < l; i += 2){
         if(r.get(a[n]) != a[n + 1]){
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
// <T>追加一个行对象。</T>
//
// @method
// @param r:row:TRow 行对象
//==========================================================
function TDataset_push(r){
   this._rows.push(r);
}

//==========================================================
// <T>加载配置信息到数据集中，不覆盖当前数据。</T>
//
// @method
// @param x:config:TXmlNode 配置节点
//==========================================================
function TDataset_loadConfig(x){
   var o = this;
   // 获得数据集信息
   o._name = x.get('name');
   o._pageSize = RInteger.parse(x.get('page_size', 1000));
   o._pageIndex = RInteger.parse(x.get('page', 0));
   o._pageCount = RInteger.parse(x.get('page_count', 1));
   o._total = RInteger.parse(x.get('total'));
   // 加载数据行记录
   var xns = x.nodes();
   if(xns){
      var rs = o._rows;
      var xnc = xns.count();
      for(var i = 0; i < xnc; i++){
         var xn = xns.get(i);
         if(xn.isName('Row')){
            var r = o.createRow();
            r.loadConfig(xn);
            // 察看原来的缓冲中是否有数据行，有则使用旧对象
            //var r = rs.memory[n];
            //if(!r){
            //   var r = new TRow();
            //   r.dataset = o;
            //   rs._count = n;
            //   rs.push(r);
            //}else{
            //   r.release();
            //}
            // 加载行对象的数据
            //r.loadNode(xr);
         }
      }
      //rs._count = xrc;
   }
}

//==========================================================
// <T>清除所有数据行。</T>
//
// @method
//==========================================================
function TDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}











//==========================================================
// <T>获得指定索引内容的数据行。</T>
//
// @method
// @param p:index:Integer 索引位置
// @return TRow 数据行
//==========================================================
function TDataset_findIndex(p){
   var o = this;
   var rs = o._rows;
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      if(r._index = p){
         return r;
      }
   }
   return null;
}

//==========================================================
// <T>从数据内容行数组里移除指定索引位置的数据行。</T>
//
// @method
// @param i:index:Integer 索引位置
// @return TRow 移除的数据行对象
//==========================================================
function TDataset_remove(i){
   return this._rows.remove(i);
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
      o._rows.remove(i);
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
   v.datasetName = o._name;
   v.datasetId = o.id;
   v.position = 0;
   v.start = 0;
   v._count = o._rows._count;
   v._rows = o._rows;
   v.dataset = o;
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
   var rs = o._rows;
   var ss = new TStrings();
   for(var n = 0; n < rs._count; n++){
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
   r.append(RClass._name(o));
   r.append(' count=', o._count);
   r.append(' fields=', o.fieldCount);
   r.appendLine();
   if(o._rows){
      var c = o._count;
      for(var n = 0; n < c; n++){
         r.append('- ');
         o._rows.get(n).dump(s);
         if(n != o._count-1){
            r.appendLine();
         }
      }
   }
   return r.toString();
}
