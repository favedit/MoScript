with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSolutionProjectDialog = function FDsSolutionProjectDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.private.solution.ProjectDialog';
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
      o.onConfirmLoad         = FDsSolutionProjectDialog_onConfirmLoad;
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
   MO.FDsSolutionProjectDialog_onBuilded = function FDsSolutionProjectDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
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
   MO.FDsSolutionProjectDialog_onConfirmLoad = function FDsSolutionProjectDialog_onConfirmLoad(event){
      var o = this;
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
      // 隐藏窗口
      o.hide();
      // 隐藏窗口
      RWindow.enable();
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSolutionProjectDialog_onConfirmClick = function FDsSolutionProjectDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RWindow.disable();
      // 获得参数
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      // 发送数据请求
      var project = RClass.create(FDrProject);
      project.setCode(code);
      project.setLabel(label);
      // 发送请求处理
      var connection = RConsole.find(FDrProjectConsole).doCreate(project);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSolutionProjectDialog_onCancelClick = function FDsSolutionProjectDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionProjectDialog_construct = function FDsSolutionProjectDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionProjectDialog_dispose = function FDsSolutionProjectDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
