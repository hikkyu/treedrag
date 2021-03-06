;(function ( $, window, document, undefined ) {


    // Create the defaults once
    var pluginName = "generateBlockDrag",
        defaults = {
            propertyName: "value",
            liTpl: '<li id="{{id}}" data-modelkey="{{modelKey}}"><span>{{modelLabel}}</span></li>',
            tpl: ''

        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            this.getBlock()
        },
        getBlock: function () {
            $.ajax({
                url: "/mock/dragList.json",
                type: "GET",
                dataType: "json",
                success: $.proxy(this._onSuccess,this)

            });
        },
        _generateList: function(data){
            var list = '';
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                list += this._substitute(this.settings.liTpl, obj);

            }
            list = '<ul>'+list+'</ul>';
            return list;
        },
        _substitute: function (str, object) {
            return str.replace((/\{\{(.+?)\}\}/g), function (match, name) {
                return object[name] || '';
            });
        },
        _push: function(list){
            this.element.append(list)
        },
        _onSuccess: function(data){
            var list = $(this._generateList(data));
            this._push(list);

        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
