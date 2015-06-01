//==========================================================
// <T>��ѡ��Ԫ��</T>
//
// @class FEditControl, MDescCheck
// @history 091020 MAOCY ����
//==========================================================
function FCellCheck(o){
   o = RClass.inherits(this, o, FCellEditControl, MDescCheck);
   //..........................................................
   // @attribute
   o.__recordValue = EBoolean.False;
   o.__editUpdate  = true;
   //..........................................................
   // @method
   o.buildEdit     = FCellCheck_buildEdit;
   o.testFocus     = RMethod.emptyFalse;
   o.clearValue    = MDescCheck_clearValue;
   o.resetValue    = MDescCheck_resetValue;
   o.text          = MDescCheck_text;
   o.setText       = MDescCheck_setText;
   o.setInfo       = FCellCheck_setInfo;
   o.validText     = RMethod.empty;
   o.refreshStyle  = FCellCheck_refreshStyle;
   return o;
}
//==========================================================
// <T>�ڵ�Ԫ���ڱ༭���༭�ؼ���</T>
//
// @method
//==========================================================
function FCellCheck_buildEdit(){
   var o = this;
   var hep = o.hEditPanel;
   hep.align = 'center';
   var he = o.hEdit = RBuilder.appendCheck(hep, o.style('Edit'));
   he.style.cursor = 'hand';
}

//==========================================================
// <T>���������Ϣ��ˢ����ʽ��</T>
//
// @method
//==========================================================
function FCellCheck_refreshStyle(){
   var o = this;
   o.base.FCellEditControl.refreshStyle.call(o);
   // ����Ƿ�ɱ༭
   var e = o.column.isEditAble(o.row);
   // ����Ƿ���Ա༭������ʽ
   if(o.hEdit){
	  if(e){
         o.hEdit.disabled = !o.__editUpdate;
	  }else{
		 o.hEdit.style.cursor = 'normal';
		 o.hEdit.disabled = true;
	  }
   }
}

//==========================================================
//<T>���������Ϣ��ˢ����ʽ��</T>
//
//@method
//==========================================================
function FCellCheck_setInfo(f){
	var o = this;
	o.__editUpdate = RBoolean.isTrue(f.enable);
	o.hEdit.disabled = !RBoolean.isTrue(f.enable);
	o.hEdit.style.display = RBoolean.isTrue(f.visible) ? 'block' : 'none';
    return;
}