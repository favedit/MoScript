// ============================================================
// FValidConsole
// ============================================================
function FValidConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope      = EScope.Page;
   // Method
   o.validFocus = FValidConsole_validFocus;
   o.notEmpty   = FValidConsole_notEmpty;
   o.validDate  = FValidConsole_validDate;
   return o;
}
// ------------------------------------------------------------
function FValidConsole_validFocus(){
   if(this.validControl && this.validControl.focus){
      this.validControl.focus(true);
   }
   this.validControl = null;
}
// ------------------------------------------------------------
function FValidConsole_notEmpty(sValue, sLabel){
   if(IString.isEmpty(sValue)){
      ILogger.contextValid(this, 'notEmpty', this.CONTEXT_VALID_NULL, sLabel);
      return false;
   }
   return true;
}
// ------------------------------------------------------------
function FValidConsole_validDate(sValue, sLabel){
   if(!IString.isEmpty(sValue)){
      if(!IDate.autoParse(sValue)){
         ILogger.contextValid(this, 'validDate', this.CONTEXT_VALID_DATE, sLabel);
         return false;
      }
   }
   return true;
}
