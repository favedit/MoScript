//==========================================================
// <T>样式接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
function MStyle(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.construct     = RMethod.empty;
   // @method
   o.styleName     = MStyle_styleName;
   o.styleIcon     = MStyle_styleIcon;
   o.styleIconPath = MStyle_styleIconPath;
   // @method
   o.dispose       = RMethod.empty;
   return o;
}

//==========================================================
// <T>获得定义的样式名称。</T>
// <P>样式不存在的话，产生例外。</P>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 样式名称
//==========================================================
function MStyle_styleName(n, c){
   var o = this;
   var f = c ? c : o;
   var tn = RClass.name(f);
   var t = RClass.forName(tn);
   return t.style(n);
}

//==========================================================
// <T>获得定义的样式图标名称。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标名称
//==========================================================
function MStyle_styleIcon(n, c){
   return RClass.name(c ? c : this, true) + '_' + n;
}

//==========================================================
// <T>获得定义的样式图标路径。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标路径
//==========================================================
function MStyle_styleIconPath(n, c){
   return RResource.iconPath(RClass.name(c ? c : this, true) + '_' + n);
}
