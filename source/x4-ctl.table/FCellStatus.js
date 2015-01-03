//==========================================================
// <T>״̬��Ԫ��</T>
//
// hPanel<TD>
// ��------------------------------------------------------��
// �� hStatus<IMG>                                         ��
// ��------------------------------------------------------��
//
// @class FCellEditControl
//==========================================================
function FCellStatus(o){
   o = RClass.inherits(this, o, FCellEditControl);
   //..........................................................
   // @property
   o.dataName      = '_status';
   //..........................................................
   // @html
   o.hStatus       = null;
   //..........................................................
   // @event
   //o.onStatusEnter = RClass.register(o, new HMouseEnter('onStatusEnter'), FCellStatus_onStatusEnter);
   //..........................................................
   // @method
   o.buildForm     = FCellStatus_buildForm;
   o.isDataChanged = RMethod.emptyFalse;
   o.get           = RMethod.empty;
   o.reget         = RMethod.empty;
   o.set           = RMethod.empty;
   o.setIcon       = FCellStatus_setIcon;
   o.refreshStyle  = FCellStatus_refreshStyle;
   o.dispose       = FCellStatus_dispose;
   return o;
}

//==========================================================
// <T>���������뵥Ԫ���¼���</T>
//
// @method
//==========================================================
function FCellStatus_onStatusEnter(){
   this.row.table.getRowBar().linkCell(this);
}

//==========================================================
// <T>�ڵ�Ԫ���ڱ༭���༭�ؼ���</T>
//
// @method
//==========================================================
function FCellStatus_buildForm(){
   var o = this;
   var c = o.column;
   var hp = o.hPanel;
   // �����װ�
   hp.align = 'center';
   hp.style.paddingTop = 2;
   hp.style.paddingBottom = 2;
   hp.style.cursor='normal';
   c.linkEvent(o, 'onCellClick', hp, c.onCellClick);
   // ����״̬ͼ��
   o.hStatus = RBuilder.appendIcon(hp, o.column.styleIcon(c.table.isFormLinked() ? 'Normal' : 'Normal'));
   // �����й�����
   if(c.table.dispRowbar){
      //o.attachEvent('onStatusEnter', o.hStatus);
   }
}

//==========================================================
// <T>����ͼ�ꡣ</T>
//
// @method
// @param s:statusIcon:String ͼ��
//==========================================================
function FCellStatus_setIcon(s){
   this.hStatus.src = s;
}

//==========================================================
// <T>ˢ�µ�Ԫ����ʽ��</T>
//
// @method
//==========================================================
function FCellStatus_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(r.isDataChanged()){
      p = 'Changed';
   }else{
      p = t.isFormLinked() ? 'Normal' : 'Normal';
   }
   o.setIcon(o.column.styleIconPath(p));
}

//==========================================================
// <T>�ͷŵ�Ԫ���ڵ����ж���</T>
//
// @method
//==========================================================
function FCellStatus_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o.hStatus = null;
}
