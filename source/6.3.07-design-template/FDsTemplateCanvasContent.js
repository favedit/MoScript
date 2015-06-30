with(MO){
   //==========================================================
   // <T>模板画板内容。</T>
   //
   // @class
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FDsTemplateCanvasContent = function FDsTemplateCanvasContent(o){
      o = RClass.inherits(this, o, FDsSpaceCanvas);
      //..........................................................
      // @property
      o._resourceTypeCd     = EE3sResource.Template;
      //..........................................................
      o._context            = null;
      o._stage              = null;
      o._layer              = null;
      o._rotation           = null;
      o._rotationAble       = false;
      o._capturePosition    = null;
      o._captureMatrix      = null;
      o._captureRotation    = null;
      o._dimensional        = null;
      o._selectBoundBox     = null;
      //..........................................................
      // @event
      o.onBuild             = FDsTemplateCanvasContent_onBuild;
      //o.onMouseCaptureStart = FDsTemplateCanvasContent_onMouseCaptureStart;
      //o.onMouseCapture      = FDsTemplateCanvasContent_onMouseCapture;
      //o.onMouseCaptureStop  = FDsTemplateCanvasContent_onMouseCaptureStop;
      o.onDataLoaded        = FDsTemplateCanvasContent_onDataLoaded;
      //..........................................................
      o.oeRefresh           = FDsTemplateCanvasContent_oeRefresh;
      //..........................................................
      // @method
      o.construct           = FDsTemplateCanvasContent_construct;
      // @method
      o.loadByGuid          = FDsTemplateCanvasContent_loadByGuid;
      o.loadByCode          = FDsTemplateCanvasContent_loadByCode;
      // @method
      o.dispose             = FDsTemplateCanvasContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsTemplateCanvasContent_onBuild = function FDsTemplateCanvasContent_onBuild(p){
      var o = this;
      o.__base.FDsSpaceCanvas.onBuild.call(o, p);
      // 创建简单舞台
      //var g = o._stage = RClass.create(FE3dSimpleStage);
      //g.region().backgroundColor().set(0.5, 0.5, 0.5, 1);
      //g.selectTechnique(o, FE3dGeneralTechnique);
      //var sl = o._layer = o._stage.spriteLayer();
      //RStage.register('stage3d', o._stage);
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
   }

   //==========================================================
   // <T>鼠标捕捉开始处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasContent_onMouseCaptureStart = function FDsTemplateCanvasContent_onMouseCaptureStart(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      //var d = t.renderables().get(0);
      //o._capturePosition.set(p.clientX, p.clientY);
      //o._captureMatrix.assign(d.matrix());
      var camera = space.camera();
      o._captureRotation.assign(camera._rotation);
   }

   //==========================================================
   // <T>鼠标捕捉处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasContent_onMouseCapture = function FDsTemplateCanvasContent_onMouseCapture(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var d = t.renderables().get(0);
      var m = d.matrix();
      var cm = o._captureMatrix;
      switch(o._toolbar._canvasModeCd){
         case EDsCanvasMode.Drop:
            var c = o._stage.camera();
            var r = c.rotation();
            var cr = o._captureRotation;
            r.x = cr.x + cy * 0.003;
            r.y = cr.y + cx * 0.003;
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            m.tx = cm.tx + cx / 360 * 3.14;
            m.ty = cm.ty + cy / 360 * 3.14;
            break;
         case EDsCanvasMode.Rotation:
            m.ry = cm.ry + cx * RConst.DEGREE_RATE;
            break;
         case EDsCanvasMode.Scale:
            m.sx = cm.sx + cx / 100;
            m.sy = cm.sy + cx / 100;
            m.sz = cm.sz + cx / 100;
            break;
      }
      m.updateForce();
   }

   //==========================================================
   // <T>鼠标捕捉结束处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasContent_onMouseCaptureStop = function FDsTemplateCanvasContent_onMouseCaptureStop(event){
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param template:FTemplate3d 模板
   //==========================================================
   MO.FDsTemplateCanvasContent_onDataLoaded = function FDsTemplateCanvasContent_onDataLoaded(event){
      var o = this;
      var m = o._activeSpace;
      //m.selectTechnique(o, FE3dGeneralTechnique);
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
      //space._layers.at(0).pushRenderable(o._dimensional);
      // 加载完成
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
      // 隐藏处理
      RConsole.find(FUiDesktopConsole).hide();
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCanvasContent_oeRefresh = function FDsTemplateCanvasContent_oeRefresh(p){
      var o = this;
      var c = o._graphicContext;
      o.__base.FDsSpaceCanvas.oeRefresh.call(o, p);
      // 获得大小
      var w = o._hParent.offsetWidth;
      var h = o._hParent.offsetHeight;
      // 设置大小
      var hc = o._hPanel;
      hc.width = w;
      hc.height = h;
      // 设置投影
      var rp = o._stage.camera().projection();
      rp.size().set(w, h);
      rp.update();
      // 设置范围
      c.setViewport(0, 0, w, h);
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCanvasContent_construct = function FDsTemplateCanvasContent_construct(){
      var o = this;
      o.__base.FDsSpaceCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
   }

   //==========================================================
   // <T>根据唯一编号加载模板。</T>
   //
   // @method
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDsTemplateCanvasContent_loadByGuid = function FDsTemplateCanvasContent_loadByGuid(guid){
      var o = this;
      // 释放模板
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      // 收集一个模板
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         // 显示加载进度
         RConsole.find(FUiDesktopConsole).showLoading();
         // 设置事件
         space._layer.pushRenderable(o._dimensional);
         space._linked = true;
         space.addLoadListener(o, o.onDataLoaded);
      }
      // 启动舞台
      RStage.register('space', space);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCanvasContent_loadByCode = function FDsTemplateCanvasContent_loadByCode(code){
      var o = this;
      // 释放模板
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      // 收集一个模板
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         // 显示加载进度
         RConsole.find(FUiDesktopConsole).showLoading();
         // 设置事件
         space._layer.pushRenderable(o._dimensional);
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
   MO.FDsTemplateCanvasContent_dispose = function FDsTemplateCanvasContent_dispose(){
      var o = this;
      // 释放旋转
     o._rotation = RObject.dispose(o._rotation);
      // 父处理
      o.__base.FDsSpaceCanvas.dispose.call(o);
   }
}
