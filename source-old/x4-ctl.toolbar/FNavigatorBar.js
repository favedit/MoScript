//==========================================================
// <T>功能导航栏。</T>
//
// @class FControl, MContainer
// @version 1.0.1
// @history 090910 MAOCY 创建
//==========================================================
function FNavigatorBar(o){
   o = RClass.inherits(this, o, FControl, MContainer);
   // Listeners
   o.lsnsButtonClickBefore = new TListeners();
   o.lsnsButtonClick       = new TListeners();
   // Attribute
   o.onButtonClickBefore = FNavigatorBar_onButtonClickBefore;
   o.onButtonClick       = FNavigatorBar_onButtonClick;
   // Method
   o.oeBuild             = FNavigatorBar_oeBuild;
   o.onBuildPanel        = FNavigatorBar_onBuildPanel;
   o.appendButton        = FNavigatorBar_appendButton;
   o.dispose             = FNavigatorBar_dispose;
   return o;
}

function FNavigatorBar_onButtonClickBefore(s){
   this.lsnsButtonClickBefore.process(s);
}

function FNavigatorBar_onButtonClick(s){
   this.lsnsButtonClick.process(s);
}

/**************************************************************
 * <T>事件构建函数。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorBar_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var cs = o.components;
   if(e.isAfter() && cs){
      // 根据类型名称注册按键功能
      for(var n = 0; n < cs.count; n++){
         o.appendButton(cs.value(n));
      }
   }
   return EEventStatus.Continue;
}

/**************************************************************
 * <T>构建控件底板。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorBar_onBuildPanel(){
   var o = this;
   o.hPanel = RBuilder.appendTable();
   o.hPanel.style.border = '0px solid #FFFFFF';
   o.hRow = o.hPanel.insertRow();
}

/**************************************************************
 * <T>在底板上添加一个按钮控件对象。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorBar_appendButton(c){
   var o = this;
   if(RClass.isClass(c, FNavigatorButton)){
      c.lsnsButtonClickBefore.register(o, o.onButtonClickBefore);
      c.lsnsButtonClick.register(o, o.onButtonClick);
      var hc = o.hRow.insertCell();
      hc.appendChild(c.hPanel);
   }
}

/**************************************************************
 * <T>在底板上添加一个按钮控件对象。</T>
 *
 * @method
 * @param h:H:HEvent 封装的事件对象
 **************************************************************/
function FNavigatorBar_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hRow);
   o.hPanel = null;
   o.hRow = null;
}
