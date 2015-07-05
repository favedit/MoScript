//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._readyProvince        = false;
   // @attribute
   o._nowDate              = null;
   o._nowTicker            = null;
   // @attribute
   o._mapEntity            = MO.Class.register(o, new MO.AGetter('_mapEntity'));
   o._countryData          = null;
   // @attribute
   o._countryBorderDisplay = null;
   o._countryDisplay       = null;
   o._citysRangeRenderable = null;
   o._citysRenderable      = null;
   // @attribute
   o._logoBar              = null;
   o._titleBar             = null;
   // @attribute
   o._flagSprite           = null;
   o._groundAutioUrl       = '/script/ars/eai/ground.mp3';
   o._groundAutio          = null;
   //..........................................................
   // @event
   o.onLoadData            = MO.FEaiChartScene_onLoadData;
   o.onLoadTemplate        = MO.FEaiChartScene_onLoadTemplate;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartScene_construct;
   // @method
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   // @method
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
   o.processResize         = MO.FEaiChartScene_processResize;
   o.process               = MO.FEaiChartScene_process;
   o.deactive              = MO.FEaiChartScene_deactive;
   // @method
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var countryDisplay = o._countryDisplay;
   var countryBorderDisplay = o._countryBorderDisplay;
   //..........................................................
   // 创建省份实体
   var mapEntity = o._mapEntity;
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provinceEntityConsole = MO.Console.find(MO.FEaiEntityConsole).provinceConsole();
   var provinceEntities = mapEntity.provinceEntities();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      // 创建实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setMapEntity(mapEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      provinceEntities.set(province.code(), provinceEntity);
      provinceEntityConsole.push(provinceEntity);
      // 放入显示层
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   o._readyProvince = true;
   // 初始化地图动画
   o._mapEntity.countryEntity().setup(provinceEntities);
   // 重置画面大小
   o.processResize();
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_onLoadTemplate = function FEaiChartScene_onLoadTemplate(event){
   var o = this;
   var template = event.template;
   //var sprite = o._flagSprite = template.sprite();
   //var matrix = sprite.matrix();
   //matrix.tx = -20;
   //matrix.ty = 0;
   //matrix.setScaleAll(0.06);
   //matrix.updateForce();
   //o._activeStage.dataLayer().push(sprite);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   // 创建属性
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(10000);
   o._mapEntity = MO.Class.create(MO.FEaiMapEntity);
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -35;
   matrix.ty = -12.3;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var context = o.graphicContext();
   var contextSize = context.size();
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   // 创建地图容器
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   // 创建背景
   //var control = o._background = MO.Class.create(MO.FGuiPicture);
   //control.linkGraphicContext(o);
   //control.size().assign(MO.Eai.Canvas.screenSize());
   //control.size().set(1920, 1080);
   //control.setBackResource('url:/script/ars/eai/background.png');
   //control.psInitialize();
   //control.build();
   //control.renderable().setOptionFull(true);
   //o._guiManager.register(control);
   //stage.groundLayer().push(control);
   //..........................................................
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRangeRenderable.matrix());
   stage.cityRangeLayer().push(citysRangeRenderable);
   o._mapEntity.setCitysRangeRenderable(citysRangeRenderable);
   // 创建城市渲染对象
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRenderable.matrix());
   stage.cityLayer().push(citysRenderable);
   o._mapEntity.setCitysRenderable(citysRenderable);
   // 创建城市实体
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntities = o._mapEntity.cityEntities();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      // 创建实体
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setStage(o._activeStage);
      cityEntity.setRenderable(citysRenderable);
      cityEntity.setData(city);
      cityEntity.build(context);
      cityEntities.set(city.code(), cityEntity);
      // 放入渲染对象
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
      cityEntityConsole.push(cityEntity);
   }
   // 上传数据
   citysRenderable.setup();
   citysRenderable.upload();
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   //..........................................................
   // 显示左上
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(0, 10);
   o._guiManager.register(frame);
   //..........................................................
   // 加载背景音乐
   var audio = o._groundAutio = MO.Class.create(MO.FAudio);
   audio.loadUrl(o._groundAutioUrl);
   audio.setVolume(0.1);
   audio.play();
   //..........................................................
   // 加载标志
   //var templateConsole = MO.Console.find(MO.FE3dTemplateConsole);
   //template = templateConsole.allocByCode(o, 'eai.flag.ezubao');
   //template.addLoadListener(o, o.onLoadTemplate);
   //..........................................................
   // 加载数据
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}

//==========================================================
// <T>重置时间。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_resetDate = function FEaiChartScene_resetDate(){
   var o = this;
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_processResize = function FEaiChartScene_processResize(){
   var o = this;
   o.__base.FEaiScene.processResize.call(o);
   // 重新设置矩阵
   o.fixMatrix(o._countryDisplay.matrix());
   o.fixMatrix(o._countryBorderDisplay.matrix());
   o.fixMatrix(o._citysRangeRenderable.matrix());
   o.fixMatrix(o._citysRenderable.matrix());
   // 设置大小
   var frame = o._logoBar;
   if(MO.RBrowser.isOrientationVertical()){
      //frame.setLocation(0, 10);
      //frame.setScale(0.8, 0.8);
   }else{
      //frame.setLocation(0, 10);
      //frame.setSize(1, 1);
   }
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_process = function FEaiChartScene_process(){
   var o = this;
   o.__base.FEaiScene.process.call(o);
   // 更新精灵
   //if(o._flagSprite){
   //   var matrix = o._flagSprite.matrix();
   //   matrix.ry += 0.005;
   //   matrix.updateForce();
   //}
   // 更新时间
   if(o._nowTicker.process()){
      var bar = o._logoBar;
      var date = o._nowDate;
      date.setNow();
      var dateControl = bar.findComponent('date');
      dateControl.setLabel(date.format('YYYY/MM/DD'));
      var timeControl = bar.findComponent('time');
      timeControl.setLabel(date.format('HH24:MI'));
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._nowDate = RObject.dispose(o._nowDate);
   o._nowTicker = RObject.dispose(o._nowTicker);
   o._mapEntity = RObject.dispose(o._mapEntity);
   // 父处理
   o.__base.FEaiScene.dispose.call(o);
}
