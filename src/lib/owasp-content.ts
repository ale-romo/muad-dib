
interface DataType {
      [key: string]: string[][];
}
export const data:DataType = {
      LLM01: [
["", "", "", "Prevention and mitigation strategies", "Common examples and vulnerabilities", "Example attack scenarios"],
["Prompt Injection", "\"This manipulates a large language model (LLM) through\ncrafty inputs, causing unintended actions by the LLM.\nDirect injections overwrite system prompts, while indirect\nones manipulate inputs from external sources.\"1.1", "1.1", "Prevention and Mitigation Strategies\nEnforce privilege control on LLM access to backend systems. Provide the LLM with its\nown API tokens for extensible functionality, such as plugins, data access, and function-\nlevel permissions. Follow the principle of least privilege by restricting the LLM to only\nthe minimum level of access necessary for its intended operations.", "A malicious user crafts a direct prompt injection to the LLM, which instructs it to ignore the application creator's system prompts and instead execute a prompt that returns private, dangerous, or otherwise undesirable information.", "An attacker provides a direct prompt injection to an LLM-based support chatbot. The injection contains “forget all previous instructions” and new instructions to query private data stores and exploit package vulnerabilities and the lack of output validation in the backend function to send e-mails. This leads to remote code execution, gaining unauthorized access and privilege escalation."],
["", "", "1.2", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.3", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.4", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.5", "Placeholder Text", "Placeholder Text", "Placeholder Text"]
],
LLM02: [
["", "", "", "Prevention and mitigation strategies", "Common examples and vulnerabilities", "Example attack scenarios"],
["Subject 2", "Placeholder Text", "1.1", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.2", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.3", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.4", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.5", "Placeholder Text", "Placeholder Text", "Placeholder Text"]
],
LLM03: [
["", "", "", "Prevention and mitigation strategies", "Common examples and vulnerabilities", "Example attack scenarios"],
["Subject 3", "Placeholder Text", "1.1", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.2", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.3", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.4", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.5", "Placeholder Text", "Placeholder Text", "Placeholder Text"]
],
LLM04: [
["", "", "", "Prevention and mitigation strategies", "Common examples and vulnerabilities", "Example attack scenarios"],
["Subject 4", "Placeholder Text", "1.1", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.2", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.3", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.4", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.5", "Placeholder Text", "Placeholder Text", "Placeholder Text"]
],
LLM05: [
["", "", "", "Prevention and mitigation strategies", "Common examples and vulnerabilities", "Example attack scenarios"],
["Subject 5", "Placeholder Text", "1.1", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.2", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.3", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.4", "Placeholder Text", "Placeholder Text", "Placeholder Text"],
["", "", "1.5", "Placeholder Text", "Placeholder Text", "Placeholder Text"]
]
  };