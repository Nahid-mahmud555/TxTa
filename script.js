/**
 * txta — Core System Interactivity & Interface Engine
 * Standard JavaScript (ES6+) Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeroPerspectiveEffect();
    initSandboxEngine();
});

/**
 * 1. Sophisticated 3D Transform Mesh Simulation
 * Makes the dashboard container tip, lean and follow the user's cursor naturally.
 */
function initHeroPerspectiveEffect() {
    const dashboard = document.getElementById('heroDashboard');
    if (!dashboard) return;

    const wrapper = dashboard.parentElement;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        
        // Compute structural normalized tracking locations (-1 to 1 range)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Clamp maximum transformation limits elegantly
        const maxRotationX = 12; // Degrees X
        const maxRotationY = 12; // Degrees Y
        
        const rotX = -(y * maxRotationX).toFixed(2);
        const rotY = (x * maxRotationY).toFixed(2);
        
        // Apply 3D Matrix Transformations dynamically
        dashboard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        // Smoothly settle back down to equilibrium baseline
        dashboard.style.transform = 'rotateX(8deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

/**
 * 2. Sandbox Simulation Engine
 * Handles State Machine adjustments, Drag & Drop uploads, and clipboard replication hooks.
 */
function initSandboxEngine() {
    // Structural DOM Registry Nodes
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const directText = document.getElementById('directText');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnCopy = document.getElementById('btnCopy');
    const btnReset = document.getElementById('btnReset');
    const generatedUrlInput = document.getElementById('generatedUrl');
    
    // UI State Panels
    const stateInput = document.getElementById('stateInput');
    const stateLoading = document.getElementById('stateLoading');
    const stateOutput = document.getElementById('stateOutput');
    const loadingProgressText = document.getElementById('loadingProgress');

    // Drag and Drop Events Configuration Layer
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) handleFileDiscovery(files[0]);
    });

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFileDiscovery(e.target.files[0]);
    });

    // Pipeline Engine Trigger Hook
    btnGenerate.addEventListener('click', () => {
        const explicitContent = directText.value.trim();
        if (!explicitContent) {
            alert('Please insert a file or enter character parameters to compile structural data payloads.');
            return;
        }
        executePipelineSequence(explicitContent.substring(0, 15));
    });

    // Reset Engine Action Interface
    btnReset.addEventListener('click', () => {
        switchSandboxState(stateInput);
        directText.value = '';
        fileInput.value = '';
    });

    // Clipboard API Action Layer
    btnCopy.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedUrlInput.value);
            const textSpan = btnCopy.querySelector('.copy-text');
            
            btnCopy.classList.add('copied');
            textSpan.textContent = 'Copied!';
            
            setTimeout(() => {
                btnCopy.classList.remove('copied');
                textSpan.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('System execution layer denied automated clipboard authorization parameters:', err);
        }
    });

    // Handler Interception for Input Files
    function handleFileDiscovery(file) {
        const acceptedFormats = ['text/plain', 'text/markdown'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (!acceptedFormats.includes(file.type) && fileExtension !== 'md' && fileExtension !== 'txt') {
            alert('Invalid configuration matrix mapping. System accepts only raw .txt or .md parameters natively.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileNameSanitized = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 12);
            executePipelineSequence(fileNameSanitized);
        };
        reader.readAsText(file);
    }

    // State Transition Engine Sequence
    function executePipelineSequence(assetKey) {
        switchSandboxState(stateLoading);
        
        const logSequences = [
            'Parsing raw atomic binary structures...',
            'Allocating target cluster addresses inside distributed networks...',
            'Encrypting global Edge CDN routing maps...',
            'Replicating data models across 280 edge POPs...'
        ];
        
        let cycleIdx = 0;
        const textCycleInterval = setInterval(() => {
            if (cycleIdx < logSequences.length) {
                loadingProgressText.textContent = logSequences[cycleIdx];
                cycleIdx++;
            }
        }, 450);

        // Compute simulated server propagation sequence completion
        setTimeout(() => {
            clearInterval(textCycleInterval);
            
            // Inject dynamically structured URL output parameters
            const uniqueSignature = Math.random().toString(36).substring(2, 10);
            generatedUrlInput.value = `https://api.txta.com/v1/text/usr_99/${assetKey.toLowerCase()}_${uniqueSignature}`;
            
            switchSandboxState(stateOutput);
        }, 2200);
    }

    // State Modality Switch Animation Pipeline
    function switchSandboxState(targetStateNode) {
        [stateInput, stateLoading, stateOutput].forEach(node => {
            node.classList.remove('active');
            node.style.display = 'none';
        });
        
        targetStateNode.style.display = 'flex';
        // Request animation execution cycle smoothly to bypass hardware composition drops
        requestAnimationFrame(() => {
            targetStateNode.classList.add('active');
        });
    }
}
