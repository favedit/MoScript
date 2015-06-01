//==========================================================
// <T>标题栏。</T>
//
// @class FContainer, MDisplayAble, MTop
// @version 1.0.1
// @history 090910 MAOCY 创建
//==========================================================
function FTitleBar(o){
   o = RClass.inherits(this, o, FContainer, MDisplayAble, MTop);
   // Attribute
   o.historyIndex    = -1;
   o.buttons         = new TList();
   o.lsnsButtonClick = new TListeners();
   o.lsnsNavaRowMdown           = new TListeners();
   o.lsnsNavButtonClickBefore = new TListeners();
   o.lsnsNavButtonClick       = new TListeners();
   // Attribute
   o.onNavButtonClickBefore = FTitleBar_onNavButtonClickBefore;
   o.onNavButtonClick       = FTitleBar_onNavButtonClick;
   // Html
   o.hLine           = null;
   o.hCaption        = null;
   // Process
   o.oeBuild         = FTitleBar_oeBuild;
   // Event
   o.onBuildPanel    = FTitleBar_onBuildPanel;
   // Method
   o.setIcon         = FTitleBar_setIcon;
   o.setCaption      = FTitleBar_setCaption;
   o.button          = FTitleBar_button;
   o.nextButton      = FTitleBar_nextButton;
   o.clickButton     = FTitleBar_clickButton;
   o.selectButton    = FTitleBar_selectButton;
   o.clear           = FTitleBar_clear;
   o.dispose         = FTitleBar_dispose;
   return o;
}

function FTitleBar_onNavButtonClickBefore(s){
   this.lsnsNavButtonClickBefore.process(s);
}

function FTitleBar_onNavButtonClick(s){
   this.lsnsNavButtonClick.process(s);
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 构建事件的状态
//==========================================================
function FTitleBar_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isAfter()){
      var b = e.builder;
      var hl = o.hLine;
      var cs = o.components;
      var cl = cs ? cs.count : 0;
      // 建立导航按键
      var hasEnd = false;
      for(var n = 0; n < cl; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FTitleButton)){
            var hc = hl.insertCell();
            hc.align = 'right';
            hc.width = 1;
            hc.appendChild(c.hPanel);
            if(!hasEnd && !c.page){
               hasEnd = true;
            }
         }
      }
      // 建立主按键
      o.hIconPanel = hl.insertCell();
      o.hIconPanel.width = 20;
      o.hCaption = o.hLine.insertCell();
      o.hIcon = b.appendIcon(o.hIconPanel, '#com.form');
      o.hCaption.style.fontWeight = 'bold';
      if(hasEnd){
         o.hIcon.style.display = 'none';
      }
      // 建立导航栏
      for(var n = 0; n < cl; n++){
         var c = cs.value(n);
         if(RClass.isClass(c, FNavigatorBar)){
            c.lsnsButtonClickBefore.register(o, o.onNavButtonClickBefore);
            c.lsnsButtonClick.register(o, o.onNavButtonClick);
            var hc = hl.insertCell();
            hc.align = 'right';
            hc.width = '100px';
            hc.appendChild(c.hPanel);
         }
      }
   }
   return r;
}

// =========================================================
// <T>构造底层面板。</T>
//
// @method
// =========================================================
function FTitleBar_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.newTable(o.hParent);
   h.width = '100%';
   o.hLine = h.insertRow();
}

// =========================================================
// <T>设置标题图标。</T>
//
// @method
// @param i:icon:String 图标内容
// =========================================================
function FTitleBar_setIcon(i){
   var o = this;
   o.hIcon.style.display = 'block';
   o.hIcon.src = RRes.iconPath(i);
}

// =========================================================
// <T>设置标题文本。</T>
//
// @method
// @param t:text:String 文本内容
// =========================================================
function FTitleBar_setCaption(t){
   var o = this;
   o.hCaption.style.display = 'block';
   o.hCaption.innerHTML = t;
}

//==========================================================
// <T>得到指定索引位置的按钮。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return FHistoryButton 历史按键
//==========================================================
function FTitleBar_button(name){
   return this.buttons.get(name);
}

//==========================================================
// <T>获得下一个按键。</T>
// <P>如果按键后还有其他按键，则隐藏。</P>
//
// @method
//==========================================================
function FTitleBar_nextButton(){
   var o = this;
   var n = o.historyIndex + 1;
   var b = o.buttons.get(n);
   if(!b){
      // 追加按键
      b = RControl.create(FHistoryButton);
      // 追加分割线
      if(!o.buttons.isEmpty()){
         var h = b.hSplit = o.hLine.insertCell();
         h.innerText = '>';
      }
      var h = b.hParent = o.hLine.insertCell();
      h.appendChild(b.hPanel);
      b.index = o.buttons.count;
      b.bar = o;
      o.buttons.push(b);
   }
   o.historyIndex++;
   // 使其他按键变为未选中状态
   o.selectButton(b);
   // 隐藏多余的按键
   var bc = o.buttons.count;
   for(var n=o.historyIndex+1; n<bc; n++){
      o.buttons.get(n).setVisible(false);
   }
   return b;
}

//==========================================================
// <T>点击一个按键。</T>
//
// @method
// @param b:button:FHistoryButton 历史按键
//==========================================================
function FTitleBar_clickButton(b){
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
function FTitleBar_selectButton(s){
   var o = this;
   s.select(true);
   var bs = o.buttons;
   var c = bs.count;
   for(var n=0; n<c; n++){
      var b = bs.get(n);
      if(b != s && b.isSelected){
         b.select(false);
      }
   }
}

//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FTitleBar_clear(){
   var o = this;
   var bs = o.buttons;
   var c = bs.count;
   for(var n=0; n<c; n++){
      bs.get(n).setVisible(n);
   }
}
//==========================================================
function FTitleBar_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hIconPanel);
   RMemory.freeHtml(o.hCaption);
   o.hIconPanel = null;
   o.hCaption = null;
}
