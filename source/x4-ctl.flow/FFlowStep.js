//==========================================================
// 按钮控件
//
// @class FContainer
// @history 091112 MAOCY 创建
//==========================================================
function FFlowStep(o){
   o = RClass.inherits(this, o, FContainer);
   o.levels  = new TList();
   o.roles   = new TList();
   o.oeBuild = FFlowStep_oeBuild;
   o.push    = FFlowStep_push;
   return o;
}

//==========================================================
function FFlowStep_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      // 建立边框
      var b = o.border = new TBorder(EBorder.Round, hp);
      b.build();
      // 建立底板
      var hf = o.hForm = RBuilder.appendTable(b.hPanel, null, 0, 3);
      hf.width = '100%';
      hf.height = '100%';
      hf.bgColor = '#DAF3FF';
      hf.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(gradienttype=0,startcolorstr=#FFFFFF,endcolorstr=#BFD6FF)';
      // 设置标题
      var hr = hf.insertRow();
      var hc = hr.insertCell();
      // 建立边框
      var b = o.labelBorder = new TBorder(EBorder.Round, hc);
      b.build();
      b.setBorderColor('#999999');
      b.setBackgroundColor('#BBBBBB');
      var hl = b.hPanel;
      // 建立底板
      hl.style.padding = '3 0';
      hl.align = 'center';
      hl.style.color = '#FFFFFF';
      hl.style.fontWeight = 'bold';
      hl.style.whiteSpace = 'nowrap';
      hl.innerText = RString.nvl(o.label);
   }else if(e.isAfter()){
      var hf = o.hLevelForm = RBuilder.appendTable(o.hForm.insertRow().insertCell(), null, 0, 1);
      hf.width = '100%';
      // roles
      var rs = o.roles;
      if(!rs.isEmpty()){
         var rc = rs.count;
         for(var n=0; n<rc; n++){
            var r = rs.get(n);
            var hr = hf.insertRow();
            var hc = hr.insertCell();
            hc.appendChild(r.hPanel);
         }
      }
      // levels
      var ls = o.levels;
      if(!ls.isEmpty()){
         var lc = ls.count;
         for(var n=0; n<lc; n++){
            var l = ls.get(n);
            var hr = hf.insertRow();
            var hc = hr.insertCell();
            hc.appendChild(l.hPanel);
         }
      }
   }
   return r;
}

//==========================================================
function FFlowStep_push(p){
   var o = this;
   p.name = null;
   o.base.FContainer.push.call(o, p);
   if(RClass.isClass(p, FFlowLevel)){
      o.levels.push(p);
   }
   if(RClass.isClass(p, FFlowStepRole)){
      o.roles.push(p);
   }
}
