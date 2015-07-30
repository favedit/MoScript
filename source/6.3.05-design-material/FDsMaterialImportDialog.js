with(MO){
   //==========================================================
   // <T>设计材质导入对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150428
   //==========================================================
   MO.FDsMaterialImportDialog = function FDsMaterialImportDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.material.ImportDialog';
      o._modeCd               = null;
      //..........................................................
      // @attribute
      o._nodeGuid             = null;
      // @attribute
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsMaterialImportDialog_onBuilded;
      // @event
      o.onFileLoaded          = FDsMaterialImportDialog_onFileLoaded;
      o.onConfirmLoad         = FDsMaterialImportDialog_onConfirmLoad;
      o.onConfirmClick        = FDsMaterialImportDialog_onConfirmClick;
      o.onCancelClick         = FDsMaterialImportDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsMaterialImportDialog_construct;
      // @method
      o.switchModeCd          = FDsMaterialImportDialog_switchModeCd;
      // @method
      o.dispose               = FDsMaterialImportDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialImportDialog_onBuilded = function FDsMaterialImportDialog_onBuilded(event){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, event);
      //..........................................................
      // 注册事件
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }

   //==========================================================
   // <T>文件加载完成。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialImportDialog_onFileLoaded = function FDsMaterialImportDialog_onFileLoaded(event){
      var o = this;
      // 获得参数
      var item = o._activeItem;
      var resource = o._frameSet._activeResource;
      var guid = resource.guid();
      var typeCode = o._controlTypeCode.get();
      var code = o._controlCode.get();
      if(RString.isEmpty(code)){
         code = typeCode;
      }
      var label = o._controlLabel.get();
      // 获得模式
      var url = null;
      var reader = o._fileReader;
      switch(o._modeCd){
         case 'select':
            var linkGuid = item._linkGuid;
            var bitmapGuid = item._guid;
            url = '/cloud.resource.material.wv?do=replaceData&material_guid=' + guid + '&link_guid=' + linkGuid + '&bitmap_guid=' + bitmapGuid + '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
            break;
         case 'import':
            url = '/cloud.resource.material.wv?do=importData&material_guid=' + guid + '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      url = RBrowser.urlEncode(url);
      // 发送数据
      var connection = RConsole.find(FHttpConsole).send(url, reader.data());
      connection.addLoadListener(o, o.onConfirmLoad);
      // 释放文件
      o._fileReader = RObject.dispose(reader);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialImportDialog_onConfirmLoad = function FDsMaterialImportDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FDuiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
      // 刷新搜索内容
      //o._frameSet.reload();
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialImportDialog_onConfirmClick = function FDsMaterialImportDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
      // 加载文件数据
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = RClass.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialImportDialog_onCancelClick = function FDsMaterialImportDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialImportDialog_construct = function FDsMaterialImportDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>切换模式处理。</T>
   //
   // @method
   // @param modeCd:String 模式类型
   //==========================================================
   MO.FDsMaterialImportDialog_switchModeCd = function FDsMaterialImportDialog_switchModeCd(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case 'select':
            o.setLabel('替换位图资源');
            break;
         case 'import':
            o.setLabel('导入位图资源');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialImportDialog_dispose = function FDsMaterialImportDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
