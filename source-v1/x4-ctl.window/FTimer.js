// =========================================================
// Window提示框
//
// @class
// @face FContaine
// @author maochunyang
// @version 1.0.1
// =========================================================
function FTimer(o){
   o = RClass.inherits(this, o, FControl, MDesign);
   //html
   o.path         = '/ars/icon/ctl/FTimer/';
   o.numberImgs   = new Array('0.png','1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png');
   o.lastDate     = null;
   o.lastTime     = null;
   o.hPanel       = null;
   o.hForm        = null;
   // @process
   o.oeBuild      = FTimer_oeBuild;
   // @event
   o.onBuildPanel = FTimer_onBuildPanel;
   o.onCalculate  = FTimer_onCalculate;
   // @method
   o.construct    = FTimer_construct;
   o.dispose      = FTimer_dispose;
   return o;
}
// =========================================================
function FTimer_oeBuild(e){
   var o = this;
   var r = o.base.FControl.oeBuild.call(o, e);
   var pf = o.hPanel
   // 创建信息显示区域
   var hip = o.hInfoPanel = pf.insertRow().insertCell();
   var hif = o.hInfoForm = RBuilder.appendTable(hip);
   hif.width = '100%';
   var hdr = hif.insertRow();
   // 创建国家显示区域
   var hcp = o.hCountryPanel = hdr.insertCell();
   hcp.innerText = RContext.get('FTimer:Country');
   hcp.style.fontWeight = 'bold';
   // 创建日期显示区域
   var hdp = o.hDatePanel = hdr.insertCell();
   hdp.style.fontWeight = 'bold';
   hdp.align = 'right';
   // 创建时间显示区域
   var htp = o.hTimePanel = pf.insertRow().insertCell();
   htp.style.paddingTop = 6;
   var htf = o.hTimeForm = RBuilder.appendTable(htp);
   var htr = htf.insertRow();
   var hc = htr.insertCell();
   hc.align = 'left';
   hc.width = 23;
   o.hHourLeftImg = RBuilder.append(hc, 'IMG');
   var hc = htr.insertCell();
   hc.align = 'left';
   hc.width = 23;
   o.hHourRightImg = RBuilder.append(hc, 'IMG');
   var hc = htr.insertCell();
   hc.innerText = ':';
   hc.width = 10;
   hc.align = 'center';
   hc.style.fontSize = '16';
   var hc = htr.insertCell();
   hc.align = 'right';
   hc.width = 23;
   o.hMinuteLeftImg = RBuilder.append(hc, 'IMG');
   var hc = htr.insertCell();
   hc.align = 'right';
   hc.width = 23;
   o.hMinuteRightImg = RBuilder.append(hc, 'IMG');
   o.isBuilded = true;
   return r;
}
// =========================================================
function FTimer_onBuildPanel(){
   this.hPanel = RBuilder.newTable();
}
// =========================================================
function FTimer_construct(){
   var o = this;
   o.serverDate = RConsole.find(FDateConsole).currentDate();
   o.active = new TActive(o, o.onCalculate);
   o.active.interval = 1000;
   o.contextPath = RContext.context(o.path);
   RConsole.find(FActiveConsole).push(o.active);
}
// =========================================================
function FTimer_onCalculate(){
   var o = this;
   if(!o.isBuilded){
      return;
   }
   // 获得服务器时间
   var t = RConsole.find(FDateConsole).currentDate();
   // 设置日期显示
   var ld = RDate.formatDate(t, 'YYYY.MM.DD');
   if(o.lastDate != ld){
      o.hDatePanel.innerText = ld;
      o.lastDate = ld;
   }
   // 设置时间显示
   var lt = RDate.formatDate(t, 'HH24MI');
   if(o.lastTime != lt){
      o.hHourLeftImg.src = o.contextPath + lt.charAt(0) + '.png';
      o.hHourRightImg.src = o.contextPath + lt.charAt(1) + '.png';
      o.hMinuteLeftImg.src = o.contextPath + lt.charAt(2) + '.png';
      o.hMinuteRightImg.src = o.contextPath + lt.charAt(3) + '.png';
   }
}
// =========================================================
function FTimer_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hInfoPanel = null;
   o.hInfoForm = null;
   o.hCountryPanel = null;
   o.hDatePanel = null;
   o.hTimePanel = null;
   o.hTimeForm = null;
   o.hHourLeftImg = null;
   o.hHourRightImg = null;
   o.hMinuteLeftImg = null;
   o.hMinuteRightImg = null;
   o.hButtonPanel = null;
}
