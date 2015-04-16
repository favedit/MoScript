//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsResourceListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar, MUiStorage);
   //..........................................................
   // @property
   o._frameName       = 'design3d.resource.ListToolBar';
   o._storageCode     = o._frameName;
   //..........................................................
   // @attribute
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
   // @attribute
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   //..........................................................
   // @event
   o.onBuilded        = FDsResourceListToolBar_onBuilded;
   // @event
   o.onSearchClick    = FDsResourceListToolBar_onSearchClick;
   o.onNavigatorClick = FDsResourceListToolBar_onNavigatorClick;
   o.onTypeClick      = FDsResourceListToolBar_onTypeClick;
   //..........................................................
   // @method
   o.construct        = FDsResourceListToolBar_construct;
   // @method
   o.makeTypeCd       = FDsResourceListToolBar_makeTypeCd;
   o.setNavigator     = FDsResourceListToolBar_setNavigator;
   o.doNavigator      = FDsResourceListToolBar_doNavigator;
   o.storageLoad      = FDsResourceListToolBar_storageLoad;
   // @method
   o.dispose          = FDsResourceListToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 关联查询事件
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   // 关联导航事件
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   //o._controlPageEdit.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
   // 关联选择事件
   o._controlTypeAll.addClickListener(o, o.onTypeClick);
   o._controlTypeNone.addClickListener(o, o.onTypeClick);
   o._controlTypeBitmap.addClickListener(o, o.onTypeClick);
   o._controlTypeBitmap.check(true);
   o._controlTypeMaterial.addClickListener(o, o.onTypeClick);
   o._controlTypeMaterial.check(true);
   o._controlTypeModel.addClickListener(o, o.onTypeClick);
   o._controlTypeModel.check(true);
   o._controlTypeTemplate.addClickListener(o, o.onTypeClick);
   o._controlTypeTemplate.check(true);
   o._controlTypeScene.addClickListener(o, o.onTypeClick);
   o._controlTypeScene.check(true);
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceListToolBar_onSearchClick(p){
   this.doNavigator(0);
}

//==========================================================
// <T>点击导航事件处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceListToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount - 1;
         break;
   }
   o.doNavigator(page);
}

//==========================================================
// <T>点击类型事件处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceListToolBar_onTypeClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'typeAll':
         o._controlTypeBitmap.check(true);
         o._controlTypeMaterial.check(true);
         o._controlTypeModel.check(true);
         o._controlTypeTemplate.check(true);
         o._controlTypeScene.check(true);
         break;
      case 'typeNone':
         o._controlTypeBitmap.check(false);
         o._controlTypeMaterial.check(false);
         o._controlTypeModel.check(false);
         o._controlTypeTemplate.check(false);
         o._controlTypeScene.check(false);
         break;
      case 'typeBitmap':
         page = 0;
         break;
      case 'typeMaterial':
         page--;
         break;
      case 'typeMesh':
         page++;
         break;
      case 'typeTemplate':
         page = o._pageCount - 1;
         break;
      case 'typeScene':
         page = o._pageCount - 1;
         break;
   }
   var typeCd = o.makeTypeCd();
   var search = o._controlSearchEdit.text();
   o._frameSet._listContent.serviceSearch(typeCd, search, '', o._pageSize, 0)
   //..........................................................
   // 存储选择内容
   o.storageSet('resource_type_cd', typeCd);
   o.storageSet('control_type_bitmap:check', RBoolean.toString(o._controlTypeBitmap.isCheck()))
   o.storageSet('control_type_material:check', RBoolean.toString(o._controlTypeMaterial.isCheck()))
   o.storageSet('control_type_model:check', RBoolean.toString(o._controlTypeModel.isCheck()))
   o.storageSet('control_type_template:check', RBoolean.toString(o._controlTypeTemplate.isCheck()))
   o.storageSet('control_type_scene:check', RBoolean.toString(o._controlTypeScene.isCheck()))
   o.storageUpdate();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceListToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>生成类型集合。</T>
//
// @method
// @return String 类型集合
//==========================================================
function FDsResourceListToolBar_makeTypeCd(){
   var o = this;
   var types = '';
   if(o._controlTypeBitmap.isCheck()){
      types += '|Bitmap';
   }
   if(o._controlTypeMaterial.isCheck()){
      types += '|Material';
   }
   if(o._controlTypeModel.isCheck()){
      types += '|Model';
   }
   if(o._controlTypeTemplate.isCheck()){
      types += '|Template';
   }
   if(o._controlTypeScene.isCheck()){
      types += '|Scene';
   }
   if(types != ''){
      types = types.substring(1);
   }
   return types;
}

//==========================================================
// <T>设置导航信息。</T>
//
// @method
// @param pageSize 页大小
// @param pageCount 页总数
// @param page 页号
//==========================================================
function FDsResourceListToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
      //o._controlFirstButton.disable();
   }
}

//==========================================================
// <T>设置导航信息。</T>
//
// @method
// @param pageCount 页总数
// @param page 页号
//==========================================================
function FDsResourceListToolBar_doNavigator(page){
   var o = this;
   var typeCd = o.makeTypeCd();
   var search = o._controlSearchEdit.text();
   page = RInteger.toRange(page, 0, o._pageCount);
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._frameSet._listContent.serviceSearch(typeCd, search, '', o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}

//==========================================================
function FDsResourceListToolBar_storageLoad(){
   var o = this;
   o._controlTypeBitmap.check(o.storageGetBoolean('control_type_bitmap:check', true));
   o._controlTypeMaterial.check(o.storageGetBoolean('control_type_material:check', true));
   o._controlTypeModel.check(o.storageGetBoolean('control_type_model:check', true));
   o._controlTypeTemplate.check(o.storageGetBoolean('control_type_template:check', true));
   o._controlTypeScene.check(o.storageGetBoolean('control_type_scene:check', true));
   var types = o.storageGet('resource_type_cd', 'All');
   var search = o._controlSearchEdit.text();
   o._frameSet._listContent.serviceSearch(types, search, '', o._pageSize, 0)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceListToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
   