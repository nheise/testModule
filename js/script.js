function loadJson() {
  $.getJSON( 'http://nheise.net/nodejs/testModule/json' , null, showData );
}

function showData( data, textStatus, jqXHR ) {
  alert( data.status );
}
