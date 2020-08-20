const base_url = "https://api.football-data.org/v2";
const api_key = "3db7d541f4954110bd2011e1f007a587";


const fetchAPI = (url) => {
	return fetch(url, {
		headers: {
			'X-Auth-Token': api_key,
		},
	})
		.then((res) => {
			if (res.status !== 200) {
				console.log('Error: ' + res.status);
				return Promise.reject(new Error(res.statusText));
			} else {
				return Promise.resolve(res);
			}
		})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};

function getTeams() {
  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2019/teams`,
    {
      headers: {
        "X-Auth-Token": "3db7d541f4954110bd2011e1f007a587",
      },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let teamsHTML = "";
          console.log(data)
          // teams ini merupakan object yang berisikan array team dari data, dimana data disini merupakan response dari proses fetching.
          data.teams.forEach(function(team) {
            // FIXME: parameter aku ubah menjadi team agar berbeda dengan object dari data ( teams ).
            // jangan lupa untuk pemanggilannya melewati team.arrayName contohnya team.name
            teamsHTML += `

            <div class="col s12 m7">
            <div class="card horizontal card-panel hoverable">
              <div class="card-image">
               <a href="./detailteam.html?id=${team.id}">
                <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo" width="100px;">
                </a>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                <h4>${team.name} </h4>
                  <p>
                    <ul>
                      <li>Negara : ${team.area.name}</li>
                      <li>Stadion : ${team.venue}</li>
                      <li>Website : ${team.website}</li>
                    </ul>
                  </p>
                </div>
                <div class="card-action">
                  <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                </div>
              </div>
            </div>
          </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = teamsHTML;
        });
      }
    });
  }

fetchAPI(`${base_url}/competitions/2019/teams`)
    .then(function(data) {
      console.log(data)
      let teamsHTML = ""
        data.teams.forEach(function(team) {
        teamsHTML += `

              <div class="col s12 m7">
              <div class="card horizontal card-panel hoverable">
                <div class="card-image">
                 <a href="./detailteam.html?id=${team.id}">
                  <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}">
                 </a>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                  <h4>${team.name} </h4>
                    <p>
                      <ul>
                        <li>Negara : ${team.area.name}</li>
                        <li>Stadion : ${team.venue}</li>
                        <li>Website : ${team.website}</li>
                      </ul>
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                  </div>
                </div>
              </div>
            </div>
            `;
      });

     document.getElementById("body-content").innerHTML = teamsHTML;
    })
}


function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${base_url}/teams/${idParam}`).then((response) => {
        if (response) {
          response.json().then((team) => {
         
            let teamsHTML = `
            <div class="col s12 m7">
            <div class="card">
            <div class="card horizontal">
              <div class="card-image ">
                <img src=${team.crestUrl.replace( /^http:\/\//i, 'https://' )} alt="logo"/>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <p>
                  <ul class="sejarahteam">
                  <li><i class="material-icons">assignment_ind</i> ${
                    team.name
                  }</li>
                  <li><i class="material-icons">location_city</i> ${
                    team.address
                  }</li>
                  <li><i class="material-icons">local_post_office</i> ${
                    team.email
                  }</li>
                  <li><i class="material-icons">local_phone</i>${
                    team.phone
                  }</li>
                  <li><i class="material-icons">store_mall_directory</i>${
                    team.venue
                  }</li>
                  </ul>
                  </p>
                </div>
                </div>
              </div>
              <h3 class="header">Deskripsi pemain</h3>
              <ul class="collapsible">
              <li>
              ${team.squad.map(
                (pemain) =>
                `
                <div class="collapsible-header"><i class="material-icons">accessibility</i>
                ${pemain.name} <i class="material-icons">arrow_forward</i> ${pemain.position} 
                </div>
              `)}
              </li>
            </ul>
            </div>
          </div>
                    `;
            document.getElementById("body-content").innerHTML = teamsHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(team);
          });
        }
      });
    }

    fetchAPI(`${base_url}/teams/${idParam}`)
    .then((team) => {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = `
      <div class="col s12 m7">
      <div class="card ">
      <div class="card horizontal">
        <div class="card-image ">
          <img src=${team.crestUrl.replace( /^http:\/\//i, 'https://' )} alt="logo"/>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>
            <ul class="sejarahteam">
            <li><i class="material-icons">assignment_ind</i> ${
              team.name
            }</li>
            <li><i class="material-icons">location_city</i> ${
              team.address
            }</li>
            <li><i class="material-icons">local_post_office</i> ${
              team.email
            }</li>
            <li><i class="material-icons">local_phone</i>${
              team.phone
            }</li>
            <li><i class="material-icons">store_mall_directory</i>${
              team.venue
            }</li>
            </ul>
            </p>
          </div>
         </div>
        </div>
        <h3 class="header">Deskripsi pemain</h3>
        <ul class="collapsible">
        <li>
        ${team.squad.map(
          (pemain) =>
          `
          <div class="collapsible-header"><i class="material-icons">accessibility</i>
          ${pemain.name} <i class="material-icons">arrow_forward</i> ${pemain.position} 
          </div>
        `)}
        </li>
      </ul>
      </div>
    </div>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamsHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(team);
    });
  });
}


