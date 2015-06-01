// ============================================================
// RTag
// ============================================================
var RTag = new function(){
   var o = this;
   // Method
   o.findParent = RTag_findParent;
   o.findChild  = RTag_findChild;
   o.cbSync     = RTag_cbSync;
   o.goPage     = RTag_goPage;
   // Construct
   RMemory.register('RTag', o);
   return o;
}
// ------------------------------------------------------------
function RTag_findParent(oHtml, sType){
   if(!oHtml)
      return false;
   if(oHtml.tagName == sType.toUpperCase())
      return oHtml;
   if(!oHtml.parentElement)
      return false;
   return this.GetParent(oHtml.parentElement, sType);
}
// ------------------------------------------------------------
function RTag_findChild(oHtml, sType, nPosition){
   if(!nPosition)
      nPosition = 0;
   if(!oHtml)
      return false;
   var nCount = oHtml.children.length;
   for(var i=0; i<nCount; i++){
      var oChild = oHtml.children[i];
      if(oChild.tagName == sType.toUpperCase())
         return oChild;
   }
   return false;
}
// ------------------------------------------------------
function RTag_cbSync(self, sync, trueValue, falseValue){
   if(self && sync){
      sync.value = self.checked ? trueValue : falseValue;
   }
}
// ------------------------------------------------------
// form, target, uri, method
function RTag_goPage(f, t, u, m){
   f = RHtml.form(f);
   if(f){
      u = RString.nvl(u);
      if(m){
         u += '?do=' + m;
      }
      f.action = u;
      if(t){
         f.target = t;
      }
      f.method = 'POST';
      f.submit();
   }
}
// ------------------------------------------------------
