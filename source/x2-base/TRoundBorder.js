// =========================================================
// TRoundBorder
// =========================================================
function TRoundBorder(){
   var o = this;
   // @attribute
   o.colorDark  = '#24C2DB'
   o.colorLight = '#24C2DB'
   // @method
   o.build      = TRoundBorder_build;
   o.setColor   = TRoundBorder_setColor;
   return o;
}
// ---------------------------------------------------------
function TRoundBorder_build(hp){
   var o = this;
   o.hParent = hp;
   // 建立表单
   var hf = o.hForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   hf.height = '100%';
   hf.style.tableLayout = 'fixed';
   // 建立上边框
   var hc = o.hTopPanel = hf.insertRow().insertCell();
   hc.height = 2;
   o.hTop = RBuilder.append(hc, 'DIV', 'RBorder_Top');
   o.hBefore = RBuilder.append(hc, 'DIV', 'RBorder_Before');
   // 建立中间底板
   var hr = o.hLine = hf.insertRow();
   o.hPanel = hr.insertCell();
   o.hPanel.style.borderLeft = '1 solid #24C2DB'
   o.hPanel.style.borderRight = '1 solid #24C2DB'
   // 建立下边框
   var hc = o.hTopPanel = hf.insertRow().insertCell();
   hc.height = 2;
   o.hAfter = RBuilder.append(hc, 'DIV', 'RBorder_After');
   o.hBottom = RBuilder.append(hc, 'DIV', 'RBorder_Bottom');
}
// ---------------------------------------------------------
function TRoundBorder_setColor(c){
   var o = this;
   // 设置左上角颜色
   o.hTop.style.backgroundColor = c;
   o.hBefore.style.borderLeftColor = c;
   o.hBefore.style.borderRightColor = c;
   o.hPanel.style.borderLeftColor = c;
   // 设置右下角颜色
   o.hPanel.style.borderRightColor = c;
   o.hAfter.style.borderLeftColor = c;
   o.hAfter.style.borderRightColor = c;
   o.hBottom.style.backgroundColor = c;
}
