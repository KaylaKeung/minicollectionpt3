// console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
// console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "keyw5v6LxIabKZUt7" }).base(
  "apppiopjlTtlqpyyA"
);

// get our collection base, select all the records
// specify functions that will receive the data
base("grammys")
  .select({})
  .eachPage(gotPageOfGrammys, gotAllGrammys);

// an empty array to hold our data
var grammys = [];

// callback function that receives our data
function gotPageOfGrammys(records, fetchNextPage) {
  console.log("gotPageOfGrammys()");
  // add the records from this page to our array
  grammys.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllGrammys(err) {
  console.log("gotAllGrammys()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogGrammys();
  showGrammys();
}

// just loop through the books and console.log them
function consoleLogGrammys() {
  console.log("consoleLogGrammys()");
  grammys.forEach(grammy => {
    console.log("Grammy:", grammy);
  });
}

// look through our airtable data, create elements
function showGrammys() {
  console.log("showGrammys()");
  grammys.forEach(grammy => {
    // create container for each song
    var awardContainer = document.createElement("div");
    awardContainer.classList.add("award-container");
    document.querySelector(".container").append(awardContainer);

    // add award titles
    var award = document.createElement("h1");
    award.classList.add("award");
    award.innerText = grammy.fields.award;
    awardContainer.append(award);

  //images
    var songImage = document.createElement("img");
    songImage.classList.add("song-image");
    songImage.src = grammy.fields.image[0].url;
    awardContainer.append(songImage);

    //artists
    var nameOfArtist = document.createElement("h1");
    nameOfArtist.classList.add("song-artist");
    nameOfArtist.innerText = grammy.fields.artist;
    awardContainer.append(nameOfArtist);

  

    //link gif
    var songGif = document.createElement("img");
    songGif.classList.add("song-gif");
    songGif.src = grammy.fields.gif[0].url;
    awardContainer.append(songGif);

     //hover unfold
     awardContainer.addEventListener("mouseover",function(){
      awardContainer.style.height="auto";
      award.style.opacity="0";
      nameOfArtist.style.opacity="1";
      songGif.style.display="none";

    })
    //mouseout
    awardContainer.addEventListener("mouseout",function(){
      awardContainer.style.height="80vh";
      award.style.opacity="1";
      nameOfArtist.style.opacity="0";
      songImage.style.display="flex";
      songGif.style.display="none";
    })
    //click show gif
    nameOfArtist.addEventListener("click",function(){
      songImage.style.display="none";
      songGif.style.display="flex";
    })


//GENRE NOT WORKING

// get genre field from airtable
// loop through the array and add each genre as
// a class to the song container
var grammysGenre = grammy.fields.genre;
grammysGenre.forEach(function(genre) {
  awardContainer.classList.add(genre);
});

// //     // clicking on filter by rap
//     var filterRap = document.querySelector(".rap");
//     filterRap.addEventListener("click", function() {
//       if (awardContainer.classList.contains("rap")) {
//         awardContainer.style.height="90vh";
//         award.style.fontSize="1.5em";
//         songGif.style.display="flex";
//          nameOfArtist.style.opacity="1";
//         songImage.style.display="flex";
        
//       } else {
//         awardContainer.style.height="0";
//   award.style.fontSize="0";
//   songGif.style.display="none";
//    nameOfArtist.style.opacity="0";
//   songImage.style.display="none";
//       }

//     });

//     //     // clicking on filter by pop
//     var filterPop = document.querySelector(".pop");
//     filterPop.addEventListener("click", function() {
//       if (awardContainer.classList.contains("pop")) {
//         awardContainer.style.height="90vh";
//         award.style.fontSize="1.5em";
//         songGif.style.display="flex";
//          nameOfArtist.style.opacity="1";
//         songImage.style.display="flex";
        
//       } else {
//         awardContainer.style.height="0";
//   award.style.fontSize="0";
//   songGif.style.display="none";
//    nameOfArtist.style.opacity="0";
//   songImage.style.display="none";
//       }

//     });
//     //     // clicking on filter by R&B
//     var filterRnb = document.querySelector(".rnb");
//     filterRnb.addEventListener("click", function() {
//       if (awardContainer.classList.contains("rnb")) {
//         awardContainer.style.height="90vh";
//         award.style.fontSize="1.5em";
//         songGif.style.display="flex";
//          nameOfArtist.style.opacity="1";
//         songImage.style.display="flex";
        
//       } else {
//         awardContainer.style.height="0";
//   award.style.fontSize="0";
//   songGif.style.display="none";
//    nameOfArtist.style.opacity="0";
//   songImage.style.display="none";
//       }

//     });
//     //     // clicking on filter by reset
//     var reset = document.querySelector(".rap");
//     reset.addEventListener("click", function() {
    
//         awardContainer.style.height="90vh";
//         award.style.fontSize="1.5em";
//         songGif.style.display="flex";
//        nameOfArtist.style.opacity="1";
//         songImage.style.display="flex";

//     });
  });
}
