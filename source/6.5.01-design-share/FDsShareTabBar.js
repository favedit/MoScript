with(MO){
   //==========================================================
   // <T>共享分页栏。</T>
   //
   // @author maocy
   // @history 150422
   //==========================================================
   MO.FDsShareTabBar = function FDsShareTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      //..........................................................
      // @property
      o._frameName            = 'resource.share.TabBar';
      //..........................................................
      // @attribute
      o._resourceTypeCd       = 'private';
      // @attribute
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsShareTabBar_onBuilded;
      // @event
      o.onButtonClick         = FDsShareTabBar_onButtonClick;
      //..........................................................
      // @method
      o.construct             = FDsShareTabBar_construct;
      // @method
      o.dispose               = FDsShareTabBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareTabBar_onBuilded = function FDsShareTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlResource.addClickListener(o, o.onButtonClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsShareTabBar_onButtonClick = function FDsShareTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'resource'){
         o._workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTabBar_construct = function FDsShareTabBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiTabBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTabBar_dispose = function FDsShareTabBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
