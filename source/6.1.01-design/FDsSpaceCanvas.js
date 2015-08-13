with(MO){
   //==========================================================
   // <T>设计空间画板。</T>
   //
   // @class
   // @author maocy
   // @history 150428
   //==========================================================
   MO.FDsSpaceCanvas = function FDsSpaceCanvas(o){
      o = MO.Class.inherits(this, o, FDsCanvas);
      //..........................................................
      // @attribute
      o._rotation             = null;
      o._optionRotation       = false;
      o._capturePosition      = null;
      o._captureMatrix        = null;
      o._captureRotation      = null;
      o._selectObject         = null;
      o._selectRenderables    = null;
      // @attribute
      o._templateMatrix       = null;
      o._templateRenderable   = null;
      //..........................................................
      // @event
      o.onBuild               = FDsSpaceCanvas_onBuild;
      o.onMouseCaptureStart   = FDsSpaceCanvas_onMouseCaptureStart;
      o.onMouseCapture        = FDsSpaceCanvas_onMouseCapture;
      o.onMouseCaptureStop    = FDsSpaceCanvas_onMouseCaptureStop;
      //..........................................................
      o.oeResize              = FDsSpaceCanvas_oeResize;
      o.oeRefresh             = FDsSpaceCanvas_oeRefresh;
      //..........................................................
      // @method
      o.construct             = FDsSpaceCanvas_construct;
      // @method
      o.innerSelectRenderable = FDsSpaceCanvas_innerSelectRenderable;
      o.innerSelectDisplay    = FDsSpaceCanvas_innerSelectDisplay;
      o.innerSelectLayer      = FDsSpaceCanvas_innerSelectLayer;
      o.selectNone            = FDsSpaceCanvas_selectNone;
      o.selectLayers          = FDsSpaceCanvas_selectLayers;
      o.selectLayer           = FDsSpaceCanvas_selectLayer;
      o.selectDisplay         = FDsSpaceCanvas_selectDisplay;
      o.selectMaterial        = FDsSpaceCanvas_selectMaterial;
      o.selectRenderable      = FDsSpaceCanvas_selectRenderable;
      o.switchPlay            = FDsSpaceCanvas_switchPlay;
      o.switchMovie           = FDsSpaceCanvas_switchMovie;
      // @method
      o.dispose               = FDsSpaceCanvas_dispose;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSpaceCanvas_onBuild = function FDsSpaceCanvas_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }

   //==========================================================
   // <T>鼠标捕捉开始处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSpaceCanvas_onMouseCaptureStart = function FDsSpaceCanvas_onMouseCaptureStart(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCaptureStart.call(o, event)
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var region = space.region();
      // 选取物件
      var selectTechnique = MO.Console.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      o.selectRenderable(renderable);
      if(renderable){
         var display = renderable.display();
         o._captureMatrix.assign(display.matrix());
      }
   }

   //==========================================================
   // <T>鼠标捕捉处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSpaceCanvas_onMouseCapture = function FDsSpaceCanvas_onMouseCapture(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCapture.call(o, event);
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
   MO.FDsSpaceCanvas_onMouseCaptureStop = function FDsSpaceCanvas_onMouseCaptureStop(event){
      var o = this;
      o.__base.FDsCanvas.onMouseCaptureStop.call(o, event);
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceCanvas_oeResize = function FDsSpaceCanvas_oeResize(p){
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
   MO.FDsSpaceCanvas_oeRefresh = function FDsSpaceCanvas_oeRefresh(p){
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceCanvas_construct = function FDsSpaceCanvas_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._capturePosition = new MO.SPoint2();
      o._captureMatrix = new MO.SMatrix3d();
      o._templateMatrix = new MO.SMatrix3d();
      o._templateFaceMatrix = new MO.SMatrix3d();
      o._rotation = new MO.SVector3();
      o._captureRotation = new MO.SVector3();
      o._selectRenderables = new MO.TObjects();
   }

   //==========================================================
   // <T>选中渲染对象处理。</T>
   //
   // @method
   // @param renderable:FRenderable 渲染对象
   //==========================================================
   MO.FDsSpaceCanvas_innerSelectRenderable = function FDsSpaceCanvas_innerSelectRenderable(renderable){
      var o = this;
      renderable._optionSelected = true;
      if(MO.Class.isClass(renderable, MDsBoundBox)){
         renderable.showBoundBox();
      }
      o._selectRenderables.push(renderable);
   }

   //==========================================================
   // <T>选中渲染显示对象处理。</T>
   //
   // @method
   // @param select:FDisplay 显示对象
   //==========================================================
   MO.FDsSpaceCanvas_innerSelectDisplay = function FDsSpaceCanvas_innerSelectDisplay(select){
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
         if(MO.Class.isClass(renderable, FDsSceneRenderable)){
            o.innerSelectRenderable(renderable);
         }
      }
   }

   //==========================================================
   // <T>选中渲染显示对象处理。</T>
   //
   // @method
   // @param layer:FDisplayLayer 显示层
   //==========================================================
   MO.FDsSpaceCanvas_innerSelectLayer = function FDsSpaceCanvas_innerSelectLayer(layer){
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
   MO.FDsSpaceCanvas_selectNone = function FDsSpaceCanvas_selectNone(){
      var o = this;
      // 取消选中集合
      var renderables = o._selectRenderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable._optionSelected = false;
         if(MO.Class.isClass(renderable, MDsBoundBox)){
            renderable.hideBoundBox();
         }
      }
      // 清空属性
      o._selectObject = null;
      o._selectRenderables.clear();
   }

   //==========================================================
   // <T>选中渲染层集合处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceCanvas_selectLayers = function FDsSpaceCanvas_selectLayers(){
      var o = this;
      // 取消选中
      o.selectNone();
      // 选中集合
      var layers = o._activeSpace.layers();
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.innerSelectLayer(layer);
      }
   }

   //==========================================================
   // <T>选中渲染层处理。</T>
   //
   // @method
   // @param layer:FDisplayLayer 渲染层
   //==========================================================
   MO.FDsSpaceCanvas_selectLayer = function FDsSpaceCanvas_selectLayer(layer){
      var o = this;
      // 取消选中
      o.selectNone();
      // 选中对象
      o._selectObject = layer;
      // 选中集合
      o.innerSelectLayer(layer);
   }

   //==========================================================
   // <T>选中渲染显示对象处理。</T>
   //
   // @method
   // @param display:FDisplay 显示对象
   //==========================================================
   MO.FDsSpaceCanvas_selectDisplay = function FDsSpaceCanvas_selectDisplay(display){
      var o = this;
      // 取消选中
      o.selectNone();
      // 选中对象
      o._selectObject = display;
      // 选中集合
      o.innerSelectDisplay(display);
   }

   //==========================================================
   // <T>选中渲染材质处理。</T>
   //
   // @method
   // @param material:FG3dMaterial 渲染材质
   //==========================================================
   MO.FDsSpaceCanvas_selectMaterial = function FDsSpaceCanvas_selectMaterial(material){
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
         if(renderable.material() == material){
            o.innerSelectRenderable(renderable);
         }
      }
   }

   //==========================================================
   // <T>选中渲染对象处理。</T>
   //
   // @method
   // @param renderable:FG3dRenderable 渲染对象
   //==========================================================
   MO.FDsSpaceCanvas_selectRenderable = function FDsSpaceCanvas_selectRenderable(renderable){
      var o = this;
      // 选中当前对象
      o.selectNone();
      if(renderable){
         o.innerSelectRenderable(renderable);
         o._frameSet._catalogContent.showObject(renderable);
      }
   }

   //==========================================================
   // <T>切换播放模式。</T>
   //
   // @method
   // @param flag:Boolean 模式
   //==========================================================
   MO.FDsSpaceCanvas_switchPlay = function FDsSpaceCanvas_switchPlay(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(MO.Class.isClass(display, FE3dSceneDisplay)){
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
   MO.FDsSpaceCanvas_switchMovie = function FDsSpaceCanvas_switchMovie(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(MO.Class.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            if(sprite){
               sprite._optionMovie = flag;
            }
            display._optionMovie = flag;
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSpaceCanvas_dispose = function FDsSpaceCanvas_dispose(){
      var o = this;
      // 释放属性
      o._rotation = MO.Lang.Object.dispose(o._rotation);
      // 父处理
      o.__base.FDsCanvas.dispose.call(o);
   }
}
