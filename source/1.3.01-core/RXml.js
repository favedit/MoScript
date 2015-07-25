//==========================================================
// <T>配置工具类。</T>
//
// @reference
// @author maocy
// @version 150104
//==========================================================
MO.RXml = function RXml(){
   return this;
}

//==========================================================
// 判断是否是一个节点(TNode)类型
//
// @method
// @param n:Node:TNode 节点对象
// @return Boolean 返回Boolean类型
//==========================================================
MO.RXml.prototype.isNode = function RXml_isNode(n){
   return MO.Class.isName(n, 'TNode');
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
            case '&':
               s.append('&amp;');
               break;
            case '\'':
               s.append('&apos;');
               break;
            case '"':
               s.append('&quot;');
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

//==========================================================
// <T>存储对象。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
// @param item:Object 对象
//==========================================================
MO.RXml.prototype.saveObject = function RXml_saveObject(xconfig, tag, item){
   var o = this;
   for(var name in item){
      var value = item[name];
      if(value != null){
         var xtag = xconfig.create(tag);
         xtag.set('name', name);
         var typeName = typeof(value);
         switch(typeName){
            case 'boolean':
            case 'number':
            case 'date':
            case 'string':
               xtag.setValue(value);
               break;
            case 'function':
               xtag.setValue(MO.Method.name(value));
               break;
            case 'object':
               o.saveObject(xtag, 'Property', value);
               break;
            default:
               throw new MO.TError('Invalid object.');
         }
      }
   }
}
//..........................................................
// 实例化内容
MO.Lang.Xml = new MO.RXml();
