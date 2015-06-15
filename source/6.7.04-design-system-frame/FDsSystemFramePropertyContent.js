with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FDsSystemFramePropertyContent = function FDsSystemFramePropertyContent(o){
      o = RClass.inherits(this, o, FDsCanvas);
      //..........................................................
      // @attribute
      o._activeSpace         = null;
      // @attribute
      o._canvasModeCd        = EDsCanvasMode.Drop;
      o._canvasMoveCd        = EDsCanvasDrag.Unknown;
      o._optionRotation      = false;
      o._rotation            = null;
      o._capturePosition     = null;
      o._captureMatrix       = null;
      o._captureRotation     = null;
      o._dimensional         = null;
      o._selectObject        = null;
      o._selectBoundBox      = null;
      o._selectRenderables   = null;
      // @attribute
      o._cameraMoveRate      = 8;
      o._cameraKeyRotation   = 3;
      o._cameraMouseRotation = 0.005;
      // @attribute
      o._templateMatrix      = null;
      o._templateRenderable  = null;
      o._templateFace        = null;
      o._templateTranslation = null;
      o._templateRotation    = null;
      o._templateScale       = null;
      o._templateViewScale   = 0.05;
      //..........................................................
      // @event
      o.onBuild              = FDsSystemFramePropertyContent_onBuild;
      o.onMouseCaptureStart  = FDsSystemFramePropertyContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsSystemFramePropertyContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsSystemFramePropertyContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsSystemFramePropertyContent_onEnterFrame;
      o.onMeshLoad           = FDsSystemFramePropertyContent_onMeshLoad;
      //..........................................................
      o.oeResize             = FDsSystemFramePropertyContent_oeResize;
      o.oeRefresh            = FDsSystemFramePropertyContent_oeRefresh;
      //..........................................................
      // @method
      o.construct            = FDsSystemFramePropertyContent_construct;
      // @method
      o.innerSelectDisplay   = FDsSystemFramePropertyContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsSystemFramePropertyContent_innerSelectLayer;
      o.switchRotation       = FDsSystemFramePropertyContent_switchRotation;
      o.reloadRegion         = FDsSystemFramePropertyContent_reloadRegion;
      o.loadMeshByGuid       = FDsSystemFramePropertyContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsSystemFramePropertyContent_loadMeshByCode;
      // @method
      o.dispose              = FDsSystemFramePropertyContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSystemFramePropertyContent_onBuild = function FDsSystemFramePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
      // 创建简单舞台
      //var g = o._activeStage = RClass.create(FE3dSimpleStage);
      //g.linkGraphicContext(o);
      //g.region().backgroundColor().set(0.5, 0.5, 0.5, 1);
      //g.selectTechnique(o, FE3dGeneralTechnique);
      //g.addEnterFrameListener(o, o.onEnterFrame);
      //var sl = o._layer = o._activeStage.spriteLayer();
      //RStage.register('stage3d', o._activeStage);
      // 设置相机
      //var rc = g.camera();
      //rc.setPosition(0, 3, -10);
      //rc.lookAt(0, 3, 0);
      //rc.update();
      // 设置投影
      //var h = o._hPanel;
      //var rp = rc.projection();
      //rp.size().set(h.width, h.height);
      //rp._angle = 45;
      //rp.update();
      // 设置光源
      //var l = g.directionalLight();
      //var lc = l.camera();
      //lc.setPosition(10, 10, 0);
      //lc.lookAt(0, 0, 0);
      //lc.update();
      // 设置坐标系
      //sl.pushRenderable(o._dimensional);
      //var o = this;
      //o.__base.FDsCanvas.onBuild.call(o, p);
      // 创建界面控制器
      //var c = o._graphicContext;
      //var tc = RConsole.find(FE3dTemplateConsole);
      //var t = o._templateTranslation = tc.allocByCode(c, 'com.design.translation');
      //t._optionFace = true;
      //t.hide();
      //var t = o._templateRotation = tc.allocByCode(c, 'com.design.rotation');
      //t._optionFace = true;
      //t.hide();
      //var t = o._templateScale = tc.allocByCode(c, 'com.design.scale');
      //t._optionFace = true;
      //t.hide();
   }

   //==========================================================
   // <T>鼠标捕捉开始处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSystemFramePropertyContent_onMouseCaptureStart = function FDsSystemFramePropertyContent_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      // 选取物件
      var r = o._activeSpace.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o.selectRenderable(r);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
      if(r){
         var d = r.display();
         o._captureMatrix.assign(d.matrix());
      }
      // 记录坐标
      o._templateMatrix.identity();
      if(o._templateFace){
         o._templateFaceMatrix.assign(o._templateFace.matrix());
         // 记录选中坐标
         var rs = o._selectRenderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var r = rs.getAt(i);
            if(!r._dragMatrix){
               r._dragMatrix = new SMatrix3d();
            }
            r._dragMatrix.assign(r.matrix());
         }
      }
      // 设置鼠标
      RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
   }

   //==========================================================
   // <T>鼠标捕捉处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSystemFramePropertyContent_onMouseCapture = function FDsSystemFramePropertyContent_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var mc = o._canvasModeCd;
      var mv = o._canvasMoveCd;
      var cm = o._captureMatrix;
      var sm = null;
      //var sr = o._templateRenderable;
      //if(sr){
      //   var sd = sr.display();
      //   sm = sd.matrix();
      //}
      var tf = o._templateFace;
      var tm = o._templateMatrix;
      switch(mc){
         case EDsCanvasMode.Drop:
            var c = o._activeSpace.camera();
            var r = c.rotation();
            var cr = o._captureRotation;
            r.x = cr.x - cy * o._cameraMouseRotation;
            r.y = cr.y - cx * o._cameraMouseRotation;
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.tx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.ty = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.tz = cx / 10;
               }
            }
            break;
         case EDsCanvasMode.Rotation:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.rx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.ry = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.rz = cx / 10;
               }
            }
            break;
         case EDsCanvasMode.Scale:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.sx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.sy = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.sz = cx / 10;
               }else if(mv == EDsCanvasDrag.All){
                  tm.sx = cx / 10;
                  tm.sy = cx / 10;
                  tm.sz = cx / 10;
               }
            }
            break;
      }
      // 移动选中集合
      if(tf){
         // 移动操作对象
         tf.matrix().merge(o._templateFaceMatrix, tm);
         // 移动选中对象
         var rs = o._selectRenderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var r = rs.getAt(i);
            r._matrix.merge(r._dragMatrix, tm);
         }
      }
   }

   //==========================================================
   // <T>鼠标捕捉结束处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSystemFramePropertyContent_onMouseCaptureStop = function FDsSystemFramePropertyContent_onMouseCaptureStop(p){
      var o = this;
      // 设置鼠标
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }

   //==========================================================
   // <T>每帧处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_onEnterFrame = function FDsSystemFramePropertyContent_onEnterFrame(){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var st = s.timer();
      var ss = st.spanSecond();
      //..........................................................
      // 按键处理
      var c = s.camera();
      var d = o._cameraMoveRate * ss;
      var r = o._cameraKeyRotation * ss;
      // 按键前后移动
      var kf = RKeyboard.isPress(EStageKey.Forward);
      var kb = RKeyboard.isPress(EStageKey.Back);
      if(kf && !kb){
         c.doWalk(d);
      }
      if(!kf && kb){
         c.doWalk(-d);
      }
      // 按键上下移动
      var kq = RKeyboard.isPress(EStageKey.Up);
      var ke = RKeyboard.isPress(EStageKey.Down);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      // 按键左右旋转
      var ka = RKeyboard.isPress(EStageKey.RotationLeft);
      var kd = RKeyboard.isPress(EStageKey.RotationRight);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      // 按键上下旋转
      var kz = RKeyboard.isPress(EStageKey.RotationUp);
      var kw = RKeyboard.isPress(EStageKey.RotationDown);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      // 更新相机
      c.update();
      //..........................................................
      // 旋转模型
      if(o._optionRotation){
         var r = o._rotation;
         var display = o._activeSpace._display;
         var matrix = display.matrix();
         matrix.setRotation(matrix.rx, matrix.ry + r.y, matrix.rz);
         matrix.update();
         // 设置变量
         r.y = 0.01;
      }
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsSystemFramePropertyContent_onMeshLoad = function FDsSystemFramePropertyContent_onMeshLoad(p){
      var o = this;
      var m = o._activeSpace;
      var g = m.region();
      // 设置相机
      var rc = g.camera();
      rc.setPosition(0, 3, -10);
      rc.lookAt(0, 3, 0);
      rc.update();
      // 设置投影
      var h = o._hPanel;
      var rp = rc.projection();
      rp.size().set(h.width, h.height);
      rp._angle = 45;
      rp.update();
      // 设置光源
      var l = g.directionalLight();
      var lc = l.camera();
      lc.setPosition(10, 10, 0);
      lc.lookAt(0, 0, 0);
      lc.update();


      //var rm = m.renderables().getAt(0).matrix();
      //rm.tz = -300;
      //rm.updateForce();
      //var mi = m.renderables().get(0).material().info();
      //mi.ambientColor.set(1.0, 1.0, 1.0);
      // 加载完成
      o.processLoadListener(o);
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_oeResize = function FDsSystemFramePropertyContent_oeResize(p){
      var o = this;
      o.__base.FDsCanvas.oeResize.call(o, p);
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
   MO.FDsSystemFramePropertyContent_oeRefresh = function FDsSystemFramePropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_construct = function FDsSystemFramePropertyContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._templateMatrix = new SMatrix3d();
      o._templateFaceMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
      o._selectRenderables = new TObjects();
   }

   //==========================================================
   // <T>选中渲染显示对象处理。</T>
   //
   // @method
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FDsSystemFramePropertyContent_innerSelectDisplay = function FDsSystemFramePropertyContent_innerSelectDisplay(p){
      var o = this;
      // 选中集合
      var s = p.renderables();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.getAt(i);
         if(RClass.isClass(r, FDsSceneRenderable)){
            o._selectRenderables.push(r);
            r.showBoundBox();
         }
      }
   }

   //==========================================================
   // <T>选中渲染显示对象处理。</T>
   //
   // @method
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FDsSystemFramePropertyContent_innerSelectLayer = function FDsSystemFramePropertyContent_innerSelectLayer(p){
      var o = this;
      // 选中集合
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }

   //==========================================================
   // <T>切换工作模式。</T>
   //
   // @method
   // @param p:modeCd:Integer 
   //==========================================================
   MO.FDsSystemFramePropertyContent_switchMode = function FDsSystemFramePropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
   }

   //==========================================================
   // <T>切换播放模式。</T>
   //
   // @method
   // @param p:modeCd:Integer 
   //==========================================================
   MO.FDsSystemFramePropertyContent_switchRotation = function FDsSystemFramePropertyContent_switchRotation(p){
      this._optionRotation = p;
   }

   //==========================================================
   // <T>重新加载区域。</T>
   //
   // @method
   // @param region:FE3dRegion 区域
   //==========================================================
   MO.FDsSystemFramePropertyContent_reloadRegion = function FDsSystemFramePropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_loadMeshByGuid = function FDsSystemFramePropertyContent_loadMeshByGuid(p){
      var o = this;
      var rmc = RConsole.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      // 收集一个显示模板
      var space = o._activeSpace = rmc.allocByGuid(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      // 设置坐标系
      space._layer.pushRenderable(o._dimensional);
      // 启动舞台
      RStage.register('mesh3d', space);
      //m.matrix().setTranslate(0, 1, 0);
      //m.matrix().setRotation(0, Math.PI, Math.PI);
      //m.matrix().setScaleAll(0.003);
      //m.matrix().updateForce();
      //o._layer.pushDisplay(m);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_loadMeshByCode = function FDsSystemFramePropertyContent_loadMeshByCode(p){
      var o = this;
      var rmc = RConsole.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      // 收集一个显示模板
      var space = o._activeSpace = rmc.allocByCode(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      // 设置坐标系
      space._layer.pushRenderable(o._dimensional);
      // 启动舞台
      RStage.register('mesh3d', space);
      //m.matrix().setTranslate(0, 1, 0);
      //m.matrix().setRotation(0, Math.PI, Math.PI);
      //m.matrix().setScaleAll(0.003);
      //m.matrix().updateForce();
      //o._layer.pushDisplay(m);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyContent_dispose = function FDsSystemFramePropertyContent_dispose(){
      var o = this;
      // 释放旋转
      o._rotation = RObject.dispose(o._rotation);
      // 父处理
      o.__base.FDsCanvas.dispose.call(o);
   }
}
