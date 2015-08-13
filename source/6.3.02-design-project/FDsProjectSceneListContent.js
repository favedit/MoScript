with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsProjectSceneListContent = function FDsProjectSceneListContent(o){
      o = MO.Class.inherits(this, o, FDuiListView);
      //..........................................................
      // @attribute
      o._activeItem       = null;
      o._activeGuid       = null;
      // @attribute
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsProjectSceneListContent_onBuilded;
      // @event
      o.onServiceLoad     = FDsProjectSceneListContent_onServiceLoad;
      //..........................................................
      // @method
      o.construct         = FDsProjectSceneListContent_construct;
      // @method
      o.doClickItem       = FDsProjectSceneListContent_doClickItem;
      o.doDoubleClickItem = FDsProjectSceneListContent_doDoubleClickItem;
      o.serviceList       = FDsProjectSceneListContent_serviceList;
      o.serviceRelist     = FDsProjectSceneListContent_serviceRelist;
      // @method
      o.dispose           = FDsProjectSceneListContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneListContent_onBuilded = function FDsProjectSceneListContent_onBuilded(p){
      var o = this;
      o.__base.FDuiListView.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._saveButton.addClickListener(o, o.onSaveClick);
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsProjectSceneListContent_onServiceLoad = function FDsProjectSceneListContent_onServiceLoad(event){
      var o = this;
      var xitems = event.root.findNode('SceneCollection');
      // 显示项目
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Scene')){
            var item = o.createItem(FDsProjectSceneListItem);
            item.propertyLoad(xnode);
            item._guid = xnode.get('guid');
            item._code = xnode.get('code');
            item._updateDate = xnode.get('update_date');
            item.setLabel(MO.Lang.String.nvl(xnode.get('label'), xnode.get('code')));
            item.refreshStyle();
            o.push(item);
         }
      }
      // 画面允许操作
      MO.Console.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneListContent_construct = function FDsProjectSceneListContent_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.construct.call(o);
      //o._frameSet.selectObject(control);
   }

   //==========================================================
   // <T>点击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsProjectSceneListContent_doClickItem = function FDsProjectSceneListContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
      // 设置属性
      var guid = control._guid;
      o._activeItem = control;
      // 选中项目
      //var canvas = o._frameSet._canvasContent;
      //canvas.loadByGuid(guid);
   }

   //==========================================================
   // <T>双击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsProjectSceneListContent_doDoubleClickItem = function FDsProjectSceneListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control)
      // 设置属性
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
      // 画面切换
      //var workspace = o._frameSet._workspace;
      //var typeCd = control._typeCd;
      //if(typeCd == 'Bitmap'){
      //   workspace.selectFrameSet(EDsFrameSet.BitmapFrameSet, guid);
      //}else if(typeCd == 'Mesh3d'){
      //   workspace.selectFrameSet(EDsFrameSet.MeshFrameSet, guid);
      //}else{
      //   throw new TError(o, 'Unsupport format.');
      //}
   }

   //==========================================================
   // <T>服务列表处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsProjectSceneListContent_serviceList = function FDsProjectSceneListContent_serviceList(guid){
      var o = this;
      o._activeGuid = guid;
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showLoading();
      // 发送数据请求
      var url = '/cloud.solution.project.ws?action=listProject&project_guid=' + guid;
      var connection = MO.Console.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onServiceLoad);
      return connection;
   }

   //==========================================================
   // <T>服务列表处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsProjectSceneListContent_serviceRelist = function FDsProjectSceneListContent_serviceRelist(){
      var o = this;
      return o.serviceList(o._activeGuid);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneListContent_dispose = function FDsProjectSceneListContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.dispose.call(o);
   }
}
