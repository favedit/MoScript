//==========================================================
// <T>操作数据集的管理类。</T>
//
// @tool
// @history 091029 MAOCY 创建
//==========================================================
function FFormSheet(o){
   o = RClass.inherits(this, o, FContainer, MDisplay);
   //..........................................................
   // @property
   o.target            = RClass.register(o, new TPtyStr('target'));
   o.icon              = RClass.register(o, new TPtyStr('icon'));
   o.closeAble         = RClass.register(o, new TPtyBool('closeAble'), true);
   //..........................................................
   // @style
   o.stButton          = RClass.register(o, new TStyle('Button'));
   //..........................................................
   // @attribute
   o._manager          = null;
   o._sheets           = null;
   o._spaceIndex       = -1;
   o._selected         = false;
   o.activeSpace       = null;
   o.spaces            = null;
   o.lsnsButtonClick   = null;
   //..........................................................
   // @html
   o.hButtonPanel      = null;
   o.hButton           = null;
   o.hIcon             = null;
   o.hText             = null;
   o.hHistoryForm      = null;
   o.hHistoryLine      = null;
   o.hHistoryText      = null;
   //..........................................................
   // @event
   o.onEnter           = FFormSheet_onEnter;
   o.onLeave           = FFormSheet_onLeave;
   o.onSheetClick      = RClass.register(o, new HClick('onSheetClick'), FFormSheet_onSheetClick);
   o.onSheetCloseClick = RClass.register(o, new HClick('onSheetCloseClick'), FFormSheet_onSheetCloseClick);
   o.onBuildPanel      = FFormSheet_onBuildPanel;
   //..........................................................
   // @process
   o.oeBuild           = FFormSheet_oeBuild;
   //..........................................................
   // @method
   o.construct         = FFormSheet_construct;
   o.setLabel          = FFormSheet_setLabel;
   o.setIcon           = FFormSheet_setIcon;
   o.setText           = FFormSheet_setText;
   o.setHint           = FFormSheet_setHint;
   o.currentSpace      = FFormSheet_currentSpace;
   o.createSpace       = FFormSheet_createSpace;
   o.firstSpace        = FFormSheet_firstSpace;
   o.space             = FFormSheet_space;
   o.nextSpace         = FFormSheet_nextSpace;
   o.syncSpace         = FFormSheet_syncSpace;
   o.clickSpace        = FFormSheet_clickSpace;
   o.innerSelect       = FFormSheet_innerSelect;
   o.select            = FFormSheet_select;
   o.selectSpace       = FFormSheet_selectSpace;
   o.selectByIndex     = FFormSheet_selectByIndex;
   o.popup             = FFormSheet_popup;
   o.clear             = FFormSheet_clear;
   o.dispose           = FFormSheet_dispose;
   return o;
}

//==========================================================
// <T>鼠标进入控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSheet_onEnter(e){
   var o = this;
   if(!o._selected){
      o.hButtonPanel.style.background = RResource.iconUrlPath('ctl.FFormSheet_ButtonHover', 'png');
      o.hRight.style.background = RResource.iconUrlPath('ctl.FFormSheet_ButtonHoverR', 'png');
      if(o.closeAble){
         o.hCloseIcon.src = RResource.iconPath('ctl.FFormSheet_CloseHover', 'png');
         o.hCloseIcon.style.display = 'block';
      }
   }
}

//==========================================================
// <T>鼠标离开控件的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSheet_onLeave(e){
   var o = this;
   if(!o._selected){
      o.hButtonPanel.style.background = '';
      o.hRight.style.background = '';
      if(o.closeAble){
         o.hCloseIcon.style.display = 'none';
      }
   }
}

//==========================================================
// <T>鼠标点击表单容器事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSheet_onSheetClick(e){
   var o = this;
   if(o._visible){
      o._sheets.select(o);
   }
}

//==========================================================
// <T>鼠标点击表单容器关闭按键的事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFormSheet_onSheetCloseClick(e){
   var o = this;
   o.hide();
   if(o._selected){
      o._sheets.selectByIndex(0);
   }
}

//==========================================================
// <T>构造底层面板。</T>
//
// @method
//==========================================================
function FFormSheet_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}

