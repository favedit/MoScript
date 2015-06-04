with(MO){
   //==========================================================
   // <T>行对象。</T>
   //
   // @class
   // @author maocy
   // @version 150125
   //==========================================================
   MO.FUiGridRow = function FUiGridRow(o){
      o = RClass.inherits(this, o, FUiGridRowControl);
      //..........................................................
      // @html 行对象<TR>
      o._hFixPanel   = null;
      //..........................................................
      // @event
      o.onBuildPanel = FUiGridRow_onBuildPanel;
      //..........................................................
      // @method
      o.setVisible   = FUiGridRow_setVisible;
      // @method
      o.appendChild  = FUiGridRow_appendChild;
      // @method
      o.dispose      = FUiGridRow_dispose;


      //..........................................................
      /// @method 建立内容
      //o.select       = FUiGridRow_select;
      //o.refreshSize  = FUiGridRow_refreshSize;
      //o.refreshStyle = FUiGridRow_refreshStyle;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FUiGridRow_onBuildPanel = function FUiGridRow_onBuildPanel(p){
      var o = this;
      o.__base.FUiGridRowControl.onBuildPanel.call(o, p);
      // 建立固定行对象
      o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>改变当前控件的显示模式。</T>
   //
   // @method
   // @param e:event:TEventProcess 事件处理
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FUiGridRow_setVisible = function FUiGridRow_setVisible(p){
      var o = this;
      o._visible = p;
      // 设置控件底板的可见性
      var h = o._hFixPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }

   //==========================================================
   // <T>追加一个子控件。</T>
   //
   // @method
   // @return p:control:FControl 控件
   //==========================================================
   MO.FUiGridRow_appendChild = function FUiGridRow_appendChild(p){
      var o = this;
      o.__base.FUiGridRowControl.appendChild.call(o, p);
      // 增加单元格
      var c = p._column;
      if(c._optionFixed){
         o._hFixPanel.appendChild(p._hPanel);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiGridRow_dispose = function FUiGridRow_dispose(){
      var o = this;
      var h = o._hFixPanel;
      if(h){
         RMemory.free(h);
         o._hFixPanel = null;
      }
      o.__base.FUiGridRowControl.dispose.call(o);
   }













   //==========================================================
   // 选择一行时，遍历所有的cell 更改样式表
   //
   // @method
   //==========================================================
   MO.FUiGridRow_select = function FUiGridRow_select(v){
      var o = this;
      o.isSelect = v;
      // 设置背景颜色
      var c = v ? EColor.RowSelect : EColor.Row;
      o._hFixPanel.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      // 刷新所有单元格颜色
      o.refreshStyle();
   }

   //==========================================================
   // <T>刷新当前控件大小。</T>
   //
   // @method
   //==========================================================
   MO.FUiGridRow_refreshSize = function FUiGridRow_refreshSize(){
      this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
   }

   //==========================================================
   // <T>刷新当前控件样式。</T>
   //
   // @method
   //==========================================================
   MO.FUiGridRow_refreshStyle = function FUiGridRow_refreshStyle(){
      var o = this;
      if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
         o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
      }else{
         o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
      }
      // 选取处理
      if(o.table.isLov){
         o._hFixPanel.style.cursor = 'hand';
      }
      o.__base.FUiGridRowControl.refreshStyle.call(o);
   }
}