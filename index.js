var cheerio = require( "cheerio" )
	,$
	,options = // map annotations to styles
	{
		/* info */
		"info": {
			alert: "info",
			picto: "fa-info"
		},
		"note": {
			alert: "warning",
			picto: "fa-edit"
		},
    "hint": {
      alert: "success",
      picto: "fa-lightbulb-o"
    },
		/* Default */
		"spec": {
			alert: "quote",
			picto: "fa-quote-left"
		},
		/* for app spec, small image, spac on right */
		"app": {
			alert: "app",
			picto: "fa-quote-left"
		}
	}
;

module.exports = {
	book : {
		assets: "./book",
		css   : [
			"plugin.css"
		],
    js: [
      "test.js"
    ]
	},
	hooks: {
		// For all the hooks, this represent the current generator
		// This is called before the book is generated
		init  : function ()
		{
			// console.log( "richquotes init!" );
			if( this.options.pluginsConfig && this.options.pluginsConfig.richquotes )
			{
				// richquotes is a POJO, save to use for-in
				var richquotes = this.options.pluginsConfig.richquotes;
				for (key in richquotes) {
					// console.log(key, richquotes[key]);
					options[key] = richquotes[key] === false? undefined : richquotes[key];
				}
			}
		},

		// This is called for each page of the book
		// It can be used for modifying page content
		// It should return the new page
		page  : function ( page )
		{
			var section
				,$bq
				,$this
				,$strong
				,style
				;

			for ( var i in page.sections )
			{
				section = page.sections[i];
				if ( section.type !== "normal" )
				{
					continue;
				}

				$ = cheerio.load( section.content );
				$bq = $( "blockquote" ).each(
					function ()
					{
						$this = $( this );
						$strong = $this.find( "p:first-child > strong:first-child" );
						if( !$strong || $strong.length == 0)
						{
							return;
						}

						style = options[$strong.text().toLowerCase()]?  // look up annotation in options
							options[$strong.text().toLowerCase()] :
							options['default'];
						if (!style) {
							return;
						}

						$strong
							.addClass( 'fa fa-4x ' + style.picto )
							.empty()
							.remove()
							;
						$this.addClass( 'clearfix alert alert-' + style.alert );
						$this.prepend( $strong );

						// Replace by the transformed element
						section.content = $.html();
					}
				);
			}
			return page;
		}
	}
};
