
// Quiz data (scenarios + options)
const scenarios = [
  {
    question: "Your friend asks why bad things happen to good people. What do you do?",
    options: [
      { text: "Engage in a deep discussion using logic and reasoning", type: "Intellectual" },
      { text: "Invite them to a church event where this topic is discussed", type: "Invitational" },
      { text: "Listen carefully and comfort them over coffee", type: "Interpersonal" },
      { text: "Share how God helped you in your own struggles", type: "Testimonial" },
      { text: "Offer practical help to ease their burden", type: "Service" },
      { text: "Tell them directly what you believe the Bible says", type: "Direct" }
    ]
  },
  {
    question: "A colleague mentions they feel lost and purposeless. What's your response?",
    options: [
      { text: "Discuss philosophical reasons for meaning in life", type: "Intellectual" },
      { text: "Invite them to a small group or church service", type: "Invitational" },
      { text: "Build a friendship and walk alongside them", type: "Interpersonal" },
      { text: "Tell your story of how God gave you purpose", type: "Testimonial" },
      { text: "Help them with an immediate need at work or home", type: "Service" },
      { text: "Clearly explain the gospel message without delay", type: "Direct" }
    ]
  },
  {
    question: "You meet someone new at a social event who asks about your faith. What do you do?",
    options: [
      { text: "Answer their questions with evidence and reasoning", type: "Intellectual" },
      { text: "Invite them to visit your church or youth group", type: "Invitational" },
      { text: "Spend time getting to know them personally first", type: "Interpersonal" },
      { text: "Share how your faith has changed your life", type: "Testimonial" },
      { text: "Offer to help them with something practical in their life", type: "Service" },
      { text: "Boldly share the gospel straight away", type: "Direct" }
    ]
  }
];

const profiles = {
  Intellectual: "You love reasoning, debating, and explaining faith logically. You’re patient and analytical.",
  Invitational: "You enjoy welcoming others and bringing them into events, groups, and gatherings.",
  Interpersonal: "You thrive on relationships, friendships, and listening deeply to people’s needs.",
  Testimonial: "You naturally share your personal story and how God has impacted your life.",
  Service: "You show love through action, meeting needs, and serving others joyfully.",
  Direct: "You are bold, confident, and unafraid to share the gospel clearly and straight to the point."
};

let state = {
  step: 0,
  scores: {}
};

const questionArea = document.getElementById('questionArea');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const resultDiv = document.getElementById('result');

function renderStep(){
  const s = scenarios[state.step];
  questionArea.textContent = s.question;
  optionsDiv.innerHTML = '';
  s.options.forEach(opt=>{
    const btn = document.createElement('button');
    btn.className = 'optionBtn';
    btn.textContent = opt.text;
    btn.onclick = ()=>{
      // record score
      state.scores[opt.type] = (state.scores[opt.type] || 0) + 1;
      // advance
      state.step++;
      if(state.step >= scenarios.length){
        showResult();
      } else {
        renderStep();
      }
    };
    optionsDiv.appendChild(btn);
  });
  nextBtn.style.display = 'none';
}

function showResult(){
  // pick top type
  const entries = Object.entries(state.scores);
  entries.sort((a,b)=>b[1]-a[1]);
  const top = entries[0] ? entries[0][0] : Object.keys(profiles)[0];
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <h3>Your Evangelism Style: <span style="color:#5b21b6">${top}</span></h3>
    <p>${profiles[top]}</p>
    <p style="font-size:0.9rem; color:#475569">Tip: try the other options in a second run to see a different profile.</p>
  `;
  restartBtn.style.display = 'inline-block';
}

function restart(){
  state.step = 0;
  state.scores = {};
  resultDiv.style.display = 'none';
  restartBtn.style.display = 'none';
  renderStep();
}

document.getElementById('restartBtn').onclick = restart;

// load transcript into the transcript block (this includes the React prototype code)
const transcriptText = `APPROACHES TO EVANGELISM

INTELLECTUAL APPROACH

MAIN CHARACTERISTICS
Patient
Analytical and logical
Loves to debate
Shows love through action more than words

INVITATIONAL APPROACH
MAIN CHARACTERISTICS
Hospitable
Persuasive
Enjoys meeting new people
Committed (believes in things they are involved in)
Enthusiastic
Spiritually opportunistic

INTERPERSONAL APPROACH
MAIN CHARACTERISTICS
Conversational
Compassionate
Sensitive
Friendships oriented
Focus on people and their needs

TESTIMONIAL APPROACH
MAIN CHARACTERISTICS
Clear communicator
Good listener
Overwhelmed by the account of how God reached them
Sees links between their own experience and other’s

SERVICE APPROACH
MAIN CHARACTERISTICS
Patient
Others-centered
Sees needs and finds joy in meeting them
Shows love through action more than words
Attaches value to even menial tasks

DIRECT APPROACH
MAIN CHARACTERISTICS
Confident
Bold
Direct
Skips small talk, likes to get to the point
Has strong opinions and convictions;
`;
document.getElementById('transcript').textContent = transcriptText;

renderStep();
