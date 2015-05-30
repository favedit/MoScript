with(MO){
   //==========================================================
   // <T>图片选取控件。</T>
   //
   // @class FEditControl, MEditBorder, MDescEdit
   // @history 09112 MAOCY 创建
   //==========================================================
   MO.FUiPicture = function FUiPicture(o){
      o = RClass.inherits(this, o, FEditControl, MEditBorder, MDescEdit);
      //..........................................................
      // @property
      o.storeType         = RClass.register(o, new TPtyStr('storeType'));
      o.storeCode         = RClass.register(o, new TPtyStr('storeCode'));
      o.storeName         = RClass.register(o, new TPtyStr('storeName'));
      o.editAdjust        = RClass.register(o, new TPtyInt('editAdjust'));
      o.editMaxWidth      = RClass.register(o, new TPtyInt('editMaxWidth'));
      o.editMaxHeight     = RClass.register(o, new TPtyInt('editMaxHeight'));
      //..........................................................
      // @attribute
      o.__seed            = 0;
      o.attributes        = null;
      o.border            = null;
      o.borderStyle       = EUiBorder.Round;
      //..........................................................
      // @event
      o.onUploadMouseDown = RClass.register(o, new HMouseDown('onUploadMouseDown'), FUiPicture_onUploadMouseDown);
      o.onFileUploaded    = FUiPicture_onFileUploaded;
      o.onBuildEdit       = FUiPicture_onBuildEdit;
      //..........................................................
      // @method
      o.construct         = FUiPicture_construct;
      o.makeIconPath      = FUiPicture_makeIconPath;
      o.setText           = FUiPicture_setText;
      o.setEditable       = FUiPicture_setEditable;
      o.dispose           = FUiPicture_dispose;
      return o;
   }

   //==========================================================
   // <T>点击画面上传图片。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiPicture_onUploadMouseDown = function FUiPicture_onUploadMouseDown(e){
      var o = this;
      if(o._editable && !o._disbaled){
         // 生成上传文件的窗口
         var uw = RConsole.find(FUploadConsole).findWindow();
         uw.lsnsUploaded.register(o, o.onFileUploaded);
         uw.typeCode = 'P';
         uw.fileEdit = false;
         uw.recordCode = o.recordCode;
         uw.recordGuid = o.recordGuid;
         uw.recordName = o.recordName;
         uw.guid = o.guid;
         uw.adjustWidth = o.editWidth;
         uw.adjustHeight = o.editHeight;
         uw.show();
      }
   }

   //==========================================================
   // <T>文件加载完成事件。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.FUiPicture_onFileUploaded = function FUiPicture_onFileUploaded(s, g){
      var o = this;
      var as = g.attributes;
      o.guid = as.get('GUID');
      o.mime = as.get('MIME');
      o.networkCode = as.get('NETWORK_CODE')
      o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
      o.hImage.style.display = 'block';
   }

   //==========================================================
   // <T>建立编辑框。</T>
   //
   // @method
   //==========================================================
   MO.FUiPicture_onBuildEdit = function FUiPicture_onBuildEdit(b){
      var o = this;
      var hif = o.hImageForm = o.hEdit = RBuilder.appendTable(b.hPanel);
      hif.width = '100%';
      hif.border = 1;
      hif.height = '100%';
      // 建立编辑控件
      var hc = o.hImagePanel = hif.insertRow().insertCell();
      hc.align = 'center';
      hc.style.cursor = 'hand';
      o.attachEvent('onUploadMouseDown', o.hImagePanel);
      // 建立显示图片
      var h = o.hImage = RBuilder.append(hc, 'IMAGE');
      h.style.border = '1 solid #CCCCCC';
      h.style.display = 'none';
      // 如果有左和上的位置，成为浮动层
      if(o.left>0 && o.top>0){
         o.hPanel.style.position = 'absolute';
      }
   }

   //==========================================================
   // <T>构建对象。</T>
   //
   // @method
   //==========================================================
   MO.FUiPicture_construct = function FUiPicture_construct(){
      var o = this;
      o.base.FEditControl.construct.call(o);
      o.attributes = new TAttributes();
   }

   //==========================================================
   // <T>生成图片路径。</T>
   //
   // @method
   //==========================================================
   MO.FUiPicture_makeIconPath = function FUiPicture_makeIconPath(g, m, sc){
      var o = this;
      var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
      return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
   }

   // ------------------------------------------------------------
   MO.FUiPicture_setText = function FUiPicture_setText(t){
      var o = this;
      var as = o.attributes;
      as.clear();
      var v = false;
      if(!RString.isEmpty(t)){
         as.unpack(t);
         o.networkCode = as.get('nc');
         o.recordCode = as.get('code');
         o.recordGuid = as.get('guid');
         o.recordName = as.get('name');
         o.guid = as.get('ogid');
         o.mime = as.get('mime');
         // 显示图片
         if(o.guid && o.mime){
            v = true;
            o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
         }
      }
      o.hImage.style.display = v ? 'block' : 'none';
   }
   // ------------------------------------------------------------
   MO.FUiPicture_setEditable = function FUiPicture_setEditable(v){
      var o = this;
      o.base.FEditControl.setEditable.call(o, v);
      if(v){
         o.hImagePanel.style.cursor = 'hand';
      }else{
         o.hImagePanel.style.cursor = 'normal';
      }
   }
   //------------------------------------------------------------
   MO.FUiPicture_dispose = function FUiPicture_dispose(){
      var o = this;
      o.base.FEditControl.dispose.call(o);
      o.hImage = null;
   }
}
