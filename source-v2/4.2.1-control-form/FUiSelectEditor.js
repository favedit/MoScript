//==========================================================
// <T>����ѡ���</T>
//
// @class FDropEditor, MShadow
// @history 091103 MAOCY ����
//==========================================================
function FUiSelectEditor(o){
   o = RClass.inherits(this, o, FDropEditor);
   //..........................................................
   // @attribute
   o.__minHeight   = 300;
   o.__minWidth    = 160;
   o.items         = null;
   o.position      = null;
   o.lsnItemClick  = null;
   // @html
   o.hDropLayout   = null;
   o.hItemsForm    = null;
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
   o.__mouseDownEvent  = new TEvent();
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
   o.position = o.items.indexOf(s);
   o.editEnd();
   // 事件的修改
   if(t){
      t.callEvent('onItemClick', t, o.__mouseDownEvent);
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
      case EKey.Up:
         o.select(o.position - 1);
         break;
      case EKey.Down:
         o.select(o.position + 1);
         break;
      case EKey.Enter:
         o.editEnd();
         break;
      case EKey.Esc:
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
   var hdl = o.hDropLayout = RBuilder.append(o.hDropPanel, 'DIV')
   // ��������
   var hif = o.hItemsForm = RBuilder.appendTable(hdl);
   o.hItemsPanel = RBuilder.append(hif, 'TBODY');
}

//==========================================================
// <T>�������</T>
//
// @method
//==========================================================
function FUiSelectEditor_construct(){
   var o = this;
   o.lsnItemClick = new TListener(o, o.onItemClick);
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
   return !this.items.contains(c);
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
   if(o.items){
      return;
   }
   // ������Ŀ����
   var is = o.items = new TList();
   var hip = o.hItemsPanel;
   var count = items.count();
   for(var n=0; n<count; n++){
      // �����ָ���
      if(n > 0){
         var hr = RBuilder.append(hip, 'TR');
         hr.height = 1;
         var hd = RBuilder.append(hr, 'TD');
         hd.colSpan = 3;
         hd.style.borderTop = '1 dashed #24C2DB';
         RBuilder.appendEmpty(hd);
      }
      // ������Ŀ
      var t = items.get(n);
      var c = RControl.create(FSelectItem);
      c.name = t.value;
      c.lsnsClick.push(o.lsnItemClick);
      c.set(t.icon, t.label, t.value);
      c.setPanel(hip);
      is.push(c);
      o.push(c);
   }
   o.position = 0;
}

//==========================================================
// <T>����������ݡ�</T>
//
// @method
//==========================================================
function FUiSelectEditor_get(){
   var o = this;
   return o.items.get(o.position).value;
}

//==========================================================
// <T>����������ݡ�</T>
//
// @method
//==========================================================
function FUiSelectEditor_set(v){
   var o = this;
   o.position = -1;
   var ps = o.items;
   var pc = ps.count;
   for(var n=0; n<pc; n++){
      var p = ps.get(n);
      if(RString.equals(p.value, v)){
         o.position = n;
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
   var is = o.items;
   var ic = is.count;
   // �����Чλ��
   p = Math.min(Math.max(0, p), ic-1)
   // ѡ����Ŀ
   for(var n=0; n<ic; n++){
      is.get(n).setChecked(n == p);
   }
   o.position = p;
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
         edt.items.clear();
         edt.items.loadConfig(doc.root().nodes.get(0));
      }
      o.hasFetched = true;
   }
}

//==========================================================
// <T>��ʾ�ؼ���</T>
//
// @method
//==========================================================
function FUiSelectEditor_show(v){
   var o = this;
   // ������
   o.base.FDropEditor.show.call(o, v);
   // ��ȡ�װ�
   var hp = o.hPanel;
   var hif = o.hItemsForm;
   var hbf = o.hBorderForm;
   // ������ʾλ��
   var s = o.source;
   var r = s.getEditRange();
   hif.width = null;
   var iw = hif.offsetWidth;
   // �������
   hp.style.pixelLeft = r.x;
   hp.style.pixelTop = r.y + r.height;
   hp.style.pixelWidth = Math.max(iw, r.width);
   hif.width = '100%';
   if(hif.offsetHeight > o.__minHeight){
      o.hDropLayout.style.overflowY = 'scroll';
      o.hDropLayout.style.pixelHeight = o.__minHeight;
   }
   // ��ʾ��Ӱ
   o.base.MShadow.show.call(o);
}

//==========================================================
// <T>�ͷſؼ���</T>
//
// @method
//==========================================================
function FUiSelectEditor_dispose(){
   var o = this;
   o.base.FDropEditor.dispose.call(o);
   o.hDropLayout = null;
   o.hItemsForm = null;
}
