const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const gemini  =document.getElementById("#header");

let userMessage = null; // Variable to store user's message
const API_KEY = "AIzaSyAQYMNgusd0dulb6qFmn-aSStXq8wGqesc"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><i class="fa-solid fa-user"></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAQYMNgusd0dulb6qFmn-aSStXq8wGqesc";

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gemini-1.5-flash-latest",
            messages: [{role: "user", content: userMessage}],
        })
    }

}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    console.log(userMessage);
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    

        
    const data = {
      
      contents: [
        {
          parts: [
            {
              text: userMessage + "in one paragraph",
            },
          ],
        },
      ],
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    } )
      .then((response) => response.json())
      .then((result) => {
        const data = result;
        const newdata= data.candidates[0].content.parts[0].text;
        var data_array = newdata.split('.');
        const incomingChatLi = createChatLi(data_array[0]);
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
        console.log(data_array[0]);
        // const response = textContent.data_array[0]
        // generateResponse(response)
        // const messageElement = chatElement.querySelector("p");
        // const incomingChatLi = createChatLi(data_array[0])
        // messageElement.textContent = data_array[0]
        document.getElementById("gemini").textContent=JSON.stringify(data_array[0]);
      })
      .catch((error) => {
        // ("Oops! Something went wrong. Please try again.");
        // messageElement.textContent = ;
        // console.error('Error:', error);
      });

}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});


sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

const apiKey = 'AIzaSyAQYMNgusd0dulb6qFmn-aSStXq8wGqesc';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;



const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});