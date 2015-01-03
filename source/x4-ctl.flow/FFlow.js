//==========================================================
// 按钮控件
//
// @class FControl, MDesign, MEventClick, MLsnClick
// @author maochunyang
// @version 1.0.1
//==========================================================
function FFlow(o){
   o = RClass.inherits(this, o, FContainer);
    o.oeBuild = FFlow_oeBuild;
  return o;
}

//==========================================================
function FFlow_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      // 建立边框
      //var b = o.border = new TBorder(EBorder.Round, hp);
      //b.build();
      //b.setBorderColor('#CFCF29');
      //b.hPanel.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(gradienttype=0,startcolorstr=#FFFFFF,endcolorstr=#F8F8E0)';
      //b.hForm.style.tableLayout = 'fixed';
      //b.hPanel.style.padding = '6 3';
      // 建立底板
      var hfp = RBuilder.appendDiv(o.hPanel);
      hfp.style.width = '100%';
      hfp.style.align = 'center';
      hfp.style.overflow = 'auto'
      var hf = o.hForm = RBuilder.appendTable(hfp);
      hf.width = '100%';
   }else if(e.isAfter()){
      var ps = o.components;
      for(var n=0; n<ps.count; n++){
         var p = ps.value(n);
         if(RClass.isClass(p, FFlowProcess)){
            var hr = o.hForm.insertRow();
            var hc = hr.insertCell();
            hc.appendChild(p.hPanel);
         }
      }
   }
   return r;
}
