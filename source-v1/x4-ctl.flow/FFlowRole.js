//==========================================================
// 按钮控件
//
// @class FControl, MDesign, MEventClick, MLsnClick
// @author maochunyang
// @version 1.0.1
//==========================================================
function FFlowRole(o){
   o = RClass.inherits(this, o, FContainer);
    o.oeBuild = FFlowRole_oeBuild;
   return o;
}
//==========================================================
function FFlowRole_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      var hfp = o.hFormPanel = RBuilder.appendDiv(hp);
      hfp.style.backgroundColor = '#FFFFFF';
      hfp.style.borderLeft = '1 solid #999999';
      hfp.style.borderTop = '1 solid #999999';
      hfp.style.borderRight = '1 solid #CCCCCC';
      hfp.style.borderBottom = '1 solid #CCCCCC';
      // 创建底板
      var hf = o.hForm = RBuilder.appendTable(hfp);
      var hr = o.hFormLine = hf.insertRow();
      // 建立标题
      var hc = hr.insertCell();
      hc.style.padding = '2 6';
      hc.innerText = o.label;
   }else if(e.isAfter()){
      var hf = o.hForm;
      var ps = o.components;
      if(ps){
         for(var n=0; n<ps.count; n++){
            var p = ps.value(n);
            if(RClass.isClass(p, FFlowExamine)){
               var hc = o.hFormLine.insertCell();
               hc.style.padding = '2 6';
               hc.appendChild(p.hPanel);
            }
         }
      }
      o.hFormLine.insertCell();
   }
   return r;
}
