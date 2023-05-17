var setStorageItem = (key, value) => {
    console.log(typeof(Storage));
    if (typeof(Storage) !== "undefined") {
        // Store
        sessionStorage.setItem(key, value);
        console.log("set storage: ", sessionStorage.getItem(key));
    } else {
        alert("Sorry, your browser does not support Web Storage...");
        var div = document.createElement('div');
        div.setAttribute("style", "display:none;");
        div.setAttribute("id", "__key__"+key);
        div.setinnerHTML(value);
        document.body.appendChild(div);
    }
}

var getStorageItem = key => {
    if (typeof(Storage) !== "undefined") {
        // Store
        return sessionStorage.getItem(key);
    } else {
        alert("Sorry, your browser does not support Web Storage...");
        var div = document.querySelectorAll("#__key__"+key);
        if(div){
            return div.innerHTML;
        }
        
    }
}

var setVariant = () => {
    var appVariant = Math.random()*100000;
	setStorageItem("variant", appVariant);
}

var getVariant = () => {
    return getStorageItem("variant");
}