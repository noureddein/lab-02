'use strict';

function Pics(img) {
  this.title = img.title;
  this.image_url = img.image_url;
  this.description = img.description;
  this.keyword = img.keyword;
  this.horns = img.horns;
}

Pics.prototype.render = function () {
  let $imgTemplet = $('#photoTemplate').clone();
  $imgTemplet.addClass(`${this.keyword}`);
  $('main').append($imgTemplet);
  $imgTemplet.find('h2').text(this.title);
  $imgTemplet.find('img').attr({
    src: this.image_url,
    title: this.title,
  });
  $imgTemplet.find('p').text(this.description);
};

const keywordArray = [];
Pics.prototype.renderByKeyword = function () {
  console.log(keywordArray);
  keywordArray.forEach(item => {
    let $selectEl = $(`<option value=${item}>${item}</option>`);
    $('select').append($selectEl);
  });
};


Pics.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  let pictures;
  $.ajax('../data/page.json', ajaxSettings)
    .then(page => {
      page.forEach(item => {
        pictures = new Pics(item);
        if (!keywordArray.includes(pictures.keyword)) {
          keywordArray.push(pictures.keyword);
        }
        pictures.render();

      });
      pictures.renderByKeyword();
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
