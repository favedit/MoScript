with(MO){
   //==========================================================
   // <T>设计材质属性工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsMaterialPropertyToolBar = function FDsMaterialPropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      //..........................................................
      // @property
      o._frameName      = 'resource.material.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsMaterialPropertyToolBar_onBuilded;
      // @event
      o.onRefreshClick  = FDsMaterialPropertyToolBar_onRefreshClick;
      //..........................................................
      // @method
      o.construct       = FDsMaterialPropertyToolBar_construct;
      // @method
      o.dispose         = FDsMaterialPropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onBuilded = function FDsMaterialPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 关联按键事件
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onRefreshClick = function FDsMaterialPropertyToolBar_onRefreshClick(p){
      var o = this;
      //o._canvasModeCd = p._canvasModeCd;
      //o._workspace._canvas.switchMode(p._canvasModeCd);
   }

   //==========================================================
   // <T>尺寸选择。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onSizeClick = function FDsMaterialPropertyToolBar_onSizeClick(event){
      var o = this;
      var button = event.sender;
      // 解析尺寸
      var width = '*';
      var height = '*';
      var name = button.name();
      var label = button.label();
      if(name != 'sizeAuto'){
         var size = label.split('x');
         width = parseInt(size[0]);
         height = parseInt(size[1]);
      }
      o._controlSizeWidth.setText(width);
      o._controlSizeHeight.setText(height);
      // 设置大小
      o._frameSet._canvas.switchSize(width, height);
   }

   //==========================================================
   // <T>坐标系可见性处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onRotationChange = function FDsMaterialPropertyToolBar_onRotationChange(event){
      var o = this;
      var canvas = o._frameSet._canvas;
      var visible = o._controlRotationVisible.isCheck();
      var width = RInteger.parse(o._controlRotationWidth.text());
      var height = RInteger.parse(o._controlRotationHeight.text());
      canvas.switchRotation(visible, width, height);
   }

   //==========================================================
   // <T>坐标系自动调整处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onRotationAutoClick = function FDsMaterialPropertyToolBar_onRotationAutoClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      var flipX = false;
      var flipY = false;
      var flipZ = false;
      var rotationX = false;
      var rotationY = false;
      var rotationZ = false;
      switch(name){
         case 'dimensionalAuto':
            break;
         case 'dimensionalFlipX':
            flipX = true;
            break;
         case 'dimensionalFlipY':
            flipY = true;
            break;
         case 'dimensionalFlipZ':
            flipZ = true;
            break;
         case 'dimensionalX':
            rotationX = true;
            break;
         case 'dimensionalY':
            rotationY = true;
            break;
         case 'dimensionalZ':
            rotationZ = true;
            break;
         default:
            throw new TError(o, 'Unknown command.');
      }
      o._frameSet._canvas.viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ);
   }

   //==========================================================
   // <T>刷新按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyToolBar_onRotationClick = function FDsMaterialPropertyToolBar_onRotationClick(event, v){
      var o = this;
      var button = event.sender;
      var canvas = o._frameSet._canvas;
      canvas.switchRotation(button.isCheck());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialPropertyToolBar_construct = function FDsMaterialPropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialPropertyToolBar_dispose = function FDsMaterialPropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.dispose.call(o);
   }
}
