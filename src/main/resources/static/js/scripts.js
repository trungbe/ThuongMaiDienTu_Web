(function ($) {
    "use strict";
    var path = window.location.href;
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });
    $("#sidebarToggle").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


function addEmployee() {
    openModal();
}

function openModal() {
    $('#addEmployeeModal').modal();
}

$(document).ready(function () {
    $('#productTable').DataTable();
});

$('#updateProduct').click(function (e) {
    e.preventDefault();
    var imgs = document.getElementsByTagName("img");
    var imgSrcs = [];
    for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(imgs[i].src);
    }
    var data = {};
    var id = $('#id').val();
    data['imgSrcs'] = imgSrcs;
    data['productId'] = id;
    $('#fileUploadForm').submit();
    $.ajax({
        url: '/api/deleteImage',
        type: 'DELETE',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: "application/json",
    });
});
var myLineChart;
var myLabel = [];
var myData = [];
var maxData = 0;
$('#year').change(function (e) {
    e.preventDefault();
    var year = $(this).val();
    console.log(year);
     $.ajax({
            url: '/api/statistical/'+year,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                       console.log("success");
                       if (myLineChart) myLineChart.destroy();
                       myData  = [];
                       myLabel = [];
                       $.each(response, function(i, ob){
                         myLabel.push("Th??ng" +ob.month);
                         myData.push(ob.total);
                       })
                       maxData = Math.max(...myData);
                       var ctx = document.getElementById("myBarChart");
                       myLineChart = new Chart(ctx, {
                         type: 'bar',
                         data: {
                           labels: myLabel,
                           datasets: [{
                             label: "Doanh thu (VND)",
                             backgroundColor: [
                                                                                          'rgba(255, 99, 132, 0.2)',
                                                                                          'rgba(54, 162, 235, 0.2)',
                                                                                          'rgba(255, 206, 86, 0.2)',
                                                                                          'rgba(75, 192, 192, 0.2)',
                                                                                          'rgba(153, 102, 255, 0.2)',
                                                                                          'rgba(255, 159, 64, 0.2)',
                                                                                           'rgba(255, 206, 86, 0.2)',
                                                                                           'rgba(75, 192, 192, 0.2)',
                                                                                           'rgba(54, 162, 235, 0.2)',
                                                                                           'rgba(255, 159, 64, 0.2)',
                                                                                           'rgba(75, 192, 192, 0.2)',
                                                                                           'rgba(153, 102, 255, 0.2)'
                                                                                      ],
                                                                                      borderColor: [
                                                                                          'rgba(255,99,132,1)',
                                                                                          'rgba(54, 162, 235, 1)',
                                                                                          'rgba(255, 206, 86, 1)',
                                                                                          'rgba(75, 192, 192, 1)',
                                                                                          'rgba(153, 102, 255, 1)',
                                                                                          'rgba(255, 159, 64, 1)',
                                                                                           'rgba(255, 206, 86, 1)',
                                                                                           'rgba(75, 192, 192, 1)',
                                                                                           'rgba(54, 162, 235, 1)',
                                                                                           'rgba(255, 159, 64, 1)',
                                                                                           'rgba(75, 192, 192, 1)',
                                                                                           'rgba(153, 102, 255, 1)',
                                                                                      ],
                                                              hoverBackgroundColor: 'rgba(2,117,216,1)',
                                                                                      hoverBorderColor: 'rgba(2,117,216,1)',
                             data: myData,
                           }],
                         },
                         options: {
                           scales: {
                             xAxes: [{
                               time: {
                                 unit: 'month'
                               },
                               gridLines: {
                                 display: false
                               },
                               ticks: {
                                 maxTicksLimit: 12
                               }
                             }],
                             yAxes: [{
                               ticks: {
                                 min: 0,
                                 max: maxData,
                                 maxTicksLimit: 10
                               },
                               gridLines: {
                                 display: true
                               }
                             }],
                           },
                           legend: {
                             display: false
                           }
                         }
                       });

                       $('#myBarChart').load(location.href+ " #myBarChart")
                   },
                   error: function (response) {
                       console.log("fail");
                   }
        });
});

