// ============================================================
// RLogic
// ============================================================
var RLogic = new function(){
   var o = this;
   // Method
   o.showUser   = RLogic_showUser;
   o.makeFriend = RLogic_makeFriend;
   // Construct
   RMemory.register('RLogic', o);
   return o;
}

// ------------------------------------------------------
// uri, width, height
function RLogic_showUser(c){
   if(!RString.isEmpty(c)){
      var u = top.RContext.context('/psn/home/User.wa?code=' + c);
      var w = screen.width * 0.90;
      var h = screen.height * 0.90;
      var l = (screen.width - w)/2;
      var t = (screen.height - h)/2 - 20;
      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,dependent=yes', l, t, w, h);
      window.open(u, '_top', s);
   }
}

// ------------------------------------------------------------
// uri, width, height
function RLogic_makeFriend(c){
   if(!RString.isEmpty(c)){
      var u = top.RContext.context('/psn/usr/friend/Friend.wa?do=insert&code=' + c);
      var w = 400;
      var h = 200;
      var l = (screen.width - w)/2;
      var t = (screen.height - h)/2 - 20;
      var s = RString.format('left={0},top={1},width={2},height={3},toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no,dependent=yes', l, t, w, h);
      window.open(u, '_blank', s);
   }
}
// ------------------------------------------------------------