function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(function(team) {
    
                  teamsHTML += `
                  <div class="col s12 m7">
                  <div class="card horizontal card-panel hoverable">
                    <div class="card-image">
                    <a href="./detailteam.html?id=${team.id}">
                      <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo">
                      </a>
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                      <h4>${team.name} </h4>
                        <p>
                          <ul>
                            <li>Negara : ${team.area.name}</li>
                            <li>Stadion : ${team.venue}</li>
                            <li>Website : ${team.website}</li>
                          </ul>
                        </p>
                      </div>
                      <div class="card-action">
                        <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                      </div>
                    </div>
                  </div>
                </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getSavedTeamsById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  
  getById(idParam).then(function(teams) {
    teamHTML = '';
    const teamHTML = `
    <div class="col s12 m7">
    <div class="card horizontal card-panel hoverable">
      <div class="card-image">
      <a href="./detailteam.html?id=${teams.id}">
        <img src="${teams.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo">
        </a>
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <h4>${teams.name} </h4>
          <p>
            <ul>
              <li>Negara : ${teams.area.name}</li>
              <li>Stadion : ${teams.venue}</li>
              <li>Website : ${teams.website}</li>
            </ul>
          </p>
        </div>
        <div class="card-action">
          <a href="./detailteam.html?id=${teams.id}">More Informasi </a>
        </div>
      </div>
    </div>
  </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

//teams spanyol
function getTeamsSpan() {
  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2014/teams`,
    {
      headers: {
        "X-Auth-Token": "3db7d541f4954110bd2011e1f007a587",
      },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let teamsHTML = "";
          console.log(data)
          data.teams.forEach(function(team) {
            teamsHTML += `
            <div class="row">
            <div class="col s12">
            <div class="card horizontal card-panel hoverable">
              <div class="card-image">
               <a href="./detailteam.html?id=${team.id}">
                <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo">
                </a>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                <h4>${team.name} </h4>
                  <p>
                    <ul>
                      <li>Negara : ${team.area.name}</li>
                      <li>Stadion : ${team.venue}</li>
                      <li>Website : ${team.website}</li>
                    </ul>
                  </p>
                </div>
                <div class="card-action">
                  <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                </div>
              </div>
            </div>
          </div>
          </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-spanyol").innerHTML = teamsHTML;
        });
      }
    });
  }

fetchAPI(`${base_url}/competitions/2014/teams`)
    .then(function(data) {
      console.log(data)
      let teamsHTML = ""
        data.teams.forEach(function(teams) {
        teamsHTML += `
        <div class="row">
              <div class="col s12">
              <div class="card horizontal card-panel hoverable">
                <div class="card-image">
                 <a href="./detailteam.html?id=${teams.id}">
                  <img src="${teams.crestUrl.replace( /^http:\/\//i, 'https://' )}">
                 </a>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                  <h4>${teams.name} </h4>
                    <p>
                      <ul>
                        <li>Negara : ${teams.area.name}</li>
                        <li>Stadion : ${teams.venue}</li>
                        <li>Website : ${teams.website}</li>
                      </ul>
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="./detailteam.html?id=${teams.id}">More Informasi </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
            `;
      });

     document.getElementById("body-spanyol").innerHTML = teamsHTML;
    })
}


