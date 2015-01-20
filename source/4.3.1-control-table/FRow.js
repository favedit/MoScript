//==========================================================
// <T>表格内支持固定列的行对象。</T>
//
// @class FRowControl
// @history 091016 MAOCY 创建
//==========================================================
function FRow(o){
   o = RClass.inherits(this, o, FRowControl);
   // ---------------------------------------------------------
   // @html 行对象<TR>
   o.hFixPanel    = null;
   // ---------------------------------------------------------
   /// @method 建立内容
   o.build        = FRow_build;
   o.select       = FRow_select;
   o.setVisible   = FRow_setVisible;
   o.push         = FRow_push;
   o.refreshSize  = FRow_refreshSize;
   o.refreshStyle = FRow_refreshStyle;
   o.dispose      = FRow_dispose;
   return o;
}

//==========================================================
// <T>构建一个行对象的内部页面结构。</T>
//
// @method
//==========================================================
function FRow_build(){
   var o = this;
   var t = o.table;
   // 建立固定行对象
   o.hFixPanel = RBuilder.create(null, 'TR', o.style('Panel'));
   // 建立行对象
   o.base.FRowControl.build.call(o);
}

//==========================================================
// 选择一行时，遍历所有的cell 更改样式表
//
// @method
//==========================================================
function FRow_select(v){
   var o = this;
   o.isSelect = v;
   // 设置背景颜色
   var c = v ? EColor.RowSelect : EColor.Row;
   o.hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   // 刷新所有单元格颜色
   o.refreshStyle();
}

//==========================================================
// <T>当前行控件内增加一个单元格控件。</T>
//
// @method
// @params f:flag:Boolean 可见性
//==========================================================
function FRow_setVisible(f){
   var o = this;
   o.__visible = f;
   var s = f ? 'block' : 'none';
   o.hFixPanel.style.display = s;
   o.hPanel.style.display = s;
}

//==========================================================
// <T>当前行控件内增加一个单元格控件。</T>
//
// @method
// @params c:cell:TCell 单元格
//==========================================================
function FRow_push(c){
   var o = this;
   o.base.FRowControl.push.call(o, c);
   // 增加单元格
   if(c.column.dispFixed){
      o.hFixPanel.appendChild(c.hPanel);
   }else{
      o.hPanel.appendChild(c.hPanel);
   }
}

//==========================================================
// <T>刷新当前控件大小。</T>
//
// @method
//==========================================================
function FRow_refreshSize(){
   this.hPanel.style.pixelHeight = this.hFixPanel.offsetHeight;
}

//==========================================================
// <T>刷新当前控件样式。</T>
//
// @method
//==========================================================
function FRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o.hFixPanel.offsetHeight){
      o.hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o.hFixPanel.offsetHeight;
   }
   // 选取处理
   if(o.table.isLov){
      o.hFixPanel.style.cursor = 'hand';
   }
   o.base.FRowControl.refreshStyle.call(o);
}

//==========================================================
// <T>释放当前数据行。</T>
//
// @method
//==========================================================
function FRow_dispose(){
   var o = this;
   o.base.FRowControl.dispose.call(o);
   RMemory.freeHtml(o.hFixPanel);
   o.hFixPanel = null;
}
