var request=require('request');
request('http://www.facebook.com', function(error,response,body){
    if(!error){
        if(response.statusCode===200){
            console.log(body);
        }
    }
    else{
        // console.log(response.statusCode);
        console.log(error);
    }
});