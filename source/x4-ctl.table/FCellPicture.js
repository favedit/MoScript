/**************************************************************
 * 单元格内Edit控件类
 *
 * @class FCellPicture
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FCellPicture(o){
   o = RClass.inherits(this, o, FCellEditControl);
   // Html
   o.hEdit        = null;
   // Method
   o.buildForm    = FCellPicture_buildForm;
   o.text         = FCellPicture_text;
   o.setText      = FCellPicture_setText;
   o.refreshStyle = FCellPicture_refreshStyle;
   return o;
}

/**************************************************************
 * 创建单元格和内部的input 并添加页面相应函数
 *
 * @method
 * @return HTML td标签
 **************************************************************/
function FCellPicture_buildForm(){
   var o = this;
   var c = o.column;
   var he = o.hEdit = o.hImage = RBuilder.append(o.hPanel, 'IMAGE');
}
/**************************************************************
 * 得到input 内的值
 *
 * @method
 * @return String input内的值
 **************************************************************/
function FCellPicture_text(){
   return '';
}

/**************************************************************
 * 设置input 内的值
 *
 * @method
 * @param v:value:String 要设置的值
 **************************************************************/
function FCellPicture_setText(t){
   var o = this;
   if(!RString.isEmpty(t)){
      o.hImage.style.display = 'block';
      var as = new TAttributes();
      as.unpack(t);
      var recordId = as.get('RD');
      var name = as.get('OG') + '_' + as.get('OD') + '.' + as.get('MT').toLowerCase();
      o.storeCode = 'person.user'
      o.hImage.src = top.RContext.context('/ars/sys/') + o.storeCode.toLowerCase() + '/' + recordId + '/' + name;
      o.hImage.height = 16;
   }else{
      o.hImage.style.display = 'none';
   }
}
// ------------------------------------------------------------
function FCellPicture_refreshStyle(){
   var o = this;
   o.base.FCellEditControl.refreshStyle.call(o);
   if(o.hPanel.offsetWidth){
      //o.hImage.style.width = o.hPanel.offsetWidth;
      //o.hImage.style.height = o.hPanel.offsetHeight;
   }
}
