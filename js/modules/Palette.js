define('modules/Palette', ['modules/color/db', 'modules/color/converter', 'modules/color/view'], function(db, converter, view) {

    var container = document.getElementById('colors');

    function Palette() {
        this.hue = _.range(30, 390, 30);
        this.sat = _.range(25, 100, 25);
        this.lum = _.range(25, 100, 25);

        // this.nodes = ['button','link','body','input'];
        this.init();
    };

    Palette.prototype = {

        _get : function(key) {
            return { db:db, convertor:convertor, container:container }[key];
        },

        namedColors : function(cssName) {
            var rgx = new RegExp(cssName, "g");
            return _.filter(db, function(key) { return rgx.test(key) });
        },

        drawPalette : function() {
            var html = view.compile(this.hue, this.sat, this.lum);
            view.render(container, html);
        },

        init : function() {
            view.cloneForm(container, 3, view.handleChange);
        }
    }

    return Palette;
})