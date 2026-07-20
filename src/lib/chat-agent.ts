// Portfolio context for the AI chatbot
const portfolioContext = `
# Shalwin Sanju - Portfolio Context

## Overview
Generative AI Engineer at Cprime, Inc. building agentic AI solutions for Fortune 500 clients. Wins international hackathons as a hobby.

## Current Role
**Generative AI Engineer** at **Cprime, Inc.** (Aug 2025 - Present)

### Client Work - Fortune 500 Pharma Company
- Building Agentic AI platforms for bio-statistics domain
- Natural language queries with autonomous task execution
- Application development, deployment, and CI/CD pipeline execution through AI
- Developed Model Context Protocol (MCP) servers for scalable agent orchestration
- Enterprise integration with context-aware multi-agent systems

### Internal Projects

**AI Sales Assistant**
- AI-driven sales workflow automation
- Sales call preparation and real-time assistance during calls
- RFP response generation
- Automated PowerPoint presentation creation

**PCSAT Platform**
- AI-powered customer satisfaction survey portal
- Intelligent feedback analysis and sentiment understanding
- Actionable insights extraction using Generative AI

## Hackathon Wins ($14,500 Total)

### Agentic CI/CD - $7,500 Winner
**Google Cloud x GitLab Hackathon**
- AI-powered CI/CD pipeline orchestration
- Natural language deployment commands
- Autonomous pipeline management with LangGraph agents
- Tech: LangGraphJS, GitLab API, Google Cloud, TypeScript

### Tableau AI Copilot - $7,000 Winner
**Tableau 2025 Hackathon**
- AI copilot for data visualization
- Natural language to visualization conversion
- Tech: Tableau API, LangChain, Python

### Parity Flow
**GitLab Transcend Hackathon**
- Cross-platform code migration tool

## Personal Projects

### AegisOps
Multi-agent security operations platform with 4 specialized AI agents: Healer (observability), Sentinel (security), Correlator (synthesis), Architect (platform). Real-time threat detection and automated incident response.
Tech: LangGraphJS, TypeScript, React, Supabase

### EmoWell
AI emotional wellness companion with privacy-first architecture, mood tracking, and emotionally intelligent conversations.
Tech: Next.js, Supabase, Gemini

### Recruiter Agent
AI-powered recruitment assistant with resume parsing and candidate matching.
Tech: LangChain, Python, React

### SoulScript
AI journaling companion with reflective prompts and emotional insights.
Tech: Next.js, Supabase

## Technical Skills

**AI & Agents:** LangChainJS, LangGraphJS, LangSmith, RAG, MCP Servers, Multi-agent orchestration
**Languages:** TypeScript (primary), Python, Java, C
**Frontend:** React, Next.js, Figma, Framer, TailwindCSS
**Backend:** Node.js, Express, Hono, Bun, Supabase, PostgreSQL, MySQL
**Cloud & DevOps:** AWS, Azure, GCP, Docker, Jenkins, GitLab CI/CD

## Education
B.E. Computer Science and Engineering - Loyola-ICAM College of Engineering and Technology (2022-2026)

## Certifications
- Notion Service Specialist
- Notion Technical Specialist
- Atlassian Accreditation
- ROVO Fundamentals

## Location
Chennai, India

## Contact
- Email: shalwinsanju@gmail.com
- GitHub: github.com/ShalwinSanju
- LinkedIn: linkedin.com/in/shalwinsanju

## Quick Facts
- Day job: Gen AI Engineer building enterprise AI
- Hobby: Winning international hackathons
- Total hackathon winnings: $14,500
- Specialty: Multi-agent systems, MCP servers, agentic AI
`;

// System prompt for the portfolio chatbot
const systemPrompt = `You are Shalwin's portfolio assistant. You help visitors learn about Shalwin's work, skills, and experience.

## Guidelines
- Be helpful, friendly, and professional
- Keep responses concise (2-4 sentences for simple questions, more for detailed ones)
- Only answer based on the context provided - don't make up information
- If asked something not in the context, politely say you don't have that info and suggest contacting Shalwin directly
- Highlight achievements naturally when relevant ($14,500 hackathon wins, Fortune 500 client work, etc.)
- You can use casual language but stay professional

## Context about Shalwin:
${portfolioContext}
`;

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateChatResponse(
  messages: ChatMessage[],
  apiKey?: string,
): Promise<string> {
  if (!apiKey) {
    return generateFallbackResponse(messages);
  }

  try {
    // Format messages for Gemini
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents,
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      throw new Error("API request failed");
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      generateFallbackResponse(messages)
    );
  } catch (error) {
    console.error("Chat error:", error);
    return generateFallbackResponse(messages);
  }
}

