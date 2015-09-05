//==========================================================
// <T>表格内的单元格控件。</T>
//
// hPanel<TD>
// ┌--------------------------------------------------------┐
// │                                                        │
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiCell = function FDuiCell(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiValue, MO.MUiDataValue);
   //..........................................................
   // @style
   o._stylePanelNormal = MO.Class.register(o, new MO.AStyle('_stylePanelNormal'));
   o._stylePanelHover  = MO.Class.register(o, new MO.AStyle('_stylePanelHover'));
   o._stylePanelSelect = MO.Class.register(o, new MO.AStyle('_stylePanelSelect'));
   o._styleInputNormal = MO.Class.register(o, new MO.AStyle('_styleInputNormal'));
   o._styleInputHover  = MO.Class.register(o, new MO.AStyle('_styleInputHover'));
   o._styleInputSelect = MO.Class.register(o, new MO.AStyle('_styleInputSelect'));
   //..........................................................
   // @attribute
   o._table            = MO.Class.register(o, new MO.AGetSet('_table'));
   o._column           = MO.Class.register(o, new MO.AGetSet('_column'));
   o._row              = MO.Class.register(o, new MO.AGetSet('_row'));
   // @attribute
   o._rowStatusCd      = MO.EDuiGridRowStatus.Normal;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiCell_onBuildPanel;
   o.onBuild           = MO.FDuiCell_onBuild;
   // @event
   o.onCellMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onCellMouseEnter'), MO.FDuiCell_onCellMouseEnter);
   o.onCellMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onCellMouseLeave'), MO.FDuiCell_onCellMouseLeave);
   o.onCellClick       = MO.Class.register(o, new MO.AEventClick('onCellClick'), MO.FDuiCell_onCellClick);
   o.onCellDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onCellDoubleClick'), MO.FDuiCell_onCellDoubleClick);
   //..........................................................
   // @process
   o.oeLoadDataRow     = MO.FDuiCell_oeLoadDataRow;
   o.oeSaveDataRow     = MO.FDuiCell_oeSaveDataRow;
   //..........................................................
   // @method
   o.construct        = MO.FDuiCell_construct;
   // @method
   o.setVisible       = MO.FDuiCell_setVisible;
   o.focus            = MO.FDuiCell_focus;
   o.refreshStyle     = MO.FDuiCell_refreshStyle;
   // @method
   o.dispose          = MO.FDuiCell_dispose;
   //..........................................................
   // @method
   //o.doFocus      = FDuiCell_doFocus;
   //o.doBlur       = FDuiCell_doBlur;
   //..........................................................
   // @method
   //o.descriptor   = FDuiCell_descriptor;
   //o.text         = FDuiCell_text;
   //o.setText      = FDuiCell_setText;
   //o.setEditStyle = RMethod.empty;
   //o.dump         = FDuiCell_dump;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_onBuildPanel = function FDuiCell_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'TD', o.styleName('Panel'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_onBuild = function FDuiCell_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event)
   // 创建底板
   var column = o._column;
   var hPanel = o._hPanel;
   MO.Window.Html.linkSet(hPanel, 'control', o);
   // 关联事件
   o.attachEvent('onCellMouseEnter', hPanel);
   o.attachEvent('onCellMouseLeave', hPanel);
   o.attachEvent('onCellClick', hPanel);
   o.attachEvent('onCellDoubleClick', hPanel);
   //column.linkEvent(o, 'onCellMouseEnter', hPanel, column.onCellMouseEnter);
   //column.linkEvent(o, 'onCellMouseLeave', hPanel, column.onCellMouseLeave);
   // 设置编辑颜色
   //if(c.editColor){
   //   h.style.color = c.editColor;
   //}
   // 设置背景颜色
   //if(c.editBgcolor){
   //   h.style.backgroundColor = c.editBgcolor;
   //}
   // 判断显示方式
   //if(EEditFormat.Html != c.editFormat){
   //}
   // 设置建立完成状态
   //o._hEditPanel.style.paddingLeft = 2;
   //o._hEditPanel.style.overflow = 'hidden';
   //o._hEditPanel.style.textOverflow = 'ellipsis';
}

//==========================================================
// <T>单元格鼠标进入处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiCell_onCellMouseEnter = function FDuiCell_onCellMouseEnter(event){
   var o = this;
   var table = o._table;
   var row = o._row;
   table.hoverRow(row, true);
}

//==========================================================
// <T>单元格鼠标离开处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiCell_onCellMouseLeave = function FDuiCell_onCellMouseLeave(event){
   var o = this;
   var table = o._table;
   var row = o._row;
   table.hoverRow(row, false);
}

