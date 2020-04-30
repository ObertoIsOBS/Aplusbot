window.onload = async() => {
    async function checkUser() {
  
     let storage = window.localStorage;
              
  let id = await storage.getItem("id");
     let cUser = await storage.getItem("user");
              let uId;
              if (id && cUser) {
          uId = id;		
          console.log(uId);
          console.log(cUser);
  document.getElementById('forkme_banner').innerText = `${cUser}`;
              }else{
              
      const fragment = new URLSearchParams(window.location.hash.slice(1));
  
                  
                  let accessToken = fragment.get("access_token");
          
                  let tokenType = fragment.get("token_type");
      
      if (!fragment.has("access_token")) {
      document.getElementById('tophi').innerText = `Login Please`;
          return;
      }else{
          window.localStorage.setItem('token', accessToken);
       document.getElementById('forkme_banner').innerText = `Loading....`;
  
       
          let res = await fetch('https://discordapp.com/api/users/@me', {
              headers: {
                  authorization: `${tokenType} ${accessToken}`
              }
          })
        let response = await res.json()
                  console.log(response);
                  const { username, discriminator, id } = response;
  uId = id;
  document.getElementById('forkme_banner').innerText = `${username}#${discriminator}`;
  storage.setItem('id', uId);
          storage.setItem('user', `${username}#${discriminator}`);
      }
  }
  return uId;
    }
          
          let id = await checkUser();	
          document.getElementById('tophi').innerText = 'Select A Server';
          async function listGuilds() {
       var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://discordapp.com/api/users/@me/guilds');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.token);
            xhr.onload = async function(){
                console.log('Loaded!');

                var response = JSON.parse(xhr.response);
                  console.log(response);
                          var ul = document.getElementById('guilds');	
              response.forEach(async(guild) => {
                      if((guild.permissions & 0x8) === 0x8){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(guild.name));
    li.setAttribute("text", guild.name);
    li.setAttribute("value", guild.id);
    ul.appendChild(li);
                      }
                  });
  
              document.getElementById('guilds').disabled = false;
              document.getElementById('selectButton').disabled = false;
                }
          }
          await listGuilds();
      
      
                  async function guildFetch(){
                  document.getElementById('guilds').disabled = true;
                  document.getElementById('fetchButton').disabled = true;
                  window.localStorage.setItem('guild', document.getElementById('guilds').value);
                  
            
                      document.getElementById("guildsArea").remove();
              let settingsNode = document.getElementById('settingsArea');
              var topSettings = document.createElement('h1');
              topSettings.text = 'Guild Settings';
              topSettings.id ='topSettings';
              var sectionGeneral = document.createElement('h2');
              sectionGeneral.text = 'General';
              sectionGeneral.id = 'sectionGeneral';
              node.add(topSettings);
              node.add(sectionGeneral);
              
              }

            }