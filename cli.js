import fetch from 'node-fetch'

import readline from 'readline/promises'


const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

const ppl = await rl.question("how many people are in your team? ")
const numPpl = Number(ppl)

let team = []

for (let i = 0; i < numPpl; i++) {
    let email = await rl.question(`what is person ${i + 1}'s email? `)
    const req = await fetch(`https://shipper-js.vercel.app/api/check`, {body: email, method: "POST"})
    const res = await req.text()
    let valid_email = (res == "true")
    while (!valid_email) {
        email = await rl.question("invalid email, try again: ")
        const req = await fetch(`https://shipper-js.vercel.app/api/check`, {body: email, method: "POST"})
        const res = await req.text()
        valid_email = (res == "true")
    }
    team.push(email)
}

let link = await rl.question("link your repository: ")
let valid_url = isValidUrl(link)

while (!valid_url) {
    link = await rl.question("invalid url, try again: ")
    valid_url = isValidUrl(link)
}

const title = await rl.question("finally, add a title to your submission: ")

const bo = JSON.stringify({team: team, link: link, title: title})

const submitReq = await fetch(`https://shipper-js.vercel.app/api/ship`,
{
    method: "POST",
    body: bo
})

const submitRes = await submitReq.text()
if (submitRes == "ok") {
    console.log('it submitted')
} else {
    console.log("it didn't work, talk to suhas ig")
}

rl.close()