//==========================================================
// <T>单击单元格事件处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_onCellClick = function FDuiCell_onCellClick(event){
   var o = this;
   var table = o._table;
   table.clickCell(o);
}

//==========================================================
// <T>双击单元格事件处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_onCellDoubleClick = function FDuiCell_onCellDoubleClick(event){
   var o = this;
   var table = o._table;
   table.doubleClickCell(o);
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_oeLoadDataRow = function FDuiCell_oeLoadDataRow(event){
   var o = this;
   var column = o._column;
   var dataName = column.dataName();
   var dataRow = event.dataRow;
   var value = dataRow.get(dataName);
   o.set(value);
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiCell_oeSaveDataRow = function FDuiCell_oeSaveDataRow(event){
   var o = this;
   var column = o._column;
   var dataName = column.dataName();
   var dataRow = event.dataRow;
   var value = o.get();
   dataRow.set(dataName, value);
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>设置单元格的可见性。</T>
//
// @method
// @param v:visible:Boolean 可见性
//==========================================================
MO.FDuiCell_setVisible = function FDuiCell_setVisible(value){
   //this._hPanel.style.display = value ? 'block' : 'none';
}

//==========================================================
// <T>设置单元格的焦点。</T>
//
// @method
// @param value:Boolean 是否获得焦点
//==========================================================
MO.FDuiCell_focus = function FDuiCell_focus(value){
   var o = this;
   //var hEdit = o._hEdit;
   //if(hEdit){
   //   o._column._table.selectRow(o._row, true, true);
   //   hEdit.focus();
   //   if(value){
   //      hEdit.select();
   //   }
   //}
}

//==========================================================
// <T>刷新单元格的样式。</T>
//
// @method
//==========================================================
MO.FDuiCell_refreshStyle = function FDuiCell_refreshStyle(){
   var o = this;
   var table = o._table;
   var row = o._row;
   var selected = row._statusSelect;
   // 设置编辑颜色
   //var he = o._hEdit;
   //if(he){
   //   he.readOnly = true;
   //   he.style.color = EColor.TextReadonly;
   //   he.style.backgroundColor = bc;
   //}
   // 设置背景颜色
   if(selected){
      o._rowStatusCd = MO.EDuiGridRowStatus.Select;
   }else{
      var hover = (table._hoverRow == row);
      if(hover){
         o._rowStatusCd = MO.EDuiGridRowStatus.Hover;
      }else{
         o._rowStatusCd = MO.EDuiGridRowStatus.Normal;
         //bc = EColor._rows[row.index % EColor._rows.length];
      }
   }
   //if(o.__focus){
   //   bc = EColor._rowEditHover;
   //}
   //o._hPanel.style.backgroundColor = bc;
   // 设置样式
   o._hPanel.className = o.styleName('Panel' + o._rowStatusCd);
}

//==========================================================
// <T>释放单元格内的所有对象。</T>
//
// @method
//==========================================================
MO.FDuiCell_dispose = function FDuiCell_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}







//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
MO.FDuiCell_doFocus = function FDuiCell_doFocus(){
   var o = this;
   o._table.__focusCell = o;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
MO.FDuiCell_doBlur = function FDuiCell_doBlur(){
   var o = this;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}

//==========================================================
// <T>获得单元格对象的描述器。</T>
//
// @method
//==========================================================
MO.FDuiCell_descriptor = function FDuiCell_descriptor(){
   return this._column;
}

//==========================================================
// <T>获取单元格数据内容。</T>
//
// @method
// @return 数据内容
//==========================================================
MO.FDuiCell_text = function FDuiCell_text(){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      return o._hPanel.innerHTML;
   }else if(c._absEdit && o._hEdit){
      return o._hEdit.value;
   }else if(o._hEditPanel){
      return o._hEditPanel.innerText;
   }
   return '';
}

//==========================================================
// <T>设置单元格数据内容。</T>
//
// @method
// @param t:text:String 数据内容
//==========================================================
MO.FDuiCell_setText = function FDuiCell_setText(t){
   // 判断显示方式
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      o._hPanel.innerHTML = t;
   }else if(c._absEdit && o._hEdit){
      o._hEdit.value = t;
   }else if(o._hEditPanel){
      o._hEditPanel.innerText = t;
   }
}

//==========================================================
// <T>获取单元格内的调试信息。</T>
//
// @method
// @return TString 调试信息
//==========================================================
MO.FDuiCell_dump = function FDuiCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
