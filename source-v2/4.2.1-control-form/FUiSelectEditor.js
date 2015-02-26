//==========================================================
// <T>下拉选择框编辑器。</T>
//
//  hDropPanel<TD>
// ┌----------------------------------------------------┐
// │ hDropLayout<DIV>                                   │
// │┌------------------------------------------------┐│
// ││ hItemsForm<TABLE>                              ││
// ││ hItemsBody<TBODY>                              ││
// ││┌--------------------------------------------┐││
// │││Item<TR>                                    │││
// ││├--------------------------------------------┤││
// │││Item<TR>                                    │││
// ││└--------------------------------------------┘││
// │└------------------------------------------------┘│
// └----------------------------------------------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor, MListenerItemClick);
   //..........................................................
   // @attribute
   o._items         = null;
   o._position      = null;
   //..........................................................
   // @html
   o._hDropLayout   = null;
   o._hItemsForm    = null;
   //..........................................................
   // @event
   o.onBuildDrop   = FUiSelectEditor_onBuildDrop;
   o.onItemClick   = FUiSelectEditor_onItemClick;
   o.onEditKeyDown = FUiSelectEditor_onEditKeyDown;
   o.onEditEnd     = FUiSelectEditor_onEditEnd;
   //..........................................................
   // @method
   o.construct     = FUiSelectEditor_construct;
   // @method
   o.testBlur      = FUiSelectEditor_testBlur;
   o.buildItems    = FUiSelectEditor_buildItems;
   o.clearItems    = FUiSelectEditor_clearItems;
   o.get           = FUiSelectEditor_get;
   o.set           = FUiSelectEditor_set;
   o.select        = FUiSelectEditor_select;
   o.fetch         = FUiSelectEditor_fetch;
   o.setVisible    = FUiSelectEditor_setVisible;
   o.dispose       = FUiSelectEditor_dispose;
   return o;
}

//==========================================================
// <T>建立下拉内容。</T>
//
// @method
//==========================================================
function FUiSelectEditor_onBuildDrop(){
   var o = this;
   // 创建面板
   var hl = o._hDropLayout = RBuilder.appendDiv(o._hDropPanel)
   // 创建内容表格
   var hf = o._hItemsForm = RBuilder.appendTable(hl);
   o._hItemsBody = RBuilder.append(hf, 'TBODY');
}

//==========================================================
// <T>项目点击事件处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_onItemClick(p){
   var o = this;
   var s = o._source;
   o._position = o._items.indexOfValue(p);
   o.editEnd();
}

//==========================================================
// <T>编辑按键按下处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case EKeyCode.Enter:
         o.editEnd();
         break;
      case EKeyCode.Esc:
         o.editCancel();
         break;
   }
}

//==========================================================
// <T>处理结束编辑事件。</T>
//
// @method
//==========================================================
function FUiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FUiDropEditor.onEditEnd.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_construct(){
   var o = this;
   o.__base.FUiDropEditor.construct.call(o);
}

//==========================================================
// <T>测试是否可以失去焦点。</T>
//
// @method
// @param c:control:FControl 控件
//==========================================================
function FUiSelectEditor_testBlur(c){
   var o = this;
   if(o._source == c){
      return false;
   }
   return !this._items.contains(c);
}

//==========================================================
// <T>清空列表项目。</T>
//
// @method
//==========================================================
function FUiSelectEditor_clearItems(){
   var o = this;
   var hb = o._hItemsBody;
   // 清空下拉菜单
   var cs = o._items;
   if(cs){
      for(var i = cs.count() - 1; i >= 0; i--){
         var ci = cs.value(i);
         // 移除控件
         ci.removeClickListener(o, o.onItemClick);
         hb.removeChild(ci._hPanel);
      }
   }
   o._position = 0;
}

//==========================================================
// <T>建立列表项目。</T>
//
// @method
// @param p:control:FUiSelect 下拉选择框
//==========================================================
function FUiSelectEditor_buildItems(p){
   var o = this;
   var hb = o._hItemsBody;
   // 清空下拉菜单
   var cs = p.components();
   if(cs == o._items){
      return;
   }else{
      o.clearItems();
   }
   // 建立下拉菜单
   var c = cs.count();
   for(var i = 0; i < c; i++){
      var ci = cs.value(i);
      // 建立分割线
      //if(i > 0){
      //   var hr = RBuilder.append(hb, 'TR');
      //   hr.height = 1;
      //   var hd = RBuilder.append(hr, 'TD');
      //   hd.colSpan = 3;
      //   hd.style.borderTop = '1 dashed #24C2DB';
      //   //RBuilder.appendEmpty(hd);
      //}
      // 建立控件
      ci.addClickListener(o, o.onItemClick);
      ci.setPanel(hb);
   }
   o._position = 0;
   o._items = cs;
}

//==========================================================
// <T>获得选中内容。</T>
//
// @method
//==========================================================
function FUiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}

//==========================================================
// <T>设置选中内容。</T>
//
// @method
// @param p:dataValue:String 数据内容
//==========================================================
function FUiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(RString.equals(p._dataValue, v, true)){
         o._position = i;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}

//==========================================================
// <T>选择项目。</T>
//
// @method
// @param p:position:Integer 位置索引
//==========================================================
function FUiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   // 检查范围
   var n = RInteger.toRange(p, 0, c - 1);
   // 设置选中状态
   for(var i = 0; i < c; i++){
      s.value(i).setChecked(i == n);
   }
   o._position = n;
}

//==========================================================
// <T>获取动态数据。</T>
//
// @method
//==========================================================
function FUiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o._source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param p:visible:Boolean 是否显示
//==========================================================
function FUiSelectEditor_setVisible(p){
   var o = this;
   o.__base.FUiDropEditor.setVisible.call(o, p);
   // 获得变量
   var hp = o._hPanel;
   var hif = o._hItemsForm;
   // 显示处理
   if(p){
      // 计算位置
      var s = o._source;
      var r = s.getValueRectangle(RValue.rectangle);
      hif.width = '';
      var iw = hif.offsetWidth;
      // 设置位置
      hp.style.left = r.left() + 'px';
      hp.style.top = r.bottom() + 'px';
      hp.style.width = Math.max(iw, r.width()) + 'px';
      hif.width = '100%';
      if(hif.offsetHeight > o._minHeight){
         o._hDropLayout.style.overflowY = 'scroll';
         o._hDropLayout.style.height = o._minHeight + 'px';
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_dispose(){
   var o = this;
   o._hDropLayout = RHtml.free(o._hDropLayout);
   o._hItemsForm = RHtml.free(o._hItemsForm);
   o.__base.FUiDropEditor.dispose.call(o);
}
