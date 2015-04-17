//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsModelCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   // @attribute
   o._activeGuid          = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
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
   o.onBuild              = FDsModelCanvas_onBuild;
   o.onMouseCaptureStart  = FDsModelCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsModelCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsModelCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsModelCanvas_onEnterFrame;
   o.onDataLoaded         = FDsModelCanvas_onDataLoaded;
   //..........................................................
   o.oeResize             = FDsModelCanvas_oeResize;
   o.oeRefresh            = FDsModelCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsModelCanvas_construct;
   // @method
   o.innerSelectDisplay   = FDsModelCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsModelCanvas_innerSelectLayer;
   o.selectNone           = FDsModelCanvas_selectNone;
   o.selectDisplay        = FDsModelCanvas_selectDisplay;
   o.selectMaterial       = FDsModelCanvas_selectMaterial;
   o.selectRenderable     = FDsModelCanvas_selectRenderable;
   o.switchDimensional    = FDsModelCanvas_switchDimensional;
   o.switchRotation       = FDsModelCanvas_switchRotation;
   o.viewAutoSize         = FDsModelCanvas_viewAutoSize;
   o.capture              = FDsModelCanvas_capture;
   o.loadByGuid           = FDsModelCanvas_loadByGuid;
   o.loadByCode           = FDsModelCanvas_loadByCode;
   // @method
   o.dispose              = FDsModelCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCanvas_onBuild(p){
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
function FDsModelCanvas_onMouseCaptureStart(p){
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
function FDsModelCanvas_onMouseCapture(p){
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
function FDsModelCanvas_onMouseCaptureStop(p){
   var o = this;
   // 设置鼠标
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_onEnterFrame(){
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
function FDsModelCanvas_onDataLoaded(p){
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
   // 加载完成
   o.processLoadListener(o);
   // 隐藏处理
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_oeResize(p){
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
function FDsModelCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
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
function FDsModelCanvas_innerSelectDisplay(p){
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
function FDsModelCanvas_innerSelectLayer(p){
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
// <T>不选中任何对象。</T>
//
// @method
//==========================================================
function FDsModelCanvas_selectNone(){
   var o = this;
   o._selectObject = null;
   // 取消所有选中对象
   var s = o._selectRenderables;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      r.hideBoundBox();
   }
   o._selectRenderables.clear();
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsModelCanvas_selectDisplay(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectDisplay(p);
}

//==========================================================
// <T>选中渲染材质处理。</T>
//
// @method
// @param p:material:FG3dMaterial 渲染材质
//==========================================================
function FDsModelCanvas_selectMaterial(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中材质
   var d = p._display;
   var s = d.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      if(r._materialReference == p){
         o._selectRenderables.push(r);
         r._optionSelected = true;
         r.showBoundBox();
      }
   }
}

//==========================================================
// <T>选中渲染对象处理。</T>
//
// @method
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
function FDsModelCanvas_selectRenderable(p){
   var o = this;
   return;
   var sr = p;
   if(sr){
      var n = sr._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = sr;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   // 选中当前对象
   o.selectNone();
   if(p){
      o._selectRenderables.push(p);
      p._optionSelected = true;
      p.showBoundBox();
      o._frameSet._catalog.showObject(p);
   }
   // 设置变量
   var t = o._templateTranslation;
   var r = o._templateRotation;
   var s = o._templateScale;
   // 模式判定
   var mc = o._canvasModeCd;
   switch(mc){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         t.setVisible(sr != null);
         r.hide();
         s.hide();
         o._templateFace = t;
         break;
      case EDsCanvasMode.Rotation:
         t.hide();
         r.setVisible(sr != null);
         s.hide();
         o._templateFace = r;
         break;
      case EDsCanvasMode.Scale:
         t.hide();
         r.hide();
         s.setVisible(sr != null);
         o._templateFace = s;
         break;
   }
   // 设置位置
   var st = o._templateFace;
   if(sr && st){
      var d = sr.display();
      var m = st.matrix();
      m.assign(d.matrix());
      m.setScaleAll(o._templateViewScale);
      m.update();
   }
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsModelCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   // 设置变量
   o.selectRenderable(o._selectRenderable);
}

//==========================================================
// <T>切换坐标系模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsModelCanvas_switchDimensional(visible, width, height){
   var o = this;
   o._dimensional.setVisible(visible);
   var matrix = o._dimensional.matrix();
   if(width > 0){
      matrix.sx = width;
   }
   if(height > 0){
      matrix.sz = height;
   }
   matrix.updateForce();
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsModelCanvas_switchRotation(p){
   this._optionRotation = p;
}

//==========================================================
// <T>自动优化大小。</T>
//
// @method
//==========================================================
function FDsModelCanvas_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
   var o = this;
   var outline = o._autoOutline;
   // 获得矩阵
   var space = o._activeSpace;
   var display = space.display();
   var displayResource = display.resource();
   var displayMatrix = displayResource.matrix();
   //var renderable = display._renderable;
   //var renderableResource = renderable.resource();
   //var renderableMatrix = renderableResource.matrix();
   // 计算旋转
   if(rotationX){
      displayMatrix.rx += RConst.PI_2;
   }
   if(rotationY){
      displayMatrix.ry += RConst.PI_2;
   }
   if(rotationZ){
      displayMatrix.rz += RConst.PI_2;
   }
   var matrix = o._autoMatrix.identity();
   matrix.setRotation(displayMatrix.rx, displayMatrix.ry, displayMatrix.rz);
   matrix.update();
   // 计算轮廓
   var resourceOutline = displayResource.calculateOutline();
   outline.calculateFrom(resourceOutline, matrix);
   // 计算缩放比率
   if(flipX){
      displayMatrix.sx = -displayMatrix.sx;
   }
   if(flipY){
      displayMatrix.sy = -displayMatrix.sy;
   }
   if(flipZ){
      displayMatrix.sz = -displayMatrix.sz;
   }
   var autoDistance = o._autoDistance;
   var scaleX = autoDistance.x / outline.distance.x;
   var scaleY = autoDistance.y / outline.distance.y;
   var scaleZ = autoDistance.z / outline.distance.z;
   var scale = RMath.min(scaleX, scaleY, scaleZ);
   scaleX = scale * RMath.sign(displayMatrix.sx)
   scaleY = scale * RMath.sign(displayMatrix.sy)
   scaleZ = scale * RMath.sign(displayMatrix.sz)
   // 计算坐标
   var x = -outline.center.x * scaleX;
   var y = -outline.min.y * scaleY;
   var z = -outline.center.z * scaleZ;
   // 设置显示矩阵
   displayMatrix.setTranslate(x, y, z);
   displayMatrix.setScale(scaleX, scaleY, scaleZ);
   displayMatrix.update();
   display.reloadResource();
   // 计算位置
   //matrix.identity();
   //matrix.addTranslate(-renderableMatrix.tx, -renderableMatrix.ty, -renderableMatrix.tz);
   //matrix.addScale(scaleX, scaleY, scaleZ);
   //renderableMatrix.setTranslate(x, y, z);
   //renderableMatrix.identity();
   //renderable.reloadResource();
   //renderableMatrix.update();
}

//==========================================================
// <T>捕捉图像数据。</T>
//
// @method
// @param region:FE3dRegion 区域
//==========================================================
function FDsModelCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var guid = space._resource._guid;
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   RStage.process();
   // 获得像素
   var context = o._graphicContext;
   var size = context.size();
   var native = context._native;
   var width = size.width;
   var height = size.height;
   var data = new Uint8Array(4 * width * height);
   native.readPixels(0, 0, width, height, native.RGBA, native.UNSIGNED_BYTE, data);
   // 切回原来大小
   o.switchSize(switchWidth, switchHeight);
   RStage.process();
   // 上传图片
   var url = '/cloud.resource.preview.wv?do=upload&type_cd=' + EE3sResource.Model + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_loadByGuid(guid){
   var o = this;
   // 释放模型
   var space = o._activeSpace;
   var modelConsole = RConsole.find(FE3dModelConsole);
   if(space){
      RStage.unregister(space);
      modelConsole.free(space);
   }
   // 收集一个显示模板
   space = o._activeSpace = modelConsole.alloc(o, guid);
   if(!space._linked){
      // 显示加载进度
      RConsole.find(FUiDesktopConsole).showLoading();
      // 设置坐标系
      space._layer.pushRenderable(o._dimensional);
      space.addLoadListener(o, o.onDataLoaded);
      space._linked = true;
   }
   // 启动舞台
   RStage.register('space', space);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_loadByCode(p){
   var o = this;
   return;
   // 显示加载进度
   RConsole.find(FUiDesktopConsole).showLoading();
   // 释放网格
   var rmc = RConsole.find(FE3dModelConsole);
   if(o._activeSpace != null){
      rmc.free(o._activeSpace);
   }
   // 收集一个显示模板
   var space = o._activeSpace = rmc.allocByCode(o, p);
   space.addLoadListener(o, o.onDataLoaded);
   // 设置坐标系
   space._layer.pushRenderable(o._dimensional);
   // 启动舞台
   RStage.register('space', space);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsModelCanvas_dispose(){
   var o = this;
   // 释放旋转
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
