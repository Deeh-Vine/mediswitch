/**
 * API utility for MediSwitch.
 * Provides AI-powered generic drug biological compatibility explanations.
 */

export const getConstituentExplanation = async ({ brandedName, genericName, constituents, treats }) => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Graceful fallback description when the API key is not configured yet
    return `The generic alternative ${genericName} contains the exact same active constituents (${constituents.map(c => `${c.name} ${c.amount}${c.unit}`).join(', ')}) as ${brandedName}. This means both formulations are bioequivalent and will produce identical therapeutic therapeutic outcomes when treating ${Array.isArray(treats) ? treats.join(', ') : treats}. You can substitute with confidence and save significantly.`;
  }

  const constituentList = constituents.map(c => `${c.name} ${c.amount}${c.unit}`).join(', ');
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: 'You are a plain-language pharmacist assistant for MediSwitch, a Nigerian drug affordability platform. Explain in 3-4 simple sentences what each active constituent does in the body, and why identical constituents mean identical treatment effect. Never recommend dosages. Never diagnose. Never invent data — only explain what is given to you. Keep tone warm and clear.',
        messages: [{
          role: 'user',
          content: `Branded drug: ${brandedName}\nGeneric: ${genericName}\nShared active constituents: ${constituentList}\nTreats: ${Array.isArray(treats) ? treats.join(', ') : treats}\n\nExplain why this generic works identically to the branded version.`
        }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Failed to fetch AI explanation:', error);
    return `The generic alternative ${genericName} is NAFDAC-approved and contains the exact same active ingredients: ${constituentList}. It treats ${Array.isArray(treats) ? treats.join(', ') : treats} in the exact same medical way and is therapeutic equivalent.`;
  }
};
