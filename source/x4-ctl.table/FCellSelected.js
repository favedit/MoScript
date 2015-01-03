//==========================================================
// <T>״行选择列</T>
//
// @class FCellEditControl
//==========================================================
function FCellSelected(o){
   o = RClass.inherits(this, o, FCellEditControl);
   // @property
   o.dataName      = '_select';
   // @html
   o.hSelected       = null;
   // @method
   o.buildForm     = FCellSelected_buildForm;
   o.onSelected    = FCellSelected_onSelected;
   o.refreshStyle  = FCellSelected_refreshStyle;
   o.isDataChanged = RMethod.emptyFalse;
   o.get           = RMethod.empty;
   o.reget         = RMethod.empty;
   o.set           = RMethod.empty;
   o.dispose       = FCellSelected_dispose;
   return o;
}

//==========================================================
// <T>建立底板</T>
//
// @method
//==========================================================
function FCellSelected_buildForm(){
   var o = this;
   var c = o.column;
   var hp = o.hPanel;
   hp.align = 'center';
   o.hSelected = RBuilder.appendCheck(hp, o.style('Edit'));
   o.hSelected.parent = o;
   o.hSelected.onclick = o.onSelected;
}

//==========================================================
//<T>ˢ�µ�Ԫ����ʽ��</T>
//
//@method
//==========================================================
function FCellSelected_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(t.dispSelected){
	   o.hPanel.style.display = 'block';
	   if(r.isSelect){
	      o.hSelected.checked = true;
	      o.hPanel.style.backgroundColor = '#CEE7FF';
	   }else{
		   o.hSelected.checked = false;
		   o.hPanel.style.backgroundColor = '#FFFFFF';
	   }
   }else{
	   o.hPanel.style.display = 'none';
   }
}

//==========================================================
//<T>释放对象。</T>
//
//@method
//==========================================================
function FCellSelected_onSelected(){
   var r = this.parent.row;
   var t = this.parent.table;
   if(this.checked){
      t.selectRow(r, false, true);
   }else{
	  t.clearSelectRow(r);
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FCellSelected_dispose(){
   var o = this;
   o.base.FCellEditControl.dispose.call(o);
   o.hSelected = null;
}
