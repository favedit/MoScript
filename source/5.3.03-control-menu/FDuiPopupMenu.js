with(MO){
   //==========================================================
   // <T>弹出菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150402
   //==========================================================
   MO.FDuiPopupMenu = function FDuiPopupMenu(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiPopup);
      //..........................................................
      // @style
      o._stylePanel     = RClass.register(o, new AStyle('_stylePanel'));
      o._styleForm      = RClass.register(o, new AStyle('_styleForm'));
      o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
      o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
      o._styleButton    = RClass.register(o, new AStyle('_styleButton'));
      //..........................................................
      // @attribute
      o._opener         = null;
      // @attribute
      o._visible        = false;
      o._statusVisible  = false;
      //..........................................................
      // @html
      o._hContainer     = null;
      o._hLabel         = null;
      o._hButtonPanel   = null;
      o._hIcon          = null;
      o._hText          = null;
      //..........................................................
      // @event
      o.onBuild         = FDuiPopupMenu_onBuild;
      //..........................................................
      // @method
      o.appendChild     = FDuiPopupMenu_appendChild;
      o.show            = FDuiPopupMenu_show;
      o.setVisible      = FDuiPopupMenu_setVisible;
      o.testInRange     = FDuiPopupMenu_testInRange;
      o.doBlur          = FDuiPopupMenu_doBlur;
      // @method
      o.dispose         = FDuiPopupMenu_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDuiPopupMenu_onBuild = function FDuiPopupMenu_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
      var hPanel = o._hPanel;
      // 建立表单
      var hForm = o._hForm = RBuilder.appendTable(hPanel, o.styleName('Form'));
      // 建立上边线
      var hLineTop = o._hLineTop = RBuilder.appendTableCell(hForm);
      hLineTop.bgColor = '#666666';
      hLineTop.height = '2px';
      // 建立容器
      var hContainerPanel = o._hContainerPanel = RBuilder.appendTableCell(hForm);
      // 建立下边线
      var hLineBottom = o._hLineBottom = RBuilder.appendTableCell(hForm);
      hLineBottom.bgColor = '#666666';
      hLineBottom.height = '2px';

      //var hd = o._hFormPanel = RBuilder.append(hc, 'DIV')
      //hd.style.width = '100%';
      //hd.style.height = '100%';
      // 设置内部表单
      var hContainer = o._hContainer = RBuilder.appendTable(hContainerPanel, o.styleName('Container'));
      // Insert first
      //var h = o._hLabel = o._hContainer.insertRow().insertCell();
      //h.className = o.styleName('Label');
      //RBuilder.appendEmpty(h);
      // Insert buttom
      //o._hLastRow = o._hContainer.insertRow();
      //var h = o._hLastRow.insertCell();
      //RBuilder.appendEmpty(h, 1, 4);
      //o.setVisible(false);
   }

   //==========================================================
   // <T>失去焦点处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiPopupMenu_doBlur = function FDuiPopupMenu_doBlur(){
      var o = this;
      //if(o._opener){
      //   o._opener.onBlur();
      //}else{
      //   o.hide();
      //}
   }

   //==========================================================
   // <T>追加子控件。</T>
   //
   // @method
   // @param control:FDuiControl 控件
   //==========================================================
   MO.FDuiPopupMenu_appendChild = function FDuiPopupMenu_appendChild(control){
      var o = this;
      var hButtonPanel = RBuilder.appendTableRowCell(o._hContainer);
      hButtonPanel.className = o.styleName('Button');
      hButtonPanel.appendChild(control._hPanel);
   }

   //==========================================================
   // <T>显示处理。</T>
   //
   // @method
   // @param visible:Boolean 是否显示
   //==========================================================
   MO.FDuiPopupMenu_show = function FDuiPopupMenu_show(h, positionCd, v){
      var o = this;
      var hPanel = o._hPanel;
      var opener = o._opener;
      // 设置显示
      o.setVisible(true);
      // 修正尺寸
      var hOpener = opener._hPanel;
      var openerWidth = hOpener.offsetWidth;
      var openerHeight = hOpener.offsetHeight;
      // 修正尺寸
      var width = hPanel.offsetWidth;
      var height = hPanel.offsetHeight;
      var style = hPanel.style;
      if(width < openerWidth){
         width = openerWidth;
      }
      if(height > 300){
         o._hFormPanel.style.overflowY = 'scroll';
         style.height = height + 'px';
      }
      // 设置位置
      //o.setBounds(r.left, r.bottom);
      style.left = '3px';
      style.top = (openerHeight + 1) + 'px';
      style.width = width + 'px';
      style.zIndex = RDuiLayer.next();
      //o.focus();
   }

   //==========================================================
   // <T>设置是否显示。</T>
   //
   // @method
   // @param visible:Boolean 是否显示
   //==========================================================
   MO.FDuiPopupMenu_setVisible = function FDuiPopupMenu_setVisible(visible){
      var o = this;
      var opener = o._opener;
      o._statusVisible = visible;
      // 设置控件底板的可见性
      var hOpener = opener._hPanelCell;
      var hPanel = o.panel(EPanel.Container);
      if(visible){
         hOpener.appendChild(hPanel);
      }else{
         hOpener.removeChild(hPanel);
      }
   }


   // ------------------------------------------------------------
   MO.FDuiPopupMenu_testInRange = function FDuiPopupMenu_testInRange(e){
      return this == RControl.htmlControl(e.srcElement, FDuiPopupMenu);
   }

   // ------------------------------------------------------------
   MO.FDuiPopupMenu_dispose = function FDuiPopupMenu_dispose(e){
      var o = this;
      o._hContainer = RMemory.free(o._hContainer);
      o._hPanel = RMemory.free(o._hPanel);
      o._hLabel = RMemory.free(o._hLabel);
      o._hLastRow = RMemory.free(o._hLastRow);
      // 父处理
      o.__base.FDuiContainer.dispose.call(o);
   }
}
