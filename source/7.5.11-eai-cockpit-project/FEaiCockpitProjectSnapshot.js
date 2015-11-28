//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitProjectSnapshot = function FEaiCockpitProjectSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._name                 = 'cockpit.project.snapshot';
   o._backgroundUri        = '{eai.resource}/cockpit/project/ground.png';
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._listBox              = null;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._startFlag            = true;
   // @attribute
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitProjectSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitProjectSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitProjectSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitProjectSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitProjectSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitProjectSnapshot_dispose;
   return o;
}

//==========================================================
// <T>获取项目进度数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectSnapshot_onDataFetch = function FEaiCockpitProjectSnapshot_onDataFetch(event) {
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
      if(o._startFlag) {
         listBox.setAnimationPlaying(true);
         o._startFlag = false;
      }else {
         listBox.setAnimationPlaying(false);
      }
      
      o.dirty();
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectSnapshot_onPaintBegin = function FEaiCockpitProjectSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectSnapshot_construct = function FEaiCockpitProjectSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(3, 6);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitProjectMessage);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectSnapshot_setup = function FEaiCockpitProjectSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建控件
   var listBox = o._listBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(5);
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
MO.FEaiCockpitProjectSnapshot_processLogic = function FEaiCockpitProjectSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if (o._dataTicker.process()) {
      var project = MO.Console.find(MO.FEaiLogicConsole).cockpit().project();
      project.doFetch(o, o.onDataFetch);
   }
   if (o._listBox.animationPlaying()) {
      o.dirty();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectSnapshot_dispose = function FEaiCockpitProjectSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
