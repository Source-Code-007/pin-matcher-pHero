// utility function 
function getRandomNum(min, max){
    return Math.round((Math.random() * (max - min)) + min)
}
function setInpV(id, newV){
    let inpElem = document.getElementById(id)
    inpElem.value = newV
}

// event listener
let tryAlert = 0
// generate random number
document.getElementById('generate-pin-btn').addEventListener('click', ()=>{
    let randomNum = getRandomNum(1000, 9999)
    setInpV('generate-pin-inp', randomNum)
    document.getElementById('not-match-alert').style.display = 'none'
    document.getElementById('match-alert').style.display = 'none'
    document.getElementById('try-alert').innerText = '3 try left'
    document.getElementById('submit-btn').removeAttribute('disabled')
    tryAlert = 0
})
// all normal pin btn
let pinBtn = document.getElementsByClassName('pin-btn')
let pinInp = document.getElementById('apply-pin-inp')
for(btn of pinBtn){
    btn.addEventListener('click', (e)=>{
        if(isNaN(e.target.innerText)){
            if(e.target.innerText === 'C'){
                pinInp.value = ''
            } else if(e.target.innerText === '<'){
                // let removeLastDigit = pinInp.value.slice(0, -1)
                // pinInp.value = removeLastDigit
                pinInp.value = pinInp.value.split('').reverse().slice(1).reverse().join('')
            }
        } else{
            pinInp.value +=  e.target.innerText
        }
    })
}

// submit btn
document.getElementById('submit-btn').addEventListener('click', ()=>{
    let generatePinInp = document.getElementById('generate-pin-inp')
    let applyPinInp = document.getElementById('apply-pin-inp')
    let tryAlertElem = document.getElementById('try-alert')
    if(generatePinInp.value === applyPinInp.value){
        document.getElementById('match-alert').style.display = 'block'
        document.getElementById('not-match-alert').style.display = 'none'
        generatePinInp.value = ''
        applyPinInp.value = ''
        tryAlertElem.innerText = ''
    } else{
        document.getElementById('not-match-alert').style.display = 'block'
        document.getElementById('match-alert').style.display = 'none'
        applyPinInp.value = ''
        tryAlert++
        if(tryAlert == 1){
            tryAlertElem.innerText = '2 try left'
        } else if(tryAlert == 2){
            tryAlertElem.innerText = '1 try left'
        } else{
            tryAlertElem.innerText = 'You are locked for 30 second'
            document.getElementById('submit-btn').setAttribute('disabled', true)
        }
    }
})