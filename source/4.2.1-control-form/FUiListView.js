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
   o.onBuildPanel = FUiListView_onBuildPanel;
   //..........................................................
   // @method
   o.createItem   = FUiListView_createItem;
   o.appendChild  = FUiListView_appendChild;
   o.clickItem    = FUiListView_clickItem;
   o.clear        = FUiListView_clear;
   o.dispose      = FUiListView_dispose;
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
function FUiListView_createItem(pi, pl){
   var o = this;
   var c = RClass.create(FUiListItem);
   c.build(o._hPanel);
   c.setLabel(pl);
   return c;
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
function FUiListView_clickItem(p){
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
   o.processClickListener(o, p);
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
         if(RClass.isClass(m, FUiListItem)){
            o._hPanel.removeChild(m._hPanel);
         }
         m.dispose();
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
