/**************************************************************
 * 树目录里定义一列的控件类
 *
 * @control
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   // Property
   o.icon         = RClass.register(o, new TPtyStr('icon'));
   o.dataName     = RClass.register(o, new TPtyStr('dataName'));
   o.display      = RClass.register(o, new TPtyBool('display', EBool.False));
   o.config       = RClass.register(o, new TPtyCfg('config'));
   // Process
   o.oeBuild      = FTreeColumn_oeBuild;
   // Event
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}

/**************************************************************
 * 构建列函数
 *
 * @method
 * @param event:event:TEvent 构建事件
 * @return EEventStatus 枚举类型
 **************************************************************/
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, event);
   var h = o.hPanel;
   h.innerText = RString.nvl(o.label);
   h.noWrap = true;
   if(!o.display){
      h.style.display = 'block';
   }
   if(o.width){
      h.width = o.width;
   }
   return EEventStatus.Stop;
}

/**************************************************************
 * 构建一个panel
 *
 * @method
 * @see RBuilder.create
 **************************************************************/
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
