var USER = '52admln';
var STORAGE_KEY = '52admin-projects';

$(".js-refresh").on('click', function () {
    console.log(1);
    $(".loader").removeClass("hidden"); // 隐藏loader
    $(".wrapper").removeClass("animated").addClass("hidden"); // 页面载入动画
    getData();
});


function renderData(data) {
    var str = "";
    for (var index in data) {
        if (!data[index].fork) { // 不是fork的仓库
            var language = data[index].language || "project",
                url = data[index].homepage || data[index]['svn_url'], // 无演示地址则使用仓库地址
                name = data[index].name,
                desc = data[index].description || "暂无描述"; //如无描述,则显示暂无描述

            $(".loader").addClass("hidden"); // 隐藏loader
            $(".wrapper").removeClass("hidden").addClass("animated"); // 页面载入动画

            str += '<li class="repo grid ' + '">'
                + '<a href="' + url + '" target="_blank">'
                + '<h2>' + name + '</h2>'
                + '<p>' + desc + '</p>'
                + '</a>'
                + '<div class="repo-tags">' + (language.toString()).toUpperCase() + '</div>'
                + '</li>';
        }
    }
    $('.js-list').html(str);
}

function getData() {
    // 此方法支持跨域调用
    $.getJSON('https://api.github.com/users/' + USER + '/repos', function (source, status) {
        // console.log(source.data[0].id);
        console.log(status);
        if (status === 'success') {
            projectStorage.save(source);
            renderData(projectStorage.get());
        } else {
            // 错误后的提示
        }
    });
}
var projectStorage = {
    save: function (source) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(source));
    },
    get: function () {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
};

function init() {
    if (!projectStorage.get()) {
        getData();
    } else {
        renderData(projectStorage.get());
    }
}

init();
