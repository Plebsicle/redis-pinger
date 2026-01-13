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

async function ping(db){
  if(!db.url || !db.token){
    console.error(`Missing env for ${db.name}`);
    process.exit(1);
  }

  const res = await fetch(db.url,{
    method: "POST",
    headers: {
      "Authorization": `Bearer ${db.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(["PING"])
  });

  const text = await res.text();
  console.log(`${db.name}:`, text);
}

for(const db of databases){
  await ping(db);
}
