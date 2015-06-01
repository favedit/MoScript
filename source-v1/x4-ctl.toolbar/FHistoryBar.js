/**************************************************************
 * 工具条的容器类
 *
 * @class
 * @face FContainer, MDisplayAble, MTop
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FHistoryBar(o){
   o = RClass.inherits(this, o, FContainer, MDisplayAble, MTop);
   /// @style
   o.stButton        = RClass.register(o, new TStyle('Button'));
   // Attribute
   o.historyIndex    = -1;
   o.buttons         = new TList();
   o.lsnsButtonClick = new TListeners();
   // Html
   o.hLine           = null;
   // Process
   o.oeBuild         = FHistoryBar_oeBuild;
   // Event
   o.onBuildPanel    = FHistoryBar_onBuildPanel;
   // Method
   o.currentButton   = FHistoryBar_currentButton;
   o.button          = FHistoryBar_button;
   o.syncButton      = FHistoryBar_syncButton;
   o.nextButton      = FHistoryBar_nextButton;
   o.clickButton     = FHistoryBar_clickButton;
   o.selectButton    = FHistoryBar_selectButton;
   o.popup           = FHistoryBar_popup;
   o.clear           = FHistoryBar_clear;
   o.dispose         = FHistoryBar_dispose;
   return o;
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FHistoryBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   var b = e.builder;
   if(e.isBefore()){
      var hc = o.hCaption = o.hLine.insertCell();
      hc.width = 80;
      hc.align = 'center';
      hc.style.fontWeight="BOLD";
      hc.innerText = RContext.get('FHistoryBar:caption');
   }else if(e.isAfter()){
      if(EAlign.Right != o.align){
         var hTd = o.hLastCell = b.create('TD');
         b.appendEmpty(hTd);
         o.hLine.appendChild(hTd);
      }
   }
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FHistoryBar_onBuildPanel(){
   var o = this;
   var hp = o.hPanel = RBuilder.newTable(o.hParent);
   hp.width = '100%';
   //hp.style.borderBottom = '1 solid #4F9FDF';
   o.hLine = hp.insertRow();
}

//==========================================================
// <T>获得当时选中的历史按键。</T>
//
// @method
// @return FHistoryButton 历史按键
//==========================================================
function FHistoryBar_currentButton(){
   var o = this;
   return o.buttons.get(o.historyIndex);
}

//==========================================================
// <T>得到指定索引位置的按钮。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return FHistoryButton 历史按键
//==========================================================
function FHistoryBar_button(name){
   return this.buttons.get(name);
}

//==========================================================
// <T>获得指定索引位置上的按键。</T>
// <P>如果按键不存在，则建立从现存的最后一个按键到当前位置按键之间的所有按键。</P>
//
// @method
// @param p:position:Integer 索引位置
//==========================================================
function FHistoryBar_syncButton(p){
   var o = this;
   var bs = o.buttons;
   var b = bs.get(p);
   if(!b){
      var c = bs.count;
      var hl = o.hLine;
      for(var n=c; n<=p; n++){
         // 建立分割线
         var hs = null;
         if(c > 0){
            hs = hl.insertCell(o.hLastCell.cellIndex);
            hs.width = '16';
            RBuilder.appendIcon(hs, 'ctl.FHistoryBar_Spliter');
         }
         // 建立按键
         var hc = hl.insertCell(o.hLastCell.cellIndex);
         hc.width = 1;
         b = RControl.create(FHistoryButton, hc);
         b.bar = o;
         b.index = bs.count;
         b.hSplit = hs;
         bs.push(b);
      }
   }
   return b;
}

//==========================================================
// <T>获得下一个按键。</T>
// <P>如果按键后还有其他按键，则隐藏。</P>
//
// @method
//==========================================================
function FHistoryBar_nextButton(){
   var o = this;
   var n = ++o.historyIndex;
   var b = o.syncButton(n);
   // 使其他按键变为未选中状态
   o.selectButton(b);
   // 隐藏多余的按键
   var c = o.buttons.count;
   for(var i=n+1; i<c; i++){
      o.buttons.get(i).setVisible(false);
   }
   return b;
}

//==========================================================
// <T>点击一个按键。</T>
//
// @method
// @param b:button:FHistoryButton 历史按键
//==========================================================
function FHistoryBar_clickButton(b){
   var o = this;
   o.lsnsButtonClick.process(b);
   // 使其他按键变为未选中状态
   o.selectButton(b);
}

//==========================================================
// <T>选中一个按键。</T>
//
// @method
// @param b:button:FHistoryButton 历史按键
//==========================================================
function FHistoryBar_selectButton(b){
   var o = this;
   b.select(true);
   b.setVisible(true);
   o.historyIndex = o.buttons.indexOf(b);
   var bs = o.buttons;
   var c = bs.count;
   for(var n=0; n<c; n++){
      var s = bs.get(n);
      if(s != b && s.isSelected){
         s.select(false);
      }
   }
}

//==========================================================
// <T>弹出历史按键。</T>
//
// @method
// @param l:level:Integer 级别
//==========================================================
function FHistoryBar_popup(l){
   var o = this;
   var n = Math.max(o.historyIndex - moNvl(l, 1), 0);
   // 模拟点击按键
   var b = o.buttons.get(n);
   o.clickButton(b);
   // 隐藏多余的按键
   var bc = o.buttons.count;
   for(++n; n<bc; n++){
      o.buttons.get(n).setVisible(false);
   }
   return b;
}

//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FHistoryBar_clear(){
   var o = this;
   var bs = o.buttons;
   var c = bs.count;
   for(var n=0; n<c; n++){
      bs.get(n).setVisible(n);
   }
}
//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FHistoryBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hLine = null;
   o.hCaption = null;
   o.hParent = null;
}
