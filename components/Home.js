function Home(){
    var div = document.createElement("Div");
    
    div.style.width = "930px";
    div.style.height="380px";
    div.style.background = "white";
    linebreak = document.createElement("br");

    for(i=0;i<4;i++){

        for(b=0;b<6;b++){
             document.body.appendChild(div);
        }
        document.body.appendChild(linebreak);
    }
}

export default new Home();