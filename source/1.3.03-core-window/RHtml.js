//==========================================================
// <T>页面对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RHtml = function RHtml(){
   var o = this;
   //..........................................................
   // @attribute
   o._nextUid        = 1;
   o._links          = new Object();
   o._clientPosition = new MO.SPoint2();
   return o;
}

//==========================================================
// <T>获得对象的唯一编号。</T>
// <P>外部会引用这个函数，不要在内部使用this对象。</P>
//
// @method
// @param v:value:Object 对象
// @return Integer 编号
//==========================================================
MO.RHtml.prototype.uid = function RHtml_uid(v){
   var r = v.__puuid;
   if(r == null){
      r = v.__puuid = this._nextUid++;
   }
   return r;
}

//==========================================================
// <T>获得显示性。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @return Boolean 显示性
//==========================================================
MO.RHtml.prototype.displayGet = function RHtml_displayGet(h){
   var r = null;
   var s = h.style.display;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      r = (s == 'inline');
   }else{
      r = (s != 'none');
   }
   return r;
}

//==========================================================
// <T>设置显示性。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @param v:visible:Boolean 显示性
//==========================================================
MO.RHtml.prototype.displaySet = function RHtml_displaySet(h, v){
   var s = null;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      s = v ? 'inline' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}

//==========================================================
// <T>获得可见性。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @return Boolean 可见性
//==========================================================
MO.RHtml.prototype.visibleGet = function RHtml_visibleGet(h){
   var r = null;
   var s = h.style.display;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      r = (s == 'block');
   }else{
      r = (s != 'none');
   }
   return r;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @param v:visible:Boolean 可见性
