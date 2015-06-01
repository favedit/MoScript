//==========================================================
// <T>页面对象的工具类</T>
//
// @tool
// @author maocy
// @version 1.0.1
//==========================================================
function TBuilder(){
   var o = this;
   ///@attrbute HtmlTag 获取窗口的Window句柄
   o.hWindow      = window;
   ///@attrbute HtmlTag 获取窗口的document
   o.hDocument    = window.document;
   // @method
   o.create       = TBuilder_create;
   o.newText      = TBuilder_newText;
   o.newSpan      = TBuilder_newSpan;
   o.newDiv       = TBuilder_newDiv;
   o.newImage     = TBuilder_newImage;
   o.newIcon      = TBuilder_newIcon;
   o.newTable     = TBuilder_newTable;
   o.newEdit      = TBuilder_newEdit;
   o.newCheck     = TBuilder_newCheck;
   o.newSelect    = TBuilder_newSelect;
   // @method
   o.append       = TBuilder_append;
   o.appendText   = TBuilder_appendText;
   o.appendSpan   = TBuilder_appendSpan;
   o.appendDiv    = TBuilder_appendDiv;
   o.appendImage  = TBuilder_appendImage;
   o.appendIcon   = TBuilder_appendIcon;
   o.appendEmpty  = TBuilder_appendEmpty;
   o.appendTable  = TBuilder_appendTable;
   o.appendRow    = TBuilder_appendRow;
   o.appendCell   = TBuilder_appendCell;
   o.appendEdit   = TBuilder_appendEdit;
   o.appendCheck  = TBuilder_appendCheck;
   o.appendSelect = TBuilder_appendSelect;
   o.dispose      = TBuilder_dispose;
   return o;
}

//==========================================================
// <T>创建一个指定类型的页面对象。</T>
//
// @method
// @param t:type:String 对象类型
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_create(t, c){
   var o = this.hDocument.createElement(t);
   if(c){
      o.className = c;
   }
   return o;
}

//==========================================================
// <T>创建一个文本显示框。</T>
//
// @method
// @param t:text:String 文本内容，可以为HTML
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newText(t, c){
   var o = this.create('SPAN', c);
   o.innerHTML = t;
   return o;
}

//==========================================================
// <T>创建一个浮动块。</T>
//
// @method
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newSpan(c){
   return this.create('SPAN', c);
}

//==========================================================
// <T>创建一个层。</T>
//
// @method
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newDiv(c){
   return this.create('DIV', c);
}

//==========================================================
// <T>创建一个图像。</T>
//
// @method
// @param s:src:String 图片路径
// @param c:css:String 图片的样式表
// @param w:width:Integer 图片高度
// @param h:height:Integer 图片宽度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newImage(s, c, w, h){
   var o = this.create('IMG', c);
   if(s){
      o.src = RRes.imagePath(s);
   }
   if(w){
      o.style.width = w;
   }
   if(h){
      o.style.height = h;
   }
   return o;
}

//==========================================================
// <T>创建一个图标。</T>
//
// @method
// @param s:src:String 图片路径
// @param c:css:String 图片的样式表
// @param w:width:Integer 图片高度
// @param h:height:Integer 图片宽度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newIcon(s, c, w, h){
   var o = this.create('IMG', RString.nvl(c, 'Tag_Icon'));
   o.align = 'absmiddle';
   if(s){
      o.src = RRes.iconPath(s);
   }
   if(w){
      o.style.width = w;
   }
   if(h){
      o.style.height = h;
   }
   return o;
}

//==========================================================
// <T>创建一个表格。</T>
//
// @method
// @param c:css:String 样式名称
// @param b:border:Integer 边框宽度
// @param s:spacing:Integer 单元格之间的宽度
// @param d:padding:Integer 单元格内对象和边框间的距离
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newTable(c, b, s, d){
   var o = this.create('TABLE', c);
   o.frame = 'box';
   o.border = RInt.nvl(b);
   o.cellSpacing = RInt.nvl(s);
   o.cellPadding = RInt.nvl(d);
   return o;
}

//==========================================================
// <T>创建一个文本输入框。</T>
//
// @method
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newEdit(c){
   return this.create("<INPUT type='text'></INPUT>", c);
}

//==========================================================
// <T>创建一个复选框。</T>
//
// @method
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newCheck(c){
   return this.create("<INPUT type='checkbox'></INPUT>", c);
}

//==========================================================
// <T>创建一个下拉选择框。</T>
//
// @method
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_newSelect(c){
   return this.create('SELECT>', c);
}

//==========================================================
// <T>创建一个指定类型的页面对象，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param t:type:String 对象类型
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_append(p, t, c){
   var o = this.create(t, c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个文本显示框，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param t:text:String 文本内容
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendText(p, t, c){
   var o = this.newText(t, c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个浮动块，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendSpan(p, c){
   var o = this.newSpan(c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个层，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendDiv(p, c){
   var o = this.newDiv(c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个图像，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param s:src:String 来源
// @param c:css:String 样式名称
// @param w:width:Integer 图片的显示宽度
// @param h:height:Integer 图片的显示宽度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendImage(p, s, c, w, h){
   var o = this.newImage(s, c, w, h);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个图标，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param s:src:String 来源
// @param c:css:String 样式名称
// @param w:width:Integer 图片的显示宽度
// @param h:height:Integer 图片的显示宽度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendIcon(p, s, c, w, h){
   var o = this.newIcon(s, c, w, h);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个空白占位符，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param w:width:Integer 图片的显示宽度
// @param h:height:Integer 图片的显示宽度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendEmpty(p, w, h){
   var o = this.newIcon('n', null, w, h);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个表格，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @param b:border:Integer 边框宽度
// @param s:spacing:Integer 单元格之间的宽度
// @param d:padding:Integer 单元格内对象和边框间的距离
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendTable(p, c, b, s, d){
   var o = this.newTable(c, b, s, d);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个表格行，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @param index:index:Integer 插入的行号
// @param width:width:Integer 行宽度
// @param height:height:Integer 行高度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendRow(p, c, i, w, h){
   var o = i ? p.insertRow(i) : p.insertRow();
   if(c){
      o.className = c;
   }
   if(w){
      o.width = w;
   }
   if(h){
      o.height = h;
   }
   return o;
}

//==========================================================
// <T>创建一个表格单元格，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @param i:index:Integer 插入的列号
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendCell(p, c, i, w, h){
   var o = i ? p.insertCell(i) : p.insertCell();
   if(c){
      o.className = c;
   }
   if(w){
      o.width = w;
   }
   if(h){
      o.height = h;
   }
   return o;
}

//==========================================================
// <T>创建一个文本输入框，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendEdit(p, c){
   var o = this.newEdit(c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个复选框，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendCheck(p, c){
   var o = this.newCheck(c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>创建一个下拉选择框，追加在指定的父对象内。</T>
//
// @method
// @param p:parent:<HTML> 父页面对象
// @param c:css:String 样式名称
// @return <HTML> 页面对象
//==========================================================
function TBuilder_appendSelect(p, c){
   var o = this.newSelect(c);
   p.appendChild(o);
   return o;
}

//==========================================================
// <T>释放当前对象的所有资源。</T>
//
// @method
//==========================================================
function TBuilder_dispose(){
   var o = this;
   o.hWindow = null;
   o.hDocument = null;
}
