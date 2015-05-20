// https://github.com/awerlang/angular-responsive-tables
(function() {
    "use strict";
    function wtResponsiveTable() {
        return {
            restrict: "A",
            compile: function(element, attrs) {
                attrs.$addClass("responsive");
                var headers = element[0].querySelectorAll("thead th");
                var rows = element[0].querySelectorAll("tbody tr");
                if (headers.length && rows.length) {
                    rows = rows[0];
                    Array.prototype.forEach.call(rows.querySelectorAll("td"), function(value, index) {
                        var title = headers.item(index).textContent;
                        if (title && !value.getAttributeNode("data-title")) {
                            value.setAttribute("data-title", title);
                        }
                    });
                }
            }
        };
    }
    "use strict";
    angular.module("wt.responsive", []).directive("wtResponsiveTable", [ wtResponsiveTable ]);
})();