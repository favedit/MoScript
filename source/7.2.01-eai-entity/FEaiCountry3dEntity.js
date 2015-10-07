//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiCountry3dEntity = function FEaiCountry3dEntity(o){
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
   // @method
   o.construct                = MO.FEaiCountry3dEntity_construct;
   // @method
   o.setup                    = MO.FEaiCountry3dEntity_setup;
   o.build                    = MO.FEaiCountry3dEntity_build;
   o.provinceShowOrderSort    = MO.FEaiCountry3dEntity_provinceShowOrderSort;
   o.setupProvinces           = MO.FEaiCountry3dEntity_setupProvinces;
   // @method
   o.loadData                 = MO.FEaiCountry3dEntity_loadData;
   o.loadResource             = MO.FEaiCountry3dEntity_loadResource;
   // @method
   o.start                    = MO.FEaiCountry3dEntity_start;
   o.process                  = MO.FEaiCountry3dEntity_process;
   o.processLoad              = MO.FEaiCountry3dEntity_processLoad;
   o.introAnime               = MO.FEaiCountry3dEntity_introAnime;
   o.mouseOverFallAnime       = MO.FEaiCountry3dEntity_mouseOverFallAnime;
   o.isReady                  = MO.FEaiCountry3dEntity_isReady;
   // @method
   o.dispose                  = MO.FEaiCountry3dEntity_dispose;
   return o;
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_construct = function FEaiCountry3dEntity_construct(){
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
MO.FEaiCountry3dEntity_setup = function FEaiCountry3dEntity_setup() {
   var o = this;
   // 创建边界形状
   var shape = o._boundaryShape = MO.Class.create(MO.FE3dBoundaryShape3d);
   shape._name = 'country';
   shape._entity = o;
   shape.linkGraphicContext(o);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_build = function FEaiCountry3dEntity_build(){
   var o = this;
   // 创建平面形状
   var shape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   shape._entity = o;
   shape.linkGraphicContext(o);
   // 创建边框形状
   var shape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   shape._entity = o;
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
MO.FEaiCountry3dEntity_setupProvinces = function FEaiCountry3dEntity_setupProvinces() {
   var o = this;
   var provinceEntities = o._provinceEntities;
   var count = provinceEntities.count();
   var provinceArray = o._provinceArray = new Array(count);
   for(var i = 0; i < count; i++){
      provinceArray[i] = provinceEntities.at(i);
   }
   provinceArray.sort(o.provinceShowOrderSort);
}

//==========================================================
// <T>加载数据。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_loadData = function FEaiCountry3dEntity_loadData(data){
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
   //shape.faceRenderable().color().setHex('#0A5294');
   //shape.borderRenderable().color().setHex('#0A5294');
}

//==========================================================
// <T>加载资源数据。</T>
//
// @method
// @param resource:FResource 资源对象
//==========================================================
MO.FEaiCountry3dEntity_loadResource = function FEaiCountry3dEntity_loadResource(resource){
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
   //var provinceEntityModule = MO.Console.find(MO.FEaiEntityConsole).provinceModule();
   var provincesData = data.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      var provinceData = provincesData.at(i);
      var provinceCode = provinceData.code();
      var provinceResource = provinceModule.findByCode(provinceCode);
      MO.Assert.debugNotNull(provinceResource);
      // 创建省份实体
      var provinceEntity = MO.Class.create(MO.FEaiProvince3dEntity);
      provinceEntity._countryEntity = o;
      provinceEntity.linkGraphicContext(o);
      provinceEntity.setup();
      provinceEntity.setResource(provinceResource);
      provinceEntity.setData(provinceData);
      provinceEntity.build(o);
      provinceEntities.set(provinceCode, provinceEntity);
      //provinceEntityModule.push(provinceEntity);
      // 增加到融合渲染对象
      var boundaryShape = provinceEntity.boundaryShape();
      faceShape.pushMergeRenderable(boundaryShape.faceRenderable());
      borderShape.pushMergeRenderable(boundaryShape.borderRenderable());
   }
   faceShape.build();
   borderShape.build();
   //..........................................................
   o.setupProvinces(provinceEntities);
   //MO.Console.find(MO.FEaiEntityConsole).cityModule().linkProvinces();
}

//==========================================================
// <T>音频加载完成。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_isReady = function FEaiCountry3dEntity_isReady() {
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
MO.FEaiCountry3dEntity_provinceShowOrderSort = function FEaiCountry3dEntity_provinceShowOrderSort(p1, p2) {
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
MO.FEaiCountry3dEntity_start = function FEaiCountry3dEntity_start(){
   this._startTime = MO.Timer.current();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_process = function FEaiCountry3dEntity_process() {
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
MO.FEaiCountry3dEntity_processLoad = function FEaiCountry3dEntity_processLoad(){
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCountry3dEntity_dispose = function FEaiCountry3dEntity_dispose(){
   var o = this;
   // 创建边框
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
