//==========================================================
// <T>树目录列组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
MO.FDuiTreeColumn = function FDuiTreeColumn(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @property
   o._icon        = MO.Class.register(o, new MO.APtyString('_icon'));
   o._dataName    = MO.Class.register(o, new MO.APtyString('_dataName'));
   o._display     = MO.Class.register(o, new MO.APtyBoolean('_display'), MO.EBoolean.False);
   o._config      = MO.Class.register(o, new MO.APtyConfig('_config'));
   //..........................................................
   // @process
   o.oeBuild      = MO.FDuiTreeColumn_oeBuild;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiTreeColumn_onBuildPanel;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param event:event:TEvent 构建事件
// @return EEventStatus 枚举类型
//==========================================================
MO.FDuiTreeColumn_oeBuild = function FDuiTreeColumn_oeBuild(event){
   var o = this;
   o.__base.FDuiControl.oeBuild.call(o, event);
   // 设置内容
   var hPanel = o._hPanel;
   hPanel.innerText = MO.Lang.String.nvl(o.label);
   hPanel.noWrap = true;
   if(!o.display){
      hPanel.style.display = 'block';
   }
   if(o.width){
      hPanel.width = o.width;
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @see RBuilder.create
//==========================================================
MO.FDuiTreeColumn_onBuildPanel = function FDuiTreeColumn_onBuildPanel(){
   this.hPanel = MO.Window.Builder.create(null, 'TD');
}
