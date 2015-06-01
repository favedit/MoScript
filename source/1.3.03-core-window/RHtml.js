with(MO){
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
      //..........................................................
      // @method
      o.uid             = RHtml_uid;
      // @method
      o.fullscreen      = RHtml_fullscreen;
      // @method
      o.displayGet      = RHtml_displayGet;
      o.displaySet      = RHtml_displaySet;
      o.visibleGet      = RHtml_visibleGet;
      o.visibleSet      = RHtml_visibleSet;
      o.textGet         = RHtml_textGet;
      o.textSet         = RHtml_textSet;
      o.checkGet        = RHtml_checkGet;
      o.checkSet        = RHtml_checkSet;
      o.radioGet        = RHtml_radioGet;
      o.radioSet        = RHtml_radioSet;
      o.cursorSet       = RHtml_cursorSet;
      // @method
      o.linkGet         = RHtml_linkGet;
      o.linkSet         = RHtml_linkSet;
      // @method
      o.clientPosition  = RHtml_clientPosition;
      o.clientX         = RHtml_clientX;
      o.clientY         = RHtml_clientY;
      // @method
      o.setSize         = RHtml_setSize;
      // @method
      o.toText          = RHtml_toText;
      o.toHtml          = RHtml_toHtml;
      // @method
      o.eventSource     = RHtml_eventSource;
      // @method
      o.get             = RHtml_get;
      o.parent          = RHtml_parent;
      o.searchLinker    = RHtml_searchLinker;
      o.searchObject    = RHtml_searchObject;
      // @method
      o.tableMoveRow    = RHtml_tableMoveRow;
      // @method
      o.free            = RHtml_free;




      // @method
      // 协助在HTML元素上存储所有属性设置信息，系统退出时，会自动删掉上面的所有关联。
      // Method
      //o.offsetPosition = RHtml_offsetPosition;
      //o.offsetX        = RHtml_offsetX;
      //o.offsetY        = RHtml_offsetY;
      //o.scrollWidth    = RHtml_scrollWidth;
      //o.scrollHeight   = RHtml_scrollHeight;
      //o.point          = RHtml_point;
      //o.toPoint        = RHtml_toPoint;
      //o.rect           = RHtml_rect;
      //o.toRect         = RHtml_toRect;
      //o.top            = RHtml_top;
      //o.clientRect     = RHtml_clientRect;
      //o.offsetRect     = RHtml_offsetRect;
      //o.changeWidth    = RHtml_changeWidth;
      //o.clear          = RHtml_clear;
      //o.setRect        = RHtml_setRect;
      //o.setBounds      = RHtml_setBounds;
      //o.setPixelRect   = RHtml_setPixelRect;
      //o.setPixelBounds = RHtml_setPixelBounds;
      //o.showNodes      = RHtml_showNodes;
      //o.hideNodes      = RHtml_hideNodes;
      //o.showChildren   = RHtml_showChildren;
      //o.hideChildren   = RHtml_hideChildren;
      //o.posParent      = RHtml_posParent;
      //o.form           = RHtml_form;
      //o.popup          = RHtml_popup;
      //o.bodyWidth      = RHtml_bodyWidth;
      //o.bodyHeight     = RHtml_bodyHeight;
      //o.frameHeight    = RHtml_frameHeight;
      //o.selectText     = RHtml_selectText;
      //o.currentStyle   = RHtml_currentStyle;
      //o.clone          = RHtml_clone;
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
   MO.RHtml_uid = function RHtml_uid(v){
      var r = v.__puuid;
      if(r == null){
         r = v.__puuid = RHtml._nextUid++;
      }
      return r;
   }

   //==========================================================
   // <T>获得对象的唯一编号。</T>
   // <P>外部会引用这个函数，不要在内部使用this对象。</P>
   //
   // @method
   // @param v:value:Object 对象
   // @return Integer 编号
   //==========================================================
   MO.RHtml_fullscreen = function RHtml_fullscreen(h, f){
      if(f){
         // 进入全屏模式
         if (h.requestFullscreen){
            h.requestFullscreen();
         }else if(h.mozRequestFullScreen){
            h.mozRequestFullScreen();
         }else if(h.webkitRequestFullScreen){
            h.webkitRequestFullScreen();
         }
      }else{
         // 退出全屏模式
         if (h.exitFullscreen){
            h.exitFullscreen();
         }else if(h.mozCancelFullScreen){
            h.mozCancelFullScreen();
         }else if(h.webkitCancelFullScreen){
            h.webkitCancelFullScreen();
         }
      }
   }

   //==========================================================
   // <T>获得显示性。</T>
   //
   // @method
   // @param h:html:HtmlTag 页面对象
   // @return Boolean 显示性
   //==========================================================
   MO.RHtml_displayGet = function RHtml_displayGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
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
   MO.RHtml_displaySet = function RHtml_displaySet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
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
   MO.RHtml_visibleGet = function RHtml_visibleGet(h){
      var r = null;
      var s = h.style.display;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
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
   MO.RHtml_visibleSet = function RHtml_visibleSet(h, v){
      var s = null;
      if(RBrowser.isBrowser(EBrowser.Explorer)){
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
   MO.RHtml_textGet = function RHtml_textGet(h, v){
      var r = null;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
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
   MO.RHtml_textSet = function RHtml_textSet(h, v){
      if(RBrowser.isBrowser(EBrowser.FireFox)){
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
   MO.RHtml_checkGet = function RHtml_checkGet(h){
      return RBool.toString(h.checked);
   }

   //==========================================================
   // <T>设置复选框内容。</T>
   //
   // @method
   // @param h:html:HtmlTag 页面对象
   // @param v:value:String 文本内容
   //==========================================================
   MO.RHtml_checkSet = function RHtml_checkSet(h, v){
      h.checked = RBool.isTrue(v);
   }

   //==========================================================
   // <T>获得单选框内容。</T>
   //
   // @method
   // @param hs:html:HtmlTag 页面对象
   // @return String 文本内容
   //==========================================================
   MO.RHtml_radioGet = function RHtml_radioGet(hs){
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
   MO.RHtml_radioSet = function RHtml_radioSet(hs, v){
      if(hs){
         var c = hs.length;
         for(var n=0; n < c; n++){
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
   MO.RHtml_cursorSet = function RHtml_cursorSet(h, v){
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
   MO.RHtml_linkGet = function RHtml_linkGet(h, n){
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
   MO.RHtml_linkSet = function RHtml_linkSet(h, n, v){
      var o = this;
      var ls = o._links;
      var u = o.uid(h);
      var i = ls[u];
      if(!i){
         i = ls[u] = new THtmlItem();
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
   MO.RHtml_clientPosition = function RHtml_clientPosition(hTag, hTop){
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
   MO.RHtml_clientX = function RHtml_clientX(p, t){
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
   MO.RHtml_clientY = function RHtml_clientY(p, t){
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
   MO.RHtml_setSize = function RHtml_setSize(h, s){
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
   MO.RHtml_toText = function RHtml_toText(p){
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
   MO.RHtml_toHtml = function RHtml_toHtml(p){
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
   MO.RHtml_eventSource = function RHtml_eventSource(p){
      return p.srcElement ? p.srcElement : p.target;
   }

   //==========================================================
   // <T>根据名称获得页面元素。</T>
   //
   // @method
   // @param name:String 名称
   // @return HtmlTag 页面元素
   //==========================================================
   MO.RHtml_get = function RHtml_get(name){
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
   MO.RHtml_parent = function RHtml_parent(tag, typeName){
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
   MO.RHtml_searchLinker = function RHtml_searchLinker(h, c){
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
   MO.RHtml_searchObject = function RHtml_searchObject(h, n){
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
   MO.RHtml_tableMoveRow = function RHtml_tableMoveRow(ph, ps, pt){
      // 检查参数
      if(ph.tagName != 'TABLE'){
         throw new TError('Html table is invalid.');
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
   MO.RHtml_free = function RHtml_free(p){
      return null;
   }


















   //==========================================================
   MO.RHtml_clone = function RHtml_clone(o, s, t){
      if(!t){
         t = s.cloneNode(true);
      }
      // 设置名称
      if(s._pname){
         o[s._pname] = t;
      }
      if(s._ptyName){
   	  o[s._ptyName] = t;
      }
      // 复制事件
      var e = REvent.find(s).events;
      t._psource = s;
      for(var n in e){
         t[e[n].handle] = s[e[n].handle];
         if(t[e[n].handle]){
             RHtml.link(t, '_plink', o);
         }
      }
      // 复制子
      var p = s.children;
      var n = p.length;
      while(--n >= 0){
         RHtml_clone(o, p[n], t.children[n]);
      }
      return t;
   }

   //==========================================================
   // <T>计算一个控件到指定容器的位置。</T>
   //
   // @method
   // @param h:panel:<Html> 页面对象
   // @param t:top<Html> 顶层页面对象
   //==========================================================
   // 计算 table的 offsets. 
   // 计算 绝对定位的元素(position:absolute). 
   // 在其它容器内出现的Scroll offsets(scrollLeft,scrollTop). 
   // 所有父元素溢出的边框(overflow:visible). 
   // 误算绝对定位的父元素. 
   MO.RHtml_offsetPosition = function RHtml_offsetPosition(h, t){
      var p = new TPoint();
      while(h != t){
         p.x += h.offsetLeft - h.scrollLeft;
         p.y += h.offsetTop - h.scrollTop;
         if('absolute' != RHtml.currentStyle(h).position){
            //debugger;
            //break;
         }
         p.x += h.clientLeft;
         p.y += h.clientTop;
         h = h.offsetParent;
      }
      return p;
   }
   //==========================================================
   MO.RHtml_offsetX = function RHtml_offsetX(h){
      var x = 0;
      while(h){
         x += h.offsetLeft;
         h = h.offsetParent;
      }
      return x;
   }
   //==========================================================
   MO.RHtml_offsetY = function RHtml_offsetY(h){
      var y = 0;
      while(h){
         y += h.offsetTop;
         h = h.offsetParent;
      }
      return y;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_bodyWidth = function RHtml_bodyWidth(doc){
      return doc.all ? doc.body.scrollWidth : doc.documentElement.scrollWidth;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_bodyHeight = function RHtml_bodyHeight(doc){
      return doc.all ? doc.body.scrollHeight : doc.documentElement.scrollHeight;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_frameHeight = function RHtml_frameHeight(f){
      var hd = f.contentWindow.document;
      var oh = hd.body.scrollHeight;
      var sh = hd.documentElement.scrollHeight;
      return Math.max(oh, sh);
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_scrollWidth = function RHtml_scrollWidth(h){
      var r = 0;
      if(h.offsetWidth){
         r += h.offsetWidth;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderLeftWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderRightWidth);
      }
      if(h.clientWidth){
         r -= h.clientWidth;
      }
      return r;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_scrollHeight = function RHtml_scrollHeight(h){
      var r = 0;
      if(h.offsetHeight){
         r += h.offsetHeight;
      }
      if(h.borderTopWidth){
         r -= parseInt(h.borderTopWidth);
      }
      if(h.borderBottomWidth){
         r -= parseInt(h.borderBottomWidth);
      }
      if(h.clientHeight){
         r -= h.clientHeight;
      }
      return r;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_currentStyle = function RHtml_currentStyle(p){
      if(p.currentStyle){
         return p.currentStyle;
      }
      return window.getComputedStyle(p, null);
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_point = function RHtml_point(o, p){
      return this.toPoint(new TPoint(), o, p);
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_toPoint = function RHtml_toPoint(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.x = -RInt.parse(cs.borderLeftWidth);
         r.y = -RInt.parse(cs.borderTopWidth);
         while(o && o != p){
            r.x += o.offsetLeft - o.scrollLeft;
            r.y += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.x += o.clientLeft;
               r.y += o.clientTop;
            }
            o = o.offsetParent;
         }
      }
      return r;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_rect = function RHtml_rect(o, p){
      return this.toRect(new TRect(), o, p);
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_toRect = function RHtml_toRect(r, o, p){
      if(r && o){
         p = RObject.nvl(p, window.document.body);
         var cs = RHtml.currentStyle(o);
         r.left = -RInt.parse(cs.borderLeftWidth);
         r.top = -RInt.parse(cs.borderTopWidth);
         var w = o.offsetWidth; w = o.offsetWidth-1;
         var h = o.offsetHeight; h = o.offsetHeight-1;
         while(o && o != p){
            r.left += o.offsetLeft - o.scrollLeft;
            r.top += o.offsetTop - o.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r.left += o.clientLeft;
               r.top += o.clientTop;
            }
            o = o.offsetParent;
         }
         r.right = r.left + w;
         r.bottom = r.top + h;
      }
      return r;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_top = function RHtml_top(h){
      var r = 0;
      if(h){
         var cs = RHtml.currentStyle(o);
         r = -RInteger.parse(cs.borderTopWidth);
         while(h){
            r += h.offsetTop - h.scrollTop;
            if('absolute' != RHtml.currentStyle(o).position){
               r += h.clientTop;
            }
            h = h.offsetParent;
         }
      }
      return r;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_clientRect = function RHtml_clientRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft;
            y += o.offsetTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_offsetRect = function RHtml_offsetRect(o){
      if(o){
         var x = 0;
         var y = 0;
         var w = o.offsetWidth-1;
         var h = o.offsetHeight-1;
         while(o){
            x += o.offsetLeft + o.clientLeft;
            y += o.offsetTop + o.clientTop;
            o = o.offsetParent;
         }
         return new TRect(x, y, x+w, y+h);
      }
      return null;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_clear = function RHtml_clear(h){
      if(h){
         var cns = h.children;
         if(cns && cns.length){
            for(var n=cns.length-1; n>=0; n--){
               var cn = cns[n];
               if(cn.children && cn.children.length){
                  this.clear(cn);
               }
               h.removeChild(cn);
            }
         }
      }
   }

   //==========================================================
   // HtmlObject, Rect
   // HtmlObject, left, top, width, height
   //
   //==========================================================
   MO.RHtml_setRect = function RHtml_setRect(h, r){
      if(h && h.style){
         var s = h.style;
         s.left = r.left;
         s.top = r.top;
         s.width = r.width();
         s.height = r.height();
      }
   }

   //==========================================================
   // HtmlObject, left, top, width, height
   //
   //==========================================================
   MO.RHtml_setBounds = function RHtml_setBounds(r, l, t, w, h){
      if(r && r.style){
         var s = r.style;
         if(null != l){
            s.left = l;
         }
         if(null != t){
            s.top = t;
         }
         if(null != w){
            s.width = w;
         }
         if(null != h){
            s.height = h;
         }
      }
   }

   //==========================================================
   // Object, Rect
   //
   //==========================================================
   MO.RHtml_setPixelRect = function RHtml_setPixelRect(o, r){
      if(o && o.style){
         var s = o.style;
         s.pixelLeft = r.left;
         s.pixelTop = r.top;
         s.pixelWidth = r.width();
         s.pixelHeight = r.height();
      }
   }

   //==========================================================
   // HtmlObject, left, top, width, height
   //
   //==========================================================
   MO.RHtml_setPixelBounds = function RHtml_setPixelBounds(o, l, t, w, h){
      if(o && o.style){
         var s = o.style;
         if(null != l){
            s.pixelLeft = l;
         }
         if(null != t){
            s.pixelTop = t;
         }
         if(null != w){
            s.pixelWidth = w;
         }
         if(null != h){
            s.pixelHeight = h;
         }
      }
   }

   //==========================================================
   // source, target
   //
   //==========================================================
   MO.RHtml_changeWidth = function RHtml_changeWidth(s, t){
      if(s && t){
         //var sw = parseInt(s.currentStyle.paddingLeft) + parseInt(s.currentStyle.paddingRight);
         var ts = RHtml.currentStyle(t);
         var tw = parseInt(ts.paddingLeft) + parseInt(ts.paddingRight);
         t.style.pixelWidth = s.offsetWidth - tw;
      }
   }

   //==========================================================
   // Html, Object
   //
   //==========================================================
   MO.RHtml_showNodes = function RHtml_showNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }else if(c.nodeName == '#text'){
               c.nodeValue = o[n];
            }
         }
      }
   }

   //==========================================================
   // Html, Object
   //
   //==========================================================
   MO.RHtml_hideNodes = function RHtml_hideNodes(h, o){
      if(h && h.childNodes){
         for(var n=0; n<h.childNodes.length; n++){
            var c = h.childNodes(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }else if(c.nodeName == '#text'){
               o[n] = c.nodeValue;
               c.nodeValue = '';
            }
         }
      }
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_showChildren = function RHtml_showChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'block';
            }
         }
      }
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_hideChildren = function RHtml_hideChildren(h){
      if(h && h.children){
         for(var n=0; n<h.children.length; n++){
            var c = h.children(n);
            if(c.tagName && c.style){
               c.style.display = 'none';
            }
         }
      }
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_posParent = function RHtml_posParent(h){
      while(h){
         if('visible' != h.currentStyle.overflow){
            return h;
         }
         h = h.offsetParent;
      }
      return null;
   }

   //==========================================================
   //
   //==========================================================
   MO.RHtml_form = function RHtml_form(h){
      if(h){
         var f = this.parent(h, 'FORM');
         return f ? f : h.ownerDocument.forms[0];
      }
      return window.document.forms[0];
   }

   //==========================================================
   // uri, width, height
   //==========================================================
   MO.RHtml_popup = function RHtml_popup(u, w, h){
      var l = (screen.width - w)/2;
      var t = (screen.height - h)/2 - 20;
      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
      window.open(u, '_blank', s);
   }

   //==========================================================
   // 可以获得一些保护内容的值
   //==========================================================
   MO.RHtml_selectText = function RHtml_selectText(){
      var ip = document.getElementById(id);
      ip.select();
      return document.selection.createRange().text;
   }


   MO.getTRNode = function getTRNode(nowTR, sibling) {
      while(nowTR = nowTR[sibling]){
         if(nowTR.tagName == 'TR'){
            break;
         }
      }
      return nowTR;
   }
   //..........................................................
   // 实例化内容
   MO.RHtml = new RHtml();
}
