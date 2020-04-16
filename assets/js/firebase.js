var firebaseConfig = {
  apiKey: "AIzaSyBjS1MGlsOhRi0LHvUCLtoP8yzv46G-YPg",
  authDomain: "brewcrawler-ae0b1.firebaseapp.com",
  databaseURL: "https://brewcrawler-ae0b1.firebaseio.com",
  projectId: "brewcrawler-ae0b1",
  storageBucket: "brewcrawler-ae0b1.appspot.com",
  messagingSenderId: "1058211844569",
  appId: "1:1058211844569:web:03243ecfc694b7bc3989c8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
let returnedCrawlData = [];
var crawlCode = 0;
var passingCrawl = [];


// $("#crawl-submit").click(function () {
//   crawlCode = Math.round(Math.random() * 1000000);
//   passingCrawl = JSON.parse(localStorage.getItem("crawlArray"));
//   console.log(passingCrawl);
//   console.log("crawlCode" + crawlCode);
//   console.log("success?");
//   writeCrawl();
//   localStorage.setItem("crawlCode", JSON.stringify(crawlCode));
//   window.location.pathname = "./confirmation.html";
// });


function writeCrawl() {
  firebase.database().ref(`crawl-code/${crawlCode}`).set({
    stops: passingCrawl,
  });
}

const getCrawl = (crawlCode) => {
  return firebase
    .database()
    .ref("crawl-code/" + crawlCode)
    .once("value")
    .then((snapshot) => {
      let crawlReturn = snapshot.val();
      console.log("crawl returns", crawlReturn);
    });
};
getCrawl(396277);

let displayArray = [];
const getById = async (id) => {
  try {
    {
      const res = await axios.get(
        `https://api.openbrewerydb.org/breweries/${id}`
      );
      console.log(res.data);
      returnedCrawlData.push(res.data);
    }
    console.log(JSON.parse(window.localStorage.crawlArray).length);
    console.log(insertData);
    //   insertData(returnedCrawlData);
  } catch (error) {
    console.error(error);
  }
};

window.onload = () => {
  if (window.location.pathname === "/confirmation.html") {
    let crawlCode = JSON.parse(window.localStorage.getItem("crawlCode"));
    let crawlData = JSON.parse(window.localStorage.getItem("crawlArray"));
    for (var i = 0; i < crawlData.length; i++) {
      getById(crawlData[i]);
    }
    console.log("returned array", returnedCrawlData);
    document.getElementById("confirmation-code").innerHTML = crawlCode;
  }


  console.log("returned array", returnedCrawlData);
  document.getElementById("confirmation-code").innerHTML = crawlCode;
}





$(".crawl-code-submit").click(function() {
    var enteredCrawlCode = $(".crawl-code-entry").val();
    console.log("did you enter this? " + enteredCrawlCode);
    sessionStorage.setItem("Entered Crawl Code", enteredCrawlCode);
})


