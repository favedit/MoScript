//==========================================================
// <T>表格内的行对象。</T>
//
// @class FContainer
// @author maochunyang
// @version 1.0.1
//==========================================================
function FRowControl(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @style
   o.stHover          = RClass.register(o, new TStyle('Hover'));
   o.stSelect         = RClass.register(o, new TStyle('Select'));
   //..........................................................
   // @attribute
   o.__statusCell     = null;
   o.__clearProcess   = null;
   o.__resetProcess   = null;
   o.__loadProcess    = null;
   o.__saveProcess    = null;
   o.__recordProcess  = null;
   o.__visible        = true;
   //..........................................................
   // @attribute FGridControl 表控件
   o.table            = null;
   // @attribute TMap 单元格
   o.cells            = null;
   // @attribute TList 子数据行
   o.rows             = null;
   /// @attribute TAttributes 属性集合
   o.attributes       = null;
   o.selectAble       = true;
   // @attribute
   o.status           = ERowStatus.Update;
   // @attribute Boolean 是否已经选中
   o.isSelect         = false;
   // @attribute Integer 层级
   o.level            = 0;
   // @attribute Boolean 是否存在
   o.existed          = false;
   // @attribute Boolean 是否已经展开
   o.extended         = false;
   // @attribute Boolean 是否已经加载
   o.loaded           = false;
   // @attribute Boolean 是否已经建立
   o.builded          = false;
   //..........................................................
   // @method
   o.construct        = FRowControl_construct;
   o.build            = FRowControl_build;
   o.buildChildren    = FRowControl_buildChildren;
   o.isDataChanged    = FRowControl_isDataChanged;
   o.isVisible        = FRowControl_isVisible;
   o.getIndex         = FRowControl_getIndex;
   o.getId            = FRowControl_getId;
   o.getVersion       = FRowControl_getVersion;
   o.getStatus        = FRowControl_getStatus;
   o.cell             = FRowControl_cell;
   o.get              = FRowControl_get;
   o.reget            = FRowControl_reget;
   o.set              = FRowControl_set;
   o.loadRow          = FRowControl_loadRow;
   o.saveRow          = FRowControl_saveRow;
   o.loadValue        = FRowControl_loadValue;
   o.saveValue        = FRowControl_saveValue;
   o.recordValue      = FRowControl_recordValue;
   o.toAttributes     = FRowControl_toAttributes;
   o.toDeepAttributes = FRowControl_toDeepAttributes;
   o.select           = FRowControl_select;
   o.setVisible       = FRowControl_setVisible;
   o.extend           = FRowControl_extend;
   o.doInsert         = FRowControl_doInsert;
   o.doDelete         = FRowControl_doDelete;
   o.push             = FRowControl_push;
   o.refresh          = FRowControl_refresh;
   o.refreshSize      = RMethod.empty;
   o.refreshStyle     = FRowControl_refreshStyle;
   o.dump             = FRowControl_dump;
   return o;
}
//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FRowControl_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.cells = new TMap();
   o.rows = new TList();
   o.__clearProcess = new TEventProcess(o, 'oeClearValue', MEditValue);
   o.__resetProcess = new TEventProcess(o, 'oeResetValue', MEditValue);
   o.__loadProcess = new TEventProcess(o, 'oeLoadValue', MEditValue);
   o.__saveProcess = new TEventProcess(o, 'oeSaveValue', MEditValue);
   o.__recordProcess = new TEventProcess(o, 'oeRecordValue', MEditValue);
}

//==========================================================
// <T>构建一个行对象的内部页面结构。</T>
//
// @method
//==========================================================
function FRowControl_build(){
   var o = this;
   var t = o.table;
   // 建立行对象
   var hp = o.hPanel = RBuilder.create(null, 'TR', o.style('Panel'));
   t.linkEvent(o, 'onRowMouseEnter', hp, t.onRowMouseEnter);
   t.linkEvent(o, 'onRowMouseLeave', hp, t.onRowMouseLeave);
   // 选取处理
   if(o.table.isLov){
      o.hPanel.style.cursor = 'hand';
   }
   // 建立行内的所有单元格对象
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      o.push(cs.value(n).createCell());
   }
}
//==========================================================
function FRowControl_buildChildren(){
   var o = this;
   var t = o.table;
   // 建立固定行对象
   var hfr = o.hFixPanel = hfp.insertRow(idx);
   hfr.className = o.style('Panel');
   var hr = o.hPanel = hp.insertRow(idx);
   hr.className = o.style('Panel');
   // 建立行内的所有单元格对象
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      var c = cs.value(n);
      var cl = c.createCell(o);
      if(c.dispFixed){
         hfr.appendChild(cl.hPanel);
      }else{
         hr.appendChild(cl.hPanel);
      }
      o.cells.set(c.dataName, cl);
   }
   o.doRefresh()
}

//==========================================================
// <T>检查当前行内的所有数据是否变化过。</T>
//
// @method
// @return Boolean
//    <L value='true'>变化过</L>
//    <L value='false'>未变化</L>
//==========================================================
function FRowControl_isDataChanged(){
   var o = this;
   var cs = o.cells;
   for(var n=cs.count-1; n>=0; n--){
      // 检查数据变化
      if(cs.value(n).isDataChanged()){
         return true;
      }
   }
   return false;
}

