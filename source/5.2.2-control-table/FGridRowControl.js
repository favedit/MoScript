//==========================================================
// <T>行控件。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
function FGridRowControl(o){
   o = RClass.inherits(this, o, FContainer, MDataContainer);
   //..........................................................
   // @attribute TDictionary 单元格字典
   o._cells         = null;
   // @attribute TObjects 子数据行
   o._rows          = null;
   // @attribute
   o._clearProcess  = null;
   o._resetProcess  = null;
   o._loadProcess   = null;
   o._saveProcess   = null;
   o._recordProcess = null;
   // @attribute
   o._statusCell    = null;
   //..........................................................
   // @event
   o.onBuildPanel   = FGridRowControl_onBuildPanel;
   o.onBuild        = FGridRowControl_onBuild;
   //..........................................................
   // @method
   o.construct      = FGridRowControl_construct;
   // @method
   o.loadRow        = FGridRowControl_loadRow;
   o.saveRow        = FGridRowControl_saveRow;
   // @method
   o.setVisible     = FGridRowControl_setVisible;
   // @method
   o.appendChild    = FGridRowControl_appendChild;
   o.push           = FGridRowControl_push;


   //..........................................................
   // @style
   //o.stHover          = RClass.register(o, new TStyle('Hover'));
   //o.stSelect         = RClass.register(o, new TStyle('Select'));
   //o._visible        = true;
   //..........................................................
   // @attribute FGridControl 表控件
   //o.table            = null;
   /// @attribute TAttributes 属性集合
   //o.attributes       = null;
   //o.selectAble       = true;
   // @attribute
   //o.status           = ERowStatus.Update;
   // @attribute Boolean 是否已经选中
   //o.isSelect         = false;
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
   //o.build            = FGridRowControl_build;
   //o.buildChildren    = FGridRowControl_buildChildren;
   //o.isDataChanged    = FGridRowControl_isDataChanged;
   //o.isVisible        = FGridRowControl_isVisible;
   //o.getIndex         = FGridRowControl_getIndex;
   //o.getId            = FGridRowControl_getId;
   //o.getVersion       = FGridRowControl_getVersion;
   //o.getStatus        = FGridRowControl_getStatus;
   //o.cell             = FGridRowControl_cell;
   //o.get              = FGridRowControl_get;
   //o.reget            = FGridRowControl_reget;
   //o.set              = FGridRowControl_set;
   //o.loadValue        = FGridRowControl_loadValue;
   //o.saveValue        = FGridRowControl_saveValue;
   //o.recordValue      = FGridRowControl_recordValue;
   //o.toAttributes     = FGridRowControl_toAttributes;
   //o.toDeepAttributes = FGridRowControl_toDeepAttributes;
   //o.select           = FGridRowControl_select;
   //o.extend           = FGridRowControl_extend;
   //o.doInsert         = FGridRowControl_doInsert;
   //o.doDelete         = FGridRowControl_doDelete;
   //o.refresh          = FGridRowControl_refresh;
   //o.refreshSize      = RMethod.empty;
   //o.refreshStyle     = FGridRowControl_refreshStyle;
   //o.dump             = FGridRowControl_dump;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FGridRowControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FGridRowControl_onBuild(p){
   var o = this;
   o.__base.FContainer.onBuild.call(o, p)
   // 建立行对象
   var t = o._table;
   var h = o._hPanel;
   //t.linkEvent(o, 'onRowMouseEnter', h, t.onRowMouseEnter);
   //t.linkEvent(o, 'onRowMouseLeave', h, t.onRowMouseLeave);
   // 选取处理
   //if(o._table.isLov){
   //   o._hPanel.style.cursor = 'hand';
   //}
   // 建立行内的所有单元格对象
   var cs = t._columns;
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var rl = cs.value(i);
      var rc = rl.createCell();
      o.push(rc);
   }
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FGridRowControl_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   // 构造属性
   o._cells = new TDictionary();
   o._rows = new TObjects();
   // 创建事件
   o._clearProcess = new TEventProcess(null, o, 'oeClearValue', MEditValue);
   o._resetProcess = new TEventProcess(null, o, 'oeResetValue', MEditValue);
   o._loadProcess = new TEventProcess(null, o, 'oeLoadValue', MEditValue);
   o._saveProcess = new TEventProcess(null, o, 'oeSaveValue', MEditValue);
   o._recordProcess = new TEventProcess(null, o, 'oeRecordValue', MEditValue);
}

//==========================================================
// <T>加载数据行。</T>
//
// @method
// @param p:row:TRow 数据行
//==========================================================
function FGridRowControl_loadRow(p){
   var o = this;
   var ds = RClass.create(FDataSource);
   ds.selectRow(p);
   o.dsDataLoad(ds);
   // 重置数据
   //o.process(o._clearProcess);
   // 加载数据
   //var e = o._loadProcess;
   //e.values = r;
   //o.process(e);
}

