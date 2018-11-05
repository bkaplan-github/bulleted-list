
// var BlockSDK = require('blocksdk');
// var sdk = new BlockSDK();
var sdk = new window.sfdc.BlockSDK();

// state data for the content block
var num_bullets;
var bullets;
var options;

/*
// stop the editor from updating too often
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

// helper to create regular expressions
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// unescape HTML special characters
function htmlUnescape(str){
  return str
    .replace(/&quot;/g, '"')
    // .replace(/&#39;/g, "'")
    // .replace(/&#x2F;/g, '/'); // forward slash
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
*/

// escape HTML special characters
function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    // .replace(/'/g, '&#39;')
    // .replace(/\//g, '&#x2F;'); // forward slash
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// update the data and build the content -- call after changes are made to inputs
function updateContent() {
  // generate the code for the table containing the bulleted list, inserting the input values
  var html = '<table width="100%" border="0" cellspacing="0" cellpadding="0">\r\n<tr>\r\n<td class="'+options['mobile']+'" align="'+options['alignment']+'" valign="top" style="padding: '+options['padding']+';">\r\n<table cellpadding="0" cellspacing="0" border="0">';
  for (var i=0; i<num_bullets; i++) {
    var padding = i > 0 ? options['spacing']+'px' : 0;
    html += '\r\n<tr>\r\n<td class="'+options['mobile_bullet']+'" width="'+options['bull_spacing']+'" align="left" valign="top" style="padding-top: '+padding+'; font-family: '+options['font']+'; font-weight: normal; font-size: '+options['bull_size']+'px; line-height: '+options['line_height']+'px; color: '+options['bull_color']+'; mso-line-height-rule: exactly;">&bull;</td>\r\n<td class="'+options['mobile_item']+'" align="left" valign="top" style="padding-top: '+padding+'; font-family: '+options['font']+'; font-weight: normal; font-size: '+options['size']+'px; line-height: '+options['line_height']+'px; color: '+options['color']+'; mso-line-height-rule: exactly;">'+htmlEscape(bullets[i])+'</td>\r\n</tr>';
  }
  html += '\r\n</table>\r\n</td>\r\n</tr>\r\n</table>';

  sdk.setData({'num_bullets': num_bullets, 'bullets': bullets, 'options': options});
  sdk.setSuperContent(html);
  sdk.setContent(html);
}

// create an item input and add callback for when it changes
function addBullet(id) {
  var widget = '\r\n<div id="bullet-' + id + '" class="slds-form-element">\r\n<div class="slds-form-element__control slds-input-has-fixed-addon">\r\n<input class="slds-input" type="text" id="input-' + id + '" placeholder="List Item ' + (id+1) + '" />\r\n</div>\r\n</div>';

  $('#bullets-container').append(widget);

  $('#input-'+id).val(bullets[id]);
  if (id >= num_bullets) $('#bullet-'+id).hide();

  // add callback for when an item input changes
  $('#input-'+id).data({'id': id}).change(function() {
    var id = $(this).data('id');
    var value = $(this).val();
    bullets[id] = value;
    updateContent();
  });
}

// main getData function -- gets stored state data for the content block
sdk.getData(function (data) {
  // read data
  bullets = data['bullets'];
  num_bullets = data['num_bullets'];
  options = data['options'];

  // set defaults for previously undefined data
  if (typeof bullets == 'undefined') bullets = ["","","","","","","","","",""];
  if (typeof num_bullets == 'undefined') num_bullets = 5;
  if (typeof options == 'undefined') options = {
    'padding': "20px",
    'alignment': "left",
    'spacing': "10",
    'bull_spacing': "15",
    'font': "Arial, Helvetica, sans-serif",
    'line_height': "20",
    'size': "16",
    'bull_size': "30",
    'color': "#000001",
    'bull_color': "#000001",
    'mobile': "",
    'mobile_bullet': "",
    'mobile_item': ""
  };

  // initialize the slider
  $("#num-bullets").val(num_bullets);
  $("#num-bullets-val").html(num_bullets);

  // initialize the item inputs
  for (var i=0; i<bullets.length; i++) addBullet(i);

  // initialize option inputs
  $("#padding").val(options['padding']);
  $("#alignment").val(options['alignment']);
  $("#spacing").val(options['spacing']);
  $("#bull-spacing").val(options['bull_spacing']);
  $("#font").val(options['font']);
  $("#line-height").val(options['line_height']);
  $("#size").val(options['size']);
  $("#bull-size").val(options['bull_size']);
  $("#color").val(options['color']);
  $("#bull-color").val(options['bull_color']);
  $("#mobile").val(options['mobile']);
  $("#mobile_bullet").val(options['mobile-bullet']);
  $("#mobile_item").val(options['mobile-item']);

  // add callback for when the slider changes
  $("#num-bullets").mousemove(function() {
    var n = $(this).val();
    if (n != num_bullets) {
      num_bullets = n;
      $('#num-bullets-val').html(num_bullets);
      for (var i=0; i<bullets.length; i++) {
        if (i < num_bullets) $('#bullet-'+i).show();
        else $('#bullet-'+i).hide();
      }
      updateContent();
    }
  });

  // add callbacks for when the option inputs change
  $("#padding").change(function() {
    options['padding'] = $(this).val();
    updateContent();
  });

  $("#alignment").change(function() {
    options['alignment'] = $(this).val();
    updateContent();
  });

  $("#spacing").change(function() {
    options['spacing'] = $(this).val();
    updateContent();
  });

  $("#bull-spacing").change(function() {
    options['bull_spacing'] = $(this).val();
    updateContent();
  });

  $("#font").change(function() {
    options['font'] = $(this).val();
    updateContent();
  });

  $("#size").change(function() {
    options['size'] = $(this).val();
    updateContent();
  });

  $("#line-height").change(function() {
    options['line_height'] = $(this).val();
    updateContent();
  });

  $("#bull-size").change(function() {
    options['bull_size'] = $(this).val();
    updateContent();
  });

  $("#color").change(function() {
    options['color'] = $(this).val();
    updateContent();
  });

  $("#bull-color").change(function() {
    options['bull_color'] = $(this).val();
    updateContent();
  });

  $("#mobile").change(function() {
    options['mobile'] = $(this).val();
    updateContent();
  });

  $("#mobile-bullet").change(function() {
    options['mobile_bullet'] = $(this).val();
    updateContent();
  });

  $("#mobile-item").change(function() {
    options['mobile_item'] = $(this).val();
    updateContent();
  });

});
