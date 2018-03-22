
var onload = function(){
  console.log("coucou");
  $.getJSON("/savedArticles", function(data){
    console.log(data);
    $("#savedArticleHolder").empty();
    if(data.length > 0){
      for (var i = 0; i < data.length; i++) {
        console.log("coucou");
        $("#savedArticleHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-danger deleteArt" data-id= "'+data[i]._id+'">Delete</button><button type="button" class="btn btn-outline-primary notesArt" data-id= "'+data[i]._id+'" data-title= "'+data[i].title+'">Take a Note</button></div></div>');
      }
    }else{
      $("#savedArticleHolder").append('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">No current articles saved</h5></div></div></div>');
    }
  });
};

$(document).on('click', ".deleteArt" , function() {
   var id = $(this).attr("data-id");
   $.ajax({
     method: "POST",
     url: "/articles/" + id,
     data: {
       saved: 0
     }
   }).then(function(data){
     onload();
   });
});

var loadModal = function(title, id, note){
  $('.modal-title').empty();
  $('.noteDisplay').empty();
  $('.modal-title').text(title);
  $('.subNote').attr('data-id',id);
  $('.noteDisplay').text(note);
  $('.noteModal').modal('show');
};

$(document).on('click', '.notesArt', function(event){
  event.preventDefault();
  var id= $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/targetarticle/" + id
  }).then(function(data){
    var note = "No Current Notes Available";
    if (data.note && data.note.note != "") {
      note= data.note.note;
    }
    var title= data.title;
    var idNew= data._id;
    console.log(idNew);
    loadModal(title, idNew, note);
  });
});

$('.subNote').on('click', function(event){
  event.preventDefault();
  var note = $('#note-text').val().trim();
  var id = $('.subNote').attr('data-id');
  $('#note-text').val("");
  $.ajax({
    method: "POST",
    url: "/articlesave/" + id,
    data: {
      note: note
    }
  }).then(function(data){
    var note= data.note.note;
    if (data.note.note === "") {
      note= "No Current Notes Available";
    }
    var title= data.title;
    var id= data._id;
    loadModal(title, id, note);
  });
});

$('.deleteNote').on('click', function(event){
  event.preventDefault();
  var note = $('#note-text').val();
  var id = $('.subNote').attr('data-id');
  $('#note-text').val("");
  $.ajax({
    method: "POST",
    url: "/articlesave/" + id,
    data: {
      note: "No Current Notes Available"
    }
  }).then(function(data){
    console.log(data);
    var note= data.note.note;
    var title= data.title;
    var id= data._id;
    loadModal(title, id, note);
  });
});
onload();
