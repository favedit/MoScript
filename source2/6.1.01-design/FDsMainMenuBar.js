with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsMainMenuBar = function FDsMainMenuBar(o){
      o = RClass.inherits(this, o, FMenuBar);
      //..........................................................
      // @attribute
      //..........................................................
      // @method
      o.onBuild   = FDsMainMenuBar_onBuild;
      //..........................................................
      // @method
      o.construct = FDsMainMenuBar_construct;
      // @method
      o.dispose   = FDsMainMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMainMenuBar_onBuild = function FDsMainMenuBar_onBuild(p){
      var o = this;
      o.__base.FMenuBar.onBuild.call(o, p);
      // 建立按键
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('文件');
      b.setIcon('design.menu.build');
      b.build(p);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('保存');
      b.setIcon('design.menu.save');
      b.build(p);
      o.appendButton(b);
      // 建立按键
      var b = o._framesetMain = RClass.create(FMenuButton);
      b.setLabel('帮助');
      b.setIcon('design.menu.help');
      b.build(p);
      o.appendButton(b);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainMenuBar_construct = function FDsMainMenuBar_construct(){
      var o = this;
      o.__base.FMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainMenuBar_dispose = function FDsMainMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FMenuBar.dispose.call(o);
   }
}
