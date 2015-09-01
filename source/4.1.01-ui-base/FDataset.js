//==========================================================
// <T>数据集合。</T>
//
// @tool
// @author maocy
// @version 150901
//==========================================================
MO.FDataset = function FDataset(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute 代码
   o._name        = MO.Class.register(o, new MO.AGetSet('_name'));
   // @attribute 页面大小
   o._pageSize    = MO.Class.register(o, new MO.AGetSet('_pageSize'), 20);
   // @attribute 页面索引
   o._pageIndex   = MO.Class.register(o, new MO.AGetter('_pageIndex'));
   // @attribute 页面总数
   o._pageCount   = MO.Class.register(o, new MO.AGetter('_pageCount'));
   // @attribute 记录总数
   o._total       = MO.Class.register(o, new MO.AGetter('_total'));
   // @attribute 行集合
   o._rows        = MO.Class.register(o, new MO.AGetter('_rows'));
   // @attribute 可见集合
   o._viewers     = MO.Class.register(o, new MO.AGetter('_viewers'));
   //..........................................................
   // @method
   o.construct    = MO.FDataset_construct;
   // @method
   o.isEmpty      = MO.FDataset_isEmpty;
   o.count        = MO.FDataset_count;
   o.createRow    = MO.FDataset_createRow;
   o.row          = MO.FDataset_row;
   o.rows         = MO.FDataset_rows;
   o.find         = MO.FDataset_find;
   o.findIndex    = MO.FDataset_findIndex;
   o.push         = MO.FDataset_push;
   o.erase        = MO.FDataset_erase;
   o.remove       = MO.FDataset_remove;
   // @method
   o.createViewer = MO.FDataset_createViewer;
   // @method
   o.loadConfig   = MO.FDataset_loadConfig;
   o.saveConfig   = MO.FDataset_saveConfig;
   // @method
   o.clear        = MO.FDataset_clear;
   // @method
   o.dispose      = MO.FDataset_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDataset_construct = function FDataset_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._rows = new MO.TObjects();
   o._viewers = new MO.TObjects();
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.FDataset_isEmpty = function FDataset_isEmpty(){
   return this._rows.isEmpty();
}

//==========================================================
// <T>获得数据行总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
MO.FDataset_count = function FDataset_count(){
   return this._rows.count();
}

//==========================================================
// <T>创建一个新的数据行。</T>
//
// @method
// @return FDataRow 数据行
//==========================================================
MO.FDataset_createRow = function FDataset_createRow(){
   var o = this;
   var row = MO.Class.create(MO.FDataRow);
   row.setDataset(o);
   o._rows.push(row);
   return row;
}

//==========================================================
// <T>获得索引位置的数据行。</T>
//
// @method
// @param index:Integer 索引位置
// @return FDataRow 数据行
//==========================================================
MO.FDataset_row = function FDataset_row(index){
   return this._rows.get(index);
}

//==========================================================
// <T>获得数据行集合。</T>
//
// @method
// @return TObjects<FDataRow> 数据行集合
//==========================================================
MO.FDataset_rows = function FDataset_rows(){
   return this._rows;
}

//==========================================================
// <T>根据名称和内容查找对应的行数据记录。</T>
//
// @method
// @return FDataRow 数据行对象
//==========================================================
MO.FDataset_find = function FDataset_find(){
   var o = this;
   // 字段名称和字段内容必须成对出现
   var length = arguments.length;
   if((length % 2) != 0){
      throw new MO.TError(o, 'Parameters must is pairs (length={1})', length);
   }
   // 查找所有的数据
   var rows = o._rows;
   var count = rows.count();
   for(var n = 0; n < count; n++){
      var row = rows.at(n);
      // 查找当前行是否符合条件
      var find = true;
      for(var i = 0; i < length; i += 2){
         var parameterName = arguments[n];
         var parameterValue = arguments[n + 1];
         var findValue = row.get(parameterName)
         if(findValue != parameterValue){
            find = false;
            break;
         }
      }
      if(find){
         return row;
      }
   }
   return null;
}

//==========================================================
// <T>获得指定索引内容的数据行。</T>
//
// @method
// @param index:Integer 索引位置
// @return FDataRow 数据行
//==========================================================
MO.FDataset_findIndex = function FDataset_findIndex(index){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var n = 0; n < count; n++){
      var row = rows.at(n);
      var rowIndex = row.index();
      if(rowIndex = index){
         return row;
      }
   }
   return null;
}

//==========================================================
// <T>增加一个行对象。</T>
//
// @method
// @param row:FDataRow 行对象
//==========================================================
MO.FDataset_push = function FDataset_push(row){
   this._rows.push(row);
}

//==========================================================
// <T>从数据内容行数组里移除指定索引位置的数据行。</T>
//
// @method
// @param index:Integer 索引位置
// @return FDataRow 移除的数据行对象
//==========================================================
MO.FDataset_erase = function FDataset_erase(index){
   return this._rows.remove(index);
}

//==========================================================
// <T>从数据内容行数组里移除指定的数据行。</T>
//
// @method
// @param row:FDataRow 指定移除的数据行
//==========================================================
MO.FDataset_remove = function FDataset_remove(row){
   this._rows.remove(row);
}

//==========================================================
// <T>创建数据视图。</T>
//
// @method
// @param offset:Integer 位置
// @param count:Integer 总数
// @return FDatasetViewer 数据视图
//==========================================================
MO.FDataset_createViewer = function FDataset_createViewer(offset, count){
   var o = this;
   var viewer = MO.Class.create(MO.FDatasetViewer);
   viewer.setDataset(o);
   viewer.setOffset(MO.Runtime.nvl(offset, 0));
   viewer.setCount(MO.Runtime.nvl(count, o._rows.count()));
   o._viewers.push(viewer);
   return row;
}

//==========================================================
// <T>加载配置信息到数据集中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataset_loadConfig = function FDataset_loadConfig(xconfig){
   var o = this;
   debugger
   // 获得数据集信息
   o._code = x.get('name');
   o._pageSize = MO.Lang.Integer.parse(x.get('page_size', 1000));
   o._pageIndex = MO.Lang.Integer.parse(x.get('page', 0));
   o._pageCount = MO.Lang.Integer.parse(x.get('page_count', 1));
   o._total = MO.Lang.Integer.parse(x.get('total'));
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
            //   var r = new FDataRow();
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
// <T>保存配置信息到数据集中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FDataset_saveConfig = function FDataset_saveConfig(xconfig){
   var o = this;
   // 获得数据集信息
   xconfig.set('name', o._name);
   // 加载数据行记录
   var rows = o._rows;
   var count = rows.count();
   for(var i = 0; i < count; i++){
      var row = rows.at(i);
      row.saveConfig(xconfig.create('Row'));
   }
}

//==========================================================
// <T>清除所有数据行。</T>
//
// @method
//==========================================================
MO.FDataset_clear = function FDataset_clear(){
   var o = this;
   o._pageSize = 20;
   o._pageIndex = 0;
   o._pageCount = 0;
   o._total = 0;
   o._rows.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDataset_dispose = function FDataset_dispose(){
   var o = this;
   o._values = MO.Lang.Object.dispose(o._values);
   o.__base.FObject.dispose.call(o);
}
