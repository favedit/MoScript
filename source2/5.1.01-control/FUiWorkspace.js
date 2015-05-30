with(MO){
   //==========================================================
   // <T>工作空间页面集合。</T>
   //
   // @class
   // @author maocy
   // @version 150120
   //==========================================================
   MO.FUiWorkspace = function FUiWorkspace(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
      //..........................................................
      // @style
      o._stylePanel    = RClass.register(o, new AStyle('_stylePanel'));
      //..........................................................
      // @attribute
      o._frames      = null;
      //..........................................................
      // @html
      o._hContainer  = null;
      //..........................................................
      // @event
      o.onBuildPanel = FUiWorkspace_onBuildPanel;
      //..........................................................
      // @method
      o.appendChild  = FUiWorkspace_appendChild;
      return o;
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   //
   // @method
   // @param event:TEventProcess 处理事件
   //==========================================================
   MO.FUiWorkspace_onBuildPanel = function FUiWorkspace_onBuildPanel(event){
      var o = this;
      o._hPanel = RBuilder.createDiv(event, o.styleName('Panel'));
      //o._hPanel = RBuilder.createFragment(event);
   }

   //==========================================================
   // <T>增加一个控件。</T>
   //
   // @method
   // @param control:FUiControl 控件
   //==========================================================
   MO.FUiWorkspace_appendChild = function FUiWorkspace_appendChild(control){
      var o = this;
      if(RClass.isClass(control, FUiFrameSet)){
         o._hPanel.appendChild(control._hPanel);
      }else{
         throw new TError(o, 'Unknown child type.');
      }
   }
}
