//==========================================================
// <T>行控件。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.FDuiGridRowControl = function FDuiGridRowControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataContainer);
   //..........................................................
   // @attribute 单元格字典
   o._table          = MO.Class.register(o, new MO.AGetSet('_table'));
   o._cells          = MO.Class.register(o, new MO.AGetter('_cells'));
   // @attribute 子数据行
   o._rows           = null;
   // @attribute
   o._clearProcess   = null;
   o._resetProcess   = null;
   o._loadProcess    = null;
   o._saveProcess    = null;
   o._recordProcess  = null;
   // @attribute
   o._statusCell     = null;
   // @attribute
   o._statusSelect   = false;
   //..........................................................
   // @event
   o.onBuildPanel    = MO.FDuiGridRowControl_onBuildPanel;
   o.onBuild         = MO.FDuiGridRowControl_onBuild;
   //..........................................................
   // @method
   o.construct       = MO.FDuiGridRowControl_construct;
   // @method
   o.testDataChanged = MO.FDuiGridRowControl_testDataChanged;
   o.setVisible      = MO.FDuiGridRowControl_setVisible;
   // @method
   o.get             = MO.FDuiGridRowControl_get;
   o.set             = MO.FDuiGridRowControl_set;
   // @method
   o.appendChild     = MO.FDuiGridRowControl_appendChild;
   o.cell            = MO.FDuiGridRowControl_cell;
   o.push            = MO.FDuiGridRowControl_push;
   o.select          = MO.FDuiGridRowControl_select;
   o.refreshStyle    = MO.FDuiGridRowControl_refreshStyle;
   // @method
   o.loadDataRow     = MO.FDuiGridRowControl_loadDataRow;
   o.saveDataRow     = MO.FDuiGridRowControl_saveDataRow;


   //..........................................................
   // @style
   //o.stHover          = MO.Class.register(o, new TStyle('Hover'));
   //o.stSelect         = MO.Class.register(o, new TStyle('Select'));
   //o._visible         = true;
   //..........................................................
   // @attribute FGridControl 表控件
   /// @attribute TAttributes 属性集合
   //o.attributes       = null;
   //o.selectAble       = true;
   // @attribute
   //o.status           = ERowStatus.Update;
   // @attribute Integer 层级
   //o.level            = 0;
   // @attribute Boolean 是否存在
   //o.existed          = false;
   // @attribute Boolean 是否已经展开
   //o.extended         = false;
   // @attribute Boolean 是否已经加载
   //o.loaded           = false;
   // @attribute Boolean 是否已经建立
   //o.builded          = false;
   //..........................................................
   // @method
   //o.build            = FDuiGridRowControl_build;
   //o.buildChildren    = FDuiGridRowControl_buildChildren;
   //o.isVisible        = FDuiGridRowControl_isVisible;
   //o.getIndex         = FDuiGridRowControl_getIndex;
   //o.getId            = FDuiGridRowControl_getId;
   //o.getVersion       = FDuiGridRowControl_getVersion;
   //o.getStatus        = FDuiGridRowControl_getStatus;
   //o.reget            = FDuiGridRowControl_reget;
   //o.loadValue        = FDuiGridRowControl_loadValue;
   //o.saveValue        = FDuiGridRowControl_saveValue;
   //o.recordValue      = FDuiGridRowControl_recordValue;
   //o.toAttributes     = FDuiGridRowControl_toAttributes;
   //o.toDeepAttributes = FDuiGridRowControl_toDeepAttributes;
   //o.extend           = FDuiGridRowControl_extend;
   //o.doInsert         = FDuiGridRowControl_doInsert;
   //o.doDelete         = FDuiGridRowControl_doDelete;
   //o.refresh          = FDuiGridRowControl_refresh;
   //o.refreshSize      = RMethod.empty;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridRowControl_onBuildPanel = function FDuiGridRowControl_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(event, o.styleName('Panel'));
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridRowControl_onBuild = function FDuiGridRowControl_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   // 建立行对象
   var table = o._table;
   var hPanel = o._hPanel;
   //table.linkEvent(o, 'onRowMouseEnter', hPanel, table.onRowMouseEnter);
   //table.linkEvent(o, 'onRowMouseLeave', hPanel, table.onRowMouseLeave);
   // 选取处理
   //if(o._table.isLov){
   //   o._hPanel.style.cursor = 'hand';
   //}
   // 建立行内的所有单元格对象
   var columns = table._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      var cell = column.createCell();
      o.push(cell);
   }
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FDuiGridRowControl_construct = function FDuiGridRowControl_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   // 构造属性
   o._cells = new MO.TDictionary();
   o._rows = new MO.TObjects();
   // 创建事件
   o._clearProcess = new MO.TEventProcess(null, o, 'oeClearValue', MO.MUiEditValue);
   o._resetProcess = new MO.TEventProcess(null, o, 'oeResetValue', MO.MUiEditValue);
   o._loadProcess = new MO.TEventProcess(null, o, 'oeLoadValue', MO.MUiEditValue);
   o._saveProcess = new MO.TEventProcess(null, o, 'oeSaveValue', MO.MUiEditValue);
   o._recordProcess = new MO.TEventProcess(null, o, 'oeRecordValue', MO.MUiEditValue);
}

