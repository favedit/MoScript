with(MO){
   //==========================================================
   // <T>纵向布局控件。</T>
   //
   //  hPanel <TABLE>
   // ┌------------------------------------┐
   // │Control-1                           │
   // ├------------------------------------┤
   // │Control-2                           │
   // ├------------------------------------┤
   // │Control-3                           │
   // └------------------------------------┘
   //
   // @class
   // @author maocy
   // @version 150420
   //==========================================================
   MO.FDuiLayoutVertical = function FDuiLayoutVertical(o){
      o = RClass.inherits(this, o, FDuiContainer);
      //..........................................................
      // @style
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      //..........................................................
      // @html
      o._hLine       = null;
      //..........................................................
      // @event
      o.onBuildPanel = FDuiLayoutVertical_onBuildPanel;
      //..........................................................
      // @method
      o.appendChild  = FDuiLayoutVertical_appendChild;
      // @method
      o.dispose      = FDuiLayoutVertical_dispose;
      return o;
   }

   //==========================================================
   // <T>创建面板处理。</T>
   //
   // @method
   // @return event:TProcessEvent 处理事件
   //==========================================================
   MO.FDuiLayoutVertical_onBuildPanel = function FDuiLayoutVertical_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @method
   // @return control:FControl 控件
   //==========================================================
   MO.FDuiLayoutVertical_appendChild = function FDuiLayoutVertical_appendChild(control){
      var o = this;
      // 追加子控件
      var hCell = RBuilder.appendTableRowCell(o._hPanel);
      hCell.appendChild(control._hPanel);
      // 设置高度
      var height = control.size().height;
      if(height){
         hCell.style.height = height + 'px';
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiLayoutVertical_dispose = function FDuiLayoutVertical_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiContainer.dispose.call(o);
   }
}
