/***********************************************************
 * <T>获取图表信息。</T>
 *
 * @console
 * @author MAOCY
 * @version 1.0.1
 **********************************************************/
function FChartConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope          = EScope.Page;
   o.defines        = null;
   o.events         = null;
   // Listener
   o.lsnsLoaded     = null;
   o.formId         = 0;
   // @event
   o.onLoaded       = FChartConsole_onLoaded;
   // Method
   o.construct      = FChartConsole_construct;
   o.loadService    = FChartConsole_loadService;
   o.loadChart      = FChartConsole_loadChart;
   return o;
}
/***********************************************************
 * <T>构造函数。</T>
 *
 * @method
 **********************************************************/
function FChartConsole_onLoaded(e){
   var o = this;
   e.argument.callback.invoke(e);
}

/***********************************************************
 * <T>构造函数。</T>
 *
 * @method
 **********************************************************/
function FChartConsole_construct(){
   var o = this;
   o.defines = new TMap();
   o.defines.set(EForm.Form, new TMap());
   o.defines.set(EForm.Lov, new TMap());
   o.events = new TMap();
   o.lsnsLoaded = new TListeners();
}

/***********************************************************
 * <T>从服务器取得指定名称的表单XML结构。</T>
 *
 * @method
 * @param n:name:String 表单名称
 * @param t:type:String 表单类型
 * @return TXmlDocument 节点对象
 **********************************************************/
function FChartConsole_loadService(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'chart');
   var f = root.create('Chart');
   f.set('name', g.name);
   // 发送数据请求
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url('logic.webform.dataset');
   e.document = doc;
   e.argument = g;
   RConsole.find(FXmlConsole).process(e);
}

/***********************************************************
 * <T>从服务器取得指定名称的表单XML结构。</T>
 *
 * @method
 * @param n:name:String 表单名称
 * @param t:type:String 表单类型
 * @return TXmlDocument 节点对象
 **********************************************************/
function FChartConsole_loadChart(g){
   var o = this;
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'chart');
   var f = root.create('Chart');
   f.set('name', g.name);
   // 发送数据请求
   var url = RService.url('logic.webform.dataset');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   //g.hChart.loadConfig(doc.xml().toString());
   //g.hPanel.appendChild(g.hChart);
   return doc.xml().toString();
}
