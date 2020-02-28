//Client side javascript
//console.log("Client side Javascript");

//fetch('http://localhost:5040/weather?address=Delhi').then((response)=>{
	


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
	
	e.preventDefault()
	console.log(search.value)
	
	messageOne.textContent =  "Loading....";
	messageTwo.textContent =  "";
	
	
	
	fetch('/weather?address='+encodeURIComponent(search.value)).then((response)=>{
	
		//console.log(response);
		response.json().then((data)=>{
		
			if(data.error){ 
			
			messageOne.textContent = data.error;
			
			}
			
			else{
				
			console.log(data.forecast)
			messageOne.textContent = data.location;
			messageTwo.textContent = data.forecast;
			console.log(data.location)
			
			}
		
	})
	
 })
	
	
	
	
})



