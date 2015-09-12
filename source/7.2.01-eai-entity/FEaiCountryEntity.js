//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiCountryEntity = function FEaiCountryEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @property
   //o._startDelay            = MO.Class.register(o, new MO.APtyInteger('_startDelay'), 0);
   //o._riseDuration          = MO.Class.register(o, new MO.APtyNumber('_riseDuration'), 1200);
   //o._riseDistance          = MO.Class.register(o, new MO.APtyNumber('_riseDistance'), 2050);
   //o._fallDuration          = MO.Class.register(o, new MO.APtyNumber('_fallDuration'), 400);
   //o._fallDistance          = MO.Class.register(o, new MO.APtyNumber('_fallDistance'), 50);
   //o._blockInterval         = MO.Class.register(o, new MO.APtyNumber('_blockInterval'), 60);
   //o._mouseOverRiseHeight   = MO.Class.register(o, new MO.APtyNumber('_mouseOverRiseHeight'), 10);
   o._enterSELoaded           = false;
   //o._downSELoaded            = false;
   o._enterSEPlaying          = false;
   o._cameraDirection         = MO.Class.register(o, new MO.AGetSet('_cameraDirection'));
   o._startDelay              = MO.Class.register(o, new MO.AGetSet('_startDelay'), 0);
   o._riseDuration            = MO.Class.register(o, new MO.AGetSet('_riseDuration'), 5000);
   o._riseDistance            = MO.Class.register(o, new MO.AGetSet('_riseDistance'), 600);
   o._fallDuration            = MO.Class.register(o, new MO.AGetSet('_fallDuration'), 200);
   o._fallDistance            = MO.Class.register(o, new MO.AGetSet('_fallDistance'), 3);
   o._blockInterval           = MO.Class.register(o, new MO.AGetSet('_blockInterval'), 200);
   o._mouseOverRiseHeight     = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseHeight'), 3);
   o._mouseMoveCheckInterval  = MO.Class.register(o, new MO.AGetSet('_mouseMoveCheckInterval'), 100);
   o._cameraMoveDuration      = MO.Class.register(o, new MO.AGetSet('_cameraMoveDuration'), 500);
   //..........................................................
   // @attribute
   o._data                    = MO.Class.register(o, new MO.AGetter('_data'));
   o._outline2                = MO.Class.register(o, new MO.AGetter('_outline2'));
   // @attribute
   o._worldEntity             = MO.Class.register(o, new MO.AGetSet('_worldEntity'));
   o._provinceEntities        = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities            = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   // @attribute
   o._boundaryShape           = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._faceShape               = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape             = MO.Class.register(o, new MO.AGetter('_borderShape'));
   // @attribute
   o._provinceArray           = null;
   o._playing                 = false;
   o._lastTick                = 0;
   o._interval                = 10;
   o._template                = MO.Class.register(o, new MO.AGetSet('_template'));
   o._introAnimeDone          = MO.Class.register(o, new MO.AGetSet('_introAnimeDone'), false);
   o._startTime               = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._mouseOverRiseRenderable = MO.Class.register(o, new MO.AGetSet('_mouseOverRiseRenderable'));
   o._mouseOverFallArray      = MO.Class.register(o, new MO.AGetSet('_mouseOverFallArray'));
   o._mouseMoveLastCheck      = MO.Class.register(o, new MO.AGetSet('_mouseMoveLastCheck'));
   o._cameraMoving            = MO.Class.register(o, new MO.AGetSet('_cameraMoving'), false);
   o._cameraFrom              = MO.Class.register(o, new MO.AGetSet('_cameraFrom'));
   o._cameraTo                = MO.Class.register(o, new MO.AGetSet('_cameraTo'));
   //o._audioMapEnterArray         = null;
   //o._mapDownSEArray          = null;
   //o._lastEnterSEIndex        = -1;
   //o._lastDownSEIndex         = -1;
   // @attribute
   o._audioContext            = null;
   o._audioMapEnter           = null;
   //..........................................................
   o.onOrganizationFetch      = MO.FEaiCountryEntity_onOrganizationFetch;
   o.onMouseMove              = MO.FEaiCountryEntity_onMouseMove;
   o.onMouseDown              = MO.FEaiCountryEntity_onMouseDown;
   //..........................................................
   // @method
   o.construct                = MO.FEaiCountryEntity_construct;
   // @method
   o.setup                    = MO.FEaiCountryEntity_setup;
   o.build                    = MO.FEaiCountryEntity_build;
   o.provinceShowOrderSort    = MO.FEaiCountryEntity_provinceShowOrderSort;
   o.setupProvinces           = MO.FEaiCountryEntity_setupProvinces;
   // @method
   o.loadData                 = MO.FEaiCountryEntity_loadData;
   o.loadResource             = MO.FEaiCountryEntity_loadResource;
   // @method
   o.start                    = MO.FEaiCountryEntity_start;
   o.process                  = MO.FEaiCountryEntity_process;
   o.processLoad              = MO.FEaiCountryEntity_processLoad;
   o.introAnime               = MO.FEaiCountryEntity_introAnime;
   o.mouseOverFallAnime       = MO.FEaiCountryEntity_mouseOverFallAnime;
   o.cameraMoveAnime          = MO.FEaiCountryEntity_cameraMoveAnime;
   o.isReady                  = MO.FEaiCountryEntity_isReady;
   // @method
   o.dispose                  = MO.FEaiCountryEntity_dispose;
   return o;
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_construct = function FEaiCountryEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 创建边框
   o._outline2 = new MO.SOutline2d();
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_setup = function FEaiCountryEntity_setup() {
   var o = this;
   // 创建边界形状
   var shape = o._boundaryShape = MO.Class.create(MO.EE3dBoundaryShape);
   shape._countryEntity = o;
   shape.linkGraphicContext(o);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_build = function FEaiCountryEntity_build(){
   var o = this;
   // 创建平面形状
   var shape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   shape._countryEntity = o;
   shape.linkGraphicContext(o);
   // 创建边框形状
   var shape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   shape._countryEntity = o;
   shape.linkGraphicContext(o);
   // 创建声音环境
   var audioContextConsole = MO.Console.find(MO.FAudioContextConsole);
   var audioContext = o._audioContext = audioContextConsole.create();
   o._audioMapEnter = audioContext.createBuffer('{eai.resource}/map_entry/enter.mp3');
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_setupProvinces = function FEaiCountryEntity_setupProvinces() {
   var o = this;
   var provinceEntities = o._provinceEntities;
   for (var i = 0; i < provinceEntities.count(); i++) {
      var provinceEntity = provinceEntities.at(i);
      var fr = provinceEntity.faceRenderable();
      var br = provinceEntity.borderRenderable();
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
}

//==========================================================
// <T>加载数据。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_loadData = function FEaiCountryEntity_loadData(data){
   var o = this;
   o._data = data;
   o._code = data.code();
   var outline = o._outline2;
   outline.setMin();
   // 建立边界数据
   var shape = o._boundaryShape;
   var boundaries = data.boundaries();
   var count = boundaries.count()
   for(var i = 0; i < count; i++){
      // 增加轮廓
      var boundary = boundaries.at(i);
      shape.pushPolygon(boundary);
      // 计算轮廓
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var pi = 0; pi < positionCount; pi++){
         var x = 180 - positions[positionIndex++];
         var y = positions[positionIndex++];
         outline.mergeMax2(x, y);
      }
   }
   outline.update();
   // 建立对象
   shape.build();
}

//==========================================================
// <T>加载资源数据。</T>
//
// @method
// @param resource:FResource 资源对象
//==========================================================
MO.FEaiCountryEntity_loadResource = function FEaiCountryEntity_loadResource(resource){
   var o = this;
   var data = resource.data();
   var provinceEntities = o._provinceEntities;
   var faceShape = o._faceShape;
   var borderShape = o._borderShape;
   //..........................................................
   // 建立边界数据
   o.loadData(data);
   //..........................................................
   // 创建省份实体
   var provinceModule = MO.Console.find(MO.FEaiResourceConsole).provinceModule();
   var provinceEntityModule = MO.Console.find(MO.FEaiEntityConsole).provinceModule();
   var provincesData = data.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var provinceResource = provinceModule.findByCode(provinceCode);
      MO.Assert.debugNotNull(provinceResource);
      // 创建省份实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setResource(provinceResource);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      provinceEntities.set(provinceCode, provinceEntity);
      provinceEntityModule.push(provinceEntity);
      // 增加到融合渲染对象
      var faceRenderable = provinceEntity.faceRenderable();
      faceShape.pushMergeRenderable(faceRenderable);
      var borderRenderable = provinceEntity.borderRenderable();
      borderShape.pushMergeRenderable(borderRenderable);
   }
   faceShape.build();
   borderShape.build();
   //..........................................................
   o.setupProvinces(provinceEntities);
   MO.Console.find(MO.FEaiEntityConsole).cityModule().linkProvinces();
}

