with(MO){
   //==========================================================
   // <T>全国地图实体类</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @property
      //o._startDelay          = RClass.register(o, new APtyInteger('_startDelay'), 0);
      //o._riseDuration        = RClass.register(o, new APtyNumber('_riseDuration'), 1200);
      //o._riseDistance        = RClass.register(o, new APtyNumber('_riseDistance'), 2050);
      //o._fallDuration        = RClass.register(o, new APtyNumber('_fallDuration'), 400);
      //o._fallDistance        = RClass.register(o, new APtyNumber('_fallDistance'), 50);
      //o._blockInterval       = RClass.register(o, new APtyNumber('_blockInterval'), 60);
      //o._mouseOverRiseHeight = RClass.register(o, new APtyNumber('_mouseOverRiseHeight'), 10);
      o._cameraDirection     = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration  = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      //..........................................................
      // @attribute
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      //..........................................................
      // @method
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.onMouseDown = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   
   //==========================================================
   // <T>初始化处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setCameraDirection(new SVector3(0.02, -0.9, 0.5));
      o.setCameraFrom(new SPoint3());
      o.setCameraTo(new SPoint3());
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      //监听事件
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      //设置背景色
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      //设置相机位置视角
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(o.cameraDirection().x, o.cameraDirection().y, o.cameraDirection().z);
      //打开Alpha
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         renderable.material().info().optionAlpha = true;
      }
      //记录开始时间
      o.setStartTime(new Date());
   }
   
   //==========================================================
   // <T>每帧处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else if(o.cameraMoving()) {
         o.cameraMoveAnime();
      }
      else{
         o.mouseOverFallAnime();
      }
   }
   
   //==========================================================
   // <T>地图开场动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime(){
      var o = this;
      var sprite = o.template().sprite();
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      if (timePassed < o.startDelay()) {
         return;
      }
      else{
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * sprite.renderables().count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
            //获取省份数据
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
	
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
         var matrix = renderable.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
			risePercentage = 1;
			fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
			if (fallPercentage > 1) {
				fallPercentage = 1;
			}
         }
         matrix.ty = o.riseDistance() * risePercentage - o.fallDistance() * fallPercentage;
         matrix.updateForce();
      }
   }
   
   //==========================================================
   // <T>鼠标经过处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      //检查时间间隔避免频繁调用开销较大的射线检测
      var now = new Date();
      if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
         return;
      }
      //得到当前鼠标指向的对象
      //TODO:canvas改到某一Console中
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      //判断是否是之前指向的对象
      if (o.mouseOverRiseRenderable() != renderable) {
         //将之前指向的对象放入下降集合
         if (o.mouseOverRiseRenderable()) {
            o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
         }
         //改变指向的对象
         o.setMouseOverRiseRenderable(renderable);
         //新指向的对象如在下降集合中则移除
         if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
         	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
         }
      }
   }
   
   //==========================================================
   // <T>鼠标经过动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
         var renderable = o.mouseOverFallArray().at(i);
         var matrix = renderable.matrix();
         if (matrix.ty > o.riseDistance() - o.fallDistance()) {
         	matrix.ty -= 1;
         }
         else {
         	matrix.ty = o.riseDistance() - o.fallDistance();
         	o.mouseOverFallArray().erase(i);
         }
         matrix.updateForce();
      }
      
      if (o.mouseOverRiseRenderable()) {
         var riseMatrix = o.mouseOverRiseRenderable().matrix();
         if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
         	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
         	riseMatrix.updateForce();
         }
      }	
   }
   
   //==========================================================
   // <T>集团分公司数据获取处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      var content = event.content;
      var branchCount = new Object();
      for (var i = 0; i < content.collection.length; i++) {
         if(!branchCount[content.collection[i].province_id]){
            if(content.collection[i].province_id == null)
            {
               //debugger;
            }
            branchCount[content.collection[i].province_id] = 1;
         }
         else{
            branchCount[content.collection[i].province_id]++;
            if (content.collection[i].province_id == null) {
               content.collection[i].label;
               //debugger;
            }
         }
      }
      
      var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      var dict = logicConsole.organization().dict();
      var colors = logicConsole.organization().provinceColors();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         if (!bc) {
            bc = 0;
         }
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
         var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		 ambientColor.assign(colors.at(colorLv));
         //diffuseColor.assign(colors.at(colorLv));
         renderable.material().update();
      }
      
   }
   
   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
      var region = o.template().region();
      var camera = region.camera();
      //得到当前鼠标指向的对象
      //TODO:canvas改到某一Console中
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (!renderable) {
         camera.setPosition(3, 24, -0.5);
         camera.update();
         return;
      }
      
      var outline = renderable.calculateOutline();
      var relativeOutline = new SOutline3d();
      relativeOutline.calculateFrom(outline, camera.matrix());
      var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
      var currentCenter = outline.center;
      var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
      var cameraPosition = camera.position();
      
      o.setStartTime(new Date());
      o.cameraFrom().assign(cameraPosition);
      o.cameraTo().assign(cameraTo);
      o.setCameraMoving(true);
   }
   
   //==========================================================
   // <T>选取省份后镜头移动动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      var p = timePassed / o.cameraMoveDuration();
      if (p >= 1) {
         p = 1;
         o.setCameraMoving(false);
      }
      //p = p*p;
      //p = p > 0.5 ? 1-2*(1-p)*(1-p) : 2*p*p;
      p = 1-(1-p)*(1-p);
      var movingPosition = new SPoint3();
      movingPosition.slerp(o.cameraFrom(), o.cameraTo(), p);
      var camera = o.template().region().camera();
      camera.position().assign(movingPosition);
      camera.update();
      
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         if (renderable != o.mouseOverRiseRenderable()) {
            renderable.material().info().alphaRate = 1.5 - p;
            renderable.material().update();
         }
      }
   }
   
}