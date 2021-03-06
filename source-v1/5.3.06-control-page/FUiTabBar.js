//==========================================================
// <T>多页控件。</T>
//
//  hPanel<Table>
// ┌--------------------------------------------------------┐
// │                                        hTitlePanel<TD> │
// │ hTitleForm<TABLE>                                      │
// │┌----------------------------------------------------┐│
// ││hTop<TR>                                            ││
// │├----------------------------------------------------┤│
// ││hLine<TR>                                           ││
// │├----------------------------------------------------┤│
// ││hBottom<TR>                                         ││
// │└----------------------------------------------------┘│
// ├--------------------------------------------------------┤
// │                                         hDataPanel<TD> │
// │ hDataForm<TABLE>                                       │
// │┌----------------------------------------------------┐│m
// │└----------------------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FUiTabBar(o){
   o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
   //..........................................................
   // @property
   o._sizeCd          = EUiSize.Horizontal;
   //..........................................................
   // @style
   o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
   o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
   o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));

   o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
   o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));

   o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
   //..........................................................
   // @attribute
   o._buttons          = null;
   o._activeButton     = null;
   o._esize           = EUiSize.Both;
   //..........................................................
   // @html
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   //..........................................................
   // @event
   o.onBuildPanel     = FUiTabBar_onBuildPanel;
   o.onBuild          = FUiTabBar_onBuild;
   //..........................................................
   // @process
   o.oeRefresh        = FUiTabBar_oeRefresh;
   //..........................................................
   // @method
   o.construct        = FUiTabBar_construct;
   // @method
   o.activeButton      = FUiTabBar_activeButton;
   o.appendChild      = FUiTabBar_appendChild;
   o.select           = FUiTabBar_select;
   o.selectByIndex    = FUiTabBar_selectByIndex;
   o.selectByName     = FUiTabBar_selectByName;
   o.sheet            = FUiTabBar_sheet;
   o.push             = FUiTabBar_push;
   // @method
   o.dispose          = FUiTabBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示底板。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiTabBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiTabBar_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   // 获得底板
   var h = o._hPanel;
   // 建立标题区
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
   hc.vAlign = 'bottom';
   var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   // 创建标题列
   var hr = o._hTop = RBuilder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = RBuilder.appendTableRow(hf);
   var hr = o._hBottom = RBuilder.appendTableRow(hf);
   hr.height = 1;
   // 建立标题区左边第一列
   var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
   hc.width = 20;
   //RBuilder.appendEmpty(hc);
   o._hFirst = RBuilder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FUiTabButton);
   // 建立标题区右边第一列
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   //hc.className = o.styleName('Top', FUiTabButton);
   //RBuilder.appendEmpty(hc);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiTabButton);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiTabBar_oeRefresh(p){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      // Select first
      if(o._buttons.count()){
         /*for(var n=0; n<o._buttons.count; n++){
            var p = o._buttons.value(n);
            p.processBuildChildren();
            p.hasBuilded = true;
         }*/
         if(o._activeButton){
            o._activeButton.oeRefresh(e);
         }else{
            var s = o._activeButton = o._buttons.value(0);
            if(s){
               s.innerSelect(true);
            }
         }
      }
   }
   return r;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiTabBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiContainer.construct.call(o);
   // 设置属性
   o._buttons = new TDictionary();
}

//==========================================================
// <T>获得选中的按键。</T>
//
// @method
// @return FUiTabButton 按键
//==========================================================
function FUiTabBar_activeButton(){
   return this._activeButton;
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FControl 控件
//==========================================================
function FUiTabBar_appendChild(p){
   var o = this;
   // 追加子页面
   if(RClass.isClass(p, FUiTabButton)){
      var ci = o._hLast.cellIndex;
      // 追加标题顶边线
      var hc = p._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      // 建立左边线
      var hc = p._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      //RBuilder.appendEmpty(hc);
      // 建立按键
      var hc = p._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onButtonClick', hc);
      hc.width = 1;
      var hb = p._hButton = RBuilder.append(hc, 'DIV', p.styleName('Button'));
      // 建立按键图标
      if(p.icon){
         p._hIcon = RBuilder.appendIcon(hb, null, p.icon);
      }
      // 建立按键标签
      if(p.label){
         p._hText = RBuilder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      // 建立右边线
      var hc = p._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      //RBuilder.appendEmpty(hc);
      // 建立标题底边线
      var hc = p._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      // 选中第一个
      o.selectByIndex(0);
   }
}

//==========================================================
// <T>根据名称获得页面。</T>
//
// @method
// @param p:name:String 名称
// @return FUiTabButton 页面
//==========================================================
function FUiTabBar_sheet(p){
   return this._buttons.get(p);
}

//==========================================================
// <T>选中活动页面。</T>
//
// @method
// @param p:sheet:FUiTabButton 页面
//==========================================================
function FUiTabBar_select(p){
   var o = this;
   var ss = o._buttons;
   var c = ss.count();
   o._activeButton = p;
   for(var i = 0; i < c; i++){
      var s = o._buttons.value(i);
      if(s != p){
         s.select(false);
      }
   }
   p.select(true);
}

//==========================================================
// <T>根据索引选中页面。</T>
//
// @method
// @param index:Integer 索引
//==========================================================
function FUiTabBar_selectByIndex(index){
   var o = this;
   var sheet = o._buttons.value(index);
   if(sheet){
      o.select(sheet);
   }
}

//==========================================================
// <T>根据名称选中页面。</T>
//
// @method
// @param name:String 名称
//==========================================================
function FUiTabBar_selectByName(name){
   var o = this;
   var sheet = o.findControl(name);
   if(sheet){
      o.select(sheet);
   }
}

//==========================================================
// <T>将子控件放入自己的哈希表中</T>
//
// @method
// @param p:component:FComponent 组件对象
//==========================================================
function FUiTabBar_push(component){
   var o = this;
   // 增加处理
   if(RClass.isClass(component, FUiTabButton)){
      var buttons = o._buttons;
      component._index = buttons.count();
      buttons.set(component.name(), component);
   }
   // 父处理
   o.__base.FUiContainer.push.call(o, component);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiTabBar_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
