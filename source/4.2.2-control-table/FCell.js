//==========================================================
// <T>表格内的单元格控件。</T>
//
// hPanel<TD>
// ┌--------------------------------------------------------┐
// │ hForm<TABLE>                                           │
// │ hFormLine<TR>                                          │
// │┌--------------┬--------------------┬--------------┐│
// ││hIconPanel<TD>│hEditPanel<TD>      │hDropPanel<TD>││
// ││hIcon<IMG>    │hEdit<INPUT>        │hDrop<IMG>    ││
// │└--------------┴--------------------┴--------------┘│
// └--------------------------------------------------------┘
//
// @class FControl, MEditValue
// @author maochunyang
// @version 1.0.1
//==========================================================
function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue);
   //..........................................................
   // @style
   o.stEdit       = RClass.register(o, new TStyle('Edit'));
   //..........................................................
   // @attribute
   o.table        = null;
   o.column       = null;
   o.row          = null;
   // Html
   o.hPanel       = null;
   o.hForm        = null;
   o.hFormLine    = null;
   o.hIconPanel   = null;
   o.hIcon        = null;
   o.hEditPanel   = null;
   o.hEdit        = null;
   o.hDropPanel   = null;
   o.hDrop        = null;
   //..........................................................
   // @method
   o.buildIcon    = FCell_buildIcon;
   o.buildEdit    = FCell_buildEdit;
   o.buildDrop    = RMethod.empty;
   o.buildForm    = FCell_buildForm;
   o.build        = FCell_build;
   //..........................................................
   // @method
   o.doFocus      = FCell_doFocus;
   o.doBlur       = FCell_doBlur;
   //..........................................................
   // @method
   o.descriptor   = FCell_descriptor;
   o.text         = FCell_text;
   o.setText      = FCell_setText;
   o.focus        = FCell_focus;
   o.setVisible   = FCell_setVisible;
   o.setEditStyle = RMethod.empty;
   o.refreshStyle = FCell_refreshStyle;
   o.dispose      = FCell_dispose;
   o.dump         = FCell_dump;
   return o;
}

//==========================================================
// <T>在单元格内图标区创建图标。</T>
//
// @method
//==========================================================
function FCell_buildIcon(){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}

//==========================================================
// <T>在单元格内编辑区创建编辑控件。</T>
//
// @method
//==========================================================
function FCell_buildEdit(){
   var o = this;
   var c = o.column;
   // 建立文本输入框
   var he = o.hEdit = RBuilder.append(o.hEditPanel, 'INPUT', o.style('Edit'));
   he.style.width = '100%';
   // 关联事件
   c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
   c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
   c.linkEvent(o, 'onCellClick', he, c.onCellClick);
   c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   // 选取处理
   if(o.table.isLov){
      o.hEdit.style.cursor = 'hand';
   }
   // 设置文字对齐方式
   if(!RString.isEmpty(c.editAlign)){
      he.style.textAlign = c.editAlign;
   }
}

//==========================================================
// <T>在单元格内创建表单底板。</T>
// <P>只有有图标区或下拉区，则创建底板，否则直接创建编辑控件。</P>
//
// @method
//==========================================================
function FCell_buildForm(){
   var o = this;
   var c = o.column;
   // 拥有图标区或下拉区的控件，才允许建立表格底板
   if(c.hasIconArea || c.hasDropArea){
      // 建立表格底板
      var hf = o.hForm = RBuilder.appendTable(o.hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      // 建立图标区
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.buildIcon();
      }
      // 建立编辑区
      o.hEditPanel = hr.insertCell();
      o.buildEdit();
      // 建立下拉区
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.buildDrop();
      }
   }else{
      var hep = o.hEditPanel = o.hPanel;
      hep.align = c.editAlign;
      o.buildEdit();
   }
}

//==========================================================
// <T>创建单元格的内部控件。</T>
//
// @method
//==========================================================
function FCell_build(){
   var o = this;
   var c = o.column;
   // 创建底板
   var h = o.hPanel = RBuilder.create(null, 'TD', o.style('Panel'));
   h.style.borderRight = '1px solid #F0F0F0';
   h.style.borderBottom = '1px dotted #CCCCCC';
   RHtml.link(h, 'control', o);
   c.linkEvent(o, 'onCellMouseEnter', h, c.onCellMouseEnter);
   c.linkEvent(o, 'onCellMouseLeave', h, c.onCellMouseLeave);
   // 设置编辑颜色
   if(c.editColor){
      h.style.color = c.editColor;
   }
   // 设置背景颜色
   if(c.editBgcolor){
      h.style.backgroundColor = c.editBgcolor;
   }
   // 判断显示方式
   if(EEditFormat.Html != c.editFormat){
      // 创建布局
      o.buildForm();
   }
   // 设置建立完成状态
   //o.hEditPanel.style.paddingLeft = 2;
   //o.hEditPanel.style.overflow = 'hidden';
   //o.hEditPanel.style.textOverflow = 'ellipsis';
}

//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
function FCell_doFocus(){
   var o = this;
   o.table.__focusCell = o;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
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
function FCell_doBlur(){
   var o = this;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
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
function FCell_descriptor(){
   return this.column;
}

//==========================================================
// <T>获取单元格数据内容。</T>
//
// @method
// @return 数据内容
//==========================================================
function FCell_text(){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      return o.hPanel.innerHTML;
   }else if(c._absEdit && o.hEdit){
      return o.hEdit.value;
   }else if(o.hEditPanel){
      return o.hEditPanel.innerText;
   }
   return '';
}

//==========================================================
// <T>设置单元格数据内容。</T>
//
// @method
// @param t:text:String 数据内容
//==========================================================
function FCell_setText(t){
   // 判断显示方式
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      o.hPanel.innerHTML = t;
   }else if(c._absEdit && o.hEdit){
      o.hEdit.value = t;
   }else if(o.hEditPanel){
      o.hEditPanel.innerText = t;
   }
}

//==========================================================
// <T>设置单元格的焦点。</T>
//
// @method
// @param s:select:Boolean 是否选中数据内容
//==========================================================
function FCell_focus(s){
   var o = this;
   var h = o.hEdit;
   if(h){
      o.column.table.selectRow(o.row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}

//==========================================================
// <T>设置单元格的可见性。</T>
//
// @method
// @param v:visible:Boolean 可见性
//==========================================================
function FCell_setVisible(v){
   this.hPanel.style.display = v ? 'block' : 'none';
}

//==========================================================
// <T>根据设置信息，刷新单元格的样式。</T>
//
// @method
//==========================================================
function FCell_refreshStyle(){
   var o = this;
   var t = o.table;
   var r = o.row;
   var s = r.isSelect;
   // 设置编辑颜色
   var he = o.hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   // 设置背景颜色
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
   o.hPanel.style.backgroundColor = bc;
}

//==========================================================
// <T>释放单元格内的所有对象。</T>
//
// @method
//==========================================================
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hEditPanel = null;
   o.hEdit = null;
   o.hDropPanel = null;
   o.hDrop = null;
}

//==========================================================
// <T>获取单元格内的调试信息。</T>
//
// @method
// @return TString 调试信息
//==========================================================
function FCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
