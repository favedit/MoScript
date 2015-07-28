with(MO){
   //==========================================================
   // <T>场景相机属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsSolutionProjectProperty = function FDsSolutionProjectProperty(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible          = false;
      // @attribute
      o._workspace        = null;
      o._activeSpace      = null;
      o._activeCamera     = null;
      // @attribute
      o._controlGuid      = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._controlPosition  = null;
      o._controlDirection = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsSolutionProjectProperty_onBuilded;
      o.onDataChanged     = FDsSolutionProjectProperty_onDataChanged;
      o.onLoadProject     = FDsSolutionProjectProperty_onLoadProject;
      //..........................................................
      // @method
      o.construct         = FDsSolutionProjectProperty_construct;
      // @method
      o.loadObject        = FDsSolutionProjectProperty_loadObject;
      // @method
      o.dispose           = FDsSolutionProjectProperty_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionProjectProperty_onBuilded = function FDsSolutionProjectProperty_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 增加对象
      //o._controlPosition.addDataChangedListener(o, o.onDataChanged);
      //o._controlDirection.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSolutionProjectProperty_onDataChanged = function FDsSolutionProjectProperty_onDataChanged(p){
      var o = this;
      var camera = o._activeCamera;
      var resource = camera.resource();
      resource.position().assign(o._controlPosition.get());
      resource.direction().assign(o._controlDirection.get());
      camera.position().assign(resource.position());
      camera.direction().assign(resource.direction());
      camera.update();
   }

   //==========================================================
   // <T>加载信息处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSolutionProjectProperty_onLoadProject = function FDsSolutionProjectProperty_onLoadProject(event){
      var o = this;
      var xproject = event.root.findNode('Project');
      o._controlCode.set(xproject.get('code'));
      o._controlLabel.set(xproject.get('label'));
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionProjectProperty_construct = function FDsSolutionProjectProperty_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载相机材质信息。</T>
   //
   // @method
   // @param camera:FE3dSpace 空间
   // @param camera:FE3dCamera 相机
   //==========================================================
   MO.FDsSolutionProjectProperty_loadObject = function FDsSolutionProjectProperty_loadObject(control){
      var o = this;
      var guid = control._guid;
      // 设置参数
      o._controlGuid.set(guid);
      // 发送数据请求
      var connection = RConsole.find(FDrProjectConsole).doQuery(guid);
      connection.addLoadListener(o, o.onLoadProject);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionProjectProperty_dispose = function FDsSolutionProjectProperty_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
