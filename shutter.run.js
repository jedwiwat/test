<script>
	let scripts = ["https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js","https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js"]
	for(let script of scripts){
		let elScript = document.createElement("script")
		elScript.src=script
		document.querySelector("head").append(elScript)
	}

	let btnDownload = document.createElement("button")
	btnDownload.style = "position:absolute;top:10px;left:50%;width:200px;height:50px;z-index:99999;";
	btnDownload.id = "download-all-image";
	btnDownload.onclick = function(){
		run()
	}
	btnDownload.innerText = "Download All Images"
	document.body.append(btnDownload)

	const delay = (ms)=>{
		return new Promise((resolve)=>{setTimeout(()=>{resolve()},ms)})
	}	

	const getImages = async (numOfImage)=>{
		let images = []
		for(let i = 1;i<=numOfImage;i++){
		    document.querySelector(`[title="Next (Right arrow key)"]`).click()
		    await delay(50);
		    images.push(document.querySelector(`[class="mfp-img"]`).getAttribute("src"))
		}
		return images
	}

	async function getBlobData(url){
  	let res = await axios({
	  url: corsUrl+url,
	  method: 'GET',
	  responseType: 'blob', 
	  headers:{
	  	origin:"cors-anywhere.herokuapp.com"
	  }
	})
	return res.data
  }


  	const download = async (urls) => {
  	for(let url of urls){
		let blob = await getBlobData(url);
		let arrs = url.split("/",-1)
		let filename = arrs[arrs.length-1]
  	 	zip.file(filename, blob);
  	}
  	

  	zip.generateAsync({ type: 'blob' })
      .then(content => {
        saveAs(content, 'images.zip');
        statusElement.innerText = "Done..."
      });

  }

	function run(){
		document.querySelector(`.result-list img`).click();
		let numOfImage = Number(document.querySelector(`.result-list h3`).innerHTML.match("[0-9]+")[0])
		let ulrs = getImages(numOfImage)

		let zip = new JSZip();

	  	const urls = prepareUrl()
	  	await download(urls)
	}
	
</script>
