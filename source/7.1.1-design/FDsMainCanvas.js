//==========================================================
// <T>主画板。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMainCanvas(o){
   o = RClass.inherits(this, o, FCanvas);
   //..........................................................
   o._context   = null;
   o._stage     = null;
   o._layer     = null;
   o._activeModel = null;
   o._rotationX = 0;
   o._rotationY = 0;
   o._rotationZ = 0;
   //..........................................................
   // @event
   o.onBuild      = FDsMainCanvas_onBuild;
   o.onEnterFrame = FDsMainCanvas_onEnterFrame;
   o.onThemeLoad  = FDsMainCanvas_onThemeLoad;
   //..........................................................
   o.oeRefresh    = FDsMainCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct    = FDsMainCanvas_construct;
   // @method
   o.selectModel  = FDsMainCanvas_selectModel;
   // @method
   o.dispose      = FDsMainCanvas_dispose;
   return o;
}

function FDsMainCanvas_onEnterFrame(){
   var o = this;
   // 旋转模型
   var m = o._activeModel;
   if(m){
      m.location().set(0, -6.0, 0);
      m.rotation().set(0, o._rotationY, 0);
      m.scale().set(2, 2, 2);
      m.update();
      // 设置变量
      o._rotationX += 0.01;
      o._rotationY += 0.01;
      o._rotationZ += 0.03;
   }
   // 设置帧速
   //var info = RTimer.rate() + ' f/s';
   //if(info != _info.innerText){
   //   _info.innerText = RTimer.rate() + ' f/s';
   //}
}
//----------------------------------------------------------
function FDsMainCanvas_onThemeLoad(){
   var o = this;
   var hCanvas = o._hPanel;
   hCanvas.width = o._hParent.offsetWidth;
   hCanvas.height = o._hParent.offsetHeight;
   o._context = REngine3d.createContext(FWglContext, hCanvas);

   var g = o._stage = RClass.create(FSimpleStage3d);
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o._context, FG3dGeneralTechnique);
   //RDump.dump(stage, _dump);

   o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
   // 设置相机
   var rc = o._stage.camera();
   rc.setPosition(0, 3, -20);
   rc.lookAt(0, 0, 0);
   rc.update();
   // 设置光源
   o._stage.directionalLight().direction().set(0.7, -0.7, 0);
   // 设置投影
   var rp = o._stage.camera().projection();
   rp.size().set(hCanvas.width, hCanvas.height);
   rp.update();
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start();
}


//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsMainCanvas_onBuild(p){
   var o = this;
   o.__base.FCanvas.onBuild.call(o, p);
   // 加载主题
   var tc = RConsole.find(FE3sThemeConsole);
   var m = tc.select('color');
   m.loadListener().register(o, o.onThemeLoad);
}

function FDsMainCanvas_oeRefresh(p){
   var o = this;
   o.__base.FCanvas.oeRefresh.call(o, p);
   // 设置投影
   //var hCanvas = o._hPanel;
   //var rp = o._stage.camera().projection();
   //rp.size().set(hCanvas.width, hCanvas.height);
   //rp.update();
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMainCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
}

//==========================================================
function FDsMainCanvas_selectModel(p){
   var o = this;
   var rmc = RConsole.find(FModel3dConsole);
   if(o._activeModel != null){
      rmc.free(o._activeModel);
   }
   var m = rmc.alloc(o._context, p);
   o._layer.pushDisplay(m);
   o._activeModel = m;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMainCanvas_dispose(){
   var o = this;
   // 父处理
   o.__base.FCanvas.dispose.call(o);
}
