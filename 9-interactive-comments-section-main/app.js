const replyOptions = document.querySelectorAll(".reply");

const fetchData = async () => {
  const result = await fetch("./data.json");
  const data = await result.json();

  return data;
};

const toggleReplyBox = (event) => {
  const replyTo = event.currentTarget.closest(".comment-container");
  const replyBox = document.createElement("div");
  replyBox.classList.add("active-reply", "flex", "white-bg");

  replyBox.innerHTML = `
      <div class="profile-picture">
        <img src="images/avatars/image-juliusomo.png" alt="juliusomo profile picture" title="juliusomo">
      </div>

      <textarea class="reply-input" placeholder="Type your reply..."></textarea>
      <div>
        <button type="submit" class="reply-btn white-clr btn">Reply</button>
      </div>
  `;
  replyTo.insertAdjacentElement("afterend", replyBox);
};

function initApp() {
  replyOptions.forEach((option) =>
    option.addEventListener("click", toggleReplyBox)
  );

  document.addEventListener("DOMContentLoaded", fetchData);
}

initApp();
