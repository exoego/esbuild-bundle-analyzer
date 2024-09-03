import YAML from 'yaml';
import fs from 'node:fs';

const actionYaml = YAML.parse(fs.readFileSync("action.yaml", "utf-8"));

const inputKeys = Object.keys(actionYaml.inputs)
const envKeys = new Set<string>();
actionYaml.runs.steps.forEach((step: any) => {
    if (step.name !== "Compare with base branch bundle") return;
    Object.keys(step.env).forEach((key: string) => {
        envKeys.add(key.replace(/^INPUT_/, "").toLowerCase())
    })
})
if (envKeys.size === 0) {
    throw new Error("No environment variables found. Did you forget to add `env` to the step?")
}

const missingKeys = inputKeys.filter((key: string) => !envKeys.has(key))
if (missingKeys.length > 0) {
    const s = missingKeys.map((key: string) => `INPUT_${key.toUpperCase()}: \${{ inputs.${key} }}`).join("\n")

    throw new Error(`
Missing environment variables for ${missingKeys.join(", ")}.
Add the following envs to the step "Compare with base branch bundle" in action.yaml:

${s}    
    `)
} else {
    console.log("All environment variables are present")
}
