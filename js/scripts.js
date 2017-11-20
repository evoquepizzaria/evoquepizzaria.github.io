$(document).ready(function (e) {
    loadCarousel();
    loadMenu();
});


function loadCarousel() {
    request('/data/carrossel.json', function (data) {
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
    var menu = [];
    request('/data/pizzas.json', function(data) {
        
    });
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