//==========================================================
// <T>配置工具类。</T>
//
// @reference
// @author maocy
// @version 150104
//==========================================================
MO.RXml = function RXml(){
   var o = this;
   //..........................................................
   // @attribute
   o.httpActiveX = false;
   o.httpVendor  = null;
   o.domActiveX  = false;
   o.domVendor   = null;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>构造配置工具类。</T>
//
// @method
//==========================================================
MO.RXml.prototype.construct = function RXml_construct(){
   var o = this;
   var d = window.document;
   //...........................................................
   // 获得请求方式
   if(window.ActiveXObject && !window.XMLHttpRequest){
      var vs = ["MSXml2.XmlHTTP", "Microsoft.XmlHTTP", "MSXml.XmlHTTP", "MSXml3.XmlHTTP"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            r = new ActiveXObject(v);
            o.httpActiveX = true;
            o.httpVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.XMLHttpRequest){
      try{
         var r = new XMLHttpRequest();
         o.httpActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown http vendor.');
   }
   //...........................................................
   // 获得文档方式
   if(window.ActiveXObject || !window.DOMParser){
      var vs = ["MSXml2.DOMDocument", "Microsoft.XmlDOM", "MSXml.DOMDocument", "MSXml3.XmlDOM"];
      var c = vs.length;
      for(var n = 0; n < c; n++){
         var v = vs[n];
         try{
            var r = new ActiveXObject(v);
            o.domActiveX = true;
            o.domVendor = v;
            break;
         }catch(e){
            m = e;
         }
      }
   }else if(window.DOMParser && d && d.implementation && d.implementation.createDocument){
      try{
         var r = document.implementation.createDocument('', '', null);
         o.domActiveX = false;
      }catch(e){
         m = e;
      }
   }else{
      alert('Unknown dom vendor.');
   }
}

//==========================================================
// 判断是否是一个节点(TNode)类型
//
// @method
// @param n:Node:TNode 节点对象
// @return Boolean 返回Boolean类型
//==========================================================
MO.RXml.prototype.isNode = function RXml_isNode(n){
   return RClass.isName(n, 'TNode');
}

//==========================================================
// <T>创建一个配置链接。</T>
//
// @method
// @return 配置链接
//==========================================================
MO.RXml.prototype.createConnection = function RXml_createConnection(){
   var o = this;
   var r = null;
   if(o.httpActiveX){
      r = new ActiveXObject(o.httpVendor);
   }else{
      r = new XMLHttpRequest();
   }
   // Error
   if(!r){
      alert('Create xml connection failure. (message=' + m + ')');
   }
   return r;
}

//==========================================================
// <T>创建一个配置文档。</T>
//
// @method
// @return 配置链接
//==========================================================
MO.RXml.prototype.createDocument = function RXml_createDocument(){
   var o = this;
   var r = null;
   if(o.domActiveX){
      r = new ActiveXObject(o.domVendor);
   }else{
      r = document.implementation.createDocument('', '', null);
   }
   // Error
   if(!r){
      alert('Create xml document failure. (message=' + m + ')');
   }
   return r;
}

//==========================================================
// <T>格式化文本。</T>
//
// @method
// @param s:string:String 字符串
// @return String  替换后的字符串
//==========================================================
MO.RXml.prototype.formatText = function RXml_formatText(s){
   if(s != null){
      s = s.replace(/\\n/g, '\n');
   }
   return s;
}

//==========================================================
// <T>替换字符串中的转义字符。</T>
//
// @method
// @param s:string:FString 字符串
// @param v:value:String 内容
// @return FString 字符串
//==========================================================
MO.RXml.prototype.buildText = function RXml_buildText(s, v){
   if(v != null){
      v = v.toString();
      var c = v.length;
      for(var i = 0; i < c; i++){
         var ch = v.charAt(i);
         switch(ch){
            case '<':
               s.append('&lt;');
               break;
            case '>':
               s.append('&gt;');
               break;
            case '"':
               s.append('&quot;');
               break;
            case '&':
               s.append('&amp;');
               break;
            case '\r':
               continue;
            case '\n':
               s.append('\\n');
               break;
            default:
               s.append(ch);
         }
      }
   }
   return s;
}

//==========================================================
// 遍历构建XML节点树
//
// @method
// @param pd:document:TXmlDocument JS系统中的XML文件
// @param pn:node:TXmlNode 父节点
// @param pe:element:XmlElement 页面元素
// @see RXml.fromText
// @see TXmlDoc.create
//==========================================================
MO.RXml.prototype.buildNode = function RXml_buildNode(pd, pn, pe){
   // 建立属性集合
   var xas = null;
   var eas = pe.attributes;
   if(eas){
      var eac = eas.length;
      if(eac > 0){
         xas = new MO.TAttributes();
         for(var n = 0; n < eac; n++){
            var ea = eas[n];
            if(ea.nodeName){
               xas.set(ea.nodeName, this.formatText(ea.value));
            }
         }
      }
   }
   // 建立文本
   var xt = new MO.TString();
   xt.append(pe.value);
   var ecs = pe.childNodes
   if(ecs){
      var ecc = ecs.length;
      for(var n = 0; n < ecc; n++){
         var en = ecs[n];
         var ect = en.nodeType;
         if(ect == MO.ENodeType.Text){
            xt.append(en.nodeValue);
         }else if(ect == MO.ENodeType.Data){
            xt.append(en.data);
         }
      }
   }
   // 创建节点
   var xc = pd.create(pe.nodeName, xas, MO.Lang.String.trim(xt.toString()));
   if(pn){
      pn.push(xc);
   }else{
      pd._root = xc;
   }
   // 创建子节点集合
   if(ecs){
      var cc = ecs.length;
      for(var n = 0; n < cc; n++){
         if(ecs[n].nodeType == MO.ENodeType.Node){
            this.buildNode(pd, xc, ecs[n]);
         }
      }
   }
}

//==========================================================
// <T>加载一个配置字符串。</T>
//
// @method
// @param n:Node:TNode 节点对象
// @return Boolean 返回Boolean类型
//==========================================================
MO.RXml.prototype.makeString = function RXml_makeString(s){
   var o = this;
   var x = null;
   // 判断浏览器的类型
   if(o.domActiveX){
      x = new ActiveXObject(o.domVendor);
      x.async = false;
      x.loadXML(s);
   }else{
      var p = new DOMParser();
      x = p.parseFromString(s, 'text/xml');
   }
   return x;
}

//==========================================================
// <T>根据页面中的配置节点对象构建配置节点。</T>
//
// @method
// @param p:document:document 嵌在页面中的配置节点
// @return TXmlNode 配置节点
//==========================================================
MO.RXml.prototype.makeNode = function RXml_makeNode(p){
   var o = this;
   if(p.documentElement){
      var d = new MO.TXmlDocument();
      o.buildNode(d, null, p.documentElement);
      return d.root();
   }else if(p.tagName == 'SCRIPT'){
      var s = p.textContent;
      if(!s){
         s = p.text;
      }
      if(s){
         var d = new MO.TXmlDocument();
         var xd = o.makeString(s)
         o.buildNode(d, null, xd.documentElement);
         return d.root();
      }
   }
   return null;
}

//==========================================================
// <T>根据页面中的配置节点对象构建配置文档。</T>
//
// @method
// @param p:document:document 嵌在页面中的配置节点
// @return TXmlDocument 配置文档
//==========================================================
MO.RXml.prototype.makeDocument = function RXml_makeDocument(p){
   var d = new MO.TXmlDocument();
   if(p.documentElement){
      this.buildNode(d, null, p.documentElement);
   }
   return d;
}

//==========================================================
// <T>解包节点字符串。</T>
//
// @method
// @param s:string:String 打包字符串
// @param n:node:TNode 节点对象
// @return TNode 节点对象
//==========================================================
MO.RXml.prototype.unpack = function RXml_unpack(s, n){
   var o = this;
   if(MO.Lang.String.isEmpty(s)){
      return null;
   }
   if(!n){
      n = new MO.TNode();
   }
   var np = new MO.TAttributes();
   np.unpack(s);
   n.name = np.get('name');
   n.value = np.get('value');
   if(np.contains('attributes')){
      n.attributes().unpack(np.get('attributes'));
   }
   if(np.contains('nodes')){
      var ns = new MO.TStrings();
      ns.unpack(np.get('nodes'));
      for(var i = 0; i < ns.count; i++){
         o.unpack(ns.get(i), n.create());
      }
   }
   return n;
}
//..........................................................
// 实例化内容
MO.RXml = new MO.RXml();
