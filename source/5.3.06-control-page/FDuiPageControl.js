with(MO){
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
   MO.FDuiPageControl = function FDuiPageControl(o){
      o = RClass.inherits(this, o, FDuiContainer);
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
      o._sheets          = null;
      o._activeSheet     = null;
      o._esize           = EUiSize.Both;
      //..........................................................
      // @html
      o._hTop            = null;
      o._hLine           = null;
      o._hBottom         = null;
      o._hSheets         = null;
      //..........................................................
      // @event
      o.onBuildPanel     = FDuiPageControl_onBuildPanel;
      o.onBuild          = FDuiPageControl_onBuild;
      //..........................................................
      // @process
      o.oeRefresh        = FDuiPageControl_oeRefresh;
      //..........................................................
      // @method
      o.construct        = FDuiPageControl_construct;
      // @method
      o.appendChild      = FDuiPageControl_appendChild;
      o.select           = FDuiPageControl_select;
      o.selectByIndex    = FDuiPageControl_selectByIndex;
      o.sheet            = FDuiPageControl_sheet;
      o.push             = FDuiPageControl_push;
      // @method
      o.dispose          = FDuiPageControl_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示底板。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiPageControl_onBuildPanel = function FDuiPageControl_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
      h.width = '100%';
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiPageControl_onBuild = function FDuiPageControl_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
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
      hc.width = 12;
      //RBuilder.appendEmpty(hc);
      o._hFirst = RBuilder.appendTableCell(o._hLine);
      var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
      hbc.className = o.styleName('Bottom', FDuiPageSheet);
      // 建立分隔区
      //var hc = RBuilder.appendTableRowCell(h);
      //hc.height = 2;
      // 建立标题区右边第一列
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      //hc.className = o.styleName('Top', FDuiPageSheet);
      //RBuilder.appendEmpty(hc);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FDuiPageSheet);
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiPageControl_oeRefresh = function FDuiPageControl_oeRefresh(event){
      var o = this;
      var r = o.__base.FDuiContainer.oeRefresh.call(o, event);
      if(event.isBefore()){
         // Select first
         if(o._sheets.count()){
            /*for(var n=0; n<o._sheets.count; n++){
               var event = o._sheets.value(n);
               event.processBuildChildren();
               event.hasBuilded = true;
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
   MO.FDuiPageControl_construct = function FDuiPageControl_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiContainer.construct.call(o);
      // 设置属性
      o._sheets = new TDictionary();
   }

   //==========================================================
   // <T>增加一个控件。</T>
   //
   // @method
   // @param control:FControl 控件
   //==========================================================
   MO.FDuiPageControl_appendChild = function FDuiPageControl_appendChild(control){
      var o = this;
      // 追加子页面
      if(RClass.isClass(control, FDuiPageSheet)){
         var ci = o._hLast.cellIndex;
         // 追加标题顶边线
         var hc = control._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Top');
         var hc = control._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
         hc.className = control.styleName('Top');
         var hc = control._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Top');
         // 建立左边线
         var hc = control._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Left');
         //RBuilder.appendEmpty(hc);
         // 建立按键
         var hc = control._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
         control.attachEvent('onButtonEnter', hc);
         control.attachEvent('onButtonLeave', hc);
         control.attachEvent('onHeadMouseDown', hc);
         hc.width = 1;
         var hb = control._hButton = RBuilder.appendDiv(hc, control.styleName('Button'));
         // 建立按键图标
         if(control.icon){
            control._hIcon = RBuilder.appendIcon(hb, null, control.icon);
         }
         // 建立按键标签
         if(control.label){
            control._hText = RBuilder.appendSpan(hb, control.styleName('ButtonText'));
            control._hText.innerText = ' ' + control.label();
         }
         // 建立右边线
         var hc = control._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Right')
         //RBuilder.appendEmpty(hc);
         // 建立标题底边线
         var hc = control._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         var hc = control._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
         hc.className = control.styleName('Bottom');
         var hc = control._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         //..........................................................
         // 追加数据信息
         var hr = RBuilder.appendTableRow(o._hPanel);
         if(control.index){
            hr.style.display = 'none';
         }
         var hc = RBuilder.appendTableCell(hr);
         control._hForm = hr;
         hc.style.verticalAlign = 'top';
         hc.appendChild(control._hPanel);
         // 选中第一个
         o.selectByIndex(0);
      }
   }

   //==========================================================
   // <T>根据名称获得页面。</T>
   //
   // @method
   // @param name:String 名称
   // @return FDuiPageSheet 页面
   //==========================================================
   MO.FDuiPageControl_sheet = function FDuiPageControl_sheet(name){
      return this._sheets.get(name);
   }

   //==========================================================
   // <T>选中活动页面。</T>
   //
   // @method
   // @param sheet:FDuiPageSheet 页面
   //==========================================================
   MO.FDuiPageControl_select = function FDuiPageControl_select(sheet){
      var o = this;
      o._activeSheet = sheet;
      // 取消其他页选中
      var sheets = o._sheets;
      var count = sheets.count();
      for(var i = 0; i < count; i++){
         var findSheet = sheets.at(i);
         if(findSheet != sheet){
            findSheet.select(false);
         }
      }
      // 选中当前页
      sheet.select(true);
   }

   //==========================================================
   // <T>根据索引选中页面。</T>
   //
   // @method
   // @param p:index:Integer 索引
   //==========================================================
   MO.FDuiPageControl_selectByIndex = function FDuiPageControl_selectByIndex(n){
      var o = this;
      var sheet = o._sheets.value(n);
      if(sheet){
         o.select(sheet);
      }
   }

   //==========================================================
   // <T>将子控件放入自己的哈希表中</T>
   //
   // @method
   // @param component:FComponent 组件对象
   //==========================================================
   MO.FDuiPageControl_push = function FDuiPageControl_push(component){
      var o = this;
      // 增加处理
      if(RClass.isClass(component, FDuiPageSheet)){
         var sheets = o._sheets;
         component._pageControl = o;
         component._index = sheets.count();
         sheets.set(component.name(), component);
      }
      // 父处理
      o.__base.FDuiContainer.push.call(o, component);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiPageControl_dispose = function FDuiPageControl_dispose(){
      var o = this;
      o.__base.FDuiContainer.dispose.call(o);
   }
}
