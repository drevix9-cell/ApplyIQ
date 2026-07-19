// --- STATE MATRIX STORAGE CONFIGURATIONS ---
let currentImagePayload = { mimeType: null, base64: null };
let activeMode = 'login';

document.addEventListener("DOMContentLoaded", () => {
    const activeCachedKey = localStorage.getItem("applyiq_master_key");
    if (activeCachedKey) {
        document.getElementById('modal-api-key-input').value = activeCachedKey;
    }
});

// --- GATE ROUTING UTILITIES ---
function showAuthForm(mode) {
    activeMode = mode;
    const welcomeState = document.getElementById('auth-welcome-state');
    const formState = document.getElementById('auth-form-state');
    const formTitle = document.getElementById('form-title');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const submitBtn = document.getElementById('auth-submit-btn');

    welcomeState.classList.add('hidden');
    formState.classList.remove('hidden');

    if (mode === 'login') {
        formTitle.innerText = 'Sign In';
        confirmPasswordGroup.classList.add('hidden');
        submitBtn.innerText = 'Initialize Session →';
    } else {
        formTitle.innerText = 'Register Credentials';
        confirmPasswordGroup.classList.remove('hidden');
        submitBtn.innerText = 'Create Account Core →';
    }
}

function hideAuthForm() {
    document.getElementById('auth-welcome-state').classList.remove('hidden');
    document.getElementById('auth-form-state').classList.add('hidden');
    document.getElementById('auth-form').reset();
}

function handleAuth(event) {
    event.preventDefault();
    document.getElementById('auth-container').classList.add('hidden');
    
    const splash = document.getElementById('splash-container');
    splash.classList.remove('hidden');

    setTimeout(() => {
        splash.classList.add('exit');
        setTimeout(() => {
            splash.classList.add('hidden');
            splash.classList.remove('exit');
            document.getElementById('app-container').classList.remove('hidden');
            showDashboard();
        }, 400);
    }, 2000);
}

function handleLogout() {
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
    hideAuthForm();
}

// --- GLOBAL SETTINGS MODULE MODAL MANAGEMENT ---
function openSettings() { document.getElementById('settings-modal').classList.remove('hidden'); }
function closeSettings() { document.getElementById('settings-modal').classList.add('hidden'); }

function saveSettings() {
    const securityValue = document.getElementById('modal-api-key-input').value.trim();
    localStorage.setItem("applyiq_master_key", securityValue);
    closeSettings();
    alert("System metrics optimized. Key sequence cached successfully inside local system space.");
}

// --- CORE SYSTEM NAVIGATION SWITCHES ---
function showDashboard() {
    document.getElementById('dashboard-view').classList.remove('hidden');
    document.getElementById('tool-view').classList.add('hidden');
}

