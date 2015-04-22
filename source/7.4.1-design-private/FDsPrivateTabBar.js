//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsPrivateTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   //..........................................................
   // @property
   o._frameName            = 'resource.private.TabBar';
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsPrivateTabBar_onBuilded;
   // @event
   o.onButtonClick         = FDsPrivateTabBar_onButtonClick;
   //..........................................................
   // @method
   o.construct             = FDsPrivateTabBar_construct;
   // @method
   o.dispose               = FDsPrivateTabBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
   o._controlTeamButton.addClickListener(o, o.onButtonClick);
   o._controlPublishButton.addClickListener(o, o.onButtonClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsPrivateTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'solution'){
      o._workspace.selectFrameSet(EDsFrameSet.SolutionFrameSet);
   }else if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsPrivateTabBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsPrivateTabBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiTabBar.dispose.call(o);
}
