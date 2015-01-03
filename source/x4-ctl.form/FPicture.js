//==========================================================
// <T>ͼƬѡȡ�ؼ���</T>
//
// @class FEditControl, MEditBorder, MDescEdit
// @history 09112 MAOCY ����
//==========================================================
function FPicture(o){
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
   o.borderStyle       = EBorder.Round;
   //..........................................................
   // @event
   o.onUploadMouseDown = RClass.register(o, new HMouseDown('onUploadMouseDown'), FPicture_onUploadMouseDown);
   o.onFileUploaded    = FPicture_onFileUploaded;
   o.onBuildEdit       = FPicture_onBuildEdit;
   //..........................................................
   // @method
   o.construct         = FPicture_construct;
   o.makeIconPath      = FPicture_makeIconPath;
   o.setText           = FPicture_setText;
   o.setEditable       = FPicture_setEditable;
   o.dispose           = FPicture_dispose;
   return o;
}

//==========================================================
// <T>��������ϴ�ͼƬ��</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FPicture_onUploadMouseDown(e){
   var o = this;
   if(o._editable && !o._disbaled){
      // �����ϴ��ļ��Ĵ���
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
// <T>�ļ���������¼���</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FPicture_onFileUploaded(s, g){
   var o = this;
   var as = g.attributes;
   o.guid = as.get('GUID');
   o.mime = as.get('MIME');
   o.networkCode = as.get('NETWORK_CODE')
   o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode) + '?' + RDate.format() + (++o.__seed);
   o.hImage.style.display = 'block';
}

//==========================================================
// <T>�����༭��</T>
//
// @method
//==========================================================
function FPicture_onBuildEdit(b){
   var o = this;
   var hif = o.hImageForm = o.hEdit = RBuilder.appendTable(b.hPanel);
   hif.width = '100%';
   hif.border = 1;
   hif.height = '100%';
   // �����༭�ؼ�
   var hc = o.hImagePanel = hif.insertRow().insertCell();
   hc.align = 'center';
   hc.style.cursor = 'hand';
   o.attachEvent('onUploadMouseDown', o.hImagePanel);
   // ������ʾͼƬ
   var h = o.hImage = RBuilder.append(hc, 'IMAGE');
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
function FPicture_construct(){
   var o = this;
   o.base.FEditControl.construct.call(o);
   o.attributes = new TAttributes();
}

//==========================================================
// <T>����ͼƬ·����</T>
//
// @method
//==========================================================
function FPicture_makeIconPath(g, m, sc){
   var o = this;
   var s = o.recordCode + '/' + o.recordGuid + '/' + g + '.icon.' + m;
   return top.RContext.context('/svr/' + sc.toLowerCase() + '/sys/' + RString.toLower(s));
}

// ------------------------------------------------------------
function FPicture_setText(t){
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
      // ��ʾͼƬ
      if(o.guid && o.mime){
         v = true;
         o.hImage.src = o.makeIconPath(o.guid, o.mime, o.networkCode);
      }
   }
   o.hImage.style.display = v ? 'block' : 'none';
}
// ------------------------------------------------------------
function FPicture_setEditable(v){
   var o = this;
   o.base.FEditControl.setEditable.call(o, v);
   if(v){
      o.hImagePanel.style.cursor = 'hand';
   }else{
      o.hImagePanel.style.cursor = 'normal';
   }
}
//------------------------------------------------------------
function FPicture_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hImage = null;
}
