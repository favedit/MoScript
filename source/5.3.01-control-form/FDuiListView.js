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
   MO.FDuiListView = function FDuiListView(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiHorizontal, MListenerClick, MListenerDoubleClick);
      //..........................................................
      // @property
      o._sizeCd           = EUiSize.Horizontal
      //..........................................................
      // @style
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      //..........................................................
      // @attribute
      o._focusItem        = null;
      o._itemPool         = null;
      //..........................................................
      // @html
      o._hForm            = null;
      //..........................................................
      // @event
      o.onBuildPanel      = FDuiListView_onBuildPanel;
      o.onBuild           = FDuiListView_onBuild;
      // @event
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FDuiListView_onClick);
      //..........................................................
      // @method
      o.construct         = FDuiListView_construct;
      // @method
      o.focusItem         = FDuiListView_focusItem;
      // @method
      o.createItem        = FDuiListView_createItem;
      o.appendChild       = FDuiListView_appendChild;
      o.selectItem        = FDuiListView_selectItem;
      o.doClickItem       = FDuiListView_doClickItem;
      o.doDoubleClickItem = FDuiListView_doDoubleClickItem;
      o.clear             = FDuiListView_clear;
      o.dispose           = FDuiListView_dispose;
      return o;
   }

   //==========================================================
   // <T>建立编辑器内容。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiListView_onBuildPanel = function FDuiListView_onBuildPanel(p){
      var o = this;
      // 建立编辑控件
      o._hPanel = RBuilder.createDiv(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>构件页面处理。</T>
   //
   // @method
   // @param event:TProcessEvent 处理事件
   //==========================================================
   MO.FDuiListView_onBuild = function FDuiListView_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
      // 关联事件
      var hPanel = o._hPanel;
      o.attachEvent('onClick', hPanel);
   }

   //==========================================================
   // <T>响应鼠标点击树节点复选框处理。</T>
   //
   // @method
   // @param s:source:FControl 源控件
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FDuiListView_onClick = function FDuiListView_onClick(s, e){
      var o = this;
      if(s.hSender == o._hNodePanel){
         var node = o._focusNode;
         if(node){
            node.select(false);
            o._focusNode = null;
         }
      }
   }

   //==========================================================
   // <T>创建一个列表项目。</T>
   //
   // @method
   // @param pi:icon:String 图标
   // @param pl:label:String 标签
   // @return FDuiListViewItem 列表项目
   //==========================================================
   MO.FDuiListView_construct = function FDuiListView_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
      o._itemPool = RClass.create(FObjectPool);
   }

   //==========================================================
   // <T>获得焦点项目。</T>
   //
   // @method
   // @return FDuiListViewItem 项目
   //==========================================================
   MO.FDuiListView_focusItem = function FDuiListView_focusItem(){
      return this._focusItem;
   }

   //==========================================================
   // <T>创建一个列表项目。</T>
   //
   // @method
   // @param pi:icon:String 图标
   // @param pl:label:String 标签
   // @return FDuiListViewItem 列表项目
   //==========================================================
   MO.FDuiListView_createItem = function FDuiListView_createItem(clazz, pi, pl){
      var o = this;
      var item = o._itemPool.alloc();
      if(!item){
         if(clazz){
            item = RClass.create(clazz);
         }else{
            item = RClass.create(FDuiListViewItem);
         }
         item.build(o._hPanel);
      }
      // item.setIcon(pi);
      //item.setLabel(pl);
      return item;
   }

   //==========================================================
   // <T>追加一个控件容器。</T>
   //
   // @method
   // @return p:control:FControl 控件
   //==========================================================
   MO.FDuiListView_appendChild = function FDuiListView_appendChild(p){
      var o = this;
      o._hPanel.appendChild(p._hPanel);
   }

   //==========================================================
   // <T>选中一个列表项目。</T>
   //
   // @method
   // @return item:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDuiListView_selectItem = function FDuiListView_selectItem(item){
      var o = this;
      // 选中项目
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.valueAt(i);
            if(RClass.isClass(component, FDuiListViewItem)){
               component.setChecked(component == item);
            }
         }
      }
      // 设置焦点
      o._focusItem = item;
   }

   //==========================================================
   // <T>点击一个列表项目。</T>
   //
   // @method
   // @param item:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDuiListView_doClickItem = function FDuiListView_doClickItem(item){
      var o = this;
      // 选中项目
      o.selectItem(item);
      // 事件处理
      var event = new SClickEvent(o);
      event.item = item;
      o.processClickListener(event);
      event.dispose();
   }

   //==========================================================
   // <T>双击一个列表项目。</T>
   //
   // @method
   // @param p:item:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDuiListView_doDoubleClickItem = function FDuiListView_doDoubleClickItem(item){
      var o = this;
      // 选中项目
      o.selectItem(item);
      // 事件处理
      var event = new SClickEvent(o);
      event.item = item;
      o.processDoubleClickListener(event);
      event.dispose();
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiListView_clear = function FDuiListView_clear(){
      var o = this;
      var cs = o._components;
      if(cs){
         var c = cs.count();
         for(var i = 0; i < c; i++){
            var m = cs.value(i);
            if(RClass.isClass(m, FDuiListViewItem)){
               o._hPanel.removeChild(m._hPanel);
               o._itemPool.free(m)
            }else{
               m.dispose();
            }
         }
         cs.clear();
         o._controls.clear();
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiListView_dispose = function FDuiListView_dispose(){
      var o = this;
      o.__base.FContainer.dispose.call(o);
   }
}
