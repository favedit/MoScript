with(MO){
   //==========================================================
   // <T>页面构建类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.RBuilder = function RBuilder(){
      return this;
   }

   //==========================================================
   // <T>创建一个页面对象。</T>
   //
   // @method
   // @param h:html:HtmlTag 页面元素
   // @param t:tagName:String 标签名称
   // @param s:styleName:String 样式名称
   // @return HtmlTag 页面对象
   //==========================================================
   MO.RBuilder.prototype.create = function RBuilder_create(h, t, s){
      var o = this;
      var d = null;
      if(h.ownerDocument){
         d = h.ownerDocument;
      }else if(h.hDocument){
         d = h.hDocument;
      }else{
         d = h;
      }
      var h = d.createElement(t);
      if(s){
         h.className = s;
      }
      return h;
   }

   //==========================================================
   // <T>创建一个页面图标对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图标对象
   //==========================================================
   MO.RBuilder.prototype.createIcon = function RBuilder_createIcon(d, s, u, w, h){
      var r = this.create(d, 'IMG', RString.nvl(s, 'Tag_Icon'));
      r.align = 'absmiddle';
      if(u){
         r.src = RResource.iconPath(u);
      }
      if(w){
         r.style.width = w + 'px';
      }
      if(h){
         r.style.height = h + 'px';
      }
      return r;
   }

   //==========================================================
   // <T>创建一个页面图片对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图片对象
   //==========================================================
   MO.RBuilder.prototype.createImage = function RBuilder_createImage(d, s, u, w, h){
      var r = this.create(d, 'IMG', u);
      if(u){
         r.src = RResource.imagePath(u);
      }
      if(w){
         r.style.width = w;
      }
      if(h){
         r.style.height = h;
      }
      return r;
   }

   //==========================================================
   // <T>创建一个页面文本对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @param v:value:String 内容
   // @return HtmlInputTag 页面文本对象
   //==========================================================
   MO.RBuilder.prototype.createText = function RBuilder_createText(d, s, v){
      var r = this.create(d, 'SPAN', s);
      if(v){
         r.innerHTML = v;
      }
      return r;
   }

   //==========================================================
   // <T>创建一个页面按钮对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   MO.RBuilder.prototype.createButton = function RBuilder_createButton(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'button';
      return r;
   }

   //==========================================================
   // <T>创建一个页面复选框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   MO.RBuilder.prototype.createCheck = function RBuilder_createCheck(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'checkbox';
      return r;
   }

   //==========================================================
   // <T>创建一个页面单选框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面单选框对象
   //==========================================================
   MO.RBuilder.prototype.createRadio = function RBuilder_createRadio(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'radio';
      return r;
   }

   //==========================================================
   // <T>创建一个页面编辑框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   MO.RBuilder.prototype.createEdit = function RBuilder_createEdit(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'text';
      return r;
   }

   //==========================================================
   // <T>创建一个页面文件框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   MO.RBuilder.prototype.createFile = function RBuilder_createFile(d, s){
      var r = this.create(d, "INPUT", s);
      r.type = 'file';
      return r;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlSpanTag 页面浮动块对象
   //==========================================================
   MO.RBuilder.prototype.createSpan = function RBuilder_createSpan(d, s){
      return this.create(d, 'SPAN', s);
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlDivTag 页面浮动块对象
   //==========================================================
   MO.RBuilder.prototype.createDiv = function RBuilder_createDiv(d, s){
      return this.create(d, 'DIV', s);
   }

   //==========================================================
   // <T>创建一个页面表格。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @param b:border:Integer 边框宽度
   // @param cs:cellSpaceing:Integer 单元格之间的宽度
   // @param cp:cellPadding:Integer 单元格内文字与单元格边框之间的距离
   // @return HtmlTag 表格对象
   //==========================================================
   MO.RBuilder.prototype.createTable = function RBuilder_createTable(d, s, b, cs, cp){
      var h = this.create(d, 'TABLE', s);
      if(b){
         h.border = RInteger.nvl(b);
      }
      h.cellSpacing = RInteger.nvl(cs);
      h.cellPadding = RInteger.nvl(cp);
      return h;
   }

   //==========================================================
   // <T>创建一个页面表格行。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @return HtmlTrTag 表格行对象
   //==========================================================
   MO.RBuilder.prototype.createTableRow = function RBuilder_createTableRow(d, s){
      var h = this.create(d, 'TR', s);
      return h;
   }

   //==========================================================
   // <T>创建一个页面表格格子。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @return HtmlTdTag 表格格子对象
   //==========================================================
   MO.RBuilder.prototype.createTableCell = function RBuilder_createTableCell(d, s){
      var h = this.create(d, 'TD', s);
      return h;
   }

   //==========================================================
   // <T>创建一个文档碎片。</T>
   //
   // @method
   // @param document:HtmlDocument 页面文档对象
   // @return HtmlTag 表格对象
   //==========================================================
   MO.RBuilder.prototype.createFragment = function RBuilder_createFragment(document){
      var hDocument = null;
      if(document.ownerDocument){
         hDocument = document.ownerDocument;
      }else if(document.hDocument){
         hDocument = document.hDocument;
      }else{
         hDocument = document;
      }
      var hElement = hDocument.createDocumentFragment();
      hElement.__fragment = true;
      return hElement;
   }

   //==========================================================
   // <T>追加一个页面对象，如果存在父容器就放在里面，没有就放在当前页面里。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param t:tagName:String 标签名称
   // @param s:styleName:String 样式名称
   // @return HtmlTag 页面对象
   // @see RBuilder.create
   //==========================================================
   MO.RBuilder.prototype.append = function RBuilder_append(p, t, s){
      var r = RBuilder.create(p.ownerDocument, t, s);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }

   //==========================================================
   // <T>追加一个页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图标对象
   //==========================================================
   MO.RBuilder.prototype.appendIcon = function RBuilder_appendIcon(p, s, u, w, h){
      var r = this.createIcon(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面图片对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图片对象
   //==========================================================
   MO.RBuilder.prototype.appendImage = function RBuilder_appendImage(p, s, u, w, h){
      var r = this.createImage(p.ownerDocument, s, u, w, h);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个空白页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HTML html容器
   // @param w:width:Integer 图片的显示宽度
   // @param h:height:Integer 图片的显示宽度
   // @return HtmlImgTag 空白页面图标对象
   //==========================================================
   MO.RBuilder.prototype.appendEmpty = function RBuilder_appendEmpty(p, w, h){
      var r = this.createIcon(p.ownerDocument, null, 'n', w, h);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面文本对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param v:value:String 内容
   // @return HtmlInputTag 页面文本对象
   //==========================================================
   MO.RBuilder.prototype.appendText = function RBuilder_appendText(p, s, v){
      var r = this.createText(p.ownerDocument, s, v);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面按钮对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面按钮对象
   //==========================================================
   MO.RBuilder.prototype.appendButton = function RBuilder_appendButton(p, s){
      var r = this.createButton(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面复选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   MO.RBuilder.prototype.appendCheck = function RBuilder_appendCheck(p, s){
      var r = this.createCheck(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面单选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面单选框对象
   //==========================================================
   MO.RBuilder.prototype.appendRadio = function RBuilder_appendRadio(p, s){
      var r = this.createRadio(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面编辑框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   MO.RBuilder.prototype.appendEdit = function RBuilder_appendEdit(p, s){
      var r = this.createEdit(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面文件框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   MO.RBuilder.prototype.appendFile = function RBuilder_appendFile(p, s){
      var r = this.createFile(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlSpanTag 页面浮动块对象
   //==========================================================
   MO.RBuilder.prototype.appendSpan = function RBuilder_appendSpan(p, s){
      var r = this.createSpan(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlDivTag 页面浮动块对象
   //==========================================================
   MO.RBuilder.prototype.appendDiv = function RBuilder_appendDiv(p, s){
      var r = this.createDiv(p.ownerDocument, s);
      p.appendChild(r);
      return r;
   }

   //==========================================================
   // <T>追加一个页面表格对象，放在父容器里面，并返回这个表格对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:styleName:String 样式名称
   // @param b:border:Integer 边框宽度
   // @param cs:cellSpaceing:Integer 单元格之间的宽度
   // @param cp:cellPadding:Integer 单元格内文字与单元格边框之间的距离
   // @return HtmlTag 表格对象
   // @see RBuilder.createTable
   //==========================================================
   MO.RBuilder.prototype.appendTable = function RBuilder_appendTable(p, s, b, cs, cp){
      var r = this.createTable(p.ownerDocument, s, b, cs, cp);
      if(p){
         p.appendChild(r);
      }else{
         this.hDocument.body.appendChild(r);
      }
      return r;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param i:index:Integer 索引位置
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   MO.RBuilder.prototype.appendTableRow = function RBuilder_appendTableRow(p, s, i, h){
      var r = null;
      if(i == null){
         if(RBrowser.isBrowser(EBrowser.Explorer)){
            r = p.insertRow();
         }else{
            r = p.insertRow(-1);
         }
      }else{
         r = p.insertRow(i);
      }
      if(s){
         r.className = s;
      }
      if(h){
         r.height = h;
      }
      return r;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   MO.RBuilder.prototype.appendTableRowCell = function RBuilder_appendTableRowCell(p, s, w, h){
      var o = this;
      var hr = o.appendTableRow(p, null, null, w);
      var hc = o.appendTableCell(hr, s, null, h);
      return hc;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param i:index:Integer 索引位置
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   MO.RBuilder.prototype.appendTableCell = function RBuilder_appendTableCell(p, s, i, w){
      var o = this;
      var r = null;
      if(i == null){
         r = o.create(p, 'TD', s);
         p.appendChild(r);
         //if(RBrowser.isBrowser(EBrowser.Explorer)){
         //   r = p.insertCell();
         //}else{
         //   r = p.insertCell(-1);
         //}
      }else{
         r = p.insertCell(i);
      }
      if(s){
         r.className = s;
      }
      if(w){
         r.width = w;
      }
      return r;
   }
   //..........................................................
   // 实例化内容
   MO.RBuilder = new RBuilder();
   MO.Window = new Object();
   MO.Window.Builder = MO.RBuilder;
}
