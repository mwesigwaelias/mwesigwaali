import { Technology } from './types';

export const MWESIGWAALI_TECHS: Technology[] = [
  {
    id: 'react-vite',
    name: 'React + Vite',
    category: 'frontend',
    description: 'High-performance SPA architectures built with lightning fast hot-reload bundlers, modular hooks, custom themes, and Tailwind CSS.',
    logo: 'Code2',
    proCode: `// Optimized React Architecture using custom memoizers
export function useMwesigwaHook<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<T | null>(null);
  useEffect(() => {
    let active = true;
    fetcher().then(res => { if (active) setState(res); });
    return () => { active = false; };
  }, [fetcher]);
  return state;
}`,
    languages: ['TypeScript', 'JavaScript'],
    features: ['Instant HMR', 'Client Side Routing', 'State Management (Zustand/Redux)', 'Tailwind Engine Configured']
  },
  {
    id: 'nestjs',
    name: 'NestJS Engine',
    category: 'backend',
    description: 'Enterprise grade decorator-driven architecture for robust, scalable backend nodes with built-in dependency injection and security guards.',
    logo: 'Cpu',
    proCode: `@Injectable()
export class MwesigwaaliService {
  constructor(private readonly database: SupabaseClient) {}

  @UseGuards(JwtAuthGuard)
  async dispatchUgandaCargo(payload: CargoDto) {
    return this.database.from('cargo').insert([payload]);
  }
}`,
    languages: ['TypeScript', 'Node.js'],
    features: ['Inversion of Control (IOC)', 'Auto-Generated Swagger Docs', 'WebSockets Peer Integration', 'Scalable Microservices Core']
  },
  {
    id: 'django',
    name: 'Django Suite',
    category: 'backend',
    description: 'Bespoke Python backend pipelines with built-in ORMs, automated administration layouts, robust authentication suites, and swift model loaders.',
    logo: 'Server',
    proCode: `# Python-Django AI analytics dispatch handler
from django.db import models
from django.http import JsonResponse

class AgroAnalysis(models.Model):
    region = models.CharField(max_length=120)
    temperature_index = models.FloatField()
    yield_predictions = models.JSONField()

    def as_json(self):
        return {"region": self.region, "index": self.temperature_index}` ,
    languages: ['Python'],
    features: ['Django Rest Framework (DRF)', 'Batteries-Included Admin portal', 'Asynchronous Channels Support', 'Native PyTorch Integrations']
  },
  {
    id: 'aspnet',
    name: 'ASP.NET Core',
    category: 'backend',
    description: 'Blazing-fast Microsoft enterprise tech stack. Ideal for highly-threaded transaction logs, bank-grade secure integrations, and Windows desktop hooks.',
    logo: 'Database',
    proCode: `// Advanced high-frequency controller logic
[ApiController]
[Route("api/[controller]")]
public class LogisticsController : ControllerBase
{
    private readonly IAgentSolutions _agent;
    public LogisticsController(IAgentSolutions agent) => _agent = agent;

    [HttpPost("analyze")]
    public async Task<IActionResult> Forecast([FromBody] JobRequest job) 
    {
        var prediction = await _agent.PredictJob(job);
        return Ok(prediction);
    }
}`,
    languages: ['C#', '.NET 8/9'],
    features: ['High-Performance CLR Engine', 'Strong Type Safety', 'Entity Framework Core (EF Core)', 'High-Level Threading & Concurrency']
  },
  {
    id: 'express-node',
    name: 'Express + Node',
    category: 'backend',
    description: 'Lean and fast backend applications. Lightweight server logic, customizable middlewares, fast rate limit handling, and micro-databases routing.',
    logo: 'Terminal',
    proCode: `const express = require('express');
const app = express();

app.post('/api/uganda/geofence', (req, res) => {
  const { latitude, longitude } = req.body;
  if (insideKampalaLimits(latitude, longitude)) {
    return res.json({ region: "Central Hub Active" });
  }
  res.status(403).json({ error: "Out of scope bounds" });
});`,
    languages: ['JavaScript', 'TypeScript', 'Node.js'],
    features: ['Lightweight Footprint', 'Custom Middleware Pipes', 'Rapid Prototyping Speed', 'Event-Driven Architecture']
  },
  {
    id: 'flutter-native',
    name: 'Flutter & Native Mobile',
    category: 'mobile',
    description: 'High fidelity fluid layouts for Android, iOS and Ubuntu desktops. Compiles compiled ARM machines code directly for incredible scrolling performance.',
    logo: 'Smartphone',
    proCode: `// Flutter custom stateful canvas element
class KampalaMapWidget extends StatefulWidget {
  @override
  _KampalaMapWidgetState createState() => _KampalaMapWidgetState();
}
class _KampalaMapWidgetState extends State<KampalaMapWidget> {
  LatLng currentPos = LatLng(0.3476, 32.5825); // Kampala
  @override
  Widget build(BuildContext context) {
    return GoogleMap(initialPosition: currentPos);
  }
}`,
    languages: ['Dart', 'Kotlin', 'Swift'],
    features: ['Single Codebase Deploy', 'Beautiful 120Hz Animations', 'Native Bluetooth Integration', 'Offline Mobile Money Sync']
  },
  {
    id: 'ai-tensorflow',
    name: 'Artificial Intelligence SDKs',
    category: 'ai-devops',
    description: 'Bespoke integration of neural networks. Image analysis engines for micro-farming anomalies, NLP customer queues, and chat representatives.',
    logo: 'Brain',
    proCode: `# Python machine model inference pipeline
import torch
import torchvision.transforms as transforms

def analyze_uganda_crop_leaves(image_bytes):
    model = torch.load('leaves_model_ug.pth')
    model.eval()
    tensor = transforms.ToTensor()(image_bytes).unsqueeze(0)
    with torch.no_grad():
        out = model(tensor)
    return "Optimistic Yield: " + str(out.argmax().item())`,
    languages: ['Python', 'TensorFlow', 'PyTorch'],
    features: ['Bespoke Neural Processing', 'Computer Vision Pipelines', 'Smart LLM Integrations', 'Localized offline inference nodes']
  }
];

export const SERVICES_CATALOG = [
  {
    id: 'mobile',
    title: 'Mobile Application Hub',
    description: 'Developing high-fidelity multiplatform systems targeting Android and iOS, optimized for peer-to-peer mobile payments like MTN Mobile Money and Airtel Money.',
    techs: ['Flutter', 'React Native', 'Kotlin', 'Node.js', 'Supabase'],
    badge: 'Ubuntu & iOS'
  },
  {
    id: 'web',
    title: 'Enterprise Web Apps',
    description: 'Fluid SaaS systems built with React + Vite, backed by robust APIs from Django or NestJS hubs. Incorporating real-time updates and interactive data models.',
    techs: ['React', 'NestJS', 'Django', 'ASP.NET Core', 'Supabase'],
    badge: 'SaaS Excellence'
  },
  {
    id: 'desktop',
    title: 'Bespoke Desktop Apps',
    description: 'High-speed administrative and inventory software compiled for Windows, macOS, and Linux setups. Strong offline capability for localized hardware.',
    techs: ['ASP.NET Core', 'Flutter Desktop', 'C#', 'PostgreSQL'],
    badge: 'Offline-First'
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence (AI)',
    description: 'Custom neural models, predictive farming indices, computer vision detectors, LLM grounding solutions, and digital agent consultants for Ugandan context.',
    techs: ['PyTorch', 'TensorFlow', 'Gemini SDK', 'Express.js', 'Python'],
    badge: 'Agentic Core'
  }
];
