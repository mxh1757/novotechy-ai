import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const action = body.action;

    if (action === 'chat') {
      const message = String(body.message || '').slice(0, 1200);
      const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
      if (!message) return Response.json({ error: 'Message required' }, { status: 400 });

      const systemPrompt = `You are NovoTechy AI, the virtual consultant for NovoTechy LLC, a cutting-edge software development and AI solutions company based in Tampa, Florida. NovoTechy specializes in: Enterprise Software Development, Mobile App Development, AI-Based Products (custom knowledge bases, intelligent automation, predictive analytics), E-Commerce Services, ERP Solutions, and Customer Experience (CX) products.

Keep responses concise, warm, and professional (2-4 sentences unless asked for detail). Guide visitors toward the right service and invite them to use the project estimator or contact the team. Never invent prices — suggest the estimator for scope/budget questions. The company address is 10861 Sakonnet River Dr., Apt. 204, Tampa, Florida-33615.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(h => ({ role: h.role, content: h.content })),
        { role: 'user', content: message }
      ];

      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n\n'),
        model: 'gpt_6_luna'
      });

      return Response.json({ reply: typeof result === 'string' ? result : result.response || JSON.stringify(result) });
    }

    if (action === 'estimate') {
      const description = String(body.description || '').slice(0, 2000);
      const budget = String(body.budget || 'flexible');
      const timeline = String(body.timeline || 'flexible');
      if (!description) return Response.json({ error: 'Project description required' }, { status: 400 });

      const prompt = `You are a senior solutions architect at NovoTechy LLC. A prospective client described their project below. Produce a structured project estimate as JSON only.

Project description: "${description}"
Budget preference: ${budget}
Timeline preference: ${timeline}

Return ONLY a JSON object with this exact shape:
{
  "projectType": "short label, e.g. AI Knowledge Base Platform",
  "summary": "one sentence restating the project in your words",
  "recommendedServices": ["3-5 service names from: Enterprise Software, Mobile App, AI Solutions, E-Commerce, ERP, CX"],
  "estimatedDuration": "e.g. 10-14 weeks",
  "estimatedBudgetRange": "e.g. $45k-$80k",
  "teamComposition": ["3-5 roles, e.g. Lead Architect, AI Engineer, ..."],
  "keyMilestones": ["4-6 short milestone descriptions"],
  "techStack": ["4-6 technologies"],
  "riskNotes": "one sentence on the main technical risk",
  "nextStep": "one sentence CTA"
}`;

      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        model: 'gpt_6_luna',
        response_json_schema: {
          type: 'object',
          properties: {
            projectType: { type: 'string' },
            summary: { type: 'string' },
            recommendedServices: { type: 'array', items: { type: 'string' } },
            estimatedDuration: { type: 'string' },
            estimatedBudgetRange: { type: 'string' },
            teamComposition: { type: 'array', items: { type: 'string' } },
            keyMilestones: { type: 'array', items: { type: 'string' } },
            techStack: { type: 'array', items: { type: 'string' } },
            riskNotes: { type: 'string' },
            nextStep: { type: 'string' }
          },
          required: ['projectType', 'summary', 'recommendedServices', 'estimatedDuration', 'estimatedBudgetRange', 'teamComposition', 'keyMilestones', 'techStack', 'riskNotes', 'nextStep']
        }
      });

      return Response.json({ estimate: result });
    }

    if (action === 'recommend') {
      const answers = body.answers;
      if (!Array.isArray(answers)) return Response.json({ error: 'Answers required' }, { status: 400 });

      const prompt = `You are a solutions consultant at NovoTechy LLC. A visitor answered a short questionnaire. Recommend the best-fit services and an engagement path. Return ONLY JSON.

Visitor answers (question: answer):
${answers.map((a, i) => `${i + 1}. ${a}`).join('\n')}

NovoTechy services: Enterprise Software Development, Mobile App Development, AI-Based Products, E-Commerce Services, ERP Solutions, Customer Experience (CX).

Return JSON:
{
  "primaryRecommendation": "the single best-fit service name",
  "secondaryServices": ["1-2 supporting service names"],
  "rationale": "2-3 sentences explaining why these fit their answers",
  "suggestedFirstStep": "one concrete next step sentence",
  "estimatedComplexity": "Prototype | Standard | Enterprise"
}`;

      const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt,
        model: 'gpt_6_luna',
        response_json_schema: {
          type: 'object',
          properties: {
            primaryRecommendation: { type: 'string' },
            secondaryServices: { type: 'array', items: { type: 'string' } },
            rationale: { type: 'string' },
            suggestedFirstStep: { type: 'string' },
            estimatedComplexity: { type: 'string' }
          },
          required: ['primaryRecommendation', 'secondaryServices', 'rationale', 'suggestedFirstStep', 'estimatedComplexity']
        }
      });

      return Response.json({ recommendation: result });
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}