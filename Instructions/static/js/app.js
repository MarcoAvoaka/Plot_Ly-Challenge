d3.json("samples.json").then ((data)=>{
	console.log(data)	
let dropdown= d3.select ("#selDataset")	
data.names.forEach((ID)=>{
	dropdown.append("option").text(ID).property("value",ID)

});
createchart(data.names[0])
})
function createmetadata(ID) {
	console.log(ID)
	d3.json("samples.json").then((data)=>{
	var metadata=data.metadata.filter(item=>item.id==ID)
	console.log(metadata)
	tableinfo=d3.select("#sample-metadata")
	tableinfo.html(`id:${metadata[0].id}
	<br> ethnicity:${metadata[0].ethnicity}
	<br> gender:${metadata[0].gender}
	<br> age:${metadata[0].age}
	<br> location:${metadata[0].location}
	<br> bbtype:${metadata[0].bbtype}
	<br> wfreq:${metadata[0].wfreq}
	`)
	
	});
}
function createchart(ID){
	console.log(ID)
	d3.json("samples.json").then ((data)=>{
	var filterdata=data.samples.filter(item=>item.id==ID)
	var otus_ids=filterdata[0].otu_ids
	var otus_labels=filterdata[0].otu_labels
	var sample_values=filterdata[0].sample_values
	console.log(filterdata)
	var trace1 = {
		x: otus_ids,
		y: sample_values,
		text:otus_labels,
		mode: 'markers',
		marker: {
		  size: sample_values,
		  color:otus_ids
		}
	  };
	  
	  var bubble_data = [trace1];
	  
	  var layout = {
		title: 'Sample bubble chart',
		showlegend: false,
		height: 600,
		width: 600
	  };
	  
	  Plotly.newPlot('bubble', bubble_data, layout);
	  let tensamples= otus_ids.slice(0,10).map(sampleid=>`OTU ${sampleid}`)
	  	console.log(tensamples)
	  var horizontal_data = [
		{
		  x: sample_values.slice(0,10),
		  y: tensamples,
		  
		  type: 'bar',
		  orientation:"h"
		}
	  ];
	  var layout_bar_chart = {
		title: 'Horizontal chart',
		showlegend: false,
		height: 600,
		width: 600
	  };
	  console.log(otus_ids)
	  Plotly.newPlot('bar', horizontal_data, layout_bar_chart);

	  
	})		
}
function optionChanged(selectvalue){

	createchart(selectvalue)
	createmetadata(selectvalue)

}
function start_page(){
	d3.json("samples.json").then ((data)=>{
	createchart(data.names[0]) 
	createmetadata(data.names[0])
}) 
	
}
 start_page()