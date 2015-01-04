//==========================================================
// <T>节点工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TNode(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o._name        = 'Node';
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   //..........................................................
   // @method
   o.isName       = TNode_isName;
   o.contains     = TNode_contains;
   o.hasAttribute = TNode_hasAttribute;
   o.attributes   = TNode_attributes;
   o.hasNode      = TNode_hasNode;
   o.node         = TNode_node;
   o.nodes        = TNode_nodes;
   o.get          = TNode_get;
   o.set          = TNode_set;
   o.find         = TNode_find;
   o.findNode     = TNode_findNode;
   o.push         = TNode_push;
   o.toString     = TNode_toString;
   o.innerDump    = TNode_innerDump;
   o.dump         = TNode_dump;
   return o;
}

//==========================================================
// <T>判断当前节点是否指定名称。</T>
//
// @method
// @param n:name:String 节点名称
// @return Boolean 是否相等
//==========================================================
function TNode_isName(n){
   return RString.equals(this._name, n);
}

//==========================================================
// <T>是否包含了指定的属性。</T>
//
// @method
// @param n:name:String 属性名称
// @return Boolean 是否包含
//==========================================================
function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}

//==========================================================
// <T>判断当前节点下是否含有何属性。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>取得节点的所有属性集合。</T>
//
// @method
// @return TAttributes 属性集合
//==========================================================
function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new TAttributes();
   }
   return r;
}

//==========================================================
// <T>判断当前节点下是否有含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>获得指定索引位置的节点。</T>
//
// @method
// @param n:index:Integer 索引位置
// @return TNode 节点
//==========================================================
function TNode_node(n){
   var s = this._nodes;
   return s ? s.get(n) : null;
}

//==========================================================
// <T>取得节点集合。</T>
//
// @method
// @return TObjects 节点集合
//==========================================================
function TNode_nodes(){
   var o = this;
   var r = o._nodes;
   if(!r){
      r = o._nodes = new TObjects();
   }
   return r;
}

//==========================================================
// <T>取得属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
// @return String 返回属性值
//==========================================================
function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}

//==========================================================
// <T>设置属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
//==========================================================
function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}

//==========================================================
// <T>	根据节点名称和属性查找对应节点。</T>
//
// @method
// @param name:name:String 要添加的节点
// @param attrs:attrs:String 节点的属性名称数组
// @see RClass.isClass
// @return TNode 返回查找到的节点
//==========================================================
function TNode_find(name, attrs){
   if(this._nodes){
      var c = this._nodes.count;
      if(name != null){
         name = name.toLowerCase();
      }
      var len = arguments.length;
      for(var n = 0; n < c; n++){
         var node = this._nodes.get(n);
         if(name != null && name != node._name.toLowerCase()){
            continue;
         }
         var finded = true;
         for(var i = 1; i < len; i += 2){
            if(i+1 < len){
               if(node._attributes.get(arguments[n]) != arguments[n+1]){
                  finded = false;
                  break;
               }
            }else{
               if(node._value != arguments[n]){
                  finded = false;
                  break;
               }
            }
         }
         if(finded){
            return node;
         }
      }
   }
   return null;
}

//==========================================================
// <T>根据指定的属性名称和属性值查找节点。</T>
//
// @param name:name:String 属性名称
// @param value:value:String 属性值
// @return TNode 对应的节点
//==========================================================
function TNode_findNode(name, value){
   var o = this;
   var at = new TAttributes();
   var nd = null;
   if(o._attributes != null){
      at = o._attributes;
   }
   if(at.get(name) == value){
      nd = o;
   }else{
     if(o.hasNode()){
        for(var n = 0; n< o._nodes.count; n++){
           nd = o._nodes.get(n).findNode(name, value);
           if(nd != null){
              break;
           }
        }
     }
   }
   return nd;
}

//==========================================================
// <T>给当前节点添加一个子节点。</T>
//
// @method
// @param p:node:TNode 节点
//==========================================================
function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}

//==========================================================
// <T>将构建成xml格式的字符串对象转换为字符串。</T>
//
// @return String 字符串
//==========================================================
function TNode_toString(){
   return this.dump();
}

//==========================================================
// <T>获取指定节点的内部信息。</T>
//
// @param dump:dump:String 输出字符串
// @param node:node:TNode  指定节点
// @param space:space:String 间隔空间
// @return String 调试信息
//==========================================================
function TNode_innerDump(dump, node, space){
   if(space == null){
      space = '';
   }
   dump.append(space, node._name, '(', RClass.name(node), ')');
   if(node._attributes){
      var count = node._attributes.count;
      dump.append(' [', count, ':');
      for(var n=0; n<count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(node._attributes.name(n), '=', node._attributes.value(n));
         if(n < count-1){
            dump.append(',');
         }
      }
      dump.append(']');
   }
   if(node._value){
      var value = node._value.toString();
      if(!RString.isEmpty(value)){
         dump.append(' {', value.length, ':', value, '}');
      }
   }
   if(node._nodes){
      var count = node._nodes.count;
      dump.append('\n');
      for(var n = 0; n < count; n++){
         node._nodes.get(n).dump(dump, space + '   ');
         if(n < count-1){
            dump.append('\n');
         }
      }
   }
   return dump;
}

//==========================================================
//<T>获取指定节点的内部信息。</T>
//
// @param dump:dump:String 输出字符串
// @param space:space:String 间隔空间
// @return String 调试信息
//==========================================================
function TNode_dump(d, space){
   d = RString.nvlStr(d);
   return this.innerDump(d, this, space);
}
