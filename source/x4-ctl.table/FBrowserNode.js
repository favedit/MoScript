//==========================================================
// <T>浏览节点。</T>
//
// @class FControl
// @history 091110 MAOCY 创建
//==========================================================
function FBrowserNode(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @attribute
   o.selected          = false;
   o.attributes        = null;
   //..........................................................
   // @event
   o.onEnter           = FBrowserNode_onEnter;
   o.onLeave           = FBrowserNode_onLeave;
   o.onClick           = FBrowserNode_onClick;
   o.onDoubleClick     = FBrowserNode_onDoubleClick;
   o.onBuildPanel      = RBuilder.onBuildDivPanel;
   //..........................................................
   // @process
   o.oeBuild           = FBrowserNode_oeBuild;
   //..........................................................
   // @method
   o.setLabel          = FBrowserNode_setLabel;
   o.getId             = FBrowserNode_getId;
   o.loadValue         = FBrowserNode_loadValue;
   o.select            = FBrowserNode_select;
   return o;
}
//==========================================================
function FBrowserNode_onEnter(){
   var o = this;
   if(!o.selected){
      o.border.setColor('#24C2DB');
      o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'].endcolorstr = '#E0F2FD';
   }
}
//==========================================================
function FBrowserNode_onLeave(){
   var o = this;
   if(!o.selected){
      o.border.setColor('#FFFFFF');
      o.border.hPanel.filters['DXImageTransform.Microsoft.Gradient'].endcolorstr = '#FFFFFF';
   }
}
//==========================================================
function FBrowserNode_onClick(e){
   var o = this;
   o.browser.onNodeClick(o, e);
}
//==========================================================
function FBrowserNode_onDoubleClick(e){
   var o = this;
   o.browser.onNodeDoubleClick(o, e);
}
//==========================================================
function FBrowserNode_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   //
   var hp = o.hPanel;
   hp.style.width = 80;
   hp.style.height = 90;
   hp.style.float = 'left';
   
   // 建立边框
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
   // 建立图标
   var hip = o.hIconPanel = hf.insertRow().insertCell();
   hip.align = 'center';
   hip.width = 48;
   hip.height = 48;
   o.hIcon = RBuilder.append(hip, 'IMG');
   // 建立名称
   var htp = o.hText = hf.insertRow().insertCell();
   htp.align = 'center';
   htp.style.font = 'icon';
   htp.style.wordBreak = 'break-all';
   return EEventStatus.Stop;
}
//==========================================================
function FBrowserNode_setLabel(v){
   this.hText.innerText = v;
}
//==========================================================
function FBrowserNode_getId(){
   return this.attributes.get('ouid');
}
//==========================================================
function FBrowserNode_loadValue(a){
   var o = this;
   o.attributes = a;
   // 设置参数
   o.label = a.nvl('label');
   o.icon = a.nvl('icon', 'com.unknownBig');
   // 设置显示内容
   o.hText.innerText = o.label;
   o.hIcon.src = RResource.iconPath(o.icon);
}
//==========================================================
function FBrowserNode_select(v){
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
//==========================================================
