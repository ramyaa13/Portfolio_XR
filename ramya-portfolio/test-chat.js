async function run() {
  const req = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hello' }] })
  });
  const data = await req.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
