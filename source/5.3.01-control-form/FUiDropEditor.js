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
   MO.FUiDropEditor = function FUiDropEditor(o){
      o = RClass.inherits(this, o, FUiEditor, MUiShadow);
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
      o.onBuild           = FUiDropEditor_onBuild;
      o.onDropMouseDown   = RClass.register(o, new AEventMouseDown('onDropMouseDown'));
      o.onDropMouseUp     = RClass.register(o, new AEventMouseUp('onDropMouseUp'));
      //..........................................................
      // @method
      o.panel             = FUiDropEditor_panel;
      o.setVisible        = FUiDropEditor_setVisible;
      // @method
      o.dispose           = FUiDropEditor_dispose;
      return o;
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiDropEditor_onBuild = function FUiDropEditor_onBuild(p){
      var o = this;
      o.__base.FUiEditor.onBuild.call(o, p);
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
   MO.FUiDropEditor_panel = function FUiDropEditor_panel(p){
      var o = this;
      if(p == EPanel.Shadow){
         return o.hPanel;
      }
      return o.__base.FUiEditor.panel.call(o, p);
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @method
   // @param p:visible:Boolean 是否显示
   //==========================================================
   MO.FUiDropEditor_setVisible = function FUiDropEditor_setVisible(p){
      var o = this;
      // 页面元素显示和隐藏
      var h = o._hPanel;
      var hd = o._hPanel.ownerDocument;
      if(p){
         hd.body.appendChild(h);
      }else{
         hd.body.removeChild(h);
      }
      o.__base.FUiEditor.setVisible.call(o, p);
      //o.__base.MUiShadow.setVisible.call(o, p);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiDropEditor_dispose = function FUiDropEditor_dispose(){
      var o = this;
      o._hButtonPanel = RHtml.free(o._hButtonPanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o._hDropForm = RHtml.free(o._hDropForm);
      o.__base.FControl.dispose.call(o);
   }
}
