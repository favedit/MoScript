//==========================================================
// <T>样式接口。</T>
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MUiStyle = function MUiStyle(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.construct     = MO.Method.empty;
   // @method
   o.styleName     = MO.MUiStyle_styleName;
   o.styleIcon     = MO.MUiStyle_styleIcon;
   o.styleIconPath = MO.MUiStyle_styleIconPath;
   // @method
   o.dispose       = MO.Method.empty;
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
MO.MUiStyle_styleName = function MUiStyle_styleName(n, c){
   var o = this;
   var f = c ? c : o;
   var tn = MO.Class.name(f);
   var t = MO.Class.forName(tn);
   return t.style(n);
}

//==========================================================
// <T>获得定义的样式图标名称。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标名称
//==========================================================
MO.MUiStyle_styleIcon = function MUiStyle_styleIcon(n, c){
   return MO.Class.name(c ? c : this, true) + '_' + n;
}

//==========================================================
// <T>获得定义的样式图标路径。</T>
//
// @param n:name:String 名称
// @param c:class:TClass 类对象
// @return String 图标路径
//==========================================================
MO.MUiStyle_styleIconPath = function MUiStyle_styleIconPath(n, c){
   return MO.RResource.iconPath(MO.Class.name(c ? c : this, true) + '_' + n);
}