$('#btnChart').click(function(e){
    e.preventDefault();
    var data = {};
    data['dateFrom'] = $('#dateFrom').val();
    data['dateTo'] = $('#dateTo').val();

    $.ajax({
                url: '/api/statistical',
                type: 'Post',
                dataType: 'json',
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {
                           console.log("success");
                           if (myLineChart) myLineChart.destroy();
                           myData  = [];
                           $.each(response, function(i, ob){
                             myData.push(ob.total);
                           })
                           maxData = Math.max(...myData);
                           var ctx = document.getElementById("myBarChartDay");
                           myLineChart = new Chart(ctx, {
                             type: 'bar',
                             data: {
                               labels: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                               datasets: [{
                                 label: "Doanh thu (VND)",
                                 backgroundColor: [
                                                             'rgba(255, 99, 132, 0.2)',
                                                             'rgba(54, 162, 235, 0.2)',
                                                             'rgba(255, 206, 86, 0.2)',
                                                             'rgba(75, 192, 192, 0.2)',
                                                             'rgba(153, 102, 255, 0.2)',
                                                             'rgba(255, 159, 64, 0.2)',
                                                             'rgba(255, 192, 235, 0.2)',
                                                             'rgba(192, 206, 54, 0.2)'

                                                         ],
                                                         borderColor: [
                                                             'rgba(255,99,132,1)',
                                                             'rgba(54, 162, 235, 1)',
                                                             'rgba(255, 206, 86, 1)',
                                                             'rgba(75, 192, 192, 1)',
                                                             'rgba(153, 102, 255, 1)',
                                                             'rgba(255, 159, 64, 1)',
                                                              'rgba(255, 192, 235, 1)',
                                                              'rgba(192, 206, 54, 1)'

                                                         ],
                                 hoverBackgroundColor: 'rgba(2,117,216,1)',
                                                         hoverBorderColor: 'rgba(2,117,216,1)',
                                 data: myData,
                               }],
                             },
                             options: {
                               scales: {
                                 xAxes: [{
                                   time: {
                                     unit: 'month'
                                   },
                                   gridLines: {
                                     display: false
                                   },
                                   ticks: {
                                     maxTicksLimit: 7
                                   }
                                 }],
                                 yAxes: [{
                                   ticks: {
                                     min: 0,
                                     max: maxData,
                                     maxTicksLimit: 10
                                   },
                                   gridLines: {
                                     display: true
                                   }
                                 }],
                               },
                               legend: {
                                 display: false
                               }
                             }
                           });

                           $('#myBarChart').load(location.href+ " #myBarChart")
                       },
                       error: function (response) {
                           console.log("fail");
                           window.location.href = "/404";
                       }
            });
});

var orderCancel = [];
var orderTotal = [];
$('#year1').change(function (e) {
    e.preventDefault();
    var year = $(this).val();
    console.log(year);
     $.ajax({
            url: '/api/statistical/order/'+year,
            type: 'GET',
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                       console.log("success");
                       if (myLineChart) myLineChart.destroy();
                       orderCancel= [];
                       orderTotal = [];
                       $.each(response, function(i, ob){
                         orderCancel.push(ob.orderCancel);
                         orderTotal.push(ob.orderTotal);
                       })
                       maxData = Math.max(...orderTotal);
                       var ctx = document.getElementById("myBarChartOrder");
                      myLineChart = new Chart(ctx, {
                                               type: 'bar',
                                               data: {
                                                 labels: ["Th??ng 1", "Th??ng 2", "Th??ng 3", "Th??ng 4", "Th??ng 5", "Th??ng 6", "Th??ng 7", "Th??ng 8", "Th??ng 9", "Th??ng 10", "Th??ng 11", "Th??ng 12"],
                                                 datasets: [{
                                                   label: "????n hu???",
                                                   backgroundColor: [
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)',
                                                                                                                'rgba(255,0,0, 0.7)'
                                                                                                            ],
                                                                                                            borderColor: [
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)',
                                                                                                                'rgba(255,99,132,1)'
                                                                                                            ],
                                                   data: orderCancel,
                                                 },

                                                 {
                                                   label: "T???ng ????n",
                                                   backgroundColor: [
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)',
                                                                    'rgba(0,0,255, 0.7)'
                                                                ],
                                                                borderColor: [
                                                                     'rgba(75, 192, 192, 1)',
                                                                     'rgba(75, 192, 192, 1)',
                                                                     'rgba(75, 192, 192, 1)',
                                                                     'rgba(75, 192, 192, 1)',
                                                                     'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)',
                                                                      'rgba(75, 192, 192, 1)'
                                                                ],
                                                   data: orderTotal,
                                                 }],
                                               },
                                               options: {
                                                 scales: {
                                                   xAxes: [{
                                                     time: {
                                                       unit: 'month'
                                                     },
                                                     gridLines: {
                                                       display: false
                                                     },
                                                     ticks: {
                                                       maxTicksLimit: 12
                                                     }
                                                   }],
                                                   yAxes: [{
                                                     ticks: {
                                                       min: 0,
                                                       max: maxData,
                                                       maxTicksLimit: 10
                                                     },
                                                     gridLines: {
                                                       display: true
                                                     }
                                                   }],
                                                 },
                                                 legend: {
                                                   display: true
                                                 }
                                               }
                                             });

                       $('#myBarChartOrder').load(location.href+ " #myBarChartOrder")
                   },
                   error: function (response) {
                       console.log("fail");
                   }
        });
});

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
            var token = $('input[name="_csrf"]').attr('value')
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRF-Token", token);
            }
        }
    }
});
