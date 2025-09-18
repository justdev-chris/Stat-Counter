let stats = {
  yesterday: 0,
  today: 0,
  total: 0,
  lastDate: new Date().toDateString()
};

export default function handler(req, res) {
  const now = new Date().toDateString();

  // Reset "today" and move it to "yesterday" if a new day started
  if (stats.lastDate !== now) {
    stats.yesterday = stats.today;
    stats.today = 0;
    stats.lastDate = now;
  }

  // Increment total and today if it's a "visit"
  if (req.method === 'POST') {
    stats.today += 1;
    stats.total += 1;
  }

  const html = `
  <div style="
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 180px;
    padding: 10px;
    background: #2b2b2b;
    color: #fff;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    z-index: 9999;
  ">
    <h4 style="margin: 0 0 5px 0; font-size: 14px; text-align: center;">Site Stats</h4>
    <p style="margin: 2px 0;">Yesterday: ${stats.yesterday}</p>
    <p style="margin: 2px 0;">Today: ${stats.today}</p>
    <p style="margin: 2px 0;">Total: ${stats.total}</p>
  </div>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
