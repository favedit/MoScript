//==========================================================
// <T>窗口台控制器。</T>
//
// @console
// @author maocy
// @history 150329
//==========================================================
function FUiDesktopConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd         = EScope.Local;
   //..........................................................
   // @attribute
   o._maskVisible     = false;
   // @attribute
   o._statusEnable    = true;
   // @attribute
   o._loadingVisible  = false;
   // @attribute
   o._progressVisible = false;
   o._progressBar     = null;
   //..........................................................
   // @html
   o._hMaskPanel      = null;
   o._hLoadingPanel   = null;
   o._hLoadingLabel   = null;
   //..........................................................
   // @method
   o.construct        = FUiDesktopConsole_construct;
   // @method
   o.getMaskPanel     = FUiDesktopConsole_getMaskPanel;
   o.getProgressBar   = FUiDesktopConsole_getProgressBar;
   o.getLoadingPanel  = FUiDesktopConsole_getLoadingPanel;
   o.setMaskVisible   = FUiDesktopConsole_setMaskVisible;
   // @method
   o.isEnable         = FUiDesktopConsole_isEnable;
   o.enable           = FUiDesktopConsole_enable;
   o.disable          = FUiDesktopConsole_disable;
   // @method
   o.showLoading      = FUiDesktopConsole_showLoading;
   o.showUploading    = FUiDesktopConsole_showUploading;
   o.showProgress     = FUiDesktopConsole_showProgress;
   o.hide             = FUiDesktopConsole_hide;
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   //o._progressBar = null;
}

//==========================================================
// <T>获得系统禁止时的页面层。</T>
//
// @method
// @param f:flag:Boolean 是否显示图片层 true : 不显示图片
// @return <DIV> 页面层
//==========================================================
function FUiDesktopConsole_getMaskPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   // 创建面板
   var hPanel = o._hMaskPanel;
   if(!hPanel){
      hPanel = o._hMaskPanel = RBuilder.createTable(hDocument, 'FUiDesktopConsole_MaskPanel');
      hPanel.style.zIndex = 5000;
      var hInnerPanel = o._hMaskInnerPanel = RBuilder.appendTableRowCell(hPanel);
      hInnerPanel.align = 'center';
      hInnerPanel.vAlign = 'middle';
   }
   // 创建图片
   //var hi = o._hDisableImage;
   //if(!hi){
   //   hi = o._hDisableImage = RBuilder.appendIcon(h);
   //   hi.src = RResource.iconPath('control.RWindow_Loading');
   //   hi.style.margin = o._hContainer.offsetHeight / 2;
   //   hi.style.display = 'none';
   //}
   return hPanel;
}

//==========================================================
// <T>获得进度条控件。</T>
//
// @method
// @return FUiProgressBar 进度条控件
//==========================================================
function FUiDesktopConsole_getLoadingPanel(){
   var o = this;
   var hDocument = top.RWindow._hDocument;
   var hPanel = o._hLoadingPanel;
   // 创建加载中
   if(!hPanel){
      hPanel = o._hLoadingPanel = RBuilder.createTable(hDocument);
      var hCell = RBuilder.appendTableRowCell(hPanel);
      var hIcon = o._hLoadingIcon = RBuilder.appendIcon(hCell);
      hIcon.src = RResource.iconPath('control.RWindow_Loading');
      var hCell = o._hLoadingLabel = RBuilder.appendTableRowCell(hPanel);
      hCell.align = 'center';
      hCell.style.color = '#FFFFFF';
   }
   return hPanel;
}

//==========================================================
// <T>获得进度条控件。</T>
//
// @method
// @return FUiProgressBar 进度条控件
//==========================================================
function FUiDesktopConsole_getProgressBar(){
   var o = this;
   var progressBar = o._progressBar;
   // 创建进度条
   if(!progressBar){
      progressBar = o._progressBar = RClass.create(FUiProgressBar);
      progressBar.build(top.RWindow._hDocument);
   }
   return progressBar;
}

//==========================================================
// <T>设置窗口操作模式。</T>
//
// @method
// @param v:value:Boolean 是否允许操作
//==========================================================
function FUiDesktopConsole_setMaskVisible(visible){
   var o = this;
   if(o._maskVisible != visible){
      var hDocument = top.RWindow._hDocument;
      var hBody = hDocument.body;
      var hMaskPanel = o.getMaskPanel();
      if(visible){
         var hStyle = hMaskPanel.style;
         hStyle.left = '0px';
         hStyle.top = '0px';
         //hStyle.width = (hDocument.all ? hBody.scrollWidth : hDocument.documentElement.scrollWidth) + 'px';
         //hStyle.height = (hDocument.all ? hBody.scrollHeight : hDocument.documentElement.scrollHeight) + 'px';
         hBody.appendChild(hMaskPanel);
      }else{
         hBody.removeChild(hMaskPanel);
      }
   }
   o._maskVisible = visible;
}

//==========================================================
// <T>获得是否允许处理。</T>
//
// @method
// @return 是否允许
//==========================================================
function FUiDesktopConsole_isEnable(){
   return this._statusEnable;
}

//==========================================================
// <T>允许窗口操作。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}

//==========================================================
// <T>禁止窗口操作。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}

//==========================================================
// <T>显示加载中。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_showLoading(){
   var o = this;
   // 显示遮挡层
   o.setMaskVisible(true);
   // 显示加载中
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力加载中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}

//==========================================================
// <T>显示上传中。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_showUploading(){
   var o = this;
   // 显示遮挡层
   o.setMaskVisible(true);
   // 显示加载中
   if(!o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      RHtml.textSet(o._hLoadingLabel, '正在努力上传中，请稍等 ...');
      o._hMaskInnerPanel.appendChild(hLoadingPanel);
      o._loadingVisible = true;
   }
}

//==========================================================
// <T>显示进度条。</T>
//
// @method
// @param rate:Number 比率(0~1)
//==========================================================
function FUiDesktopConsole_showProgress(rate){
   var o = this;
   // 显示遮挡层
   o.setMaskVisible(true);
   // 显示进度栏
   if(!o._progressVisible){
      var hMaskPanel = o.getMaskPanel();
      var progressBar = o.getProgressBar();
      hMaskPanel.appendChild(progressBar._hPanel);
      o._progressVisible = true;
   }
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
function FUiDesktopConsole_hide(){
   var o = this;
   // 隐藏进度条
   if(o._loadingVisible){
      var hLoadingPanel = o.getLoadingPanel();
      o._hMaskInnerPanel.removeChild(hLoadingPanel);
      o._loadingVisible  = false;
   }
   // 隐藏遮挡层
   o.setMaskVisible(false);
}
