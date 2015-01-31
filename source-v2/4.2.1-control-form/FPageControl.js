/**************************************************************
 * 表格列表类，
 * 模板:
 *  hPanel<DIV>
 * ┌--------------------------------------------------------┐
 * │                                        hTitlePanel<TD> │
 * │ hTitleForm<TABLE>                                      │
 * │┌----------------------------------------------------┐│
 * ││hTop<TR>                                            ││
 * │├----------------------------------------------------┤│
 * ││hLine<TR>                                           ││
 * │├----------------------------------------------------┤│
 * ││hBottom<TR>                                         ││
 * │└----------------------------------------------------┘│
 * ├--------------------------------------------------------┤
 * │                                         hDataPanel<TD> │
 * │ hDataForm<TABLE>                                       │
 * │┌----------------------------------------------------┐│
 * │└----------------------------------------------------┘│
 * └--------------------------------------------------------┘
 *
 * @class FContainer, MHorizontal
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FPageControl(o){
   o = RClass.inherits(this, o, FContainer, MDesign, MHorizontal);
   /// @style
   o.styleForm        = RClass.register(o, new TStyle('Form'));
   o.styleTitlePanel  = RClass.register(o, new TStyle('TitlePanel'));
   o.styleTitleForm   = RClass.register(o, new TStyle('TitleForm'));
   o.styleDataPanel   = RClass.register(o, new TStyle('DataPanel'));
   o.styleDataForm    = RClass.register(o, new TStyle('DataForm'));
   // Attribute
   o.sheets           = new TMap();
   o.selected         = null;
   o._esize           = ESize.Both;
   // Html
   o.hTop             = null;
   o.hLine            = null;
   o.hBottom          = null;
   o.hSheets          = null;
   // Process
   o.oeBuild          = FPageControl_oeBuild;
   o.oeRefresh        = FPageControl_oeRefresh;
   // Event
   o.onBuildPanel     = FPageControl_onBuildPanel;
   // Method
   o.appendChild      = FPageControl_appendChild;
   o.select           = FPageControl_select;
   o.selectByIndex    = FPageControl_selectByIndex;
   o.sheet            = FPageControl_sheet;
   o.push             = FPageControl_push;
   o.dispose          = FPageControl_dispose;
   return o;
}
// ------------------------------------------------------------
function FPageControl_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   var hp = o.hPanel;
   if(event.isBefore()){
      hp.width = '100%';
      hp.height = '100%';
      // 建立标题区
      var hc = hp.insertRow().insertCell();
      hc.height = 1;
      var htf = o.hTitleForm = RBuilder.appendTable(hc, o.style('TitleForm'));
      o.hTop = htf.insertRow();
      o.hLine = htf.insertRow();
      o.hBottom = htf.insertRow();
      // 建立标题区左边第一列
      var hc = o.hTop.insertCell();
      hc.width = 20;
      RBuilder.appendEmpty(hc);
      o.hLine.insertCell();
      var hbc = o.hBottom.insertCell();
      hbc.className = o.style('Bottom', FPageSheet);
      // 建立分隔区
      var hc = hp.insertRow().insertCell();
      hc.height = 4;
   }else if(event.isAfter()){
      // 建立标题区右边第一列
      var hc = o.hTop.insertCell();
      hc.className = o.style('Top', FPageSheet);
      RBuilder.appendEmpty(hc);
      o.hLine.insertCell();
      var hc = o.hBottom.insertCell();
      hc.className = o.style('Bottom', FPageSheet);
      // 选中第一个
      o.selectByIndex(0);
   }
}
// ------------------------------------------------------------
function FPageControl_oeRefresh(e){
   var o = this;
   var r = o.base.FContainer.oeRefresh.call(o, e);
   if(e.isBefore()){
      // Select first
      if(o.sheets.count){
         /*for(var n=0; n<o.sheets.count; n++){
            var p = o.sheets.value(n);
            p.processBuildChildren();
            p.hasBuilded = true;
         }*/
         if(o.selected){
            o.selected.oeRefresh(e);
         }else{
            var s = o.selected = o.sheets.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}
// ------------------------------------------------------------
function FPageControl_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
   this.hPanel.backgroundColor='red';
}
// ------------------------------------------------------------
function FPageControl_appendChild(p){
   if(RClass.isClass(p, FPageSheet)){
      var o = this;
      // 追加标题顶边线
      var hc = p.hTopL = o.hTop.insertCell();
      hc.className = p.style('Top');
      var hc = p.hTop = o.hTop.insertCell();
      hc.className = p.style('Top');
      var hc = p.hTopR = o.hTop.insertCell();
      hc.className = p.style('Top');
      // 建立左边线
      var hc = p.hLeft = o.hLine.insertCell();
      hc.className = p.style('Left');
      RBuilder.appendEmpty(hc);
      // 建立按键
      var hc = p.hButtonPanel = o.hLine.insertCell();
      p.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = p.hButton = RBuilder.append(hc, 'DIV', p.style('Button'));
      // 建立按键图标
      if(p.icon){
         p.hIcon = RBuilder.appendIcon(hb, p.icon);
      }
      // 建立按键标签
      if(p.label){
         p.hText = RBuilder.append(hb, 'SPAN', p.style('ButtonText'));
         p.hText.innerText = ' ' + p.label;
      }
      // 建立右边线
      var hc = p.hRight = o.hLine.insertCell();
      hc.className = p.style('Right')
      RBuilder.appendEmpty(hc);
      // 建立标题底边线
      var hc = p.hBottomL = o.hBottom.insertCell();
      hc.className = p.style('Bottom');
      var hc = p.hBottom = o.hBottom.insertCell();
      hc.className = p.style('Bottom');
      var hc = p.hBottomR = o.hBottom.insertCell();
      hc.className = p.style('Bottom');
      // 追加数据信息
      var hr = o.hPanel.insertRow();
      if(p.index){
         hr.style.display = 'none';
      }
      var hc = hr.insertCell();
      p.hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(p.hPanel);
   }
}
// ------------------------------------------------------------
// s:sheet
function FPageControl_select(p){
   var o = this;
   o.selected = p;
   for(var n=0; n<o.sheets.count; n++){
      var c = o.sheets.value(n);
      if(c != p){
         c.select(false);
      }
   }
   p.select(true);
}
// ------------------------------------------------------------
function FPageControl_selectByIndex(n){
   var o = this;
   var p = o.sheets.value(n);
   if(p){
      o.select(p);
   }
}
// ------------------------------------------------------------
function FPageControl_sheet(name){
   return this.sheets.get(name);
}
// ------------------------------------------------------------
// pageSheet
function FPageControl_push(p){
   var o = this;
   if(RClass.isClass(p, FPageSheet)){
      p.pages = o;
      p.index = o.sheets.count;
      o.sheets.set(p.name, p);
   }
   o.base.FContainer.push.call(o, p);
}
// ------------------------------------------------------------
// pageSheet
function FPageControl_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
}
// ------------------------------------------------------------