//==========================================================
MO.RHtml.prototype.visibleSet = function RHtml_visibleSet(h, v){
   var s = null;
   if(MO.RBrowser.isBrowser(MO.EBrowser.Explorer)){
      s = v ? '' : 'none';
   }else{
      s = v ? null : 'none';
   }
   h.style.display = s;
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @return String 文本内容
//==========================================================
MO.RHtml.prototype.textGet = function RHtml_textGet(h, v){
   var r = null;
   if(MO.RBrowser.isBrowser(EBrowser.FireFox)){
      r = h.textContent;
   }else{
      r = h.innerText;
   }
   return r;
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @param v:value:String 文本内容
//==========================================================
MO.RHtml.prototype.textSet = function RHtml_textSet(h, v){
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
      h.textContent = v;
   }else{
      h.innerText = v;
   }
}

//==========================================================
// <T>获得复选框内容。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @return String 文本内容
//==========================================================
MO.RHtml.prototype.checkGet = function RHtml_checkGet(h){
   return MO.Lang.Bool.toString(h.checked);
}

//==========================================================
// <T>设置复选框内容。</T>
//
// @method
// @param h:html:HtmlTag 页面对象
// @param v:value:String 文本内容
//==========================================================
MO.RHtml.prototype.checkSet = function RHtml_checkSet(h, v){
   h.checked = MO.Lang.Bool.isTrue(v);
}

//==========================================================
// <T>获得单选框内容。</T>
//
// @method
// @param hs:html:HtmlTag 页面对象
// @return String 文本内容
//==========================================================
MO.RHtml.prototype.radioGet = function RHtml_radioGet(hs){
   if(hs){
      var c = hs.length;
      for(var n = 0; n < c; n++){
         var h = hs[n];
         if(h.checked){
            return h.value;
         }
      }
   }
   return null;
}

//==========================================================
// <T>设置单选框内容。</T>
//
// @method
// @param hs:html:HtmlTag 页面对象
// @param v:value:String 文本内容
//==========================================================
MO.RHtml.prototype.radioSet = function RHtml_radioSet(hs, v){
   if(hs){
      var c = hs.length;
      for(var n = 0; n < c; n++){
         var h = hs[n];
         if(h.value == v){
            h.checked = true;
            break;
         }
      }
   }
}

//==========================================================
// <T>设置鼠标样式。</T>
//
// @method
// @param h:html:HtmlTag 页面元素
// @param v:value:String 文本内容
//==========================================================
MO.RHtml.prototype.cursorSet = function RHtml_cursorSet(h, v){
   if(h){
      h.style.cursor = v;
   }
}

//==========================================================
// <T>获得页面对象上的存储信息。</T>
//
// @method
// @param hs:html:HtmlTag 页面对象
// @param n:name:String 名称
// @return Object 内容
//==========================================================
MO.RHtml.prototype.linkGet = function RHtml_linkGet(h, n){
   var o = this;
   var u = o.uid(h);
   var i = o._links[u];
   return i ? i.get(n) : null;
}

//==========================================================
// <T>设置页面对象上的存储信息。</T>
//
// @method
// @param hs:html:HtmlTag 页面对象
// @param n:name:String 名称
// @param v:value:Object 内容
//==========================================================
MO.RHtml.prototype.linkSet = function RHtml_linkSet(h, n, v){
   var o = this;
   var ls = o._links;
   var u = o.uid(h);
   var i = ls[u];
   if(!i){
      i = ls[u] = new MO.THtmlItem();
      i._link = h;
   }
   i.set(n, v);
}

//==========================================================
// <T>计算一个控件到指定容器的位置。</T>
// 计算 table的 offsets. 
// 计算 绝对定位的元素(position:absolute). 
// 在其它容器内出现的Scroll offsets(scrollLeft,scrollTop). 
// 所有父元素溢出的边框(overflow:visible). 
// 误算绝对定位的父元素. 
//
// @method
// @param h:html:HtmlTag 页面元素
// @param t:top:HtmlTag 顶层元素
//==========================================================
MO.RHtml.prototype.clientPosition = function RHtml_clientPosition(hTag, hTop){
   var o = this;
   var position = o._clientPosition;
   position.set(0, 0);
   while(hTag != hTop){
      position.x += hTag.offsetLeft + hTag.clientLeft - hTag.scrollLeft;
      position.y += hTag.offsetTop + hTag.clientTop - hTag.scrollTop;
      //if('absolute' != RHtml.currentStyle(h).position){
      //break;
      //}
      hTag = hTag.offsetParent;
   }
   return position;
}

//==========================================================
// <T>计算一个页面元素到左侧的距离。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
// @param t:top:HtmlTag 顶层元素
// @return Intger 距离
//==========================================================
MO.RHtml.prototype.clientX = function RHtml_clientX(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetLeft - p.scrollLeft;
      p = p.offsetParent;
   }
   return r;
}

//==========================================================
// <T>计算一个页面元素到上侧的距离。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
// @param t:top:HtmlTag 顶层元素
// @return Intger 距离
//==========================================================
MO.RHtml.prototype.clientY = function RHtml_clientY(p, t){
   var r = 0;
   while(p != t){
      r += p.offsetTop - p.scrollTop;
      p = p.offsetParent;
   }
   return r;
}

//==========================================================
// <T>设置页面元素大小。</T>
//
// @method
// @param h:html:HtmlTag 页面元素
// @param s:size:SSize2 大小
//==========================================================
MO.RHtml.prototype.setSize = function RHtml_setSize(h, s){
   if(s.width){
      h.style.width = s.width + 'px';
   }
   if(s.height){
      h.style.height = s.height + 'px';
   }
}

//==========================================================
// <T>将页面内容转换成文本内容。</T>
//
// @method
// @param p:html:String 页面内容
// @return String 文本内容
//==========================================================
MO.RHtml.prototype.toText = function RHtml_toText(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/&lt;/, '<');
      p = p.replace(/&gt;/g, '>');
      p = p.replace(/&nbsp;/g, ' ');
      p = p.replace(/<BR>/g, '\n');
   }
   return p;
}

//==========================================================
// <T>将文本内容转换成页面内容。</T>
//
// @method
// @param p:text:String 文本内容
// @return String 页面内容
//==========================================================
MO.RHtml.prototype.toHtml = function RHtml_toHtml(p){
   if(p != null){
      p = p.toString();
      p = p.replace(/</g, '&lt;');
      p = p.replace(/>/g, '&gt;');
      p = p.replace(/ /g, '&nbsp;');
      p = p.replace(/\n/g, '<BR>');
      p = p.replace(/\\n/g, '<BR>');
      p = p.replace(/\r/g, '');
      p = p.replace(/\\r/g, '');
   }
   return p;
}

