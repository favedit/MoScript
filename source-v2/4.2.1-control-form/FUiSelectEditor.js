//==========================================================
// <T>下拉选择框编辑器。</T>
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FUiDropEditor, MListenerItemClick);
   //..........................................................
   // @attribute
   o._minHeight   = 300;
   o._minWidth    = 160;
   o._mouseDownEvent = new TEvent();
   o._items         = null;
   o._position      = null;
   //..........................................................
   // @html
   o._hDropLayout   = null;
   o._hItemsForm    = null;
   //..........................................................
   // @event
   o.onItemClick   = FUiSelectEditor_onItemClick;
   o.onEditKeyDown = FUiSelectEditor_onEditKeyDown;
   o.onBuildDrop   = FUiSelectEditor_onBuildDrop;
   //..........................................................
   // @method
   o.construct     = FUiSelectEditor_construct;
   o.testBlur      = FUiSelectEditor_testBlur;
   o.setItems      = FUiSelectEditor_setItems;
   o.get           = FUiSelectEditor_get;
   o.set           = FUiSelectEditor_set;
   o.select        = FUiSelectEditor_select;
   o.fetch         = FUiSelectEditor_fetch;
   o.show          = FUiSelectEditor_show;
   o.dispose       = FUiSelectEditor_dispose;
   return o;
}

//==========================================================
// <T>���ѡ����Ŀ��</T>
//
// @method
//==========================================================
function FUiSelectEditor_onItemClick(s){
   var o = this;
   var t = o.__source;
   o._position = o._items.indexOf(s);
   o.editEnd();
   // 事件的修改
   if(t){
      t.callEvent('onItemClick', t, o._mouseDownEvent);
   }
}

//==========================================================
// <T>���������Ŀ��</T>
//
// @method
//==========================================================
function FUiSelectEditor_onEditKeyDown(s, e){
   var o = this;
   switch(e.keyCode){
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
// <T>����������</T>
//
// @method
//==========================================================
function FUiSelectEditor_onBuildDrop(){
   var o = this;
   // ��������������
   var hdl = o._hDropLayout = RBuilder.append(o._hDropPanel, 'DIV')
   // ��������
   var hif = o._hItemsForm = RBuilder.appendTable(hdl);
   o._hItemsPanel = RBuilder.append(hif, 'TBODY');
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
// <T>�����Ƿ����ʧȥ���㡣</T>
//
// @method
// @param c:control:FControl Ҫ��ý���Ŀؼ�
//==========================================================
function FUiSelectEditor_testBlur(c){
   var o = this;
   if(o.source == c){
      return false;
   }
   return !this._items.contains(c);
}

//==========================================================
// <T>�����б����</T>
//
// @method
// @param c:control:FControl �ؼ�
//==========================================================
function FUiSelectEditor_setItems(items){
   var o = this;
   // ����Ƿ������
   if(o._items){
      return;
   }
   // ������Ŀ����
   var is = o._items = new TList();
   var hip = o._hItemsPanel;
   var count = items.count();
   for(var n = 0; n < count; n++){
      // 建立分割线
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24C2DB';
         RBuilder.appendEmpty(hd);
      }
      // 建立控件Ŀ
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      //c.lsnsClick.push(o._lsnItemClick);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      is.push(c);
      o.push(c);
   }
   o._position = 0;
}

//==========================================================
// <T>����������ݡ�</T>
//
// @method
//==========================================================
function FUiSelectEditor_get(){
   var o = this;
   return o._items.get(o._position).value;
}

//==========================================================
// <T>����������ݡ�</T>
//
// @method
//==========================================================
function FUiSelectEditor_set(v){
   var o = this;
   o._position = -1;
   var ps = o._items;
   var pc = ps.count;
   for(var n=0; n<pc; n++){
      var p = ps.get(n);
      if(RString.equals(p.value, v)){
         o._position = n;
         p.setChecked(true);
      }else{
         p.setChecked(false);
      }
   }
}

//==========================================================
// <T>ѡ��ָ��λ����Ŀ��</T>
//
// @method
// @param p:position:Integer ����λ��
//==========================================================
function FUiSelectEditor_select(p){
   var o = this;
   var is = o._items;
   var ic = is.count;
   // �����Чλ��
   p = Math.min(Math.max(0, p), ic-1)
   // ѡ����Ŀ
   for(var n=0; n<ic; n++){
      is.get(n).setChecked(n == p);
   }
   o._position = p;
}

//==========================================================
// <T>��ȡ��ݡ�</T>
//
// @method
//==========================================================
function FUiSelectEditor_fetch(){
   var o = this;
   if(!o.hasFetched){
      var g = new TCodeListServiceArg();
      var f = o.source.topControl(MDataset);
      g.values = f.getCurrentRows();
      g.name = o.source.editRefer;
      var doc = RConsole.find(FCodeListConsole).fetch(g);
      if(doc){
         var edt = o.source;
         edt._items.clear();
         edt._items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}

//==========================================================
// <T>显示处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_show(v){
   var o = this;
   o.__base.FUiDropEditor.show.call(o, v);
   // 获得变量
   var hp = o.hPanel;
   var hif = o._hItemsForm;
   var hbf = o.hBorderForm;
   // 获得位置
   var s = o.source;
   var r = s.getEditRange();
   hif.width = null;
   var iw = hif.offsetWidth;
   // 设置位置
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = Math.max(iw, r.width);
   hif.width = '100%';
   if(hif.offsetHeight > o._minHeight){
      o._hDropLayout.style.overflowY = 'scroll';
      o._hDropLayout.style.pixelHeight = o._minHeight;
   }
   // 显示阴影
   o.__base.MShadow.show.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiSelectEditor_dispose(){
   var o = this;
   o.__base.FUiDropEditor.dispose.call(o);
   o._hDropLayout = null;
   o._hItemsForm = null;
}
