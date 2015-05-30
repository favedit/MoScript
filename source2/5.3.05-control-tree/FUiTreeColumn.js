with(MO){
   //==========================================================
   // <T>树目录列组件。</T>
   //
   // @component
   // @author maocy
   // @version 150119
   //==========================================================
   MO.FUiTreeColumn = function FUiTreeColumn(o){
      o = RClass.inherits(this, o, FUiControl);
      //..........................................................
      // @property
      o._icon        = RClass.register(o, new APtyString('_icon'));
      o._dataName    = RClass.register(o, new APtyString('_dataName'));
      o._display     = RClass.register(o, new APtyBoolean('_display'), EBoolean.False);
      o._config      = RClass.register(o, new APtyConfig('_config'));
      //..........................................................
      // @process
      o.oeBuild      = FUiTreeColumn_oeBuild;
      //..........................................................
      // @event
      o.onBuildPanel = FUiTreeColumn_onBuildPanel;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   MO.FUiTreeColumn_oeBuild = function FUiTreeColumn_oeBuild(event){
      var o = this;
      var r = o.__base.FUiControl.oeBuild.call(o, event);
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
   MO.FUiTreeColumn_onBuildPanel = function FUiTreeColumn_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'TD');
   }
}
