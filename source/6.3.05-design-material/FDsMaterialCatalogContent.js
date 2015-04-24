//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMaterialCatalogContent(o){
   o = RClass.inherits(this, o, FUiListView);
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
   o.onBuilded         = FDsMaterialCatalogContent_onBuilded;
   // @event
   o.onServiceLoad     = FDsMaterialCatalogContent_onServiceLoad;
   //..........................................................
   // @method
   o.construct         = FDsMaterialCatalogContent_construct;
   // @method
   o.doClickItem       = FDsMaterialCatalogContent_doClickItem;
   o.doDoubleClickItem = FDsMaterialCatalogContent_doDoubleClickItem;
   o.serviceList       = FDsMaterialCatalogContent_serviceList;
   // @method
   o.dispose           = FDsMaterialCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMaterialCatalogContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
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
function FDsMaterialCatalogContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('ImageCollection');
   // 显示项目
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Image')){
         var item = o.createItem(FDsMaterialCatalogItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   // 画面允许操作
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMaterialCatalogContent_construct(){
   var o = this;
   // 父处理
   o.__base.FUiListView.construct.call(o);
   //o._frameSet.selectObject(control);
}

//==========================================================
// <T>点击一个列表项目。</T>
//
// @method
// @param control:FUiListViewItem 列表项目
//==========================================================
function FDsMaterialCatalogContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   // 设置属性
   var guid = control._guid;
   o._activeItem = control;
   // 选中项目
   var canvas = o._frameSet._canvasContent;
   canvas.loadByGuid(guid);
}

//==========================================================
// <T>双击一个列表项目。</T>
//
// @method
// @param control:FUiListViewItem 列表项目
//==========================================================
function FDsMaterialCatalogContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
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
function FDsMaterialCatalogContent_serviceList(guid){
   var o = this;
   // 画面禁止操作
   //RConsole.find(FUiDesktopConsole).showLoading();
   // 发送数据请求
   //var url = '/cloud.content2d.bitmap.image.ws?action=list&guid=' + guid;
   //var connection = RConsole.find(FXmlConsole).sendAsync(url);
   //connection.addLoadListener(o, o.onServiceLoad);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiListView.dispose.call(o);
}
