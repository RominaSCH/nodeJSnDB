const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true})); //이해하려 하지 말고 외워라
//작동이 안되면 98%확률로 오타!

app.listen(6789, function(){ //listen(서버띄울 포트번호, 띄운 후 실행할 코드)
    console.log('listening!');
});

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.get("/write", function(req, res){
    res.sendFile(__dirname + '/write.html');
}) // JS는 콜백함수를 자주 쓰는데, 순차적으로 실행하고 싶을 때 사용한다. 

// /add 경로로 POST 요청을 하면 ??를 해주세요~

app.post("/add", function(req,res){ //받은 정보는 req에 있다. 쉽게 꺼내쓰려면 body-parser이 필요하다. npm install body-parser
    res.send("전송완료");
    console.log(req.body);
    console.log(req.body.toDo);
    console.log(req.body.date);
})

// body-parser 설치 -> input 태그에 name 쓰기