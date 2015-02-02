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
function FUiPageControl(o){
   //o = RClass.inherits(this, o, FUiContainer, MDesign, MHorizontal);
   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @property
   o._sizeCd          = ESize.Horizontal;
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
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = ESize.Both;
   //..........................................................
   // @html
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   //..........................................................
   // @event
   o.onBuildPanel     = FUiPageControl_onBuildPanel;
   o.onBuild          = FUiPageControl_onBuild;
   //..........................................................
   // @process
   o.oeRefresh        = FUiPageControl_oeRefresh;
   //..........................................................
   // @method
   o.construct        = FUiPageControl_construct;
   // @method
   o.appendChild      = FUiPageControl_appendChild;
   o.select           = FUiPageControl_select;
   o.selectByIndex    = FUiPageControl_selectByIndex;
   o.sheet            = FUiPageControl_sheet;
   o.push             = FUiPageControl_push;
   // @method
   o.dispose          = FUiPageControl_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示底板。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiPageControl_onBuildPanel(p){
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
function FUiPageControl_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   // 获得底板
   var h = o._hPanel;
   // 建立标题区
   var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
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
   hbc.className = o.styleName('Bottom', FUiPageSheet);
   // 建立分隔区
   var hc = RBuilder.appendTableRowCell(h);
   hc.height = 4;
   // 建立标题区右边第一列
   var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
   //hc.className = o.styleName('Top', FUiPageSheet);
   //RBuilder.appendEmpty(hc);
   o._hLast = RBuilder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', FUiPageSheet);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiPageControl_oeRefresh(p){
   var o = this;
   var r = o.__base.FUiContainer.oeRefresh.call(o, p);
   if(p.isBefore()){
      // Select first
      if(o._sheets.count()){
         /*for(var n=0; n<o._sheets.count; n++){
            var p = o._sheets.value(n);
            p.processBuildChildren();
            p.hasBuilded = true;
         }*/
         if(o._activeSheet){
            o._activeSheet.oeRefresh(e);
         }else{
            var s = o._activeSheet = o._sheets.value(0);
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
function FUiPageControl_construct(){
   var o = this;
   // 父处理
   o.__base.FUiContainer.construct.call(o);
   // 设置属性
   o._sheets = new TDictionary();
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param p:control:FControl 控件
//==========================================================
function FUiPageControl_appendChild(p){
   var o = this;
   // 追加子页面
   if(RClass.isClass(p, FUiPageSheet)){
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
      p.attachEvent('onHeadMouseDown', hc);
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
      // 追加数据信息
      var hr = RBuilder.appendTableRow(o._hPanel);
      if(p.index){
         hr.style.display = 'none';
      }
      var hc = RBuilder.appendTableCell(hr);
      p._hForm = hr;
      hc.style.verticalAlign = 'top';
      hc.appendChild(p._hPanel);
      // 选中第一个
      o.selectByIndex(0);
   }
}

//==========================================================
// <T>根据名称获得页面。</T>
//
// @method
// @param p:name:String 名称
// @return FUiPageSheet 页面
//==========================================================
function FUiPageControl_sheet(p){
   return this._sheets.get(p);
}

//==========================================================
// <T>选中活动页面。</T>
//
// @method
// @param p:sheet:FUiPageSheet 页面
//==========================================================
function FUiPageControl_select(p){
   var o = this;
   var ss = o._sheets;
   var c = ss.count();
   o._activeSheet = p;
   for(var i = 0; i < c; i++){
      var s = o._sheets.value(i);
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
// @param p:index:Integer 索引
//==========================================================
function FUiPageControl_selectByIndex(n){
   var o = this;
   var p = o._sheets.value(n);
   if(p){
      o.select(p);
   }
}

//==========================================================
// <T>将子控件放入自己的哈希表中</T>
//
// @method
// @param p:component:FComponent 组件对象
//==========================================================
function FUiPageControl_push(p){
   var o = this;
   // 增加处理
   if(RClass.isClass(p, FUiPageSheet)){
      var ss = o._sheets;
      p._pageControl = o;
      p._index = ss.count();
      ss.set(p.name(), p);
   }
   // 父处理
   o.__base.FUiContainer.push.call(o, p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiPageControl_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