//==========================================================
// <T>构造控件的内部页面结构。</T>
//
// @method
// @param e:event:EEvent 构建事件
// @return EEventStatus 事件状态
//==========================================================
function FFormSheet_oeBuild(e){
   var o = this;
   var r = o.base.FContainer.oeBuild.call(o, e);
   var b = e.builder;
   if(e.isBefore()){
      var hpr = o.hPanel.insertRow();
      // 建立按键表格
      var hbp = o.hButtonPanel = hpr.insertCell();
      var hb = o.hButton = b.appendTable(hbp);
      hb.style.cursor = 'hand';
      o.attachEvent('onSheetClick', hb);
      // 建立按键
      var hr = o.hButton.insertRow();
      var hc = hr.insertCell();
      hc.style.paddingTop = 4;
      hc.style.paddingLeft = 8;
      hc.style.paddingRight = 4;
      hc.style.paddingBottom = 2;
      // 建立按键图标
      o.hIcon = b.appendIcon(hc, o.icon);
      // 建立按键文本
      o.hText = b.append(hc, 'SPAN');
      o.hText.style.whiteSpace = 'nowrap';
      o.hText.style.color = '#CCCCCC';
      o.hText.style.padding = '0 4';
      o.hText.innerText = o.label;
      var hc = hr.insertCell();
      hc.width = 10;
      // 关闭按键
      if(o.closeAble){
         var hi = o.hCloseIcon = b.appendIcon(hc);
         hi.style.display = 'none';
         o.attachEvent('onSheetCloseClick', hi);
      }
      // 建立右边线
      var hc = o.hRight = hpr.insertCell();
      hc.width = 5;
      // 创建历史栏
      var hf = o.hHistoryForm = RBuilder.appendTable(RFormSpace.hHistoryPanel);
      var hr = o.hHistoryLine = hf.insertRow();
      var hc = o.hHistoryText = hr.insertCell();
      hc.innerText = RContext.get('FFormSheet:history');
   }else if(e.isAfter()){
      if(EAlign.Right != o.align){
         var hTd = b.create('TD');
         b.appendEmpty(hTd);
         o.hHistoryLine.appendChild(hTd);
      }
   }
   return r;
}

//==========================================================
// <T>构造内部对象。</T>
//
// @method
//==========================================================
function FFormSheet_construct(){
   var o = this;
   o.base.FContainer.construct.call(o);
   o.spaces = new TList();
   o.lsnsButtonClick = new TListeners();
}

//==========================================================
function FFormSheet_setLabel(t){
   this.hText.innerHTML = t;
}

//==========================================================
// <T>设置按键的图标内容。</T>
//
// @method
// @param c:icon:String 图标名称
//==========================================================
function FFormSheet_setIcon(c){
   this.hIcon.src = RResource.iconPath(c);
}

//==========================================================
// <T>设置按键的文本内容。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function FFormSheet_setText(t){
   this.hText.innerText = t;
}

//==========================================================
function FFormSheet_setHint(s){
   this.hText.title = s;
}

//==========================================================
function FFormSheet_currentSpace(){
   return this.activeSpace;
}

//==========================================================
function FFormSheet_createSpace(){
   var o = this;
   // 建立分割线
   var hs = null;
   var hl = o.hHistoryLine;
   if(o.spaces.count){
      hs = hl.insertCell();
      hs.width = '16';
      RBuilder.appendIcon(hs, 'ctl.FHistoryBar_Spliter');
   }
   // 建立按键
   var s = RControl.create(FFormSpace, hl.insertCell());
   s._manager = o._manager;
   s._sheet = o;
   s.index = o.spaces.count;
   s.hSplit = hs;
   o.spaces.push(s);
   //
   RFormSpace.spaces.push(s);
   return s;
}

//==========================================================
// <T>获得首个工作空间。</T>
//
// @method
// @param fn:formName:String 表单名称
//==========================================================
function FFormSheet_firstSpace(fn){
   var o = this;
   var ss = o.spaces;
   var s = ss.get(0);
   if(!s){
      // 创建第一个工作空间
      s = o.createSpace();
   }
   o.select(s);
   o._spaceIndex = s.index;
   return s;
}


//==========================================================
function FFormSheet_space(n){
   return this.spaces.get(n);
}

//==========================================================
// <T>获得下一个按键。</T>
// <P>如果按键后还有其他按键，则隐藏。</P>
//
// @method
//==========================================================
function FFormSheet_nextSpace(){
   var o = this;
   // 获得当前页面
   var sc = o.spaces.get(o._spaceIndex);
   if(sc){
      sc.innerSelect(false);
   }
   // 获得下个页面
   var n = ++o._spaceIndex;
   var sn = o.syncSpace(n);
   // 使其他按键变为未选中状态
   o.activeSpace = sn;
   sn.innerSelect(true);
   sn.setVisible(true);
   // 隐藏多余的按键
   var ss = o.spaces;
   for(var i=n+1; i<ss.count; i++){
      ss.get(i).setVisible(false);
   }
   return sn;
}


//==========================================================
// <T>获得指定索引位置上的按键。</T>
// <P>如果按键不存在，则建立从现存的最后一个按键到当前位置按键之间的所有按键。</P>
//
// @method
// @param n:index:Integer 索引位置
//==========================================================
function FFormSheet_syncSpace(n){
   var o = this;
   var ss = o.spaces;
   var s = ss.get(n);
   if(!s){
      for(var i=ss.count; i<=n; i++){
         s = o.createSpace();
      }
   }
   return s;
}

