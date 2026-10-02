const MISSION_URL =
  "https://point.pay.naver.com/pc/mission-detail?dataType=placement&rank=1&pageKey=benefit_group_pp&rankType=RANDOM_DAILY&sortCompletedAdToLast=true&mssCode=pp";
const t = document.getElementById("time");
chrome.storage.local.get("time").then((v) => v.time && (t.value = v.time));
t.addEventListener("change", () => chrome.storage.local.set({ time: t.value }));
document.getElementById("open").addEventListener("click", () => chrome.tabs.create({ url: MISSION_URL }));
