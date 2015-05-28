//==========================================================
// 按钮控件
//
// @class FControl, MDesign, MEventClick, MLsnClick
// @author maochunyang
// @version 1.0.1
//==========================================================
function FFlowExamine(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @attribute
   o.code    = RClass.register(o, new TPtyStr('code'));
   o.icon    = RClass.register(o, new TPtyStr('icon'));
   o.mode    = RClass.register(o, new TPtyStr('mode'));
   //..........................................................
   // @attribute
   o.hIcon   = null;
   //..........................................................
   // @method
   o.oeBuild = FFlowExamine_oeBuild;
   return o;
}
//==========================================================
function FFlowExamine_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   // 创建模式
   var fi = null;
   if('A' == o.mode){
      fi = 'And';
   }else{
      fi = 'Or';
   }
   o.hModeIcon = RBuilder.appendIcon(hp, 'ctl.FFlowExamine_' + fi);
   // 创建图标
   var fi = null;
   if(o.icon == 'M'){
      fi = 'male';
   }else if(o.icon == 'F'){
      fi = 'female';
   }else{
      fi = 'unknown';
   }
   o.hIcon = RBuilder.appendIcon(hp, 'logic.person.user.' + fi);
   if(o.hint){
      o.hIcon.title = o.hint;
      //s += "&nbsp;<FONT color='#666666'>(" + o.hint + ")</FONT>";
   }
   // 创建标签
   var hl = o.hLabel = RBuilder.appendText(hp);
   hl.style.whiteSpace = 'nowrap';
   //var s = "&nbsp;<A href=\"javascript:RLogic.showUser('" + o.code + "')\">" + o.label + "</A>";
   var s = o.label;
   if(o.hint){
      //s += "&nbsp;<FONT color='#666666'>(" + o.hint + ")</FONT>";
   }
   hl.innerHTML = s;
   return EEventStatus.Stop;
}