function openTool(toolType) {
    document.getElementById('dashboard-view').classList.add('hidden');
    document.getElementById('tool-view').classList.remove('hidden');
    
    // Wipe local frame memory values cleanly on workspace transformations
    currentImagePayload = { mimeType: null, base64: null };
    
    const workspace = document.getElementById('active-tool-workspace');
    
    // UNIVERSAL DYNAMIC SNAP INTERFACE INJECTOR BLOCK
    const mediaEngineHtml = `
        <div class="media-capture-wrapper">
            <label class="capture-trigger-label" for="camera-file-picker">
                📸 Snap Photo or Upload File
            </label>
            <input type="file" id="camera-file-picker" class="hidden-file-input" accept="image/*" onchange="processMediaFile(this)">
            <div id="media-preview-container" class="image-preview-deck hidden"></div>
        </div>
    `;

    if (toolType === 'job') {
        workspace.innerHTML = `
            <h3>Career Optimization Core</h3>
            ${mediaEngineHtml}
            <div class="input-group">
                <label>Structural Experience Profile (Resume Text)</label>
                <textarea id="prompt-primary" placeholder="Paste structural text or raw formatting profile metrics here..."></textarea>
            </div>
            <div class="input-group">
                <label>Target Criteria Specifications (Job Posting)</label>
                <textarea id="prompt-secondary" placeholder="Paste corporate targets or company functional details description here..."></textarea>
            </div>
            <button class="action-btn solid-white" id="generate-btn" onclick="executePipelineRun('job')">Execute AI Tailoring Process</button>
        `;
    } else if (toolType === 'homework') {
        workspace.innerHTML = `
            <h3>Academic Deconstruction Matrix</h3>
            ${mediaEngineHtml}
            <div class="input-group">
                <label>Operational Discipline / Subject</label>
                <input type="text" id="prompt-primary" placeholder="e.g., Vector Calculus, Organic Chemistry, Linear Algebra">
            </div>
            <div class="input-group">
                <label>Complex Problem Statement / Notes</label>
                <textarea id="prompt-secondary" placeholder="Input specific homework prompts or theoretical proof requirements needing resolution (or leave empty if you snapped an image)..."></textarea>
            </div>
            <button class="action-btn solid-white" id="generate-btn" onclick="executePipelineRun('homework')">Execute Step-by-Step Resolution</button>
        `;
    } else if (toolType === 'code') {
        workspace.innerHTML = `
            <h3>Developer Sandbox Console</h3>
            ${mediaEngineHtml}
            <div class="input-group">
                <label>Target Technical Stack</label>
                <input type="text" id="prompt-primary" placeholder="e.g., Python Fast-API, React Native, Rust Core">
            </div>
            <div class="input-group">
                <label>Fault Logs or System Requirements</label>
                <textarea id="prompt-secondary" placeholder="Paste broken code scripts, terminal error traces, or logic build specs here..."></textarea>
            </div>
            <button class="action-btn solid-white" id="generate-btn" onclick="executePipelineRun('code')">Run Diagnostics & Compile</button>
        `;
    } else if (toolType === 'creative') {
        workspace.innerHTML = `
            <h3>Creative Content Studio</h3>
            ${mediaEngineHtml}
            <div class="input-group">
                <label>Campaign Strategy Outlet</label>
                <input type="text" id="prompt-primary" placeholder="e.g., TikTok Hook Scripts, High-Converting Facebook Ads, Premium Rebranding">
            </div>
            <div class="input-group">
                <label>Context Blueprint / Value Propositions</label>
                <textarea id="prompt-secondary" placeholder="Describe the product core features, targeted demographics, or tone adjustments required..."></textarea>
            </div>
            <button class="action-btn solid-white" id="generate-btn" onclick="executePipelineRun('creative')">Generate Copy Variations</button>
        `;
    }
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('output-text').innerText = "";
}

// --- MULTIMODAL BASE64 CONVERSION UTILITIES ---
function processMediaFile(inputElement) {
    const targetFile = inputElement.files[0];
    if (!targetFile) return;

    const previewContainer = document.getElementById('media-preview-container');
    const reader = new FileReader();

    reader.onload = function(e) {
        const rawBase64 = e.target.result.split(',')[1];
        
        currentImagePayload.mimeType = targetFile.type;
        currentImagePayload.base64 = rawBase64;

        previewContainer.innerHTML = `
            <img src="${e.target.result}" class="preview-thumbnail">
            <button class="clear-image-btn" onclick="purgeUploadedImage()">×</button>
        `;
        previewContainer.classList.remove('hidden');
    };

    reader.readAsDataURL(targetFile);
}

function purgeUploadedImage() {
    currentImagePayload = { mimeType: null, base64: null };
    const container = document.getElementById('media-preview-container');
    container.classList.add('hidden');
    container.innerHTML = "";
    document.getElementById('camera-file-picker').value = "";
}

