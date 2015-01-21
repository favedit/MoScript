//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMainWorkspace(o){
   o = RClass.inherits(this, o, FWorkspace);
   //..........................................................
   // @attribute
   o._framesetMain   = null;
   o._framesetBody   = null;
   // @attribute
   o._frameToolBar   = null;
   o._frameBody      = null;
   o._frameProperty  = null;
   // @attribute
   o._frameCatalog   = null;
   o._frameWorkspace = null;
   o._frameStatusBar = null;
   //..........................................................
   // @process
   o.oeBuild         = FDsMainWorkspace_oeBuild;
   //..........................................................
   // @method
   o.construct       = FDsMainWorkspace_construct;
   // @method
   o.dispose         = FDsMainWorkspace_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMainWorkspace_construct(){
   var o = this;
   o.__base.FWorkspace.construct.call(o);
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FDsMainWorkspace_oeBuild(e){
   var o = this;
   o.__base.FWorkspace.oeBuild.call(o, e);
   // 事件前处理
   if(e.isBefore()){
      // 建立主框架
      var fs = o._framesetMain = RClass.create(FFrameSet);
      fs.process(e);
      // 建立工具区
      var f = o._frameToolBar = RClass.create(FFrame);
      f.setHeight(24);
      f.psBuild(document);
      f._hContainer.style.backgroundImage = '-webkit-gradient(linear, 0 0, 0 100%, color-stop(0, #AEAEAE), color-stop(1, #555555))';
      f._hContainer.style.borderBottom = '1px solid #999999';
      fs.appendFrame(f);
      // 建立内容区
      var f = o._frameBody = RClass.create(FFrame);
      f.process(e);
      f._hContainer.style.backgroundColor = 'green';
      fs.appendFrame(f);
      // 建立状态区
      var f = o._frameProperty = RClass.create(FFrame);
      f.setHeight(18);
      f.process(e);
      f._hContainer.style.backgroundImage = '-webkit-gradient(linear, 0 0, 0 100%, color-stop(0, #555555), color-stop(1, #AEAEAE))';
      f._hContainer.style.borderTop = '1px solid #999999';
      fs.appendFrame(f);
      fs.setPanel(o._hContainer);
      //..........................................................
      // 建立内容框架
      var fs = RClass.create(FFrameSet);
      fs._directionCd = EDirection.Horizontal;
      fs.process(e);
      // 建立目录区
      var f = o._frameCatalog = RClass.create(FFrame);
      f.setWidth(200);
      f.process(e);
      f._hContainer.style.backgroundColor = '#444444';
      fs.appendFrame(f);
      // 建立分割符
      var sp1 = fs.appendSpliter();
      // 建立工作区
      var f = o._frameWorkspace = RClass.create(FFrame);
      f.process(e);
      f._hContainer.style.backgroundColor = '#666666';
      fs.appendFrame(f);
      // 建立分割符
      var sp2 = fs.appendSpliter();
      // 建立属性区
      var f = o._frameStatusBar = RClass.create(FFrame);
      f.setWidth(360);
      f.process(e);
      f._hContainer.style.backgroundColor = '#444444';
      fs.appendFrame(f);
      fs.setPanel(o._frameBody._hContainer);
      // 设置分割
      sp1._hSize = o._frameCatalog._hContainer.parentElement;
      sp2._hSize = o._frameStatusBar._hContainer.parentElement;
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMainWorkspace_dispose(){
   var o = this;
   // 父处理
   o.__base.FWorkspace.dispose.call(o);
}
