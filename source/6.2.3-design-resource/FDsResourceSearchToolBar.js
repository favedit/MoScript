//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsResourceSearchToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName       = 'design3d.resource.SearchToolBar';
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
   o.onBuilded        = FDsResourceSearchToolBar_onBuilded;
   // @event
   o.onSearchClick    = FDsResourceSearchToolBar_onSearchClick;
   o.onNavigatorClick = FDsResourceSearchToolBar_onNavigatorClick;
   //..........................................................
   // @method
   o.construct        = FDsResourceSearchToolBar_construct;
   // @method
   o.setNavigator     = FDsResourceSearchToolBar_setNavigator;
   o.doNavigator      = FDsResourceSearchToolBar_doNavigator;
   // @method
   o.dispose          = FDsResourceSearchToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceSearchToolBar_onBuilded(p){
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
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsResourceSearchToolBar_onSearchClick(p){
   this.doNavigator(0);
}

//==========================================================
// <T>点击导航事件处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsResourceSearchToolBar_onNavigatorClick(event){
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
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>设置导航信息。</T>
//
// @method
// @param pageSize 页大小
// @param pageCount 页总数
// @param page 页号
//==========================================================
function FDsResourceSearchToolBar_setNavigator(pageSize, pageCount, page){
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
function FDsResourceSearchToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._workspace._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._workspace._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceSearchToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
