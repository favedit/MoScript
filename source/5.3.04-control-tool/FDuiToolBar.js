with(MO){
   //==========================================================
   // <T>界面工具栏。</T>
   //
   //  hPanel<TABLE>
   // ┌-----------------┬-----------------┬-----------------┬-----------------┐
   // │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
   // │(Button1)        │(Button2)        │(Button3)        │                 │
   // └-----------------┴-----------------┴-----------------┴-----------------┘
   //
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FUiToolBar = function FUiToolBar(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiDescribeFrame);
      //..........................................................
      // @property EUiAlign 对齐枚举
      o._alignCd          = RClass.register(o, new APtyEnum('_alignCd', null, EUiAlign, EUiAlign.Left));
      // @property EUiDirection 方向枚举
      o._directionCd      = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection, EUiDirection.Horizontal));
      // @property EUiMerge 合并枚举
      o._mergeCd          = RClass.register(o, new APtyEnum('_mergeCd', null, EUiMerge, EUiMerge.Override));
      //..........................................................
      // @style
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      //..........................................................
      // @html
      o._hLine            = null;
      //..........................................................
      // @event
      o.onBuildPanel      = FUiToolBar_onBuildPanel;
      o.onEnter           = RMethod.empty;
      o.onLeave           = RMethod.empty;
      //..........................................................
      // @method
      o.appendChild       = FUiToolBar_appendChild;
      o.removeChild       = FUiToolBar_removeChild;
      // @method
      o.dispose           = FUiToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiToolBar_onBuildPanel = function FUiToolBar_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>追加一个子控件。</T>
   //
   // @method
   // @param control:FDuiControl 子控件
   //==========================================================
   MO.FUiToolBar_appendChild = function FUiToolBar_appendChild(control){
      var o = this;
      // 父处理
      o.__base.FDuiContainer.appendChild.call(o, control);
      // 按键处理
      if(RClass.isClass(control, MUiToolButton)){
         var h = o._hPanel;
         var hl = o._hLine;
         // 横向排布
         if(o._directionCd == EUiDirection.Horizontal){
            if(!hl){
               hl = o._hLine = RBuilder.appendTableRow(h);
            }
         }
         // 纵向排布
         if(o._directionCd == EUiDirection.Vertical){
            hl = o._hLine = RBuilder.appendTableRow(h);
         }
         // 建立按键
         var hc = RBuilder.appendTableCell(hl, o.styleName('ButtonPanel'));
         //hc._hParentLine = hl;
         control._hPanelCell = hc;
         control.setPanel(hc);
      }
   }

   //==========================================================
   // <T>移除一个子控件。</T>
   //
   // @method
   // @param p:control:FDuiControl 子控件
   //==========================================================
   MO.FUiToolBar_removeChild = function FUiToolBar_removeChild(p){
      var o = this;
      // 按键处理
      if(RClass.isClass(p, MUiToolButton)){
         var hp = p._hParent;
         var hl = p._hParentLine;
         hl.removeChild(hp);
         p._hParent = null;
         p._hParentLine = null;
      }
      // 父处理
      o.__base.FDuiContainer.removeChild.call(o, p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiToolBar_dispose = function FUiToolBar_dispose(){
      var o = this;
      o._hLine = RHtml.free(o._hLine);
      o.__base.FDuiContainer.dispose.call(o);
   }
}