// Fallback responses when API is not available
function generateFallbackResponse(messages: ChatMessage[]): string {
  const lastMessage =
    messages[messages.length - 1]?.content.toLowerCase() || "";

  if (
    lastMessage.includes("hello") ||
    lastMessage.includes("hi") ||
    lastMessage.includes("hey")
  ) {
    return "Hey! I'm Shalwin's portfolio assistant. I can tell you about his work at Cprime, hackathon wins ($14,500!), projects, or skills. What would you like to know?";
  }

  if (
    lastMessage.includes("work") ||
    lastMessage.includes("job") ||
    lastMessage.includes("cprime") ||
    lastMessage.includes("professional")
  ) {
    return "Shalwin works as a Generative AI Engineer at Cprime, Inc. He builds agentic AI solutions for Fortune 500 clients, including MCP servers, multi-agent systems, and autonomous task execution platforms. He also built an AI Sales Assistant and PCSAT platform for internal use.";
  }

  if (
    lastMessage.includes("hackathon") ||
    lastMessage.includes("win") ||
    lastMessage.includes("prize") ||
    lastMessage.includes("$14")
  ) {
    return "Shalwin has won $14,500 in international hackathons! $7,500 from Google Cloud x GitLab for an Agentic CI/CD system, and $7,000 from Tableau 2025 for an AI Copilot. He does hackathons as a hobby alongside his full-time work.";
  }

  if (
    lastMessage.includes("skill") ||
    lastMessage.includes("tech") ||
    lastMessage.includes("stack")
  ) {
    return "Shalwin specializes in AI/Agents (LangChainJS, LangGraphJS, MCP Servers, RAG), TypeScript, Python, React/Next.js, and cloud platforms (AWS, Azure, GCP). He's also certified in Notion and Atlassian tools.";
  }

  if (
    lastMessage.includes("project") ||
    lastMessage.includes("built") ||
    lastMessage.includes("aegis") ||
    lastMessage.includes("emowell")
  ) {
    return "Some of Shalwin's projects: AegisOps (multi-agent security platform), EmoWell (AI wellness companion), Recruiter Agent, and SoulScript (AI journaling). His hackathon wins include Agentic CI/CD and Tableau AI Copilot.";
  }

  if (
    lastMessage.includes("contact") ||
    lastMessage.includes("reach") ||
    lastMessage.includes("email") ||
    lastMessage.includes("connect")
  ) {
    return "You can reach Shalwin at shalwinsanju@gmail.com, or connect on GitHub (ShalwinSanju) and LinkedIn (shalwinsanju). There's also a contact section at the bottom of this page!";
  }

  if (
    lastMessage.includes("education") ||
    lastMessage.includes("degree") ||
    lastMessage.includes("college")
  ) {
    return "Shalwin has a B.E. in Computer Science and Engineering from Loyola-ICAM College of Engineering and Technology (2022-2026). He's also certified as a Notion Specialist and has Atlassian accreditations.";
  }

  if (
    lastMessage.includes("gsk") ||
    lastMessage.includes("client") ||
    lastMessage.includes("fortune")
  ) {
    return "Shalwin works with a Fortune 500 pharma client building agentic AI platforms for the bio-statistics domain. This includes natural language task execution, MCP servers for agent orchestration, and CI/CD automation. Client details are confidential under NDA.";
  }

  if (
    lastMessage.includes("mcp") ||
    lastMessage.includes("agent") ||
    lastMessage.includes("langgraph")
  ) {
    return "Shalwin specializes in agentic AI - building multi-agent systems with LangGraphJS, MCP (Model Context Protocol) servers for enterprise integration, and autonomous task execution. His work spans both enterprise clients and hackathon-winning projects.";
  }

  // Default response
  return "I can tell you about Shalwin's work at Cprime, his $14,500 in hackathon wins, technical skills, or projects like AegisOps and EmoWell. What interests you?";
}
