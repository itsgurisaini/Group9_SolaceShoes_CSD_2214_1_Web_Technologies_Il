! function(e) {
    e.fn.extend({
        search: function(n, t) {
            t = t || 1e3;
            var a, i = function(e) {
                a && (a = null, n.call(e))
            };
            return this.each(function(n, o) {
                var c = e(o);
                c.is(":input") && c.on("keyup keypress paste", function(n) {
                    "keyup" == n.type && 8 != n.keyCode || (a && clearTimeout(a), a = setTimeout(function() {
                        var n = o.value.toLowerCase().replace(/\s+/g, "").replace(/[^\w\s]/gi, "");
                        console.log(n), n ? (e(".containerItems").children().fadeOut(), e(".containerItems [data-search*=" + n + "]").fadeIn("fast")) : (e(".containerItems").children().fadeIn(), e("ul.dropdown-menu li").parent().find("li").each(function(n) {
                            e(this).removeClass("active")
                        })), i(o), console.log(o)
                    }, t))
                }).on("blur", function() {
                    e("ul.dropdown-menu li").parent().find("li").each(function(n) {
                        e(this).removeClass("active")
                    }), e("ul.dropdown-menu li:nth-child(01)").addClass("active"), i(o)
                })
            })
        }
    })
}(jQuery);