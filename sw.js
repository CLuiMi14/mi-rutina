const C="mi-rutina-v3";
const F=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "maskable-512.png", "Alternating_Renegade_Row.jpg", "Arnold_Dumbbell_Press.jpg", "Barbell_Hip_Thrust.jpg", "Barbell_Side_Split_Squat.jpg", "Bent-Arm_Dumbbell_Pullover.jpg", "Bodyweight_Walking_Lunge.jpg", "Cable_Crunch.jpg", "Dead_Bug.jpg", "Dip_Machine.jpg", "Dumbbell_Alternate_Bicep_Curl.jpg", "Dumbbell_Bench_Press.jpg", "Dumbbell_Flyes.jpg", "Dumbbell_One-Arm_Shoulder_Press.jpg", "Dumbbell_Rear_Lunge.jpg", "Dumbbell_Shoulder_Press.jpg", "Dumbbell_Shrug.jpg", "Dumbbell_Step_Ups.jpg", "External_Rotation_with_Cable.jpg", "Face_Pull.jpg", "Farmers_Walk.jpg", "Goblet_Squat.jpg", "Hammer_Curls.jpg", "Incline_Dumbbell_Press.jpg", "Kettlebell_One-Legged_Deadlift.jpg", "Leg_Extensions.jpg", "Leg_Press.jpg", "Lying_Leg_Curls.jpg", "Machine_Bench_Press.jpg", "One-Arm_Dumbbell_Row.jpg", "Pallof_Press.jpg", "Plank.jpg", "Preacher_Curl.jpg", "Pushups.jpg", "Reverse_Crunch.jpg", "Reverse_Machine_Flyes.jpg", "Romanian_Deadlift.jpg", "Seated_Cable_Rows.jpg", "Seated_Calf_Raise.jpg", "Seated_Dumbbell_Palms-Up_Wrist_Curl.jpg", "Seated_Leg_Curl.jpg", "Side_Bridge.jpg", "Side_Lateral_Raise.jpg", "Split_Squat_with_Dumbbells.jpg", "Standing_Cable_Wood_Chop.jpg", "Standing_Calf_Raises.jpg", "Standing_Dumbbell_Triceps_Extension.jpg", "Thigh_Abductor.jpg", "Thigh_Adductor.jpg", "Triceps_Pushdown_-_Rope_Attachment.jpg", "V-Bar_Pulldown.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 const isPage=r.mode==="navigate"||r.url.endsWith("/index.html");
 if(isPage){e.respondWith(fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put("index.html",cp));return n}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(n=>{if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp))}return n})))});
let tok=0;
self.addEventListener("message",e=>{const m=e.data||{};
 if(m.type==="cancel"){tok++;return}
 if(m.type==="timer"){const my=++tok,wait=Math.max(0,m.at-Date.now());
  e.waitUntil(new Promise(res=>setTimeout(async()=>{
   if(my===tok){const cs=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    if(!cs.some(c=>c.visibilityState==="visible")){try{await self.registration.showNotification(m.title,{body:m.body,tag:"descanso",renotify:true,vibrate:[300,150,300],icon:"icon-192.png",badge:"icon-192.png"})}catch(x){}}}
   res()},wait)))}});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if("focus" in c)return c.focus()}return self.clients.openWindow("./#rut")}))});
