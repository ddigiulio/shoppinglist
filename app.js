var state = {
    items: []
};

var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
  );

var addItem = function(state, item) {
    
    state.items.push({
      itemText: item,
      isChecked: false,
    });

};

var deleteItem = function(state, item) {

  state.items.map(function(itemCurrent, i){

    if(itemCurrent.itemText === item){
      state.items.splice(i,1);
    }
  });

}

var checkedItem = function(state, item){


  state.items.map(function(itemCurrent, i){

    if(itemCurrent.itemText === item){
      itemCurrent.isChecked = true;
    }

  });

};

var renderItem = function(item, elementTemplate){

  var elementCurrent = $(elementTemplate);
  elementCurrent.find(".shopping-item").text(item.itemText);
  if (item.isChecked){
    elementCurrent.find(".shopping-item").addClass('shopping-item__checked');
  }
  return elementCurrent;
}

var renderList = function(state, element) {
    
    var itemsHTML = state.items.map(function(item) {
        return renderItem(item,listItemTemplate);
    });
    element.html(itemsHTML);
};

$("form").on("submit", function(event) {
  event.preventDefault();
  addItem(state, $("input[name=shopping-list-entry").val());  
  renderList(state, $('.shopping-list'));
  this.reset();
});


$("ul").on("click", ".shopping-item-delete", function(event){
  var item =$(this).closest("li").find(".shopping-item").text();
  console.log(item);
  deleteItem(state, item);
  renderList(state, $('.shopping-list'));
});

$("ul").on("click", ".shopping-item-toggle", function(event){

  var item =$(this).closest("li").find(".shopping-item").text(); 
  checkedItem(state, item);
  renderList(state, $('.shopping-list'));

});



