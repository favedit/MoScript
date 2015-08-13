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
MO.FDuiSelectEditor = function FDuiSelectEditor(o){
   o = MO.Class.inherits(this, o, MO.FDuiDropEditor);
   //..........................................................
   // @attribute
   o._items              = null;
   o._position           = null;
   // @attribtue
   o._valueRectangle     = null;
   // @attribtue
   o._listenersItemClick = MO.Class.register(o, new MO.AListener('_listenersItemClick', MO.EEvent.ItemClick));
   //..........................................................
   // @html
   o._hDropLayout        = null;
   o._hItemsForm         = null;
   //..........................................................
   // @event
   o.onBuildDrop        = MO.FDuiSelectEditor_onBuildDrop;
   o.onItemClick        = MO.FDuiSelectEditor_onItemClick;
   o.onEditKeyDown      = MO.FDuiSelectEditor_onEditKeyDown;
   o.onEditEnd          = MO.FDuiSelectEditor_onEditEnd;
   //..........................................................
   // @method
   o.construct          = MO.FDuiSelectEditor_construct;
   // @method
   o.testBlur           = MO.FDuiSelectEditor_testBlur;
   o.buildItems         = MO.FDuiSelectEditor_buildItems;
   o.clearItems         = MO.FDuiSelectEditor_clearItems;
   o.get                = MO.FDuiSelectEditor_get;
   o.set                = MO.FDuiSelectEditor_set;
   o.select             = MO.FDuiSelectEditor_select;
   o.fetch              = MO.FDuiSelectEditor_fetch;
   o.setVisible         = MO.FDuiSelectEditor_setVisible;
   o.dispose            = MO.FDuiSelectEditor_dispose;
   return o;
}

//==========================================================
// <T>建立下拉内容。</T>
//
// @method
//==========================================================
MO.FDuiSelectEditor_onBuildDrop = function FDuiSelectEditor_onBuildDrop(){
   var o = this;
   // 创建面板
   var hl = o._hDropLayout = MO.Window.Builder.appendDiv(o._hDropPanel)
   // 创建内容表格
   var hf = o._hItemsForm = MO.Window.Builder.appendTable(hl);
   o._hItemsBody = MO.Window.Builder.append(hf, 'TBODY');
}

//==========================================================
// <T>项目点击事件处理。</T>
//
// @method
//==========================================================
MO.FDuiSelectEditor_onItemClick = function FDuiSelectEditor_onItemClick(p){
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
MO.FDuiSelectEditor_onEditKeyDown = function FDuiSelectEditor_onEditKeyDown(p){
   var o = this;
   switch(p.keyCode){
      case MO.EKeyCode.Up:
         o.select(o._position - 1);
         break;
      case MO.EKeyCode.Down:
         o.select(o._position + 1);
         break;
      case MO.EKeyCode.Enter:
         o.editEnd();
         break;
      case MO.EKeyCode.Esc:
         o.editCancel();
         break;
   }
}

//==========================================================
// <T>处理结束编辑事件。</T>
//
// @method
//==========================================================
MO.FDuiSelectEditor_onEditEnd = function FDuiSelectEditor_onEditEnd(){
   var o = this;
   var s = o._source;
   var c = o._items.value(o._position);
   s.selectItem(c);
   o.__base.FDuiDropEditor.onEditEnd.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiSelectEditor_construct = function FDuiSelectEditor_construct(){
   var o = this;
   o.__base.FDuiDropEditor.construct.call(o);
   // 设置变量
   o._valueRectangle = new MO.SRectangle();
}

//==========================================================
// <T>测试是否可以失去焦点。</T>
//
// @method
// @param c:control:FControl 控件
//==========================================================
MO.FDuiSelectEditor_testBlur = function FDuiSelectEditor_testBlur(c){
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
MO.FDuiSelectEditor_clearItems = function FDuiSelectEditor_clearItems(){
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
// @param p:control:FDuiSelect 下拉选择框
//==========================================================
MO.FDuiSelectEditor_buildItems = function FDuiSelectEditor_buildItems(p){
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
      //   var hr = MO.Window.Builder.append(hb, 'TR');
      //   hr.height = 1;
      //   var hd = MO.Window.Builder.append(hr, 'TD');
      //   hd.colSpan = 3;
      //   hd.style.borderTop = '1 dashed #24C2DB';
      //   //MO.Window.Builder.appendEmpty(hd);
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
MO.FDuiSelectEditor_get = function FDuiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}

//==========================================================
// <T>设置选中内容。</T>
//
// @method
// @param p:dataValue:String 数据内容
//==========================================================
MO.FDuiSelectEditor_set = function FDuiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count();
   for(var i = 0; i < pc; i++){
      var p = ps.value(i);
      if(MO.Lang.String.equals(p._dataValue, v, true)){
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
MO.FDuiSelectEditor_select = function FDuiSelectEditor_select(p){
   var o = this;
   var s = o._items;
   var c = s.count();
   // 检查范围
   var n = MO.Lang.Integer.toRange(p, 0, c - 1);
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
MO.FDuiSelectEditor_fetch = function FDuiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o._source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o._source.editRefer;
      var doc = MO.Console.find(MO.FCodeListConsole).fetch(g);
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
// @param visible:Boolean 是否显示
//==========================================================
MO.FDuiSelectEditor_setVisible = function FDuiSelectEditor_setVisible(visible){
   var o = this;
   o.__base.FDuiDropEditor.setVisible.call(o, visible);
   // 获得变量
   var hPanel = o._hPanel;
   var hItemsForm = o._hItemsForm;
   // 显示处理
   if(visible){
      // 计算位置
      var source = o._source;
      var rectangle = source.calculateValueRectangle(o._valueRectangle);
      hItemsForm.width = '';
      var formWidth = hItemsForm.offsetWidth;
      // 设置位置
      hPanel.style.left = rectangle.left + 'px';
      hPanel.style.top = rectangle.bottom() + 'px';
      hPanel.style.width = Math.max(formWidth, rectangle.width) + 'px';
      hItemsForm.width = '100%';
      if(hItemsForm.offsetHeight > o._minHeight){
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
MO.FDuiSelectEditor_dispose = function FDuiSelectEditor_dispose(){
   var o = this;
   // 释放属性
   o._valueRectangle = MO.Lang.Object.dispose(o._valueRectangle);
   o._hDropLayout = MO.Window.Html.free(o._hDropLayout);
   o._hItemsForm = MO.Window.Html.free(o._hItemsForm);
   // 父处理
   o.__base.FDuiDropEditor.dispose.call(o);
}
