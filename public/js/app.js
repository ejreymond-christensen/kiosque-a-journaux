

$("#btnObs").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeObs", function() { }).done(function(){
    $.getJSON("/articlesToday", function(data){
      console.log(data);
      $("#articlesHolder").empty();
      for (var i = 0; i < data.length; i++) {
        console.log("coucou");
        $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
      }
    });
  });
});

$("#btnLeMonde").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeLeMonde", function() { }).done(function(data){
    $.getJSON("/articlesToday", function(data){
      console.log(data);
      $("#articlesHolder").empty();
      for (var i = 0; i < data.length; i++) {
        console.log("coucou");
        $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
      }
    });
  });
});

$("#btnFigaro").on("click", function(event){
  event.preventDefault();
  $.getJSON("/scrapeLeFigaro", function() { }).done(function(data){
    $.getJSON("/articlesToday", function(data){
      console.log(data);
      $("#articlesHolder").empty();
      for (var i = 0; i < data.length; i++) {
        console.log("coucou");
        $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
      }
    });
  });
});

$("#allPast").on("click", function(event){
  event.preventDefault();
  $.getJSON("/articles", function(data){
    console.log("coucou");

    for (var i = 0; i < data.length; i++) {
      console.log("coucou");
      $("#articlesHolder").prepend('<div class="row"><div class="card" style= "width: 100%;"><div class="card-body"><h5 class="card-title">'+data[i].title+'</h5><h6 class="card-subtitle mb-2 text-muted">'+data[i].source+'</h6><p class="card-text">'+data[i].preview+'</p><a href="'+data[i].link+'" class="card-link" target="_blank">view article</a><button type="button" class="btn btn-outline-primary saveArt" data-id= "'+data[i]._id+'">Save Article</button></div></div>');
    }
  });
});

$(document).on('click', ".saveArt" , function() {
     var id = $(this).attr("data-id");
     $.ajax({
       method: "POST",
       url: "/articles/" + id,
       data: {
         saved: 1
       }
     });
});
