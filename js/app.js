'use strict';

function Pics(img) {
  this.title = img.title;
  this.image_url = img.image_url;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}
let newObjectItems = [];
Pics.prototype.render = function () {
  let $imgTemplet = $('#photoTemplate').html();
  // $imgTemplet.addClass(`${this.keyword}`);
  // $('main').append($imgTemplet);
  // $imgTemplet.find('h2').text(this.title);
  // $imgTemplet.find('img').attr({
  //   src: this.image_url,
  //   title: this.title,
  // });
  // $imgTemplet.find('p').text(this.description);
  let html = Mustache.render($imgTemplet, this);
  return html;
};
const keywordArray = [];
Pics.prototype.renderByKeyword = function () {
  keywordArray.forEach(item => {
    let $selectEl = $(`<option value=${item}>${item}</option>`);
    $('select').append($selectEl);
  });
};

// Pages Array for chage between pages
const pages = ['page', 'page-2'];

Pics.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax(`../data/${pages[1]}.json`, ajaxSettings).then(page => {
    let optionsList;
    //Push Items From JSON File to the newObjectItems Array
    page.forEach(item => {
      newObjectItems.push(optionsList = new Pics(item));
      if (!keywordArray.includes(item.keyword)) {
        keywordArray.push(item.keyword);
      }
    });
    optionsList.renderByKeyword();

    //Renderd Items
    $('#clickToRenderPage1').click(function () {
      newObjectItems.forEach(item => {
        $('#showRenderdItems').append(item.render());
      });
    });
  });

};
$(() => Pics.readJson());

$(document).ready(function () {
  $('#imgSelet').change(function () {
    if ($(this).val() === 'default') {
      $('.a').show();
    } else {
      $('.a').hide();
      $('.' + $(this).val()).show();
    }
  });
});
