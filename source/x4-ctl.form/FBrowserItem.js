// ============================================================
// FBrowserItem
// ============================================================
function FBrowserItem(o){
   o = RClass.inherits(this, o, FControl);
   //
   o.selected          = false;
   // Html 
   o.hForm             = null;
   o.newNode           = null;
   o.downloadAble      = true;
   o.deleteAble        = true;
   o.fileTree          = null;
   o.hMessages         = null;
   o.attributes        = null;
   // Process
   o.oeBuild           = FBrowserItem_oeBuild;
   // Event
   o.onBuildPanel      = RBuilder.onBuildDivPanel;
   o.onEnter           = FBrowserItem_onEnter;
   o.onLeave           = FBrowserItem_onLeave;
   o.onClick           = FBrowserItem_onClick;
   o.onDoubleClick     = FBrowserItem_onDoubleClick;
   // Method
   o.construct         = FBrowserItem_construct;
   o.setLabel          = FBrowserItem_setLabel;
   o.set               = FBrowserItem_set;
   o.link              = FBrowserItem_link;
   o.select            = FBrowserItem_select;
   return o;
}
// ---------------------------------------------------------
function FBrowserItem_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   //
   var hp = o.hPanel;
   hp.style.width = 80;
   hp.style.height = 90;
   hp.style.float = 'left';
   // ��b�߿�
   var b = o.border = new TRoundBorder();
   b.build(hp);
   b.hPanel.style.cursor = 'hand';
   b.setColor('#FFFFFF');
   b.hPanel.style.filter = 'progid:DXImageTransform.Microsoft.Gradient(gradienttype=0, startcolorstr=#FFFFFF, endcolorstr=#FFFFFF)';
   var bp = b.hPanel;
   bp.style.padding = 4;
   var hf = o.hForm = RBuilder.appendTable(bp);
   hf.width = '100%';
   hf.height = '100%';
   // ��bͼ��
   var hip = o.hIconPanel = hf.insertRow().insertCell();
   hip.align = 'center';
   hip.width = 48;
   hip.height = 48;
   o.hIcon = RBuilder.append(hip, 'IMG');
   // ��b���
   var htp = o.hText = hf.insertRow().insertCell();
   htp.align = 'center';
   htp.style.wordBreak = 'break-all';
   return EEventStatus.Stop;
}
// ------------------------------------------------------------
function FBrowserItem_onEnter(){
   var o = this;
   if(!o.selected){
      o.border.setColor('#24C2DB');
      o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'].endcolorstr = '#E0F2FD';
   }
}
// ------------------------------------------------------------
function FBrowserItem_onLeave(){
   var o = this;
   if(!o.selected){
      if(o.browser._editable){
         o.border.setColor(EColor.Edit);
         o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'].endcolorstr = EColor.Edit;
      }else{
         o.border.setColor(EColor.Readonly);
         o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'].endcolorstr = EColor.Readonly;
      }
   }
}
// ---------------------------------------------------------
function FBrowserItem_onClick(){
   this.browser.selectItem(this);
}
// ---------------------------------------------------------
function FBrowserItem_onDoubleClick(){
   if(this.downloadAble) {
	 this.browser.downloadItem(this);
   }
}
// ---------------------------------------------------------
function FBrowserItem_set(v){
   var o = this;
   var as = o.attributes;
   as.clear();
   as.unpack(v);
   o.link(as);
   var db = as.get('DB');
   if (db) {
	  o.downloadAble = RBoolean.isTrue(db);
	  o.deleteAble = RBoolean.isTrue(as.get('TB'));
   }
}
// ---------------------------------------------------------
function FBrowserItem_link(as){
   var o = this;
   // ���ò���
   o.network = RString.nvl(as.get('n'), as.get('network_code'));
   o.guid = RString.nvl(as.get('g'), as.get('guid'));
   o.mime = RString.nvl(as.get('m'), as.get('mime'));
   o.path = RString.nvl(as.get('p'), as.get('path'));
   // �����������
   //top.RContext.network
   // ������ʾ����
   o.hText.innerText = o.path;
   if(RFile.isPicture(o.path)){
      o.hIcon.src = o.browser.makeIconPath(o.network, o.guid, o.mime);
   }else{
      o.hIcon.src = o.browser.makeMimePath(o.mime);
   }
}
// ---------------------------------------------------------
function FBrowserItem_construct(){
   var o = this;
   o.base.FControl.construct.call(o);
   o.attributes = new TAttributes();
}
// ---------------------------------------------------------
function FBrowserItem_setLabel(v){
   this.hText.innerText = v;
}
// ---------------------------------------------------------
function FBrowserItem_select(v){
   var o = this;
   o.selected = v;
   var f = o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'];
   if(v){
      o.border.setColor('#24C2DB');
      f.endcolorstr = '#B4E1FD';
   }else{
      o.border.setColor('#FFFFFF');
      f.endcolorstr = '#FFFFFF';
   }
   
}
// ---------------------------------------------------------
