/**************************************************************
 * 工具栏类中的分隔条控件
 *
 * @class
 * @face FContorl
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FToolButtonSplit(o){
   o = RClass.inherits(this, o, FControl);
   /// @style
   o.styleButton  = RClass.register(o, new TStyle('Button'));
   // Html
   o.hButton      = null;
   // Process Event
   o.oeBuild      = FToolButtonSplit_oeBuild;
   // Event
   o.onBuildPanel = FToolButtonSplit_onBuildPanel;
   o.dispose      = FToolButtonSplit_dispose;
   return o;
}

/**************************************************************
 * 构建一个工具条中的分隔条
 *
 * @method
 * @param event:Event:EEvent 构建事件
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolButtonSplit_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   o.hButton = RBuilder.append(this.hPanel, 'DIV', o.style('Button'));
   return EEventStatus.Stop;
}

/**************************************************************
 * 构建容器面板
 *
 * @method
 * @see RBuilder.create
 **************************************************************/
function FToolButtonSplit_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD', this.style('Panel'));
}

/**************************************************************
 * 构建容器面板
 *
 * @method
 * @see RBuilder.create
 **************************************************************/
function FToolButtonSplit_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   RMemory.freeHtml(o.hButton);
   o.hPanel = null;
   o.hButton = null;
}