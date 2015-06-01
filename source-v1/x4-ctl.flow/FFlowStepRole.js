//==========================================================
// 按钮控件
//
// @class FControl, MDesign, MEventClick, MLsnClick
// @author maochunyang
// @version 1.0.1
//==========================================================
function FFlowStepRole(o){
   o = RClass.inherits(this, o, FContainer);
    o.oeBuild = FFlowStepRole_oeBuild;
   return o;
}
//==========================================================
function FFlowStepRole_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      var hfp = o.hFormPanel = RBuilder.appendDiv(hp);
      // 创建底板
      var hf = o.hForm = RBuilder.appendTable(hfp);
   }else if(e.isAfter()){
      var hf = o.hForm;
      var ps = o.components;
      if(ps){
         for(var n=0; n<ps.count; n++){
            var p = ps.value(n);
            if(RClass.isClass(p, FFlowExamine)){
               var hc = o.hForm.insertRow().insertCell();
               hc.style.padding = '1 3';
               hc.appendChild(p.hPanel);
            }
         }
      }
   }
   return r;
}
