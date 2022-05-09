import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState, useRef } from 'react';
import { httpRequest } from './httpfacade';
import PostsView from './postView';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';

let USER="";
let products=["Accent", "Accord", "Adora", "Agria", "Almera", "Alouette", "Ambassador", "Ambo", "Amora", "Amorosa", "Angelique", "Anna", "Annabelle", "Anya", "Apache", "Argos", "Ariata", "Arizona", "Arran Banner", "Arran Comet", "Arran Pilot", "Arran Victory", "Arrow", "Arsenal", "Asparges", "Asterix", "Athlete", "Atlantic", "Avalanche", "Avondale", "Axona", "Ballydoon", "Balmoral", "Bambino", "Banba", "Barna", "Belle De Fontenay", "Blue Belle", "Blue Danube", "Bonnata", "Bonnie", "Bounty", "Bremner", "Bricata", "British Queen", "Brooke", "Burren", "Bute", "Cabaret", "Caesar", "Camel", "Camelot", "Cammeo", "Captain", "Cara", "Carlingford", "Carnaval", "Carolus", "Casablanca", "Catriona", "Celine", "Challenger", "Charlemont", "Charlotte", "Charlton", "Chaski", "Chicago", "Chincha", "Chopin", "Churchill", "Claret", "Clevna", "Colleen", "Compass", "Constance", "Corolle", "Cosmos", "Courage", "Courlan", "Crisps4all", "Cultra", "Daisy", "Desiree", "Divaa", "Dolly", "Druid", "Duke Of York", "Dunbar Rover", "Dunbar Standard", "Dundrod", "Dunluce", "Edony", "Edzell Blue", "Electra", "Elisabeth", "Elland", "Ellie", "Emblem", "Emily", "Emma", "Epicure", "Erntestolz", "Estima", "Eurostar", "Excalibur", "Fambo", "Fandango", "Fianna", "Fontane", "Foremost", "Gabriel", "Gael", "Galactica", "Gatsby", "Gemson", "Georgina", "Gervioline", "Golden Beauty", "Golden Nugget", "Golden Sun", "Golden Wonder", "Gourmandine", "Gwenne", "Habibi", "Harlequin", "Harmony", "Heraclea", "Hermes", "Highland Burgundy Red", "Home Guard", "Horizon", "Imagine", "Inca Bella", "Inca Dawn", Infinity, "Innovator", "International Kidney", "Isle Of Jura", "Ivory Russet", "Jaerla", "Jazzy", "Jelly", "Jester", "Joshua", "Jubilee", "Juliette", "Karlena", "Kelly", "Kennebec", "Kerr's Pink", "Kestrel", "Kifli", "Kikko", "King Edward", "Kingsman", "Kondor", "La Strada", "Lady Amarilla", "Lady Anna", "Lady Balfour", "Lady Christl", "Lady Claire", "Lady Jo", "Lady Olympia", "Lady Rosetta", "Lady Valora", "Lanorma", "Leonata", "Libertie", "Linton", "Lionheart", "Lorimer", "Lulu", "Madingley", "Majestic", "Malin", "Malou", "Manhattan", "Manitou", "Marfona", "Maris Bard", "Maris Peer", "Maris Piper", "Maritiema", "Markies", "Marvel", "Maxine", "Mayan Gold", "Mayan Queen", "Mayan Rose", "Mayan Star", "Mayan Twilight", "Melody", "Merlin", "Milton", "Mimi", "Mistay", "Morene", "Moulin Rouge", "Mozart", "Mustang", "Nadine", "Navan", "Nectar", "Newton", "Nicola", "Nieta", "Nitza", "Olympus", "Orchestra", "Orla", "Orwell", "Osprey", "Panther", "Paramount", "Paru", "Pentland Crown", "Pentland Dell", "Pentland Ivory", "Pentland Javelin", "Pentland Squire", "Performer", "Picasso", "Piccolo Star", "Pink Fir Apple", "Pink Gypsy", "Pioneer", "Pippa", "Pixie", "Pizazz", "Premiere", "Primura", "Purple Majesty", "Radebe", "Raleigh", "Ramos", "Ranger Russet", "Record", "Red Cara", "Red Duke Of York", "Red Emmalie", "Red Pontiac", "Red Robin", "Reiver", "Remarka", "Rembrandt", "Revie", "Richhill", "Robinta", "Rock", "Rocket", "Romano", "Rooster", "Roscor", "Roseval", "Royal", "Royal Kidney", "Rubesse", "Rudolph", "Russet Burbank", "Safari", "Safiyah", "Sagitta", "Sandpiper", "Sante", "Saphire", "Sarpo Gwyn", "Sarpo Mira", "Sarpo Shona", "Sarpo Una", "Sassy", "Saturna", "Savanna", "Saxon", "Scapa", "Sebastian", "Setanta", "Shannon", "Sharpe's Express", "Shelford", "Shepody", "Sierra", "Sifra", "Slaney", "Smile", "Smith's Comet", "Sofia", "SORRENTO", "Sparkle", "Spunta", "Stemster", "Strachan", "Stroma", "Sunita", "Sunray", "Sunrise", "Sunset", "Swift", "Sylvana", "Tabitha", "Taurus", "Toluca", "Tresdale", "Triplo", "Trixie", "TX 15231", "Tyson", "Ulster Chieftain", "Ulster Prince", "Ulster Sceptre", "Upmarket", "Up-to-date", "Vales Emerald", "Vales Everest", "Vales Sovereign", "Valor", "Vanessa", "Venezia", "Verity", "Victoria", "Violetta", "Virgo", "Vivaldi", "Vizelle", "Volare", "VR808", "White Lady", "Wilja", "Winston", "Wizard", "Yukon Gold", "Zahov", "Zohar"]
let clients = ["Larita Albright", "Destiny Aldridge", "Mana Baron", "Milagros Barrera", "Carmina Battle", "Tien Berman", "Maricruz Berrios", "Nadia Bingham", "Laquanda Braden", "Kirstin Browne", "Georgiann Bundy", "Valeri Burchfield", "Seymour Calkins", "Deanne Caro", "Jamel Caruso", "Samuel Cheney", "Edwina Coates", "Mayra Comstock", "Vanesa Connolly", "Eulalia Culver", "Kip Darling", "Francesca Doughty", "Fredda Dupont", "Yael Eng", "Buffy Escamilla", "Alethea Evers", "Henry Fishman", "Criselda Florence", "Albertina Francois", "Susana Funderburk", "Leigh Gagne", "Ronna Geer", "Mariko Giles", "Inger Gilley", "Jeraldine Gilman", "Richie Girard", "Janell Gregg", "Valarie Grice", "Adrian Grove", "Jami Grubb", "Viviana Guevara", "Daine Gustafson", "Agnus Ham", "Chere Hand", "Myrl Harman", "Viki Haywood", "Avery Hoff", "Chantelle Hollins", "Delphine Humes", "Quincy Hutchison", "Maura Jeffrey", "Charlott Jude", "Charity Keeler", "Jeremy Kong", "Landon Kyle", "Myong Lai", "Jefferson Langdon", "Lauryn Lara", "Tammera Lassiter", "Arla Lauer", "Yuri Lenz", "Lenora Lincoln", "Elisha Lister", "Blaine Lujan", "Micki Mattison", "Loraine Mcdermott", "Sallie Mclendon", "Micheal Merriman", "Li Milton", "Tyler Miranda", "Georgiana Moya", "Aurora Noland", "Sandi Parrott", "Stasia Parson", "Lissa Pease", "Tegan Penn", "Stefanie Penny", "Jeane Peoples", "Maisha Peterman", "Lynetta Piper", "Slyvia Porterfield", "Carolann Pritchard", "Rashida Proctor", "Bernetta Rawls", "Bradly Rowland", "Lewis Schiller", "Annalee Seidel", "Bret Sides", "Nakisha Southerland", "Rasheeda Spivey", "Kiera Staton", "Kazuko Steward", "Melvina Tidwell", "Keena Vanover", "Babette Villasenor", "Chan Vue", "Willow Whitman", "Chase Woody", "Queen Yount", "Heidy Zhang"]
function Login() {

  const ChangeStoreLogin = useRef({ username: '', password: ''});
  const changeInputField = useRef({})
  const [invalidRegistration, setinvalidRegistration] = useState(false);
  const [invalidLoggin, setinvalidLoggin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('tokenCapp'));
  const [postsStore, setPostsStore] = useState();



  function postOrGetPosts(requestType) {
    
    let data = changeInputField.current;
    if(data["Quantity"]==""){
     delete data["Quantity"]
    }
    data=JSON.stringify(data)
    console.log(data,"data");
    
    httpRequest(data, 'http://localhost:8080/posts/', requestType).then((getPostsResult) => {
      console.log(getPostsResult);
      if (getPostsResult.erroLog) {
        alert(getPostsResult.erroLog);
      } else {
        console.log(getPostsResult, 'settint post store');
        if (requestType === 'POST') {
          console.log(USER,"USER")
          getPostsResult['user']=USER
          let newpush = [];
          newpush.push(getPostsResult);
          newpush = [...newpush, ...postsStore];
          setPostsStore(newpush);
        } else {
          console.log(getPostsResult.reverse(),"getPostsResult");
          setPostsStore(getPostsResult);
        }
      }
    });
  }

  useEffect(() => {
    if (window.localStorage.getItem('tokenCapp')) {
      console.log('in');
      postOrGetPosts('GET');
    }
  }, []);
  const tokenSetup = (getToken) => {
    if (!getToken.erroLog) {
      setinvalidLoggin(false);
      setToken(getToken.token);
      window.localStorage.setItem('tokenCapp', getToken.token);
    } else {
      setinvalidLoggin(true);
      setinvalidRegistration(false);
    }
  };
  async function loginApi() {
    let getToken = null;
    USER=ChangeStoreLogin.current.username;
    console.log(USER,"USER")
    getToken = await httpRequest(JSON.stringify(ChangeStoreLogin.current), 'http://localhost:8080/api-token-auth/', 'POST');
    tokenSetup(getToken);
    if (!getToken.erroLog) {
      USER=ChangeStoreLogin.current.username
      postOrGetPosts('GET');
    }
  }
  async function registerApi() {
    USER=ChangeStoreLogin.current.username;
    console.log(USER,"USER")
    const responseCreateUser = await httpRequest(JSON.stringify(ChangeStoreLogin.current), 'http://localhost:8080/create-user/', 'POST');
    if (responseCreateUser.erroLog) {
      setinvalidLoggin(false);
      setinvalidRegistration(true);
    } else {
      setinvalidRegistration(false);
      loginApi();
    }
  }

  const handleChangeTextLogin = (val, type2) => {
    ChangeStoreLogin.current={ ...ChangeStoreLogin.current, [type2]: val };
  };
  const handleChangeTextInput = (val, type2) => {
    changeInputField.current={ ...changeInputField.current, [type2]: val };
  };

  console.log(postsStore);
  return (
    <React.Fragment>
      <div style={{ height: '100%', backgroundColor: '#282828', width: '100%' }}>
        {token && <Button onClick={() => { setToken(''); localStorage.removeItem('tokenCapp'); setPostsStore([]); }} style={{ float: 'right', margin: '20px' }} variant="contained">logout</Button>}
      </div>

      <div style={{
        backgroundColor: '#282828', minHeight: '100vh', height: '100%', width: '100vw', flexDirection: 'row', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Card
          style={{
            maxWidth: '545px',
            width: '450px',margin: '70px', height: '500', width: '600', display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}
        >
          <div>
            {!token
            && (
            <>
              <CardContent style={{margin: '20px'}}>
                <h2>Login or Register</h2>
                <form noValidate autoComplete="off">
                  <TextField onChange={(event) => handleChangeTextLogin(event.target.value, 'username')} label="Username" />
                  <br />
                  <br />
                  <br />
                  <TextField id="standard-password-input" type="password" autoComplete="current-password" onChange={(event) => handleChangeTextLogin(event.target.value, 'password')} label="Password" />
                </form>
              </CardContent>
              <CardActions>
                <div style={{ width: '100%' }}>
                  <div style={{
                    marginBottom: '30px', width: '100%', display: 'flex', justifyContent: 'space-around',
                  }}
                  >
                    <Button onClick={() => { loginApi(); }} variant="outlined">Sign in</Button>
                    <Button onClick={() => { registerApi(); }} variant="outlined">Register</Button>
                  </div>
                  {invalidRegistration && <p>Registration failed</p>}
                  {invalidLoggin && <p>Invalid Login</p>}
                </div>
              </CardActions>
            </>
            )}
            {token
            && (
            <>
              <CardContent style={{margin: '70px'}}>
                <h2>Add record</h2>
                <form noValidate autoComplete="off">
                <br/>
                <InputLabel>Client</InputLabel>
                  <Select
                    label="Client"
                    style={{minWidth:350}}
                    onChange={(event) => handleChangeTextInput(event.target.value, "Client")}
                  >
                    {clients.map(client=>(<MenuItem value={client}>{client}</MenuItem>))}
                  </Select>
                <br/>
                <br/>
                <InputLabel>Product</InputLabel>
                  <Select
                    label="Product"
                    style={{minWidth:350}}
                    onChange={(event) => handleChangeTextInput(event.target.value, "Product")}
                  >
                    {products.map(product=>(<MenuItem value={product}>{product}</MenuItem>))}
                  </Select>
                <br/>
                <br/>
                <InputLabel>Quantity</InputLabel>
                <Input type="number" style={{ width: '100%' }} onChange={(event) => handleChangeTextInput(event.target.value, "Quantity")} label="Quantity"
                ></Input>
                <br/>
                <br/>
                <InputLabel>Price</InputLabel>
                <Input type="number" style={{ width: '100%' }} onChange={(event) => handleChangeTextInput(event.target.value, "Price")} label="Price"
                ></Input>
                </form>
              </CardContent>
              <CardActions>
                <Button style={{ marginBottom: '30px', marginLeft: '65%' }} onClick={() => { postOrGetPosts('POST'); }} variant="outlined">Add</Button>
              </CardActions>
            </>
            )}
          </div>
        </Card>
        {(token && postsStore) && <PostsView posts={postsStore} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#282828' }} />
    </React.Fragment>
  );
}

export default Login;
