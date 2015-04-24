//==========================================================
// <T>场景画板内容。</T>
//
// @class
// @author maocy
// @history 150130
//==========================================================
function FDsSceneCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   // @property
   o._resourceTypeCd      = EE3sResource.Scene;
   //..........................................................
   // @attribute
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectRenderables   = null;
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
   o.onBuild              = FDsSceneCanvasContent_onBuild;
   o.onMouseCaptureStart  = FDsSceneCanvasContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsSceneCanvasContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsSceneCanvasContent_onMouseCaptureStop;
   o.onDataLoaded         = FDsSceneCanvasContent_onDataLoaded;
   //..........................................................
   o.oeResize             = FDsSceneCanvasContent_oeResize;
   o.oeRefresh            = FDsSceneCanvasContent_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsSceneCanvasContent_construct;
   // @method
   o.innerSelectDisplay   = FDsSceneCanvasContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsSceneCanvasContent_innerSelectLayer;
   o.selectNone           = FDsSceneCanvasContent_selectNone;
   o.selectLayers         = FDsSceneCanvasContent_selectLayers;
   o.selectLayer          = FDsSceneCanvasContent_selectLayer;
   o.selectDisplay        = FDsSceneCanvasContent_selectDisplay;
   o.selectMaterial       = FDsSceneCanvasContent_selectMaterial;
   o.selectRenderable     = FDsSceneCanvasContent_selectRenderable;
   o.switchMode           = FDsSceneCanvasContent_switchMode;
   o.switchPlay           = FDsSceneCanvasContent_switchPlay;
   o.switchMovie          = FDsSceneCanvasContent_switchMovie;
   o.loadByGuid           = FDsSceneCanvasContent_loadByGuid;
   // @method
   o.dispose              = FDsSceneCanvasContent_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   // 创建界面控制器
   //var templateConsole = RConsole.find(FE3dTemplateConsole);
   //var templateTranslation = o._templateTranslation = templateConsole.allocByCode(o, 'com.design.translation');
   //templateTranslation._optionFace = true;
   //templateTranslation.setVisible(false);
   //var templateRotation = o._templateRotation = templateConsole.allocByCode(o, 'com.design.rotation');
   //templateRotation._optionFace = true;
   //templateRotation.setVisible(false);
   //var templateScale = o._templateScale = templateConsole.allocByCode(o, 'com.design.scale');
   //templateScale._optionFace = true;
   //templateScale.setVisible(false);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvasContent_onMouseCaptureStart(p){
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
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvasContent_onMouseCapture(p){
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
function FDsSceneCanvasContent_onMouseCaptureStop(p){
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneCanvasContent_onDataLoaded(p){
   var o = this;
   //var context = o._graphicContext;
   //var space = o._activeSpace;
   //space._layer.pushRenderable(o._dimensional);
   // 创建界面层
   //var l = RClass.create(FDisplayUiLayer);
   //l.selectTechnique(c, FG3dControlTechnique);
   //l.pushDisplay(o._templateTranslation);
   //l.pushDisplay(o._templateRotation);
   //l.pushDisplay(o._templateScale);
   //s.registerLayer('ui', l);
   o.reloadRegion()
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
function FDsSceneCanvasContent_oeResize(p){
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
function FDsSceneCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvasContent_construct(){
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
// @param select:FDisplay 显示对象
//==========================================================
function FDsSceneCanvasContent_innerSelectDisplay(select){
   var o = this;
   // 选中显示集合
   var displays = select.displays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      o.innerSelectDisplay(display);
   }
   // 选中渲染集合
   var renderables = select.renderables();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      if(RClass.isClass(renderable, FDsSceneRenderable)){
         o._selectRenderables.push(renderable);
         renderable.showBoundBox();
      }
   }
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param layer:FDisplayLayer 显示层
//==========================================================
function FDsSceneCanvasContent_innerSelectLayer(layer){
   var o = this;
   var displays = layer.displays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      o.innerSelectDisplay(display)
   }
}

//==========================================================
// <T>不选中任何对象。</T>
//
// @method
//==========================================================
function FDsSceneCanvasContent_selectNone(){
   var o = this;
   o._selectObject = null;
   // 取消所有选中对象
   var renderables = o._selectRenderables;
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      renderable.hideBoundBox();
   }
   o._selectRenderables.clear();
}

//==========================================================
// <T>选中渲染层处理。</T>
//
// @method
// @param p:layer:FDisplayLayer 渲染层
//==========================================================
function FDsSceneCanvasContent_selectLayers(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中集合
   var s = o._activeSpace.layers();
   for(var i = s.count() - 1; i >= 0; i--){
      o.innerSelectLayer(s.valueAt(i));
   }
}

//==========================================================
// <T>选中渲染层处理。</T>
//
// @method
// @param p:layer:FDisplayLayer 渲染层
//==========================================================
function FDsSceneCanvasContent_selectLayer(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectLayer(p);
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsSceneCanvasContent_selectDisplay(p){
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
// @param material:FG3dMaterial 渲染材质
//==========================================================
function FDsSceneCanvasContent_selectMaterial(material){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = material;
   // 选中材质
   var display = material._display;
   var sprite = display._sprite;
   var renderables = sprite.renderables();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      if(renderable._materialReference == material._parentMaterial){
         o._selectRenderables.push(renderable);
         renderable._optionSelected = true;
         renderable.showBoundBox();
      }
   }
}

//==========================================================
// <T>选中渲染对象处理。</T>
//
// @method
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FDsSceneCanvasContent_selectRenderable(renderable){
   var o = this;
   if(renderable){
      var n = renderable._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = renderable;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   // 选中当前对象
   o.selectNone();
   if(renderable){
      renderable._optionSelected = true;
      renderable.showBoundBox();
      o._selectRenderables.push(renderable);
      o._frameSet._catalogContent.showObject(renderable);
   }
   return;
   // 设置变量
   var templateTranslation = o._templateTranslation;
   var templateRotation = o._templateRotation;
   var templateScale = o._templateScale;
   // 模式判定
   var modeCd = o._canvasModeCd;
   switch(modeCd){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         templateTranslation.setVisible(renderable != null);
         templateRotation.setVisible(false);
         templateScale.setVisible(false);
         o._templateFace = templateTranslation;
         break;
      case EDsCanvasMode.Rotation:
         templateTranslation.setVisible(false);
         templateRotation.setVisible(renderable != null);
         templateScale.setVisible(false);
         o._templateFace = templateScale;
         break;
      case EDsCanvasMode.Scale:
         templateTranslation.setVisible(false);
         templateRotation.setVisible(false);
         templateScale.setVisible(renderable != null);
         o._templateFace = templateScale;
         break;
   }
   // 设置位置
   var templateFace = o._templateFace;
   if(renderable && templateFace){
      var display = renderable.display();
      var matrix = templateFace.matrix();
      matrix.assign(display.matrix());
      matrix.setScaleAll(o._templateViewScale);
      matrix.update();
   }
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   // 设置变量
   o.selectRenderable(o._selectRenderable);
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvasContent_switchPlay(flag){
   var o = this;
   var space = o._activeSpace;
   var displays = space.allDisplays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      if(RClass.isClass(display, FE3dSceneDisplay)){
         var sprite = display._sprite;
         sprite._optionPlay = flag;
         display._optionPlay = flag;
      }
   }
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvasContent_switchMovie(flag){
   var o = this;
   var space = o._activeSpace;
   var displays = space.allDisplays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      if(RClass.isClass(display, FE3dSceneDisplay)){
         var sprite = display._sprite;
         if(sprite){
            sprite._optionMovie = flag;
         }
         display._optionMovie = flag;
      }
   }
}

//==========================================================
// <T>根据唯一编号加载场景。</T>
//
// @method
// @param guid:String 唯一编号
//==========================================================
function FDsSceneCanvasContent_loadByGuid(guid){
   var o = this;
   // 释放场景
   var space = o._activeSpace;
   var sceneConsole = RConsole.find(FE3dSceneConsole);
   if(space){
      RStage.unregister(space);
      sceneConsole.free(space);
   }
   // 收集一个显示模板
   space = o._activeSpace = sceneConsole.allocByGuid(o, guid);
   if(!space._linked){
      // 显示加载进度
      RConsole.find(FUiDesktopConsole).showLoading();
      // 设置事件
      space.addLoadListener(o, o.onDataLoaded);
      space._linked = true;
   }
   // 启动舞台
   RStage.register('space', space);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvasContent_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
