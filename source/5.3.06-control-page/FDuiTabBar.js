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
MO.FDuiTabBar = function FDuiTabBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   //..........................................................
   // @property
   o._sizeCd          = MO.EUiSize.Horizontal;
   //..........................................................
   // @style
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm  = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleDataPanel  = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm   = MO.Class.register(o, new MO.AStyle('_styleDataForm'));

   o._styleTop        = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleBottom     = MO.Class.register(o, new MO.AStyle('_styleBottom'));

   o._styleForm       = MO.Class.register(o, new MO.AStyle('_styleForm'));
   //..........................................................
   // @attribute
   o._buttons          = null;
   o._activeButton     = null;
   o._esize            = MO.EUiSize.Both;
   //..........................................................
   // @html
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiTabBar_onBuildPanel;
   o.onBuild           = MO.FDuiTabBar_onBuild;
   //..........................................................
   // @process
   o.oeRefresh         = MO.FDuiTabBar_oeRefresh;
   //..........................................................
   // @method
   o.construct         = MO.FDuiTabBar_construct;
   // @method
   o.activeButton      = MO.FDuiTabBar_activeButton;
   o.appendChild       = MO.FDuiTabBar_appendChild;
   o.select            = MO.FDuiTabBar_select;
   o.selectByIndex     = MO.FDuiTabBar_selectByIndex;
   o.selectByName      = MO.FDuiTabBar_selectByName;
   o.sheet             = MO.FDuiTabBar_sheet;
   o.push              = MO.FDuiTabBar_push;
   // @method
   o.dispose           = MO.FDuiTabBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示底板。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiTabBar_onBuildPanel = function FDuiTabBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiTabBar_onBuild = function FDuiTabBar_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   // 获得底板
   var h = o._hPanel;
   // 建立标题区
   var hc = MO.Window.Builder.appendTableRowCell(h, o.styleName('TitlePanel'));
   hc.vAlign = 'bottom';
   var hf = o.hTitleForm = MO.Window.Builder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   // 创建标题列
   var hr = o._hTop = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = MO.Window.Builder.appendTableRow(hf);
   var hr = o._hBottom = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   // 建立标题区左边第一列
   var hc = o._hFirstTop = MO.Window.Builder.appendTableCell(o._hTop);
   hc.width = 20;
   //RBuilder.appendEmpty(hc);
   o._hFirst = MO.Window.Builder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', MO.FDuiTabButton);
   // 建立标题区右边第一列
   var hc = o._hLastTop = MO.Window.Builder.appendTableCell(o._hTop);
   //hc.className = o.styleName('Top', FDuiTabButton);
   //RBuilder.appendEmpty(hc);
   o._hLast = MO.Window.Builder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', MO.FDuiTabButton);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiTabBar_oeRefresh = function FDuiTabBar_oeRefresh(p){
   var o = this;
   var r = o.__base.FDuiContainer.oeRefresh.call(o, p);
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
MO.FDuiTabBar_construct = function FDuiTabBar_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiContainer.construct.call(o);
   // 设置属性
   o._buttons = new MO.TDictionary();
}

//==========================================================
// <T>获得选中的按键。</T>
//
// @method
// @return FDuiTabButton 按键
//==========================================================
MO.FDuiTabBar_activeButton = function FDuiTabBar_activeButton(){
   return this._activeButton;
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FControl 控件
//==========================================================
MO.FDuiTabBar_appendChild = function FDuiTabBar_appendChild(p){
   var o = this;
   // 追加子页面
   if(MO.Class.isClass(p, MO.FDuiTabButton)){
      var ci = o._hLast.cellIndex;
      // 追加标题顶边线
      var hc = p._hTopL = MO.Window.Builder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      // 建立左边线
      var hc = p._hLeft = MO.Window.Builder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      //RBuilder.appendEmpty(hc);
      // 建立按键
      var hc = p._hButtonPanel = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onButtonClick', hc);
      hc.width = 1;
      var hb = p._hButton = MO.Window.Builder.append(hc, 'DIV', p.styleName('Button'));
      // 建立按键图标
      if(p.icon){
         p._hIcon = MO.Window.Builder.appendIcon(hb, null, p.icon);
      }
      // 建立按键标签
      if(p.label){
         p._hText = MO.Window.Builder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      // 建立右边线
      var hc = p._hRight = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      //RBuilder.appendEmpty(hc);
      // 建立标题底边线
      var hc = p._hBottomL = MO.Window.Builder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 2);
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
// @return FDuiTabButton 页面
//==========================================================
MO.FDuiTabBar_sheet = function FDuiTabBar_sheet(p){
   return this._buttons.get(p);
}

//==========================================================
// <T>选中活动页面。</T>
//
// @method
// @param p:sheet:FDuiTabButton 页面
//==========================================================
MO.FDuiTabBar_select = function FDuiTabBar_select(p){
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
MO.FDuiTabBar_selectByIndex = function FDuiTabBar_selectByIndex(index){
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
MO.FDuiTabBar_selectByName = function FDuiTabBar_selectByName(name){
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
MO.FDuiTabBar_push = function FDuiTabBar_push(component){
   var o = this;
   // 增加处理
   if(MO.Class.isClass(component, MO.FDuiTabButton)){
      var buttons = o._buttons;
      component._index = buttons.count();
      buttons.set(component.name(), component);
   }
   // 父处理
   o.__base.FDuiContainer.push.call(o, component);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiTabBar_dispose = function FDuiTabBar_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