//teams germany
function getTeamsjerm() {
  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2002/teams`,
    {
      headers: {
        "X-Auth-Token": "3db7d541f4954110bd2011e1f007a587",
      },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
            <div class="row">
            <div class="col s12">
            <div class="card horizontal card-panel hoverable">
              <div class="card-image">
               <a href="./detailteam.html?id=${team.id}">
                <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo">
                </a>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                <h4>${team.name} </h4>
                  <p>
                    <ul>
                      <li>Negara : ${team.area.name}</li>
                      <li>Stadion : ${team.venue}</li>
                      <li>Website : ${team.website}</li>
                    </ul>
                  </p>
                </div>
                <div class="card-action">
                  <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                </div>
              </div>
            </div>
          </div>
          </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-jerman").innerHTML = teamsHTML;
        });
      }
    });
  }

fetchAPI(`${base_url}/competitions/2002/teams`)
    .then(function(data) {
      console.log(data)
      let teamsHTML = ""
        data.teams.forEach(function(team) {
        teamsHTML += `
            <div class="row">
              <div class="col s12 ">
              <div class="card horizontal card-panel hoverable">
                <div class="card-image">
                 <a href="./detailteam.html?id=${team.id}">
                  <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}">
                 </a>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                  <h4>${team.name} </h4>
                    <p>
                      <ul>
                        <li>Negara : ${team.area.name}</li>
                        <li>Stadion : ${team.venue}</li>
                        <li>Website : ${team.website}</li>
                      </ul>
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
            `;
      });

     document.getElementById("body-jerman").innerHTML = teamsHTML;
    })
}

//teams inggris
function getTeamsinggris() {
  if ("caches" in window) {
    caches.match(`${base_url}/competitions/2021/teams`,
    {
      headers: {
        "X-Auth-Token": "3db7d541f4954110bd2011e1f007a587",
      },
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
            <div class="row">
            <div class="col s12">
            <div class="card horizontal card-panel hoverable">
              <div class="card-image">
               <a href="./detailteam.html?id=${team.id}">
                <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}" alt="logo">
                </a>
              </div>
              <div class="card-stacked">
                <div class="card-content">
                <h4>${team.name} </h4>
                  <p>
                    <ul>
                      <li>Negara : ${team.area.name}</li>
                      <li>Stadion : ${team.venue}</li>
                      <li>Website : ${team.website}</li>
                    </ul>
                  </p>
                </div>
                <div class="card-action">
                  <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                </div>
              </div>
            </div>
          </div>
          </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-inggris").innerHTML = teamsHTML;
        });
      }
    });
  }

fetchAPI(`${base_url}/competitions/2021/teams`)
    .then(function(data) {
      console.log(data)
      let teamsHTML = ""
        data.teams.forEach(function(team) {
        teamsHTML += `
            <div class="row">
              <div class="col s12 ">
              <div class="card horizontal card-panel hoverable">
                <div class="card-image">
                 <a href="./detailteam.html?id=${team.id}">
                  <img src="${team.crestUrl.replace( /^http:\/\//i, 'https://' )}">
                 </a>
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                  <h4>${team.name} </h4>
                    <p>
                      <ul>
                        <li>Negara : ${team.area.name}</li>
                        <li>Stadion : ${team.venue}</li>
                        <li>Website : ${team.website}</li>
                      </ul>
                    </p>
                  </div>
                  <div class="card-action">
                    <a href="./detailteam.html?id=${team.id}">More Informasi </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
            `;
      });

     document.getElementById("body-inggris").innerHTML = teamsHTML;
    })
}