//==========================================================
// <T>检查当前行内的所有数据是否变化过。</T>
//
// @method
// @return Boolean 是否变化
//==========================================================
MO.FDuiGridRowControl_testDataChanged = function FDuiGridRowControl_testDataChanged(){
   var o = this;
   var cells = o._cells;
   var count = cells.count();
   for(var i = 0; i < count; i++){
      var cell = cells.at(i);
      if(cell.testDataChanged()){
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param visible:Boolean 是否显示
//==========================================================
MO.FDuiGridRowControl_setVisible = function FDuiGridRowControl_setVisible(visible){
   var o = this;
   o._visible = visible;
   // 设置控件底板的可见性
   var hPanel = o._hPanel;
   if(hPanel){
      MO.Window.Html.displaySet(hPanel, visible);
   }
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得数据内容。</T>
//
// @method
// @param name:String 字段名称
// @return String 数据内容
//==========================================================
MO.FDuiGridRowControl_get = function FDuiGridRowControl_get(name){
   return this._cells.get(name).get();
}

//==========================================================
// <T>根据字段名称，向单元格对象中设置数据内容。</T>
//
// @method
// @param name:String 字段名称
// @param value:String 数据内容
//==========================================================
MO.FDuiGridRowControl_set = function FDuiGridRowControl_set(name, value){
   this._cells.get(name).set(value);
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @return control:FControl 控件
//==========================================================
MO.FDuiGridRowControl_appendChild = function FDuiGridRowControl_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 增加单元格
   var column = control.column();
   var fixed = column.optionFixed();
   if(!fixed){
      o._hPanel.appendChild(control._hPanel);
   }
}

//==========================================================
// <T>根据索引获得一个单元格。</T>
//
// @method
// @param index:Integer 索引位置
// @return FDuiCell 单元格
//==========================================================
MO.FDuiGridRowControl_cell = function FDuiGridRowControl_cell(index){
   return this._cells.value(index);
}

//==========================================================
// <T>增加一个子组件。</T>
//
// @method
// @param component:FDuiComponent 组件
//==========================================================
MO.FDuiGridRowControl_push = function FDuiGridRowControl_push(component){
   var o = this;
   o.__base.FDuiContainer.push.call(o, component);
   // 设置单元格信息
   var column = component.column();
   component._row = o;
   o._cells.set(column._dataName, component);
   // 关联状态单元格
   if(MO.Class.isClass(component, MO.FDuiCellStatus)){
      o._statusCell = component;
   }
}

//==========================================================
// <T>选中当前行。</T>
//
// @method
// @param value:Boolean 选中状态
//==========================================================
MO.FDuiGridRowControl_select = function FDuiGridRowControl_select(value){
   var o = this;
   o._statusSelect = value;
   // 设置背景颜色
   o._hPanel.style.backgroundColor = value ? EColor._rowselect : EColor.Row;
   // 刷新所有单元格颜色
   o.refreshStyle();
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiGridRowControl_refreshStyle = function FDuiGridRowControl_refreshStyle(){
   var o = this;
   var cells = o._cells;
   if(cells){
      var count = cells.count();
      for(var i = 0; i < count; i++){
         var cell = cells.at(i);
         cell.refreshStyle();
      }
   }
}

//==========================================================
// <T>加载数据行。</T>
//
// @method
// @param dataRow:FDataRow 数据行
//==========================================================
MO.FDuiGridRowControl_loadDataRow = function FDuiGridRowControl_loadDataRow(dataRow){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadDataRow', MO.FDuiCell);
   event.dataRow = dataRow;
   o.process(event);
   event.dispose();
}

//==========================================================
// <T>保存数据行。</T>
//
// @method
// @param dataRow:FDataRow 数据行
//==========================================================
MO.FDuiGridRowControl_saveDataRow = function FDuiGridRowControl_saveDataRow(dataRow){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveDataRow', MO.FDuiCell);
   event.dataRow = dataRow;
   o.process(event);
   event.dispose();
}





















//==========================================================
MO.FDuiGridRowControl_buildChildren = function FDuiGridRowControl_buildChildren(){
   var o = this;
   var t = o.table;
   // 建立固定行对象
   var hfr = o.hFixPanel = hfp.insertRow(idx);
   hfr.className = o.style('Panel');
   var hr = o._hPanel = hp.insertRow(idx);
   hr.className = o.style('Panel');
   // 建立行内的所有单元格对象
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      var c = cs.value(n);
      var cl = c.createCell(o);
      if(c.dispFixed){
         hfr.appendChild(cl._hPanel);
      }else{
         hr.appendChild(cl._hPanel);
      }
      o._cells.set(c.dataName, cl);
   }
   o.doRefresh()
}

//==========================================================
//<T>检查当前行内的所有数据是否变化过。</T>
//
//@method
//@return Boolean
// <L value='true'>变化过</L>
// <L value='false'>未变化</L>
//==========================================================
MO.FDuiGridRowControl_isVisible = function FDuiGridRowControl_isVisible(){
	var o = this;
	return o._visible;
}

//==========================================================
MO.FDuiGridRowControl_getIndex = function FDuiGridRowControl_getIndex(){
   return this._hPanel.rowIndex;
}

//==========================================================
// <T>获得当前行记录的唯一标识。</T>
//
// @method
// @return String 唯一标识
//==========================================================
MO.FDuiGridRowControl_getId = function FDuiGridRowControl_getId(){
   var c = this._cells.get('ouid');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录的对象版本。</T>
//
// @method
// @return String 对象版本
//==========================================================
MO.FDuiGridRowControl_getVersion = function FDuiGridRowControl_getVersion(){
   var c = this._cells.get('over');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录关联的状态单元格对象。</T>
//
// @method
// @return FCellStatus 对状态单元格对象
//==========================================================
MO.FDuiGridRowControl_getStatus = function FDuiGridRowControl_getStatus(){
   return this._statusCell;
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得最新数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
MO.FDuiGridRowControl_reget = function FDuiGridRowControl_reget(n){
   return this._cells.get(n).reget();
}
//==========================================================
// value
MO.FDuiGridRowControl_loadValue = function FDuiGridRowControl_loadValue(v){
   this.loadRow(v);
}
//==========================================================
// value
MO.FDuiGridRowControl_saveValue = function FDuiGridRowControl_saveValue(v){
   this.saveRow(v);
}

//==========================================================
MO.FDuiGridRowControl_recordValue = function FDuiGridRowControl_recordValue(){
   // 记录数据
   this.process(this._recordProcess);
}

//==========================================================
MO.FDuiGridRowControl_toAttributes = function FDuiGridRowControl_toAttributes(v){
   this.saveRow(v);
}
//==========================================================
MO.FDuiGridRowControl_toDeepAttributes = function FDuiGridRowControl_toDeepAttributes(r){
   var o = this;
   // 获得所有父数据对象
   var ts = new TList();
   var p = o.table;
   while(p){
      if(p != o.table && MO.Class.isClass(p, MDataset)){
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
      if(MO.Class.isClass(m, FForm)){
         m.toAttributes(r);
      }else if(MO.Class.isClass(m, FTable)){
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
MO.FDuiGridRowControl_extend = function FDuiGridRowControl_extend(v){
   var o = this;
   var rs = o._rows;
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
MO.FDuiGridRowControl_doInsert = function FDuiGridRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
//==========================================================
MO.FDuiGridRowControl_doDelete = function FDuiGridRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FDuiGridRowControl_refresh = function FDuiGridRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.testDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}