// --- DYNAMIC LIVE GEMINI MULTIMODAL INTEGRATION ENGINE ---
async function callLiveGeminiCore(systemInstruction, textPrompt) {
    const targetKey = localStorage.getItem("applyiq_master_key");
    
    if (!targetKey) {
        alert("CRITICAL FAULT: Missing Access Credentials Token.\nPlease tap the '⚙️ Settings' button option at the top to configure your Google Gemini key access parameters.");
        return null;
    }

    const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${targetKey.trim()}`;



    
    let messageParts = [];
    
    if (currentImagePayload.base64 && currentImagePayload.mimeType) {
        messageParts.push({
            inlineData: {
                mimeType: currentImagePayload.mimeType,
                data: currentImagePayload.base64
            }
        });
    }

    messageParts.push({ text: textPrompt });

    const requestPayload = {
        contents: [{ parts: messageParts }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.5, maxOutputTokens: 2500 }
    };

    try {
        const response = await fetch(endpointUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestPayload)
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text;
        } 
        else if (data.error) {
            return `GOOGLE API ERROR (${data.error.code}): ${data.error.message}\n\n👉 Tip: Double check that your key was copied completely and has no extra spaces.`;
        } 
        else {
            return "ERROR: Unexpected data structure received. Please try regenerating a new key in AI Studio.";
        }
    } catch (error) {
        console.error("Interface link runtime connection timeout:", error);
        return "CRITICAL FAULT: Failed to connect to core system communication networks.";
    }
}

// --- DYNAMIC UNIFIED PRODUCTION COMPILER PIPELINES ---
async function executePipelineRun(mode) {
    const val1 = document.getElementById('prompt-primary').value;
    const val2 = document.getElementById('prompt-secondary').value;
    const outputText = document.getElementById('output-text');
    const resultBox = document.getElementById('result-container');
    const btn = document.getElementById('generate-btn');

    if (!val1 && !val2 && !currentImagePayload.base64) {
        alert("CRITICAL REJECTION: Provide text parameters or snap a photo asset first before launching compiler runs.");
        return;
    }

    resultBox.classList.remove('hidden');
    outputText.innerHTML = '<span class="loading-text">Synthesizing multi-modal engine parameters... Processing your request via live Gemini Core...</span>';
    btn.disabled = true;

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === 'job') {
        systemPrompt = "You are ApplyIQ Career Matrix. You parse text parameters or layout images of resumes against corporate targeted definitions to compile professional, accurate, hyper-tailored cover letters that maximize job match ratios without manufacturing fake data.";
        userPrompt = `User Resume Metric Profile Content:\n${val1}\n\nTarget Corporate Job Constraints:\n${val2}`;
    } else if (mode === 'homework') {
        systemPrompt = "You are ApplyIQ Academic Core. You function as an elite structural multi-disciplinary tutor. If the user provided a picture, analyze it carefully. Do not instantly display plain answers. Systematically break down the problem step-by-step, explain underlying rules clearly, and offer comprehensive logic guidance.";
        userPrompt = `Subject Framework: ${val1}\nAdditional Constraints/Text: ${val2}`;
    } else if (mode === 'code') {
        systemPrompt = "You are ApplyIQ Developer Sandbox. You are a Senior Systems Architect. Scan code blocks or image trace visual interface structures. Output clean, heavily-commented code blocks, find performance bugs, and detail step-by-step resolution traces.";
        userPrompt = `Target Stack Context: ${val1}\nSource Code Architecture/Fault Inputs:\n${val2}`;
    } else if (mode === 'creative') {
        systemPrompt = "You are ApplyIQ Creative Content Studio. You are an elite Copywriter and Brand Strategist. Read user data or view product designs to deliver high-converting copy variants, captivating headings, and optimal marketing scripts tailored for user specifications.";
        userPrompt = `Platform Layout: ${val1}\nContent Context Blueprints:\n${val2}`;
    }

    const result = await callLiveGeminiCore(systemPrompt, userPrompt);
    if (result) outputText.innerText = result;
    else resultBox.classList.add('hidden');
    btn.disabled = false;
}

function copyOutput() {
    const text = document.getElementById('output-text').innerText;
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Payload asset copied smoothly to active device clipboard.");
}
