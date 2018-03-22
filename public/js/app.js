
var populateArts = function(data){
  $("#articlesHolder").empty();
  for (var i = 0; i < data.length; i++) {
    if (data[i].saved === true) {
      $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'" disabled>Saved</button></div></div>');
    }else{
      $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
    }
  }
};


$("#btnObs").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeObs", function() { }).done(function(){
    $.getJSON("/articlesToday", function(data){
      console.log(data);
      populateArts(data);
    });
  });
});

$("#btnLeMonde").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeLeMonde", function() { }).done(function(data){
    $.getJSON("/articlesToday", function(data){
      populateArts(data);
    });
  });
});

$("#btnFigaro").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeLeFigaro", function() { }).done(function(data){
    $.getJSON("/articlesToday", function(data){
      populateArts(data);
    });
  });
});

$("#allPast").on("click", function(event){
  event.preventDefault();
  $.getJSON("/articles", function(data){
  populateArts(data);
  });
});

$(document).on('click', ".saveArt" , function(event){
  event.preventDefault();
     var id = $(this).attr("data-id");
     $(this).attr("disabled","disabled");
     $(this).text("saved")
     $.ajax({
       method: "POST",
       url: "/articles/" + id,
       data: {
         saved: 1
       }
     }).then(function(){

     });
});
