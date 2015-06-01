//==========================================================
// <T>表格页面。</T>
//
// @class FTable, MTop
// @history 091105 MAOCY 创建
//==========================================================
function FWebTable(o){
   o = RClass.inherits(this, o, FTable, MTop);
   //..........................................................
   // @process
   o.oeBuild = FWebTable_oeBuild;
   return o;
}

//==========================================================
// <T>表格页面。</T>
//
// @method
// @param e:event:TEvent 构建事件
//==========================================================
function FWebTable_oeBuild(e){
   var o = this;
   var r = o.base.FTable.oeBuild.call(o, e);
   if(e.isAfter()){
      //o.border.setVisible(true);
	   //o.border.setBorderColor('#25BBD4');
      //o.hHintForm.style.borderTop = '1 solid #4F9FDF';
   }
   return r;
}
