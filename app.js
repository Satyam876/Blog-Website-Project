const express = require('express');
const bodyparser = require('body-parser');

const app = express();

let posts_array = []; 

var homecontent_1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi magnam assumenda, modi nostrum ullam dolor hic adipisci aliquid ducimus laborum officia ut odio quaerat nesciunt, perferendis ipsum. Laboriosam quibusdam maxime nulla dolores!";

var aboutcontent_1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi magnam assumenda, modi nostrum ullam dolor hic adipisci aliquid ducimus laborum officia ut odio quaerat nesciunt, perferendis ipsum. Laboriosam quibusdam maxime nulla dolores!";

var contactcontent_1 = "Welcome ! You can contact us by various ways !";


app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:true}));

app.use('/public',express.static('public'));



app.get('/',function(req,res){
    res.render('home',{starting_content : homecontent_1 , posts : posts_array});
})

app.get('/about',function(req,res){
    res.render('about',{about_starting_content : aboutcontent_1});
})

app.get('/contact',function(req,res){
    res.render('contact',{contact_starting_content : contactcontent_1});
})

app.get('/create',function(req,res){
    res.render('create');
})



app.post('/create',function(request,response){

    const post_object = {
         post_title : request.body.postTitle,
         post_content : request.body.postContent
    };

    posts_array.push(post_object);
    response.redirect('/');
})


app.get('/posts/:postName',function(req,res){

    const requested_Title = req.params.postName;

    posts_array.forEach(element => {
        const stored_Title = element.post_title;

        if(requested_Title === stored_Title)
        {
                res.render('newpage',{
                    newpage_title : stored_Title , 
                    newpage_post : element.post_content
                })
        }
    });
})



app.listen(3000,function(){
    console.log("Server Started at port 3000");
})