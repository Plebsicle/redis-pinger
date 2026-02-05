const databases = [
  {
    name: "feat-flag-auth",
    url: process.env.FF_AUTH_URL,
    token: process.env.FF_AUTH_TOKEN
  },
  {
    name: "feat-flag-cache",
    url: process.env.FF_CACHE_URL,
    token: process.env.FF_CACHE_TOKEN
  },
  {
    name: "medication-management-cache",
    url: process.env.MED_CACHE_URL,
    token: process.env.MED_CACHE_TOKEN
  }
];

async function command(db, cmd) {
  return fetch(db.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${db.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cmd)
  });
}

async function keepAlive(db) {
  const key = "__keepalive__";

  await command(db, ["SET", key, Date.now()]);
  await command(db, ["GET", key]);

  console.log(`✅ ${db.name} touched`);
}

async function main(){
  for (const db of databases) {
    await keepAlive(db);
  }
}

main();


