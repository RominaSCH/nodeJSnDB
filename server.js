const express = require('express');
const app = express();

app.listen(6789, function(){ //listen(서버띄울 포트번호, 띄운 후 실행할 코드)
    console.log('listening!');
});

app.get('/pet', function(req, res){ //reques 요청,  respond 응답
    res.send('멍냥멍냥');
})
app.get('/beauti', function(req, res){
    res.send("화장품 많아많아")
})