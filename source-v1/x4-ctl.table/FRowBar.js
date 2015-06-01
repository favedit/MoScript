//==========================================================
// FRowBar
//==========================================================
function FRowBar(o){
   o = RClass.inherits(this, o, FControl);
   // @attribute
   o.table         = null;
   o.row           = null;
   // @event
   o.onBarLeave    = RClass.register(o, new HMouseLeave('onBarLeave'), FRowBar_onBarLeave);
   o.onRowClick    = RClass.register(o, new HClick('onRowClick'), FRowBar_onRowClick);
   o.onButtonEnter = RClass.register(o, new HMouseEnter('onButtonEnter'), FRowBar_onButtonEnter);
   o.onButtonLeave = RClass.register(o, new HMouseLeave('onButtonLeave'), FRowBar_onButtonLeave);
   o.onInsertClick = RClass.register(o, new HClick('onInsertClick'), FRowBar_onInsertClick);
   o.onCopyClick   = RClass.register(o, new HClick('onCopyClick'), FRowBar_onCopyClick);
   // @process
   o.oeBuild       = FRowBar_oeBuild;
   // @method
   o.buildButton   = FRowBar_buildButton;
   o.linkCell      = FRowBar_linkCell;
   return o;
}
//==========================================================
function FRowBar_onRowClick(){
   var o = this;
   // ���صװ�
   o.hide();
   // ����пؼ�
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, o.row, o.row);
}
//==========================================================
function FRowBar_onInsertClick(){
   var o = this;
   var t = o.table;
   // ��������
   var i = t.rows.indexOf(o.row);
   var r = t.createRow();
   t.insertRow(i, r);
   r.doInsert();
   // ˢ����ʽ
   r.refreshStyle();
   // ���صװ�
   o.hide();
}
//==========================================================
function FRowBar_onCopyClick(){
   var o = this;
   var t = o.table;
   // ��������
   var i = t.rows.indexOf(o.row);
   var r = t.createRow();
   t.insertRow(i, r);
   r.doInsert();
   // ����������
   var cc = o.row.cells.count;
   for(var n=0; n<cc; n++){
      var c = r.cells.value(n);
      if(c.column.editCopy){
         c.set(o.row.cells.value(n).reget());
      }
   }
   // ˢ����ʽ
   r.refreshStyle();
   // ���صװ�
   o.hide();
}
//==========================================================
function FRowBar_onButtonEnter(e){
   var o = this;
   var hs = e.hSource.style;
   hs.margin = 0;
   hs.borderLeft = '1 solid #666666';
   hs.borderTop = '1 solid #666666';
   hs.borderRight = '1 solid #CCCCCC';
   hs.borderBottom = '1 solid #CCCCCC';
}
//==========================================================
function FRowBar_onButtonLeave(e){
   var hs = e.hSource.style;
   hs.margin = 1;
   hs.border = '0';
}
//==========================================================
function FRowBar_onBarLeave(){
   this.hide();
}
//==========================================================
function FRowBar_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   // ���õװ�
   var hp = o.hPanel;
   hp.style.width = 180;
   hp.style.position = 'absolute';
   hp.style.zIndex = 4;
   o.attachEvent('onBarLeave', hp);
   // ����״̬��
   var hf = o.hTitleForm = RBuilder.appendTable(o.hPanel, null, 0, 2);
   hf.width = '100%';
   hf.style.backgroundColor = '#999999';
   hf.style.borderTop = '1 solid #CCCCCC'
   hf.style.borderLeft = '1 solid #CCCCCC'
   hf.style.borderRight = '1 solid #666666'
   hf.style.borderBottom = '1 solid #666666'
   var hr = hf.insertRow();
   // ����ͼ��
   var hc = o.hSelect = hr.insertCell();
   hc.style.cursor = 'hand';
   o.attachEvent('onRowClick', hc);
   RBuilder.appendIcon(hc, 'ctl.FColumnStatus_NormalEnter');
   // �����½�����
   o.buildButton(hr.insertCell(), 'Insert');
   // �������ư���
   o.buildButton(hr.insertCell(), 'Copy');
   // �����հ���
   var hc = hr.insertCell();
   hc.innerHTML = '&nbsp;';
   // ������Ϣ��
   var hc = o.hTools = hr.insertCell();
   var hf = o.hToolForm = RBuilder.appendTable(o.hPanel);
   hf.cellPadding = 4;
   hf.width = '100%';
   hf.style.color = '#666666';
   hf.style.borderLeft = '1 solid #CCCCCC';
   hf.style.borderRight = '1 solid #CCCCCC';
   hf.style.borderBottom = '1 solid #CCCCCC';
   hf.style.backgroundColor = '#F8F8C0'
   // ��������
   var hr = hf.insertRow();
   var hc = o.hStatus = hr.insertCell();
   return EEventStatus.Stop;
}
//==========================================================
function FRowBar_buildButton(hp, n){
   var o = this;
   var nl = n.toLowerCase();
   hp.width = 1;
   // �����װ�
   var hf = o['h' + n + 'ButtonForm'] = RBuilder.appendTable(hp, null, 0, 2);
   hf.width = 1;
   hf.style.margin = 1;
   hf.style.cursor = 'hand';
   o.attachEvent('onButtonEnter', hf);
   o.attachEvent('onButtonLeave', hf);
   o.attachEvent('on' + n + 'Click', hf);
   var hbr = hf.insertRow();
   // ����ͼ��
   RBuilder.appendIcon(hbr.insertCell(), 'tool.' + nl);
   // �����ı�
   var hc = hbr.insertCell();
   hc.noWrap = true;
   hc.style.padding = '0 4';
   hc.style.color = '#FFFFFF';
   RBuilder.appendText(hc, RContext.get('FRowBar:' + n));
}
//==========================================================
function FRowBar_linkCell(c){
   var o = this;
   var hp = o.hPanel;
   var hs = hp.style;
   hs.display = 'none';
   var r = o.row = c.row;
   var t = r.table;
   var dr = t.calculateDataSize();
   var cw = c.hPanel.offsetWidth;
   // ���õװ�λ��
   hs.display = 'block';
   hs.pixelTop = c.hPanel.offsetTop + dr.top - 2;
   hs.pixelLeft = 0;
   o.hSelect.width = cw - 2;
   o.hToolForm.style.marginLeft = cw - 1;
   o.hToolForm.style.pixelWidth = o.hTitleForm.offsetWidth - cw + 1;
   // ��ʾ��Ϣ
   var ouid = r.cells.get('ouid')
   var id = ouid ? ouid.get() : '';
   var s = '';
   if(id){
      if(t._formLinked){
         s = RContext.get('FCellStatus:Detail', id);
      }else{
         s = RContext.get('FCellStatus:Code', id);
      }
   }
   o.hStatus.innerText = s;
}
