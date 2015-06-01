with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsShareResourceTabBar = function FDsShareResourceTabBar(o){
      o = RClass.inherits(this, o, FUiTabBar);
      //..........................................................
      // @property
      o._frameName             = 'design3d.resource.TabBar';
      //..........................................................
      // @attribute
      o._resourceTypeCd        = 'mesh';
      // @attribute
      o._controlPictureButton  = null;
      o._controlSoundButton    = null;
      o._controlVidioButton    = null;
      o._controlTextureButton  = null;
      o._controlMaterialButton = null;
      o._controlMeshButton     = null;
      o._controlModelButton    = null;
      o._controlTemplateButton = null;
      o._controlSceneButton    = null;
      //..........................................................
      // @event
      o.onBuilded              = FDsShareResourceTabBar_onBuilded;
      // @event
      o.onButtonClick          = FDsShareResourceTabBar_onButtonClick;
      //..........................................................
      // @method
      o.construct              = FDsShareResourceTabBar_construct;
      // @method
      o.dispose                = FDsShareResourceTabBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareResourceTabBar_onBuilded = function FDsShareResourceTabBar_onBuilded(p){
      var o = this;
      o.__base.FUiTabBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlPictureButton.addClickListener(o, o.onButtonClick);
      o._controlSoundButton.addClickListener(o, o.onButtonClick);
      o._controlVidioButton.addClickListener(o, o.onButtonClick);
      o._controlTextureButton.addClickListener(o, o.onButtonClick);
      o._controlMaterialButton.addClickListener(o, o.onButtonClick);
      o._controlMeshButton.addClickListener(o, o.onButtonClick);
      o._controlModelButton.addClickListener(o, o.onButtonClick);
      o._controlTemplateButton.addClickListener(o, o.onButtonClick);
      o._controlSceneButton.addClickListener(o, o.onButtonClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsShareResourceTabBar_onButtonClick = function FDsShareResourceTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      o._resourceTypeCd = name;
      //o._workspace.switchContent(name);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceTabBar_construct = function FDsShareResourceTabBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiTabBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceTabBar_dispose = function FDsShareResourceTabBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiTabBar.dispose.call(o);
   }
}
