//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMainToolBar(o){
   o = RClass.inherits(this, o, FToolBar);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.oeBuild   = FDsMainToolBar_oeBuild;
   //..........................................................
   // @method
   o.construct = FDsMainToolBar_construct;
   // @method
   o.dispose   = FDsMainToolBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FDsMainToolBar_oeBuild(e){
   var o = this;
   o.__base.FToolBar.oeBuild.call(o, e);
   // 事件前处理
   if(e.isBefore()){
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('文件');
      b.setIcon('design.menu.build');
      b.process(e);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('保存');
      b.setIcon('design.menu.save');
      b.process(e);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FToolButton);
      b.setLabel('帮助');
      b.setIcon('design.menu.help');
      b.process(e);
      o.appendButton(b);
   }
   return EEventStatus.Continue;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMainToolBar_construct(){
   var o = this;
   o.__base.FToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMainToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FToolBar.dispose.call(o);
}
