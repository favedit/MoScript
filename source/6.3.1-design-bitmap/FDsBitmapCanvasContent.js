//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   // @attribute
   o._activeGuid          = null;
   o._activeSpace         = null;
   o._activeBitmap        = null;
   o._autoDistance        = null;
   o._autoOutline         = null;
   o._autoMatrix          = null;
   // @attribute
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   // @attribute
   o._switchWidth         = '*';
   o._switchHeight        = '*';
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
   o.onBuild              = FDsBitmapCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsBitmapCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsBitmapCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsBitmapCanvasContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsBitmapCanvasContent_onEnterFrame;
   o.onLoaded             = FDsBitmapCanvasContent_onLoaded;
   //..........................................................
   o.oeResize             = FDsBitmapCanvasContent_oeResize;
   o.oeRefresh            = FDsBitmapCanvasContent_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsBitmapCanvasContent_construct;
   // @method
   o.switchSize           = FDsBitmapCanvasContent_switchSize;
   o.switchRotation       = FDsBitmapCanvasContent_switchRotation;
   o.viewAutoSize         = FDsBitmapCanvasContent_viewAutoSize;
   o.reloadRegion         = FDsBitmapCanvasContent_reloadRegion;
   o.loadByGuid           = FDsBitmapCanvasContent_loadByGuid;
   // @method
   o.dispose              = FDsBitmapCanvasContent_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsBitmapCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   // 创建简单舞台
   var space = o._activeSpace = RClass.create(FE3dSimpleStage);
   space.linkGraphicContext(o);
   space.selectTechnique(o, FE3dGeneralTechnique);
   space.region().backgroundColor().set(1, 1, 1, 1);
   space.region().linkGraphicContext(o);
   RStage.register('space', space);
   //g.addEnterFrameListener(o, o.onEnterFrame);
   //var sl = o._layer = o._activeSpace.spriteLayer();
   // 设置相机
   var camera = space.camera();
   camera.setPosition(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   // 设置投影
   var projection = camera.projection();
   projection.size().set(hPanel.width, hPanel.height);
   projection._angle = 45;
   projection.update();
   // 创建位图
   var bitmap = o._activeBitmap = RClass.create(FE3dBitmap)
   bitmap.linkGraphicContext(o);
   bitmap.setup();
   space.spriteLayer().pushRenderable(bitmap);
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
function FDsBitmapCanvasContent_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   // 选取物件
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   // 记录坐标
   o._templateMatrix.identity();
   if(o._templateFace){
      o._templateFaceMatrix.assign(o._templateFace.matrix());
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
function FDsBitmapCanvasContent_onMouseCapture(p){
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
function FDsBitmapCanvasContent_onMouseCaptureStop(p){
   var o = this;
   // 设置鼠标
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsBitmapCanvasContent_onEnterFrame(){
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
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsBitmapCanvasContent_onLoaded(p){
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
function FDsBitmapCanvasContent_oeResize(p){
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
function FDsBitmapCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsBitmapCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._autoDistance = new SPoint3(6, 6, 6);
   o._autoOutline = new SOutline3d();
   o._autoMatrix = new SMatrix3d();
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._templateMatrix = new SMatrix3d();
   o._templateFaceMatrix = new SMatrix3d();
   o._captureRotation = new SVector3();
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsBitmapCanvasContent_selectDisplay(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectDisplay(p);
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsBitmapCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
}

//==========================================================
// <T>切换大小。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
function FDsBitmapCanvasContent_switchSize(width, height){
   var o = this;
   o._switchWidth = width;
   o._switchHeight = height;
   // 获得大小
   var hCanvas = o._hPanel;
   var hParent = o._hParent;
   if(width == '*'){
      width = hParent.offsetWidth;
   }
   if(height == '*'){
      height = hParent.offsetHeight;
   }
   // 设置大小
   hCanvas.width = width;
   hCanvas.style.width = width + 'px';
   hCanvas.height = height;
   hCanvas.style.height = height + 'px';
   // 设置投影
   o._graphicContext.setViewport(0, 0, width, height);
   // 设置投影
   var space = o._activeSpace;
   if(space){
      var projection = space.camera().projection();
      projection.size().set(width, height);
      projection.update();
   }
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsBitmapCanvasContent_switchRotation(p){
   this._optionRotation = p;
}

//==========================================================
// <T>自动优化大小。</T>
//
// @method
//==========================================================
function FDsBitmapCanvasContent_viewAutoSize(flipX, flipY, flipZ, rotationX, rotationY, rotationZ){
   var o = this;
   var outline = o._autoOutline;
   // 获得矩阵
   var space = o._activeSpace;
   var display = space._display;
   var displayResource = display.resource();
   var displayMatrix = displayResource.matrix();
   var renderable = display._renderable;
   var renderableResource = renderable.resource();
   var renderableMatrix = renderableResource.matrix();
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
   var resource = space.resource();
   var resourceOutline = resource.calculateOutline();
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
   renderableMatrix.identity();
   renderable.reloadResource();
   //renderableMatrix.update();
}

//==========================================================
// <T>重新加载区域。</T>
//
// @method
// @param region:FE3dRegion 区域
//==========================================================
function FDsBitmapCanvasContent_reloadRegion(region){
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
function FDsBitmapCanvasContent_loadByGuid(guid){
   var o = this;
   // 显示加载进度
   //RConsole.find(FUiDesktopConsole).showLoading();
   // 释放网格
   var url = '/cloud.content2d.bitmap.image.wv?do=view&guid=' + guid;
   var bitmap = o._activeBitmap;
   bitmap.loadUrl(url);
   var matrix = bitmap.matrix();
   matrix.tx = 0;
   matrix.ty = 0;
   matrix.tz = 0;
   matrix.sx = 5;
   matrix.sy = 5;
   matrix.sz = 5;
   matrix.updateForce();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsBitmapCanvasContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
