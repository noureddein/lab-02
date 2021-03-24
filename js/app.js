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
  $('#imgSelect').empty();
  $('#imgSelect').append('<option value="default">Show All</option>');
  keywordArray.sort();
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
    $.ajax(`/data/${page}.json`, ajaxSettings).then(page => {
      let optionsList;
      //Push Items From JSON File to the newObjectItems Array
      page.forEach(item => {
        newObjectItems.push(optionsList = new Pics(item));
        if (!keywordArray.includes(item.keyword)) {
          keywordArray.push(item.keyword);
        }
      });
      optionsList.renderByKeyword();
      if (newObjectItems !== null) {
        $('#showRenderdItems').empty();
        newObjectItems.forEach(item => {
          $('#showRenderdItems').append(item.render());
        });
        newObjectItems = [];
        console.log(newObjectItems);
      }
    });
  };
  //Renderd Items
  $('#clickToRenderPage1').click(function () {
    rendering(pages[0]);
  });
  $('#clickToRenderPage2').on('click', function () {
    rendering(pages[1]);
  });

};
$(() => Pics.readJson());

$(document).ready(function () {
  $('#imgSelect').change(function () {
    if ($(this).val() === 'default') {
      $('.a').show();
    } else {
      $('.a').hide();
      $('.' + $(this).val()).show();
    }
  });
});
