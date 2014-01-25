define({

    compile: function(hue,sat,lum) {
        var res = '';
        _.each(hue, function(h) {
            res += '<div class="hue hue-' + h + '">';
            _.each(sat, function(s) {
                res += '<div class="sat sat-' + s + '">';
                _.each(lum, function(l) {
                    res += '<div class="lum lum-' + l + '" style="background:hsl(' + h + ',' + s + '%,' + l + '%);"></div>'
                });
                res += '</div>';
            });
            res += '</div>';
        });
        return res;
    },

    handleChange: function(e) {
        this.style.backgroundColor = 'hsl(' + $.tar(this.elements).map(function(sel) {
            return sel.value;
        }) + ')';
    },

    cloneForm: function(div, times, fn) {
        var draft = div.firstElementChild.outerHTML;

        div.insertAdjacentHTML('afterbegin', draft.repeat(times));

        $('=form', div).each(function(form) {
            $('=select', form).on('change', fn.bind(form));
        });
    },

    doContainer: function(id, trg) {
        var div = document.createElement('div');
        div.id = id;
        trg.appendChild(div);
    },

    render: function(div, html) {
        div.insertAdjacentHTML('beforeend', html);
    }
})

// app.colors.renderBy('(pale|light|white|snow)', 1)
// app.colors.renderBy('(dark|black)', 1)
// app.colors.renderBy('(red|orange|pink|magenta)', 1)