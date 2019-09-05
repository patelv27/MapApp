

<script type="text/javascript">
    	let arr=[];
    	let i=arr.length;
    	let num=[];
        function tester() {
            var userInput = document.getElementById("userInput").value;
            i=i+1;
            arr.push(userInput);
            num.push(i);
            document.getElementById("userInput").value="";
            lastword=document.getElementById("lastword").value;
            document.getElementById("lastword").innerHTML=arr[arr.length-1];
            console.log(arr);
            console.log(num);

        }
        function back() {
        	document.getElementById("lastword").innerHTML=arr[arr.length-2];
        	num.splice(arr.length-1,2,i);
        	i=i-1;
        	console.log(arr);
        	console.log(num);

        }

        function backhome() {
        	document.getElementById("lastword").innerHTML=arr[0];
        	i=1;
        	num.push(i);
        	console.log(arr);
        	console.log(num);
        }
  
		
		

        function jsonify(a,b) {
		  var added = [];
		  var linkeroos=[];
		  var h=added.length;
		  for (var key in b ) {
		  	datas.nodes[key]={
		  		value: a[key],
		  		id: b[key]};
		  	
		  	if (b[key]!==b[b.length-1]) {
			  	datas.links[key]={
			  		source: b[key],
			  		target: b[key]+1
			  	
			  }
			}
			else {
				data.links[key]={
			  		source: b[key],
			  		target: b[key]
			  	}
			}
		}

		console.log(datas);
		}

		 
		  	
		
		var fakedata={
			  "nodes":[
					{"name":"node1","group":1},
					{"name":"node2","group":2},
					{"name":"node3","group":2},
					{"name":"node4","group":3}
				],
				"links":[
					{"source":2,"target":1,"weight":1},
					{"source":0,"target":2,"weight":3}
				]}