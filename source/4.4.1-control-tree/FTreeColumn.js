//==========================================================
// <T>树目录列组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
function FTreeColumn(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @property
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._dataName    = RClass.register(o, new APtyString('_dataName'));
   o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
   o._config      = RClass.register(o, new APtyConfig('_config'));
   //..........................................................
   // @process
   o.oeBuild      = FTreeColumn_oeBuild;
   //..........................................................
   // @event
   o.onBuildPanel = FTreeColumn_onBuildPanel;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param event:event:TEvent 构建事件
// @return EEventStatus 枚举类型
//==========================================================
function FTreeColumn_oeBuild(event){
   var o = this;
   var r = o.__base.FControl.oeBuild.call(o, event);
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

//==========================================================
// <T>建立标签。</T>
//
// @method
// @see RBuilder.create
//==========================================================
function FTreeColumn_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TD');
}
