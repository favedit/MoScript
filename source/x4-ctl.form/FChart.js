// ============================================================
// FChart
// ============================================================
function FChart(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder);
   //Attribute
   o.borderStyle    = EBorder.Round;
   o.dataService    = RClass.register(o, new TPtyStr('dataService'));
   // Event
   o.onBuildEdit    = FChart_onBuildEdit;
   o.onLoaded       = FChart_onLoaded;
   o.onLoadConfig   = FChart_onLoadConfig;
   // Method
   o.get            = RMethod.empty;
   o.set            = FChart_set;
   return o;
}
// ------------------------------------------------------------
function FChart_onBuildEdit(b){
   var o = this;
   //var hcb = o.hChartPanel = RBuilder.appendDiv(b.hPanel);
   o.hBorderPanel = b.hPanel;
   o.hBorderPanel.align = 'center';
   o.hBorderPanel.vAlign = 'middle';
   b.hForm.width = '100%'
   b.hForm.height = '100%'
   var hcb = o.hChartPanel = RBuilder.appendDiv(window.document.body);
   //var hcb = o.hChartPanel = RBuilder.appendDiv(o.hBorderPanel);
   var w = o.flashWidth = RString.nvl(o.width, 600) - 20;
   var h = o.flashHeight = RString.nvl(o.height, 400) - 20;
   var name = 'id_flash_' + o.name;
   var src = top.RContext.context('/ars/chart/MoChart.swf');
   // ½¨Á¢×Ö·û´®
   var s = new TString();
   s.append("<OBJECT id='" + name + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'");
   s.append(" codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0'");
   s.append(" width='" + w + "' height='" + h + "' border='0' align='absmiddle'>");
   s.append("<PARAM name='movie' value='" + src + "'/>");
   s.append("<PARAM name='quality' value='high'/>");
   s.append("<PARAM name='play' value='true'/>");
   s.append("<PARAM name='scale' value='showall'/>");
   s.append("<EMBED src='" + src + "'");
   s.append(" quality='high' pluginspage='http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash'");
   s.append(" type='application/x-shockwave-flash' width='" + w + "' height='" + h + "' wmode='transparent'></EMBED>");
   s.append("</OBJECT>");
   hcb.innerHTML = s.toString();
   o.hChart = hcb.children[0];
}

//------------------------------------------------------------
function FChart_onLoadConfig(){
   var o = this;
   var g = new TChartArg(o.dataService);
   g.control = o;
   g.callback = new TInvoke(o, o.onLoaded);
   RConsole.find(FChartConsole).loadService(g);
}

//------------------------------------------------------------
function FChart_onLoaded(e){
   var o = this;
   var r = e.document.root();
   r.set('stage_width', o.flashWidth);
   r.set('stage_height', o.flashHeight);
   var s = e.document.xml().toString();
   o.hChart.loadConfig(s);
   o.hBorderPanel.appendChild(o.hChart);
}

//------------------------------------------------------------
function FChart_set(v){
   var o = this;
   if(!o.chartLoaded){
      o.chartLoaded = true;
      RFlash.push(new TInvoke(o, o.onLoadConfig));
   }
}
