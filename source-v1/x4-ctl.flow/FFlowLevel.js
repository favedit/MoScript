//==========================================================
// 按钮控件
//
// @class FControl, MDesign, MEventClick, MLsnClick
// @author maochunyang
// @version 1.0.1
//==========================================================
function FFlowLevel(o){
   o = RClass.inherits(this, o, FContainer);
    o.oeBuild = FFlowLevel_oeBuild;
   return o;
}
//==========================================================
function FFlowLevel_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      var hf = o.hForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      hf.bgColor = '#FFFFFF';
      hf.style.borderLeft = '1 solid #999999';
      hf.style.borderTop = '1 solid #999999';
      hf.style.borderRight = '1 solid #CCCCCC';
      hf.style.borderBottom = '1 solid #CCCCCC';
      //o.hFormLine = hf.insertRow();
   }else if(e.isAfter()){
      var hf = o.hForm;
      var ps = o.components;
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         if(RClass.isClass(p, FFlowExamine)){
            var hc = o.hForm.insertRow().insertCell();
            hc.style.padding = 2;
            hc.appendChild(p.hPanel);
         }
      }
   }
   return r;
}
