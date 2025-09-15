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
