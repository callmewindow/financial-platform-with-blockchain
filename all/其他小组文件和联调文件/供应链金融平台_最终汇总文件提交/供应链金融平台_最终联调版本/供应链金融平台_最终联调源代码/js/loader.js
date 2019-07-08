function loadStart() {
    window.loader.show();
}
function loadEnd()
{
    window.loader.hide();
}
window.addEventListener("load",function () {
    $('#bodys').append("<div class=\"loader\" id=\"loader\">\n" +
        "\t<div class=\"loader-animation\">\n" +
        "\t\t<div class=\"text\">Loading...</div>\n" +
        "\t\t<div class=\"horizontal\">\n" +
        "\t\t  <div class=\"circlesup-load\">\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t  </div>\n" +
        "\t\t  <div class=\"circlesdwn-load\">\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t  </div>\n" +
        "\t\t</div>\n" +
        "\t\t<div class=\"vertical\">\n" +
        "\t\t  <div class=\"circlesup-load\">\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t  </div>\n" +
        "\t\t  <div class=\"circlesdwn-load\">\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t\t\t<div class=\"circle-load\"></div>\n" +
        "\t\t  </div>\n" +
        "\t\t</div>\n" +
        "\t</div>\n" +
        "</div>")
    window.loader = $("#loader")
    window.loader.hide()
})