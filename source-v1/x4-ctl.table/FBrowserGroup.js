//==========================================================
// <T>浏览节点组。</T>
//
// @class FControl
// @history 091110 MAOCY 创建
//==========================================================
function FBrowserGroup(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @attribute
   o.nodeCount     = 0;
   o.nodes         = new TList();
   //..........................................................
   // @event
   o.onClick       = FBrowserGroup_onClick;
   o.onDoubleClick = FBrowserGroup_onDoubleClick;
   o.onBuildPanel  = RBuilder.onBuildTablePanel;
   //..........................................................
   // @process
   o.oeBuild       = FBrowserGroup_oeBuild;
   //..........................................................
   // @method
   o.setLabel      = FBrowserGroup_setLabel;
   o.nodeSync      = FBrowserGroup_nodeSync;
   o.nodeNext      = FBrowserGroup_nodeNext;
   o.nodeClear     = FBrowserGroup_nodeClear;
   return o;
}
//==========================================================
function FBrowserGroup_onClick(){
}
//==========================================================
function FBrowserGroup_onDoubleClick(){
}
//==========================================================
function FBrowserGroup_oeBuild(event){
   var o = this;
   o.base.FControl.oeBuild.call(o, event);
   //
   var hp = o.hPanel;
   hp.style.width = '100%';
   //
   var hc = hp.insertRow().insertCell();
   var hf = o.hCaptionForm = RBuilder.appendTable(hc);
   hf.width = '100%';
   var hr = hf.insertRow();
   // 建立名称
   var hc = hr.insertCell();
   hc.width = 1;
   hc.style.padding = '0 8';
   o.hText = RBuilder.appendText(hc);
   o.hText.style.whiteSpace = 'nowrap';
   o.hText.style.font = 'icon';
   // 建立分割线
   var hc = hr.insertCell();
   hc.innerHTML = "<HR style='height:1;background-color:#666666'>";
   // 建立数据底板
   var hc = hp.insertRow().insertCell();
   var hdp = o.hDataPanel = RBuilder.appendDiv(hc);
   hdp.style.width = '100%';
   hdp.style.height = '100%';
   hdp.style.overflow = 'auto';
   hdp.style.backgroundColor = '#FFFFFF';
   return EEventStatus.Stop;
}
//==========================================================
function FBrowserGroup_setLabel(v){
   this.hText.innerText = v;
}
//==========================================================
function FBrowserGroup_nodeSync(n){
   var o = this;
   var ps = o.nodes;
   var p = ps.get(n);
   if(!p){
      for(var i=ps.count; i<=n; i++){
         p = RControl.create(FBrowserNode, o.hDataPanel);
         p.browser = o.browser;
         p.group = o;
         ps.push(p);
      }
   }
   p.setVisible(true);
   return p;
}
//==========================================================
function FBrowserGroup_nodeNext(){
   return this.nodeSync(this.nodeCount++);
}
//==========================================================
function FBrowserGroup_nodeClear(){
   var o = this;
   o.nodeCount = 0;
   for(var n=o.nodes.count-1; n>=0; n--){
      o.nodes.get(n).hide();
   }
}
