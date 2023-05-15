const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const videoContainer = document.querySelector(".videocontainer");

menuIcon.onclick = function () {
  sidebar.classList.toggle("small-sidebar");
  videoContainer.classList.toggle("large-videocontainer");
};

const videoCardContainer = document.querySelector(".videocontainer");

// declare api keyto fetch the data

var api_key = "AIzaSyB9NqXgUjlP6Hj-SOAp_uM-83UFkpiF3Ck";
let video_http = " https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// fetch the data using fetch api method

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 100,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    //  console.log(data)
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })

  // to detect the errror and console using catch operator

  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;

      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
    <div class="list-container" onclick="location.href= 'https://youtube.com/watch?v=${data.id}'">
    <div class="video">
    <img src="${data.snippet.thumbnails.maxres.url}" class="thumbnail" alt="">
    <div class="content flex-div">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
              
        </div>
    </div>
</div>
</div>
`;
};

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
