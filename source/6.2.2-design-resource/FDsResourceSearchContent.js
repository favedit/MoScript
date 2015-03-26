//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceSearchContent(o){
   o = RClass.inherits(this, o, FUiListView);
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsResourceSearchContent_onBuilded;
   // @event
   o.onServiceLoad  = FDsResourceSearchContent_onServiceLoad;
   //..........................................................
   // @method
   o.construct      = FDsResourceSearchContent_construct;
   // @method
   o.clickItem      = FDsResourceSearchContent_clickItem;
   o.serviceSearch  = FDsResourceSearchContent_serviceSearch;
   // @method
   o.dispose        = FDsResourceSearchContent_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceSearchContent_onBuilded(p){
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
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceSearchContent_onServiceLoad(p){
   var o = this;
   var xitems = p.root.findNode('ItemCollection');
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Item')){
         var item = RClass.create(FDsResourceSearchItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._label = xnode.get('code');
         item.build(o._hPanel);
         o.push(item);
      }
   }
   return;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchContent_construct(){
   var o = this;
   // 父处理
   o.__base.FUiListView.construct.call(o);
}

//==========================================================
// <T>点击一个列表项目。</T>
//
// @method
// @param p:item:FUiListItem 列表项目
//==========================================================
function FDsResourceSearchContent_clickItem(p){
   var o = this;
   // 选中项目
   var frame = o._workspace._previewContent;
   frame.loadMeshByGuid(p._guid);
}

//==========================================================
// <T>服务搜索处理。</T>
//
// @method
// @param typeCd:String 类型
// @param search:String 搜索内容
//==========================================================
function FDsResourceSearchContent_serviceSearch(typeCd, serach){
   var o = this;
   // Disable
   //RWindow.setEnable(false);
   // Build values
   var url = '/cloud.content.resource.ws?action=search&type=' + typeCd + '&serach=' + serach;
   // 发送数据请求
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiListView.dispose.call(o);
}
