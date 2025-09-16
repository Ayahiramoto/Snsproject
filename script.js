const form = document.getElementById("postForm");
const postsDiv = document.getElementById("posts");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) return;

  const newPost = {
    name,
    message,
    date: new Date().toLocaleString(),
  };

  // 表示に追加
  displayPost(newPost);

  // TODO: サーバーにPOST送信処理（仮）
  console.log("（仮）送信：", newPost);

  form.reset();
});

// 仮の表示
fetch("posts.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach(displayPost);
  });

function displayPost(post) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${post.name}</strong> (${post.date})<br>${post.message}<hr>`;
  postsDiv.prepend(div);
}
async function postMessage() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("status");

  if (!name || !password || !message) {
    status.textContent = "全ての項目を入力してね。";
    return;
  }

  // 🔐 認証チェック
  const authRes = await fetch(`${SUPABASE_URL}/rest/v1/users?name=eq.${name}&password=eq.${password}`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
    }
  });

  const user = await authRes.json();

  if (user.length === 0) {
    status.textContent = "認証に失敗しました。名前かパスワードが間違ってるよ。";
    return;
  }

  // ✅ 投稿処理
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Prefer": "return=representation"
    },
    body: JSON.stringify({ name, message })
  });

  if (res.ok) {
    status.textContent = "投稿しました！";
    document.getElementById("message").value = "";
    loadPosts();
  } else {
    status.textContent = "投稿に失敗しました…";
  }
}
