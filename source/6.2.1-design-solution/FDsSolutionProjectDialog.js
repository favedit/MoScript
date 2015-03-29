//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSolutionProjectDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   //..........................................................
   // @property
   o._frameName            = 'design3d.solution.ProjectDialog';
   //..........................................................
   // @attribute
   o._resourceTypeCd       = 'private';
   // @attribute
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsSolutionProjectDialog_onBuilded;
   // @event
   o.onConfirmClick        = FDsSolutionProjectDialog_onConfirmClick;
   o.onCancelClick         = FDsSolutionProjectDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FDsSolutionProjectDialog_construct;
   // @method
   o.dispose               = FDsSolutionProjectDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionProjectDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSolutionProjectDialog_onConfirmClick(event){
   var o = this;
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   // 发送数据
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'insert');
   var xdata = xroot.create('Data');
   xdata.set('code', code);
   xdata.set('label', label);
   RConsole.find(FXmlConsole).sendAsync('/cloud.solution.project.ws', xdocument);
   // 隐藏窗口
   o.hide();
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsSolutionProjectDialog_onCancelClick(event){
   this.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSolutionProjectDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionProjectDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
