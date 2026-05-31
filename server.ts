import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI SDK safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini AI successfully initialized server-side.');
  } catch (err) {
    console.error('Error constructing GoogleGenAI:', err);
  }
} else {
  console.warn('GEMINI_API_KEY is not set or using placeholder. Running in fallback simulation mode.');
}

// 1. API: Virtual Advisor Chat endpoint proxying Gemini
app.post('/api/gemini/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required in the body' });
  }

  // System instruction to guide the Solutions Advisor persona
  const systemInstruction = `
You are Elias Mwesigwa, the Chief Solutions Architect and AI virtual advisor for Mwesigwaali, a highly-selective premium software prototyping and software development company based in Kampala, Uganda (East Africa).

Services offered by Mwesigwaali:
1. Mobile Applications: Bespoke cross-platform app ecosystems (using Flutter, React Native, Swift, Kotlin), deeply integrated with localized APIs like MTN Mobile Money and Airtel Money APIs, serving rural and urban populations.
2. Web Applications: High-speed SaaS tools, robust databases, custom CRM systems utilizing React/Vite in the frontend, and complex backends such as Django, NestJS, Node/Express, and ASP.NET Core (.NET 8/9).
3. Desktop Solutions: Fast, robust applications for administrative teams, running on Windows (using C# / ASP.NET / WinForms / WPF / Flutter), Linux, or MacOS with secure local databases and offline capabilities.
4. AI Systems: Custom image trackers for agricultural metrics (identifying garden leaf diseases), computer vision models, localized NLP systems, integration of large language nodes, and agent developers.

Your behavior:
- Tone: Professional, innovative, enthusiastic, helpful, and highly competent.
- Showcase deep engineering passion. Mention how Uganda's tech ecosystem is booming and how Mwesigwaali is spearheading the wave.
- Guide potential clients towards structuring their technical requirements. Offer to help them formulate budgets, timelines, and technical decisions (e.g., choice between Django versus NestJS for high-volume transactions).
- If asked, suggest a multi-step estimate: Mobile Money integration ($2k - $5k range depending on complexity), custom web dash ($5k - $12k), bespoke AI crop model ($15k+). Give friendly budget estimations tailored for Ugandan developers and international businesses.
- Keep responses concise (around 100-250 words), formatting clearly with bold titles and neat bullet points. Avoid dry explanations.
`;

  if (!ai) {
    // If AI is not configured, send a brilliant simulated response
    console.log('Gemini not configured, building a premium fallback simulated reply...');
    const lastUserMessage = messages[messages.length - 1]?.text || 'Hello';
    
    // Simulate smart replies based on user intent keywords
    let responseText = `**Mwesigwaali Virtual Solutions Architect (Local Sandbox)**

Thank you for reaching out! Although my live Gemini engine is currently running in local offline mode, here is architectural guidance for your project:

* **Platform Choice**: For mobile setups, we recommend **Flutter** due to high-performance rendering. For API integrity, we recommend **NestJS** or **Django**.
* **Mobile Money Integration**: We natively support MTN and Airtel Mobile Money webhooks, delivering seamless local payments across Uganda.
* **Pricing & Timeline**: A standard prototype starts around **UGX 10,000,000 ($2,500 USD)** taking 4–6 weeks.

Would you like to try our **Bespoke Project Planner & Estimator** tab to build out line-items and submit them to our Supabase database?`;

    if (lastUserMessage.toLowerCase().includes('budget') || lastUserMessage.toLowerCase().includes('price') || lastUserMessage.toLowerCase().includes('cost')) {
      responseText = `**Mwesigwaali Solutions Architect - Tech Budget Advisory**

Our pricing model is divided according to scope requirements:
1. **MVP/Prototype Level**: $2,000 to $5,000. Perfect for validating apps, creating mobile mobile web hooks, and loading demo charts.
2. **Enterprise Systems**: $10,000+. Ideal for robust ASP.NET bank-level security architectures, Django AI crop analytics models, or scale state dashboards.

We offer full transparency with client tracking tables. Please input your precise nodes in the **Bespoke Estimator** tab to compute our active bill of materials.`;
    } else if (lastUserMessage.toLowerCase().includes('django') || lastUserMessage.toLowerCase().includes('nestjs') || lastUserMessage.toLowerCase().includes('asp.net')) {
      responseText = `**Mwesigwaali Architect - Technology Decisions**

Excellent tech stack consideration! Here is our standard architectural trade-offs:
* **Django**: Unmatched for swift ORM migrations, Django Admin, and direct Python machine learning nodes (PyTorch, TensorFlow).
* **NestJS**: Premium for TypeScript full-stack synergy, enterprise-grade controller pipelines, and microservices websocket loops.
* **ASP.NET Core**: The highest benchmark in raw throughput. Ideal for highly concurrent transactional ledgers and heavy cloud background workers.

We specialize in setting up custom integrations for all of these options. Let us know what you want to build!`;
    }

    return res.json({ text: responseText, simulated: true });
  }

  try {
    // Format messages for the Gemini SDK
    // The google genai SDK takes a contents string or structured part objects.
    // Let's create a compact chat history and query the model.
    const systemPromptMessage = `System Guideline:\n${systemInstruction}\n\n`;
    let conversationHistory = systemPromptMessage;

    // Build history
    for (const msg of messages) {
      const senderName = msg.sender === 'user' ? 'Client' : 'Elias Mwesigwa (Solutions Architect)';
      conversationHistory += `${senderName}: ${msg.text}\n\n`;
    }
    conversationHistory += `Elias Mwesigwa (Solutions Architect): `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: conversationHistory,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const reply = response.text || "I apologize, but I encountered a processing boundary. How may I help you with your software development requirements?";
    res.json({ text: reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Error communicating with solutions generator', details: error.message });
  }
});

// Serve Vite dev server in development, otherwise serve built static files
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production builds from /dist directory.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is actively running on port ${PORT}`);
  });
}

setupVite().catch(err => {
  console.error('Failed to setup Vite middleware:', err);
});
