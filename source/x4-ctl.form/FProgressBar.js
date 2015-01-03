// ============================================================
// FProgressBar
// ============================================================
function FProgressBar(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   // Property
   //Attribute
   o.hUnit          = null;
   o.borderStyle    = EBorder.Round;
   // Event
   o.onBuildEdit    = FProgressBar_onBuildEdit;
   o.onBuildControl = FProgressBar_onBuildControl;
   // Method
   o.formatValue    = FProgressBar_formatValue;
   o.text           = FProgressBar_text;
   o.set            = FProgressBar_set;
   o.get            = RMethod.Empty;
   o.dispose        = FProgressBar_dispose;
   return o;
}
// ------------------------------------------------------------
function FProgressBar_onBuildEdit(b){
   var o = this;
   var htb = o.hEdit = o.hPanelForm = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout  = 'fixed';
   htb.height = 10;
   var hr = htb.insertRow();
   var value = '0%';
   var v = RFloat.parse(RString.nvl(value));
   v = v * 100;
   v = v + "%";
   var hc1 = hr.insertCell();
   hc1.style.width = v;
   hc1.style.backgroundColor = '#29BAD5';
   var hc2 = hr.insertCell();
   htb.title  = v;
}
// ------------------------------------------------------------
function FProgressBar_onBuildControl(e){
   var o = this;
   o.base.FEditControl.onBuildControl.call(o);
   if(o.editUnit){
      var h = o.hUnit = o.hControlRow.insertCell();
      h.className = o.style('Unit');
      h.innerText = o.editUnit;
   }
}
// ------------------------------------------------------------
function FProgressBar_formatValue(text){
   this.hEdit.value = text;
}
// ------------------------------------------------------------
function FProgressBar_text(t){
   var o = this;
   // 数据必须的校验
   if(RString.isEmpty(t)){
      if(o.validRequire){
         return false;
      }
   }
   return true;
}
// ------------------------------------------------------------
function FProgressBar_set(value){
   var o = this;
   var htb = o.hPanelForm;
   if(!RString.isEmpty(value)){
      htb.innerText = '';
      htb.style.tableLayout  = 'fixed';
      htb.height = 10;
      var hr = htb.insertRow();
      var v = RFloat.parse(RString.nvl(value));
      v = v * 100;
      v = v + "%";
      var hc1 = hr.insertCell();
      hc1.style.width = v;
      hc1.style.backgroundColor = '#29BAD5';
      var hc2 = hr.insertCell();
      htb.title  = v;
   }
}
// ------------------------------------------------------------
function FProgressBar_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEdit = null;
   o.hPanelForm = null;
   o.hControlRow = null;
}