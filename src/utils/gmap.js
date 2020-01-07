export function getLocatorXY(x, y, level, hasMarker) {
   if (x != null && y != null) {
     var mainMap = window.frames["mapFrame"].window; //获取iframe中window对象
      var marker = null;
       hasMarker = true;
     if (mainMap) {
       if (!level) {
         level = 10;
       }        
       if (hasMarker) {
         marker = "1";
         mainMap.mapClear();
       }
       mainMap.getMainViewer().goToLevel({
         level: level
       });
       mainMap.getMainViewer().goToXY({
         x: x,
         y: y,
         marker: marker
         });
     }
   }
 }