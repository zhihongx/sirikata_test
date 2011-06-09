(function() {
var directory_list_callback_store = {};
var directory_list_request_fn = function(result) {
	var path_requested = result.path;
	initial_ajax_settings = directory_list_callback_store[path_requested];
	delete directory_list_callback_store[path_requested];
	
	var json_result = [];
	for(var i in result.results) {
		var to_add = {
			data: result.results[i].path,
			attr: {id: path_requested + (path_requested == '/' ? '' : '/') + result.results[i].path},
		}
		if(result.results[i].directory) {
			to_add.state = 'closed';
		}
		json_result.push(to_add);
	}
	
	initial_ajax_settings.success.call(initial_ajax_settings.context,json_result,"", null);	
};
directory_list_request = directory_list_request_fn;

$(document).ready(function() {
	
	$('<div />').attr({id:'open-file-dialog', title:'Open File'})
		.append($('<p />').attr({id:'open-file-tips'}).addClass('validateTips').append('Select a file or directory.') )
		.append($('<div />').attr({id:'jstree'}) )
	.appendTo('body');
	
	/*<div id="open-file-dialog" title="Open File">
		<p id="open-file-tips" class="validateTips">Select a file or directory.</p>
	
		<div id="jstree"></div>
	</div>*/
	
	$( "#open-file-dialog" ).dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Open": function() {
				var selected_id = $("#jstree").jstree("get_selected").attr("id");
				if(selected_id) {
					$(this).dialog("close");
				}
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {

		},
		open: function(event, ui) {
			$("#jstree")
			.bind("loaded.jstree", function (event, data) {
				
			})
			.jstree({
				core : {  },
				"json_data" : {
					"data" : [{data:'/', attr:{id:'/'}, state:'closed'}],
					"ajax" : {
						"url" : "/",
						"data" : function(n) {
							return n.attr("id");
						}
					},
					"ui" : {
						"select_limit" : 1
					}
				},
				plugins : [ "json_data", "ui", "themeroller", "sort" ]
			});
		}
	});

/* This was here because it needed to specifically use the $.ajax call to
 * collect file listing info. This is a limitation of the plugin we're
 * using. It's also causing problems elsewhere, so we're disabling it for
 * now. To fix, it probably requires the other code to support getting listings
 * via some more generic mechanism.
 *
	jQuery.ajax = function(ajax_settings) {
		directory_list_callback_store[ajax_settings.data] = ajax_settings;
		sirikata.event("ui-action", 'action_directory_list_request', ajax_settings.data);
	};
*/
	
});

})();