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
      //o._startDelay            = RClass.register(o, new APtyInteger('_startDelay'), 0);
      //o._riseDuration          = RClass.register(o, new APtyNumber('_riseDuration'), 1200);
      //o._riseDistance          = RClass.register(o, new APtyNumber('_riseDistance'), 2050);
      //o._fallDuration          = RClass.register(o, new APtyNumber('_fallDuration'), 400);
      //o._fallDistance          = RClass.register(o, new APtyNumber('_fallDistance'), 50);
      //o._blockInterval         = RClass.register(o, new APtyNumber('_blockInterval'), 60);
      //o._mouseOverRiseHeight   = RClass.register(o, new APtyNumber('_mouseOverRiseHeight'), 10);
      o._enterSELoaded           = false;
      o._downSELoaded            = false;

      o._cameraDirection         = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay              = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration            = RClass.register(o, new AGetSet('_riseDuration'), 5000);
      o._riseDistance            = RClass.register(o, new AGetSet('_riseDistance'), 1000);
      o._fallDuration            = RClass.register(o, new AGetSet('_fallDuration'), 200);
      o._fallDistance            = RClass.register(o, new AGetSet('_fallDistance'), 3);
      o._blockInterval           = RClass.register(o, new AGetSet('_blockInterval'), 200);
      o._mouseOverRiseHeight     = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 3);
      o._mouseMoveCheckInterval  = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration      = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      //..........................................................
      // @attribute
      o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
      o._provinceArray           = null;
      o._playing                 = false;
      o._lastTick                = 0;
      o._interval                = 10;

      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));

      o._mapEnterSEArray         = null;
      o._mapDownSEArray          = null;
      o._lastEnterSEIndex        = -1;
      o._lastDownSEIndex         = -1;
      //..........................................................
      // @method
      o.setup                    = FEaiCountryEntity_setup;
      o.start                    = FEaiCountryEntity_start;
      o.process                  = FEaiCountryEntity_process;
      o.introAnime               = FEaiCountryEntity_introAnime;
      o.onMouseMove              = FEaiCountryEntity_onMouseMove;
      o.onMouseDown              = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime       = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch      = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime          = FEaiCountryEntity_cameraMoveAnime;
      o.provinceShowOrderSort    = FEaiCountryEntity_provinceShowOrderSort;
      o.onEnterSELoaded          = FEaiCountryEntity_onEnterSELoaded;
      o.onDownSELoaded           = FEaiCountryEntity_onDownSELoaded;
      o.isReady                  = FEaiCountryEntity_isReady;
      return o;
   }
   
   //==========================================================
   // <T>初始化处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup(provinceEntities) {
      var o = this;
      o._provinceEntities = provinceEntities;
      for (var i = 0; i < o._provinceEntities.count(); i++) {
         var fr = o._provinceEntities.at(i).faceRenderable();
         var br = o._provinceEntities.at(i).borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         frm.tz = o.riseDistance();
         frm.updateForce();
         brm.tz = o.riseDistance();
         brm.updateForce();
      }

      var provinceArray = o._provinceArray = new Array(provinceEntities.count());
      for (var i = 0; i < provinceEntities.count() ; i++) {
         provinceArray[i] = provinceEntities.at(i);
      }
      provinceArray.sort(o.provinceShowOrderSort);

      var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
      audioContextConsole.load('{eai.resource}/map_entry/enter.wav', o, o.onEnterSELoaded);
      audioContextConsole.load('{eai.resource}/map_entry/down.wav', o, o.onDownSELoaded);
   }

   //==========================================================
   // <T>音频加载完成。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onEnterSELoaded = function FEaiCountryEntity_onEnterSELoaded(uri) {
      var o = this;
      var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
      var peCount = o._provinceEntities.count();
      var enterSEArray = o._mapEnterSEArray = new Array(peCount);
      for (var i = 0; i < peCount; i++) {
         enterSEArray[i] = audioContextConsole.create(uri);
      }
      o._enterSELoaded = true;
   }

   //==========================================================
   // <T>音频加载完成。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onDownSELoaded = function FEaiCountryEntity_onDownSELoaded(uri) {
      var o = this;
      var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
      var peCount = o._provinceEntities.count();
      var downSEArray = o._mapDownSEArray = new Array(peCount);
      for (var i = 0; i < peCount; i++) {
         downSEArray[i] = audioContextConsole.create(uri);
      }
      o._downSELoaded = true;
   }

   //==========================================================
   // <T>音频加载完成。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_isReady = function FEaiCountryEntity_isReady() {
      var o = this;
      if (o._enterSELoaded && o._downSELoaded) {
         ////记录开始时间
         o._startTime = MO.Timer.current();
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>省份显示顺序排序。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_provinceShowOrderSort = function FEaiCountryEntity_provinceShowOrderSort(p1, p2) {
      var pResConsole = MO.RConsole.find(FEaiResourceConsole).provinceConsole();
      var p1Res = pResConsole.findByCode(p1.data().code());
      var p2Res = pResConsole.findByCode(p2.data().code())
      if (p1Res.displayOrder() > p2Res.displayOrder()) {
         return 1;
      }
      return -1;
   }

   //==========================================================
   // <T>开始处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_start = function FEaiCountryEntity_start(){
      this._startTime = MO.Timer.current();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_process = function FEaiCountryEntity_process() {
      var o = this;
      //if (!o.introAnimeDone()) {
      if (!o._provinceEntities) {
         return;
      }
      o.introAnime();
      //}
      //else if (o.cameraMoving()) {
      //   o.cameraMoveAnime();
      //}
      //else {
      //   o.mouseOverFallAnime();
      //}
   }
   
   //==========================================================
   // <T>地图开场动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime() {
      var o = this;
      var now = MO.Timer.current();
      var timePassed = now - o._startTime;
      if (timePassed < o.startDelay()) {
         return;
      }
      else {
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * o._provinceEntities.count()) {
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
            //RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            //var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            //logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }

      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < o._provinceArray.length && i < idxCap; i++) {
         var fr = o._provinceArray[i].faceRenderable();
         var br = o._provinceArray[i].borderRenderable();
         var frm = fr.matrix();
         var brm = br.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
            risePercentage = 1;

            if (i == o._lastDownSEIndex + 1) {
               o._mapDownSEArray[i].start();
               o._lastDownSEIndex++;
            }

            fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
            if (fallPercentage > 1) {
               fallPercentage = 1;
            }
         }
         frm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         frm.updateForce();
         brm.tz = o.riseDistance() * (1 - risePercentage) - o.fallDistance() * (1 - fallPercentage);
         brm.updateForce();
      }

      idxCap = idxCap > o._provinceArray.length - 1 ? o._provinceArray.length - 1 : parseInt(idxCap);
      if (o._lastEnterSEIndex != idxCap) {
         o._mapEnterSEArray[idxCap].start();
         o._lastEnterSEIndex = idxCap;
      }
      
   }
   
   //==========================================================
   // <T>鼠标经过处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      ////检查时间间隔避免频繁调用开销较大的射线检测
      //var now = new Date();
      //if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
      //   return;
      //}
      ////得到当前鼠标指向的对象
      ////TODO:canvas改到某一Console中
      //var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      //var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      ////判断是否是之前指向的对象
      //if (o.mouseOverRiseRenderable() != renderable) {
      //   //将之前指向的对象放入下降集合
      //   if (o.mouseOverRiseRenderable()) {
      //      o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
      //   }
      //   //改变指向的对象
      //   o.setMouseOverRiseRenderable(renderable);
      //   //新指向的对象如在下降集合中则移除
      //   if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
      //   	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
      //   }
      //}
   }
   
   //==========================================================
   // <T>鼠标经过动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      //for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
      //   var renderable = o.mouseOverFallArray().at(i);
      //   var matrix = renderable.matrix();
      //   if (matrix.ty > o.riseDistance() - o.fallDistance()) {
      //   	matrix.ty -= 1;
      //   }
      //   else {
      //   	matrix.ty = o.riseDistance() - o.fallDistance();
      //   	o.mouseOverFallArray().erase(i);
      //   }
      //   matrix.updateForce();
      //}
      
      //if (o.mouseOverRiseRenderable()) {
      //   var riseMatrix = o.mouseOverRiseRenderable().matrix();
      //   if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
      //   	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
      //   	riseMatrix.updateForce();
      //   }
      //}	
   }
   
   //==========================================================
   // <T>集团分公司数据获取处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      //var content = event.content;
      //var branchCount = new Object();
      //for (var i = 0; i < content.collection.length; i++) {
      //   if(!branchCount[content.collection[i].province_id]){
      //      if(content.collection[i].province_id == null)
      //      {
      //         //debugger;
      //      }
      //      branchCount[content.collection[i].province_id] = 1;
      //   }
      //   else{
      //      branchCount[content.collection[i].province_id]++;
      //      if (content.collection[i].province_id == null) {
      //         content.collection[i].label;
      //         //debugger;
      //      }
      //   }
      //}
      
      //var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      //var dict = logicConsole.organization().dict();
      //var colors = logicConsole.organization().provinceColors();
      //for(var i = 0; i < dict.count(); i++){
      //   var bc = branchCount[dict.name(i)];
      //   if (!bc) {
      //      bc = 0;
      //   }
      //   var meshIdx = dict.valueAt(i);
      //   if (meshIdx < 0) {
      //      continue;
      //   }
      //   var renderable = o.template().sprite().renderables().at(meshIdx);
      //   var ambientColor = renderable.material().info().ambientColor;
      //   var diffuseColor = renderable.material().info().diffuseColor;
      //   var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		// ambientColor.assign(colors.at(colorLv));
      //   //diffuseColor.assign(colors.at(colorLv));
      //   renderable.material().update();
      //}
      
   }
   
   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
      //var region = o.template().region();
      //var camera = region.camera();
      ////得到当前鼠标指向的对象
      ////TODO:canvas改到某一Console中
      //var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      //var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      //if (!renderable) {
      //   camera.setPosition(3, 24, -0.5);
      //   camera.update();
      //   return;
      //}
      
      //var outline = renderable.calculateOutline();
      //var relativeOutline = new SOutline3d();
      //relativeOutline.calculateFrom(outline, camera.matrix());
      //var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
      //var currentCenter = outline.center;
      //var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
      //var cameraPosition = camera.position();
      
      //o.setStartTime(new Date());
      //o.cameraFrom().assign(cameraPosition);
      //o.cameraTo().assign(cameraTo);
      //o.setCameraMoving(true);
   }
   
   //==========================================================
   // <T>选取省份后镜头移动动画。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
      //var now = new Date();
      //var timePassed = now.getTime() - o._startTime;
      //var p = timePassed / o.cameraMoveDuration();
      //if (p >= 1) {
      //   p = 1;
      //   o.setCameraMoving(false);
      //}
      ////p = p*p;
      ////p = p > 0.5 ? 1-2*(1-p)*(1-p) : 2*p*p;
      //p = 1-(1-p)*(1-p);
      //var movingPosition = new SPoint3();
      //movingPosition.slerp(o.cameraFrom(), o.cameraTo(), p);
      //var camera = o.template().region().camera();
      //camera.position().assign(movingPosition);
      //camera.update();
      
      //var sprite = o.template().sprite();
      //for (var i = 0; i < sprite.renderables().count(); i++){
      //   var renderable = sprite.renderables().at(i);
      //   if (renderable != o.mouseOverRiseRenderable()) {
      //      renderable.material().info().alphaRate = 1.5 - p;
      //      renderable.material().update();
      //   }
      //}
   }
   
}