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
function FUiListView(o){
   o = RClass.inherits(this, o, FUiContainer, MUiHorizontal, MListenerClick, MListenerDoubleClick);
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
   o.onBuildPanel      = FUiListView_onBuildPanel;
   o.onBuild           = FUiListView_onBuild;
   // @event
   o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiListView_onClick);
   //..........................................................
   // @method
   o.construct         = FUiListView_construct;
   // @method
   o.focusItem         = FUiListView_focusItem;
   // @method
   o.createItem        = FUiListView_createItem;
   o.appendChild       = FUiListView_appendChild;
   o.selectItem        = FUiListView_selectItem;
   o.doClickItem       = FUiListView_doClickItem;
   o.doDoubleClickItem = FUiListView_doDoubleClickItem;
   o.clear             = FUiListView_clear;
   o.dispose           = FUiListView_dispose;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiListView_onBuildPanel(p){
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
function FUiListView_onBuild(event){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, event);
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
function FUiListView_onClick(s, e){
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
// @return FUiListViewItem 列表项目
//==========================================================
function FUiListView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._itemPool = RClass.create(FObjectPool);
}

//==========================================================
// <T>获得焦点项目。</T>
//
// @method
// @return FUiListViewItem 项目
//==========================================================
function FUiListView_focusItem(){
   return this._focusItem;
}

//==========================================================
// <T>创建一个列表项目。</T>
//
// @method
// @param pi:icon:String 图标
// @param pl:label:String 标签
// @return FUiListViewItem 列表项目
//==========================================================
function FUiListView_createItem(clazz, pi, pl){
   var o = this;
   var item = o._itemPool.alloc();
   if(!item){
      if(clazz){
         item = RClass.create(clazz);
      }else{
         item = RClass.create(FUiListViewItem);
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
function FUiListView_appendChild(p){
   var o = this;
   o._hPanel.appendChild(p._hPanel);
}

//==========================================================
// <T>选中一个列表项目。</T>
//
// @method
// @return item:FUiListViewItem 列表项目
//==========================================================
function FUiListView_selectItem(item){
   var o = this;
   // 选中项目
   var components = o._components;
   if(components){
      var count = components.count();
      for(var i = 0; i < count; i++){
         var component = components.valueAt(i);
         if(RClass.isClass(component, FUiListViewItem)){
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
// @param item:FUiListViewItem 列表项目
//==========================================================
function FUiListView_doClickItem(item){
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
// @param p:item:FUiListViewItem 列表项目
//==========================================================
function FUiListView_doDoubleClickItem(item){
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
function FUiListView_clear(){
   var o = this;
   var cs = o._components;
   if(cs){
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var m = cs.value(i);
         if(RClass.isClass(m, FUiListViewItem)){
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
function FUiListView_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
