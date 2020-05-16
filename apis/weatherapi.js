var request=require('request');
request('https://samples.openweathermap.org/data/2.5/weather?zip=94040,us&appid=439d4b804bc8187953eb36d2a8c26a02',function (error,response,body){
    var data=JSON.parse(body);
    console.log("expected temperature range today : ");
    if(!error && response.statusCode===200){
        var minTemp=data.main.temp_min-273;
        var maxTemp=data.main.temp_max-273;
        console.log("min temp in degree Centigrade : " + minTemp);
        console.log("max temp in degree Centigrade : " + maxTemp);
    }
});
