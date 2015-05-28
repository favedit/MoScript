// ============================================================
// FTrackManager
// ============================================================
function FTrackManager(){
   IObject.extendClass(this, FManager);
   this.className = 'FMoveManager';
   // Attribute
   this.trackCount = 20;
   this.clientWindow = null;
   this.tracker = null;
   this.messageDate = new Array();
   this.messageRef = new Array();
   this.messageInfo = new Array();
   this.eventIntervalId = null;
   this.windowTrack = null;
   // Html
   this.htmlTable = null;
   // Event
   this.onInterval = mgr_trc_onInterval;
   this.onEventMousedown = mgr_trc_onEventMousedown;
   this.onEventRelease = mgr_trc_onEventRelease;
   // Method
   this.initialize = mgr_trc_initialize;
   this.createWindow = mgr_trc_createWindow;
   this.createElement = mgr_trc_createElement;
   this.refresh = mgr_trc_refresh;
   this.push = mgr_trc_push;
   return this;
}
// ------------------------------------------------------------
function mgr_trc_onInterval(){
   TrackManager.refresh();
}
// ------------------------------------------------------------
function mgr_trc_onEventRelease(){
   if(this.clientWindow && this.eventIntervalId){
      this.clientWindow.clearInterval(this.eventIntervalId);
   }
   this.clientWindow = null;
   this.windowTrack = null;
}
// ------------------------------------------------------------
function mgr_trc_createElement(sTag){
   return this.clientWindow ? this.clientWindow.createElement(sTag) : null ;
}
// ------------------------------------------------------------
function mgr_trc_initialize(oClientWindow){
   this.clientWindow = oClientWindow;
}
// ------------------------------------------------------------
function mgr_trc_createWindow(oClientWindow){
   oClientWindow = oClientWindow ? oClientWindow : this.clientWindow;
   this.windowTrack = new FWinTrackCtl()
   this.windowTrack.clientWindow = oClientWindow;
   this.windowTrack.show();
   this.windowTrack.setLeft(10);
   this.windowTrack.setTop(oClientWindow.document.body.offsetHeight - 150);
   //this.windowTrack.setWidth(600);
   this.windowTrack.setWidth(oClientWindow.document.body.offsetWidth-20);
   this.windowTrack.setHeight(140);
   this.windowTrack.focus();
   this.clientWindow = oClientWindow;
   this.htmlTable = this.windowTrack.htmlTable;
   this.eventIntervalId = this.clientWindow.setInterval(this.onInterval, 20);
}
// ------------------------------------------------------------
function mgr_trc_push(oRef, sMessage){
   var sDate = IDate.format(new FDate(), 'YYYY/MM/DD HH24:MI:SS')
   var sRef = '[null]';
   if(oRef){
      if(oRef.className){
         if(oRef.name){
            sRef = '[' + oRef.className + '->' + oRef.name + ']';
         }else{
            sRef = '[' + oRef.className + ']';
         }
      }else if(oRef.tagName){
         sRef = '[' + oRef.tagName + ']';
      }else{
         sRef = '[' + oRef + ']';
      }
   }
   this.messageDate.push(sDate);
   this.messageRef.push(sRef);
   this.messageInfo.push(sMessage);
}
// ------------------------------------------------------------
function mgr_trc_refresh(){
   if(this.htmlTable){
      var nLength = this.messageDate.length;
      if(nLength > 0){
         for(var n=0; n<nLength; n++){
            // Add Rows
            var oRow = this.htmlTable.insertRow(0);
            var oCell = oRow.insertCell();
            oCell.noWrap = true;
            oCell.innerText = this.messageDate[n];
            var oCell = oRow.insertCell();
            oCell.noWrap = true;
            oCell.innerText = this.messageRef[n];
            var oCell = oRow.insertCell();
            oCell.noWrap = true;
            oCell.innerText = this.messageInfo[n];
            // Delete rows
            var nRowLength = this.htmlTable.rows.length;
            if(nRowLength > this.trackCount){
               this.htmlTable.rows[nRowLength-1].removeNode(true);
            }
         }
         this.messageDate = this.messageDate.slice(nLength);
         this.messageRef = this.messageRef.slice(nLength);
         this.messageInfo = this.messageInfo.slice(nLength);
      }
   }
}
// ------------------------------------------------------------
function mgr_trc_onEventMousedown(){
   if(this.clientWindow){
      var oEvent = this.clientWindow.event;
      if(oEvent && oEvent.altKey && oEvent.ctrlKey && oEvent.button == 2){
         if(!this.windowTrack){
            this.createWindow();
         }else{
            // Delete rows
            var nLength = this.htmlTable.rows.length;
            for(var n=nLength-1; n>=0; n--){
               this.htmlTable.rows[n].removeNode(true);
            }
            this.windowTrack.show();
         }
      }
   }
}
