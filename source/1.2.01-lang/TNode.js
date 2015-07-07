//==========================================================
// <T>节点工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
MO.TNode = function TNode(name){
   var o = this;
   //..........................................................
   // @attribute
   o._name        = MO.Lang.String.nvl(name, 'Node');
   o._value       = null;
   o._attributes  = null;
   o._nodes       = null;
   //..........................................................
   // @method
   o.isName       = MO.TNode_isName;
   o.name         = MO.TNode_name;
   o.setName      = MO.TNode_setName;
   o.value        = MO.TNode_value;
   o.setValue     = MO.TNode_setValue;
   o.contains     = MO.TNode_contains;
   o.hasAttribute = MO.TNode_hasAttribute;
   o.attributes   = MO.TNode_attributes;
   o.hasNode      = MO.TNode_hasNode;
   o.nodeCount    = MO.TNode_nodeCount;
   o.node         = MO.TNode_node;
   o.nodes        = MO.TNode_nodes;
   o.get          = MO.TNode_get;
   o.getInteger   = MO.TNode_getInteger;
   o.set          = MO.TNode_set;
   o.setNvl       = MO.TNode_setNvl;
   o.setBoolean   = MO.TNode_setBoolean;
   o.setFloat     = MO.TNode_setFloat;
   o.find         = MO.TNode_find;
   o.findNode     = MO.TNode_findNode;
   o.searchNode   = MO.TNode_searchNode;
   o.push         = MO.TNode_push;
   o.toString     = MO.TNode_toString;
   o.innerDump    = MO.TNode_innerDump;
   o.dump         = MO.TNode_dump;
   return o;
}

//==========================================================
// <T>判断当前节点是否指定名称。</T>
//
// @method
// @param n:name:String 节点名称
// @return Boolean 是否相等
//==========================================================
MO.TNode_isName = function TNode_isName(n){
   return MO.Lang.String.equals(this._name, n);
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
MO.TNode_name = function TNode_name(){
   return this._name;
}

//==========================================================
// <T>设置名称。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
MO.TNode_setName = function TNode_setName(p){
   this._name = p;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return String 内容
//==========================================================
MO.TNode_value = function TNode_value(){
   return this._value;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param p:value:String 内容
//==========================================================
MO.TNode_setValue = function TNode_setValue(p){
   this._value = p;
}

//==========================================================
// <T>是否包含了指定的属性。</T>
//
// @method
// @param n:name:String 属性名称
// @return Boolean 是否包含
//==========================================================
MO.TNode_contains = function TNode_contains(n){
   var r = this._attributes;
   return r ? r.contains(n) : false;
}

//==========================================================
// <T>判断当前节点下是否含有何属性。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.TNode_hasAttribute = function TNode_hasAttribute(){
   var s = this._attributes;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>取得节点的所有属性集合。</T>
//
// @method
// @return TAttributes 属性集合
//==========================================================
MO.TNode_attributes = function TNode_attributes(){
   var o = this;
   var r = o._attributes;
   if(!r){
      r = o._attributes = new MO.TAttributes();
   }
   return r;
}

//==========================================================
// <T>判断当前节点下是否有含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.TNode_hasNode = function TNode_hasNode(){
   var s = this._nodes;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>获得子节点总数。</T>
//
// @method
// @return Integer 节点总数
//==========================================================
MO.TNode_nodeCount = function TNode_nodeCount(){
   var nodes = this._nodes;
   return nodes ? nodes.count() : 0;
}

//==========================================================
// <T>获得指定索引位置的节点。</T>
//
// @method
// @param index:Integer 索引位置
// @return TNode 节点
//==========================================================
MO.TNode_node = function TNode_node(index){
   var nodes = this._nodes;
   return nodes ? nodes.at(index) : null;
}

//==========================================================
// <T>取得节点集合。</T>
//
// @method
// @return TObjects 节点集合
//==========================================================
MO.TNode_nodes = function TNode_nodes(){
   var o = this;
   var nodes = o._nodes;
   if(!nodes){
      nodes = o._nodes = new MO.TObjects();
   }
   return nodes;
}

//==========================================================
// <T>取得属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
// @return String 字符串内容
//==========================================================
MO.TNode_get = function TNode_get(n, v){
   return this._attributes ? this._attributes.get(n, v) : null;
}

//==========================================================
// <T>取得属性对应的数字属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
// @return Integer 数字内容
//==========================================================
MO.TNode_getInteger = function TNode_getInteger(n, v){
   return RInteger.parse(this.get(n, v));
}

//==========================================================
// <T>设置属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
//==========================================================
MO.TNode_set = function TNode_set(n, v){
   if(v != null){
      this.attributes().set(n, v);
   }
}

//==========================================================
// <T>设置属性对应的非空属性值。</T>
//
// @method
// @param name:String 属性名称
// @param value:String 属性值
//==========================================================
MO.TNode_setNvl = function TNode_setNvl(name, value){
   if(!MO.Lang.String.isEmpty(value)){
      this.attributes().set(name, value);
   }
}

//==========================================================
// <T>设置属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
//==========================================================
MO.TNode_setBoolean = function TNode_setBoolean(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Boolean.format(v));
   }
}

//==========================================================
// <T>设置属性对应的属性值。</T>
//
// @method
// @param n:name:String 属性名称
// @param v:value:String 属性值
//==========================================================
MO.TNode_setFloat = function TNode_setFloat(n, v){
   if(v != null){
      this.attributes().set(n, MO.Lang.Float.format(v));
   }
}

//==========================================================
// <T>根据节点名称查找节点。</T>
//
// @method
// @param p:name:String 要添加的节点
// @return TNode 返回查找到的节点
//==========================================================
MO.TNode_find = function TNode_find(p){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; i++){
         var n = ns.get(i);
         if(n.isName(p)){
            return n;
         }
      }
   }
   return null;
}