//==========================================================
// <T>获得事件来源。</T>
//
// @method
// @param p:event:HtmlEvent 页面事件
//==========================================================
MO.RHtml.prototype.eventSource = function RHtml_eventSource(p){
   return p.srcElement ? p.srcElement : p.target;
}

//==========================================================
// <T>根据名称获得页面元素。</T>
//
// @method
// @param name:String 名称
// @return HtmlTag 页面元素
//==========================================================
MO.RHtml.prototype.get = function RHtml_get(name){
   return document.getElementById(name);
}

//==========================================================
// <T>根据名称获得指定类型的页面元素。</T>
//
// @method
// @param name:String 名称
// @param typeName:String 类型名称
// @return HtmlTag 页面元素
//==========================================================
MO.RHtml.prototype.parent = function RHtml_parent(tag, typeName){
   if(tag && t){
      typeName = typeName.toLowerCase();
      while(tag){
         if(tag.tagName.toLowerCase() == typeName){
            return tag;
         }
         tag = tag.parentElement;
      }
   }
   return null;
}

//==========================================================
// <T>查找关联对象。</T>
//
// @method
// @param h:html:HtmlEvent 页面元素
// @param c:class:Class 类对象
// @return FObject 对象
//==========================================================
MO.RHtml.prototype.searchLinker = function RHtml_searchLinker(h, c){
   while(h){
      var f = h.__linker;
      if(f){
         if(RClass.isClass(f, c)){
            return f;
         }
      }
      h = h.parentElement;
   }
   return null;
}

//==========================================================
// <T>查找关联对象。</T>
//
// @method
// @param h:html:HtmlEvent 页面元素
// @param n:name:String 属性名称
// @return FObject 对象
//==========================================================
MO.RHtml.prototype.searchObject = function RHtml_searchObject(h, n){
   while(h){
      var f = h[n];
      if(f){
         return f;
      }
      h = h.parentElement;
   }
   return null;
}

//==========================================================
// <T>移动表格中的一行。</T>
//
// @param ph:hTable
// @param ps:sourceIndex
// @param pt:targetIndex
//==========================================================
MO.RHtml.prototype.tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
   // 检查参数
   if(ph.tagName != 'TABLE'){
      throw new MO.TError('Html table is invalid.');
   }
   if(ps == pt){
      return false;
   }
   // 移动处理
   if(ph.moveRow){
      // 原始处理
      ph.moveRow(ps, pt);
   }else{
      // 兼容处理
      var hb = ph.getElementsByTagName('tbody')[0];
      var sr = hb.rows[ps];
      var tr = hb.rows[pt];
      if((sr == null) || (tr == null)){
         return false;
      }
      var nr = null;
      if(ps <= pt){
         nr = tr;
         while(nr = nr.nextSibling){
            if(nr.tagName == 'TR'){
               break;
            }
         }
      }
      if(nr == null){
         hb.insertBefore(sr, tr);
      }else{
         if(nr == null){
            hb.appendChild(sr);
         }else{
            hb.insertBefore(sr, nr);
         }
      }
   }
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
// @param p:html:HtmlTag 页面标签
//==========================================================
MO.RHtml.prototype.free = function RHtml_free(p){
   return null;
}

