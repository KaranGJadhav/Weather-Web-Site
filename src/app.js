//Web Server Application
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const app = express();

//Define path for express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handelbars engine and views path
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectory));

//Render main page
app.get('',(req,res)=>{
	
	res.render('index',{
		
		title:'Weather App',
		name:'Karan Jadhav'
		
	});		
});

//Render about page
app.get('/about',(req,res)=>{
	
	res.render('about',{
		
		title:'About Me',
		name:'Karan Jadhav'
		
	});
	
	
});

//Render Help Page
app.get('/help',(req,res)=>{
	
	res.render('help',{
		
		message:'Help Page Partials',
		name:'Karan Jadhav',
		title:'Help'
		
	});
	
	
});

//Render Weather page
app.get('/weather',(req,res)=>{
	
		//console.log('entered geocode get');
		if(!req.query.address){
		
	return	res.send({
			
			error:"Search Term is mandatory,please enter the location to know the weather"
			
		})
		
		
		}
	else{
		
		geocode(req.query.address,(error,response)=>{
	
		if(error){
			
			return res.send(error)
			
			
		}
	

			forecast(response.latitude,response.longitude, (error, data) => {
				
			if(error){
				
				return res.send(error)
				//console.log(error);
				
			}	
				
				//console.log('Error', error)
				//console.log('Data', data)
			
			res.send({

				forecast:data.forecast,
				location:response.location,
				address:req.query.address
				
			});
	});
	
	
 });
		
}
	
	
	
});


app.get('/products',(req,res)=>{
	
	//console.log(req.query.search);
	if(!req.query.search){
		
	return	res.send({
			
			error:"Search Term is mandatory,please enter the search term"
			
		})
		
		
	}
	res.send({
		
		products:[]
		
	})
	
	
	
});

app.get('/geocode-app',(req,res)=>{
	
	
	res.send([{
		
		name:'Karan'
		
		
	},{
		
		name:'Rohan'
		
	}]);
	
	
});



app.get('help/*',(req,res)=>{
	
	
	res.render('errorPageNotfound',{
		
		error:"Page Not found, Error 404",
		message:"Please check the end points,contact your developer"
		
		
	});
	
	
});

app.get('*',(req,res)=>{
	
	
	res.render('errorPageNotfound',{
		
		error:"Page Not found, Error 404",
		message:"Please check the end points,contact your developer"
		
		
	});
	
	
});

app.listen(5040,()=>{
	
	console.log('Server is connected to port 5040....');
	
	
});
