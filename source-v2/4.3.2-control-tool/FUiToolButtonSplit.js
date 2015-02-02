//==========================================================
// <T>工具栏分隔符。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FUiToolButtonSplit(o){
   o = RClass.inherits(this, o, FUiControl);
   /// @style
   //o.styleButton  = RClass.register(o, new AStyle('Button'));
   // Html
   //o.hButton      = null;
   // Process Event
   //o.onBuild      = FUiToolButtonSplit_onBuild;
   // Event
   //o.onBuildPanel = FUiToolButtonSplit_onBuildPanel;
   //o.dispose      = FUiToolButtonSplit_dispose;
   return o;
}

/**************************************************************
 * 构建一个工具条中的分隔条
 *
 * @method
 * @param event:Event:EEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FUiToolButtonSplit_onBuild(event){
   var o = this;
   o.base.FUiControl.onBuild.call(o, event);
   o.hButton = RBuilder.append(this.hPanel, 'DIV', o.style('Button'));
   return EEventStatus.Stop;
}

/**************************************************************
 * 构建容器面板
 *
 * @method
 * @see RBuilder.create
 **************************************************************/
function FUiToolButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Panel'));
}

/**************************************************************
 * 构建容器面板
 *
 * @method
 * @see RBuilder.create
 **************************************************************/
function FUiToolButtonSplit_dispose(){
   var o = this;
   o.base.FUiControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hButton = null;
}