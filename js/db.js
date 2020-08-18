const dbPromised = idb.open("seputar-bola", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });

});

function saveForLater(team) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("team favorite berhasil di simpan.");
      });
  }
  
function deleteForTeam(team) {
  dbPromised.then(function(db) {
    const tx = db.transaction('teams', 'readwrite');
    const store = tx.objectStore('teams');
    console.log(team + "abang");
    store.delete(team);
    return tx.complete;
  }).then(function() {
    console.log('team telah di hapuss');
  });
}

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  
  // CHECK DATA exist
function isFav(id) {
	return dbPromised.then(async (db) => {
		const tx = await db.transaction("teams", "readonly");
    const data = await tx.objectStore("teams").get(id);
    console.log(data)
		return data === undefined ? false : true;
  });

}