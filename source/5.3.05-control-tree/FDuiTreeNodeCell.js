with(MO){
   //==========================================================
   // <T>树目录节点格子控件。</T>
   // 模板:
   //  hPanel<TD>
   // ┌------------------------------┐
   // │┌----------┐┌------------┐│
   // ││hIcon<IMG>││hLabel<SPAN>││
   // │└----------┘└------------┘│
   // └------------------------------┘
   //
   // @control
   // @author maocy
   // @version 150307
   //==========================================================
   MO.FUiTreeNodeCell = function FUiTreeNodeCell(o){
      o = RClass.inherits(this, o, FDuiControl, MListenerClick, MListenerDoubleClick);
      //..........................................................
      // @style
      o._stylePanel       = RClass.register(o, new AStyle('_stylePanel'));
      o._styleCell        = RClass.register(o, new AStyle('_styleCell', 'Cell'));
      //..........................................................
      // @attribute
      o._tree             = null;
      o._column           = null;
      o._level            = 0;
      o._node             = null;
      //..........................................................
      // @html
      o._hImage           = null;
      o._hIcon            = null;
      o._hLabel           = null;
      //..........................................................
      // @event
      o.onBuildPanel      = FUiTreeNodeCell_onBuildPanel;
      o.onBuild           = FUiTreeNodeCell_onBuild;
      o.onClick           = RClass.register(o, new AEventClick('onClick'), FUiTreeNodeCell_onClick);
      o.onDoubleClick     = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiTreeNodeCell_onDoubleClick);
      //..........................................................
      // @method
      o.construct         = FUiTreeNodeCell_construct;
      // @method
      o.icon              = FUiTreeNodeCell_icon;
      o.setIcon           = FUiTreeNodeCell_setIcon;
      o.get               = FUiTreeNodeCell_get;
      o.set               = FUiTreeNodeCell_set;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FUiTreeNodeCell_onBuildPanel = function FUiTreeNodeCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
   }

   //==========================================================
   // <T>构建页面处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   MO.FUiTreeNodeCell_onBuild = function FUiTreeNodeCell_onBuild(p){
      var o = this;
      var t = o._tree;
      var r = o.__base.FDuiControl.onBuild.call(o, p);
      // 建立底板
      var h = o._hPanel;
      o.attachEvent('onClick', h);
      o.attachEvent('onDoubleClick', h);
   }

   //==========================================================
   // <T>点击事件处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   MO.FUiTreeNodeCell_onClick = function FUiTreeNodeCell_onClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processClickListener(p);
   }

   //==========================================================
   // <T>双击事件处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件
   //==========================================================
   MO.FUiTreeNodeCell_onDoubleClick = function FUiTreeNodeCell_onDoubleClick(p){
      var o = this;
      p.treeNode = o._node;
      p.treeColumn = o._column;
      p.treeNodeCell = o;
      o.processDoubleClickListener(p);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTreeNodeCell_construct = function FUiTreeNodeCell_construct(){
      var o = this;
      o.__base.FDuiControl.construct.call(o);
      // 初始化变量
      o._attributes = new TAttributes();
   }

   //==========================================================
   // <T>获得图标。</T>
   //
   // @method
   // @return String 图标
   //==========================================================
   MO.FUiTreeNodeCell_icon = function FUiTreeNodeCell_icon(){
      return o._icon;
   }

   //==========================================================
   // <T>设置类型名称。</T>
   //
   // @method
   // @param String 类型名称
   //==========================================================
   MO.FUiTreeNodeCell_setIcon = function FUiTreeNodeCell_setIcon(p){
      var o = this;
      var h = o._hIcon;
      if(!h){
         // 建立图标
         h = o._hIcon = RBuilder.appendIcon(o._hPanel, null, null, 16, 16)
      }
      // 设置路径
      h.src = RResource.iconPath(p);
   }

   //==========================================================
   // <T>获取内容。</T>
   //
   // @method
   // @return String 内容
   //==========================================================
   MO.FUiTreeNodeCell_get = function FUiTreeNodeCell_get(){
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param p:value:String 内容
   //==========================================================
   MO.FUiTreeNodeCell_set = function FUiTreeNodeCell_set(p){
      // 建立显示文本
      //o._hLabel = RBuilder.appendText(hnp, o.styleName('Label'));
      //o.setLabel(o._label);
   }
}
