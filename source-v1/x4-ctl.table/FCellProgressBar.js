//==========================================================
// <T>��ʾ������ĵ�Ԫ��ؼ���</T>
//
// hPanel<TD>
// ��------------------------------------------------------��
// �� hProcess<DIV>                                        ��
// ����--------------------------------------------------����
// ���� hInner<DIV>                                      ����
// ������----------------------------------------------������
// ������----------------------------------------------������
// ����--------------------------------------------------����
// �� hProcess<DIV>                                        ��
// ����--------------------------------------------------����
// ����--------------------------------------------------����
// ��------------------------------------------------------��
//==========================================================
function FCellProgressBar(o){
   o = RClass.inherits(this, o, FCell);
   // Style
   o.stForm        = RClass.register(o, new TStyle('Form'));
   // Html
   o.hForm         = null;
   o.hProgressForm = null;
   o.hProgress     = null;
   o.hText         = null;
   // Method
   o.buildForm     = FCellProgressBar_buildForm;
   // @method
   o.isDataChanged = RMethod.emptyFalse;
   o.get           = RMethod.empty;
   o.reget         = RMethod.empty;
   o.set           = FCellProgressBar_set;
   o.dispose       = FCellProgressBar_dispose;
   return o;
}

//==========================================================
// <T>������Ԫ��ı?�װ塣</T>
//
// @method
// @return HTML td��ǩ
//==========================================================
function FCellProgressBar_buildForm(){
   var o = this;
   var hp = o.hPanel;
   hp.style.paddingTop = 4;
   var hf = o.hForm = RBuilder.appendTable(hp);
   hf.style.width = '100%';
   hf.style.height = '100%';
   var hfr = hf.insertRow();
   // ������ȵװ�
   var hpf = o.hProgressForm = RBuilder.appendTable(hfr.insertCell());
   hpf.width = '100%';
   hpf.height = '10';
   hpf.style.tableLayout = 'fixed';
   hpf.style.backgroundColor = '#F0EFEF';
   // ���������
   var hr = hpf.insertRow();
   o.hProgress = hr.insertCell();
   //o.hProgress.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(gradienttype=1,startcolorstr=#EDF9FA,endcolorstr=#29BAD5)';
   hr.insertCell();
   // �����ı��װ�
   var ht = o.hText = hfr.insertCell();
   ht.width = 40;
   ht.align = 'right';
   ht.noWrap = true;
   ht.style.color = EColor.TextReadonly;
   ht.style.paddingRight = 4;
}

//==========================================================
// <T>����������ݡ�</T>
//
// @method
// @param v:value:String �������
//==========================================================
function FCellProgressBar_set(v){
   var o = this;
   var c = o.column;
   // ����������
   var arv = RString.split(v, '|');
   var vd = arv ? (arv.length > 0 ? arv[0] : 0) : 0;
   var vt = arv ? (arv.length > 1 ? arv[1] : 0) : 0;
   var vc =  '#FF8040';
   // ���ÿ��
   vt = (vt == 0 ? 1:vt);
   o.hProgress.width = vt;
   if(vc){
	   o.hProgress.style.backgroundColor = vc;
	   o.hProgress.style.border = '1 solid #CCCCCC';
	   o.hProgressForm.style.border
   }
   o.hProgressForm.title = vt;
   o.hText.innerText = vd + '(' + vt + ')';
}

//==========================================================
// <T>�ͷŶ���</T>
//
// @method
//==========================================================
function FCellProgressBar_dispose(){
   var o = this;
   o.base.FCell.dispose.call(o);
   o.hForm = null;
   o.hProgressForm = null;
   o.hProgress = null;
   o.hText = null;
}
