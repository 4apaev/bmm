define('modules/colors', ['db/colors'], function(colorList) {
    var
        template = '<i style="display:inline-block; padding:4px; background:{{color}};">{{color}}</i>',
        template1 = '<li style="display:inline-block; padding:16px; background:{{color}};"></li>',
        getRegex = function(str) {
            return new RegExp(str, "g")
        },
        compile = function(node, k) {
            return template.replace(/\{\{color\}\}/g, 'rgb(' + node + ')')
        },

        sortRgba = function(n) {
            return _.sortBy(colorList, function(v, k) {
                return _.values(o)[0][n]
            });
        },

        filterByNames = function(key) {
            return _.filter(colorList, function(v, k) {
                return getRegex(key).test(k);
            });
        },

        doHsl = function(e) {
            var form = e.currentTarget;
            form.style.backgroundColor = 'hsl(' + _.map(form.elements, function(sel) {
                return sel.value
            }) + ')'
        },

        rgb2hex = function(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        },
        hsl2rgb = function(h, s, l) {

            var r, g, b, m, c, x

            if (!isFinite(h)) h = 0
            if (!isFinite(s)) s = 0
            if (!isFinite(l)) l = 0

            h /= 60
            if (h < 0) h = 6 - (-h % 6)
            h %= 6

            s = Math.max(0, Math.min(1, s / 100))
            l = Math.max(0, Math.min(1, l / 100))

            c = (1 - Math.abs((2 * l) - 1)) * s
            x = c * (1 - Math.abs((h % 2) - 1))

            if (h < 1) {
                r = c
                g = x
                b = 0
            } else if (h < 2) {
                r = x
                g = c
                b = 0
            } else if (h < 3) {
                r = 0
                g = c
                b = x
            } else if (h < 4) {
                r = 0
                g = x
                b = c
            } else if (h < 5) {
                r = x
                g = 0
                b = c
            } else {
                r = c
                g = 0
                b = x
            }
            m = l - c / 2
            return [
                Math.round((r + m) * 255),
                Math.round((g + m) * 255),
                Math.round((b + m) * 255)
            ]
        },

        container = document.getElementById('colors'),
        stage = document.getElementById('trg')


    $('=form', container).on('change', doHsl);


    // app.colors.renderBy('(pale|light|white|snow)', 1)
    // app.colors.renderBy('(dark|black)', 1)
    // app.colors.renderBy('(red|orange|pink|magenta)', 1)
    return {


        renderBy: function(n, byName) {
            var fn = byName ? filterByNames : sortRgba;
            container.innerHTML = _.map(fn(n), compile).join('');
        },

        renderHsl: function(rangeHue, rangeSat) {
            var
            hue = _.range(rangeHue, 390, rangeHue),
                sat = _.range(rangeSat, 100, rangeSat),
                lum = sat,
                res = '',
                tpl = '<div class="lum lum-{{lum}}" style="background:{{hex}};"></div>';

            _.each(hue, function(h) {
                res += '<div class="hue hue-' + h + '">';
                _.each(sat, function(s) {
                    res += '<div class="sat sat-' + s + '">';
                    _.each(lum, function(l) {
                        var
                        hsl = h + ',' + s + '%,' + l + '%',
                            rgb = hsl2rgb(h, s, l),
                            hex = rgb2hex(rgb[0], rgb[1], rgb[2]);
                        res += tpl
                            .replace(/\{\{lum\}\}/g, l)
                            .replace(/\{\{hex\}\}/g, hex)
                            .replace(/\{\{hsl\}\}/, hsl)
                            .replace(/\{\{rgb\}\}/, rgb);
                    });
                    res += '</div>';
                });
                res += '</div>';
            });
            stage.innerHTML = res;
        },

        rgb2hex: function(r, g, b) {
            return rgb2hex(r, g, b);
        },

        hsl2rgb: function(h, s, l) {
            return hsl2rgb(h, s, l)
        }
    }
})
