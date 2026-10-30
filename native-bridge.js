(function(){
var rx=/^(blob|data):/;
function cap(){var C=window.Capacitor;return C&&C.isNativePlatform&&C.isNativePlatform()&&C.Plugins&&C.Plugins.Filesystem&&C.Plugins.Share?C.Plugins:null}
function b64(b){return new Promise(function(ok,no){var r=new FileReader();r.onload=function(){ok(String(r.result).split(",")[1]||"")};r.onerror=no;r.readAsDataURL(b)})}
async function save(a,P){var name=(a.download||"file").replace(/[\\/:*?"<>|]/g,"_");
try{var blob=await(await fetch(a.href)).blob();
var w=await P.Filesystem.writeFile({path:name,data:await b64(blob),directory:"CACHE"});
await P.Share.share({title:name,files:[w.uri],dialogTitle:"ذخیره یا اشتراک‌گذاری فایل"})}
catch(e){if(!/cancel/i.test(String(e&&e.message||e)))alert("ذخیرهٔ فایل ناموفق بود: "+(e&&e.message||e))}}
var orig=HTMLAnchorElement.prototype.click;
HTMLAnchorElement.prototype.click=function(){var P=cap();if(P&&this.download&&rx.test(this.href)){save(this,P);return}return orig.apply(this,arguments)};
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[download]"),P=cap();if(a&&P&&rx.test(a.href)){e.preventDefault();save(a,P)}},true);
})();
