$(document).ready(function (e) {
    loadCarousel();
    loadMenu();
});


function loadCarousel() {    
    request('https://evoque-pizzaria.firebaseio.com/carrossel.json', function (data) {
        var slideList = [];
        var indicators = [];
        var carousels = JSON.parse(data);
        carousels.forEach(function (c, i) {
            var active = i == 0 ? 'active' : '';
            indicators.push($('<li data-target="#carouselExampleIndicators" data-slide-to=' + i + ' class="' + active + '"></li>'));
            var carousel = $('<div />', { "class": 'carousel-item ' + active });
            carousel.append($('<img />', {
                "class": "d-block w-100",
                "src": c.link
            }));
            var slide = $('<div />', { "class": "carousel-caption d-none d-md-block" });
            slide.append('<h3>' + c.title + '</h3><p>' + c.description + '</p>');
            slideList.push(carousel);
            carousel.append(slide);
        });
        $('.carousel-indicators').append(indicators);
        $('.carousel-inner').append(slideList);
    });
}

function loadMenu(plates) {
    // var requestList = ['pizzas', 'lanches', 'bebidas', 'bordas'];
    var requestList = ['pizzas']
    var database = 'https://evoque-pizzaria.firebaseio.com/'
    var menuList = [];
    var groupIndex = 1;
    var headings = []
    for (var i = 0; i < requestList.length; i++) {
        var currentRequest = requestList[i];
        // request('/data/' + currentRequest + '.json', function (data) {            
        request(database + 'cardapio/' + currentRequest + '.json', function (data) {
            var dataList = JSON.parse(data);
            var grouped = groupBy(dataList, 'category');
            Object.keys(grouped).forEach(function (c, i) {
                // console.log(c, groupIndex);                
                var heading = $('<div></div>', { "class": "card-header", "id": "heading-" + groupIndex, "role": "tab" });
                heading.append($('<h5 class="mb-0"> <a data-toggle="collapse" href="#collapse-' + groupIndex + '" "aria-expanded="false" aria-controls="collapse-1">' + c + ' </a></h5>'));
                $('#accordion').append(heading);
                var itemList = $('<div/>', { "class": "item-list" });
                itemList.append(' ' +
                    '<div id="collapse-' + groupIndex + '" class="collapse" role="tabpanel" aria-labelledby="heading-' + groupIndex + '" data-parent="#accordion">' +
                    '<div class="card-body">' +
                    '</div>' +
                    '</div>');
                heading.append(itemList);
                grouped[c].forEach(function (i) {
                    var item = $('<div/>', { "class": "menu-container" });
                    item.html(
                        '<div class="d-flex"> ' +
                        '<div class="p-2 item-name">' + i.id + ' ' + i.name + ' </div>' +
                        '<div class="ml-auto p-2 item-price">' + convertPrice(i.price) + ' </div> ' +
                        '</div> ' +
                        '<div class="p-2 item-ingredients">' + convertIngredients(i.ingredients) + '</div>' +
                        '</div>' +
                        '</div>'
                    );
                    $(itemList).children('.collapse').children('.card-body').append(item);
                });
                groupIndex++;
            });
        });
    }

}

function request(url, callback) {
    var xhr = new XMLHttpRequest();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
}

function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function convertPrice(intPrice) {
    return "R$ " + intPrice + ",00";
}

function convertIngredients(ingredients) {
    return (ingredients.join(' '));
}
