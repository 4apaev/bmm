define(function(){

    var
        rgb2hsl = function(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var
                max = Math.max(r, g, b),
                min = Math.min(r, g, b),
                l = (max + min) / 2,
                h, s, d;

            if (max == min) return [0, 0, l]; // achromatic

            d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;

            return [h, s, l];
        },

        hslToRgb = function(h, s, l) {
            var
              m, c, x,
              arr = [];

            if (!isFinite(h)) h = 0;
            if (!isFinite(s)) s = 0;
            if (!isFinite(l)) l = 0;

            h /= 60;
            if (h < 0) h = 6 - (-h % 6);
            h %= 6;

            s = Math.max(0, Math.min(1, s / 100));
            l = Math.max(0, Math.min(1, l / 100));

            c = (1 - Math.abs((2 * l) - 1)) * s;
            x = c * (1 - Math.abs((h % 2) - 1));

                       arr = [c,0,x];
            if (h < 1) arr = [c,x,0];
            if (h < 3) arr = [0,c,x];
            if (h < 4) arr = [0,x,c];
            if (h < 5) arr = [x,0,c];
            if (h < 2) arr = [x,c,0];

            m = l - c / 2;

            return arr.map(function(chanel) {
              return Math.round((chanel + m) * 255)
            });
        },

        hsl2rgb = function(h, s, l) {
            var r, g, b, q, p;

            if (s == 0)  return [l* 255, l * 255, l * 255]; // achromatic

            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);

            return [r * 255, g * 255, b * 255];
        },


        rgb2hex    = function(r, g, b) { return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); },
        hex2rgb    = function(hex) { return  hex.replace('#', '').match(/.{2}/g).map(function(chanel) { return parseInt(chanel, 16) });},
        isHex      = function(x) { return /^#/.test(x);   },
        isRgb      = function(x) { return /^rgb/.test(x); },
        isHsl      = function(x) { return /^hsl/.test(x); },
        getHex     = function(str) { return str.replace('#', '').match(/.{2}/g); },
        getType    = function(str) { return str.match(/^(#|hsl|rgb|rgba)\b/); },
        getChanels = function(str) { return str.match(/[\d\.]+/g).slice(0,3); },

        string2type =  function(x) {
            var
                fn,
                res,
                type = getType(x);

            if(!type) return;

            fn = isHex(x) ? getHex : getChanels;
            res = fn(x).map(function(chanel) {
                return parseInt(chanel, 10);
            });

            return [type[0], res];
        };

        return {
             rgb2hsl    : rgb2hsl
            ,hsl2rgb    : hsl2rgb

            ,hslToRgb    : hslToRgb


            ,rgb2hex    : rgb2hex
            ,hex2rgb    : hex2rgb
            ,isHex      : isHex
            ,isRgb      : isRgb
            ,isHsl      : isHsl
            ,getHex     : getHex
            ,getType    : getType
            ,getChanels : getChanels
            ,string2type: string2type
        }
}());