//==========================================================
// <T>保存数据行。</T>
//
// @method
// @param p:row:FGridRow 数据行
//==========================================================
function FGridRowControl_saveRow(p){
   var o = this;
   //if(!r){
   //   r = new TRow();
   //}
   // 存储所有单元格数据
   //var e = o._saveProcess;
   //e.values = r;
   //o.process(e);
   // 存储状态
   //r.set('_status', o.status);
   return r;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
function FGridRowControl_setVisible(p){
   var o = this;
   o._visible = p;
   // 设置控件底板的可见性
   var h = o._hPanel;
   if(h){
      RHtml.displaySet(h, p);
   }
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @return p:control:FControl 控件
//==========================================================
function FGridRowControl_appendChild(p){
   var o = this;
   o.__base.FContainer.appendChild.call(o, p);
   // 增加单元格
   var c = p._column;
   if(!c._optionFixed){
      o._hPanel.appendChild(p._hPanel);
   }
}

//==========================================================
// <T>增加一个子组件。</T>
//
// @method
// @param p:component:FComponent 组件
//==========================================================
function FGridRowControl_push(p){
   var o = this;
   o.__base.FContainer.push.call(o, p);
   // 设置单元格信息
   p._row = o;
   o._cells.set(p._column._dataName, p);
   // 关联状态单元格
   if(RClass.isClass(p, FCellStatus)){
      o._statusCell = p;
   }
}






















//==========================================================
function FGridRowControl_buildChildren(){
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
// <T>检查当前行内的所有数据是否变化过。</T>
//
// @method
// @return Boolean
//    <L value='true'>变化过</L>
//    <L value='false'>未变化</L>
//==========================================================
function FGridRowControl_isDataChanged(){
   var o = this;
   var cs = o._cells;
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
function FGridRowControl_isVisible(){
	var o = this;
	return o._visible;
}

//==========================================================
function FGridRowControl_getIndex(){
   return this._hPanel.rowIndex;
}

//==========================================================
// <T>获得当前行记录的唯一标识。</T>
//
// @method
// @return String 唯一标识
//==========================================================
function FGridRowControl_getId(){
   var c = this._cells.get('ouid');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录的对象版本。</T>
//
// @method
// @return String 对象版本
//==========================================================
function FGridRowControl_getVersion(){
   var c = this._cells.get('over');
   return c ? c.reget() : '';
}

//==========================================================
// <T>获得当前行记录关联的状态单元格对象。</T>
//
// @method
// @return FCellStatus 对状态单元格对象
//==========================================================
function FGridRowControl_getStatus(){
   return this._statusCell;
}

//==========================================================
// <T>根据索引获得一个单元格。</T>
//
// @method
// @return String 对象版本
//==========================================================
function FGridRowControl_cell(n){
   return this._cells.value(n);
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FGridRowControl_get(n){
   return this._cells.get(n).get();
}

//==========================================================
// <T>根据字段名称，从单元格对象中获得最新数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @return String 数据内容
//==========================================================
function FGridRowControl_reget(n){
   return this._cells.get(n).reget();
}

//==========================================================
// <T>根据字段名称，向单元格对象中设置数据内容。</T>
//
// @method
// @param n:name:String 字段名称
// @param v:value:String 数据内容
//==========================================================
function FGridRowControl_set(n, v){
   this._cells.get(n).set(v);
}
//==========================================================
// value
function FGridRowControl_loadValue(v){
   this.loadRow(v);
}
//==========================================================
// value
function FGridRowControl_saveValue(v){
   this.saveRow(v);
}

//==========================================================
function FGridRowControl_recordValue(){
   // 记录数据
   this.process(this._recordProcess);
}

//==========================================================
function FGridRowControl_toAttributes(v){
   this.saveRow(v);
}
//==========================================================
function FGridRowControl_toDeepAttributes(r){
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
function FGridRowControl_select(v){
   var o = this;
   o.isSelect = v;
   // 设置背景颜色
   o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
   // 刷新所有单元格颜色
   o.refreshStyle();
}

//==========================================================
function FGridRowControl_extend(v){
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
function FGridRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
//==========================================================
function FGridRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FGridRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}

//==========================================================
// <T>刷新样式。</T>
//
// @method
//==========================================================
function FGridRowControl_refreshStyle(){
   var o = this;
   var cs = o._cells;
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
function FGridRowControl_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.isSelect ? 'S' : '_');
   s.append(']');
   s.append(o.saveRow().dump());
   return s;
}
