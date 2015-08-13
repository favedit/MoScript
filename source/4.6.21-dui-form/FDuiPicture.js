//==========================================================
// <T>ͼƬѡȡ�ؼ���</T>
//
// @class FEditControl, MEditBorder, MDescEdit
// @history 09112 MAOCY ����
//==========================================================
MO.FDuiPicture = function FDuiPicture(o){
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MEditBorder, MO.MDescEdit);
   //..........................................................
   // @property
   o.storeType         = MO.Class.register(o, new MO.APtyString('storeType'));
   o.storeCode         = MO.Class.register(o, new MO.APtyString('storeCode'));
   o.storeName         = MO.Class.register(o, new MO.APtyString('storeName'));
   o.editAdjust        = MO.Class.register(o, new MO.APtyInteger('editAdjust'));
   o.editMaxWidth      = MO.Class.register(o, new MO.APtyInteger('editMaxWidth'));
   o.editMaxHeight     = MO.Class.register(o, new MO.APtyInteger('editMaxHeight'));
   //..........................................................
   // @attribute
   o.__seed            = 0;
   o.attributes        = null;
   o.border            = null;
   o.borderStyle       = MO.EUiBorder.Round;
   //..........................................................
   // @event
   o.onUploadMouseDown = MO.Class.register(o, new HMouseDown('onUploadMouseDown'), FDuiPicture_onUploadMouseDown);
   o.onFileUploaded    = MO.FDuiPicture_onFileUploaded;
   o.onBuildEdit       = MO.FDuiPicture_onBuildEdit;
   //..........................................................
   // @method
   o.construct         = MO.FDuiPicture_construct;
   o.makeIconPath      = MO.FDuiPicture_makeIconPath;
   o.setText           = MO.FDuiPicture_setText;
   o.setEditable       = MO.FDuiPicture_setEditable;
   o.dispose           = MO.FDuiPicture_dispose;
   return o;
}

//==========================================================
// <T>��������ϴ�ͼƬ��</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
MO.FDuiPicture_onUploadMouseDown = function FDuiPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      // �����ϴ��ļ��Ĵ���
      var uw = MO.Console.find(MO.FUploadConsole).findWindow();
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
// <T>�ļ���������¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
MO.FDuiPicture_onFileUploaded = function FDuiPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + MO.Lang.Date.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}

//==========================================================
// <T>�����༭��</T>
//
// @method
//==========================================================
MO.FDuiPicture_onBuildEdit = function FDuiPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = MO.Window.Builder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   // �����༭�ؼ�
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   // ������ʾͼƬ
   var h = o.hImage = MO.Window.Builder.append(hc, 'IMAGE');
   h.style.border = '1 solid #CCCCCC';
   h.style.display = 'none';
   // ���������ϵ�λ�ã���Ϊ������
   if(o.left>0 && o.top>0){
      o.hPanel.style.position = 'absolute';
   }
}

//==========================================================
// <T>��������</T>
//
// @method
//==========================================================
MO.FDuiPicture_construct = function FDuiPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new MO.TAttributes();
}

//==========================================================
// <T>����ͼƬ·����</T>
//
// @method
//==========================================================
MO.FDuiPicture_makeIconPath = function FDuiPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + MO.Lang.String.toLower(s));
}

// ------------------------------------------------------------
MO.FDuiPicture_setText = function FDuiPicture_setText(t){
   var o = this;
   var as = o.attributes;
   as.clear();
   var v = false;
   if(!MO.Lang.String.isEmpty(t)){
      as.unpack(t);
      o.networkCode = as.get('nc');
      o.recordCode = as.get('code');
      o.recordGuid = as.get('guid');
      o.recordName = as.get('name');
      o.guid = as.get('ogid');
      o.mime = as.get('mime');
      // ��ʾͼƬ
      if(o.guid && o.mime){
         v = true;
         o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
      }
   }
   o.hImage.style.display = v ? 'block' : 'none';
}
// ------------------------------------------------------------
MO.FDuiPicture_setEditable = function FDuiPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
//------------------------------------------------------------
MO.FDuiPicture_dispose = function FDuiPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
