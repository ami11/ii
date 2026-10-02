const MISSION_URL =
  "https://point.pay.naver.com/pc/mission-detail?dataType=placement&rank=1&pageKey=benefit_group_pp&rankType=RANDOM_DAILY&sortCompletedAdToLast=true&mssCode=pp";
const ALARM = "daily-point";

async function schedule() {
  const { time = "09:00" } = await chrome.storage.local.get("time");
  const [h, m] = time.split(":").map(Number);
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next <= new Date()) next.setDate(next.getDate() + 1);
  await chrome.alarms.create(ALARM, { when: next.getTime(), periodInMinutes: 1440 });
}

chrome.runtime.onInstalled.addListener(schedule);
chrome.runtime.onStartup.addListener(schedule);
chrome.storage.onChanged.addListener((c) => c.time && schedule());

chrome.alarms.onAlarm.addListener((a) => {
  if (a.name !== ALARM) return;
  chrome.notifications.create("point", {
    type: "basic",
    iconUrl: "icon.png",
    title: "네이버페이 포인트",
    message: "오늘의 포인트 미션을 확인하세요. 클릭하면 열립니다.",
  });
});

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({ url: MISSION_URL });
});
