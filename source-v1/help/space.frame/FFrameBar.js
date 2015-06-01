/**************************************************************
 * 工具条的容器类
 *
 * @class
 * @face FContainer, MDisplayAble, MTop
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FFrameBar(o){
   o = RClass.inherits(this, o, FContainer, MDisplayAble, MTop);
   /// @style
   o.stButton        = RClass.register(o, new TStyle('Button'));
   // Attribute
   o.historyIndex    = -1;
   o.sheets          = new TMap();
   o.lsnsButtonClick = new TListeners();
   // Html
   o.hLine           = null;
   // Process
   o.oeBuild         = FFrameBar_oeBuild;
   // Event
   o.onBuildPanel    = FFrameBar_onBuildPanel;
   // Method
   o.currentButton   = FFrameBar_currentButton;
   o.button          = FFrameBar_button;
   o.syncButton      = FFrameBar_syncButton;
   o.nextButton      = FFrameBar_nextButton;
   o.clickButton     = FFrameBar_clickButton;
   o.select          = FFrameBar_select;
   o.selectByIndex   = FFrameBar_selectByIndex;
   o.popup           = FFrameBar_popup;
   o.clear           = FFrameBar_clear;
   o.dispose         = FFrameBar_dispose;
   return o;
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FFrameBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   var b = e.builder;
   if(e.isBefore()){
      var hp = o.hPanel;
      hp.width = '100%';
      //hp.bgColor = '#E0E0E0';
      //hp.style.background = 'url(space.gif)';

      var hr = o.hTop = hp.insertRow();
      hr.insertCell();

      var hr = hp.insertRow();
      var hc = o.hLinePanel = hr.insertCell();
      hc.height = 1;

      var hlf = o.hLineForm = RBuilder.appendTable(hc);
      o.hLine = hlf.insertRow();
      o.hCaption = o.hLine.insertCell();
      o.hCaption.innerText = ' ';

      var hr = o.hBottom = hp.insertRow();
      var hc = hr.insertCell();
      hc.height = '3';
      hc.bgColor = '#CCCCCC'

   }else if(e.isAfter()){
      var cs = o.components;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FFrameSheet)){
            o.sheets.set(c.name, c);
            c.bar = this;
            var hc = c.hParent = o.hLine.insertCell();
            hc.appendChild(c.hPanel);
         }
      }
      if(EAlign.Right != o.align){
         var hTd = b.create('TD');
         b.appendEmpty(hTd);
      }
   }
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FFrameBar_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}

//==========================================================
// <T>获得当时选中的历史按键。</T>
//
// @method
// @return FHistoryButton 历史按键
//==========================================================
function FFrameBar_currentButton(){
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
function FFrameBar_button(name){
   return this.buttons.get(name);
}

//==========================================================
// <T>获得指定索引位置上的按键。</T>
// <P>如果按键不存在，则建立从现存的最后一个按键到当前位置按键之间的所有按键。</P>
//
// @method
// @param p:position:Integer 索引位置
//==========================================================
function FFrameBar_syncButton(p){
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
            hs = hl.insertCell();
            hs.width = '16';
            RBuilder.appendIcon(hs, 'ctl.FFrameBar_Spliter');
         }
         // 建立按键
         b = RControl.create(FHistoryButton, hl.insertCell());
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
function FFrameBar_nextButton(){
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
function FFrameBar_clickButton(b){
   var o = this;
   o.historyIndex = o.buttons.indexOf(b);
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
function FFrameBar_select(s){
   if(s){
      var o = this;
      var ss = o.sheets;
      s.select(true);
      for(var i=0; i<ss.count; i++){
         var f = ss.value(i);
         if(f != s && f.isSelected){
            f.select(false);
         }
      }
   }
}

function FFrameBar_selectByIndex(n){
   this.select(this.sheets.value(n));
}

//==========================================================
// <T>弹出历史按键。</T>
//
// @method
// @param l:level:Integer 级别
//==========================================================
function FFrameBar_popup(l){
   var o = this;
   l = moNvl(l, 1);
   var n = o.historyIndex - l;
   if(n >= 0){
      var b = o.buttons.get(n);
      o.clickButton(b);
      // 隐藏多余的按键
      var bc = o.buttons.count;
      for(++n; n<bc; n++){
         o.buttons.get(n).setVisible(false);
      }
      return b;
   }
}

//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FFrameBar_clear(){
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
function FFrameBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hLine);
   RMemory.freeHtml(o.hCaption);
   RMemory.freeHtml(o.hParent);
   o.hLine = null;
   o.hCaption = null;
   o.hParent = null;
}
