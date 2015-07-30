with(MO){
   //==========================================================
   // <T>设计空间画板。</T>
   //
   // @class
   // @author maocy
   // @history 150505
   //==========================================================
   MO.FDsSpaceDesignCanvas = function FDsSpaceDesignCanvas(o){
      o = RClass.inherits(this, o, FDsSpaceCanvas);
      //..........................................................
      // @attribute
      o._templateMatrix       = null;
      o._templateRenderable   = null;
      o._templateFace         = null;
      o._templateTranslation  = null;
      o._templateRotation     = null;
      o._templateScale        = null;
      o._templateViewScale    = 0.05;
      //..........................................................
      // @event
      o.onBuild               = FDsSpaceDesignCanvas_onBuild;
      // @event
      o.onDataLoaded          = FDsSpaceDesignCanvas_onDataLoaded;
      // @event
      //o.onMouseCaptureStart   = FDsSpaceDesignCanvas_onMouseCaptureStart;
      //o.onMouseCapture        = FDsSpaceDesignCanvas_onMouseCapture;
      //o.onMouseCaptureStop    = FDsSpaceDesignCanvas_onMouseCaptureStop;
      //..........................................................
      //o.oeResize              = FDsSpaceDesignCanvas_oeResize;
      //o.oeRefresh             = FDsSpaceDesignCanvas_oeRefresh;
      //..........................................................
      // @method
      o.construct             = FDsSpaceDesignCanvas_construct;
      // @method
      o.selectRenderable      = FDsSpaceDesignCanvas_selectRenderable;
      // @method
      o.refreshOperationFace  = FDsSpaceDesignCanvas_refreshOperationFace;
      o.switchMode            = FDsSpaceDesignCanvas_switchMode;
      // @method
      o.dispose               = FDsSpaceDesignCanvas_dispose;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSpaceDesignCanvas_onBuild = function FDsSpaceDesignCanvas_onBuild(p){
      var o = this;
      o.__base.FDsSpaceCanvas.onBuild.call(o, p);
      // 创建界面控制器
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      var templateTranslation = o._templateTranslation = templateConsole.allocByCode(o, 'com.design.translation');
      templateTranslation.addLoadListener(o, o.onDataLoaded);
      //templateTranslation._optionFace = true;
      //templateTranslation.setVisible(false);
      var templateRotation = o._templateRotation = templateConsole.allocByCode(o, 'com.design.rotation');
      templateRotation.addLoadListener(o, o.onDataLoaded);
      //templateRotation._optionFace = true;
      //templateRotation.setVisible(false);
      var templateScale = o._templateScale = templateConsole.allocByCode(o, 'com.design.scale');
      templateScale.addLoadListener(o, o.onDataLoaded);
      //templateScale._optionFace = true;
      //templateScale.setVisible(false);
   }

   //==========================================================
   // <T>加载空间完成处理。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   //==========================================================
   MO.FDsSpaceDesignCanvas_onDataLoaded = function FDsSpaceDesignCanvas_onDataLoaded(p){
      var o = this;
      var context = o._graphicContext;
      var space = o._activeSpace;
      //space._layer.pushRenderable(o._dimensional);
      var templateTranslation = o._templateTranslation;
      if(!templateTranslation.testReady()){
         return;
      }
      var templateRotation = o._templateRotation;
      if(!templateRotation.testReady()){
         return;
      }
      var templateScale = o._templateScale;
      if(!templateScale.testReady()){
         return;
      }
      if(!space.testReady()){
         return;
      }
      // 设置操作
      var translationSprite = o._translationSprite = o._templateTranslation.sprite();
      translationSprite.setVisible(false);
      var rotationSprite = o._rotationSprite = o._templateRotation.sprite();
      rotationSprite.setVisible(false);
      var scaleSprite = o._scaleSprite = o._templateScale.sprite();
      scaleSprite.setVisible(false);
      // 创建界面层
      var layer = o._uiLayer = RClass.create(FDisplayUiLayer);
      layer.selectTechnique(context, FE3dControlTechnique);
      layer.pushDisplay(translationSprite);
      layer.pushDisplay(rotationSprite);
      layer.pushDisplay(scaleSprite);
      space.registerLayer('ui', layer);
      o.reloadRegion()
      // 加载完成
      o.processLoadListener(o);
      // 隐藏处理
      RConsole.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>鼠标捕捉开始处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSpaceDesignCanvas_onMouseCaptureStart = function FDsSpaceDesignCanvas_onMouseCaptureStart(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCaptureStart.call(o, event)
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var region = space.region();
      // 选取物件
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      o.selectRenderable(renderable);
      if(renderable){
         var display = renderable.display();
         o._captureMatrix.assign(display.matrix());
      }
      // 记录坐标
      //o._templateMatrix.identity();
      //if(o._templateFace){
      //   o._templateFaceMatrix.assign(o._templateFace.matrix());
      //   // 记录选中坐标
      //   var rs = o._selectRenderables;
      //   for(var i = rs.count() - 1; i >= 0; i--){
      //      var r = rs.getAt(i);
      //      if(!r._dragMatrix){
      //         r._dragMatrix = new SMatrix3d();
      //      }
      //      r._dragMatrix.assign(r.matrix());
      //   }
      //}
   }

   //==========================================================
   // <T>鼠标捕捉处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSpaceDesignCanvas_onMouseCapture = function FDsSpaceDesignCanvas_onMouseCapture(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCapture.call(o, event);
      //var space = o._activeSpace;
      //if(!space){
      //   return;
      //}
      //var cx = event.clientX - o._capturePosition.x;
      //var cy = event.clientY - o._capturePosition.y;
      //var mc = o._canvasModeCd;
      //var mv = o._canvasMoveCd;
      //var cm = o._captureMatrix;
      //var sm = null;
      //var sr = o._templateRenderable;
      //if(sr){
      //   var sd = sr.display();
      //   sm = sd.matrix();
      //}
      //var tf = o._templateFace;
      //var tm = o._templateMatrix;
      //switch(mc){
         //case EDsCanvasMode.Drop:
            //var c = o._activeSpace.camera();
            //var r = c.rotation();
            //var cr = o._captureRotation;
            //r.x = cr.x - cy * o._cameraMouseRotation;
            //r.y = cr.y - cx * o._cameraMouseRotation;
            //break;
         //case EDsCanvasMode.Select:
            //break;
         //case EDsCanvasMode.Translate:
            //if(tf){
            //   if(mv == EDsCanvasDrag.X){
            //      tm.tx = cx / 10;
            //   }else if(mv == EDsCanvasDrag.Y){
            //      tm.ty = -cy / 10;
            //   }else if(mv == EDsCanvasDrag.Z){
            //      tm.tz = cx / 10;
            //   }
            //}
            //break;
         //case EDsCanvasMode.Rotation:
            //if(tf){
            //   if(mv == EDsCanvasDrag.X){
            //      tm.rx = cx / 10;
            //   }else if(mv == EDsCanvasDrag.Y){
            //      tm.ry = -cy / 10;
            //   }else if(mv == EDsCanvasDrag.Z){
            //      tm.rz = cx / 10;
            //   }
            //}
            //break;
         //case EDsCanvasMode.Scale:
            //if(tf){
            //   if(mv == EDsCanvasDrag.X){
            //      tm.sx = cx / 10;
            //   }else if(mv == EDsCanvasDrag.Y){
            //      tm.sy = -cy / 10;
            //   }else if(mv == EDsCanvasDrag.Z){
            //      tm.sz = cx / 10;
            //   }else if(mv == EDsCanvasDrag.All){
            //      tm.sx = cx / 10;
            //      tm.sy = cx / 10;
            //      tm.sz = cx / 10;
            //   }
            //}
            //break;
      //}
      // 移动选中集合
      //if(tf){
      //   // 移动操作对象
      //   tf.matrix().merge(o._templateFaceMatrix, tm);
      //   // 移动选中对象
      //   var rs = o._selectRenderables;
      //   for(var i = rs.count() - 1; i >= 0; i--){
      //      var r = rs.getAt(i);
      //      r._matrix.merge(r._dragMatrix, tm);
      //   }
      //}
   }

   //==========================================================
   // <T>鼠标捕捉结束处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSpaceDesignCanvas_onMouseCaptureStop = function FDsSpaceDesignCanvas_onMouseCaptureStop(event){
      var o = this;
      o.__base.FDsSpaceCanvas.onMouseCaptureStop.call(o, event);
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceDesignCanvas_oeResize = function FDsSpaceDesignCanvas_oeResize(p){
      var o = this;
      o.__base.FDsSpaceCanvas.oeResize.call(o, p);
      // 获得大小
      var hp = o._hPanel;
      var w = hp.offsetWidth;
      var h = hp.offsetHeight;
      // 设置投影
      var s = o._activeSpace;
      if(s){
         var cp = s.camera().projection();
         cp.size().set(w, h);
         cp.update();
      }
      // 设置范围
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceDesignCanvas_oeRefresh = function FDsSpaceDesignCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceDesignCanvas_construct = function FDsSpaceDesignCanvas_construct(){
      var o = this;
      o.__base.FDsSpaceCanvas.construct.call(o);
      o._templateMatrix = new SMatrix3d();
      o._templateFaceMatrix = new SMatrix3d();
   }

   //==========================================================
   // <T>选中渲染对象处理。</T>
   //
   // @method
   // @param renderable:FG3dRenderable 渲染对象
   //==========================================================
   MO.FDsSpaceDesignCanvas_selectRenderable = function FDsSpaceDesignCanvas_selectRenderable(renderable){
      var o = this;
      // 检查空间
      var space = o._activeSpace;
      if(!space){
         return;
      }
      //if(renderable){
         //var n = renderable._renderable._resource._code;
      //   switch(n){
      //      case 'ms_translation_x':
      //         o._canvasMoveCd = EDsCanvasDrag.X;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_translation_y':
      //         o._canvasMoveCd = EDsCanvasDrag.Y;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_translation_z':
      //         o._canvasMoveCd = EDsCanvasDrag.Z;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_rotation_x':
      //         o._canvasMoveCd = EDsCanvasDrag.X;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_rotation_y':
      //         o._canvasMoveCd = EDsCanvasDrag.Y;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_rotation_z':
      //         o._canvasMoveCd = EDsCanvasDrag.Z;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_scale_x':
      //         o._canvasMoveCd = EDsCanvasDrag.X;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_scale_y':
      //         o._canvasMoveCd = EDsCanvasDrag.Y;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_scale_z':
      //         o._canvasMoveCd = EDsCanvasDrag.Z;
      //         o._templateRenderable = renderable;
      //         return;
      //      case 'ms_scale_all':
      //         o._canvasMoveCd = EDsCanvasDrag.All;
      //         o._templateRenderable = renderable;
      //         return;
      //      default:
      //         o._canvasMoveCd = EDsCanvasDrag.Unknown;
      //         o._templateRenderable = null;
      //   }
      //}
      // 选中当前对象
      o.selectNone();
      if(renderable){
         o.innerSelectRenderable(renderable);
         o._frameSet._catalogContent.showObject(renderable);
      }
      // 刷新界面
      //o.refreshOperationFace();
   }

   //==========================================================
   // <T>刷新操作界面。</T>
   //
   // @method
   // @param p:modeCd:Integer 
   //==========================================================
   MO.FDsSpaceDesignCanvas_refreshOperationFace = function FDsSpaceDesignCanvas_refreshOperationFace(){
      var o = this;
      // 获得变量
      var modeCd = o._canvasModeCd;
      var hasRenderable = !o._selectRenderables.isEmpty();
      var templateTranslation = o._translationSprite;
      var templateRotation = o._rotationSprite;
      var templateScale = o._scaleSprite;
      // 模式判定
      o._templateFace = null;
      switch(modeCd){
         case EDsCanvasMode.Translate:
            templateTranslation.setVisible(hasRenderable);
            templateRotation.setVisible(false);
            templateScale.setVisible(false);
            o._templateFace = templateTranslation;
            break;
         case EDsCanvasMode.Rotation:
            templateTranslation.setVisible(false);
            templateRotation.setVisible(hasRenderable);
            templateScale.setVisible(false);
            o._templateFace = templateScale;
            break;
         case EDsCanvasMode.Scale:
            templateTranslation.setVisible(false);
            templateRotation.setVisible(false);
            templateScale.setVisible(hasRenderable);
            o._templateFace = templateScale;
            break;
      }
      // 设置位置
      var templateFace = o._templateFace;
      if(hasRenderable && templateFace){
         var renderable = o._selectRenderables.first();
         var display = renderable.display();
         var matrix = templateFace.matrix();
         matrix.assign(display.matrix());
         //matrix.setScaleAll(o._templateViewScale);
         matrix.update();
      }
   }

   //==========================================================
   // <T>切换工作模式。</T>
   //
   // @method
   // @param p:modeCd:Integer 
   //==========================================================
   MO.FDsSpaceDesignCanvas_switchMode = function FDsSpaceDesignCanvas_switchMode(modeCd){
      var o = this;
      // 设置模式
      o._canvasModeCd = modeCd;
      // 刷新界面
      //o.refreshOperationFace();
      // 设置变量
      //o.selectRenderable(o._selectRenderable);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceDesignCanvas_dispose = function FDsSpaceDesignCanvas_dispose(){
      var o = this;
      // 释放属性
      o._rotation = RObject.dispose(o._rotation);
      // 父处理
      o.__base.FDsSpaceCanvas.dispose.call(o);
   }
}
