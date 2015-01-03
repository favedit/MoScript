// ============================================================
// TPage
// ============================================================
function TPage(){
   var o = this;
   // Attribute
   o.page       = null;
   o.action     = null;
   o.url        = null;
   o.attributes = null;
   // Attribute
   o.attrs      = TPage_attrs;
   o.split      = TPage_split;
   o.post       = TPage_post;
   o.get        = TPage_get;
   return o;
}
// ------------------------------------------------------------
// source
function TPage_split(s){
   if(s){
      this.attrs().split(s, '=', '\n');
   }
}
//------------------------------------------------------------
//source
function TPage_attrs(){
   var o = this;
   if(!o.attributes){
      o.attributes = new TAttributes();
   }
   return o.attributes;
}
function UrlEncode(str){ 
  var ret=""; 
  var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%"; 
  for(var i=0;i<str.length;i++){ 
   var chr = str.charAt(i); 
    var c=str2asc(chr); 
    tt += chr+":"+c+"n"; 
    if(parseInt("0x"+c) > 0x7f){ 
      ret+="%"+c.slice(0,2)+"%"+c.slice(-2); 
    }else{ 
      if(chr==" ") 
        ret+="+"; 
      else if(strSpecial.indexOf(chr)!=-1) 
        ret+="%"+c.toString(16); 
      else 
        ret+=chr; 
    } 
  } 
  return ret; 
}
// ------------------------------------------------------------
function TPage_post(form, target){
   var o = this;
   // Set env
   RConsole.find(FEnvConsole).buildValue();
   // Send
   var url = RString.nvl(o.url);
   if(o.action){
      if(-1 == url.indexOf('?')){
         url += '?do=' + o.action;
      }else{
         url += '&do=' + o.action;
      }
   }
   var as = o.attributes;
   if(as){
      var s = as.join('=', '&');
      if(-1 == url.indexOf('?')){
         url += '?' + s;
      }else{
         url += '&' + s;
      }
   }
   form.action = encodeURI(url);
   //form.action = UrlEncode(url);
   //alert(form.action);
   if(target){
      form.target = target;
   }
   form.method = 'POST';
   form.submit();
}
// ------------------------------------------------------------
function TPage_get(){
}
// ------------------------------------------------------------
