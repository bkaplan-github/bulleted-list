
// var BlockSDK = require('blocksdk');
// var sdk = new BlockSDK();
var sdk = new window.sfdc.BlockSDK();

var bullets;
var num_bullets;

/*
function debounce (func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
*/

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;amp;')
    .replace(/"/g, '&amp;quot;')
    // .replace(/'/g, '&#39;')
    // .replace(/\//g, '&#x2F;'); // forward slash
    .replace(/</g, '&amp;lt;')
    .replace(/>/g, '&amp;gt;');
}

function htmlUnescape(str){
  return str
    .replace(/&amp;quot;/g, '"')
    // .replace(/&#39;/g, "'")
    // .replace(/&#x2F;/g, '/'); // forward slash
    .replace(/&amp;lt;/g, '<')
    .replace(/&amp;gt;/g, '>')
    .replace(/&amp;amp;/g, '&');
}

function updateContent() {
  var html = '<table width="100%" border="0" cellspacing="0" cellpadding="0">\r\n<tr>\r\n<td align="left" valign="top">\r\n<table width="100%" cellpadding="0" cellspacing="0" border="0">';
  for (var i=0; i<num_bullets; i++) {
    html += '\r\n<tr>\r\n<td align="right" valign="top" style="font-family: Arial, Helvetica, sans-serif; font-weight: normal; font-size: 16px; line-height: 20px; color: #000001; mso-line-height-rule: exactly;">&bull;</td>\r\n<td align="left" valign="top" style="padding-left: 20px; font-family: Arial, Helvetica, sans-serif; font-weight: normal; font-size: 16px; line-height: 20px; color: #000001; mso-line-height-rule: exactly;">'+htmlEscape(bullets[i])+'</td>\r\n</tr>';
  }
  html += '\r\n</table>\r\n</td>\r\n</tr>\r\n</table>';

  sdk.setData({'num_bullets': num_bullets, 'bullets': bullets});
  sdk.setSuperContent(html);
  sdk.setContent(html);
}

function addBullet(id) {
  var widget = '\r\n<div id="bullet-' + id + '" class="slds-form-element">\r\n<div class="slds-form-element__control slds-input-has-fixed-addon">\r\n<input class="slds-input" type="text" id="input-"' + id + ' placeholder="List Item ' + id + '" />\r\n</div>\r\n</div>';

  $('#bullets-container').append(widget);

  if (id >= num_bullets) $('#bullet-'+id).hide();

  $('#input-'+id).data({'id': id}).change(function() {
    var id = $(this).data('id');
    var value = $(this).val();
    bullets[id] = value;
    updateContent();
  });
}

sdk.getData(function (data) {
  bullets = data['bullets'];
  if (typeof bullets == 'undefined') bullets = ["","","","","","","","","",""];
  num_bullets = data['num_bullets'];
  if (typeof num_bullets == 'undefined') num_bullets = 5;

  for (var i=0; i<bullets.length; i++) addBullet(i);

  updateContent();

  $("#num-bullets").change(function() {
    num_bullets = $(this).val();
    console.log(num_bullets);
    for (var i=0; i<bullets.length; i++) {
      if (i < num_bullets) $('#bullet-'+id).show();
      else $('#bullet-'+id).hide();
    }
  });
  
});
