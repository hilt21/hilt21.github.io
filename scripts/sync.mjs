import {readFile,writeFile,rename} from 'node:fs/promises';
import {discover} from './lib.mjs';
import {nextDiscoverySnapshot} from './snapshot.mjs';
const config=JSON.parse(await readFile('data/sites.json','utf8'));
async function request(path){for(let attempt=0;attempt<3;attempt++){const response=await fetch(`https://api.github.com${path}`,{headers:{Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(process.env.GH_TOKEN?{Authorization:`Bearer ${process.env.GH_TOKEN}`}:{})},signal:AbortSignal.timeout(20000)});if(response.ok)return response.json();if(response.status>=500&&attempt<2){await new Promise(r=>setTimeout(r,1000*(attempt+1)));continue;}throw Error(`GitHub ${response.status}; remaining=${response.headers.get('x-ratelimit-remaining')}; reset=${response.headers.get('x-ratelimit-reset')}; retry-after=${response.headers.get('retry-after')}`);}}
try{
  const repositories=await discover(config.owner,request);
  const candidates=repositories.filter(r=>!config.projects.some(p=>p.repo===r.name)).map(r=>({repo:r.name,url:r.pagesUrl,visible:false}));
  let previous=null;
  try{previous=JSON.parse(await readFile('data/discovered.json','utf8'));}catch{}
  const {changed,snapshot}=nextDiscoverySnapshot(previous,repositories,candidates,new Date().toISOString());
  if(changed){
    await writeFile('data/discovered.json.tmp',JSON.stringify(snapshot,null,2)+'\n');
    await rename('data/discovered.json.tmp','data/discovered.json');
  }
  console.log(`Discovered ${repositories.length} Pages sites; ${candidates.length} pending curation; snapshot ${changed?'updated':'unchanged'}.`);
}catch(e){console.error(`Sync failed. Previous snapshot retained. ${e.message}`);process.exitCode=1;}
