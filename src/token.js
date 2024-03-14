const client_id = "66ca34498a6142318ea76ae6f763cc0f";
const redirect_uri = "http://localhost:3000";
const scope = "playlist-modify-public playlist-modify-private";

let url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + client_id;
url += "&scope=" + scope;
url += "&redirect_uri=" + redirect_uri;

export { url };
