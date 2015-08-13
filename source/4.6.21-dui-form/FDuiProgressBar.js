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
MO.FDuiProgressBar = function FDuiProgressBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @style
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //..........................................................
   // @attribute
   o._rate        = 0;
   //..........................................................
   // @html
   o._hForm       = null;
   //o._hUnit       = null;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiProgressBar_onBuildPanel;
   o.onBuild      = MO.FDuiProgressBar_onBuild;
   //..........................................................
   // @method
   //o.formatValue  = FDuiProgressBar_formatValue;
   //o.text         = FDuiProgressBar_text;
   o.get          = MO.FDuiProgressBar_get;
   o.set          = MO.FDuiProgressBar_set;
   // @method
   o.dispose      = MO.FDuiProgressBar_dispose;
   return o;
}

//==========================================================
// <T>建立底板处理。</T>
//
// @method
// @param event:TProcessEvent 事件
//==========================================================
MO.FDuiProgressBar_onBuildPanel = function FDuiProgressBar_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}

//==========================================================
// <T>建立布局处理。</T>
//
// @method
// @param event:TProcessEvent 事件
//==========================================================
MO.FDuiProgressBar_onBuild = function FDuiProgressBar_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   // 建立进度
   var hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
   o.hProgress = MO.Window.Builder.appendTableCell(hLine);
   o.hEmpty = MO.Window.Builder.appendTableCell(hLine);
   //var htb = o.hEdit = o.hPanelForm = MO.Window.Builder.appendTable(b.hPanel);
   //htb.style.tableLayout  = 'fixed';
   //htb.height = 10;
   //var hr = htb.insertRow();
   //var value = '0%';
   //var v = RFloat.parse(MO.Lang.String.nvl(value));
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
MO.FDuiProgressBar_get = function FDuiProgressBar_get(){
   return this._rate;
}

//==========================================================
// <T>设置数据处理。</T>
//
// @method
// @param value:Number 数据
//==========================================================
MO.FDuiProgressBar_set = function FDuiProgressBar_set(value){
   var o = this;
   o._rate = value;
   //var htb = o.hPanelForm;
   //if(!MO.Lang.String.isEmpty(value)){
   //   htb.innerText = '';
   //   htb.style.tableLayout  = 'fixed';
   //   htb.height = 10;
   //   var hr = htb.insertRow();
   //   var v = RFloat.parse(MO.Lang.String.nvl(value));
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
MO.FDuiProgressBar_dispose = function FDuiProgressBar_dispose(){
   var o = this;
   o._hForm = MO.Window.Html.free(o._hForm);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
// ------------------------------------------------------------
//function FDuiProgressBar_formatValue(text){
//   this.hEdit.value = text;
//}
// ------------------------------------------------------------
//function FDuiProgressBar_text(t){
//   var o = this;
//   // 数据必须的校验
//   if(MO.Lang.String.isEmpty(t)){
//      if(o.validRequire){
//         return false;
//      }
//   }
//   return true;
//}
