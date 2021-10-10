
const getProjects = () => {
    $.get('/api/projects', (response) => {
      if (response.statusCode == 200){
        console.log(response);
        addProjects(response.data);
      }
      else {
        console.log(response);
      }
    }
    )
  }
  
  const addProjects = (items) => {
    var icon = "assets/github.png";
    items.forEach(item => {
     if(item.link.includes("youtu")){
        icon = "assets/youtube.png"
     }
     else {
         icon = "assets/github.png"
     }
      let itemToAppend = 
      '<div class="col l4 s12 m7">'+
      '<div class="card small">' +
        '<h1 class="card-title center">'+ item.title + '</h1>' +
        '<div class="card-image">' + 
          '<img src="'+ item.image + '" style="height: 50%; padding-right: 5px; padding-left: 5px;">' +
        '</div>' + 
        // '<div class="card-content">' +
        //   '<p>' + item.description + '</p>' + 
        // '</div>' + 
        '<div class="card-action">' + 
          '<a href="'+ item.link +'"><img src="'+icon+'" style="height: 20px; padding-right: 15px;"></i> Take a look</a>' + 
        '</div>' + 
      '</div>' +
    '</div>' ;
    $("#projects").append(itemToAppend);
    });
  }

  

$(document).ready(function(){
    // addProjects(projectList);
    getProjects();
    
    
  });