//==========================================================
// <T>点击一个按键。</T>
//
// @method
// @param b:button:FHistoryButton 历史按键
//==========================================================
function FFormSheet_clickSpace(s){
   var o = this;
   o._spaceIndex = o.spaces.indexOf(s);
   o.lsnsButtonClick.process(s);
   // 使其他按键变为未选中状态
   o.select(s);
}

//==========================================================
// <T>选中当前表单容器对象。</T>
//
// @method
// @param v:select:Boolean
//    <L value='true'>选中</L>
//    <L value='false'>未选中</L>
//==========================================================
function FFormSheet_innerSelect(v){
   var o = this;
   o._selected = v;
   // 设置是否选中的样式
   var ht = o.hText;
   if(v){
      ht.style.fontWeight = 'bold';
      ht.style.color = '#333333';
      o.hButtonPanel.style.background = RResource.iconUrlPath('ctl.FFormSheet_Button', 'png');
      o.hRight.style.background = RResource.iconUrlPath('ctl.FFormSheet_ButtonR', 'png');
      if(o.closeAble){
         o.hCloseIcon.style.display = 'block';
         o.hCloseIcon.src = RResource.iconPath('ctl.FFormSheet_Close', 'png');
      }
   }else{
      ht.style.fontWeight = 'normal';
      ht.style.color = '#CCCCCC';
      o.hButtonPanel.style.background = '';
      o.hRight.style.background = '';
      if(o.closeAble){
         o.hCloseIcon.style.display = 'none';
      }
   }
   // 根据容器类型切换显示容器
   if(v){
      if('frame' == o.target){
         RFormSpace.hSpaceFrame.style.display = 'block';
         RFormSpace.hSpaceForm.style.display = 'none';
      }else{
         RFormSpace.hSpaceFrame.style.display = 'none';
         RFormSpace.hSpaceForm.style.display = 'block';
      }
   }
   // 设置历史栏是否显示
   o.hHistoryForm.style.display = v ? 'block' : 'none';
   // 取消其他表单容器选择
   if(v){
      var s = o.activeSpace;
      if(s){
         s.setVisible(true);
         if(v){
            s.refresh();
         }
      }
   }else{
      var ss = o.spaces;
      for(var i=0; i<ss.count; i++){
         ss.get(i).innerSelect(false);
      }
   }
}

//==========================================================
// <T>选中当前表单容器对象。</T>
//
// @method
//==========================================================
function FFormSheet_select(s){
   var o = this;
   // 父选择
   o._sheets.select(o);
   // 选择子
   if(s){
      // 取消其他容器选择
      var ss = o.spaces;
      for(var i=0; i<ss.count; i++){
         var f = ss.get(i);
         if(f != s){
            f.innerSelect(false);
         }
      }
      // 选中指定容器
      o.activeSpace = s;
      s.innerSelect(true);
   }
}

//==========================================================
// <T>选中当前表单容器对象。</T>
//
// @method
// @param s:space:FFormSpace 表单空间
//==========================================================
function FFormSheet_selectSpace(s){
   var o = this;
   // 父选择
   o._sheets.select(o);
   // 选择子
   if(s){
      // 取消其他容器选择
      var ss = o.spaces;
      for(var i=0; i<ss.count; i++){
         var f = ss.get(i);
         if(f != s){
            f.innerSelect(false);
         }
      }
      // 选中指定容器
      o.activeSpace = s;
      s.innerSelect(true);
   }
}

//==========================================================
function FFormSheet_selectByIndex(n){
   this.select(ss.get(n));
}

//==========================================================
// <T>弹出历史按键。</T>
//
// @method
// @param l:level:Integer 级别
//==========================================================
function FFormSheet_popup(l){
   var o = this;
   var n = Math.max(o._spaceIndex - moNvl(l, 1), 0);
   // 模拟点击按键
   var s = o.spaces.get(n);
   o.select(s);
   o._spaceIndex = n;
   // 隐藏多余的按键
   var bc = o.spaces.count;
   for(++n; n<bc; n++){
      o.spaces.get(n).setVisible(false);
   }
   return s;
}

//==========================================================
// <T>清除所有按键。</T>
// <P>不释放对象，只隐藏所有按键。</P>
//
// @method
//==========================================================
function FFormSheet_clear(){
   var o = this;
   var ss = o.spaces;
   var c = ss.count;
   for(var n=0; n<c; n++){
      ss.get(n).setVisible(false);
   }
}

//==========================================================
// <T>点击控件的可见性。</T>
//
// @method
// @param v:visible:Boolean
//    <L value='true'>可见</L>
//    <L value='false'>不可见</L>
//==========================================================
function FFormSheet_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hButtonPanel = null;
   o.hButton = null;
   o.hIcon = null;
   o.hText = null;
   o.hHistoryForm = null;
   o.hHistoryLine = null;
   o.hHistoryText = null;
}
