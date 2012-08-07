function loadJson( uri ) {
  $.getJSON( uri , null, showData );
}

function showData( data, textStatus, jqXHR ) {
  alert( data.status );
}
