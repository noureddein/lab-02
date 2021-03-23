'use strict';

function Pics(items) {
  // this.title = img.title;
  // this.image_url = img.image_url;
  // this.description = img.description;
  // this.keyword = img.keyword;
  // this.horns = img.horns;
  for (let i in items) {
    this[i] = items[i];
  }
}

let newObjectItems = [];
Pics.prototype.render = function () {
  let $imgTemplet = $('#photoTemplate').html();
  let html = Mustache.render($imgTemplet, this);
  return $('#showRenderdItems').append(html);
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
  let rendering = function (page) {
    $.ajax(`../data/${page}.json`, ajaxSettings).then(page => {
      let optionsList;
      //Push Items From JSON File to the newObjectItems Array
      page.forEach(item => {
        newObjectItems.push(optionsList = new Pics(item));
        if (!keywordArray.includes(item.keyword)) {
          keywordArray.push(item.keyword);
        }
      });
      optionsList.renderByKeyword();

    });
  };
  //Renderd Items
  $('#clickToRenderPage1').click(function () {
    // $('section').empty();
    // newObjectItems = [];
    rendering(pages[1]);
    newObjectItems.forEach(item => {
      $('#showRenderdItems').append(item.render());
    });
    console.log(newObjectItems);
  });
  $('#clickToRenderPage2').click(function () {
    // newObjectItems = [];
    // $('section').empty();
    rendering(pages[0]);
    newObjectItems.forEach(item => {
      $('#showRenderdItems').append(item.render());
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
