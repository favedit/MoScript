//==========================================================
// 按钮控件
//
// @class FContainer
// @history 091112 MAOCY 创建
//==========================================================
function FFlowProcess(o){
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @attributes
   o._steps    = null;
   o._roles     = null;
   //..........................................................
   // @event
   o.oeBuild   = FFlowProcess_oeBuild;
   //..........................................................
   // @method
   o.construct = FFlowProcess_construct;
   o.push      = FFlowProcess_push;
   return o;
}

//==========================================================
function FFlowProcess_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e)
   var hp = o.hPanel;
   if(e.isBefore()){
      var hf = o.hForm = RBuilder.appendTable(hp);
      hf.width = '100%';
      var hsf = o.hStepForm = RBuilder.appendTable(hf.insertRow().insertCell());
      hsf.width = '100%';
      var hsl = o.hStepLine = hsf.insertRow();
      hsl.vAlign = 'top';
   }else if(e.isAfter()){
      // 建立阶段
      var ps = o._steps;
      var pc = ps.count;
      var hr = o.hStepLine;
      for(var n=0; n<pc; n++){
         var p = ps.get(n);
         if(n > 0){
            var hc = hr.insertCell();
            hc.noWrap = true;
            hc.style.paddingTop = 14;
            RBuilder.appendIcon(hc, 'ctl.FFlowProcess_Next', null, 11, 11);
         }
         var hc = hr.insertCell();
         hc.style.padding = '0 3';
         hc.appendChild(p.hPanel);
         //alert(p.hPanel.offsetWidth);
         hc.width = (100/pc) + '%';
      }
      // 建立角色
      var rs = o._roles;
      var rc = rs.count;
      for(var n=0; n<rc; n++){
         var r = rs.get(n);
         var hc = o.hForm.insertRow().insertCell();
         hc.style.padding = '4 6';
         hc.appendChild(r.hPanel);
      }
   }
   return r;
}

//==========================================================
function FFlowProcess_construct(){
   var o = this;
   o._steps = new TList();
   o._roles = new TList();
}

//==========================================================
function FFlowProcess_push(p){
   var o = this;
   p.name = null;
   o.base.FContainer.push.call(o, p);
   if(RClass.isClass(p, FFlowStep)){
      o._steps.push(p);
   }else if(RClass.isClass(p, FFlowRole)){
      o._roles.push(p);
   }
}
