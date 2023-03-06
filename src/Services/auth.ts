import {credentials} from "./credentials"
const client_id = credentials.CLIENT_ID
const client_secret =credentials.CLIENT_SECRET
export async function getSpotifyToken():Promise<string>{

let tokenCCW:string = ""
let data= await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
let json= await data.json()
tokenCCW= json.access_token
return tokenCCW
}

