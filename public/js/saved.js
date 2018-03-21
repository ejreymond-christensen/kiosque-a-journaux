
var onload = function(){
  console.log("coucou");
  $.getJSON("/savedArticles", function(data){
    console.log(data);
    $("#savedArticleHolder").empty();
    for (var i = 0; i < data.length; i++) {
      console.log("coucou");
      $("#savedArticleHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link">view article</a><button type="button" class="btn btn-outline-danger deleteArt" data-id= "'+data[i]._id+'">Delete</button><button type="button" class="btn btn-outline-primary notesArt" data-id= "'+data[i]._id+'" data-title= "'+data[i].title+'">Take a Note</button></div></div>');
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

$(document).on('click', '.notesArt', function(event){
  event.preventDefault();
  var title= $(this).attr("data-title");
  var id= $(this).attr("data-id");
  $('.modal-title').empty();
  $('.modal-title').text(title);
  // $('#subNote').attr("data-id").val(id);
  $('.subNote').attr('data-id',id);
  $('.noteModal').modal('show');
});


onload();
