with(MO){
   //==========================================================
   // <T>列表控件。</T>
   //
   //  hPanel<TABLE>
   // ┌----------------------------------------┬-┐
   // │ hForm<TABLE>                           │ │
   // │┌------------------------------------┐│S│
   // ││(LitItem)                           ││c│
   // │├------------------------------------┤│r│
   // ││(LitItem)                           ││o│
   // │├------------------------------------┤│l│
   // ││(LitItem)                           ││l│
   // │└------------------------------------┘│ │
   // └----------------------------------------┴-┘
   //
   // @class
   // @author maocy
   // @history 150224
   //==========================================================
   MO.FUiListBox = function FUiListBox(o){
      o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick);
      //..........................................................
      // @property
      o._sizeCd      = EUiSize.Horizontal
      //..........................................................
      // @style
      o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
      //..........................................................
      // @html
      o._hForm       = null;
      //..........................................................
      // @event
      o.onBuildPanel = FUiListBox_onBuildPanel;
      //..........................................................
      // @method
      o.createItem   = FUiListBox_createItem;
      o.appendChild  = FUiListBox_appendChild;
      o.clickItem    = FUiListBox_clickItem;
      o.clear        = FUiListBox_clear;
      o.dispose      = FUiListBox_dispose;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiListBox_onBuildPanel = function FUiListBox_onBuildPanel(p){
      var o = this;
      // 建立编辑控件
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>创建一个列表项目。</T>
   //
   // @method
   // @param icon:String 图标
   // @param label:String 标签
   // @return FUiListItem 列表项目
   //==========================================================
   MO.FUiListBox_createItem = function FUiListBox_createItem(icon, label){
      var o = this;
      var item = RClass.create(FUiListItem);
      item.build(o._hPanel);
      item.setLabel(label);
      return item;
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @method
   // @return control:FControl 控件
   //==========================================================
   MO.FUiListBox_appendChild = function FUiListBox_appendChild(control){
      var o = this;
      o._hPanel.appendChild(control._hPanel);
   }

   //==========================================================
   // <T>点击一个列表项目。</T>
   //
   // @method
   // @param item:FUiListItem 列表项目
   //==========================================================
   MO.FUiListBox_clickItem = function FUiListBox_clickItem(item){
      var o = this;
      // 选中项目
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FUiListItem)){
               component.setChecked(component == item);
            }
         }
      }
      // 事件处理
      var event = new SEvent(o);
      event.item = item;
      o.processClickListener(event);
      event.dispose();
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiListBox_clear = function FUiListBox_clear(){
      var o = this;
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FUiListItem)){
               o._hPanel.removeChild(component._hPanel);
            }
            component.dispose();
         }
         components.clear();
         o._controls.clear();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiListBox_dispose = function FUiListBox_dispose(){
      var o = this;
      o.__base.FContainer.dispose.call(o);
   }
}