//==========================================================
// <T>音频加载完成。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_isReady = function FEaiCountryEntity_isReady() {
   var o = this;
   if(o._audioMapEnter.testFinish()){
      // 记录开始时间
      o._startTime = MO.Timer.current();
      return true;
   }
   //if (o._enterSELoaded && o._downSELoaded) {
   //   ////记录开始时间
   //   o._startTime = MO.Timer.current();
   //   return true;
   //}
   return false;
}

//==========================================================
// <T>省份显示顺序排序。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_provinceShowOrderSort = function FEaiCountryEntity_provinceShowOrderSort(p1, p2) {
   var provinceModule = MO.Console.find(MO.FEaiResourceConsole).provinceModule();
   var p1Res = provinceModule.findByCode(p1.data().code());
   var p2Res = provinceModule.findByCode(p2.data().code())
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
// <T>加载数据处理。</T>
//
// @method
// @return Boolean 处理结果
//==========================================================
MO.FEaiCountryEntity_processLoad = function FEaiCountryEntity_processLoad(){
   var o = this;
   // 检查资源
   var resource = o._resource;
   if(resource.testReady()){
      o.loadResource(resource);
      o._statusReady = true;
      return true;
   }
   return false;
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
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseMove;
         MO.Window.lsnsMouseMove.push(listener);
         var listener = new MO.TListener();
         listener._owner = this;
         listener._callback = o.onMouseDown;
         MO.Window.lsnsMouseDown.push(listener);
         //获取省份数据
         //RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
         //var logicConsole = MO.RConsole.find(FEaiLogicConsole);
         //logicConsole.organization().doFetch(o, o.onOrganizationFetch);
      }
   }

   if (!o._enterSEPlaying) {
      o._audioMapEnter.play(0);
      o._enterSEPlaying = true;
   }
   

   var idxCap = timePassed / o.blockInterval();
   for (var i = 0; i < o._provinceArray.length && i < idxCap; i++) {
      var fr = o._provinceArray[i].faceRenderable();
      var br = o._provinceArray[i].borderRenderable();
      var frm = fr.matrix();
      var brm = br.matrix();
      var risePercentage = (timePassed - o.blockInterval() * i) / (o.riseDuration() - i * i);
      var fallPercentage = 0;
      if (risePercentage > 1) {
         risePercentage = 1;

         //if (i == o._lastDownSEIndex + 1) {
         //   o._mapDownSEArray[i].start();
         //   o._lastDownSEIndex++;
         //}

         fallPercentage = (timePassed - o.blockInterval() * i - (o.riseDuration() - i * i)) / o.fallDuration();
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
   //if (o._lastEnterSEIndex != idxCap) {
   //   o._audioMapEnterArray[idxCap].start();
   //   o._lastEnterSEIndex = idxCap;
   //}
   
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

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryEntity_dispose = function FEaiCountryEntity_dispose(){
   var o = this;
   // 创建边框
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
