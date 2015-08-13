with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsSolutionPropertyToolBar = function FDsSolutionPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName           = 'resource.solution.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      //..........................................................
      // @event
      o.onBuilded            = FDsSolutionPropertyToolBar_onBuilded;
      // @event
      o.onUpdateClick        = FDsSolutionPropertyToolBar_onUpdateClick;
      //..........................................................
      // @method
      o.construct            = FDsSolutionPropertyToolBar_construct;
      // @method
      o.dispose              = FDsSolutionPropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionPropertyToolBar_onBuilded = function FDsSolutionPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 按键事件关联
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   }

   //==========================================================
   // <T>更新按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSolutionPropertyToolBar_onUpdateClick = function FDsSolutionPropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionPropertyToolBar_construct = function FDsSolutionPropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionPropertyToolBar_dispose = function FDsSolutionPropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
