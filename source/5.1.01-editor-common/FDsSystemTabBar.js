with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemTabBar = function FDsSystemTabBar(o){
      o = RClass.inherits(this, o, FDuiTabBar);
      //..........................................................
      // @property
      o._frameName            = 'system.design.TabBar';
      //..........................................................
      // @attribute
      o._resourceTypeCd       = 'private';
      // @attribute
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsSystemTabBar_onBuilded;
      // @event
      o.onButtonClick         = FDsSystemTabBar_onButtonClick;
      //..........................................................
      // @method
      o.construct             = FDsSystemTabBar_construct;
      // @method
      o.dispose               = FDsSystemTabBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemTabBar_onBuilded = function FDsSystemTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlPersistence.addClickListener(o, o.onButtonClick);
      o._controlList.addClickListener(o, o.onButtonClick);
      o._controlTree.addClickListener(o, o.onButtonClick);
      o._controlFrame.addClickListener(o, o.onButtonClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemTabBar_onButtonClick = function FDsSystemTabBar_onButtonClick(event){
      var o = this;
      var workspace = o._workspace;
      var sender = event.sender;
      var name = sender.name();
      if(name == 'persistence'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignPersistenceFrameSet);
      }else if(name == 'list'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignListFrameSet);
      }else if(name == 'tree'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignTreeFrameSet);
      }else if(name == 'frame'){
         workspace.selectFrameSet(EDsFrameSet.SystemDesignFrameFrameSet);
      }else{
         alert('功能未开启，请以后关注。');
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemTabBar_construct = function FDsSystemTabBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiTabBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemTabBar_dispose = function FDsSystemTabBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
