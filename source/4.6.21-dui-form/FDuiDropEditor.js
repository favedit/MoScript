with(MO){
   //==========================================================
   // <T>下拉编辑器。</T>
   //
   //  hPanel<DIV>
   // ┌----------------------------------------------------┐
   // │ hDropForm<TABLE>                                   │
   // │┌------------------------------------------------┐│
   // ││hDropPanel<TD>                                  ││
   // │├------------------------------------------------┤│
   // ││hButtonPanel<TD>                                ││
   // │└------------------------------------------------┘│
   // └----------------------------------------------------┘
   //
   // @class
   // @author maocy
   // @version 150224
   //==========================================================
   MO.FDuiDropEditor = function FDuiDropEditor(o){
      o = RClass.inherits(this, o, FDuiEditor, MDuiShadow);
      //..........................................................
      // @style
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleDropForm    = RClass.register(o, new AStyle('_styleDropForm'));
      o._styleDropPanel   = RClass.register(o, new AStyle('_styleDropPanel'));
      o._styleButtonPanel = RClass.register(o, new AStyle('_styleButtonPanel'));
      //..........................................................
      // @attribute
      o._minWidth         = 160;
      o._minHeight        = 300;
      //..........................................................
      // @html
      o._hDropForm        = null;
      o._hDropPanel       = null;
      o._hButtonPanel     = null;
      //..........................................................
      // @event
      o.onBuildDrop       = RMethod.virtual(o, 'onBuildDrop');
      o.onBuildButton     = RMethod.empty;
      o.onBuild           = FDuiDropEditor_onBuild;
      o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
      o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
      //..........................................................
      // @method
      o.panel             = FDuiDropEditor_panel;
      o.setVisible        = FDuiDropEditor_setVisible;
      // @method
      o.dispose           = FDuiDropEditor_dispose;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiDropEditor_onBuild = function FDuiDropEditor_onBuild(p){
      var o = this;
      o.__base.FDuiEditor.onBuild.call(o, p);
      // 设置样式
      var h = o._hPanel;
      h.className = o.styleName('Panel');
      // 建立表单
      var hf = o._hDropForm = RBuilder.appendTable(h, o.styleName('DropForm'));
      o._hDropPanel = RBuilder.appendTableRowCell(hf, o.styleName('DropPanel'));
      o._hButtonPanel = RBuilder.appendTableRowCell(hf, o.styleName('ButtonPanel'));
      // 建立下拉内容
      o.onBuildDrop();
      // 建立按键
      o.onBuildButton();
   }

   //==========================================================
   // <T>获得底板。</T>
   //
   // @method
   //==========================================================
   MO.FDuiDropEditor_panel = function FDuiDropEditor_panel(p){
      var o = this;
      if(p == EPanel.Shadow){
         return o.hPanel;
      }
      return o.__base.FDuiEditor.panel.call(o, p);
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @method
   // @param p:visible:Boolean 是否显示
   //==========================================================
   MO.FDuiDropEditor_setVisible = function FDuiDropEditor_setVisible(p){
      var o = this;
      // 页面元素显示和隐藏
      var h = o._hPanel;
      var hd = o._hPanel.ownerDocument;
      if(p){
         hd.body.appendChild(h);
      }else{
         hd.body.removeChild(h);
      }
      o.__base.FDuiEditor.setVisible.call(o, p);
      //o.__base.MDuiShadow.setVisible.call(o, p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiDropEditor_dispose = function FDuiDropEditor_dispose(){
      var o = this;
      o._hButtonPanel = RHtml.free(o._hButtonPanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o._hDropForm = RHtml.free(o._hDropForm);
      o.__base.FControl.dispose.call(o);
   }
}
