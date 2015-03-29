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
   o._itemPool         = null;
   //..........................................................
   // @html
   o._hForm            = null;
   //..........................................................
   // @event
   o.onBuildPanel      = FUiListView_onBuildPanel;
   //..........................................................
   // @method
   o.construct         = FUiListView_construct;
   // @method
   o.createItem        = FUiListView_createItem;
   o.appendChild       = FUiListView_appendChild;
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
// <T>创建一个列表项目。</T>
//
// @method
// @param pi:icon:String 图标
// @param pl:label:String 标签
// @return FUiListItem 列表项目
//==========================================================
function FUiListView_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._itemPool = RClass.create(FObjectPool);
}

//==========================================================
// <T>创建一个列表项目。</T>
//
// @method
// @param pi:icon:String 图标
// @param pl:label:String 标签
// @return FUiListItem 列表项目
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
// <T>点击一个列表项目。</T>
//
// @method
// @param p:item:FUiListItem 列表项目
//==========================================================
function FUiListView_doClickItem(p){
   var o = this;
   // 选中项目
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListItem)){
            m.setChecked(m == p);
         }
      }
   }
   // 事件处理
   var e = new SClickEvent(o);
   e.item = p;
   o.processClickListener(e);
   e.dispose();
}

//==========================================================
// <T>双击一个列表项目。</T>
//
// @method
// @param p:item:FUiListItem 列表项目
//==========================================================
function FUiListView_doDoubleClickItem(p){
   var o = this;
   // 选中项目
   var s = o._components;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         if(RClass.isClass(m, FUiListItem)){
            m.setChecked(m == p);
         }
      }
   }
   // 事件处理
   var e = new SClickEvent(o);
   e.item = p;
   o.processDoubleClickListener(e);
   e.dispose();
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
