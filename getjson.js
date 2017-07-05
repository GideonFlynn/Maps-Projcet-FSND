var vm = new CategoryOverviewModel();
// First create the title and categories observables.
var title = ko.observable();            /** @namespace data.categories */
var categories = ko.observableArray();    /** @namespace data.A_title */
var categoryname;
var category = "Nothing";

// Create a view model to fetch json data.
function CategoryOverviewModel(){
    this.google = ko.observable(!!window.google); // false
// Fetch json from url
    $.ajax({
    dataType: 'json',
    url: 'http://localhost:5050/api/v1/JSON'
    }, console.log("fetching"))

// If the data is fetched, define it.
    .done(function(data) {

        var testcategory = data.categories;
        categories = categories(data.categories);
        title = title(data.A_title);
        categoryname = testcategory;
        console.log("fetched!");
        category = '<h3>' + categoryname[0].name + '</h3><p>' + categoryname[0].description + '</p>';

    }

    );
}

ko.applyBindings(vm);