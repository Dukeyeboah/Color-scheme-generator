const seedColor = document.getElementById("seed-color")
const getScheme = document.getElementById("get-scheme-btn")
const mode = document.getElementById("mode-select")
let colorHtml = " "

let modeValue = mode.options[mode.selectedIndex].value

//function returns selected alphanumeric hex seed color without # in front
const updateSeedColor = () => seedColor.value.substring(1)

//update seedColor when its selected/changed
seedColor.addEventListener("change",updateSeedColor) 

//updates the modeValue to the new value chosen    
mode.addEventListener("change", fetchMode)    

//fetches data from API and renders results when button is clicked
getScheme.addEventListener("click", function(){
    colorHtml = " "
    fetch(`https://www.thecolorapi.com/scheme?hex=${updateSeedColor()}&mode=${modeValue}`, 
         {method:"GET"})
        .then(res => res.json())
        .then(data =>{
            let colorArray=[]
            for(color in data.colors){
                colorHtml += `
                        <div id="color-column">
                            <div id="color${color}" class="colors"> </div>
                            <p id="hex${color}">${data.colors[color].hex.value}</p>
                        </div>
                        `
                colorArray.push(data.colors[color].hex.value)
            }
            renderColors(data.colors, colorArray)
            copyClipboard()
            })   
    })

//renders the colors
function renderColors(colorData, colorArr){
    render()
    for (num in colorData){
         document.getElementById(`color${num}`).style.backgroundColor = colorArr[num]
        }
}

//renders the html div to hold the colors and hex names
function render(){
    document.getElementById("display-colors").innerHTML = colorHtml 
}
//gets the value of the color mode selected from the dropdown options
function fetchMode(){
    modeValue = mode.options[mode.selectedIndex].value 
    return modeValue 
}

//copy Clipboard of hex value in paragraph section of page
function copyClipboard(){
    for(let i=0; i < 5; i++){
        const hex = document.getElementById(`hex${i}`)
        hex.onclick = function() {
        document.execCommand("copy")
        }
        hex.addEventListener("copy", function(event) {
        event.preventDefault();
        if (event.clipboardData) {
            event.clipboardData.setData("text/plain", hex.textContent);
            // console.log(event.clipboardData.getData("text"))
        }
        });
    }
}
