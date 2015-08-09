//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
MO.FTagDocument = function FTagDocument(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._space  = MO.Class.register(o, MO.AGetSet('_space'));
   o._root   = MO.Class.register(o, MO.AGetter('_root'));
   //..........................................................
   // @method
   o.create   = MO.FTagDocument_create;
   // @method
   o.loadNode = MO.FTagDocument_loadNode;
   o.load     = MO.FTagDocument_load;
   o.parse    = MO.FTagDocument_parse;
   // @method
   o.dump     = MO.FTagDocument_dump;
   return o;
}

//==========================================================
// <T>创建一个标签对象。</T>
//
// @method
// @param p:name:String 名称
// @return FTag 标签
//==========================================================
MO.FTagDocument_create = function FTagDocument_create(p){
   var o = this;
   // 获得名称
   var sn = o._space + '_';
   var n = null;
   if(MO.RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   // 创建节点
   var t = null;
   switch(n){
      case 'source':
         t = MO.Class.create(MO.FTag);
         break;
      case 'write':
         t = MO.Class.create(MO.FTagWrite);
         break;
      case 'true':
         t = MO.Class.create(MO.FTagTrue);
         break;
      case 'false':
         t = MO.Class.create(MO.FTagFalse);
         break;
      case 'equals':
         t = MO.Class.create(MO.FTagEquals);
         break;
      case 'notEquals':
         t = MO.Class.create(MO.FTagNotEquals);
         break;
      default:
         throw new MO.TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
}

//===========================================================
// 遍历构建XML节点树
//
// @method
// @param pn:node:TXmlNode 父节点
// @param pe:element:XmlElement 页面元素
// @see RXml.fromText
// @see TXmlDoc.create
//===========================================================
MO.FTagDocument_loadNode = function FTagDocument_loadNode(pn, pe){
   var o = this;
   // 创建节点
   var x = o.create(pe.nodeName);
   if(pn){
      pn.push(x);
   }else{
      o._root = x;
   }
   // 建立属性集合
   var eas = pe.attributes;
   if(eas){
      var c = eas.length;
      for(var i = 0; i < c; i++){
         var ea = eas[i];
         if(ea.nodeName){
            x.set(ea.nodeName, MO.RXml.formatText(ea.value));
         }
      }
   }
   // 建立标签集合
   var ens = pe.childNodes
   if(ens){
      var c = ens.length;
      for(var i = 0; i < c; i++){
         var en = ens[i];
         switch(en.nodeType){
            case MO.ENodeType.Text:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case MO.ENodeType.Data:
               var xt = MO.Class.create(MO.FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case MO.ENodeType.Node:
               o.loadNode(x, en);
               break;
         }
      }
   }
}

//==========================================================
// <T>加载来源。</T>
//
// @method
// @param p:source:String 来源
//==========================================================
MO.FTagDocument_load = function FTagDocument_load(p){
   var o = this;
   // 格式化代码
   var s = '<source>' + p + '</source>'
   s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
   s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
   s = s.replace(new RegExp(' & ', 'g'), ' &amp; ');
   s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
   s = s.replace(new RegExp(' > ', 'g'), ' &gt; ');
   // 解析内容
   var xr = MO.RXml.makeString(s);
   o.loadNode(null, xr.firstChild);
}

//==========================================================
// <T>解析处理。</T>
//
// @method
// @param p:context:FTagContext 环境
//==========================================================
MO.FTagDocument_parse = function FTagDocument_parse(p){
   var o = this;
   // 解析处理
   p.resetSource();
   o._root.parse(p);
   return p.source();
}

//==========================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
MO.FTagDocument_dump = function FTagDocument_dump(){
   var o = this;
   var r = new MO.TString();
   r.appendLine(MO.Class.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
