//==========================================================
// <T>配置文档。</T>
//
// @tool
// @author maocy
// @version 150104
//==========================================================
function FTagDocument(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._space  = null;
   o._root   = null;
   //..........................................................
   // @method
   o.space    = FTagDocument_space;
   o.setSpace = FTagDocument_setSpace;
   // @method
   o.create   = FTagDocument_create;
   // @method
   o.root     = FTagDocument_root;
   // @method
   o.loadNode = FTagDocument_loadNode;
   o.load     = FTagDocument_load;
   o.parse    = FTagDocument_parse;
   // @method
   o.dump     = FTagDocument_dump;
   return o;
}

//==========================================================
// <T>获得命名空间。</T>
//
// @method
// @return String 命名空间
//==========================================================
function FTagDocument_space(){
   return this._space;
}

//==========================================================
// <T>设置命名空间。</T>
//
// @method
// @param p:space:String 命名空间
//==========================================================
function FTagDocument_setSpace(p){
   this._space = p;
}

//==========================================================
// <T>创建一个标签对象。</T>
//
// @method
// @param p:name:String 名称
// @return FTag 标签
//==========================================================
function FTagDocument_create(p){
   var o = this;
   // 获得名称
   var sn = o._space + '_';
   var n = null;
   if(RString.startsWith(p, sn)){
      n = p.substring(sn.length);
   }else{
      n = p;
   }
   // 创建节点
   var t = null;
   switch(n){
      case 'source':
         t = RClass.create(FTag);
         break;
      case 'true':
         t = RClass.create(FTagTrue);
         break;
      case 'false':
         t = RClass.create(FTagFalse);
         break;
      case 'write':
         t = RClass.create(FTagWrite);
         break;
      default:
         throw new TError(o, 'Unknown tag type. (name={1})', n);
   }
   return t;
}

//==========================================================
// <T>获得根标签。</T>
//
// @method
// @return FTag 标签
//==========================================================
function FTagDocument_root(){
   return this._root;
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
function FTagDocument_loadNode(pn, pe){
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
            x.set(ea.nodeName, RXml.fromText(ea.value));
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
            case ENodeType.Text:
               var xt = RClass.create(FTagText);
               xt.setText(en.nodeValue);
               x.push(xt);
               break;
            case ENodeType.Data:
               var xt = RClass.create(FTagText);
               xt.setText(en.data);
               x.push(xt);
               break;
            case ENodeType.Node:
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
function FTagDocument_load(p){
   var o = this;
   // 格式化代码
   var s = '<source>' + p + '</source>'
   s = s.replace(new RegExp('<' + o._space + ':', 'g'), '<' + o._space + '_');
   s = s.replace(new RegExp('</' + o._space + ':', 'g'), '</' + o._space + '_');
   s = s.replace(new RegExp(' < ', 'g'), ' &lt; ');
   s = s.replace(new RegExp(' > ', 'g'), ' &rt; ');
   // 解析内容
   var xr = RXml.loadString(s);
   o.loadNode(null, xr.firstChild);
}

//==========================================================
// <T>解析处理。</T>
//
// @method
// @param p:context:FTagContext 环境
//==========================================================
function FTagDocument_parse(p){
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
function FTagDocument_dump(){
   var o = this;
   var r = new TString();
   r.appendLine(RClass.dump(o));
   r.appendLine(o.root().dump(r));
   return r.toString();
}
