request = require('request');
const forecast = (co1,co2, callback)=>{
	
	const url = 'https://api.darksky.net/forecast/1795974026a55dc972b5809c9e292a8c/'+encodeURIComponent(co1)+','+encodeURIComponent(co2);
	//console.log('forecast'+url)
	request({url:url,json:true},(error,response)=>{
		
		if(error){
			callback({error:'Network Issue'},undefined);
			
		}
		
		else if(response.body.error){
			//console.log("This is forecast");
			callback({
				error:'Location Input is incorrect'
				
			},undefined);
			
		}
		else {
			callback(undefined,{
				
				'forecast': response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.',
				'apparentTemperature':response.body.currently.apparentTemperature,
				'precipProbability':response.body.currently.precipProbability,
				'location':response.body.timezone,
				'latitude':response.body.latitude,
				'longitude':response.body.longitude
				
				
				
			});
			
		}
		
		
	});
	
	
	
}

module.exports = forecast;