//==========================================================
// <T>根据节点名称和属性查找节点。</T>
//
// @method
// @param pn:name:String 属性名称
// @param pv:value:String 属性值
// @return TNode 对应的节点
//==========================================================
MO.TNode_findNode = function TNode_findNode(pn, pv){
   var o = this;
   if(o.hasNode()){
      var ns = o._nodes;
      var nc = ns.count();
      // 检查参数
      var as = arguments;
      var ac = as.length;
      if((ac - 1) % 2){
         throw new MO.TError('Attributes is not pair. (length={1})', ac);
      }
      // 查找所有节点
      for(var ni = 0; ni < nc; ni++){
         var n = ns.get(ni);
         // 检查名称
         if(pn != null){
            if(!n.isName(pn)){
               continue;
            }
         }
         // 检查属性
         var f = true;
         for(var ai = 1; ai < ac; ai += 2){
            if(n.get(as[ai]) != as[ai + 1]){
               f = false;
               break;
            }
         }
         if(f){
            return n;
         }
      }
   }
   return null;
}

//==========================================================
// <T>根据指定的属性名称和属性值查找节点。</T>
//
// @method
// @param pn:name:String 属性名称
// @param pv:value:String 属性值
// @return TNode 对应的节点
//==========================================================
MO.TNode_searchNode = function TNode_searchNode(pn, pv){
   var o = this;
   if(o.hasAttribute()){
      if(o._attributes.get(pn) == pv){
         return o;
      }
   }
   if(o.hasNode()){
      var ns = o._nodes;
      var c = ns.count();
      for(var i = 0; i < c; ni++){
         var n = ns.get(n).searchNode(pn, pv);
         if(n != null){
            return n;
         }
      }
   }
   return null;
}

//==========================================================
// <T>给当前节点添加一个子节点。</T>
//
// @method
// @param p:node:TNode 节点
//==========================================================
MO.TNode_push = function TNode_push(p){
   var o = this;
   o.nodes().push(p);
}

//==========================================================
// <T>将构建成xml格式的字符串对象转换为字符串。</T>
//
// @return String 字符串
//==========================================================
MO.TNode_toString = function TNode_toString(){
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
MO.TNode_innerDump = function TNode_innerDump(dump, node, space){
   if(space == null){
      space = '';
   }
   dump.append(space, node._name, '(', RClass.name(node), ')');
   var attributes = node._attributes;
   if(attributes){
      var count = attributes.count();
      dump.append(' [', count, ':');
      for(var n = 0; n < count; n++){
         if(n > 0){
            dump.append(' ');
         }
         dump.append(attributes.name(n), '=', attributes.value(n));
         if(n < count - 1){
            dump.append(',');
         }
      }
      dump.append(']');
   }
   if(node._value){
      var value = node._value.toString();
      if(!MO.Lang.String.isEmpty(value)){
         dump.append(' {', value.length, ':', value, '}');
      }
   }
   var nodes = node._nodes;
   if(nodes){
      var count = nodes.count();
      dump.append('\n');
      for(var n = 0; n < count; n++){
         nodes.get(n).dump(dump, space + '   ');
         if(n < count - 1){
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
MO.TNode_dump = function TNode_dump(d, space){
   return this.innerDump(MO.Lang.String.nvlString(d), this, space);
}
