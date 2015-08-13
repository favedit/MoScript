with(MO){
   //==========================================================
   // <T>设计共通动画对话框。</T>
   //
   // @method
   // @author maocy
   // @history 150508
   //==========================================================
   MO.FDsCommonMovieDialog = function FDsCommonMovieDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.common.dialog.MovieDialog';
      //..........................................................
      // @attribute
      o._displayModeCd        = null;
      // @attribute
      o._controlLayerLabel    = null;
      o._controlDisplayLabel  = null;
      o._controlCode          = null;
      o._controlLabel         = null;
      o._controlTemplateCode  = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsCommonMovieDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsCommonMovieDialog_onConfirmLoad;
      o.onConfirmClick        = FDsCommonMovieDialog_onConfirmClick;
      o.onCancelClick         = FDsCommonMovieDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsCommonMovieDialog_construct;
      // @method
      o.setLayerLabel         = FDsCommonMovieDialog_setLayerLabel;
      o.setDisplayLabel       = FDsCommonMovieDialog_setDisplayLabel;
      o.setContentCode        = FDsCommonMovieDialog_setContentCode;
      o.setContentLabel       = FDsCommonMovieDialog_setContentLabel;
      // @method
      o.dispose               = FDsCommonMovieDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMovieDialog_onBuilded = function FDsCommonMovieDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      o._controlLayerLabel.setEditAble(false);
      o._controlDisplayLabel.setEditAble(false);
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
   MO.FDsCommonMovieDialog_onConfirmLoad = function FDsCommonMovieDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      MO.Console.find(FDuiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonMovieDialog_onConfirmClick = function FDsCommonMovieDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 获得属性
      var xaction = new TXmlNode('Action');
      var xmovie = xaction.create('Movie');
      xmovie.set('space_guid', o._spaceGuid);
      xmovie.set('layer_guid', o._layerGuid);
      xmovie.set('display_guid', o._displayGuid);
      xmovie.set('code', o._controlCode.get());
      xmovie.set('label', o._controlLabel.get());
      xmovie.set('interval', o._controlInterval.get());
      xmovie.set('rotation', o._controlRotation.get());
      // 执行数据处理
      var console = MO.Console.find(FDrSceneConsole);
      var connection = null;
      connection = console.createMovie(xaction);
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsCommonMovieDialog_onCancelClick = function FDsCommonMovieDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMovieDialog_construct = function FDsCommonMovieDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置层标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonMovieDialog_setLayerLabel = function FDsCommonMovieDialog_setLayerLabel(label){
      this._controlLayerLabel.set(label);
   }

   //==========================================================
   // <T>设置显示标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonMovieDialog_setDisplayLabel = function FDsCommonMovieDialog_setDisplayLabel(label){
      this._controlDisplayLabel.set(label);
   }

   //==========================================================
   // <T>设置内容代码。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsCommonMovieDialog_setContentCode = function FDsCommonMovieDialog_setContentCode(label){
      this._controlCode.set(label);
   }

   //==========================================================
   // <T>设置内容标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsCommonMovieDialog_setContentLabel = function FDsCommonMovieDialog_setContentLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMovieDialog_dispose = function FDsCommonMovieDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
