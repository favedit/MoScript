with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FEaiFlatCanvas = function FEaiFlatCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      //..........................................................
      // @attribute
      o._capturePosition    = null;
      o._cameraPosition     = null;
      //..........................................................
      // @event
      o.onEnterFrame        = FEaiFlatCanvas_onEnterFrame;
      // @event
      o.onMouseCaptureStart = FEaiFlatCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiFlatCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiFlatCanvas_onMouseCaptureStop;
      //..........................................................
      // @method
      o.construct           = FEaiFlatCanvas_construct;
      // @method
      o.setPanel            = FEaiFlatCanvas_setPanel;
      // @method
      o.dispose             = FEaiFlatCanvas_dispose;
      return o;
   }

   //==========================================================
   // <T>每帧处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiFlatCanvas_onEnterFrame = function FEaiFlatCanvas_onEnterFrame(){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      //..........................................................
      // 按键处理
      var camera = stage.camera();
      var distance = 0.5;
      var r = 0.05;
      var keyW = RKeyboard.isPress(EKeyCode.W);
      var keyS = RKeyboard.isPress(EKeyCode.S);
      if(keyW && !keyS){
         camera.doMoveY(distance);
      }
      if(!keyW && keyS){
         camera.doMoveY(-distance);
      }
      var keyA = RKeyboard.isPress(EKeyCode.A);
      var keyD = RKeyboard.isPress(EKeyCode.D);
      if(keyA && !keyD){
         camera.doMoveX(-distance);
      }
      if(!keyA && keyD){
         camera.doMoveX(distance);
      }
      camera.update();
   }

   //==========================================================
   // <T>鼠标捕捉开始处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FEaiFlatCanvas_onMouseCaptureStart = function FEaiFlatCanvas_onMouseCaptureStart(event){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      // 选取物件
      o._capturePosition.set(event.clientX, event.clientY);
      o._cameraPosition.assign(stage.camera().position());
   }

   //==========================================================
   // <T>鼠标捕捉处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FEaiFlatCanvas_onMouseCapture = function FEaiFlatCanvas_onMouseCapture(event){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      var cx = event.clientX - o._capturePosition.x;
      var cy = event.clientY - o._capturePosition.y;
      var camera = stage.camera();
      var position = camera.position();
      position.x = o._cameraPosition.x - cx * 0.03;
      position.y = o._cameraPosition.y + cy * 0.03;
   }

   //==========================================================
   // <T>鼠标捕捉结束处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FEaiFlatCanvas_onMouseCaptureStop = function FEaiFlatCanvas_onMouseCaptureStop(p){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiFlatCanvas_construct = function FEaiFlatCanvas_construct(){
      var o = this;
      o.__base.FEaiCanvas.construct.call(o);
      o._logicSize = new SSize2(1920, 1080);
      o._cameraPosition = new SPoint3();
   }

   //==========================================================
   // <T>设置面板处理。</T>
   //
   // @method
   // @param hPanel:HtmlTag 页面元素
   //==========================================================
   MO.FEaiFlatCanvas_setPanel = function FEaiFlatCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FEaiCanvas.setPanel.call(o, hPanel);
      //alert('body=' + window.document.body.offsetWidth + 'x' + window.document.body.offsetHeight);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiFlatCanvas_dispose = function FEaiFlatCanvas_dispose(){
      var o = this;
      o._cameraPosition = RObject.dispose(o._cameraPosition);
      // 父处理
      o.__base.FEaiCanvas.dispose.call(o);
   }
}
