//==========================================================
// <T>可以编辑的单元格控件。</T>
//
//  hPanel<TD>
// ┌--------------------------------------------------------┐
// │ hForm<TABLE>                                           │
// │ hLine<TR>                                              │
// │┌--------------┬--------------------┬--------------┐│
// ││hIconPanel<TD>│hEditPanel<TD>      │hDropPanel<TD>││
// ││hIcon<IMG>    │hEdit<INPUT>        │hDrop<IMG>    ││
// │└--------------┴--------------------┴--------------┘│
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.FDuiCellEditControl = function FDuiCellEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   //..........................................................
   // @html
   o._hForm       = null;
   o._hLine       = null;
   o._hEditPanel  = null;
   o._hEdit       = null;
   //..........................................................
   // @event
   o.onBuildIcon  = MO.FDuiCellEditControl_onBuildIcon;
   o.onBuildEdit  = MO.FDuiCellEditControl_onBuildEdit;
   o.onBuildDrop  = MO.Method.empty;
   o.onBuildForm  = MO.FDuiCellEditControl_onBuildForm;
   o.onBuild      = MO.FDuiCellEditControl_onBuild;
   //..........................................................
   /// @style
   //o.stEditable   = MO.Class.register(o, new TStyle('Readonly'));
   //o.stPanel      = MO.Class.register(o, new TStyle('PanelSelect'));
   //o.stEditable   = MO.Class.register(o, new TStyle('ReadonlySelect'));
   //o.stEditSelect = MO.Class.register(o, new TStyle('EditSelect'));
   //o.stEdit       = MO.Class.register(o, new TStyle('EditReadonly'));
   //o.stEditSelect = MO.Class.register(o, new TStyle('EditReadonlySelect'));
   //..........................................................
   // @method
   //o.getEditRange = FDuiCellEditControl_getEditRange;
   //o.select       = FDuiCellEditControl_select;
   //o.setVisible   = FDuiCellEditControl_setVisible;
   //o.refreshStyle = FDuiCellEditControl_refreshStyle;
   return o;
}

//==========================================================
// <T>在单元格内图标区创建图标。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiCellEditControl_onBuildIcon = function FDuiCellEditControl_onBuildIcon(p){
   var o = this;
   o.hIcon = MO.Window.Builder.append(o.hIconPanel, 'IMG');
}

//==========================================================
// <T>在单元格内编辑区创建编辑控件。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiCellEditControl_onBuildEdit = function FDuiCellEditControl_onBuildEdit(p){
   var o = this;
   var c = o._column;
   // 建立文本输入框
   //o._hEdit = MO.Window.Builder.appendEdit(o._hEditPanel, o.styleName('Edit'));
   // 关联事件
   //c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
   //c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
   //c.linkEvent(o, 'onCellClick', he, c.onCellClick);
   //c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   // 关联事件
   //var he = o.hEdit;
   //he.style.color = EColor.TextEdit;
   //c.linkEvent(o, 'onDataChange', he);
   // 选取处理
   //if(o._table.isLov){
   //   o._hEdit.style.cursor = 'hand';
   //}
   // 设置文字对齐方式
   //if(!MO.Lang.String.isEmpty(c.editAlign)){
   //   he.style.textAlign = c.editAlign;
   //}
}

//==========================================================
// <T>在单元格内创建表单底板。</T>
// <P>只有有图标区或下拉区，则创建底板，否则直接创建编辑控件。</P>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiCellEditControl_onBuildForm = function FDuiCellEditControl_onBuildForm(p){
   var o = this;
   var c = o._column;
   // 拥有图标区或下拉区的控件，才允许建立表格底板
   if(c._hasIconArea || c._hasDropArea){
      // 建立表格底板
      var hForm = o._hForm = MO.Window.Builder.appendTable(o._hPanel);
      hForm.width = '100%';
      var hLine = o.hFormLine = MO.Window.Builder.appendTableRow(hForm);
      // 建立图标区
      if(c.hasIconArea){
         o.hIconPanel = MO.Window.Builder.appendTableCell(hLine);
         o.hIconPanel.width = 18;
         o.onBuildIcon(p);
      }
      // 建立编辑区
      o._hEditPanel = MO.Window.Builder.appendTableCell(hLine);
      o.onBuildEdit(p);
      // 建立下拉区
      if(c.hasDropArea){
         o.hDropPanel = MO.Window.Builder.appendTableCell(hLine);
         o.hDropPanel.width = 8;
         o.onBuildDrop(p);
      }
   }else{
      var hep = o._hEditPanel = o._hPanel;
      //hep.align = c._editAlignCd;
      o.onBuildEdit(p);
   }
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiCellEditControl_onBuild = function FDuiCellEditControl_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   // 创建布局
   o.onBuildForm(p);
}











// ------------------------------------------------------------
MO.FDuiCellEditControl_getEditRange = function FDuiCellEditControl_getEditRange(){
   var o = this;
   var hc = o.hPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}

//==========================================================
// 根据选择状态来设置单元格的显示方式
//
// @method
// @param v:value:Boolean 是否选中
// @see FColumnEditable.isEditable
//==========================================================
MO.FDuiCellEditControl_select = function FDuiCellEditControl_select(v){
   var o = this;
   var a = o.descriptor().isEditAble(o.row);
   if(v){
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
      }else{
         o.setEditStyle(EStyle.ReadonlySelect);
         o.column.disable();
      }        
   }else{
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
      }else{
         o.setEditStyle(EStyle.Readonly);
         o.column.disable();
      }
   }
}

//==========================================================
// 
//
// @method
//==========================================================
MO.FDuiCellEditControl_setVisible = function FDuiCellEditControl_setVisible(v){
   var o = this;
   o.hPanel.style.display = v ? 'block' : 'none';
   if(v){
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         var a = o.descriptor().isEditAble(o.row);
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
     }else{
       o.setEditStyle(EStyle.Readonly);
       o.column.disable();
     }
   }
}
// ------------------------------------------------------------
MO.FDuiCellEditControl_refreshStyle = function FDuiCellEditControl_refreshStyle(){
   var o = this;
   var t = o.table;
   var c = o.column;
   var r = o.row;
   var hep = o.hEditPanel;
   var he = o.hEdit;
   var hd = o.hDrop;
   // 获得设置参数
   var e = c.isEditAble(r);
   var s = r.isSelect;
   // 根据是否可以编辑设置样式
   var ce = e ? EColor.TextEdit : EColor.TextReadonly;
   if(he){
      he.readOnly = !e;
      if(!c.zoomRefer){
         he.style.color = ce;
      }
      if(hd){
         he.style.cursor = e? 'hand':'normal';
         hd.style.cursor = e? 'hand':'normal';
      }
   }
   if(hep){
      hep.style.color = ce;
   }
   // 根据是否被选中设置样式
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   // 设置背景颜色
   if(he){
      he.style.backgroundColor = bc;
   }
   o.hPanel.style.backgroundColor = bc;
}