//   //==========================================================
//   MO.RHtml.prototype.clone = function RHtml_clone(o, s, t){
//      if(!t){
//         t = s.cloneNode(true);
//      }
//      // 设置名称
//      if(s._pname){
//         o[s._pname] = t;
//      }
//      if(s._ptyName){
//         o[s._ptyName] = t;
//      }
//      // 复制事件
//      var e = REvent.find(s).events;
//      t._psource = s;
//      for(var n in e){
//         t[e[n].handle] = s[e[n].handle];
//         if(t[e[n].handle]){
//            RHtml.link(t, '_plink', o);
//         }
//      }
//      // 复制子
//      var p = s.children;
//      var n = p.length;
//      while(--n >= 0){
//         RHtml_clone(o, p[n], t.children[n]);
//      }
//      return t;
//   }
//   
//   //==========================================================
//   // <T>计算一个控件到指定容器的位置。</T>
//   //
//   // @method
//   // @param h:panel:<Html> 页面对象
//   // @param t:top<Html> 顶层页面对象
//   //==========================================================
//   // 计算 table的 offsets. 
//   // 计算 绝对定位的元素(position:absolute). 
//   // 在其它容器内出现的Scroll offsets(scrollLeft,scrollTop). 
//   // 所有父元素溢出的边框(overflow:visible). 
//   // 误算绝对定位的父元素. 
//   MO.RHtml.prototype.offsetPosition = function RHtml_offsetPosition(h, t){
//      var p = new TPoint();
//      while(h != t){
//         p.x += h.offsetLeft - h.scrollLeft;
//         p.y += h.offsetTop - h.scrollTop;
//         if('absolute' != RHtml.currentStyle(h).position){
//            //debugger;
//            //break;
//         }
//         p.x += h.clientLeft;
//         p.y += h.clientTop;
//         h = h.offsetParent;
//      }
//      return p;
//   }
//   //==========================================================
//   MO.RHtml.prototype.offsetX = function RHtml_offsetX(h){
//      var x = 0;
//      while(h){
//         x += h.offsetLeft;
//         h = h.offsetParent;
//      }
//      return x;
//   }
//   //==========================================================
//   MO.RHtml.prototype.offsetY = function RHtml_offsetY(h){
//      var y = 0;
//      while(h){
//         y += h.offsetTop;
//         h = h.offsetParent;
//      }
//      return y;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.bodyWidth = function RHtml_bodyWidth(doc){
//      return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.bodyHeight = function RHtml_bodyHeight(doc){
//      return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.frameHeight = function RHtml_frameHeight(f){
//      var hd = f.contentWindow.document;
//      var oh = hd.body.scrollHeight;
//      var sh = hd.documentElement.scrollHeight;
//      return Math.max(oh, sh);
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.scrollWidth = function RHtml_scrollWidth(h){
//      var r = 0;
//      if(h.offsetWidth){
//         r += h.offsetWidth;
//      }
//      if(h.borderTopWidth){
//         r -= parseInt(h.borderLeftWidth);
//      }
//      if(h.borderBottomWidth){
//         r -= parseInt(h.borderRightWidth);
//      }
//      if(h.clientWidth){
//         r -= h.clientWidth;
//      }
//      return r;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.scrollHeight = function RHtml_scrollHeight(h){
//      var r = 0;
//      if(h.offsetHeight){
//         r += h.offsetHeight;
//      }
//      if(h.borderTopWidth){
//         r -= parseInt(h.borderTopWidth);
//      }
//      if(h.borderBottomWidth){
//         r -= parseInt(h.borderBottomWidth);
//      }
//      if(h.clientHeight){
//         r -= h.clientHeight;
//      }
//      return r;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.currentStyle = function RHtml_currentStyle(p){
//      if(p.currentStyle){
//         return p.currentStyle;
//      }
//      return window.getComputedStyle(p, null);
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.point = function RHtml_point(o, p){
//      return this.toPoint(new TPoint(), o, p);
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.toPoint = function RHtml_toPoint(r, o, p){
//      if(r && o){
//         p = RObject.nvl(p, window.document.body);
//         var cs = RHtml.currentStyle(o);
//         r.x = -RInt.parse(cs.borderLeftWidth);
//         r.y = -RInt.parse(cs.borderTopWidth);
//         while(o && o != p){
//            r.x += o.offsetLeft - o.scrollLeft;
//            r.y += o.offsetTop - o.scrollTop;
//            if('absolute' != RHtml.currentStyle(o).position){
//               r.x += o.clientLeft;
//               r.y += o.clientTop;
//            }
//            o = o.offsetParent;
//         }
//      }
//      return r;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.rect = function RHtml_rect(o, p){
//      return this.toRect(new TRect(), o, p);
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.toRect = function RHtml_toRect(r, o, p){
//      if(r && o){
//         p = RObject.nvl(p, window.document.body);
//         var cs = RHtml.currentStyle(o);
//         r.left = -RInt.parse(cs.borderLeftWidth);
//         r.top = -RInt.parse(cs.borderTopWidth);
//         var w = o.offsetWidth; w = o.offsetWidth-1;
//         var h = o.offsetHeight; h = o.offsetHeight-1;
//         while(o && o != p){
//            r.left += o.offsetLeft - o.scrollLeft;
//            r.top += o.offsetTop - o.scrollTop;
//            if('absolute' != RHtml.currentStyle(o).position){
//               r.left += o.clientLeft;
//               r.top += o.clientTop;
//            }
//            o = o.offsetParent;
//         }
//         r.right = r.left + w;
//         r.bottom = r.top + h;
//      }
//      return r;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.top = function RHtml_top(h){
//      var r = 0;
//      if(h){
//         var cs = RHtml.currentStyle(o);
//         r = -RInteger.parse(cs.borderTopWidth);
//         while(h){
//            r += h.offsetTop - h.scrollTop;
//            if('absolute' != RHtml.currentStyle(o).position){
//               r += h.clientTop;
//            }
//            h = h.offsetParent;
//         }
//      }
//      return r;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.clientRect = function RHtml_clientRect(o){
//      if(o){
//         var x = 0;
//         var y = 0;
//         var w = o.offsetWidth-1;
//         var h = o.offsetHeight-1;
//         while(o){
//            x += o.offsetLeft;
//            y += o.offsetTop;
//            o = o.offsetParent;
//         }
//         return new TRect(x, y, x+w, y+h);
//      }
//      return null;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.offsetRect = function RHtml_offsetRect(o){
//      if(o){
//         var x = 0;
//         var y = 0;
//         var w = o.offsetWidth-1;
//         var h = o.offsetHeight-1;
//         while(o){
//            x += o.offsetLeft + o.clientLeft;
//            y += o.offsetTop + o.clientTop;
//            o = o.offsetParent;
//         }
//         return new TRect(x, y, x+w, y+h);
//      }
//      return null;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.clear = function RHtml_clear(h){
//      if(h){
//         var cns = h.children;
//         if(cns && cns.length){
//            for(var n=cns.length-1; n>=0; n--){
//               var cn = cns[n];
//               if(cn.children && cn.children.length){
//                  this.clear(cn);
//               }
//               h.removeChild(cn);
//            }
//         }
//      }
//   }
//   
//   //==========================================================
//   // HtmlObject, Rect
//   // HtmlObject, left, top, width, height
//   //
//   //==========================================================
//   MO.RHtml.prototype.setRect = function RHtml_setRect(h, r){
//      if(h && h.style){
//         var s = h.style;
//         s.left = r.left;
//         s.top = r.top;
//         s.width = r.width();
//         s.height = r.height();
//      }
//   }
//   
//   //==========================================================
//   // HtmlObject, left, top, width, height
//   //
//   //==========================================================
//   MO.RHtml.prototype.setBounds = function RHtml_setBounds(r, l, t, w, h){
//      if(r && r.style){
//         var s = r.style;
//         if(null != l){
//            s.left = l;
//         }
//         if(null != t){
//            s.top = t;
//         }
//         if(null != w){
//            s.width = w;
//         }
//         if(null != h){
//            s.height = h;
//         }
//      }
//   }
//   
//   //==========================================================
//   // Object, Rect
//   //
//   //==========================================================
//   MO.RHtml.prototype.setPixelRect = function RHtml_setPixelRect(o, r){
//      if(o && o.style){
//         var s = o.style;
//         s.pixelLeft = r.left;
//         s.pixelTop = r.top;
//         s.pixelWidth = r.width();
//         s.pixelHeight = r.height();
//      }
//   }
//   
//   //==========================================================
//   // HtmlObject, left, top, width, height
//   //
//   //==========================================================
//   MO.RHtml.prototype.setPixelBounds = function RHtml_setPixelBounds(o, l, t, w, h){
//      if(o && o.style){
//         var s = o.style;
//         if(null != l){
//            s.pixelLeft = l;
//         }
//         if(null != t){
//            s.pixelTop = t;
//         }
//         if(null != w){
//            s.pixelWidth = w;
//         }
//         if(null != h){
//            s.pixelHeight = h;
//         }
//      }
//   }
//   
//   //==========================================================
//   // source, target
//   //
//   //==========================================================
//   MO.RHtml.prototype.changeWidth = function RHtml_changeWidth(s, t){
//      if(s && t){
//         //var sw = parseInt(s.currentStyle.paddingLeft) + parseInt(s.currentStyle.paddingRight);
//         var ts = RHtml.currentStyle(t);
//         var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
//         t.style.pixelWidth = s.offsetWidth - tw;
//      }
//   }
//   
//   //==========================================================
//   // Html, Object
//   //
//   //==========================================================
//   MO.RHtml.prototype.showNodes = function RHtml_showNodes(h, o){
//      if(h && h.childNodes){
//         for(var n=0; n<h.childNodes.length; n++){
//            var c = h.childNodes(n);
//            if(c.tagName && c.style){
//               c.style.display = 'block';
//            }else if(c.nodeName == '#text'){
//               c.nodeValue = o[n];
//            }
//         }
//      }
//   }
//   
//   //==========================================================
//   // Html, Object
//   //
//   //==========================================================
//   MO.RHtml.prototype.hideNodes = function RHtml_hideNodes(h, o){
//      if(h && h.childNodes){
//         for(var n=0; n<h.childNodes.length; n++){
//            var c = h.childNodes(n);
//            if(c.tagName && c.style){
//               c.style.display = 'none';
//            }else if(c.nodeName == '#text'){
//               o[n] = c.nodeValue;
//               c.nodeValue = '';
//            }
//         }
//      }
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.showChildren = function RHtml_showChildren(h){
//      if(h && h.children){
//         for(var n=0; n<h.children.length; n++){
//            var c = h.children(n);
//            if(c.tagName && c.style){
//               c.style.display = 'block';
//            }
//         }
//      }
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.hideChildren = function RHtml_hideChildren(h){
//      if(h && h.children){
//         for(var n=0; n<h.children.length; n++){
//            var c = h.children(n);
//            if(c.tagName && c.style){
//               c.style.display = 'none';
//            }
//         }
//      }
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.posParent = function RHtml_posParent(h){
//      while(h){
//         if('visible' != h.currentStyle.overflow){
//            return h;
//         }
//         h = h.offsetParent;
//      }
//      return null;
//   }
//   
//   //==========================================================
//   //
//   //==========================================================
//   MO.RHtml.prototype.form = function RHtml_form(h){
//      if(h){
//         var f = this.parent(h, 'FORM');
//         return f ? f : h.ownerDocument.forms[0];
//      }
//      return window.document.forms[0];
//   }
//   
//   //==========================================================
//   // uri, width, height
//   //==========================================================
//   MO.RHtml.prototype.popup = function RHtml_popup(u, w, h){
//      var l = (screen.width - w)/2;
//      var t = (screen.height - h)/2 - 20;
//      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
//      window.open(u, '_blank', s);
//   }
//   
//   //==========================================================
//   // 可以获得一些保护内容的值
//   //==========================================================
//   MO.RHtml.prototype.selectText = function RHtml_selectText(){
//      var ip = document.getElementById(id);
//      ip.select();
//      return document.selection.createRange().text;
//   }
//   
//   
//   MO.RHtml.getTRNode = function getTRNode(nowTR, sibling) {
//      while(nowTR = nowTR[sibling]){
//         if(nowTR.tagName == 'TR'){
//            break;
//         }
//      }
//      return nowTR;
//   }
//..........................................................
// 实例化内容
MO.RHtml = new MO.RHtml();