//==========================================================
//<T>检查当前行内的所有数据是否变化过。</T>
//
//@method
//@return Boolean
// <L value='true'>变化过</L>
// <L value='false'>未变化</L>
//==========================================================
function FRowControl_isVisible(){
	var o = this;
	return o.__visible;
}

//==========================================================
function FRowControl_getIndex(){
   return this.hPanel.rowIndex;
}

//==========================================================
// <T>获得当前行记录的唯一标识。</T>
//
// @method
// @return String 唯一标识
//==========================================================
function FRowControl_getId(){
   var c = this.cells.get('ouid');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录的对象版本。</T>
//
// @method
// @return String 对象版本
//==========================================================
function FRowControl_getVersion(){
   var c = this.cells.get('over');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录关联的状态单元格对象。</T>
//
// @method
// @return FCellStatus 对状态单元格对象
//==========================================================
function FRowControl_getStatus(){
   return this.__statusCell;
}

//==========================================================
// <T>根据索引获得一个单元格。</T>
//
// @method
// @return String 对象版本
//==========================================================
function FRowControl_cell(n){
   return this.cells.value(n);
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FRowControl_get(n){
   return this.cells.get(n).get();
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得最新数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FRowControl_reget(n){
   return this.cells.get(n).reget();
}

//==========================================================
// <T>根据字段名称，向单元格对象中设置数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @param v:value:String 数据内容
//==========================================================
function FRowControl_set(n, v){
   this.cells.get(n).set(v);
}

//==========================================================
// <T>根据字段名称，向单元格对象中设置数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @param v:value:String 数据内容
//==========================================================
function FRowControl_loadRow(r){
   var o = this;
   // 重置数据
   o.process(o.__clearProcess);
   // 加载数据
   var e = o.__loadProcess;
   e.values = r;
   o.process(e);
}

//==========================================================
function FRowControl_saveRow(r){
   var o = this;
   if(!r){
      r = new TRow();
   }
   // 存储所有单元格数据
   var e = o.__saveProcess;
   e.values = r;
   o.process(e);
   // 存储状态
   r.set('_status', o.status);
   return r;
}
//==========================================================
// value
function FRowControl_loadValue(v){
   this.loadRow(v);
}
//==========================================================
// value
function FRowControl_saveValue(v){
   this.saveRow(v);
}

//==========================================================
function FRowControl_recordValue(){
   // 记录数据
   this.process(this.__recordProcess);
}

//==========================================================
function FRowControl_toAttributes(v){
   this.saveRow(v);
}
//==========================================================
function FRowControl_toDeepAttributes(r){
   var o = this;
   // 获得所有父数据对象
   var ts = new TList();
   var p = o.table;
   while(p){
      if(p != o.table && RClass.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
   }
   // 存储信息
   for(var n=ts.count-1; n>=0; n--){
      var m = ts.get(n);
      if(RClass.isClass(m, FForm)){
         m.toAttributes(r);
      }else if(RClass.isClass(m, FTable)){
         var rs = m.getSelectRows();
         if(1 != rs.count){
            return RMessage.fatal(o, 'Invalid selected rows. (count={0})', rs.count);
         }
         rs.get(0).toAttributes(r);
      }
   }
   // 设置当前行信息
   o.toAttributes(r);
}

//==========================================================
// 选择一行时，遍历所有的cell 更改样式表
//
// @method
//==========================================================
function FRowControl_select(v){
   var o = this;
   o.isSelect = v;
   // 设置背景颜色
   o.hPanel.style.backgroundColor = v ? EColor.RowSelect : EColor.Row;
   // 刷新所有单元格颜色
   o.refreshStyle();
}
//==========================================================-
// row
function FRowControl_setVisible(f){
   var o = this;
   o.__visible = f;
   o.hPanel.style.display = f ? 'block' : 'none';
}

//==========================================================
function FRowControl_extend(v){
   var o = this;
   var rs = o.rows;
   if(rs && rs.count){
      var rc = rs.count;
      for(var n=0; n<rc; n++){
         var r = rs.get(n);
         if(v){
            r.setVisible(true);
            r.extend(r.extended);
         }else{
            r.setVisible(false);
         }
         r.refresh();
      }
   }
   o.extended = v;
}
//==========================================================
function FRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
//==========================================================
function FRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}

//==========================================================
// <T>当前行控件内增加一个单元格控件。</T>
//
// @method
// @params c:cell:TCell 单元格
//==========================================================
function FRowControl_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   // 设置单元格信息
   c.row = o;
   o.cells.set(c.column.dataName, c);
   // 关联状态单元格
   if(RClass.isClass(c, FCellStatus)){
      o.__statusCell = c;
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
function FRowControl_refreshStyle(){
   var o = this;
   var cs = o.cells;
   if(cs){
      for(var n=cs.count-1; n>=0; n--){
         cs.value(n).refreshStyle();
      }
   }
}

//==========================================================
// <T>获得的运行信息。</T>
//
// @method
// @param d:dump:TString 调试信息
// @return 调试信息
//==========================================================
function FRowControl_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.isSelect ? 'S' : '_');
   s.append(']');
   s.append(o.saveRow().dump());
   return s;
}
