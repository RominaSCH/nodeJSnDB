const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); //이해하려 하지 말고 외워라
const MongoClient = require("mongodb").MongoClient;
var db;
const mongoURL = "mongodb+srv://rominaSCH:dhktej31@nodsjsndb.uuwp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//작동이 안되면 98%확률로 오타!
app.set("view enine", 'ejs');


// MongoClient.connect(
//   "mongodb+srv://rominaSCH:dhktej31@nodsjsndb.uuwp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   function (error, client) {
//     if (error) return console.log(error); //한줄일 경우 {} 생략가능

//     db = client.db("todo"); //todo라는 database(폴더)에 연결해주세요
//     // db.collection('post').insertOne({_id : 100, name : "kim", age : 27}, function(err, result){
//     //     console.log('저장완료')
//     // });

//     app.listen(6789, function () {
//       //listen(서버띄울 포트번호, 띄운 후 실행할 코드)
//       console.log("listening!");
//     });
//   }
// );
app.listen(6789, function () {
    //listen(서버띄울 포트번호, 띄운 후 실행할 코드)
    console.log("listening!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
}); // JS는 콜백함수를 자주 쓰는데, 순차적으로 실행하고 싶을 때 사용한다.

// app.get("/list", function(req, res){
//     db.collection("post").find().toArray((err, result) => {
//         console.log(result);
//         // res.render("list.ejs", )
//     });//DB에 저장된 post라는 collection 안의 모든 데이터를 꺼내주세요
//     res.render('list.ejs');
    
// })


app.post("/add", function (req, res) {
  //받은 정보는 req에 있다. 쉽게 꺼내쓰려면 body-parser이 필요하다. npm install body-parser
  
  MongoClient.connect(mongoURL,{ useUnifiedTopology: true }, function (error, client) {
      if (error) return console.log(error); //한줄일 경우 {} 생략가능

      db = client.db("todo"); //todo라는 database(폴더)에 연결해주세요
      db.collection('post').insertOne({_id : new Date(), todo : req.body.toDo, dueDate : req.body.date}, function(err, result){
          console.log('저장완료');
      });

      
    }
  );
  res.send("전송완료");
//   console.log(req.body);
//   console.log(req.body.toDo);
//   console.log(req.body.date);
});



// body-parser 설치 -> input 태그에 name 쓰기

//API란 무엇인가?
//웹서버와 고객간의 소통방법, 어떻게 해야 서버랑 통신을 할 수 있을까(통신규약)
//HTTP 요청 시스템(GET, POST, PUT, DELETE)을 너무 다 다르게 쓰니까 REST원칙에 의해서 쓰자고 Roy Fielding이 논문씀
//REST 원칙 6가지
//1. Uniform Interface : 하나의 자료는 하나의 URL로, URL하나를 알면 둘을 알 수 있어야함, 요청과 응답은 정보가 충분히 들어있어야 함.
//2. Client-Server 역할구분 : 브라우저는 요청만하고 서버는 응답만 한다.
//3. Stateless : 요청1과 요청2는 서로 의존성이 없어야 한다.
//4. Cacheable : 캐싱 어쩌구~ 우리는 신경 안쓴다. 브라우저가 잘 해줌
//5. Layered System
//6. Code on Demand

//1번이 가장 중요하다! 아래는 좋은 URL의 예시

// instagram.com/explore/tags/kpop
// instagram.com/explore/tags/food
// facebook.com/natgeo/photos
// // facebook.com/bbc/photos

// < 이름 잘 짓는 방법 >
// URL을 명사로 작성할 것
// 띄어쓰기는 언더바_대신 대시-기호-사용
// 파일 확장자 쓰지 말기 (.html 이런거)
// 하위 문서들을 뜻할 땐 / 기호를 사용함 (하위폴더같은 느낌)
// 자료 하나당 하나의 URL
