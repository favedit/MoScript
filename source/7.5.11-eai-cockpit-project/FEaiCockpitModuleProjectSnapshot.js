//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot = function FEaiCockpitModuleProjectSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._listBox              = null;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleProjectSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleProjectSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleProjectSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleProjectSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleProjectSnapshot_processLogic;
   o.onDataFetch           = MO.FEaiCockpitModuleProjectSnapshot_onDataFetch;
   // @method
   o.dispose               = MO.FEaiCockpitModuleProjectSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_onImageLoad = function FEaiCockpitModuleProjectSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_onPaintBegin = function FEaiCockpitModuleProjectSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawImage(o._backgroundImage, left, top, width, height);

   //graphic.drawRectangle(left, top, width, height, 'red', 1);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_construct = function FEaiCockpitModuleProjectSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(3, 6);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitDataProject);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_setup = function FEaiCockpitModuleProjectSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/project/ground.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建控件
   var listBox = o._listBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(5);
   //listBox.setPadding(15, 10, 15, 10);
   listBox.setLocation(20, 55);
   listBox.setSize(330, 660);
   listBox.setGap(10);
   o.push(listBox);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_processLogic = function FEaiCockpitModuleProjectSnapshot_processLogic(){
   var o = this;
   if (o._dataTicker.process()) {
      var project = MO.Console.find(MO.FEaiLogicConsole).cockpit().project();
      project.doFetch(o, o.onDataFetch);
   }
   if (o._listBox.animationPlaying()) {
      o.dirty();
   }
}

//==========================================================
// <T>获取项目进度数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_onDataFetch = function FEaiCockpitModuleProjectSnapshot_onDataFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   var listBox = o._listBox;
   var data = o._data;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      var projects = data.projects();
      var count = projects.count();
      listBox.clear();
      for (var i = 0; i < count ; i++) {
         var item = MO.Class.create(MO.FEaiCockpitProjectListBoxItem);
         item.setup(projects.at(i));
         item.setSize(320, 120);
         listBox.push(item);
      }
      listBox.setStartTick(MO.Timer.current());
      listBox.setAnimationPlaying(true);
      o.dirty();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectSnapshot_dispose = function FEaiCockpitModuleProjectSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
