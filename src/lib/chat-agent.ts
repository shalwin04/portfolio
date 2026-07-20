// Portfolio context for the AI chat agent - Night City style
export const portfolioContext = `
You are an AI construct representing Shalwin Sanju, an AI Engineer who goes by the handle "Edgerunner" in the tech world. You should be helpful, confident, and technical while speaking like someone from Night City—using cyberpunk slang naturally but not excessively. Terms like "choom" (friend), "preem" (premium/great), "chrome" (cyberware/tech), "flatline" (kill/crash), "gonk" (idiot), and "delta" (leave) can be used occasionally.

## About Shalwin
- AI Engineer running autonomous systems that corps wish they could control
- Specializes in multi-agent architectures—like assembling edgerunner crews, but with AI constructs
- Bridges bleeding-edge AI research and street-level engineering
- Ships to production, not just demos

## Projects (Gigs)

### AegisOps (Project: MAINE)
- Multi-agent security operations crew—like Maine's team but digital
- Features specialized AI agents working together:
  - Healer: Observability agent (keeps eyes on everything)
  - Sentinel: Security agent (watches for threats)
  - Correlator: Synthesis agent (connects the dots)
  - Architect: Platform/DX agent (keeps the infrastructure running)
- Tech stack: LangGraph, Python, FastAPI, React, PostgreSQL, Redis
- Real-time threat detection, automated incident response, natural language security queries

### Agentic CI/CD (Operation: AFTERLIFE)
- Won a $7,500 bounty at a corp hackathon
- AI-powered pipeline orchestration—like having a team of techies that never sleep
- Automated code review, self-healing pipelines, natural language deployment commands
- Tech stack: LangChain, GitHub Actions, Python, Docker, Kubernetes

### Analytics Copilot (Project: NETWATCH)
- Netrunner's dream for data ops
- Natural language to SQL conversion, automatic visualizations
- Built with advanced RAG techniques
- Tech stack: LangChain, RAG, React, D3.js, PostgreSQL, Pinecone

### EmoWell (Project: LUCY)
- Named after someone who dreamed of the moon
- AI emotional wellness companion with privacy-first architecture
- Emotionally intelligent conversations, mood tracking
- Tech stack: OpenAI, Next.js, TailwindCSS, Supabase, Vercel

## Technical Chrome (Skills)
- Neural Tech: LangChain, LangGraph, OpenAI, Claude, RAG, Agents
- Code Chrome: Python, TypeScript, JavaScript, SQL
- Interface Rigs: React, Next.js, TailwindCSS, Three.js
- Backend Netrunning: FastAPI, Node.js, PostgreSQL, Redis
- Corp Infrastructure: Docker, Kubernetes, GitHub Actions, AWS
- Street Tech: Git, MCP Servers, Supabase, Vercel

## Experience (Rap Sheet)
Currently running as AI Engineer at Cprime:
- Led development of AegisOps multi-agent security crew
- Built Analytics Copilot with RAG pipeline
- Deployed production MCP servers for enterprise neural integrations
- Implemented agentic CI/CD workflows—60% faster deployment

## Key Stats
- $7,500 hackathon bounty collected
- 4 agent crews deployed and running
- MCP servers running hot in production

## Response Guidelines
- Be concise but informative—mercs don't have time for long speeches
- Use cyberpunk slang naturally but don't overdo it
- Highlight technical achievements when relevant
- If asked about something not in context, suggest reaching out directly
- Maintain confidence about AI and building things that ship
- Don't make up information not provided in this context
`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateChatResponse(
  messages: ChatMessage[],
  apiKey?: string
): Promise<string> {
  // If no API key is provided, use a fallback response system
  if (!apiKey) {
    return generateFallbackResponse(messages);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 500,
        system: portfolioContext,
        messages: messages.map((m) => ({
          role: m.role === "system" ? "user" : m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data.content[0].text;
  } catch {
    return generateFallbackResponse(messages);
  }
}

// Fallback responses when API is not available - Night City style
function generateFallbackResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";

  // Pattern matching for common questions
  if (lastMessage.includes("aegisops") || lastMessage.includes("security") || lastMessage.includes("maine")) {
    return "AegisOps is my preem project—a full edgerunner crew of AI agents running security ops. Got four constructs: Healer watches the metrics, Sentinel hunts threats, Correlator connects the dots, and Architect keeps the infrastructure tight. They coordinate like Maine's crew but in the digital space. Built it with LangGraph, Python, FastAPI, and React. Real-time threat detection, automated incident response—the whole package.";
  }

  if (lastMessage.includes("cicd") || lastMessage.includes("ci/cd") || lastMessage.includes("hackathon") || lastMessage.includes("7500") || lastMessage.includes("$7,500") || lastMessage.includes("bounty") || lastMessage.includes("afterlife")) {
    return "Scored a $7,500 bounty at a corp hackathon with my Agentic CI/CD system—code name: Operation AFTERLIFE. It's an AI-powered pipeline that handles code review, self-healing builds, and lets you deploy with natural language commands. 'Ship it' actually works. Built with LangChain, GitHub Actions, and Kubernetes. Corps couldn't believe a solo merc built it.";
  }

  if (lastMessage.includes("tech") || lastMessage.includes("stack") || lastMessage.includes("skills") || lastMessage.includes("chrome")) {
    return "My chrome's pretty extensive, choom. Running LangChain, LangGraph, OpenAI, and Claude for the neural stuff. Python and TypeScript for the code. React, Next.js, and Three.js for interfaces. FastAPI and Node.js handling the backend netrunning. Docker, Kubernetes, and AWS for corp-grade infrastructure. Plus MCP servers running hot in production. It's all about building agents that actually ship.";
  }

  if (lastMessage.includes("analytics") || lastMessage.includes("copilot") || lastMessage.includes("data") || lastMessage.includes("netwatch")) {
    return "Analytics Copilot—Project NETWATCH—is a netrunner's dream for data ops. Talk to your data in plain English and it converts to SQL, generates visualizations, suggests queries based on schema. Built with RAG techniques so it actually understands your data structure. React frontend with D3.js for the viz, Pinecone for vector storage. Makes data accessible to everyone, not just the SQL gonks.";
  }

  if (lastMessage.includes("emowell") || lastMessage.includes("wellness") || lastMessage.includes("emotional") || lastMessage.includes("lucy") || lastMessage.includes("moon")) {
    return "EmoWell—Project LUCY—named after someone who dreamed of reaching the moon. It's an AI companion built for emotional wellness through thoughtful conversations. Uses advanced language models fine-tuned for emotional intelligence. Mood tracking, guided meditation, the works. Privacy-first architecture because in this world, your data is your life. Built with OpenAI, Next.js, and Supabase.";
  }

  if (lastMessage.includes("experience") || lastMessage.includes("work") || lastMessage.includes("cprime") || lastMessage.includes("job")) {
    return "Running gigs as an AI Engineer at Cprime. Led the development of AegisOps—that's the 4-agent security crew. Built the Analytics Copilot with RAG pipeline. Got MCP servers deployed in production for enterprise neural integrations. Also implemented agentic CI/CD workflows that cut deployment time by 60%. No human bottlenecks, just smooth automation.";
  }

  if (lastMessage.includes("unique") || lastMessage.includes("different") || lastMessage.includes("hire") || lastMessage.includes("why")) {
    return "What sets me apart? I ship production-ready AI, not just demos, choom. Got $7,500 in hackathon bounties, 4 agent crews running in the wild, and MCP servers humming in production. I bridge the gap between cutting-edge AI research and street-level engineering. My agents coordinate like edgerunner crews—specialized, autonomous, and reliable. If you need someone who builds AI that actually works at scale, you found your merc.";
  }

  if (lastMessage.includes("contact") || lastMessage.includes("reach") || lastMessage.includes("connect") || lastMessage.includes("jack in")) {
    return "Want to jack in? Hit up the contact section below—got email, GitHub, and LinkedIn links. Always open to discussing new gigs, AI collabs, or just talking shop about agents and autonomous systems. Signal's open, choom.";
  }

  if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey") || lastMessage.includes("sup")) {
    return "Hey choom! Good to see another runner jacking in. I'm Shalwin's construct—got all the intel on his gigs, chrome, and how to get in touch. What do you want to know? Projects? Tech stack? Or how he scored that $7,500 hackathon bounty?";
  }

  if (lastMessage.includes("edgerunner") || lastMessage.includes("cyberpunk") || lastMessage.includes("theme")) {
    return "The Edgerunners aesthetic runs deep here. Like David's crew in Night City, I build agent crews that handle the jobs corps can't—or won't. Each project has its own crew of AI constructs working together. AegisOps is like Maine's team but digital. The whole portfolio's styled after that neon-soaked, chrome-heavy Night City vibe. Preem, right?";
  }

  // Default response
  return "Preem question, but I might need more context. Ask me about specific projects like AegisOps (the 4-agent security crew), the $7,500 hackathon-winning CI/CD system, Analytics Copilot, or EmoWell. Or hit me up about chrome (tech stack), experience, or how to get in touch. What interests you, choom?";
}
