//==========================================================
// <T>进度栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------------------------┬-------------------------------------┐
// │hProgress<TD>                      │ hEmpty<TR>                          │ hLine
// └-----------------------------------┴-------------------------------------┘
//
// @class
// @author maocy
// @history 150405
//==========================================================
function FUiProgressBar(o){
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @style
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   //..........................................................
   // @attribute
   o._rate        = 0;
   //..........................................................
   // @html
   o._hForm       = null;
   //o._hUnit       = null;
   //..........................................................
   // @event
   o.onBuildPanel = FUiProgressBar_onBuildPanel;
   o.onBuild      = FUiProgressBar_onBuild;
   //..........................................................
   // @method
   //o.formatValue  = FUiProgressBar_formatValue;
   //o.text         = FUiProgressBar_text;
   o.get          = FUiProgressBar_get;
   o.set          = FUiProgressBar_set;
   // @method
   o.dispose      = FUiProgressBar_dispose;
   return o;
}

//==========================================================
// <T>建立底板处理。</T>
//
// @method
// @param event:TProcessEvent 事件
//==========================================================
function FUiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}

//==========================================================
// <T>建立布局处理。</T>
//
// @method
// @param event:TProcessEvent 事件
//==========================================================
function FUiProgressBar_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
   // 建立进度
   var hLine = o._hLine = RBuilder.appendTableRow(o._hPanel);
   o.hProgress = RBuilder.appendTableCell(hLine);
   o.hEmpty = RBuilder.appendTableCell(hLine);
   //var htb = o.hEdit = o.hPanelForm = RBuilder.appendTable(b.hPanel);
   //htb.style.tableLayout  = 'fixed';
   //htb.height = 10;
   //var hr = htb.insertRow();
   //var value = '0%';
   //var v = RFloat.parse(RString.nvl(value));
   //v = v * 100;
   //v = v + "%";
   //var hc1 = hr.insertCell();
   //hc1.style.width = v;
   //hc1.style.backgroundColor = '#29BAD5';
   //var hc2 = hr.insertCell();
   //htb.title  = v;
   //if(o.editUnit){
   //   var h = o.hUnit = o.hControlRow.insertCell();
   //   h.className = o.style('Unit');
   //   h.innerText = o.editUnit;
   //}
}

//==========================================================
// <T>获得数据处理。</T>
//
// @method
// @return Number 数据
//==========================================================
function FUiProgressBar_get(){
   return this._rate;
}

//==========================================================
// <T>设置数据处理。</T>
//
// @method
// @param value:Number 数据
//==========================================================
function FUiProgressBar_set(value){
   var o = this;
   o._rate = value;
   //var htb = o.hPanelForm;
   //if(!RString.isEmpty(value)){
   //   htb.innerText = '';
   //   htb.style.tableLayout  = 'fixed';
   //   htb.height = 10;
   //   var hr = htb.insertRow();
   //   var v = RFloat.parse(RString.nvl(value));
   //   v = v * 100;
   //   v = v + "%";
   //   var hc1 = hr.insertCell();
   //   hc1.style.width = v;
   //   hc1.style.backgroundColor = '#29BAD5';
   //   var hc2 = hr.insertCell();
   //   htb.title  = v;
   //}
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiProgressBar_dispose(){
   var o = this;
   o._hForm = RHtml.free(o._hForm);
   // 父处理
   o.__base.FUiControl.dispose.call(o);
}
// ------------------------------------------------------------
//function FUiProgressBar_formatValue(text){
//   this.hEdit.value = text;
//}
// ------------------------------------------------------------
//function FUiProgressBar_text(t){
//   var o = this;
//   // 数据必须的校验
//   if(RString.isEmpty(t)){
//      if(o.validRequire){
//         return false;
//      }
//   }
//   return true;
//}
